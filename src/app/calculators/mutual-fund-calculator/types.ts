export interface MutualFundInputs {
  initialInvestment: number;
  monthlyContribution: number;
  annualContribution: number;
  expectedAnnualReturn: number;
  holdingYears: number;
  holdingMonths: number;
  frontEndLoad: number;
  deferredBackEndLoad: number;
  expenseRatio: number;
  redemptionFee?: number;
}

export interface YearScheduleRow {
  year: number;
  month: number;
  startingBalance: number;
  contributions: number;
  grossInterestEarned: number;
  operatingExpenses: number;
  endingBalance: number;
  cumulativePrincipal: number;
  cumulativeFees: number;
}

export interface MutualFundStandardResult {
  endingValue: number;
  totalPrincipal: number;
  totalContributions: number;
  initialInvestment: number;
  netReturn: number;
  netIrrPercent: number;
  salesCharge: number;
  deferredSalesCharge: number;
  operatingExpenses: number;
  redemptionFee: number;
  totalChargesAndFees: number;
  grossEndingValueNoFees: number;
  grossProfitNoFees: number;
  feeDragPercent: number;
  schedule: YearScheduleRow[];
  shareData: {
    label: string;
    value: number;
    color: string;
    percent: number;
  }[];
}

export interface ActiveVsIndexInputs {
  initialInvestment: number;
  monthlyContribution: number;
  expectedGrossReturn: number;
  activeExpenseRatio: number;
  activeFrontLoad: number;
  indexExpenseRatio: number;
  indexFrontLoad: number;
}

export interface ActiveVsIndexComparisonYear {
  years: number;
  totalInvested: number;
  activeEndingValue: number;
  activeTotalFees: number;
  indexEndingValue: number;
  indexTotalFees: number;
  wealthAdvantage: number;
  feeSavings: number;
}

export interface ActiveVsIndexResult {
  comparisons: ActiveVsIndexComparisonYear[];
  summary30YrLoss: number;
}

export interface SipStepUpInputs {
  initialInvestment: number;
  startingMonthlySIP: number;
  annualStepUpPercent: number;
  expectedReturn: number;
  expenseRatio: number;
  timeHorizonYears: number;
}

export interface SipStepUpRow {
  year: number;
  monthlyDeposit: number;
  annualContributions: number;
  cumulativeInvested: number;
  endingBalance: number;
  totalFees: number;
}

export interface SipStepUpResult {
  endingBalance: number;
  totalInvested: number;
  totalProfit: number;
  netIrr: number;
  totalFees: number;
  schedule: SipStepUpRow[];
}

export interface CdscInputs {
  initialInvestment: number;
  yearsHeld: number;
  expectedAnnualReturn: number;
  expenseRatio: number;
  taperSchedule: { year: number; feePercent: number }[];
}

export interface CdscScheduleRow {
  year: number;
  cdscRate: number;
  projectedGrossValue: number;
  exitPenaltyDollar: number;
  netPayoutToInvestor: number;
}

export interface CdscResult {
  holdingYearSelected: number;
  applicableCdscPercent: number;
  estimatedGrossValue: number;
  redemptionPenalty: number;
  netCashReceived: number;
  schedule: CdscScheduleRow[];
}

export interface InflationTaxInputs {
  initialInvestment: number;
  monthlyContribution: number;
  expectedGrossReturn: number;
  expenseRatio: number;
  holdingYears: number;
  annualInflationRate: number;
  capitalGainsTaxRate: number;
}

export interface InflationTaxResult {
  nominalEndingValue: number;
  totalPrincipal: number;
  nominalProfit: number;
  estimatedTaxAmount: number;
  afterTaxEndingBalance: number;
  realPurchasingPowerBalance: number;
  inflationPurchasingPowerLoss: number;
}

export interface TargetGoalInputs {
  targetWealth: number;
  timeHorizonYears: number;
  expectedGrossReturn: number;
  expenseRatio: number;
  frontEndLoad: number;
  solveFor: "monthly" | "lumpSum";
}

export interface TargetGoalResult {
  targetWealth: number;
  requiredAmount: number;
  solveFor: "monthly" | "lumpSum";
  totalInvested: number;
  totalProfit: number;
  totalEstimatedFees: number;
}

export interface SavedMutualFundItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
