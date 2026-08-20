/**
 * Personal Loan Formula Engine
 * Fully implementing Calculator.net's baseline personal loan features:
 * 1. Loan amount, interest rate, term (years/months), start date, fee & insurance options
 * 2. Monthly payment, total payments, total interest, payoff date ($424.94 match for $20k @ 10% 5yrs)
 * 3. Annual & Monthly Amortization Schedule Generator
 * 4. Debt Consolidation vs Credit Cards Analyzer (14.284% APR match for PDF page 2/3 example)
 * 5. Early Payoff & Extra Payments Simulator
 * 6. True Actuarial TILA APR root-finding for fee-inclusive borrowing
 */

import { safePmt } from "./safety";

export interface PersonalLoanInput {
  loanAmount: number;
  interestRate: number; // e.g. 10.0%
  loanTermYears: number; // e.g. 5
  loanTermMonths?: number; // e.g. 0
  startDate?: string; // e.g. "2026-08"
  includeFees?: boolean;
  originationFeePercent?: number; // e.g. 3%
  upfrontFeeDollar?: number;
  monthlyFeeDollar?: number;
  loanInsuranceMonthly?: number;
}

export interface AmortizationRow {
  period: number;
  dateStr: string;
  payment: number;
  principal: number;
  interest: number;
  fees: number;
  endingBalance: number;
  totalInterestPaid: number;
}

export interface AnnualAmortizationRow {
  year: number;
  dateStr: string;
  interest: number;
  principal: number;
  endingBalance: number;
}

export interface PersonalLoanResult {
  monthlyPayment: number;
  totalMonthlyPaymentWithFees: number;
  totalPayments: number;
  totalInterestPaid: number;
  totalFeesPaid: number;
  payoffDateStr: string;
  effectiveApr: number;
  monthlySchedule: AmortizationRow[];
  annualSchedule: AnnualAmortizationRow[];
}

export interface DebtItem {
  name: string;
  balance: number;
  interestRate: number; // APR %
  currentMonthlyPayment: number;
}

export interface DebtConsolidationInput {
  debts: DebtItem[];
  newLoanInterestRate: number;
  newLoanTermYears: number;
  originationFeePercent: number;
}

export interface DebtConsolidationResult {
  totalBalance: number;
  originationFeeAmount: number;
  newLoanPrincipal: number;
  currentCombinedMonthlyPayment: number;
  newMonthlyPayment: number;
  monthlySavings: number;
  currentTotalInterest: number;
  newTotalInterest: number;
  totalInterestSavings: number;
  effectiveApr: number;
}

export interface ExtraPaymentInput {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  extraMonthlyPayment: number;
}

export interface ExtraPaymentResult {
  originalMonthlyPayment: number;
  originalTermMonths: number;
  originalTotalInterest: number;
  newTermMonths: number;
  newTotalInterest: number;
  monthsSaved: number;
  interestSaved: number;
}

/**
 * Solves for true actuarial Annual Percentage Rate (APR) under U.S. TILA / Regulation Z
 * using bisection root-finding over discrete monthly cash flows.
 */
export function solveActuarialApr(netProceeds: number, monthlyPayment: number, totalPeriods: number): number {
  if (netProceeds <= 0 || monthlyPayment <= 0 || totalPeriods <= 0) return 0;
  if (monthlyPayment * totalPeriods <= netProceeds) return 0;

  let low = 0.0;
  let high = 5.0; // Up to 500% monthly rate (6000% APR)

  for (let iter = 0; iter < 60; iter++) {
    const mid = (low + high) / 2;
    const pv = mid === 0 ? monthlyPayment * totalPeriods : (monthlyPayment * (1 - Math.pow(1 + mid, -totalPeriods))) / mid;

    if (pv > netProceeds) {
      low = mid; // higher discount rate decreases PV
    } else {
      high = mid;
    }
  }

  const periodicRate = (low + high) / 2;
  return Number((periodicRate * 12 * 100).toFixed(3));
}

/**
 * 1. Standard Personal Loan Calculator (Calculator.net Baseline)
 * Baseline Test: $20,000 @ 10% for 5 years (60 mos), Aug 2026 start date
 * -> Monthly pay = $424.94, Total payments = $25,496.45, Total interest = $5,496.45, Payoff = Aug 2031
 */
