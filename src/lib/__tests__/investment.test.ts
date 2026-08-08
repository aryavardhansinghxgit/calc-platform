/**
 * Unit Test Suite for Premium Investment Calculator Engine.
 */

import { calculateInvestmentFormula } from "../calculator-engine/formulas/investment";

function assertCloseTo(actual: number, expected: number, delta: number, testName: string) {
  if (Math.abs(actual - expected) > delta) {
    throw new Error(`[FAIL] ${testName}: Expected ~${expected}, got ${actual}`);
  }
}

export function runInvestmentTests(): { passed: boolean; count: number } {
  let count = 0;

  // Test 1: Calculator.net Reference Screenshot Worked Example
  // Starting $20,000, 10 years, 6% return rate, annual compounding, $1,000/month contribution at end
  const res1 = calculateInvestmentFormula({
    mode: "future_value",
    startingAmount: 20000,
    durationValue: 10,
    durationUnit: "years",
    annualReturnRate: 6.0,
    compoundingFrequency: "annual",
    additionalContribution: 1000,
    contributionFrequency: "month",
    contributionTiming: "end",
  });

  assertCloseTo(res1.endingBalance, 198290.4, 1.0, "Ending Balance Worked Example");
  assertCloseTo(res1.startingAmount, 20000, 0.01, "Starting Amount");
  assertCloseTo(res1.totalContributions, 120000, 0.01, "Total Contributions");
  assertCloseTo(res1.totalInterestEarned, 58290.4, 1.0, "Total Interest");
  assertCloseTo(res1.percentStartingAmount, 10.08, 0.5, "Starting Amount %");
  assertCloseTo(res1.percentContributions, 60.52, 0.5, "Contributions %");
  assertCloseTo(res1.percentInterest, 29.4, 0.5, "Interest %");
  count++;

  // Test 2: Monte Carlo Simulation
  assertCloseTo(res1.monteCarlo.simulationsCount, 1000, 0.01, "Simulations Count");
  if (res1.monteCarlo.worstCase10th >= res1.monteCarlo.bestCase90th) {
    throw new Error("[FAIL] Monte Carlo 10th percentile should be less than 90th percentile");
  }
  count++;

  // Test 3: Goal Tracker
  const res3 = calculateInvestmentFormula({
    mode: "future_value",
    startingAmount: 50000,
    investmentGoal: 100000,
    durationValue: 5,
    annualReturnRate: 7.0,
  });
  if (res3.goalTracker.currentProgressPercent <= 0) {
    throw new Error("[FAIL] Goal tracker progress percent should be > 0");
  }
  count++;

  return { passed: true, count };
}

// Auto-run when executed directly
if (typeof process !== "undefined" && process.env.NODE_ENV === "test") {
  runInvestmentTests();
}
