export type PayFrequencyUnit =
  | "hourly"
  | "daily"
  | "weekly"
  | "biWeekly"
  | "semiMonthly"
  | "monthly"
  | "quarterly"
  | "annually";

export interface UniversalSalaryInputs {
  salaryAmount: number; // e.g. 50
  frequency: PayFrequencyUnit; // e.g. "hourly"
  hoursPerWeek: number; // e.g. 40
  daysPerWeek: number; // e.g. 5
  holidaysPerYear: number; // e.g. 10
  vacationDaysPerYear: number; // e.g. 15
}

export interface FrequencyConversionRow {
  period: string; // e.g. "Hourly", "Daily", "Weekly", "Bi-weekly", "Semi-monthly", "Monthly", "Quarterly", "Annual"
  unadjustedAmount: number;
  adjustedAmount: number;
  frequencyDescription: string;
}

export interface UniversalSalaryResult {
  unadjustedAnnual: number;
  adjustedAnnual: number;
  unadjustedMonthly: number;
  adjustedMonthly: number;
  unadjustedBiWeekly: number;
  adjustedBiWeekly: number;
  unadjustedHourly: number;
  adjustedHourly: number;
  totalWorkingDays: number;
  adjustedWorkingDays: number;
  conversionMatrix: FrequencyConversionRow[];
}

export interface TakeHomeTaxInputs {
  grossAnnualSalary: number; // e.g. 104000
  filingStatus: "single" | "married" | "headOfHousehold";
  stateCode: string; // e.g. "TX", "CA", "NY", "FL", "WA", etc.
  monthlyPreTaxDeductions: number; // 401k, HSA, health insurance
}

export interface TakeHomeTaxResult {
  grossAnnual: number;
  taxableIncome: number;
  federalIncomeTax: number;
  stateIncomeTax: number;
  socialSecurityTax: number;
  medicareTax: number;
  totalFicaTax: number;
  totalTaxes: number;
  preTaxDeductionsAnnual: number;
  netTakeHomeAnnual: number;
  netTakeHomeMonthly: number;
  netTakeHomeBiWeekly: number;
  netTakeHomeHourly: number;
  effectiveTaxRatePercent: number;
}

export interface OvertimeBoosterInputs {
  baseHourlyRate: number; // e.g. 35
  regularHoursPerWeek: number; // e.g. 40
  overtimeHoursPerWeek: number; // 1.5x, e.g. 5
  doubleTimeHoursPerWeek: number; // 2.0x, e.g. 2
  annualBonusCommissions: number; // e.g. 5000
}

export interface OvertimeBoosterResult {
  baseWeeklyPay: number;
  overtimeWeeklyPay: number;
  doubleTimeWeeklyPay: number;
  totalWeeklyGross: number;
  totalAnnualGross: number;
  effectiveHourlyRate: number;
}

export interface CostOfLivingInputs {
  currentSalary: number; // e.g. 75000
  sourceCityKey: string; // e.g. "austin"
  targetCityKey: string; // e.g. "nyc"
}

export interface CostOfLivingResult {
  equivalentSalary: number;
  percentageDifference: number; // e.g. +45.2%
  housingDeltaPercent: number;
  sourceCityName: string;
  targetCityName: string;
}

export interface ReverseSalaryInputs {
  desiredNetMonthly: number; // e.g. 5000
  estimatedTaxRatePercent: number; // e.g. 25.0
  hoursPerWeek: number; // e.g. 40
  daysPerWeek: number; // e.g. 5
}

export interface ReverseSalaryResult {
  requiredGrossAnnual: number;
  requiredGrossMonthly: number;
  requiredGrossHourly: number;
}

export interface SavedSalaryItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
