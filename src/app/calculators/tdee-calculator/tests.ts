import { calculateTDEECalculator } from "./calculator";

export function runTDEECalculatorTests() {
  const defaultInputs = {
  "age": 25,
  "gender": "male",
  "weightKg": 70,
  "heightCm": 175,
  "activityLevel": "1.55"
};
  const res1 = calculateTDEECalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "age": 0,
  "gender": 0,
  "weightKg": 0,
  "heightCm": 0,
  "activityLevel": 0
};
  const res2 = calculateTDEECalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "age": -50,
  "gender": -50,
  "weightKg": -50,
  "heightCm": -50,
  "activityLevel": -50
};
  const res3 = calculateTDEECalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "age": null,
  "gender": null,
  "weightKg": null,
  "heightCm": null,
  "activityLevel": null
};
  const res4 = calculateTDEECalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
