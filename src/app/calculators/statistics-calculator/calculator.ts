import { StatisticsCalculatorOutputs } from "./types";

export function calculateStatisticsCalculator(inputs: Record<string, any>): StatisticsCalculatorOutputs {
  const raw = String(inputs.dataSeries || "4, 8, 6, 5, 3, 2, 8, 9, 2, 5");
  const nums = raw.split(/[,\s]+/).map(Number).filter(n => !isNaN(n)).sort((a, b) => a - b);
  if (nums.length === 0) return { count: 0, sum: 0, mean: 0, median: 0, range: 0 };
  const cnt = nums.length;
  const sum = nums.reduce((a, b) => a + b, 0);
  const mean = sum / cnt;
  const med = cnt % 2 === 1 ? nums[Math.floor(cnt / 2)] : (nums[cnt / 2 - 1] + nums[cnt / 2]) / 2;
  const rng = nums[cnt - 1] - nums[0];
  return {
    count: cnt,
    sum: parseFloat(sum.toFixed(4)),
    mean: parseFloat(mean.toFixed(4)),
    median: parseFloat(med.toFixed(4)),
    range: parseFloat(rng.toFixed(4))
  };
}
