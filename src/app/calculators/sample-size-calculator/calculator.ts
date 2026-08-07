import { SampleSizeCalculatorOutputs } from "./types";

export function calculateSampleSizeCalculator(inputs: Record<string, any>): SampleSizeCalculatorOutputs {
  const cl = inputs.confidenceLevel || "95";
  const me = Math.max(0.1, Number(inputs.marginError) || 5) / 100;
  const pop = Number(inputs.population) || 0;
  let z = 1.96;
  if (cl === "90") z = 1.645;
  else if (cl === "99") z = 2.576;
  const p = 0.5;
  const n0 = (z * z * p * (1 - p)) / (me * me);
  let n = n0;
  if (pop > 0) {
    n = n0 / (1 + (n0 - 1) / pop);
  }
  return { sampleSize: Math.ceil(n), zScore: z };
}
