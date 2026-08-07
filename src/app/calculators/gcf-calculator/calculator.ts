import { GreatestCommonFactorGCFCalculatorOutputs } from "./types";

export function calculateGreatestCommonFactorGCFCalculator(inputs: Record<string, any>): GreatestCommonFactorGCFCalculatorOutputs {
  const a = Math.max(1, Math.floor(Number(inputs.num1) || 36));
  const b = Math.max(1, Math.floor(Number(inputs.num2) || 60));
  const c = Math.max(1, Math.floor(Number(inputs.num3) || 96));
  const gcd2 = (x: number, y: number): number => (y === 0 ? x : gcd2(y, x % y));
  const lcm2 = (x: number, y: number): number => (x * y) / gcd2(x, y);
  const gcfRes = gcd2(gcd2(a, b), c);
  const lcmRes = lcm2(lcm2(a, b), c);
  return { gcf: gcfRes, lcm: lcmRes };
}
