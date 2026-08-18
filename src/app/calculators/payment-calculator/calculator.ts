import {
  PaymentFrequency,
  AmortizationScheduleRow,
  FixedTermPaymentInputs,
  FixedTermPaymentResult,
  FixedPaymentDurationInputs,
  FixedPaymentDurationResult,
  AffordableLoanAmountInputs,
  AffordableLoanAmountResult,
  BiWeeklyComparisonResult,
  LoanOfferOption,
  LoanOfferComparisonResult,
} from "./types";

export const FREQUENCY_PAYMENTS_PER_YEAR: Record<PaymentFrequency, number> = {
  monthly: 12,
  biweekly: 26,
  accelerated_biweekly: 26,
  weekly: 52,
};

/**
 * 1. Fixed Term Loan Payment Solver (Core Amortization Engine)
 */
export function calculateFixedTermPayment(inputs: FixedTermPaymentInputs): FixedTermPaymentResult {
  const principal = Math.abs(inputs.loanAmount || 0);
  const totalMonths = (inputs.termYears || 0) * 12 + (inputs.termMonths || 0);
  const annualRate = Math.abs(inputs.interestRate || 0) / 100;

  if (principal <= 0 || totalMonths <= 0) {
    return {
      paymentPerPeriod: 0,
      totalPaymentsCount: 0,
      totalAmountPaid: 0,
      totalInterestPaid: 0,
      payoffMonths: 0,
      payoffYears: 0,
      principalPercentage: 100,
      interestPercentage: 0,
      interestSavedWithExtra: 0,
      monthsShavedOff: 0,
      trueAprPercent: inputs.interestRate || 0,
      annualSchedule: [],
      monthlySchedule: [],
    };
  }

  const monthlyRate = annualRate / 12;

  // Base monthly payment without extra payments
  let baseMonthlyPayment = 0;
  if (monthlyRate === 0) {
    baseMonthlyPayment = principal / totalMonths;
  } else {
    baseMonthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
      (Math.pow(1 + monthlyRate, totalMonths) - 1);
  }

  // Baseline schedule without extra payments to compute interest savings
  let baselineTotalInterest = 0;
  let tempBal = principal;
  for (let m = 1; m <= totalMonths; m++) {
    const interest = tempBal * monthlyRate;
    const princ = Math.min(tempBal, baseMonthlyPayment - interest);
    baselineTotalInterest += interest;
    tempBal -= princ;
    if (tempBal <= 0) break;
  }

  // Determine actual payment amount based on frequency
  let paymentPerPeriod = baseMonthlyPayment;
  if (inputs.frequency === "biweekly") {
    paymentPerPeriod = (baseMonthlyPayment * 12) / 26;
  } else if (inputs.frequency === "accelerated_biweekly") {
    paymentPerPeriod = baseMonthlyPayment / 2; // 26 half payments = 13 full payments/yr
  } else if (inputs.frequency === "weekly") {
    paymentPerPeriod = (baseMonthlyPayment * 12) / 52;
  }

  // Generate Month-by-Month Amortization Schedule with Extra Payments
  const monthlySchedule: AmortizationScheduleRow[] = [];
  let balance = principal;
  let totalInterestPaid = 0;
  let month = 0;

  const extraMonthly = Math.abs(inputs.extraMonthlyPayment || 0);
  const extraAnnual = Math.abs(inputs.extraAnnualPayment || 0);
  const oneTime = Math.abs(inputs.oneTimeLumpSum || 0);
  const oneTimeMonth = Math.max(1, inputs.oneTimeLumpSumMonth || 1);

  while (balance > 0.01 && month < 1200) {
    month++;
    const interest = balance * monthlyRate;
    let extra = extraMonthly;
    if (month % 12 === 0) extra += extraAnnual;
    if (month === oneTimeMonth) extra += oneTime;

    let regularPrincipal = baseMonthlyPayment - interest;
    if (inputs.frequency === "accelerated_biweekly") {
      regularPrincipal = (baseMonthlyPayment * (13 / 12)) - interest;
    }

    const totalPrincipal = Math.min(balance, regularPrincipal + extra);
    const actualPayment = interest + totalPrincipal;

    balance = Math.max(0, balance - totalPrincipal);
    totalInterestPaid += interest;

    monthlySchedule.push({
      period: month,
      payment: Math.round(actualPayment * 100) / 100,
      principal: Math.round(totalPrincipal * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      extraPayment: Math.round(extra * 100) / 100,
      totalInterestToDate: Math.round(totalInterestPaid * 100) / 100,
      endingBalance: Math.round(balance * 100) / 100,
    });
  }

  // Aggregate into Annual Schedule
  const annualSchedule: AmortizationScheduleRow[] = [];
  let yearInterest = 0;
  let yearPrincipal = 0;
  let yearPayment = 0;
  let currentYear = 1;

  for (let i = 0; i < monthlySchedule.length; i++) {
    const row = monthlySchedule[i];
    yearInterest += row.interest;
    yearPrincipal += row.principal;
    yearPayment += row.payment;

    if ((i + 1) % 12 === 0 || i === monthlySchedule.length - 1) {
      annualSchedule.push({
        period: currentYear,
        year: currentYear,
        payment: Math.round(yearPayment * 100) / 100,
        principal: Math.round(yearPrincipal * 100) / 100,
        interest: Math.round(yearInterest * 100) / 100,
        extraPayment: 0,
        totalInterestToDate: row.totalInterestToDate,
        endingBalance: row.endingBalance,
      });
      currentYear++;
      yearInterest = 0;
      yearPrincipal = 0;
      yearPayment = 0;
    }
  }

  const totalAmountPaid = principal + totalInterestPaid;
  const principalPercentage = totalAmountPaid > 0 ? (principal / totalAmountPaid) * 100 : 100;
  const interestPercentage = totalAmountPaid > 0 ? (totalInterestPaid / totalAmountPaid) * 100 : 0;
  const interestSavedWithExtra = Math.max(0, baselineTotalInterest - totalInterestPaid);
  const monthsShavedOff = Math.max(0, totalMonths - month);

  // True APR calculation accounting for upfront closing costs / discount points
  const netLoanProceeds = Math.max(1, principal - (inputs.upfrontFees || 0));
  let trueAprPercent = inputs.interestRate || 0;
  if (inputs.upfrontFees && inputs.upfrontFees > 0) {
    // Approximate APR
    trueAprPercent = ((totalInterestPaid + inputs.upfrontFees) / (principal * (totalMonths / 12))) * 100;
  }

  return {
    paymentPerPeriod: Math.round(paymentPerPeriod * 100) / 100,
    totalPaymentsCount: month,
    totalAmountPaid: Math.round(totalAmountPaid * 100) / 100,
    totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
    payoffMonths: month,
    payoffYears: Math.round((month / 12) * 10) / 10,
    principalPercentage: Math.round(principalPercentage * 10) / 10,
    interestPercentage: Math.round(interestPercentage * 10) / 10,
    interestSavedWithExtra: Math.round(interestSavedWithExtra * 100) / 100,
    monthsShavedOff,
    trueAprPercent: Math.round(trueAprPercent * 100) / 100,
    annualSchedule,
    monthlySchedule,
  };
}

/**
 * 2. Fixed Payment Term Solver (How Long to Pay Off Debt)
 */
export function calculateFixedPaymentDuration(inputs: FixedPaymentDurationInputs): FixedPaymentDurationResult {
  const principal = Math.abs(inputs.loanAmount || 0);
  const payment = Math.abs(inputs.monthlyPayment || 0);
  const rate = Math.abs(inputs.interestRate || 0) / 100;
  const monthlyRate = rate / 12;

  const minPaymentToCoverInterest = principal * monthlyRate;

  if (payment <= minPaymentToCoverInterest) {
    return {
      isInterestTrap: true,
      minPaymentToCoverInterest: Math.round(minPaymentToCoverInterest * 100) / 100,
      payoffMonths: Infinity,
      payoffYears: Infinity,
      payoffDays: Infinity,
      totalAmountPaid: Infinity,
      totalInterestPaid: Infinity,
    };
  }

  let nMonths = 0;
  if (monthlyRate === 0) {
    nMonths = principal / payment;
  } else {
    nMonths = -Math.log(1 - (principal * monthlyRate) / payment) / Math.log(1 + monthlyRate);
  }

  const totalMonths = Math.ceil(nMonths);
  const years = Math.floor(nMonths / 12);
  const remainingMonths = Math.floor(nMonths % 12);
  const days = Math.round((nMonths - Math.floor(nMonths)) * 30);

  const totalAmountPaid = payment * nMonths;
  const totalInterestPaid = Math.max(0, totalAmountPaid - principal);

  return {
    isInterestTrap: false,
    minPaymentToCoverInterest: Math.round(minPaymentToCoverInterest * 100) / 100,
    payoffMonths: totalMonths,
    payoffYears: years + remainingMonths / 12,
    payoffDays: days,
    totalAmountPaid: Math.round(totalAmountPaid * 100) / 100,
    totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
  };
}

/**
 * 3. Maximum Affordable Loan Amount Solver
 */
export function calculateAffordableLoanAmount(inputs: AffordableLoanAmountInputs): AffordableLoanAmountResult {
  const payment = Math.abs(inputs.targetMonthlyPayment || 0);
  const totalMonths = (inputs.termYears || 0) * 12 + (inputs.termMonths || 0);
  const rate = Math.abs(inputs.interestRate || 0) / 100;
  const monthlyRate = rate / 12;

  if (payment <= 0 || totalMonths <= 0) {
    return { maxBorrowableLoanAmount: 0, totalAmountPaid: 0, totalInterestPaid: 0 };
  }

  let maxPrincipal = 0;
  if (monthlyRate === 0) {
    maxPrincipal = payment * totalMonths;
  } else {
    maxPrincipal = payment * ((1 - Math.pow(1 + monthlyRate, -totalMonths)) / monthlyRate);
  }

  const totalAmountPaid = payment * totalMonths;
  const totalInterestPaid = Math.max(0, totalAmountPaid - maxPrincipal);

  return {
    maxBorrowableLoanAmount: Math.round(maxPrincipal * 100) / 100,
    totalAmountPaid: Math.round(totalAmountPaid * 100) / 100,
    totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
  };
}

/**
 * 4. Bi-Weekly vs Monthly Payment Acceleration Engine
 */
export function calculateBiWeeklyComparison(
  loanAmount: number,
  termYears: number,
  interestRate: number
): BiWeeklyComparisonResult {
  const monthly = calculateFixedTermPayment({
    loanAmount,
    termYears,
    termMonths: 0,
    interestRate,
    frequency: "monthly",
    upfrontFees: 0,
    extraMonthlyPayment: 0,
    extraAnnualPayment: 0,
    oneTimeLumpSum: 0,
    oneTimeLumpSumMonth: 1,
  });

  const accelerated = calculateFixedTermPayment({
    loanAmount,
    termYears,
    termMonths: 0,
    interestRate,
    frequency: "accelerated_biweekly",
    upfrontFees: 0,
    extraMonthlyPayment: 0,
    extraAnnualPayment: 0,
    oneTimeLumpSum: 0,
    oneTimeLumpSumMonth: 1,
  });

  return {
    monthlyPayment: monthly.paymentPerPeriod,
    monthlyTotalInterest: monthly.totalInterestPaid,
    monthlyTotalPaid: monthly.totalAmountPaid,
    monthlyPayoffYears: monthly.payoffYears,
    acceleratedBiWeeklyPayment: accelerated.paymentPerPeriod,
    acceleratedTotalInterest: accelerated.totalInterestPaid,
    acceleratedTotalPaid: accelerated.totalAmountPaid,
    acceleratedPayoffYears: accelerated.payoffYears,
    interestSaved: Math.round((monthly.totalInterestPaid - accelerated.totalInterestPaid) * 100) / 100,
    yearsShaved: Math.round((monthly.payoffYears - accelerated.payoffYears) * 10) / 10,
  };
}

/**
 * 5. Side-by-Side Multi-Loan Offer Comparison Engine
 */
export function compareLoanOffers(offers: LoanOfferOption[]): LoanOfferComparisonResult[] {
  return offers.map((off) => {
    const res = calculateFixedTermPayment({
      loanAmount: off.loanAmount,
      termYears: off.termYears,
      termMonths: 0,
      interestRate: off.interestRate,
      frequency: "monthly",
      upfrontFees: off.upfrontFees,
      extraMonthlyPayment: 0,
      extraAnnualPayment: 0,
      oneTimeLumpSum: 0,
      oneTimeLumpSumMonth: 1,
    });

    return {
      name: off.name,
      monthlyPayment: res.paymentPerPeriod,
      totalInterest: res.totalInterestPaid,
      totalCost: res.totalAmountPaid + (off.upfrontFees || 0),
      trueApr: res.trueAprPercent,
    };
  });
}
