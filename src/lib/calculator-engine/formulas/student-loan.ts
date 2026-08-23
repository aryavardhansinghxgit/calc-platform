/**
 * Student Loan Formula Engine
 * 
 * Mathematical Modules:
 * 1. Simple 4-Way Student Loan Solver (Loan Balance, Term, Rate, Monthly Payment)
 *    - Analytical inversions for Balance, Term, Payment
 *    - Safeguarded Newton-Raphson root solver for APR
 *    - Explicit non-amortizing boundary detection
 * 2. Student Loan Repayment Calculator (Extra payments: monthly, annual, one-time)
 * 3. Student Loan Projection Calculator (FSA periodic simple accrual convention)
 * 4. True Student Loan Refinance Amortization Engine
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
  isAmortizing: boolean;
  errorMessage?: string;
}

export interface StudentLoanRepaymentInput {
  loanBalance: number;
  monthlyPayment: number;
  interestRate: number;
  repaymentOption: "payoff" | "extra" | "normal";
  extraMonthlyPayment?: number;
  extraAnnualPayment?: number;
  extraOneTimePayment?: number;
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
  yearsToGraduate: number;
  estimatedAnnualBorrowing: number;
  currentBalance: number;
  loanTermYears: number;
  gracePeriodMonths: number;
  interestRate: number;
  payInterestInSchool: boolean;
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

export interface StudentLoanRefinanceInput {
  currentBalance: number;
  currentRate: number;
  remainingTermYears: number;
  refinanceRate: number;
  refinanceTermYears: number;
}

export interface StudentLoanRefinanceResult {
  currentMonthlyPayment: number;
  currentTotalInterest: number;
  currentTotalPayments: number;
  refinanceMonthlyPayment: number;
  refinanceTotalInterest: number;
  refinanceTotalPayments: number;
  monthlySavings: number;
  interestSavings: number;
  totalSavings: number;
}

/**
 * Robust numerical root-finding solver (Newton-Raphson with bisection safeguard)
 * Solves for monthly rate r from: PMT = P * [r(1+r)^n / ((1+r)^n - 1)]
 */
export function solveAprFromPayment(P: number, Y: number, pmt: number): number | null {
  if (P <= 0 || Y <= 0 || pmt <= 0) return null;
  const n = Y * 12;
  const minPmt = P / n;
  if (Math.abs(pmt - minPmt) < 1e-7) return 0;
  if (pmt < minPmt) return null; // Non-amortizing or negative interest

  let rLow = 1e-7;
  let rHigh = 5.0; // 500% monthly rate max
  let r = pmt / P; // initial guess

  for (let iter = 0; iter < 100; iter++) {
    const pow = Math.pow(1 + r, n);
    const powMinus1 = pow - 1;
    const f = (P * r * pow) / powMinus1 - pmt;

    if (Math.abs(f) < 1e-9) {
      return r * 12 * 100;
    }

    if (f > 0) {
      rHigh = r;
    } else {
      rLow = r;
    }

    const dPow = n * Math.pow(1 + r, n - 1);
    const num = (pow + r * dPow) * powMinus1 - (r * pow * dPow);
    const den = powMinus1 * powMinus1;
    const df = (P * num) / den;

    let nextR = r - f / df;
    if (nextR <= rLow || nextR >= rHigh || isNaN(nextR) || !isFinite(nextR)) {
      nextR = (rLow + rHigh) / 2;
    }
    r = nextR;
  }

  return r * 12 * 100;
}

/**
 * 1. Simple Student Loan 4-Way Solver
 * Solves any 1 missing variable when 3 variables are provided.
 */
