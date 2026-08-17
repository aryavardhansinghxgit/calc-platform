export type CalculationMode = "home_price" | "upfront_cash";
export type LoanPresetType = "conventional" | "fha" | "va" | "usda" | "jumbo";

export interface DownPaymentInput {
  calculationMode: CalculationMode;
  homePrice: number;
  downPaymentPct: number;
  upfrontCashAvailable: number;
  loanTermYears: number;
  interestRate: number;
  propertyTaxAnnual: number;
  homeInsuranceAnnual: number;
  pmiRatePct: number;
  hoaDuesMonthly: number;
  closingCostsPct: number;
  currencySymbol: string;
}

export interface AmortizationRow {
  period: number;
  dateLabel: string;
  beginningBalance: number;
  payment: number;
  principal: number;
  interest: number;
  pmi: number;
  endingBalance: number;
}

export interface DownPaymentResult {
  homePrice: number;
  downPaymentAmount: number;
  downPaymentPct: number;
  loanAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyPmi: number;
  monthlyHoa: number;
  totalMonthlyPayment: number;
  closingCostsAmount: number;
  totalCashToClose: number;
  totalPaymentsOverTerm: number;
  totalInterestOverTerm: number;
  pmiCancellationMonth: number;
  pmiCancellationDateLabel: string;
  pmiTotalCost: number;
  annualAmortization: AmortizationRow[];
  monthlyAmortization: AmortizationRow[];
}

export interface DownPaymentTierRow {
  pct: number;
  downPaymentAmount: number;
  loanAmount: number;
  monthlyPayment: number;
  monthlyPmi: number;
  lifetimePmi: number;
  lifetimeInterest: number;
  totalCashToClose: number;
}

export interface DownPaymentComparisonResult {
  tiers: DownPaymentTierRow[];
}

export interface OpportunityCostInput {
  homePrice: number;
  baseDownPct: number;
  largerDownPct: number;
  interestRate: number;
  investmentReturnRate: number;
  years: number;
}

export interface OpportunityCostResult {
  extraDownAmount: number;
  mortgageInterestSaved: number;
  investmentFutureValue: number;
  netInvestmentAdvantage: number;
  recommendation: string;
}

export interface CashToCloseInput {
  homePrice: number;
  downPaymentAmount: number;
  originationFeePct: number;
  appraisalFee: number;
  titleInsuranceFee: number;
  escrowPrepaidMonths: number;
  propertyTaxAnnual: number;
  homeInsuranceAnnual: number;
}

export interface CashToCloseResult {
  downPaymentAmount: number;
  originationFee: number;
  appraisalFee: number;
  titleInsuranceFee: number;
  escrowPrepaids: number;
  totalClosingCosts: number;
  totalCashToClose: number;
}

export interface LoanProgramComparisonRow {
  programName: string;
  minDownPct: number;
  minDownAmount: number;
  upfrontFeePct: number;
  upfrontFeeAmount: number;
  annualMipRatePct: number;
  monthlyMortgageInsurance: number;
  totalMonthlyPayment: number;
  pmiRules: string;
}

export interface LoanProgramResult {
  programs: LoanProgramComparisonRow[];
}

export interface SavingsGoalInput {
  targetCashGoal: number;
  currentSavings: number;
  monthlySavings: number;
  savingsInterestRate: number;
}

export interface SavingsGoalResult {
  monthsToGoal: number;
  yearsToGoal: number;
  totalInterestEarned: number;
  projectedDateLabel: string;
}

export interface SavedDownPaymentItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
