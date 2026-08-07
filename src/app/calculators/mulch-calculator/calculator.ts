import { MulchCalculatorOutputs } from "./types";

export function calculateMulchCalculator(inputs: Record<string, any>): MulchCalculatorOutputs {
  const area = Math.max(0, Number(inputs.areaSqFt) || 300);
  const depthFt = Math.max(0, Number(inputs.depthInches) || 3) / 12;
  const cuFt = area * depthFt;
  const cuYds = parseFloat((cuFt / 27).toFixed(2));
  const bags = Math.ceil(cuFt / 2);
  return { cubicYards: cuYds, bags2CuFt: bags };
}
