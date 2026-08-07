import { calculateSlopeCalculator } from "./calculator";

export function runSlopeCalculatorTests() {
  const defaultInputs = {
  "x1": 1,
  "y1": 2,
  "x2": 4,
  "y2": 8
};
  const res1 = calculateSlopeCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "x1": 0,
  "y1": 0,
  "x2": 0,
  "y2": 0
};
  const res2 = calculateSlopeCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "x1": -50,
  "y1": -50,
  "x2": -50,
  "y2": -50
};
  const res3 = calculateSlopeCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "x1": null,
  "y1": null,
  "x2": null,
  "y2": null
};
  const res4 = calculateSlopeCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
