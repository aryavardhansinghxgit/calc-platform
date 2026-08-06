export interface CompoundInterestInput {
  principal: number;
  monthlyDeposit: number;
  annualRate: number;
  years: number;
  compoundFrequencyPerYear: number; // 12 for monthly, 1 for annually, 4 for quarterly
}

export interface CompoundInterestResult {
  totalPrincipal: number;
  totalDeposits: number;
  totalInterestEarned: number;
  futureValue: number;
}

export function calculateCompoundInterest(
  input: CompoundInterestInput
): CompoundInterestResult {
  const { principal, monthlyDeposit, annualRate, years, compoundFrequencyPerYear } = input;
  const r = annualRate / 100;
  const n = compoundFrequencyPerYear || 12;
  const t = years;

  let balance = principal;
  let totalDeposits = 0;

  const totalMonths = t * 12;
  const monthlyRate = r / 12;

  for (let m = 1; m <= totalMonths; m++) {
    balance = (balance + monthlyDeposit) * (1 + monthlyRate);
    totalDeposits += monthlyDeposit;
  }

  const totalInvested = principal + totalDeposits;
  const totalInterestEarned = Math.max(0, balance - totalInvested);

  return {
    totalPrincipal: principal,
    totalDeposits,
    totalInterestEarned,
    futureValue: balance,
  };
}
