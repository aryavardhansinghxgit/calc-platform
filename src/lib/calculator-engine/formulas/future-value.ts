/**
 * Comprehensive Future Value Math Engine
 * Supports Lump Sum, Periodic Contributions (Ordinary Annuity & Annuity Due),
 * Step-up / Growing Contributions, Inflation & Tax Adjustments, Goal Solver,
 * Monte Carlo Simulation, and Amortization/Accumulation Schedules.
 */

export type CompoundingFrequency = 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
export type ContributionFrequency = 'monthly' | 'quarterly' | 'semi-annually' | 'annually';
export type TimingOption = 'end' | 'beginning';

export interface FutureValueInput {
  initialInvestment: number; // PV
  periodicContribution: number; // PMT
  interestRate: number; // Annual %
  years: number; // t
  compoundingFrequency?: CompoundingFrequency;
  contributionFrequency?: ContributionFrequency;
  contributionTiming?: TimingOption;
  inflationRate?: number; // % annual
  taxRate?: number; // % annual tax on growth
  stepUpRate?: number; // % annual contribution increase
  contributionHolidayYears?: number[]; // years with 0 contributions
  marketCrashYear?: number; // year of simulated crash
  marketCrashPct?: number; // % drop during crash year
  currency?: string;
}

export interface ScheduleRow {
  year: number;
  period?: number;
  startBalance: number;
  contribution: number;
  interestEarned: number;
  taxPaid: number;
  endBalance: number;
  cumulativeContributions: number;
  cumulativeInterest: number;
  nominalEndBalance: number;
  realEndBalance: number;
}

export interface ScenarioResult {
  title: string;
  futureValue: number;
  totalInvested: number;
  totalInterest: number;
  realFutureValue: number;
  taxAdjustedValue: number;
  cagr: number;
  returnMultiple: number;
}

export interface FutureValueCalculationResult {
  futureValue: number;
  initialInvestment: number;
  totalContributions: number;
  totalInvested: number;
  totalInterestEarned: number;
  returnMultiple: number;
  cagr: number;
  effectiveAnnualYield: number; // APY
  yearsToDouble: number;
  inflationAdjustedFV: number; // Real FV
  taxAdjustedFV: number; // Post-tax FV
  realPurchasingPowerLoss: number;
  taxDragAmount: number;
  growthEfficiencyScore: number; // Interest / Invested %
  savingsContributionRatio: number; // Invested / FV %
  interestContributionRatio: number; // Interest / FV %
  yearlySchedule: ScheduleRow[];
  monthlySchedule: ScheduleRow[];
  scenarios: {
    conservative: ScenarioResult;
    moderate: ScenarioResult;
    aggressive: ScenarioResult;
  };
  monteCarloProbability?: number;
}

export function getCompoundingPeriodsPerYear(freq: CompoundingFrequency = 'annually'): number {
  switch (freq) {
    case 'daily': return 365;
    case 'weekly': return 52;
    case 'monthly': return 12;
    case 'quarterly': return 4;
    case 'semi-annually': return 2;
    case 'annually': return 1;
    default: return 12;
  }
}

export function getContributionPeriodsPerYear(freq: ContributionFrequency = 'monthly'): number {
  switch (freq) {
    case 'monthly': return 12;
    case 'quarterly': return 4;
    case 'semi-annually': return 2;
    case 'annually': return 1;
    default: return 12;
  }
}

/**
 * Calculates complete Future Value projection with month-by-month and year-by-year precision.
 */
