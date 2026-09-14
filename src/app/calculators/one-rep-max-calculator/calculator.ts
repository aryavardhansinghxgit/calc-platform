import { OneRepMaxCalculatorOutputs } from "./types";

export function calculateOneRepMaxCalculator(inputs: Record<string, any>): OneRepMaxCalculatorOutputs {
  const rawW = Number(inputs.weightLiftedKg);
  const rawR = Number(inputs.reps);

  if (!Number.isFinite(rawW) || !Number.isFinite(rawR) || rawW <= 0 || rawR < 1) {
    return { epley1RM: 0, brzycki1RM: 0, percent85: 0, percent75: 0 };
  }

  const w = rawW;
  const r = rawR;
  const epley = r === 1 ? w : w * (1 + r / 30);
  const brzycki = r === 1 ? w : (r >= 37 ? 0 : w * (36 / (37 - r)));
  const e1rm = parseFloat(epley.toFixed(1));
  const b1rm = parseFloat(brzycki.toFixed(1));
  return {
    epley1RM: e1rm,
    brzycki1RM: b1rm,
    percent85: parseFloat((e1rm * 0.85).toFixed(1)),
    percent75: parseFloat((e1rm * 0.75).toFixed(1))
  };
}
