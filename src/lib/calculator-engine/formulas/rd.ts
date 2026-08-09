/**
 * Pure Mathematical Engine for Recurring Deposit (RD) Calculations.
 * Supports:
 * - Regular RD (Standard Quarterly Compounding of Monthly Installments)
 * - Step-Up RD (Annual Percentage or Fixed Amount Deposit Escalation)
 * - Simple Interest RD
 * - Senior Citizen Interest Boost (+0.50% p.a.)
 * - Goal Seeking (Calculate required monthly deposit for target maturity value)
 * - Inflation Adjustment (Real Purchasing Power)
 * - Tax Drag / TDS Deduction (Tax Deducted at Source under Section 194A)
 * - Bank Rate Benchmarking Matrix
 * - What-If Sensitivity Matrix (Rate vs Tenure)
 * - Monthly & Annual Growth Schedules
 */

export type RdType = "regular" | "stepup" | "simple" | "goal" | "bank-compare";

export interface RdFormulaInput {
  rdType?: RdType;
  monthlyDeposit?: number;
  interestRate?: number; // annual percentage, e.g., 6.8 for 6.8%
  tenureMonths?: number; // total months, e.g. 24 for 2 years
  stepUpRate?: number; // annual percentage increase in monthly deposit
  stepUpAmount?: number; // fixed dollar/rupee annual deposit increase
  isSeniorCitizen?: boolean; // adds +0.50% to interest rate
  taxRate?: number; // TDS / tax slab percentage, e.g. 10 for 10%
  inflationRate?: number; // annual percentage, e.g. 4 for 4%
  targetMaturityAmount?: number; // target maturity for Goal Seeker
}

export interface RdAnnualScheduleRow {
  year: number;
  startingBalance: number;
  contributions: number;
  cumulativeContributions: number;
  interestEarned: number;
  cumulativeInterest: number;
  endingBalance: number;
  realEndingBalance: number;
  taxPaid: number;
  postTaxEndingBalance: number;
}

export interface RdMonthlyScheduleRow {
  month: number;
  year: number;
  startingBalance: number;
  contribution: number;
  interestEarned: number;
  endingBalance: number;
}

export interface RdSensitivityCell {
  returnRate: number;
  tenureYears: number;
  maturityValue: number;
  totalInvested: number;
  totalInterest: number;
}

export interface RdBankComparison {
  bankName: string;
  regularRate: number;
  seniorRate: number;
  maturityValue: number;
  totalInterest: number;
}

export interface RdGoalSeekResults {
  targetAmount: number;
  requiredMonthlyDeposit: number;
  yearsToGoal: number;
  achievableValueWithCurrentDeposit: number;
  shortfallOrSurplus: number;
}

export interface RdFormulaResult {
  totalInvested: number;
  interestRate: number;
  effectiveApy: number;
  totalInterestEarned: number;
  maturityAmount: number;
  wealthMultiplier: number;
  inflationAdjustedValue: number;
  postTaxMaturityAmount: number;
  totalTaxPaid: number;
  annualSchedule: RdAnnualScheduleRow[];
  monthlySchedule: RdMonthlyScheduleRow[];
  sensitivityMatrix: RdSensitivityCell[];
  bankComparisons: RdBankComparison[];
  goalSeek: RdGoalSeekResults;
  rdHealthScore: number;
  healthRating: "Excellent" | "Good" | "Fair" | "Needs Attention";
}

