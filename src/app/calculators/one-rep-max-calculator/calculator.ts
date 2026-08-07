import { OneRepMaxCalculatorOutputs } from "./types";

export function calculateOneRepMaxCalculator(inputs: Record<string, any>): OneRepMaxCalculatorOutputs {
  const w = Math.max(0, Number(inputs.weightLiftedKg) || 80);
  const r = Math.max(1, Number(inputs.reps) || 5);
  if (w <= 0) return { epley1RM: 0, brzycki1RM: 0, percent85: 0, percent75: 0 };
  const epley = r === 1 ? w : w * (1 + r / 30);
  const brzycki = r === 1 ? w : w * (36 / (37 - r));
  const e1rm = parseFloat(epley.toFixed(1));
  const b1rm = parseFloat(brzycki.toFixed(1));
  return {
    epley1RM: e1rm,
    brzycki1RM: b1rm,
    percent85: parseFloat((e1rm * 0.85).toFixed(1)),
    percent75: parseFloat((e1rm * 0.75).toFixed(1))
  };
}
