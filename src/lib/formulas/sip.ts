export interface SipInput {
  monthlyInvestment: number;
  expectedReturnAnnual: number;
  tenureYears: number;
}

export interface SipResult {
  totalInvested: number;
  estimatedReturns: number;
  totalValue: number;
  growthSchedule: Array<{
    year: number;
    invested: number;
    value: number;
    returns: number;
  }>;
}

export function calculateSip(input: SipInput): SipResult {
  const { monthlyInvestment, expectedReturnAnnual, tenureYears } = input;
  const i = expectedReturnAnnual / 100 / 12;
  const totalMonths = tenureYears * 12;

  let totalValue = 0;
  let totalInvested = 0;
  const growthSchedule = [];

  let currentVal = 0;
  for (let yr = 1; yr <= tenureYears; yr++) {
    for (let m = 1; m <= 12; m++) {
      currentVal = (currentVal + monthlyInvestment) * (1 + i);
      totalInvested += monthlyInvestment;
    }
    growthSchedule.push({
      year: yr,
      invested: Math.round(totalInvested),
      value: Math.round(currentVal),
      returns: Math.max(0, Math.round(currentVal - totalInvested)),
    });
  }

  totalValue = currentVal;
  const estimatedReturns = Math.max(0, totalValue - totalInvested);

  return {
    totalInvested,
    estimatedReturns,
    totalValue,
    growthSchedule,
  };
}
