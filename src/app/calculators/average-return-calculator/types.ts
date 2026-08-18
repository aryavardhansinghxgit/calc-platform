export type CashFlowType = "deposit" | "withdraw";

export interface CashFlowRow {
  id: string;
  type: CashFlowType;
  amount: number;
  date: string;
}

export interface CashFlowCalculatorInputs {
  startingBalance: number;
  startDate: string;
  endingBalance: number;
  endDate: string;
  cashFlows: CashFlowRow[];
}

export interface CashFlowLedgerRow {
  date: string;
  type: string;
  cashFlowAmount: number;
  runningInvested: number;
  daysFromStart: number;
  fractionYears: number;
}

export interface CashFlowCalculatorResult {
  mwrrPercent: number; // Money-Weighted Rate of Return / XIRR % per year
  arrPercent: number; // Accounting Rate of Return % per year
  totalContributions: number;
  totalWithdrawals: number;
  netInvested: number;
  totalGainLoss: number;
  totalDays: number;
  totalYears: number;
  ledger: CashFlowLedgerRow[];
  chartTimeline: {
    date: string;
    label: string;
    invested: number;
    estimatedValue: number;
  }[];
}

export interface MultiPeriodLegRow {
  id: string;
  returnPercent: number;
  years: number;
  months: number;
}

export interface MultiPeriodCalculatorInputs {
  legs: MultiPeriodLegRow[];
}

export interface MultiPeriodScheduleRow {
  period: number;
  returnPercent: number;
  durationYears: number;
  cumulativeReturnPercent: number;
  growthFactor: number;
}

export interface MultiPeriodCalculatorResult {
  cumulativeReturnPercent: number;
  annualizedGeometricReturnPercent: number;
  arithmeticAverageReturnPercent: number;
  annualizedArithmeticReturnPercent: number;
  totalYears: number;
  totalMonthsTotal: number;
  growthMultiplier: number;
  schedule: MultiPeriodScheduleRow[];
}

export interface VolatilityRiskInputs {
  returnsSeries: number[];
  riskFreeRate: number;
  benchmarkReturn: number;
}

export interface VolatilityRiskResult {
  meanReturn: number;
  standardDeviation: number;
  sharpeRatio: number;
  sortinoRatio: number;
  maxDrawdownPercent: number;
  downsideDeviation: number;
  positivePeriods: number;
  negativePeriods: number;
  totalPeriods: number;
}

export interface BenchmarkCompareInputs {
  portfolioAnnualReturn: number;
  timeHorizonYears: number;
  startingCapital: number;
  selectedBenchmarkId: string;
}

export interface BenchmarkData {
  id: string;
  name: string;
  historicalAnnualReturn: number;
  assetClass: string;
}

export interface BenchmarkCompareResult {
  portfolioFinalWealth: number;
  benchmarkFinalWealth: number;
  alphaPercent: number;
  wealthAdvantage: number;
  benchmarkName: string;
  benchmarkRate: number;
  comparisonTable: {
    assetName: string;
    annualReturn: number;
    endingValue: number;
    totalProfit: number;
  }[];
}

export interface SavedAverageReturnItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
