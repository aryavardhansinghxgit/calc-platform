import {
  FederalEstateTaxInputs,
  FederalEstateTaxResult,
  StateDeathTaxInputs,
  StateDeathTaxResult,
  ExemptionSunsetForecastPoint,
  TrustAndGiftingInputs,
  TrustAndGiftingResult,
  StepUpInBasisInputs,
  StepUpInBasisResult,
  GstTaxInputs,
  GstTaxResult,
} from "./types";

/**
 * Statutory Federal Estate Tax Progressive Rate Brackets (IRC § 2001(c))
 */
export const FEDERAL_ESTATE_TAX_BRACKETS = [
  { cap: 10000, rate: 0.18 },
  { cap: 20000, rate: 0.20 },
  { cap: 40000, rate: 0.22 },
  { cap: 60000, rate: 0.24 },
  { cap: 80000, rate: 0.26 },
  { cap: 100000, rate: 0.28 },
  { cap: 150000, rate: 0.30 },
  { cap: 250000, rate: 0.32 },
  { cap: 500000, rate: 0.34 },
  { cap: 750000, rate: 0.37 },
  { cap: 1000000, rate: 0.39 },
  { cap: Infinity, rate: 0.40 },
];

export const EXEMPTION_BY_YEAR: Record<string, number> = {
  "2026": 15000000, // Projected 2026 baseline
  "2025": 13990000, // 2025 statutory limit
  "2024": 13610000, // 2024 statutory limit
};

export function computeGrossEstateTax(tentativeBase: number): number {
  if (tentativeBase <= 0) return 0;
  let tax = 0;
  let prev = 0;
  for (const b of FEDERAL_ESTATE_TAX_BRACKETS) {
    if (tentativeBase > prev) {
      const amtInBracket = Math.min(tentativeBase, b.cap) - prev;
      tax += amtInBracket * b.rate;
      prev = b.cap;
    }
  }
  return tax;
}

/**
 * 1. Core Federal Estate Tax Calculation Engine
 */
export function calculateFederalEstateTax(inputs: FederalEstateTaxInputs): FederalEstateTaxResult {
  const a = inputs.assets;
  const d = inputs.deductions;

  // 1. Gross Asset Inventory
  const realEstate = Math.abs(a.realEstate || 0);
  const stocks = Math.abs(a.stocksAndInvestments || 0);
  const cash = Math.abs(a.cashAndBankAccounts || 0);
  const retirement = Math.abs(a.retirementAccounts || 0);
  const business = Math.abs(a.businessEquity || 0);
  const lifeInsurance = Math.abs(a.lifeInsuranceBenefit || 0);
  const personal = Math.abs(a.vehiclesAndPersonalProperty || 0);

  const totalGrossEstate = realEstate + stocks + cash + retirement + business + lifeInsurance + personal;

  // 2. Liabilities & Deductions
  const debts = Math.abs(d.debtsAndMortgages || 0);
  const admin = Math.abs(d.funeralAndAdminExpenses || 0);
  const totalDebtsAndAdmin = debts + admin;
  const adjustedGrossEstate = Math.max(0, totalGrossEstate - totalDebtsAndAdmin);

  const marital = Math.abs(d.maritalDeduction || 0);
  const charity = Math.abs(d.charitableBequests || 0);
  const totalMaritalAndCharity = marital + charity;

  const netTaxableEstate = Math.max(0, adjustedGrossEstate - totalMaritalAndCharity);

  // 3. Lifetime Gifts & Tentative Tax Base
  const priorGifts = Math.abs(d.priorTaxableGifts || 0);
  const tentativeTaxBase = netTaxableEstate + priorGifts;

  // 4. Lifetime Exemption & Unified Credit
  let baseExemption = EXEMPTION_BY_YEAR[inputs.taxYear] || 15000000;
  if (inputs.taxYear === "custom" && inputs.customExemptionAmount) {
    baseExemption = Math.abs(inputs.customExemptionAmount);
  }

  let effectiveExemption = baseExemption;
  if (inputs.filingStatus === "married_portability") {
    effectiveExemption = baseExemption * 2; // Doubled via DSUE portability election
  } else if (inputs.filingStatus === "surviving_spouse") {
    const dsue = Math.abs(d.deceasedSpousalUnusedExemption || 0);
    effectiveExemption = baseExemption + dsue;
  }

  const grossTentativeTax = computeGrossEstateTax(tentativeTaxBase);
  const unifiedCredit = computeGrossEstateTax(effectiveExemption);

  // Net Federal Estate Tax Liability
  const netFederalEstateTax = Math.max(0, Math.round(grossTentativeTax - unifiedCredit));
  const effectiveTaxRatePercent = totalGrossEstate > 0 ? (netFederalEstateTax / totalGrossEstate) * 100 : 0;
  const topMarginalBracketPercent = netTaxableEstate > effectiveExemption ? 40 : 0;

  const remainingUnusedExemption = Math.max(0, effectiveExemption - tentativeTaxBase);

  // Net Wealth Transferred to Heirs & Beneficiaries
  const netWealthTransferredToHeirs = Math.max(
    0,
    totalGrossEstate - totalDebtsAndAdmin - charity - netFederalEstateTax
  );

  return {
    totalGrossEstate: Math.round(totalGrossEstate),
    totalDebtsAndAdmin: Math.round(totalDebtsAndAdmin),
    adjustedGrossEstate: Math.round(adjustedGrossEstate),
    totalMaritalAndCharity: Math.round(totalMaritalAndCharity),
    netTaxableEstate: Math.round(netTaxableEstate),
    tentativeTaxBase: Math.round(tentativeTaxBase),
    statutoryExemption: Math.round(baseExemption),
    effectiveExemption: Math.round(effectiveExemption),
    grossTentativeTax: Math.round(grossTentativeTax),
    unifiedCredit: Math.round(unifiedCredit),
    netFederalEstateTax,
    effectiveTaxRatePercent: Math.round(effectiveTaxRatePercent * 10) / 10,
    topMarginalBracketPercent,
    remainingUnusedExemption: Math.round(remainingUnusedExemption),
    netWealthTransferredToHeirs: Math.round(netWealthTransferredToHeirs),
  };
}

