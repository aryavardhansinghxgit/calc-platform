import { MeanMedianModeRangeCalculatorOutputs } from "./types";
import { parseDataset, computeStandardMMM } from "./mmm-logic";

export function calculateMeanMedianModeRangeCalculator(inputs: Record<string, any>): MeanMedianModeRangeCalculatorOutputs {
  const raw = String(inputs.dataSeries !== undefined ? inputs.dataSeries : "3, 7, 5, 13, 20, 23, 39, 23, 40, 23, 14, 12, 56, 23, 29");
  const isSample = inputs.isSample !== undefined ? Boolean(inputs.isSample) : true;
  const nums = parseDataset(raw);

  if (nums.length === 0) {
    return {
      mean: 0,
      median: 0,
      mode: "No Mode",
      range: 0,
      count: 0,
      sum: 0,
      variance: 0,
      standardDeviation: 0
    };
  }

  const res = computeStandardMMM(nums, isSample);
  const activeSD = isSample ? res.sampleSD : res.popSD;
  const activeVar = isSample ? res.sampleVar : res.popVar;

  return {
    mean: res.mean,
    median: res.median,
    mode: res.modes.length > 0 ? res.modes.join(", ") : "No Mode",
    range: res.range,
    count: res.count,
    sum: res.sum,
    variance: activeVar,
    standardDeviation: activeSD
  };
}

export default calculateMeanMedianModeRangeCalculator;
