export type ClosingCostTreatment = "upfront" | "deducted" | "financed";
export type EquityCalcMode = "amount" | "max_ltv";

export interface HomeEquityInput {
  calcMode: EquityCalcMode;
  homeValue: number;
  currentMortgageBalance: number;
  cltvLimitPct: number;
  loanAmount: number;
  loanTermYears: number;
  interestRate: number;
  closingCostsAmount: number;
  closingCostTreatment: ClosingCostTreatment;
  currencySymbol: string;
}

export interface AmortizationRow {
  period: number; // Month or Year number
  dateLabel: string;
  beginningBalance: number;
  payment: number;
  principal: number;
  interest: number;
  endingBalance: number;
}

export interface HomeEquityResult {
  maxBorrowableEquity: number;
  actualLoanAmount: number;
  currentLtvPct: number;
  newCltvPct: number;
  unencumberedEquity: number;
  totalFinancedLoanAmount: number;
  monthlyPayment: number;
  netProceedsDisbursed: number;
  totalRepayment: number;
  totalInterestPaid: number;
  totalCostOfLoan: number;
  trueApr: number;
  annualAmortization: AmortizationRow[];
  monthlyAmortization: AmortizationRow[];
}

export interface CLTVSolverInput {
  homeValue: number;
  currentMortgageBalance: number;
  cltvCapPct: number;
}

export interface CLTVSolverResult {
  maxAllowableTotalDebt: number;
  maxBorrowableEquity: number;
  currentLtv: number;
  cltvCap: number;
  unencumberedEquity: number;
}

export interface LoanVsHelocVsRefiInput {
  homeValue: number;
  currentBalance: number;
  currentRate: number;
  cashNeeded: number;
  fixedEquityRate: number;
  helocRate: number;
  refiRate: number;
}

export interface LoanVsHelocVsRefiResult {
  equityLoanMonthly: number;
  equityLoan5YrCost: number;
  equityLoanTotalCost: number;
  helocDrawMonthly: number;
  heloc5YrCost: number;
  helocTotalCost: number;
  refiNewMonthly: number;
  refi5YrCost: number;
  refiTotalCost: number;
  recommendation: string;
}

export interface DebtConsolidationInput {
  creditCardBalance: number;
  creditCardRate: number;
  personalLoanBalance: number;
  personalLoanRate: number;
  autoLoanBalance: number;
  autoLoanRate: number;
  equityLoanRate: number;
  equityLoanTermYears: number;
}

export interface DebtConsolidationResult {
  totalHighInterestDebt: number;
  currentCombinedMonthlyPayment: number;
  newConsolidatedMonthlyPayment: number;
  monthlyCashFlowSavings: number;
  currentTotalInterestToPay: number;
  newConsolidatedInterest: number;
  lifetimeInterestSaved: number;
}

export interface ImprovementROIInput {
  currentHomeValue: number;
  existingMortgage: number;
  projectCost: number;
  expectedAppreciationPct: number;
  loanRate: number;
  loanTermYears: number;
}

export interface ImprovementROIResult {
  renovationLoanAmount: number;
  monthlyPayment: number;
  valueAddedToHome: number;
  projectedPostRenovationHomeValue: number;
  newNetHomeEquity: number;
  netEquityGain: number;
}

export interface PrepaymentInput {
  loanAmount: number;
  interestRate: number;
  loanTermYears: number;
  extraMonthlyPayment: number;
  extraAnnualLumpSum: number;
}

export interface PrepaymentResult {
  originalMonths: number;
  newMonths: number;
  monthsSaved: number;
  yearsSaved: number;
  interestSaved: number;
}

export interface EquityDTIInput {
  grossMonthlyIncome: number;
  proposedHousingPayment: number;
  existingMonthlyDebt: number;
}

export interface EquityDTIResult {
  frontEndDTI: number;
  backEndDTI: number;
  statusColor: "green" | "yellow" | "red";
  statusText: string;
}

export interface TaxDeductionInput {
  annualInterestPaid: number;
  isUsedForHomeImprovement: boolean;
  marginalTaxBracketPct: number;
}

export interface TaxDeductionResult {
  isDeductible: boolean;
  projectedAnnualTaxSavings: number;
  effectiveInterestRate: number;
  statusExplanation: string;
}

export interface SavedHomeEquityItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
