import { PermutationCombinationCalculatorOutputs } from "./types";

export function calculatePermutationCombinationCalculator(inputs: Record<string, any>): PermutationCombinationCalculatorOutputs {
  const n = Math.min(100, Math.max(0, Math.floor(Number(inputs.nVal) || 8)));
  const r = Math.min(n, Math.max(0, Math.floor(Number(inputs.rVal) || 3)));
  const fact = (num: number): number => {
    let res = 1;
    for (let i = 2; i <= num; i++) res *= i;
    return res;
  };
  const nPr = fact(n) / fact(n - r);
  const nCr = nPr / fact(r);
  return { combinations: Math.round(nCr), permutations: Math.round(nPr) };
}
