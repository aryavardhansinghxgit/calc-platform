export interface MortgageModuleInput {
  homePrice: number;
  downPayment: number;
  downPaymentType?: "amount" | "percent";
  interestRate: number;
  loanTermYears: number;
  startMonth?: number; // 1-12
  startYear?: number;
  
  // Advanced Section
  propertyTax?: number;
  propertyTaxType?: "amount" | "percent";
  homeInsurance?: number; // Annual
  pmiRate?: number; // Annual percentage (e.g. 0.5% - 1.5%)
  hoaFee?: number; // Monthly
  otherCosts?: number; // Monthly

  // Annual Increase Settings (%)
  propertyTaxIncrease?: number;
  insuranceIncrease?: number;
  hoaIncrease?: number;
  otherCostsIncrease?: number;

  // Extra Payments
  extraMonthlyPayment?: number;
  extraYearlyPayment?: number;
  extraOneTimePayment?: number;
  extraOneTimeMonth?: number; // 1-12
  extraOneTimeYear?: number;
}

export interface AmortizationRow {
  month: number;
  year: number;
  date: string;
  payment: number;
  principalPaid: number;
  interestPaid: number;
  extraPaid: number;
  propertyTax: number;
  homeInsurance: number;
  pmi: number;
  hoaFee: number;
  otherCosts: number;
  remainingBalance: number;
  totalInterestPaid: number;
}

export interface CostBreakdownItem {
  category: string;
  monthlyFirstYear: number;
  totalLifetime: number;
  percentageOfTotal: number;
  color: string;
}

export interface MortgageModuleOutput {
  loanAmount: number;
  downPaymentAmount: number;
  downPaymentPercent: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyInsurance: number;
  monthlyPmi: number;
  monthlyHoa: number;
  monthlyOtherCosts: number;
  monthlyExtraPayment: number;
  totalInitialMonthlyPayment: number;
  
  totalInterestPaid: number;
  totalBaselineInterestPaid: number;
  interestSavings: number;
  monthsSaved: number;

  totalPrincipalPaid: number;
  totalPropertyTaxPaid: number;
  totalInsurancePaid: number;
  totalPmiPaid: number;
  totalHoaPaid: number;
  totalOtherCostsPaid: number;
  totalCost: number;

  payoffDate: string;
  payoffMonths: number;

  breakdown: CostBreakdownItem[];
  amortizationSchedule: AmortizationRow[];
}
