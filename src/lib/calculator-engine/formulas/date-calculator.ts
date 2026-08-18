/**
 * High-Precision Pure Mathematical Engine for Date Calculations
 * Implements exact Gregorian calendar arithmetic, leap year rules,
 * business/workday solvers, holiday calendars, and sub-unit duration matrices.
 */

export interface DateParts {
  year: number;
  month: number; // 0-11
  day: number;   // 1-31
}

export interface HolidayItem {
  name: string;
  dateStr: string; // YYYY-MM-DD
  month: number;   // 1-12
  day: number;     // 1-31
}

export type HolidayRegion = "us" | "uk" | "canada" | "australia" | "india" | "none";

// Month names and short names
export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

export const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

/**
 * Gregorian Leap Year Rule:
 * Divisible by 4, unless divisible by 100 and not by 400.
 */
export function isLeapYear(year: number): boolean {
  if (year % 400 === 0) return true;
  if (year % 100 === 0) return false;
  return year % 4 === 0;
}

/**
 * Get days in a specific month of a specific year.
 */
export function getDaysInMonth(year: number, monthIndex: number): number {
  const days = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[monthIndex] || 31;
}

/**
 * Safe parser for YYYY-MM-DD
 */
export function parseDateParts(dateStr: string): DateParts | null {
  if (!dateStr || typeof dateStr !== "string") return null;
  const match = dateStr.trim().match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!match) return null;
  const year = parseInt(match[1], 10);
  const month = parseInt(match[2], 10) - 1;
  const day = parseInt(match[3], 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return null;
  if (month < 0 || month > 11) return null;
  const maxDay = getDaysInMonth(year, month);
  const clampedDay = Math.min(Math.max(1, day), maxDay);

  return { year, month, day: clampedDay };
}

/**
 * Format DateParts to YYYY-MM-DD
 */
export function formatDateParts(parts: DateParts): string {
  const m = String(parts.month + 1).padStart(2, "0");
  const d = String(parts.day).padStart(2, "0");
  return `${parts.year}-${m}-${d}`;
}

/**
 * Convert DateParts to UTC Date object at 00:00:00
 */
export function partsToUtcDate(parts: DateParts): Date {
  return new Date(Date.UTC(parts.year, parts.month, parts.day, 0, 0, 0, 0));
}

/**
 * Get Nth Day of Week in a Month (e.g. 3rd Monday in January)
 */
function getNthDayOfWeek(year: number, month: number, dayOfWeek: number, n: number): number {
  const firstDay = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
  let day = 1 + ((dayOfWeek - firstDay + 7) % 7);
  day += (n - 1) * 7;
  return day;
}

/**
 * Get Last Day of Week in a Month (e.g. Last Monday in May)
 */
function getLastDayOfWeek(year: number, month: number, dayOfWeek: number): number {
  const daysInMonth = getDaysInMonth(year, month - 1);
  const lastDay = new Date(Date.UTC(year, month - 1, daysInMonth)).getUTCDay();
  const diff = (lastDay - dayOfWeek + 7) % 7;
  return daysInMonth - diff;
}

/**
 * Generate Federal/Public Holidays for a Given Year and Region
 */
