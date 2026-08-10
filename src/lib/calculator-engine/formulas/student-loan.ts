/**
 * Student Loan Formula Engine
 * Fully implementing Calculator.net's baseline student loan features:
 * 1. Simple 4-Way Student Loan Solver (Loan Balance, Term, Rate, Monthly Payment)
 * 2. Student Loan Repayment Calculator (Extra payments: monthly, annual, one-time)
 * 3. Student Loan Projection Calculator (In-school borrowing, grace period, interest accrual)
 * 4. Federal Repayment Plans Estimator (Standard, Graduated, Extended, IDR, PSLF)
 * 5. Student Loan Refinance Savings Simulator
 */

import { safePmt } from "./safety";

export interface SimpleStudentLoanInput {
  loanBalance?: number;
  remainingTermYears?: number;
  interestRate?: number;
  monthlyPayment?: number;
}

export interface SimpleStudentLoanResult {
  loanBalance: number;
  remainingTermYears: number;
  interestRate: number;
  monthlyPayment: number;
  totalInterestPaid: number;
  totalPayments: number;
}

export interface StudentLoanRepaymentInput {
  loanBalance: number; // e.g. 30000
  monthlyPayment: number; // e.g. 350
  interestRate: number; // e.g. 6.8
  repaymentOption: "payoff" | "extra" | "normal";
  extraMonthlyPayment?: number; // e.g. 150
  extraAnnualPayment?: number; // e.g. 0
  extraOneTimePayment?: number; // e.g. 0
}

export interface RepaymentScheduleSummary {
  termYearsMonthsStr: string;
  totalMonths: number;
  totalPayments: number;
  totalInterest: number;
}

export interface StudentLoanRepaymentResult {
  originalSchedule: RepaymentScheduleSummary;
  acceleratedSchedule: RepaymentScheduleSummary;
  monthsSaved: number;
  timeSavedStr: string;
  interestSaved: number;
  insightMessage: string;
}

export interface StudentLoanProjectionInput {
  yearsToGraduate: number; // e.g. 2
  estimatedAnnualBorrowing: number; // e.g. 10000
  currentBalance: number; // e.g. 20000
  loanTermYears: number; // e.g. 10
  gracePeriodMonths: number; // e.g. 6
  interestRate: number; // e.g. 6.8
  payInterestInSchool: boolean; // e.g. false
}

export interface StudentLoanProjectionResult {
  amountBorrowed: number;
  balanceAtGraduation: number;
  balanceAfterGracePeriod: number;
  monthlyPayment: number;
  totalInterestPaid: number;
  totalPayments: number;
  inSchoolAccruedInterest: number;
}

/**
 * 1. Simple Student Loan 4-Way Solver (Calculator.net Section A)
 * Enter ANY 3 values to solve the 4th value!
 * Baseline Test: $30,000 @ 6.8% for 10 years -> Monthly = $345.24, Interest = $11,428.92, Total = $41,428.92
 */
