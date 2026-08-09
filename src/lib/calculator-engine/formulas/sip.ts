/**
 * Pure Mathematical Engine for Systematic Investment Plan (SIP) & Mutual Fund Calculations.
 * Supports:
 * - Regular SIP
 * - Lumpsum Investment
 * - Step-up (Top-up) SIP (Annual % increase or fixed amount increase)
 * - Goal Seeking (Calculate required SIP or Lumpsum for target wealth)
 * - SWP (Systematic Withdrawal Plan / Retirement Drawdown)
 * - Inflation Adjustment (Real Purchasing Power)
 * - Tax Drag (LTCG / STCG tax deduction)
 * - Compounding Frequencies
 * - Monthly & Annual Growth Schedules
 * - What-If Sensitivity Matrix
 */

export type InvestmentType = "sip" | "lumpsum" | "stepup" | "goal" | "swp";
export type CompoundingFrequency = "monthly" | "quarterly" | "semi-annually" | "annually";

export interface SipFormulaInput {
  investmentType?: InvestmentType;
  monthlyInvestment?: number;
  lumpsumAmount?: number;
  expectedReturnRate?: number; // annual percentage, e.g., 12 for 12%
  timePeriodYears?: number;
  stepUpRate?: number; // percentage annual increase in SIP, e.g., 10 for 10%
  stepUpAmount?: number; // fixed dollar/rupee annual increase in SIP
  compoundingFrequency?: CompoundingFrequency;
  inflationRate?: number; // annual percentage, e.g., 5 for 5%
  taxRate?: number; // tax on gains percentage, e.g., 10 for 10%
  targetGoalAmount?: number; // target corpus for Goal Seeker
  swpMonthlyWithdrawal?: number; // monthly withdrawal amount for SWP
}

