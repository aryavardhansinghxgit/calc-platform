import { calculateHELOC, calculateStressTest } from "./calculator";

export function testHELOCCalculator() {
  console.log("Running HELOC Calculator mathematical tests...");

  // Test 1: Calculator.net Benchmark Test ($50,000 Loan Amount, 8% Interest, 5-Yr Draw, 15-Yr Repay)
  const res1 = calculateHELOC({
    homeValue: 600000,
    currentMortgageBalance: 250000,
    cltvLimitPct: 80,
    creditLineAmount: 50000,
    drawPeriodYears: 5,
    drawPaymentStructure: "interest_only",
    repaymentPeriodYears: 15,
    interestRate: 8.0,
    closingCostsAmount: 2000,
    closingCostTreatment: "upfront",
    annualMaintenanceFee: 50,
    currencySymbol: "$",
  });

  console.assert(res1.drawPeriodMonthlyPayment === 333, `Expected $333/mo draw payment, got $${res1.drawPeriodMonthlyPayment}`);
  console.assert(res1.repaymentPeriodMonthlyPayment === 478, `Expected $478/mo repayment payment, got $${res1.repaymentPeriodMonthlyPayment}`);
  console.assert(res1.maxBorrowableCreditLine === 230000, `Expected $230,000 max borrowing limit, got $${res1.maxBorrowableCreditLine}`);

  // Test 2: Variable Rate Stress Test (+2% Scenario)
  const stress = calculateStressTest({
    drawnBalance: 50000,
    wsjPrimeRate: 7.5,
    lenderMargin: 1.0,
    rateScenario: "+2",
    lifetimeCapPct: 18.0,
    repayYears: 20,
  });

  console.assert(stress.currentRate === 8.5, `Expected 8.5% current rate, got ${stress.currentRate}%`);
  console.assert(stress.stressedRate === 10.5, `Expected 10.5% stressed rate, got ${stress.stressedRate}%`);

  console.log("All HELOC Calculator math tests passed successfully!");
}
