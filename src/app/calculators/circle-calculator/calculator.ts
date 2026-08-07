import { CircleCalculatorOutputs } from "./types";

export function calculateCircleCalculator(inputs: Record<string, any>): CircleCalculatorOutputs {
  const r = Math.max(0.001, Number(inputs.radius) || 5);
  const d = 2 * r;
  const c = 2 * Math.PI * r;
  const a = Math.PI * r * r;
  return {
    area: parseFloat(a.toFixed(2)),
    circumference: parseFloat(c.toFixed(2)),
    diameter: parseFloat(d.toFixed(2))
  };
}
