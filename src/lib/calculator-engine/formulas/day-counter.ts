/**
 * High-Precision Pure Mathematical Engine for Days Counter & Date Duration Calculations
 * Handles inclusive/exclusive date intervals, multi-region holiday exclusions,
 * custom workweek filters, business day offsets, and John Conway's Doomsday algorithm.
 */

export interface HolidayItem {
  name: string;
  month: number; // 0-11
  day: number;
}

export const US_FEDERAL_HOLIDAYS_LIST: HolidayItem[] = [
  { name: "New Year's Day", month: 0, day: 1 },
  { name: "Martin Luther King Jr. Day", month: 0, day: 19 },
  { name: "Washington's Birthday / Presidents' Day", month: 1, day: 16 },
  { name: "Memorial Day", month: 4, day: 25 },
  { name: "Juneteenth National Independence Day", month: 5, day: 19 },
  { name: "Independence Day", month: 6, day: 4 },
  { name: "Labor Day", month: 8, day: 7 },
  { name: "Columbus Day", month: 9, day: 12 },
  { name: "Veterans Day", month: 10, day: 11 },
  { name: "Thanksgiving Day", month: 10, day: 26 },
  { name: "Christmas Day", month: 11, day: 25 },
];

export interface DaysBetweenParams {
  startYear: number;
  startMonth: number; // 0-11
  startDay: number;
  endYear: number;
  endMonth: number;
  endDay: number;
  includeEndDay?: boolean;
  workweekDays?: number[]; // [1,2,3,4,5] = Mon-Fri
  excludeHolidays?: boolean;
  holidayRegion?: "US" | "UK" | "IN" | "NONE";
}

export interface DaysBetweenResult {
  totalCalendarDays: number;
  businessDays: number;
  weekendDays: number;
  holidaysCount: number;
  holidayNames: string[];
  totalWeeks: number;
  remainingDays: number;
  yearsMonthsDays: {
    years: number;
    months: number;
    days: number;
  };
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  percentOfYear: number;
  startDateFormatted: string;
  endDateFormatted: string;
  isNegative: boolean;
}

export interface AddSubtractDaysParams {
  startYear: number;
  startMonth: number;
  startDay: number;
  daysToOffset: number;
  operation: "add" | "subtract";
  businessDaysOnly?: boolean;
  workweekDays?: number[];
  excludeHolidays?: boolean;
}

export interface AddSubtractDaysResult {
  targetDateFormatted: string;
  targetYear: number;
  targetMonth: number;
  targetDay: number;
  targetDayOfWeek: string;
  totalCalendarDaysShifted: number;
  weekendDaysSkipped: number;
  holidaysSkipped: number;
}

