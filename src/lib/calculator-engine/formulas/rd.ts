/**
 * Pure Mathematical Logic for Recurring Deposit (RD) Calculation.
 */

export interface RdFormulaInput {
  monthlyDeposit: number;
  interestRate: number;
  tenureMonths: number;
}

export interface RdFormulaResult {
  totalInvested: number;
  totalInterestEarned: number;
  maturityAmount: number;
}

export function calculateRdFormula({
  monthlyDeposit,
  interestRate,
  tenureMonths,
}: RdFormulaInput): RdFormulaResult {
  const totalInvested = monthlyDeposit * tenureMonths;
  const n = tenureMonths;
  const r = interestRate / 100;

  // Standard quarterly compounding RD formula
  const totalInterestEarned = monthlyDeposit * ((n * (n + 1)) / 2) * (r / 12);
  const maturityAmount = totalInvested + totalInterestEarned;

  return {
    totalInvested,
    totalInterestEarned,
    maturityAmount,
  };
}
