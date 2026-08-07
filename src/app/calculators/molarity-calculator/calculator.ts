import { MolarityCalculatorOutputs } from "./types";

export function calculateMolarityCalculator(inputs: Record<string, any>): MolarityCalculatorOutputs {
  const mass = Math.max(0, Number(inputs.massGrams) || 58.44);
  const mm = Math.max(0.001, Number(inputs.molarMass) || 58.44);
  const vol = Math.max(0.001, Number(inputs.volumeLiters) || 1.0);
  const moles = mass / mm;
  const molarity = moles / vol;
  return { molarityM: parseFloat(molarity.toFixed(4)), moles: parseFloat(moles.toFixed(4)) };
}
