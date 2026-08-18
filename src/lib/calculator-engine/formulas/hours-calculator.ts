/**
 * High-Precision Pure Mathematical Engine for Hours & Work-Duration Calculations
 * Handles intraday intervals, multi-day timestamps, break deductions,
 * regular vs overtime hours, and decimal conversions.
 */

export interface IntradayHoursParams {
  startHour: number;
  startMinute: number;
  startMeridiem?: "AM" | "PM";
  endHour: number;
  endMinute: number;
  endMeridiem?: "AM" | "PM";
  is24Hour?: boolean;
  breakMinutes?: number;
  hourlyRate?: number;
  overtimeThresholdHours?: number; // default 8
  overtimeMultiplier?: number;     // default 1.5
}

export interface HoursBreakdownResult {
  formattedHoursMinutes: string;
  totalDecimalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  percentOfDay: number;
  regularHours: number;
  overtimeHours: number;
  grossPay?: number;
  overnightShift: boolean;
  breakMinutesDeducted: number;
}

export interface CrossDateHoursParams {
  startYear: number;
  startMonth: number; // 0-11
  startDay: number;
  startHour: number;
  startMinute: number;
  startMeridiem?: "AM" | "PM";
  endYear: number;
  endMonth: number;
  endDay: number;
  endHour: number;
  endMinute: number;
  endMeridiem?: "AM" | "PM";
  is24Hour?: boolean;
  breakMinutes?: number;
  hourlyRate?: number;
}

export interface CrossDateHoursResult {
  formattedDuration: string;
  totalDecimalHours: number;
  totalDays: number;
  totalMinutes: number;
  totalSeconds: number;
  grossPay?: number;
  startDateFormatted: string;
  endDateFormatted: string;
  breakMinutesDeducted: number;
}

// Convert 12h/24h hour to 0-23
function to24Hour(hour: number, meridiem?: "AM" | "PM", is24Hour?: boolean): number {
  if (is24Hour || !meridiem) return Math.min(23, Math.max(0, hour));
  let h = hour % 12;
  if (meridiem === "PM") h += 12;
  return h;
}

// =========================================================================
// 1. INTRADAY HOURS COUNTER (HOURS BETWEEN TWO TIMES)
// =========================================================================

export function calculateIntradayHours(params: IntradayHoursParams): HoursBreakdownResult {
  const sHour24 = to24Hour(params.startHour, params.startMeridiem, params.is24Hour);
  const eHour24 = to24Hour(params.endHour, params.endMeridiem, params.is24Hour);

  const startMin = sHour24 * 60 + Math.min(59, Math.max(0, params.startMinute));
  let endMin = eHour24 * 60 + Math.min(59, Math.max(0, params.endMinute));

  let overnightShift = false;
  if (endMin < startMin) {
    endMin += 24 * 60; // Next day
    overnightShift = true;
  }

  const rawMinutes = endMin - startMin;
  const breakMin = Math.max(0, params.breakMinutes || 0);
  const netMinutes = Math.max(0, rawMinutes - breakMin);

  const hours = Math.floor(netMinutes / 60);
  const remainingMins = netMinutes % 60;

  const hStr = hours === 1 ? "1 hour" : `${hours} hours`;
  const mStr = remainingMins === 1 ? "1 minute" : `${remainingMins} minutes`;

  let formattedHoursMinutes = "";
  if (hours === 0 && remainingMins === 0) {
    formattedHoursMinutes = "0 hours, 0 minutes";
  } else if (hours === 0) {
    formattedHoursMinutes = mStr;
  } else if (remainingMins === 0) {
    formattedHoursMinutes = hStr;
  } else {
    formattedHoursMinutes = `${hStr} and ${mStr}`;
  }

  const totalDecimalHours = parseFloat((netMinutes / 60).toFixed(4));
  const totalSeconds = netMinutes * 60;
  const percentOfDay = parseFloat(((netMinutes / 1440) * 100).toFixed(2));

  // Overtime computation
  const otThreshold = params.overtimeThresholdHours ?? 8;
  const otMultiplier = params.overtimeMultiplier ?? 1.5;
  const rate = params.hourlyRate || 0;

  let regularHours = totalDecimalHours;
  let overtimeHours = 0;

  if (totalDecimalHours > otThreshold && otThreshold > 0) {
    regularHours = otThreshold;
    overtimeHours = totalDecimalHours - otThreshold;
  }

  let grossPay: number | undefined;
  if (rate > 0) {
    grossPay = parseFloat((regularHours * rate + overtimeHours * rate * otMultiplier).toFixed(2));
  }

  return {
    formattedHoursMinutes,
    totalDecimalHours,
    totalMinutes: netMinutes,
    totalSeconds,
    percentOfDay,
    regularHours: parseFloat(regularHours.toFixed(4)),
    overtimeHours: parseFloat(overtimeHours.toFixed(4)),
    grossPay,
    overnightShift,
    breakMinutesDeducted: breakMin,
  };
}

