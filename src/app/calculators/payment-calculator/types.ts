export type PaymentFrequency = "monthly" | "biweekly" | "accelerated_biweekly" | "weekly";

export interface AmortizationScheduleRow {
  period: number;
  year?: number;
  payment: number;
  principal: number;
  interest: number;
  extraPayment: number;
  totalInterestToDate: number;
  endingBalance: number;
}

export interface FixedTermPaymentInputs {
  loanAmount: number;
  termYears: number;
  termMonths: number;
  interestRate: number; // Annual % (e.g. 6.0%)
  frequency: PaymentFrequency;
  upfrontFees: number;
  extraMonthlyPayment: number;
  extraAnnualPayment: number;
  oneTimeLumpSum: number;
  oneTimeLumpSumMonth: number;
}

export interface FixedTermPaymentResult {
  paymentPerPeriod: number;
  totalPaymentsCount: number;
  totalAmountPaid: number;
  totalInterestPaid: number;
  payoffMonths: number;
  payoffYears: number;
  principalPercentage: number;
  interestPercentage: number;
  interestSavedWithExtra: number;
  monthsShavedOff: number;
  trueAprPercent: number;
  annualSchedule: AmortizationScheduleRow[];
  monthlySchedule: AmortizationScheduleRow[];
}

export interface FixedPaymentDurationInputs {
  loanAmount: number;
  monthlyPayment: number;
  interestRate: number;
}

export interface FixedPaymentDurationResult {
  isInterestTrap: boolean;
  minPaymentToCoverInterest: number;
  payoffMonths: number;
  payoffYears: number;
  payoffDays: number;
  totalAmountPaid: number;
  totalInterestPaid: number;
}

export interface AffordableLoanAmountInputs {
  targetMonthlyPayment: number;
  termYears: number;
  termMonths: number;
  interestRate: number;
}

export interface AffordableLoanAmountResult {
  maxBorrowableLoanAmount: number;
  totalAmountPaid: number;
  totalInterestPaid: number;
}

export interface BiWeeklyComparisonResult {
  monthlyPayment: number;
  monthlyTotalInterest: number;
  monthlyTotalPaid: number;
  monthlyPayoffYears: number;
  acceleratedBiWeeklyPayment: number;
  acceleratedTotalInterest: number;
  acceleratedTotalPaid: number;
  acceleratedPayoffYears: number;
  interestSaved: number;
  yearsShaved: number;
}

export interface LoanOfferOption {
  id: string;
  name: string;
  loanAmount: number;
  termYears: number;
  interestRate: number;
  upfrontFees: number;
}

export interface LoanOfferComparisonResult {
  name: string;
  monthlyPayment: number;
  totalInterest: number;
  totalCost: number;
  trueApr: number;
}

export interface SavedPaymentItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