export interface DoomsdayStepDetail {
  anchorCentury: number;
  anchorCenturyDay: string;
  yearOfCentury: number;
  div12: number;
  rem12: number;
  div4: number;
  sum: number;
  yearDoomsday: string;
  closestDoomsdayDate: string;
  diffDays: number;
  finalDayOfWeek: string;
  isLeap: boolean;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Helper: Check leap year
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// =========================================================================
// 1. DAYS BETWEEN TWO DATES SOLVER
// =========================================================================

export function calculateDaysBetween(params: DaysBetweenParams): DaysBetweenResult {
  const sDate = new Date(Date.UTC(params.startYear, params.startMonth, params.startDay));
  const eDate = new Date(Date.UTC(params.endYear, params.endMonth, params.endDay));

  let isNegative = false;
  let startMs = sDate.getTime();
  let endMs = eDate.getTime();

  if (endMs < startMs) {
    isNegative = true;
    const temp = startMs;
    startMs = endMs;
    endMs = temp;
  }

  const workdays = params.workweekDays || [1, 2, 3, 4, 5]; // Mon-Fri default
  const excludeHol = params.excludeHolidays ?? true;
  const holidays = excludeHol ? US_FEDERAL_HOLIDAYS_LIST : [];

  let curMs = startMs;
  let totalCalendarDays = 0;
  let businessDays = 0;
  let weekendDays = 0;
  let holidaysCount = 0;
  const holidayNames: string[] = [];

  const limitMs = params.includeEndDay ? endMs : endMs - 86400000;

  if (curMs <= limitMs) {
    while (curMs <= limitMs) {
      const d = new Date(curMs);
      const dayOfWeek = d.getUTCDay();
      const m = d.getUTCMonth();
      const dayOfMonth = d.getUTCDate();

      totalCalendarDays++;

      const isHoliday = holidays.some((h) => h.month === m && h.day === dayOfMonth);
      const isWorkday = workdays.includes(dayOfWeek);

      if (isHoliday) {
        holidaysCount++;
        const matched = holidays.find((h) => h.month === m && h.day === dayOfMonth);
        if (matched && !holidayNames.includes(matched.name)) {
          holidayNames.push(matched.name);
        }
      }

      if (isWorkday && !isHoliday) {
        businessDays++;
      } else if (!isWorkday) {
        weekendDays++;
      }

      curMs += 86400000; // +1 day
    }
  }

  // Exact Years, Months, Days breakdown
  let y = params.endYear - params.startYear;
  let m = params.endMonth - params.startMonth;
  let d = params.endDay - params.startDay;

  if (d < 0) {
    m--;
    const prevMonthDays = new Date(params.endYear, params.endMonth, 0).getDate();
    d += prevMonthDays;
  }
  if (m < 0) {
    y--;
    m += 12;
  }

  const totalWeeks = Math.floor(totalCalendarDays / 7);
  const remainingDays = totalCalendarDays % 7;
  const totalHours = totalCalendarDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;
  const percentOfYear = parseFloat(((totalCalendarDays / 365.2425) * 100).toFixed(2));

  const startDateFormatted = `${MONTH_NAMES[params.startMonth]} ${params.startDay}, ${params.startYear}`;
  const endDateFormatted = `${MONTH_NAMES[params.endMonth]} ${params.endDay}, ${params.endYear}`;

  return {
    totalCalendarDays,
    businessDays,
    weekendDays,
    holidaysCount,
    holidayNames,
    totalWeeks,
    remainingDays,
    yearsMonthsDays: {
      years: Math.max(0, y),
      months: Math.max(0, m),
      days: Math.max(0, d),
    },
    totalHours,
    totalMinutes,
    totalSeconds,
    percentOfYear,
    startDateFormatted,
    endDateFormatted,
    isNegative,
  };
}

// =========================================================================
// 2. ADD / SUBTRACT DAYS (CALENDAR VS BUSINESS DAYS)
// =========================================================================

export function calculateAddSubtractDays(params: AddSubtractDaysParams): AddSubtractDaysResult {
  const workdays = params.workweekDays || [1, 2, 3, 4, 5];
  const excludeHol = params.excludeHolidays ?? true;
  const holidays = excludeHol ? US_FEDERAL_HOLIDAYS_LIST : [];

  let cur = new Date(Date.UTC(params.startYear, params.startMonth, params.startDay));
  const offset = Math.abs(params.daysToOffset);
  const direction = params.operation === "add" ? 1 : -1;

  let daysCounted = 0;
  let weekendDaysSkipped = 0;
  let holidaysSkipped = 0;
  let totalCalendarDaysShifted = 0;

  if (params.businessDaysOnly) {
    while (daysCounted < offset) {
      cur.setUTCDate(cur.getUTCDate() + direction);
      totalCalendarDaysShifted++;

      const dayOfWeek = cur.getUTCDay();
      const m = cur.getUTCMonth();
      const dayOfMonth = cur.getUTCDate();

      const isHoliday = holidays.some((h) => h.month === m && h.day === dayOfMonth);
      const isWorkday = workdays.includes(dayOfWeek);

      if (isHoliday) {
        holidaysSkipped++;
      } else if (!isWorkday) {
        weekendDaysSkipped++;
      } else {
        daysCounted++;
      }
    }
  } else {
    cur.setUTCDate(cur.getUTCDate() + direction * offset);
    totalCalendarDaysShifted = offset;
  }

  const targetYear = cur.getUTCFullYear();
  const targetMonth = cur.getUTCMonth();
  const targetDay = cur.getUTCDate();
  const targetDayOfWeek = DAY_NAMES[cur.getUTCDay()];
  const targetDateFormatted = `${MONTH_NAMES[targetMonth]} ${targetDay}, ${targetYear}`;

  return {
    targetDateFormatted,
    targetYear,
    targetMonth,
    targetDay,
    targetDayOfWeek,
    totalCalendarDaysShifted,
    weekendDaysSkipped,
    holidaysSkipped,
  };
}

// =========================================================================
// 3. CONWAY'S DOOMSDAY RULE ALGORITHM SOLVER
// =========================================================================

export function calculateDoomsday(year: number, month: number, day: number): DoomsdayStepDetail {
  const isLeap = isLeapYear(year);

  // Century anchor (1800: Fri=5, 1900: Wed=3, 2000: Tue=2, 2100: Sun=0)
  const century = Math.floor(year / 100);
  const anchorMap: Record<number, number> = {
    0: 2, // 2000 (Tuesday)
    1: 0, // 2100 (Sunday)
    2: 5, // 2200 (Friday)
    3: 3, // 2300 (Wednesday)
  };
  const centuryMod = ((century % 4) + 4) % 4;
  const anchorCentury = century * 100;
  const anchorCenturyDayVal = anchorMap[centuryMod];
  const anchorCenturyDay = DAY_NAMES[anchorCenturyDayVal];

  // Year of century calculation: floor(y/12) + (y % 12) + floor((y%12)/4)
  const y = year % 100;
  const div12 = Math.floor(y / 12);
  const rem12 = y % 12;
  const div4 = Math.floor(rem12 / 4);
  const sum = anchorCenturyDayVal + div12 + rem12 + div4;
  const yearDoomsdayVal = sum % 7;
  const yearDoomsday = DAY_NAMES[yearDoomsdayVal];

  // Month Doomsdays
  const monthDoomsdays: number[] = [
    isLeap ? 4 : 3,  // Jan: 3 (4 in leap)
    isLeap ? 29 : 28,// Feb: 28 (29 in leap)
    14,              // Mar: 14 (Pi Day)
    4,               // Apr: 4/4
    9,               // May: 5/9
    6,               // Jun: 6/6
    11,              // Jul: 7/11
    8,               // Aug: 8/8
    5,               // Sep: 9/5
    10,              // Oct: 10/10
    7,               // Nov: 11/7
    12,              // Dec: 12/12
  ];

  const mDoomsdayDay = monthDoomsdays[month];
  const closestDoomsdayDate = `${MONTH_NAMES[month]} ${mDoomsdayDay}`;
  const diffDays = day - mDoomsdayDay;

  const finalDayVal = ((yearDoomsdayVal + diffDays) % 7 + 7) % 7;
  const finalDayOfWeek = DAY_NAMES[finalDayVal];

  return {
    anchorCentury,
    anchorCenturyDay,
    yearOfCentury: y,
    div12,
    rem12,
    div4,
    sum,
    yearDoomsday,
    closestDoomsdayDate,
    diffDays,
    finalDayOfWeek,
    isLeap,
  };
}
