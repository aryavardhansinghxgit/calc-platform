import { calculateNumberSequenceCalculator } from "./calculator";
import {
  parseSequenceInput,
  detectSequencePattern,
  computeFibonacciBinet,
  generateFiniteDifferenceTable
} from "./sequence-logic";

export function runNumberSequenceCalculatorTests() {
  // Test 1: Arithmetic Pattern Detection (3, 7, 11, 15 -> d=4, a_10 = 39, S_10 = 210)
  const arith = detectSequencePattern([3, 7, 11, 15], 10);
  if (arith.type !== "arithmetic" || arith.commonDiff !== 4 || arith.targetTerm !== 39) {
    throw new Error(`Arithmetic detection failed: got type=${arith.type}, d=${arith.commonDiff}, a10=${arith.targetTerm}`);
  }

  // Test 2: Geometric Pattern Detection (2, 6, 18, 54 -> r=3, a_5 = 162)
  const geom = detectSequencePattern([2, 6, 18, 54], 5);
  if (geom.type !== "geometric" || geom.commonRatio !== 3 || geom.targetTerm !== 162) {
    throw new Error(`Geometric detection failed: got type=${geom.type}, r=${geom.commonRatio}, a5=${geom.targetTerm}`);
  }

  // Test 3: Quadratic Pattern Detection (2, 5, 10, 17, 26 -> a_n = n^2 + 1, a_10 = 101)
  const quad = detectSequencePattern([2, 5, 10, 17, 26], 10);
  if (quad.type !== "quadratic" || quad.targetTerm !== 101) {
    throw new Error(`Quadratic detection failed: got type=${quad.type}, a10=${quad.targetTerm}`);
  }

  // Test 4: Binet's Fibonacci Formula (F_10 = 55)
  const fib10 = computeFibonacciBinet(10);
  if (fib10 !== 55) {
    throw new Error(`Binet formula failed for F_10: expected 55, got ${fib10}`);
  }

  // Test 5: Finite Difference Table
  const table = generateFiniteDifferenceTable([2, 5, 10, 17, 26]);
  if (table.length < 3 || !table[2].isConstant) {
    throw new Error(`Finite difference table failed: expected Level 2 constant`);
  }

  // Test 6: Zero & Edge Inputs
  const resZero = calculateNumberSequenceCalculator({ firstTerm: 0, diffRatio: 0, termCount: 5 });
  if (!resZero || typeof resZero.nthTerm !== "number") {
    throw new Error("Formula failed for zero inputs");
  }

  return true;
}
