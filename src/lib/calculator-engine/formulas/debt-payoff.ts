/**
 * Precision Multi-Debt Payoff Engine
 * Supports Debt Avalanche (Highest APR First), Debt Snowball (Lowest Balance First),
 * Fixed Total Payment / Snowball Reallocation Rollover Toggle,
 * Extra Monthly / Annual / One-Time Lump Sum Payments, Consolidation Evaluator, and Combined Schedule.
 */

export interface DebtItem {
  id: string;
  name: string;
  balance: number;
  minPayment: number;
  apr: number;
}

export interface DebtPayoffInput {
  debts: DebtItem[];
  strategy?: "avalanche" | "snowball" | "custom";
  reallocateFreedCash?: boolean; // Snowball rollover toggle
  extraMonthlyPayment?: number;
  extraAnnualPayment?: number;
  lumpSumPayment?: number;
  lumpSumMonth?: number;
}

export interface DebtScheduleMonth {
  month: number;
  totalStartingBalance: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalPrincipalPaid: number;
  totalEndingBalance: number;
  debtsRemaining: number;
  debtsEliminated: string[];
}

export interface DebtPayoffResult {
  monthsToPayoff: number;
  yearsToPayoff: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  payoffDate: string;
  strategyUsed: string;
  initialTotalBalance: number;
  initialTotalMinPayment: number;
  schedule: DebtScheduleMonth[];
  warningMessage?: string;
}

export interface ConsolidationResult {
  consolidationApr: number;
  consolidationTermMonths: number;
  newMonthlyPayment: number;
  newTotalInterest: number;
  currentTotalInterest: number;
  interestSaved: number;
  recommendation: string;
}

/**
 * Core Multi-Debt Payoff Engine
 */
export function calculateDebtPayoff(input: DebtPayoffInput): DebtPayoffResult {
  const strategy = input.strategy || "avalanche";
  const reallocate = input.reallocateFreedCash !== false; // Default true
  const extraMonthly = Math.max(0, Number(input.extraMonthlyPayment) || 0);
  const extraAnnual = Math.max(0, Number(input.extraAnnualPayment) || 0);
  const lumpSum = Math.max(0, Number(input.lumpSumPayment) || 0);
  const lumpSumM = Math.max(1, Number(input.lumpSumMonth) || 1);

  // Clone active debts
  let activeDebts = input.debts
    .filter((d) => d.balance > 0)
    .map((d) => ({
      ...d,
      currentBal: Number(d.balance),
      minPmt: Number(d.minPayment),
      rate: Number(d.apr) / 100 / 12,
    }));

  if (activeDebts.length === 0) {
    return {
      monthsToPayoff: 0,
      yearsToPayoff: 0,
      totalInterestPaid: 0,
      totalAmountPaid: 0,
      payoffDate: new Date().toLocaleDateString("en-US", { month: "short", year: "numeric" }),
      strategyUsed: strategy,
      initialTotalBalance: 0,
      initialTotalMinPayment: 0,
      schedule: [],
    };
  }

  const initialTotalBalance = activeDebts.reduce((sum, d) => sum + d.currentBal, 0);
  const initialTotalMinPayment = activeDebts.reduce((sum, d) => sum + d.minPmt, 0);

  // Check if minimum payments cover initial month interest
  const firstMonthInterest = activeDebts.reduce((sum, d) => sum + d.currentBal * d.rate, 0);
  if (initialTotalMinPayment + extraMonthly <= firstMonthInterest) {
    return {
      monthsToPayoff: 999,
      yearsToPayoff: 83.3,
      totalInterestPaid: 999999,
      totalAmountPaid: 999999,
      payoffDate: "Never (Infinite Debt)",
      strategyUsed: strategy,
      initialTotalBalance,
      initialTotalMinPayment,
      schedule: [],
      warningMessage: "Warning: Your total monthly payment is less than monthly interest accrued. Debt will grow indefinitely!",
    };
  }

  const schedule: DebtScheduleMonth[] = [];
  let month = 0;
  let cumInterest = 0;
  let cumPaid = 0;

  // Base monthly budget allocated to debt payoff
  let totalMonthlyBudget = initialTotalMinPayment + extraMonthly;

  while (activeDebts.some((d) => d.currentBal > 0.01) && month < 600) {
    month++;
    const debtsEliminatedThisMonth: string[] = [];

    // Apply one-time lump sum on target month
    if (month === lumpSumM && lumpSum > 0) {
      let remainingLump = lumpSum;

      // Sort according to strategy for lump sum application
      if (strategy === "avalanche") {
        activeDebts.sort((a, b) => b.apr - a.apr);
      } else if (strategy === "snowball") {
        activeDebts.sort((a, b) => a.currentBal - b.currentBal);
      }

      for (const d of activeDebts) {
        if (d.currentBal > 0 && remainingLump > 0) {
          const payoffAmt = Math.min(d.currentBal, remainingLump);
          d.currentBal -= payoffAmt;
          remainingLump -= payoffAmt;
        }
      }
    }

    // Apply annual extra payment every 12th month
    let extraThisMonth = extraMonthly;
    if (month % 12 === 0 && extraAnnual > 0) {
      extraThisMonth += extraAnnual;
    }

    // Calculate monthly interest for each debt
    let monthTotalInterest = 0;
    activeDebts.forEach((d) => {
      if (d.currentBal > 0.01) {
        const interest = d.currentBal * d.rate;
        monthTotalInterest += interest;
        d.currentBal += interest;
      }
    });
    cumInterest += monthTotalInterest;

    const startTotBal = activeDebts.reduce((sum, d) => sum + d.currentBal, 0);

    // Pay minimums on all active debts first
    let cashAvailable = (reallocate ? totalMonthlyBudget : activeDebts.filter((d) => d.currentBal > 0.01).reduce((sum, d) => sum + d.minPmt, 0)) + (extraThisMonth - extraMonthly);

    activeDebts.forEach((d) => {
      if (d.currentBal > 0.01) {
        const minP = Math.min(d.currentBal, d.minPmt);
        d.currentBal -= minP;
        cashAvailable -= minP;

        if (d.currentBal <= 0.01) {
          debtsEliminatedThisMonth.push(d.name);
        }
      }
    });

    // Throw remaining extra cash at priority debt based on strategy
    if (cashAvailable > 0.01) {
      const remainingDebts = activeDebts.filter((d) => d.currentBal > 0.01);
      if (strategy === "avalanche") {
        remainingDebts.sort((a, b) => b.apr - a.apr);
      } else if (strategy === "snowball") {
        remainingDebts.sort((a, b) => a.currentBal - b.currentBal);
      }

      for (const d of remainingDebts) {
        if (cashAvailable <= 0.01) break;
        const extraP = Math.min(d.currentBal, cashAvailable);
        d.currentBal -= extraP;
        cashAvailable -= extraP;

        if (d.currentBal <= 0.01 && !debtsEliminatedThisMonth.includes(d.name)) {
          debtsEliminatedThisMonth.push(d.name);
        }
      }
    }

    const endTotBal = activeDebts.reduce((sum, d) => sum + Math.max(0, d.currentBal), 0);
    const monthTotalPmt = startTotBal - endTotBal;
    cumPaid += monthTotalPmt;

    schedule.push({
      month,
      totalStartingBalance: Number(startTotBal.toFixed(2)),
      totalMonthlyPayment: Number(monthTotalPmt.toFixed(2)),
      totalInterestPaid: Number(monthTotalInterest.toFixed(2)),
      totalPrincipalPaid: Number((monthTotalPmt - monthTotalInterest).toFixed(2)),
      totalEndingBalance: Number(endTotBal.toFixed(2)),
      debtsRemaining: activeDebts.filter((d) => d.currentBal > 0.01).length,
      debtsEliminated: debtsEliminatedThisMonth,
    });
  }

  const yearsToPayoff = Number((month / 12).toFixed(1));
  const futureDate = new Date();
  futureDate.setMonth(futureDate.getMonth() + month);
  const payoffDate = futureDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  return {
    monthsToPayoff: month,
    yearsToPayoff,
    totalInterestPaid: Number(cumInterest.toFixed(2)),
    totalAmountPaid: Number((initialTotalBalance + cumInterest).toFixed(2)),
    payoffDate,
    strategyUsed: strategy === "avalanche" ? "Debt Avalanche (Highest APR First)" : "Debt Snowball (Lowest Balance First)",
    initialTotalBalance: Number(initialTotalBalance.toFixed(2)),
    initialTotalMinPayment: Number(initialTotalMinPayment.toFixed(2)),
    schedule,
  };
}

