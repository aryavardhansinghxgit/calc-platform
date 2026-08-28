/**
 * Annuity Payout Formula Engine
 * Fully implementing 5 core payout modules:
 * Mode 1: Fixed Length Payout ($500k @ 6% for 10 yrs -> $5,551.03/mo)
 * Mode 2: Fixed Payment Amount Depletion Solver ($500k @ 6%, $5,000/mo -> 11.6 yrs / 139 mos)
 * Mode 3: Life Expectancy Payout (Actuarial Table, male age 65 -> 18 yrs, $3,790.81/mo)
 * Mode 4: Joint Life Payout (Primary 65 + Spouse 63 -> 26 yrs, end age 91, $3,168.38/mo)
 * Mode 5: Immediate vs Deferred Annuity Comparison ($500k @ 6%, 10 yr deferral -> $9,941.04/mo, Advantage $526,801.85)
 * Smart Financial Insights Engine & Schedule Generator
 */

export interface FixedLengthPayoutInput {
  startingPrincipal: number; // e.g. 500000
  interestRatePercent: number; // e.g. 6.0
  yearsToPayout: number; // e.g. 10
  payoutFrequency: "monthly" | "quarterly" | "semiannual" | "annual";
}

export interface FixedPaymentPayoutInput {
  startingPrincipal: number; // e.g. 500000
  interestRatePercent: number; // e.g. 6.0
  desiredPaymentAmount: number; // e.g. 5000
  payoutFrequency: "monthly" | "quarterly" | "semiannual" | "annual";
}

export interface LifeExpectancyPayoutInput {
  currentAge: number;
  gender: "male" | "female";
  startingPrincipal: number;
  expectedReturnPercent: number;
  inflationRatePercent: number;
}

export interface JointLifePayoutInput {
  primaryAge: number;
  spouseAge: number;
  startingPrincipal: number;
  expectedReturnPercent: number;
}

export interface ImmediateVsDeferredInput {
  startingPrincipal: number;
  currentAge: number;
  deferralYears: number; // e.g. 10
  growthDuringDeferralPercent: number;
  payoutReturnPercent: number;
  payoutYears: number;
}

export interface AnnuityPayoutScheduleRow {
  period: number;
  label: string;
  beginningBalance: number;
  interestEarned: number;
  withdrawals: number;
  endingBalance: number;
}

export interface FixedLengthPayoutResult {
  startingPrincipal: number;
  periodicWithdrawal: number;
  monthlyWithdrawal: number;
  annualWithdrawal: number;
  totalPaymentsCount: number;
  totalAmountWithdrawn: number;
  totalInterestEarned: number;
  endingBalance: number;
  principalPercentage: number;
  interestPercentage: number;
  withdrawalRatePercent: number;
  effectiveYieldPercent: number;
  sustainabilityScore: "Safe" | "Moderate" | "Aggressive";
  schedule: AnnuityPayoutScheduleRow[];
}

export interface FixedPaymentPayoutResult {
  monthsUntilDepleted: number;
  yearsUntilDepleted: number;
  totalPaymentsCount: number;
  totalAmountWithdrawn: number;
  totalInterestEarned: number;
  endingBalance: number;
  isInfinite: boolean; // if interest >= payment
  schedule: AnnuityPayoutScheduleRow[];
}

export interface LifeExpectancyPayoutResult {
  estimatedLifeExpectancyYears: number;
  estimatedEndAge: number;
  sustainableMonthlyIncome: number;
  totalLifetimeIncome: number;
  purchasingPowerLossPercent: number;
}

export interface JointLifePayoutResult {
  jointLifeExpectancyYears: number;
  jointEndAge: number;
  sustainableMonthlyIncome: number;
  totalLifetimeIncome: number;
}

export interface ImmediateVsDeferredResult {
  immediateMonthlyIncome: number;
  immediateTotalLifetime: number;
  deferredAccumulatedBalance: number;
  deferredMonthlyIncome: number;
  deferredTotalLifetime: number;
  deferredAdvantage: number;
}

export interface SmartInsight {
  type: "info" | "warning" | "success";
  title: string;
  description: string;
}

function safeNum(val: number | undefined | null, fallback: number): number {
  if (val !== undefined && val !== null && !isNaN(Number(val))) {
    return Number(val);
  }
  return fallback;
}

/**
 * Payout Frequency Helper
 */
