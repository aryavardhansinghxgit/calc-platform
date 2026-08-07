import { HalfLifeCalculatorOutputs } from "./types";

export function calculateHalfLifeCalculator(inputs: Record<string, any>): HalfLifeCalculatorOutputs {
  const n0 = Math.max(0, Number(inputs.initialAmount) || 100);
  const hl = Math.max(0.0001, Number(inputs.halfLife) || 5);
  const t = Math.max(0, Number(inputs.elapsedTime) || 15);
  const remaining = n0 * Math.pow(0.5, t / hl);
  const pct = n0 > 0 ? (remaining / n0) * 100 : 0;
  const lambda = Math.LN2 / hl;
  return {
    remainingAmount: parseFloat(remaining.toFixed(4)),
    pctRemaining: parseFloat(pct.toFixed(2)),
    decayConstant: parseFloat(lambda.toFixed(6))
  };
}
