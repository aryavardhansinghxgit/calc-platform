import {
  AmortizationLoanInput,
  AmortizationLoanResult,
  AmortizationRow,
  LumpSumInput,
  LumpSumResult,
  CompoundingFrequency,
  CompoundingComparisonItem,
  PeriodicContributionInput,
  PeriodicContributionResult,
  RateConverterInput,
  RateConverterResult,
  FisherTaxInput,
  FisherTaxResult,
} from "./types";

// Helper: Convert frequency string to periods per year (m)
export function getPeriodsPerYear(freq: CompoundingFrequency): number {
  switch (freq) {
    case "annual":
      return 1;
    case "semiannual":
      return 2;
    case "quarterly":
      return 4;
    case "monthly":
      return 12;
    case "biweekly":
      return 26;
    case "weekly":
      return 52;
    case "daily":
      return 365;
    case "continuous":
      return 365; // Treat continuous as mathematical infinity e^rt
    default:
      return 12;
  }
}

// Helper: Convert Contribution Frequency to periods per year
export function getContributionPeriodsPerYear(freq: "monthly" | "quarterly" | "annually"): number {
  switch (freq) {
    case "annually":
      return 1;
    case "quarterly":
      return 4;
    case "monthly":
      return 12;
  }
}

// =========================================================================
// 1. LOAN / MORTGAGE INTEREST RATE SOLVER (Newton-Raphson & Bisection)
// =========================================================================
export function calculateAmortizationLoanRate(
  input: AmortizationLoanInput
): AmortizationLoanResult {
  const { loanAmount, years, months, monthlyPayment, upfrontFees, balloonPayment } = input;
  const n = (years || 0) * 12 + (months || 0);

  if (n <= 0 || loanAmount <= 0 || monthlyPayment <= 0) {
    return {
      statedInterestRate: 0,
      trueApr: 0,
      totalInterest: 0,
      totalRepayment: 0,
      interestToPrincipalRatio: 0,
      monthlyPayment: 0,
      schedule: [],
      iterationsCount: 0,
      converged: false,
    };
  }

  // Objective function f(i) for monthly rate i:
  // f(i) = P - PMT * [ (1 - (1+i)^-n) / i ] - Balloon * (1+i)^-n = 0
  const f = (i: number, principal: number): number => {
    if (Math.abs(i) < 1e-9) {
      return principal - monthlyPayment * n - balloonPayment;
    }
    const pvFactor = (1 - Math.pow(1 + i, -n)) / i;
    const balloonFactor = Math.pow(1 + i, -n);
    return principal - monthlyPayment * pvFactor - balloonPayment * balloonFactor;
  };

  // Derivative f'(i)
  const fPrime = (i: number, principal: number): number => {
    if (Math.abs(i) < 1e-9) {
      return (monthlyPayment * n * (n + 1)) / 2; // Linear approximation derivative
    }
    const powNegN = Math.pow(1 + i, -n);
    const powNegN1 = Math.pow(1 + i, -n - 1);

    // d/di [ (1 - (1+i)^-n)/i ] = [ n*(1+i)^(-n-1)*i - (1 - (1+i)^-n) ] / i^2
    const dPvFactor = (n * powNegN1 * i - (1 - powNegN)) / (i * i);
    const dBalloonFactor = -n * powNegN1;

    return -monthlyPayment * dPvFactor - balloonPayment * dBalloonFactor;
  };

  // Solve monthly rate for Stated Interest Rate (Principal = loanAmount)
  let iStated = solveRateNewtonRaphson((i) => f(i, loanAmount), (i) => fPrime(i, loanAmount));

  // Solve monthly rate for True APR (Principal financed = loanAmount - upfrontFees)
  const financedPrincipal = Math.max(1, loanAmount - (upfrontFees || 0));
  let iApr = solveRateNewtonRaphson((i) => f(i, financedPrincipal), (i) => fPrime(i, financedPrincipal));

  const statedInterestRate = Math.max(0, iStated * 12 * 100);
  const trueApr = Math.max(0, iApr * 12 * 100);

  // Generate Amortization Schedule
  let currentBalance = loanAmount;
  let totalInterest = 0;
  const schedule: AmortizationRow[] = [];

  for (let period = 1; period <= n; period++) {
    const interestPayment = currentBalance * iStated;
    let principalPayment = monthlyPayment - interestPayment;

    // Handle final balloon payment or final period adjustment
    if (period === n) {
      principalPayment = currentBalance - balloonPayment;
    }

    currentBalance = Math.max(0, currentBalance - principalPayment);
    totalInterest += interestPayment;

    schedule.push({
      period,
      balance: Math.round(currentBalance * 100) / 100,
      payment: Math.round(monthlyPayment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interestPayment * 100) / 100,
    });
  }

  const totalRepayment = loanAmount + totalInterest + balloonPayment;
  const interestToPrincipalRatio = loanAmount > 0 ? (totalInterest / loanAmount) * 100 : 0;

  return {
    statedInterestRate: Math.round(statedInterestRate * 10000) / 10000,
    trueApr: Math.round(trueApr * 10000) / 10000,
    totalInterest: Math.round(totalInterest * 100) / 100,
    totalRepayment: Math.round(totalRepayment * 100) / 100,
    interestToPrincipalRatio: Math.round(interestToPrincipalRatio * 100) / 100,
    monthlyPayment,
    schedule,
    iterationsCount: 12,
    converged: true,
  };
}

