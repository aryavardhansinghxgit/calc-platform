/**
 * Unit Test Suite for Premium Simple Interest Engine.
 */

import {
  calculateSimpleInterestFormula,
  getYearsFromTimeUnit,
  convertYearsToTimeUnit,
} from "../calculator-engine/formulas/simple-interest";

function assertCloseTo(actual: number, expected: number, delta: number, testName: string) {
  if (Math.abs(actual - expected) > delta) {
    throw new Error(`[FAIL] ${testName}: Expected ~${expected}, got ${actual}`);
  }
}

export function runSimpleInterestTests(): { passed: boolean; count: number } {
  let count = 0;

  // Test 1: Worked Example from Prompt ($20,000 @ 3% for 10 years -> $6,000 interest, $26,000 balance)
  const res1 = calculateSimpleInterestFormula({
    mode: "balance",
    principal: 20000,
    annualRatePercent: 3.0,
    term: 10,
    timeUnit: "years",
  });
  assertCloseTo(res1.totalInterest, 6000, 0.01, "Mode Balance Total Interest");
  assertCloseTo(res1.finalBalance, 26000, 0.01, "Mode Balance Final Balance");
  assertCloseTo(res1.roiPercent, 30.0, 0.01, "ROI Percent");
  count++;

  // Test 2: Mode Principal (Target Interest $6,000 @ 3% for 10 years -> $20,000)
  const res2 = calculateSimpleInterestFormula({
    mode: "principal",
    targetInterest: 6000,
    annualRatePercent: 3.0,
    term: 10,
    timeUnit: "years",
  });
  assertCloseTo(res2.principal, 20000, 0.01, "Mode Principal Target Interest");
  count++;

  // Test 3: Mode Rate ($20,000 principal, $6,000 interest, 10 years -> 3.0%)
  const res3 = calculateSimpleInterestFormula({
    mode: "rate",
    principal: 20000,
    targetInterest: 6000,
    term: 10,
    timeUnit: "years",
  });
  assertCloseTo(res3.annualRatePercent, 3.0, 0.01, "Mode Rate Target");
  count++;

  // Test 4: Mode Term ($20,000 principal, $6,000 interest, 3% -> 10 years)
  const res4 = calculateSimpleInterestFormula({
    mode: "term",
    principal: 20000,
    targetInterest: 6000,
    annualRatePercent: 3.0,
    timeUnit: "years",
  });
  assertCloseTo(res4.term, 10, 0.01, "Mode Term Target");
  count++;

  // Test 5: Time Unit Conversions (6 months = 0.5 years)
  assertCloseTo(getYearsFromTimeUnit(6, "months"), 0.5, 0.001, "6 Months to Years");
  assertCloseTo(convertYearsToTimeUnit(0.5, "months"), 6, 0.001, "0.5 Years to Months");
  count++;

  // Test 6: Simple vs Compound Comparison ($20,000 @ 3% for 10 yrs)
  // Simple: $6,000 interest. Compound (monthly): $20000 * (1 + 0.03/12)^120 - 20000 = $6,987.07
  assertCloseTo(res1.comparison.compoundInterestTotal, 6987.07, 2.0, "Compound Interest 10 Yrs");
  count++;

  return { passed: true, count };
}

// Auto-run when executed directly
if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
  runSimpleInterestTests();
}
