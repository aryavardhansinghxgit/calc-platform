import { calculateZScoreCalculator } from "./calculator";
import {
  computeStandardZ,
  computeInverseZ,
  computeIntervalZ,
  computeBatchZ,
  normalCDF,
  inverseNormalCDF
} from "./z-score-logic";

export function runZScoreCalculatorTests() {
  // G1: X = 85, μ = 70, σ = 10 -> Z = 1.5, percentile = 93.32%
  const g1 = computeStandardZ(85, 70, 10, false, 4);
  if (!g1.isValid || Math.abs(g1.zScore - 1.5) > 1e-6 || g1.percentileRank !== "93.32%") {
    throw new Error("G1 failed: standard Z calculation");
  }

  // G2: X = 55, μ = 70, σ = 10 -> Z = -1.5, percentile = 6.68%
  const g2 = computeStandardZ(55, 70, 10, false, 4);
  if (!g2.isValid || Math.abs(g2.zScore - (-1.5)) > 1e-6 || g2.percentileRank !== "6.68%") {
    throw new Error("G2 failed: negative Z calculation");
  }

  // G3: X = 70, μ = 70, σ = 10 -> Z = 0, percentile = 50.00%
  const g3 = computeStandardZ(70, 70, 10, false, 4);
  if (!g3.isValid || Math.abs(g3.zScore) > 1e-6 || g3.percentileRank !== "50.00%") {
    throw new Error("G3 failed: zero Z calculation");
  }

  // G4: X = 854, μ = 70, σ = 10 -> Z = 78.4, percentile = 100.00%
  const g4 = computeStandardZ(854, 70, 10, false, 4);
  if (!g4.isValid || Math.abs(g4.zScore - 78.4) > 1e-6 || g4.leftTailP !== 1.0) {
    throw new Error("G4 failed: extreme positive Z calculation");
  }

  // G5: Conf = 95%, Two-Tail -> z ≈ 1.959964
  const g5 = computeInverseZ(95, "conf", "two", 100, 15, 4);
  if (!g5.isValid || Math.abs(g5.criticalZ - 1.959964) > 1e-4) {
    throw new Error("G5 failed: inverse critical value calculation");
  }

  // G6: [60, 80], μ = 70, σ = 10 -> Area Between = 68.27%
  const g6 = computeIntervalZ(60, 80, 70, 10, 4);
  if (!g6.isValid || g6.areaBetweenPct !== "68.27%" || g6.areaOutsidePct !== "31.73%") {
    throw new Error("G6 failed: interval area calculation");
  }

  // G7: [61, 81], μ = 73, σ = 10 -> Area Between = 67.31%
  const g7 = computeIntervalZ(61, 81, 73, 10, 4);
  if (!g7.isValid || g7.areaBetweenPct !== "67.31%" || g7.areaOutsidePct !== "32.69%") {
    throw new Error("G7 failed: non-symmetric interval calculation");
  }

  // G8: Batch dataset 65..100 -> Mean = 82.4, s = 11.79, s² = 138.93
  const g8 = computeBatchZ("65, 70, 72, 75, 80, 85, 90, 92, 95, 100", 2);
  if (g8.count !== 10 || g8.mean !== 82.4 || g8.sd !== 11.79 || g8.variance !== 138.93) {
    throw new Error("G8 failed: batch dataset calculation");
  }

  // G9: Zero SD validation
  const g9 = computeStandardZ(10, 10, 0);
  if (g9.isValid || !isNaN(g9.zScore)) {
    throw new Error("G9 failed: zero SD should be flagged invalid");
  }

  // G10: Server calculateZScoreCalculator parity
  const serverRes = calculateZScoreCalculator({ rawScore: 85, mean: 70, sd: 10 });
  if (serverRes.zScore !== 1.5 || serverRes.percentile !== 93.32) {
    throw new Error("G10 failed: server calculation parity");
  }

  return true;
}
