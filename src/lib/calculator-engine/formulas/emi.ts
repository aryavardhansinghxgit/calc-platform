/**
 * Pure Mathematical Logic for Equated Monthly Installment (EMI) Calculation.
 */

export interface EmiFormulaInput {
  principal: number;
  interestRate: number;
  tenureMonths: number;
}

export interface EmiFormulaResult {
  monthlyEmi: number;
  totalInterestPayable: number;
  totalPayment: number;
}

export function calculateEmiFormula({
  principal,
  interestRate,
  tenureMonths,
}: EmiFormulaInput): EmiFormulaResult {
  const monthlyRate = interestRate / 100 / 12;

  let monthlyEmi = 0;

  if (principal > 0 && tenureMonths > 0) {
    if (monthlyRate === 0) {
      monthlyEmi = principal / tenureMonths;
    } else {
      monthlyEmi =
        (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) /
        (Math.pow(1 + monthlyRate, tenureMonths) - 1);
    }
  }

  const totalPayment = monthlyEmi * tenureMonths;
  const totalInterestPayable = Math.max(0, totalPayment - principal);

  return {
    monthlyEmi,
    totalInterestPayable,
    totalPayment,
  };
}
