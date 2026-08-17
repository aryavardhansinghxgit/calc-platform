import { calculateGreatestCommonFactorGCFCalculator } from "./calculator";
import {
  parseGcfNumbersInput,
  calculateGCF,
  calculateLCM,
  computeGcfSummary,
  generateEuclideanDivisionSteps,
  generateBezoutIdentity
} from "./gcf-logic";

export function runGreatestCommonFactorGCFCalculatorTests() {
  // Test 1: Standard 3-number GCF (36, 54, 90 -> GCF 18, LCM 540)
  const res1 = calculateGreatestCommonFactorGCFCalculator({ num1: 36, num2: 54, num3: 90 });
  if (res1.gcf !== 18 || res1.lcm !== 540) {
    throw new Error(`Expected GCF(36,54,90)=18, LCM=540; got GCF=${res1.gcf}, LCM=${res1.lcm}`);
  }

  // Test 2: Large numbers Euclidean Algorithm (268442, 178296 -> GCF 2)
  const euc = generateEuclideanDivisionSteps([268442, 178296]);
  const lastStep = euc.divisionSteps[euc.divisionSteps.length - 1];
  if (lastStep.divisor !== 2 || lastStep.remainder !== 0) {
    throw new Error(`Expected Euclidean algorithm GCF for 268442 & 178296 to be 2, got divisor=${lastStep.divisor}`);
  }

  // Test 3: Bézout Identity (48x + 180y = 12)
  const bezout = generateBezoutIdentity(48, 180);
  if (bezout.gcf !== 12 || (48 * bezout.x + 180 * bezout.y !== 12)) {
    throw new Error(`Bézout identity failed for (48, 180): got GCF=${bezout.gcf}, identity=${bezout.identityStr}`);
  }

  // Test 4: Coprime detection (17, 31 -> GCF 1, Coprime=true)
  const summaryCoprime = computeGcfSummary([17, 31]);
  if (summaryCoprime.gcf !== 1 || !summaryCoprime.isCoprime) {
    throw new Error("Coprime detection failed for (17, 31)");
  }

  // Test 5: String parser
  const parsed = parseGcfNumbersInput("16, 88 104; 208");
  if (parsed.length !== 4 || parsed[0] !== 16 || parsed[3] !== 208) {
    throw new Error(`Input parser failed for '16, 88 104; 208', got ${JSON.stringify(parsed)}`);
  }

  // Test 6: Zero & Edge Inputs
  const resZero = calculateGreatestCommonFactorGCFCalculator({ num1: 0, num2: 0, num3: 0 });
  if (!resZero || typeof resZero.gcf !== "number") {
    throw new Error("Formula failed for zero inputs");
  }

  return true;
}
