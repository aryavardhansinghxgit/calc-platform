export interface MortgageInput {
  homeValue: number;
  downPayment: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxAnnual?: number;
  insuranceAnnual?: number;
}

export interface MortgageResult {
  principal: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalCost: number;
  amortizationSchedule: Array<{
    year: number;
    balance: number;
    interestPaid: number;
    principalPaid: number;
  }>;
}

export function calculateMortgage(input: MortgageInput): MortgageResult {
  const principal = Math.max(0, input.homeValue - input.downPayment);
  const monthlyRate = input.interestRate / 100 / 12;
  const totalPayments = input.loanTermYears * 12;

  let monthlyPAndI = 0;
  if (monthlyRate > 0 && totalPayments > 0) {
    monthlyPAndI =
      (principal * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);
  } else if (totalPayments > 0) {
    monthlyPAndI = principal / totalPayments;
  }

  const monthlyTax = (input.propertyTaxAnnual || 0) / 12;
  const monthlyIns = (input.insuranceAnnual || 0) / 12;
  const totalMonthlyPayment = monthlyPAndI + monthlyTax + monthlyIns;
  const totalCost = totalMonthlyPayment * totalPayments;
  const totalInterestPaid = Math.max(0, monthlyPAndI * totalPayments - principal);

  const amortizationSchedule = [];
  let balance = principal;

  for (let year = 1; year <= input.loanTermYears; year++) {
    let yearInterest = 0;
    let yearPrincipal = 0;
    for (let m = 1; m <= 12; m++) {
      const interestPayment = balance * monthlyRate;
      const principalPayment = Math.min(balance, monthlyPAndI - interestPayment);
      yearInterest += interestPayment;
      yearPrincipal += principalPayment;
      balance = Math.max(0, balance - principalPayment);
    }
    amortizationSchedule.push({
      year,
      balance: Math.round(balance),
      interestPaid: Math.round(yearInterest),
      principalPaid: Math.round(yearPrincipal),
    });
  }

  return {
    principal,
    monthlyPrincipalAndInterest: monthlyPAndI,
    monthlyPropertyTax: monthlyTax,
    monthlyInsurance: monthlyIns,
    totalMonthlyPayment,
    totalInterestPaid,
    totalCost,
    amortizationSchedule,
  };
}