export interface AnnualScheduleRow {
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

export interface MonthlyScheduleRow {
  month: number;
  year: number;
  startingBalance: number;
  contribution: number;
  interestEarned: number;
  endingBalance: number;
}

export interface SensitivityCell {
  returnRate: number;
  tenureYears: number;
  maturityValue: number;
  totalInvested: number;
  returns: number;
}

export interface GoalSeekResults {
  targetAmount: number;
  requiredMonthlySip: number;
  requiredLumpsum: number;
  yearsToGoal: number;
  achievableValueWithCurrentSip: number;
  shortfallOrSurplus: number;
}

export interface SwpResults {
  monthlyWithdrawal: number;
  initialCorpus: number;
  totalWithdrawn: number;
  remainingCorpus: number;
  monthsSustained: number;
  yearsSustained: number;
  isForever: boolean;
}

export interface SipFormulaResult {
  totalInvested: number;
  estimatedReturns: number;
  totalMaturityValue: number;
  wealthMultiplier: number;
  effectiveApy: number;
  inflationAdjustedValue: number;
  postTaxMaturityValue: number;
  totalTaxPaid: number;
  annualSchedule: AnnualScheduleRow[];
  monthlySchedule: MonthlyScheduleRow[];
  sensitivityMatrix: SensitivityCell[];
  goalSeek: GoalSeekResults;
  swpResults: SwpResults;
  sipHealthScore: number;
  healthRating: "Excellent" | "Good" | "Fair" | "Needs Attention";
}

/**
 * Returns compound frequency per year integer.
 */
function getCompoundingCount(freq: CompoundingFrequency = "monthly"): number {
  switch (freq) {
    case "annually":
      return 1;
    case "semi-annually":
      return 2;
    case "quarterly":
      return 4;
    case "monthly":
    default:
      return 12;
  }
}

export function calculateSipFormula(inputs: SipFormulaInput): SipFormulaResult {
  const investmentType = inputs.investmentType || "sip";
  const monthlyInvestment = Math.max(0, inputs.monthlyInvestment ?? 500);
  const lumpsumAmount = Math.max(0, inputs.lumpsumAmount ?? 10000);
  const expectedReturnRate = Math.max(0, inputs.expectedReturnRate ?? 12);
  const timePeriodYears = Math.max(1, Math.min(50, inputs.timePeriodYears ?? 10));
  const stepUpRate = Math.max(0, inputs.stepUpRate ?? 0);
  const stepUpAmount = Math.max(0, inputs.stepUpAmount ?? 0);
  const compoundingFrequency = inputs.compoundingFrequency || "monthly";
  const inflationRate = Math.max(0, inputs.inflationRate ?? 4);
  const taxRate = Math.max(0, inputs.taxRate ?? 10);
  const targetGoalAmount = Math.max(0, inputs.targetGoalAmount ?? 100000);
  const swpMonthlyWithdrawal = Math.max(0, inputs.swpMonthlyWithdrawal ?? 1000);

  const annualRate = expectedReturnRate / 100;
  const monthlyRate = annualRate / 12;
  const totalMonths = timePeriodYears * 12;

  let totalInvested = 0;
  let totalMaturityValue = 0;

  const annualSchedule: AnnualScheduleRow[] = [];
  const monthlySchedule: MonthlyScheduleRow[] = [];

  // Monthly simulation loop for exact precision
  let currentBalance = 0;
  let cumContributions = 0;
  let cumInterest = 0;
  let currentMonthlySip = monthlyInvestment;

  if (investmentType === "lumpsum") {
    currentBalance = lumpsumAmount;
    cumContributions = lumpsumAmount;
    totalInvested = lumpsumAmount;

    const compoundTimes = getCompoundingCount(compoundingFrequency);
    const periodRate = annualRate / compoundTimes;

    for (let m = 1; m <= totalMonths; m++) {
      const monthStart = currentBalance;
      // compounding calculation
      const monthlyEffectiveRate = Math.pow(1 + periodRate, compoundTimes / 12) - 1;
      const monthInterest = monthStart * monthlyEffectiveRate;
      currentBalance += monthInterest;
      cumInterest += monthInterest;

      monthlySchedule.push({
        month: m,
        year: Math.ceil(m / 12),
        startingBalance: Math.round(monthStart * 100) / 100,
        contribution: 0,
        interestEarned: Math.round(monthInterest * 100) / 100,
        endingBalance: Math.round(currentBalance * 100) / 100,
      });

      if (m % 12 === 0 || m === totalMonths) {
        const yearNum = Math.ceil(m / 12);
        const yearStart = annualSchedule.length === 0 ? lumpsumAmount : annualSchedule[annualSchedule.length - 1].endingBalance;
        const yearInterest = currentBalance - yearStart;
        const inflationFactor = Math.pow(1 + inflationRate / 100, yearNum);
        const realEnding = currentBalance / inflationFactor;

        // Tax calculation on cumulative gains
        const totalGain = Math.max(0, currentBalance - lumpsumAmount);
        const taxPaid = totalGain * (taxRate / 100);
        const postTaxEnding = currentBalance - taxPaid;

        annualSchedule.push({
          year: yearNum,
          startingBalance: Math.round(yearStart * 100) / 100,
          contributions: yearNum === 1 ? lumpsumAmount : 0,
          cumulativeContributions: Math.round(cumContributions * 100) / 100,
          interestEarned: Math.round(yearInterest * 100) / 100,
          cumulativeInterest: Math.round((currentBalance - cumContributions) * 100) / 100,
          endingBalance: Math.round(currentBalance * 100) / 100,
          realEndingBalance: Math.round(realEnding * 100) / 100,
          taxPaid: Math.round(taxPaid * 100) / 100,
          postTaxEndingBalance: Math.round(postTaxEnding * 100) / 100,
        });
      }
    }
    totalMaturityValue = currentBalance;
  } else {
    // SIP or Step-Up SIP loop
    for (let m = 1; m <= totalMonths; m++) {
      const monthStart = currentBalance;
      const currentYear = Math.ceil(m / 12);

      // Handle Step-up at start of each year after Year 1
      if (m > 1 && (m - 1) % 12 === 0) {
        if (stepUpRate > 0) {
          currentMonthlySip = currentMonthlySip * (1 + stepUpRate / 100);
        }
        if (stepUpAmount > 0) {
          currentMonthlySip = currentMonthlySip + stepUpAmount;
        }
      }

      // Add SIP deposit at beginning of month
      const balanceAfterDeposit = monthStart + currentMonthlySip;
      cumContributions += currentMonthlySip;

      // Apply monthly interest
      const monthInterest = balanceAfterDeposit * monthlyRate;
      currentBalance = balanceAfterDeposit + monthInterest;
      cumInterest += monthInterest;

      monthlySchedule.push({
        month: m,
        year: currentYear,
        startingBalance: Math.round(monthStart * 100) / 100,
        contribution: Math.round(currentMonthlySip * 100) / 100,
        interestEarned: Math.round(monthInterest * 100) / 100,
        endingBalance: Math.round(currentBalance * 100) / 100,
      });

      if (m % 12 === 0 || m === totalMonths) {
        const yearNum = Math.ceil(m / 12);
        const yearStart = annualSchedule.length === 0 ? 0 : annualSchedule[annualSchedule.length - 1].endingBalance;
        const yearContribs = annualSchedule.length === 0 
          ? cumContributions 
          : cumContributions - annualSchedule[annualSchedule.length - 1].cumulativeContributions;
        const yearInterest = currentBalance - yearStart - yearContribs;

        const inflationFactor = Math.pow(1 + inflationRate / 100, yearNum);
        const realEnding = currentBalance / inflationFactor;

        // Tax on gains
        const totalGain = Math.max(0, currentBalance - cumContributions);
        const taxPaid = totalGain * (taxRate / 100);
        const postTaxEnding = currentBalance - taxPaid;

        annualSchedule.push({
          year: yearNum,
          startingBalance: Math.round(yearStart * 100) / 100,
          contributions: Math.round(yearContribs * 100) / 100,
          cumulativeContributions: Math.round(cumContributions * 100) / 100,
          interestEarned: Math.round(yearInterest * 100) / 100,
          cumulativeInterest: Math.round((currentBalance - cumContributions) * 100) / 100,
          endingBalance: Math.round(currentBalance * 100) / 100,
          realEndingBalance: Math.round(realEnding * 100) / 100,
          taxPaid: Math.round(taxPaid * 100) / 100,
          postTaxEndingBalance: Math.round(postTaxEnding * 100) / 100,
        });
      }
    }

    totalInvested = cumContributions;
    totalMaturityValue = currentBalance;
  }

  const estimatedReturns = Math.max(0, totalMaturityValue - totalInvested);
  const wealthMultiplier = totalInvested > 0 ? Math.round((totalMaturityValue / totalInvested) * 100) / 100 : 0;
  
  // Inflation adjusted total value
  const totalInflationFactor = Math.pow(1 + inflationRate / 100, timePeriodYears);
  const inflationAdjustedValue = Math.round((totalMaturityValue / totalInflationFactor) * 100) / 100;

  // Post tax maturity value
  const totalTaxPaid = Math.round(estimatedReturns * (taxRate / 100) * 100) / 100;
  const postTaxMaturityValue = Math.round((totalMaturityValue - totalTaxPaid) * 100) / 100;

  // Effective APY
  const effectiveApy = expectedReturnRate;

  // ----------------------------------------------------
  // GOAL SEEKING CALCULATIONS
  // ----------------------------------------------------
  let requiredMonthlySip = 0;
  let requiredLumpsum = 0;

  if (annualRate > 0) {
    // Required Lumpsum = Target / (1 + r)^n
    requiredLumpsum = targetGoalAmount / Math.pow(1 + annualRate, timePeriodYears);

    // Required Monthly SIP formula: FV / [ ((1+i)^n - 1) / i * (1+i) ]
    const sipFactor = ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) * (1 + monthlyRate);
    requiredMonthlySip = targetGoalAmount / sipFactor;
  } else {
    requiredLumpsum = targetGoalAmount;
    requiredMonthlySip = targetGoalAmount / totalMonths;
  }

