import { calculateTriangleCalculator } from "./calculator";

export function runTriangleCalculatorTests() {
  const defaultInputs = {
  "sideA": 3,
  "sideB": 4,
  "sideC": 5
};
  const res1 = calculateTriangleCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "sideA": 0,
  "sideB": 0,
  "sideC": 0
};
  const res2 = calculateTriangleCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "sideA": -50,
  "sideB": -50,
  "sideC": -50
};
  const res3 = calculateTriangleCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "sideA": null,
  "sideB": null,
  "sideC": null
};
  const res4 = calculateTriangleCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
