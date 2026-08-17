export type TaxFilingStatus = "single" | "married_joint";

export interface RentVsBuyInput {
  homePrice: number;
  downPaymentPct: number;
  loanTermYears: number;
  interestRate: number;
  buyingClosingCostsPct: number;
  sellingClosingCostsPct: number;
  propertyTaxAnnual: number;
  propertyTaxGrowthPct: number;
  homeInsuranceAnnual: number;
  hoaDuesMonthly: number;
  maintenancePct: number;
  homeAppreciationPct: number;

  monthlyRent: number;
  annualRentIncreasePct: number;
  renterInsuranceMonthly: number;
  securityDeposit: number;
  upfrontRentalFees: number;

  inflationRatePct: number;
  investmentReturnRatePct: number;
  taxFilingStatus: TaxFilingStatus;
  marginalTaxRatePct: number;
  itemizeDeductions: boolean;
  currencySymbol: string;
}

export interface YearlyComparisonRow {
  year: number;
  homeValue: number;
  remainingMortgageBalance: number;
  homeEquity: number;
  buyingAnnualOutlay: number;
  buyingCumulativeNetCost: number;
  rentingAnnualOutlay: number;
  rentingCumulativeNetCost: number;
  renterPortfolioValue: number;
  cheaperOption: "Buy" | "Rent";
}

export interface RentVsBuyResult {
  breakevenYears: number;
  breakevenMonths: number;
  breakevenMessage: string;
  isBuyCheaperAt30Years: boolean;
  buyingCumulativeNetCost30Yr: number;
  rentingCumulativeNetCost30Yr: number;
  netWealthDifference30Yr: number;
  averageMonthlyBuyingCost: number;
  averageMonthlyRentingCost: number;
  initialBuyingOutlay: number;
  initialRentingOutlay: number;
  priceToRentRatio: number;
  yearlySchedule: YearlyComparisonRow[];
}

export interface NetWorthComparisonInput {
  homePrice: number;
  downPaymentAmount: number;
  appreciationRate: number;
  investmentReturnRate: number;
  years: number;
}

export interface NetWorthComparisonResult {
  futureHomeValue: number;
  projectedHomeEquity: number;
  renterStockPortfolioValue: number;
  netWorthAdvantage: string;
  netWorthDelta: number;
}

export interface PriceToRentInput {
  homePrice: number;
  monthlyRent: number;
}

export interface PriceToRentResult {
  ratio: number;
  category: "Buy Favored (1-15)" | "Neutral (16-20)" | "Rent Favored (21+)";
  badgeColor: string;
  explanation: string;
}

export interface TaxShieldInput {
  homePrice: number;
  mortgageBalance: number;
  interestRate: number;
  propertyTaxAnnual: number;
  filingStatus: TaxFilingStatus;
  marginalTaxRatePct: number;
}

export interface TaxShieldResult {
  annualMortgageInterest: number;
  cappedPropertyTax: number;
  totalItemizedDeductions: number;
  standardDeduction: number;
  netItemizedBenefit: number;
  annualTaxSavings: number;
  explanation: string;
}

export interface BenFelixInput {
  homePrice: number;
  interestRate: number;
  propertyTaxPct: number;
  maintenancePct: number;
}

export interface BenFelixResult {
  annualUnrecoverableCost: number;
  monthlyUnrecoverableCost: number;
  maxAdvantageousMonthlyRent: number;
  explanation: string;
}

export interface RelocationPenaltyInput {
  homePrice: number;
  plannedStayYears: number;
  buyingCostsPct: number;
  sellingCostsPct: number;
}

export interface RelocationPenaltyResult {
  totalFrictionCosts: number;
  monthlyAmortizedDrag: number;
  recommendation: string;
}

export interface SavedRentVsBuyItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
