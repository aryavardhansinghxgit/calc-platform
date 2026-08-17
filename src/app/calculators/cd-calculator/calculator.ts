import {
  StandardCdInput,
  StandardCdResult,
  CdScheduleRow,
  CompoundingFrequency,
  CdLadderInput,
  CdLadderResult,
  CdLadderStage,
  CdVsHysaInput,
  CdVsHysaResult,
  EarlyWithdrawalInput,
  EarlyWithdrawalResult,
  CdGoalSolverInput,
  CdGoalSolverResult,
  SpecialtyCdInput,
  SpecialtyCdResult,
} from "./types";

export function getPeriodsPerYear(freq: CompoundingFrequency): number {
  switch (freq) {
    case "daily":
      return 365;
    case "monthly":
      return 12;
    case "quarterly":
      return 4;
    case "semiannually":
      return 2;
    case "annually":
      return 1;
    default:
      return 365;
  }
}

// =========================================================================
// 1. STANDARD FIXED-RATE CD GROWTH ENGINE
// =========================================================================
export function calculateStandardCd(input: StandardCdInput): StandardCdResult {
  const {
    startingDeposit,
    termMonths,
    rateValue,
    rateType,
    compoundingFrequency,
    marginalTaxRate,
    inflationRate,
  } = input;

  const t = (termMonths || 0) / 12;
  const n = getPeriodsPerYear(compoundingFrequency);

  if (startingDeposit <= 0 || termMonths <= 0 || rateValue <= 0) {
    return {
      startingDeposit: Math.max(0, startingDeposit),
      finalBalance: Math.max(0, startingDeposit),
      totalInterestPreTax: 0,
      taxDragAmount: 0,
      totalInterestAfterTax: 0,
      effectiveApy: 0,
      nominalApr: 0,
      realBalance: Math.max(0, startingDeposit),
      realPurchasingPowerGain: 0,
      totalPercentageRoi: 0,
      schedule: [],
    };
  }

  // APY vs APR Conversion
  let effectiveApy = 0;
  let nominalApr = 0;

  if (rateType === "apy") {
    effectiveApy = rateValue;
    // APY = (1 + r/n)^n - 1 => r = n * [ (1 + APY)^(1/n) - 1 ]
    nominalApr = n * (Math.pow(1 + rateValue / 100, 1 / n) - 1) * 100;
  } else {
    nominalApr = rateValue;
    // APY = (1 + r/n)^n - 1
    effectiveApy = (Math.pow(1 + (rateValue / 100) / n, n) - 1) * 100;
  }

  // Compound Interest Formula: A = P * (1 + r/n)^(n * t)
  const rDecimal = nominalApr / 100;
  const finalBalance = startingDeposit * Math.pow(1 + rDecimal / n, n * t);
  const totalInterestPreTax = finalBalance - startingDeposit;

  // Tax Drag Calculation: Tax = PreTax Interest * TaxRate
  const taxRateDecimal = (marginalTaxRate || 0) / 100;
  const taxDragAmount = totalInterestPreTax * taxRateDecimal;
  const totalInterestAfterTax = totalInterestPreTax - taxDragAmount;
  const afterTaxBalance = startingDeposit + totalInterestAfterTax;

  // Real Inflation-Adjusted Balance (Fisher Purchasing Power): Real = AfterTaxBalance / (1 + i)^t
  const inflationDecimal = (inflationRate || 0) / 100;
  const realBalance = afterTaxBalance / Math.pow(1 + inflationDecimal, t);
  const realPurchasingPowerGain = realBalance - startingDeposit;
  const totalPercentageRoi = (totalInterestPreTax / startingDeposit) * 100;

  // Build Month-by-Month Schedule
  const schedule: CdScheduleRow[] = [];
  let currentBalance = startingDeposit;
  let cumInterest = 0;
  let cumTax = 0;

  for (let m = 1; m <= termMonths; m++) {
    const timeInYears = m / 12;
    const mBalance = startingDeposit * Math.pow(1 + rDecimal / n, n * timeInYears);
    const mInterest = mBalance - startingDeposit;
    const mTax = mInterest * taxRateDecimal;
    const mAfterTaxBal = startingDeposit + (mInterest - mTax);
    const mRealBal = mAfterTaxBal / Math.pow(1 + inflationDecimal, timeInYears);

    schedule.push({
      month: m,
      deposit: Math.round(startingDeposit * 100) / 100,
      interestEarned: Math.round((mInterest - cumInterest) * 100) / 100,
      cumulativeInterest: Math.round(mInterest * 100) / 100,
      endingBalance: Math.round(mBalance * 100) / 100,
      taxPaidCumulative: Math.round(mTax * 100) / 100,
      afterTaxBalance: Math.round(mAfterTaxBal * 100) / 100,
      realPurchasingPowerBalance: Math.round(mRealBal * 100) / 100,
    });

    cumInterest = mInterest;
    cumTax = mTax;
  }

  return {
    startingDeposit: Math.round(startingDeposit * 100) / 100,
    finalBalance: Math.round(finalBalance * 100) / 100,
    totalInterestPreTax: Math.round(totalInterestPreTax * 100) / 100,
    taxDragAmount: Math.round(taxDragAmount * 1000) / 1000,
    totalInterestAfterTax: Math.round(totalInterestAfterTax * 100) / 100,
    effectiveApy: Math.round(effectiveApy * 1000) / 1000,
    nominalApr: Math.round(nominalApr * 1000) / 1000,
    realBalance: Math.round(realBalance * 100) / 100,
    realPurchasingPowerGain: Math.round(realPurchasingPowerGain * 100) / 100,
    totalPercentageRoi: Math.round(totalPercentageRoi * 100) / 100,
    schedule,
  };
}

