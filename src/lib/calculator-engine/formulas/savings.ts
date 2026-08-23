export type CompoundFrequency = "daily" | "weekly" | "monthly" | "quarterly" | "semi-annually" | "annually";

export interface SavingsCalculatorInputs {
  initialDeposit: number;
  annualContribution: number;
  annualContributionIncrease: number; // %
  monthlyContribution: number;
  monthlyContributionIncrease: number; // %
  interestRate: number; // % per year (nominal APY/APR)
  compoundFrequency: CompoundFrequency;
  yearsToSave: number;
  taxRate: number; // % tax on interest earned
  inflationRate?: number; // % default e.g. 2.5%
  targetGoalAmount?: number;
  currentAge?: number;
  retirementAge?: number;
  annualExpenses?: number; // For FIRE
}

export interface AnnualScheduleRow {
  year: number;
  startingBalance: number;
  contributions: number;
  interestEarned: number;
  taxPaid: number;
  endingBalance: number;
  cumulativeContributions: number;
  cumulativeInterest: number;
  realEndingBalance: number;
}

export interface MonthlyScheduleRow {
  month: number;
  year: number;
  monthInYear: number;
  startingBalance: number;
  contribution: number;
  interestEarned: number;
  taxPaid: number;
  endingBalance: number;
  cumulativeContributions: number;
  cumulativeInterest: number;
}

export interface MilestoneItem {
  target: number;
  label: string;
  achievedYear: number | null;
  achievedMonth: number | null;
}

export interface ScenarioResult {
  name: string;
  rate: number;
  endingBalance: number;
  totalInterest: number;
  realEndingBalance: number;
}

export interface ContributionImpactItem {
  percentIncrease: number;
  newMonthlyContribution: number;
  newEndingBalance: number;
  additionalWealth: number;
}

export interface MonteCarloPercentiles {
  p90: number[]; // 90th percentile ending balance over time
  p50: number[]; // Median
  p10: number[]; // 10th percentile
  successRate: number; // % probability of reaching target goal
}

export interface SavingsCalculatorResults {
  endBalance: number;
  initialDeposit: number;
  totalContributions: number;
  totalInterestEarned: number;
  totalTaxPaid: number;
  inflationAdjustedBalance: number;
  apy: number;
  effectiveRate: number; // Post-tax real return rate
  nominalReturn: number;
  realReturn: number;
  interestPercentOfTotal: number;
  contributionPercentOfTotal: number;
  averageAnnualGrowth: number;
  savingsEfficiencyScore: number;
  healthRating: "Poor" | "Average" | "Good" | "Excellent";
  healthRecommendations: string[];

  // Schedules
  annualSchedule: AnnualScheduleRow[];
  monthlySchedule: MonthlyScheduleRow[];

  // Goal Seek Mode
  requiredInitialDeposit: number;
  requiredMonthlyContribution: number;
  requiredAnnualContribution: number;

  // Retirement & FIRE
  retirementCorpus: number;
  monthlyRetirementIncome: number;
  fireNumber: number;
  yearsToFire: number | null;
  leanFire: number;
  fatFire: number;

  // Milestones & Scenarios & Impacts
  milestones: MilestoneItem[];
  scenarios: ScenarioResult[];
  contributionImpacts: ContributionImpactItem[];
  monteCarlo: MonteCarloPercentiles;
}

export function getCompoundPeriodsPerYear(freq: CompoundFrequency): number {
  switch (freq) {
    case "daily":
      return 365;
    case "weekly":
      return 52;
    case "monthly":
      return 12;
    case "quarterly":
      return 4;
    case "semi-annually":
      return 2;
    case "annually":
      return 1;
    default:
      return 12;
  }
}

/**
 * Core internal simulation helper that models exact month-by-month cash flows,
 * contributions, compound growth, and tax drag across any horizon.
 */
