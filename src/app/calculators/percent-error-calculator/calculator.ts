import { PercentErrorCalculatorOutputs } from "./types";

export function calculatePercentErrorCalculator(inputs: Record<string, any>): PercentErrorCalculatorOutputs {
  const exp = Number(inputs.expVal) || 0;
  const theo = Number(inputs.theoVal) || 9.8;
  const absError = Math.abs(exp - theo);
  const pctError = theo !== 0 ? (absError / Math.abs(theo)) * 100 : 0;
  return {
    percentError: parseFloat(pctError.toFixed(3)),
    absoluteError: parseFloat(absError.toFixed(4))
  };
}
