import { CaloriesBurnedCalculatorOutputs } from "./types";

export function calculateCaloriesBurnedCalculator(inputs: Record<string, any>): CaloriesBurnedCalculatorOutputs {
  const met = Number(inputs.activity) || 8.3;
  const w = Math.max(1, Number(inputs.weightKg) || 70);
  const mins = Math.max(1, Number(inputs.durationMins) || 45);
  const totalCal = Math.round((met * 3.5 * w / 200) * mins);
  const calPerMin = parseFloat(((met * 3.5 * w / 200)).toFixed(1));
  return { caloriesBurned: Math.max(0, totalCal), metValue: met, calPerMin };
}
