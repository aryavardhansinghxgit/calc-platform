import { PercentErrorCalculatorOutputs } from "./types";

export function calculatePercentErrorCalculator(inputs: Record<string, unknown>): PercentErrorCalculatorOutputs {
  const exp = Number(inputs.expVal);
  const theo = Number(inputs.theoVal);

  if (!Number.isFinite(exp) || !Number.isFinite(theo)) {
    throw new Error("Enter finite numeric values for both measurements.");
  }

  if (theo === 0) {
    throw new Error("The true value cannot be zero because percentage error would have a zero denominator.");
  }

  const diff = exp - theo;
  const absError = Math.abs(diff);
  const pctError = (absError / Math.abs(theo)) * 100;
  const signedPctError = (diff / theo) * 100;
  const relError = absError / Math.abs(theo);

  return {
    percentError: parseFloat(pctError.toFixed(3)),
    absoluteError: parseFloat(absError.toFixed(4)),
    signedPercentError: parseFloat(signedPctError.toFixed(3)),
    relativeError: parseFloat(relError.toFixed(6)),
    accuracy: parseFloat(Math.max(0, 100 - pctError).toFixed(3)),
  };
}