/**
 * Consolidation Loan Evaluator
 */
export function evaluateConsolidationLoan(
  debts: DebtItem[],
  consolidationApr: number,
  consolidationTermMonths: number = 36
): ConsolidationResult {
  const currentRes = calculateDebtPayoff({ debts, strategy: "avalanche" });
  const totalBal = currentRes.initialTotalBalance;
  const rate = Math.max(0, consolidationApr) / 100 / 12;
  const months = Math.max(1, consolidationTermMonths);

  let newPmt = 0;
  if (rate === 0) {
    newPmt = totalBal / months;
  } else {
    newPmt = (totalBal * (rate * Math.pow(1 + rate, months))) / (Math.pow(1 + rate, months) - 1);
  }

  const newTotalPaid = newPmt * months;
  const newTotalInterest = newTotalPaid - totalBal;
  const interestSaved = currentRes.totalInterestPaid - newTotalInterest;

  let rec = "";
  if (interestSaved > 300) {
    rec = `Highly Recommended! Consolidating saves $${interestSaved.toFixed(2)} in interest and combines your payments into a single $${newPmt.toFixed(2)}/mo payment.`;
  } else if (interestSaved > 0) {
    rec = `Moderate Benefit: You save $${interestSaved.toFixed(2)} in interest.`;
  } else {
    rec = `Not Recommended: Your current payoff strategy is cheaper than this consolidation loan offer.`;
  }

  return {
    consolidationApr,
    consolidationTermMonths: months,
    newMonthlyPayment: Number(newPmt.toFixed(2)),
    newTotalInterest: Number(newTotalInterest.toFixed(2)),
    currentTotalInterest: currentRes.totalInterestPaid,
    interestSaved: Number(interestSaved.toFixed(2)),
    recommendation: rec,
  };
}
