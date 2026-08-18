/**
 * High-Precision Pure Mathematical Engine for Time & Duration Calculations
 * Handles multi-unit sexagesimal arithmetic (Days, Hours, Minutes, Seconds),
 * free-text expression evaluation, date-time shifts with 12h/24h conversion,
 * and duration analysis.
 */

export interface TimeUnits {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface TimeMathResult {
  isNegative: boolean;
  normalized: TimeUnits;
  formattedString: string;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  decimalHours: number;
}

export interface DateTimeShiftResult {
  targetDateStr: string;
  targetTimeStr12: string;
  targetTimeStr24: string;
  targetDayOfWeek: string;
  fullFormatted12: string;
  fullFormatted24: string;
  totalSecondsShifted: number;
  daysPassed: number;
}

export interface ExpressionParseResult {
  rawExpression: string;
  isValid: boolean;
  errorMessage?: string;
  tokens: { value: number; unit: string; operator: "+" | "-" }[];
  result: TimeMathResult;
}

export interface TimeDurationResult {
  duration: TimeMathResult;
  netWorkHours: number;
  grossPay?: number;
  overnightCrossing: boolean;
}

// Convert Days, Hours, Minutes, Seconds to Total Seconds
export function timeUnitsToSeconds(t: Partial<TimeUnits>): number {
  const d = Number(t.days) || 0;
  const h = Number(t.hours) || 0;
  const m = Number(t.minutes) || 0;
  const s = Number(t.seconds) || 0;
  return d * 86400 + h * 3600 + m * 60 + s;
}

// Convert Total Seconds to Normalized TimeUnits
export function secondsToTimeUnits(totalSec: number): { isNegative: boolean; units: TimeUnits } {
  const isNegative = totalSec < 0;
  let remaining = Math.abs(Math.round(totalSec));

  const days = Math.floor(remaining / 86400);
  remaining %= 86400;

  const hours = Math.floor(remaining / 3600);
  remaining %= 3600;

  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;

  return {
    isNegative,
    units: { days, hours, minutes, seconds },
  };
}

// Format TimeUnits into a clean human-readable string
export function formatTimeUnits(units: TimeUnits, isNegative: boolean = false): string {
  const parts: string[] = [];
  if (units.days > 0) parts.push(`${units.days} ${units.days === 1 ? "day" : "days"}`);
  if (units.hours > 0) parts.push(`${units.hours} ${units.hours === 1 ? "hour" : "hours"}`);
  if (units.minutes > 0) parts.push(`${units.minutes} ${units.minutes === 1 ? "minute" : "minutes"}`);
  if (units.seconds > 0 || parts.length === 0) parts.push(`${units.seconds} ${units.seconds === 1 ? "second" : "seconds"}`);

  const str = parts.join(", ");
  return isNegative ? `-${str}` : str;
}

// =========================================================================
// 1. TIME MATH ENGINE (ADD / SUBTRACT TWO TIME VALUES)
// =========================================================================

export function calculateTimeMath(
  t1: Partial<TimeUnits>,
  operation: "+" | "-",
  t2: Partial<TimeUnits>
): TimeMathResult {
  const sec1 = timeUnitsToSeconds(t1);
  const sec2 = timeUnitsToSeconds(t2);

  const finalSec = operation === "-" ? sec1 - sec2 : sec1 + sec2;
  const { isNegative, units } = secondsToTimeUnits(finalSec);

  const totalAbsSec = Math.abs(finalSec);
  const totalDays = parseFloat((totalAbsSec / 86400).toFixed(6));
  const totalHours = parseFloat((totalAbsSec / 3600).toFixed(4));
  const totalMinutes = parseFloat((totalAbsSec / 60).toFixed(2));
  const totalSeconds = totalAbsSec;
  const decimalHours = parseFloat((totalAbsSec / 3600).toFixed(4));

  return {
    isNegative,
    normalized: units,
    formattedString: formatTimeUnits(units, isNegative),
    totalDays: isNegative ? -totalDays : totalDays,
    totalHours: isNegative ? -totalHours : totalHours,
    totalMinutes: isNegative ? -totalMinutes : totalMinutes,
    totalSeconds: finalSec,
    decimalHours: isNegative ? -decimalHours : decimalHours,
  };
}

// =========================================================================
// 2. DATE-TIME SHIFT ENGINE (ADD / SUBTRACT TIME FROM A DATE)
// =========================================================================

export interface DateTimeShiftParams {
  year: number;
  month: number; // 0-11
  day: number;
  hour: number;  // 1-12 or 0-23
  minute: number;
  second: number;
  meridiem?: "AM" | "PM";
  is24Hour?: boolean;
  operation: "add" | "subtract";
  shiftDays: number;
  shiftHours: number;
  shiftMinutes: number;
  shiftSeconds: number;
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const DAY_NAMES = [
  "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
];

export function calculateDateTimeShift(params: DateTimeShiftParams): DateTimeShiftResult {
  let initialHour = params.hour;
  if (!params.is24Hour && params.meridiem) {
    if (params.meridiem === "PM" && initialHour < 12) initialHour += 12;
    if (params.meridiem === "AM" && initialHour === 12) initialHour = 0;
  }

  const baseDate = new Date(
    Date.UTC(
      params.year,
      params.month,
      params.day,
      initialHour,
      params.minute,
      params.second,
      0
    )
  );

  const totalShiftSeconds =
    params.shiftDays * 86400 +
    params.shiftHours * 3600 +
    params.shiftMinutes * 60 +
    params.shiftSeconds;

  const multiplier = params.operation === "subtract" ? -1 : 1;
  baseDate.setUTCSeconds(baseDate.getUTCSeconds() + multiplier * totalShiftSeconds);

  const resYear = baseDate.getUTCFullYear();
  const resMonth = baseDate.getUTCMonth();
  const resDay = baseDate.getUTCDate();
  const resHour24 = baseDate.getUTCHours();
  const resMin = baseDate.getUTCMinutes();
  const resSec = baseDate.getUTCSeconds();
  const resDayOfWeek = DAY_NAMES[baseDate.getUTCDay()];

  // Formats
  const mStr = String(resMonth + 1).padStart(2, "0");
  const dStr = String(resDay).padStart(2, "0");
  const targetDateStr = `${resYear}-${mStr}-${dStr}`;

  const h24Str = String(resHour24).padStart(2, "0");
  const minStr = String(resMin).padStart(2, "0");
  const secStr = String(resSec).padStart(2, "0");
  const targetTimeStr24 = `${h24Str}:${minStr}:${secStr}`;

  const hour12 = resHour24 % 12 === 0 ? 12 : resHour24 % 12;
  const ampm = resHour24 >= 12 ? "PM" : "AM";
  const targetTimeStr12 = `${hour12}:${minStr}:${secStr} ${ampm}`;

  const fullFormatted12 = `${resDayOfWeek}, ${MONTH_NAMES[resMonth]} ${resDay}, ${resYear} at ${targetTimeStr12}`;
  const fullFormatted24 = `${resDayOfWeek}, ${MONTH_NAMES[resMonth]} ${resDay}, ${resYear} ${targetTimeStr24}`;

  const daysPassed = Math.floor(totalShiftSeconds / 86400);

  return {
    targetDateStr,
    targetTimeStr12,
    targetTimeStr24,
    targetDayOfWeek: resDayOfWeek,
    fullFormatted12,
    fullFormatted24,
    totalSecondsShifted: totalShiftSeconds,
    daysPassed,
  };
}

// =========================================================================
// 3. FREE-TEXT TIME EXPRESSION PARSER ENGINE
// =========================================================================

/**
 * Parses expressions like:
 * "1d 2h 3m 4s + 4h 5s - 2030s + 28h"
 * "2.5h + 45m - 300s"
 * "10h - 3h 15m"
 */
export function parseTimeExpression(expr: string): ExpressionParseResult {
  const trimmed = expr.trim();
  if (!trimmed) {
    return {
      rawExpression: expr,
      isValid: true,
      tokens: [],
      result: calculateTimeMath({}, "+", {}),
    };
  }

  try {
    // Clean and split by operators while preserving them
    // Example: "1d 2h + 3h - 45s" -> tokens
    const tokens: { value: number; unit: string; operator: "+" | "-" }[] = [];

    // Replace multiple spaces
    let normalizedExpr = trimmed.replace(/\s+/g, " ");

    // Ensure spaces around + and - operators
    normalizedExpr = normalizedExpr.replace(/\s*\+\s*/g, " + ").replace(/\s*-\s*/g, " - ");

    const parts = normalizedExpr.split(" ").filter(Boolean);

    let currentOp: "+" | "-" = "+";
    let totalSeconds = 0;

    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part === "+") {
        currentOp = "+";
        continue;
      }
      if (part === "-") {
        currentOp = "-";
        continue;
      }

      // Match number and optional unit (d, h, m, s, day, hour, min, sec)
      const match = part.match(/^([+-]?\d*\.?\d+)\s*([a-zA-Z]*)$/);
      if (!match) {
        return {
          rawExpression: expr,
          isValid: false,
          errorMessage: `Invalid syntax near '${part}'`,
          tokens: [],
          result: calculateTimeMath({}, "+", {}),
        };
      }

      const numVal = parseFloat(match[1]);
      const rawUnit = match[2].toLowerCase();

      if (isNaN(numVal)) {
        return {
          rawExpression: expr,
          isValid: false,
          errorMessage: `Invalid numerical value '${match[1]}'`,
          tokens: [],
          result: calculateTimeMath({}, "+", {}),
        };
      }

      let multiplier = 1; // default seconds if no unit
      let standardUnit = "s";

      if (rawUnit.startsWith("d")) {
        multiplier = 86400;
        standardUnit = "d";
      } else if (rawUnit.startsWith("h")) {
        multiplier = 3600;
        standardUnit = "h";
      } else if (rawUnit.startsWith("m") && !rawUnit.startsWith("ms")) {
        multiplier = 60;
        standardUnit = "m";
      } else if (rawUnit.startsWith("s") || rawUnit === "") {
        multiplier = 1;
        standardUnit = "s";
      }

      const tokenSec = numVal * multiplier;
      tokens.push({ value: numVal, unit: standardUnit, operator: currentOp });

      if (currentOp === "+") {
        totalSeconds += tokenSec;
      } else {
        totalSeconds -= tokenSec;
      }
    }

