/**
 * High-Precision Pure Mathematical Engine for Time Card & Weekly Payroll Calculations
 * Handles flexible string time parsing (8:30AM, 17:00, 8.30),
 * FLSA 15-minute / 7-minute rounding rules, California daily & double overtime,
 * and FLSA employee exemption assessment.
 */

export interface DayShiftInput {
  dayName: string;
  dateStr?: string;
  fromTime: string;  // e.g. "08:30AM", "8:30", "17:00"
  toTime: string;    // e.g. "17:00", "5:00PM"
  breakDeduction: string; // e.g. "0:30", "30", "0.5"
}

export type TimeRoundingMode = "none" | "5min" | "15min_7rule" | "30min";
export type OvertimeRule = "weekly_40" | "daily_8_weekly_40" | "daily_10" | "no_overtime";

export interface TimeCardCalculationParams {
  shifts: DayShiftInput[];
  hourlyRate: number;
  overtimeMultiplier?: number;    // default 1.5
  doubleTimeMultiplier?: number;  // default 2.0
  roundingMode?: TimeRoundingMode;
  overtimeRule?: OvertimeRule;
}

export interface DayShiftResult {
  dayName: string;
  rawHoursWorked: number;
  roundedHoursWorked: number;
  breakMinutesDeducted: number;
  regularHours: number;
  overtimeHours: number;
  doubleTimeHours: number;
  dailyGrossPay: number;
  formattedDuration: string;
  hasErrors: boolean;
  errorMessage?: string;
}

export interface WeeklyPayrollResult {
  dailyResults: DayShiftResult[];
  totalWeeklyHours: number;
  totalRegularHours: number;
  totalOvertimeHours: number;
  totalDoubleTimeHours: number;
  totalBreakHours: number;
  regularPay: number;
  overtimePay: number;
  doubleTimePay: number;
  totalGrossPay: number;
  effectiveHourlyRate: number;
}

/**
 * Flexible time string parser.
 * Supports:
 * - "8:30AM", "8:30 PM", "8:30pm"
 * - "17:00", "08:30"
 * - "8.30", "17.00"
 * - "8", "8h", "8.5" (as hours from midnight)
 */
export function parseFlexibleTimeString(timeStr: string): number | null {
  if (!timeStr || typeof timeStr !== "string") return null;
  const s = timeStr.trim().toUpperCase();
  if (!s) return null;

  // Check for AM / PM
  const isPM = s.includes("PM");
  const isAM = s.includes("AM");
  const cleaned = s.replace(/(AM|PM)/g, "").trim();

  let hours = 0;
  let minutes = 0;

  if (cleaned.includes(":")) {
    const parts = cleaned.split(":");
    hours = parseInt(parts[0], 10);
    minutes = parseInt(parts[1], 10);
  } else if (cleaned.includes(".")) {
    const parts = cleaned.split(".");
    hours = parseInt(parts[0], 10);
    // If e.g. "8.30" -> 30 mins; if "8.5" -> 30 mins
    if (parts[1].length === 1) {
      minutes = Math.round(parseFloat(`0.${parts[1]}`) * 60);
    } else {
      minutes = parseInt(parts[1], 10);
    }
  } else {
    hours = parseInt(cleaned, 10);
    minutes = 0;
  }

  if (isNaN(hours) || isNaN(minutes) || minutes < 0 || minutes > 59) return null;

  if (isPM && hours < 12) hours += 12;
  if (isAM && hours === 12) hours = 0;

  return hours * 60 + minutes;
}

/**
 * Flexible break deduction parser.
 * Supports "0:30", "30", "30m", "0.5", "1h", "1:00"
 */
export function parseBreakDeduction(breakStr: string): number {
  if (!breakStr || typeof breakStr !== "string") return 0;
  const s = breakStr.trim().toLowerCase();
  if (!s) return 0;

  if (s.includes(":")) {
    const parts = s.split(":");
    const h = parseInt(parts[0], 10) || 0;
    const m = parseInt(parts[1], 10) || 0;
    return h * 60 + m;
  }

  if (s.endsWith("m") || s.endsWith("min")) {
    return parseInt(s.replace(/[^0-9]/g, ""), 10) || 0;
  }

  if (s.endsWith("h")) {
    const h = parseFloat(s.replace(/[^0-9.]/g, "")) || 0;
    return Math.round(h * 60);
  }

  const num = parseFloat(s);
  if (isNaN(num)) return 0;

  // If <= 4, assume hours (e.g. 0.5 = 30m, 1 = 60m), otherwise minutes
  if (num <= 4 && s.includes(".")) {
    return Math.round(num * 60);
  }
  return Math.round(num);
}

/**
 * Apply FLSA 7-Minute / 15-Minute or Standard Rounding Rules
 */
