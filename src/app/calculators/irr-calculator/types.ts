export interface AnnualCashFlowRow {
  year: number;
  amount: number;
}

export interface CoreIrrInputs {
  initialOutlay: number; // e.g. 40000 or 50000 (positive number representing outflow at t=0)
  cashFlows: AnnualCashFlowRow[];
  hurdleRate: number; // e.g. 12% WACC
  reinvestmentRate: number; // e.g. 10%
  financingRate: number; // e.g. 8%
}

export interface AnnualDiscountScheduleRow {
  year: number;
  cashFlow: number;
  discountFactor: number;
  presentValue: number;
  cumulativeCashFlow: number;
  cumulativeDiscountedValue: number;
}

export interface CoreIrrResult {
  irrPercent: number;
  mirrPercent: number;
  npv: number;
  profitabilityIndex: number;
  simplePaybackYears: number;
  discountedPaybackYears: number;
  totalInflows: number;
  netProfit: number;
  isAccept: boolean;
  schedule: AnnualDiscountScheduleRow[];
  signChangesCount: number;
  hasMultipleRoots: boolean;
}

export interface FixedCashFlowInputs {
  initialInvestment: number;
  holdingYears: number;
  holdingMonths: number;
  endingBalance: number;
  recurringPayment: number;
  direction: "withdraw" | "deposit";
  frequency: "monthly" | "quarterly" | "semiAnnually" | "annually";
  timing: "beginning" | "end";
}

export interface FixedCashFlowResult {
  annualCompoundedIrr: number;
  nominalAnnualIrr: number;
  totalPeriodicFlows: number;
  netCashReceived: number;
  totalWealthMultiple: number;
  totalPeriods: number;
  schedule: {
    period: number;
    cashFlow: number;
    endingBalance: number;
  }[];
}

export interface NpvSensitivityPoint {
  rate: number;
  npv: number;
}

export interface MultiProjectInputs {
  projectAOutlay: number;
  projectAFlows: number[];
  projectBOutlay: number;
  projectBFlows: number[];
  costOfCapital: number;
}

export interface MultiProjectResult {
  projectAIrr: number;
  projectANpv: number;
  projectBIrr: number;
  projectBNpv: number;
  crossoverRate: number; // Fisher's rate
  recommendedProject: "Project A" | "Project B" | "Both" | "Neither";
  reasoning: string;
}

export interface SavedIrrItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
