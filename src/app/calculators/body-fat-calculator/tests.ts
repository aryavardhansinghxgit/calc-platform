import { calculateBodyFatCalculator } from "./calculator";

export function runBodyFatCalculatorTests() {
  const defaultInputs = {
  "gender": "male",
  "weightKg": 75,
  "heightCm": 175,
  "neckCm": 38,
  "waistCm": 85,
  "hipCm": 95
};
  const res1 = calculateBodyFatCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "gender": 0,
  "weightKg": 0,
  "heightCm": 0,
  "neckCm": 0,
  "waistCm": 0,
  "hipCm": 0
};
  const res2 = calculateBodyFatCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "gender": -50,
  "weightKg": -50,
  "heightCm": -50,
  "neckCm": -50,
  "waistCm": -50,
  "hipCm": -50
};
  const res3 = calculateBodyFatCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "gender": null,
  "weightKg": null,
  "heightCm": null,
  "neckCm": null,
  "waistCm": null,
  "hipCm": null
};
  const res4 = calculateBodyFatCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
