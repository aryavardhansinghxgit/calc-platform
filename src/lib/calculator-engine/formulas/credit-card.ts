/**
 * Precision Credit Card Payoff & Debt Elimination Suite Calculation Engine
 * 
 * Includes:
 * 1. Single Card Payoff Engine (Fixed Monthly $, Target Timeframe, Minimum Payment Formulas, Min Payment Trap)
 * 2. Multi-Card Debt Avalanche vs. Debt Snowball Optimizer (Roll-down solver)
 * 3. 0% APR Balance Transfer & Consolidation Solver
 * 4. Bi-Weekly Payment & "15-3 Hack" Payoff Booster
 * 5. Credit Utilization Ratio & Credit Score Impact Estimator
 * 6. Cash Advance & Emergency Fee Calculator
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
  targetYears?: number;
  targetMonths?: number;
  minPaymentRule?: "1_plus_interest" | "2_percent" | "2.5_percent" | "3_percent" | "4_percent" | "5_percent";
  minPaymentFloor?: number; // e.g. $25, $35
  annualFee?: number; // e.g. $95
  mode?: "A" | "B" | "C"; // A: Fixed Payment, B: Target Time, C: Minimum Payment Only
  extraMonthlyPayment?: number;
  lumpSumPayment?: number;
}

export interface CreditCardPayoffResult {
  monthsToPayoff: number;
  yearsToPayoff: number;
  daysToPayoff: number;
  monthlyPayment: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  payoffDate: string;
  interestRatio: number;
  schedule: AmortizationMonth[];
  warningMessage?: string;
  isNeverEnding: boolean;
  minPaymentTrapComparison?: {
    minMonths: number;
    minYears: number;
    minTotalInterest: number;
    minTotalPaid: number;
    interestSaved: number;
    monthsSaved: number;
  };
}

export interface MultiCardItem {
  id: string;
  name: string;
  balance: number;
  apr: number;
  minPayment: number;
}

export interface MultiCardPayoffResult {
  avalanche: {
    monthsToDebtFree: number;
    totalInterestPaid: number;
    totalAmountPaid: number;
    debtFreeDate: string;
    monthlyProgression: { month: number; totalBalance: number; totalInterest: number }[];
  };
  snowball: {
    monthsToDebtFree: number;
    totalInterestPaid: number;
    totalAmountPaid: number;
    debtFreeDate: string;
    monthlyProgression: { month: number; totalBalance: number; totalInterest: number }[];
  };
  minimumsOnly: {
    monthsToDebtFree: number;
    totalInterestPaid: number;
    totalAmountPaid: number;
    debtFreeDate: string;
  };
  avalancheInterestSavedVsSnowball: number;
  avalancheMonthsSavedVsSnowball: number;
  avalancheInterestSavedVsMin: number;
  avalancheMonthsSavedVsMin: number;
}

export interface BalanceTransferInput {
  currentBalance: number;
  currentApr: number;
  monthlyPayment: number;
  transferApr: number; // e.g. 0%
  introPeriodMonths: number; // e.g. 12, 15, 18, 21
  transferFeePct: number; // e.g. 3%, 5%
  postIntroApr?: number; // e.g. 22%
}

export interface BalanceTransferResult {
  transferFeeAmount: number;
  newStartingBalance: number;
  currentTotalInterest: number;
  currentPayoffMonths: number;
  transferTotalInterest: number;
  transferPayoffMonths: number;
  netSavings: number;
  breakEvenMonth: number;
  requiredMonthlyToClearInPromo: number;
  balanceRemainingAfterPromo: number;
  recommendation: string;
}

export interface BiWeeklyInput {
  balance: number;
  apr: number;
  monthlyPayment: number;
}

export interface BiWeeklyResult {
  standardMonths: number;
  standardTotalInterest: number;
  biWeeklyPayment: number; // monthly / 2 paid 26 times a year (13 payments/yr)
  biWeeklyMonths: number;
  biWeeklyTotalInterest: number;
  biWeeklyInterestSaved: number;
  biWeeklyMonthsSaved: number;
  hack153Months: number;
  hack153TotalInterest: number;
  hack153InterestSaved: number;
  hack153MonthsSaved: number;
}

export interface CreditUtilizationInput {
  totalCreditLimit: number;
  totalBalance: number;
  monthlyPaydown: number;
}

export interface CreditUtilizationResult {
  currentUtilizationPct: number;
  currentStatus: "Excellent" | "Good" | "Fair" | "High Risk";
  scoreImpact: string;
  monthsToUnder30Pct: number;
  monthsToUnder20Pct: number;
  monthsToUnder10Pct: number;
  monthsToZero: number;
}

export interface CashAdvanceInput {
  amount: number;
  apr: number; // e.g. 27.99%
  feePct: number; // e.g. 5%
  feeFloor: number; // e.g. $10
  atmFee: number; // e.g. $4
  repayDays: number; // e.g. 30
}

export interface CashAdvanceResult {
  upfrontFee: number;
  totalUpfrontCharges: number;
  dailyPeriodicRate: number;
  accruedInterest: number;
  totalRepaymentCost: number;
  effectiveAnnualizedCostPct: number;
}

/**
 * 1. Primary Single Card Payoff Solver
 */
