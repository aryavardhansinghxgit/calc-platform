/**
 * Unit Test Suite for Premium Auto Lease Calculator Engine.
 */

import {
  calculateAutoLeaseFormula,
  aprToMoneyFactor,
  moneyFactorToApr,
} from "../calculator-engine/formulas/auto-lease";

function assertEqual(actual: any, expected: any, testName: string) {
  if (actual !== expected) {
    throw new Error(`[FAIL] ${testName}: Expected ${expected}, but got ${actual}`);
  }
}

export function runAutoLeaseTests(): { passed: boolean; count: number } {
  let count = 0;

  // Test 1: Money Factor <-> APR Conversion
  assertEqual(aprToMoneyFactor(6.0), 0.0025, "6% APR to Money Factor");
  assertEqual(moneyFactorToApr(0.0025), 6.0, "0.0025 Money Factor to APR");
  count++;

  // Test 2: Full Worked Example from Prompt ($50,000 price, $8,000 down, $5,000 trade, $25,000 residual, 6% APR, 36 mos, 6% tax)
  const result1 = calculateAutoLeaseFormula({
    autoPrice: 50000,
    vehicleMsrp: 50000,
    downPayment: 8000,
    tradeInValue: 5000,
    amountOwedOnTradeIn: 0,
    leaseTermMonths: 36,
    residualValue: 25000,
    residualInputType: "amount",
    aprPercent: 6.0,
    interestInputType: "apr",
    salesTaxRate: 6.0,
  });

  assertEqual(result1.adjustedCapCost, 37000, "Worked Example Net Cap Cost");
  assertEqual(result1.monthlyDepreciation, 333.33, "Worked Example Monthly Depreciation");
  assertEqual(result1.monthlyFinanceFee, 155.0, "Worked Example Monthly Rent Fee");
  assertEqual(result1.monthlySalesTax, 29.3, "Worked Example Monthly Sales Tax");
  assertEqual(result1.monthlyLeasePayment, 517.63, "Worked Example Total Monthly Lease Payment");
  count++;

  // Test 3: Mileage Penalty Analysis
  const result2 = calculateAutoLeaseFormula({
    autoPrice: 35000,
    mileageAllowancePerYear: 12000,
    expectedMilesPerYear: 15000, // 3000 excess miles/year * 3 yrs = 9000 excess miles
    excessMileageFeeRate: 0.20,
    leaseTermMonths: 36,
  });

  assertEqual(result2.mileageAnalysis.excessMiles, 9000, "Excess Mileage Calculation");
  assertEqual(result2.mileageAnalysis.totalPenaltyCost, 1800, "Excess Mileage Penalty Cost");
  assertEqual(result2.mileageAnalysis.status, "Over Limit", "Mileage Penalty Status");
  count++;

  // Test 4: Reverse Target Payment Solver
  const result3 = calculateAutoLeaseFormula({
    targetMonthlyPayment: 500,
    leaseTermMonths: 36,
    aprPercent: 6.0,
    residualPercent: 55,
    salesTaxRate: 7.0,
  });

  assertEqual(result3.targetResult?.targetMonthlyPayment, 500, "Reverse Solver Target Payment");
  count++;

  return { passed: true, count };
}

// Auto-run tests in test env
if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
  runAutoLeaseTests();
}
