import { ConcreteCalculatorOutputs } from "./types";

export function calculateConcreteCalculator(inputs: Record<string, any>): ConcreteCalculatorOutputs {
  const l = Number(inputs.lengthFt);
  const w = Number(inputs.widthFt);
  const dIn = Number(inputs.depthInches);
  if (!Number.isFinite(l) || l <= 0 || !Number.isFinite(w) || w <= 0 || !Number.isFinite(dIn) || dIn <= 0) {
    return { cubicYards: 0, bags80lb: 0, bags60lb: 0 };
  }
  const d = dIn / 12;
  const cuFt = l * w * d;
  const cuYards = cuFt / 27;
  const bags80 = Math.ceil(cuFt / 0.6);
  const bags60 = Math.ceil(cuFt / 0.45);
  return { cubicYards: parseFloat(cuYards.toFixed(2)), bags80lb: bags80, bags60lb: bags60 };
}

