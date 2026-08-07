import { calculateLeanBodyMassCalculator } from "./calculator";

export function runLeanBodyMassCalculatorTests() {
  const defaultInputs = {
  "gender": "male",
  "weightKg": 75,
  "heightCm": 175
};
  const res1 = calculateLeanBodyMassCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "gender": 0,
  "weightKg": 0,
  "heightCm": 0
};
  const res2 = calculateLeanBodyMassCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "gender": -50,
  "weightKg": -50,
  "heightCm": -50
};
  const res3 = calculateLeanBodyMassCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "gender": null,
  "weightKg": null,
  "heightCm": null
};
  const res4 = calculateLeanBodyMassCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
