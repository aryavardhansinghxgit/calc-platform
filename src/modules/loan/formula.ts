import {
  LoanInput,
  LoanOutput,
  LoanAmortizationRow,
  AnnualAmortizationRow,
  LoanCalculatorMode,
  PaymentFrequency,
  CompoundingFrequency,
  LoanOfferComparison,
  RefinanceAnalysisResult,
} from "./types";

export function getPeriodsPerYear(frequency: PaymentFrequency = "monthly"): number {
  switch (frequency) {
    case "weekly":
    case "accelerated-weekly":
      return 52;
    case "biweekly":
    case "accelerated-biweekly":
      return 26;
    case "semi-monthly":
      return 24;
    case "quarterly":
      return 4;
    case "monthly":
    default:
      return 12;
  }
}

export function getCompoundingPeriodsPerYear(compounding: CompoundingFrequency = "monthly"): number {
  switch (compounding) {
    case "daily":
      return 365;
    case "quarterly":
      return 4;
    case "semi-annually":
      return 2;
    case "annually":
      return 1;
    case "monthly":
    default:
      return 12;
  }
}

/**
 * Computes the exact periodic interest rate given nominal APR, compounding frequency, and payment frequency.
 */
export function getPeriodicRate(
  nominalRatePct: number,
  compoundingFreq: CompoundingFrequency = "monthly",
  paymentFreq: PaymentFrequency = "monthly"
): number {
  if (nominalRatePct <= 0) return 0;
  const r = nominalRatePct / 100;
  const m = getCompoundingPeriodsPerYear(compoundingFreq);
  const p = getPeriodsPerYear(paymentFreq);

  if (m === p) {
    return r / p;
  }
  // Convert nominal APR with compounding m to Effective Annual Rate (EAR), then to periodic rate for p
  const ear = Math.pow(1 + r / m, m) - 1;
  return Math.pow(1 + ear, 1 / p) - 1;
}

/**
 * Standard Amortization Payment Formula with optional Balloon
 */
export function calculateBasePayment(
  principal: number,
  periodicRate: number,
  totalPeriods: number,
  balloonAmount: number = 0
): number {
  if (principal <= 0 || totalPeriods <= 0) return 0;
  const P = Math.max(0, principal);
  const B = Math.max(0, balloonAmount);
  const n = totalPeriods;
  const i = periodicRate;

  if (i <= 0) {
    return Math.max(0, (P - B) / n);
  }

  const discountFactor = Math.pow(1 + i, -n);
  const annuityFactor = (1 - discountFactor) / i;
  return (P - B * discountFactor) / annuityFactor;
}

/**
 * Internal Rate of Return / Fee-Adjusted APR Solver using Newton-Raphson / Bisection
 */
