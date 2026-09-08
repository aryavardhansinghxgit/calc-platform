import { DensityCalculatorOutputs } from "./types";

export function calculateDensityCalculator(inputs: Record<string, any>): DensityCalculatorOutputs {
  const m = Number(inputs.massKg);
  const v = Number(inputs.volumeM3);
  if (isNaN(m) || isNaN(v) || m < 0 || v <= 0) {
    return { densityKgM3: 0, densityGCm3: 0 };
  }
  const density = m / v;
  return { densityKgM3: parseFloat(density.toFixed(2)), densityGCm3: parseFloat((density / 1000).toFixed(4)) };
}
