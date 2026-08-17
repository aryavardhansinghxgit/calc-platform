import { LeastCommonMultipleLCMCalculatorOutputs } from "./types";
import { calculateLCM, calculateGCF } from "./lcm-logic";

export function calculateLeastCommonMultipleLCMCalculator(inputs: Record<string, any>): LeastCommonMultipleLCMCalculatorOutputs {
  const nums: number[] = [];
  if (inputs.num1 != null && !Number.isNaN(Number(inputs.num1))) nums.push(Math.max(1, Math.floor(Number(inputs.num1))));
  if (inputs.num2 != null && !Number.isNaN(Number(inputs.num2))) nums.push(Math.max(1, Math.floor(Number(inputs.num2))));
  if (inputs.num3 != null && !Number.isNaN(Number(inputs.num3))) nums.push(Math.max(1, Math.floor(Number(inputs.num3))));

  const validNums = nums.length > 0 ? nums : [12, 18, 30];
  const lcmRes = calculateLCM(validNums);
  const gcfRes = calculateGCF(validNums);

  return { lcm: lcmRes, gcf: gcfRes };
}
