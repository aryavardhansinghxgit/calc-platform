/**
 * Pure Mathematical Logic for Fixed Deposit (FD) Calculation.
 */

export interface FdFormulaInput {
  depositAmount: number;
  interestRate: number;
  tenureYears: number;
  compoundingFrequency?: number; // 4 for quarterly, 12 for monthly, 1 for annual
}

export interface FdFormulaResult {
  depositAmount: number;
  totalInterestEarned: number;
  maturityAmount: number;
}

export function calculateFdFormula({
  depositAmount,
  interestRate,
  tenureYears,
  compoundingFrequency = 4,
}: FdFormulaInput): FdFormulaResult {
  const r = interestRate / 100;
  const n = compoundingFrequency;
  const t = tenureYears;

  const maturityAmount = depositAmount * Math.pow(1 + r / n, n * t);
  const totalInterestEarned = Math.max(0, maturityAmount - depositAmount);

  return {
    depositAmount,
    totalInterestEarned,
    maturityAmount,
  };
}
