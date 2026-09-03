import { ConfidenceIntervalCalculatorOutputs } from "./types";
import { computeMeanCI } from "./confidence-interval-logic";

export function calculateConfidenceIntervalCalculator(inputs: Record<string, any>): ConfidenceIntervalCalculatorOutputs {
  const mean = typeof inputs.mean === "number" ? inputs.mean : parseFloat(inputs.mean) || 0;
  const s = typeof inputs.sd === "number" ? inputs.sd : parseFloat(inputs.sd) || 1;
  const n = typeof inputs.sampleSize === "number" ? inputs.sampleSize : parseInt(inputs.sampleSize) || 10;
  const cl = typeof inputs.confidenceLevel === "number" ? inputs.confidenceLevel : parseFloat(inputs.confidenceLevel) || 95;

  const res = computeMeanCI(mean, s > 0 ? s : 1, n >= 2 ? n : 10, cl > 0 && cl < 100 ? cl : 95, false);

  return {
    marginError: res.me,
    intervalRange: res.intervalStr
  };
}
