import { calculateScientificCalculator } from "./calculator";

export function runScientificCalculatorTests() {
  // Test 1: Trigonometric Sine (45 deg)
  const res1 = calculateScientificCalculator({ value1: 45, operation: "sin", angleUnit: "deg" });
  if (!res1 || typeof res1.result !== "number" || Math.abs(res1.result - 0.70710678) > 0.0001) {
    throw new Error("Sin 45° test failed");
  }

  // Test 2: Angle in Radians (sin pi/2)
  const resRad = calculateScientificCalculator({ value1: Math.PI / 2, operation: "sin", angleUnit: "rad" });
  if (resRad.result !== 1) {
    throw new Error("Sin (π/2 rad) test failed");
  }

  // Test 3: Natural Logarithm (ln e)
  const resLn = calculateScientificCalculator({ value1: Math.E, operation: "ln" });
  if (resLn.result !== 1) {
    throw new Error("ln(e) test failed");
  }

  // Test 4: Factorial (5!)
  const resFact = calculateScientificCalculator({ value1: 5, operation: "factorial" });
  if (resFact.result !== 120) {
    throw new Error("Factorial 5! test failed");
  }

  // Test 5: Power X^Y (2^10)
  const resPow = calculateScientificCalculator({ value1: 2, value2: 10, operation: "pow" });
  if (resPow.result !== 1024) {
    throw new Error("Power 2^10 test failed");
  }

  // Test 6: Log Domain Boundary (ln 0)
  const resDomain = calculateScientificCalculator({ value1: 0, operation: "ln" });
  if (resDomain.result !== "Undefined") {
    throw new Error("Log domain boundary test failed");
  }

  // Test 7: Factorial Overflow (171!)
  const resOverflow = calculateScientificCalculator({ value1: 171, operation: "factorial" });
  if (resOverflow.result !== "Infinity (Overflow)") {
    throw new Error("Factorial overflow test failed");
  }

  return true;
}
