/**
 * Shared Finance Utilities for loan schedules, amortization, and interest calculations.
 */

export interface AmortizationScheduleRow {
  month: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  remainingBalance: number;
}

export function calculateMonthlyInterestRate(annualRatePercentage: number): number {
  return annualRatePercentage / 100 / 12;
}

export function calculateMonthlyInterestAmount(principal: number, annualRatePercentage: number): number {
  return principal * calculateMonthlyInterestRate(annualRatePercentage);
}

export function generatePaymentSchedule(
  principal: number,
  annualRatePercentage: number,
  tenureMonths: number
): AmortizationScheduleRow[] {
  const schedule: AmortizationScheduleRow[] = [];
  const monthlyRate = calculateMonthlyInterestRate(annualRatePercentage);

  let monthlyPayment = 0;
  if (monthlyRate === 0) {
    monthlyPayment = principal / tenureMonths;
  } else {
    monthlyPayment =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, tenureMonths))) /
      (Math.pow(1 + monthlyRate, tenureMonths) - 1);
  }

  let remainingBalance = principal;

  for (let month = 1; month <= tenureMonths; month++) {
    const interestPaid = remainingBalance * monthlyRate;
    const principalPaid = Math.min(remainingBalance, monthlyPayment - interestPaid);
    remainingBalance = Math.max(0, remainingBalance - principalPaid);

    schedule.push({
      month,
      payment: monthlyPayment,
      principalPaid,
      interestPaid,
      remainingBalance,
    });
  }

  return schedule;
}
