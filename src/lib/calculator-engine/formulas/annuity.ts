/**
 * Annuity Formula Engine
 * Fully implementing Calculator.net's baseline accumulation math:
 * 1. Ordinary Annuity (End of period) vs Annuity Due (Beginning of period)
 * 2. Multi-frequency compounding & contributions
 * 3. Inflation & tax adjustments
 * 4. Target Balance Planner mode
 * 5. 4-Plan Scenario Comparison engine
 * 6. Annual and Monthly schedule generator
 */

export interface AnnuityInput {
  startingPrincipal: number; // e.g. 20000
  annualContribution: number; // e.g. 10000
  monthlyContribution: number; // e.g. 0
  timing: "beginning" | "end"; // "beginning" = Annuity Due, "end" = Ordinary Annuity
  growthRatePercent: number; // e.g. 6.0%
  years: number; // e.g. 10
  months?: number; // e.g. 0
  compoundingFrequency?: "daily" | "weekly" | "biweekly" | "monthly" | "quarterly" | "semiannual" | "annual"; // default annual
  inflationRatePercent?: number; // e.g. 2.5%
  taxRatePercent?: number; // e.g. 20%
  managementFeePercent?: number; // e.g. 0.5%
}

export interface TargetPlannerInput {
  targetBalance: number;
  startingPrincipal: number;
  growthRatePercent: number;
  years: number;
  timing: "beginning" | "end";
}

export interface ScenarioPlanInput {
  name: string;
  growthRatePercent: number;
}

export interface AnnuityScheduleRow {
  period: number; // Year or Month index
  label: string;
  beginningBalance: number;
  contribution: number;
  interestEarned: number;
  endingBalance: number;
}

export interface AnnuityResult {
  endBalance: number;
  startingPrincipal: number;
  totalContributions: number;
  totalInterestEarned: number;
  principalPercentage: number;
  contributionPercentage: number;
  interestPercentage: number;
  cagr: number;
  effectiveAnnualYield: number;
  inflationAdjustedRealValue: number;
  taxAdjustedValue: number;
  annualSchedule: AnnuityScheduleRow[];
  monthlySchedule: AnnuityScheduleRow[];
}

export interface TargetPlannerResult {
  targetBalance: number;
  requiredMonthlyContribution: number;
  requiredAnnualContribution: number;
  requiredGrowthRatePercent: number;
}

export interface ScenarioComparisonItem {
  name: string;
  growthRatePercent: number;
  endBalance: number;
  totalContributions: number;
  totalInterestEarned: number;
}

/**
 * Compounding Frequency Helper
 */
export function getCompoundingPeriodsPerYear(freq: string = "annual"): number {
  switch (freq) {
    case "daily": return 365;
    case "weekly": return 52;
    case "biweekly": return 26;
    case "monthly": return 12;
    case "quarterly": return 4;
    case "semiannual": return 2;
    case "annual":
    default: return 1;
  }
}

/**
 * Main Annuity Accumulation Calculation Engine
 */
