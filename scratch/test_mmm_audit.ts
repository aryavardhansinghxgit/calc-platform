import {
  parseDataset,
  computeStandardMMM,
  computeAdvancedMeans,
  computeGroupedMMM,
  computeTargetMean,
  computeOutlierSkewness
} from "../src/app/calculators/mean-median-mode-calculator/mmm-logic";

console.log("=== RUNNING MEAN MEDIAN MODE AUDIT SCRIPT ===");

// G1: 15-value PDF dataset (ending in 29)
const g1_raw = "3, 7, 5, 13, 20, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29";
const g1_data = parseDataset(g1_raw);
const g1_res = computeStandardMMM(g1_data, true);
console.log("G1 (29-end):", {
  count: g1_res.count,
  sum: g1_res.sum,
  mean: g1_res.mean,
  median: g1_res.median,
  mode: g1_res.modes,
  range: g1_res.range,
  sampleSD: g1_res.sampleSD,
  popSD: g1_res.popSD
});

// G2: 15-value dataset ending in 24
const g2_raw = "3, 7, 5, 13, 20, 23, 39, 23, 40, 23, 14, 12, 56, 23, 24";
const g2_data = parseDataset(g2_raw);
const g2_res = computeStandardMMM(g2_data, false);
console.log("G2 (24-end Pop):", {
  count: g2_res.count,
  sum: g2_res.sum,
  mean: g2_res.mean,
  median: g2_res.median,
  range: g2_res.range,
  popVar: g2_res.popVar,
  popSD: g2_res.popSD
});

// G3: Sample vs Population: 1, 2, 3, 4, 5
const g3_res_sample = computeStandardMMM([1, 2, 3, 4, 5], true);
const g3_res_pop = computeStandardMMM([1, 2, 3, 4, 5], false);
console.log("G3:", {
  sampleVar: g3_res_sample.sampleVar,
  sampleSD: g3_res_sample.sampleSD,
  popVar: g3_res_pop.popVar,
  popSD: g3_res_pop.popSD
});

// G4: Weighted Mean: 10,15,18,20,22,25,150 weights 1,2,3,4,5,6,7
const g4_res = computeAdvancedMeans("10, 15, 18, 20, 22, 25, 150", "1, 2, 3, 4, 5, 6, 7", 10);
console.log("G4 Weighted Mean:", g4_res.weightedMean);

// G5: Trimmed Mean 15% on 10, 15, 18, 20, 22, 25, 150
const g5_res = computeAdvancedMeans("10, 15, 18, 20, 22, 25, 150", "1, 2, 3, 4, 5, 6, 7", 15);
console.log("G5 Trimmed Mean (15%):", g5_res.trimmedMean, "Removed:", g5_res.removedItems);

// G6 & G7: Geometric & Harmonic Mean
console.log("G6 Geometric:", g5_res.geometricMean, "G7 Harmonic:", g5_res.harmonicMean);

// G8: Grouped Mean
const g8_res = computeGroupedMMM("15, 25, 35, 45, 55", "4, 8, 15, 7, 2");
console.log("G8 Grouped Mean:", g8_res.groupedMean, "Total N:", g8_res.totalN, "Modal Class:", g8_res.modalClass);

// G9: Target Solver
const g9_res = computeTargetMean("85, 90, 88, 92", 90, 5);
console.log("G9 Target Score:", g9_res.neededScore, "Achievable:", g9_res.isAchievable, "Current Mean:", g9_res.currentMean);

// G10: Comparison
const g10_a = computeStandardMMM(parseDataset("12, 15, 18, 22, 25, 28"), true);
const g10_b = computeStandardMMM(parseDataset("10, 14, 19, 24, 30, 35"), true);
console.log("G10 Comparison:", {
  meanA: g10_a.mean,
  meanB: g10_b.mean,
  deltaMean: (g10_b.mean - g10_a.mean).toFixed(2),
  sdA: g10_a.sampleSD,
  sdB: g10_b.sampleSD,
  deltaSD: (g10_b.sampleSD - g10_a.sampleSD).toFixed(4)
});

// G11 & G12: Outlier & Skewness
const g11_res = computeOutlierSkewness(parseDataset("10, 12, 14, 15, 15, 16, 18, 20, 22, 100"));
console.log("G11/G12 Outlier & Skewness:", {
  skewness: g11_res.skewness,
  shape: g11_res.skewnessShape,
  lower: g11_res.lowerFence,
  upper: g11_res.upperFence,
  outliers: g11_res.outliers
});
