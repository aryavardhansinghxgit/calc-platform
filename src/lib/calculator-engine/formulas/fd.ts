/**
 * Pure Mathematical Engine for Fixed Deposit (FD) Calculations.
 * Supports:
 * - Cumulative FD (Compounded interest paid at maturity)
 * - Non-Cumulative FD (Periodic interest payout: monthly, quarterly, half-yearly, annually)
 * - Simple Interest FD
 * - Senior Citizen Interest Boost (+0.50% p.a.)
 * - Goal Seeking (Required deposit for target maturity value)
 * - Inflation Adjustment (Real Purchasing Power)
 * - Tax Drag / TDS Deduction (Tax Deducted at Source)
 * - Bank Rate Benchmarking Matrix
 * - What-If Sensitivity Matrix (Rate vs Tenure)
 * - Monthly & Annual Growth Schedules
 */

export type FdType = "cumulative" | "non-cumulative" | "simple" | "goal" | "bank-compare";
export type FdCompoundingFrequency = "monthly" | "quarterly" | "half-yearly" | "annually";
export type FdPayoutFrequency = "monthly" | "quarterly" | "half-yearly" | "annually" | "at-maturity";

export interface FdFormulaInput {
  fdType?: FdType;
  depositAmount?: number;
  interestRate?: number; // annual percentage, e.g., 7.5 for 7.5%
  tenureYears?: number;
  tenureMonths?: number;
  tenureDays?: number;
  compoundingFrequency?: FdCompoundingFrequency;
  payoutFrequency?: FdPayoutFrequency;
  isSeniorCitizen?: boolean; // adds +0.50% to interest rate
  taxRate?: number; // TDS / tax slab percentage, e.g. 10 for 10%
  inflationRate?: number; // annual percentage, e.g. 4 for 4%
  targetMaturityAmount?: number; // target maturity for Goal Seeker
}

export interface FdAnnualScheduleRow {
  year: number;
  startingBalance: number;
  interestEarned: number;
  cumulativeInterest: number;
  payoutAmount: number;
  endingBalance: number;
  realEndingBalance: number;
  taxPaid: number;
  postTaxEndingBalance: number;
}

export interface FdMonthlyScheduleRow {
  month: number;
  year: number;
  startingBalance: number;
  interestEarned: number;
  payoutAmount: number;
  endingBalance: number;
}

export interface FdSensitivityCell {
  returnRate: number;
  tenureYears: number;
  maturityValue: number;
  depositAmount: number;
  totalInterest: number;
}

export interface FdBankComparison {
  bankName: string;
  regularRate: number;
  seniorRate: number;
  maturityValue: number;
  totalInterest: number;
}

export interface FdGoalSeekResults {
  targetAmount: number;
  requiredDeposit: number;
  yearsToGoal: number;
  achievableValueWithCurrentDeposit: number;
  shortfallOrSurplus: number;
}

export interface FdFormulaResult {
  depositAmount: number;
  interestRate: number;
  effectiveApy: number;
  totalInterestEarned: number;
  maturityAmount: number;
  periodicPayoutAmount: number;
  wealthMultiplier: number;
  inflationAdjustedValue: number;
  postTaxMaturityAmount: number;
  totalTaxPaid: number;
  annualSchedule: FdAnnualScheduleRow[];
  monthlySchedule: FdMonthlyScheduleRow[];
  sensitivityMatrix: FdSensitivityCell[];
  bankComparisons: FdBankComparison[];
  goalSeek: FdGoalSeekResults;
  fdHealthScore: number;
  healthRating: "Excellent" | "Good" | "Fair" | "Needs Attention";
}

function getCompoundingCount(freq: FdCompoundingFrequency = "quarterly"): number {
  switch (freq) {
    case "annually":
      return 1;
    case "half-yearly":
      return 2;
    case "monthly":
      return 12;
    case "quarterly":
    default:
      return 4;
  }
}

function getPayoutCount(freq: FdPayoutFrequency = "monthly"): number {
  switch (freq) {
    case "annually":
      return 1;
    case "half-yearly":
      return 2;
    case "quarterly":
      return 4;
    case "monthly":
    default:
      return 12;
  }
}

