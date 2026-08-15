import { calculateRootCalculator } from "./calculator";
import { simplifyRadical, evaluateFractionalExponent, calculateNewtonRaphson, rationalizeDenominator } from "./root-logic";

export function runRootCalculatorTests() {
  // Test 1: Square Root calculation
  const res1 = calculateRootCalculator({ value: 64, degree: 3 });
  if (res1.rootResult !== 4) {
    throw new Error(`Expected cube root of 64 to be 4, got ${res1.rootResult}`);
  }

  // Test 2: Radical simplification
  const simp1 = simplifyRadical(72, 2);
  if (simp1.coefficient !== 6 || simp1.radicand !== 2) {
    throw new Error(`Expected √72 = 6√2, got ${simp1.coefficient}√${simp1.radicand}`);
  }

  const simp2 = simplifyRadical(108, 3);
  if (simp2.coefficient !== 3 || simp2.radicand !== 4) {
    throw new Error(`Expected ∛108 = 3∛4, got ${simp2.coefficient}∛${simp2.radicand}`);
  }

  // Test 3: Fractional exponent evaluation
  const frac1 = evaluateFractionalExponent(32, 3, 5);
  if (Math.abs(frac1.decimalValue - 8) > 1e-6) {
    throw new Error(`Expected 32^(3/5) = 8, got ${frac1.decimalValue}`);
  }

  // Test 4: Newton-Raphson iterations
  const steps = calculateNewtonRaphson(100, 2);
  if (steps.length === 0 || Math.abs(steps[steps.length - 1].nextGuess - 10) > 1e-6) {
    throw new Error("Newton-Raphson algorithm failed for √100");
  }

  // Test 5: Rationalizing denominator
  const rat = rationalizeDenominator(3, 5, 2);
  if (rat.numeratorRadicand !== 15 || rat.denominator !== 5) {
    throw new Error(`Expected √(3/5) = √15 / 5, got ${rat.formattedText}`);
  }

  // Test 6: Zero & Edge Inputs
  const resZero = calculateRootCalculator({ value: 0, degree: 5 });
  if (resZero.rootResult !== 0) {
    throw new Error("Formula failed for zero input");
  }

  return true;
}
