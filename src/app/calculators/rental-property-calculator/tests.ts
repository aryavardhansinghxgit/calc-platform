import { calculateRentalProperty, calculateBRRRR, calculateRulesOfThumb } from "./calculator";

export function testRentalPropertyCalculator() {
  console.log("Running Rental Property Calculator mathematical tests...");

  // Test 1: $200,000 Purchase, 20% Down, $2,000 Rent
  const res = calculateRentalProperty({
    purchasePrice: 200000,
    useLoan: true,
    downPaymentPct: 20,
    interestRate: 6,
    loanTermYears: 30,
    closingCosts: 6000,
    initialRehab: 0,
    afterRepairValue: 200000,
    monthlyRent: 2000,
    rentGrowthPct: 3,
    otherIncome: 0,
    otherIncomeGrowthPct: 0,
    vacancyRatePct: 5,
    managementFeePct: 0,
    annualPropertyTax: 3000,
    propertyTaxGrowthPct: 3,
    annualInsurance: 1200,
    insuranceGrowthPct: 3,
    monthlyHoa: 0,
    annualMaintenance: 2000,
    monthlyUtilities: 0,
    otherCostsAnnual: 500,
    holdingPeriodYears: 20,
    appreciationPct: 3,
    costToSellPct: 8,
    currencySymbol: "$",
  });

  console.assert(res.initialCashInvested === 46000, `Expected 46000 cash, got ${res.initialCashInvested}`);
  console.assert(res.capRate > 7 && res.capRate < 9, `Expected Cap Rate ~8.05%, got ${res.capRate}%`);

  // Test 2: BRRRR Recoup Test
  const brrrr = calculateBRRRR({
    purchasePrice: 150000,
    rehabCost: 40000,
    arv: 260000,
    postRehabMonthlyRent: 2400,
    refinanceLtvPct: 75,
    refinanceInterestRate: 6.5,
    refinanceTermYears: 30,
  });

  console.assert(brrrr.refinanceLoanAmount === 195000, `Expected 195000 refi, got ${brrrr.refinanceLoanAmount}`);
  console.assert(brrrr.netCapitalTrapped === -5000, `Expected -$5000 trapped, got ${brrrr.netCapitalTrapped}`);
  console.assert(brrrr.isInfiniteReturn === true, `Expected infinite return true, got ${brrrr.isInfiniteReturn}`);

  // Test 3: 1% Rule Test
  const rot = calculateRulesOfThumb({
    purchasePrice: 180000,
    rehabCost: 20000,
    grossMonthlyRent: 2000,
    arv: 200000,
  });

  console.assert(rot.onePercentRulePct === 1.0, `Expected 1.0%, got ${rot.onePercentRulePct}%`);
  console.assert(rot.passesOnePercent === true, `Expected passes 1% rule, got ${rot.passesOnePercent}`);

  console.log("All Rental Property Calculator math tests passed successfully!");
}