export function calculatePersonalLoan(input: PersonalLoanInput): PersonalLoanResult {
  const P = Math.max(0, Number(input.loanAmount ?? 20000));
  const ratePct = Math.max(0, Number(input.interestRate ?? 10.0));
  const r = ratePct / 100 / 12;

  const years = Math.max(0, Number(input.loanTermYears ?? 5));
  const months = Math.max(0, Number(input.loanTermMonths ?? 0));
  const n = Math.max(1, years * 12 + months);

  const start = input.startDate ? new Date(input.startDate + "-01") : new Date(2026, 7, 1);

  // Fees
  const origPct = input.includeFees ? Math.max(0, Number(input.originationFeePercent ?? 0)) / 100 : 0;
  const upfrontFee = input.includeFees ? Math.max(0, Number(input.upfrontFeeDollar ?? 0)) : 0;
  const monthlyFee = input.includeFees ? Math.max(0, Number(input.monthlyFeeDollar ?? 0)) : 0;
  const insuranceFee = input.includeFees ? Math.max(0, Number(input.loanInsuranceMonthly ?? 0)) : 0;

  const originationFeeAmt = P * origPct;
  const netFinancedAmount = P;

  // Base PMT
  const basePmt = P === 0 ? 0 : r === 0 ? P / n : safePmt(netFinancedAmount, r, n);
  const totalMonthlyPmt = basePmt + monthlyFee + insuranceFee;

  let balance = netFinancedAmount;
  let totalInterest = 0;
  let accumInterest = 0;
  const monthlySchedule: AmortizationRow[] = [];

  for (let i = 1; i <= n; i++) {
    const interestForMonth = P === 0 ? 0 : balance * r;
    const principalForMonth = P === 0 ? 0 : Math.min(balance, basePmt - interestForMonth);
    balance = Math.max(0, balance - principalForMonth);
    accumInterest += interestForMonth;

    const curDate = new Date(start.getFullYear(), start.getMonth() + i - 1, 1);
    const dateStr = curDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });

    monthlySchedule.push({
      period: i,
      dateStr,
      payment: Number((basePmt + monthlyFee + insuranceFee).toFixed(2)),
      principal: Number(principalForMonth.toFixed(2)),
      interest: Number(interestForMonth.toFixed(2)),
      fees: Number((monthlyFee + insuranceFee).toFixed(2)),
      endingBalance: Number(balance.toFixed(2)),
      totalInterestPaid: Number(accumInterest.toFixed(2)),
    });
  }

  totalInterest = accumInterest;
  const totalFees = originationFeeAmt + upfrontFee + (monthlyFee + insuranceFee) * n;
  const totalPaid = basePmt * n + totalFees;

  // Payoff date
  const endPeriodDate = new Date(start.getFullYear(), start.getMonth() + n, 1);
  const payoffDateStr = endPeriodDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  // Annual Schedule Aggregation
  const annualSchedule: AnnualAmortizationRow[] = [];
  let currentYearInterest = 0;
  let currentYearPrincipal = 0;

  for (let i = 0; i < monthlySchedule.length; i++) {
    const row = monthlySchedule[i];
    currentYearInterest += row.interest;
    currentYearPrincipal += row.principal;

    if ((i + 1) % 12 === 0 || i === monthlySchedule.length - 1) {
      const yearNum = Math.ceil((i + 1) / 12);
      annualSchedule.push({
        year: yearNum,
        dateStr: row.dateStr,
        interest: Number(currentYearInterest.toFixed(2)),
        principal: Number(currentYearPrincipal.toFixed(2)),
        endingBalance: row.endingBalance,
      });
      currentYearInterest = 0;
      currentYearPrincipal = 0;
    }
  }

  // Actuarial APR calculation
  let effectiveApr = ratePct;
  if (input.includeFees && totalFees > 0 && P > 0) {
    const netProceeds = Math.max(1, P - originationFeeAmt - upfrontFee);
    effectiveApr = solveActuarialApr(netProceeds, totalMonthlyPmt, n);
  }

  return {
    monthlyPayment: Number(basePmt.toFixed(2)),
    totalMonthlyPaymentWithFees: Number(totalMonthlyPmt.toFixed(2)),
    totalPayments: Number(totalPaid.toFixed(2)),
    totalInterestPaid: Number(totalInterest.toFixed(2)),
    totalFeesPaid: Number(totalFees.toFixed(2)),
    payoffDateStr,
    effectiveApr: Number(effectiveApr.toFixed(3)),
    monthlySchedule,
    annualSchedule,
  };
}

/**
 * 2. Debt Consolidation vs Credit Cards Analyzer
 * PDF Example: $8,000 @ 19.99% + $7,000 @ 24.99% = $15,000 balance
 * Consolidated loan @ 12% for 5 yrs + 5% origination fee -> Effective APR = 14.284%
 */