export function applyTimeRounding(minutes: number, mode: TimeRoundingMode): number {
  if (mode === "none" || minutes <= 0) return minutes;

  if (mode === "5min") {
    return Math.round(minutes / 5) * 5;
  }

  if (mode === "30min") {
    return Math.round(minutes / 30) * 30;
  }

  if (mode === "15min_7rule") {
    // 7-Minute Rule:
    // 1-7 mins round down (0)
    // 8-14 mins round up to 15
    const rem = minutes % 15;
    const base = Math.floor(minutes / 15) * 15;
    if (rem <= 7) {
      return base;
    } else {
      return base + 15;
    }
  }

  return minutes;
}

/**
 * Complete Weekly Payroll Calculation Engine
 */
export function calculateWeeklyPayroll(params: TimeCardCalculationParams): WeeklyPayrollResult {
  const rate = Math.max(0, params.hourlyRate || 0);
  const otMult = params.overtimeMultiplier || 1.5;
  const dtMult = params.doubleTimeMultiplier || 2.0;
  const rounding = params.roundingMode || "none";
  const otRule = params.overtimeRule || "weekly_40";

  const dailyResults: DayShiftResult[] = [];

  let accumulatedWeeklyHours = 0;
  let totalOvertimeHours = 0;
  let totalDoubleTimeHours = 0;
  let totalRegularHours = 0;
  let totalBreakMinutes = 0;

  for (const shift of params.shifts) {
    const sMin = parseFlexibleTimeString(shift.fromTime);
    const eMin = parseFlexibleTimeString(shift.toTime);
    const brkMin = parseBreakDeduction(shift.breakDeduction);

    if (sMin === null || eMin === null) {
      dailyResults.push({
        dayName: shift.dayName,
        rawHoursWorked: 0,
        roundedHoursWorked: 0,
        breakMinutesDeducted: 0,
        regularHours: 0,
        overtimeHours: 0,
        doubleTimeHours: 0,
        dailyGrossPay: 0,
        formattedDuration: "0.00 hrs",
        hasErrors: false,
      });
      continue;
    }

    let rawShiftMin = eMin - sMin;
    if (rawShiftMin < 0) {
      rawShiftMin += 1440; // Overnight shift crossing midnight
    }

    const netMin = Math.max(0, rawShiftMin - brkMin);
    const roundedMin = applyTimeRounding(netMin, rounding);
    const roundedHours = parseFloat((roundedMin / 60).toFixed(4));
    const rawHours = parseFloat((netMin / 60).toFixed(4));

    totalBreakMinutes += brkMin;

    let dayReg = roundedHours;
    let dayOt = 0;
    let dayDt = 0;

    if (otRule === "daily_8_weekly_40") {
      // California Rule: Over 8h = 1.5x OT, Over 12h = 2.0x DT
      if (roundedHours > 12) {
        dayReg = 8;
        dayOt = 4;
        dayDt = roundedHours - 12;
      } else if (roundedHours > 8) {
        dayReg = 8;
        dayOt = roundedHours - 8;
        dayDt = 0;
      }
    } else if (otRule === "daily_10") {
      if (roundedHours > 10) {
        dayReg = 10;
        dayOt = roundedHours - 10;
      }
    } else if (otRule === "weekly_40") {
      // Standard FLSA Weekly Overtime
      const prior = accumulatedWeeklyHours;
      const next = prior + roundedHours;

      if (prior >= 40) {
        dayReg = 0;
        dayOt = roundedHours;
      } else if (next > 40) {
        dayReg = 40 - prior;
        dayOt = next - 40;
      } else {
        dayReg = roundedHours;
        dayOt = 0;
      }
    }

    accumulatedWeeklyHours += roundedHours;
    totalRegularHours += dayReg;
    totalOvertimeHours += dayOt;
    totalDoubleTimeHours += dayDt;

    const dailyGross = parseFloat((dayReg * rate + dayOt * rate * otMult + dayDt * rate * dtMult).toFixed(2));

    const h = Math.floor(roundedMin / 60);
    const m = roundedMin % 60;
    const formattedDuration = `${h}h ${String(m).padStart(2, "0")}m (${roundedHours.toFixed(2)}h)`;

    dailyResults.push({
      dayName: shift.dayName,
      rawHoursWorked: rawHours,
      roundedHoursWorked: roundedHours,
      breakMinutesDeducted: brkMin,
      regularHours: parseFloat(dayReg.toFixed(4)),
      overtimeHours: parseFloat(dayOt.toFixed(4)),
      doubleTimeHours: parseFloat(dayDt.toFixed(4)),
      dailyGrossPay: dailyGross,
      formattedDuration,
      hasErrors: false,
    });
  }

  const regularPay = parseFloat((totalRegularHours * rate).toFixed(2));
  const overtimePay = parseFloat((totalOvertimeHours * rate * otMult).toFixed(2));
  const doubleTimePay = parseFloat((totalDoubleTimeHours * rate * dtMult).toFixed(2));
  const totalGrossPay = parseFloat((regularPay + overtimePay + doubleTimePay).toFixed(2));

  const totalWeeklyHours = parseFloat(accumulatedWeeklyHours.toFixed(4));
  const totalBreakHours = parseFloat((totalBreakMinutes / 60).toFixed(2));
  const effectiveHourlyRate = totalWeeklyHours > 0 ? parseFloat((totalGrossPay / totalWeeklyHours).toFixed(2)) : rate;

  return {
    dailyResults,
    totalWeeklyHours,
    totalRegularHours: parseFloat(totalRegularHours.toFixed(4)),
    totalOvertimeHours: parseFloat(totalOvertimeHours.toFixed(4)),
    totalDoubleTimeHours: parseFloat(totalDoubleTimeHours.toFixed(4)),
    totalBreakHours,
    regularPay,
    overtimePay,
    doubleTimePay,
    totalGrossPay,
    effectiveHourlyRate,
  };
}

