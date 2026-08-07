import { LeanBodyMassCalculatorOutputs } from "./types";

export function calculateLeanBodyMassCalculator(inputs: Record<string, any>): LeanBodyMassCalculatorOutputs {
  const isMale = inputs.gender !== "female";
  const w = Math.max(1, Number(inputs.weightKg) || 75);
  const h = Math.max(1, Number(inputs.heightCm) || 175);
  const boer = isMale ? 0.407 * w + 0.267 * h - 19.2 : 0.252 * w + 0.473 * h - 48.3;
  const james = isMale ? 1.1 * w - 128 * Math.pow(w / h, 2) : 1.07 * w - 148 * Math.pow(w / h, 2);
  const hume = isMale ? 0.32810 * w + 0.33929 * h - 29.5336 : 0.29569 * w + 0.41813 * h - 43.2933;
  return {
    boerLbm: parseFloat(Math.max(0, boer).toFixed(1)),
    jamesLbm: parseFloat(Math.max(0, james).toFixed(1)),
    humeLbm: parseFloat(Math.max(0, hume).toFixed(1))
  };
}
