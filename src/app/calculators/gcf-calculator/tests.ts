import { calculateGreatestCommonFactorGCFCalculator } from "./calculator";

export function runGreatestCommonFactorGCFCalculatorTests() {
  const defaultInputs = {
  "num1": 36,
  "num2": 60,
  "num3": 96
};
  const res1 = calculateGreatestCommonFactorGCFCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "num1": 0,
  "num2": 0,
  "num3": 0
};
  const res2 = calculateGreatestCommonFactorGCFCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "num1": -50,
  "num2": -50,
  "num3": -50
};
  const res3 = calculateGreatestCommonFactorGCFCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "num1": null,
  "num2": null,
  "num3": null
};
  const res4 = calculateGreatestCommonFactorGCFCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
