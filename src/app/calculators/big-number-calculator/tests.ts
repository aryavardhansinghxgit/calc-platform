import { calculateBigNumberCalculator } from "./calculator";
import {
  addBigInt,
  multiplyBigInt,
  modPowBigInt,
  factorialBigInt,
  factorialTrailingZeros,
  analyzeDigits
} from "./big-number-logic";

export function runBigNumberCalculatorTests() {
  // Test 1: Addition of 30-digit numbers
  const x = "1000000000000000000000000000000";
  const y = "98765432109876543210987654321";
  const sum = addBigInt(x, y);
  if (sum !== "1098765432109876543210987654321") {
    throw new Error(`BigInt addition failed: got ${sum}`);
  }

  // Test 2: Modular Exponentiation (7^13 mod 13 = 7, per Fermat's Little Theorem 7^12 ≡ 1 mod 13)
  const modPow = modPowBigInt("7", "13", "13");
  if (modPow !== "7") {
    throw new Error(`Modular exponentiation 7^13 mod 13 failed: expected 7, got ${modPow}`);
  }

  // Test 3: Large Factorial Trailing Zeros (100! -> 24 zeros)
  const zeros100 = factorialTrailingZeros(100);
  if (zeros100 !== 24) {
    throw new Error(`Legendre formula failed for 100!: expected 24 trailing zeros, got ${zeros100}`);
  }

  // Test 4: Factorial Calculation (10! = 3628800)
  const f10 = factorialBigInt(10);
  if (f10 !== "3628800") {
    throw new Error(`Factorial 10! failed: expected 3628800, got ${f10}`);
  }

  // Test 5: Digit Inspector Analytics
  const analytics = analyzeDigits("1234567890");
  if (analytics.digitCount !== 10 || analytics.digitSum !== 45) {
    throw new Error(`Digit analytics failed: count=${analytics.digitCount}, sum=${analytics.digitSum}`);
  }

  // Test 6: Zero & Edge Inputs
  const resZero = calculateBigNumberCalculator({ num1: "0", num2: "0", operation: "+" });
  if (!resZero || typeof resZero.result !== "string") {
    throw new Error("Formula failed for zero inputs");
  }

  return true;
}
