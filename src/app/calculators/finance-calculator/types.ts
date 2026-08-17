export type TVMMode = "FV" | "PMT" | "IY" | "N" | "PV";

export interface TVMInput {
  mode: TVMMode;
  n: number; // Number of periods
  iy: number; // Annual interest rate (%)
  pv: number; // Present value ($)
  pmt: number; // Periodic payment ($)
  py: number; // Periods per year (P/Y)
  cy: number; // Compounding periods per year (C/Y)
  pmtTiming: "end" | "beginning"; // Ordinary Annuity (end) vs Annuity Due (beginning)
  inflationRate: number; // Advanced inflation rate (%)
  taxRate: number; // Advanced tax rate (%)
  currencySymbol: string;
}

export interface ScheduleRow {
  period: number;
  pv: number;
  pmt: number;
  interest: number;
  fv: number;
}

export interface TVMResult {
  solvedVariable: TVMMode;
  solvedValue: number;
  fv: number;
  pv: number;
  pmt: number;
  n: number;
  iy: number;
  sumPayments: number;
  totalInterest: number;
  totalCostOrEndValue: number;
  realPurchasingPower: number;
  postTaxValue: number;
  schedule: ScheduleRow[];
}

export interface InflationInput {
  nominalAmount: number;
  inflationRate: number;
  years: number;
}

export interface InflationResult {
  realValue: number;
  purchasingPowerLossPct: number;
  explanation: string;
}

export interface TaxDragInput {
  startingAmount: number;
  annualReturnPct: number;
  taxRatePct: number;
  years: number;
}

export interface TaxDragResult {
  preTaxEndBalance: number;
  postTaxEndBalance: number;
  taxDragAmount: number;
}

export interface MilestoneInput {
  pv: number;
  pmt: number;
  iy: number;
  targetAmount: number;
}

export interface MilestoneResult {
  yearsToTarget: number;
  monthsToTarget: number;
  explanation: string;
}

export interface ScenarioInput {
  pv: number;
  pmt: number;
  n: number;
  rateA: number;
  rateB: number;
}

export interface ScenarioResult {
  fvScenarioA: number;
  fvScenarioB: number;
  difference: number;
  winner: string;
}

export interface SavedFinanceItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
