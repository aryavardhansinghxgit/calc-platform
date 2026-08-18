/**
 * Credit Card Payoff, Multi-Card Avalanche/Snowball & Debt Elimination Engine
 */

export interface CreditCardItem {
  id: string;
  name: string;
  balance: number;
  minPayment: number;
  interestRatePct: number;
}

export interface MultiCardScheduleRow {
  month: number;
  totalPayment: number;
  totalInterest: number;
  totalPrincipal: number;
  totalRemainingBalance: number;
  cardBalances: { name: string; balance: number; payment: number; interest: number }[];
}

export interface MultiCardPayoffResult {
  strategy: "avalanche" | "snowball";
  totalMonths: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  totalStartingDebt: number;
  debtFreeDate: string;
  schedule: MultiCardScheduleRow[];
}

/**
 * 1. Multi-Card Debt Avalanche / Snowball Payoff Simulator
 */
export function calculateMultiCardPayoff(
  cards: CreditCardItem[],
  monthlyBudget: number,
  strategy: "avalanche" | "snowball" = "avalanche"
): MultiCardPayoffResult {
  const activeCards = cards
    .filter((c) => c.balance > 0)
    .map((c) => ({
      ...c,
      balance: Math.max(0, c.balance),
      minPayment: Math.max(0, c.minPayment),
      monthlyRate: Math.max(0, c.interestRatePct) / 100 / 12,
    }));

  const totalStartingDebt = activeCards.reduce((acc, c) => acc + c.balance, 0);

  if (activeCards.length === 0 || monthlyBudget <= 0) {
    return {
      strategy,
      totalMonths: 0,
      totalInterestPaid: 0,
      totalAmountPaid: 0,
      totalStartingDebt: 0,
      debtFreeDate: new Date().toLocaleDateString(),
      schedule: [],
    };
  }

  // Sort according to strategy
  // Avalanche: Highest interest rate first
  // Snowball: Lowest balance first
  const workingCards = [...activeCards];
  const schedule: MultiCardScheduleRow[] = [];
  let currentMonth = 0;
  let cumulativeInterest = 0;
  let cumulativePayments = 0;
  const maxMonths = 360; // 30-year safety ceiling

  while (workingCards.some((c) => c.balance > 0.01) && currentMonth < maxMonths) {
    currentMonth++;
    let budgetLeft = monthlyBudget;
    let monthInterest = 0;
    let monthPrincipal = 0;
    const cardMonthDetails: { name: string; balance: number; payment: number; interest: number }[] = [];

    // Step A: Charge interest & Pay minimum payments on all active cards
    for (const card of workingCards) {
      if (card.balance <= 0.01) {
        cardMonthDetails.push({ name: card.name, balance: 0, payment: 0, interest: 0 });
        continue;
      }

      const interestCharge = card.balance * card.monthlyRate;
      card.balance += interestCharge;
      monthInterest += interestCharge;

      // Required minimum payment (or remaining balance if smaller)
      const minDue = Math.min(card.balance, Math.max(card.minPayment, interestCharge + 5));
      const payMin = Math.min(budgetLeft, minDue);
      card.balance -= payMin;
      budgetLeft -= payMin;
      monthPrincipal += Math.max(0, payMin - interestCharge);

      cardMonthDetails.push({
        name: card.name,
        balance: Math.max(0, card.balance),
        payment: payMin,
        interest: interestCharge,
      });
    }

    // Step B: Direct remaining excess budget towards target card based on strategy
    if (budgetLeft > 0.01) {
      const activeSorted = workingCards
        .filter((c) => c.balance > 0.01)
        .sort((a, b) => {
          if (strategy === "avalanche") {
            return b.interestRatePct - a.interestRatePct; // Highest APR first
          } else {
            return a.balance - b.balance; // Lowest balance first
          }
        });

      for (const targetCard of activeSorted) {
        if (budgetLeft <= 0.01) break;
        const extraPay = Math.min(budgetLeft, targetCard.balance);
        targetCard.balance -= extraPay;
        budgetLeft -= extraPay;
        monthPrincipal += extraPay;

        const detail = cardMonthDetails.find((d) => d.name === targetCard.name);
        if (detail) {
          detail.payment += extraPay;
          detail.balance = Math.max(0, targetCard.balance);
        }
      }
    }

    const totalRemaining = workingCards.reduce((acc, c) => acc + Math.max(0, c.balance), 0);
    cumulativeInterest += monthInterest;
    cumulativePayments += (monthlyBudget - budgetLeft);

    schedule.push({
      month: currentMonth,
      totalPayment: monthlyBudget - budgetLeft,
      totalInterest: monthInterest,
      totalPrincipal: monthPrincipal,
      totalRemainingBalance: totalRemaining,
      cardBalances: cardMonthDetails,
    });
  }

  const d = new Date();
  d.setMonth(d.getMonth() + currentMonth);
  const debtFreeDate = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return {
    strategy,
    totalMonths: currentMonth,
    totalInterestPaid: cumulativeInterest,
    totalAmountPaid: cumulativePayments,
    totalStartingDebt,
    debtFreeDate,
    schedule,
  };
}

/**
 * 2. Fixed Monthly Payment Payoff Solver (Single Card)
 */