export function getPaymentsPerYear(freq: string): number {
  switch (freq) {
    case "monthly":
      return 12;
    case "quarterly":
      return 4;
    case "semiannual":
      return 2;
    case "annual":
      return 1;
    default:
      return 12;
  }
}

/**
 * Actuarial Life Expectancy Lookup (SSA Table Approximation)
 */
export function getActuarialLifeExpectancy(age: number, gender: "male" | "female"): number {
  const baseYears = gender === "female" ? 86 : 83;
  return Math.max(5, baseYears - age);
}

/**
 * MODE 1: Fixed Length Payout Solver
 * Formula: PMT = [P * r * (1+r)^n] / [(1+r)^n - 1]
 */
export function calculateFixedLengthPayout(input: FixedLengthPayoutInput): FixedLengthPayoutResult {
  const P = Math.max(0, safeNum(input.startingPrincipal, 500000));
  const rAnnual = Math.max(0, safeNum(input.interestRatePercent, 6.0)) / 100;
  const years = Math.max(1, safeNum(input.yearsToPayout, 10));
  const m = getPaymentsPerYear(input.payoutFrequency);
  const totalN = years * m;
  const rPeriod = rAnnual / m;

  let pmt = 0;
  if (rPeriod > 0) {
    pmt = (P * rPeriod * Math.pow(1 + rPeriod, totalN)) / (Math.pow(1 + rPeriod, totalN) - 1);
  } else {
    pmt = totalN > 0 ? P / totalN : 0;
  }

  const periodicWithdrawal = Number(pmt.toFixed(2));
  const monthlyWithdrawal = Number((pmt * (m / 12)).toFixed(2));
  const annualWithdrawal = Number((pmt * m).toFixed(2));
  const totalAmountWithdrawn = Number((pmt * totalN).toFixed(2));
  const totalInterestEarned = Number(Math.max(0, totalAmountWithdrawn - P).toFixed(2));

  const totalSum = totalAmountWithdrawn > 0 ? totalAmountWithdrawn : 1;
  const principalPercentage = Number(((P / totalSum) * 100).toFixed(1));
  const interestPercentage = Number(((totalInterestEarned / totalSum) * 100).toFixed(1));

  const withdrawalRatePercent = P > 0 ? Number(((annualWithdrawal / P) * 100).toFixed(2)) : 0;
  const effectiveYieldPercent = Number(((Math.pow(1 + rPeriod, m) - 1) * 100).toFixed(2));

  let sustainabilityScore: "Safe" | "Moderate" | "Aggressive" = "Safe";
  if (withdrawalRatePercent > 8) sustainabilityScore = "Aggressive";
  else if (withdrawalRatePercent > 5) sustainabilityScore = "Moderate";

  // Year-by-Year Schedule
  const schedule: AnnuityPayoutScheduleRow[] = [];
  let currentBal = P;

  for (let y = 1; y <= years; y++) {
    const beginningBalance = currentBal;
    let yearInterest = 0;
    let yearWithdrawals = 0;

    for (let p = 1; p <= m; p++) {
      const pInterest = currentBal * rPeriod;
      yearInterest += pInterest;
      yearWithdrawals += pmt;
      currentBal = Math.max(0, currentBal + pInterest - pmt);
    }

    schedule.push({
      period: y,
      label: `Year ${y}`,
      beginningBalance: Number(beginningBalance.toFixed(2)),
      interestEarned: Number(yearInterest.toFixed(2)),
      withdrawals: Number(yearWithdrawals.toFixed(2)),
      endingBalance: Number(currentBal.toFixed(2)),
    });
  }

  return {
    startingPrincipal: P,
    periodicWithdrawal,
    monthlyWithdrawal,
    annualWithdrawal,
    totalPaymentsCount: totalN,
    totalAmountWithdrawn,
    totalInterestEarned,
    endingBalance: 0,
    principalPercentage,
    interestPercentage,
    withdrawalRatePercent,
    effectiveYieldPercent,
    sustainabilityScore,
    schedule,
  };
}

/**
 * MODE 2: Fixed Payment Payout Solver
 * Formula: n = ln(PMT / (PMT - P*r)) / ln(1+r)
 */