export function calculateFutureValue(input: FutureValueInput): FutureValueCalculationResult {
  const {
    initialInvestment = 0,
    periodicContribution = 0,
    interestRate = 0,
    years = 10,
    compoundingFrequency = 'monthly',
    contributionFrequency = 'monthly',
    contributionTiming = 'end',
    inflationRate = 0,
    taxRate = 0,
    stepUpRate = 0,
    contributionHolidayYears = [],
    marketCrashYear = 0,
    marketCrashPct = 0,
  } = input;

  const pv = Math.max(0, Number(initialInvestment) || 0);
  const pmtBase = Math.max(0, Number(periodicContribution) || 0);
  const rateNominal = (Number(interestRate) || 0) / 100;
  const tYears = Math.max(1, Math.min(100, Number(years) || 10));
  const infRate = (Number(inflationRate) || 0) / 100;
  const tRate = (Number(taxRate) || 0) / 100;
  const stepUp = (Number(stepUpRate) || 0) / 100;

  const nComp = getCompoundingPeriodsPerYear(compoundingFrequency);
  const pContrib = getContributionPeriodsPerYear(contributionFrequency);

  // Effective annual yield (APY)
  const effectiveAnnualYield = Math.pow(1 + rateNominal / nComp, nComp) - 1;
  // Effective rate per contribution period
  const rPeriod = Math.pow(1 + effectiveAnnualYield, 1 / pContrib) - 1;
  // Post-tax effective period rate if annual tax drag is applied
  const rPeriodTaxed = Math.pow(1 + effectiveAnnualYield * (1 - tRate), 1 / pContrib) - 1;

  const totalPeriods = Math.round(tYears * pContrib);

  let currentBalance = pv;
  let currentBalanceTaxed = pv;
  let cumulativeContributions = pv;
  let cumulativeInterest = 0;

  const monthlySchedule: ScheduleRow[] = [];
  const yearlySchedule: ScheduleRow[] = [];

  let yearlyStartBalance = pv;
  let yearlyContributions = 0;
  let yearlyInterest = 0;
  let yearlyTax = 0;

  let currentAnnualPmt = pmtBase;

  for (let p = 1; p <= totalPeriods; p++) {
    const currentYear = Math.ceil(p / pContrib);
    const isHoliday = contributionHolidayYears.includes(currentYear);
    
    // Check if new year started for step-up contribution
    if (p > 1 && (p - 1) % pContrib === 0 && stepUp > 0) {
      currentAnnualPmt = currentAnnualPmt * (1 + stepUp);
    }

    const periodPmt = isHoliday ? 0 : currentAnnualPmt;

    let periodStart = currentBalance;
    let periodContrib = periodPmt;
    let periodInterest = 0;
    let periodTax = 0;

    if (contributionTiming === 'beginning') {
      const balanceBeforeInterest = periodStart + periodContrib;
      periodInterest = balanceBeforeInterest * rPeriod;
      periodTax = periodInterest * tRate;
      currentBalance = balanceBeforeInterest + periodInterest;
      currentBalanceTaxed = (currentBalanceTaxed + periodContrib) * (1 + rPeriodTaxed);
    } else {
      periodInterest = periodStart * rPeriod;
      periodTax = periodInterest * tRate;
      currentBalance = periodStart + periodInterest + periodContrib;
      currentBalanceTaxed = currentBalanceTaxed * (1 + rPeriodTaxed) + periodContrib;
    }

    // Apply market crash simulation if applicable
    if (marketCrashYear > 0 && currentYear === marketCrashYear && p % pContrib === 0) {
      const crashFactor = 1 - Math.min(90, Math.max(0, marketCrashPct)) / 100;
      currentBalance *= crashFactor;
      currentBalanceTaxed *= crashFactor;
    }

    cumulativeContributions += periodContrib;
    cumulativeInterest += periodInterest;

    yearlyContributions += periodContrib;
    yearlyInterest += periodInterest;
    yearlyTax += periodTax;

    // Record monthly schedule
    const nominalInflationDiscount = Math.pow(1 + infRate, p / pContrib);
    monthlySchedule.push({
      year: currentYear,
      period: p,
      startBalance: Number(periodStart.toFixed(2)),
      contribution: Number(periodContrib.toFixed(2)),
      interestEarned: Number(periodInterest.toFixed(2)),
      taxPaid: Number(periodTax.toFixed(2)),
      endBalance: Number(currentBalance.toFixed(2)),
      cumulativeContributions: Number(cumulativeContributions.toFixed(2)),
      cumulativeInterest: Number(cumulativeInterest.toFixed(2)),
      nominalEndBalance: Number(currentBalance.toFixed(2)),
      realEndBalance: Number((currentBalance / nominalInflationDiscount).toFixed(2)),
    });

    // Record yearly schedule at end of each year or final period
    if (p % pContrib === 0 || p === totalPeriods) {
      const yearIndex = Math.ceil(p / pContrib);
      const yearInfDiscount = Math.pow(1 + infRate, yearIndex);

      yearlySchedule.push({
        year: yearIndex,
        startBalance: Number(yearlyStartBalance.toFixed(2)),
        contribution: Number(yearlyContributions.toFixed(2)),
        interestEarned: Number(yearlyInterest.toFixed(2)),
        taxPaid: Number(yearlyTax.toFixed(2)),
        endBalance: Number(currentBalance.toFixed(2)),
        cumulativeContributions: Number(cumulativeContributions.toFixed(2)),
        cumulativeInterest: Number(cumulativeInterest.toFixed(2)),
        nominalEndBalance: Number(currentBalance.toFixed(2)),
        realEndBalance: Number((currentBalance / yearInfDiscount).toFixed(2)),
      });

      yearlyStartBalance = currentBalance;
      yearlyContributions = 0;
      yearlyInterest = 0;
      yearlyTax = 0;
    }
  }

  const finalFV = currentBalance;
  const totalContribsOnly = cumulativeContributions - pv;
  const totalInvested = cumulativeContributions;
  const totalInterestEarned = Math.max(0, finalFV - totalInvested);

  // Return Multiple & CAGR
  const returnMultiple = totalInvested > 0 ? finalFV / totalInvested : 0;
  const cagr = pv > 0 ? (Math.pow(finalFV / pv, 1 / tYears) - 1) * 100 : effectiveAnnualYield * 100;

  // Rule of 72 & Exact Years to Double
  const yearsToDouble = rateNominal > 0 ? Math.log(2) / Math.log(1 + effectiveAnnualYield) : 0;

  // Inflation-adjusted (Real) FV
  const inflationDiscountTotal = Math.pow(1 + infRate, tYears);
  const inflationAdjustedFV = finalFV / inflationDiscountTotal;
  const realPurchasingPowerLoss = Math.max(0, finalFV - inflationAdjustedFV);

  // Tax Drag Amount
  const taxAdjustedFV = currentBalanceTaxed;
  const taxDragAmount = Math.max(0, finalFV - taxAdjustedFV);

  // Efficiency scores
  const growthEfficiencyScore = totalInvested > 0 ? (totalInterestEarned / totalInvested) * 100 : 0;
  const savingsContributionRatio = finalFV > 0 ? (totalInvested / finalFV) * 100 : 0;
  const interestContributionRatio = finalFV > 0 ? (totalInterestEarned / finalFV) * 100 : 0;

  // Multi-scenario calculations (Conservative = rate - 2%, Moderate = rate, Aggressive = rate + 3%)
  const conservativeResult = calculateSimpleScenario('Conservative (Lower Return)', input, Math.max(0.5, interestRate - 2.5));
  const moderateResult = calculateSimpleScenario('Moderate (Base Case)', input, interestRate);
  const aggressiveResult = calculateSimpleScenario('Aggressive (Higher Return)', input, interestRate + 3.0);

  // Monte Carlo simulation estimation
  const monteCarloProbability = runMonteCarloSimulation(pv, pmtBase, interestRate, tYears, pContrib, finalFV * 0.9, 500);

  return {
    futureValue: Number(finalFV.toFixed(2)),
    initialInvestment: Number(pv.toFixed(2)),
    totalContributions: Number(totalContribsOnly.toFixed(2)),
    totalInvested: Number(totalInvested.toFixed(2)),
    totalInterestEarned: Number(totalInterestEarned.toFixed(2)),
    returnMultiple: Number(returnMultiple.toFixed(2)),
    cagr: Number(cagr.toFixed(2)),
    effectiveAnnualYield: Number((effectiveAnnualYield * 100).toFixed(2)),
    yearsToDouble: Number(yearsToDouble.toFixed(1)),
    inflationAdjustedFV: Number(inflationAdjustedFV.toFixed(2)),
    taxAdjustedFV: Number(taxAdjustedFV.toFixed(2)),
    realPurchasingPowerLoss: Number(realPurchasingPowerLoss.toFixed(2)),
    taxDragAmount: Number(taxDragAmount.toFixed(2)),
    growthEfficiencyScore: Number(growthEfficiencyScore.toFixed(1)),
    savingsContributionRatio: Number(savingsContributionRatio.toFixed(1)),
    interestContributionRatio: Number(interestContributionRatio.toFixed(1)),
    yearlySchedule,
    monthlySchedule,
    scenarios: {
      conservative: conservativeResult,
      moderate: moderateResult,
      aggressive: aggressiveResult,
    },
    monteCarloProbability,
  };
}

