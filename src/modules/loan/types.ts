export type LoanCalculatorMode = "monthly-payment" | "loan-amount" | "loan-term" | "interest-rate";
export type PaymentFrequency = "monthly" | "biweekly" | "weekly";

export interface LoanInput {
  mode?: LoanCalculatorMode;
  loanAmount?: number;
  interestRate?: number;
  loanTermYears?: number;
  loanTermMonths?: number;
  desiredPayment?: number;
  paymentFrequency?: PaymentFrequency;
  extraMonthlyPayment?: number;
  startMonth?: number;
  startYear?: number;
}

export interface LoanAmortizationRow {
  paymentNumber: number;
  paymentDate: string;
  beginningBalance: number;
  paymentAmount: number;
  principalPaid: number;
  interestPaid: number;
  extraPaid: number;
  endingBalance: number;
  cumulativeInterest: number;
  cumulativePrincipal: number;
}

export interface SavedLoanCalculation {
  id: string;
  name: string;
  dateSaved: string;
  inputs: LoanInput;
  periodicPayment: number;
}

export interface LoanOutput {
  mode: LoanCalculatorMode;
  paymentFrequency: PaymentFrequency;
  
  // Tab 1 & Tab 2 Outputs
  monthlyPayment: number; // Base monthly payment
  periodicPayment: number; // Payment based on selected frequency (Monthly, Biweekly, Weekly)
  maxLoanAmount: number;
  
  // Tab 3 Outputs
  requiredTermMonths: number;
  requiredTermYears: number;
  
  // Tab 4 Outputs
  estimatedInterestRate: number;
  estimatedApr: number;

  // General Summary Metrics
  totalPaymentsCount: number;
  totalInterest: number;
  totalRepayment: number;
  payoffDate: string;
  interestPercentage: number; // Percentage of total payment that goes to interest

  // Extra Payment Comparison Metrics
  baselineTotalInterest: number;
  baselinePayoffDate: string;
  baselinePaymentsCount: number;
  interestSaved: number;
  timeSavedMonths: number;
  timeSavedYears: number;

  // Detailed Amortization Schedule
  amortizationSchedule: LoanAmortizationRow[];
}
