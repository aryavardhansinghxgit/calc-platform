import { calculateBMRCalculator } from "./calculator";

export function runBMRCalculatorTests() {
  const defaultInputs = {
  "age": 30,
  "gender": "male",
  "weightKg": 70,
  "heightCm": 175
};
  const res1 = calculateBMRCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "age": 0,
  "gender": 0,
  "weightKg": 0,
  "heightCm": 0
};
  const res2 = calculateBMRCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "age": -50,
  "gender": -50,
  "weightKg": -50,
  "heightCm": -50
};
  const res3 = calculateBMRCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "age": null,
  "gender": null,
  "weightKg": null,
  "heightCm": null
};
  const res4 = calculateBMRCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
