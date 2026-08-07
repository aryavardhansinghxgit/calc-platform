import { DensityCalculatorOutputs } from "./types";

export function calculateDensityCalculator(inputs: Record<string, any>): DensityCalculatorOutputs {
  const m = Math.max(0, Number(inputs.massKg) || 50);
  const v = Math.max(0.00001, Number(inputs.volumeM3) || 0.02);
  const density = m / v;
  return { densityKgM3: parseFloat(density.toFixed(2)), densityGCm3: parseFloat((density / 1000).toFixed(4)) };
}
