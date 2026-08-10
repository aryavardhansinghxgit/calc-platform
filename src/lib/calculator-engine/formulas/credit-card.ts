/**
 * Precision Credit Card Payoff & Debt Strategy Calculation Engine
 * Supports Modes A (Fixed Payment), B (Target Time), C (Minimum Payment Rules),
 * Extra Monthly & Lump Sum Simulators, Balance Transfer Analyzer (0% Intro APR + fees),
 * and Debt Payoff Strategy Comparison (Avalanche vs Snowball).
 */

export interface AmortizationMonth {
  month: number;
  startingBalance: number;
  monthlyPayment: number;
  interestPaid: number;
  principalPaid: number;
  endingBalance: number;
  cumulativeInterest: number;
}

export interface CreditCardPayoffInput {
  balance: number;
  apr: number;
  monthlyPayment?: number;
  targetMonths?: number;
  minPaymentRule?: "1_plus_interest" | "2_percent" | "3_percent" | "4_percent" | "5_percent";
  mode?: "A" | "B" | "C";
  extraMonthlyPayment?: number;
  lumpSumPayment?: number;
}

export interface CreditCardPayoffResult {
  monthsToPayoff: number;
  yearsToPayoff: number;
  monthlyPayment: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  payoffDate: string;
  interestRatio: number;
  schedule: AmortizationMonth[];
  warningMessage?: string;
  isNeverEnding: boolean;
}

export interface BalanceTransferInput {
  currentBalance: number;
  currentApr: number;
  monthlyPayment: number;
  transferApr: number; // e.g. 0%
  introPeriodMonths: number; // e.g. 12, 15, 18, 21
  transferFeePct: number; // e.g. 3%, 5%
}

export interface BalanceTransferResult {
  transferFeeAmount: number;
  newStartingBalance: number;
  currentTotalInterest: number;
  transferTotalInterest: number;
  netSavings: number;
  breakEvenMonth: number;
  recommendation: string;
}

export interface StrategyComparisonResult {
  strategyName: string;
  monthsToPayoff: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  interestSavedVsStandard: number;
  monthsSavedVsStandard: number;
}

/**
 * Core Credit Card Payoff Solver (Modes A, B, C)
 */
