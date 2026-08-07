import { calculateMeanMedianModeRangeCalculator } from "./calculator";

export function runMeanMedianModeRangeCalculatorTests() {
  const defaultInputs = {
  "dataSeries": "12, 15, 12, 18, 22, 12, 15, 30"
};
  const res1 = calculateMeanMedianModeRangeCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "dataSeries": 0
};
  const res2 = calculateMeanMedianModeRangeCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "dataSeries": -50
};
  const res3 = calculateMeanMedianModeRangeCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "dataSeries": null
};
  const res4 = calculateMeanMedianModeRangeCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