// =========================================================================
// 2. MULTI-TIER CD LADDER STRATEGY BUILDER
// =========================================================================
export function calculateCdLadder(input: CdLadderInput): CdLadderResult {
  const { totalCapital, stagesCount, baseShortRate, topLongRate } = input;
  const stagesN = Math.max(1, Math.min(10, stagesCount || 5));
  const allocationPerStage = (totalCapital || 0) / stagesN;

  const stages: CdLadderStage[] = [];
  let blendedApySum = 0;
  let total5YearLadderValue = 0;

  for (let s = 1; s <= stagesN; s++) {
    const termYears = s;
    // Linear rate curve between short rate and top long rate
    const apy = baseShortRate + ((topLongRate - baseShortRate) / (stagesN - 1 || 1)) * (s - 1);
    const maturityBalance = allocationPerStage * Math.pow(1 + apy / 100, termYears);

    blendedApySum += apy;
    total5YearLadderValue += maturityBalance;

    stages.push({
      stage: s,
      termYears,
      allocationAmount: Math.round(allocationPerStage * 100) / 100,
      apy: Math.round(apy * 100) / 100,
      maturityBalance: Math.round(maturityBalance * 100) / 100,
    });
  }

  const blendedApy = blendedApySum / stagesN;
  const annualLiquidityCash = allocationPerStage;

  // Single Long-Term CD Comparison (100% in 5-year top rate)
  const singleCd5YearValue = totalCapital * Math.pow(1 + topLongRate / 100, stagesN);
  const ladderAdvantage = total5YearLadderValue - singleCd5YearValue;

  return {
    totalCapital: Math.round(totalCapital * 100) / 100,
    blendedApy: Math.round(blendedApy * 1000) / 1000,
    annualLiquidityCash: Math.round(annualLiquidityCash * 100) / 100,
    total5YearLadderValue: Math.round(total5YearLadderValue * 100) / 100,
    singleCd5YearValue: Math.round(singleCd5YearValue * 100) / 100,
    ladderAdvantage: Math.round(ladderAdvantage * 100) / 100,
    stages,
  };
}

// =========================================================================
// 3. CD VS. HIGH-YIELD SAVINGS ACCOUNT (HYSA) COMPARATOR
// =========================================================================
export function calculateCdVsHysa(input: CdVsHysaInput): CdVsHysaResult {
  const { depositAmount, cdRateApy, cdTermMonths, currentHysaRateApy, expectedAnnualHysaRateDrop } = input;
  const t = (cdTermMonths || 0) / 12;

  // Fixed CD Return
  const totalCdReturn = depositAmount * Math.pow(1 + cdRateApy / 100, t);

  // Variable HYSA Return (modeling decaying APY over term)
  let hysaBal = depositAmount;
  const monthlyHysaDrop = (expectedAnnualHysaRateDrop || 0) / 12;

  for (let m = 1; m <= cdTermMonths; m++) {
    const currentApy = Math.max(0.1, currentHysaRateApy - monthlyHysaDrop * (m - 1));
    const monthlyRate = currentApy / 100 / 12;
    hysaBal += hysaBal * monthlyRate;
  }

  const totalHysaReturn = hysaBal;
  const rateLockBenefit = totalCdReturn - totalHysaReturn;
  const cdAdvantagePercentage = depositAmount > 0 ? (rateLockBenefit / depositAmount) * 100 : 0;

  return {
    totalCdReturn: Math.round(totalCdReturn * 100) / 100,
    totalHysaReturn: Math.round(totalHysaReturn * 100) / 100,
    rateLockBenefit: Math.round(rateLockBenefit * 100) / 100,
    cdAdvantagePercentage: Math.round(cdAdvantagePercentage * 100) / 100,
  };
}

