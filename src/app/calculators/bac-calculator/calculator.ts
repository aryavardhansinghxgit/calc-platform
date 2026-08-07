import { BACCalculatorOutputs } from "./types";

export function calculateBACCalculator(inputs: Record<string, any>): BACCalculatorOutputs {
  const isMale = inputs.gender !== "female";
  const w = Math.max(1, Number(inputs.weightKg) || 75);
  const drinks = Math.max(0, Number(inputs.drinksCount) || 3);
  const hrs = Math.max(0, Number(inputs.hoursSinceFirst) || 2);
  const alcoholGrams = drinks * 14; // 14g alcohol per standard drink
  const r = isMale ? 0.68 : 0.55;
  const rawBac = (alcoholGrams / (w * 1000 * r)) * 100;
  const currentBac = Math.max(0, rawBac - 0.015 * hrs);
  const sobrietyHours = parseFloat((rawBac / 0.015).toFixed(1));
  let status = "Below Legal Limit";
  if (currentBac >= 0.08) status = "Legally Intoxicated (Driving Impaired)";
  else if (currentBac > 0.02) status = "Mildly Impaired";
  return {
    bac: parseFloat(currentBac.toFixed(3)),
    sobrietyHours,
    status
  };
}
