import { calculateFactorCalculator } from "./calculator";
import {
  getAllPositiveFactors,
  getFactorPairs,
  getPrimeFactorization,
  computeDivisorAnalytics,
  factorQuadraticTrinomial,
  computeFactorSummary
} from "./factor-logic";

export function runFactorCalculatorTests() {
  // Test 1: Factors of 120 (16 factors total)
  const res1 = calculateFactorCalculator({ number: 120 });
  if (res1.factorCount !== 16 || !res1.primeFactors.includes("2 × 2 × 2 × 3 × 5")) {
    throw new Error(`Expected 120 to have 16 factors and prime factors 2×2×2×3×5, got ${res1.factorCount}`);
  }

  // Test 2: Factor Pairs for 120 (8 pairs)
  const pairs = getFactorPairs(120);
  if (pairs.length !== 8 || pairs[0].a !== 1 || pairs[0].b !== 120) {
    throw new Error(`Expected 8 factor pairs for 120, got ${pairs.length}`);
  }

  // Test 3: Perfect number classification (6 -> Perfect Number, s(6) = 6)
  const analytics6 = computeDivisorAnalytics(6);
  if (analytics6.abundanceCategory !== "Perfect" || analytics6.aliquotSum !== 6) {
    throw new Error(`Expected 6 to be Perfect Number, got ${analytics6.abundanceCategory}`);
  }

  // Test 4: Quadratic Trinomial Factoring (x^2 - 5x + 6 -> (x - 2)(x - 3) or (x - 3)(x - 2))
  const quad = factorQuadraticTrinomial(1, -5, 6);
  if (!quad.isFactorable || (!quad.factoredString.includes("(x - 2)") || !quad.factoredString.includes("(x - 3)"))) {
    throw new Error(`Expected x^2 - 5x + 6 to factor into (x - 2)(x - 3), got ${quad.factoredString}`);
  }

  // Test 5: Prime Number (997)
  const summaryPrime = computeFactorSummary(997);
  if (summaryPrime.analytics.classification !== "Prime" || summaryPrime.factors.length !== 2) {
    throw new Error("Expected 997 to be classified as Prime Number");
  }

  // Test 6: Zero & Edge Inputs
  const resZero = calculateFactorCalculator({ number: 0 });
  if (!resZero || typeof resZero.factorCount !== "number") {
    throw new Error("Formula failed for zero inputs");
  }

  return true;
}