    const { isNegative, units } = secondsToTimeUnits(totalSeconds);
    const totalAbsSec = Math.abs(totalSeconds);

    const result: TimeMathResult = {
      isNegative,
      normalized: units,
      formattedString: formatTimeUnits(units, isNegative),
      totalDays: isNegative ? -(totalAbsSec / 86400) : totalAbsSec / 86400,
      totalHours: isNegative ? -(totalAbsSec / 3600) : totalAbsSec / 3600,
      totalMinutes: isNegative ? -(totalAbsSec / 60) : totalAbsSec / 60,
      totalSeconds: totalSeconds,
      decimalHours: isNegative ? -(totalAbsSec / 3600) : totalAbsSec / 3600,
    };

    return {
      rawExpression: expr,
      isValid: true,
      tokens,
      result,
    };
  } catch (err: any) {
    return {
      rawExpression: expr,
      isValid: false,
      errorMessage: err.message || "Failed to parse expression",
      tokens: [],
      result: calculateTimeMath({}, "+", {}),
    };
  }
}

// =========================================================================
// 4. TIME DURATION & WORK TRACKER ENGINE
// =========================================================================

export interface TimeDurationParams {
  startHour: number;
  startMinute: number;
  startMeridiem?: "AM" | "PM";
  endHour: number;
  endMinute: number;
  endMeridiem?: "AM" | "PM";
  is24Hour?: boolean;
  breakMinutes?: number;
  hourlyRate?: number;
}

