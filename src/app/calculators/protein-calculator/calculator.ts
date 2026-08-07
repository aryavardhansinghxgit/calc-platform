import { ProteinCalculatorOutputs } from "./types";

export function calculateProteinCalculator(inputs: Record<string, any>): ProteinCalculatorOutputs {
  const w = Math.max(1, Number(inputs.weightKg) || 70);
  const rate = Number(inputs.goal) || 1.8;
  const proteinGrams = Math.round(w * rate);
  const proteinCalories = Math.round(proteinGrams * 4);
  return { proteinGrams, proteinCalories };
}