function simulateSavingsAccumulation(
  P: number,
  baseAnnualContrib: number,
  annualContribStep: number,
  baseMonthlyContrib: number,
  monthlyContribStep: number,
  apy: number,
  taxRate: number,
  years: number
): { endBalance: number; totalContributions: number; totalInterest: number; totalTaxPaid: number } {
  let currentBalance = P;
  let cumulativeContribs = P;
  let cumulativeInterest = 0;
  let totalTaxPaid = 0;
  const totalMonths = Math.max(1, years * 12);
  const monthlyRate = Math.pow(1 + apy, 1 / 12) - 1;

  for (let m = 1; m <= totalMonths; m++) {
    const currentYearIndex = Math.floor((m - 1) / 12);
    const monthInYear = ((m - 1) % 12) + 1;

    const monthlyEscalated = baseMonthlyContrib * Math.pow(1 + monthlyContribStep, currentYearIndex);
    let addedContribution = monthlyEscalated;
    if (monthInYear === 1) {
      const annualEscalated = baseAnnualContrib * Math.pow(1 + annualContribStep, currentYearIndex);
      addedContribution += annualEscalated;
    }

    currentBalance += addedContribution;
    cumulativeContribs += addedContribution;

    const grossInterest = currentBalance * monthlyRate;
    const taxOnInterest = grossInterest * taxRate;
    const netInterest = grossInterest - taxOnInterest;

    currentBalance += netInterest;
    cumulativeInterest += netInterest;
    totalTaxPaid += taxOnInterest;
  }

  return {
    endBalance: currentBalance,
    totalContributions: cumulativeContribs,
    totalInterest: cumulativeInterest,
    totalTaxPaid,
  };
}

/**
 * Calculates complete savings projection with compound interest, contribution growth,
 * tax drag, inflation adjustment, schedules, scenarios, and statistical Monte Carlo simulation.
 */