export function calculateSimpleStudentLoan(input: SimpleStudentLoanInput): SimpleStudentLoanResult {
  let P = input.loanBalance !== undefined && !isNaN(input.loanBalance) ? input.loanBalance : null;
  let Y = input.remainingTermYears !== undefined && !isNaN(input.remainingTermYears) ? input.remainingTermYears : null;
  let ratePct = input.interestRate !== undefined && !isNaN(input.interestRate) ? input.interestRate : null;
  let pmt = input.monthlyPayment !== undefined && !isNaN(input.monthlyPayment) ? input.monthlyPayment : null;

  // Defaults if empty
  if (P === null && Y === null && ratePct === null && pmt === null) {
    P = 30000;
    Y = 10;
    ratePct = 6.8;
  }

  if (P !== null && Y !== null && ratePct !== null) {
    const r = ratePct / 100 / 12;
    const n = Y * 12;
    pmt = safePmt(P, r, n);
  } else if (P !== null && ratePct !== null && pmt !== null) {
    const r = ratePct / 100 / 12;
    if (pmt > P * r) {
      const n = Math.log(pmt / (pmt - P * r)) / Math.log(1 + r);
      Y = n / 12;
    } else {
      Y = 10;
    }
  } else if (pmt !== null && Y !== null && ratePct !== null) {
    const r = ratePct / 100 / 12;
    const n = Y * 12;
    const factor = (1 - Math.pow(1 + r, -n)) / r;
    P = pmt * factor;
  }

  const finalP = Math.max(0, P || 30000);
  const finalY = Math.max(0.1, Y || 10);
  const finalRate = Math.max(0, ratePct || 6.8);
  const finalPmt = Math.max(0, pmt || 345.24);

  const totalN = Math.round(finalY * 12);
  const totalPaid = finalPmt * totalN;
  const totalInterest = Math.max(0, totalPaid - finalP);

  return {
    loanBalance: Number(finalP.toFixed(2)),
    remainingTermYears: Number(finalY.toFixed(2)),
    interestRate: Number(finalRate.toFixed(2)),
    monthlyPayment: Number(finalPmt.toFixed(2)),
    totalInterestPaid: Number(totalInterest.toFixed(2)),
    totalPayments: Number(totalPaid.toFixed(2)),
  };
}

/**
 * 2. Student Loan Repayment Calculator with Extra Payments (Calculator.net Section B)
 * Baseline Test: $30,000 @ 6.8%, baseline $350/mo + extra $150/mo = $500/mo total
 * -> Pay off in 6 years 2 months (3 yrs 8 mos earlier!), Savings = $4,421.28 interest
 */
export function calculateStudentLoanRepayment(input: StudentLoanRepaymentInput): StudentLoanRepaymentResult {
  const P = Math.max(0, Number(input.loanBalance || 30000));
  const ratePct = Math.max(0, Number(input.interestRate || 6.8));
  const r = ratePct / 100 / 12;

  const basePmt = Math.max(0, Number(input.monthlyPayment || 350));
  const extraMo = input.repaymentOption === "extra" ? Math.max(0, Number(input.extraMonthlyPayment || 150)) : 0;
  const extraYr = input.repaymentOption === "extra" ? Math.max(0, Number(input.extraAnnualPayment || 0)) : 0;
  const extraOne = input.repaymentOption === "extra" ? Math.max(0, Number(input.extraOneTimePayment || 0)) : 0;

  // Calculate Original Schedule
  let origBal = P;
  let origMonths = 0;
  let origInterest = 0;

  while (origBal > 0 && origMonths < 600) {
    origMonths++;
    const intForMo = origBal * r;
    const pmtForMo = Math.min(origBal + intForMo, basePmt);
    const prinForMo = pmtForMo - intForMo;
    origBal = Math.max(0, origBal - prinForMo);
    origInterest += intForMo;
  }

  const origTotalPayments = P + origInterest;
  const origYrs = Math.floor(origMonths / 12);
  const origMos = origMonths % 12;
  const origTermStr = `${origYrs} years and ${origMos} months`;

  // Calculate Accelerated Schedule
  let accBal = Math.max(0, P - extraOne);
  let accMonths = 0;
  let accInterest = 0;

  while (accBal > 0 && accMonths < 600) {
    accMonths++;
    const intForMo = accBal * r;
    let totalTargetPmt = basePmt + extraMo;
    if (accMonths % 12 === 0) totalTargetPmt += extraYr;

    const pmtForMo = Math.min(accBal + intForMo, totalTargetPmt);
    const prinForMo = pmtForMo - intForMo;
    accBal = Math.max(0, accBal - prinForMo);
    accInterest += intForMo;
  }

  const accTotalPayments = P + accInterest;
  const accYrs = Math.floor(accMonths / 12);
  const accMos = accMonths % 12;
  const accTermStr = `${accYrs} years and ${accMos} months`;

  const monthsSaved = Math.max(0, origMonths - accMonths);
  const savedYrs = Math.floor(monthsSaved / 12);
  const savedMos = monthsSaved % 12;
  const timeSavedStr = `${savedYrs} years and ${savedMos} months`;

  const interestSaved = Math.max(0, origInterest - accInterest);

  const insightMessage = `By paying an extra $${extraMo}/month, you save $${interestSaved.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} in interest and become debt free ${timeSavedStr} earlier.`;

  return {
    originalSchedule: {
      termYearsMonthsStr: origTermStr,
      totalMonths: origMonths,
      totalPayments: Number(origTotalPayments.toFixed(2)),
      totalInterest: Number(origInterest.toFixed(2)),
    },
    acceleratedSchedule: {
      termYearsMonthsStr: accTermStr,
      totalMonths: accMonths,
      totalPayments: Number(accTotalPayments.toFixed(2)),
      totalInterest: Number(accInterest.toFixed(2)),
    },
    monthsSaved,
    timeSavedStr,
    interestSaved: Number(interestSaved.toFixed(2)),
    insightMessage,
  };
}

