import { PythagoreanTheoremCalculatorOutputs } from "./types";

export function calculatePythagoreanTheoremCalculator(inputs: Record<string, any>): PythagoreanTheoremCalculatorOutputs {
  const a = Math.max(0.1, Number(inputs.sideA) || 3);
  const b = Math.max(0.1, Number(inputs.sideB) || 4);
  const c = Math.sqrt(a * a + b * b);
  const area = 0.5 * a * b;
  return { hypotenuseC: parseFloat(c.toFixed(3)), area: parseFloat(area.toFixed(2)) };
}