export function calculateFixedPaymentPayoff(
  balance: number,
  aprPct: number,
  monthlyPayment: number,
  additionalMonthlySpend: number = 0
): {
  monthsToPayoff: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  debtFreeDate: string;
  isNeverPayoff: boolean;
  schedule: { month: number; interest: number; principal: number; balance: number }[];
} {
  const B = Math.max(0, balance);
  const r = (Math.max(0, aprPct) / 100) / 12;
  const P = Math.max(0, monthlyPayment);
  const spend = Math.max(0, additionalMonthlySpend);

  if (B <= 0) {
    return {
      monthsToPayoff: 0,
      totalInterestPaid: 0,
      totalAmountPaid: 0,
      debtFreeDate: new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }),
      isNeverPayoff: false,
      schedule: [],
    };
  }

  // Monthly interest charge on starting balance
  const firstMonthInterest = B * r;
  if (P <= firstMonthInterest + spend) {
    return {
      monthsToPayoff: Infinity,
      totalInterestPaid: Infinity,
      totalAmountPaid: Infinity,
      debtFreeDate: "Never (Payment too low)",
      isNeverPayoff: true,
      schedule: [],
    };
  }

  const schedule: { month: number; interest: number; principal: number; balance: number }[] = [];
  let curBal = B;
  let cumInterest = 0;
  let cumPaid = 0;
  let m = 0;
  const maxM = 360;

  while (curBal > 0.01 && m < maxM) {
    m++;
    const intCharge = curBal * r;
    curBal += intCharge + spend;
    const pmt = Math.min(curBal, P);
    const principalPaid = Math.max(0, pmt - intCharge);
    curBal = Math.max(0, curBal - pmt);
    cumInterest += intCharge;
    cumPaid += pmt;

    schedule.push({
      month: m,
      interest: intCharge,
      principal: principalPaid,
      balance: curBal,
    });
  }

  const d = new Date();
  d.setMonth(d.getMonth() + m);
  const debtFreeDate = d.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  return {
    monthsToPayoff: m,
    totalInterestPaid: cumInterest,
    totalAmountPaid: cumPaid,
    debtFreeDate,
    isNeverPayoff: false,
    schedule,
  };
}

/**
 * 3. Fixed Timeframe Target Payoff Solver (Required Monthly Payment)
 */
export function calculateTargetTimeframePayoff(
  balance: number,
  aprPct: number,
  targetMonths: number
): {
  requiredMonthlyPayment: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
} {
  const B = Math.max(0, balance);
  const r = (Math.max(0, aprPct) / 100) / 12;
  const n = Math.max(1, targetMonths);

  if (B <= 0) {
    return { requiredMonthlyPayment: 0, totalInterestPaid: 0, totalAmountPaid: 0 };
  }

  let pmt = 0;
  if (r === 0) {
    pmt = B / n;
  } else {
    const f = Math.pow(1 + r, n);
    pmt = (B * (r * f)) / (f - 1);
  }

  const totalPaid = pmt * n;
  const totalInterest = Math.max(0, totalPaid - B);

  return {
    requiredMonthlyPayment: pmt,
    totalInterestPaid: totalInterest,
    totalAmountPaid: totalPaid,
  };
}

/**
 * 4. 0% APR Balance Transfer Optimizer
 */
export function calculateBalanceTransfer(
  balance: number,
  currentAprPct: number,
  transferFeePct: number = 3.0,
  promoPeriodMonths: number = 18
): {
  transferFeeAmount: number;
  newTransferredBalance: number;
  monthlyPmtToClearInPromo: number;
  interestPaidOnOldCardInPromo: number;
  netSavingsWithTransfer: number;
} {
  const B = Math.max(0, balance);
  const rOld = (Math.max(0, currentAprPct) / 100) / 12;
  const feePct = (Math.max(0, transferFeePct) / 100);
  const promoN = Math.max(1, promoPeriodMonths);

  const feeAmt = B * feePct;
  const newBal = B + feeAmt;
  const monthlyPmt = newBal / promoN;

  // Approximate interest paid on old card over same period
  const oldCardResult = calculateTargetTimeframePayoff(B, currentAprPct, promoN);
  const netSavings = Math.max(0, oldCardResult.totalInterestPaid - feeAmt);

  return {
    transferFeeAmount: feeAmt,
    newTransferredBalance: newBal,
    monthlyPmtToClearInPromo: monthlyPmt,
    interestPaidOnOldCardInPromo: oldCardResult.totalInterestPaid,
    netSavingsWithTransfer: netSavings,
  };
}

/**
 * 5. Daily Periodic Rate (DPR) & Finance Charge Solver
 */
export function calculateDailyFinanceCharge(
  statementBalance: number,
  aprPct: number,
  daysInBillingCycle: number = 30
): {
  dailyPeriodicRatePct: number;
  dailyFinanceCharge: number;
  monthlyFinanceCharge: number;
} {
  const B = Math.max(0, statementBalance);
  const apr = Math.max(0, aprPct) / 100;
  const dpr = apr / 365;
  const dailyCharge = B * dpr;
  const monthlyCharge = dailyCharge * Math.max(1, daysInBillingCycle);

  return {
    dailyPeriodicRatePct: dpr * 100,
    dailyFinanceCharge: dailyCharge,
    monthlyFinanceCharge: monthlyCharge,
  };
}