function calculateSimpleScenario(title: string, input: FutureValueInput, rateOverride: number): ScenarioResult {
  const scenarioInput = { ...input, interestRate: rateOverride };
  const res = calculateFutureValueFast(scenarioInput);
  return {
    title,
    futureValue: res.fv,
    totalInvested: res.totalInvested,
    totalInterest: res.totalInterest,
    realFutureValue: res.realFv,
    taxAdjustedValue: res.taxFv,
    cagr: res.cagr,
    returnMultiple: res.returnMultiple,
  };
}

/**
 * Fast scalar calculation for scenario comparisons
 */
function calculateFutureValueFast(input: FutureValueInput): {
  fv: number;
  totalInvested: number;
  totalInterest: number;
  realFv: number;
  taxFv: number;
  cagr: number;
  returnMultiple: number;
} {
  const pv = input.initialInvestment || 0;
  const pmt = input.periodicContribution || 0;
  const rate = (input.interestRate || 0) / 100;
  const years = input.years || 10;
  const inf = (input.inflationRate || 0) / 100;
  const tax = (input.taxRate || 0) / 100;

  const n = getCompoundingPeriodsPerYear(input.compoundingFrequency);
  const p = getContributionPeriodsPerYear(input.contributionFrequency);

  const apy = Math.pow(1 + rate / n, n) - 1;
  const rP = Math.pow(1 + apy, 1 / p) - 1;
  const rPnet = Math.pow(1 + apy * (1 - tax), 1 / p) - 1;

  const totalPeriods = Math.round(years * p);
  const isBegin = input.contributionTiming === 'beginning';

  let fv = pv * Math.pow(1 + rP, totalPeriods);
  let taxFv = pv * Math.pow(1 + rPnet, totalPeriods);

  if (pmt > 0 && rP > 0) {
    const annFactor = (Math.pow(1 + rP, totalPeriods) - 1) / rP;
    const annFactorTaxed = (Math.pow(1 + rPnet, totalPeriods) - 1) / rPnet;
    const timingMult = isBegin ? (1 + rP) : 1;
    const timingMultTaxed = isBegin ? (1 + rPnet) : 1;

    fv += pmt * annFactor * timingMult;
    taxFv += pmt * annFactorTaxed * timingMultTaxed;
  } else if (pmt > 0) {
    fv += pmt * totalPeriods;
    taxFv += pmt * totalPeriods;
  }

  const totalInvested = pv + pmt * totalPeriods;
  const totalInterest = Math.max(0, fv - totalInvested);
  const realFv = fv / Math.pow(1 + inf, years);
  const returnMultiple = totalInvested > 0 ? fv / totalInvested : 0;
  const cagr = pv > 0 ? (Math.pow(fv / pv, 1 / years) - 1) * 100 : apy * 100;

  return {
    fv: Number(fv.toFixed(2)),
    totalInvested: Number(totalInvested.toFixed(2)),
    totalInterest: Number(totalInterest.toFixed(2)),
    realFv: Number(realFv.toFixed(2)),
    taxFv: Number(taxFv.toFixed(2)),
    cagr: Number(cagr.toFixed(2)),
    returnMultiple: Number(returnMultiple.toFixed(2)),
  };
}

