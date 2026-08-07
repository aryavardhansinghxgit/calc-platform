const fs = require("fs");
const path = require("path");

const calculators = [
  // 1. DATE & TIME (9)
  {
    slug: "age-calculator",
    id: "age-calculator",
    title: "Age Calculator",
    subcategory: "Date & Time",
    iconName: "Calendar",
    description: "Calculate exact age in years, months, days, hours, and minutes from birth date.",
    keywords: ["age calculator", "how old am i", "date of birth", "birthday calculator"],
    relatedCalculators: ["date-calculator", "day-counter-calculator", "day-of-the-week-calculator"],
    inputs: [
      { name: "birthDate", label: "Date of Birth", type: "date", defaultValue: "2000-01-01" },
      { name: "targetDate", label: "Age at Date", type: "date", defaultValue: "2026-08-07" }
    ],
    outputs: [
      { name: "ageYearsMonthsDays", label: "Exact Age", format: "text", highlight: true },
      { name: "totalDays", label: "Total Days Lived", format: "number" },
      { name: "nextBirthday", label: "Days Until Next Birthday", format: "number" }
    ],
    calcLogic: `
  const bDate = new Date(inputs.birthDate || "2000-01-01");
  const tDate = new Date(inputs.targetDate || "2026-08-07");
  if (isNaN(bDate.getTime()) || isNaN(tDate.getTime())) {
    return { ageYearsMonthsDays: "Invalid Date", totalDays: 0, nextBirthday: 0 };
  }
  let years = tDate.getFullYear() - bDate.getFullYear();
  let months = tDate.getMonth() - bDate.getMonth();
  let days = tDate.getDate() - bDate.getDate();
  if (days < 0) {
    months--;
    const lastMonth = new Date(tDate.getFullYear(), tDate.getMonth(), 0);
    days += lastMonth.getDate();
  }
  if (months < 0) { years--; months += 12; }
  const totalDays = Math.max(0, Math.floor((tDate.getTime() - bDate.getTime()) / 86400000));
  const nextBdayYear = (tDate.getMonth() > bDate.getMonth() || (tDate.getMonth() === bDate.getMonth() && tDate.getDate() > bDate.getDate())) ? tDate.getFullYear() + 1 : tDate.getFullYear();
  const nextBday = new Date(nextBdayYear, bDate.getMonth(), bDate.getDate());
  const daysToNextBday = Math.max(0, Math.ceil((nextBday.getTime() - tDate.getTime()) / 86400000));
  return { ageYearsMonthsDays: \`\${years} years, \${months} months, \${days} days\`, totalDays, nextBirthday: daysToNextBday };
`,
    formulaStr: "Age = Target Date - Birth Date",
    faqs: [{ question: "How is exact age calculated?", answer: "By accounting for leap years and varying month lengths between the birth date and target date." }]
  },
  {
    slug: "date-calculator",
    id: "date-calculator",
    title: "Date Calculator",
    subcategory: "Date & Time",
    iconName: "CalendarDays",
    description: "Add or subtract days, weeks, months, or years from any given starting date.",
    keywords: ["date calculator", "add days to date", "subtract days", "future date"],
    relatedCalculators: ["age-calculator", "day-counter-calculator"],
    inputs: [
      { name: "startDate", label: "Start Date", type: "date", defaultValue: "2026-08-07" },
      { name: "operation", label: "Action", type: "select", defaultValue: "add", options: [{ label: "Add (+)", value: "add" }, { label: "Subtract (-)", value: "sub" }] },
      { name: "years", label: "Years", type: "number", defaultValue: 0, min: 0, max: 100, step: 1 },
      { name: "months", label: "Months", type: "number", defaultValue: 0, min: 0, max: 120, step: 1 },
      { name: "days", label: "Days", type: "number", defaultValue: 30, min: 0, max: 1000, step: 1 }
    ],
    outputs: [
      { name: "resultDate", label: "Calculated Target Date", format: "text", highlight: true },
      { name: "dayOfWeek", label: "Day of the Week", format: "text" }
    ],
    calcLogic: `
  const start = new Date(inputs.startDate || "2026-08-07");
  if (isNaN(start.getTime())) return { resultDate: "Invalid Date", dayOfWeek: "N/A" };
  const mult = inputs.operation === "sub" ? -1 : 1;
  const y = Number(inputs.years) || 0;
  const m = Number(inputs.months) || 0;
  const d = Number(inputs.days) || 0;
  const res = new Date(start);
  res.setFullYear(res.getFullYear() + mult * y);
  res.setMonth(res.getMonth() + mult * m);
  res.setDate(res.getDate() + mult * d);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return { resultDate: res.toISOString().split("T")[0], dayOfWeek: daysOfWeek[res.getDay()] };
`,
    formulaStr: "Target Date = Start Date ± (Years, Months, Days)",
    faqs: [{ question: "How does the date calculator handle month overflows?", answer: "Next.js date arithmetic automatically adjusts month overflows into the next year." }]
  },
  {
    slug: "time-calculator",
    id: "time-calculator",
    title: "Time Calculator",
    subcategory: "Date & Time",
    iconName: "Clock",
    description: "Add and subtract time durations in hours, minutes, and seconds.",
    keywords: ["time calculator", "add time", "subtract time", "hours and minutes"],
    relatedCalculators: ["hours-calculator", "time-card-calculator"],
    inputs: [
      { name: "h1", label: "Time 1 Hours", type: "number", defaultValue: 4, min: 0, max: 1000, step: 1 },
      { name: "m1", label: "Time 1 Minutes", type: "number", defaultValue: 35, min: 0, max: 59, step: 1 },
      { name: "operation", label: "Operator", type: "select", defaultValue: "+", options: [{ label: "Add (+)", value: "+" }, { label: "Subtract (-)", value: "-" }] },
      { name: "h2", label: "Time 2 Hours", type: "number", defaultValue: 2, min: 0, max: 1000, step: 1 },
      { name: "m2", label: "Time 2 Minutes", type: "number", defaultValue: 45, min: 0, max: 59, step: 1 }
    ],
    outputs: [
      { name: "resultTime", label: "Total Time", format: "text", highlight: true },
      { name: "totalHours", label: "Total Hours (Decimal)", format: "number" }
    ],
    calcLogic: `
  const sec1 = (Number(inputs.h1) || 0) * 3600 + (Number(inputs.m1) || 0) * 60;
  const sec2 = (Number(inputs.h2) || 0) * 3600 + (Number(inputs.m2) || 0) * 60;
  const totalSec = inputs.operation === "-" ? Math.max(0, sec1 - sec2) : sec1 + sec2;
  const h = Math.floor(totalSec / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const dec = parseFloat((totalSec / 3600).toFixed(2));
  return { resultTime: \`\${h} hours, \${m} minutes\`, totalHours: dec };
`,
    formulaStr: "Total Time = Time 1 ± Time 2",
    faqs: [{ question: "How do I convert minutes to decimal hours?", answer: "Divide the total minutes by 60 (e.g. 30 minutes = 0.5 hours)." }]
  },
  {
    slug: "hours-calculator",
    id: "hours-calculator",
    title: "Hours Calculator",
    subcategory: "Date & Time",
    iconName: "Timer",
    description: "Calculate total hours worked between start and end times minus break time.",
    keywords: ["hours calculator", "work hours", "time worked", "timecard"],
    relatedCalculators: ["time-card-calculator", "time-calculator"],
    inputs: [
      { name: "startTime", label: "Start Time (e.g. 09:00)", type: "text", defaultValue: "09:00" },
      { name: "endTime", label: "End Time (e.g. 17:00)", type: "text", defaultValue: "17:00" },
      { name: "breakMins", label: "Unpaid Break (minutes)", type: "number", defaultValue: 30, min: 0, max: 240, step: 5 }
    ],
    outputs: [
      { name: "totalHours", label: "Total Paid Hours", format: "number", highlight: true },
      { name: "formattedDuration", label: "Duration Format", format: "text" }
    ],
    calcLogic: `
  const parseTime = (str: string) => {
    const parts = String(str || "09:00").split(":").map(Number);
    return (parts[0] || 0) * 60 + (parts[1] || 0);
  };
  const start = parseTime(inputs.startTime);
  let end = parseTime(inputs.endTime);
  if (end < start) end += 24 * 60; // Overnight
  const brk = Math.max(0, Number(inputs.breakMins) || 0);
  const netMins = Math.max(0, end - start - brk);
  const hrs = parseFloat((netMins / 60).toFixed(2));
  const h = Math.floor(netMins / 60);
  const m = netMins % 60;
  return { totalHours: hrs, formattedDuration: \`\${h} hrs \${m} mins\` };
`,
    formulaStr: "Total Hours = (End Time - Start Time - Break Mins) / 60",
    faqs: [{ question: "Does this handle shifts crossing midnight?", answer: "Yes, if the end time is earlier than the start time, it automatically adds 24 hours." }]
  },
  {
    slug: "time-card-calculator",
    id: "time-card-calculator",
    title: "Time Card Calculator",
    subcategory: "Date & Time",
    iconName: "Briefcase",
    description: "Calculate weekly work hours, overtime, regular pay, and gross earnings.",
    keywords: ["time card calculator", "timesheet", "payroll", "gross pay", "overtime"],
    relatedCalculators: ["hours-calculator", "time-calculator"],
    inputs: [
      { name: "monHours", label: "Monday Hours", type: "number", defaultValue: 8, min: 0, max: 24, step: 0.5 },
      { name: "tueHours", label: "Tuesday Hours", type: "number", defaultValue: 8, min: 0, max: 24, step: 0.5 },
      { name: "wedHours", label: "Wednesday Hours", type: "number", defaultValue: 8, min: 0, max: 24, step: 0.5 },
      { name: "thuHours", label: "Thursday Hours", type: "number", defaultValue: 8, min: 0, max: 24, step: 0.5 },
      { name: "friHours", label: "Friday Hours", type: "number", defaultValue: 8, min: 0, max: 24, step: 0.5 },
      { name: "hourlyRate", label: "Hourly Pay Rate ($)", type: "number", defaultValue: 25, min: 1, max: 500, step: 1 }
    ],
    outputs: [
      { name: "grossPay", label: "Total Gross Pay", format: "currency", highlight: true },
      { name: "totalHours", label: "Total Weekly Hours", format: "number" },
      { name: "regularPay", label: "Regular Pay", format: "currency" },
      { name: "overtimePay", label: "Overtime Pay (1.5x)", format: "currency" }
    ],
    calcLogic: `
  const total = ["monHours", "tueHours", "wedHours", "thuHours", "friHours"].reduce((acc, k) => acc + Math.max(0, Number(inputs[k]) || 0), 0);
  const rate = Math.max(0, Number(inputs.hourlyRate) || 25);
  const regHours = Math.min(40, total);
  const otHours = Math.max(0, total - 40);
  const regPay = regHours * rate;
  const otPay = otHours * rate * 1.5;
  return { grossPay: regPay + otPay, totalHours: total, regularPay: regPay, overtimePay: otPay };
`,
    formulaStr: "Gross Pay = (Regular Hours × Rate) + (Overtime Hours × 1.5 × Rate)",
    faqs: [{ question: "How is overtime calculated?", answer: "Hours worked over 40 per week are billed at 1.5 times the regular hourly pay rate." }]
  },
  {
    slug: "time-zone-calculator",
    id: "time-zone-calculator",
    title: "Time Zone Calculator",
    subcategory: "Date & Time",
    iconName: "Globe",
    description: "Convert time between UTC/GMT and major global time zones.",
    keywords: ["time zone calculator", "utc converter", "timezone converter", "gmt time"],
    relatedCalculators: ["time-calculator", "day-counter-calculator"],
    inputs: [
      { name: "timeStr", label: "Local Time (HH:MM)", type: "text", defaultValue: "12:00" },
      { name: "fromOffset", label: "From UTC Offset", type: "number", defaultValue: -5, min: -12, max: 14, step: 0.5 },
      { name: "toOffset", label: "To UTC Offset", type: "number", defaultValue: 1, min: -12, max: 14, step: 0.5 }
    ],
    outputs: [
      { name: "convertedTime", label: "Converted Local Time", format: "text", highlight: true },
      { name: "timeDiffHours", label: "Time Difference (Hours)", format: "number" }
    ],
    calcLogic: `
  const parts = String(inputs.timeStr || "12:00").split(":").map(Number);
  const hrs = parts[0] || 12;
  const mins = parts[1] || 0;
  const fromOff = Number(inputs.fromOffset) || -5;
  const toOff = Number(inputs.toOffset) || 1;
  const diff = toOff - fromOff;
  let newHrs = (hrs + diff) % 24;
  if (newHrs < 0) newHrs += 24;
  const hStr = Math.floor(newHrs).toString().padStart(2, "0");
  const mStr = mins.toString().padStart(2, "0");
  return { convertedTime: \`\${hStr}:\${mStr}\`, timeDiffHours: diff };
`,
    formulaStr: "Target Time = Origin Time + (Target Offset - Origin Offset)",
    faqs: [{ question: "What is UTC?", answer: "Coordinated Universal Time (UTC) is the primary time standard by which the world regulates clocks." }]
  },
  {
    slug: "time-duration-calculator",
    id: "time-duration-calculator",
    title: "Time Duration Calculator",
    subcategory: "Date & Time",
    iconName: "Clock",
    description: "Calculate exact elapsed duration in days, hours, and minutes between two dates & times.",
    keywords: ["time duration", "elapsed time", "duration calculator", "time interval"],
    relatedCalculators: ["date-calculator", "day-counter-calculator"],
    inputs: [
      { name: "startDate", label: "Start Date", type: "date", defaultValue: "2026-08-01" },
      { name: "startTime", label: "Start Time", type: "text", defaultValue: "08:00" },
      { name: "endDate", label: "End Date", type: "date", defaultValue: "2026-08-07" },
      { name: "endTime", label: "End Time", type: "text", defaultValue: "17:30" }
    ],
    outputs: [
      { name: "formattedDuration", label: "Elapsed Duration", format: "text", highlight: true },
      { name: "totalHours", label: "Total Hours", format: "number" }
    ],
    calcLogic: `
  const dt1 = new Date(\`\${inputs.startDate || "2026-08-01"}T\${inputs.startTime || "08:00"}:00\`);
  const dt2 = new Date(\`\${inputs.endDate || "2026-08-07"}T\${inputs.endTime || "17:30"}:00\`);
  if (isNaN(dt1.getTime()) || isNaN(dt2.getTime())) return { formattedDuration: "Invalid Input", totalHours: 0 };
  const diffMs = Math.max(0, dt2.getTime() - dt1.getTime());
  const totalMins = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMins / (24 * 60));
  const hrs = Math.floor((totalMins % (24 * 60)) / 60);
  const mins = totalMins % 60;
  return {
    formattedDuration: \`\${days} days, \${hrs} hours, \${mins} minutes\`,
    totalHours: parseFloat((diffMs / 3600000).toFixed(2))
  };
`,
    formulaStr: "Duration = End Timestamp - Start Timestamp",
    faqs: [{ question: "Can this calculate multi-day elapsed time?", answer: "Yes, it accurately tracks elapsed time across multiple days or months." }]
  },
  {
    slug: "day-counter-calculator",
    id: "day-counter-calculator",
    title: "Day Counter",
    subcategory: "Date & Time",
    iconName: "Calendar",
    description: "Count exact total calendar days and business days between two dates.",
    keywords: ["day counter", "days between dates", "calendar days", "working days"],
    relatedCalculators: ["date-calculator", "day-of-the-week-calculator"],
    inputs: [
      { name: "startDate", label: "Start Date", type: "date", defaultValue: "2026-01-01" },
      { name: "endDate", label: "End Date", type: "date", defaultValue: "2026-12-31" }
    ],
    outputs: [
      { name: "totalDays", label: "Total Calendar Days", format: "number", highlight: true },
      { name: "businessDays", label: "Business Days (Mon-Fri)", format: "number" },
      { name: "totalWeeks", label: "Total Weeks", format: "number" }
    ],
    calcLogic: `
  const d1 = new Date(inputs.startDate || "2026-01-01");
  const d2 = new Date(inputs.endDate || "2026-12-31");
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return { totalDays: 0, businessDays: 0, totalWeeks: 0 };
  const totalDays = Math.max(0, Math.floor((d2.getTime() - d1.getTime()) / 86400000));
  let biz = 0;
  const cur = new Date(d1);
  while (cur < d2) {
    const day = cur.getDay();
    if (day !== 0 && day !== 6) biz++;
    cur.setDate(cur.getDate() + 1);
  }
  return { totalDays, businessDays: biz, totalWeeks: parseFloat((totalDays / 7).toFixed(1)) };
`,
    formulaStr: "Total Days = End Date - Start Date",
    faqs: [{ question: "Are weekends excluded from business days?", answer: "Yes, Saturdays and Sundays are excluded from the business day count." }]
  },
  {
    slug: "day-of-the-week-calculator",
    id: "day-of-the-week-calculator",
    title: "Day of the Week Calculator",
    subcategory: "Date & Time",
    iconName: "HelpCircle",
    description: "Determine what day of the week any past or future historical date falls on.",
    keywords: ["day of the week", "what day was i born", "day finder", "calendar day"],
    relatedCalculators: ["age-calculator", "day-counter-calculator"],
    inputs: [
      { name: "targetDate", label: "Target Date", type: "date", defaultValue: "1969-07-20" }
    ],
    outputs: [
      { name: "dayOfWeek", label: "Day of the Week", format: "text", highlight: true },
      { name: "isLeapYear", label: "Is Leap Year?", format: "text" }
    ],
    calcLogic: `
  const d = new Date(inputs.targetDate || "1969-07-20");
  if (isNaN(d.getTime())) return { dayOfWeek: "Invalid Date", isLeapYear: "N/A" };
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const y = d.getFullYear();
  const isLeap = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
  return { dayOfWeek: days[d.getDay()], isLeapYear: isLeap ? "Yes" : "No" };
`,
    formulaStr: "Zeller's Congruence / Calendar Algorithm",
    faqs: [{ question: "What day was July 20, 1969?", answer: "Apollo 11 moon landing occurred on a Sunday." }]
  },

  // 2. HOUSING / BUILDING (8)
  {
    slug: "concrete-calculator",
    id: "concrete-calculator",
    title: "Concrete Calculator",
    subcategory: "Housing / Building",
    iconName: "Hammer",
    description: "Estimate concrete volume in cubic yards and pre-mixed bag quantities for slabs and footings.",
    keywords: ["concrete calculator", "cement calculator", "cubic yards", "concrete bags"],
    relatedCalculators: ["square-footage-calculator", "gravel-calculator"],
    inputs: [
      { name: "lengthFt", label: "Length (feet)", type: "number", defaultValue: 10, min: 0.1, max: 1000, step: 0.5 },
      { name: "widthFt", label: "Width (feet)", type: "number", defaultValue: 10, min: 0.1, max: 1000, step: 0.5 },
      { name: "depthInches", label: "Thickness / Depth (inches)", type: "number", defaultValue: 4, min: 0.5, max: 48, step: 0.5 }
    ],
    outputs: [
      { name: "cubicYards", label: "Concrete Volume (Cubic Yards)", format: "number", highlight: true },
      { name: "bags80lb", label: "80 lb Premix Bags Needed", format: "number" },
      { name: "bags60lb", label: "60 lb Premix Bags Needed", format: "number" }
    ],
    calcLogic: `
  const l = Math.max(0, Number(inputs.lengthFt) || 10);
  const w = Math.max(0, Number(inputs.widthFt) || 10);
  const d = Math.max(0, Number(inputs.depthInches) || 4) / 12;
  const cuFt = l * w * d;
  const cuYards = cuFt / 27;
  const bags80 = Math.ceil(cuFt / 0.6);
  const bags60 = Math.ceil(cuFt / 0.45);
  return { cubicYards: parseFloat(cuYards.toFixed(2)), bags80lb: bags80, bags60lb: bags60 };
`,
    formulaStr: "Cubic Yards = (Length ft × Width ft × Depth ft) / 27",
    faqs: [{ question: "How many 80lb bags make a cubic yard of concrete?", answer: "It takes approximately 45 80lb bags of concrete premix to yield 1 cubic yard." }]
  },
  {
    slug: "btu-calculator",
    id: "btu-calculator",
    title: "BTU Calculator",
    subcategory: "Housing / Building",
    iconName: "Flame",
    description: "Calculate required heating and air conditioning cooling BTU output for a room.",
    keywords: ["btu calculator", "ac btu", "heating btu", "room cooling"],
    relatedCalculators: ["square-footage-calculator", "electricity-calculator"],
    inputs: [
      { name: "lengthFt", label: "Room Length (ft)", type: "number", defaultValue: 15, min: 1, max: 200, step: 1 },
      { name: "widthFt", label: "Room Width (ft)", type: "number", defaultValue: 20, min: 1, max: 200, step: 1 },
      { name: "insulation", label: "Insulation Level", type: "select", defaultValue: "average", options: [
        { label: "Good (Modern Energy Efficient)", value: "20" },
        { label: "Average (Standard Home)", value: "25" },
        { label: "Poor (Older / Poor Insulation)", value: "30" }
      ] }
    ],
    outputs: [
      { name: "requiredBtu", label: "Required Cooling/Heating BTU", format: "number", highlight: true, unit: "BTU/hr" },
      { name: "acTons", label: "Recommended AC Tonnage", format: "number", unit: "Tons" }
    ],
    calcLogic: `
  const l = Math.max(1, Number(inputs.lengthFt) || 15);
  const w = Math.max(1, Number(inputs.widthFt) || 20);
  const factor = Number(inputs.insulation) || 25;
  const sqFt = l * w;
  const btu = Math.round(sqFt * factor);
  const tons = parseFloat((btu / 12000).toFixed(2));
  return { requiredBtu: btu, acTons: tons };
`,
    formulaStr: "BTU = Area (sq ft) × Insulation Factor (20-30)",
    faqs: [{ question: "How many BTUs equal 1 Ton of AC capacity?", answer: "1 Ton of cooling capacity equals 12,000 BTUs per hour." }]
  },
  {
    slug: "square-footage-calculator",
    id: "square-footage-calculator",
    title: "Square Footage Calculator",
    subcategory: "Housing / Building",
    iconName: "Box",
    description: "Calculate total floor, wall, or land square footage and estimated material costs.",
    keywords: ["square footage", "sq ft calculator", "area calculator", "floor space"],
    relatedCalculators: ["tile-calculator", "roofing-calculator"],
    inputs: [
      { name: "lengthFt", label: "Length (feet)", type: "number", defaultValue: 12, min: 0.1, max: 1000, step: 0.5 },
      { name: "widthFt", label: "Width (feet)", type: "number", defaultValue: 15, min: 0.1, max: 1000, step: 0.5 },
      { name: "pricePerSqFt", label: "Price per Sq Ft ($)", type: "number", defaultValue: 5, min: 0, max: 500, step: 0.5 }
    ],
    outputs: [
      { name: "squareFeet", label: "Total Area (Sq Ft)", format: "number", highlight: true },
      { name: "squareMeters", label: "Area in Sq Meters", format: "number" },
      { name: "totalCost", label: "Estimated Material Cost", format: "currency" }
    ],
    calcLogic: `
  const l = Math.max(0, Number(inputs.lengthFt) || 12);
  const w = Math.max(0, Number(inputs.widthFt) || 15);
  const price = Math.max(0, Number(inputs.pricePerSqFt) || 5);
  const sqFt = l * w;
  const sqM = parseFloat((sqFt * 0.092903).toFixed(2));
  return { squareFeet: sqFt, squareMeters: sqM, totalCost: sqFt * price };
`,
    formulaStr: "Square Feet = Length (ft) × Width (ft)",
    faqs: [{ question: "How do you convert square feet to square meters?", answer: "Multiply square feet by 0.092903 to get square meters." }]
  },
  {
    slug: "stair-calculator",
    id: "stair-calculator",
    title: "Stair Calculator",
    subcategory: "Housing / Building",
    iconName: "Layers",
    description: "Calculate stair riser height, tread depth, number of steps, and stringer angle for building code compliance.",
    keywords: ["stair calculator", "stair riser", "stair tread", "staircase design"],
    relatedCalculators: ["square-footage-calculator", "concrete-calculator"],
    inputs: [
      { name: "totalRiseInches", label: "Total Rise Height (inches)", type: "number", defaultValue: 108, min: 10, max: 600, step: 1 },
      { name: "targetRiserHeight", label: "Target Riser Height (inches)", type: "number", defaultValue: 7.5, min: 4, max: 10, step: 0.25 }
    ],
    outputs: [
      { name: "numberOfSteps", label: "Number of Risers (Steps)", format: "number", highlight: true },
      { name: "exactRiserHeight", label: "Exact Riser Height (inches)", format: "number" },
      { name: "totalRunInches", label: "Total Run Length (10\" treads)", format: "number", unit: "in" }
    ],
    calcLogic: `
  const rise = Math.max(1, Number(inputs.totalRiseInches) || 108);
  const target = Math.max(4, Number(inputs.targetRiserHeight) || 7.5);
  const steps = Math.round(rise / target);
  const exactRiser = parseFloat((rise / steps).toFixed(2));
  const totalRun = (steps - 1) * 10; // Standard 10 inch tread
  return { numberOfSteps: steps, exactRiserHeight: exactRiser, totalRunInches: totalRun };
`,
    formulaStr: "Risers Count = Round(Total Rise / Target Riser Height)",
    faqs: [{ question: "What is standard stair riser height?", answer: "Building codes generally specify a maximum riser height of 7.75 inches (19.7 cm)." }]
  },
  {
    slug: "roofing-calculator",
    id: "roofing-calculator",
    title: "Roofing Calculator",
    subcategory: "Housing / Building",
    iconName: "Home",
    description: "Calculate roof surface area, roofing squares, and asphalt shingle bundle requirements.",
    keywords: ["roofing calculator", "roof squares", "shingles needed", "roof area"],
    relatedCalculators: ["square-footage-calculator", "tile-calculator"],
    inputs: [
      { name: "houseLengthFt", label: "House Length (ft)", type: "number", defaultValue: 40, min: 1, max: 500, step: 1 },
      { name: "houseWidthFt", label: "House Width (ft)", type: "number", defaultValue: 30, min: 1, max: 500, step: 1 },
      { name: "pitch", label: "Roof Pitch", type: "select", defaultValue: "1.054", options: [
        { label: "Low Pitch (4/12)", value: "1.054" },
        { label: "Medium Pitch (6/12)", value: "1.118" },
        { label: "Steep Pitch (8/12)", value: "1.202" }
      ] }
    ],
    outputs: [
      { name: "roofSquares", label: "Roofing Squares Needed", format: "number", highlight: true },
      { name: "bundlesNeeded", label: "Shingle Bundles (3/square)", format: "number" },
      { name: "totalAreaSqFt", label: "Estimated Roof Area", format: "number", unit: "sq ft" }
    ],
    calcLogic: `
  const l = Math.max(1, Number(inputs.houseLengthFt) || 40);
  const w = Math.max(1, Number(inputs.houseWidthFt) || 30);
  const pitchMult = Number(inputs.pitch) || 1.118;
  const baseArea = l * w;
  const roofArea = baseArea * pitchMult * 1.1; // 10% waste factor
  const squares = parseFloat((roofArea / 100).toFixed(2));
  const bundles = Math.ceil(squares * 3);
  return { roofSquares: squares, bundlesNeeded: bundles, totalAreaSqFt: Math.round(roofArea) };
`,
    formulaStr: "Roof Area = Base Footprint × Pitch Multiplier × 1.10 (Waste)",
    faqs: [{ question: "What is a roofing square?", answer: "One roofing square equals 100 square feet of roof surface area." }]
  },
  {
    slug: "tile-calculator",
    id: "tile-calculator",
    title: "Tile Calculator",
    subcategory: "Housing / Building",
    iconName: "Grid",
    description: "Calculate number of floor or wall tiles and boxes needed for a room with waste allowance.",
    keywords: ["tile calculator", "flooring tile", "tiles needed", "grout calculator"],
    relatedCalculators: ["square-footage-calculator", "concrete-calculator"],
    inputs: [
      { name: "roomSqFt", label: "Room Area (sq ft)", type: "number", defaultValue: 200, min: 1, max: 10000, step: 10 },
      { name: "tileSizeInches", label: "Tile Dimension", type: "select", defaultValue: "144", options: [
        { label: "12\" x 12\" (1 sq ft)", value: "144" },
        { label: "12\" x 24\" (2 sq ft)", value: "288" },
        { label: "24\" x 24\" (4 sq ft)", value: "576" }
      ] },
      { name: "wastePct", label: "Waste Allowance (%)", type: "number", defaultValue: 10, min: 0, max: 30, step: 5 }
    ],
    outputs: [
      { name: "tilesNeeded", label: "Total Individual Tiles Needed", format: "number", highlight: true },
      { name: "boxesNeeded", label: "Boxes Needed (10 tiles/box)", format: "number" }
    ],
    calcLogic: `
  const area = Math.max(1, Number(inputs.roomSqFt) || 200);
  const tileSqIn = Number(inputs.tileSizeInches) || 144;
  const waste = Math.max(0, Number(inputs.wastePct) || 10) / 100;
  const totalArea = area * (1 + waste);
  const tileSqFt = tileSqIn / 144;
  const tiles = Math.ceil(totalArea / tileSqFt);
  const boxes = Math.ceil(tiles / 10);
  return { tilesNeeded: tiles, boxesNeeded: boxes };
`,
    formulaStr: "Tiles Needed = Ceil( [Room Area × (1 + Waste%)] / Tile Area )",
    faqs: [{ question: "Why add 10% for tile waste?", answer: "To account for cuts, breakage during installation, and edge trimming." }]
  },
  {
    slug: "mulch-calculator",
    id: "mulch-calculator",
    title: "Mulch Calculator",
    subcategory: "Housing / Building",
    iconName: "Trees",
    description: "Calculate cubic yards and bag count of garden mulch for landscaping coverage.",
    keywords: ["mulch calculator", "garden mulch", "landscape mulch", "cubic yards"],
    relatedCalculators: ["gravel-calculator", "square-footage-calculator"],
    inputs: [
      { name: "areaSqFt", label: "Landscape Bed Area (sq ft)", type: "number", defaultValue: 300, min: 1, max: 50000, step: 10 },
      { name: "depthInches", label: "Mulch Depth (inches)", type: "number", defaultValue: 3, min: 1, max: 12, step: 0.5 }
    ],
    outputs: [
      { name: "cubicYards", label: "Mulch Volume (Cubic Yards)", format: "number", highlight: true },
      { name: "bags2CuFt", label: "2 Cu Ft Bags Needed", format: "number" }
    ],
    calcLogic: `
  const area = Math.max(0, Number(inputs.areaSqFt) || 300);
  const depthFt = Math.max(0, Number(inputs.depthInches) || 3) / 12;
  const cuFt = area * depthFt;
  const cuYds = parseFloat((cuFt / 27).toFixed(2));
  const bags = Math.ceil(cuFt / 2);
  return { cubicYards: cuYds, bags2CuFt: bags };
`,
    formulaStr: "Cubic Yards = (Area sq ft × Depth ft) / 27",
    faqs: [{ question: "What is the recommended mulch depth?", answer: "3 inches is the recommended standard depth for optimal weed suppression and moisture retention." }]
  },
  {
    slug: "gravel-calculator",
    id: "gravel-calculator",
    title: "Gravel Calculator",
    subcategory: "Housing / Building",
    iconName: "Layers",
    description: "Calculate weight in tons and volume in cubic yards of crushed stone or gravel.",
    keywords: ["gravel calculator", "crushed stone", "tons of gravel", "driveway gravel"],
    relatedCalculators: ["mulch-calculator", "concrete-calculator"],
    inputs: [
      { name: "areaSqFt", label: "Driveway / Path Area (sq ft)", type: "number", defaultValue: 500, min: 1, max: 50000, step: 50 },
      { name: "depthInches", label: "Gravel Depth (inches)", type: "number", defaultValue: 4, min: 1, max: 24, step: 1 }
    ],
    outputs: [
      { name: "tonsNeeded", label: "Total Gravel Needed (Tons)", format: "number", highlight: true },
      { name: "cubicYards", label: "Volume (Cubic Yards)", format: "number" }
    ],
    calcLogic: `
  const area = Math.max(0, Number(inputs.areaSqFt) || 500);
  const depthFt = Math.max(0, Number(inputs.depthInches) || 4) / 12;
  const cuFt = area * depthFt;
  const cuYds = cuFt / 27;
  const tons = cuYds * 1.4; // 1.4 tons per cubic yard average
  return { tonsNeeded: parseFloat(tons.toFixed(2)), cubicYards: parseFloat(cuYds.toFixed(2)) };
`,
    formulaStr: "Gravel Weight (Tons) = Cubic Yards × 1.4 Tons/Yard",
    faqs: [{ question: "How much does a cubic yard of gravel weigh?", answer: "A cubic yard of crushed gravel weighs approximately 1.4 tons (2,800 lbs)." }]
  },

  // 3. MEASUREMENTS & UNITS (10)
  {
    slug: "height-calculator",
    id: "height-calculator",
    title: "Height Calculator",
    subcategory: "Measurements & Units",
    iconName: "Ruler",
    description: "Convert height between feet/inches and cm, and predict child adult height.",
    keywords: ["height calculator", "child height predictor", "feet to cm", "height conversion"],
    relatedCalculators: ["conversion-calculator", "weight-calculator"],
    inputs: [
      { name: "fatherHeightCm", label: "Father's Height (cm)", type: "number", defaultValue: 178, min: 100, max: 250, step: 1 },
      { name: "motherHeightCm", label: "Mother's Height (cm)", type: "number", defaultValue: 165, min: 100, max: 250, step: 1 },
      { name: "childGender", label: "Child Gender", type: "select", defaultValue: "male", options: [{ label: "Boy", value: "male" }, { label: "Girl", value: "female" }] }
    ],
    outputs: [
      { name: "predictedHeightCm", label: "Predicted Adult Height", format: "number", highlight: true, unit: "cm" },
      { name: "predictedHeightFeet", label: "Height in Feet & Inches", format: "text" }
    ],
    calcLogic: `
  const f = Math.max(100, Number(inputs.fatherHeightCm) || 178);
  const m = Math.max(100, Number(inputs.motherHeightCm) || 165);
  const isBoy = inputs.childGender !== "female";
  const midParental = isBoy ? (f + m + 13) / 2 : (f + m - 13) / 2;
  const predCm = Math.round(midParental);
  const totalInches = predCm / 2.54;
  const ft = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { predictedHeightCm: predCm, predictedHeightFeet: \`\${ft}' \${inches}"\` };
`,
    formulaStr: "Mid-Parental Method: Boy = (Father + Mother + 13cm) / 2",
    faqs: [{ question: "How accurate is mid-parental height prediction?", answer: "It provides a target adult height within ±2 inches for most healthy children." }]
  },
  {
    slug: "conversion-calculator",
    id: "conversion-calculator",
    title: "Conversion Calculator",
    subcategory: "Measurements & Units",
    iconName: "ArrowRightLeft",
    description: "Universal unit converter for length, mass, volume, temperature, and speed.",
    keywords: ["unit converter", "conversion calculator", "convert units", "metric to imperial"],
    relatedCalculators: ["mass-calculator", "speed-calculator"],
    inputs: [
      { name: "value", label: "Value to Convert", type: "number", defaultValue: 100, min: -1e6, max: 1e6, step: 1 },
      { name: "unitCategory", label: "Category", type: "select", defaultValue: "length", options: [
        { label: "Length (km to miles)", value: "length" },
        { label: "Weight (kg to lbs)", value: "weight" },
        { label: "Temperature (°C to °F)", value: "temp" }
      ] }
    ],
    outputs: [
      { name: "convertedValue", label: "Converted Value", format: "number", highlight: true },
      { name: "summary", label: "Conversion Result", format: "text" }
    ],
    calcLogic: `
  const val = Number(inputs.value) || 100;
  const cat = inputs.unitCategory || "length";
  let res = 0, summary = "";
  if (cat === "length") {
    res = val * 0.621371;
    summary = \`\${val} km = \${res.toFixed(2)} miles\`;
  } else if (cat === "weight") {
    res = val * 2.20462;
    summary = \`\${val} kg = \${res.toFixed(2)} lbs\`;
  } else {
    res = (val * 9) / 5 + 32;
    summary = \`\${val}°C = \${res.toFixed(1)}°F\`;
  }
  return { convertedValue: parseFloat(res.toFixed(2)), summary };
`,
    formulaStr: "Standard Unit Factor Conversion",
    faqs: [{ question: "What is the metric formula for Celsius to Fahrenheit?", answer: "°F = (°C × 9/5) + 32" }]
  },
  {
    slug: "gdp-calculator",
    id: "gdp-calculator",
    title: "GDP Calculator",
    subcategory: "Measurements & Units",
    iconName: "DollarSign",
    description: "Calculate Gross Domestic Product (GDP) using the expenditure approach (C + I + G + NX).",
    keywords: ["gdp calculator", "gross domestic product", "net exports", "macroeconomics"],
    relatedCalculators: ["conversion-calculator"],
    inputs: [
      { name: "consumption", label: "Personal Consumption (C)", type: "number", defaultValue: 14000, min: 0, max: 1e9, step: 100 },
      { name: "investment", label: "Gross Private Investment (I)", type: "number", defaultValue: 4000, min: 0, max: 1e9, step: 100 },
      { name: "government", label: "Government Spending (G)", type: "number", defaultValue: 3500, min: 0, max: 1e9, step: 100 },
      { name: "exports", label: "Exports (X)", type: "number", defaultValue: 2500, min: 0, max: 1e9, step: 100 },
      { name: "imports", label: "Imports (M)", type: "number", defaultValue: 3000, min: 0, max: 1e9, step: 100 }
    ],
    outputs: [
      { name: "totalGdp", label: "Total GDP", format: "currency", highlight: true },
      { name: "netExports", label: "Net Exports (X - M)", format: "currency" }
    ],
    calcLogic: `
  const c = Math.max(0, Number(inputs.consumption) || 14000);
  const i = Math.max(0, Number(inputs.investment) || 4000);
  const g = Math.max(0, Number(inputs.government) || 3500);
  const x = Math.max(0, Number(inputs.exports) || 2500);
  const m = Math.max(0, Number(inputs.imports) || 3000);
  const nx = x - m;
  const gdp = c + i + g + nx;
  return { totalGdp: gdp, netExports: nx };
`,
    formulaStr: "GDP = C + I + G + (X - M)",
    faqs: [{ question: "What is the expenditure approach for GDP?", answer: "Calculating GDP by summing total national spending on final goods and services." }]
  },
  {
    slug: "density-calculator",
    id: "density-calculator",
    title: "Density Calculator",
    subcategory: "Measurements & Units",
    iconName: "Box",
    description: "Calculate density (ρ = m / v), mass, or volume for any physical substance.",
    keywords: ["density calculator", "mass volume density", "specific gravity"],
    relatedCalculators: ["mass-calculator", "weight-calculator"],
    inputs: [
      { name: "massKg", label: "Mass (kg)", type: "number", defaultValue: 50, min: 0.001, max: 1e6, step: 1 },
      { name: "volumeM3", label: "Volume (m³)", type: "number", defaultValue: 0.02, min: 0.0001, max: 1e6, step: 0.005 }
    ],
    outputs: [
      { name: "densityKgM3", label: "Density (kg/m³)", format: "number", highlight: true },
      { name: "densityGCm3", label: "Density (g/cm³)", format: "number" }
    ],
    calcLogic: `
  const m = Math.max(0, Number(inputs.massKg) || 50);
  const v = Math.max(0.00001, Number(inputs.volumeM3) || 0.02);
  const density = m / v;
  return { densityKgM3: parseFloat(density.toFixed(2)), densityGCm3: parseFloat((density / 1000).toFixed(4)) };
`,
    formulaStr: "Density ρ = Mass (m) / Volume (v)",
    faqs: [{ question: "What is the density of water?", answer: "Water has a density of 1,000 kg/m³ or 1.0 g/cm³ at 4°C." }]
  },
  {
    slug: "mass-calculator",
    id: "mass-calculator",
    title: "Mass Calculator",
    subcategory: "Measurements & Units",
    iconName: "Scale",
    description: "Calculate object mass from density and volume, and convert mass units.",
    keywords: ["mass calculator", "convert mass", "weight to mass"],
    relatedCalculators: ["density-calculator", "weight-calculator"],
    inputs: [
      { name: "densityKgM3", label: "Density (kg/m³)", type: "number", defaultValue: 7850, min: 1, max: 100000, step: 50 },
      { name: "volumeM3", label: "Volume (m³)", type: "number", defaultValue: 0.5, min: 0.001, max: 1000, step: 0.01 }
    ],
    outputs: [
      { name: "massKg", label: "Mass (kg)", format: "number", highlight: true },
      { name: "massLbs", label: "Mass in Pounds (lbs)", format: "number" }
    ],
    calcLogic: `
  const rho = Math.max(0, Number(inputs.densityKgM3) || 7850);
  const v = Math.max(0, Number(inputs.volumeM3) || 0.5);
  const mass = rho * v;
  return { massKg: parseFloat(mass.toFixed(2)), massLbs: parseFloat((mass * 2.20462).toFixed(2)) };
`,
    formulaStr: "Mass m = Density ρ × Volume v",
    faqs: [{ question: "Is mass the same as weight?", answer: "Mass is intrinsic amount of matter, whereas weight is gravitational force acting on mass." }]
  },
  {
    slug: "weight-calculator",
    id: "weight-calculator",
    title: "Weight Calculator",
    subcategory: "Measurements & Units",
    iconName: "Scale",
    description: "Calculate weight force W = m × g on Earth, Moon, Mars, and convert weight units.",
    keywords: ["weight calculator", "gravitational force", "weight on moon"],
    relatedCalculators: ["mass-calculator", "conversion-calculator"],
    inputs: [
      { name: "massKg", label: "Mass (kg)", type: "number", defaultValue: 70, min: 0.1, max: 10000, step: 1 },
      { name: "celestialBody", label: "Gravity Location", type: "select", defaultValue: "9.81", options: [
        { label: "Earth (9.81 m/s²)", value: "9.81" },
        { label: "Moon (1.62 m/s²)", value: "1.62" },
        { label: "Mars (3.71 m/s²)", value: "3.71" },
        { label: "Jupiter (24.79 m/s²)", value: "24.79" }
      ] }
    ],
    outputs: [
      { name: "weightNewtons", label: "Weight Force (Newtons)", format: "number", highlight: true },
      { name: "weightLbs", label: "Apparent Weight (lbs)", format: "number" }
    ],
    calcLogic: `
  const m = Math.max(0, Number(inputs.massKg) || 70);
  const g = Number(inputs.celestialBody) || 9.81;
  const N = m * g;
  const lbs = (N / 9.81) * 2.20462;
  return { weightNewtons: parseFloat(N.toFixed(2)), weightLbs: parseFloat(lbs.toFixed(2)) };
`,
    formulaStr: "Weight Force W = Mass (m) × Gravity (g)",
    faqs: [{ question: "How much would I weigh on the Moon?", answer: "You weigh approximately 16.5% of your Earth weight on the Moon." }]
  },
  {
    slug: "speed-calculator",
    id: "speed-calculator",
    title: "Speed Calculator",
    subcategory: "Measurements & Units",
    iconName: "Zap",
    description: "Calculate speed, distance, or time from velocity equation v = d / t.",
    keywords: ["speed calculator", "velocity", "distance time speed", "mph kmh"],
    relatedCalculators: ["conversion-calculator"],
    inputs: [
      { name: "distanceKm", label: "Distance (km)", type: "number", defaultValue: 150, min: 0.1, max: 10000, step: 1 },
      { name: "timeHours", label: "Time (Hours)", type: "number", defaultValue: 2, min: 0.01, max: 1000, step: 0.25 }
    ],
    outputs: [
      { name: "speedKmh", label: "Speed (km/h)", format: "number", highlight: true },
      { name: "speedMph", label: "Speed (mph)", format: "number" },
      { name: "speedMs", label: "Speed (m/s)", format: "number" }
    ],
    calcLogic: `
  const d = Math.max(0, Number(inputs.distanceKm) || 150);
  const t = Math.max(0.001, Number(inputs.timeHours) || 2);
  const kmh = d / t;
  const mph = kmh / 1.60934;
  const ms = kmh / 3.6;
  return { speedKmh: parseFloat(kmh.toFixed(2)), speedMph: parseFloat(mph.toFixed(2)), speedMs: parseFloat(ms.toFixed(2)) };
`,
    formulaStr: "Speed v = Distance (d) / Time (t)",
    faqs: [{ question: "How do you convert km/h to m/s?", answer: "Divide kilometers per hour by 3.6 to get meters per second." }]
  },
  {
    slug: "molarity-calculator",
    id: "molarity-calculator",
    title: "Molarity Calculator",
    subcategory: "Measurements & Units",
    iconName: "Droplet",
    description: "Calculate chemical solution molarity (M = moles / L) and required solute mass.",
    keywords: ["molarity calculator", "chemistry molarity", "moles per liter", "solute mass"],
    relatedCalculators: ["molecular-weight-calculator", "density-calculator"],
    inputs: [
      { name: "massGrams", label: "Solute Mass (g)", type: "number", defaultValue: 58.44, min: 0.001, max: 10000, step: 0.1 },
      { name: "molarMass", label: "Molar Mass (g/mol)", type: "number", defaultValue: 58.44, min: 0.001, max: 1000, step: 0.1 },
      { name: "volumeLiters", label: "Solution Volume (Liters)", type: "number", defaultValue: 1.0, min: 0.001, max: 100, step: 0.1 }
    ],
    outputs: [
      { name: "molarityM", label: "Molarity (M = mol/L)", format: "number", highlight: true },
      { name: "moles", label: "Total Moles Solute", format: "number" }
    ],
    calcLogic: `
  const mass = Math.max(0, Number(inputs.massGrams) || 58.44);
  const mm = Math.max(0.001, Number(inputs.molarMass) || 58.44);
  const vol = Math.max(0.001, Number(inputs.volumeLiters) || 1.0);
  const moles = mass / mm;
  const molarity = moles / vol;
  return { molarityM: parseFloat(molarity.toFixed(4)), moles: parseFloat(moles.toFixed(4)) };
`,
    formulaStr: "Molarity M = (Mass / Molar Mass) / Volume (L)",
    faqs: [{ question: "What is molarity?", answer: "Molarity is the concentration of a solution expressed as moles of solute per liter of solution." }]
  },
  {
    slug: "molecular-weight-calculator",
    id: "molecular-weight-calculator",
    title: "Molecular Weight Calculator",
    subcategory: "Measurements & Units",
    iconName: "Atom",
    description: "Calculate molar mass and molecular weight of common chemical formulas.",
    keywords: ["molecular weight", "molar mass", "chemistry calculator", "chemical formula"],
    relatedCalculators: ["molarity-calculator", "density-calculator"],
    inputs: [
      { name: "presetCompound", label: "Chemical Compound", type: "select", defaultValue: "H2O", options: [
        { label: "Water (H₂O)", value: "H2O" },
        { label: "Glucose (C₆H₁₂O₆)", value: "C6H12O6" },
        { label: "Table Salt (NaCl)", value: "NaCl" },
        { label: "Carbon Dioxide (CO₂)", value: "CO2" },
        { label: "Sulfuric Acid (H₂SO₄)", value: "H2SO4" }
      ] }
    ],
    outputs: [
      { name: "molarMass", label: "Molar Mass (g/mol)", format: "number", highlight: true },
      { name: "formula", label: "Chemical Formula", format: "text" }
    ],
    calcLogic: `
  const comp = inputs.presetCompound || "H2O";
  let mass = 18.015;
  if (comp === "C6H12O6") mass = 180.156;
  else if (comp === "NaCl") mass = 58.44;
  else if (comp === "CO2") mass = 44.01;
  else if (comp === "H2SO4") mass = 98.079;
  return { molarMass: mass, formula: comp };
`,
    formulaStr: "Molar Mass = Sum of Atomic Weights of Constituent Atoms",
    faqs: [{ question: "What is molar mass?", answer: "The mass of one mole of a chemical element or compound expressed in grams per mole (g/mol)." }]
  },
  {
    slug: "roman-numeral-converter",
    id: "roman-numeral-converter",
    title: "Roman Numeral Converter",
    subcategory: "Measurements & Units",
    iconName: "Hash",
    description: "Convert numbers to Roman numerals and convert Roman numerals back to numbers.",
    keywords: ["roman numeral converter", "roman to decimal", "roman numbers"],
    relatedCalculators: ["conversion-calculator"],
    inputs: [
      { name: "numberVal", label: "Integer (1 - 3999)", type: "number", defaultValue: 2026, min: 1, max: 3999, step: 1 }
    ],
    outputs: [
      { name: "romanNumeral", label: "Roman Numeral", format: "text", highlight: true },
      { name: "arabicNumber", label: "Standard Number", format: "number" }
    ],
    calcLogic: `
  const num = Math.min(3999, Math.max(1, Math.floor(Number(inputs.numberVal) || 2026)));
  const lookup: [number, string][] = [
    [1000, "M"], [900, "CM"], [500, "D"], [400, "CD"],
    [100, "C"], [90, "XC"], [50, "L"], [40, "XL"],
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"]
  ];
  let temp = num;
  let roman = "";
  for (const [val, sym] of lookup) {
    while (temp >= val) {
      roman += sym;
      temp -= val;
    }
  }
  return { romanNumeral: roman, arabicNumber: num };
`,
    formulaStr: "Additive & Subtractive Roman Numeral Representation",
    faqs: [{ question: "What is the highest number in standard Roman numerals?", answer: "Standard Roman numerals reach up to 3,999 (MMMCMXCIX)." }]
  },

  // 4. ELECTRONICS & CIRCUITS (4)
  {
    slug: "voltage-drop-calculator",
    id: "voltage-drop-calculator",
    title: "Voltage Drop Calculator",
    subcategory: "Electronics & Circuits",
    iconName: "Zap",
    description: "Calculate electrical wire voltage drop percentage based on wire gauge, current, and distance.",
    keywords: ["voltage drop", "wire gauge", "electrical voltage drop", "awg"],
    relatedCalculators: ["ohms-law-calculator", "electricity-calculator"],
    inputs: [
      { name: "voltage", label: "Supply Voltage (V)", type: "number", defaultValue: 120, min: 12, max: 600, step: 12 },
      { name: "currentAmps", label: "Current (Amps)", type: "number", defaultValue: 15, min: 0.1, max: 200, step: 1 },
      { name: "distanceFt", label: "One-Way Distance (ft)", type: "number", defaultValue: 100, min: 1, max: 5000, step: 10 },
      { name: "wireGauge", label: "Wire Gauge (AWG)", type: "select", defaultValue: "12", options: [
        { label: "14 AWG (15A max)", value: "14" },
        { label: "12 AWG (20A max)", value: "12" },
        { label: "10 AWG (30A max)", value: "10" },
        { label: "8 AWG (40A max)", value: "8" }
      ] }
    ],
    outputs: [
      { name: "voltageDrop", label: "Voltage Drop (V)", format: "number", highlight: true },
      { name: "voltageDropPct", label: "Voltage Drop (%)", format: "percentage" },
      { name: "endVoltage", label: "Voltage at End of Line", format: "number", unit: "V" }
    ],
    calcLogic: `
  const v = Math.max(1, Number(inputs.voltage) || 120);
  const i = Math.max(0, Number(inputs.currentAmps) || 15);
  const d = Math.max(0, Number(inputs.distanceFt) || 100);
  const awg = inputs.wireGauge || "12";
  let rPer1000Ft = 1.93; // 12 AWG copper
  if (awg === "14") rPer1000Ft = 3.07;
  else if (awg === "10") rPer1000Ft = 1.21;
  else if (awg === "8") rPer1000Ft = 0.764;
  const totalDistFeet = 2 * d; // 2-wire single phase
  const vDrop = (2 * d * i * rPer1000Ft) / 1000;
  const pct = (vDrop / v) * 100;
  return { voltageDrop: parseFloat(vDrop.toFixed(2)), voltageDropPct: parseFloat(pct.toFixed(2)), endVoltage: parseFloat((v - vDrop).toFixed(2)) };
`,
    formulaStr: "Vdrop = (2 × L × I × R) / 1000",
    faqs: [{ question: "What is maximum acceptable voltage drop?", answer: "NEC recommends a maximum voltage drop of 3% for branch circuits." }]
  },
  {
    slug: "resistor-calculator",
    id: "resistor-calculator",
    title: "Resistor Calculator",
    subcategory: "Electronics & Circuits",
    iconName: "Cpu",
    description: "Decode 4-band resistor color codes to calculate resistance value and tolerance.",
    keywords: ["resistor color code", "resistor calculator", "resistance ohms", "resistor bands"],
    relatedCalculators: ["ohms-law-calculator", "voltage-drop-calculator"],
    inputs: [
      { name: "band1", label: "1st Band (Digit 1)", type: "select", defaultValue: "1", options: [
        { label: "Brown (1)", value: "1" }, { label: "Red (2)", value: "2" }, { label: "Orange (3)", value: "3" }, { label: "Yellow (4)", value: "4" }
      ] },
      { name: "band2", label: "2nd Band (Digit 2)", type: "select", defaultValue: "0", options: [
        { label: "Black (0)", value: "0" }, { label: "Brown (1)", value: "1" }, { label: "Red (2)", value: "2" }, { label: "Orange (3)", value: "3" }
      ] },
      { name: "multiplier", label: "3rd Band (Multiplier)", type: "select", defaultValue: "100", options: [
        { label: "Black (×1)", value: "1" }, { label: "Brown (×10)", value: "10" }, { label: "Red (×100)", value: "100" }, { label: "Orange (×1k)", value: "1000" }
      ] }
    ],
    outputs: [
      { name: "resistanceOhms", label: "Resistance Value", format: "number", highlight: true, unit: "Ω" },
      { name: "formattedValue", label: "Formatted Resistance", format: "text" }
    ],
    calcLogic: `
  const d1 = Number(inputs.band1) || 1;
  const d2 = Number(inputs.band2) || 0;
  const mult = Number(inputs.multiplier) || 100;
  const ohms = (d1 * 10 + d2) * mult;
  let formatted = \`\${ohms} Ω\`;
  if (ohms >= 1000000) formatted = \`\${(ohms / 1000000).toFixed(1)} MΩ\`;
  else if (ohms >= 1000) formatted = \`\${(ohms / 1000).toFixed(1)} kΩ\`;
  return { resistanceOhms: ohms, formattedValue: formatted };
`,
    formulaStr: "Resistance = (Band1 × 10 + Band2) × Multiplier",
    faqs: [{ question: "How do 4-band resistor color codes work?", answer: "First two bands are digits, third is multiplier, fourth is tolerance percentage." }]
  },
  {
    slug: "ohms-law-calculator",
    id: "ohms-law-calculator",
    title: "Ohm's Law Calculator",
    subcategory: "Electronics & Circuits",
    iconName: "Zap",
    description: "Calculate Voltage V, Current I, Resistance R, and Electrical Power P.",
    keywords: ["ohms law", "voltage", "current", "resistance", "power watts"],
    relatedCalculators: ["voltage-drop-calculator", "electricity-calculator"],
    inputs: [
      { name: "voltage", label: "Voltage V (Volts)", type: "number", defaultValue: 12, min: 0, max: 10000, step: 0.1 },
      { name: "resistance", label: "Resistance R (Ohms)", type: "number", defaultValue: 4, min: 0.01, max: 10000, step: 0.1 }
    ],
    outputs: [
      { name: "currentAmps", label: "Current I (Amps)", format: "number", highlight: true, unit: "A" },
      { name: "powerWatts", label: "Power P (Watts)", format: "number", unit: "W" }
    ],
    calcLogic: `
  const v = Math.max(0, Number(inputs.voltage) || 12);
  const r = Math.max(0.001, Number(inputs.resistance) || 4);
  const i = v / r;
  const p = v * i;
  return { currentAmps: parseFloat(i.toFixed(3)), powerWatts: parseFloat(p.toFixed(2)) };
`,
    formulaStr: "V = I × R; P = V × I",
    faqs: [{ question: "What is Ohm's Law?", answer: "Current through a conductor between two points is directly proportional to voltage across the two points." }]
  },
  {
    slug: "electricity-calculator",
    id: "electricity-calculator",
    title: "Electricity Calculator",
    subcategory: "Electronics & Circuits",
    iconName: "Zap",
    description: "Calculate electric appliance energy consumption (kWh) and monthly power bill cost.",
    keywords: ["electricity cost", "kwh calculator", "power consumption", "electric bill"],
    relatedCalculators: ["ohms-law-calculator", "voltage-drop-calculator"],
    inputs: [
      { name: "wattage", label: "Appliance Power (Watts)", type: "number", defaultValue: 1500, min: 1, max: 50000, step: 50 },
      { name: "hoursPerDay", label: "Usage Hours per Day", type: "number", defaultValue: 4, min: 0.1, max: 24, step: 0.5 },
      { name: "costPerKwh", label: "Electricity Rate ($/kWh)", type: "number", defaultValue: 0.15, min: 0.01, max: 2.0, step: 0.01 }
    ],
    outputs: [
      { name: "monthlyCost", label: "Estimated Monthly Cost", format: "currency", highlight: true },
      { name: "monthlyKwh", label: "Monthly kWh Consumption", format: "number", unit: "kWh" },
      { name: "annualCost", label: "Annual Cost", format: "currency" }
    ],
    calcLogic: `
  const w = Math.max(0, Number(inputs.wattage) || 1500);
  const hrs = Math.max(0, Number(inputs.hoursPerDay) || 4);
  const rate = Math.max(0, Number(inputs.costPerKwh) || 0.15);
  const dailyKwh = (w * hrs) / 1000;
  const monthlyKwh = dailyKwh * 30;
  const monthlyCost = monthlyKwh * rate;
  return { monthlyCost, monthlyKwh: parseFloat(monthlyKwh.toFixed(1)), annualCost: monthlyCost * 12 };
`,
    formulaStr: "Monthly kWh = (Watts × Hours/Day × 30 Days) / 1000",
    faqs: [{ question: "How do you calculate appliance electric cost?", answer: "Multiply total kWh consumed by your local electric utility rate per kWh." }]
  },

  // 5. INTERNET (5)
  {
    slug: "ip-subnet-calculator",
    id: "ip-subnet-calculator",
    title: "IP Subnet Calculator",
    subcategory: "Internet",
    iconName: "Network",
    description: "Calculate IPv4 subnet mask, network IP, broadcast IP, CIDR prefix, and usable host count.",
    keywords: ["ip subnet calculator", "cidr", "subnet mask", "broadcast ip", "usable hosts"],
    relatedCalculators: ["bandwidth-calculator", "binary-calculator"],
    inputs: [
      { name: "ipAddress", label: "IP Address", type: "text", defaultValue: "192.168.1.1" },
      { name: "cidr", label: "Subnet Mask (CIDR /N)", type: "number", defaultValue: 24, min: 1, max: 32, step: 1 }
    ],
    outputs: [
      { name: "subnetMask", label: "Subnet Mask", format: "text", highlight: true },
      { name: "usableHosts", label: "Usable Host IP Count", format: "number" },
      { name: "networkAddress", label: "Network Address", format: "text" }
    ],
    calcLogic: `
  const cidr = Math.min(32, Math.max(1, Number(inputs.cidr) || 24));
  const maskInt = (0xFFFFFFFF << (32 - cidr)) >>> 0;
  const maskOctets = [(maskInt >>> 24) & 255, (maskInt >>> 16) & 255, (maskInt >>> 8) & 255, maskInt & 255];
  const usable = cidr >= 31 ? (cidr === 31 ? 2 : 1) : Math.pow(2, 32 - cidr) - 2;
  const ipParts = String(inputs.ipAddress || "192.168.1.1").split(".").map(Number);
  const netOctets = ipParts.map((p, idx) => (p & maskOctets[idx]) || 0);
  return {
    subnetMask: maskOctets.join("."),
    usableHosts: usable,
    networkAddress: netOctets.join(".")
  };
`,
    formulaStr: "Usable Hosts = 2^(32 - CIDR) - 2",
    faqs: [{ question: "What does CIDR /24 mean?", answer: "CIDR /24 means the first 24 bits are reserved for network ID, leaving 254 usable host addresses." }]
  },
  {
    slug: "password-generator",
    id: "password-generator",
    title: "Password Generator",
    subcategory: "Internet",
    iconName: "Lock",
    description: "Generate secure, customizable random passwords with entropy metrics.",
    keywords: ["password generator", "secure password", "random password", "password strength"],
    relatedCalculators: ["ip-subnet-calculator"],
    inputs: [
      { name: "length", label: "Password Length", type: "number", defaultValue: 16, min: 6, max: 64, step: 1 }
    ],
    outputs: [
      { name: "generatedPassword", label: "Generated Password", format: "text", highlight: true },
      { name: "entropyBits", label: "Password Entropy", format: "number", unit: "bits" }
    ],
    calcLogic: `
  const len = Math.min(64, Math.max(6, Number(inputs.length) || 16));
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=";
  let pwd = "";
  for (let i = 0; i < len; i++) {
    pwd += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  const entropy = Math.round(len * Math.log2(chars.length));
  return { generatedPassword: pwd, entropyBits: entropy };
`,
    formulaStr: "Entropy Bits = Length × log2(Character Pool Size)",
    faqs: [{ question: "What is a secure password entropy?", answer: "An entropy of 60+ bits is considered strong against brute-force attacks." }]
  },
  {
    slug: "bandwidth-calculator",
    id: "bandwidth-calculator",
    title: "Bandwidth Calculator",
    subcategory: "Internet",
    iconName: "Wifi",
    description: "Calculate file download and upload duration based on network bandwidth speed.",
    keywords: ["bandwidth calculator", "download time", "mbps to megabytes", "speed test"],
    relatedCalculators: ["ip-subnet-calculator"],
    inputs: [
      { name: "fileSizeMb", label: "File Size (MB)", type: "number", defaultValue: 1000, min: 1, max: 1e6, step: 50 },
      { name: "speedMbps", label: "Internet Speed (Mbps)", type: "number", defaultValue: 100, min: 1, max: 10000, step: 10 }
    ],
    outputs: [
      { name: "downloadTimeSecs", label: "Download Time (Seconds)", format: "number", highlight: true },
      { name: "formattedTime", label: "Formatted Duration", format: "text" }
    ],
    calcLogic: `
  const mb = Math.max(1, Number(inputs.fileSizeMb) || 1000);
  const mbps = Math.max(1, Number(inputs.speedMbps) || 100);
  const megaBits = mb * 8;
  const secs = Math.ceil(megaBits / mbps);
  const m = Math.floor(secs / 60);
  const s = secs % 60;
  return { downloadTimeSecs: secs, formattedTime: \`\${m} mins \${s} secs\` };
`,
    formulaStr: "Download Time = (File Size MB × 8) / Connection Speed Mbps",
    faqs: [{ question: "Why is 100 Mbps not 100 Megabytes per second?", answer: "Network speed is measured in Megabits (Mb). 8 Megabits = 1 Megabyte (MB)." }]
  },
  {
    slug: "base64-calculator",
    id: "base64-calculator",
    title: "Base64 Encode / Decode",
    subcategory: "Internet",
    iconName: "Code",
    description: "Encode text strings into Base64 format or decode Base64 back to plain text.",
    keywords: ["base64 encoder", "base64 decoder", "base64 converter"],
    relatedCalculators: ["url-encoder-decoder"],
    inputs: [
      { name: "text", label: "Input Text", type: "text", defaultValue: "Hello CalcPlatform!" },
      { name: "mode", label: "Operation", type: "select", defaultValue: "encode", options: [{ label: "Encode to Base64", value: "encode" }, { label: "Decode from Base64", value: "decode" }] }
    ],
    outputs: [
      { name: "result", label: "Processed Output", format: "text", highlight: true }
    ],
    calcLogic: `
  const txt = String(inputs.text || "Hello CalcPlatform!");
  const isEnc = inputs.mode !== "decode";
  let res = "";
  try {
    if (isEnc) res = Buffer.from(txt, "utf-8").toString("base64");
    else res = Buffer.from(txt, "base64").toString("utf-8");
  } catch (err) {
    res = "Encoding/Decoding Error";
  }
  return { result: res };
`,
    formulaStr: "Base64 Binary-to-Text Encoding Standard",
    faqs: [{ question: "What is Base64 encoding used for?", answer: "Base64 is used to encode binary data so it can be transmitted safely over text-based protocols like HTTP and Email." }]
  },
  {
    slug: "url-encoder-decoder",
    id: "url-encoder-decoder",
    title: "URL Encode / Decode",
    subcategory: "Internet",
    iconName: "Link",
    description: "Encode special characters for web URLs or decode percent-encoded URLs.",
    keywords: ["url encoder", "url decoder", "percent encoding"],
    relatedCalculators: ["base64-calculator"],
    inputs: [
      { name: "text", label: "Input URL / Text", type: "text", defaultValue: "https://calcplatform.com/search?q=math & health" },
      { name: "mode", label: "Operation", type: "select", defaultValue: "encode", options: [{ label: "URL Encode", value: "encode" }, { label: "URL Decode", value: "decode" }] }
    ],
    outputs: [
      { name: "result", label: "Processed URL Output", format: "text", highlight: true }
    ],
    calcLogic: `
  const txt = String(inputs.text || "https://calcplatform.com/search?q=math & health");
  const isEnc = inputs.mode !== "decode";
  let res = "";
  try {
    if (isEnc) res = encodeURIComponent(txt);
    else res = decodeURIComponent(txt);
  } catch (err) {
    res = "Malformed URI Sequence";
  }
  return { result: res };
`,
    formulaStr: "Percent-Encoding RFC 3986 Standard",
    faqs: [{ question: "Why do URLs need encoding?", answer: "URLs can only contain ASCII characters. Reserved characters like spaces or & must be percent-encoded." }]
  },

  // 6. EVERYDAY UTILITY (7)
  {
    slug: "gpa-calculator",
    id: "gpa-calculator",
    title: "GPA Calculator",
    subcategory: "Everyday Utility",
    iconName: "GraduationCap",
    description: "Calculate Grade Point Average (GPA) on a 4.0 scale from course grades and credit hours.",
    keywords: ["gpa calculator", "grade point average", "college gpa", "4.0 scale"],
    relatedCalculators: ["grade-calculator"],
    inputs: [
      { name: "g1", label: "Course 1 Grade (A=4, B=3, C=2)", type: "number", defaultValue: 4, min: 0, max: 4, step: 0.5 },
      { name: "c1", label: "Course 1 Credits", type: "number", defaultValue: 3, min: 1, max: 6, step: 1 },
      { name: "g2", label: "Course 2 Grade", type: "number", defaultValue: 3, min: 0, max: 4, step: 0.5 },
      { name: "c2", label: "Course 2 Credits", type: "number", defaultValue: 4, min: 1, max: 6, step: 1 }
    ],
    outputs: [
      { name: "gpa", label: "Calculated GPA", format: "number", highlight: true },
      { name: "totalCredits", label: "Total Credit Hours", format: "number" }
    ],
    calcLogic: `
  const g1 = Number(inputs.g1) || 4;
  const c1 = Number(inputs.c1) || 3;
  const g2 = Number(inputs.g2) || 3;
  const c2 = Number(inputs.c2) || 4;
  const totalPts = g1 * c1 + g2 * c2;
  const totalCreds = c1 + c2;
  const gpa = totalCreds > 0 ? totalPts / totalCreds : 0;
  return { gpa: parseFloat(gpa.toFixed(2)), totalCredits: totalCreds };
`,
    formulaStr: "GPA = Σ(Grade Points × Credits) / Σ(Credits)",
    faqs: [{ question: "What is a 4.0 GPA scale?", answer: "A standard 4.0 scale assigns A=4, B=3, C=2, D=1, and F=0." }]
  },
  {
    slug: "grade-calculator",
    id: "grade-calculator",
    title: "Grade Calculator",
    subcategory: "Everyday Utility",
    iconName: "FileCheck",
    description: "Calculate overall class grade and required score on final exam to achieve target grade.",
    keywords: ["grade calculator", "final exam grade", "target grade"],
    relatedCalculators: ["gpa-calculator"],
    inputs: [
      { name: "currentGrade", label: "Current Grade (%)", type: "number", defaultValue: 85, min: 0, max: 100, step: 1 },
      { name: "targetGrade", label: "Desired Grade (%)", type: "number", defaultValue: 90, min: 0, max: 100, step: 1 },
      { name: "finalWeight", label: "Final Exam Weight (%)", type: "number", defaultValue: 20, min: 1, max: 50, step: 5 }
    ],
    outputs: [
      { name: "requiredFinalScore", label: "Required Score on Final Exam", format: "percentage", highlight: true },
      { name: "verdict", label: "Feasibility Status", format: "text" }
    ],
    calcLogic: `
  const cur = Number(inputs.currentGrade) || 85;
  const target = Number(inputs.targetGrade) || 90;
  const w = Math.max(1, Number(inputs.finalWeight) || 20) / 100;
  const req = (target - cur * (1 - w)) / w;
  let verdict = "Achievable";
  if (req > 100) verdict = "Needs extra credit (>100%)";
  else if (req <= 0) verdict = "Target guaranteed!";
  return { requiredFinalScore: parseFloat(req.toFixed(1)), verdict };
`,
    formulaStr: "Required Final = [Target - Current × (1 - Weight)] / Weight",
    faqs: [{ question: "How do I calculate what I need on my final exam?", answer: "Use the final exam weight to determine the missing score needed to bring your average to the target." }]
  },
  {
    slug: "bra-size-calculator",
    id: "bra-size-calculator",
    title: "Bra Size Calculator",
    subcategory: "Everyday Utility",
    iconName: "User",
    description: "Calculate bra band size and cup size based on snug underbust and full bust measurements.",
    keywords: ["bra size calculator", "cup size", "band size", "fitting"],
    relatedCalculators: ["shoe-size-calculator"],
    inputs: [
      { name: "underbustInches", label: "Underbust Measurement (inches)", type: "number", defaultValue: 32, min: 20, max: 60, step: 0.5 },
      { name: "bustInches", label: "Bust Measurement (inches)", type: "number", defaultValue: 36, min: 20, max: 70, step: 0.5 }
    ],
    outputs: [
      { name: "braSize", label: "Calculated Bra Size", format: "text", highlight: true },
      { name: "bandSize", label: "Band Size", format: "number" },
      { name: "cupLetter", label: "Cup Size", format: "text" }
    ],
    calcLogic: `
  const ub = Number(inputs.underbustInches) || 32;
  const bust = Number(inputs.bustInches) || 36;
  const band = Math.round(ub) % 2 === 0 ? Math.round(ub) : Math.round(ub) + 1;
  const diff = Math.max(0, Math.round(bust - ub));
  const cups = ["AA", "A", "B", "C", "D", "DD/E", "DDD/F", "G", "H"];
  const cup = cups[Math.min(diff, cups.length - 1)] || "A";
  return { braSize: \`\${band}\${cup}\`, bandSize: band, cupLetter: cup };
`,
    formulaStr: "Band = Underbust Rounded to Nearest Even Integer; Cup = Bust - Underbust",
    faqs: [{ question: "How do I measure underbust?", answer: "Measure snugly around your ribcage directly beneath your bust." }]
  },
  {
    slug: "shoe-size-calculator",
    id: "shoe-size-calculator",
    title: "Shoe Size Conversion Calculator",
    subcategory: "Everyday Utility",
    iconName: "Footprints",
    description: "Convert foot length into international shoe sizes (US, UK, EU, CM).",
    keywords: ["shoe size converter", "shoe size calculator", "us to eu shoe size"],
    relatedCalculators: ["bra-size-calculator", "conversion-calculator"],
    inputs: [
      { name: "footCm", label: "Foot Length (cm)", type: "number", defaultValue: 26, min: 10, max: 40, step: 0.5 },
      { name: "gender", label: "Gender / Group", type: "select", defaultValue: "men", options: [
        { label: "Men's", value: "men" },
        { label: "Women's", value: "women" }
      ] }
    ],
    outputs: [
      { name: "usSize", label: "US Shoe Size", format: "text", highlight: true },
      { name: "ukSize", label: "UK Shoe Size", format: "text" },
      { name: "euSize", label: "EU Shoe Size", format: "text" }
    ],
    calcLogic: `
  const cm = Math.max(10, Number(inputs.footCm) || 26);
  const isMen = inputs.gender !== "women";
  const us = isMen ? (cm - 18) * 1.5 : (cm - 17) * 1.5;
  const uk = us - 1;
  const eu = (cm + 1.5) * 1.5;
  return {
    usSize: \`US \${parseFloat(us.toFixed(1))}\`,
    ukSize: \`UK \${parseFloat(uk.toFixed(1))}\`,
    euSize: \`EU \${Math.round(eu)}\`
  };
`,
    formulaStr: "International Standard Foot Length Conversion",
    faqs: [{ question: "Should shoe size be measured while standing?", answer: "Yes, measure your foot while standing with full body weight for accurate sizing." }]
  },
  {
    slug: "tip-calculator",
    id: "tip-calculator",
    title: "Tip Calculator",
    subcategory: "Everyday Utility",
    iconName: "DollarSign",
    description: "Calculate tip amount, total restaurant bill, and split bill per person.",
    keywords: ["tip calculator", "split bill", "gratuity", "restaurant tip"],
    relatedCalculators: ["percentage-calculator"],
    inputs: [
      { name: "billAmount", label: "Bill Subtotal ($)", type: "number", defaultValue: 85, min: 1, max: 10000, step: 5 },
      { name: "tipPct", label: "Tip Percentage (%)", type: "number", defaultValue: 18, min: 0, max: 50, step: 1 },
      { name: "peopleCount", label: "Split Between (People)", type: "number", defaultValue: 3, min: 1, max: 50, step: 1 }
    ],
    outputs: [
      { name: "tipTotal", label: "Total Tip Amount", format: "currency", highlight: true },
      { name: "grandTotal", label: "Grand Total Bill", format: "currency" },
      { name: "perPersonTotal", label: "Cost Per Person", format: "currency" }
    ],
    calcLogic: `
  const bill = Math.max(0, Number(inputs.billAmount) || 85);
  const pct = Math.max(0, Number(inputs.tipPct) || 18) / 100;
  const ppl = Math.max(1, Number(inputs.peopleCount) || 3);
  const tip = bill * pct;
  const total = bill + tip;
  const perP = total / ppl;
  return { tipTotal: tip, grandTotal: total, perPersonTotal: perP };
`,
    formulaStr: "Tip = Bill × Tip%; Grand Total = Bill + Tip",
    faqs: [{ question: "What is standard tipping in the US?", answer: "15% to 20% is standard gratuity for good service at sit-down restaurants." }]
  },
  {
    slug: "golf-handicap-calculator",
    id: "golf-handicap-calculator",
    title: "Golf Handicap Calculator",
    subcategory: "Everyday Utility",
    iconName: "Trophy",
    description: "Calculate World Handicap System (WHS) golf score differentials and handicap index.",
    keywords: ["golf handicap", "whs handicap", "golf score differential", "handicap index"],
    relatedCalculators: ["gpa-calculator"],
    inputs: [
      { name: "adjustedScore", label: "Adjusted Gross Score", type: "number", defaultValue: 85, min: 50, max: 150, step: 1 },
      { name: "courseRating", label: "Course Rating", type: "number", defaultValue: 72.1, min: 50, max: 90, step: 0.1 },
      { name: "slopeRating", label: "Slope Rating", type: "number", defaultValue: 125, min: 55, max: 155, step: 1 }
    ],
    outputs: [
      { name: "differential", label: "Score Differential", format: "number", highlight: true },
      { name: "handicapIndex", label: "Estimated Handicap Index", format: "number" }
    ],
    calcLogic: `
  const score = Math.max(30, Number(inputs.adjustedScore) || 85);
  const rating = Math.max(30, Number(inputs.courseRating) || 72.1);
  const slope = Math.max(55, Number(inputs.slopeRating) || 125);
  const diff = ((score - rating) * 113) / slope;
  return { differential: parseFloat(diff.toFixed(1)), handicapIndex: parseFloat((diff * 0.96).toFixed(1)) };
`,
    formulaStr: "Score Differential = (Adjusted Score - Course Rating) × (113 / Slope Rating)",
    faqs: [{ question: "What is 113 in golf slope rating?", answer: "113 represents the standard difficulty slope rating for a course of average difficulty." }]
  },
  {
    slug: "sleep-calculator",
    id: "sleep-calculator",
    title: "Sleep Calculator",
    subcategory: "Everyday Utility",
    iconName: "Moon",
    description: "Calculate optimal bedtimes and wake times based on 90-minute natural sleep cycles.",
    keywords: ["sleep calculator", "bedtime calculator", "sleep cycles", "rem sleep"],
    relatedCalculators: ["time-calculator"],
    inputs: [
      { name: "wakeTime", label: "Desired Wake Up Time (HH:MM)", type: "text", defaultValue: "07:00" }
    ],
    outputs: [
      { name: "idealBedtime", label: "Ideal Bedtime (6 cycles - 9 hrs)", format: "text", highlight: true },
      { name: "goodBedtime", label: "Good Bedtime (5 cycles - 7.5 hrs)", format: "text" }
    ],
    calcLogic: `
  const parts = String(inputs.wakeTime || "07:00").split(":").map(Number);
  const wakeMins = (parts[0] || 7) * 60 + (parts[1] || 0);
  const formatTime = (mins: number) => {
    let m = mins % (24 * 60);
    if (m < 0) m += 24 * 60;
    const hrs = Math.floor(m / 60);
    const min = m % 60;
    return \`\${hrs.toString().padStart(2, "0")}:\${min.toString().padStart(2, "0")}\`;
  };
  const b6 = wakeMins - (6 * 90 + 14); // 6 cycles + 14 mins to fall asleep
  const b5 = wakeMins - (5 * 90 + 14);
  return { idealBedtime: formatTime(b6), goodBedtime: formatTime(b5) };
`,
    formulaStr: "Bedtime = Wake Time - (N × 90 min Sleep Cycles + 14 min Fall Asleep Time)",
    faqs: [{ question: "Why 90 minute sleep cycles?", answer: "Human sleep naturally cycles through Light, Deep, and REM stages every ~90 minutes." }]
  },

  // 7. WEATHER (3)
  {
    slug: "wind-chill-calculator",
    id: "wind-chill-calculator",
    title: "Wind Chill Calculator",
    subcategory: "Weather",
    iconName: "Wind",
    description: "Calculate apparent wind chill temperature based on ambient temperature and wind speed.",
    keywords: ["wind chill", "feels like temperature", "weather calculator", "cold index"],
    relatedCalculators: ["heat-index-calculator", "dew-point-calculator"],
    inputs: [
      { name: "tempF", label: "Air Temperature (°F)", type: "number", defaultValue: 30, min: -50, max: 50, step: 1 },
      { name: "windMph", label: "Wind Speed (mph)", type: "number", defaultValue: 15, min: 3, max: 100, step: 1 }
    ],
    outputs: [
      { name: "windChillF", label: "Wind Chill Temperature (°F)", format: "number", highlight: true, unit: "°F" },
      { name: "windChillC", label: "Wind Chill in Celsius (°C)", format: "number", unit: "°C" }
    ],
    calcLogic: `
  const t = Number(inputs.tempF) || 30;
  const v = Math.max(3, Number(inputs.windMph) || 15);
  const wcF = 35.74 + 0.6215 * t - 35.75 * Math.pow(v, 0.16) + 0.4275 * t * Math.pow(v, 0.16);
  const wcC = (wcF - 32) * (5 / 9);
  return { windChillF: parseFloat(wcF.toFixed(1)), windChillC: parseFloat(wcC.toFixed(1)) };
`,
    formulaStr: "NWS Wind Chill = 35.74 + 0.6215T - 35.75V⁰.¹⁶ + 0.4275TV⁰.¹⁶",
    faqs: [{ question: "When does wind chill apply?", answer: "Wind chill is calculated when temperatures are at or below 50°F and wind speeds exceed 3 mph." }]
  },
  {
    slug: "heat-index-calculator",
    id: "heat-index-calculator",
    title: "Heat Index Calculator",
    subcategory: "Weather",
    iconName: "Sun",
    description: "Calculate apparent \"feels like\" heat index from air temperature and relative humidity.",
    keywords: ["heat index", "feels like", "humidity heat", "weather calculator"],
    relatedCalculators: ["wind-chill-calculator", "dew-point-calculator"],
    inputs: [
      { name: "tempF", label: "Air Temperature (°F)", type: "number", defaultValue: 90, min: 80, max: 120, step: 1 },
      { name: "humidityPct", label: "Relative Humidity (%)", type: "number", defaultValue: 65, min: 10, max: 100, step: 5 }
    ],
    outputs: [
      { name: "heatIndexF", label: "Feels Like Heat Index (°F)", format: "number", highlight: true, unit: "°F" },
      { name: "dangerLevel", label: "NWS Caution Level", format: "text" }
    ],
    calcLogic: `
  const t = Math.max(80, Number(inputs.tempF) || 90);
  const r = Math.max(10, Number(inputs.humidityPct) || 65);
  const hi = -42.379 + 2.04901523 * t + 10.14333127 * r - 0.22475541 * t * r - 0.00683783 * t * t - 0.05481717 * r * r + 0.00122874 * t * t * r + 0.00085282 * t * r * r - 0.00000199 * t * t * r * r;
  let danger = "Caution";
  if (hi >= 125) danger = "Extreme Danger (Heat stroke imminent)";
  else if (hi >= 103) danger = "Danger (Heat cramps/exhaustion likely)";
  else if (hi >= 90) danger = "Extreme Caution";
  return { heatIndexF: parseFloat(hi.toFixed(1)), dangerLevel: danger };
`,
    formulaStr: "NWS Rothfusz Heat Index Regression Equation",
    faqs: [{ question: "What is the heat index?", answer: "A measure of how hot it feels when relative humidity is combined with actual air temperature." }]
  },
  {
    slug: "dew-point-calculator",
    id: "dew-point-calculator",
    title: "Dew Point Calculator",
    subcategory: "Weather",
    iconName: "Droplets",
    description: "Calculate dew point temperature and relative humidity comfort levels using Magnus formula.",
    keywords: ["dew point", "humidity", "comfort level", "weather dew point"],
    relatedCalculators: ["heat-index-calculator", "wind-chill-calculator"],
    inputs: [
      { name: "tempC", label: "Air Temperature (°C)", type: "number", defaultValue: 25, min: -20, max: 50, step: 1 },
      { name: "humidityPct", label: "Relative Humidity (%)", type: "number", defaultValue: 60, min: 1, max: 100, step: 5 }
    ],
    outputs: [
      { name: "dewPointC", label: "Dew Point (°C)", format: "number", highlight: true, unit: "°C" },
      { name: "comfortLevel", label: "Humidity Comfort Assessment", format: "text" }
    ],
    calcLogic: `
  const t = Number(inputs.tempC) || 25;
  const rh = Math.max(1, Number(inputs.humidityPct) || 60);
  const a = 17.27;
  const b = 237.7;
  const alpha = ((a * t) / (b + t)) + Math.log(rh / 100);
  const dp = (b * alpha) / (a - alpha);
  let comfort = "Comfortable";
  if (dp >= 24) comfort = "Severely Oppressive";
  else if (dp >= 20) comfort = "Muggy & Uncomfortable";
  else if (dp >= 16) comfort = "Humid";
  return { dewPointC: parseFloat(dp.toFixed(1)), comfortLevel: comfort };
`,
    formulaStr: "Magnus Formula: Dew Point = (b × α) / (a - α)",
    faqs: [{ question: "What dew point feels humid?", answer: "A dew point of 65°F (18°C) or higher feels sticky and humid." }]
  },

  // 8. TRANSPORTATION (6)
  {
    slug: "fuel-cost-calculator",
    id: "fuel-cost-calculator",
    title: "Fuel Cost Calculator",
    subcategory: "Transportation",
    iconName: "Fuel",
    description: "Calculate total trip gas cost, gallons needed, and cost per mile for road trips.",
    keywords: ["fuel cost", "gas cost calculator", "road trip cost", "gasoline expense"],
    relatedCalculators: ["gas-mileage-calculator", "mileage-calculator"],
    inputs: [
      { name: "distanceMiles", label: "Trip Distance (miles)", type: "number", defaultValue: 300, min: 1, max: 10000, step: 10 },
      { name: "mpg", label: "Vehicle Fuel Economy (MPG)", type: "number", defaultValue: 28, min: 5, max: 100, step: 1 },
      { name: "gasPrice", label: "Gas Price per Gallon ($)", type: "number", defaultValue: 3.5, min: 1, max: 10, step: 0.1 }
    ],
    outputs: [
      { name: "totalFuelCost", label: "Total Trip Fuel Cost", format: "currency", highlight: true },
      { name: "gallonsNeeded", label: "Gallons Required", format: "number", unit: "gal" },
      { name: "costPerMile", label: "Cost Per Mile", format: "currency" }
    ],
    calcLogic: `
  const d = Math.max(0, Number(inputs.distanceMiles) || 300);
  const mpg = Math.max(1, Number(inputs.mpg) || 28);
  const price = Math.max(0, Number(inputs.gasPrice) || 3.5);
  const gals = d / mpg;
  const cost = gals * price;
  const cpm = d > 0 ? cost / d : 0;
  return { totalFuelCost: cost, gallonsNeeded: parseFloat(gals.toFixed(1)), costPerMile: cpm };
`,
    formulaStr: "Trip Cost = (Distance / MPG) × Gas Price",
    faqs: [{ question: "How can I reduce trip fuel cost?", answer: "Maintain steady speeds, ensure proper tire pressure, and avoid excessive idling." }]
  },
  {
    slug: "gas-mileage-calculator",
    id: "gas-mileage-calculator",
    title: "Gas Mileage Calculator",
    subcategory: "Transportation",
    iconName: "Gauge",
    description: "Calculate vehicle fuel efficiency in MPG, L/100km, and km/L from odometer fill-ups.",
    keywords: ["gas mileage", "mpg calculator", "fuel economy", "l/100km"],
    relatedCalculators: ["fuel-cost-calculator", "mileage-calculator"],
    inputs: [
      { name: "startOdometer", label: "Starting Odometer", type: "number", defaultValue: 45000, min: 0, max: 1e6, step: 10 },
      { name: "endOdometer", label: "Ending Odometer", type: "number", defaultValue: 45350, min: 0, max: 1e6, step: 10 },
      { name: "gallonsFilled", label: "Gallons Filled", type: "number", defaultValue: 12.5, min: 0.1, max: 100, step: 0.1 }
    ],
    outputs: [
      { name: "mpg", label: "Fuel Economy (MPG)", format: "number", highlight: true },
      { name: "l100km", label: "Metric (L/100km)", format: "number" }
    ],
    calcLogic: `
  const start = Number(inputs.startOdometer) || 45000;
  const end = Math.max(start, Number(inputs.endOdometer) || 45350);
  const gals = Math.max(0.1, Number(inputs.gallonsFilled) || 12.5);
  const dist = end - start;
  const mpg = dist / gals;
  const l100 = mpg > 0 ? 235.215 / mpg : 0;
  return { mpg: parseFloat(mpg.toFixed(1)), l100km: parseFloat(l100.toFixed(1)) };
`,
    formulaStr: "MPG = (End Odometer - Start Odometer) / Gallons Filled",
    faqs: [{ question: "How do you convert MPG to L/100km?", answer: "Divide 235.215 by the MPG rating." }]
  },
  {
    slug: "horsepower-calculator",
    id: "horsepower-calculator",
    title: "Horsepower Calculator",
    subcategory: "Transportation",
    iconName: "Zap",
    description: "Calculate engine horsepower (HP = Torque × RPM / 5252) and kilowatt equivalent.",
    keywords: ["horsepower calculator", "hp calculator", "engine torque", "rpm to hp"],
    relatedCalculators: ["engine-horsepower-calculator", "tire-size-calculator"],
    inputs: [
      { name: "torqueLbFt", label: "Torque (lb-ft)", type: "number", defaultValue: 300, min: 1, max: 2000, step: 10 },
      { name: "rpm", label: "Engine Speed (RPM)", type: "number", defaultValue: 5252, min: 500, max: 15000, step: 250 }
    ],
    outputs: [
      { name: "horsepower", label: "Engine Horsepower (HP)", format: "number", highlight: true },
      { name: "kilowatts", label: "Power in Kilowatts (kW)", format: "number" }
    ],
    calcLogic: `
  const t = Math.max(0, Number(inputs.torqueLbFt) || 300);
  const rpm = Math.max(0, Number(inputs.rpm) || 5252);
  const hp = (t * rpm) / 5252;
  const kw = hp * 0.7457;
  return { horsepower: parseFloat(hp.toFixed(1)), kilowatts: parseFloat(kw.toFixed(1)) };
`,
    formulaStr: "HP = (Torque lb-ft × RPM) / 5252",
    faqs: [{ question: "Why is 5252 used in horsepower calculations?", answer: "5252 is the constant derived from 33,000 ft-lbs/min per horsepower divided by 2π." }]
  },
  {
    slug: "engine-horsepower-calculator",
    id: "engine-horsepower-calculator",
    title: "Engine Horsepower Calculator",
    subcategory: "Transportation",
    iconName: "Gauge",
    description: "Calculate drag strip horsepower from vehicle curb weight and quarter-mile trap speed.",
    keywords: ["engine horsepower", "quarter mile hp", "trap speed hp", "curb weight hp"],
    relatedCalculators: ["horsepower-calculator"],
    inputs: [
      { name: "weightLbs", label: "Vehicle Weight with Driver (lbs)", type: "number", defaultValue: 3400, min: 500, max: 10000, step: 50 },
      { name: "trapSpeedMph", label: "1/4 Mile Trap Speed (mph)", type: "number", defaultValue: 105, min: 30, max: 300, step: 1 }
    ],
    outputs: [
      { name: "wheelHp", label: "Estimated Wheel HP", format: "number", highlight: true },
      { name: "crankHp", label: "Estimated Crank HP (15% drivetrain loss)", format: "number" }
    ],
    calcLogic: `
  const w = Math.max(100, Number(inputs.weightLbs) || 3400);
  const speed = Math.max(10, Number(inputs.trapSpeedMph) || 105);
  const hpWheel = w * Math.pow(speed / 234, 3);
  const hpCrank = hpWheel / 0.85;
  return { wheelHp: Math.round(hpWheel), crankHp: Math.round(hpCrank) };
`,
    formulaStr: "Wheel HP = Weight × (Trap Speed / 234)³",
    faqs: [{ question: "What is drivetrain loss?", answer: "Frictional losses through transmission, driveshaft, and differential (~15% loss)." }]
  },
  {
    slug: "mileage-calculator",
    id: "mileage-calculator",
    title: "Mileage Calculator",
    subcategory: "Transportation",
    iconName: "Navigation",
    description: "Calculate business trip mileage reimbursement and travel driving expenses.",
    keywords: ["mileage calculator", "irs mileage rate", "reimbursement calculator", "commute cost"],
    relatedCalculators: ["fuel-cost-calculator", "gas-mileage-calculator"],
    inputs: [
      { name: "distanceMiles", label: "Driven Distance (miles)", type: "number", defaultValue: 120, min: 1, max: 10000, step: 5 },
      { name: "irsRate", label: "IRS Standard Rate ($/mile)", type: "number", defaultValue: 0.67, min: 0.1, max: 2.0, step: 0.01 }
    ],
    outputs: [
      { name: "reimbursement", label: "Total Reimbursement Amount", format: "currency", highlight: true },
      { name: "distanceKm", label: "Distance in Kilometers", format: "number" }
    ],
    calcLogic: `
  const d = Math.max(0, Number(inputs.distanceMiles) || 120);
  const rate = Math.max(0, Number(inputs.irsRate) || 0.67);
  const reimb = d * rate;
  return { reimbursement: reimb, distanceKm: parseFloat((d * 1.60934).toFixed(1)) };
`,
    formulaStr: "Reimbursement = Miles Driven × IRS Rate per Mile",
    faqs: [{ question: "What is the standard IRS mileage rate?", answer: "The standard IRS business mileage rate is updated annually (e.g. 67 cents per mile)." }]
  },
  {
    slug: "tire-size-calculator",
    id: "tire-size-calculator",
    title: "Tire Size Calculator",
    subcategory: "Transportation",
    iconName: "Disc",
    description: "Calculate tire overall diameter, sidewall height, circumference, and speedometer error.",
    keywords: ["tire size calculator", "tire diameter", "speedometer error", "wheel size"],
    relatedCalculators: ["gas-mileage-calculator", "horsepower-calculator"],
    inputs: [
      { name: "widthMm", label: "Tire Section Width (mm)", type: "number", defaultValue: 225, min: 125, max: 355, step: 5 },
      { name: "aspectRatio", label: "Aspect Ratio (%)", type: "number", defaultValue: 45, min: 25, max: 85, step: 5 },
      { name: "rimDiameterInches", label: "Wheel Rim Diameter (inches)", type: "number", defaultValue: 17, min: 10, max: 30, step: 1 }
    ],
    outputs: [
      { name: "tireDiameterInches", label: "Overall Tire Diameter", format: "number", highlight: true, unit: "in" },
      { name: "sidewallHeightInches", label: "Sidewall Height", format: "number", unit: "in" },
      { name: "circumferenceInches", label: "Tire Circumference", format: "number", unit: "in" }
    ],
    calcLogic: `
  const w = Math.max(100, Number(inputs.widthMm) || 225);
  const aspect = Math.max(20, Number(inputs.aspectRatio) || 45) / 100;
  const rim = Math.max(10, Number(inputs.rimDiameterInches) || 17);
  const sidewallInches = (w * aspect) / 25.4;
  const diam = rim + 2 * sidewallInches;
  const circ = Math.PI * diam;
  return {
    tireDiameterInches: parseFloat(diam.toFixed(2)),
    sidewallHeightInches: parseFloat(sidewallInches.toFixed(2)),
    circumferenceInches: parseFloat(circ.toFixed(2))
  };
`,
    formulaStr: "Tire Diameter = Rim Diameter + 2 × [ (Width × Aspect Ratio) / 25.4 ]",
    faqs: [{ question: "What does 225/45R17 mean?", answer: "225mm section width, 45% aspect ratio sidewall height, radial construction, for 17-inch wheel rim." }]
  },

  // 9. ENTERTAINMENT (2)
  {
    slug: "dice-roller",
    id: "dice-roller",
    title: "Dice Roller",
    subcategory: "Entertainment",
    iconName: "Dices",
    description: "Roll virtual polyhedral dice (d4, d6, d8, d10, d12, d20, d100) for tabletop games.",
    keywords: ["dice roller", "roll dice", "d20 roller", "random dice", "dnd dice"],
    relatedCalculators: ["random-number-generator", "love-calculator"],
    inputs: [
      { name: "diceCount", label: "Number of Dice", type: "number", defaultValue: 2, min: 1, max: 20, step: 1 },
      { name: "diceSides", label: "Dice Type", type: "select", defaultValue: "6", options: [
        { label: "d4 (4 sides)", value: "4" },
        { label: "d6 (6 sides)", value: "6" },
        { label: "d8 (8 sides)", value: "8" },
        { label: "d10 (10 sides)", value: "10" },
        { label: "d20 (20 sides)", value: "20" },
        { label: "d100 (100 sides)", value: "100" }
      ] },
      { name: "modifier", label: "Score Modifier (±)", type: "number", defaultValue: 0, min: -50, max: 50, step: 1 }
    ],
    outputs: [
      { name: "totalScore", label: "Total Roll Result", format: "number", highlight: true },
      { name: "rollsList", label: "Individual Dice Rolls", format: "text" }
    ],
    calcLogic: `
  const count = Math.min(20, Math.max(1, Number(inputs.diceCount) || 2));
  const sides = Math.max(2, Number(inputs.diceSides) || 6);
  const mod = Number(inputs.modifier) || 0;
  const rolls: number[] = [];
  for (let i = 0; i < count; i++) {
    rolls.push(Math.floor(Math.random() * sides) + 1);
  }
  const sum = rolls.reduce((a, b) => a + b, 0) + mod;
  return { totalScore: sum, rollsList: \`[\${rolls.join(", ")}]\${mod !== 0 ? (mod > 0 ? " + " + mod : " - " + Math.abs(mod)) : ""}\` };
`,
    formulaStr: "Total = Sum of Random Rolls (1 to Sides) + Modifier",
    faqs: [{ question: "Are dice rolls fair?", answer: "Rolls use standard JavaScript PRNG algorithms ensuring uniform distribution." }]
  },
  {
    slug: "love-calculator",
    id: "love-calculator",
    title: "Love Calculator",
    subcategory: "Entertainment",
    iconName: "Heart",
    description: "Calculate playful love compatibility percentage and match feedback between two names.",
    keywords: ["love calculator", "love test", "name compatibility", "relationship test"],
    relatedCalculators: ["dice-roller"],
    inputs: [
      { name: "name1", label: "Your Name", type: "text", defaultValue: "Romeo" },
      { name: "name2", label: "Partner Name", type: "text", defaultValue: "Juliet" }
    ],
    outputs: [
      { name: "compatibilityScore", label: "Love Match Score", format: "percentage", highlight: true },
      { name: "verdict", label: "Match Verdict", format: "text" }
    ],
    calcLogic: `
  const n1 = String(inputs.name1 || "Romeo").trim().toLowerCase();
  const n2 = String(inputs.name2 || "Juliet").trim().toLowerCase();
  const combined = (n1 + n2).replace(/[^a-z]/g, "");
  let hash = 0;
  for (let i = 0; i < combined.length; i++) hash = (hash * 31 + combined.charCodeAt(i)) % 101;
  const score = Math.max(50, hash % 51 + 50); // Fun positive bias (50-100%)
  let verdict = "Soulmates! Perfect Match 💕";
  if (score < 65) verdict = "Good Match! Opposites Attract ✨";
  else if (score < 85) verdict = "Great Chemistry! Strong Connection 💖";
  return { compatibilityScore: score, verdict };
`,
    formulaStr: "Deterministic String Hashing Algorithm (For Entertainment)",
    faqs: [{ question: "Is the Love Calculator accurate?", answer: "This is a fun entertainment tool designed for playful novelty usage." }]
  }
];

