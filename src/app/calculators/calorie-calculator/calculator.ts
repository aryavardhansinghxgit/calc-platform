import { CalorieCalculatorOutputs } from "./types";

export function calculateCalorieCalculator(inputs: Record<string, any>): CalorieCalculatorOutputs {
  const age = Math.max(1, Number(inputs.age) || 25);
  const w = Math.max(1, Number(inputs.weightKg) || 70);
  const h = Math.max(1, Number(inputs.heightCm) || 175);
  const act = Number(inputs.activityLevel) || 1.375;
  const isMale = inputs.gender !== "female";
  const bmrRaw = 10 * w + 6.25 * h - 5 * age + (isMale ? 5 : -161);
  const bmr = Math.round(Math.max(0, bmrRaw));
  const tdee = Math.round(bmr * act);
  let goalOffset = 0;
  if (inputs.goal === "mild_loss") goalOffset = -250;
  else if (inputs.goal === "loss") goalOffset = -500;
  else if (inputs.goal === "extreme_loss") goalOffset = -1000;
  else if (inputs.goal === "gain") goalOffset = 500;
  const targetCalories = Math.max(1200, tdee + goalOffset);
  return { targetCalories, bmr, tdee };
}
