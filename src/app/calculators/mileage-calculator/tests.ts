import { calculateMileageCalculator } from "./calculator";

export function runMileageCalculatorTests() {
  const defaultInputs = {
  "distanceMiles": 120,
  "irsRate": 0.67
};
  const res1 = calculateMileageCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "distanceMiles": 0,
  "irsRate": 0
};
  const res2 = calculateMileageCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "distanceMiles": -50,
  "irsRate": -50
};
  const res3 = calculateMileageCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "distanceMiles": null,
  "irsRate": null
};
  const res4 = calculateMileageCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