/**
 * 2. State-Level Estate & Inheritance Tax Schedules
 */
export interface StateTaxSchedule {
  name: string;
  hasEstateTax: boolean;
  estateExemption: number;
  estateTopRate: number;
  hasInheritanceTax: boolean;
  inheritanceClassARate: number; // Children/Spouses
  inheritanceClassBRate: number; // Siblings
  inheritanceClassCRate: number; // Non-relatives
}

export const STATE_DEATH_TAX_SCHEDULES: Record<string, StateTaxSchedule> = {
  none: {
    name: "Federal Only (No State Death Tax: TX, FL, CA, NV, AZ, etc.)",
    hasEstateTax: false,
    estateExemption: 0,
    estateTopRate: 0,
    hasInheritanceTax: false,
    inheritanceClassARate: 0,
    inheritanceClassBRate: 0,
    inheritanceClassCRate: 0,
  },
  WA: {
    name: "Washington (WA)",
    hasEstateTax: true,
    estateExemption: 2193000,
    estateTopRate: 0.20,
    hasInheritanceTax: false,
    inheritanceClassARate: 0,
    inheritanceClassBRate: 0,
    inheritanceClassCRate: 0,
  },
  OR: {
    name: "Oregon (OR)",
    hasEstateTax: true,
    estateExemption: 1000000,
    estateTopRate: 0.16,
    hasInheritanceTax: false,
    inheritanceClassARate: 0,
    inheritanceClassBRate: 0,
    inheritanceClassCRate: 0,
  },
  MA: {
    name: "Massachusetts (MA)",
    hasEstateTax: true,
    estateExemption: 2000000,
    estateTopRate: 0.16,
    hasInheritanceTax: false,
    inheritanceClassARate: 0,
    inheritanceClassBRate: 0,
    inheritanceClassCRate: 0,
  },
  NY: {
    name: "New York (NY)",
    hasEstateTax: true,
    estateExemption: 6940000,
    estateTopRate: 0.16,
    hasInheritanceTax: false,
    inheritanceClassARate: 0,
    inheritanceClassBRate: 0,
    inheritanceClassCRate: 0,
  },
  IL: {
    name: "Illinois (IL)",
    hasEstateTax: true,
    estateExemption: 4000000,
    estateTopRate: 0.16,
    hasInheritanceTax: false,
    inheritanceClassARate: 0,
    inheritanceClassBRate: 0,
    inheritanceClassCRate: 0,
  },
  MN: {
    name: "Minnesota (MN)",
    hasEstateTax: true,
    estateExemption: 3000000,
    estateTopRate: 0.16,
    hasInheritanceTax: false,
    inheritanceClassARate: 0,
    inheritanceClassBRate: 0,
    inheritanceClassCRate: 0,
  },
  CT: {
    name: "Connecticut (CT)",
    hasEstateTax: true,
    estateExemption: 13610000,
    estateTopRate: 0.12,
    hasInheritanceTax: false,
    inheritanceClassARate: 0,
    inheritanceClassBRate: 0,
    inheritanceClassCRate: 0,
  },
  PA: {
    name: "Pennsylvania (PA)",
    hasEstateTax: false,
    estateExemption: 0,
    estateTopRate: 0,
    hasInheritanceTax: true,
    inheritanceClassARate: 0.045, // 4.5% direct heirs
    inheritanceClassBRate: 0.12, // 12% siblings
    inheritanceClassCRate: 0.15, // 15% non-relatives
  },
  NJ: {
    name: "New Jersey (NJ)",
    hasEstateTax: false,
    estateExemption: 0,
    estateTopRate: 0,
    hasInheritanceTax: true,
    inheritanceClassARate: 0.0, // 0% direct descendants
    inheritanceClassBRate: 0.11, // 11-16% siblings
    inheritanceClassCRate: 0.16, // 16% non-relatives
  },
  MD: {
    name: "Maryland (MD — Both Estate & Inheritance)",
    hasEstateTax: true,
    estateExemption: 5000000,
    estateTopRate: 0.16,
    hasInheritanceTax: true,
    inheritanceClassARate: 0.0,
    inheritanceClassBRate: 0.10,
    inheritanceClassCRate: 0.10,
  },
};

