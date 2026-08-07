import { calculateSleepCalculator } from "./calculator";

export function runSleepCalculatorTests() {
  const defaultInputs = {
  "wakeTime": "07:00"
};
  const res1 = calculateSleepCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "wakeTime": 0
};
  const res2 = calculateSleepCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "wakeTime": -50
};
  const res3 = calculateSleepCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "wakeTime": null
};
  const res4 = calculateSleepCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
