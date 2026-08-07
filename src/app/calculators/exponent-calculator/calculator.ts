import { ExponentCalculatorOutputs } from "./types";

export function calculateExponentCalculator(inputs: Record<string, any>): ExponentCalculatorOutputs {
  const b = Number(inputs.base) || 2;
  const n = Number(inputs.exponent) || 10;
  const res = Math.pow(b, n);
  return {
    result: res,
    scientificNotation: res.toExponential(4)
  };
}
