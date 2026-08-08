export type EmiCalculatorMode = "standard" | "prepayment" | "flat-vs-reducing" | "reverse-solver";
export type PrepaymentStrategy = "reduce-tenure" | "reduce-emi";

export interface EmiInput {
  mode?: EmiCalculatorMode;
  loanAmount?: number;
  interestRate?: number;
  loanTermYears?: number;
  loanTermMonths?: number;
  processingFeeRate?: number; // % of loan
  processingFeeFlat?: number; // Flat fee
  extraMonthlyPrepayment?: number;
  oneTimePrepayment?: number;
  oneTimePrepaymentMonth?: number;
  oneTimePrepaymentYear?: number;
  prepaymentStrategy?: PrepaymentStrategy;
  desiredEmi?: number;
  flatInterestRate?: number;
  startMonth?: number;
  startYear?: number;
}

export interface EmiAmortizationRow {
  paymentNumber: number;
  paymentDate: string;
  beginningBalance: number;
  emiAmount: number;
  principalPaid: number;
  interestPaid: number;
  extraPaid: number;
  endingBalance: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}

export interface AnnualEmiRow {
  year: number;
  beginningBalance: number;
  totalPayment: number;
  principalPaid: number;
  interestPaid: number;
  extraPaid: number;
  endingBalance: number;
}

export interface SavedEmiCalculation {
  id: string;
  name: string;
  dateSaved: string;
  inputs: EmiInput;
  monthlyEmi: number;
}

export interface EmiOutput {
  mode: EmiCalculatorMode;
  prepaymentStrategy: PrepaymentStrategy;
  
  monthlyEmi: number;
  maxLoanAmount: number;
  totalInterestPayable: number;
  totalPrincipal: number;
  processingFeeTotal: number;
  totalCostOfLoan: number;
  totalPaymentsCount: number;
  payoffDate: string;
  interestRatio: number; // % of total cost going to interest

  // Flat Rate Comparison Metrics
  flatRateTotalInterest: number;
  flatVsReducingDifference: number;
  flatRateMonthlyPayment: number;

  // Prepayment Comparison Metrics
  baselineTotalInterest: number;
  baselinePayoffDate: string;
  baselinePaymentsCount: number;
  interestSaved: number;
  timeSavedMonths: number;
  timeSavedYears: number;

  monthlySchedule: EmiAmortizationRow[];
  annualSchedule: AnnualEmiRow[];
}