  const goalSeek: GoalSeekResults = {
    targetAmount: targetGoalAmount,
    requiredMonthlySip: Math.round(requiredMonthlySip * 100) / 100,
    requiredLumpsum: Math.round(requiredLumpsum * 100) / 100,
    yearsToGoal: timePeriodYears,
    achievableValueWithCurrentSip: Math.round(totalMaturityValue * 100) / 100,
    shortfallOrSurplus: Math.round((totalMaturityValue - targetGoalAmount) * 100) / 100,
  };

  // ----------------------------------------------------
  // SWP (SYSTEMATIC WITHDRAWAL PLAN) CALCULATIONS
  // ----------------------------------------------------
  let swpBalance = totalMaturityValue > 0 ? totalMaturityValue : lumpsumAmount;
  const initialSwpCorpus = swpBalance;
  let totalWithdrawn = 0;
  let monthsSustained = 0;
  let isForever = false;

  const maxSwpSimMonths = 600; // 50 years limit
  for (let m = 1; m <= maxSwpSimMonths; m++) {
    if (swpBalance <= 0) break;
    const mInterest = swpBalance * monthlyRate;
    swpBalance += mInterest;
    
    if (swpBalance >= swpMonthlyWithdrawal) {
      swpBalance -= swpMonthlyWithdrawal;
      totalWithdrawn += swpMonthlyWithdrawal;
      monthsSustained++;
    } else {
      totalWithdrawn += swpBalance;
      swpBalance = 0;
      monthsSustained++;
      break;
    }

    if (m === maxSwpSimMonths && swpBalance > initialSwpCorpus) {
      isForever = true;
    }
  }