// =========================================================================
// 2. CROSS-DATE HOURS DURATION TRACKER
// =========================================================================

export function calculateCrossDateHours(params: CrossDateHoursParams): CrossDateHoursResult {
  const sHour24 = to24Hour(params.startHour, params.startMeridiem, params.is24Hour);
  const eHour24 = to24Hour(params.endHour, params.endMeridiem, params.is24Hour);

  const startDate = new Date(
    Date.UTC(
      params.startYear,
      params.startMonth,
      params.startDay,
      sHour24,
      Math.min(59, Math.max(0, params.startMinute)),
      0
    )
  );

  const endDate = new Date(
    Date.UTC(
      params.endYear,
      params.endMonth,
      params.endDay,
      eHour24,
      Math.min(59, Math.max(0, params.endMinute)),
      0
    )
  );

  const diffMs = endDate.getTime() - startDate.getTime();
  const rawTotalMinutes = Math.max(0, Math.round(diffMs / 60000));
  const breakMin = Math.max(0, params.breakMinutes || 0);
  const netMinutes = Math.max(0, rawTotalMinutes - breakMin);

  const days = Math.floor(netMinutes / 1440);
  const remMinutesAfterDays = netMinutes % 1440;
  const hours = Math.floor(remMinutesAfterDays / 60);
  const mins = remMinutesAfterDays % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} ${days === 1 ? "day" : "days"}`);
  if (hours > 0) parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
  if (mins > 0 || parts.length === 0) parts.push(`${mins} ${mins === 1 ? "minute" : "minutes"}`);

  const formattedDuration = parts.join(", ");
  const totalDecimalHours = parseFloat((netMinutes / 60).toFixed(4));
  const totalDays = parseFloat((netMinutes / 1440).toFixed(4));
  const totalSeconds = netMinutes * 60;

  const rate = params.hourlyRate || 0;
  const grossPay = rate > 0 ? parseFloat((totalDecimalHours * rate).toFixed(2)) : undefined;

  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const startAmPm = sHour24 >= 12 ? "PM" : "AM";
  const start12H = sHour24 % 12 === 0 ? 12 : sHour24 % 12;
  const startDateFormatted = `${MONTH_NAMES[params.startMonth]} ${params.startDay}, ${params.startYear} at ${params.is24Hour ? `${String(sHour24).padStart(2, "0")}:${String(params.startMinute).padStart(2, "0")}` : `${start12H}:${String(params.startMinute).padStart(2, "0")} ${startAmPm}`}`;

  const endAmPm = eHour24 >= 12 ? "PM" : "AM";
  const end12H = eHour24 % 12 === 0 ? 12 : eHour24 % 12;
  const endDateFormatted = `${MONTH_NAMES[params.endMonth]} ${params.endDay}, ${params.endYear} at ${params.is24Hour ? `${String(eHour24).padStart(2, "0")}:${String(params.endMinute).padStart(2, "0")}` : `${end12H}:${String(params.endMinute).padStart(2, "0")} ${endAmPm}`}`;

  return {
    formattedDuration,
    totalDecimalHours,
    totalDays,
    totalMinutes: netMinutes,
    totalSeconds,
    grossPay,
    startDateFormatted,
    endDateFormatted,
    breakMinutesDeducted: breakMin,
  };
}
