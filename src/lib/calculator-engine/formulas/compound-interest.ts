/**
 * Pure Mathematical Logic for Compound Interest Calculation.
 */

export interface CompoundInterestFormulaInput {
  principal: number;
  annualInterestRate: number;
  years: number;
  compoundingFrequency?: number; // 12 for monthly, 4 for quarterly, 1 for annual
}

export interface CompoundInterestFormulaResult {
  principal: number;
  totalInterestEarned: number;
  futureValue: number;
}

export function calculateCompoundInterestFormula({
  principal,
  annualInterestRate,
  years,
  compoundingFrequency = 12,
}: CompoundInterestFormulaInput): CompoundInterestFormulaResult {
  const rate = annualInterestRate / 100;
  const n = compoundingFrequency;
  const t = years;

  const futureValue = principal * Math.pow(1 + rate / n, n * t);
  const totalInterestEarned = Math.max(0, futureValue - principal);

  return {
    principal,
    totalInterestEarned,
    futureValue,
  };
}
