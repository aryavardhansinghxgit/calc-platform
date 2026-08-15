import { RootCalculatorOutputs } from "./types";
import { simplifyRadical } from "./root-logic";

export function calculateRootCalculator(inputs: Record<string, any>): RootCalculatorOutputs {
  const x = Number(inputs.value) ?? 72;
  const n = Math.max(1, Number(inputs.degree) || 2);
  
  const root = Math.pow(Math.abs(x), 1 / n);
  const finalRoot = x < 0 && n % 2 !== 0 ? -root : root;
  const simp = simplifyRadical(x, n);

  return {
    rootResult: Number.isNaN(finalRoot) ? 0 : parseFloat(finalRoot.toFixed(6)),
    squareRoot: parseFloat(Math.sqrt(Math.max(0, x)).toFixed(6)),
    simplifiedRadical: simp.formattedText
  } as any;
}
