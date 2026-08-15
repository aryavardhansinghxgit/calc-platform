import { calculateSampleSizeCalculator } from "./calculator";
import {
  computeSurveySampleSize,
  computeABTestSampleSize,
  computeContinuousMeanSampleSize,
  computeReverseMarginOfError
} from "./sample-size-logic";

export function runSampleSizeCalculatorTests() {
  // Test 1: Infinite Population Cochran's Formula (95% Conf, ±5% MOE -> n = 385)
  const infiniteRes = computeSurveySampleSize(95, 5, 50);
  if (infiniteRes.sampleSize !== 385) {
    throw new Error(`Infinite population sample size failed: expected 385, got ${infiniteRes.sampleSize}`);
  }

  // Test 2: Finite Population Correction (95% Conf, ±5% MOE, N = 1000 -> n = 279)
  const finiteRes = computeSurveySampleSize(95, 5, 50, 1000);
  if (finiteRes.sampleSize !== 279) {
    throw new Error(`Finite population FPC failed: expected 279, got ${finiteRes.sampleSize}`);
  }

  // Test 3: Continuous Mean Sample Size (95% Conf, E = 2, SD = 10 -> n = 97)
  const continuousN = computeContinuousMeanSampleSize(95, 2, 10);
  if (continuousN !== 97) {
    throw new Error(`Continuous mean sample size failed: expected 97, got ${continuousN}`);
  }

  // Test 4: A/B Test Sample Size (3.0% vs 3.5% conversion, 80% power)
  const abRes = computeABTestSampleSize(3.0, 3.5, 5, 80);
  if (abRes.sampleSizePerVariant <= 0) {
    throw new Error(`A/B test sample size calculation failed: got ${abRes.sampleSizePerVariant}`);
  }

  // Test 5: Reverse Margin of Error (n = 385, 95% Conf -> ±5.0%)
  const reverseMOE = computeReverseMarginOfError(385, 95, 50);
  if (Math.abs(reverseMOE - 5.0) > 0.1) {
    throw new Error(`Reverse margin of error failed: expected ±5.0%, got ±${reverseMOE}%`);
  }

  // Test 6: Fallback calculator wrapper test
  const resDefault = calculateSampleSizeCalculator({ confidenceLevel: "95", marginError: 5, population: 1000 });
  if (resDefault.sampleSize !== 279) {
    throw new Error(`Fallback calculator failed: expected 279, got ${resDefault.sampleSize}`);
  }

  return true;
}
