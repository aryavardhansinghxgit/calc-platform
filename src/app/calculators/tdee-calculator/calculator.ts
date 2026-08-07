import { TDEECalculatorOutputs } from "./types";

export function calculateTDEECalculator(inputs: Record<string, any>): TDEECalculatorOutputs {
  const age = Math.max(1, Number(inputs.age) || 25);
  const w = Math.max(1, Number(inputs.weightKg) || 70);
  const h = Math.max(1, Number(inputs.heightCm) || 175);
  const act = Number(inputs.activityLevel) || 1.55;
  const isMale = inputs.gender !== "female";
  const bmr = 10 * w + 6.25 * h - 5 * age + (isMale ? 5 : -161);
  const tdee = Math.round(Math.max(0, bmr * act));
  return {
    tdee,
    cuttingCalories: Math.max(1200, tdee - 500),
    bulkingCalories: tdee + 500
  };
}
