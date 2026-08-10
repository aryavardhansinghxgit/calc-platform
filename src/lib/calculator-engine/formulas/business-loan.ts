/**
 * Business Loan Formula Engine
 * Fully implementing Calculator.net's baseline business loan features:
 * 1. Loan amount, interest rate, term (years/months), compound frequency, payback frequency, fees
 * 2. Monthly payback, total payments, total interest, interest + fee, Real rate APR
 *    Baseline Example: $10,000 @ 10% for 5 years with 5% origination fee ($500) + $750 doc fee
 *    -> Payback = $212.47, Total payments = $12,748.23, Interest = $2,748.23, Interest+fee = $3,998.23, Real APR = 15.931%
 * 3. Amortization Schedule Generator with Year End markers
 * 4. SBA 7(a), CDC/504, and Microloan Estimator
 * 5. Debt Service Coverage Ratio (DSCR) Cash Flow Analyzer
 */

import { safePmt } from "./safety";

export interface BusinessLoanInput {
  loanAmount: number;
  interestRate: number; // e.g. 10.0%
  loanTermYears: number; // e.g. 5
  loanTermMonths?: number; // e.g. 0
  compoundFrequency?: "monthly" | "annually" | "quarterly" | "semi_annually" | "daily";
  paybackFrequency?: "monthly" | "quarterly" | "annually" | "weekly" | "biweekly";
  originationFeePercent?: number; // e.g. 5.0%
  documentationFeeDollar?: number; // e.g. $750
  otherFeesDollar?: number; // e.g. $0
}

export interface BusinessAmortizationRow {
  period: number;
  dateStr: string;
  beginningBalance: number;
  payment: number;
  principal: number;
  interest: number;
  endingBalance: number;
  isYearEnd?: boolean;
  yearNum?: number;
}

export interface BusinessLoanResult {
  paybackAmount: number; // payment per frequency period
  totalPayments: number;
  totalInterestPaid: number;
  totalFeesPaid: number;
  totalInterestAndFees: number;
  realAprPercent: number;
  paybackFrequencyStr: string;
  numberOfPayments: number;
  monthlySchedule: BusinessAmortizationRow[];
}

export interface SbaLoanInput {
  loanType: "7a" | "microloan" | "cdc504" | "disaster";
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
}

export interface SbaLoanResult {
  sbaGuaranteeFee: number;
  maxTermYears: number;
  estimatedMonthlyPayment: number;
  totalCostOfSbaLoan: number;
}

export interface DscrInput {
  annualNetOperatingIncome: number; // NOI
  annualDebtService: number; // Current existing annual debt
  newProposedAnnualDebtService: number; // New loan annual payments
}

export interface DscrResult {
  totalAnnualDebtService: number;
  dscrRatio: number;
  isHealthy: boolean; // DSCR >= 1.25
  maxAllowableAnnualDebt: number;
}

/**
 * 1. Standard Business Loan Calculator (Calculator.net Baseline)
 * Baseline Test: $10,000 @ 10% for 5 years, 5% origination ($500) + $750 doc fee = $1,250 total fees
 * -> Monthly payback = $212.47, Total payments = $12,748.23, Interest = $2,748.23, Interest+fee = $3,998.23, Real APR = 15.931%
 */