/**
 * Solves Goal-Based Investing parameters (Required Monthly Contribution, Initial Investment, Rate, or Years)
 */
export function solveGoalParameter(
  targetFV: number,
  mode: 'pmt' | 'pv' | 'rate' | 'years',
  params: {
    initialInvestment?: number;
    periodicContribution?: number;
    interestRate?: number;
    years?: number;
    compoundingFrequency?: CompoundingFrequency;
    contributionFrequency?: ContributionFrequency;
    contributionTiming?: TimingOption;
  }
): number {
  const target = Math.max(0, targetFV);
  const pv = params.initialInvestment || 0;
  const pmt = params.periodicContribution || 0;
  const rate = (params.interestRate || 0) / 100;
  const years = params.years || 10;
  const nComp = getCompoundingPeriodsPerYear(params.compoundingFrequency);
  const pContrib = getContributionPeriodsPerYear(params.contributionFrequency);
  const isBegin = params.contributionTiming === 'beginning';

  if (mode === 'pmt') {
    // Solve for required periodic contribution PMT
    const apy = Math.pow(1 + rate / nComp, nComp) - 1;
    const rP = Math.pow(1 + apy, 1 / pContrib) - 1;
    const totalPeriods = years * pContrib;

    const lumpSumFV = pv * Math.pow(1 + rP, totalPeriods);
    const remainingTarget = Math.max(0, target - lumpSumFV);

    if (rP === 0) return remainingTarget / totalPeriods;

    const annuityFactor = ((Math.pow(1 + rP, totalPeriods) - 1) / rP) * (isBegin ? 1 + rP : 1);
    return Number((remainingTarget / annuityFactor).toFixed(2));
  }

  if (mode === 'pv') {
    // Solve for required initial investment PV
    const apy = Math.pow(1 + rate / nComp, nComp) - 1;
    const rP = Math.pow(1 + apy, 1 / pContrib) - 1;
    const totalPeriods = years * pContrib;

    let annuityFV = 0;
    if (pmt > 0 && rP > 0) {
      annuityFV = pmt * ((Math.pow(1 + rP, totalPeriods) - 1) / rP) * (isBegin ? 1 + rP : 1);
    } else if (pmt > 0) {
      annuityFV = pmt * totalPeriods;
    }

    const remainingTarget = Math.max(0, target - annuityFV);
    const requiredPV = remainingTarget / Math.pow(1 + rP, totalPeriods);
    return Number(Math.max(0, requiredPV).toFixed(2));
  }

  if (mode === 'years') {
    // Solve for required years t
    const apy = Math.pow(1 + rate / nComp, nComp) - 1;
    const rP = Math.pow(1 + apy, 1 / pContrib) - 1;

    if (rP === 0) {
      const annualContrib = pmt * pContrib;
      return Number(((target - pv) / annualContrib).toFixed(1));
    }

    // Numerical binary search for years between 0.1 and 100
    let low = 0.1;
    let high = 100;
    for (let iter = 0; iter < 40; iter++) {
      const mid = (low + high) / 2;
      const trialFV = calculateFutureValueFast({
        initialInvestment: pv,
        periodicContribution: pmt,
        interestRate: rate * 100,
        years: mid,
        compoundingFrequency: params.compoundingFrequency,
        contributionFrequency: params.contributionFrequency,
        contributionTiming: params.contributionTiming,
      }).fv;

      if (trialFV < target) {
        low = mid;
      } else {
        high = mid;
      }
    }
    return Number(((low + high) / 2).toFixed(1));
  }

  if (mode === 'rate') {
    // Solve for required interest rate % via binary search
    let low = 0;
    let high = 100;
    for (let iter = 0; iter < 40; iter++) {
      const mid = (low + high) / 2;
      const trialFV = calculateFutureValueFast({
        initialInvestment: pv,
        periodicContribution: pmt,
        interestRate: mid,
        years,
        compoundingFrequency: params.compoundingFrequency,
        contributionFrequency: params.contributionFrequency,
        contributionTiming: params.contributionTiming,
      }).fv;

      if (trialFV < target) {
        low = mid;
      } else {
        high = mid;
      }
    }
    return Number(((low + high) / 2).toFixed(2));
  }

  return 0;
}