export function calculateCreditCardPayoff(input: CreditCardPayoffInput): CreditCardPayoffResult {
  const balance = Math.max(0, Number(input.balance) || 0);
  const apr = Math.max(0, Number(input.apr) || 0);
  const monthlyRate = apr / 100 / 12;
  const mode = input.mode || "A";
  const extraMonthly = Math.max(0, Number(input.extraMonthlyPayment) || 0);
  const lumpSum = Math.max(0, Number(input.lumpSumPayment) || 0);
  const annualFee = Math.max(0, Number(input.annualFee) || 0);
  const minFloor = Math.max(15, Number(input.minPaymentFloor) || 25);

  let currentBal = Math.max(0, balance - lumpSum);
  let reqMonthlyPayment = 0;
  let targetTotalMonths = ((Number(input.targetYears) || 0) * 12) + (Number(input.targetMonths) || 0);
  if (targetTotalMonths <= 0) targetTotalMonths = 24;

  if (mode === "B") {
    // Mode B: Target Timeframe (N months)
    if (monthlyRate === 0) {
      reqMonthlyPayment = currentBal / targetTotalMonths;
    } else {
      reqMonthlyPayment =
        (currentBal * (monthlyRate * Math.pow(1 + monthlyRate, targetTotalMonths))) /
        (Math.pow(1 + monthlyRate, targetTotalMonths) - 1);
    }
  } else if (mode === "A") {
    // Mode A: Fixed Payment
    reqMonthlyPayment = input.monthlyPayment !== undefined ? Number(input.monthlyPayment) : 200;
  } else if (mode === "C") {
    // Mode C: Minimum Payment formula for first month
    const rule = input.minPaymentRule || "1_plus_interest";
    const firstMonthInterest = currentBal * monthlyRate;

    if (rule === "1_plus_interest") {
      reqMonthlyPayment = Math.max(minFloor, firstMonthInterest + currentBal * 0.01);
    } else if (rule === "2_percent") {
      reqMonthlyPayment = Math.max(minFloor, currentBal * 0.02);
    } else if (rule === "2.5_percent") {
      reqMonthlyPayment = Math.max(minFloor, currentBal * 0.025);
    } else if (rule === "3_percent") {
      reqMonthlyPayment = Math.max(minFloor, currentBal * 0.03);
    } else if (rule === "4_percent") {
      reqMonthlyPayment = Math.max(minFloor, currentBal * 0.04);
    } else if (rule === "5_percent") {
      reqMonthlyPayment = Math.max(minFloor, currentBal * 0.05);
    }
  }

  const totalMonthlyPayment = reqMonthlyPayment + extraMonthly;
  const firstMonthInterest = currentBal * monthlyRate;

  // Infinite debt detection
  if (totalMonthlyPayment <= firstMonthInterest && currentBal > 0 && mode !== "C") {
    return {
      monthsToPayoff: 999,
      yearsToPayoff: 83.3,
      daysToPayoff: 30400,
      monthlyPayment: Number(totalMonthlyPayment.toFixed(2)),
      totalInterestPaid: 999999,
      totalAmountPaid: 999999,
      payoffDate: "Never (Infinite Debt)",
      interestRatio: 100,
      schedule: [],
      warningMessage: "Warning: Your monthly payment is lower than the monthly interest charge. Your debt balance will expand forever!",
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

    // Add annual fee on month 12, 24, 36 etc if applicable
    let feeThisMonth = 0;
    if (annualFee > 0 && monthCount > 1 && monthCount % 12 === 0) {
      feeThisMonth = annualFee;
    }

    let actualPayment = Math.min(startingBal + interestForMonth + feeThisMonth, totalMonthlyPayment);

    if (mode === "C") {
      const rule = input.minPaymentRule || "1_plus_interest";
      let minP = minFloor;
      if (rule === "1_plus_interest") minP = Math.max(minFloor, interestForMonth + startingBal * 0.01);
      else if (rule === "2_percent") minP = Math.max(minFloor, startingBal * 0.02);
      else if (rule === "2.5_percent") minP = Math.max(minFloor, startingBal * 0.025);
      else if (rule === "3_percent") minP = Math.max(minFloor, startingBal * 0.03);
      else if (rule === "4_percent") minP = Math.max(minFloor, startingBal * 0.04);
      else if (rule === "5_percent") minP = Math.max(minFloor, startingBal * 0.05);

      actualPayment = Math.min(startingBal + interestForMonth + feeThisMonth, Math.max(minP + extraMonthly, minFloor));
    }

    const principalForMonth = Math.max(0, actualPayment - interestForMonth - feeThisMonth);
    const endingBal = Math.max(0, startingBal + feeThisMonth - principalForMonth);
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
  const daysToPayoff = Math.round(monthCount * 30.4375);
  const totalAmountPaid = balance + cumInterest;
  const interestRatio = totalAmountPaid > 0 ? (cumInterest / totalAmountPaid) * 100 : 0;

  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + monthCount);
  const payoffDate = futureDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  let warningMsg: string | undefined = undefined;
  if (monthCount > 120) {
    warningMsg = `Caution: It will take ${yearsToPayoff} years to clear your balance. Making small extra payments will eliminate thousands in interest.`;
  }

  // Minimum payment trap comparison solver
  let minPaymentTrapComparison = undefined;
  if (mode !== "C" && currentBal > 0) {
    const minSim = calculateCreditCardPayoff({
      balance: currentBal,
      apr,
      mode: "C",
      minPaymentRule: "1_plus_interest",
      minPaymentFloor: minFloor,
    });

    if (minSim.monthsToPayoff > monthCount) {
      minPaymentTrapComparison = {
        minMonths: minSim.monthsToPayoff,
        minYears: minSim.yearsToPayoff,
        minTotalInterest: minSim.totalInterestPaid,
        minTotalPaid: minSim.totalAmountPaid,
        interestSaved: Number((minSim.totalInterestPaid - cumInterest).toFixed(2)),
        monthsSaved: minSim.monthsToPayoff - monthCount,
      };
    }
  }

  return {
    monthsToPayoff: monthCount,
    yearsToPayoff,
    daysToPayoff,
    monthlyPayment: Number(totalMonthlyPayment.toFixed(2)),
    totalInterestPaid: Number(cumInterest.toFixed(2)),
    totalAmountPaid: Number(totalAmountPaid.toFixed(2)),
    payoffDate,
    interestRatio: Number(interestRatio.toFixed(1)),
    schedule,
    warningMessage: warningMsg,
    isNeverEnding: false,
    minPaymentTrapComparison,
  };
}

/**
 * 2. Multi-Card Debt Avalanche vs. Debt Snowball Solver
 */
export function calculateMultiCardPayoff(
  cards: MultiCardItem[],
  totalMonthlyBudget: number
): MultiCardPayoffResult {
  const cleanCards = cards.filter(c => c.balance > 0);
  const minBudgetRequired = cleanCards.reduce((sum, c) => sum + c.minPayment, 0);
  const actualBudget = Math.max(minBudgetRequired, totalMonthlyBudget);

  const solveMethod = (orderStrategy: "avalanche" | "snowball" | "minimums") => {
    let currentCards = cleanCards.map(c => ({
      ...c,
      currentBal: c.balance,
      monthlyRate: (c.apr / 100) / 12,
    }));

    let month = 0;
    let totalInterest = 0;
    const progression: { month: number; totalBalance: number; totalInterest: number }[] = [];

    while (currentCards.some(c => c.currentBal > 0.01) && month < 600) {
      month++;
      let monthlyInterestPaid = 0;

      // 1. Accrue interest for active cards
      for (const card of currentCards) {
        if (card.currentBal > 0) {
          const interest = card.currentBal * card.monthlyRate;
          card.currentBal += interest;
          monthlyInterestPaid += interest;
          totalInterest += interest;
        }
      }

      // 2. Pay minimums first
      let remainingBudget = actualBudget;
      for (const card of currentCards) {
        if (card.currentBal > 0) {
          const minP = orderStrategy === "minimums"
            ? Math.max(25, card.currentBal * card.monthlyRate + card.currentBal * 0.01)
            : card.minPayment;
          const pmt = Math.min(card.currentBal, minP);
          card.currentBal -= pmt;
          remainingBudget -= pmt;
        }
      }

      // 3. Roll extra budget to prioritized card
      if (orderStrategy !== "minimums" && remainingBudget > 0) {
        let sortedCards = [...currentCards].filter(c => c.currentBal > 0.01);
        if (orderStrategy === "avalanche") {
          sortedCards.sort((a, b) => b.apr - a.apr); // Highest APR first
        } else if (orderStrategy === "snowball") {
          sortedCards.sort((a, b) => a.currentBal - b.currentBal); // Smallest balance first
        }

        for (const card of sortedCards) {
          if (remainingBudget <= 0) break;
          const extraPmt = Math.min(card.currentBal, remainingBudget);
          card.currentBal -= extraPmt;
          remainingBudget -= extraPmt;
        }
      }

      const totalRemaining = currentCards.reduce((sum, c) => sum + Math.max(0, c.currentBal), 0);
      if (month <= 120 || month % 3 === 0 || totalRemaining <= 0.01) {
        progression.push({
          month,
          totalBalance: Number(totalRemaining.toFixed(2)),
          totalInterest: Number(totalInterest.toFixed(2)),
        });
      }
    }

    const totalStartingBalance = cleanCards.reduce((sum, c) => sum + c.balance, 0);
    const futureDate = new Date();
    futureDate.setMonth(futureDate.getMonth() + month);
    const debtFreeDate = futureDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });

    return {
      monthsToDebtFree: month,
      totalInterestPaid: Number(totalInterest.toFixed(2)),
      totalAmountPaid: Number((totalStartingBalance + totalInterest).toFixed(2)),
      debtFreeDate,
      monthlyProgression: progression,
    };
  };

  const avalanche = solveMethod("avalanche");
  const snowball = solveMethod("snowball");
  const minimumsOnly = solveMethod("minimums");

  return {
    avalanche,
    snowball,
    minimumsOnly,
    avalancheInterestSavedVsSnowball: Number(Math.max(0, snowball.totalInterestPaid - avalanche.totalInterestPaid).toFixed(2)),
    avalancheMonthsSavedVsSnowball: Math.max(0, snowball.monthsToDebtFree - avalanche.monthsToDebtFree),
    avalancheInterestSavedVsMin: Number(Math.max(0, minimumsOnly.totalInterestPaid - avalanche.totalInterestPaid).toFixed(2)),
    avalancheMonthsSavedVsMin: Math.max(0, minimumsOnly.monthsToDebtFree - avalanche.monthsToDebtFree),
  };
}

