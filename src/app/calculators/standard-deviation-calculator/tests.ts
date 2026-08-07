import { calculateStandardDeviationCalculator } from "./calculator";

export function runStandardDeviationCalculatorTests() {
  const defaultInputs = {
  "dataSeries": "10, 12, 23, 23, 16, 23, 21, 16"
};
  const res1 = calculateStandardDeviationCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "dataSeries": 0
};
  const res2 = calculateStandardDeviationCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "dataSeries": -50
};
  const res3 = calculateStandardDeviationCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "dataSeries": null
};
  const res4 = calculateStandardDeviationCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