export function getHolidaysForYear(year: number, region: HolidayRegion): HolidayItem[] {
  if (region === "none") return [];

  const holidays: HolidayItem[] = [];

  if (region === "us") {
    // New Year's Day (Jan 1)
    holidays.push({ name: "New Year's Day", dateStr: `${year}-01-01`, month: 1, day: 1 });
    // Martin Luther King Jr. Day (3rd Monday in Jan)
    const mlkDay = getNthDayOfWeek(year, 1, 1, 3);
    holidays.push({ name: "Martin Luther King Jr. Day", dateStr: `${year}-01-${String(mlkDay).padStart(2, "0")}`, month: 1, day: mlkDay });
    // Washington's Birthday / Presidents' Day (3rd Monday in Feb)
    const presDay = getNthDayOfWeek(year, 2, 1, 3);
    holidays.push({ name: "Presidents' Day", dateStr: `${year}-02-${String(presDay).padStart(2, "0")}`, month: 2, day: presDay });
    // Memorial Day (Last Monday in May)
    const memDay = getLastDayOfWeek(year, 5, 1);
    holidays.push({ name: "Memorial Day", dateStr: `${year}-05-${String(memDay).padStart(2, "0")}`, month: 5, day: memDay });
    // Juneteenth (Jun 19)
    holidays.push({ name: "Juneteenth National Independence Day", dateStr: `${year}-06-19`, month: 6, day: 19 });
    // Independence Day (Jul 4)
    holidays.push({ name: "Independence Day", dateStr: `${year}-07-04`, month: 7, day: 4 });
    // Labor Day (1st Monday in Sep)
    const labDay = getNthDayOfWeek(year, 9, 1, 1);
    holidays.push({ name: "Labor Day", dateStr: `${year}-09-${String(labDay).padStart(2, "0")}`, month: 9, day: labDay });
    // Columbus Day / Indigenous Peoples' Day (2nd Monday in Oct)
    const colDay = getNthDayOfWeek(year, 10, 1, 2);
    holidays.push({ name: "Columbus Day", dateStr: `${year}-10-${String(colDay).padStart(2, "0")}`, month: 10, day: colDay });
    // Veterans Day (Nov 11)
    holidays.push({ name: "Veterans Day", dateStr: `${year}-11-11`, month: 11, day: 11 });
    // Thanksgiving Day (4th Thursday in Nov)
    const thxDay = getNthDayOfWeek(year, 11, 4, 4);
    holidays.push({ name: "Thanksgiving Day", dateStr: `${year}-11-${String(thxDay).padStart(2, "0")}`, month: 11, day: thxDay });
    // Christmas Day (Dec 25)
    holidays.push({ name: "Christmas Day", dateStr: `${year}-12-25`, month: 12, day: 25 });
  } else if (region === "uk") {
    holidays.push({ name: "New Year's Day", dateStr: `${year}-01-01`, month: 1, day: 1 });
    holidays.push({ name: "Early May Bank Holiday", dateStr: `${year}-05-${String(getNthDayOfWeek(year, 5, 1, 1)).padStart(2, "0")}`, month: 5, day: getNthDayOfWeek(year, 5, 1, 1) });
    holidays.push({ name: "Spring Bank Holiday", dateStr: `${year}-05-${String(getLastDayOfWeek(year, 5, 1)).padStart(2, "0")}`, month: 5, day: getLastDayOfWeek(year, 5, 1) });
    holidays.push({ name: "Summer Bank Holiday", dateStr: `${year}-08-${String(getLastDayOfWeek(year, 8, 1)).padStart(2, "0")}`, month: 8, day: getLastDayOfWeek(year, 8, 1) });
    holidays.push({ name: "Christmas Day", dateStr: `${year}-12-25`, month: 12, day: 25 });
    holidays.push({ name: "Boxing Day", dateStr: `${year}-12-26`, month: 12, day: 26 });
  } else if (region === "canada") {
    holidays.push({ name: "New Year's Day", dateStr: `${year}-01-01`, month: 1, day: 1 });
    holidays.push({ name: "Canada Day", dateStr: `${year}-07-01`, month: 7, day: 1 });
    holidays.push({ name: "Labour Day", dateStr: `${year}-09-${String(getNthDayOfWeek(year, 9, 1, 1)).padStart(2, "0")}`, month: 9, day: getNthDayOfWeek(year, 9, 1, 1) });
    holidays.push({ name: "Thanksgiving Day", dateStr: `${year}-10-${String(getNthDayOfWeek(year, 10, 1, 2)).padStart(2, "0")}`, month: 10, day: getNthDayOfWeek(year, 10, 1, 2) });
    holidays.push({ name: "Christmas Day", dateStr: `${year}-12-25`, month: 12, day: 25 });
  } else if (region === "australia") {
    holidays.push({ name: "New Year's Day", dateStr: `${year}-01-01`, month: 1, day: 1 });
    holidays.push({ name: "Australia Day", dateStr: `${year}-01-26`, month: 1, day: 26 });
    holidays.push({ name: "Anzac Day", dateStr: `${year}-04-25`, month: 4, day: 25 });
    holidays.push({ name: "Christmas Day", dateStr: `${year}-12-25`, month: 12, day: 25 });
    holidays.push({ name: "Boxing Day", dateStr: `${year}-12-26`, month: 12, day: 26 });
  } else if (region === "india") {
    holidays.push({ name: "Republic Day", dateStr: `${year}-01-26`, month: 1, day: 26 });
    holidays.push({ name: "Independence Day", dateStr: `${year}-08-15`, month: 8, day: 15 });
    holidays.push({ name: "Gandhi Jayanti", dateStr: `${year}-10-02`, month: 10, day: 2 });
    holidays.push({ name: "Christmas Day", dateStr: `${year}-12-25`, month: 12, day: 25 });
  }

  return holidays;
}

