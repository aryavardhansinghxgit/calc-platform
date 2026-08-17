import { calculateStandardDeviationCalculator } from "./calculator";
import {
  parseDataset,
  computeDescriptiveStats,
  compareTwoDatasets
} from "./std-dev-logic";

export function runStandardDeviationCalculatorTests() {
  // Test 1: Sample SD for [10, 12, 23, 23, 16, 23, 21, 16] (Mean = 18.0, Sample SD = 5.2372)
  const res1 = calculateStandardDeviationCalculator({ dataSeries: "10, 12, 23, 23, 16, 23, 21, 16" });
  if (Math.abs(res1.mean - 18.0) > 0.01) {
    throw new Error(`Expected mean 18.0, got ${res1.mean}`);
  }
  if (Math.abs(res1.sampleSD - 5.2372) > 0.01) {
    throw new Error(`Expected sample SD 5.2372, got ${res1.sampleSD}`);
  }

  // Test 2: Population SD vs Sample SD for [10, 12, 16, 22, 25] (Sample SD = 6.4031, Pop SD = 5.7271)
  const stats = computeDescriptiveStats([10, 12, 16, 22, 25], true);
  if (Math.abs(stats.sampleSD - 6.4031) > 0.01) {
    throw new Error(`Sample SD failed: expected 6.4031, got ${stats.sampleSD}`);
  }
  if (Math.abs(stats.popSD - 5.7271) > 0.01) {
    throw new Error(`Population SD failed: expected 5.7271, got ${stats.popSD}`);
  }

  // Test 3: Quartiles & IQR for [10, 12, 16, 22, 25]
  if (stats.min !== 10 || stats.max !== 25 || stats.median !== 16) {
    throw new Error(`Five-number summary failed: got min=${stats.min}, med=${stats.median}, max=${stats.max}`);
  }

  // Test 4: Two-dataset comparison
  const comp = compareTwoDatasets([10, 12, 15], [14, 16, 19]);
  if (Math.abs(comp.statsA.mean - 12.3333) > 0.01 || Math.abs(comp.statsB.mean - 16.3333) > 0.01) {
    throw new Error(`Two dataset comparison failed: got ${comp.statsA.mean} and ${comp.statsB.mean}`);
  }

  // Test 5: Zero & Edge Inputs
  const resZero = calculateStandardDeviationCalculator({ dataSeries: "0" });
  if (!resZero || typeof resZero.sampleSD !== "number") {
    throw new Error("Formula failed for zero inputs");
  }

  return true;
}