export function calculateFixedPaymentPayout(input: FixedPaymentPayoutInput): FixedPaymentPayoutResult {
  const P = Math.max(0, safeNum(input.startingPrincipal, 500000));
  const rAnnual = Math.max(0, safeNum(input.interestRatePercent, 6.0)) / 100;
  const desiredPmt = Math.max(1, safeNum(input.desiredPaymentAmount, 5000));
  const m = getPaymentsPerYear(input.payoutFrequency);
  const rPeriod = rAnnual / m;

  const firstPeriodInterest = P * rPeriod;
  if (P > 0 && firstPeriodInterest >= desiredPmt) {
    // Interest meets or exceeds desired withdrawal -> funds will never deplete
    return {
      monthsUntilDepleted: 999,
      yearsUntilDepleted: 99,
      totalPaymentsCount: 999,
      totalAmountWithdrawn: 9999999,
      totalInterestEarned: 9999999,
      endingBalance: P,
      isInfinite: true,
      schedule: [],
    };
  }

  let nPeriods = 0;
  if (rPeriod > 0) {
    nPeriods = Math.log(desiredPmt / (desiredPmt - P * rPeriod)) / Math.log(1 + rPeriod);
  } else {
    nPeriods = P / desiredPmt;
  }

  const totalPaymentsCount = Math.ceil(nPeriods);
  const monthsUntilDepleted = Math.round(nPeriods * (12 / m));
  const yearsUntilDepleted = Number((monthsUntilDepleted / 12).toFixed(1));

  // Schedule simulation
  const schedule: AnnuityPayoutScheduleRow[] = [];
  let currentBal = P;
  let accumulatedInterest = 0;
  let accumulatedWithdrawals = 0;
  let yearIndex = 1;

  while (currentBal > 0 && yearIndex <= 60) {
    const beginningBalance = currentBal;
    let yearInterest = 0;
    let yearWithdrawals = 0;

    for (let p = 1; p <= m && currentBal > 0; p++) {
      const pInterest = currentBal * rPeriod;
      const actualPmt = Math.min(currentBal + pInterest, desiredPmt);
      yearInterest += pInterest;
      yearWithdrawals += actualPmt;
      currentBal = Math.max(0, currentBal + pInterest - actualPmt);
    }

    accumulatedInterest += yearInterest;
    accumulatedWithdrawals += yearWithdrawals;

    schedule.push({
      period: yearIndex,
      label: `Year ${yearIndex}`,
      beginningBalance: Number(beginningBalance.toFixed(2)),
      interestEarned: Number(yearInterest.toFixed(2)),
      withdrawals: Number(yearWithdrawals.toFixed(2)),
      endingBalance: Number(currentBal.toFixed(2)),
    });

    if (currentBal <= 0) break;
    yearIndex++;
  }

  return {
    monthsUntilDepleted,
    yearsUntilDepleted,
    totalPaymentsCount,
    totalAmountWithdrawn: Number(accumulatedWithdrawals.toFixed(2)),
    totalInterestEarned: Number(accumulatedInterest.toFixed(2)),
    endingBalance: 0,
    isInfinite: false,
    schedule,
  };
}

/**
 * MODE 3: Life Expectancy Payout Solver
 */
export function calculateLifeExpectancyPayout(input: LifeExpectancyPayoutInput): LifeExpectancyPayoutResult {
  const age = Math.max(50, Math.min(95, safeNum(input.currentAge, 65)));
  const lifeExpYears = getActuarialLifeExpectancy(age, input.gender);
  const endAge = age + lifeExpYears;

  const res = calculateFixedLengthPayout({
    startingPrincipal: safeNum(input.startingPrincipal, 500000),
    interestRatePercent: safeNum(input.expectedReturnPercent, 6.0),
    yearsToPayout: lifeExpYears,
    payoutFrequency: "monthly",
  });

  const inflationRate = safeNum(input.inflationRatePercent, 2.5) / 100;
  const purchasingPowerLoss = Number(((1 - 1 / Math.pow(1 + inflationRate, lifeExpYears)) * 100).toFixed(1));

  return {
    estimatedLifeExpectancyYears: lifeExpYears,
    estimatedEndAge: endAge,
    sustainableMonthlyIncome: res.monthlyWithdrawal,
    totalLifetimeIncome: res.totalAmountWithdrawn,
    purchasingPowerLossPercent: purchasingPowerLoss,
  };
}

/**
 * MODE 4: Joint Life Payout Solver
 */
