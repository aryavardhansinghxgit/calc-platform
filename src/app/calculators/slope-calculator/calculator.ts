import { SlopeCalculatorOutputs } from "./types";

export function calculateSlopeCalculator(inputs: Record<string, any>): SlopeCalculatorOutputs {
  const x1 = Number(inputs.x1) || 1;
  const y1 = Number(inputs.y1) || 2;
  const x2 = Number(inputs.x2) || 4;
  const y2 = Number(inputs.y2) || 8;
  const dx = x2 - x1;
  const dy = y2 - y1;
  if (dx === 0) return { slopeM: 0, angleDeg: 90, lineEquation: `x = ${x1}` };
  const m = dy / dx;
  const angle = Math.atan(m) * (180 / Math.PI);
  const b = y1 - m * x1;
  const bStr = b >= 0 ? `+ ${b.toFixed(2)}` : `- ${Math.abs(b).toFixed(2)}`;
  return {
    slopeM: parseFloat(m.toFixed(4)),
    angleDeg: parseFloat(angle.toFixed(2)),
    lineEquation: `y = ${m.toFixed(2)}x ${bStr}`
  };
}
