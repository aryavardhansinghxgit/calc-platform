/**
 * Pure Mathematical Logic for Simple Interest Engine.
 */

export type SimpleInterestMode = "balance" | "principal" | "rate" | "term";
export type TimeUnit = "years" | "months" | "weeks" | "days";

export interface SimpleInterestFormulaInput {
  mode?: SimpleInterestMode;
  principal?: number;
  annualRatePercent?: number;
  term?: number;
  timeUnit?: TimeUnit;
  targetInterest?: number;
  targetFinalBalance?: number;
  currencySymbol?: string;
}

export interface ScheduleRow {
  year: number;
  openingBalance: number;
  interestEarned: number;
  closingBalance: number;
}

export interface DerivationStep {
  title: string;
  formula: string;
  substitution: string;
  result: string;
}

export interface SimpleVsCompoundComparison {
  principal: number;
  annualRatePercent: number;
  years: number;
  simpleInterestTotal: number;
  simpleFinalBalance: number;
  compoundInterestTotal: number;
  compoundFinalBalance: number;
  interestDifference: number;
  additionalWealthPercent: number;
}

export interface SimpleInterestFormulaResult {
  mode: SimpleInterestMode;
  principal: number;
  annualRatePercent: number;
  term: number;
  timeUnit: TimeUnit;
  termInYears: number;
  totalInterest: number;
  finalBalance: number;
  roiPercent: number;
  interestPercentOfBalance: number;
  principalPercentOfBalance: number;
  interestPerYear: number;
  interestPerMonth: number;
  interestPerDay: number;
  derivationSteps: DerivationStep[];
  schedule: ScheduleRow[];
  comparison: SimpleVsCompoundComparison;
}

export function getYearsFromTimeUnit(term: number, unit: TimeUnit): number {
  const t = Math.max(0, term);
  switch (unit) {
    case "years":
      return t;
    case "months":
      return t / 12;
    case "weeks":
      return t / 52;
    case "days":
      return t / 365;
    default:
      return t;
  }
}

export function convertYearsToTimeUnit(years: number, unit: TimeUnit): number {
  const y = Math.max(0, years);
  switch (unit) {
    case "years":
      return y;
    case "months":
      return y * 12;
    case "weeks":
      return y * 52;
    case "days":
      return y * 365;
    default:
      return y;
  }
}

