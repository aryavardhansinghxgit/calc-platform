import { BTUCalculatorOutputs } from "./types";

export function calculateBTUCalculator(inputs: Record<string, any>): BTUCalculatorOutputs {
  const l = Math.max(1, Number(inputs.lengthFt) || 15);
  const w = Math.max(1, Number(inputs.widthFt) || 20);
  const factor = Number(inputs.insulation) || 25;
  const sqFt = l * w;
  const btu = Math.round(sqFt * factor);
  const tons = parseFloat((btu / 12000).toFixed(2));
  return { requiredBtu: btu, acTons: tons };
}
