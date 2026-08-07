import { calculateMatrixCalculator } from "./calculator";

export function runMatrixCalculatorTests() {
  const defaultInputs = {
  "a11": 1,
  "a12": 2,
  "a21": 3,
  "a22": 4,
  "operation": "det"
};
  const res1 = calculateMatrixCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "a11": 0,
  "a12": 0,
  "a21": 0,
  "a22": 0,
  "operation": 0
};
  const res2 = calculateMatrixCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "a11": -50,
  "a12": -50,
  "a21": -50,
  "a22": -50,
  "operation": -50
};
  const res3 = calculateMatrixCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "a11": null,
  "a12": null,
  "a21": null,
  "a22": null,
  "operation": null
};
  const res4 = calculateMatrixCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
