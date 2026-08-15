import { StandardDeviationCalculatorOutputs } from "./types";
import { parseDataset, computeDescriptiveStats } from "./std-dev-logic";

export function calculateStandardDeviationCalculator(inputs: Record<string, any>): StandardDeviationCalculatorOutputs {
  const raw = String(inputs.dataSeries || "10, 12, 23, 23, 16, 23, 21, 16");
  const nums = parseDataset(raw);
  if (nums.length < 2) {
    return { sampleSD: 0, populationSD: 0, mean: nums[0] || 0, sampleVariance: 0 };
  }

  const stats = computeDescriptiveStats(nums, true);

  return {
    sampleSD: parseFloat(stats.sampleSD.toFixed(4)),
    populationSD: parseFloat(stats.popSD.toFixed(4)),
    mean: parseFloat(stats.mean.toFixed(4)),
    sampleVariance: parseFloat(stats.sampleVar.toFixed(4))
  };
}