/**
 * Monte Carlo Simulation to calculate probability of reaching target wealth under market volatility
 * Uses a deterministic seeded PRNG to ensure identical calculation on SSR and Client hydration.
 */
function runMonteCarloSimulation(
  pv: number,
  pmt: number,
  meanRatePct: number,
  years: number,
  pContrib: number,
  targetValue: number,
  iterations: number = 500
): number {
  const meanAnnual = meanRatePct / 100;
  const stdDevAnnual = 0.15; // 15% annual market volatility assumption
  let successCount = 0;

  // Seeded PRNG for SSR/Hydration consistency
  let seed = 123456789;
  const nextRandom = () => {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  for (let i = 0; i < iterations; i++) {
    let balance = pv;
    for (let y = 1; y <= years; y++) {
      // Box-Muller transformation for normal distribution random return
      const u1 = Math.max(1e-10, nextRandom());
      const u2 = nextRandom();
      const z = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
      const annualReturn = meanAnnual + z * stdDevAnnual;
      const rPeriod = Math.pow(1 + Math.max(-0.9, annualReturn), 1 / pContrib) - 1;

      for (let p = 0; p < pContrib; p++) {
        balance = (balance + pmt) * (1 + rPeriod);
      }
    }
    if (balance >= targetValue) {
      successCount++;
    }
  }

  return Number(((successCount / iterations) * 100).toFixed(1));
}