/**
 * 3. 0% APR Balance Transfer Solver
 */
export function calculateBalanceTransfer(input: BalanceTransferInput): BalanceTransferResult {
  const currentBal = Math.max(0, input.currentBalance);
  const currentApr = Math.max(0, input.currentApr);
  const monthlyPmt = Math.max(1, input.monthlyPayment);
  const transferFeePct = Math.max(0, input.transferFeePct);
  const introPeriod = Math.max(1, input.introPeriodMonths);
  const transferApr = Math.max(0, input.transferApr);
  const postIntroApr = input.postIntroApr !== undefined ? Number(input.postIntroApr) : currentApr;

  // 1. Current High-APR Card Payoff
  const currentPayoff = calculateCreditCardPayoff({
    balance: currentBal,
    apr: currentApr,
    monthlyPayment: monthlyPmt,
    mode: "A",
  });

  // 2. Transfer Card Payoff with Transfer Fee
  const transferFeeAmount = currentBal * (transferFeePct / 100);
  const newStartingBalance = currentBal + transferFeeAmount;

  let tempBal = newStartingBalance;
  let transferInterestPaid = 0;
  let transferMonths = 0;

  while (tempBal > 0.01 && transferMonths < 600) {
    transferMonths++;
    const isIntro = transferMonths <= introPeriod;
    const activeApr = isIntro ? transferApr : postIntroApr;
    const monthlyRate = activeApr / 100 / 12;

    const interest = tempBal * monthlyRate;
    const payment = Math.min(tempBal + interest, monthlyPmt);
    const principal = Math.max(0, payment - interest);
    transferInterestPaid += interest;
    tempBal = Math.max(0, tempBal - principal);
  }

  // Required monthly payment to clear entire balance within promo window
  const reqToClearInPromo = newStartingBalance / introPeriod;

  // Remaining balance if paid at current monthly rate after promo window
  let promoRemaining = newStartingBalance;
  for (let m = 1; m <= introPeriod; m++) {
    const pmt = Math.min(promoRemaining, monthlyPmt);
    promoRemaining = Math.max(0, promoRemaining - pmt);
  }

  const totalCostTransfer = transferInterestPaid + transferFeeAmount;
  const netSavings = currentPayoff.totalInterestPaid - totalCostTransfer;
  const monthlyCurrentInterest = currentBal * (currentApr / 100 / 12);
  const breakEvenMonth = monthlyCurrentInterest > 0 ? Math.ceil(transferFeeAmount / monthlyCurrentInterest) : 1;

  let rec = "";
  if (netSavings > 250) {
    rec = `Excellent Strategy: You save $${netSavings.toFixed(2)} in total interest even after paying the $${transferFeeAmount.toFixed(2)} transfer fee!`;
  } else if (netSavings > 0) {
    rec = `Moderate Benefit: You save $${netSavings.toFixed(2)}. Make sure to pay at least $${reqToClearInPromo.toFixed(2)}/mo to clear the debt before the 0% promo expires.`;
  } else {
    rec = `Not Recommended: The $${transferFeeAmount.toFixed(2)} transfer fee exceeds the interest you would save.`;
  }

  return {
    transferFeeAmount: Number(transferFeeAmount.toFixed(2)),
    newStartingBalance: Number(newStartingBalance.toFixed(2)),
    currentTotalInterest: currentPayoff.totalInterestPaid,
    currentPayoffMonths: currentPayoff.monthsToPayoff,
    transferTotalInterest: Number(totalCostTransfer.toFixed(2)),
    transferPayoffMonths: transferMonths,
    netSavings: Number(netSavings.toFixed(2)),
    breakEvenMonth,
    requiredMonthlyToClearInPromo: Number(reqToClearInPromo.toFixed(2)),
    balanceRemainingAfterPromo: Number(promoRemaining.toFixed(2)),
    recommendation: rec,
  };
}

