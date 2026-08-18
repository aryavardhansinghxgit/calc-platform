/**
 * High-Precision Pure Mathematical Engine for Time Duration Calculations
 * Handles intraday sexagesimal subtraction, base-60 borrowing mechanics,
 * multi-day cross-date intervals, and multi-segment time interval summation.
 */

export interface SameDayDurationParams {
  startHour: number;
  startMinute: number;
  startSecond?: number;
  startMeridiem?: "AM" | "PM";
  endHour: number;
  endMinute: number;
  endSecond?: number;
  endMeridiem?: "AM" | "PM";
  is24Hour?: boolean;
  decimalPlaces?: number;
}

export interface BorrowStepDetail {
  step1Conversion: string;
  step2Borrow: string;
  step3Result: string;
  borrowNeeded: boolean;
}

export interface DurationBreakdownResult {
  formattedHms: string;
  hours: number;
  minutes: number;
  seconds: number;
  totalDecimalHours: number;
  totalDecimalMinutes: number;
  totalSeconds: number;
  totalDays: number;
  percentOfDay: number;
  overnightRollover: boolean;
  borrowSteps: BorrowStepDetail;
}

export interface CrossDateDurationParams {
  startYear: number;
  startMonth: number; // 0-11
  startDay: number;
  startHour: number;
  startMinute: number;
  startSecond?: number;
  startMeridiem?: "AM" | "PM";
  endYear: number;
  endMonth: number;
  endDay: number;
  endHour: number;
  endMinute: number;
  endSecond?: number;
  endMeridiem?: "AM" | "PM";
  is24Hour?: boolean;
  decimalPlaces?: number;
}

export interface CrossDateDurationResult {
  formattedFull: string;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDecimalHours: number;
  totalDecimalMinutes: number;
  totalSeconds: number;
  totalDecimalDays: number;
  startDateFormatted: string;
  endDateFormatted: string;
}

export interface TimeSegmentInput {
  id: string;
  label?: string;
  hours: number;
  minutes: number;
  seconds: number;
}

export interface MultiSegmentResult {
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  totalDurationHms: string;
  totalDecimalHours: number;
  totalDecimalMinutes: number;
  averageSegmentHms: string;
  segmentCount: number;
}

// Convert 12h/24h hour to 0-23
function to24Hour(hour: number, meridiem?: "AM" | "PM", is24Hour?: boolean): number {
  if (is24Hour || !meridiem) return Math.min(23, Math.max(0, hour));
  let h = hour % 12;
  if (meridiem === "PM") h += 12;
  return h;
}

// =========================================================================
// 1. SAME-DAY DURATION SOLVER WITH SEXAGESIMAL BORROW METHOD
// =========================================================================

