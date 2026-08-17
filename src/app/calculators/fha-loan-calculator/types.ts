export interface FHALoanInput {
  homePrice: number;
  downPaymentPct: number;
  creditScoreBand: "580+" | "500-579";
  loanTermYears: number;
  interestRate: number;
  financeUfmip: boolean;
  propertyTaxAnnual: number;
  homeInsuranceAnnual: number;
  hoaDuesMonthly: number;
  estimatedClosingCostsPct: number;
  sellerConcessionsPct: number;
  currencySymbol: string;
}

export interface FHALoanResult {
  downPaymentAmount: number;
  effectiveDownPaymentPct: number;
  baseLoanAmount: number;
  ufmipRate: number;
  ufmipAmount: number;
  totalFinancedLoanAmount: number;
  annualMipRate: number;
  monthlyMipAmount: number;
  mipDurationYears: number | "Life of Loan";
  monthlyPrincipalAndInterest: number;
  monthlyPropertyTax: number;
  monthlyHomeInsurance: number;
  monthlyHoa: number;
  totalMonthlyPiti: number;
  totalUpfrontCashRequired: number;
  totalPaymentsOverTerm: number;
  totalInterestOverTerm: number;
}

export interface FHAVsConvInput {
  homePrice: number;
  downPaymentPct: number;
  creditScore: number;
  interestRateFHA: number;
  interestRateConv: number;
}

export interface FHAVsConvResult {
  fhaMonthlyPiti: number;
  fhaUpfrontCash: number;
  fhaTotal30YrCost: number;
  convMonthlyPiti: number;
  convUpfrontCash: number;
  convTotal30YrCost: number;
  crossoverMonth: number;
  recommendation: string;
}

export interface CountyLimitInput {
  propertyType: "Single Family" | "Duplex" | "Triplex" | "Fourplex";
  customLimit?: number;
  proposedLoanAmount: number;
}

export interface CountyLimitResult {
  floorLimit: number;
  ceilingLimit: number;
  appliedLimit: number;
  isWithinLimit: boolean;
  statusMessage: string;
}

export interface FHADTIInput {
  grossMonthlyIncome: number;
  proposedHousingPayment: number;
  existingMonthlyDebt: number;
}

export interface FHADTIResult {
  frontEndDTI: number;
  backEndDTI: number;
  meetsStandard31_43: boolean;
  meetsAUS_46_56: boolean;
  statusBadge: string;
}

export interface FHA203kInput {
  purchasePrice: number;
  repairEscrowBudget: number;
  contingencyPct: number;
  arv: number;
}

export interface FHA203kResult {
  totalRenovationBudget: number;
  base203kLoanAmount: number;
  ufmipAmount: number;
  totalFinancedLoanAmount: number;
  estimatedMonthlyPayment: number;
}

export interface FHAPrepaymentInput {
  baseLoanAmount: number;
  interestRate: number;
  loanTermYears: number;
  extraMonthlyPayment: number;
}

export interface FHAPrepaymentResult {
  originalMonths: number;
  newMonths: number;
  monthsSaved: number;
  interestSaved: number;
  mipSaved: number;
}

export interface SavedFHAItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
