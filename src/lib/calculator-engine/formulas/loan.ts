/**
 * Pure Mathematical Logic for Auto & Personal Loan Calculation.
 */

export interface LoanFormulaInput {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
}

export interface LoanFormulaResult {
  monthlyPayment: number;
  totalInterestPaid: number;
  totalPaid: number;
}

export function calculateLoanFormula({
  loanAmount,
  interestRate,
  loanTermYears,
}: LoanFormulaInput): LoanFormulaResult {
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  let monthlyPayment = 0;

  if (loanAmount > 0 && totalMonths > 0) {
    if (monthlyRate === 0) {
      monthlyPayment = loanAmount / totalMonths;
    } else {
      monthlyPayment =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
  }

  const totalPaid = monthlyPayment * totalMonths;
  const totalInterestPaid = Math.max(0, totalPaid - loanAmount);

  return {
    monthlyPayment,
    totalInterestPaid,
    totalPaid,
  };
}
