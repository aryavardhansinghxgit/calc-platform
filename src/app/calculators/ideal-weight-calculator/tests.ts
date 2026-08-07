import { calculateIdealWeightCalculator } from "./calculator";

export function runIdealWeightCalculatorTests() {
  const defaultInputs = {
  "gender": "male",
  "heightCm": 175
};
  const res1 = calculateIdealWeightCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "gender": 0,
  "heightCm": 0
};
  const res2 = calculateIdealWeightCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "gender": -50,
  "heightCm": -50
};
  const res3 = calculateIdealWeightCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "gender": null,
  "heightCm": null
};
  const res4 = calculateIdealWeightCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
