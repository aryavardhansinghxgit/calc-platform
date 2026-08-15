import { SampleSizeCalculatorOutputs } from "./types";
import { computeSurveySampleSize } from "./sample-size-logic";

export function calculateSampleSizeCalculator(inputs: Record<string, any>): SampleSizeCalculatorOutputs {
  const cl = Number(inputs.confidenceLevel) || 95;
  const me = Math.max(0.1, Number(inputs.marginError) || 5);
  const pop = Number(inputs.population) || undefined;

  const result = computeSurveySampleSize(cl, me, 50, pop, 100);

  return {
    sampleSize: result.sampleSize,
    zScore: result.zScore
  };
}