// =========================================================================
// 3. FLSA EMPLOYEE EXEMPTION EVALUATION ENGINE
// =========================================================================

export interface ExemptionEvaluationParams {
  weeklySalary: number;
  isSalaryPaid: boolean;
  category: "executive" | "administrative" | "professional" | "computer" | "outside_sales" | "blue_collar_first_responder";
  managesDepartment?: boolean;
  supervisesTwoPlus?: boolean;
  nonManualOfficeWork?: boolean;
  advancedSpecializedKnowledge?: boolean;
}

export interface ExemptionEvaluationResult {
  isExempt: boolean;
  classification: "Exempt" | "Non-Exempt";
  statusTitle: string;
  reason: string;
  salaryThresholdPassed: boolean;
  dutiesThresholdPassed: boolean;
  flsaRuleReference: string;
}

export function evaluateFLSAExemption(params: ExemptionEvaluationParams): ExemptionEvaluationResult {
  const salaryThresholdPassed = params.weeklySalary >= 684 && params.isSalaryPaid;

  if (params.category === "blue_collar_first_responder") {
    return {
      isExempt: false,
      classification: "Non-Exempt",
      statusTitle: "Non-Exempt Employee (Entitled to Overtime)",
      reason: "Blue-collar manual workers, construction laborers, electricians, plumbers, and first responders (police, firefighters, paramedics) are Non-Exempt by federal law, regardless of salary level.",
      salaryThresholdPassed,
      dutiesThresholdPassed: false,
      flsaRuleReference: "29 C.F.R. § 541.3 - First Responders & Blue Collar Workers",
    };
  }

  if (params.category === "outside_sales") {
    return {
      isExempt: true,
      classification: "Exempt",
      statusTitle: "Exempt (Outside Sales Exemption)",
      reason: "Outside sales employees whose primary duty is making sales or obtaining contracts outside the employer's place of business are exempt from both minimum wage and overtime requirements without salary threshold requirements.",
      salaryThresholdPassed: true,
      dutiesThresholdPassed: true,
      flsaRuleReference: "29 C.F.R. § 541.500 - Outside Sales Exemption",
    };
  }

  if (!salaryThresholdPassed) {
    return {
      isExempt: false,
      classification: "Non-Exempt",
      statusTitle: "Non-Exempt (Salary Level Test Failed)",
      reason: `Earnings are below the FLSA federal salary minimum of $684 per week ($35,568/year) or employee is paid hourly rather than a guaranteed salary basis.`,
      salaryThresholdPassed: false,
      dutiesThresholdPassed: false,
      flsaRuleReference: "29 C.F.R. § 541.600 - Standard Salary Level ($684/wk)",
    };
  }

  let dutiesPassed = false;
  let reason = "";

  if (params.category === "executive") {
    dutiesPassed = Boolean(params.managesDepartment && params.supervisesTwoPlus);
    reason = dutiesPassed
      ? "Meets executive exemption: Manages a department and regularly directs the work of two or more full-time employees."
      : "Fails executive exemption: Must manage an enterprise/subdivision and supervise at least two full-time employees.";
  } else if (params.category === "administrative") {
    dutiesPassed = Boolean(params.nonManualOfficeWork);
    reason = dutiesPassed
      ? "Meets administrative exemption: Performs non-manual office work directly related to management or general business operations."
      : "Fails administrative exemption: Primary duty must involve the exercise of discretion and independent judgment on significant business matters.";
  } else if (params.category === "professional") {
    dutiesPassed = Boolean(params.advancedSpecializedKnowledge);
    reason = dutiesPassed
      ? "Meets learned professional exemption: Work requires advanced knowledge in a specialized field of science or learning."
      : "Fails professional exemption: Must require an advanced academic degree or creative intellectual output.";
  } else if (params.category === "computer") {
    dutiesPassed = true;
    reason = "Meets computer employee exemption: High-level systems analysis, programming, or software engineering.";
  }

  return {
    isExempt: dutiesPassed,
    classification: dutiesPassed ? "Exempt" : "Non-Exempt",
    statusTitle: dutiesPassed ? "Exempt Employee (No Overtime Required)" : "Non-Exempt Employee (Entitled to Overtime)",
    reason,
    salaryThresholdPassed: true,
    dutiesThresholdPassed: dutiesPassed,
    flsaRuleReference: "FLSA Section 13(a)(1) White Collar Exemptions",
  };
}
