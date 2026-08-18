export type PaycheckFrequency = "daily" | "weekly" | "biweekly" | "semimonthly" | "monthly" | "annually";
export type FilingStatus = "single" | "married_joint" | "married_separate" | "head_of_household";

export interface PreTaxDeductionInputs {
  retirement401k: number; // 401k / 403b / 457
  healthDentalVision: number; // Medical, dental, vision insurance
  hsaFsa: number; // Health savings account / FSA
  transitCommuter: number; // Commuter benefits
  otherPreTax: number;
}

export interface PostTaxDeductionInputs {
  roth401k: number; // Roth contributions
  garnishmentsChildSupport: number;
  unionDuesCharity: number;
  otherPostTax: number;
}

export interface W4FormAdjustments {
  multipleJobsStep2c: boolean;
  claimDependentsStep3: number; // $2,000 per child, $500 per other dependent
  otherIncomeStep4a: number; // Annual
  extraDeductionsStep4b: number; // Annual
  extraWithholdingStep4c: number; // Per paycheck
}

export interface TakeHomePayInputs {
  grossPay: number; // Per pay period or annual
  isGrossAnnual: boolean;
  frequency: PaycheckFrequency;
  filingStatus: FilingStatus;
  stateCode: string;
  stateTaxRatePercent: number; // e.g. 5.0%
  localTaxRatePercent: number; // e.g. 1.0%
  isFicaExempt: boolean;
  preTaxDeductions: PreTaxDeductionInputs;
  postTaxDeductions: PostTaxDeductionInputs;
  w4Adjustments: W4FormAdjustments;
}

export interface PaycheckLineItem {
  name: string;
  perPeriod: number;
  annual: number;
  percentageOfGross: number;
}

export interface TakeHomePayResult {
  periodsPerYear: number;
  grossPayPerPeriod: number;
  grossPayAnnual: number;
  totalPreTaxDeductionsPerPeriod: number;
  totalPreTaxDeductionsAnnual: number;
  federalTaxableWagesPerPeriod: number;
  federalTaxableWagesAnnual: number;
  federalIncomeTaxPerPeriod: number;
  federalIncomeTaxAnnual: number;
  socialSecurityTaxPerPeriod: number;
  socialSecurityTaxAnnual: number;
  medicareTaxPerPeriod: number;
  medicareTaxAnnual: number;
  stateIncomeTaxPerPeriod: number;
  stateIncomeTaxAnnual: number;
  localTaxPerPeriod: number;
  localTaxAnnual: number;
  totalTaxesPerPeriod: number;
  totalTaxesAnnual: number;
  totalPostTaxDeductionsPerPeriod: number;
  totalPostTaxDeductionsAnnual: number;
  netTakeHomePayPerPeriod: number;
  netTakeHomePayAnnual: number;
  takeHomePercentage: number;
  lineItems: PaycheckLineItem[];
}

export interface HourlyOvertimeInputs {
  hourlyRate: number;
  regularHoursPerWeek: number;
  overtimeHoursPerWeek: number;
  doubleTimeHoursPerWeek: number;
  tipsAndCommissionsPerPeriod: number;
  frequency: PaycheckFrequency;
  effectiveTaxRatePercent: number;
}

export interface HourlyOvertimeResult {
  regularPay: number;
  overtimePay: number;
  doubleTimePay: number;
  totalGrossPay: number;
  annualGrossPay: number;
  estimatedTaxes: number;
  netTakeHomePay: number;
  effectiveNetHourlyRate: number;
}

export interface BonusTaxInputs {
  regularSalaryAnnual: number;
  bonusAmount: number;
  filingStatus: FilingStatus;
  stateTaxRatePercent: number;
  localTaxRatePercent: number;
  method: "percentage" | "aggregate";
}

export interface BonusTaxResult {
  grossBonus: number;
  federalWithholding: number;
  federalRatePercent: number;
  socialSecurityTax: number;
  medicareTax: number;
  stateTax: number;
  localTax: number;
  totalBonusTaxes: number;
  netTakeHomeBonus: number;
  bonusRetentionPercent: number;
}

export interface RelocationStateComparisonPoint {
  stateName: string;
  stateTaxRatePercent: number;
  grossSalary: number;
  stateTaxAnnual: number;
  netTakeHomeAnnual: number;
  netTakeHomeMonthly: number;
  differenceVsOrigin: number;
}

export interface ReverseSalaryInputs {
  targetNetPerPeriod: number;
  frequency: PaycheckFrequency;
  estimatedTaxAndDeductionPercent: number; // e.g. 28%
}

export interface ReverseSalaryResult {
  requiredGrossPerPeriod: number;
  requiredGrossAnnual: number;
  requiredHourlyRate: number;
  estimatedTaxesPerPeriod: number;
}

export interface Budget503020Result {
  netMonthlyPay: number;
  needs50Monthly: number;
  needs50Annual: number;
  wants30Monthly: number;
  wants30Annual: number;
  savings20Monthly: number;
  savings20Annual: number;
}

export interface SavedPaycheckItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
