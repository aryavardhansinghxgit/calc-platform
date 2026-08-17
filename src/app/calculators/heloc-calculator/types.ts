export type ClosingCostTreatment = "upfront" | "deducted" | "financed";
export type DrawPaymentStructure = "interest_only" | "principal_and_interest";

export interface HELOCInput {
  homeValue: number;
  currentMortgageBalance: number;
  cltvLimitPct: number;
  creditLineAmount: number;
  drawPeriodYears: number;
  drawPaymentStructure: DrawPaymentStructure;
  repaymentPeriodYears: number;
  interestRate: number;
  closingCostsAmount: number;
  closingCostTreatment: ClosingCostTreatment;
  annualMaintenanceFee: number;
  currencySymbol: string;
}

export interface AmortizationRow {
  period: number;
  dateLabel: string;
  phase: "Draw (Interest-Only)" | "Repayment (Amortizing)";
  beginningBalance: number;
  payment: number;
  principal: number;
  interest: number;
  annualFee: number;
  endingBalance: number;
}

export interface HELOCResult {
  maxBorrowableCreditLine: number;
  actualCreditLine: number;
  initialCltvPct: number;
  fullyDrawnCltvPct: number;
  unencumberedEquity: number;
  drawPeriodMonthlyPayment: number;
  repaymentPeriodMonthlyPayment: number;
  paymentShockDollarIncrease: number;
  paymentShockPctIncrease: number;
  totalDrawPeriodPayments: number;
  totalRepaymentPeriodPayments: number;
  totalLifetimePayments: number;
  totalInterestPaid: number;
  totalAnnualFeesPaid: number;
  annualAmortization: AmortizationRow[];
  monthlyAmortization: AmortizationRow[];
}

export interface StressTestInput {
  drawnBalance: number;
  wsjPrimeRate: number;
  lenderMargin: number;
  rateScenario: "+1" | "+2" | "+3" | "cap";
  lifetimeCapPct: number;
  repayYears: number;
}

export interface StressTestResult {
  currentRate: number;
  stressedRate: number;
  currentDrawPayment: number;
  stressedDrawPayment: number;
  currentRepayPayment: number;
  stressedRepayPayment: number;
  monthlyIncrease: number;
  pctIncrease: number;
}

export interface MultiDrawInput {
  creditLine: number;
  initialDraw: number;
  futureDrawAmount: number;
  futureDrawYear: number;
  extraMonthlyPrincipal: number;
  interestRate: number;
  drawYears: number;
  repayYears: number;
}

export interface MultiDrawResult {
  totalDrawnCapital: number;
  balanceAtDrawEnd: number;
  drawPhaseMonthlyPayment: number;
  repaymentPhaseMonthlyPayment: number;
  interestSaved: number;
}

export interface HelocVsLoanVsRefiInput {
  homeValue: number;
  currentBalance: number;
  currentRate: number;
  cashNeeded: number;
  helocRate: number;
  fixedLoanRate: number;
  refiRate: number;
}

export interface HelocVsLoanVsRefiResult {
  helocDrawMonthly: number;
  helocRepayMonthly: number;
  heloc5YrCost: number;
  helocTotalCost: number;
  fixedLoanMonthly: number;
  fixedLoan5YrCost: number;
  fixedLoanTotalCost: number;
  refiNewMonthly: number;
  refi5YrCost: number;
  refiTotalCost: number;
  recommendation: string;
}

export interface HelocDebtConsolidationInput {
  creditCardBalance: number;
  creditCardRate: number;
  helocRate: number;
  drawYears: number;
  repayYears: number;
}

export interface HelocDebtConsolidationResult {
  currentCombinedMonthlyPayment: number;
  helocDrawPayment: number;
  helocRepayPayment: number;
  monthlyCashFlowSavingsDrawPhase: number;
  currentTotalInterestToPay: number;
  helocTotalInterestPaid: number;
  lifetimeInterestSaved: number;
}

export interface HelocTaxInput {
  annualInterestPaid: number;
  isUsedForHomeImprovement: boolean;
  marginalTaxBracketPct: number;
  helocRate: number;
}

export interface HelocTaxResult {
  isDeductible: boolean;
  projectedAnnualTaxSavings: number;
  effectiveInterestRate: number;
  statusExplanation: string;
}

export interface SavedHELOCItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
