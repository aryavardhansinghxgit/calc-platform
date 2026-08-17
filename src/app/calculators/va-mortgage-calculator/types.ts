export type MilitaryStatus = "Active/Veteran" | "Reserve/Guard" | "Surviving Spouse";

export interface VAMortgageInput {
  homePrice: number;
  downPaymentPct: number;
  loanTermYears: number;
  interestRate: number;
  militaryStatus: MilitaryStatus;
  usedVALoanBefore: boolean;
  isDisabilityExempt: boolean;
  financeFundingFee: boolean;
  propertyTaxAnnual: number;
  homeInsuranceAnnual: number;
  hoaDuesMonthly: number;
  estimatedClosingCostsPct: number;
  currencySymbol: string;
}

export interface AmortizationRow {
  period: number;
  dateLabel: string;
  beginningBalance: number;
  payment: number;
  principal: number;
  interest: number;
  endingBalance: number;
}

export interface VAMortgageResult {
  downPaymentAmount: number;
  baseLoanAmount: number;
  fundingFeeRatePct: number;
  fundingFeeAmount: number;
  totalFinancedLoanAmount: number;
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyHoa: number;
  totalMonthlyPiti: number;
  totalUpfrontCashRequired: number;
  totalPaymentsOverTerm: number;
  totalInterestOverTerm: number;
  annualAmortization: AmortizationRow[];
  monthlyAmortization: AmortizationRow[];
}

export interface VAVsConvVsFHAInput {
  homePrice: number;
  downPaymentPct: number;
  creditScore: number;
  interestRate: number;
}

export interface VAVsConvVsFHAResult {
  vaMonthlyPiti: number;
  vaUpfrontCash: number;
  va30YrCost: number;
  fhaMonthlyPiti: number;
  fhaUpfrontCash: number;
  fha30YrCost: number;
  convMonthlyPiti: number;
  convUpfrontCash: number;
  conv30YrCost: number;
  vaSavingsOverConv: number;
  vaSavingsOverFHA: number;
}

export interface EntitlementInput {
  targetHomePrice: number;
  priorUsedEntitlement: number;
  countyLoanLimit: number;
}

export interface EntitlementResult {
  fullEntitlementAvailable: boolean;
  maxZeroDownPurchasePrice: number;
  requiredDownPaymentForTarget: number;
  remainingEntitlement: number;
}

export interface BiWeeklyInput {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
}

export interface BiWeeklyResult {
  monthlyPayment: number;
  biWeeklyPayment: number;
  monthlyTotalInterest: number;
  biWeeklyTotalInterest: number;
  interestSaved: number;
  monthsSaved: number;
  yearsSaved: number;
}

export interface ExtraPaymentsInput {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  extraMonthlyPayment: number;
}

export interface ExtraPaymentsResult {
  originalMonths: number;
  newMonths: number;
  monthsSaved: number;
  interestSaved: number;
}

export interface IRRRLInput {
  existingBalance: number;
  currentRate: number;
  newRate: number;
  closingCosts: number;
}

export interface IRRRLResult {
  currentMonthlyPmt: number;
  newMonthlyPmt: number;
  monthlySavings: number;
  irrrlFundingFee: number;
  breakEvenMonths: number;
  lifetimeSavings5Yr: number;
}

export interface SavedVAItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
