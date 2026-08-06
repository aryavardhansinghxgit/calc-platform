export interface MortgageModuleInput {
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTermYears: number;
  propertyTaxRate?: number;
  homeInsuranceAnnual?: number;
  hoaFeeMonthly?: number;
  extraMonthlyPayment?: number;
  startDate?: string;
}

export interface AmortizationRow {
  month: number;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  extraPayment: number;
  remainingBalance: number;
  totalInterestPaid: number;
  date: string;
}

export interface MortgageModuleOutput {
  totalMonthlyPayment: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  hoaFeeMonthly: number;
  loanAmount: number;
  totalInterestPaid: number;
  totalTaxesAndFeesPaid: number;
  totalPaid: number;
  payoffDate: string;
  payoffMonths: number;
  amortizationSchedule: AmortizationRow[];
}

