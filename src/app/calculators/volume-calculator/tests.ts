import { calculateVolumeCalculator } from "./calculator";

export function runVolumeCalculatorTests() {
  const defaultInputs = {
  "shape": "cylinder",
  "dim1": 5,
  "dim2": 10,
  "dim3": 4
};
  const res1 = calculateVolumeCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "shape": 0,
  "dim1": 0,
  "dim2": 0,
  "dim3": 0
};
  const res2 = calculateVolumeCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "shape": -50,
  "dim1": -50,
  "dim2": -50,
  "dim3": -50
};
  const res3 = calculateVolumeCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "shape": null,
  "dim1": null,
  "dim2": null,
  "dim3": null
};
  const res4 = calculateVolumeCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
