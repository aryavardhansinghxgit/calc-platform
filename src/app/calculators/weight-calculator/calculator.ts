import { WeightCalculatorOutputs } from "./types";

export function calculateWeightCalculator(inputs: Record<string, any>): WeightCalculatorOutputs {
  const m = Math.max(0, Number(inputs.massKg) || 70);
  const g = Number(inputs.celestialBody) || 9.81;
  const N = m * g;
  const lbs = (N / 9.81) * 2.20462;
  return { weightNewtons: parseFloat(N.toFixed(2)), weightLbs: parseFloat(lbs.toFixed(2)) };
}
