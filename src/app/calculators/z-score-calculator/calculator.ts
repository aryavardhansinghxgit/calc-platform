import { ZScoreCalculatorOutputs } from "./types";

export function calculateZScoreCalculator(inputs: Record<string, any>): ZScoreCalculatorOutputs {
  const x = Number(inputs.rawScore) || 85;
  const mu = Number(inputs.mean) || 70;
  const sigma = Math.max(0.0001, Number(inputs.sd) || 10);
  const z = (x - mu) / sigma;
  const erf = (val: number) => {
    const t = 1.0 / (1.0 + 0.5 * Math.abs(val));
    const ans = 1 - t * Math.exp(-val * val - 1.26551223 + t * (1.00002368 + t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 + t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 + t * (-0.82215223 + t * 0.17087277)))))))));
    return val >= 0 ? ans : -ans;
  };
  const cdf = 0.5 * (1 + erf(z / Math.SQRT2));
  return { zScore: parseFloat(z.toFixed(3)), percentile: parseFloat((cdf * 100).toFixed(2)) };
}
