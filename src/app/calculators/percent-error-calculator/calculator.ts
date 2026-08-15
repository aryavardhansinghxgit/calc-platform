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

  const absError = Math.abs(exp - theo);
  const pctError = (absError / Math.abs(theo)) * 100;
  const signedPctError = ((exp - theo) / Math.abs(theo)) * 100;

  return {
    percentError: parseFloat(pctError.toFixed(3)),
    absoluteError: parseFloat(absError.toFixed(4)),
    signedPercentError: parseFloat(signedPctError.toFixed(3)),
    relativeError: parseFloat((absError / Math.abs(theo)).toFixed(6)),
    accuracy: parseFloat(Math.max(0, 100 - pctError).toFixed(3)),
  };
}
