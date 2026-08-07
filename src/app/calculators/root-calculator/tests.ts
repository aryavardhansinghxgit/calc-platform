import { calculateRootCalculator } from "./calculator";

export function runRootCalculatorTests() {
  const defaultInputs = {
  "value": 64,
  "degree": 3
};
  const res1 = calculateRootCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "value": 0,
  "degree": 0
};
  const res2 = calculateRootCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "value": -50,
  "degree": -50
};
  const res3 = calculateRootCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "value": null,
  "degree": null
};
  const res4 = calculateRootCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