export function calculateStateDeathTax(
  inputs: StateDeathTaxInputs,
  federalTaxAmount: number = 0
): StateDeathTaxResult {
  const sched = STATE_DEATH_TAX_SCHEDULES[inputs.stateCode] || STATE_DEATH_TAX_SCHEDULES.none;
  const taxable = Math.abs(inputs.taxableEstate || 0);

  let stateEstateTax = 0;
  if (sched.hasEstateTax && taxable > sched.estateExemption) {
    const excess = taxable - sched.estateExemption;
    stateEstateTax = Math.round(excess * (sched.estateTopRate * 0.85)); // blended progressive rate approximation
  }

  let stateInheritanceTax = 0;
  if (sched.hasInheritanceTax && taxable > 0) {
    let rate = 0;
    if (inputs.heirRelationshipClass === "classA") rate = sched.inheritanceClassARate;
    else if (inputs.heirRelationshipClass === "classB") rate = sched.inheritanceClassBRate;
    else rate = sched.inheritanceClassCRate;

    stateInheritanceTax = Math.round(taxable * rate);
  }

  const totalStateDeathTax = stateEstateTax + stateInheritanceTax;
  const combinedFederalAndStateTax = federalTaxAmount + totalStateDeathTax;
  const combinedEffectiveRate = taxable > 0 ? (combinedFederalAndStateTax / taxable) * 100 : 0;

  return {
    stateName: sched.name,
    hasStateEstateTax: sched.hasEstateTax,
    stateEstateTaxExemption: sched.estateExemption,
    stateEstateTaxAmount: stateEstateTax,
    hasStateInheritanceTax: sched.hasInheritanceTax,
    stateInheritanceTaxAmount: stateInheritanceTax,
    totalStateDeathTax,
    combinedFederalAndStateTax,
    combinedEffectiveRatePercent: Math.round(combinedEffectiveRate * 10) / 10,
  };
}

/**
 * 3. Sunset Clause & Policy Shift Forecaster
 */
