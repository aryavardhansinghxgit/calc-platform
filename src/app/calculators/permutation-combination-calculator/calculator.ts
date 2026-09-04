import { PermutationCombinationCalculatorOutputs } from "./types";
import { bigPermutation, bigCombination } from "./perm-comb-logic";

export function calculatePermutationCombinationCalculator(inputs: Record<string, any>): PermutationCombinationCalculatorOutputs {
  // Parse inputs preserving explicit 0
  const parseNum = (val: any, defaultVal: number): number => {
    if (val === undefined || val === null || val === "") return defaultVal;
    const num = Number(val);
    return Number.isFinite(num) ? Math.floor(num) : defaultVal;
  };

  const rawN = parseNum(inputs.nVal, 6);
  const rawR = parseNum(inputs.rVal, 2);

  const n = Math.max(0, rawN);
  const r = Math.max(0, rawR);

  if (r > n) {
    return { combinations: 0, permutations: 0 };
  }

  const nPr = bigPermutation(n, r);
  const nCr = bigCombination(n, r);

  return {
    combinations: Number(nCr),
    permutations: Number(nPr)
  };
}