export function calculateSameDayDuration(params: SameDayDurationParams): DurationBreakdownResult {
  const dec = Math.min(8, Math.max(2, params.decimalPlaces || 4));
  const sH24 = to24Hour(params.startHour, params.startMeridiem, params.is24Hour);
  const sM = Math.min(59, Math.max(0, params.startMinute));
  const sS = Math.min(59, Math.max(0, params.startSecond || 0));

  const eH24 = to24Hour(params.endHour, params.endMeridiem, params.is24Hour);
  const eM = Math.min(59, Math.max(0, params.endMinute));
  const eS = Math.min(59, Math.max(0, params.endSecond || 0));

  const startTotalSec = sH24 * 3600 + sM * 60 + sS;
  let endTotalSec = eH24 * 3600 + eM * 60 + eS;

  let overnightRollover = false;
  let adjustedEndH24 = eH24;

  if (endTotalSec < startTotalSec) {
    endTotalSec += 86400; // 24 hours in seconds
    adjustedEndH24 += 24;
    overnightRollover = true;
  }

  const diffSec = endTotalSec - startTotalSec;
  const hours = Math.floor(diffSec / 3600);
  const remAfterH = diffSec % 3600;
  const minutes = Math.floor(remAfterH / 60);
  const seconds = remAfterH % 60;

  const totalDecimalHours = parseFloat((diffSec / 3600).toFixed(dec));
  const totalDecimalMinutes = parseFloat((diffSec / 60).toFixed(dec));
  const totalDays = parseFloat((diffSec / 86400).toFixed(dec));
  const percentOfDay = parseFloat(((diffSec / 86400) * 100).toFixed(2));

  const parts: string[] = [];
  parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
  parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
  if (seconds > 0 || parts.length === 0) {
    parts.push(`${seconds} ${seconds === 1 ? "second" : "seconds"}`);
  }
  const formattedHms = parts.join(", ");

  // Step-by-Step Borrowing Generator
  let borrowNeeded = false;
  let borrowExplanation = "";

  const startStr = `${String(sH24).padStart(2, "0")}:${String(sM).padStart(2, "0")}:${String(sS).padStart(2, "0")}`;
  const endStr = `${String(adjustedEndH24).padStart(2, "0")}:${String(eM).padStart(2, "0")}:${String(eS).padStart(2, "0")}`;

  let bEndH = adjustedEndH24;
  let bEndM = eM;
  let bEndS = eS;

  if (eS < sS) {
    borrowNeeded = true;
    bEndM -= 1;
    bEndS += 60;
  }

  if (bEndM < sM) {
    borrowNeeded = true;
    bEndH -= 1;
    bEndM += 60;
  }

  const step1 = `1. Convert to 24-hour time:\n   • Start: ${params.startHour}:${String(sM).padStart(2, "0")}${!params.is24Hour ? ` ${params.startMeridiem}` : ""} → ${startStr}\n   • End: ${params.endHour}:${String(eM).padStart(2, "0")}${!params.is24Hour ? ` ${params.endMeridiem}` : ""} → ${endStr}${overnightRollover ? " (+24h midnight rollover)" : ""}`;

  if (borrowNeeded) {
    borrowExplanation = `2. Sexagesimal Borrow Method (Base-60):\n   Because starting time components exceed ending components, borrow 60 minutes/seconds:\n   • Adjusted End Time: ${String(bEndH).padStart(2, "0")}h : ${String(bEndM).padStart(2, "0")}m : ${String(bEndS).padStart(2, "0")}s\n   • Subtract Start Time: - ${startStr}`;
  } else {
    borrowExplanation = `2. Direct Subtraction (No borrowing required):\n   • ${endStr} - ${startStr}`;
  }

  const step3 = `3. Final Result:\n   • Hours: ${bEndH} - ${sH24} = ${hours}h\n   • Minutes: ${bEndM} - ${sM} = ${minutes}m\n   • Seconds: ${bEndS} - sS = ${seconds}s\n   → ${formattedHms} (${totalDecimalHours} decimal hours)`;

  return {
    formattedHms,
    hours,
    minutes,
    seconds,
    totalDecimalHours,
    totalDecimalMinutes,
    totalSeconds: diffSec,
    totalDays,
    percentOfDay,
    overnightRollover,
    borrowSteps: {
      step1Conversion: step1,
      step2Borrow: borrowExplanation,
      step3Result: step3,
      borrowNeeded,
    },
  };
}

// =========================================================================
// 2. CROSS-DATE DURATION CALCULATOR
// =========================================================================

