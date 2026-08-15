import { FactorCalculatorOutputs } from "./types";
import { computeFactorSummary } from "./factor-logic";

export function calculateFactorCalculator(inputs: Record<string, any>): FactorCalculatorOutputs {
  const n = Math.max(1, Math.floor(Number(inputs.number) || 120));
  const summary = computeFactorSummary(n);

  return {
    factorsList: summary.factors.join(", "),
    primeFactors: summary.expandedPrimeProduct,
    factorCount: summary.analytics.divisorCount
  };
}
