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
  cashOutAmount: number;
  totalRefinanceCost: number;

  breakEvenMonths: number;
  breakEvenYears: number;

  interestSaved: number;
  netSavings: number;
  totalCostReduction: number;
  interestReductionPercent: number;

  isRecommended: boolean;
  recommendationReasons: string[];

  timelineData: RefinanceTimelinePoint[];
}

export interface SavedRefinanceCalculation {
  id: string;
  name: string;
  dateSaved: string;
  inputs: RefinanceInput;
  monthlySavings: number;
  netSavings: number;
  breakEvenMonths: number;
}
