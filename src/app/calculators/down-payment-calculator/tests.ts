import { calculateDownPayment, calculateOpportunityCost } from "./calculator";

export function testDownPaymentCalculator() {
  console.log("Running Down Payment Calculator mathematical tests...");

  // Test 1: Calculator.net Benchmark Test 1 ($500,000 Home Price, 20% Down, 6.632% Rate, 30 Yrs)
  const res1 = calculateDownPayment({
    calculationMode: "home_price",
    homePrice: 500000,
    downPaymentPct: 20,
    upfrontCashAvailable: 100000,
    loanTermYears: 30,
    interestRate: 6.632,
    propertyTaxAnnual: 6000,
    homeInsuranceAnnual: 1800,
    pmiRatePct: 0.5,
    hoaDuesMonthly: 0,
    closingCostsPct: 3.0,
    currencySymbol: "$",
  });

  console.assert(res1.downPaymentAmount === 100000, `Expected $100,000 down payment, got $${res1.downPaymentAmount}`);
  console.assert(res1.loanAmount === 400000, `Expected $400,000 loan amount, got $${res1.loanAmount}`);
  console.assert(res1.monthlyPrincipalAndInterest === 2563, `Expected $2,563 P&I payment, got $${res1.monthlyPrincipalAndInterest}`);

  // Test 2: Calculator.net Benchmark Test 2 (Upfront Cash Mode: $100,000 Cash, 20% Down, 3% Closing Costs)
  const res2 = calculateDownPayment({
    calculationMode: "upfront_cash",
    homePrice: 500000,
    downPaymentPct: 20,
    upfrontCashAvailable: 100000,
    loanTermYears: 30,
    interestRate: 6.632,
    propertyTaxAnnual: 6000,
    homeInsuranceAnnual: 1800,
    pmiRatePct: 0.5,
    hoaDuesMonthly: 0,
    closingCostsPct: 3.0,
    currencySymbol: "$",
  });

  console.assert(res2.homePrice === 434783, `Expected ~$434,783 max home price, got $${res2.homePrice}`);
  console.assert(res2.downPaymentAmount === 86957, `Expected ~$86,957 down payment, got $${res2.downPaymentAmount}`);

  // Test 3: Opportunity Cost Test
  const opp = calculateOpportunityCost({
    homePrice: 500000,
    baseDownPct: 5,
    largerDownPct: 20,
    interestRate: 6.5,
    investmentReturnRate: 8.5,
    years: 10,
  });

  console.assert(opp.extraDownAmount === 75000, `Expected $75,000 extra down, got $${opp.extraDownAmount}`);

  console.log("All Down Payment Calculator math tests passed successfully!");
}
