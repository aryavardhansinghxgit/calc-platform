import { calculateRightTriangleCalculator } from "./calculator";

export function runRightTriangleCalculatorTests() {
  const defaultInputs = {
  "sideA": 5,
  "sideB": 12
};
  const res1 = calculateRightTriangleCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "sideA": 0,
  "sideB": 0
};
  const res2 = calculateRightTriangleCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "sideA": -50,
  "sideB": -50
};
  const res3 = calculateRightTriangleCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "sideA": null,
  "sideB": null
};
  const res4 = calculateRightTriangleCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