export function calculateSavings(inputs: SavingsCalculatorInputs): SavingsCalculatorResults {
  const P = Math.max(0, inputs.initialDeposit || 0);
  const baseAnnualContrib = Math.max(0, inputs.annualContribution || 0);
  const annualContribStep = Math.max(0, inputs.annualContributionIncrease || 0) / 100;
  const baseMonthlyContrib = Math.max(0, inputs.monthlyContribution || 0);
  const monthlyContribStep = Math.max(0, inputs.monthlyContributionIncrease || 0) / 100;
  const rNominal = Math.max(0, inputs.interestRate || 0) / 100;
  const compoundFreq = inputs.compoundFrequency || "annually";
  const n = getCompoundPeriodsPerYear(compoundFreq);
  const years = Math.min(100, Math.max(1, inputs.yearsToSave || 10));
  const taxRate = Math.max(0, Math.min(100, inputs.taxRate || 0)) / 100;
  const inflationRate = Math.max(0, (inputs.inflationRate ?? 2.5)) / 100;
  const targetGoal = Math.max(0, inputs.targetGoalAmount || 100000);
  const currentAge = Math.max(18, inputs.currentAge || 30);
  const retirementAge = Math.max(currentAge + 1, inputs.retirementAge || 65);
  const annualExpenses = Math.max(0, inputs.annualExpenses || 40000);

  // APY Calculation: APY = (1 + r/n)^n - 1
  const apy = Math.pow(1 + rNominal / n, n) - 1;

  // Monthly Simulation for schedules
  const monthlySchedule: MonthlyScheduleRow[] = [];
  const annualSchedule: AnnualScheduleRow[] = [];

  let currentBalance = P;
  let cumulativeContribs = P;
  let cumulativeInterest = 0;
  let totalTaxPaid = 0;

  const totalMonths = years * 12;

  // Milestone Tracking targets
  const milestoneTargets = [10000, 25000, 50000, 100000, 250000, 500000, 1000000, 2500000, 5000000];
  const milestones: MilestoneItem[] = milestoneTargets.map((target) => ({
    target,
    label: target >= 1000000 ? `$${target / 1000000}M` : `$${target / 1000}k`,
    achievedYear: P >= target ? 0 : null,
    achievedMonth: P >= target ? 0 : null,
  }));

  for (let m = 1; m <= totalMonths; m++) {
    const currentYearIndex = Math.floor((m - 1) / 12);
    const monthInYear = ((m - 1) % 12) + 1;

    // Monthly contribution with annual escalation factor
    const monthlyEscalated = baseMonthlyContrib * Math.pow(1 + monthlyContribStep, currentYearIndex);

    let addedContribution = monthlyEscalated;
    if (monthInYear === 1) {
      const annualEscalated = baseAnnualContrib * Math.pow(1 + annualContribStep, currentYearIndex);
      addedContribution += annualEscalated;
    }

    const startBal = currentBalance;
    currentBalance += addedContribution;
    cumulativeContribs += addedContribution;

    // Effective monthly interest rate from APY: (1 + APY)^(1/12) - 1
    const monthlyRate = Math.pow(1 + apy, 1 / 12) - 1;
    const grossInterest = currentBalance * monthlyRate;

    // Tax applied to interest earnings
    const taxOnInterest = grossInterest * taxRate;
    const netInterest = grossInterest - taxOnInterest;

    currentBalance += netInterest;
    cumulativeInterest += netInterest;
    totalTaxPaid += taxOnInterest;

    // Check milestones
    milestones.forEach((item) => {
      if (item.achievedYear === null && currentBalance >= item.target) {
        item.achievedYear = currentYearIndex + 1;
        item.achievedMonth = m;
      }
    });

    monthlySchedule.push({
      month: m,
      year: currentYearIndex + 1,
      monthInYear,
      startingBalance: Number(startBal.toFixed(2)),
      contribution: Number(addedContribution.toFixed(2)),
      interestEarned: Number(netInterest.toFixed(2)),
      taxPaid: Number(taxOnInterest.toFixed(2)),
      endingBalance: Number(currentBalance.toFixed(2)),
      cumulativeContributions: Number(cumulativeContribs.toFixed(2)),
      cumulativeInterest: Number(cumulativeInterest.toFixed(2)),
    });
  }

  // Generate Annual Schedule by aggregating monthly schedule
  for (let y = 1; y <= years; y++) {
    const yearMonths = monthlySchedule.filter((row) => row.year === y);
    const startBal = yearMonths[0].startingBalance;
    const endingBal = yearMonths[yearMonths.length - 1].endingBalance;
    const totalYearContrib = yearMonths.reduce((acc, row) => acc + row.contribution, 0);
    const totalYearInterest = yearMonths.reduce((acc, row) => acc + row.interestEarned, 0);
    const totalYearTax = yearMonths.reduce((acc, row) => acc + row.taxPaid, 0);
    const cumulativeYearContrib = yearMonths[yearMonths.length - 1].cumulativeContributions;
    const cumulativeYearInterest = yearMonths[yearMonths.length - 1].cumulativeInterest;
    const realEndingBal = endingBal / Math.pow(1 + inflationRate, y);

    annualSchedule.push({
      year: y,
      startingBalance: Number(startBal.toFixed(2)),
      contributions: Number(totalYearContrib.toFixed(2)),
      interestEarned: Number(totalYearInterest.toFixed(2)),
      taxPaid: Number(totalYearTax.toFixed(2)),
      endingBalance: Number(endingBal.toFixed(2)),
      cumulativeContributions: Number(cumulativeYearContrib.toFixed(2)),
      cumulativeInterest: Number(cumulativeYearInterest.toFixed(2)),
      realEndingBalance: Number(realEndingBal.toFixed(2)),
    });
  }

  const endBalance = currentBalance;
  const totalContribs = cumulativeContribs;
  const totalInterest = cumulativeInterest;
  const inflationAdjustedBalance = endBalance / Math.pow(1 + inflationRate, years);

  // Fisher Real Return
  const postTaxNominal = apy * (1 - taxRate);
  const realReturn = (1 + postTaxNominal) / (1 + inflationRate) - 1;

  const interestPercentOfTotal = endBalance > 0 ? (totalInterest / endBalance) * 100 : 0;
  const contributionPercentOfTotal = endBalance > 0 ? (totalContribs / endBalance) * 100 : 0;
  const averageAnnualGrowth = years > 0 ? (Math.pow(endBalance / Math.max(1, P), 1 / years) - 1) * 100 : 0;

  // Goal Seek Mode Calculations
  const effectiveMonthlyRate = Math.pow(1 + postTaxNominal, 1 / 12) - 1;
  const nMonths = years * 12;
  const compoundFactor = Math.pow(1 + effectiveMonthlyRate, nMonths);
  const annuityFactor = effectiveMonthlyRate > 0 ? (compoundFactor - 1) / effectiveMonthlyRate : nMonths;

  const reqInitialDep = Math.max(0, (targetGoal - baseMonthlyContrib * annuityFactor) / compoundFactor);
  const reqMonthlyContrib = Math.max(0, (targetGoal - P * compoundFactor) / annuityFactor);
  const reqAnnualContrib = reqMonthlyContrib * 12;

  // Retirement & FIRE Metrics (BUG-SAV-03 Fix: Use complete accumulation model across retirement horizon)
  const yearsToRetirement = Math.max(1, retirementAge - currentAge);
  const retirementSim = simulateSavingsAccumulation(
    P,
    baseAnnualContrib,
    annualContribStep,
    baseMonthlyContrib,
    monthlyContribStep,
    apy,
    taxRate,
    yearsToRetirement
  );
  const retirementCorpus = retirementSim.endBalance;
  const monthlyRetirementIncome = (retirementCorpus * 0.04) / 12;

  const fireNumber = annualExpenses * 25;
  const leanFire = annualExpenses * 0.75 * 25;
  const fatFire = annualExpenses * 1.5 * 25;

  let yearsToFire: number | null = null;
  for (const row of annualSchedule) {
    if (row.endingBalance >= fireNumber) {
      yearsToFire = row.year;
      break;
    }
  }

  // Scenarios (BUG-SAV-02 Fix: Use canonical simulation for Conservative and Aggressive to preserve contributions)
  const apyConservative = Math.pow(1 + 0.03 / n, n) - 1;
  const apyAggressive = Math.pow(1 + 0.08 / n, n) - 1;

  const consSim = simulateSavingsAccumulation(
    P,
    baseAnnualContrib,
    annualContribStep,
    baseMonthlyContrib,
    monthlyContribStep,
    apyConservative,
    taxRate,
    years
  );
  const aggSim = simulateSavingsAccumulation(
    P,
    baseAnnualContrib,
    annualContribStep,
    baseMonthlyContrib,
    monthlyContribStep,
    apyAggressive,
    taxRate,
    years
  );

  const scenarios: ScenarioResult[] = [
    {
      name: "Conservative (3.0%)",
      rate: 3.0,
      endingBalance: consSim.endBalance,
      totalInterest: consSim.totalInterest,
      realEndingBalance: consSim.endBalance / Math.pow(1 + inflationRate, years),
    },
    {
      name: "Moderate Current (" + (rNominal * 100).toFixed(1) + "%)",
      rate: rNominal * 100,
      endingBalance: endBalance,
      totalInterest: totalInterest,
      realEndingBalance: inflationAdjustedBalance,
    },
    {
      name: "Aggressive Growth (8.0%)",
      rate: 8.0,
      endingBalance: aggSim.endBalance,
      totalInterest: aggSim.totalInterest,
      realEndingBalance: aggSim.endBalance / Math.pow(1 + inflationRate, years),
    },
  ];

  // Contribution Escalation Analyzer (BUG-SAV-01 Fix: Scale actual active contributions)
  const contributionImpacts: ContributionImpactItem[] = [5, 10, 20, 50].map((pct) => {
    const scaleFactor = 1 + pct / 100;
    const scaledMonthly = baseMonthlyContrib * scaleFactor;
    const scaledAnnual = baseAnnualContrib * scaleFactor;

    const scaledSim = simulateSavingsAccumulation(
      P,
      scaledAnnual,
      annualContribStep,
      scaledMonthly,
      monthlyContribStep,
      apy,
      taxRate,
      years
    );

    const addWealth = Math.max(0, scaledSim.endBalance - endBalance);

    return {
      percentIncrease: pct,
      newMonthlyContribution: Number(scaledMonthly.toFixed(2)),
      newEndingBalance: Number(scaledSim.endBalance.toFixed(2)),
      additionalWealth: Number(addWealth.toFixed(2)),
    };
  });

  // Monte Carlo Simulation (BUG-SAV-03 Fix: Include full growing contribution schedule)
  const monteCarlo = runMonteCarloSimulation(
    P,
    baseAnnualContrib,
    annualContribStep,
    baseMonthlyContrib,
    monthlyContribStep,
    rNominal * (1 - taxRate),
    0.08,
    years,
    targetGoal
  );

  // Health Score Calculation
  const growthEfficiency = totalInterest / Math.max(1, totalContribs);
  let score = 50;
  if (rNominal >= 0.04) score += 15;
  if (baseMonthlyContrib > 0 || baseAnnualContrib > 0) score += 20;
  if (monthlyContribStep > 0 || annualContribStep > 0) score += 10;
  if (growthEfficiency > 0.3) score += 15;
  if (taxRate === 0) score += 5;
  score = Math.min(100, Math.max(10, score));

  let healthRating: "Poor" | "Average" | "Good" | "Excellent" = "Average";
  if (score >= 85) healthRating = "Excellent";
  else if (score >= 70) healthRating = "Good";
  else if (score >= 50) healthRating = "Average";
  else healthRating = "Poor";

  const healthRecommendations: string[] = [];
  if (baseMonthlyContrib === 0 && baseAnnualContrib === 0) {
    healthRecommendations.push("Set up recurring monthly or annual contributions to leverage continuous compound growth.");
  }
  if (monthlyContribStep === 0 && annualContribStep === 0) {
    healthRecommendations.push("Enable an annual contribution step-up to outpace cost-of-living increases.");
  }
  if (rNominal < 0.04) {
    healthRecommendations.push("Explore competitive high-yield savings accounts or cash equivalents to maximize APY.");
  }
  if (taxRate > 0) {
    healthRecommendations.push("Consider tax-advantaged accounts (such as IRAs, 401(k)s, or HSAs) to reduce tax drag.");
  }
  if (healthRecommendations.length === 0) {
    healthRecommendations.push("Your savings strategy is structured soundly! Review periodically to stay aligned with goals.");
  }

  return {
    endBalance: Number(endBalance.toFixed(2)),
    initialDeposit: Number(P.toFixed(2)),
    totalContributions: Number(totalContribs.toFixed(2)),
    totalInterestEarned: Number(totalInterest.toFixed(2)),
    totalTaxPaid: Number(totalTaxPaid.toFixed(2)),
    inflationAdjustedBalance: Number(inflationAdjustedBalance.toFixed(2)),
    apy: Number((apy * 100).toFixed(2)),
    effectiveRate: Number((postTaxNominal * 100).toFixed(2)),
    nominalReturn: Number((rNominal * 100).toFixed(2)),
    realReturn: Number((realReturn * 100).toFixed(2)),
    interestPercentOfTotal: Number(interestPercentOfTotal.toFixed(1)),
    contributionPercentOfTotal: Number(contributionPercentOfTotal.toFixed(1)),
    averageAnnualGrowth: Number(averageAnnualGrowth.toFixed(2)),
    savingsEfficiencyScore: Math.round(score),
    healthRating,
    healthRecommendations,
    annualSchedule,
    monthlySchedule,
    requiredInitialDeposit: Number(reqInitialDep.toFixed(2)),
    requiredMonthlyContribution: Number(reqMonthlyContrib.toFixed(2)),
    requiredAnnualContribution: Number(reqAnnualContrib.toFixed(2)),
    retirementCorpus: Number(retirementCorpus.toFixed(2)),
    monthlyRetirementIncome: Number(monthlyRetirementIncome.toFixed(2)),
    fireNumber: Number(fireNumber.toFixed(2)),
    yearsToFire,
    leanFire: Number(leanFire.toFixed(2)),
    fatFire: Number(fatFire.toFixed(2)),
    milestones,
    scenarios,
    contributionImpacts,
    monteCarlo,
  };
}