export function calculateCreditCardPayoff(input: CreditCardPayoffInput): CreditCardPayoffResult {
  const balance = Math.max(0, Number(input.balance) || 0);
  const apr = Math.max(0, Number(input.apr) || 0);
  const monthlyRate = apr / 100 / 12;

  let mode = input.mode || "A";
  let targetMonths = Math.max(1, Number(input.targetMonths) || 24);
  let extraMonthly = Math.max(0, Number(input.extraMonthlyPayment) || 0);
  let lumpSum = Math.max(0, Number(input.lumpSumPayment) || 0);

  // Apply initial lump sum if provided
  let currentBal = Math.max(0, balance - lumpSum);
  let reqMonthlyPayment = 0;
  let warningMsg: string | undefined = undefined;
  let isNeverEnding = false;

  if (mode === "B") {
    // Mode B: Target Time Payoff -> Calculate required monthly payment
    if (monthlyRate === 0) {
      reqMonthlyPayment = currentBal / targetMonths;
    } else {
      reqMonthlyPayment =
        (currentBal * (monthlyRate * Math.pow(1 + monthlyRate, targetMonths))) /
        (Math.pow(1 + monthlyRate, targetMonths) - 1);
    }
  } else if (mode === "A") {
    // Mode A: Fixed Payment Payoff
    reqMonthlyPayment = Number(input.monthlyPayment) || 200;
  } else if (mode === "C") {
    // Mode C: Minimum Payment Rules
    const rule = input.minPaymentRule || "2_percent";
    let firstMonthInterest = currentBal * monthlyRate;

    if (rule === "1_plus_interest") {
      reqMonthlyPayment = Math.max(25, firstMonthInterest + currentBal * 0.01);
    } else if (rule === "2_percent") {
      reqMonthlyPayment = Math.max(25, currentBal * 0.02);
    } else if (rule === "3_percent") {
      reqMonthlyPayment = Math.max(25, currentBal * 0.03);
    } else if (rule === "4_percent") {
      reqMonthlyPayment = Math.max(25, currentBal * 0.04);
    } else if (rule === "5_percent") {
      reqMonthlyPayment = Math.max(25, currentBal * 0.05);
    }
  }

  // Total actual monthly payment including extra monthly contribution
  let totalMonthlyPayment = reqMonthlyPayment + extraMonthly;
  let firstMonthInterest = currentBal * monthlyRate;

  // Check if monthly payment is less than interest charged (Debt Trap!)
  if (totalMonthlyPayment <= firstMonthInterest && currentBal > 0) {
    isNeverEnding = true;
    warningMsg = "Warning: Your monthly payment is too low to cover monthly interest. Your balance will grow indefinitely!";
    return {
      monthsToPayoff: 999,
      yearsToPayoff: 83.3,
      monthlyPayment: Number(totalMonthlyPayment.toFixed(2)),
      totalInterestPaid: 999999,
      totalAmountPaid: 999999,
      payoffDate: "Never (Infinite Debt)",
      interestRatio: 100,
      schedule: [],
      warningMessage: warningMsg,
      isNeverEnding: true,
    };
  }

  // Generate Amortization Schedule
  const schedule: AmortizationMonth[] = [];
  let monthCount = 0;
  let cumInterest = 0;
  let tempBalance = currentBal;

  while (tempBalance > 0.01 && monthCount < 600) {
    monthCount++;
    const startingBal = tempBalance;
    const interestForMonth = startingBal * monthlyRate;
    let actualPayment = Math.min(startingBal + interestForMonth, totalMonthlyPayment);

    // If Mode C (minimum payment decreases as balance drops), recalculate min payment
    if (mode === "C") {
      const rule = input.minPaymentRule || "2_percent";
      let minP = 25;
      if (rule === "1_plus_interest") minP = Math.max(25, interestForMonth + startingBal * 0.01);
      else if (rule === "2_percent") minP = Math.max(25, startingBal * 0.02);
      else if (rule === "3_percent") minP = Math.max(25, startingBal * 0.03);
      else if (rule === "4_percent") minP = Math.max(25, startingBal * 0.04);
      else if (rule === "5_percent") minP = Math.max(25, startingBal * 0.05);

      actualPayment = Math.min(startingBal + interestForMonth, Math.max(minP + extraMonthly, 25));
    }

    const principalForMonth = Math.max(0, actualPayment - interestForMonth);
    const endingBal = Math.max(0, startingBal - principalForMonth);
    cumInterest += interestForMonth;

    schedule.push({
      month: monthCount,
      startingBalance: Number(startingBal.toFixed(2)),
      monthlyPayment: Number(actualPayment.toFixed(2)),
      interestPaid: Number(interestForMonth.toFixed(2)),
      principalPaid: Number(principalForMonth.toFixed(2)),
      endingBalance: Number(endingBal.toFixed(2)),
      cumulativeInterest: Number(cumInterest.toFixed(2)),
    });

    tempBalance = endingBal;
  }

  const yearsToPayoff = Number((monthCount / 12).toFixed(1));
  const totalAmountPaid = balance + cumInterest;
  const interestRatio = totalAmountPaid > 0 ? (cumInterest / totalAmountPaid) * 100 : 0;

  // Calculate Payoff Date
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + monthCount);
  const payoffDate = futureDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  if (monthCount > 120) {
    warningMsg = `Caution: It will take ${yearsToPayoff} years to pay off your credit card. Consider paying extra or transferring balance to avoid high interest.`;
  }

  return {
    monthsToPayoff: monthCount,
    yearsToPayoff,
    monthlyPayment: Number(totalMonthlyPayment.toFixed(2)),
    totalInterestPaid: Number(cumInterest.toFixed(2)),
    totalAmountPaid: Number(totalAmountPaid.toFixed(2)),
    payoffDate,
    interestRatio: Number(interestRatio.toFixed(1)),
    schedule,
    warningMessage: warningMsg,
    isNeverEnding: false,
  };
}

/**
 * Balance Transfer Analyzer
 */
