export interface EmiInput {
  loanAmount: number;
  interestRate: number; // annual %
  tenureMonths: number;
}

export interface EmiResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  principalPercentage: number;
  interestPercentage: number;
}

export function calculateEmi(input: EmiInput): EmiResult {
  const { loanAmount, interestRate, tenureMonths } = input;
  const r = interestRate / 100 / 12;
  const n = tenureMonths;

  let emi = 0;
  if (r > 0 && n > 0) {
    emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  } else if (n > 0) {
    emi = loanAmount / n;
  }

  const totalPayment = emi * n;
  const totalInterest = Math.max(0, totalPayment - loanAmount);
  const principalPercentage = totalPayment > 0 ? (loanAmount / totalPayment) * 100 : 0;
  const interestPercentage = totalPayment > 0 ? (totalInterest / totalPayment) * 100 : 0;

  return {
    monthlyEmi: emi,
    totalInterest,
    totalPayment,
    principalPercentage,
    interestPercentage,
  };
}
