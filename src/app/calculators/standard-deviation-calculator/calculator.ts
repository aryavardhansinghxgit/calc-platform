import { StandardDeviationCalculatorOutputs } from "./types";

export function calculateStandardDeviationCalculator(inputs: Record<string, any>): StandardDeviationCalculatorOutputs {
  const raw = String(inputs.dataSeries || "10, 12, 23, 23, 16, 23, 21, 16");
  const nums = raw.split(/[,\s]+/).map(Number).filter(n => !isNaN(n));
  if (nums.length < 2) return { sampleSD: 0, populationSD: 0, mean: nums[0] || 0, sampleVariance: 0 };
  const n = nums.length;
  const mean = nums.reduce((a, b) => a + b, 0) / n;
  const sqDiffs = nums.map(x => Math.pow(x - mean, 2));
  const sumSq = sqDiffs.reduce((a, b) => a + b, 0);
  const popSD = Math.sqrt(sumSq / n);
  const samSD = Math.sqrt(sumSq / (n - 1));
  return {
    sampleSD: parseFloat(samSD.toFixed(4)),
    populationSD: parseFloat(popSD.toFixed(4)),
    mean: parseFloat(mean.toFixed(4)),
    sampleVariance: parseFloat((samSD * samSD).toFixed(4))
  };
}
