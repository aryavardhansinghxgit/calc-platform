import { calculateBodySurfaceAreaCalculator } from "./calculator";

export function runBodySurfaceAreaCalculatorTests() {
  const defaultInputs = {
  "weightKg": 70,
  "heightCm": 175
};
  const res1 = calculateBodySurfaceAreaCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "weightKg": 0,
  "heightCm": 0
};
  const res2 = calculateBodySurfaceAreaCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "weightKg": -50,
  "heightCm": -50
};
  const res3 = calculateBodySurfaceAreaCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "weightKg": null,
  "heightCm": null
};
  const res4 = calculateBodySurfaceAreaCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