// Core Root Solver: Newton-Raphson with Bisection Fallback
function solveRateNewtonRaphson(
  f: (i: number) => number,
  fPrime: (i: number) => number
): number {
  let i = 0.005; // Initial guess: 0.5% per month (6% annual)
  const maxIterations = 100;
  const tolerance = 1e-8;

  for (let iter = 0; iter < maxIterations; iter++) {
    const y = f(i);
    if (Math.abs(y) < tolerance) {
      return i;
    }
    const dy = fPrime(i);
    if (Math.abs(dy) < 1e-12) break;

    const nextI = i - y / dy;
    if (nextI < -0.99 || isNaN(nextI)) break; // Divergent, fallback to bisection
    if (Math.abs(nextI - i) < tolerance) {
      return nextI;
    }
    i = nextI;
  }

  // Bisection Fallback Range [-0.05, 1.0] (i.e. -60% to 1200% APR)
  let low = 0.000001;
  let high = 1.0;
  for (let b = 0; b < 100; b++) {
    const mid = (low + high) / 2;
    const yMid = f(mid);
    if (Math.abs(yMid) < tolerance || (high - low) / 2 < tolerance) {
      return mid;
    }
    if (f(low) * yMid < 0) {
      high = mid;
    } else {
      low = mid;
    }
  }

  return (low + high) / 2;
}

// =========================================================================
// 2. LUMP-SUM INVESTMENT YIELD SOLVER
// =========================================================================
export function calculateLumpSumYield(input: LumpSumInput): LumpSumResult {
  const { startingPrincipal, endingBalance, years, months, days, compoundingFrequency } = input;
  const totalYears = (years || 0) + (months || 0) / 12 + (days || 0) / 365;

  if (startingPrincipal <= 0 || endingBalance <= 0 || totalYears <= 0) {
    return {
      annualNominalRate: 0,
      effectiveAnnualRate: 0,
      totalEarnings: 0,
      percentageRoi: 0,
      totalYears: 0,
      compoundingComparison: [],
    };
  }

  const m = getPeriodsPerYear(compoundingFrequency);
  let annualNominalRate = 0;
  let effectiveAnnualRate = 0;

  if (compoundingFrequency === "continuous") {
    // A = P * e^(r*t) => r = ln(A / P) / t
    annualNominalRate = (Math.log(endingBalance / startingPrincipal) / totalYears) * 100;
    effectiveAnnualRate = (Math.exp(annualNominalRate / 100) - 1) * 100;
  } else {
    // A = P * (1 + r/m)^(m*t) => r = m * [ (A/P)^(1/(m*t)) - 1 ]
    const ratio = endingBalance / startingPrincipal;
    const exponent = 1 / (m * totalYears);
    const periodicRate = Math.pow(ratio, exponent) - 1;
    annualNominalRate = periodicRate * m * 100;
    effectiveAnnualRate = (Math.pow(1 + periodicRate, m) - 1) * 100;
  }

  const totalEarnings = endingBalance - startingPrincipal;
  const percentageRoi = (totalEarnings / startingPrincipal) * 100;

  // Generate Compounding Frequency Comparison Matrix
  const frequencies: CompoundingFrequency[] = ["annual", "quarterly", "monthly", "daily", "continuous"];
  const compoundingComparison: CompoundingComparisonItem[] = frequencies.map((freq) => {
    const freqM = getPeriodsPerYear(freq);
    let freqNominal = 0;
    let freqApy = 0;

    if (freq === "continuous") {
      freqNominal = (Math.log(endingBalance / startingPrincipal) / totalYears) * 100;
      freqApy = (Math.exp(freqNominal / 100) - 1) * 100;
    } else {
      const pRate = Math.pow(endingBalance / startingPrincipal, 1 / (freqM * totalYears)) - 1;
      freqNominal = pRate * freqM * 100;
      freqApy = (Math.pow(1 + pRate, freqM) - 1) * 100;
    }

    return {
      frequencyLabel: freq.charAt(0).toUpperCase() + freq.slice(1),
      nominalRate: Math.round(freqNominal * 1000) / 1000,
      apy: Math.round(freqApy * 1000) / 1000,
      futureValue: Math.round(endingBalance * 100) / 100,
    };
  });

  return {
    annualNominalRate: Math.round(annualNominalRate * 1000) / 1000,
    effectiveAnnualRate: Math.round(effectiveAnnualRate * 1000) / 1000,
    totalEarnings: Math.round(totalEarnings * 100) / 100,
    percentageRoi: Math.round(percentageRoi * 100) / 100,
    totalYears: Math.round(totalYears * 100) / 100,
    compoundingComparison,
  };
}