export function calculateSimpleStudentLoan(input: SimpleStudentLoanInput): SimpleStudentLoanResult {
  let P = input.loanBalance !== undefined && !isNaN(input.loanBalance) ? input.loanBalance : null;
  let Y = input.remainingTermYears !== undefined && !isNaN(input.remainingTermYears) ? input.remainingTermYears : null;
  let ratePct = input.interestRate !== undefined && !isNaN(input.interestRate) ? input.interestRate : null;
  let pmt = input.monthlyPayment !== undefined && !isNaN(input.monthlyPayment) ? input.monthlyPayment : null;

  // Default baseline if all are null
  if (P === null && Y === null && ratePct === null && pmt === null) {
    P = 30000;
    Y = 10;
    ratePct = 6.8;
  }

  let isAmortizing = true;
  let errorMessage: string | undefined = undefined;

  // Case A: Balance + Term + Rate -> Payment
  if (P !== null && Y !== null && ratePct !== null && pmt === null) {
    const r = ratePct / 100 / 12;
    const n = Y * 12;
    pmt = safePmt(P, r, n);
  }
  // Case B: Balance + Term + Payment -> Rate (Numerical Root Solver)
  else if (P !== null && Y !== null && pmt !== null && ratePct === null) {
    const solvedRate = solveAprFromPayment(P, Y, pmt);
    if (solvedRate !== null) {
      ratePct = solvedRate;
    } else {
      isAmortizing = false;
      errorMessage = "Monthly payment is too low to amortize this loan over the given term.";
      ratePct = 0;
    }
  }
  // Case C: Balance + Rate + Payment -> Term
  else if (P !== null && ratePct !== null && pmt !== null && Y === null) {
    const r = ratePct / 100 / 12;
    const monthlyInterest = P * r;
    if (pmt <= monthlyInterest) {
      isAmortizing = false;
      errorMessage = "Monthly payment is less than or equal to monthly interest. The loan will never amortize.";
      Y = Infinity;
    } else {
      if (r === 0) {
        Y = (P / pmt) / 12;
      } else {
        const n = Math.log(pmt / (pmt - P * r)) / Math.log(1 + r);
        Y = n / 12;
      }
    }
  }
  // Case D: Term + Rate + Payment -> Balance
  else if (pmt !== null && Y !== null && ratePct !== null && P === null) {
    const r = ratePct / 100 / 12;
    const n = Y * 12;
    if (r === 0) {
      P = pmt * n;
    } else {
      const factor = (1 - Math.pow(1 + r, -n)) / r;
      P = pmt * factor;
    }
  }
  // Default fallback if overspecified / normal
  else if (P !== null && Y !== null && ratePct !== null) {
    const r = ratePct / 100 / 12;
    const n = Y * 12;
    pmt = safePmt(P, r, n);
  }

  const finalP = Math.max(0, P ?? 30000);
  const finalY = Y !== null && isFinite(Y) ? Math.max(0.1, Y) : (isAmortizing ? 10 : 0);
  const finalRate = Math.max(0, ratePct ?? 6.8);
  const finalPmt = isAmortizing ? Math.max(0, pmt ?? 345.24) : (pmt ?? 0);

  // Exact unrounded amortization total payments
  let totalPaid = 0;
  let totalInterest = 0;

  if (isAmortizing && finalY > 0) {
    const totalN = Math.round(finalY * 12);
    const r = finalRate / 100 / 12;
    const exactPmt = r === 0 ? finalP / totalN : (finalP * (r * Math.pow(1 + r, totalN))) / (Math.pow(1 + r, totalN) - 1);
    totalPaid = exactPmt * totalN;
    totalInterest = Math.max(0, totalPaid - finalP);
  }

  return {
    loanBalance: Number(finalP.toFixed(2)),
    remainingTermYears: Number(finalY.toFixed(2)),
    interestRate: Number(finalRate.toFixed(2)),
    monthlyPayment: Number(finalPmt.toFixed(2)),
    totalInterestPaid: Number(totalInterest.toFixed(2)),
    totalPayments: Number(totalPaid.toFixed(2)),
    isAmortizing,
    errorMessage,
  };
}

/**
 * 2. Student Loan Repayment Calculator with Extra Payments
 */