export function forecastSunsetScenarios(taxableEstate: number): ExemptionSunsetForecastPoint[] {
  const scenarios = [
    { name: "Current 2026 Elevated Exemption ($15.0M)", singleEx: 15000000, marriedEx: 30000000 },
    { name: "Post-Sunset Reversion to Pre-TCJA ($7.0M)", singleEx: 7000000, marriedEx: 14000000 },
    { name: "Progressive Reform Proposal ($3.5M)", singleEx: 3500000, marriedEx: 7000000 },
  ];

  const currentTax = Math.max(0, Math.round(computeGrossEstateTax(taxableEstate) - computeGrossEstateTax(15000000)));

  return scenarios.map((s) => {
    const gross = computeGrossEstateTax(taxableEstate);
    const credit = computeGrossEstateTax(s.singleEx);
    const tax = Math.max(0, Math.round(gross - credit));
    const effectiveRate = taxableEstate > 0 ? (tax / taxableEstate) * 100 : 0;
    const additional = Math.max(0, tax - currentTax);

    return {
      scenarioName: s.name,
      individualExemption: s.singleEx,
      marriedExemption: s.marriedEx,
      federalTaxLiability: tax,
      effectiveRatePercent: Math.round(effectiveRate * 10) / 10,
      additionalTaxVsCurrent: additional,
    };
  });
}

/**
 * 4. Trust & Annual Gifting Strategy Simulator (ILIT & Gifting)
 */
export function calculateTrustAndGifting(inputs: TrustAndGiftingInputs): TrustAndGiftingResult {
  const insurance = Math.abs(inputs.lifeInsuranceBenefit || 0);
  const ilitTaxSavings = Math.round(insurance * 0.40); // 40% top bracket savings

  const beneficiaries = Math.max(0, inputs.numGiftingBeneficiaries || 0);
  const years = Math.max(1, inputs.giftingYears || 1);
  const giftPerPerson = Math.abs(inputs.annualGiftPerBeneficiary || 19000);

  const totalWealthGiftedTaxFree = beneficiaries * years * giftPerPerson;
  const giftingEstateTaxSavings = Math.round(totalWealthGiftedTaxFree * 0.40);

  const totalWealthSheltered = insurance + totalWealthGiftedTaxFree;
  const totalTaxesSaved = ilitTaxSavings + giftingEstateTaxSavings;

  return {
    ilitTaxSavings,
    totalWealthGiftedTaxFree,
    giftingEstateTaxSavings,
    totalWealthSheltered,
    totalTaxesSaved,
  };
}

/**
 * 5. Step-Up in Basis vs. Lifetime Gifting Comparator
 */
export function calculateStepUpInBasis(inputs: StepUpInBasisInputs): StepUpInBasisResult {
  const fmv = Math.abs(inputs.assetFairMarketValue || 0);
  const basis = Math.abs(inputs.originalCostBasis || 0);
  const gainRate = (inputs.capitalGainsTaxRatePercent || 23.8) / 100;

  const unrealizedAppreciation = Math.max(0, fmv - basis);

  // Bequest at death: New basis = FMV, Capital gains tax = $0
  const bequestAtDeathNewBasis = fmv;
  const bequestCapitalGainsTax = 0;

  // Lifetime gift: Carryover basis = Original basis, Potential capital gains tax = appreciation * rate
  const lifetimeGiftCarryoverBasis = basis;
  const lifetimeGiftPotentialCapitalGainsTax = Math.round(unrealizedAppreciation * gainRate);

  const stepUpTaxBenefitSavings = lifetimeGiftPotentialCapitalGainsTax;

  return {
    unrealizedAppreciation: Math.round(unrealizedAppreciation),
    bequestAtDeathNewBasis: Math.round(bequestAtDeathNewBasis),
    bequestCapitalGainsTax,
    lifetimeGiftCarryoverBasis: Math.round(lifetimeGiftCarryoverBasis),
    lifetimeGiftPotentialCapitalGainsTax,
    stepUpTaxBenefitSavings,
  };
}

/**
 * 6. Generation-Skipping Transfer (GST) Tax Engine
 */
export function calculateGstTax(inputs: GstTaxInputs): GstTaxResult {
  const transfer = Math.abs(inputs.transferToGrandchildren || 0);
  const exemption = Math.abs(inputs.availableGstExemption || 15000000);

  const taxableSkipOverhang = Math.max(0, transfer - exemption);
  const gstTaxLiability = Math.round(taxableSkipOverhang * 0.40); // 40% flat GST tax rate
  const netTransferToGrandchildren = transfer - gstTaxLiability;

  return {
    taxableSkipOverhang: Math.round(taxableSkipOverhang),
    gstTaxRatePercent: 40.0,
    gstTaxLiability,
    netTransferToGrandchildren: Math.round(netTransferToGrandchildren),
  };
}