function runMonteCarloSimulation(
  P: number,
  baseAnnualContrib: number,
  annualContribStep: number,
  baseMonthlyContrib: number,
  monthlyContribStep: number,
  meanReturn: number,
  volatility: number,
  years: number,
  targetGoal: number
): MonteCarloPercentiles {
  const NUM_TRIALS = 300;
  const runs: number[][] = [];
  let successes = 0;

  // Mulberry32 deterministic pseudo-random generator seeded from parameters to ensure SSR/Client hydration parity
  let seed = Math.floor(
    (P + 1) * 31 +
    (baseAnnualContrib + 1) * 17 +
    (baseMonthlyContrib + 1) * 13 +
    Math.round(meanReturn * 10000) * 7 +
    years * 101 +
    targetGoal * 3
  );
  if (seed <= 0) seed = 123456789;

  const pseudoRandom = () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (let trial = 0; trial < NUM_TRIALS; trial++) {
    const trajectory: number[] = [P];
    let bal = P;

    for (let y = 1; y <= years; y++) {
      const u1 = Math.max(0.0001, pseudoRandom());
      const u2 = Math.max(0.0001, pseudoRandom());
      const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      const yearReturn = meanReturn + z * volatility;

      const annualEscalated = baseAnnualContrib * Math.pow(1 + annualContribStep, y - 1);
      const monthlyEscalated = baseMonthlyContrib * Math.pow(1 + monthlyContribStep, y - 1);
      const totalYearContrib = annualEscalated + monthlyEscalated * 12;

      bal = (bal + totalYearContrib) * (1 + yearReturn);
      trajectory.push(Math.max(0, bal));
    }

    if (bal >= targetGoal) successes++;
    runs.push(trajectory);
  }

  const p90: number[] = [];
  const p50: number[] = [];
  const p10: number[] = [];

  for (let y = 0; y <= years; y++) {
    const yearValues = runs.map((r) => r[y]).sort((a, b) => a - b);
    p10.push(Number(yearValues[Math.floor(NUM_TRIALS * 0.1)].toFixed(2)));
    p50.push(Number(yearValues[Math.floor(NUM_TRIALS * 0.5)].toFixed(2)));
    p90.push(Number(yearValues[Math.floor(NUM_TRIALS * 0.9)].toFixed(2)));
  }

  return {
    p90,
    p50,
    p10,
    successRate: Math.round((successes / NUM_TRIALS) * 100),
  };
}