/**
 * Get holiday set covering a date range
 */
export function getHolidaySetForRange(startYear: number, endYear: number, region: HolidayRegion): Map<string, string> {
  const map = new Map<string, string>();
  const min = Math.min(startYear, endYear);
  const max = Math.max(startYear, endYear);

  for (let y = min - 1; y <= max + 1; y++) {
    const list = getHolidaysForYear(y, region);
    for (const h of list) {
      map.set(h.dateStr, h.name);
    }
  }
  return map;
}

// =========================================================================
// 1. DATE DURATION ENGINE (DAYS BETWEEN TWO DATES)
// =========================================================================

export interface DateDurationParams {
  startDate: string;
  endDate: string;
  includeEndDay?: boolean;
  holidayRegion?: HolidayRegion;
  countHolidays?: boolean; // false = exclude holidays from business count
  weekendDays?: number[]; // [0, 6] = Sun, Sat
}

export interface DateDurationResult {
  isReversed: boolean;
  years: number;
  months: number;
  days: number;
  yearsMonthsDays: string;
  totalDays: number;
  totalWeeksDays: string;
  totalMonthsDays: string;
  businessDays: number;
  weekendDaysCount: number;
  holidaysCount: number;
  holidaysEncountered: { name: string; dateStr: string }[];
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  percentageOfYear: number;
  startDayOfWeek: string;
  endDayOfWeek: string;
}

