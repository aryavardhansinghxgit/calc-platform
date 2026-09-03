import {
  parseDataset,
  computeStandardMMM,
  computeAdvancedMeans,
  computeGroupedMMM,
  computeTargetMean,
  computeOutlierSkewness
} from "./mmm-logic";
import { calculateMeanMedianModeRangeCalculator } from "./calculator";

export function runMeanMedianModeCalculatorTests() {
  // G1: Raw dataset ending in 29
  const g1 = calculateMeanMedianModeRangeCalculator({
    dataSeries: "3, 7, 5, 13, 20, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29",
    isSample: true
  });
  if (g1.count !== 15 || g1.sum !== 330 || g1.mean !== 22 || g1.median !== 23 || g1.range !== 53 || g1.mode !== "23") {
    throw new Error("G1 raw dataset failed");
  }

  // G2: Changed dataset ending in 24
  const g2 = calculateMeanMedianModeRangeCalculator({
    dataSeries: "3, 7, 5, 13, 20, 23, 39, 23, 40, 23, 14, 12, 56, 23, 24",
    isSample: false
  });
  if (g2.count !== 15 || g2.sum !== 325 || Math.abs(g2.mean - 21.6667) > 1e-3 || g2.median !== 23) {
    throw new Error("G2 changed dataset failed");
  }

  // G3: Sample vs Population: 1, 2, 3, 4, 5
  const g3Sample = computeStandardMMM([1, 2, 3, 4, 5], true);
  const g3Pop = computeStandardMMM([1, 2, 3, 4, 5], false);
  if (g3Sample.sampleVar !== 2.5 || Math.abs(g3Sample.sampleSD - 1.5811) > 1e-4 || g3Pop.popVar !== 2 || Math.abs(g3Pop.popSD - 1.4142) > 1e-4) {
    throw new Error("G3 sample vs pop failed");
  }

  // G4: Weighted Mean: 10,15,18,20,22,25,150 with 1,2,3,4,5,6,7 => 53
  const g4 = computeAdvancedMeans("10, 15, 18, 20, 22, 25, 150", "1, 2, 3, 4, 5, 6, 7", 10);
  if (g4.weightedMean !== 53) {
    throw new Error("G4 weighted mean failed");
  }

  // G5: Trimmed Mean: 15% on 10, 15, 18, 20, 22, 25, 150 => 20
  const g5 = computeAdvancedMeans("10, 15, 18, 20, 22, 25, 150", "1, 2, 3, 4, 5, 6, 7", 15);
  if (g5.trimmedMean !== 20) {
    throw new Error("G5 trimmed mean failed");
  }

  // G6: Geometric Mean: 2, 8 => 4
  const g6 = computeAdvancedMeans("2, 8", "1, 1", 0);
  if (Math.abs((g6.geometricMean || 0) - 4) > 1e-4) {
    throw new Error("G6 geometric mean failed");
  }

  // G7: Harmonic Mean: 2, 4 => 2.6667
  const g7 = computeAdvancedMeans("2, 4", "1, 1", 0);
  if (Math.abs((g7.harmonicMean || 0) - 2.6667) > 1e-4) {
    throw new Error("G7 harmonic mean failed");
  }

  // G8: Grouped Mean: 15, 25, 35, 45, 55 with 4, 8, 15, 7, 2 => 33.6111
  const g8 = computeGroupedMMM("15, 25, 35, 45, 55", "4, 8, 15, 7, 2");
  if (g8.totalN !== 36 || Math.abs(g8.groupedMean - 33.6111) > 1e-3) {
    throw new Error("G8 grouped mean failed");
  }

  // G9: Target Solver: 85, 90, 88, 92 desired 90 total 5 => 95
  const g9 = computeTargetMean("85, 90, 88, 92", 90, 5);
  if (g9.neededScore !== 95 || !g9.isAchievable) {
    throw new Error("G9 target solver failed");
  }

  // G10: Comparison: 12,15,18,22,25,28 vs 10,14,19,24,30,35
  const g10A = computeStandardMMM(parseDataset("12, 15, 18, 22, 25, 28"), true);
  const g10B = computeStandardMMM(parseDataset("10, 14, 19, 24, 30, 35"), true);
  if (Math.abs(g10B.mean - g10A.mean - 2.0) > 1e-4 || Math.abs(g10B.median - g10A.median - 1.5) > 1e-4) {
    throw new Error("G10 comparison failed");
  }

  // G11: Outlier Detection: 10, 12, 14, 15, 15, 16, 18, 20, 22, 100 => [100]
  const g11 = computeOutlierSkewness(parseDataset("10, 12, 14, 15, 15, 16, 18, 20, 22, 100"));
  if (g11.outliers.length !== 1 || g11.outliers[0] !== 100) {
    throw new Error("G11 outlier detection failed");
  }

  // G12: Skewness
  if (g11.skewnessShape !== "Right-Skewed (Positive)" || Math.abs(g11.skewness - 2.5802) > 1e-3) {
    throw new Error("G12 skewness failed");
  }

  return true;
}

export const runMeanMedianModeRangeCalculatorTests = runMeanMedianModeCalculatorTests;
export default runMeanMedianModeCalculatorTests;