export function calculateCrossDateDuration(params: CrossDateDurationParams): CrossDateDurationResult {
  const dec = Math.min(8, Math.max(2, params.decimalPlaces || 4));
  const sH24 = to24Hour(params.startHour, params.startMeridiem, params.is24Hour);
  const sM = Math.min(59, Math.max(0, params.startMinute));
  const sS = Math.min(59, Math.max(0, params.startSecond || 0));

  const eH24 = to24Hour(params.endHour, params.endMeridiem, params.is24Hour);
  const eM = Math.min(59, Math.max(0, params.endMinute));
  const eS = Math.min(59, Math.max(0, params.endSecond || 0));

  const startDate = new Date(Date.UTC(params.startYear, params.startMonth, params.startDay, sH24, sM, sS));
  const endDate = new Date(Date.UTC(params.endYear, params.endMonth, params.endDay, eH24, eM, eS));

  const diffMs = Math.max(0, endDate.getTime() - startDate.getTime());
  const diffSec = Math.round(diffMs / 1000);

  const days = Math.floor(diffSec / 86400);
  const remSecAfterDays = diffSec % 86400;
  const hours = Math.floor(remSecAfterDays / 3600);
  const remSecAfterHours = remSecAfterDays % 3600;
  const minutes = Math.floor(remSecAfterHours / 60);
  const seconds = remSecAfterHours % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} ${days === 1 ? "day" : "days"}`);
  if (hours > 0 || days > 0) parts.push(`${hours} ${hours === 1 ? "hour" : "hours"}`);
  parts.push(`${minutes} ${minutes === 1 ? "minute" : "minutes"}`);
  if (seconds > 0 || parts.length === 0) parts.push(`${seconds} ${seconds === 1 ? "second" : "seconds"}`);

  const formattedFull = parts.join(", ");
  const totalDecimalHours = parseFloat((diffSec / 3600).toFixed(dec));
  const totalDecimalMinutes = parseFloat((diffSec / 60).toFixed(dec));
  const totalDecimalDays = parseFloat((diffSec / 86400).toFixed(dec));

  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const startAmPm = sH24 >= 12 ? "PM" : "AM";
  const start12H = sH24 % 12 === 0 ? 12 : sH24 % 12;
  const startDateFormatted = `${MONTH_NAMES[params.startMonth]} ${params.startDay}, ${params.startYear} at ${params.is24Hour ? `${String(sH24).padStart(2, "0")}:${String(sM).padStart(2, "0")}` : `${start12H}:${String(sM).padStart(2, "0")} ${startAmPm}`}`;

  const endAmPm = eH24 >= 12 ? "PM" : "AM";
  const end12H = eH24 % 12 === 0 ? 12 : eH24 % 12;
  const endDateFormatted = `${MONTH_NAMES[params.endMonth]} ${params.endDay}, ${params.endYear} at ${params.is24Hour ? `${String(eH24).padStart(2, "0")}:${String(eM).padStart(2, "0")}` : `${end12H}:${String(eM).padStart(2, "0")} ${endAmPm}`}`;

  return {
    formattedFull,
    days,
    hours,
    minutes,
    seconds,
    totalDecimalHours,
    totalDecimalMinutes,
    totalSeconds: diffSec,
    totalDecimalDays,
    startDateFormatted,
    endDateFormatted,
  };
}

// =========================================================================
// 3. MULTI-SEGMENT TIME INTERVAL ADDER
// =========================================================================

export function calculateMultiSegmentDuration(segments: TimeSegmentInput[]): MultiSegmentResult {
  let totalSec = 0;
  let count = 0;

  for (const seg of segments) {
    const h = Math.max(0, seg.hours || 0);
    const m = Math.max(0, seg.minutes || 0);
    const s = Math.max(0, seg.seconds || 0);
    totalSec += h * 3600 + m * 60 + s;
    count++;
  }

  const hours = Math.floor(totalSec / 3600);
  const remSec = totalSec % 3600;
  const minutes = Math.floor(remSec / 60);
  const seconds = remSec % 60;

  const totalDurationHms = `${hours}h ${String(minutes).padStart(2, "0")}m ${String(seconds).padStart(2, "0")}s`;
  const totalDecimalHours = parseFloat((totalSec / 3600).toFixed(4));
  const totalDecimalMinutes = parseFloat((totalSec / 60).toFixed(4));

  const avgSec = count > 0 ? Math.round(totalSec / count) : 0;
  const avgH = Math.floor(avgSec / 3600);
  const avgRem = avgSec % 3600;
  const avgM = Math.floor(avgRem / 60);
  const avgS = avgRem % 60;
  const averageSegmentHms = `${avgH}h ${String(avgM).padStart(2, "0")}m ${String(avgS).padStart(2, "0")}s`;

  return {
    totalHours: hours,
    totalMinutes: minutes,
    totalSeconds: seconds,
    totalDurationHms,
    totalDecimalHours,
    totalDecimalMinutes,
    averageSegmentHms,
    segmentCount: count,
  };
}
