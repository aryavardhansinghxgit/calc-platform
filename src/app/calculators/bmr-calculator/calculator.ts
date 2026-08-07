import { BMRCalculatorOutputs } from "./types";

export function calculateBMRCalculator(inputs: Record<string, any>): BMRCalculatorOutputs {
  const age = Math.max(1, Number(inputs.age) || 30);
  const w = Math.max(1, Number(inputs.weightKg) || 70);
  const h = Math.max(1, Number(inputs.heightCm) || 175);
  const isMale = inputs.gender !== "female";
  const mifflin = Math.round(10 * w + 6.25 * h - 5 * age + (isMale ? 5 : -161));
  const harris = Math.round(isMale ? 88.362 + 13.397 * w + 4.799 * h - 5.677 * age : 447.593 + 9.247 * w + 3.098 * h - 4.330 * age);
  const sedentaryCal = Math.round(mifflin * 1.2);
  return { bmrMifflin: Math.max(0, mifflin), bmrHarris: Math.max(0, harris), sedentaryCal };
}
