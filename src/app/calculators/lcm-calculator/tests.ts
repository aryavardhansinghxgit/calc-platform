import { calculateLeastCommonMultipleLCMCalculator } from "./calculator";

export function runLeastCommonMultipleLCMCalculatorTests() {
  const defaultInputs = {
  "num1": 12,
  "num2": 18,
  "num3": 24
};
  const res1 = calculateLeastCommonMultipleLCMCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "num1": 0,
  "num2": 0,
  "num3": 0
};
  const res2 = calculateLeastCommonMultipleLCMCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "num1": -50,
  "num2": -50,
  "num3": -50
};
  const res3 = calculateLeastCommonMultipleLCMCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "num1": null,
  "num2": null,
  "num3": null
};
  const res4 = calculateLeastCommonMultipleLCMCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
