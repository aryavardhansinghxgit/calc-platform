import { FatIntakeCalculatorOutputs } from "./types";

export function calculateFatIntakeCalculator(inputs: Record<string, any>): FatIntakeCalculatorOutputs {
  const cal = Math.max(500, Number(inputs.dailyCalories) || 2000);
  const pct = Math.min(80, Math.max(5, Number(inputs.fatPercent) || 30)) / 100;
  const fatGrams = Math.round((cal * pct) / 9);
  const satFatMaxGrams = Math.round((cal * 0.10) / 9);
  return { fatGrams, satFatMaxGrams };
}
