import { TriangleCalculatorOutputs } from "./types";

export function calculateTriangleCalculator(inputs: Record<string, any>): TriangleCalculatorOutputs {
  const a = Math.max(0.1, Number(inputs.sideA) || 3);
  const b = Math.max(0.1, Number(inputs.sideB) || 4);
  const c = Math.max(0.1, Number(inputs.sideC) || 5);
  if (a + b <= c || a + c <= b || b + c <= a) {
    return { area: 0, perimeter: a + b + c, angleA: 0 };
  }
  const s = (a + b + c) / 2;
  const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  const cosA = (b * b + c * c - a * a) / (2 * b * c);
  const angleA = Math.acos(Math.min(1, Math.max(-1, cosA))) * (180 / Math.PI);
  return {
    area: parseFloat(area.toFixed(2)),
    perimeter: parseFloat((a + b + c).toFixed(2)),
    angleA: parseFloat(angleA.toFixed(1))
  };
}
