import {
  computeMeanCI,
  computeProportionCI,
  computeTwoMeansCI,
  computeTwoProportionsCI,
  computeVarianceCI,
  inverseStudentT,
  inverseNormalCDF,
  inverseChiSquare
} from "../src/app/calculators/confidence-interval-calculator/confidence-interval-logic";

console.log("=== TESTING GOLDEN CASES ===");

// G1: Mean t, 95%, mean=24.5, sd=4, n=16
const g1 = computeMeanCI(24.5, 4, 16, 95, false);
console.log("G1 Mean 95% t:");
console.log("  df:", g1.degreesOfFreedom, "critT:", g1.criticalValue, "SE:", g1.se, "ME:", g1.me);
console.log("  Bounds:", g1.lowerBound, g1.upperBound);
console.log("  Expected: critT=2.1314, ME=2.1314, bounds=[22.3686, 26.6314]");

// G2: Mean t, 98%, mean=24.5, sd=4, n=16
const g2 = computeMeanCI(24.5, 4, 16, 98, false);
console.log("\nG2 Mean 98% t:");
console.log("  df:", g2.degreesOfFreedom, "critT:", g2.criticalValue, "SE:", g2.se, "ME:", g2.me);
console.log("  Bounds:", g2.lowerBound, g2.upperBound);
console.log("  Expected: critT=2.6025, ME=2.6025, bounds=[21.8975, 27.1025]");

// G3: Mean Z, known sigma, mean=24.5, sd=4, n=16
const g3 = computeMeanCI(24.5, 4, 16, 95, true);
console.log("\nG3 Mean 95% Z:");
console.log("  critZ:", g3.criticalValue, "ME:", g3.me, "Bounds:", g3.lowerBound, g3.upperBound);
console.log("  Expected: critZ=1.9600, bounds=[22.5400, 26.4600]");

// G4, G5, G6: Proportions x=520, n=1000, 95%
const gProp = computeProportionCI(520, 1000, 95);
console.log("\nG4 Wilson: [", gProp.wilsonLower, gProp.wilsonUpper, "]");
console.log("G5 Wald: [", gProp.waldLower, gProp.waldUpper, "]");
console.log("G6 Agresti-Coull: [", gProp.agrestiLower, gProp.agrestiUpper, "]");

// G7: Two Means: m1=105, s1=12, n1=25 vs m2=98, s2=15, n2=30, 95%
const g7 = computeTwoMeansCI(105, 12, 25, 98, 15, 30, false, 95);
console.log("\nG7 Two Means:");
console.log("  diff:", g7.diff, "df:", g7.df, "critT:", g7.criticalT, "ME:", g7.me, "Bounds:", g7.lowerBound, g7.upperBound);

// G8: Two Proportions: 320/500 vs 270/500, 95%
const g8 = computeTwoProportionsCI(320, 500, 270, 500, 95);
console.log("\nG8 Two Proportions:");
console.log("  diff:", g8.diff, "critZ:", g8.criticalZ, "ME:", g8.me, "Bounds:", g8.lowerBound, g8.upperBound);

// G9: Variance: sd=10, n=20, 95%
const g9 = computeVarianceCI(10, 20, 95);
console.log("\nG9 Variance:");
console.log("  df:", g9.df, "chi2Lower:", g9.chi2Lower, "chi2Upper:", g9.chi2Upper);
console.log("  Var Bounds:", g9.varLower, g9.varUpper);
console.log("  SD Bounds:", g9.sdLower, g9.sdUpper);
