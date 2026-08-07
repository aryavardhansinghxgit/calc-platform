import { DistanceCalculatorOutputs } from "./types";

export function calculateDistanceCalculator(inputs: Record<string, any>): DistanceCalculatorOutputs {
  const x1 = Number(inputs.x1) || 0;
  const y1 = Number(inputs.y1) || 0;
  const x2 = Number(inputs.x2) || 3;
  const y2 = Number(inputs.y2) || 4;
  const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  return { distance: parseFloat(dist.toFixed(4)), midpoint: `(${midX}, ${midY})` };
}