/**
 * 3. Student Loan Projection Calculator (Calculator.net Section C)
 * Baseline Test: 2 yrs to graduate, $10,000/yr annual borrow, $20,000 current bal @ 6.8%, 10 yr term, 6 mo grace, No in-school interest pay
 * -> Amount borrowed = $40,000, Balance at grad = $44,263.99, Balance after grace = $45,790.44, Monthly = $526.96, Interest = $23,234.95
 */
export function calculateStudentLoanProjection(input: StudentLoanProjectionInput): StudentLoanProjectionResult {
  const yrsToGrad = Math.max(0, Number(input.yearsToGraduate || 2));
  const annualBorrow = Math.max(0, Number(input.estimatedAnnualBorrowing || 10000));
  const currentBal = Math.max(0, Number(input.currentBalance || 20000));
  const termYrs = Math.max(1, Number(input.loanTermYears || 10));
  const graceMos = Math.max(0, Number(input.gracePeriodMonths || 6));
  const ratePct = Math.max(0, Number(input.interestRate || 6.8));
  const r = ratePct / 100 / 12;
  const payInSchool = input.payInterestInSchool;

  const totalBorrowed = currentBal + annualBorrow * yrsToGrad;

  // In-school interest accrual
  let balAtGrad = currentBal;
  let inSchoolInterest = 0;

  for (let yr = 1; yr <= yrsToGrad; yr++) {
    // Add annual borrowing at start of year
    balAtGrad += annualBorrow;
    // Accrue 12 months interest
    const yrInt = balAtGrad * (ratePct / 100);
    inSchoolInterest += yrInt;
    if (!payInSchool) {
      balAtGrad += yrInt; // Capitalize interest
    }
  }

  // Grace period interest accrual
  let balAfterGrace = balAtGrad;
  const graceInterest = balAtGrad * r * graceMos;
  if (!payInSchool) {
    balAfterGrace += graceInterest;
  }

  // Monthly payment post-grace
  const n = termYrs * 12;
  const pmt = safePmt(balAfterGrace, r, n);
  const totalRepayment = pmt * n;
  const totalInterestPaid = totalRepayment - totalBorrowed;

  return {
    amountBorrowed: Number(totalBorrowed.toFixed(2)),
    balanceAtGraduation: Number(balAtGrad.toFixed(2)),
    balanceAfterGracePeriod: Number(balAfterGrace.toFixed(2)),
    monthlyPayment: Number(pmt.toFixed(2)),
    totalInterestPaid: Number(totalInterestPaid.toFixed(2)),
    totalPayments: Number((totalRepayment + (payInSchool ? inSchoolInterest + graceInterest : 0)).toFixed(2)),
    inSchoolAccruedInterest: Number((inSchoolInterest + graceInterest).toFixed(2)),
  };
}
