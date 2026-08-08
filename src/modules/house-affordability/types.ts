export type DtiOption = "conventional" | "fha" | "va" | "custom";
export type DownPaymentType = "amount" | "percent";

export interface IncomeAffordabilityInput {
  annualIncome?: number; // Default 120000
  loanTermYears?: number; // 10, 15, 20, 25, 30 years
  interestRate?: number; // %
  monthlyDebt?: number; // Existing debts
  downPayment?: number; // Amount or percent
  downPaymentType?: DownPaymentType;
  propertyTaxRate?: number; // % annually
  hoaFeeRate?: number; // % annually
  insuranceRate?: number; // % annually
  dtiOption?: DtiOption;
  customDtiPercent?: number; // 10% to 50%
}

export interface BudgetAffordabilityInput {
  housingBudget?: number; // Default 3500/mo
  loanTermYears?: number;
  interestRate?: number;
  downPayment?: number;
  downPaymentType?: DownPaymentType;
  includeTaxesFees?: boolean;
  propertyTaxRate?: number;
  hoaFeeRate?: number;
  insuranceRate?: number;
  maintenanceRate?: number;
}

export interface ScheduleMonthRow {
  month: number;
  date: string;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

export interface IncomeAffordabilityOutput {
  maxHomePrice: number;
  maxLoanAmount: number;
  requiredDownPayment: number;
  monthlyMortgagePmt: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyHoa: number;
  totalMonthlyHousingCost: number;
  frontEndRatio: number;
  backEndRatio: number;
  schedulePreview: ScheduleMonthRow[];
  fullSchedule: ScheduleMonthRow[];
}

export interface BudgetAffordabilityOutput {
  maxHomePrice: number;
  maxLoanAmount: number;
  requiredDownPayment: number;
  monthlyMortgagePmt: number;
  monthlyTax: number;
  monthlyInsurance: number;
  monthlyHoa: number;
  monthlyMaintenance: number;
  totalMonthlyHousingCost: number;
}

export interface SavedAffordabilityCalculation {
  id: string;
  name: string;
  dateSaved: string;
  incomeInputs: IncomeAffordabilityInput;
  maxHomePrice: number;
  monthlyPayment: number;
}
