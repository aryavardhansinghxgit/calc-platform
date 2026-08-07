import { calculateHealthyWeightCalculator } from "./calculator";

export function runHealthyWeightCalculatorTests() {
  const defaultInputs = {
  "heightCm": 175
};
  const res1 = calculateHealthyWeightCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "heightCm": 0
};
  const res2 = calculateHealthyWeightCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "heightCm": -50
};
  const res3 = calculateHealthyWeightCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "heightCm": null
};
  const res4 = calculateHealthyWeightCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
