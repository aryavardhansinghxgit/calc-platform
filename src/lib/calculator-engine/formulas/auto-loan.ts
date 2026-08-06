import { PMT } from "@/lib/finance/financial-math";

export interface AutoLoanInput {
  vehiclePrice: number;
  downPayment: number;
  tradeInValue: number;
  salesTaxRate: number;
  fees: number;
  interestRate: number;
  loanTermMonths: number;
}

export interface AutoLoanResult {
  monthlyPayment: number;
  loanAmount: number;
  totalInterestPaid: number;
  totalSalesTax: number;
  totalFees: number;
  totalPayment: number;
  totalOutofPocketCost: number;
}

/**
 * Calculates complete Auto Loan financial breakdown.
 */
export function calculateAutoLoanFormula(inputs: AutoLoanInput): AutoLoanResult {
  const vehiclePrice = Math.max(0, Number(inputs.vehiclePrice) || 0);
  const downPayment = Math.max(0, Number(inputs.downPayment) || 0);
  const tradeInValue = Math.max(0, Number(inputs.tradeInValue) || 0);
  const salesTaxRate = Math.max(0, Number(inputs.salesTaxRate) || 0);
  const fees = Math.max(0, Number(inputs.fees) || 0);
  const interestRate = Math.max(0, Number(inputs.interestRate) || 0);
  const loanTermMonths = Math.max(1, Math.min(120, Number(inputs.loanTermMonths) || 60));

  // 1. Calculate taxable & financed portion
  const totalUpfront = downPayment + tradeInValue;
  const taxableAmount = Math.max(0, vehiclePrice - totalUpfront);
  const totalSalesTax = taxableAmount * (salesTaxRate / 100);
  const grossCost = vehiclePrice + totalSalesTax + fees;
  const loanAmount = Math.max(0, grossCost - totalUpfront);

  if (loanAmount <= 0) {
    return {
      monthlyPayment: 0,
      loanAmount: 0,
      totalInterestPaid: 0,
      totalSalesTax: Math.round(totalSalesTax * 100) / 100,
      totalFees: fees,
      totalPayment: 0,
      totalOutofPocketCost: downPayment + tradeInValue + totalSalesTax + fees,
    };
  }

  // 2. Calculate monthly loan payment
  let monthlyPayment = 0;
  if (interestRate === 0) {
    monthlyPayment = loanAmount / loanTermMonths;
  } else {
    const monthlyRate = interestRate / 100 / 12;
    monthlyPayment = PMT(monthlyRate, loanTermMonths, loanAmount);
  }

  const totalPayment = monthlyPayment * loanTermMonths;
  const totalInterestPaid = Math.max(0, totalPayment - loanAmount);
  const totalOutofPocketCost = downPayment + tradeInValue + totalPayment;

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    loanAmount: Math.round(loanAmount * 100) / 100,
    totalInterestPaid: Math.round(totalInterestPaid * 100) / 100,
    totalSalesTax: Math.round(totalSalesTax * 100) / 100,
    totalFees: fees,
    totalPayment: Math.round(totalPayment * 100) / 100,
    totalOutofPocketCost: Math.round(totalOutofPocketCost * 100) / 100,
  };
}