export function calculateDateDuration(params: DateDurationParams): DateDurationResult {
  const p1 = parseDateParts(params.startDate) || { year: 2026, month: 0, day: 1 };
  const p2 = parseDateParts(params.endDate) || { year: 2026, month: 0, day: 1 };
  const includeEndDay = Boolean(params.includeEndDay);
  const weekendDays = params.weekendDays || [0, 6]; // Sun, Sat
  const holidayRegion = params.holidayRegion || "none";
  const countHolidays = params.countHolidays ?? false;

  let d1 = partsToUtcDate(p1);
  let d2 = partsToUtcDate(p2);

  const isReversed = d1.getTime() > d2.getTime();
  const earlierParts = isReversed ? p2 : p1;
  const laterParts = isReversed ? p1 : p2;

  let earlierDate = isReversed ? d2 : d1;
  let laterDate = isReversed ? d1 : d2;

  // Calendar difference (Years, Months, Days) using Gregorian borrowing
  let yDiff = laterParts.year - earlierParts.year;
  let mDiff = laterParts.month - earlierParts.month;
  let dDiff = laterParts.day - earlierParts.day;

  if (dDiff < 0) {
    let borrowMonth = laterParts.month - 1;
    let borrowYear = laterParts.year;
    if (borrowMonth < 0) {
      borrowMonth = 11;
      borrowYear -= 1;
    }
    const daysInPrevMonth = getDaysInMonth(borrowYear, borrowMonth);
    dDiff += daysInPrevMonth;
    mDiff -= 1;
  }

  if (mDiff < 0) {
    mDiff += 12;
    yDiff -= 1;
  }

  if (includeEndDay) {
    dDiff += 1;
    // Check if dDiff rolls over into next month
    const daysInCurrentLaterMonth = getDaysInMonth(laterParts.year, laterParts.month);
    if (dDiff >= daysInCurrentLaterMonth) {
      dDiff -= daysInCurrentLaterMonth;
      mDiff += 1;
      if (mDiff >= 12) {
        mDiff -= 12;
        yDiff += 1;
      }
    }
  }

  // Exact Total Calendar Days
  const msDiff = Math.abs(laterDate.getTime() - earlierDate.getTime());
  let totalDays = Math.round(msDiff / (1000 * 60 * 60 * 24));
  if (includeEndDay) totalDays += 1;

  // Working Days, Weekend Days, and Holiday Enumeration
  const holidayMap = getHolidaySetForRange(earlierParts.year, laterParts.year, holidayRegion);
  const holidaysEncountered: { name: string; dateStr: string }[] = [];

  let businessDays = 0;
  let weekendDaysCount = 0;
  let holidaysCount = 0;

  const cur = new Date(earlierDate.getTime());
  const limit = new Date(laterDate.getTime());
  if (includeEndDay) {
    limit.setUTCDate(limit.getUTCDate() + 1);
  }

  while (cur < limit) {
    const dayOfWeek = cur.getUTCDay();
    const isWeekend = weekendDays.includes(dayOfWeek);
    const dateStr = cur.toISOString().split("T")[0];
    const holidayName = holidayMap.get(dateStr);

    if (isWeekend) {
      weekendDaysCount++;
    } else if (holidayName && !countHolidays) {
      holidaysCount++;
      holidaysEncountered.push({ name: holidayName, dateStr });
    } else {
      businessDays++;
      if (holidayName) {
        holidaysEncountered.push({ name: holidayName, dateStr });
      }
    }

    cur.setUTCDate(cur.getUTCDate() + 1);
  }

  // Format strings
  const yLabel = yDiff === 1 ? "1 year" : `${yDiff} years`;
  const mLabel = mDiff === 1 ? "1 month" : `${mDiff} months`;
  const dLabel = dDiff === 1 ? "1 day" : `${dDiff} days`;

  let yearsMonthsDays = "";
  if (yDiff === 0 && mDiff === 0 && dDiff === 0) {
    yearsMonthsDays = "0 days (Same date)";
  } else {
    const parts: string[] = [];
    if (yDiff > 0) parts.push(yLabel);
    if (mDiff > 0) parts.push(mLabel);
    if (dDiff > 0 || parts.length === 0) parts.push(dLabel);
    yearsMonthsDays = parts.join(", ");
  }

  const weeks = Math.floor(totalDays / 7);
  const remDays = totalDays % 7;
  const totalWeeksDays = `${weeks} weeks${remDays > 0 ? ` and ${remDays} days` : ""}`;

  const totalMonthsApprox = yDiff * 12 + mDiff;
  const totalMonthsDays = `${totalMonthsApprox} months${dDiff > 0 ? ` and ${dDiff} days` : ""}`;

  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;
  const percentageOfYear = parseFloat(((totalDays / 365.2425) * 100).toFixed(2));

  return {
    isReversed,
    years: yDiff,
    months: mDiff,
    days: dDiff,
    yearsMonthsDays,
    totalDays,
    totalWeeksDays,
    totalMonthsDays,
    businessDays,
    weekendDaysCount,
    holidaysCount,
    holidaysEncountered,
    totalHours,
    totalMinutes,
    totalSeconds,
    percentageOfYear,
    startDayOfWeek: DAY_NAMES[d1.getUTCDay()],
    endDayOfWeek: DAY_NAMES[d2.getUTCDay()],
  };
}

// =========================================================================
// 2. DATE OFFSET ENGINE (ADD / SUBTRACT FROM A DATE)
// =========================================================================

export interface DateOffsetParams {
  startDate: string;
  operation: "add" | "subtract";
  years: number;
  months: number;
  weeks: number;
  days: number;
  businessDaysOnly?: boolean;
  holidayRegion?: HolidayRegion;
  weekendDays?: number[]; // default [0, 6]
}

export interface DateOffsetResult {
  targetDateStr: string;
  targetDayOfWeek: string;
  targetFormatted: string;
  totalCalendarDaysOffset: number;
  workingDaysSkipped: number;
  weekendDaysSkipped: number;
  holidaysSkipped: number;
  holidaysEncountered: { name: string; dateStr: string }[];
}