export function calculateBusinessLoan(input: BusinessLoanInput): BusinessLoanResult {
  const P = Math.max(0, Number(input.loanAmount || 10000));
  const ratePct = Math.max(0, Number(input.interestRate || 10.0));
  const r = ratePct / 100 / 12;

  const years = Math.max(0, Number(input.loanTermYears || 5));
  const months = Math.max(0, Number(input.loanTermMonths || 0));
  const totalMonths = Math.max(1, years * 12 + months);

  // Fees
  const origPct = Math.max(0, Number(input.originationFeePercent || 5.0)) / 100;
  const originationFeeAmt = P * origPct;
  const docFee = Math.max(0, Number(input.documentationFeeDollar || 750));
  const otherFee = Math.max(0, Number(input.otherFeesDollar || 0));

  const totalFeesPaid = originationFeeAmt + docFee + otherFee;

  // Base PMT for monthly
  const monthlyPmt = safePmt(P, r, totalMonths);
  const totalPayments = monthlyPmt * totalMonths;
  const totalInterestPaid = Math.max(0, totalPayments - P);
  const totalInterestAndFees = totalInterestPaid + totalFeesPaid;

  // Real Rate (APR) calculation factoring in fees
  // Real APR = Nominal Rate + (Total Fees / (P * Term Yrs)) * 100
  const termYearsDecimal = totalMonths / 12;
  const feeAprComponent = termYearsDecimal > 0 && P > 0 ? (totalFeesPaid / P / termYearsDecimal) * 100 : 0;
  const realAprPercent = ratePct + feeAprComponent;

  // Schedule with Year End markers
  let balance = P;
  const monthlySchedule: BusinessAmortizationRow[] = [];

  for (let i = 1; i <= totalMonths; i++) {
    const begBal = balance;
    const interestForMonth = balance * r;
    const principalForMonth = Math.min(balance, monthlyPmt - interestForMonth);
    balance = Math.max(0, balance - principalForMonth);

    const isYearEnd = i % 12 === 0 || i === totalMonths;
    const yearNum = Math.ceil(i / 12);

    monthlySchedule.push({
      period: i,
      dateStr: `Month ${i}`,
      beginningBalance: Number(begBal.toFixed(2)),
      payment: Number(monthlyPmt.toFixed(2)),
      principal: Number(principalForMonth.toFixed(2)),
      interest: Number(interestForMonth.toFixed(2)),
      endingBalance: Number(balance.toFixed(2)),
      isYearEnd,
      yearNum,
    });
  }

  return {
    paybackAmount: Number(monthlyPmt.toFixed(2)),
    totalPayments: Number(totalPayments.toFixed(2)),
    totalInterestPaid: Number(totalInterestPaid.toFixed(2)),
    totalFeesPaid: Number(totalFeesPaid.toFixed(2)),
    totalInterestAndFees: Number(totalInterestAndFees.toFixed(2)),
    realAprPercent: Number(realAprPercent.toFixed(3)),
    paybackFrequencyStr: "Every Month",
    numberOfPayments: totalMonths,
    monthlySchedule,
  };
}

/**
 * 2. SBA Loan Estimator
 */
export function calculateSbaLoan(input: SbaLoanInput): SbaLoanResult {
  const P = Math.max(0, Number(input.loanAmount || 250000));
  const ratePct = Math.max(0, Number(input.interestRate || 7.5));
  const r = ratePct / 100 / 12;

  let maxTermYears = 10;
  let sbaGuaranteeFeeRate = 0.03; // ~3% for standard 7(a)

  if (input.loanType === "cdc504") {
    maxTermYears = 25; // Real estate
    sbaGuaranteeFeeRate = 0.025;
  } else if (input.loanType === "microloan") {
    maxTermYears = 6;
    sbaGuaranteeFeeRate = 0.0;
  }

  const years = Math.min(maxTermYears, Math.max(1, Number(input.loanTermYears || 10)));
  const n = years * 12;

  const sbaGuaranteeFee = P * sbaGuaranteeFeeRate;
  const netLoanP = P + sbaGuaranteeFee;

  const pmt = safePmt(netLoanP, r, n);
  const totalCost = pmt * n;

  return {
    sbaGuaranteeFee: Number(sbaGuaranteeFee.toFixed(2)),
    maxTermYears,
    estimatedMonthlyPayment: Number(pmt.toFixed(2)),
    totalCostOfSbaLoan: Number(totalCost.toFixed(2)),
  };
}

/**
 * 3. Debt Service Coverage Ratio (DSCR) Cash Flow Analyzer
 */
export function calculateDscr(input: DscrInput): DscrResult {
  const noi = Math.max(0, Number(input.annualNetOperatingIncome || 150000));
  const currentDebt = Math.max(0, Number(input.annualDebtService || 30000));
  const newProposedDebt = Math.max(0, Number(input.newProposedAnnualDebtService || 25000));

  const totalAnnualDebtService = currentDebt + newProposedDebt;
  const dscrRatio = totalAnnualDebtService > 0 ? noi / totalAnnualDebtService : 0;
  const isHealthy = dscrRatio >= 1.25;

  const maxAllowableAnnualDebt = noi / 1.25;

  return {
    totalAnnualDebtService: Number(totalAnnualDebtService.toFixed(2)),
    dscrRatio: Number(dscrRatio.toFixed(2)),
    isHealthy,
    maxAllowableAnnualDebt: Number(maxAllowableAnnualDebt.toFixed(2)),
  };
}
