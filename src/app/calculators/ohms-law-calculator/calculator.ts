import { OhmsLawCalculatorOutputs } from "./types";

export function calculateOhmsLawCalculator(inputs: Record<string, any>): OhmsLawCalculatorOutputs {
  const v = Math.max(0, Number(inputs.voltage) || 12);
  const r = Math.max(0.001, Number(inputs.resistance) || 4);
  const i = v / r;
  const p = v * i;
  return { currentAmps: parseFloat(i.toFixed(3)), powerWatts: parseFloat(p.toFixed(2)) };
}
