import { calculateTargetHeartRateCalculator } from "./calculator";

export function runTargetHeartRateCalculatorTests() {
  const defaultInputs = {
  "age": 30,
  "restingHR": 65
};
  const res1 = calculateTargetHeartRateCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "age": 0,
  "restingHR": 0
};
  const res2 = calculateTargetHeartRateCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "age": -50,
  "restingHR": -50
};
  const res3 = calculateTargetHeartRateCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "age": null,
  "restingHR": null
};
  const res4 = calculateTargetHeartRateCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
