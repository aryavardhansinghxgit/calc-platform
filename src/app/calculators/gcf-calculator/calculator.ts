import { GreatestCommonFactorGCFCalculatorOutputs } from "./types";
import { calculateGCF, calculateLCM } from "./gcf-logic";

export function calculateGreatestCommonFactorGCFCalculator(inputs: Record<string, any>): GreatestCommonFactorGCFCalculatorOutputs {
  const nums: number[] = [];
  if (inputs.num1 != null && !Number.isNaN(Number(inputs.num1))) nums.push(Math.max(1, Math.floor(Number(inputs.num1))));
  if (inputs.num2 != null && !Number.isNaN(Number(inputs.num2))) nums.push(Math.max(1, Math.floor(Number(inputs.num2))));
  if (inputs.num3 != null && !Number.isNaN(Number(inputs.num3))) nums.push(Math.max(1, Math.floor(Number(inputs.num3))));

  const validNums = nums.length > 0 ? nums : [36, 54, 90];
  const gcfRes = calculateGCF(validNums);
  const lcmRes = calculateLCM(validNums);

  return { gcf: gcfRes, lcm: lcmRes };
}
