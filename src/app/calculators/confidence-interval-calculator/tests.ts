import { calculateConfidenceIntervalCalculator } from "./calculator";
import {
  computeMeanCI,
  computeProportionCI,
  computeTwoMeansCI,
  computeTwoProportionsCI,
  computeVarianceCI
} from "./confidence-interval-logic";

export function runConfidenceIntervalCalculatorTests() {
  // G1: Mean t, 95%, mean=24.5, sd=4, n=16
  const g1 = computeMeanCI(24.5, 4, 16, 95, false);
  if (!g1.isValid) throw new Error("G1 failed validity check");
  if (Math.abs(g1.criticalValue - 2.1314) > 0.001) throw new Error(`G1 critT expected ~2.1314, got ${g1.criticalValue}`);
  if (Math.abs(g1.se - 1.0) > 0.001) throw new Error(`G1 SE expected 1.0, got ${g1.se}`);
  if (Math.abs(g1.lowerBound - 22.3686) > 0.01) throw new Error(`G1 lowerBound expected 22.3686, got ${g1.lowerBound}`);
  if (Math.abs(g1.upperBound - 26.6314) > 0.01) throw new Error(`G1 upperBound expected 26.6314, got ${g1.upperBound}`);

  // G2: Mean t, 98%, mean=24.5, sd=4, n=16 (Must be exact 2.6025, NOT buggy 2.6013)
  const g2 = computeMeanCI(24.5, 4, 16, 98, false);
  if (Math.abs(g2.criticalValue - 2.6025) > 0.001) throw new Error(`G2 critT expected ~2.6025, got ${g2.criticalValue}`);
  if (Math.abs(g2.lowerBound - 21.8975) > 0.01) throw new Error(`G2 lowerBound expected 21.8975, got ${g2.lowerBound}`);
  if (Math.abs(g2.upperBound - 27.1025) > 0.01) throw new Error(`G2 upperBound expected 27.1025, got ${g2.upperBound}`);

  // G3: Mean Z, known sigma, mean=24.5, sd=4, n=16, 95%
  const g3 = computeMeanCI(24.5, 4, 16, 95, true);
  if (g3.distType !== "Z") throw new Error("G3 expected Normal Z distribution");
  if (Math.abs(g3.criticalValue - 1.9600) > 0.001) throw new Error(`G3 critZ expected 1.9600, got ${g3.criticalValue}`);
  if (Math.abs(g3.lowerBound - 22.5400) > 0.01) throw new Error(`G3 lowerBound expected 22.5400, got ${g3.lowerBound}`);

  // G4: Wilson Proportion: x=520, n=1000, 95%
  const gProp = computeProportionCI(520, 1000, 95);
  if (Math.abs(gProp.wilsonLower - 0.4890) > 0.002) throw new Error(`G4 Wilson lower expected 0.4890, got ${gProp.wilsonLower}`);
  if (Math.abs(gProp.wilsonUpper - 0.5508) > 0.002) throw new Error(`G4 Wilson upper expected 0.5508, got ${gProp.wilsonUpper}`);

  // G5: Wald Proportion: x=520, n=1000, 95%
  if (Math.abs(gProp.waldLower - 0.4890) > 0.002) throw new Error(`G5 Wald lower expected 0.4890, got ${gProp.waldLower}`);
  if (Math.abs(gProp.waldUpper - 0.5510) > 0.002) throw new Error(`G5 Wald upper expected 0.5510, got ${gProp.waldUpper}`);

  // G6: Agresti-Coull Proportion: x=520, n=1000, 95%
  if (Math.abs(gProp.agrestiLower - 0.4890) > 0.002) throw new Error(`G6 Agresti lower expected 0.4890, got ${gProp.agrestiLower}`);
  if (Math.abs(gProp.agrestiUpper - 0.5508) > 0.002) throw new Error(`G6 Agresti upper expected 0.5508, got ${gProp.agrestiUpper}`);

  // G7: Two Means: m1=105, s1=12, n1=25 vs m2=98, s2=15, n2=30, 95%
  const g7 = computeTwoMeansCI(105, 12, 25, 98, 15, 30, false, 95);
  if (Math.abs(g7.diff - 7.0) > 0.001) throw new Error(`G7 diff expected 7.0, got ${g7.diff}`);
  if (Math.abs(g7.df - 52.93) > 0.1) throw new Error(`G7 Welch df expected 52.93, got ${g7.df}`);
  if (Math.abs(g7.lowerBound - (-0.304)) > 0.02) throw new Error(`G7 lowerBound expected ~ -0.304, got ${g7.lowerBound}`);
  if (Math.abs(g7.upperBound - 14.304) > 0.02) throw new Error(`G7 upperBound expected ~ 14.304, got ${g7.upperBound}`);

  // G8: Two Proportions: 320/500 vs 270/500, 95%
  const g8 = computeTwoProportionsCI(320, 500, 270, 500, 95);
  if (Math.abs(g8.diff - 0.10) > 0.001) throw new Error(`G8 diff expected 0.10, got ${g8.diff}`);
  if (Math.abs(g8.lowerBound - 0.0393) > 0.002) throw new Error(`G8 lower expected 0.0393, got ${g8.lowerBound}`);
  if (Math.abs(g8.upperBound - 0.1607) > 0.002) throw new Error(`G8 upper expected 0.1607, got ${g8.upperBound}`);

  // G9: Variance: sd=10, n=20, 95%
  const g9 = computeVarianceCI(10, 20, 95);
  if (Math.abs(g9.chi2Lower - 8.9065) > 0.005) throw new Error(`G9 chi2Lower expected 8.9065, got ${g9.chi2Lower}`);
  if (Math.abs(g9.chi2Upper - 32.8523) > 0.005) throw new Error(`G9 chi2Upper expected 32.8523, got ${g9.chi2Upper}`);
  if (Math.abs(g9.varLower - 57.8346) > 0.02) throw new Error(`G9 varLower expected 57.8346, got ${g9.varLower}`);
  if (Math.abs(g9.varUpper - 213.327) > 0.05) throw new Error(`G9 varUpper expected 213.327, got ${g9.varUpper}`);

  // G10: Invalid n=0 validation
  const g10 = computeMeanCI(24.5, 4, 0, 95, false);
  if (g10.isValid) throw new Error("G10 failed: n=0 should be marked invalid");

  // G11: Invalid x > n validation
  const g11 = computeProportionCI(600, 500, 95);
  if (g11.isValid) throw new Error("G11 failed: x > n should be marked invalid");

  // G12: Invalid SD <= 0 validation
  const g12 = computeMeanCI(24.5, 0, 16, 95, false);
  if (g12.isValid) throw new Error("G12 failed: SD=0 should be marked invalid");

  // G13: Confidence = 99%
  const g13 = computeMeanCI(24.5, 4, 16, 99, false);
  if (Math.abs(g13.criticalValue - 2.9467) > 0.002) throw new Error(`G13 99% critT expected ~2.9467, got ${g13.criticalValue}`);

  // G14: Confidence = 80%
  const g14 = computeMeanCI(24.5, 4, 16, 80, false);
  if (Math.abs(g14.criticalValue - 1.3406) > 0.002) throw new Error(`G14 80% critT expected ~1.3406, got ${g14.criticalValue}`);

  // Fallback wrapper check
  const defaultOutputs = calculateConfidenceIntervalCalculator({ mean: 50, sd: 8, sampleSize: 100, confidenceLevel: "95" });
  if (!defaultOutputs || typeof defaultOutputs !== "object") throw new Error("Calculator wrapper failed");

  return true;
}
