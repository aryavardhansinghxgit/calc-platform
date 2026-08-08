import {
  AmortizationInput,
  AmortizationOutput,
  AmortizationRow,
  AnnualAmortizationRow,
} from "./types";
import { PMT } from "@/lib/finance/financial-math";

export function calculateAmortizationModule(inputs: AmortizationInput): AmortizationOutput {
  const {
    loanAmount = 200000,
    loanTermYears = 15,
    loanTermMonths = 0,
    interestRate = 6.0,
    startMonth = new Date().getMonth() + 1,
    startYear = new Date().getFullYear(),

    showExtraPayments = false,
    extraMonthlyPayment = 0,
    extraYearlyPayment = 0,
    extraOneTimePayment = 0,
    extraStartMonth = startMonth,
    extraStartYear = startYear,
  } = inputs;

  const P = Math.max(0, loanAmount);
  const totalMonths = Math.max(1, Math.min(600, Math.round(loanTermYears * 12 + loanTermMonths)));
  const monthlyRate = Math.max(0, interestRate) / 100 / 12;

  // 1. Calculate Base Scheduled Monthly PMT
  let baseMonthlyPayment = 0;
  if (P > 0 && totalMonths > 0) {
    if (monthlyRate > 0) {
      baseMonthlyPayment = PMT(monthlyRate, totalMonths, P);
    } else {
      baseMonthlyPayment = P / totalMonths;
    }
  }

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fullMonthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  // 2. Baseline Simulation (without extra payments)
  let baselineBalance = P;
  let baselineTotalInterest = 0;
  let baselinePaymentsCount = 0;

  if (P > 0) {
    while (baselineBalance > 0.001 && baselinePaymentsCount < totalMonths) {
      baselinePaymentsCount++;
      const interest = baselineBalance * monthlyRate;
      let principal = baseMonthlyPayment - interest;
      if (principal > baselineBalance) principal = baselineBalance;
      if (principal < 0) principal = 0;
      baselineTotalInterest += interest;
      baselineBalance -= principal;
      if (baselineBalance <= 0) break;
    }
  }

  const baselineLastMonthOffset = (startMonth - 1) + (baselinePaymentsCount - 1);
  const baselineFinalM = (baselineLastMonthOffset % 12);
  const baselineFinalY = startYear + Math.floor(baselineLastMonthOffset / 12);
  const baselinePayoffDate = `${fullMonthNames[baselineFinalM]} ${baselineFinalY}`;
  const baselineTotalAmountPaid = P + baselineTotalInterest;

  // 3. Active Simulation (with optional extra payments)
  const monthlySchedule: AmortizationRow[] = [];
  let balance = P;
  let cumInterest = 0;
  let cumPrincipal = 0;
  let currentMonthIndex = 0;

  while (balance > 0.001 && currentMonthIndex < totalMonths) {
    currentMonthIndex++;
    const beginningBalance = balance;
    const interestPaid = balance * monthlyRate;

    let basePrincipalPaid = baseMonthlyPayment - interestPaid;
    if (basePrincipalPaid < 0) basePrincipalPaid = 0;

    const totalMonthOffset = (startMonth - 1) + (currentMonthIndex - 1);
    const mNum = (totalMonthOffset % 12) + 1;
    const yNum = startYear + Math.floor(totalMonthOffset / 12);
    const dateStr = `${monthNames[mNum - 1]} ${yNum}`;

    let extraPaidThisMonth = 0;

    if (showExtraPayments) {
      // Extra monthly check
      const isMonthlyActive =
        yNum > extraStartYear ||
        (yNum === extraStartYear && mNum >= extraStartMonth);
      if (isMonthlyActive) {
        extraPaidThisMonth += Math.max(0, extraMonthlyPayment);
      }

      // Extra yearly check (paid once a year in extraStartMonth)
      const isYearlyActive =
        mNum === extraStartMonth && yNum >= extraStartYear;
      if (isYearlyActive) {
        extraPaidThisMonth += Math.max(0, extraYearlyPayment);
      }

      // Extra one-time payment check (paid in extraStartMonth and extraStartYear)
      if (mNum === extraStartMonth && yNum === extraStartYear) {
        extraPaidThisMonth += Math.max(0, extraOneTimePayment);
      }
    }

    let totalPrincipalPaid = basePrincipalPaid + extraPaidThisMonth;
    if (totalPrincipalPaid > balance) {
      totalPrincipalPaid = balance;
      extraPaidThisMonth = Math.max(0, totalPrincipalPaid - basePrincipalPaid);
      basePrincipalPaid = totalPrincipalPaid - extraPaidThisMonth;
    }

    balance -= totalPrincipalPaid;
    cumInterest += interestPaid;
    cumPrincipal += totalPrincipalPaid;

    const actualTotalPaymentThisMonth = totalPrincipalPaid + interestPaid;

    monthlySchedule.push({
      paymentNumber: currentMonthIndex,
      paymentDate: dateStr,
      beginningBalance,
      paymentAmount: actualTotalPaymentThisMonth,
      principalPaid: totalPrincipalPaid,
      interestPaid,
      extraPaid: extraPaidThisMonth,
      endingBalance: Math.max(0, balance),
      cumulativeInterest: cumInterest,
      cumulativePrincipal: cumPrincipal,
    });

    if (balance <= 0) break;
  }

  const activeTotalPaymentsCount = currentMonthIndex;
  const activeLastMonthOffset = (startMonth - 1) + (activeTotalPaymentsCount - 1);
  const activeFinalM = (activeLastMonthOffset % 12);
  const activeFinalY = startYear + Math.floor(activeLastMonthOffset / 12);
  const loanPayoffDate = `${fullMonthNames[activeFinalM]} ${activeFinalY}`;

  const totalInterest = cumInterest;
  const totalAmountPaid = P + totalInterest;

  // 4. Annual Aggregation Schedule
  const annualScheduleMap = new Map<number, AnnualAmortizationRow>();

  monthlySchedule.forEach((row) => {
    const yearIndex = Math.ceil(row.paymentNumber / 12);
    if (!annualScheduleMap.has(yearIndex)) {
      annualScheduleMap.set(yearIndex, {
        year: yearIndex,
        beginningBalance: row.beginningBalance,
        totalPayment: 0,
        principalPaid: 0,
        interestPaid: 0,
        extraPaid: 0,
        endingBalance: row.endingBalance,
      });
    }

    const item = annualScheduleMap.get(yearIndex)!;
    item.totalPayment += row.paymentAmount;
    item.principalPaid += row.principalPaid;
    item.interestPaid += row.interestPaid;
    item.extraPaid += row.extraPaid;
    item.endingBalance = row.endingBalance; // End of year balance
  });

  const annualSchedule = Array.from(annualScheduleMap.values());

  // 5. Comparison Metrics
  const interestSaved = Math.max(0, baselineTotalInterest - totalInterest);
  const timeSavedMonths = Math.max(0, baselinePaymentsCount - activeTotalPaymentsCount);
  const timeSavedYears = Number((timeSavedMonths / 12).toFixed(1));

  return {
    monthlyPayment: baseMonthlyPayment,
    totalPaymentsCount: activeTotalPaymentsCount,
    totalPrincipal: P,
    totalInterest,
    totalAmountPaid,
    loanPayoffDate,

    baselineMonthlyPayment: baseMonthlyPayment,
    baselineTotalInterest,
    baselineTotalAmountPaid,
    baselinePayoffDate,
    baselineTotalPaymentsCount: baselinePaymentsCount,

    interestSaved,
    timeSavedMonths,
    timeSavedYears,

    monthlySchedule,
    annualSchedule,
  };
}
