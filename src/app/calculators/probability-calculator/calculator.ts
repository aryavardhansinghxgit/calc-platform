import { ProbabilityCalculatorOutputs } from "./types";
import { computeTwoEventProbability } from "./probability-logic";

export function calculateProbabilityCalculator(inputs: Record<string, any>): ProbabilityCalculatorOutputs {
  const pa = inputs.probA ?? "0.5";
  const pb = inputs.probB ?? "0.4";

  const res = computeTwoEventProbability(pa, pb, "independent");

  return {
    probAandB: parseFloat(res.pIntersection.toFixed(4)),
    probAorB: parseFloat(res.pUnion.toFixed(4)),
    probNotA: parseFloat(res.pNotA.toFixed(4))
  };
}
