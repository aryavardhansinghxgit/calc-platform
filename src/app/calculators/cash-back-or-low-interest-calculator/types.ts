export interface CashBackInput {
  cashBackAmount: number;
  highInterestRate: number;
  lowInterestRate: number;
  autoPrice: number;
  loanTermMonths: number;
  downPayment: number;
  tradeInValue: number;
  stateCode?: string;
  salesTaxRate: number;
  fees: number;
  includeFeesInLoan: boolean;
  taxAfterRebate: boolean;
  reinvestmentRate: number;
  currencySymbol: string;
}

export interface OfferDetails {
  totalLoanAmount: number;
  salesTax: number;
  upfrontPayment: number;
  monthlyPayment: number;
  totalPayments: number;
  totalInterest: number;
  totalCost: number;
}

export interface MonthAmortizationRow {
  month: number;
  cashBackBalance: number;
  cashBackPayment: number;
  cashBackInterest: number;
  lowInterestBalance: number;
  lowInterestPayment: number;
  lowInterestInterest: number;
}

export interface CashBackResult {
  winningOffer: "Low Interest Rate Offer" | "Cash Back Offer" | "Tie";
  winningMessage: string;
  subMessage: string;
  savingsAmount: number;
  breakevenRate: number;
  cashBackOffer: OfferDetails;
  lowInterestOffer: OfferDetails;
  amortizationSchedule: MonthAmortizationRow[];
}

export interface BreakevenRateInput {
  autoPrice: number;
  cashBackAmount: number;
  lowInterestRate: number;
  loanTermMonths: number;
}

export interface BreakevenRateResult {
  breakevenRate: number;
  explanation: string;
}

export interface ReinvestmentInput {
  cashBackAmount: number;
  reinvestmentRate: number;
  monthlySavings: number;
  loanTermMonths: number;
}

export interface ReinvestmentResult {
  futureReinvestedRebate: number;
  futureMonthlySavings: number;
  winner: string;
  explanation: string;
}

export interface MultiOfferInput {
  autoPrice: number;
  loanTermMonths: number;
  offer1Rebate: number;
  offer1Rate: number;
  offer2Rebate: number;
  offer2Rate: number;
  offer3Rebate: number;
  offer3Rate: number;
}

export interface MultiOfferResult {
  offer1TotalCost: number;
  offer2TotalCost: number;
  offer3TotalCost: number;
  bestOfferName: string;
}

export interface EarlyPayoffInput {
  autoPrice: number;
  cashBackAmount: number;
  highRate: number;
  lowRate: number;
  payoffMonth: number;
  loanTermMonths: number;
}

export interface EarlyPayoffResult {
  cashBackEarlyCost: number;
  lowInterestEarlyCost: number;
  earlyWinner: string;
  interestSaved: number;
}

export interface NegativeEquityInput {
  tradeInValue: number;
  existingLoanBalance: number;
  autoPrice: number;
  cashBackAmount: number;
  highRate: number;
  lowRate: number;
  loanTermMonths: number;
}

export interface NegativeEquityResult {
  netTradeInEquity: number;
  isNegativeEquity: boolean;
  rolledInAmount: number;
  cashBackMonthly: number;
  lowInterestMonthly: number;
  recommendation: string;
}

export interface SavedCashBackItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
