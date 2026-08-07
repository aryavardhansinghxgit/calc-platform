import { GravelCalculatorOutputs } from "./types";

export function calculateGravelCalculator(inputs: Record<string, any>): GravelCalculatorOutputs {
  const area = Math.max(0, Number(inputs.areaSqFt) || 500);
  const depthFt = Math.max(0, Number(inputs.depthInches) || 4) / 12;
  const cuFt = area * depthFt;
  const cuYds = cuFt / 27;
  const tons = cuYds * 1.4; // 1.4 tons per cubic yard average
  return { tonsNeeded: parseFloat(tons.toFixed(2)), cubicYards: parseFloat(cuYds.toFixed(2)) };
}
