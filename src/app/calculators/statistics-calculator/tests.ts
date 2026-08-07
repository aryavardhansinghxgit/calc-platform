import { calculateStatisticsCalculator } from "./calculator";

export function runStatisticsCalculatorTests() {
  const defaultInputs = {
  "dataSeries": "4, 8, 6, 5, 3, 2, 8, 9, 2, 5"
};
  const res1 = calculateStatisticsCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "dataSeries": 0
};
  const res2 = calculateStatisticsCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "dataSeries": -50
};
  const res3 = calculateStatisticsCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "dataSeries": null
};
  const res4 = calculateStatisticsCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