/**
 * 4. Bi-Weekly Payment & "15-3 Hack" Payoff Booster
 */
export function calculateBiWeeklyPayoff(input: BiWeeklyInput): BiWeeklyResult {
  const balance = Math.max(0, input.balance);
  const apr = Math.max(0, input.apr);
  const monthlyPayment = Math.max(1, input.monthlyPayment);

  // Standard Monthly
  const std = calculateCreditCardPayoff({ balance, apr, monthlyPayment, mode: "A" });

  // Bi-weekly payment = monthlyPayment / 2 paid 26 times per year (equivalent to paying 13/12 * monthlyPayment monthly)
  const biWeeklyEquivalentMonthly = (monthlyPayment / 2) * (26 / 12);
  const biWeekly = calculateCreditCardPayoff({ balance, apr, monthlyPayment: biWeeklyEquivalentMonthly, mode: "A" });

  // 15-3 Hack: Making two payments reduces the Average Daily Balance (ADB) by ~12%, plus adds discipline
  const hackMonthlyEquivalent = biWeeklyEquivalentMonthly * 1.04;
  const hack = calculateCreditCardPayoff({ balance, apr, monthlyPayment: hackMonthlyEquivalent, mode: "A" });

  return {
    standardMonths: std.monthsToPayoff,
    standardTotalInterest: std.totalInterestPaid,
    biWeeklyPayment: Number((monthlyPayment / 2).toFixed(2)),
    biWeeklyMonths: biWeekly.monthsToPayoff,
    biWeeklyTotalInterest: biWeekly.totalInterestPaid,
    biWeeklyInterestSaved: Number(Math.max(0, std.totalInterestPaid - biWeekly.totalInterestPaid).toFixed(2)),
    biWeeklyMonthsSaved: Math.max(0, std.monthsToPayoff - biWeekly.monthsToPayoff),
    hack153Months: hack.monthsToPayoff,
    hack153TotalInterest: hack.totalInterestPaid,
    hack153InterestSaved: Number(Math.max(0, std.totalInterestPaid - hack.totalInterestPaid).toFixed(2)),
    hack153MonthsSaved: Math.max(0, std.monthsToPayoff - hack.monthsToPayoff),
  };
}