  const swpResults: SwpResults = {
    monthlyWithdrawal: swpMonthlyWithdrawal,
    initialCorpus: Math.round(initialSwpCorpus * 100) / 100,
    totalWithdrawn: Math.round(totalWithdrawn * 100) / 100,
    remainingCorpus: Math.round(swpBalance * 100) / 100,
    monthsSustained,
    yearsSustained: Math.round((monthsSustained / 12) * 10) / 10,
    isForever,
  };

  // ----------------------------------------------------
  // WHAT-IF SENSITIVITY MATRIX (Return % vs Tenure)
  // ----------------------------------------------------
  const ratesToTest = [8, 10, 12, 14, 16];
  const tenuresToTest = [5, 10, 15, 20, 25, 30];
  const sensitivityMatrix: SensitivityCell[] = [];

  ratesToTest.forEach((r) => {
    tenuresToTest.forEach((t) => {
      const rMonthly = r / 100 / 12;
      const tMonths = t * 12;
      let matVal = 0;
      let invVal = 0;

      if (investmentType === "lumpsum") {
        invVal = lumpsumAmount;
        matVal = lumpsumAmount * Math.pow(1 + r / 100, t);
      } else {
        invVal = monthlyInvestment * tMonths;
        if (rMonthly > 0) {
          matVal = monthlyInvestment * ((Math.pow(1 + rMonthly, tMonths) - 1) / rMonthly) * (1 + rMonthly);
        } else {
          matVal = invVal;
        }
      }

      sensitivityMatrix.push({
        returnRate: r,
        tenureYears: t,
        maturityValue: Math.round(matVal),
        totalInvested: Math.round(invVal),
        returns: Math.round(Math.max(0, matVal - invVal)),
      });
    });
  });

  // ----------------------------------------------------
  // SIP HEALTH SCORE & RATING
  // ----------------------------------------------------
  let sipHealthScore = 70; // baseline
  if (timePeriodYears >= 15) sipHealthScore += 15;
  else if (timePeriodYears >= 10) sipHealthScore += 10;

  if (wealthMultiplier >= 3) sipHealthScore += 15;
  else if (wealthMultiplier >= 2) sipHealthScore += 10;

  if (inflationAdjustedValue > totalInvested * 1.2) sipHealthScore += 5;

  sipHealthScore = Math.min(100, Math.max(40, sipHealthScore));

  let healthRating: "Excellent" | "Good" | "Fair" | "Needs Attention" = "Good";
  if (sipHealthScore >= 90) healthRating = "Excellent";
  else if (sipHealthScore >= 75) healthRating = "Good";
  else if (sipHealthScore >= 60) healthRating = "Fair";
  else healthRating = "Needs Attention";

  return {
    totalInvested: Math.round(totalInvested * 100) / 100,
    estimatedReturns: Math.round(estimatedReturns * 100) / 100,
    totalMaturityValue: Math.round(totalMaturityValue * 100) / 100,
    wealthMultiplier,
    effectiveApy,
    inflationAdjustedValue,
    postTaxMaturityValue,
    totalTaxPaid,
    annualSchedule,
    monthlySchedule,
    sensitivityMatrix,
    goalSeek,
    swpResults,
    sipHealthScore,
    healthRating,
  };
}
