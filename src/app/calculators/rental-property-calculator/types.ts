export interface RentalPropertyInput {
  purchasePrice: number;
  useLoan: boolean;
  downPaymentPct: number;
  interestRate: number;
  loanTermYears: number;
  closingCosts: number;
  initialRehab: number;
  afterRepairValue: number;

  monthlyRent: number;
  rentGrowthPct: number;
  otherIncome: number;
  otherIncomeGrowthPct: number;
  vacancyRatePct: number;
  managementFeePct: number;

  annualPropertyTax: number;
  propertyTaxGrowthPct: number;
  annualInsurance: number;
  insuranceGrowthPct: number;
  monthlyHoa: number;
  annualMaintenance: number;
  monthlyUtilities: number;
  otherCostsAnnual: number;

  holdingPeriodYears: number;
  appreciationPct: number;
  costToSellPct: number;

  currencySymbol: string;
}

export interface RentalPropertyResult {
  initialCashInvested: number;
  monthlyMortgagePayment: number;
  monthlyGrossIncome: number;
  monthlyEffectiveIncome: number;
  monthlyOperatingExpenses: number;
  monthlyNOI: number;
  annualNOI: number;
  monthlyNetCashFlow: number;
  annualNetCashFlow: number;
  capRate: number;
  cashOnCashReturn: number;
  grossRentMultiplier: number;
  dscr: number;
  irr: number;
  totalNetProfitAtSale: number;
  futureSalePrice: number;
  equityAtSale: number;
}

export interface BRRRRInput {
  purchasePrice: number;
  rehabCost: number;
  arv: number;
  postRehabMonthlyRent: number;
  refinanceLtvPct: number;
  refinanceInterestRate: number;
  refinanceTermYears: number;
}

export interface BRRRRResult {
  totalInitialCashOutlay: number;
  refinanceLoanAmount: number;
  cashRecoupedAtRefinance: number;
  netCapitalTrapped: number;
  isInfiniteReturn: boolean;
  postRefinanceMonthlyMortgage: number;
  postRefinanceMonthlyCashFlow: number;
}

export interface UnitRentRollItem {
  id: string;
  unitName: string;
  bedrooms: string;
  monthlyRent: number;
  vacancyRatePct: number;
}

export interface MultiUnitRentRollResult {
  totalGrossPotentialIncome: number;
  totalEffectiveIncome: number;
  averageRentPerUnit: number;
  totalUnits: number;
}

export interface TaxDepreciationInput {
  purchasePrice: number;
  landValuePct: number;
  taxBracketPct: number;
}

export interface TaxDepreciationResult {
  depreciableBuildingValue: number;
  annualDepreciationDeduction: number;
  monthlyTaxShieldSavings: number;
  taxShieldedPctOfRent: number;
}

export interface RulesOfThumbInput {
  purchasePrice: number;
  rehabCost: number;
  grossMonthlyRent: number;
  arv: number;
}

export interface RulesOfThumbResult {
  onePercentRulePct: number;
  passesOnePercent: boolean;
  passesTwoPercent: boolean;
  estimated50PercentOpEx: number;
  estimated50PercentCashFlow: number;
  maxAllowableOffer70: number;
}

export interface SensitivityMatrixResult {
  matrix: Array<{
    vacancyPct: number;
    rateMinus1: number;
    rateBase: number;
    ratePlus1: number;
  }>;
}

export interface SavedRentalItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
