export type EstateFilingStatus = "single" | "married_portability" | "surviving_spouse";

export interface EstateAssetInventory {
  realEstate: number; // Residence, commercial, land
  stocksAndInvestments: number; // Brokerage, stocks, bonds, funds
  cashAndBankAccounts: number; // Checking, savings, CDs
  retirementAccounts: number; // 401k, Traditional/Roth IRA
  businessEquity: number; // LLCs, private equity, partnerships
  lifeInsuranceBenefit: number; // Included if owned by decedent
  vehiclesAndPersonalProperty: number; // Cars, boats, jewelry, art
}

export interface EstateLiabilitiesAndDeductions {
  debtsAndMortgages: number;
  funeralAndAdminExpenses: number;
  maritalDeduction: number; // 100% tax-free to US citizen spouse
  charitableBequests: number; // 501(c)(3) donations
  priorTaxableGifts: number; // Lifetime taxable gifts exceeding annual exclusion
  deceasedSpousalUnusedExemption: number; // DSUE portability
}

export interface FederalEstateTaxInputs {
  taxYear: "2026" | "2025" | "2024" | "custom";
  customExemptionAmount?: number;
  filingStatus: EstateFilingStatus;
  assets: EstateAssetInventory;
  deductions: EstateLiabilitiesAndDeductions;
}

export interface FederalEstateTaxResult {
  totalGrossEstate: number;
  totalDebtsAndAdmin: number;
  adjustedGrossEstate: number;
  totalMaritalAndCharity: number;
  netTaxableEstate: number;
  tentativeTaxBase: number;
  statutoryExemption: number;
  effectiveExemption: number;
  grossTentativeTax: number;
  unifiedCredit: number;
  netFederalEstateTax: number;
  effectiveTaxRatePercent: number;
  topMarginalBracketPercent: number;
  remainingUnusedExemption: number;
  netWealthTransferredToHeirs: number;
}

export interface StateDeathTaxInputs {
  taxableEstate: number; // from Federal or custom
  stateCode: string; // WA, OR, MN, IL, NY, MA, CT, PA, NJ, etc.
  heirRelationshipClass: "classA" | "classB" | "classC"; // Direct heirs, siblings, non-relatives
}

export interface StateDeathTaxResult {
  stateName: string;
  hasStateEstateTax: boolean;
  stateEstateTaxExemption: number;
  stateEstateTaxAmount: number;
  hasStateInheritanceTax: boolean;
  stateInheritanceTaxAmount: number;
  totalStateDeathTax: number;
  combinedFederalAndStateTax: number;
  combinedEffectiveRatePercent: number;
}

export interface ExemptionSunsetForecastPoint {
  scenarioName: string;
  individualExemption: number;
  marriedExemption: number;
  federalTaxLiability: number;
  effectiveRatePercent: number;
  additionalTaxVsCurrent: number;
}

export interface TrustAndGiftingInputs {
  lifeInsuranceBenefit: number;
  numGiftingBeneficiaries: number;
  giftingYears: number;
  annualGiftPerBeneficiary: number; // e.g. $19,000 for single or $38,000 married
  taxableEstateValue: number;
}

export interface TrustAndGiftingResult {
  ilitTaxSavings: number;
  totalWealthGiftedTaxFree: number;
  giftingEstateTaxSavings: number;
  totalWealthSheltered: number;
  totalTaxesSaved: number;
}

export interface StepUpInBasisInputs {
  assetFairMarketValue: number; // e.g. $2,000,000
  originalCostBasis: number; // e.g. $400,000
  capitalGainsTaxRatePercent: number; // e.g. 23.8%
}

export interface StepUpInBasisResult {
  unrealizedAppreciation: number;
  bequestAtDeathNewBasis: number;
  bequestCapitalGainsTax: number;
  lifetimeGiftCarryoverBasis: number;
  lifetimeGiftPotentialCapitalGainsTax: number;
  stepUpTaxBenefitSavings: number;
}

export interface GstTaxInputs {
  transferToGrandchildren: number;
  availableGstExemption: number;
}

export interface GstTaxResult {
  taxableSkipOverhang: number;
  gstTaxRatePercent: number;
  gstTaxLiability: number;
  netTransferToGrandchildren: number;
}

export interface SavedEstateTaxItem {
  id: string;
  title: string;
  inputsSummary: string;
  primaryResult: string;
  detailsList: string[];
  timestamp: string;
}
