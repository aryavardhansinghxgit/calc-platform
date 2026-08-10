/**
 * Precision Debt Consolidation & Refinance Math Engine
 * Calculates Current Multi-Debt Schedule vs Consolidation Loan Schedule,
 * Upfront Origination Fee / Points Impact, Real APR (Effective APR),
 * Fee Sensitivity Threshold %, 0% Balance Transfer Comparison, and Side-by-Side Amortization Schedules.
 */

export interface ExistingDebtItem {
  id: string;
  name: string;
  balance: number;
  minPayment: number;
  apr: number;
}

export interface DebtConsolidationInput {
  debts: ExistingDebtItem[];
  loanAmount?: number; // Defaults to sum of balances if 0
  consolidationApr: number;
  termMonths: number;
  feeType?: "percent" | "fixed";
  feeValue?: number;
}

export interface DebtConsolidationResult {
  // Current Multi-Debt Metrics
  currentTotalBalance: number;
  currentWeightedApr: number;
  currentTotalMonthlyPayment: number;
  currentMonthsToPayoff: number;
  currentTotalInterest: number;
  currentTotalCost: number;

  // Proposed Consolidation Loan Metrics
  loanAmount: number;
  upfrontFeeAmount: number;
  fundedTotalLoan: number;
  consolidationApr: number;
  realApr: number; // Effective APR accounting for upfront fees
  termMonths: number;
  consolidationMonthlyPayment: number;
  consolidationTotalInterest: number;
  consolidationTotalCost: number;

  // Net Savings & Comparisons
  monthlySavings: number;
  interestSaved: number;
  netTotalSavings: number; // Accounting for fees & total cost
  maxFeeThresholdPercent: number; // Fee % where savings drop to $0

  // 0% Balance Transfer Card Comparison
  btTransferFeePercent: number;
  btFeeAmount: number;
  btIntroMonths: number;
  btRequiredMonthlyPayment: number;
  btTotalCost: number;
  btNetSavings: number;

  // Recommendation
  recommendation: string;
  warningNote?: string;

  // Amortization Schedules
  currentSchedule: { month: number; balance: number; interest: number; payment: number }[];
  consolidationSchedule: { month: number; balance: number; interest: number; payment: number }[];
}

/**
 * Solve Real APR (Effective APR) using Newton-Raphson method
 */

function solveRealApr(loanAmount: number, feeAmount: number, monthlyPayment: number, termMonths: number): number {
  const netProceeds = loanAmount - feeAmount;
  if (netProceeds <= 0 || monthlyPayment <= 0 || termMonths <= 0) return 0;

  // Solve for monthly rate r where PV = NetProceeds
  // f(r) = Pmt * (1 - (1+r)^-n) / r - NetProceeds = 0
  let r = 0.01; // Initial guess 1% monthly
  for (let i = 0; i < 30; i++) {
    const pv = (monthlyPayment * (1 - Math.pow(1 + r, -termMonths))) / r;
    const f = pv - netProceeds;
    const df = (monthlyPayment * (termMonths * Math.pow(1 + r, -termMonths - 1) * r - (1 - Math.pow(1 + r, -termMonths)))) / (r * r);
    const rNext = r - f / df;
    if (Math.abs(rNext - r) < 0.00001) {
      r = rNext;
      break;
    }
    r = Math.max(0.0001, rNext);
  }

  return Number((r * 12 * 100).toFixed(2));
}

/**
 * Core Debt Consolidation Engine
 */