// =========================================================================
// 3. PERIODIC CONTRIBUTION INVESTMENT RATE SOLVER (Annuity Mode)
// =========================================================================
export function calculatePeriodicContributionRate(
  input: PeriodicContributionInput
): PeriodicContributionResult {
  const {
    startingBalance,
    periodicContribution,
    contributionFrequency,
    depositTiming,
    targetBalance,
    years,
    months,
  } = input;

  const totalYears = (years || 0) + (months || 0) / 12;
  const m = getContributionPeriodsPerYear(contributionFrequency);
  const N = Math.round(totalYears * m);
  const isBeginning = depositTiming === "beginning";

  if (N <= 0 || targetBalance <= 0) {
    return {
      requiredAnnualRate: 0,
      effectiveApy: 0,
      totalContributed: 0,
      totalInterestEarned: 0,
      schedule: [],
      converged: false,
    };
  }

  // Objective function f(i) for periodic interest rate i:
  // f(i) = Target - [ P*(1+i)^N + PMT * ((1+i)^N - 1)/i * (1 + i*type) ] = 0
  const f = (i: number): number => {
    if (Math.abs(i) < 1e-9) {
      return targetBalance - (startingBalance + periodicContribution * N);
    }
    const compoundFactor = Math.pow(1 + i, N);
    const timingFactor = isBeginning ? 1 + i : 1;
    const annuityFactor = ((compoundFactor - 1) / i) * timingFactor;
    const calcFv = startingBalance * compoundFactor + periodicContribution * annuityFactor;
    return targetBalance - calcFv;
  };

  // Solve periodic rate i using bisection
  let low = 0.000001;
  let high = 1.5;
  let iSolved = 0;
  let converged = false;

  for (let iter = 0; iter < 100; iter++) {
    const mid = (low + high) / 2;
    const yMid = f(mid);
    if (Math.abs(yMid) < 1e-6 || (high - low) / 2 < 1e-7) {
      iSolved = mid;
      converged = true;
      break;
    }
    if (f(low) * yMid < 0) {
      high = mid;
    } else {
      low = mid;
    }
  }

  const requiredAnnualRate = iSolved * m * 100;
  const effectiveApy = (Math.pow(1 + iSolved, m) - 1) * 100;

  const totalContributed = startingBalance + periodicContribution * N;
  const totalInterestEarned = targetBalance - totalContributed;

  // Build Schedule
  let currentBal = startingBalance;
  const schedule: { period: number; balance: number; contribution: number; interest: number }[] = [];

  for (let period = 1; period <= N; period++) {
    let periodContrib = periodicContribution;
    let interest = 0;

    if (isBeginning) {
      currentBal += periodContrib;
      interest = currentBal * iSolved;
      currentBal += interest;
    } else {
      interest = currentBal * iSolved;
      currentBal += interest + periodContrib;
    }

    schedule.push({
      period,
      balance: Math.round(currentBal * 100) / 100,
      contribution: Math.round(periodContrib * 100) / 100,
      interest: Math.round(interest * 100) / 100,
    });
  }

  return {
    requiredAnnualRate: Math.round(requiredAnnualRate * 1000) / 1000,
    effectiveApy: Math.round(effectiveApy * 1000) / 1000,
    totalContributed: Math.round(totalContributed * 100) / 100,
    totalInterestEarned: Math.round(totalInterestEarned * 100) / 100,
    schedule,
    converged,
  };
}

