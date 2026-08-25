export type LoanCalculatorMode =
  | "standard"
  | "extra-payment"
  | "comparison"
  | "affordability"
  | "duration"
  | "refinance"
  | "deferred"
  | "bond"
  | "monthly-payment" // legacy compatibility
  | "loan-amount"     // legacy compatibility
  | "loan-term"       // legacy compatibility
  | "interest-rate";  // legacy compatibility

export type PaymentFrequency =
  | "monthly"
  | "biweekly"
  | "accelerated-biweekly"
  | "weekly"
  | "accelerated-weekly"
  | "semi-monthly"
  | "quarterly";

export type CompoundingFrequency =
  | "monthly"
  | "annually"
  | "semi-annually"
  | "quarterly"
  | "daily";

export interface LoanInput {
  mode?: LoanCalculatorMode;
  loanAmount?: number;
  interestRate?: number;
  loanTermYears?: number;
  loanTermMonths?: number;
  desiredPayment?: number;
  paymentFrequency?: PaymentFrequency;
  compoundingFrequency?: CompoundingFrequency;
  
  // Fees & Points
  originationFeePct?: number;
  upfrontFeesDollar?: number;
  pointsPct?: number;

  // Balloon
  balloonAmount?: number;

  // Extra Payments
  extraMonthlyPayment?: number;
  extraAnnualPayment?: number;
  oneTimeLumpSum?: number;
  oneTimeLumpSumMonth?: number;

  // Start Date
  startMonth?: number;
  startYear?: number;

  // Deferred Loan / Bond Specific
  faceValue?: number; // for bond
  maturityPayment?: number; // for deferred

  // Refinance Specific
  currentBalance?: number;
  currentRate?: number;
  currentRemainingMonths?: number;
  refinanceRate?: number;
  refinanceTermYears?: number;
  refinanceClosingCosts?: number;
  cashOutAmount?: number;
}

export interface LoanAmortizationRow {
  paymentNumber: number;
  paymentDate: string;
  beginningBalance: number;
  paymentAmount: number;
  principalPaid: number;
  interestPaid: number;
  extraPaid: number;
  feesPaid?: number;
  endingBalance: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}

export interface AnnualAmortizationRow {
  year: number;
  beginningBalance: number;
  totalPayment: number;
  principalPaid: number;
  interestPaid: number;
  extraPaid: number;
  endingBalance: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}

export interface LoanOfferComparison {
  id: string;
  name: string;
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  fees: number;
  paymentFrequency: PaymentFrequency;
  periodicPayment: number;
  monthlyEquivalentPayment: number;
  totalInterest: number;
  totalCost: number;
  effectiveApr: number;
  payoffMonths: number;
  payoffDate: string;
}

export interface RefinanceAnalysisResult {
  currentMonthlyPayment: number;
  currentRemainingInterest: number;
  currentRemainingTotal: number;
  newMonthlyPayment: number;
  newTotalInterest: number;
  newTotalLoanCost: number;
  monthlySavings: number;
  lifetimeInterestSavings: number;
  netLifetimeSavings: number; // interest saved minus closing costs
  breakEvenMonths: number;
  isBeneficial: boolean;
}

export interface SavedLoanCalculation {
  id: string;
  name: string;
  dateSaved: string;
  inputs: LoanInput;
  periodicPayment: number;
  totalInterest: number;
  totalCost: number;
}

export interface LoanOutput {
  mode: LoanCalculatorMode;
  paymentFrequency: PaymentFrequency;
  compoundingFrequency: CompoundingFrequency;

  // Primary Metrics
  loanAmount: number;
  monthlyPayment: number;
  periodicPayment: number;
  monthlyEquivalentPayment: number;
  totalPaymentsCount: number;
  totalInterest: number;
  totalPrincipal: number;
  totalUpfrontFees: number;
  netProceeds: number;
  totalCost: number;
  totalRepayment: number; // legacy alias for totalCost
  nominalRate: number;
  effectiveAnnualRate: number;
  effectiveApr: number;
  estimatedApr: number; // legacy alias for effectiveApr
  estimatedInterestRate: number; // legacy alias
  payoffDate: string;
  interestPercentage: number;
  balloonAmount: number;

  // Extra Payment / Prepayment Metrics
  baselineTotalInterest: number;
  baselinePayoffDate: string;
  baselinePaymentsCount: number;
  interestSaved: number;
  timeSavedMonths: number;
  timeSavedYears: number;

  // Solvers
  maxLoanAmount: number; // legacy alias
  maxAffordableLoan?: number;
  requiredTermMonths?: number;
  requiredTermYears?: number;
  solvedInterestRate?: number;

  // Deferred & Bond
  maturityAmount?: number;
  initialAmountReceived?: number;
  totalDeferredInterest?: number;

  // Refinance
  refinanceAnalysis?: RefinanceAnalysisResult;

  // Comparisons
  comparisonOffers?: LoanOfferComparison[];

  // Amortization Schedules
  amortizationSchedule: LoanAmortizationRow[];
  annualSchedule: AnnualAmortizationRow[];
}
