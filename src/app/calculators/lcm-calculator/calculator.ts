import { LeastCommonMultipleLCMCalculatorOutputs } from "./types";

export function calculateLeastCommonMultipleLCMCalculator(inputs: Record<string, any>): LeastCommonMultipleLCMCalculatorOutputs {
  const a = Math.max(1, Math.floor(Number(inputs.num1) || 12));
  const b = Math.max(1, Math.floor(Number(inputs.num2) || 18));
  const c = Math.max(1, Math.floor(Number(inputs.num3) || 24));
  const gcd2 = (x: number, y: number): number => (y === 0 ? x : gcd2(y, x % y));
  const lcm2 = (x: number, y: number): number => (x * y) / gcd2(x, y);
  const lcmRes = lcm2(lcm2(a, b), c);
  const gcfRes = gcd2(gcd2(a, b), c);
  return { lcm: lcmRes, gcf: gcfRes };
}
