import { CaloriesBurnedCalculatorOutputs } from "./types";
import { calculateCaloriesBurned } from "@/lib/formulas/caloriesBurned";

export function calculateCaloriesBurnedCalculator(inputs: Record<string, any>): CaloriesBurnedCalculatorOutputs {
  const met = Number(inputs.activity) || 3.5;
  const w = Math.max(1, Number(inputs.weightKg) || 70);
  const mins = Math.max(1, Number(inputs.durationMins) || 45);

  // Standard Compendium MET Equation: (mins * met * 3.5 * w) / 200
  const rawBurnRate = (met * 3.5 * w) / 200;
  const totalCal = Math.round(rawBurnRate * mins);
  const calPerMin = parseFloat(rawBurnRate.toFixed(2));

  return {
    caloriesBurned: Math.max(0, totalCal),
    metValue: met,
    calPerMin,
  };
}