export function solveFeeAdjustedApr(
  netProceeds: number,
  payment: number,
  totalPeriods: number,
  balloonAmount: number = 0,
  periodsPerYear: number = 12
): number {
  if (netProceeds <= 0 || payment <= 0 || totalPeriods <= 0) return 0;

  // If net proceeds equals principal with 0 fees, nominal rate is base rate
  const totalNominalPaid = payment * totalPeriods + balloonAmount;
  if (totalNominalPaid <= netProceeds) return 0;

  let low = 0.000001;
  let high = 2.0; // 200% APR

  for (let iter = 0; iter < 50; iter++) {
    const mid = (low + high) / 2;
    const rate = mid / periodsPerYear;
    const discount = Math.pow(1 + rate, -totalPeriods);
    const pvPayments = payment * ((1 - discount) / rate) + balloonAmount * discount;

    if (Math.abs(pvPayments - netProceeds) < 0.0001) {
      return mid * 100;
    }

    if (pvPayments > netProceeds) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return ((low + high) / 2) * 100;
}

export function calculateLoanModule(inputs: LoanInput): LoanOutput {
  const {
    mode = "standard",
    loanAmount = 100000,
    interestRate = 6.0,
    loanTermYears = 10,
    loanTermMonths = 0,
    desiredPayment = 1110.21,
    paymentFrequency = "monthly",
    compoundingFrequency = "monthly",
    originationFeePct = 0,
    upfrontFeesDollar = 0,
    pointsPct = 0,
    balloonAmount = 0,
    extraMonthlyPayment = 0,
    extraAnnualPayment = 0,
    oneTimeLumpSum = 0,
    oneTimeLumpSumMonth = 0,
    startMonth = new Date().getMonth() + 1,
    startYear = new Date().getFullYear(),
    faceValue = 100000,
    currentBalance = 100000,
    currentRate = 6.5,
    currentRemainingMonths = 120,
    refinanceRate = 5.5,
    refinanceTermYears = 10,
    refinanceClosingCosts = 2500,
    cashOutAmount = 0,
  } = inputs;

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fullMonthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  let calcLoanAmount = Math.max(0, loanAmount);
  let calcInterestRate = Math.max(0, interestRate);
  let calcTermYears = Math.max(0, loanTermYears);
  let calcTermMonths = Math.max(0, loanTermMonths);
  let totalMonths = Math.max(1, Math.min(600, Math.round(calcTermYears * 12 + calcTermMonths)));
  let calcBalloon = Math.min(calcLoanAmount, Math.max(0, balloonAmount));

  const periodsPerYear = getPeriodsPerYear(paymentFrequency);
  const totalPeriods = Math.max(1, Math.round(totalMonths * (periodsPerYear / 12)));
  const periodicRate = getPeriodicRate(calcInterestRate, compoundingFrequency, paymentFrequency);

  let basePeriodicPayment = 0;
  let baseMonthlyPayment = 0;
  let maxAffordableLoan: number | undefined;
  let requiredTermMonths: number | undefined;
  let requiredTermYears: number | undefined;
  let solvedInterestRate: number | undefined;

  // --- SOLVER MODES ---
  if (mode === "affordability" || mode === "loan-amount") {
    // Solve Maximum Loan Principal from target payment
    const targetPayment = Math.max(0, desiredPayment);
    if (periodicRate > 0 && totalPeriods > 0) {
      const discount = Math.pow(1 + periodicRate, -totalPeriods);
      const annuity = (1 - discount) / periodicRate;
      calcLoanAmount = targetPayment * annuity + calcBalloon * discount;
    } else if (totalPeriods > 0) {
      calcLoanAmount = targetPayment * totalPeriods + calcBalloon;
    }
    maxAffordableLoan = calcLoanAmount;
    basePeriodicPayment = targetPayment;
    baseMonthlyPayment = targetPayment * (periodsPerYear / 12);
  } else if (mode === "duration" || mode === "loan-term") {
    // Solve required term from loan amount & target payment
    const P = Math.max(0, calcLoanAmount);
    const targetPayment = Math.max(0, desiredPayment);
    if (P > 0 && targetPayment > P * periodicRate && periodicRate > 0) {
      const n = Math.log(targetPayment / (targetPayment - P * periodicRate)) / Math.log(1 + periodicRate);
      const solvedMonths = Math.ceil(n / (periodsPerYear / 12));
      totalMonths = Math.min(600, solvedMonths);
      requiredTermMonths = totalMonths % 12;
      requiredTermYears = Math.floor(totalMonths / 12);
    } else if (P > 0 && periodicRate === 0 && targetPayment > 0) {
      const solvedMonths = Math.ceil(P / targetPayment);
      totalMonths = Math.min(600, solvedMonths);
      requiredTermMonths = totalMonths % 12;
      requiredTermYears = Math.floor(totalMonths / 12);
    } else {
      totalMonths = 360;
      requiredTermMonths = 0;
      requiredTermYears = 30;
    }
    basePeriodicPayment = targetPayment;
    baseMonthlyPayment = targetPayment * (periodsPerYear / 12);
  } else if (mode === "interest-rate") {
    // Binary search for interest rate given loan amount, payment, and term
    const P = Math.max(1, calcLoanAmount);
    const n = totalPeriods;
    const targetPayment = Math.max(0, desiredPayment);
    let low = 0.0;
    let high = 1.0;
    let r = 0.05 / periodsPerYear;
    for (let i = 0; i < 40; i++) {
      r = (low + high) / 2;
      const testPmt = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      if (testPmt > targetPayment) {
        high = r;
      } else {
        low = r;
      }
    }
    calcInterestRate = r * periodsPerYear * 100;
    solvedInterestRate = Number(calcInterestRate.toFixed(2));
    basePeriodicPayment = targetPayment;
    baseMonthlyPayment = targetPayment * (12 / periodsPerYear);
  } else if (mode === "deferred") {
    // Deferred Payment Loan: FV = P * (1 + r/m)^(m * t)
    const m = getCompoundingPeriodsPerYear(compoundingFrequency);
    const t = totalMonths / 12;
    const r = calcInterestRate / 100;
    const maturityAmount = calcLoanAmount * Math.pow(1 + r / m, m * t);
    const totalDeferredInterest = maturityAmount - calcLoanAmount;

    return {
      mode: "deferred",
      paymentFrequency: "monthly",
      compoundingFrequency,
      loanAmount: calcLoanAmount,
      monthlyPayment: 0,
      periodicPayment: 0,
      monthlyEquivalentPayment: 0,
      totalPaymentsCount: 1,
      totalInterest: parseFloat(totalDeferredInterest.toFixed(2)),
      totalPrincipal: calcLoanAmount,
      totalUpfrontFees: 0,
      netProceeds: calcLoanAmount,
      totalCost: parseFloat(maturityAmount.toFixed(2)),
      totalRepayment: parseFloat(maturityAmount.toFixed(2)),
      nominalRate: calcInterestRate,
      effectiveAnnualRate: parseFloat(((Math.pow(1 + r / m, m) - 1) * 100).toFixed(4)),
      effectiveApr: calcInterestRate,
      estimatedApr: calcInterestRate,
      estimatedInterestRate: calcInterestRate,
      payoffDate: `${fullMonthNames[(startMonth - 1 + totalMonths) % 12]} ${startYear + Math.floor((startMonth - 1 + totalMonths) / 12)}`,
      interestPercentage: parseFloat(((totalDeferredInterest / maturityAmount) * 100).toFixed(1)),
      balloonAmount: 0,
      maxLoanAmount: calcLoanAmount,
      maturityAmount: parseFloat(maturityAmount.toFixed(2)),
      totalDeferredInterest: parseFloat(totalDeferredInterest.toFixed(2)),
      baselineTotalInterest: parseFloat(totalDeferredInterest.toFixed(2)),
      baselinePayoffDate: `${fullMonthNames[(startMonth - 1 + totalMonths) % 12]} ${startYear + Math.floor((startMonth - 1 + totalMonths) / 12)}`,
      baselinePaymentsCount: 1,
      interestSaved: 0,
      timeSavedMonths: 0,
      timeSavedYears: 0,
      amortizationSchedule: [
        {
          paymentNumber: 1,
          paymentDate: `${monthNames[(startMonth - 1 + totalMonths) % 12]} ${startYear + Math.floor((startMonth - 1 + totalMonths) / 12)}`,
          beginningBalance: calcLoanAmount,
          paymentAmount: parseFloat(maturityAmount.toFixed(2)),
          principalPaid: calcLoanAmount,
          interestPaid: parseFloat(totalDeferredInterest.toFixed(2)),
          extraPaid: 0,
          endingBalance: 0,
          cumulativeInterest: parseFloat(totalDeferredInterest.toFixed(2)),
          cumulativePrincipal: calcLoanAmount,
        },
      ],
      annualSchedule: [],
    };
  } else if (mode === "bond") {
    // Bond / Lump Sum Maturity: PV = FV / (1 + r/m)^(m * t)
    const m = getCompoundingPeriodsPerYear(compoundingFrequency);
    const t = totalMonths / 12;
    const r = calcInterestRate / 100;
    const targetFaceValue = Math.max(0, faceValue || loanAmount);
    const initialAmountReceived = targetFaceValue / Math.pow(1 + r / m, m * t);
    const totalDiscountInterest = targetFaceValue - initialAmountReceived;

    return {
      mode: "bond",
      paymentFrequency: "monthly",
      compoundingFrequency,
      loanAmount: parseFloat(initialAmountReceived.toFixed(2)),
      monthlyPayment: 0,
      periodicPayment: 0,
      monthlyEquivalentPayment: 0,
      totalPaymentsCount: 1,
      totalInterest: parseFloat(totalDiscountInterest.toFixed(2)),
      totalPrincipal: parseFloat(initialAmountReceived.toFixed(2)),
      totalUpfrontFees: 0,
      netProceeds: parseFloat(initialAmountReceived.toFixed(2)),
      totalCost: parseFloat(targetFaceValue.toFixed(2)),
      totalRepayment: parseFloat(targetFaceValue.toFixed(2)),
      nominalRate: calcInterestRate,
      effectiveAnnualRate: parseFloat(((Math.pow(1 + r / m, m) - 1) * 100).toFixed(4)),
      effectiveApr: calcInterestRate,
      estimatedApr: calcInterestRate,
      estimatedInterestRate: calcInterestRate,
      payoffDate: `${fullMonthNames[(startMonth - 1 + totalMonths) % 12]} ${startYear + Math.floor((startMonth - 1 + totalMonths) / 12)}`,
      interestPercentage: parseFloat(((totalDiscountInterest / targetFaceValue) * 100).toFixed(1)),
      balloonAmount: 0,
      maxLoanAmount: parseFloat(initialAmountReceived.toFixed(2)),
      maturityAmount: targetFaceValue,
      initialAmountReceived: parseFloat(initialAmountReceived.toFixed(2)),
      totalDeferredInterest: parseFloat(totalDiscountInterest.toFixed(2)),
      baselineTotalInterest: parseFloat(totalDiscountInterest.toFixed(2)),
      baselinePayoffDate: `${fullMonthNames[(startMonth - 1 + totalMonths) % 12]} ${startYear + Math.floor((startMonth - 1 + totalMonths) / 12)}`,
      baselinePaymentsCount: 1,
      interestSaved: 0,
      timeSavedMonths: 0,
      timeSavedYears: 0,
      amortizationSchedule: [
        {
          paymentNumber: 1,
          paymentDate: `${monthNames[(startMonth - 1 + totalMonths) % 12]} ${startYear + Math.floor((startMonth - 1 + totalMonths) / 12)}`,
          beginningBalance: parseFloat(initialAmountReceived.toFixed(2)),
          paymentAmount: targetFaceValue,
          principalPaid: parseFloat(initialAmountReceived.toFixed(2)),
          interestPaid: parseFloat(totalDiscountInterest.toFixed(2)),
          extraPaid: 0,
          endingBalance: 0,
          cumulativeInterest: parseFloat(totalDiscountInterest.toFixed(2)),
          cumulativePrincipal: parseFloat(initialAmountReceived.toFixed(2)),
        },
      ],
      annualSchedule: [],
    };
  } else {
    // Standard Amortized Mode
    if (paymentFrequency === "accelerated-biweekly") {
      // Standard monthly payment divided by 2
      const monthlyRate = getPeriodicRate(calcInterestRate, compoundingFrequency, "monthly");
      const monthlyPayment = calculateBasePayment(calcLoanAmount, monthlyRate, totalMonths, calcBalloon);
      basePeriodicPayment = monthlyPayment / 2;
      baseMonthlyPayment = monthlyPayment;
    } else if (paymentFrequency === "accelerated-weekly") {
      const monthlyRate = getPeriodicRate(calcInterestRate, compoundingFrequency, "monthly");
      const monthlyPayment = calculateBasePayment(calcLoanAmount, monthlyRate, totalMonths, calcBalloon);
      basePeriodicPayment = monthlyPayment / 4;
      baseMonthlyPayment = monthlyPayment;
    } else {
      basePeriodicPayment = calculateBasePayment(calcLoanAmount, periodicRate, totalPeriods, calcBalloon);
      baseMonthlyPayment = basePeriodicPayment * (periodsPerYear / 12);
    }
  }

  // --- UPFRONT FEES & NET PROCEEDS ---
  const totalUpfrontFees =
    Math.max(0, upfrontFeesDollar) +
    calcLoanAmount * ((Math.max(0, originationFeePct) + Math.max(0, pointsPct)) / 100);
  const netProceeds = Math.max(0, calcLoanAmount - totalUpfrontFees);

  // --- BASELINE SIMULATION (No Prepayments) ---
  let baselineBal = calcLoanAmount;
  let baselineTotalInterest = 0;
  let baselinePeriods = 0;
  if (calcLoanAmount > 0) {
    while (baselineBal > (calcBalloon + 0.001) && baselinePeriods < totalPeriods * 3) {
      baselinePeriods++;
      const interest = baselineBal * periodicRate;
      let principal = basePeriodicPayment - interest;
      if (baselineBal - principal < calcBalloon) {
        principal = baselineBal - calcBalloon;
      }
      if (principal < 0) principal = 0;
      baselineTotalInterest += interest;
      baselineBal -= principal;
      if (baselineBal <= calcBalloon + 0.001) break;
    }
  }
  const baseOffset = startMonth - 1 + Math.floor((baselinePeriods * 12) / periodsPerYear);
  const baselinePayoffDate = `${fullMonthNames[baseOffset % 12]} ${startYear + Math.floor(baseOffset / 12)}`;

  // --- ACTIVE AMORTIZATION SCHEDULE SIMULATION ---
  const amortizationSchedule: LoanAmortizationRow[] = [];
  let balance = calcLoanAmount;
  let cumInterest = 0;
  let cumPrincipal = 0;
  let period = 0;

  const extraMonthlyNormalized = Math.max(0, extraMonthlyPayment) * (12 / periodsPerYear);
  const extraAnnualNormalized = Math.max(0, extraAnnualPayment);

  while (balance > (calcBalloon + 0.001) && period < totalPeriods * 3) {
    period++;
    const beginningBalance = balance;
    const interestPaid = balance * periodicRate;

    let basePrincipal = basePeriodicPayment - interestPaid;
    if (basePrincipal < 0) basePrincipal = 0;

    let extraPaid = extraMonthlyNormalized;

    // Add annual extra payment at the end of each year
    if (period % periodsPerYear === 0 && extraAnnualNormalized > 0) {
      extraPaid += extraAnnualNormalized;
    }

    // Add one-time lump-sum payment at specified month
    if (oneTimeLumpSum > 0 && oneTimeLumpSumMonth > 0) {
      const targetPeriod = Math.round(oneTimeLumpSumMonth * (periodsPerYear / 12));
      if (period === targetPeriod) {
        extraPaid += oneTimeLumpSum;
      }
    }

    let totalPrincipalPaid = basePrincipal + extraPaid;

    // Terminal adjustment: prevent paying past the balloon amount
    if (balance - totalPrincipalPaid < calcBalloon) {
      totalPrincipalPaid = balance - calcBalloon;
      extraPaid = Math.max(0, totalPrincipalPaid - basePrincipal);
      basePrincipal = totalPrincipalPaid - extraPaid;
    }

    balance -= totalPrincipalPaid;
    cumInterest += interestPaid;
    cumPrincipal += totalPrincipalPaid;

    const monthOffset = startMonth - 1 + Math.floor((period * 12) / periodsPerYear);
    const mNum = (monthOffset % 12) + 1;
    const yNum = startYear + Math.floor(monthOffset / 12);
    const dateStr = `${monthNames[mNum - 1]} ${yNum}`;

    amortizationSchedule.push({
      paymentNumber: period,
      paymentDate: dateStr,
      beginningBalance: parseFloat(beginningBalance.toFixed(2)),
      paymentAmount: parseFloat((totalPrincipalPaid + interestPaid).toFixed(2)),
      principalPaid: parseFloat(totalPrincipalPaid.toFixed(2)),
      interestPaid: parseFloat(interestPaid.toFixed(2)),
      extraPaid: parseFloat(extraPaid.toFixed(2)),
      endingBalance: parseFloat(Math.max(calcBalloon, balance).toFixed(2)),
      cumulativeInterest: parseFloat(cumInterest.toFixed(2)),
      cumulativePrincipal: parseFloat(cumPrincipal.toFixed(2)),
    });

    if (balance <= calcBalloon + 0.001) break;
  }

  // --- ANNUAL ROLLUP SCHEDULE ---
  const annualSchedule: AnnualAmortizationRow[] = [];
  let currentYearNum = startYear;
  let yearBeginningBalance = calcLoanAmount;
  let yearPayment = 0;
  let yearPrincipal = 0;
  let yearInterest = 0;
  let yearExtra = 0;

  for (let i = 0; i < amortizationSchedule.length; i++) {
    const row = amortizationSchedule[i];
    yearPayment += row.paymentAmount;
    yearPrincipal += row.principalPaid;
    yearInterest += row.interestPaid;
    yearExtra += row.extraPaid;

    const isYearEnd = (i + 1) % periodsPerYear === 0 || i === amortizationSchedule.length - 1;
    if (isYearEnd) {
      annualSchedule.push({
        year: currentYearNum,
        beginningBalance: parseFloat(yearBeginningBalance.toFixed(2)),
        totalPayment: parseFloat(yearPayment.toFixed(2)),
        principalPaid: parseFloat(yearPrincipal.toFixed(2)),
        interestPaid: parseFloat(yearInterest.toFixed(2)),
        extraPaid: parseFloat(yearExtra.toFixed(2)),
        endingBalance: parseFloat(row.endingBalance.toFixed(2)),
        cumulativeInterest: parseFloat(row.cumulativeInterest.toFixed(2)),
        cumulativePrincipal: parseFloat(row.cumulativePrincipal.toFixed(2)),
      });
      currentYearNum++;
      yearBeginningBalance = row.endingBalance;
      yearPayment = 0;
      yearPrincipal = 0;
      yearInterest = 0;
      yearExtra = 0;
    }
  }

  const activePeriods = period;
  const activeOffset = startMonth - 1 + Math.floor((activePeriods * 12) / periodsPerYear);
  const payoffDate = `${fullMonthNames[activeOffset % 12]} ${startYear + Math.floor(activeOffset / 12)}`;

  const totalInterest = cumInterest;
  const totalPrincipal = calcLoanAmount - calcBalloon;
  const totalCost = calcLoanAmount + totalInterest + totalUpfrontFees;
  const interestPercentage = totalCost > 0 ? Number(((totalInterest / totalCost) * 100).toFixed(1)) : 0;

  const interestSaved = Math.max(0, baselineTotalInterest - totalInterest);
  const timeSavedPeriods = Math.max(0, baselinePeriods - activePeriods);
  const timeSavedMonths = Math.round((timeSavedPeriods * 12) / periodsPerYear);
  const timeSavedYears = Number((timeSavedMonths / 12).toFixed(1));

  // --- APR SOLVER ---
  const effectiveApr = solveFeeAdjustedApr(
    netProceeds,
    basePeriodicPayment,
    activePeriods,
    calcBalloon,
    periodsPerYear
  );

  const mComp = getCompoundingPeriodsPerYear(compoundingFrequency);
  const effectiveAnnualRate = (Math.pow(1 + calcInterestRate / 100 / mComp, mComp) - 1) * 100;

  // --- REFINANCE ANALYSIS MODULE ---
  let refinanceAnalysis: RefinanceAnalysisResult | undefined;
  if (mode === "refinance") {
    const curP = Math.max(0, currentBalance);
    const curMonths = Math.max(1, currentRemainingMonths);
    const curMonthlyRate = currentRate / 100 / 12;
    const curMonthlyPayment = calculateBasePayment(curP, curMonthlyRate, curMonths);
    const curRemainingTotal = curMonthlyPayment * curMonths;
    const curRemainingInterest = curRemainingTotal - curP;

    const newLoanPrincipal = curP + Math.max(0, cashOutAmount);
    const newMonths = Math.max(1, Math.round(refinanceTermYears * 12));
    const newMonthlyRate = refinanceRate / 100 / 12;
    const newMonthlyPayment = calculateBasePayment(newLoanPrincipal, newMonthlyRate, newMonths);
    const newTotalLoanCost = newMonthlyPayment * newMonths + refinanceClosingCosts;
    const newTotalInterest = newMonthlyPayment * newMonths - newLoanPrincipal;

    const monthlySavings = curMonthlyPayment - newMonthlyPayment;
    const lifetimeInterestSavings = curRemainingInterest - newTotalInterest;
    const netLifetimeSavings = lifetimeInterestSavings - refinanceClosingCosts;
    const breakEvenMonths = monthlySavings > 0 ? Math.ceil(refinanceClosingCosts / monthlySavings) : 0;

    refinanceAnalysis = {
      currentMonthlyPayment: parseFloat(curMonthlyPayment.toFixed(2)),
      currentRemainingInterest: parseFloat(curRemainingInterest.toFixed(2)),
      currentRemainingTotal: parseFloat(curRemainingTotal.toFixed(2)),
      newMonthlyPayment: parseFloat(newMonthlyPayment.toFixed(2)),
      newTotalInterest: parseFloat(newTotalInterest.toFixed(2)),
      newTotalLoanCost: parseFloat(newTotalLoanCost.toFixed(2)),
      monthlySavings: parseFloat(monthlySavings.toFixed(2)),
      lifetimeInterestSavings: parseFloat(lifetimeInterestSavings.toFixed(2)),
      netLifetimeSavings: parseFloat(netLifetimeSavings.toFixed(2)),
      breakEvenMonths,
      isBeneficial: netLifetimeSavings > 0,
    };
  }

  // --- COMPARISON MODULE ---
  const comparisonOffers: LoanOfferComparison[] = [
    {
      id: "A",
      name: "Offer A (Standard)",
      loanAmount: calcLoanAmount,
      interestRate: calcInterestRate,
      loanTermYears: calcTermYears,
      fees: totalUpfrontFees,
      paymentFrequency,
      periodicPayment: parseFloat(basePeriodicPayment.toFixed(2)),
      monthlyEquivalentPayment: parseFloat(baseMonthlyPayment.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
      totalCost: parseFloat(totalCost.toFixed(2)),
      effectiveApr: parseFloat(effectiveApr.toFixed(2)),
      payoffMonths: activePeriods * (12 / periodsPerYear),
      payoffDate,
    },
    {
      id: "B",
      name: "Offer B (Lower Rate / Higher Fee)",
      loanAmount: calcLoanAmount,
      interestRate: Math.max(0.1, calcInterestRate - 0.75),
      loanTermYears: calcTermYears,
      fees: totalUpfrontFees + 1500,
      paymentFrequency,
      periodicPayment: parseFloat(
        calculateBasePayment(calcLoanAmount, getPeriodicRate(calcInterestRate - 0.75, compoundingFrequency, paymentFrequency), totalPeriods).toFixed(2)
      ),
      monthlyEquivalentPayment: parseFloat(
        (calculateBasePayment(calcLoanAmount, getPeriodicRate(calcInterestRate - 0.75, compoundingFrequency, paymentFrequency), totalPeriods) * (periodsPerYear / 12)).toFixed(2)
      ),
      totalInterest: parseFloat(
        (calculateBasePayment(calcLoanAmount, getPeriodicRate(calcInterestRate - 0.75, compoundingFrequency, paymentFrequency), totalPeriods) * totalPeriods - calcLoanAmount).toFixed(2)
      ),
      totalCost: parseFloat(
        (calculateBasePayment(calcLoanAmount, getPeriodicRate(calcInterestRate - 0.75, compoundingFrequency, paymentFrequency), totalPeriods) * totalPeriods + totalUpfrontFees + 1500).toFixed(2)
      ),
      effectiveApr: parseFloat((calcInterestRate - 0.5).toFixed(2)),
      payoffMonths: totalMonths,
      payoffDate,
    },
    {
      id: "C",
      name: "Offer C (Shorter Term)",
      loanAmount: calcLoanAmount,
      interestRate: Math.max(0.1, calcInterestRate - 0.25),
      loanTermYears: Math.max(1, calcTermYears - 3),
      fees: totalUpfrontFees,
      paymentFrequency,
      periodicPayment: parseFloat(
        calculateBasePayment(
          calcLoanAmount,
          getPeriodicRate(calcInterestRate - 0.25, compoundingFrequency, paymentFrequency),
          Math.max(1, Math.round((calcTermYears - 3) * periodsPerYear))
        ).toFixed(2)
      ),
      monthlyEquivalentPayment: parseFloat(
        (calculateBasePayment(
          calcLoanAmount,
          getPeriodicRate(calcInterestRate - 0.25, compoundingFrequency, paymentFrequency),
          Math.max(1, Math.round((calcTermYears - 3) * periodsPerYear))
        ) * (periodsPerYear / 12)).toFixed(2)
      ),
      totalInterest: parseFloat(
        (calculateBasePayment(
          calcLoanAmount,
          getPeriodicRate(calcInterestRate - 0.25, compoundingFrequency, paymentFrequency),
          Math.max(1, Math.round((calcTermYears - 3) * periodsPerYear))
        ) * Math.max(1, Math.round((calcTermYears - 3) * periodsPerYear)) - calcLoanAmount).toFixed(2)
      ),
      totalCost: parseFloat(
        (calculateBasePayment(
          calcLoanAmount,
          getPeriodicRate(calcInterestRate - 0.25, compoundingFrequency, paymentFrequency),
          Math.max(1, Math.round((calcTermYears - 3) * periodsPerYear))
        ) * Math.max(1, Math.round((calcTermYears - 3) * periodsPerYear)) + totalUpfrontFees).toFixed(2)
      ),
      effectiveApr: parseFloat((calcInterestRate - 0.25).toFixed(2)),
      payoffMonths: Math.max(12, (calcTermYears - 3) * 12),
      payoffDate: `${fullMonthNames[(startMonth - 1 + Math.max(12, (calcTermYears - 3) * 12)) % 12]} ${startYear + Math.floor((startMonth - 1 + Math.max(12, (calcTermYears - 3) * 12)) / 12)}`,
    },
  ];

  return {
    mode,
    paymentFrequency,
    compoundingFrequency,
    loanAmount: calcLoanAmount,
    monthlyPayment: parseFloat(baseMonthlyPayment.toFixed(2)),
    periodicPayment: parseFloat(basePeriodicPayment.toFixed(2)),
    monthlyEquivalentPayment: parseFloat(baseMonthlyPayment.toFixed(2)),
    totalPaymentsCount: activePeriods,
    totalInterest: parseFloat(totalInterest.toFixed(2)),
    totalPrincipal: parseFloat(totalPrincipal.toFixed(2)),
    totalUpfrontFees: parseFloat(totalUpfrontFees.toFixed(2)),
    netProceeds: parseFloat(netProceeds.toFixed(2)),
    totalCost: parseFloat(totalCost.toFixed(2)),
    totalRepayment: parseFloat(totalCost.toFixed(2)),
    nominalRate: calcInterestRate,
    effectiveAnnualRate: parseFloat(effectiveAnnualRate.toFixed(4)),
    effectiveApr: parseFloat(effectiveApr.toFixed(2)),
    estimatedApr: parseFloat(effectiveApr.toFixed(2)),
    estimatedInterestRate: parseFloat(calcInterestRate.toFixed(2)),
    payoffDate,
    interestPercentage,
    balloonAmount: calcBalloon,

    baselineTotalInterest: parseFloat(baselineTotalInterest.toFixed(2)),
    baselinePayoffDate,
    baselinePaymentsCount: baselinePeriods,
    interestSaved: parseFloat(interestSaved.toFixed(2)),
    timeSavedMonths,
    timeSavedYears,

    maxLoanAmount: maxAffordableLoan ? parseFloat(maxAffordableLoan.toFixed(2)) : calcLoanAmount,
    maxAffordableLoan: maxAffordableLoan ? parseFloat(maxAffordableLoan.toFixed(2)) : undefined,
    requiredTermMonths,
    requiredTermYears,
    solvedInterestRate,

    refinanceAnalysis,
    comparisonOffers,

    amortizationSchedule,
    annualSchedule,
  };
}