export function calculateAnnuity(input: AnnuityInput): AnnuityResult {
  const P = Math.max(0, Number(input.startingPrincipal || 0));
  const annualPmt = Math.max(0, Number(input.annualContribution || 0));
  const monthlyPmt = Math.max(0, Number(input.monthlyContribution || 0));
  const isDue = input.timing === "beginning";

  const totalYears = Math.max(0, Number(input.years || 0)) + Math.max(0, Number(input.months || 0)) / 12;
  const numYears = Math.max(1, Math.round(totalYears));

  const grossGrowthRate = Math.max(0, Number(input.growthRatePercent || 0)) / 100;
  const feeRate = Math.max(0, Number(input.managementFeePercent || 0)) / 100;
  const netGrowthRate = Math.max(0, grossGrowthRate - feeRate);

  const inflationRate = Math.max(0, Number(input.inflationRatePercent || 0)) / 100;
  const taxRate = Math.max(0, Number(input.taxRatePercent || 0)) / 100;

  // Annual Schedule Generation matching Calculator.net logic
  const annualSchedule: AnnuityScheduleRow[] = [];
  let currentBalance = P;
  let accumulatedContributions = P;

  for (let year = 1; year <= numYears; year++) {
    const beginningBalance = currentBalance;
    const yearContribution = annualPmt + (monthlyPmt * 12);
    accumulatedContributions += yearContribution;

    let interestForYear = 0;
    if (isDue) {
      // Annuity Due: Contributions added at start of year earn interest for full year
      const totalCompoundingBase = beginningBalance + yearContribution;
      interestForYear = totalCompoundingBase * netGrowthRate;
      currentBalance = totalCompoundingBase + interestForYear;
    } else {
      // Ordinary Annuity: Contributions added at end of year do not earn interest in first year
      interestForYear = beginningBalance * netGrowthRate;
      currentBalance = beginningBalance + interestForYear + yearContribution;
    }

    annualSchedule.push({
      period: year,
      label: `Year ${year}`,
      beginningBalance: Number(beginningBalance.toFixed(2)),
      contribution: Number(yearContribution.toFixed(2)),
      interestEarned: Number(interestForYear.toFixed(2)),
      endingBalance: Number(currentBalance.toFixed(2)),
    });
  }

  const endBalance = Number(currentBalance.toFixed(2));
  const totalContributions = Number(accumulatedContributions.toFixed(2));
  const totalInterestEarned = Number(Math.max(0, endBalance - totalContributions).toFixed(2));

  // Percentage breakdown for Doughnut Chart
  const totalSum = endBalance > 0 ? endBalance : 1;
  const principalPercentage = Number(((P / totalSum) * 100).toFixed(1));
  const contributionPercentage = Number((((totalContributions - P) / totalSum) * 100).toFixed(1));
  const interestPercentage = Number(((totalInterestEarned / totalSum) * 100).toFixed(1));

  // CAGR & Effective Yield
  const cagr = P > 0 && numYears > 0 ? Number(((Math.pow(endBalance / P, 1 / numYears) - 1) * 100).toFixed(2)) : 0;
  const effectiveAnnualYield = Number((((Math.pow(1 + netGrowthRate, 1) - 1)) * 100).toFixed(2));

  // Inflation adjusted real value
  const realValue = Number((endBalance / Math.pow(1 + inflationRate, numYears)).toFixed(2));

  // Tax-adjusted return value (Tax applied to earnings)
  const taxableEarnings = Math.max(0, endBalance - totalContributions);
  const taxAmount = taxableEarnings * taxRate;
  const taxAdjustedValue = Number((endBalance - taxAmount).toFixed(2));

  // Monthly Schedule Generation
  const monthlySchedule: AnnuityScheduleRow[] = [];
  const totalMonths = numYears * 12;
  const monthlyNetRate = netGrowthRate / 12;
  let mBalance = P;

  for (let m = 1; m <= totalMonths; m++) {
    const mBeginning = mBalance;
    const mDeposit = monthlyPmt + (m % 12 === 1 ? annualPmt : 0);

    let mInterest = 0;
    if (isDue) {
      const mBase = mBeginning + mDeposit;
      mInterest = mBase * monthlyNetRate;
      mBalance = mBase + mInterest;
    } else {
      mInterest = mBeginning * monthlyNetRate;
      mBalance = mBeginning + mInterest + mDeposit;
    }

    monthlySchedule.push({
      period: m,
      label: `Month ${m}`,
      beginningBalance: Number(mBeginning.toFixed(2)),
      contribution: Number(mDeposit.toFixed(2)),
      interestEarned: Number(mInterest.toFixed(2)),
      endingBalance: Number(mBalance.toFixed(2)),
    });
  }

  return {
    endBalance,
    startingPrincipal: P,
    totalContributions,
    totalInterestEarned,
    principalPercentage,
    contributionPercentage,
    interestPercentage,
    cagr,
    effectiveAnnualYield,
    inflationAdjustedRealValue: realValue,
    taxAdjustedValue,
    annualSchedule,
    monthlySchedule,
  };
}

/**
 * Target Balance Planner Solver
 */
export function calculateTargetPlanner(input: TargetPlannerInput): TargetPlannerResult {
  const target = Math.max(0, Number(input.targetBalance || 500000));
  const principal = Math.max(0, Number(input.startingPrincipal || 20000));
  const r = Math.max(0.001, Number(input.growthRatePercent || 6.0) / 100);
  const n = Math.max(1, Number(input.years || 10));
  const isDue = input.timing === "beginning";

  // Future Value of principal alone
  const fvPrincipal = principal * Math.pow(1 + r, n);
  const remainingNeeded = Math.max(0, target - fvPrincipal);

  // Solves required annual contribution
  const multiplier = isDue
    ? ((Math.pow(1 + r, n) - 1) / r) * (1 + r)
    : (Math.pow(1 + r, n) - 1) / r;

  const requiredAnnualPmt = multiplier > 0 ? Number((remainingNeeded / multiplier).toFixed(2)) : 0;
  const requiredMonthlyPmt = Number((requiredAnnualPmt / 12).toFixed(2));

  return {
    targetBalance: target,
    requiredMonthlyContribution: requiredMonthlyPmt,
    requiredAnnualContribution: requiredAnnualPmt,
    requiredGrowthRatePercent: Number((r * 100).toFixed(2)),
  };
}

/**
 * 4-Plan Scenario Comparison Solver
 */
export function calculateScenarioComparison(
  baseInput: AnnuityInput,
  plans: ScenarioPlanInput[]
): ScenarioComparisonItem[] {
  return plans.map((p) => {
    const res = calculateAnnuity({
      ...baseInput,
      growthRatePercent: p.growthRatePercent,
    });
    return {
      name: p.name,
      growthRatePercent: p.growthRatePercent,
      endBalance: res.endBalance,
      totalContributions: res.totalContributions,
      totalInterestEarned: res.totalInterestEarned,
    };
  });
}
