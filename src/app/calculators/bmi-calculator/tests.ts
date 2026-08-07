import { calculateBMICalculator } from "./calculator";

export function runBMICalculatorTests() {
  const defaultInputs = {
  "weightKg": 70,
  "heightCm": 175
};
  const res1 = calculateBMICalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "weightKg": 0,
  "heightCm": 0
};
  const res2 = calculateBMICalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "weightKg": -50,
  "heightCm": -50
};
  const res3 = calculateBMICalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "weightKg": null,
  "heightCm": null
};
  const res4 = calculateBMICalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