export function calculateSimpleInterestFormula(
  inputs: SimpleInterestFormulaInput
): SimpleInterestFormulaResult {
  const mode: SimpleInterestMode = inputs.mode || "balance";
  const timeUnit: TimeUnit = inputs.timeUnit || "years";
  const currency = inputs.currencySymbol || "$";

  let P = Math.max(0, inputs.principal ?? 20000);
  let r = Math.max(0, inputs.annualRatePercent ?? 3.0);
  let termInput = Math.max(0, inputs.term ?? 10);
  let termInYears = getYearsFromTimeUnit(termInput, timeUnit);
  let totalInterest = 0;
  let finalBalance = 0;

  const derivationSteps: DerivationStep[] = [];

  // ==========================================
  // MODE 1: CALCULATE FINAL BALANCE
  // ==========================================
  if (mode === "balance") {
    totalInterest = P * (r / 100) * termInYears;
    finalBalance = P + totalInterest;

    derivationSteps.push({
      title: "Step 1: Calculate Total Simple Interest (I = P × r × t)",
      formula: "I = P × (r / 100) × t",
      substitution: `I = ${currency}${P.toLocaleString()} × (${r}% / 100) × ${termInYears.toFixed(4)} yrs`,
      result: `I = ${currency}${Math.round(totalInterest).toLocaleString()}`,
    });

    derivationSteps.push({
      title: "Step 2: Calculate Final Ending Balance (A = P + I)",
      formula: "A = P + I",
      substitution: `A = ${currency}${P.toLocaleString()} + ${currency}${Math.round(totalInterest).toLocaleString()}`,
      result: `A = ${currency}${Math.round(finalBalance).toLocaleString()}`,
    });
  }
  // ==========================================
  // MODE 2: CALCULATE PRINCIPAL
  // ==========================================
  else if (mode === "principal") {
    if (inputs.targetInterest && inputs.targetInterest > 0) {
      totalInterest = inputs.targetInterest;
      const rateDecimal = r / 100;
      P = termInYears > 0 && rateDecimal > 0 ? totalInterest / (rateDecimal * termInYears) : 0;
      finalBalance = P + totalInterest;

      derivationSteps.push({
        title: "Step 1: Calculate Required Principal (P = I / (r × t))",
        formula: "P = I / ((r / 100) × t)",
        substitution: `P = ${currency}${totalInterest.toLocaleString()} / ((${r}% / 100) × ${termInYears.toFixed(4)} yrs)`,
        result: `P = ${currency}${Math.round(P).toLocaleString()}`,
      });
    } else {
      finalBalance = Math.max(0, inputs.targetFinalBalance ?? 26000);
      const rateDecimal = r / 100;
      const multiplier = 1 + rateDecimal * termInYears;
      P = multiplier > 0 ? finalBalance / multiplier : 0;
      totalInterest = Math.max(0, finalBalance - P);

      derivationSteps.push({
        title: "Step 1: Calculate Required Principal from Ending Balance (P = A / (1 + r × t))",
        formula: "P = A / (1 + (r / 100) × t)",
        substitution: `P = ${currency}${finalBalance.toLocaleString()} / (1 + (${r}% / 100) × ${termInYears.toFixed(4)} yrs)`,
        result: `P = ${currency}${Math.round(P).toLocaleString()}`,
      });
    }
  }
  // ==========================================
  // MODE 3: CALCULATE INTEREST RATE
  // ==========================================
  else if (mode === "rate") {
    if (inputs.targetInterest && inputs.targetInterest > 0) {
      totalInterest = inputs.targetInterest;
      finalBalance = P + totalInterest;
    } else {
      finalBalance = Math.max(P, inputs.targetFinalBalance ?? 26000);
      totalInterest = Math.max(0, finalBalance - P);
    }

    const denominator = P * termInYears;
    r = denominator > 0 ? (totalInterest / denominator) * 100 : 0;

    derivationSteps.push({
      title: "Step 1: Calculate Required Annual Interest Rate (r = I / (P × t))",
      formula: "r = (I / (P × t)) × 100%",
      substitution: `r = (${currency}${totalInterest.toLocaleString()} / (${currency}${P.toLocaleString()} × ${termInYears.toFixed(4)} yrs)) × 100%`,
      result: `r = ${r.toFixed(4)}%`,
    });
  }
  // ==========================================
  // MODE 4: CALCULATE TERM
  // ==========================================
  else if (mode === "term") {
    if (inputs.targetInterest && inputs.targetInterest > 0) {
      totalInterest = inputs.targetInterest;
      finalBalance = P + totalInterest;
    } else {
      finalBalance = Math.max(P, inputs.targetFinalBalance ?? 26000);
      totalInterest = Math.max(0, finalBalance - P);
    }

    const rateDecimal = r / 100;
    const denominator = P * rateDecimal;
    termInYears = denominator > 0 ? totalInterest / denominator : 0;
    termInput = convertYearsToTimeUnit(termInYears, timeUnit);

    derivationSteps.push({
      title: "Step 1: Calculate Required Time Horizon (t = I / (P × r))",
      formula: "t_years = I / (P × (r / 100))",
      substitution: `t_years = ${currency}${totalInterest.toLocaleString()} / (${currency}${P.toLocaleString()} × (${r}% / 100))`,
      result: `t = ${termInYears.toFixed(4)} Years (${termInput.toFixed(2)} ${timeUnit})`,
    });
  }

  // Round values
  totalInterest = Math.round(totalInterest * 100) / 100;
  finalBalance = Math.round(finalBalance * 100) / 100;
  P = Math.round(P * 100) / 100;
  r = Math.round(r * 10000) / 10000;

  // Breakdown percentages
  const roiPercent = P > 0 ? (totalInterest / P) * 100 : 0;
  const interestPercentOfBalance = finalBalance > 0 ? (totalInterest / finalBalance) * 100 : 0;
  const principalPercentOfBalance = finalBalance > 0 ? (P / finalBalance) * 100 : 0;

  // Periodic earnings
  const safeTermYears = Math.max(termInYears, 1 / 365);
  const interestPerYear = totalInterest / safeTermYears;
  const interestPerMonth = totalInterest / (safeTermYears * 12);
  const interestPerDay = totalInterest / (safeTermYears * 365);

  // Generate Yearly Schedule
  const schedule: ScheduleRow[] = [];
  const totalYearsCount = Math.max(1, Math.min(Math.ceil(termInYears), 50));
  const annualInterestAmount = totalInterest / safeTermYears;

  let currentOpening = P;
  for (let yr = 1; yr <= totalYearsCount; yr++) {
    const interestThisYear = annualInterestAmount;
    const currentClosing = currentOpening + interestThisYear;
    schedule.push({
      year: yr,
      openingBalance: Math.round(currentOpening * 100) / 100,
      interestEarned: Math.round(interestThisYear * 100) / 100,
      closingBalance: Math.round(currentClosing * 100) / 100,
    });
    currentOpening = currentClosing;
  }

  // Generate Simple vs Compound Comparison
  const rateDec = r / 100;
  const simpleFinal = P + totalInterest;

  // Monthly compound interest comparison
  const compoundFinal = P * Math.pow(1 + rateDec / 12, 12 * safeTermYears);
  const compoundInterestTotal = Math.max(0, compoundFinal - P);
  const interestDiff = Math.max(0, compoundInterestTotal - totalInterest);
  const additionalWealthPercent = totalInterest > 0 ? (interestDiff / totalInterest) * 100 : 0;

  const comparison: SimpleVsCompoundComparison = {
    principal: P,
    annualRatePercent: r,
    years: safeTermYears,
    simpleInterestTotal: Math.round(totalInterest * 100) / 100,
    simpleFinalBalance: Math.round(simpleFinal * 100) / 100,
    compoundInterestTotal: Math.round(compoundInterestTotal * 100) / 100,
    compoundFinalBalance: Math.round(compoundFinal * 100) / 100,
    interestDifference: Math.round(interestDiff * 100) / 100,
    additionalWealthPercent: Math.round(additionalWealthPercent * 100) / 100,
  };

  return {
    mode,
    principal: P,
    annualRatePercent: r,
    term: Math.round(termInput * 100) / 100,
    timeUnit,
    termInYears: Math.round(termInYears * 10000) / 10000,
    totalInterest,
    finalBalance,
    roiPercent: Math.round(roiPercent * 100) / 100,
    interestPercentOfBalance: Math.round(interestPercentOfBalance * 100) / 100,
    principalPercentOfBalance: Math.round(principalPercentOfBalance * 100) / 100,
    interestPerYear: Math.round(interestPerYear * 100) / 100,
    interestPerMonth: Math.round(interestPerMonth * 100) / 100,
    interestPerDay: Math.round(interestPerDay * 100) / 100,
    derivationSteps,
    schedule,
    comparison,
  };
}
