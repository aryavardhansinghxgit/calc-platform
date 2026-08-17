import { calculateRentVsBuy, calculatePriceToRent, calculateBenFelix } from "./calculator";

export function testRentVsBuyCalculator() {
  console.log("Running Rent vs Buy Calculator mathematical tests...");

  // Test 1: Calculator.net Benchmark Test ($500,000 Home, $3,000 Rent, 20% Down, 6.632% Rate)
  const res1 = calculateRentVsBuy({
    homePrice: 500000,
    downPaymentPct: 20,
    loanTermYears: 30,
    interestRate: 6.632,
    buyingClosingCostsPct: 2.0,
    sellingClosingCostsPct: 7.0,
    propertyTaxAnnual: 7500,
    propertyTaxGrowthPct: 3.0,
    homeInsuranceAnnual: 2500,
    hoaDuesMonthly: 0,
    maintenancePct: 1.5,
    homeAppreciationPct: 3.0,
    monthlyRent: 3000,
    annualRentIncreasePct: 3.0,
    renterInsuranceMonthly: 15,
    securityDeposit: 3000,
    upfrontRentalFees: 100,
    inflationRatePct: 3.0,
    investmentReturnRatePct: 5.0,
    taxFilingStatus: "married_joint",
    marginalTaxRatePct: 25.0,
    itemizeDeductions: true,
    currencySymbol: "$",
  });

  console.assert(res1.breakevenYears >= 4 && res1.breakevenYears <= 6, `Expected breakeven around ~4.8 years, got ${res1.breakevenYears}`);
  console.assert(res1.priceToRentRatio === 13.9, `Expected Price-to-Rent ratio 13.9, got ${res1.priceToRentRatio}`);

  // Test 2: Price to Rent Indicator Test
  const ptr = calculatePriceToRent({ homePrice: 500000, monthlyRent: 3000 });
  console.assert(ptr.ratio === 13.9, `Expected Price-to-Rent ratio 13.9, got ${ptr.ratio}`);

  // Test 3: Ben Felix 5% Rule Test
  const ben = calculateBenFelix({ homePrice: 500000, interestRate: 6.5, propertyTaxPct: 1.5, maintenancePct: 1.0 });
  console.assert(ben.monthlyUnrecoverableCost === 3750, `Expected $3,750/mo unrecoverable cost, got $${ben.monthlyUnrecoverableCost}`);

  console.log("All Rent vs Buy Calculator math tests passed successfully!");
}
