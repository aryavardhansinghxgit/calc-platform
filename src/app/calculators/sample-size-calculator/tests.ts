import { calculateSampleSizeCalculator } from "./calculator";
import {
  computeSurveySampleSize,
  computeABTestSampleSize,
  computeContinuousMeanSampleSize,
  computeReverseMarginOfError,
  computePowerAnalysisSampleSize
} from "./sample-size-logic";

export function runSampleSizeCalculatorTests() {
  // G1: 95% Conf, ±5% MOE, infinite population -> n = 385
  const g1 = computeSurveySampleSize(95, 5, 50);
  if (!g1.isValid || g1.sampleSize !== 385) {
    throw new Error(`G1 failed: expected 385, got ${g1.sampleSize}`);
  }

  // G2: 95% Conf, ±5% MOE, N = 1000 -> n = 278
  const g2 = computeSurveySampleSize(95, 5, 50, 1000);
  if (!g2.isValid || g2.sampleSize !== 278) {
    throw new Error(`G2 failed: expected 278, got ${g2.sampleSize}`);
  }

  // G3: 99% Conf, ±11% MOE, infinite -> n = 138
  const g3 = computeSurveySampleSize(99, 11, 50);
  if (!g3.isValid || g3.sampleSize !== 138) {
    throw new Error(`G3 failed: expected 138, got ${g3.sampleSize}`);
  }

  // G4: 385 completed, 80% response rate -> 482 recruitment invitations
  const g4 = computeSurveySampleSize(95, 5, 50, undefined, 80);
  if (!g4.isValid || g4.invitedTarget !== 482) {
    throw new Error(`G4 failed: expected 482, got ${g4.invitedTarget}`);
  }

  // G5: 400 sample, 95% Conf, infinite -> ±4.90% MOE
  const g5 = computeReverseMarginOfError(400, 95, 50);
  if (!g5.isValid || Math.abs(g5.moe - 4.90) > 0.05) {
    throw new Error(`G5 failed: expected ±4.90%, got ±${g5.moe}%`);
  }

  // G6: 400 sample, 90% Conf, infinite -> ±4.11% MOE
  const g6 = computeReverseMarginOfError(400, 90, 50);
  if (!g6.isValid || Math.abs(g6.moe - 4.11) > 0.05) {
    throw new Error(`G6 failed: expected ±4.11%, got ±${g6.moe}%`);
  }

  // G7: A/B 3.0% vs 3.5%, 80% power -> 19,740 per variant
  const g7 = computeABTestSampleSize(3.0, 3.5, 5, 80);
  if (!g7.isValid || g7.sampleSizePerVariant !== 19740) {
    throw new Error(`G7 failed: expected 19,740, got ${g7.sampleSizePerVariant}`);
  }

  // G8: A/B 3.1% vs 3.9%, 90% power -> 11,085 per variant
  const g8 = computeABTestSampleSize(3.1, 3.9, 5, 90);
  if (!g8.isValid || g8.sampleSizePerVariant !== 11085) {
    throw new Error(`G8 failed: expected 11,085, got ${g8.sampleSizePerVariant}`);
  }

  // G9: Extreme finite population N = 10 -> sample size cannot exceed 10
  const g9 = computeSurveySampleSize(95, 5, 50, 10);
  if (!g9.isValid || g9.sampleSize !== 10) {
    throw new Error(`G9 failed: expected sampleSize 10 for N=10, got ${g9.sampleSize}`);
  }

  // G10: Invalid zero response rate -> flagged invalid
  const g10 = computeSurveySampleSize(95, 5, 50, undefined, 0);
  if (g10.isValid) {
    throw new Error(`G10 failed: 0% response rate should be invalid`);
  }

  // G11: Continuous mean mode zero SD -> flagged invalid
  const g11 = computeContinuousMeanSampleSize(95, 2, 0);
  if (g11.isValid) {
    throw new Error(`G11 failed: zero SD should be invalid`);
  }

  // G12: Empty population -> infinite population Cochran formula
  const g12 = computeSurveySampleSize(95, 5, 50, undefined);
  if (!g12.isValid || g12.fpcApplied || g12.sampleSize !== 385) {
    throw new Error(`G12 failed: undefined population should be infinite 385`);
  }

  // Server parity test
  const serverRes = calculateSampleSizeCalculator({ confidenceLevel: 95, marginError: 5, population: 1000 });
  if (serverRes.sampleSize !== 278) {
    throw new Error(`Server parity failed: expected 278, got ${serverRes.sampleSize}`);
  }

  return true;
}
