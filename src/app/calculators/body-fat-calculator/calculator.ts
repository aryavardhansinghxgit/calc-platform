import { BodyFatCalculatorOutputs } from "./types";

export function calculateBodyFatCalculator(inputs: Record<string, any>): BodyFatCalculatorOutputs {
  const g = inputs.gender || "male";
  const w = Math.max(1, Number(inputs.weightKg) || 75);
  const h = Math.max(1, Number(inputs.heightCm) || 175);
  const neck = Math.max(1, Number(inputs.neckCm) || 38);
  const waist = Math.max(1, Number(inputs.waistCm) || 85);
  const hip = Math.max(1, Number(inputs.hipCm) || 95);
  let bf = 15;
  if (g === "male") {
    const val = waist - neck;
    if (val > 0) {
      bf = 495 / (1.0324 - 0.19077 * Math.log10(val) + 0.15456 * Math.log10(h)) - 450;
    }
  } else {
    const val = waist + hip - neck;
    if (val > 0) {
      bf = 495 / (1.29579 - 0.35004 * Math.log10(val) + 0.22100 * Math.log10(h)) - 450;
    }
  }
  bf = Math.min(60, Math.max(2, parseFloat(bf.toFixed(1))));
  const fatMass = parseFloat(((w * bf) / 100).toFixed(1));
  const leanMass = parseFloat((w - fatMass).toFixed(1));
  let category = "Fitness";
  if (g === "male") {
    if (bf < 6) category = "Essential Fat";
    else if (bf < 14) category = "Athletes";
    else if (bf < 18) category = "Fitness";
    else if (bf < 25) category = "Average";
    else category = "Obese";
  } else {
    if (bf < 14) category = "Essential Fat";
    else if (bf < 21) category = "Athletes";
    else if (bf < 25) category = "Fitness";
    else if (bf < 32) category = "Average";
    else category = "Obese";
  }
  return { bodyFatPercent: bf, fatMassKg: fatMass, leanMassKg: leanMass, category };
}