export function calculateDateOffset(params: DateOffsetParams): DateOffsetResult {
  const p = parseDateParts(params.startDate) || { year: 2026, month: 0, day: 1 };
  const op = params.operation === "subtract" ? -1 : 1;
  const years = Math.max(0, params.years || 0);
  const months = Math.max(0, params.months || 0);
  const weeks = Math.max(0, params.weeks || 0);
  const days = Math.max(0, params.days || 0);
  const businessDaysOnly = Boolean(params.businessDaysOnly);
  const weekendDays = params.weekendDays || [0, 6];
  const holidayRegion = params.holidayRegion || "none";

  if (businessDaysOnly) {
    // Total business days to add or subtract
    const totalWorkDaysToAdd = weeks * 5 + days + months * 21 + years * 260;
    let remaining = totalWorkDaysToAdd;
    const cur = partsToUtcDate(p);
    const holidayMap = getHolidaySetForRange(p.year - 5, p.year + 10, holidayRegion);

    let weekendDaysSkipped = 0;
    let holidaysSkipped = 0;
    const holidaysEncountered: { name: string; dateStr: string }[] = [];

    while (remaining > 0) {
      cur.setUTCDate(cur.getUTCDate() + op);
      const dow = cur.getUTCDay();
      const isWeekend = weekendDays.includes(dow);
      const dateStr = cur.toISOString().split("T")[0];
      const holidayName = holidayMap.get(dateStr);

      if (isWeekend) {
        weekendDaysSkipped++;
      } else if (holidayName) {
        holidaysSkipped++;
        holidaysEncountered.push({ name: holidayName, dateStr });
      } else {
        remaining--;
      }
    }

    const targetParts: DateParts = {
      year: cur.getUTCFullYear(),
      month: cur.getUTCMonth(),
      day: cur.getUTCDate(),
    };

    const targetDateStr = formatDateParts(targetParts);
    const targetDayOfWeek = DAY_NAMES[cur.getUTCDay()];
    const targetFormatted = `${targetDayOfWeek}, ${MONTH_NAMES[targetParts.month]} ${targetParts.day}, ${targetParts.year}`;
    const startUtc = partsToUtcDate(p);
    const totalCalendarDaysOffset = Math.round(Math.abs(cur.getTime() - startUtc.getTime()) / (1000 * 60 * 60 * 24));

    return {
      targetDateStr,
      targetDayOfWeek,
      targetFormatted,
      totalCalendarDaysOffset,
      workingDaysSkipped: totalWorkDaysToAdd,
      weekendDaysSkipped,
      holidaysSkipped,
      holidaysEncountered,
    };
  }

  // Standard Calendar Arithmetic (Years, Months, Weeks, Days)
  let targetYear = p.year + op * years;
  let targetMonth = p.month + op * months;

  while (targetMonth < 0) {
    targetMonth += 12;
    targetYear -= 1;
  }
  while (targetMonth > 11) {
    targetMonth -= 12;
    targetYear += 1;
  }

  // Clamp day to max days in target month
  const maxDays = getDaysInMonth(targetYear, targetMonth);
  let targetDay = Math.min(p.day, maxDays);

  const intermediateDate = new Date(Date.UTC(targetYear, targetMonth, targetDay, 0, 0, 0, 0));
  const totalDaysToAdd = op * (weeks * 7 + days);
  intermediateDate.setUTCDate(intermediateDate.getUTCDate() + totalDaysToAdd);

  const finalParts: DateParts = {
    year: intermediateDate.getUTCFullYear(),
    month: intermediateDate.getUTCMonth(),
    day: intermediateDate.getUTCDate(),
  };

  const targetDateStr = formatDateParts(finalParts);
  const targetDayOfWeek = DAY_NAMES[intermediateDate.getUTCDay()];
  const targetFormatted = `${targetDayOfWeek}, ${MONTH_NAMES[finalParts.month]} ${finalParts.day}, ${finalParts.year}`;
  const startUtc = partsToUtcDate(p);
  const totalCalendarDaysOffset = Math.round(Math.abs(intermediateDate.getTime() - startUtc.getTime()) / (1000 * 60 * 60 * 24));

  return {
    targetDateStr,
    targetDayOfWeek,
    targetFormatted,
    totalCalendarDaysOffset,
    workingDaysSkipped: 0,
    weekendDaysSkipped: 0,
    holidaysSkipped: 0,
    holidaysEncountered: [],
  };
}
