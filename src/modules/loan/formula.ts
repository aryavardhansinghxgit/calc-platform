import {
  LoanInput,
  LoanOutput,
  LoanAmortizationRow,
  LoanCalculatorMode,
  PaymentFrequency,
} from "./types";
import { PMT } from "@/lib/finance/financial-math";

export function calculateLoanModule(inputs: LoanInput): LoanOutput {
  const {
    mode = "monthly-payment",
    loanAmount = 25000,
    interestRate = 7.5,
    loanTermYears = 5,
    loanTermMonths = 0,
    desiredPayment = 500,
    paymentFrequency = "monthly",
    extraMonthlyPayment = 0,
    startMonth = new Date().getMonth() + 1,
    startYear = new Date().getFullYear(),
  } = inputs;

  const periodsPerYear = paymentFrequency === "weekly" ? 52 : paymentFrequency === "biweekly" ? 26 : 12;
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fullMonthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  let calcLoanAmount = Math.max(0, loanAmount);
  let calcInterestRate = Math.max(0, interestRate);
  let totalMonths = Math.max(1, Math.min(600, Math.round(loanTermYears * 12 + loanTermMonths)));
  let basePeriodicPayment = 0;
  let baseMonthlyPayment = 0;

  // --- SOLVER MODE LOGIC ---
  if (mode === "loan-amount") {
    // Mode 2: Calculate Loan Amount from Desired Monthly Payment
    const r = calcInterestRate / 100 / periodsPerYear;
    const n = Math.round(totalMonths * (periodsPerYear / 12));
    const targetPayment = Math.max(0, desiredPayment);
    if (r > 0 && n > 0) {
      calcLoanAmount = (targetPayment * (Math.pow(1 + r, n) - 1)) / (r * Math.pow(1 + r, n));
    } else if (n > 0) {
      calcLoanAmount = targetPayment * n;
    }
    basePeriodicPayment = targetPayment;
    baseMonthlyPayment = targetPayment * (12 / periodsPerYear);
  } else if (mode === "loan-term") {
    // Mode 3: Calculate Loan Term from Loan Amount, Monthly Payment & Interest Rate
    const P = Math.max(0, loanAmount);
    const targetPayment = Math.max(0, desiredPayment);
    const r = calcInterestRate / 100 / periodsPerYear;
    if (P > 0 && targetPayment > P * r) {
      const n = Math.log(targetPayment / (targetPayment - P * r)) / Math.log(1 + r);
      totalMonths = Math.ceil(n / (periodsPerYear / 12));
    } else {
      totalMonths = 360;
    }
    basePeriodicPayment = targetPayment;
    baseMonthlyPayment = targetPayment * (12 / periodsPerYear);
  } else if (mode === "interest-rate") {
    // Mode 4: Calculate Interest Rate from Loan Amount, Payment & Term
    const P = Math.max(1, loanAmount);
    const n = Math.round(totalMonths * (periodsPerYear / 12));
    const targetPayment = Math.max(0, desiredPayment);

    // Binary search for periodic rate r
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
    basePeriodicPayment = targetPayment;
    baseMonthlyPayment = targetPayment * (12 / periodsPerYear);
  } else {
    // Mode 1: Calculate Monthly / Periodic Payment
    const r = calcInterestRate / 100 / periodsPerYear;
    const n = Math.round(totalMonths * (periodsPerYear / 12));
    if (calcLoanAmount > 0 && n > 0) {
      if (r > 0) {
        basePeriodicPayment = PMT(r, n, calcLoanAmount);
      } else {
        basePeriodicPayment = calcLoanAmount / n;
      }
    }
    baseMonthlyPayment = basePeriodicPayment * (periodsPerYear / 12);
  }

  const totalPeriods = Math.round(totalMonths * (periodsPerYear / 12));
  const periodicRate = calcInterestRate / 100 / periodsPerYear;

  // --- BASELINE SIMULATION (No extra payments) ---
  let baselineBalance = calcLoanAmount;
  let baselineTotalInterest = 0;
  let baselinePeriodsCount = 0;

  if (calcLoanAmount > 0) {
    while (baselineBalance > 0.001 && baselinePeriodsCount < totalPeriods * 2) {
      baselinePeriodsCount++;
      const interest = baselineBalance * periodicRate;
      let principal = basePeriodicPayment - interest;
      if (principal > baselineBalance) principal = baselineBalance;
      if (principal < 0) principal = 0;
      baselineTotalInterest += interest;
      baselineBalance -= principal;
      if (baselineBalance <= 0) break;
    }
  }

  const baselineLastMonthOffset = startMonth - 1 + Math.floor((baselinePeriodsCount * 12) / periodsPerYear);
  const baselineFinalM = baselineLastMonthOffset % 12;
  const baselineFinalY = startYear + Math.floor(baselineLastMonthOffset / 12);
  const baselinePayoffDate = `${fullMonthNames[baselineFinalM]} ${baselineFinalY}`;

  // --- ACTIVE SIMULATION (With extra payments) ---
  const amortizationSchedule: LoanAmortizationRow[] = [];
  let balance = calcLoanAmount;
  let cumInterest = 0;
  let cumPrincipal = 0;
  let currentPeriod = 0;

  const extraPerPeriod = Math.max(0, extraMonthlyPayment) * (12 / periodsPerYear);

  while (balance > 0.001 && currentPeriod < totalPeriods * 2) {
    currentPeriod++;
    const beginningBalance = balance;
    const interestPaid = balance * periodicRate;

    let basePrincipalPaid = basePeriodicPayment - interestPaid;
    if (basePrincipalPaid < 0) basePrincipalPaid = 0;

    let extraPaidThisPeriod = extraPerPeriod;
    let totalPrincipalPaid = basePrincipalPaid + extraPaidThisPeriod;

    if (totalPrincipalPaid > balance) {
      totalPrincipalPaid = balance;
      extraPaidThisPeriod = Math.max(0, totalPrincipalPaid - basePrincipalPaid);
      basePrincipalPaid = totalPrincipalPaid - extraPaidThisPeriod;
    }

    balance -= totalPrincipalPaid;
    cumInterest += interestPaid;
    cumPrincipal += totalPrincipalPaid;

    const monthOffset = startMonth - 1 + Math.floor((currentPeriod * 12) / periodsPerYear);
    const mNum = (monthOffset % 12) + 1;
    const yNum = startYear + Math.floor(monthOffset / 12);
    const dateStr = `${monthNames[mNum - 1]} ${yNum}`;

    amortizationSchedule.push({
      paymentNumber: currentPeriod,
      paymentDate: dateStr,
      beginningBalance,
      paymentAmount: totalPrincipalPaid + interestPaid,
      principalPaid: totalPrincipalPaid,
      interestPaid,
      extraPaid: extraPaidThisPeriod,
      endingBalance: Math.max(0, balance),
      cumulativeInterest: cumInterest,
      cumulativePrincipal: cumPrincipal,
    });

    if (balance <= 0) break;
  }

  const activeTotalPaymentsCount = currentPeriod;
  const activeLastMonthOffset = startMonth - 1 + Math.floor((activeTotalPaymentsCount * 12) / periodsPerYear);
  const activeFinalM = activeLastMonthOffset % 12;
  const activeFinalY = startYear + Math.floor(activeLastMonthOffset / 12);
  const payoffDate = `${fullMonthNames[activeFinalM]} ${activeFinalY}`;

  const totalInterest = cumInterest;
  const totalRepayment = calcLoanAmount + totalInterest;
  const interestPercentage = totalRepayment > 0 ? Number(((totalInterest / totalRepayment) * 100).toFixed(1)) : 0;

  const interestSaved = Math.max(0, baselineTotalInterest - totalInterest);
  const timeSavedPeriods = Math.max(0, baselinePeriodsCount - activeTotalPaymentsCount);
  const timeSavedMonths = Math.round((timeSavedPeriods * 12) / periodsPerYear);
  const timeSavedYears = Number((timeSavedMonths / 12).toFixed(1));

  return {
    mode,
    paymentFrequency,
    monthlyPayment: baseMonthlyPayment,
    periodicPayment: basePeriodicPayment,
    maxLoanAmount: calcLoanAmount,
    requiredTermMonths: totalMonths % 12,
    requiredTermYears: Math.floor(totalMonths / 12),
    estimatedInterestRate: Number(calcInterestRate.toFixed(2)),
    estimatedApr: Number(calcInterestRate.toFixed(2)),
    totalPaymentsCount: activeTotalPaymentsCount,
    totalInterest,
    totalRepayment,
    payoffDate,
    interestPercentage,

    baselineTotalInterest,
    baselinePayoffDate,
    baselinePaymentsCount: baselinePeriodsCount,
    interestSaved,
    timeSavedMonths,
    timeSavedYears,

    amortizationSchedule,
  };
}
