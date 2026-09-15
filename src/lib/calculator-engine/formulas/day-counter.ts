/**
 * High-Precision Pure Mathematical Engine for Day Counter & Date Duration Suite
 * Handles strict calendar validation, dynamic multi-year U.S. federal holiday generation
 * with official weekend observation rules, inclusive/exclusive intervals, business-day
 * offsets, and Conway's Doomsday rule.
 */

export interface HolidayItem {
  name: string;
  year: number;
  month: number; // 0-11
  day: number;
  isObserved?: boolean;
}

export interface DateValidationResult {
  isValid: boolean;
  error?: string;
}

export interface DaysBetweenParams {
  startYear: number;
  startMonth: number; // 0-11
  startDay: number;
  endYear: number;
  endMonth: number; // 0-11
  endDay: number;
  includeEndDay?: boolean;
  workweekDays?: number[]; // default [1,2,3,4,5] = Mon-Fri
  excludeHolidays?: boolean;
  holidayRegion?: "US" | "NONE";
}

export interface DaysBetweenResult {
  isValid: boolean;
  validationError?: string;
  totalCalendarDays: number;
  weekdaysCount: number;
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
  isReversed: boolean;
  reorderNotice?: string;
}

export interface AddSubtractDaysParams {
  startYear: number;
  startMonth: number; // 0-11
  startDay: number;
  daysToOffset: number;
  operation: "add" | "subtract";
  businessDaysOnly?: boolean;
  workweekDays?: number[];
  excludeHolidays?: boolean;
}

