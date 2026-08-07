import { IdealWeightCalculatorOutputs } from "./types";

export function calculateIdealWeightCalculator(inputs: Record<string, any>): IdealWeightCalculatorOutputs {
  const h = Math.max(100, Number(inputs.heightCm) || 175);
  const isMale = inputs.gender !== "female";
  const inchesOver60 = Math.max(0, (h - 152.4) / 2.54);
  const devine = parseFloat((isMale ? 50 + 2.3 * inchesOver60 : 45.5 + 2.3 * inchesOver60).toFixed(1));
  const robinson = parseFloat((isMale ? 52 + 1.9 * inchesOver60 : 49 + 1.7 * inchesOver60).toFixed(1));
  const miller = parseFloat((isMale ? 56.2 + 1.41 * inchesOver60 : 53.1 + 1.36 * inchesOver60).toFixed(1));
  const hamwi = parseFloat((isMale ? 48 + 2.7 * inchesOver60 : 45.5 + 2.2 * inchesOver60).toFixed(1));
  return { devine, robinson, miller, hamwi };
}