/**
 * 5. Credit Utilization & Score Impact Estimator
 */
export function calculateCreditUtilization(input: CreditUtilizationInput): CreditUtilizationResult {
  const limit = Math.max(1, input.totalCreditLimit);
  const balance = Math.max(0, input.totalBalance);
  const paydown = Math.max(1, input.monthlyPaydown);

  const currentUtilizationPct = Number(((balance / limit) * 100).toFixed(1));

  let currentStatus: "Excellent" | "Good" | "Fair" | "High Risk" = "High Risk";
  let scoreImpact = "Severe downward drag on FICO/VantageScore (-40 to -80 points)";

  if (currentUtilizationPct < 10) {
    currentStatus = "Excellent";
    scoreImpact = "Optimal score range (Max FICO points awarded for revolving credit)";
  } else if (currentUtilizationPct < 30) {
    currentStatus = "Good";
    scoreImpact = "Healthy utilization. Minor positive to neutral credit score impact.";
  } else if (currentUtilizationPct < 50) {
    currentStatus = "Fair";
    scoreImpact = "Moderate score drag. Lenders flag elevated risk.";
  }

  const target30Bal = limit * 0.3;
  const target20Bal = limit * 0.2;
  const target10Bal = limit * 0.1;

  const monthsToUnder30Pct = balance > target30Bal ? Math.ceil((balance - target30Bal) / paydown) : 0;
  const monthsToUnder20Pct = balance > target20Bal ? Math.ceil((balance - target20Bal) / paydown) : 0;
  const monthsToUnder10Pct = balance > target10Bal ? Math.ceil((balance - target10Bal) / paydown) : 0;
  const monthsToZero = Math.ceil(balance / paydown);

  return {
    currentUtilizationPct,
    currentStatus,
    scoreImpact,
    monthsToUnder30Pct,
    monthsToUnder20Pct,
    monthsToUnder10Pct,
    monthsToZero,
  };
}

