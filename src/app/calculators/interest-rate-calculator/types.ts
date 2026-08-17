export interface AmortizationLoanInput {
  loanAmount: number;
  years: number;
  months: number;
  monthlyPayment: number;
  upfrontFees: number;
  balloonPayment: number;
}

export interface AmortizationRow {
  period: number;
  balance: number;
  payment: number;
  principal: number;
  interest: number;
}

export interface AmortizationLoanResult {
  statedInterestRate: number; // % annual nominal
  trueApr: number; // % annual APR including upfront fees
  totalInterest: number;
  totalRepayment: number;
  interestToPrincipalRatio: number; // %
  monthlyPayment: number;
  schedule: AmortizationRow[];
  iterationsCount: number;
  converged: boolean;
}

export type CompoundingFrequency =
  | "annual"
  | "semiannual"
  | "quarterly"
  | "monthly"
  | "biweekly"
  | "weekly"
  | "daily"
  | "continuous";

export interface LumpSumInput {
  startingPrincipal: number;
  endingBalance: number;
  years: number;
  months: number;
  days: number;
  compoundingFrequency: CompoundingFrequency;
}

export interface CompoundingComparisonItem {
  frequencyLabel: string;
  nominalRate: number;
  apy: number;
  futureValue: number;
}

export interface LumpSumResult {
  annualNominalRate: number;
  effectiveAnnualRate: number; // APY %
  totalEarnings: number;
  percentageRoi: number; // %
  totalYears: number;
  compoundingComparison: CompoundingComparisonItem[];
}

export type DepositTiming = "end" | "beginning";
export type ContributionFrequency = "monthly" | "quarterly" | "annually";

export interface PeriodicContributionInput {
  startingBalance: number;
  periodicContribution: number;
  contributionFrequency: ContributionFrequency;
  depositTiming: DepositTiming;
  targetBalance: number;
  years: number;
  months: number;
}

export interface PeriodicContributionResult {
  requiredAnnualRate: number; // %
  effectiveApy: number; // %
  totalContributed: number;
  totalInterestEarned: number;
  schedule: { period: number; balance: number; contribution: number; interest: number }[];
  converged: boolean;
}

export interface RateConverterInput {
  nominalRate: number; // %
  compoundingFrequency: CompoundingFrequency;
}

export interface RateConverterResult {
  nominalRate: number; // %
  effectiveAnnualRate: number; // APY / EAR %
  monthlyCompoundedApr: number; // %
  dailyCompoundedApr: number; // %
  continuousRate: number; // %
}

export interface FisherTaxInput {
  nominalRate: number; // %
  inflationRate: number; // %
  taxRate: number; // %
}

export interface FisherTaxResult {
  nominalRate: number;
  taxDragAmount: number;
  afterTaxNominalYield: number; // %
  realPurchasingPowerYield: number; // % (Fisher Equation)
  explanation: string;
}

export interface SavedInterestRateItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