export function calculateDebtConsolidation(input: DebtConsolidationInput): DebtConsolidationResult {
  const activeDebts = input.debts.filter((d) => d.balance > 0);

  const currentTotalBalance = activeDebts.reduce((sum, d) => sum + Number(d.balance), 0);
  const currentTotalMonthlyPayment = activeDebts.reduce((sum, d) => sum + Number(d.minPayment), 0);

  // Weighted Average APR of current debts
  const currentWeightedApr =
    currentTotalBalance > 0
      ? activeDebts.reduce((sum, d) => sum + (Number(d.balance) / currentTotalBalance) * Number(d.apr), 0)
      : 0;

  // 1. Compute Current Multi-Debt Schedule (using Avalanche order)
  let currBal = currentTotalBalance;
  let currInterest = 0;
  let currMonth = 0;
  const currentSchedule: { month: number; balance: number; interest: number; payment: number }[] = [];

  const tempDebts = activeDebts.map((d) => ({
    bal: Number(d.balance),
    minP: Number(d.minPayment),
    rate: Number(d.apr) / 100 / 12,
  }));

  const firstMonthInt = tempDebts.reduce((sum, d) => sum + d.bal * d.rate, 0);
  let isCurrentInfinite = false;

  if (currentTotalMonthlyPayment <= firstMonthInt) {
    isCurrentInfinite = true;
  } else {
    while (tempDebts.some((d) => d.bal > 0.01) && currMonth < 600) {
      currMonth++;
      let mInt = 0;
      tempDebts.forEach((d) => {
        if (d.bal > 0) {
          const interest = d.bal * d.rate;
          mInt += interest;
          d.bal += interest;
        }
      });
      currInterest += mInt;

      let cash = currentTotalMonthlyPayment;
      tempDebts.forEach((d) => {
        if (d.bal > 0) {
          const p = Math.min(d.bal, d.minP);
          d.bal -= p;
          cash -= p;
        }
      });

      if (cash > 0) {
        tempDebts.sort((a, b) => b.rate - a.rate);
        for (const d of tempDebts) {
          if (cash <= 0) break;
          const p = Math.min(d.bal, cash);
          d.bal -= p;
          cash -= p;
        }
      }

      const totRem = tempDebts.reduce((sum, d) => sum + Math.max(0, d.bal), 0);
      currentSchedule.push({
        month: currMonth,
        balance: Number(totRem.toFixed(2)),
        interest: Number(mInt.toFixed(2)),
        payment: Number(currentTotalMonthlyPayment.toFixed(2)),
      });
    }
  }

  const currentMonthsToPayoff = isCurrentInfinite ? 999 : currMonth;
  const currentTotalInterest = isCurrentInfinite ? 999999 : Number(currInterest.toFixed(2));
  const currentTotalCost = isCurrentInfinite ? 999999 : Number((currentTotalBalance + currentTotalInterest).toFixed(2));

  // 2. Compute Proposed Consolidation Loan Metrics
  const loanAmount = input.loanAmount && input.loanAmount > 0 ? Number(input.loanAmount) : currentTotalBalance;
  const consolidationApr = Math.max(0, Number(input.consolidationApr));
  const termMonths = Math.max(1, Number(input.termMonths));

  const feeValue = Math.max(0, Number(input.feeValue) || 0);
  const feeType = input.feeType || "percent";
  const upfrontFeeAmount = feeType === "percent" ? (loanAmount * feeValue) / 100 : feeValue;
  const fundedTotalLoan = loanAmount + upfrontFeeAmount;

  const mRate = consolidationApr / 100 / 12;
  let pmt = 0;
  if (mRate === 0) {
    pmt = fundedTotalLoan / termMonths;
  } else {
    pmt = (fundedTotalLoan * (mRate * Math.pow(1 + mRate, termMonths))) / (Math.pow(1 + mRate, termMonths) - 1);
  }

  const consolidationMonthlyPayment = Number(pmt.toFixed(2));
  const consolidationTotalPaid = Number((pmt * termMonths).toFixed(2));
  const consolidationTotalInterest = Number((consolidationTotalPaid - loanAmount).toFixed(2));

  // Compute Real APR (Effective APR)
  const realApr = solveRealApr(loanAmount, upfrontFeeAmount, consolidationMonthlyPayment, termMonths) || consolidationApr;

  // Consolidation Amortization Schedule
  const consolidationSchedule: { month: number; balance: number; interest: number; payment: number }[] = [];
  let conBal = fundedTotalLoan;
  for (let m = 1; m <= termMonths; m++) {
    const mInt = conBal * mRate;
    const mPrin = pmt - mInt;
    conBal = Math.max(0, conBal - mPrin);
    consolidationSchedule.push({
      month: m,
      balance: Number(conBal.toFixed(2)),
      interest: Number(mInt.toFixed(2)),
      payment: Number(pmt.toFixed(2)),
    });
  }

  // 3. Savings Calculations
  const monthlySavings = Number((currentTotalMonthlyPayment - consolidationMonthlyPayment).toFixed(2));
  const interestSaved = Number((currentTotalInterest - (consolidationTotalInterest - upfrontFeeAmount)).toFixed(2));
  const netTotalSavings = Number((currentTotalCost - consolidationTotalPaid).toFixed(2));

  // 4. Max Fee Threshold Sensitivity (%)
  // Max Fee where Net Savings === 0 -> Total Paid Consolidation = Current Total Cost
  let maxFeeThresholdPercent = 0;
  if (currentTotalCost > 0 && currentTotalCost < 999999) {
    // Current Total Cost = Pmt(fundedLoan) * termMonths
    // solve for max funded loan: maxFunded = Current Total Cost / (Pmt factor)
    const pmtFactor = mRate === 0 ? 1 / termMonths : (mRate * Math.pow(1 + mRate, termMonths)) / (Math.pow(1 + mRate, termMonths) - 1);
    const maxFunded = (currentTotalCost / termMonths) / pmtFactor;
    const maxFeeDollar = Math.max(0, maxFunded - loanAmount);
    maxFeeThresholdPercent = Number(((maxFeeDollar / loanAmount) * 100).toFixed(2));
  }

  // 5. 0% Balance Transfer Card Alternative (18-Month 3% Fee Default)
  const btIntroMonths = 18;
  const btTransferFeePercent = 3.0;
  const btFeeAmount = (currentTotalBalance * btTransferFeePercent) / 100;
  const btRequiredMonthlyPayment = (currentTotalBalance + btFeeAmount) / btIntroMonths;
  const btTotalCost = currentTotalBalance + btFeeAmount;
  const btNetSavings = currentTotalCost - btTotalCost;

  // 6. Smart Recommendation
  let recommendation = "";
  let warningNote: string | undefined = undefined;

  if (isCurrentInfinite) {
    recommendation = "URGENT CONSOLIDATION NEEDED: Your current payments do not cover interest accrued! Consolidating saves your finances immediately.";
    warningNote = "Your current minimum payments lead to negative amortization (infinite debt growth).";
  } else if (netTotalSavings > 1000) {
    recommendation = `HIGHLY RECOMMENDED: Consolidating saves you $${netTotalSavings.toLocaleString("en-US", { minimumFractionDigits: 2 })} overall and lowers your rate from ${currentWeightedApr.toFixed(2)}% to ${consolidationApr.toFixed(2)}%!`;
  } else if (netTotalSavings > 0) {
    recommendation = `MODERATE BENEFIT: Consolidating saves you $${netTotalSavings.toLocaleString("en-US", { minimumFractionDigits: 2 })} total, but watch out for upfront fees.`;
  } else {
    recommendation = `NOT RECOMMENDED: Consolidating will cost you $${Math.abs(netTotalSavings).toLocaleString("en-US", { minimumFractionDigits: 2 })} MORE than staying on your current payoff path due to fees or term extension.`;
    warningNote = "Extending loan term or high upfront origination fees offset the APR reduction.";
  }

  return {
    currentTotalBalance: Number(currentTotalBalance.toFixed(2)),
    currentWeightedApr: Number(currentWeightedApr.toFixed(2)),
    currentTotalMonthlyPayment: Number(currentTotalMonthlyPayment.toFixed(2)),
    currentMonthsToPayoff,
    currentTotalInterest,
    currentTotalCost,

    loanAmount: Number(loanAmount.toFixed(2)),
    upfrontFeeAmount: Number(upfrontFeeAmount.toFixed(2)),
    fundedTotalLoan: Number(fundedTotalLoan.toFixed(2)),
    consolidationApr,
    realApr,
    termMonths,
    consolidationMonthlyPayment,
    consolidationTotalInterest: Number(consolidationTotalInterest.toFixed(2)),
    consolidationTotalCost: consolidationTotalPaid,

    monthlySavings,
    interestSaved,
    netTotalSavings,
    maxFeeThresholdPercent,

    btTransferFeePercent,
    btFeeAmount: Number(btFeeAmount.toFixed(2)),
    btIntroMonths,
    btRequiredMonthlyPayment: Number(btRequiredMonthlyPayment.toFixed(2)),
    btTotalCost: Number(btTotalCost.toFixed(2)),
    btNetSavings: Number(btNetSavings.toFixed(2)),

    recommendation,
    warningNote,

    currentSchedule,
    consolidationSchedule,
  };
}