/**
 * 6. Cash Advance & Emergency Fee Calculator
 */
export function calculateCashAdvance(input: CashAdvanceInput): CashAdvanceResult {
  const amount = Math.max(0, input.amount);
  const apr = Math.max(0, input.apr);
  const feePct = Math.max(0, input.feePct);
  const feeFloor = Math.max(0, input.feeFloor);
  const atmFee = Math.max(0, input.atmFee);
  const days = Math.max(1, input.repayDays);

  const percentageFee = amount * (feePct / 100);
  const upfrontFee = Math.max(percentageFee, feeFloor);
  const totalUpfrontCharges = upfrontFee + atmFee;

  const dailyPeriodicRate = (apr / 100) / 365;
  // Cash advances accrue interest immediately with ZERO grace period
  const totalPrincipalWithFees = amount;
  const accruedInterest = totalPrincipalWithFees * dailyPeriodicRate * days;
  const totalRepaymentCost = amount + totalUpfrontCharges + accruedInterest;

  // Effective annualized cost accounting for upfront fees over the loan duration
  const totalExtraCost = totalUpfrontCharges + accruedInterest;
  const effectiveAnnualizedCostPct = amount > 0
    ? Number(((totalExtraCost / amount) * (365 / days) * 100).toFixed(1))
    : apr;

  return {
    upfrontFee: Number(upfrontFee.toFixed(2)),
    totalUpfrontCharges: Number(totalUpfrontCharges.toFixed(2)),
    dailyPeriodicRate: Number(dailyPeriodicRate.toFixed(6)),
    accruedInterest: Number(accruedInterest.toFixed(2)),
    totalRepaymentCost: Number(totalRepaymentCost.toFixed(2)),
    effectiveAnnualizedCostPct,
  };
}
