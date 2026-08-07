import { ProbabilityCalculatorOutputs } from "./types";

export function calculateProbabilityCalculator(inputs: Record<string, any>): ProbabilityCalculatorOutputs {
  const pa = Math.min(1, Math.max(0, Number(inputs.probA) || 0.5));
  const pb = Math.min(1, Math.max(0, Number(inputs.probB) || 0.4));
  const pAnd = pa * pb;
  const pOr = pa + pb - pAnd;
  const pNotA = 1 - pa;
  return {
    probAandB: parseFloat(pAnd.toFixed(4)),
    probAorB: parseFloat(pOr.toFixed(4)),
    probNotA: parseFloat(pNotA.toFixed(4))
  };
}
