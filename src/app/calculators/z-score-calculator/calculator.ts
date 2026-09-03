import { ZScoreCalculatorOutputs } from "./types";
import { computeStandardZ } from "./z-score-logic";

export function calculateZScoreCalculator(inputs: Record<string, any>): ZScoreCalculatorOutputs {
  const x = inputs.rawScore !== undefined && inputs.rawScore !== null && !isNaN(Number(inputs.rawScore))
    ? Number(inputs.rawScore)
    : 85;
  const mu = inputs.mean !== undefined && inputs.mean !== null && !isNaN(Number(inputs.mean))
    ? Number(inputs.mean)
    : 70;
  const sigma = inputs.sd !== undefined && inputs.sd !== null && !isNaN(Number(inputs.sd))
    ? Number(inputs.sd)
    : 10;

  const res = computeStandardZ(x, mu, sigma, false, 4);

  return {
    zScore: Number.isFinite(res.zScore) ? parseFloat(res.zScore.toFixed(4)) : 0,
    percentile: Number.isFinite(res.leftTailP) ? parseFloat((res.leftTailP * 100).toFixed(2)) : 0
  };
}
