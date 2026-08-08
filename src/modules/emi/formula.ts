import {
  EmiInput,
  EmiOutput,
  EmiAmortizationRow,
  AnnualEmiRow,
  EmiCalculatorMode,
  PrepaymentStrategy,
} from "./types";
import { PMT } from "@/lib/finance/financial-math";

export function calculateEmiModule(inputs: EmiInput): EmiOutput {
  const {
    mode = "standard",
    loanAmount = 500000,
    interestRate = 8.5,
    loanTermYears = 10,
    loanTermMonths = 0,
    processingFeeRate = 0.5,
    processingFeeFlat = 0,
    extraMonthlyPrepayment = 0,
    oneTimePrepayment = 0,
    oneTimePrepaymentMonth = 1,
    oneTimePrepaymentYear = new Date().getFullYear() + 1,
    prepaymentStrategy = "reduce-tenure",
    desiredEmi = 10000,
    flatInterestRate = interestRate,
    startMonth = new Date().getMonth() + 1,
    startYear = new Date().getFullYear(),
  } = inputs;

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const fullMonthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  let calcLoanAmount = Math.max(0, loanAmount);
  let totalMonths = Math.max(1, Math.min(600, Math.round(loanTermYears * 12 + loanTermMonths)));
  let calcInterestRate = Math.max(0, interestRate);
  let baseMonthlyEmi = 0;

  const monthlyRate = calcInterestRate / 100 / 12;

  // --- SOLVER MODE LOGIC ---
  if (mode === "reverse-solver") {
    // Mode 4: Calculate Max Loan Amount from Desired EMI
    const targetEmi = Math.max(0, desiredEmi);
    if (monthlyRate > 0 && totalMonths > 0) {
      calcLoanAmount = (targetEmi * (Math.pow(1 + monthlyRate, totalMonths) - 1)) / (monthlyRate * Math.pow(1 + monthlyRate, totalMonths));
    } else if (totalMonths > 0) {
      calcLoanAmount = targetEmi * totalMonths;
    }
    baseMonthlyEmi = targetEmi;
  } else {
    // Standard / Prepayment / Flat vs Reducing
    if (calcLoanAmount > 0 && totalMonths > 0) {
      if (monthlyRate > 0) {
        baseMonthlyEmi = PMT(monthlyRate, totalMonths, calcLoanAmount);
      } else {
        baseMonthlyEmi = calcLoanAmount / totalMonths;
      }
    }
  }

  // Processing Fee
  const processingFeeTotal = calcLoanAmount * (Math.max(0, processingFeeRate) / 100) + Math.max(0, processingFeeFlat);

  // Flat Interest Comparison Calculation
  const flatRateVal = Math.max(0, flatInterestRate);
  const flatRateTotalInterest = calcLoanAmount * (flatRateVal / 100) * (totalMonths / 12);
  const flatRateMonthlyPayment = (calcLoanAmount + flatRateTotalInterest) / totalMonths;

  // --- BASELINE SIMULATION (No extra prepayments) ---
  let baselineBalance = calcLoanAmount;
  let baselineTotalInterest = 0;
  let baselinePaymentsCount = 0;

  if (calcLoanAmount > 0) {
    while (baselineBalance > 0.001 && baselinePaymentsCount < totalMonths) {
      baselinePaymentsCount++;
      const interest = baselineBalance * monthlyRate;
      let principal = baseMonthlyEmi - interest;
      if (principal > baselineBalance) principal = baselineBalance;
      if (principal < 0) principal = 0;
      baselineTotalInterest += interest;
      baselineBalance -= principal;
      if (baselineBalance <= 0) break;
    }
  }

  const baselineLastMonthOffset = startMonth - 1 + (baselinePaymentsCount - 1);
  const baselineFinalM = baselineLastMonthOffset % 12;
  const baselineFinalY = startYear + Math.floor(baselineLastMonthOffset / 12);
  const baselinePayoffDate = `${fullMonthNames[baselineFinalM]} ${baselineFinalY}`;

  // --- ACTIVE SIMULATION (With prepayments & strategies) ---
  const monthlySchedule: EmiAmortizationRow[] = [];
  let balance = calcLoanAmount;
  let cumInterest = 0;
  let cumPrincipal = 0;
  let currentMonthIndex = 0;
  let activeEmi = baseMonthlyEmi;

  const hasExtra = mode === "prepayment" || extraMonthlyPrepayment > 0 || oneTimePrepayment > 0;

  while (balance > 0.001 && currentMonthIndex < totalMonths) {
    currentMonthIndex++;
    const beginningBalance = balance;
    const interestPaid = balance * monthlyRate;

    let basePrincipalPaid = activeEmi - interestPaid;
    if (basePrincipalPaid < 0) basePrincipalPaid = 0;

    const totalMonthOffset = startMonth - 1 + (currentMonthIndex - 1);
    const mNum = (totalMonthOffset % 12) + 1;
    const yNum = startYear + Math.floor(totalMonthOffset / 12);
    const dateStr = `${monthNames[mNum - 1]} ${yNum}`;

    let extraPaidThisMonth = 0;

    if (hasExtra) {
      // Extra monthly prepayment
      extraPaidThisMonth += Math.max(0, extraMonthlyPrepayment);

      // One-time prepayment check
      if (mNum === oneTimePrepaymentMonth && yNum === oneTimePrepaymentYear) {
        extraPaidThisMonth += Math.max(0, oneTimePrepayment);
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

    const actualEmiThisMonth = totalPrincipalPaid + interestPaid;

    monthlySchedule.push({
      paymentNumber: currentMonthIndex,
      paymentDate: dateStr,
      beginningBalance,
      emiAmount: actualEmiThisMonth,
      principalPaid: totalPrincipalPaid,
      interestPaid,
      extraPaid: extraPaidThisMonth,
      endingBalance: Math.max(0, balance),
      cumulativeInterest: cumInterest,
      cumulativePrincipal: cumPrincipal,
    });

    // If strategy is "reduce-emi" and an extra prepayment occurred, recalculate lower active EMI for remaining term
    if (hasExtra && prepaymentStrategy === "reduce-emi" && extraPaidThisMonth > 0 && balance > 0) {
      const remainingMonths = totalMonths - currentMonthIndex;
      if (remainingMonths > 0 && monthlyRate > 0) {
        activeEmi = PMT(monthlyRate, remainingMonths, balance);
      }
    }

    if (balance <= 0) break;
  }

  const activeTotalPaymentsCount = currentMonthIndex;
  const activeLastMonthOffset = startMonth - 1 + (activeTotalPaymentsCount - 1);
  const activeFinalM = activeLastMonthOffset % 12;
  const activeFinalY = startYear + Math.floor(activeLastMonthOffset / 12);
  const payoffDate = `${fullMonthNames[activeFinalM]} ${activeFinalY}`;

  const totalInterestPayable = cumInterest;
  const totalCostOfLoan = calcLoanAmount + totalInterestPayable + processingFeeTotal;
  const interestRatio = totalCostOfLoan > 0 ? Number(((totalInterestPayable / totalCostOfLoan) * 100).toFixed(1)) : 0;

  const flatVsReducingDifference = Math.max(0, flatRateTotalInterest - totalInterestPayable);

  const interestSaved = Math.max(0, baselineTotalInterest - totalInterestPayable);
  const timeSavedMonths = Math.max(0, baselinePaymentsCount - activeTotalPaymentsCount);
  const timeSavedYears = Number((timeSavedMonths / 12).toFixed(1));

  // --- ANNUAL SCHEDULE AGGREGATION ---
  const annualScheduleMap = new Map<number, AnnualEmiRow>();
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
    item.totalPayment += row.emiAmount;
    item.principalPaid += row.principalPaid;
    item.interestPaid += row.interestPaid;
    item.extraPaid += row.extraPaid;
    item.endingBalance = row.endingBalance;
  });

  const annualSchedule = Array.from(annualScheduleMap.values());

  return {
    mode,
    prepaymentStrategy,
    monthlyEmi: baseMonthlyEmi,
    maxLoanAmount: calcLoanAmount,
    totalInterestPayable,
    totalPrincipal: calcLoanAmount,
    processingFeeTotal,
    totalCostOfLoan,
    totalPaymentsCount: activeTotalPaymentsCount,
    payoffDate,
    interestRatio,

    flatRateTotalInterest,
    flatVsReducingDifference,
    flatRateMonthlyPayment,

    baselineTotalInterest,
    baselinePayoffDate,
    baselinePaymentsCount,
    interestSaved,
    timeSavedMonths,
    timeSavedYears,

    monthlySchedule,
    annualSchedule,
  };
}
