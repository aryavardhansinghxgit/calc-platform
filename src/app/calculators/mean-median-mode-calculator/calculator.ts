import { MeanMedianModeRangeCalculatorOutputs } from "./types";

export function calculateMeanMedianModeRangeCalculator(inputs: Record<string, any>): MeanMedianModeRangeCalculatorOutputs {
  const raw = String(inputs.dataSeries || "12, 15, 12, 18, 22, 12, 15, 30");
  const nums = raw.split(/[,\s]+/).map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
  if (nums.length === 0) return { mean: 0, median: 0, mode: "N/A", range: 0 };
  const n = nums.length;
  const mean = nums.reduce((a, b) => a + b, 0) / n;
  const med = n % 2 === 1 ? nums[Math.floor(n / 2)] : (nums[n / 2 - 1] + nums[n / 2]) / 2;
  const counts: Record<number, number> = {};
  let maxF = 0;
  nums.forEach(x => { counts[x] = (counts[x] || 0) + 1; if (counts[x] > maxF) maxF = counts[x]; });
  const modes = Object.keys(counts).filter(k => counts[Number(k)] === maxF);
  return {
    mean: parseFloat(mean.toFixed(3)),
    median: parseFloat(med.toFixed(3)),
    mode: maxF > 1 ? modes.join(", ") : "No repeated mode",
    range: nums[n - 1] - nums[0]
  };
}
