import { HeightCalculatorOutputs } from "./types";

export function calculateHeightCalculator(inputs: Record<string, any>): HeightCalculatorOutputs {
  const f = Math.max(100, Number(inputs.fatherHeightCm) || 178);
  const m = Math.max(100, Number(inputs.motherHeightCm) || 165);
  const isBoy = inputs.childGender !== "female";
  const midParental = isBoy ? (f + m + 13) / 2 : (f + m - 13) / 2;
  const predCm = Math.round(midParental);
  const totalInches = predCm / 2.54;
  const ft = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { predictedHeightCm: predCm, predictedHeightFeet: `${ft}' ${inches}"` };
}
