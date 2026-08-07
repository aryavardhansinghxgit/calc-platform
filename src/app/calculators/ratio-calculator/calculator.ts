import { RatioCalculatorOutputs } from "./types";

export function calculateRatioCalculator(inputs: Record<string, any>): RatioCalculatorOutputs {
  const a = Number(inputs.valA) || 4;
  const b = Number(inputs.valB) || 16;
  const c = Number(inputs.valC) || 10;
  const x = a !== 0 ? (b * c) / a : 0;
  const gcd = (p: number, q: number): number => (q === 0 ? p : gcd(q, p % q));
  const g = gcd(Math.abs(Math.round(a)), Math.abs(Math.round(b)));
  const simA = Math.round(a) / (g || 1);
  const simB = Math.round(b) / (g || 1);
  return { valX: parseFloat(x.toFixed(4)), simplifiedRatio: `${simA} : ${simB}` };
}
