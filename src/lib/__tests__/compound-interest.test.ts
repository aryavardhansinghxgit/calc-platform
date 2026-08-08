/**
 * Unit Test Suite for Premium Compound Interest & Rate Conversion Engine.
 */

import {
  convertInterestRate,
  calculateAprVsApy,
  calculateContinuousCompounding,
  calculateRuleOf72,
  calculateSimpleVsCompoundGrowth,
} from "../calculator-engine/formulas/compound-interest";

function assertCloseTo(actual: number, expected: number, delta: number, testName: string) {
  if (Math.abs(actual - expected) > delta) {
    throw new Error(`[FAIL] ${testName}: Expected ~${expected}, got ${actual}`);
  }
}

export function runCompoundInterestTests(): { passed: boolean; count: number } {
  let count = 0;

  // Test 1: Monthly 6% APR -> Annual APY (6.16778%)
  const res1 = convertInterestRate({
    inputRatePercent: 6.0,
    sourceFrequency: "monthly",
    targetFrequency: "annual",
  });
  assertCloseTo(res1.convertedRatePercent, 6.16778, 0.001, "Monthly 6% APR to Annual APY");
  count++;

  // Test 2: Annual 6% -> Continuous (5.82689%)
  const res2 = convertInterestRate({
    inputRatePercent: 6.0,
    sourceFrequency: "annual",
    targetFrequency: "continuous",
  });
  assertCloseTo(res2.convertedRatePercent, 5.82689, 0.001, "Annual 6% to Continuous Rate");
  count++;

  // Test 3: APR vs APY Analyzer (5% Monthly -> 5.11619%)
  const aprApy = calculateAprVsApy(5.0, "monthly");
  assertCloseTo(aprApy.apyPercent, 5.11619, 0.001, "APR vs APY 5% Monthly");
  count++;

  // Test 4: Continuous Compounding ($1,000, 6%, 2 yrs -> $1,127.50)
  const cont = calculateContinuousCompounding(1000, 6.0, 2);
  assertCloseTo(cont.futureValue, 1127.50, 0.1, "Continuous Compounding $1000 at 6% for 2 yrs");
  count++;

  // Test 5: Rule of 72 (8% return -> 9 years)
  const rule72 = calculateRuleOf72(8.0);
  assertCloseTo(rule72.ruleOf72Years, 9.0, 0.01, "Rule of 72 for 8%");
  count++;

  // Test 6: Simple vs Compound Growth (1000 @ 10% for 5 yrs: Simple = $1500, Compound = $1645.31)
  const simpleVsComp = calculateSimpleVsCompoundGrowth(1000, 10.0, 5);
  const milestone5 = simpleVsComp.milestones.find((m) => m.year === 5);
  if (!milestone5) throw new Error("Milestone year 5 missing");
  assertCloseTo(milestone5.simpleValue, 1500, 1, "Simple Interest 5 yrs");
  assertCloseTo(milestone5.compoundValue, 1645.31, 2, "Compound Interest 5 yrs");
  count++;

  return { passed: true, count };
}

// Auto-run when executed directly
if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
  runCompoundInterestTests();
}
