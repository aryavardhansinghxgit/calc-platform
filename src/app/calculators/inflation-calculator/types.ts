export interface CpiDataPoint {
  year: number;
  avg: number;
  months?: number[]; // [Jan, Feb, ..., Dec]
}

export interface HistoricalInflationInputs {
  amount: number;
  startYear: number;
  startMonth: number; // 0 = Average, 1 = Jan, ..., 12 = Dec
  targetYear: number;
  targetMonth: number; // 0 = Average, 1 = Jan, ..., 12 = Dec
}

export interface HistoricalInflationResult {
  startCpi: number;
  targetCpi: number;
  equivalentAmount: number;
  cumulativeInflationPercent: number;
  annualizedInflationPercent: number;
  purchasingPowerLossPercent: number;
  yearsSpan: number;
}

export interface ForwardInflationInputs {
  currentAmount: number;
  expectedAnnualRatePercent: number;
  years: number;
}

export interface ForwardInflationResult {
  futureCost: number;
  realPurchasingPower: number;
  totalInflationIncrease: number;
  totalInflationPercent: number;
}

export interface BackwardInflationInputs {
  currentAmount: number;
  averageAnnualRatePercent: number;
  yearsInPast: number;
}

export interface BackwardInflationResult {
  pastEquivalentValue: number;
  totalInflationPercent: number;
  purchasingPowerChangePercent: number;
}

export interface RealWageInputs {
  pastSalary: number;
  pastYear: number;
  currentSalary: number;
  currentYear: number;
}

export interface RealWageResult {
  pastSalaryAdjusted: number;
  nominalWageChangeDollar: number;
  nominalWageChangePercent: number;
  realWageChangeDollar: number;
  realWageChangePercent: number;
  isRealPayRaise: boolean;
}

export interface RealInvestmentReturnInputs {
  principal: number;
  nominalReturnPercent: number;
  inflationRatePercent: number;
  taxRatePercent: number;
  years: number;
}

export interface RealInvestmentReturnResult {
  nominalFutureValue: number;
  realFutureValue: number;
  nominalAnnualReturnPercent: number;
  realAnnualReturnPercent: number;
  inflationDragDollar: number;
  taxDragDollar: number;
}

export interface SavedInflationItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
