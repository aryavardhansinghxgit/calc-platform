import { RandomNumberGeneratorOutputs } from "./types";

export function calculateRandomNumberGenerator(inputs: Record<string, any>): RandomNumberGeneratorOutputs {
  const parseVal = (v: any, fallback: number): number => {
    if (v === undefined || v === null || v === "") return fallback;
    const n = Number(v);
    return isNaN(n) ? fallback : n;
  };

  const rawMin = parseVal(inputs.min, 1);
  const rawMax = parseVal(inputs.max, 100);
  const min = Math.min(rawMin, rawMax);
  const max = Math.max(rawMin, rawMax);

  const rawCount = parseVal(inputs.count, 5);
  const count = Math.min(50, Math.max(1, Math.floor(rawCount)));

  const nums: number[] = [];
  const range = max - min + 1;

  for (let i = 0; i < count; i++) {
    if (range <= 1) {
      nums.push(min);
    } else {
      nums.push(Math.floor(Math.random() * range) + min);
    }
  }

  const sum = nums.reduce((a, b) => a + b, 0);
  const avg = parseFloat((sum / count).toFixed(2));
  return { generatedList: nums.join(", "), average: avg, sum };
}