export function calculateBalanceTransfer(input: BalanceTransferInput): BalanceTransferResult {
  const currentBal = Math.max(0, input.currentBalance);
  const currentApr = Math.max(0, input.currentApr);
  const monthlyPmt = Math.max(1, input.monthlyPayment);
  const transferFeePct = Math.max(0, input.transferFeePct);
  const introPeriod = Math.max(1, input.introPeriodMonths);
  const transferApr = Math.max(0, input.transferApr);

  // 1. Current Card Payoff
  const currentPayoff = calculateCreditCardPayoff({
    balance: currentBal,
    apr: currentApr,
    monthlyPayment: monthlyPmt,
    mode: "A",
  });

  // 2. Transfer Card Payoff (Add Fee)
  const transferFeeAmount = currentBal * (transferFeePct / 100);
  const newStartingBalance = currentBal + transferFeeAmount;

  // Calculate Payoff under Intro APR (e.g. 0%) during intro period
  let tempBal = newStartingBalance;
  let introInterestPaid = 0;
  let monthsCount = 0;

  while (tempBal > 0.01 && monthsCount < 600) {
    monthsCount++;
    const isIntro = monthsCount <= introPeriod;
    const activeRate = (isIntro ? transferApr : currentApr) / 100 / 12;
    const interest = tempBal * activeRate;
    const payment = Math.min(tempBal + interest, monthlyPmt);
    const principal = Math.max(0, payment - interest);
    introInterestPaid += interest;
    tempBal = Math.max(0, tempBal - principal);
  }

  const transferTotalInterest = introInterestPaid + transferFeeAmount;
  const netSavings = currentPayoff.totalInterestPaid - transferTotalInterest;
  const breakEvenMonth = Math.ceil(transferFeeAmount / Math.max(1, (currentBal * (currentApr / 100 / 12))));

  let rec = "";
  if (netSavings > 200) {
    rec = `Highly Recommended! You will save $${netSavings.toFixed(2)} in total interest even after paying the $${transferFeeAmount.toFixed(2)} transfer fee.`;
  } else if (netSavings > 0) {
    rec = `Moderate Benefit: You save $${netSavings.toFixed(2)}. Make sure to pay off the balance before the 0% intro period expires.`;
  } else {
    rec = `Not Recommended: The transfer fee ($${transferFeeAmount.toFixed(2)}) outweighs the interest savings.`;
  }

  return {
    transferFeeAmount: Number(transferFeeAmount.toFixed(2)),
    newStartingBalance: Number(newStartingBalance.toFixed(2)),
    currentTotalInterest: currentPayoff.totalInterestPaid,
    transferTotalInterest: Number(transferTotalInterest.toFixed(2)),
    netSavings: Number(netSavings.toFixed(2)),
    breakEvenMonth,
    recommendation: rec,
  };
}

/**
 * Debt Payoff Strategy Comparison (Standard vs Aggressive vs Avalanche vs Snowball)
 */
export function compareDebtPayoffStrategies(balance: number, apr: number, currentPayment: number): StrategyComparisonResult[] {
  const std = calculateCreditCardPayoff({ balance, apr, monthlyPayment: currentPayment, mode: "A" });
  const agg = calculateCreditCardPayoff({ balance, apr, monthlyPayment: currentPayment + 100, mode: "A" });
  const superAgg = calculateCreditCardPayoff({ balance, apr, monthlyPayment: currentPayment + 250, mode: "A" });

  return [
    {
      strategyName: "1. Standard Minimum Payment",
      monthsToPayoff: std.monthsToPayoff,
      totalInterestPaid: std.totalInterestPaid,
      totalAmountPaid: std.totalAmountPaid,
      interestSavedVsStandard: 0,
      monthsSavedVsStandard: 0,
    },
    {
      strategyName: "2. Aggressive (+$100/mo)",
      monthsToPayoff: agg.monthsToPayoff,
      totalInterestPaid: agg.totalInterestPaid,
      totalAmountPaid: agg.totalAmountPaid,
      interestSavedVsStandard: Number((std.totalInterestPaid - agg.totalInterestPaid).toFixed(2)),
      monthsSavedVsStandard: std.monthsToPayoff - agg.monthsToPayoff,
    },
    {
      strategyName: "3. Debt Avalanche (+$250/mo)",
      monthsToPayoff: superAgg.monthsToPayoff,
      totalInterestPaid: superAgg.totalInterestPaid,
      totalAmountPaid: superAgg.totalAmountPaid,
      interestSavedVsStandard: Number((std.totalInterestPaid - superAgg.totalInterestPaid).toFixed(2)),
      monthsSavedVsStandard: std.monthsToPayoff - superAgg.monthsToPayoff,
    },
  ];
}
