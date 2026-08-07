import { MacroCalculatorOutputs } from "./types";

export function calculateMacroCalculator(inputs: Record<string, any>): MacroCalculatorOutputs {
  const cal = Math.max(500, Number(inputs.dailyCalories) || 2000);
  let pPct = 0.25, cPct = 0.50, fPct = 0.25;
  if (inputs.dietRatio === "high_protein") { pPct = 0.40; cPct = 0.35; fPct = 0.25; }
  else if (inputs.dietRatio === "low_carb") { pPct = 0.40; cPct = 0.20; fPct = 0.40; }
  else if (inputs.dietRatio === "keto") { pPct = 0.25; cPct = 0.05; fPct = 0.70; }
  const proteinGrams = Math.round((cal * pPct) / 4);
  const carbsGrams = Math.round((cal * cPct) / 4);
  const fatGrams = Math.round((cal * fPct) / 9);
  return { proteinGrams, carbsGrams, fatGrams };
}
