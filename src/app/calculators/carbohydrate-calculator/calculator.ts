import { CarbohydrateCalculatorOutputs } from "./types";

export function calculateCarbohydrateCalculator(inputs: Record<string, any>): CarbohydrateCalculatorOutputs {
  const cal = Math.max(500, Number(inputs.dailyCalories) || 2000);
  const pct = Number(inputs.activityLevel) || 0.55;
  const carbCalories = Math.round(cal * pct);
  const carbGrams = Math.round(carbCalories / 4);
  return { carbGrams, carbCalories };
}