// =========================================================================
// 4. EARLY WITHDRAWAL PENALTY & BREAK-EVEN CALCULATOR
// =========================================================================
export function calculateEarlyWithdrawalPenalty(input: EarlyWithdrawalInput): EarlyWithdrawalResult {
  const {
    originalPrincipal,
    cdRateApy,
    cdTermMonths,
    penaltyDays,
    monthsElapsedBeforeExit,
    newReinvestmentRateApy,
  } = input;

  const tElapsed = (monthsElapsedBeforeExit || 0) / 12;

  // Gross Interest Earned so far
  const grossInterestEarned = originalPrincipal * (Math.pow(1 + cdRateApy / 100, tElapsed) - 1);

  // Simple Interest Penalty Calculation: P * (APR / 365) * PenaltyDays
  const dailyRate = (cdRateApy / 100) / 365;
  const penaltyAmount = originalPrincipal * dailyRate * (penaltyDays || 90);

  const netInterestReceived = grossInterestEarned - penaltyAmount;
  const netPayoutAmount = originalPrincipal + netInterestReceived;
  const principalEroded = netInterestReceived < 0;

  // Break-even calculation for cashing out and moving to newReinvestmentRateApy
  // Need extra interest from (NewRate - OldRate) to recover penaltyAmount
  const remainingMonths = Math.max(1, (cdTermMonths || 12) - (monthsElapsedBeforeExit || 0));
  const rateDifference = Math.max(0.01, (newReinvestmentRateApy || 0) - (cdRateApy || 0));
  const monthlyGainPerDollar = (rateDifference / 100) / 12;
  const breakEvenMonthsForNewRate = Math.ceil(penaltyAmount / (originalPrincipal * monthlyGainPerDollar));

  return {
    grossInterestEarned: Math.round(grossInterestEarned * 100) / 100,
    penaltyAmount: Math.round(penaltyAmount * 100) / 100,
    netInterestReceived: Math.round(netInterestReceived * 100) / 100,
    netPayoutAmount: Math.round(netPayoutAmount * 100) / 100,
    principalEroded,
    breakEvenMonthsForNewRate: isFinite(breakEvenMonthsForNewRate) ? breakEvenMonthsForNewRate : 0,
  };
}

// =========================================================================
// 5. TARGET SAVINGS & MATURITY GOAL SOLVER (Reverse CD Calculator)
// =========================================================================
export function calculateCdGoalSolver(input: CdGoalSolverInput): CdGoalSolverResult {
  const { targetBalance, rateApy, years, months, compoundingFrequency } = input;
  const t = (years || 0) + (months || 0) / 12;
  const n = getPeriodsPerYear(compoundingFrequency);

  if (targetBalance <= 0 || t <= 0) {
    return {
      requiredInitialDeposit: 0,
      totalInterestToEarn: 0,
      percentageYieldGrowth: 0,
    };
  }

  // A = P * (1 + APY)^t => P = A / (1 + APY)^t
  const requiredInitialDeposit = targetBalance / Math.pow(1 + rateApy / 100, t);
  const totalInterestToEarn = targetBalance - requiredInitialDeposit;
  const percentageYieldGrowth = (totalInterestToEarn / requiredInitialDeposit) * 100;

  return {
    requiredInitialDeposit: Math.round(requiredInitialDeposit * 100) / 100,
    totalInterestToEarn: Math.round(totalInterestToEarn * 100) / 100,
    percentageYieldGrowth: Math.round(percentageYieldGrowth * 100) / 100,
  };
}

// =========================================================================
// 6. NO-PENALTY & BUMP-UP SPECIALTY CD SIMULATOR
// =========================================================================
export function calculateSpecialtyCd(input: SpecialtyCdInput): SpecialtyCdResult {
  const { deposit, initialApy, termMonths, cdType, bumpUpRateIncrease } = input;
  const t = (termMonths || 0) / 12;

  const standardCdBalance = deposit * Math.pow(1 + initialApy / 100, t);

  let specialtyCdBalance = standardCdBalance;
  let description = "";

  if (cdType === "no_penalty") {
    // No-Penalty CDs usually offer slightly lower APY (e.g. 0.25% lower) but 100% liquidity after 7 days
    const noPenaltyApy = Math.max(0.1, initialApy - 0.25);
    specialtyCdBalance = deposit * Math.pow(1 + noPenaltyApy / 100, t);
    description = "No-Penalty CD gives full liquidity after 7 days without penalty, with slightly lower yield.";
  } else {
    // Bump-Up CD allows 1 rate increase mid-term
    const bumpedApy = initialApy + (bumpUpRateIncrease || 1.0);
    // Assume rate bumped halfway through term
    const halfT = t / 2;
    const midBal = deposit * Math.pow(1 + initialApy / 100, halfT);
    specialtyCdBalance = midBal * Math.pow(1 + bumpedApy / 100, halfT);
    description = `Bump-Up CD rate increases to ${bumpedApy}% mid-term, boosting final yield.`;
  }

  const difference = specialtyCdBalance - standardCdBalance;

  return {
    standardCdBalance: Math.round(standardCdBalance * 100) / 100,
    specialtyCdBalance: Math.round(specialtyCdBalance * 100) / 100,
    difference: Math.round(difference * 100) / 100,
    description,
  };
}
