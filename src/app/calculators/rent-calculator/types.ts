export type IncomeFrequency = "annual" | "monthly" | "hourly";

export type AffordabilityRule = "25" | "30" | "35" | "40x" | "custom";

export interface IncomeAffordabilityInput {
  incomeFrequency: IncomeFrequency;
  grossIncome: number;
  hoursPerWeek?: number;
  monthlyDebt: number;
  rulePreset: AffordabilityRule;
  customPercent?: number;
  currency: string;
}

export interface IncomeAffordabilityResult {
  maxMonthlyRent: number;
  recommendedLow: number;
  recommendedHigh: number;
  frontEndRatio: number;
  backEndRatio: number;
  remainingDiscretionary: number;
  dtiStatus: "Comfortable" | "Moderate" | "Rent-Burdened" | "Severely Rent-Burdened";
  statusColor: string;
}

export interface Budget503020Input {
  monthlyTakeHome: number;
  needsPercent: number;
  wantsPercent: number;
  savingsPercent: number;
}

export interface Budget503020Result {
  needsAmount: number;
  wantsAmount: number;
  savingsAmount: number;
  maxRentFromNeeds: number;
  utilitiesGroceriesFromNeeds: number;
}

export interface TrueCostInput {
  baseRent: number;
  electricityGas: number;
  waterSewerTrash: number;
  internetCable: number;
  rentersInsurance: number;
  parkingFee: number;
  petRent: number;
  amenityHoaFee: number;
}

export interface TrueCostResult {
  totalMonthlyOverhead: number;
  additionalOverhead: number;
  percentOverhead: number;
  annualOverhead: number;
}

export interface UpfrontCostInput {
  monthlyBaseRent: number;
  securityDepositMonths: number;
  includeFirstMonth: boolean;
  includeLastMonth: boolean;
  applicationFees: number;
  movingExpenses: number;
  initialFurniture: number;
  utilityDeposits: number;
}

export interface UpfrontCostResult {
  totalUpfrontCash: number;
  leasePrepayments: number;
  oneTimeMoveInFees: number;
}

export interface RoommateItem {
  id: string;
  name: string;
  squareFeet: number;
  privateBathroom: boolean;
  walkInCloset: boolean;
  balconyAccess: boolean;
  assignedParking: boolean;
}

export interface RoommateSplitResult {
  totalRent: number;
  roommates: Array<{
    id: string;
    name: string;
    calculatedRent: number;
    sharePercent: number;
    deltaFromEqual: number;
  }>;
}

export interface RentVsBuyInput {
  monthlyRent: number;
  annualRentIncreasePct: number;
  homePrice: number;
  downPaymentPct: number;
  mortgageRatePct: number;
  loanTermYears: number;
  propertyTaxRatePct: number;
  annualHomeAppreciationPct: number;
  investmentReturnPct: number;
  analysisYears: number;
}

export interface RentVsBuyResult {
  renterNetWorth: number;
  buyerNetWorth: number;
  netBenefitToBuying: number;
  breakevenYear: number | null;
  totalRentPaid: number;
  totalHomeEquity: number;
}

export interface SavedRentItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
