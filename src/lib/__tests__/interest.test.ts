/**
 * Unit Test Suite for Premium Interest Calculator Engine.
 */

import { calculateInterestFormula } from "../calculator-engine/formulas/interest";

function assertCloseTo(actual: number, expected: number, delta: number, testName: string) {
  if (Math.abs(actual - expected) > delta) {
    throw new Error(`[FAIL] ${testName}: Expected ~${expected}, got ${actual}`);
  }
}

export function runInterestTests(): { passed: boolean; count: number } {
  let count = 0;

  // Test 1: Calculator.net Reference Screenshot Worked Example
  // Initial $20,000, Annual $5,000, 5% annual rate, 5 years, 3% inflation
  const res1 = calculateInterestFormula({
    initialInvestment: 20000,
    annualContribution: 5000,
    monthlyContribution: 0,
    contributionTiming: "end",
    annualRatePercent: 5.0,
    compoundingFrequency: "annual",
    investmentYears: 5,
    investmentMonths: 0,
    taxRatePercent: 0,
    inflationRatePercent: 3.0,
  });

  assertCloseTo(res1.endingBalance, 54535.2, 0.5, "Ending Balance");
  assertCloseTo(res1.totalPrincipal, 45000, 0.01, "Total Principal");
  assertCloseTo(res1.totalContributions, 25000, 0.01, "Total Contributions");
  assertCloseTo(res1.totalInterestEarned, 9535.2, 0.5, "Total Interest");
  assertCloseTo(res1.interestFromInitial, 5525.63, 1.0, "Interest From Initial");
  assertCloseTo(res1.interestFromContributions, 4009.56, 1.0, "Interest From Contributions");
  assertCloseTo(res1.inflationAdjustedFutureValue, 47042.54, 1.0, "Inflation Adjusted Value");
  count++;

  // Test 2: Compounding Frequencies Comparison
  const freqComp = res1.frequencyComparison;
  const annualItem = freqComp.find((f) => f.frequencyKey === "annual");
  const contItem = freqComp.find((f) => f.frequencyKey === "continuous");
  if (!annualItem || !contItem) {
    throw new Error("[FAIL] Frequency comparison missing annual or continuous item");
  }
  if (contItem.endingBalance <= annualItem.endingBalance) {
    throw new Error("[FAIL] Continuous compounding should yield higher balance than annual");
  }
  count++;

  // Test 3: Rule of 72
  // At 6% interest rate, Rule of 72 approx = 72/6 = 12 years. Exact = ln(2)/ln(1.06) = 11.90 years.
  const res3 = calculateInterestFormula({
    initialInvestment: 10000,
    annualRatePercent: 6.0,
    investmentYears: 10,
  });
  assertCloseTo(res3.ruleOf72YearsApprox, 12.0, 0.01, "Rule of 72 Approx");
  assertCloseTo(res3.ruleOf72YearsExact, 11.9, 0.1, "Rule of 72 Exact");
  count++;

  return { passed: true, count };
}

// Auto-run when executed directly
if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
  runInterestTests();
}
