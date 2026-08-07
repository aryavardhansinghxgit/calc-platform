import { calculateCaloriesBurnedCalculator } from "./calculator";

export function runCaloriesBurnedCalculatorTests() {
  const defaultInputs = {
  "activity": "running_8kmh",
  "weightKg": 70,
  "durationMins": 45
};
  const res1 = calculateCaloriesBurnedCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "activity": 0,
  "weightKg": 0,
  "durationMins": 0
};
  const res2 = calculateCaloriesBurnedCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "activity": -50,
  "weightKg": -50,
  "durationMins": -50
};
  const res3 = calculateCaloriesBurnedCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "activity": null,
  "weightKg": null,
  "durationMins": null
};
  const res4 = calculateCaloriesBurnedCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