export interface AddSubtractDaysResult {
  isValid: boolean;
  validationError?: string;
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
  isValid: boolean;
  validationError?: string;
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

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

// =========================================================================
// 1. GREGORIAN CALENDAR VALIDATION & HELPERS (Years 1-9999)
// =========================================================================

export function isLeapYear(year: number): boolean {
  if (!Number.isInteger(year) || year < 1 || year > 9999) return false;
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function getDaysInMonth(year: number, month: number): number {
  if (month < 0 || month > 11) return 0;
  switch (month) {
    case 1: // February
      return isLeapYear(year) ? 29 : 28;
    case 3: // April
    case 5: // June
    case 8: // September
    case 10: // November
      return 30;
    default:
      return 31;
  }
}

export function isValidCalendarDate(year: number, month: number, day: number): DateValidationResult {
  if (!Number.isInteger(year) || year < 1 || year > 9999) {
    return {
      isValid: false,
      error: `Year must be an integer between 1 and 9999. Received: ${year}.`,
    };
  }

  if (!Number.isInteger(month) || month < 0 || month > 11) {
    return {
      isValid: false,
      error: `Month must be an integer from 0 (January) to 11 (December). Received: ${month}.`,
    };
  }

  if (!Number.isInteger(day) || day < 1) {
    return {
      isValid: false,
      error: "Day of month must be a positive integer starting at 1.",
    };
  }

  const maxDays = getDaysInMonth(year, month);
  if (day > maxDays) {
    if (month === 1) {
      if (isLeapYear(year)) {
        return {
          isValid: false,
          error: `February has 29 days in leap year ${year}. Received day ${day}.`,
        };
      } else {
        return {
          isValid: false,
          error: `February has 28 days in ${year} (not a leap year). Received day ${day}.`,
        };
      }
    }
    return {
      isValid: false,
      error: `${MONTH_NAMES[month]} has ${maxDays} days in ${year}. Received day ${day}.`,
    };
  }

  return { isValid: true };
}

/**
 * Safely compute day of week (0 = Sunday, ..., 6 = Saturday) using UTC.
 */
export function getDayOfWeek(year: number, month: number, day: number): number {
  return new Date(Date.UTC(year, month, day)).getUTCDay();
}

// =========================================================================
// 2. DYNAMIC U.S. FEDERAL HOLIDAY ENGINE WITH OBSERVED WEEKEND RULES
// =========================================================================

function getNthWeekdayOfMonth(year: number, month: number, targetDayOfWeek: number, n: number): number {
  const firstDayOfWeek = getDayOfWeek(year, month, 1);
  let day = 1 + ((targetDayOfWeek - firstDayOfWeek + 7) % 7);
  day += (n - 1) * 7;
  return day;
}

function getLastWeekdayOfMonth(year: number, month: number, targetDayOfWeek: number): number {
  const daysInM = getDaysInMonth(year, month);
  const lastDayOfWeek = getDayOfWeek(year, month, daysInM);
  return daysInM - ((lastDayOfWeek - targetDayOfWeek + 7) % 7);
}

/**
 * Returns all officially observed U.S. federal holidays that fall in calendar year `year`.
 * Observation rules:
 * - Saturday holiday -> observed on preceding Friday
 * - Sunday holiday -> observed on following Monday
 * - If Jan 1 of year+1 falls on Saturday -> observed on Friday Dec 31 of current year
 * - If Jan 1 of current year falls on Saturday -> its observed date was Dec 31 of prior year
 */
export function getUSFederalHolidays(year: number): HolidayItem[] {
  if (!Number.isInteger(year) || year < 1 || year > 9999) return [];

  const holidays: HolidayItem[] = [];

  // Helper to add fixed holiday with weekend observation
  function addFixed(name: string, m: number, d: number, holYear: number) {
    const dow = getDayOfWeek(holYear, m, d);
    let obsY = holYear;
    let obsM = m;
    let obsD = d;
    let isObs = false;

    if (dow === 6) {
      // Saturday -> observed Friday (preceding day)
      isObs = true;
      if (m === 0 && d === 1) {
        // Jan 1 on Sat -> observed Dec 31 of prior year
        obsY = holYear - 1;
        obsM = 11;
        obsD = 31;
      } else {
        obsD = d - 1;
      }
    } else if (dow === 0) {
      // Sunday -> observed Monday (following day)
      isObs = true;
      if (m === 11 && d === 31) {
        obsY = holYear + 1;
        obsM = 0;
        obsD = 1;
      } else {
        obsD = d + 1;
      }
    }

    if (obsY === year) {
      holidays.push({
        name: isObs ? `${name} (Observed)` : name,
        year: obsY,
        month: obsM,
        day: obsD,
        isObserved: isObs,
      });
    }
  }

  // 1. New Year's Day (Jan 1)
  addFixed("New Year's Day", 0, 1, year);

  // Check if Jan 1 of next year is Saturday (observed Dec 31 of this year)
  if (year < 9999) {
    const nextJan1Dow = getDayOfWeek(year + 1, 0, 1);
    if (nextJan1Dow === 6) {
      holidays.push({
        name: "New Year's Day (Observed)",
        year: year,
        month: 11,
        day: 31,
        isObserved: true,
      });
    }
  }

  // 2. Martin Luther King Jr. Day (3rd Monday in January)
  const mlkDay = getNthWeekdayOfMonth(year, 0, 1, 3);
  holidays.push({ name: "Martin Luther King Jr. Day", year, month: 0, day: mlkDay });

  // 3. Washington's Birthday / Presidents' Day (3rd Monday in February)
  const washDay = getNthWeekdayOfMonth(year, 1, 1, 3);
  holidays.push({ name: "Washington's Birthday", year, month: 1, day: washDay });

  // 4. Memorial Day (Last Monday in May)
  const memDay = getLastWeekdayOfMonth(year, 4, 1);
  holidays.push({ name: "Memorial Day", year, month: 4, day: memDay });

  // 5. Juneteenth National Independence Day (June 19)
  addFixed("Juneteenth National Independence Day", 5, 19, year);

  // 6. Independence Day (July 4)
  addFixed("Independence Day", 6, 4, year);

  // 7. Labor Day (1st Monday in September)
  const laborDay = getNthWeekdayOfMonth(year, 8, 1, 1);
  holidays.push({ name: "Labor Day", year, month: 8, day: laborDay });

  // 8. Columbus Day (2nd Monday in October)
  const colDay = getNthWeekdayOfMonth(year, 9, 1, 2);
  holidays.push({ name: "Columbus Day", year, month: 9, day: colDay });

  // 9. Veterans Day (November 11)
  addFixed("Veterans Day", 10, 11, year);

  // 10. Thanksgiving Day (4th Thursday in November)
  const thxDay = getNthWeekdayOfMonth(year, 10, 4, 4);
  holidays.push({ name: "Thanksgiving Day", year, month: 10, day: thxDay });

  // 11. Christmas Day (December 25)
  addFixed("Christmas Day", 11, 25, year);

  // Sort chronologically
  holidays.sort((a, b) => {
    if (a.month !== b.month) return a.month - b.month;
    return a.day - b.day;
  });

  return holidays;
}

/**
 * Returns whether a given calendar date is an observed US federal holiday.
 */
export function isUSFederalHolidayDate(year: number, month: number, day: number): { isHoliday: boolean; name?: string } {
  const holidays = getUSFederalHolidays(year);
  const match = holidays.find((h) => h.month === month && h.day === day);
  if (match) {
    return { isHoliday: true, name: match.name };
  }
  return { isHoliday: false };
}

// =========================================================================
// 3. DAYS BETWEEN TWO DATES SOLVER
// =========================================================================

export function calculateDaysBetween(params: DaysBetweenParams): DaysBetweenResult {
  const vStart = isValidCalendarDate(params.startYear, params.startMonth, params.startDay);
  const vEnd = isValidCalendarDate(params.endYear, params.endMonth, params.endDay);

  if (!vStart.isValid) {
    return createInvalidDaysBetweenResult(vStart.error || "Invalid start date.");
  }
  if (!vEnd.isValid) {
    return createInvalidDaysBetweenResult(vEnd.error || "Invalid end date.");
  }

  let sY = params.startYear;
  let sM = params.startMonth;
  let sD = params.startDay;
  let eY = params.endYear;
  let eM = params.endMonth;
  let eD = params.endDay;

  const startMs = Date.UTC(sY, sM, sD);
  const endMs = Date.UTC(eY, eM, eD);

  let isNegative = false;
  let isReversed = false;
  let reorderNotice: string | undefined = undefined;

  if (startMs > endMs) {
    isNegative = true;
    isReversed = true;
    reorderNotice = "End date is earlier than start date. Dates reordered for duration calculation.";
    // Swap for ordered calculation
    sY = params.endYear;
    sM = params.endMonth;
    sD = params.endDay;
    eY = params.startYear;
    eM = params.startMonth;
    eD = params.startDay;
  }

  const workdays = params.workweekDays || [1, 2, 3, 4, 5]; // Mon-Fri default
  const excludeHol = params.excludeHolidays ?? true;

  // Cache holidays for every year touched in the range
  const holidayCache = new Map<number, HolidayItem[]>();
  function getYearHolidays(y: number): HolidayItem[] {
    if (!holidayCache.has(y)) {
      holidayCache.set(y, getUSFederalHolidays(y));
    }
    return holidayCache.get(y)!;
  }

  let curY = sY;
  let curM = sM;
  let curD = sD;

  let totalCalendarDays = 0;
  let weekdaysCount = 0;
  let businessDays = 0;
  let weekendDays = 0;
  let holidaysCount = 0;
  const holidayNames: string[] = [];

  const targetEndMs = endMs < startMs ? startMs : endMs;
  const finalLimitMs = params.includeEndDay ? targetEndMs : targetEndMs - 86400000;
  let curMs = Date.UTC(curY, curM, curD);

  if (curMs <= finalLimitMs) {
    while (curMs <= finalLimitMs) {
      const dObj = new Date(curMs);
      const y = dObj.getUTCFullYear();
      const m = dObj.getUTCMonth();
      const d = dObj.getUTCDate();
      const dayOfWeek = dObj.getUTCDay();

      totalCalendarDays++;

      const isWorkweekDay = workdays.includes(dayOfWeek);
      if (isWorkweekDay) {
        weekdaysCount++;
      }

      let isHoliday = false;
      let matchedHolidayName: string | undefined = undefined;

      if (excludeHol) {
        const yearHols = getYearHolidays(y);
        const matched = yearHols.find((h) => h.month === m && h.day === d);
        if (matched) {
          isHoliday = true;
          matchedHolidayName = matched.name;
        }
      }

      if (isWorkweekDay) {
        if (isHoliday) {
          holidaysCount++;
          if (matchedHolidayName && !holidayNames.includes(matchedHolidayName)) {
            holidayNames.push(matchedHolidayName);
          }
        } else {
          businessDays++;
        }
      } else {
        weekendDays++;
      }

      curMs += 86400000;
    }
  }

  // Exact Years, Months, Days duration breakdown between ordered dates
  let yDiff = eY - sY;
  let mDiff = eM - sM;
  let dDiff = eD - sD;

  if (dDiff < 0) {
    mDiff--;
    const prevMonthDays = getDaysInMonth(eM === 0 ? eY - 1 : eY, eM === 0 ? 11 : eM - 1);
    dDiff += prevMonthDays;
  }
  if (mDiff < 0) {
    yDiff--;
    mDiff += 12;
  }

  const totalWeeks = Math.floor(totalCalendarDays / 7);
  const remainingDays = totalCalendarDays % 7;
  const totalHours = totalCalendarDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  // Mean Gregorian year = 365.2425 days (146,097 days across the 400-year cycle / 400)
  const percentOfYear = parseFloat(((totalCalendarDays / 365.2425) * 100).toFixed(2));

  const startDateFormatted = `${MONTH_NAMES[params.startMonth]} ${params.startDay}, ${params.startYear}`;
  const endDateFormatted = `${MONTH_NAMES[params.endMonth]} ${params.endDay}, ${params.endYear}`;

  return {
    isValid: true,
    totalCalendarDays,
    weekdaysCount,
    businessDays,
    weekendDays,
    holidaysCount,
    holidayNames,
    totalWeeks,
    remainingDays,
    yearsMonthsDays: {
      years: Math.max(0, yDiff),
      months: Math.max(0, mDiff),
      days: Math.max(0, dDiff),
    },
    totalHours,
    totalMinutes,
    totalSeconds,
    percentOfYear,
    startDateFormatted,
    endDateFormatted,
    isNegative,
    isReversed,
    reorderNotice,
  };
}

function createInvalidDaysBetweenResult(error: string): DaysBetweenResult {
  return {
    isValid: false,
    validationError: error,
    totalCalendarDays: 0,
    weekdaysCount: 0,
    businessDays: 0,
    weekendDays: 0,
    holidaysCount: 0,
    holidayNames: [],
    totalWeeks: 0,
    remainingDays: 0,
    yearsMonthsDays: { years: 0, months: 0, days: 0 },
    totalHours: 0,
    totalMinutes: 0,
    totalSeconds: 0,
    percentOfYear: 0,
    startDateFormatted: "",
    endDateFormatted: "",
    isNegative: false,
    isReversed: false,
  };
}

// =========================================================================
// 4. ADD / SUBTRACT DAYS (CALENDAR VS BUSINESS DAYS)
// =========================================================================

export function calculateAddSubtractDays(params: AddSubtractDaysParams): AddSubtractDaysResult {
  const vStart = isValidCalendarDate(params.startYear, params.startMonth, params.startDay);
  if (!vStart.isValid) {
    return {
      isValid: false,
      validationError: vStart.error || "Invalid start date.",
      targetDateFormatted: "",
      targetYear: 0,
      targetMonth: 0,
      targetDay: 0,
      targetDayOfWeek: "",
      totalCalendarDaysShifted: 0,
      weekendDaysSkipped: 0,
      holidaysSkipped: 0,
    };
  }

  const workdays = params.workweekDays || [1, 2, 3, 4, 5];
  const excludeHol = params.excludeHolidays ?? true;
  const offset = Math.abs(params.daysToOffset);
  const direction = params.operation === "add" ? 1 : -1;

  let curMs = Date.UTC(params.startYear, params.startMonth, params.startDay);

  let daysCounted = 0;
  let weekendDaysSkipped = 0;
  let holidaysSkipped = 0;
  let totalCalendarDaysShifted = 0;

  const holidayCache = new Map<number, HolidayItem[]>();
  function getYearHols(y: number): HolidayItem[] {
    if (!holidayCache.has(y)) {
      holidayCache.set(y, getUSFederalHolidays(y));
    }
    return holidayCache.get(y)!;
  }

  if (params.businessDaysOnly) {
    while (daysCounted < offset) {
      curMs += direction * 86400000;
      totalCalendarDaysShifted++;

      const dObj = new Date(curMs);
      const y = dObj.getUTCFullYear();
      const m = dObj.getUTCMonth();
      const d = dObj.getUTCDate();
      const dow = dObj.getUTCDay();

      const isWorkday = workdays.includes(dow);
      let isHoliday = false;

      if (excludeHol) {
        const hols = getYearHols(y);
        if (hols.some((h) => h.month === m && h.day === d)) {
          isHoliday = true;
        }
      }

      if (isHoliday) {
        holidaysSkipped++;
      } else if (!isWorkday) {
        weekendDaysSkipped++;
      } else {
        daysCounted++;
      }
    }
  } else {
    curMs += direction * offset * 86400000;
    totalCalendarDaysShifted = offset;
  }

  const finalObj = new Date(curMs);
  const targetYear = finalObj.getUTCFullYear();
  const targetMonth = finalObj.getUTCMonth();
  const targetDay = finalObj.getUTCDate();
  const targetDayOfWeek = DAY_NAMES[finalObj.getUTCDay()];
  const targetDateFormatted = `${MONTH_NAMES[targetMonth]} ${targetDay}, ${targetYear}`;

  return {
    isValid: true,
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
// 5. CONWAY'S DOOMSDAY RULE ALGORITHM SOLVER (Years 1-9999)
// =========================================================================

export function calculateDoomsday(year: number, month: number, day: number): DoomsdayStepDetail {
  const v = isValidCalendarDate(year, month, day);
  if (!v.isValid) {
    return {
      isValid: false,
      validationError: v.error,
      anchorCentury: 0,
      anchorCenturyDay: "",
      yearOfCentury: 0,
      div12: 0,
      rem12: 0,
      div4: 0,
      sum: 0,
      yearDoomsday: "",
      closestDoomsdayDate: "",
      diffDays: 0,
      finalDayOfWeek: "",
      isLeap: false,
    };
  }

  const isLeap = isLeapYear(year);

  // Century anchor (repeats every 400 years: 0=Tue(2), 1=Sun(0), 2=Fri(5), 3=Wed(3))
  const century = Math.floor(year / 100);
  const anchorMap: Record<number, number> = {
    0: 2, // 2000, 2400 (Tuesday)
    1: 0, // 2100, 2500 (Sunday)
    2: 5, // 1800, 2200, 2600 (Friday)
    3: 3, // 1900, 2300, 2700 (Wednesday)
  };
  const centuryMod = ((century % 4) + 4) % 4;
  const anchorCentury = century * 100;
  const anchorCenturyDayVal = anchorMap[centuryMod];
  const anchorCenturyDay = DAY_NAMES[anchorCenturyDayVal];

  // Year of century calculation: a (century) + b (floor(y/12)) + c (rem) + d (floor(rem/4))
  const y = year % 100;
  const div12 = Math.floor(y / 12);
  const rem12 = y % 12;
  const div4 = Math.floor(rem12 / 4);
  const sum = anchorCenturyDayVal + div12 + rem12 + div4;
  const yearDoomsdayVal = sum % 7;
  const yearDoomsday = DAY_NAMES[yearDoomsdayVal];

  // Month Doomsdays
  const monthDoomsdays: number[] = [
    isLeap ? 4 : 3,   // Jan: 3 (4 in leap)
    isLeap ? 29 : 28, // Feb: 28 (29 in leap)
    14,               // Mar: 14 (Pi Day)
    4,                // Apr: 4/4
    9,                // May: 5/9
    6,                // Jun: 6/6
    11,               // Jul: 7/11
    8,                // Aug: 8/8
    5,                // Sep: 9/5
    10,               // Oct: 10/10
    7,                // Nov: 11/7
    12,               // Dec: 12/12
  ];

  const mDoomsdayDay = monthDoomsdays[month];
  const closestDoomsdayDate = `${MONTH_NAMES[month]} ${mDoomsdayDay}`;
  const diffDays = day - mDoomsdayDay;

  const finalDayVal = ((yearDoomsdayVal + diffDays) % 7 + 7) % 7;
  const finalDayOfWeek = DAY_NAMES[finalDayVal];

  return {
    isValid: true,
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
