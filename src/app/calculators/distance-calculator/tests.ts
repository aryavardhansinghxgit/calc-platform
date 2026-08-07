import { calculateDistanceCalculator } from "./calculator";

export function runDistanceCalculatorTests() {
  const defaultInputs = {
  "x1": 0,
  "y1": 0,
  "x2": 3,
  "y2": 4
};
  const res1 = calculateDistanceCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "x1": 0,
  "y1": 0,
  "x2": 0,
  "y2": 0
};
  const res2 = calculateDistanceCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "x1": -50,
  "y1": -50,
  "x2": -50,
  "y2": -50
};
  const res3 = calculateDistanceCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "x1": null,
  "y1": null,
  "x2": null,
  "y2": null
};
  const res4 = calculateDistanceCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
