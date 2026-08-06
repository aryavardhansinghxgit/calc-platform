/**
 * Pure Mathematical Logic for Mortgage Calculation.
 */

export interface MortgageFormulaInput {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxRate?: number;
  homeInsuranceAnnual?: number;
  hoaFeeMonthly?: number;
}

export interface MortgageFormulaResult {
  loanAmount: number;
  principalAndInterestMonthly: number;
  propertyTaxMonthly: number;
  homeInsuranceMonthly: number;
  hoaFeeMonthly: number;
  totalMonthlyPayment: number;
  totalInterestPaid: number;
  totalPaid: number;
}

export function calculateMortgageFormula({
  homePrice,
  downPayment,
  interestRate,
  loanTermYears,
  propertyTaxRate = 1.2,
  homeInsuranceAnnual = 1200,
  hoaFeeMonthly = 0,
}: MortgageFormulaInput): MortgageFormulaResult {
  const loanAmount = Math.max(0, homePrice - downPayment);
  const monthlyRate = interestRate / 100 / 12;
  const totalMonths = loanTermYears * 12;

  let principalAndInterestMonthly = 0;

  if (loanAmount > 0 && totalMonths > 0) {
    if (monthlyRate === 0) {
      principalAndInterestMonthly = loanAmount / totalMonths;
    } else {
      principalAndInterestMonthly =
        (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalMonths))) /
        (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }
  }

  const propertyTaxMonthly = (homePrice * (propertyTaxRate / 100)) / 12;
  const homeInsuranceMonthly = homeInsuranceAnnual / 12;
  const totalMonthlyPayment =
    principalAndInterestMonthly + propertyTaxMonthly + homeInsuranceMonthly + hoaFeeMonthly;

  const totalPaid = totalMonthlyPayment * totalMonths;
  const totalInterestPaid = Math.max(
    0,
    principalAndInterestMonthly * totalMonths - loanAmount
  );

  return {
    loanAmount,
    principalAndInterestMonthly,
    propertyTaxMonthly,
    homeInsuranceMonthly,
    hoaFeeMonthly,
    totalMonthlyPayment,
    totalInterestPaid,
    totalPaid,
  };
}
