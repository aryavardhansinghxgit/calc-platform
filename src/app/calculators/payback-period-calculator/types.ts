export interface AnnualPaybackFlowRow {
  year: number;
  amount: number;
}

export interface IrregularPaybackInputs {
  initialInvestment: number; // e.g. 100000
  discountRate: number; // e.g. 10.0 (%)
  cashFlows: AnnualPaybackFlowRow[];
}

export interface PaybackScheduleRow {
  year: number;
  nominalCashFlow: number;
  discountFactor: number;
  discountedCashFlow: number;
  cumulativeNominalCashFlow: number;
  unrecoveredNominalBalance: number;
  cumulativeDiscountedCashFlow: number;
  unrecoveredDiscountedBalance: number;
}

export interface PaybackPeriodResult {
  simplePaybackYears: number;
  simplePaybackFormatted: string; // e.g. "3.88 Years (3 yrs, 10 mos, 15 days)"
  simpleBreakevenAchieved: boolean;
  discountedPaybackYears: number;
  discountedPaybackFormatted: string; // e.g. "5.45 Years (5 yrs, 5 mos, 13 days)"
  discountedBreakevenAchieved: boolean;
  npv: number;
  irrPercent: number;
  profitabilityIndex: number;
  totalNominalInflows: number;
  netNominalProfit: number;
  totalDiscountedInflows: number;
  schedule: PaybackScheduleRow[];
}

export interface FixedPaybackInputs {
  initialInvestment: number; // e.g. 100000
  annualCashFlow: number; // e.g. 30000
  annualIncreaseRate: number; // e.g. 5.0 (%)
  numberYears: number; // e.g. 5
  discountRate: number; // e.g. 10.0 (%)
}

export interface FixedPaybackResult {
  simplePaybackYears: number;
  simplePaybackFormatted: string;
  simpleBreakevenAchieved: boolean;
  discountedPaybackYears: number;
  discountedPaybackFormatted: string;
  discountedBreakevenAchieved: boolean;
  npv: number;
  totalNominalInflows: number;
  netNominalProfit: number;
  closedFormDppUniform: number;
  schedule: PaybackScheduleRow[];
}

export interface MonthlyPaybackInputs {
  initialInvestment: number; // e.g. 25000
  monthlyCashFlow: number; // e.g. 1200
  annualDiscountRate: number; // e.g. 8.0 (%)
  holdingMonths: number; // e.g. 36
}

export interface MonthlyPaybackResult {
  simplePaybackMonths: number;
  simplePaybackFormatted: string;
  discountedPaybackMonths: number;
  discountedPaybackFormatted: string;
  npv: number;
  totalInflows: number;
  schedule: {
    month: number;
    nominalFlow: number;
    discountedFlow: number;
    cumulativeNominal: number;
    cumulativeDiscounted: number;
  }[];
}

export interface ProjectCompareInputs {
  outlayA: number;
  flowsA: number[];
  outlayB: number;
  flowsB: number[];
  discountRate: number;
}

export interface ProjectCompareResult {
  paybackA: number;
  dppA: number;
  npvA: number;
  postPaybackProfitA: number;
  paybackB: number;
  dppB: number;
  npvB: number;
  postPaybackProfitB: number;
  recommendation: "Project A" | "Project B" | "Both" | "Neither";
  reasoning: string;
}

export interface TargetHurdleInputs {
  initialInvestment: number;
  targetPaybackYears: number;
  discountRate: number;
  projectLifeYears: number;
}

export interface TargetHurdleResult {
  requiredAnnualCashFlowSimple: number;
  requiredAnnualCashFlowDiscounted: number;
  maxAllowableInvestmentForTarget: number;
  isFeasible: boolean;
}

export interface SensitivityMatrixCell {
  discountRate: number;
  cashFlowVariancePercent: number;
  simplePaybackYears: number;
  discountedPaybackYears: number;
  npv: number;
}

export interface SavedPaybackItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
