import { RightTriangleCalculatorOutputs } from "./types";

export function calculateRightTriangleCalculator(inputs: Record<string, any>): RightTriangleCalculatorOutputs {
  const a = Math.max(0.1, Number(inputs.sideA) || 5);
  const b = Math.max(0.1, Number(inputs.sideB) || 12);
  const c = Math.sqrt(a * a + b * b);
  const alpha = Math.atan(a / b) * (180 / Math.PI);
  const beta = 90 - alpha;
  const area = 0.5 * a * b;
  return {
    hypotenuseC: parseFloat(c.toFixed(3)),
    angleA: parseFloat(alpha.toFixed(2)),
    angleB: parseFloat(beta.toFixed(2)),
    area: parseFloat(area.toFixed(2))
  };
}
