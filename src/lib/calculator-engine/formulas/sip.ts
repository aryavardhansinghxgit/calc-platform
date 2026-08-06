/**
 * Pure Mathematical Logic for Systematic Investment Plan (SIP) Calculation.
 */

export interface SipFormulaInput {
  monthlyInvestment: number;
  expectedReturnRate: number;
  timePeriodYears: number;
}

export interface SipFormulaResult {
  totalInvested: number;
  estimatedReturns: number;
  totalMaturityValue: number;
}

export function calculateSipFormula({
  monthlyInvestment,
  expectedReturnRate,
  timePeriodYears,
}: SipFormulaInput): SipFormulaResult {
  const monthlyRate = expectedReturnRate / 100 / 12;
  const totalMonths = timePeriodYears * 12;

  const totalInvested = monthlyInvestment * totalMonths;
  let totalMaturityValue = 0;

  if (monthlyRate === 0) {
    totalMaturityValue = totalInvested;
  } else {
    totalMaturityValue =
      monthlyInvestment *
      ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate) *
      (1 + monthlyRate);
  }

  const estimatedReturns = Math.max(0, totalMaturityValue - totalInvested);

  return {
    totalInvested,
    estimatedReturns,
    totalMaturityValue,
  };
}
