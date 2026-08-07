import { BodySurfaceAreaCalculatorOutputs } from "./types";

export function calculateBodySurfaceAreaCalculator(inputs: Record<string, any>): BodySurfaceAreaCalculatorOutputs {
  const w = Math.max(1, Number(inputs.weightKg) || 70);
  const h = Math.max(1, Number(inputs.heightCm) || 175);
  const mosteller = Math.sqrt((w * h) / 3600);
  const duBois = 0.007184 * Math.pow(w, 0.425) * Math.pow(h, 0.725);
  const haycock = 0.024265 * Math.pow(w, 0.5378) * Math.pow(h, 0.3964);
  return {
    mostellerBsa: parseFloat(mosteller.toFixed(2)),
    duBoisBsa: parseFloat(duBois.toFixed(2)),
    haycockBsa: parseFloat(haycock.toFixed(2))
  };
}
