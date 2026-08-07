import { calculateSurfaceAreaCalculator } from "./calculator";

export function runSurfaceAreaCalculatorTests() {
  const defaultInputs = {
  "shape": "cylinder",
  "dim1": 4,
  "dim2": 10
};
  const res1 = calculateSurfaceAreaCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "shape": 0,
  "dim1": 0,
  "dim2": 0
};
  const res2 = calculateSurfaceAreaCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "shape": -50,
  "dim1": -50,
  "dim2": -50
};
  const res3 = calculateSurfaceAreaCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "shape": null,
  "dim1": null,
  "dim2": null
};
  const res4 = calculateSurfaceAreaCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
