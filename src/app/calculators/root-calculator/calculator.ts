import { RootCalculatorOutputs } from "./types";

export function calculateRootCalculator(inputs: Record<string, any>): RootCalculatorOutputs {
  const x = Math.max(0, Number(inputs.value) || 64);
  const n = Math.max(1, Number(inputs.degree) || 3);
  const root = Math.pow(x, 1 / n);
  return {
    rootResult: parseFloat(root.toFixed(6)),
    squareRoot: parseFloat(Math.sqrt(x).toFixed(6))
  };
}