export function calculateStudentLoanRepayment(input: StudentLoanRepaymentInput): StudentLoanRepaymentResult {
  const P = Math.max(0, Number(input.loanBalance ?? 30000));
  const ratePct = Math.max(0, Number(input.interestRate ?? 6.8));
  const r = ratePct / 100 / 12;

  const basePmt = Math.max(0, Number(input.monthlyPayment ?? 350));
  const extraMo = input.repaymentOption === "extra" ? Math.max(0, Number(input.extraMonthlyPayment ?? 150)) : 0;
  const extraYr = input.repaymentOption === "extra" ? Math.max(0, Number(input.extraAnnualPayment ?? 0)) : 0;
  const extraOne = input.repaymentOption === "extra" ? Math.max(0, Number(input.extraOneTimePayment ?? 0)) : 0;

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
 * 3. Student Loan Projection Calculator
 * Documented FSA periodic accrual convention (simple non-compounding accrual during school, single capitalization post-grace)
 */
export function calculateStudentLoanProjection(input: StudentLoanProjectionInput): StudentLoanProjectionResult {
  const yrsToGrad = Math.max(0, Number(input.yearsToGraduate ?? 2));
  const annualBorrow = Math.max(0, Number(input.estimatedAnnualBorrowing ?? 10000));
  const currentBal = Math.max(0, Number(input.currentBalance ?? 20000));
  const termYrs = Math.max(1, Number(input.loanTermYears ?? 10));
  const graceMos = Math.max(0, Number(input.gracePeriodMonths ?? 6));
  const ratePct = Math.max(0, Number(input.interestRate ?? 6.8));
  const r = ratePct / 100 / 12;
  const payInSchool = Boolean(input.payInterestInSchool);

  const totalBorrowed = currentBal + annualBorrow * yrsToGrad;

  // In-school interest:
  // Existing balance accrues simple interest for school duration
  let inSchoolInterest = currentBal * (ratePct / 100) * yrsToGrad;

  // Annual borrowings distributed across academic periods
  for (let yr = 1; yr <= yrsToGrad; yr++) {
    const avgYearsAccruing = (yrsToGrad - yr + 0.5);
    inSchoolInterest += annualBorrow * (ratePct / 100) * avgYearsAccruing;
  }

  // Grace period interest (simple interest on principal)
  const graceInterest = totalBorrowed * r * graceMos;
  const totalAccruedInterest = inSchoolInterest + graceInterest;

  const balAtGrad = totalBorrowed + (payInSchool ? 0 : inSchoolInterest);
  const balAfterGrace = totalBorrowed + (payInSchool ? 0 : totalAccruedInterest);

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
    totalPayments: Number((totalRepayment + (payInSchool ? totalAccruedInterest : 0)).toFixed(2)),
    inSchoolAccruedInterest: Number(totalAccruedInterest.toFixed(2)),
  };
}

/**
 * 4. True Student Loan Refinance Amortization Engine
 * Full mathematical amortization comparing current terms vs. refinance terms
 */
export function calculateStudentLoanRefinance(input: StudentLoanRefinanceInput): StudentLoanRefinanceResult {
  const balance = Math.max(0, Number(input.currentBalance ?? 30000));
  const currentRate = Math.max(0, Number(input.currentRate ?? 6.8));
  const currentTermYrs = Math.max(0.1, Number(input.remainingTermYears ?? 10));
  const refiRate = Math.max(0, Number(input.refinanceRate ?? 4.5));
  const refiTermYrs = Math.max(0.1, Number(input.refinanceTermYears ?? 10));

  const rCurrent = currentRate / 100 / 12;
  const nCurrent = Math.round(currentTermYrs * 12);
  const currentPmt = safePmt(balance, rCurrent, nCurrent);
  const currentPmtRounded = Number(currentPmt.toFixed(2));
  const currentTotalPayments = currentPmt * nCurrent;
  const currentTotalInterest = Math.max(0, currentTotalPayments - balance);

  const rRefi = refiRate / 100 / 12;
  const nRefi = Math.round(refiTermYrs * 12);
  const refiPmt = safePmt(balance, rRefi, nRefi);
  const refiPmtRounded = Number(refiPmt.toFixed(2));
  const refiTotalPayments = refiPmt * nRefi;
  const refiTotalInterest = Math.max(0, refiTotalPayments - balance);

  const monthlySavings = Number((currentPmtRounded - refiPmtRounded).toFixed(2));
  const interestSavings = Number((currentTotalInterest - refiTotalInterest).toFixed(2));
  const totalSavings = Number((currentTotalPayments - refiTotalPayments).toFixed(2));

  return {
    currentMonthlyPayment: currentPmtRounded,
    currentTotalInterest: Number(currentTotalInterest.toFixed(2)),
    currentTotalPayments: Number(currentTotalPayments.toFixed(2)),
    refinanceMonthlyPayment: refiPmtRounded,
    refinanceTotalInterest: Number(refiTotalInterest.toFixed(2)),
    refinanceTotalPayments: Number(refiTotalPayments.toFixed(2)),
    monthlySavings,
    interestSavings,
    totalSavings,
  };
}