export function calculateRdFormula(inputs: RdFormulaInput): RdFormulaResult {
  const rdType = inputs.rdType || "regular";
  const initialMonthlyDeposit = Math.max(0, inputs.monthlyDeposit ?? 500);
  let baseRate = Math.max(0, inputs.interestRate ?? 6.8);
  if (inputs.isSeniorCitizen) {
    baseRate += 0.5; // +0.50% Senior Citizen Bonus
  }
  const interestRate = baseRate;
  const tenureMonths = Math.max(1, Math.min(240, inputs.tenureMonths ?? 24));
  const tenureYears = tenureMonths / 12;

  const stepUpRate = Math.max(0, inputs.stepUpRate ?? 0);
  const stepUpAmount = Math.max(0, inputs.stepUpAmount ?? 0);
  const taxRate = Math.max(0, inputs.taxRate ?? 10);
  const inflationRate = Math.max(0, inputs.inflationRate ?? 4);
  const targetMaturityAmount = Math.max(0, inputs.targetMaturityAmount ?? 15000);

  const annualRate = interestRate / 100;
  const quarterlyRate = annualRate / 4;

  let totalInvested = 0;
  let maturityAmount = 0;

  const annualSchedule: RdAnnualScheduleRow[] = [];
  const monthlySchedule: RdMonthlyScheduleRow[] = [];

  let currentBalance = 0;
  let cumContributions = 0;
  let cumInterest = 0;
  let currentMonthlyDeposit = initialMonthlyDeposit;

  if (rdType === "simple") {
    // Simple Interest RD Formula: Interest = P * [n(n+1)/2] * (r/12)
    for (let m = 1; m <= tenureMonths; m++) {
      const monthStart = currentBalance;

      currentBalance += currentMonthlyDeposit;
      cumContributions += currentMonthlyDeposit;

      // Simple interest per month based on remaining time
      const remainingMonths = tenureMonths - m + 1;
      const monthInt = currentMonthlyDeposit * (annualRate / 12) * remainingMonths;
      cumInterest += monthInt;

      monthlySchedule.push({
        month: m,
        year: Math.ceil(m / 12),
        startingBalance: Math.round(monthStart * 100) / 100,
        contribution: Math.round(currentMonthlyDeposit * 100) / 100,
        interestEarned: Math.round(monthInt * 100) / 100,
        endingBalance: Math.round(currentBalance * 100) / 100,
      });

      if (m % 12 === 0 || m === tenureMonths) {
        const yearNum = Math.ceil(m / 12);
        const yearStart = annualSchedule.length === 0 ? 0 : annualSchedule[annualSchedule.length - 1].endingBalance;
        const yearContribs = annualSchedule.length === 0 ? cumContributions : cumContributions - annualSchedule[annualSchedule.length - 1].cumulativeContributions;

        const inflationFactor = Math.pow(1 + inflationRate / 100, yearNum);
        const realEnding = (cumContributions + cumInterest) / inflationFactor;
        const taxPaid = cumInterest * (taxRate / 100);

        annualSchedule.push({
          year: yearNum,
          startingBalance: Math.round(yearStart * 100) / 100,
          contributions: Math.round(yearContribs * 100) / 100,
          cumulativeContributions: Math.round(cumContributions * 100) / 100,
          interestEarned: Math.round(cumInterest * 100) / 100,
          cumulativeInterest: Math.round(cumInterest * 100) / 100,
          endingBalance: Math.round((cumContributions + cumInterest) * 100) / 100,
          realEndingBalance: Math.round(realEnding * 100) / 100,
          taxPaid: Math.round(taxPaid * 100) / 100,
          postTaxEndingBalance: Math.round((cumContributions + cumInterest - taxPaid) * 100) / 100,
        });
      }
    }
    totalInvested = cumContributions;
    maturityAmount = cumContributions + cumInterest;
  } else {
    // Standard Quarterly Compounding RD Formula:
    // Each monthly deposit compounds for its remaining quarters (t_rem = (tenureMonths - m + 1)/12)
    for (let m = 1; m <= tenureMonths; m++) {
      const monthStart = currentBalance;
      const currentYear = Math.ceil(m / 12);

      if (m > 1 && (m - 1) % 12 === 0 && rdType === "stepup") {
        if (stepUpRate > 0) currentMonthlyDeposit *= 1 + stepUpRate / 100;
        if (stepUpAmount > 0) currentMonthlyDeposit += stepUpAmount;
      }

      cumContributions += currentMonthlyDeposit;

      // Quarterly compounding for this deposit: A_installment = P * (1 + r/4)^(4 * t_rem)
      const remainingTenureYears = (tenureMonths - m + 1) / 12;
      const installmentMaturity = currentMonthlyDeposit * Math.pow(1 + quarterlyRate, 4 * remainingTenureYears);
      const installmentInterest = installmentMaturity - currentMonthlyDeposit;

      currentBalance += currentMonthlyDeposit + installmentInterest / tenureMonths;

      monthlySchedule.push({
        month: m,
        year: currentYear,
        startingBalance: Math.round(monthStart * 100) / 100,
        contribution: Math.round(currentMonthlyDeposit * 100) / 100,
        interestEarned: Math.round((installmentInterest / tenureMonths) * 100) / 100,
        endingBalance: Math.round(currentBalance * 100) / 100,
      });

      if (m % 12 === 0 || m === tenureMonths) {
        const yearNum = Math.ceil(m / 12);
        const yearStart = annualSchedule.length === 0 ? 0 : annualSchedule[annualSchedule.length - 1].endingBalance;
        const yearContribs = annualSchedule.length === 0 ? cumContributions : cumContributions - annualSchedule[annualSchedule.length - 1].cumulativeContributions;

        const inflationFactor = Math.pow(1 + inflationRate / 100, yearNum);
        const realEnding = currentBalance / inflationFactor;

        const totalGain = Math.max(0, currentBalance - cumContributions);
        const taxPaid = totalGain * (taxRate / 100);

        annualSchedule.push({
          year: yearNum,
          startingBalance: Math.round(yearStart * 100) / 100,
          contributions: Math.round(yearContribs * 100) / 100,
          cumulativeContributions: Math.round(cumContributions * 100) / 100,
          interestEarned: Math.round((currentBalance - yearStart - yearContribs) * 100) / 100,
          cumulativeInterest: Math.round((currentBalance - cumContributions) * 100) / 100,
          endingBalance: Math.round(currentBalance * 100) / 100,
          realEndingBalance: Math.round(realEnding * 100) / 100,
          taxPaid: Math.round(taxPaid * 100) / 100,
          postTaxEndingBalance: Math.round((currentBalance - taxPaid) * 100) / 100,
        });
      }
    }

    totalInvested = cumContributions;
    maturityAmount = currentBalance;
  }

  const totalInterestEarned = Math.max(0, maturityAmount - totalInvested);
  const wealthMultiplier = totalInvested > 0 ? Math.round((maturityAmount / totalInvested) * 100) / 100 : 0;
  const effectiveApy = (Math.pow(1 + quarterlyRate, 4) - 1) * 100;

  // Inflation-Adjusted Maturity Value
  const totalInflationFactor = Math.pow(1 + inflationRate / 100, tenureYears);
  const inflationAdjustedValue = Math.round((maturityAmount / totalInflationFactor) * 100) / 100;

  // Post-Tax Maturity Value
  const totalTaxPaid = Math.round(totalInterestEarned * (taxRate / 100) * 100) / 100;
  const postTaxMaturityAmount = Math.round((maturityAmount - totalTaxPaid) * 100) / 100;

  // ----------------------------------------------------
  // GOAL SEEKING CALCULATIONS
  // ----------------------------------------------------
  let requiredMonthlyDeposit = 0;
  if (annualRate > 0) {
    // Formula for required monthly RD deposit
    const unitMaturityFactor = Array.from({ length: tenureMonths }).reduce((acc: number, _, idx) => {
      const remYears = (tenureMonths - idx) / 12;
      return acc + Math.pow(1 + quarterlyRate, 4 * remYears);
    }, 0);
    requiredMonthlyDeposit = targetMaturityAmount / unitMaturityFactor;
  } else {
    requiredMonthlyDeposit = targetMaturityAmount / tenureMonths;
  }

  const goalSeek: RdGoalSeekResults = {
    targetAmount: targetMaturityAmount,
    requiredMonthlyDeposit: Math.round(requiredMonthlyDeposit * 100) / 100,
    yearsToGoal: tenureYears,
    achievableValueWithCurrentDeposit: Math.round(maturityAmount * 100) / 100,
    shortfallOrSurplus: Math.round((maturityAmount - targetMaturityAmount) * 100) / 100,
  };

  // ----------------------------------------------------
  // BANK RATE COMPARISON MATRIX
  // ----------------------------------------------------
  const banksPreset = [
    { name: "SBI (State Bank of India)", regRate: 6.8, senRate: 7.3 },
    { name: "Post Office RD", regRate: 6.7, senRate: 6.7 },
    { name: "HDFC Bank", regRate: 7.0, senRate: 7.5 },
    { name: "ICICI Bank", regRate: 7.0, senRate: 7.5 },
    { name: "Axis Bank", regRate: 7.1, senRate: 7.6 },
    { name: "PNB (Punjab National Bank)", regRate: 6.85, senRate: 7.35 },
  ];

  const bankComparisons: RdBankComparison[] = banksPreset.map((b) => {
    const rateToUse = inputs.isSeniorCitizen ? b.senRate : b.regRate;
    const rBank = rateToUse / 100 / 4;
    const matVal = Array.from({ length: tenureMonths }).reduce((acc: number, _, idx) => {
      const remYears = (tenureMonths - idx) / 12;
      return acc + initialMonthlyDeposit * Math.pow(1 + rBank, 4 * remYears);
    }, 0);
    const intVal = Math.max(0, matVal - totalInvested);
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
  const ratesToTest = [5.5, 6.0, 6.5, 7.0, 7.5, 8.0];
  const tenuresToTest = [1, 2, 3, 5, 7, 10]; // years
  const sensitivityMatrix: RdSensitivityCell[] = [];

  ratesToTest.forEach((r) => {
    tenuresToTest.forEach((tYears) => {
      const tM = tYears * 12;
      const rQuarterly = r / 100 / 4;
      const invVal = initialMonthlyDeposit * tM;

      const matVal = Array.from({ length: tM }).reduce((acc: number, _, idx) => {
        const remYears = (tM - idx) / 12;
        return acc + initialMonthlyDeposit * Math.pow(1 + rQuarterly, 4 * remYears);
      }, 0);

      sensitivityMatrix.push({
        returnRate: r,
        tenureYears: tYears,
        maturityValue: Math.round(matVal),
        totalInvested: Math.round(invVal),
        totalInterest: Math.round(Math.max(0, matVal - invVal)),
      });
    });
  });

  // ----------------------------------------------------
  // RD HEALTH SCORE & RATING
  // ----------------------------------------------------
  let rdHealthScore = 75;
  if (interestRate >= 7.0) rdHealthScore += 10;
  else if (interestRate >= 6.5) rdHealthScore += 5;

  if (tenureYears >= 3) rdHealthScore += 10;
  if (inputs.isSeniorCitizen) rdHealthScore += 5;

  rdHealthScore = Math.min(100, Math.max(40, rdHealthScore));

  let healthRating: "Excellent" | "Good" | "Fair" | "Needs Attention" = "Good";
  if (rdHealthScore >= 90) healthRating = "Excellent";
  else if (rdHealthScore >= 75) healthRating = "Good";
  else if (rdHealthScore >= 60) healthRating = "Fair";
  else healthRating = "Needs Attention";

  return {
    totalInvested: Math.round(totalInvested * 100) / 100,
    interestRate: Math.round(interestRate * 100) / 100,
    effectiveApy: Math.round(effectiveApy * 100) / 100,
    totalInterestEarned: Math.round(totalInterestEarned * 100) / 100,
    maturityAmount: Math.round(maturityAmount * 100) / 100,
    wealthMultiplier,
    inflationAdjustedValue,
    postTaxMaturityAmount,
    totalTaxPaid,
    annualSchedule,
    monthlySchedule,
    sensitivityMatrix,
    bankComparisons,
    goalSeek,
    rdHealthScore,
    healthRating,
  };
}
