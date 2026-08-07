import { calculateCalorieCalculator } from "./calculator";

export function runCalorieCalculatorTests() {
  const defaultInputs = {
  "age": 25,
  "gender": "male",
  "weightKg": 70,
  "heightCm": 175,
  "activityLevel": "1.375",
  "goal": "maintain"
};
  const res1 = calculateCalorieCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "age": 0,
  "gender": 0,
  "weightKg": 0,
  "heightCm": 0,
  "activityLevel": 0,
  "goal": 0
};
  const res2 = calculateCalorieCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "age": -50,
  "gender": -50,
  "weightKg": -50,
  "heightCm": -50,
  "activityLevel": -50,
  "goal": -50
};
  const res3 = calculateCalorieCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "age": null,
  "gender": null,
  "weightKg": null,
  "heightCm": null,
  "activityLevel": null,
  "goal": null
};
  const res4 = calculateCalorieCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