export function calculateJointLifePayout(input: JointLifePayoutInput): JointLifePayoutResult {
  const primaryAge = Math.max(50, Math.min(95, safeNum(input.primaryAge, 65)));
  const spouseAge = Math.max(50, Math.min(95, safeNum(input.spouseAge, 63)));

  const primaryRemaining = getActuarialLifeExpectancy(primaryAge, "male");
  const spouseRemaining = getActuarialLifeExpectancy(spouseAge, "female");

  // Joint survival buffer (+3 years over longer lifespan)
  const jointLifeYears = Math.max(primaryRemaining, spouseRemaining) + 3;
  const jointEndAge = Math.max(primaryAge, spouseAge) + jointLifeYears;

  const res = calculateFixedLengthPayout({
    startingPrincipal: safeNum(input.startingPrincipal, 500000),
    interestRatePercent: safeNum(input.expectedReturnPercent, 6.0),
    yearsToPayout: jointLifeYears,
    payoutFrequency: "monthly",
  });

  return {
    jointLifeExpectancyYears: jointLifeYears,
    jointEndAge,
    sustainableMonthlyIncome: res.monthlyWithdrawal,
    totalLifetimeIncome: res.totalAmountWithdrawn,
  };
}

/**
 * MODE 5: Immediate vs Deferred Annuity Comparison Solver
 */
export function calculateImmediateVsDeferred(input: ImmediateVsDeferredInput): ImmediateVsDeferredResult {
  const P = safeNum(input.startingPrincipal, 500000);
  const deferYears = safeNum(input.deferralYears, 10);
  const deferGrowthRate = safeNum(input.growthDuringDeferralPercent, 6.0) / 100;
  const payoutRate = safeNum(input.payoutReturnPercent, 6.0);
  const payoutYears = safeNum(input.payoutYears, 10);

  // Immediate Annuity
  const immediateRes = calculateFixedLengthPayout({
    startingPrincipal: P,
    interestRatePercent: payoutRate,
    yearsToPayout: payoutYears,
    payoutFrequency: "monthly",
  });

  // Deferred Annuity: Compounded balance during deferral
  const deferredBalance = Number((P * Math.pow(1 + deferGrowthRate, deferYears)).toFixed(2));
  const deferredRes = calculateFixedLengthPayout({
    startingPrincipal: deferredBalance,
    interestRatePercent: payoutRate,
    yearsToPayout: payoutYears,
    payoutFrequency: "monthly",
  });

  const advantage = Number((deferredRes.totalAmountWithdrawn - immediateRes.totalAmountWithdrawn).toFixed(2));

  return {
    immediateMonthlyIncome: immediateRes.monthlyWithdrawal,
    immediateTotalLifetime: immediateRes.totalAmountWithdrawn,
    deferredAccumulatedBalance: deferredBalance,
    deferredMonthlyIncome: deferredRes.monthlyWithdrawal,
    deferredTotalLifetime: deferredRes.totalAmountWithdrawn,
    deferredAdvantage: advantage,
  };
}

/**
 * Smart Insights Engine
 */
export function generateSmartInsights(
  payoutRes: FixedLengthPayoutResult,
  inflationRatePercent: number = 2.5
): SmartInsight[] {
  const insights: SmartInsight[] = [];

  if (payoutRes.withdrawalRatePercent > 8) {
    insights.push({
      type: "warning",
      title: "Aggressive Withdrawal Rate",
      description: `Your annual withdrawal rate of ${payoutRes.withdrawalRatePercent}% is high. Consider extending payout duration to prevent early fund exhaustion.`,
    });
  } else if (payoutRes.withdrawalRatePercent <= 5) {
    insights.push({
      type: "success",
      title: "Safe Sustainable Payout Rate",
      description: `Your annual withdrawal rate of ${payoutRes.withdrawalRatePercent}% is within safe sustainable retirement guidelines (4%-5% rule).`,
    });
  }

  insights.push({
    type: "info",
    title: "Interest Compound Growth Factor",
    description: `Interest earnings generate ${payoutRes.interestPercentage}% ($${payoutRes.totalInterestEarned.toLocaleString()}) of your total lifetime payout income!`,
  });

  const years = payoutRes.schedule.length;
  const inflationLoss = (1 - 1 / Math.pow(1 + inflationRatePercent / 100, years)) * 100;
  insights.push({
    type: "warning",
    title: "Inflation Purchasing Power Erosion",
    description: `Over ${years} years, a ${inflationRatePercent}% inflation rate will reduce purchasing power by ${inflationLoss.toFixed(1)}%. Consider inflation riders.`,
  });

  return insights;
}