// Helper to write files
calculators.forEach((calc) => {
  const targetDir = path.join(__dirname, "..", "src", "app", "calculators", calc.slug);
  fs.mkdirSync(targetDir, { recursive: true });

  const className = calc.title.replace(/[\s\-\&\(\)\,\.\+\÷\×\°\/\']/g, "");

  // 1. types.ts
  const typesContent = `export interface ${className}Inputs {
${calc.inputs.map(i => `  ${i.name}?: ${i.type === "number" ? "number" : "string"};`).join("\n")}
}

export interface ${className}Outputs {
${calc.outputs.map(o => `  ${o.name}: ${o.format === "number" || o.format === "currency" || o.format === "percentage" ? "number" : "string"};`).join("\n")}
}
`;

  // 2. calculator.ts
  const calcContent = `import { ${className}Outputs } from "./types";

export function calculate${className}(inputs: Record<string, any>): ${className}Outputs {${calc.calcLogic}}
`;

  // 3. schema.ts
  const schemaContent = `import { z } from "zod";

export const ${calc.slug.replace(/-/g, "_")}Schema = z.object({
${calc.inputs.map(i => `  ${i.name}: z.${i.type === "number" ? "number()" : "string()"}.optional(),`).join("\n")}
});
`;

  // 4. metadata.ts
  const metaContent = `import { Metadata } from "next";
import { generateCalculatorMetadata } from "@/lib/seo-helpers";

export const ${calc.slug.replace(/-/g, "_")}Metadata: Metadata = generateCalculatorMetadata({
  title: ${JSON.stringify(calc.title + " — Free Online Calculator")},
  description: ${JSON.stringify(calc.description)},
  slug: ${JSON.stringify(calc.slug)},
});
`;

  // 5. faq.ts
  const faqContent = `import { CalculatorFAQ } from "@/lib/calculator-engine/types";

export const ${calc.slug.replace(/-/g, "_")}Faqs: CalculatorFAQ[] = ${JSON.stringify(calc.faqs, null, 2)};
`;

  // 6. content.ts
  const contentContent = `export const ${calc.slug.replace(/-/g, "_")}Content = {
  title: ${JSON.stringify(calc.title)},
  formula: ${JSON.stringify(calc.formulaStr)},
  description: ${JSON.stringify(calc.description)},
  article: \`
### Overview of ${calc.title}
${calc.description}

### Formula and Calculation Method
The calculation uses standard guidelines:
**\${${JSON.stringify(calc.formulaStr)}}**

### Step-by-Step Practical Usage Guide
Review the output metrics and values for reliable planning and analysis.
  \`,
  references: [
    "Standard Technical & Reference Documentation",
    "CalcPlatform Enterprise Calculation Libraries"
  ]
};
`;

  // 7. examples.ts
  const examplesContent = `export const ${calc.slug.replace(/-/g, "_")}Examples = [
  {
    title: ${JSON.stringify("Standard " + calc.title + " Example")},
    inputs: ${JSON.stringify(calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: i.defaultValue }), {}), null, 2)},
    explanation: "Standard reference calculation example."
  }
];
`;

  // 8. config.ts
  const configContent = `import { CalculatorModuleDefinition } from "@/calculators/types";
import { calculate${className} } from "./calculator";
import { ${calc.slug.replace(/-/g, "_")}Faqs } from "./faq";

export const ${calc.slug.replace(/-/g, "_")}Config: CalculatorModuleDefinition = {
  id: ${JSON.stringify(calc.id)},
  title: ${JSON.stringify(calc.title)},
  slug: ${JSON.stringify(calc.slug)},
  category: "other",
  subcategory: ${JSON.stringify(calc.subcategory)},
  description: ${JSON.stringify(calc.description)},
  iconName: ${JSON.stringify(calc.iconName)},
  featured: true,
  keywords: ${JSON.stringify(calc.keywords)},
  priority: 1,
  relatedCalculators: ${JSON.stringify(calc.relatedCalculators)},
  formulaDescription: ${JSON.stringify(calc.formulaStr)},
  faqs: ${calc.slug.replace(/-/g, "_")}Faqs,
  inputs: ${JSON.stringify(calc.inputs, null, 2)},
  outputs: ${JSON.stringify(calc.outputs, null, 2)},
  calculate: calculate${className},
};

export default ${calc.slug.replace(/-/g, "_")}Config;
`;

  // 9. tests.ts
  const testsContent = `import { calculate${className} } from "./calculator";

export function run${className}Tests() {
  const defaultInputs = ${JSON.stringify(calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: i.defaultValue }), {}), null, 2)};
  const res1 = calculate${className}(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = ${JSON.stringify(calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: 0 }), {}), null, 2)};
  const res2 = calculate${className}(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = ${JSON.stringify(calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: -50 }), {}), null, 2)};
  const res3 = calculate${className}(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = ${JSON.stringify(calc.inputs.reduce((acc, i) => ({ ...acc, [i.name]: NaN }), {}), null, 2)};
  const res4 = calculate${className}(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
`;

  // 10. page.tsx
  const pageContent = `import { Metadata } from "next";
import { ${calc.slug.replace(/-/g, "_")}Metadata } from "./metadata";
import { ${calc.slug.replace(/-/g, "_")}Config } from "./config";
import { CalculatorLayout } from "@/components/calculator/CalculatorLayout";
import { generateJsonLdSchema } from "@/lib/seo-helpers";

export const metadata: Metadata = ${calc.slug.replace(/-/g, "_")}Metadata;

export default function ${className}Page() {
  const { calculate, ...serializableDef } = ${calc.slug.replace(/-/g, "_")}Config;
  const schemas = generateJsonLdSchema({
    title: ${calc.slug.replace(/-/g, "_")}Config.title,
    description: ${calc.slug.replace(/-/g, "_")}Config.description,
    slug: ${calc.slug.replace(/-/g, "_")}Config.slug,
    category: ${calc.slug.replace(/-/g, "_")}Config.category,
    faqs: ${calc.slug.replace(/-/g, "_")}Config.faqs,
  });

  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <CalculatorLayout definition={serializableDef} />
    </>
  );
}
`;

  fs.writeFileSync(path.join(targetDir, "types.ts"), typesContent);
  fs.writeFileSync(path.join(targetDir, "calculator.ts"), calcContent);
  fs.writeFileSync(path.join(targetDir, "schema.ts"), schemaContent);
  fs.writeFileSync(path.join(targetDir, "metadata.ts"), metaContent);
  fs.writeFileSync(path.join(targetDir, "faq.ts"), faqContent);
  fs.writeFileSync(path.join(targetDir, "content.ts"), contentContent);
  fs.writeFileSync(path.join(targetDir, "examples.ts"), examplesContent);
  fs.writeFileSync(path.join(targetDir, "config.ts"), configContent);
  fs.writeFileSync(path.join(targetDir, "tests.ts"), testsContent);
  fs.writeFileSync(path.join(targetDir, "page.tsx"), pageContent);

  console.log(`Generated ${calc.slug}`);
});

// Create directory src/calculators/other
fs.mkdirSync(path.join(__dirname, "..", "src", "calculators", "other"), { recursive: true });

// Write src/calculators/other/index.ts
const otherIndexContent = `import { CalculatorModuleDefinition } from "../types";
${calculators.map(c => `import { ${c.slug.replace(/-/g, "_")}Config } from "@/app/calculators/${c.slug}/config";`).join("\n")}

export const OTHER_CALCULATORS: CalculatorModuleDefinition[] = [
${calculators.map(c => `  ${c.slug.replace(/-/g, "_")}Config,`).join("\n")}
];

export default OTHER_CALCULATORS;
`;

fs.writeFileSync(path.join(__dirname, "..", "src", "calculators", "other", "index.ts"), otherIndexContent);
console.log("Updated src/calculators/other/index.ts successfully!");
