import { ScientificNotationCalculatorOutputs } from "./types";

export function calculateScientificNotationCalculator(inputs: Record<string, any>): ScientificNotationCalculatorOutputs {
  const n = Number(inputs.number) || 3500000;
  const sci = n.toExponential(4);
  const exp = Math.floor(Math.log10(Math.abs(n) || 1));
  const engExp = Math.floor(exp / 3) * 3;
  const engCoeff = (n / Math.pow(10, engExp)).toFixed(3);
  return {
    scientific: sci,
    engineering: `${engCoeff} × 10^${engExp}`,
    standard: n
  };
}
