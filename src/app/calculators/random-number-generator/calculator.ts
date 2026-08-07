import { RandomNumberGeneratorOutputs } from "./types";

export function calculateRandomNumberGenerator(inputs: Record<string, any>): RandomNumberGeneratorOutputs {
  const min = Number(inputs.min) || 1;
  const max = Math.max(min, Number(inputs.max) || 100);
  const count = Math.min(50, Math.max(1, Number(inputs.count) || 5));
  const nums: number[] = [];
  for (let i = 0; i < count; i++) {
    nums.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  const sum = nums.reduce((a, b) => a + b, 0);
  const avg = parseFloat((sum / count).toFixed(2));
  return { generatedList: nums.join(", "), average: avg, sum };
}
