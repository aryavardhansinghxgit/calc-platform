import { GDPCalculatorOutputs } from "./types";

export function calculateGDPCalculator(inputs: Record<string, any>): GDPCalculatorOutputs {
  const c = Math.max(0, Number(inputs.consumption) || 14000);
  const i = Math.max(0, Number(inputs.investment) || 4000);
  const g = Math.max(0, Number(inputs.government) || 3500);
  const x = Math.max(0, Number(inputs.exports) || 2500);
  const m = Math.max(0, Number(inputs.imports) || 3000);
  const nx = x - m;
  const gdp = c + i + g + nx;
  return { totalGdp: gdp, netExports: nx };
}