export function calculateDebtConsolidation(input: DebtConsolidationInput): DebtConsolidationResult {
  const debts = input.debts || [
    { name: "Card A", balance: 8000, interestRate: 19.99, currentMonthlyPayment: 240 },
    { name: "Card B", balance: 7000, interestRate: 24.99, currentMonthlyPayment: 225 },
  ];

  const totalBal = debts.reduce((sum, d) => sum + d.balance, 0);
  const currentMonthlyPmt = debts.reduce((sum, d) => sum + d.currentMonthlyPayment, 0);

  const origPct = Math.max(0, Number(input.originationFeePercent ?? 5.0)) / 100;
  const origAmt = totalBal * origPct;
  const newPrincipal = totalBal + origAmt;

  const newRatePct = Math.max(0, Number(input.newLoanInterestRate ?? 12.0));
  const newTermYears = Math.max(1, Number(input.newLoanTermYears ?? 5));
  const n = newTermYears * 12;
  const r = newRatePct / 100 / 12;

  const newPmt = r === 0 ? newPrincipal / n : safePmt(newPrincipal, r, n);
  const newTotalPaid = newPmt * n;
  const newTotalInterest = newTotalPaid - totalBal;

  // Approximate current card interest (assuming 5 yr payoff)
  const currentTotalInterest = debts.reduce((sum, d) => {
    const cardR = d.interestRate / 100 / 12;
    const pmt = cardR === 0 ? d.balance / 60 : safePmt(d.balance, cardR, 60);
    return sum + (pmt * 60 - d.balance);
  }, 0);

  const monthlySavings = currentMonthlyPmt - newPmt;
  const totalInterestSavings = currentTotalInterest - newTotalInterest;

  // True Actuarial APR with origination fee included (Solving Net Proceeds = $15,000)
  const effectiveApr = solveActuarialApr(totalBal, newPmt, n);

  return {
    totalBalance: Number(totalBal.toFixed(2)),
    originationFeeAmount: Number(origAmt.toFixed(2)),
    newLoanPrincipal: Number(newPrincipal.toFixed(2)),
    currentCombinedMonthlyPayment: Number(currentMonthlyPmt.toFixed(2)),
    newMonthlyPayment: Number(newPmt.toFixed(2)),
    monthlySavings: Number(monthlySavings.toFixed(2)),
    currentTotalInterest: Number(currentTotalInterest.toFixed(2)),
    newTotalInterest: Number(newTotalInterest.toFixed(2)),
    totalInterestSavings: Number(totalInterestSavings.toFixed(2)),
    effectiveApr: Number(effectiveApr.toFixed(3)),
  };
}

/**
 * 3. Early Payoff & Extra Payments Simulator
 */
export function calculateExtraPayments(input: ExtraPaymentInput): ExtraPaymentResult {
  const P = Math.max(0, Number(input.loanAmount ?? 20000));
  const ratePct = Math.max(0, Number(input.interestRate ?? 10.0));
  const r = ratePct / 100 / 12;
  const origTerm = Math.max(1, Number(input.loanTermYears ?? 5)) * 12;
  const extraPmt = Math.max(0, Number(input.extraMonthlyPayment ?? 100));

  const origPmt = r === 0 ? P / origTerm : safePmt(P, r, origTerm);
  const origTotalInterest = origPmt * origTerm - P;

  let balance = P;
  let newTermMonths = 0;
  let newTotalInterest = 0;

  while (balance > 0 && newTermMonths < 600) {
    newTermMonths++;
    const interestForMonth = r === 0 ? 0 : balance * r;
    const totalPmtForMonth = Math.min(balance + interestForMonth, origPmt + extraPmt);
    const principalForMonth = totalPmtForMonth - interestForMonth;

    balance = Math.max(0, balance - principalForMonth);
    newTotalInterest += interestForMonth;
  }

  const monthsSaved = origTerm - newTermMonths;
  const interestSaved = origTotalInterest - newTotalInterest;

  return {
    originalMonthlyPayment: Number(origPmt.toFixed(2)),
    originalTermMonths: origTerm,
    originalTotalInterest: Number(origTotalInterest.toFixed(2)),
    newTermMonths,
    newTotalInterest: Number(newTotalInterest.toFixed(2)),
    monthsSaved: Math.max(0, monthsSaved),
    interestSaved: Number(Math.max(0, interestSaved).toFixed(2)),
  };
}