export function calculateFdFormula(inputs: FdFormulaInput): FdFormulaResult {
  const fdType = inputs.fdType || "cumulative";
  const depositAmount = Math.max(0, inputs.depositAmount ?? 10000);
  let baseRate = Math.max(0, inputs.interestRate ?? 7.5);
  if (inputs.isSeniorCitizen) {
    baseRate += 0.5; // +0.50% Senior Citizen Bonus
  }
  const interestRate = baseRate;

  const totalTenureYears = Math.max(
    0.1,
    (inputs.tenureYears ?? 5) + (inputs.tenureMonths ?? 0) / 12 + (inputs.tenureDays ?? 0) / 365
  );

  const compoundingFrequency = inputs.compoundingFrequency || "quarterly";
  const payoutFrequency = inputs.payoutFrequency || "monthly";
  const taxRate = Math.max(0, inputs.taxRate ?? 10);
  const inflationRate = Math.max(0, inputs.inflationRate ?? 4);
  const targetMaturityAmount = Math.max(0, inputs.targetMaturityAmount ?? 25000);

  const annualRate = interestRate / 100;
  const n = getCompoundingCount(compoundingFrequency);
  const totalMonths = Math.round(totalTenureYears * 12);

  let maturityAmount = 0;
  let totalInterestEarned = 0;
  let periodicPayoutAmount = 0;
  let effectiveApy = 0;

  const annualSchedule: FdAnnualScheduleRow[] = [];
  const monthlySchedule: FdMonthlyScheduleRow[] = [];

  if (fdType === "simple") {
    // Simple Interest FD: A = P + (P * r * t)
    totalInterestEarned = depositAmount * annualRate * totalTenureYears;
    maturityAmount = depositAmount + totalInterestEarned;
    effectiveApy = interestRate;

    let currentBal = depositAmount;
    const monthlyInt = totalInterestEarned / totalMonths;

    for (let m = 1; m <= totalMonths; m++) {
      const monthStart = currentBal;
      currentBal += monthlyInt;

      monthlySchedule.push({
        month: m,
        year: Math.ceil(m / 12),
        startingBalance: Math.round(monthStart * 100) / 100,
        interestEarned: Math.round(monthlyInt * 100) / 100,
        payoutAmount: 0,
        endingBalance: Math.round(currentBal * 100) / 100,
      });

      if (m % 12 === 0 || m === totalMonths) {
        const yearNum = Math.ceil(m / 12);
        const yearStart = annualSchedule.length === 0 ? depositAmount : annualSchedule[annualSchedule.length - 1].endingBalance;
        const yearInt = currentBal - yearStart;
        const inflationFactor = Math.pow(1 + inflationRate / 100, yearNum);
        const realEnding = currentBal / inflationFactor;

        const gain = currentBal - depositAmount;
        const taxPaid = gain * (taxRate / 100);
        const postTaxEnding = currentBal - taxPaid;

        annualSchedule.push({
          year: yearNum,
          startingBalance: Math.round(yearStart * 100) / 100,
          interestEarned: Math.round(yearInt * 100) / 100,
          cumulativeInterest: Math.round((currentBal - depositAmount) * 100) / 100,
          payoutAmount: 0,
          endingBalance: Math.round(currentBal * 100) / 100,
          realEndingBalance: Math.round(realEnding * 100) / 100,
          taxPaid: Math.round(taxPaid * 100) / 100,
          postTaxEndingBalance: Math.round(postTaxEnding * 100) / 100,
        });
      }
    }
  } else if (fdType === "non-cumulative") {
    // Non-Cumulative FD: Principal remains constant, interest is paid out periodically
    const payoutsPerYear = getPayoutCount(payoutFrequency);
    const periodicRate = annualRate / payoutsPerYear;
    periodicPayoutAmount = depositAmount * periodicRate;
    totalInterestEarned = periodicPayoutAmount * payoutsPerYear * totalTenureYears;
    maturityAmount = depositAmount; // Principal returned at maturity
    effectiveApy = interestRate;

    let cumPayouts = 0;
    const monthlyPayout = totalInterestEarned / totalMonths;

    for (let m = 1; m <= totalMonths; m++) {
      cumPayouts += monthlyPayout;

      monthlySchedule.push({
        month: m,
        year: Math.ceil(m / 12),
        startingBalance: depositAmount,
        interestEarned: Math.round(monthlyPayout * 100) / 100,
        payoutAmount: Math.round(monthlyPayout * 100) / 100,
        endingBalance: depositAmount,
      });

      if (m % 12 === 0 || m === totalMonths) {
        const yearNum = Math.ceil(m / 12);
        const yearInt = monthlyPayout * 12;
        const inflationFactor = Math.pow(1 + inflationRate / 100, yearNum);
        const realEnding = depositAmount / inflationFactor;
        const taxPaid = cumPayouts * (taxRate / 100);

        annualSchedule.push({
          year: yearNum,
          startingBalance: depositAmount,
          interestEarned: Math.round(yearInt * 100) / 100,
          cumulativeInterest: Math.round(cumPayouts * 100) / 100,
          payoutAmount: Math.round(yearInt * 100) / 100,
          endingBalance: depositAmount,
          realEndingBalance: Math.round(realEnding * 100) / 100,
          taxPaid: Math.round(taxPaid * 100) / 100,
          postTaxEndingBalance: Math.round((depositAmount + cumPayouts - taxPaid) * 100) / 100,
        });
      }
    }
  } else {
    // Cumulative Compound FD (Default): A = P * (1 + r/n)^(n*t)
    maturityAmount = depositAmount * Math.pow(1 + annualRate / n, n * totalTenureYears);
    totalInterestEarned = Math.max(0, maturityAmount - depositAmount);
    effectiveApy = (Math.pow(1 + annualRate / n, n) - 1) * 100;

    let currentBal = depositAmount;
    const monthlyCompoundRate = Math.pow(1 + annualRate / n, n / 12) - 1;

    for (let m = 1; m <= totalMonths; m++) {
      const monthStart = currentBal;
      const monthInt = monthStart * monthlyCompoundRate;
      currentBal += monthInt;

      monthlySchedule.push({
        month: m,
        year: Math.ceil(m / 12),
        startingBalance: Math.round(monthStart * 100) / 100,
        interestEarned: Math.round(monthInt * 100) / 100,
        payoutAmount: 0,
        endingBalance: Math.round(currentBal * 100) / 100,
      });

      if (m % 12 === 0 || m === totalMonths) {
        const yearNum = Math.ceil(m / 12);
        const yearStart = annualSchedule.length === 0 ? depositAmount : annualSchedule[annualSchedule.length - 1].endingBalance;
        const yearInt = currentBal - yearStart;
        const inflationFactor = Math.pow(1 + inflationRate / 100, yearNum);
        const realEnding = currentBal / inflationFactor;

        const gain = currentBal - depositAmount;
        const taxPaid = gain * (taxRate / 100);
        const postTaxEnding = currentBal - taxPaid;

        annualSchedule.push({
          year: yearNum,
          startingBalance: Math.round(yearStart * 100) / 100,
          interestEarned: Math.round(yearInt * 100) / 100,
          cumulativeInterest: Math.round((currentBal - depositAmount) * 100) / 100,
          payoutAmount: 0,
          endingBalance: Math.round(currentBal * 100) / 100,
          realEndingBalance: Math.round(realEnding * 100) / 100,
          taxPaid: Math.round(taxPaid * 100) / 100,
          postTaxEndingBalance: Math.round(postTaxEnding * 100) / 100,
        });
      }
    }
  }

  const wealthMultiplier = depositAmount > 0 ? Math.round((maturityAmount / depositAmount) * 100) / 100 : 0;

  // Inflation-Adjusted Maturity Value
  const totalInflationFactor = Math.pow(1 + inflationRate / 100, totalTenureYears);
  const inflationAdjustedValue = Math.round((maturityAmount / totalInflationFactor) * 100) / 100;

  // Post-Tax Maturity Value
  const totalTaxPaid = Math.round(totalInterestEarned * (taxRate / 100) * 100) / 100;
  const postTaxMaturityAmount = Math.round((maturityAmount - totalTaxPaid) * 100) / 100;

  // ----------------------------------------------------
  // GOAL SEEKING CALCULATIONS
  // ----------------------------------------------------
  let requiredDeposit = 0;
  if (annualRate > 0) {
    requiredDeposit = targetMaturityAmount / Math.pow(1 + annualRate / n, n * totalTenureYears);
  } else {
    requiredDeposit = targetMaturityAmount;
  }

  const goalSeek: FdGoalSeekResults = {
    targetAmount: targetMaturityAmount,
    requiredDeposit: Math.round(requiredDeposit * 100) / 100,
    yearsToGoal: totalTenureYears,
    achievableValueWithCurrentDeposit: Math.round(maturityAmount * 100) / 100,
    shortfallOrSurplus: Math.round((maturityAmount - targetMaturityAmount) * 100) / 100,
  };

  // ----------------------------------------------------
  // BANK RATE COMPARISON MATRIX
  // ----------------------------------------------------
  const banksPreset = [
    { name: "SBI (State Bank of India)", regRate: 6.8, senRate: 7.3 },
    { name: "HDFC Bank", regRate: 7.25, senRate: 7.75 },
    { name: "ICICI Bank", regRate: 7.2, senRate: 7.7 },
    { name: "Axis Bank", regRate: 7.25, senRate: 7.75 },
    { name: "Post Office Time Deposit", regRate: 7.5, senRate: 7.5 },
    { name: "Bank of Baroda", regRate: 7.15, senRate: 7.65 },
  ];

  const bankComparisons: FdBankComparison[] = banksPreset.map((b) => {
    const rateToUse = inputs.isSeniorCitizen ? b.senRate : b.regRate;
    const rBank = rateToUse / 100;
    const matVal = depositAmount * Math.pow(1 + rBank / 4, 4 * totalTenureYears);
    const intVal = Math.max(0, matVal - depositAmount);
    return {
      bankName: b.name,
      regularRate: b.regRate,
      seniorRate: b.senRate,
      maturityValue: Math.round(matVal),
      totalInterest: Math.round(intVal),
    };
  });

  // ----------------------------------------------------
  // WHAT-IF SENSITIVITY MATRIX (Rate vs Tenure)
  // ----------------------------------------------------
  const ratesToTest = [6.0, 6.5, 7.0, 7.5, 8.0, 8.5];
  const tenuresToTest = [1, 2, 3, 5, 7, 10];
  const sensitivityMatrix: FdSensitivityCell[] = [];

  ratesToTest.forEach((r) => {
    tenuresToTest.forEach((t) => {
      const rVal = r / 100;
      const matVal = depositAmount * Math.pow(1 + rVal / 4, 4 * t);
      const intVal = Math.max(0, matVal - depositAmount);

      sensitivityMatrix.push({
        returnRate: r,
        tenureYears: t,
        maturityValue: Math.round(matVal),
        depositAmount,
        totalInterest: Math.round(intVal),
      });
    });
  });

  // ----------------------------------------------------
  // FD HEALTH SCORE & RATING
  // ----------------------------------------------------
  let fdHealthScore = 75;
  if (interestRate >= 7.5) fdHealthScore += 10;
  else if (interestRate >= 6.5) fdHealthScore += 5;

  if (totalTenureYears >= 5) fdHealthScore += 10;
  if (inputs.isSeniorCitizen) fdHealthScore += 5;

  fdHealthScore = Math.min(100, Math.max(40, fdHealthScore));

  let healthRating: "Excellent" | "Good" | "Fair" | "Needs Attention" = "Good";
  if (fdHealthScore >= 90) healthRating = "Excellent";
  else if (fdHealthScore >= 75) healthRating = "Good";
  else if (fdHealthScore >= 60) healthRating = "Fair";
  else healthRating = "Needs Attention";

  return {
    depositAmount: Math.round(depositAmount * 100) / 100,
    interestRate: Math.round(interestRate * 100) / 100,
    effectiveApy: Math.round(effectiveApy * 100) / 100,
    totalInterestEarned: Math.round(totalInterestEarned * 100) / 100,
    maturityAmount: Math.round(maturityAmount * 100) / 100,
    periodicPayoutAmount: Math.round(periodicPayoutAmount * 100) / 100,
    wealthMultiplier,
    inflationAdjustedValue,
    postTaxMaturityAmount,
    totalTaxPaid,
    annualSchedule,
    monthlySchedule,
    sensitivityMatrix,
    bankComparisons,
    goalSeek,
    fdHealthScore,
    healthRating,
  };
}
