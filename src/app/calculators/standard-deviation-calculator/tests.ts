import { calculateStandardDeviationCalculator } from "./calculator";
import {
  parseDataset,
  computeDescriptiveStats,
  compareTwoDatasets
} from "./std-dev-logic";

export function runStandardDeviationCalculatorTests() {
  // Test 1: Golden Dataset 1: [10, 12, 23, 16, 23, 21, 16, 16] (N = 8, Sum = 137, Mean = 17.125)
  const res1 = calculateStandardDeviationCalculator({ dataSeries: "10, 12, 23, 16, 23, 21, 16, 16" });
  if (Math.abs(res1.mean - 17.125) > 0.0001) {
    throw new Error(`Expected mean 17.125, got ${res1.mean}`);
  }
  if (Math.abs(res1.sampleSD - 4.8532) > 0.001) {
    throw new Error(`Expected sample SD 4.8532, got ${res1.sampleSD}`);
  }
  if (Math.abs(res1.populationSD - 4.5398) > 0.001) {
    throw new Error(`Expected population SD 4.5398, got ${res1.populationSD}`);
  }
  if (Math.abs(res1.sampleVariance - 23.5536) > 0.001) {
    throw new Error(`Expected sample variance 23.5536, got ${res1.sampleVariance}`);
  }

  // Full detailed metrics for Golden Dataset 1
  const stats1Sample = computeDescriptiveStats([10, 12, 23, 16, 23, 21, 16, 16], true);
  if (Math.abs(stats1Sample.sumSqDev - 164.875) > 0.0001) {
    throw new Error(`Expected SS 164.875, got ${stats1Sample.sumSqDev}`);
  }
  if (Math.abs(stats1Sample.stdError - 1.7159) > 0.001) {
    throw new Error(`Expected sample SE 1.7159, got ${stats1Sample.stdError}`);
  }
  if (Math.abs(stats1Sample.coeffVar - 28.3399) > 0.01) {
    throw new Error(`Expected sample CV 28.3399%, got ${stats1Sample.coeffVar}`);
  }

  const stats1Pop = computeDescriptiveStats([10, 12, 23, 16, 23, 21, 16, 16], false);
  if (Math.abs(stats1Pop.popVar - 20.609375) > 0.0001) {
    throw new Error(`Expected population variance 20.609375, got ${stats1Pop.popVar}`);
  }
  if (Math.abs(stats1Pop.popSD - 4.539755) > 0.001) {
    throw new Error(`Expected population SD 4.539755, got ${stats1Pop.popSD}`);
  }

  // Test 2: Golden Dataset 2: [10, 12, 16, 22, 25] (N = 5, Mean = 17, Sample Var = 41, Pop Var = 32.8)
  const stats2 = computeDescriptiveStats([10, 12, 16, 22, 25], true);
  if (Math.abs(stats2.mean - 17.0) > 0.0001) {
    throw new Error(`Golden 2 mean failed: expected 17.0, got ${stats2.mean}`);
  }
  if (Math.abs(stats2.sumSqDev - 164) > 0.0001) {
    throw new Error(`Golden 2 SS failed: expected 164, got ${stats2.sumSqDev}`);
  }
  if (Math.abs(stats2.sampleVar - 41.0) > 0.0001) {
    throw new Error(`Golden 2 sample variance failed: expected 41, got ${stats2.sampleVar}`);
  }
  if (Math.abs(stats2.sampleSD - 6.403124) > 0.001) {
    throw new Error(`Golden 2 sample SD failed: expected 6.403124, got ${stats2.sampleSD}`);
  }
  if (Math.abs(stats2.popVar - 32.8) > 0.0001) {
    throw new Error(`Golden 2 pop variance failed: expected 32.8, got ${stats2.popVar}`);
  }
  if (Math.abs(stats2.popSD - 5.727128) > 0.001) {
    throw new Error(`Golden 2 pop SD failed: expected 5.727128, got ${stats2.popSD}`);
  }
  if (Math.abs(stats2.stdError - 2.863564) > 0.001) {
    throw new Error(`Golden 2 sample SE failed: expected 2.863564, got ${stats2.stdError}`);
  }
  if (Math.abs(stats2.coeffVar - 37.6654) > 0.01) {
    throw new Error(`Golden 2 sample CV failed: expected 37.6654%, got ${stats2.coeffVar}`);
  }

  // Test 3: Golden Dataset 3: [1, 2, 3, 4, 5] (N = 5, Mean = 3, Sample Var = 2.5, Pop Var = 2.0)
  const stats3 = computeDescriptiveStats([1, 2, 3, 4, 5], true);
  if (stats3.mean !== 3 || stats3.sampleVar !== 2.5 || stats3.popVar !== 2) {
    throw new Error(`Golden 3 failed: got mean=${stats3.mean}, s²=${stats3.sampleVar}, σ²=${stats3.popVar}`);
  }
  if (Math.abs(stats3.sampleSD - 1.581139) > 0.001 || Math.abs(stats3.popSD - 1.414214) > 0.001) {
    throw new Error(`Golden 3 SD failed: s=${stats3.sampleSD}, σ=${stats3.popSD}`);
  }
  if (Math.abs(stats3.stdError - 0.707107) > 0.001) {
    throw new Error(`Golden 3 SE failed: got ${stats3.stdError}`);
  }

  // Test 4: Two-Dataset Comparison: [10, 12, 15, 18, 20] vs [14, 16, 19, 22, 25]
  const comp = compareTwoDatasets([10, 12, 15, 18, 20], [14, 16, 19, 22, 25]);
  if (Math.abs(comp.statsA.mean - 15.0) > 0.001 || Math.abs(comp.statsA.sampleVar - 17.0) > 0.001) {
    throw new Error(`Comp Dataset A failed: mean=${comp.statsA.mean}, var=${comp.statsA.sampleVar}`);
  }
  if (Math.abs(comp.statsB.mean - 19.2) > 0.001 || Math.abs(comp.statsB.sampleVar - 19.7) > 0.001) {
    throw new Error(`Comp Dataset B failed: mean=${comp.statsB.mean}, var=${comp.statsB.sampleVar}`);
  }
  if (Math.abs(comp.fRatio - 0.862944) > 0.001) {
    throw new Error(`F-ratio failed: expected 0.862944, got ${comp.fRatio}`);
  }
  if (Math.abs(comp.pooledSD - 4.28369) > 0.001) {
    throw new Error(`Pooled SD failed: expected 4.2837, got ${comp.pooledSD}`);
  }

  // Test 5: Single value [10]
  const singleStats = computeDescriptiveStats([10], true);
  if (singleStats.count !== 1 || singleStats.mean !== 10 || singleStats.popVar !== 0 || singleStats.popSD !== 0) {
    throw new Error("Single value stats failed");
  }

  // Test 6: Zero & All-Zeros [0, 0, 0, 0]
  const zeroStats = computeDescriptiveStats([0, 0, 0, 0], true);
  if (zeroStats.mean !== 0 || zeroStats.sampleVar !== 0 || zeroStats.sampleSD !== 0 || zeroStats.coeffVar !== 0) {
    throw new Error("All zero stats failed");
  }

  // Test 7: Zero Mean [-10, -5, 0, 5, 10]
  const zeroMeanStats = computeDescriptiveStats([-10, -5, 0, 5, 10], true);
  if (zeroMeanStats.mean !== 0) {
    throw new Error(`Expected zero mean, got ${zeroMeanStats.mean}`);
  }
  if (Math.abs(zeroMeanStats.sampleVar - 62.5) > 0.001) {
    throw new Error(`Expected sample variance 62.5, got ${zeroMeanStats.sampleVar}`);
  }

  // Test 8: Parsing various delimiters
  const parsed1 = parseDataset("10,12,23,16,23,21,16,16");
  const parsed2 = parseDataset("10 12 23 16 23 21 16 16");
  const parsed3 = parseDataset("10\n12\n23\n16\n23\n21\n16\n16");
  const parsed4 = parseDataset("10, 12\n23 16\n23\n21,16,16");
  if (parsed1.length !== 8 || parsed2.length !== 8 || parsed3.length !== 8 || parsed4.length !== 8) {
    throw new Error("Parsing delimiter variations failed");
  }

  return true;
}
