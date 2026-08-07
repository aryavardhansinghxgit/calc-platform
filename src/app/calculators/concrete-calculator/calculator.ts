import { ConcreteCalculatorOutputs } from "./types";

export function calculateConcreteCalculator(inputs: Record<string, any>): ConcreteCalculatorOutputs {
  const l = Math.max(0, Number(inputs.lengthFt) || 10);
  const w = Math.max(0, Number(inputs.widthFt) || 10);
  const d = Math.max(0, Number(inputs.depthInches) || 4) / 12;
  const cuFt = l * w * d;
  const cuYards = cuFt / 27;
  const bags80 = Math.ceil(cuFt / 0.6);
  const bags60 = Math.ceil(cuFt / 0.45);
  return { cubicYards: parseFloat(cuYards.toFixed(2)), bags80lb: bags80, bags60lb: bags60 };
}
