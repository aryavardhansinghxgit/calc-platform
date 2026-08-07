import { HealthyWeightCalculatorOutputs } from "./types";

export function calculateHealthyWeightCalculator(inputs: Record<string, any>): HealthyWeightCalculatorOutputs {
  const h = Math.max(50, Number(inputs.heightCm) || 175);
  const hm = h / 100;
  const hm2 = hm * hm;
  const minW = parseFloat((18.5 * hm2).toFixed(1));
  const targetW = parseFloat((22.0 * hm2).toFixed(1));
  const maxW = parseFloat((24.9 * hm2).toFixed(1));
  return { minWeight: minW, targetWeight: targetW, maxWeight: maxW };
}
