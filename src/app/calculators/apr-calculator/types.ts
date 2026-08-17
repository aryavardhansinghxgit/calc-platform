export type CompoundingFrequency = "monthly" | "semi-annually" | "annually" | "continuous";
export type PaybackFrequency = "monthly" | "bi-weekly" | "weekly";

export interface StandardAPRInput {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  loanTermMonths: number;
  upfrontFees: number;
  compounding: CompoundingFrequency;
  payback: PaybackFrequency;
  currencySymbol: string;
}

export interface StandardAPRResult {
  realAPR: number;
  nominalRate: number;
  periodicPayment: number;
  totalPayments: number;
  totalInterest: number;
  totalFees: number;
  amountFinanced: number;
  aprGap: number;
}

export interface MortgageAPRInput {
  houseValue: number;
  downPayment: number;
  loanTermYears: number;
  interestRate: number;
  loanFees: number;
  pointsPct: number;
  pmiPerYear: number;
}

export interface MortgageAPRResult {
  loanAmount: number;
  downPaymentAmount: number;
  pointsFee: number;
  totalUpfrontFees: number;
  monthlyPayment: number;
  realAPR: number;
  totalPayments: number;
  totalInterest: number;
}

export interface CreditCardAPRInput {
  balance: number;
  apr: number;
  minPaymentPct: number;
  minPaymentFloor: number;
  extraMonthlyPayment: number;
}

export interface CreditCardAPRResult {
  monthsToPayoff: number;
  yearsToPayoff: number;
  totalInterestPaid: number;
  totalAmountPaid: number;
  interestSaved: number;
}

export interface ReverseAPRInput {
  desiredMonthlyPayment: number;
  loanTermYears: number;
  upfrontFees: number;
  targetAPR: number;
}

export interface ReverseAPRResult {
  maxBorrowingCapacity: number;
  baseInterestRate: number;
  totalFinanceCharges: number;
}

export interface LoanOfferItem {
  id: string;
  name: string;
  loanAmount: number;
  nominalRate: number;
  loanTermYears: number;
  upfrontFees: number;
}

export interface LoanOfferResult {
  id: string;
  name: string;
  realAPR: number;
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  totalFees: number;
  isBestValue: boolean;
}

export interface PrepaymentInput {
  loanAmount: number;
  nominalRate: number;
  loanTermYears: number;
  upfrontFees: number;
  extraMonthlyPayment: number;
}

export interface PrepaymentResult {
  originalMonths: number;
  newMonths: number;
  monthsSaved: number;
  originalTotalInterest: number;
  newTotalInterest: number;
  interestSaved: number;
  realizedAPR: number;
}

export interface SavedAPRItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
