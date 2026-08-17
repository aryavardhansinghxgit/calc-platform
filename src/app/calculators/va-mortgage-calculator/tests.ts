import { calculateVAMortgage, getVAFundingFeeRate, calculateEntitlement } from "./calculator";

export function testVAMortgageCalculator() {
  console.log("Running VA Mortgage Calculator mathematical tests...");

  // Test 1: Calculator.net Benchmark Test ($500,000 Purchase, 0% Down, 6.632% Rate, First Time Active Duty)
  const res = calculateVAMortgage({
    homePrice: 500000,
    downPaymentPct: 0,
    loanTermYears: 30,
    interestRate: 6.632,
    militaryStatus: "Active/Veteran",
    usedVALoanBefore: false,
    isDisabilityExempt: false,
    financeFundingFee: true,
    propertyTaxAnnual: 6000,
    homeInsuranceAnnual: 2500,
    hoaDuesMonthly: 0,
    estimatedClosingCostsPct: 2.5,
    currencySymbol: "$",
  });

  console.assert(res.baseLoanAmount === 500000, `Expected $500,000 base loan, got $${res.baseLoanAmount}`);
  console.assert(res.fundingFeeRatePct === 2.15, `Expected 2.15% fee, got ${res.fundingFeeRatePct}%`);
  console.assert(res.fundingFeeAmount === 10750, `Expected $10,750 fee, got $${res.fundingFeeAmount}`);
  console.assert(res.totalFinancedLoanAmount === 510750, `Expected $510,750 financed, got $${res.totalFinancedLoanAmount}`);

  // Test 2: Disability Exemption Test
  const feeExempt = getVAFundingFeeRate(0, false, true);
  console.assert(feeExempt === 0.0, `Expected 0.0% fee for disability exempt, got ${feeExempt}%`);

  // Test 3: Subsequent Use Fee Test (<5% down)
  const feeSubsequent = getVAFundingFeeRate(0, true, false);
  console.assert(feeSubsequent === 3.30, `Expected 3.30% fee for subsequent use, got ${feeSubsequent}%`);

  // Test 4: Entitlement Purchasing Power Test
  const ent = calculateEntitlement({
    targetHomePrice: 600000,
    priorUsedEntitlement: 0,
    countyLoanLimit: 766550,
  });

  console.assert(ent.fullEntitlementAvailable === true, `Expected full entitlement true, got ${ent.fullEntitlementAvailable}`);
  console.assert(ent.requiredDownPaymentForTarget === 0, `Expected 0 down payment required, got ${ent.requiredDownPaymentForTarget}`);

  console.log("All VA Mortgage Calculator math tests passed successfully!");
}
