export interface AmortizationInput {
  loanAmount: number;
  loanTermYears: number;
  loanTermMonths: number;
  interestRate: number;
  startMonth?: number; // 1-12
  startYear?: number;

  showExtraPayments?: boolean;
  extraMonthlyPayment?: number;
  extraYearlyPayment?: number;
  extraOneTimePayment?: number;
  extraStartMonth?: number; // 1-12
  extraStartYear?: number;
}

export interface AmortizationRow {
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

export interface AnnualAmortizationRow {
  year: number;
  beginningBalance: number;
  totalPayment: number;
  principalPaid: number;
  interestPaid: number;
  extraPaid: number;
  endingBalance: number;
}

export interface SavedAmortizationCalculation {
  id: string;
  name: string;
  dateSaved: string;
  inputs: AmortizationInput;
  monthlyPayment: number;
}

export interface AmortizationOutput {
  monthlyPayment: number;
  totalPaymentsCount: number;
  totalPrincipal: number;
  totalInterest: number;
  totalAmountPaid: number;
  loanPayoffDate: string;

  // Comparison metrics (Baseline vs Extra Payment)
  baselineMonthlyPayment: number;
  baselineTotalInterest: number;
  baselineTotalAmountPaid: number;
  baselinePayoffDate: string;
  baselineTotalPaymentsCount: number;

  interestSaved: number;
  timeSavedMonths: number;
  timeSavedYears: number;

  monthlySchedule: AmortizationRow[];
  annualSchedule: AnnualAmortizationRow[];
}