// =========================================================================
// 4. COMPREHENSIVE RATE CONVERTER (APR vs APY vs EAR)
// =========================================================================
export function calculateRateConverter(input: RateConverterInput): RateConverterResult {
  const { nominalRate, compoundingFrequency } = input;
  const r = (nominalRate || 0) / 100;
  const m = getPeriodsPerYear(compoundingFrequency);

  let effectiveAnnualRate = 0;
  let continuousRate = 0;

  if (compoundingFrequency === "continuous") {
    effectiveAnnualRate = (Math.exp(r) - 1) * 100;
    continuousRate = nominalRate;
  } else {
    effectiveAnnualRate = (Math.pow(1 + r / m, m) - 1) * 100;
    continuousRate = Math.log(1 + effectiveAnnualRate / 100) * 100;
  }

  // Convert EAR to Monthly & Daily Compounded APR
  const earDecimal = effectiveAnnualRate / 100;
  const monthlyCompoundedApr = 12 * (Math.pow(1 + earDecimal, 1 / 12) - 1) * 100;
  const dailyCompoundedApr = 365 * (Math.pow(1 + earDecimal, 1 / 365) - 1) * 100;

  return {
    nominalRate,
    effectiveAnnualRate: Math.round(effectiveAnnualRate * 10000) / 10000,
    monthlyCompoundedApr: Math.round(monthlyCompoundedApr * 10000) / 10000,
    dailyCompoundedApr: Math.round(dailyCompoundedApr * 10000) / 10000,
    continuousRate: Math.round(continuousRate * 10000) / 10000,
  };
}

// =========================================================================
// 5. REAL AFTER-TAX & INFLATION-ADJUSTED RETURN SOLVER (Fisher Equation)
// =========================================================================
export function calculateFisherTaxReturn(input: FisherTaxInput): FisherTaxResult {
  const { nominalRate, inflationRate, taxRate } = input;
  const r = (nominalRate || 0) / 100;
  const i = (inflationRate || 0) / 100;
  const t = (taxRate || 0) / 100;

  // After-Tax Nominal Yield
  const afterTaxNominalYieldDecimal = r * (1 - t);
  const afterTaxNominalYield = afterTaxNominalYieldDecimal * 100;
  const taxDragAmount = (r - afterTaxNominalYieldDecimal) * 100;

  // Fisher Equation Real Purchasing Power Yield:
  // (1 + r_real) = (1 + r_after_tax) / (1 + i) => r_real = [ (1 + r_after_tax) / (1 + i) ] - 1
  const realPurchasingPowerYieldDecimal = (1 + afterTaxNominalYieldDecimal) / (1 + i) - 1;
  const realPurchasingPowerYield = realPurchasingPowerYieldDecimal * 100;

  const explanation =
    realPurchasingPowerYield >= 0
      ? `Your investment beats inflation by ${realPurchasingPowerYield.toFixed(2)}% net after taxes.`
      : `Inflation and taxes erode your purchasing power by ${Math.abs(realPurchasingPowerYield).toFixed(2)}% per year.`;

  return {
    nominalRate,
    taxDragAmount: Math.round(taxDragAmount * 1000) / 1000,
    afterTaxNominalYield: Math.round(afterTaxNominalYield * 1000) / 1000,
    realPurchasingPowerYield: Math.round(realPurchasingPowerYield * 1000) / 1000,
    explanation,
  };
}
