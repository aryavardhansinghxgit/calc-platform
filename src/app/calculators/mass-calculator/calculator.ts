import { MassCalculatorOutputs } from "./types";

export function calculateMassCalculator(inputs: Record<string, any>): MassCalculatorOutputs {
  const rho = Math.max(0, Number(inputs.densityKgM3) || 7850);
  const v = Math.max(0, Number(inputs.volumeM3) || 0.5);
  const mass = rho * v;
  return { massKg: parseFloat(mass.toFixed(2)), massLbs: parseFloat((mass * 2.20462).toFixed(2)) };
}
