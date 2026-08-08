export type CurrentLoanMode = "remaining-balance" | "original-amount" | "payoff-amount";

export type RefinanceType =
  | "rate-and-term"
  | "cash-out"
  | "cash-in"
  | "debt-consolidation"
  | "mortgage"
  | "student-loan"
  | "auto-loan"
  | "personal-loan";

export type RefinanceGoal =
  | "reduce-payment"
  | "reduce-interest"
  | "shorten-loan"
  | "access-equity"
  | "consolidate-debt";

export interface ItemizedClosingCosts {
  applicationFee?: number;
  appraisalFee?: number;
  originationFee?: number;
  pointsCost?: number;
  titleFee?: number;
  recordingFee?: number;
  inspectionFee?: number;
  surveyFee?: number;
  customFee?: number;
}

export interface ConsolidatedDebtItem {
  id: string;
  name: string;
  balance: number;
  interestRate: number;
  monthlyPayment: number;
}

export interface RefinanceInput {
  currentLoanMode?: CurrentLoanMode;
  remainingBalance?: number; // Default 250000
  originalLoanAmount?: number; // Default 300000
  originalLoanTermYears?: number; // Default 30
  yearsPaid?: number; // Default 5
  payoffAmount?: number; // Default 250000
  currentMonthlyPayment?: number; // Default 1800
  currentInterestRate?: number; // Default 7.0%
  remainingTermYears?: number; // Derived or explicit

  newLoanTermYears?: number; // Default 20
  newInterestRate?: number; // Default 6.0%
  discountPoints?: number; // Default 2
  closingCosts?: number; // Default 1500
  cashOutAmount?: number; // Default 0

  // Cash-Out & Equity Fields
  homeMarketValue?: number; // Default 400000
  maxLtvPercent?: number; // Default 80%

  // Debt Consolidation Fields
  consolidatedDebts?: ConsolidatedDebtItem[];

  // Refinance Goal & Itemized Fees
  refinanceGoal?: RefinanceGoal;
  itemizedCosts?: ItemizedClosingCosts;

  propertyTaxAnnual?: number;
  insuranceAnnual?: number;
  hoaMonthly?: number;
  pmiMonthly?: number;
  extraMonthlyPayment?: number;
  refinanceType?: RefinanceType;
}

export interface RefinanceTimelinePoint {
  month: number;
  currentPaid: number;
  newPaid: number;
  netDifference: number;
}

export interface AmortizationComparisonRow {
  month: number;
  currentPayment: number;
  currentPrincipal: number;
  currentInterest: number;
  currentBalance: number;
  newPayment: number;
  newPrincipal: number;
  newInterest: number;
  newBalance: number;
}

export interface RefinanceOutput {
  currentRemainingBalance: number;
  currentMonthlyPayment: number;
  currentRemainingInterest: number;
  currentRemainingMonths: number;

  newLoanAmount: number; // Principal + Cash Out + Points if financed
  newMonthlyPayment: number;
  newLoanTotalInterest: number;

  monthlySavings: number;
  monthlySavingsPercent: number;

  closingCosts: number;
  pointsCost: number;
  itemizedTotalCosts: number;
  cashOutAmount: number;
  totalRefinanceCost: number;

  breakEvenMonths: number;
  breakEvenYears: number;

  interestSaved: number;
  netSavings: number;
  totalCostReduction: number;
  interestReductionPercent: number;

  // Refinance Rating & Score (0 - 100)
  refinanceScore: number;
  refinanceRating: "Excellent" | "Good" | "Average" | "Poor";
  isRecommended: boolean;
  recommendationReasons: string[];

  // Cash-Out & Equity Metrics
  availableEquity: number;
  maxBorrowableAmount: number;
  cashReceived: number;
  newLtvRatio: number;

  // Debt Consolidation Metrics
  totalConsolidatedDebt: number;
  consolidatedMonthlyPayment: number;
  blendedInterestRate: number;
  debtConsolidationMonthlySavings: number;

  // Schedules & Insights
  timelineData: RefinanceTimelinePoint[];
  amortizationComparisonSchedule: AmortizationComparisonRow[];
  aiInsights: {
    summary: string;
    benefits: string[];
    risks: string[];
  };
}

export interface SavedRefinanceCalculation {
  id: string;
  name: string;
  dateSaved: string;
  inputs: RefinanceInput;
  monthlySavings: number;
  netSavings: number;
  breakEvenMonths: number;
  refinanceScore: number;
  refinanceRating: string;
}