export function calculateTimeDuration(params: TimeDurationParams): TimeDurationResult {
  let sHour = params.startHour;
  let eHour = params.endHour;

  if (!params.is24Hour) {
    if (params.startMeridiem === "PM" && sHour < 12) sHour += 12;
    if (params.startMeridiem === "AM" && sHour === 12) sHour = 0;

    if (params.endMeridiem === "PM" && eHour < 12) eHour += 12;
    if (params.endMeridiem === "AM" && eHour === 12) eHour = 0;
  }

  const startTotalMinutes = sHour * 60 + params.startMinute;
  let endTotalMinutes = eHour * 60 + params.endMinute;

  let overnightCrossing = false;
  if (endTotalMinutes < startTotalMinutes) {
    endTotalMinutes += 24 * 60; // Next day
    overnightCrossing = true;
  }

  const grossMinutes = endTotalMinutes - startTotalMinutes;
  const breakMin = Math.max(0, params.breakMinutes || 0);
  const netMinutes = Math.max(0, grossMinutes - breakMin);

  const durationMath = calculateTimeMath({ minutes: netMinutes }, "+", {});
  const netWorkHours = parseFloat((netMinutes / 60).toFixed(4));
  const hourlyRate = params.hourlyRate || 0;
  const grossPay = hourlyRate > 0 ? parseFloat((netWorkHours * hourlyRate).toFixed(2)) : undefined;

  return {
    duration: durationMath,
    netWorkHours,
    grossPay,
    overnightCrossing,
  };
}
