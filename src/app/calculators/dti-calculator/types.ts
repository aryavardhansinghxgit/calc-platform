export type IncomeFrequency = "monthly" | "annual";

export interface IncomeBreakdown {
  primarySalary: number;
  coBorrowerIncome: number;
  bonusesCommissions: number;
  dividendsAlimonyOther: number;
}

export interface HousingBreakdown {
  mortgageRentPI: number;
  propertyTaxes: number;
  hazardInsurance: number;
  pmiMip: number;
  hoaFees: number;
}

export interface DebtBreakdown {
  autoLoansLeases: number;
  studentLoans: number;
  creditCardMinimums: number;
  personalLoans: number;
  alimonyChildSupportPaid: number;
  otherDebts: number;
}

export interface StandardDTIInput {
  incomeFreq: IncomeFrequency;
  income: IncomeBreakdown;
  housing: HousingBreakdown;
  debts: DebtBreakdown;
  currencySymbol: string;
}

export interface StandardDTIResult {
  grossMonthlyIncome: number;
  totalMonthlyHousing: number;
  totalMonthlyDebt: number;
  totalMonthlyOutflow: number;
  frontEndRatio: number;
  backEndRatio: number;
  disposableIncome: number;
  riskTier: "Ideal / Excellent" | "Manageable / Good" | "Borderline / Stretched" | "High Risk / Critical";
  riskColor: string;
}

export interface LoanEligibilityItem {
  programName: string;
  benchmarkFrontEnd: string;
  benchmarkBackEnd: string;
  maxBackEndWithAUS: string;
  status: "Likely Eligible" | "Compensating Factors Needed" | "Above Maximum DTI Limit";
  statusColor: string;
  notes: string;
}

export interface ReverseTargetIncomeInput {
  desiredHousingCost: number;
  existingMonthlyDebt: number;
  targetBackEndPct: number;
}

export interface ReverseTargetIncomeResult {
  requiredMonthlyGross: number;
  requiredAnnualGross: number;
  targetBackEndPct: number;
}

export interface ReverseMaxHousingInput {
  grossMonthlyIncome: number;
  existingMonthlyDebt: number;
  targetMaxDTIPct: number;
}

export interface ReverseMaxHousingResult {
  maxAllowableHousingPayment: number;
  estimatedHomePrice: number;
  targetMaxDTIPct: number;
}

export interface DebtSimItem {
  id: string;
  label: string;
  monthlyAmount: number;
  paidOff: boolean;
}

export interface DebtSimResult {
  currentBackEndDTI: number;
  simulatedBackEndDTI: number;
  dtiReduction: number;
  monthlyDebtSaved: number;
  increasedHousingCapacity: number;
}

export interface SelfEmployedIncomeInput {
  year1ScheduleCNet: number;
  year2ScheduleCNet: number;
  year1DepreciationAddback: number;
  year2DepreciationAddback: number;
}

export interface SelfEmployedIncomeResult {
  qualifyingMonthlyIncome: number;
  qualifyingAnnualIncome: number;
  year1Total: number;
  year2Total: number;
  trendStatus: "Stable / Growing" | "Declining Income Warning";
}

export interface SavedDTIItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
