import { calculateFractionCalculator } from "./calculator";

export function runFractionCalculatorTests() {
  const defaultInputs = {
  "num1": 3,
  "den1": 4,
  "operation": "+",
  "num2": 1,
  "den2": 2
};
  const res1 = calculateFractionCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "num1": 0,
  "den1": 0,
  "operation": 0,
  "num2": 0,
  "den2": 0
};
  const res2 = calculateFractionCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "num1": -50,
  "den1": -50,
  "operation": -50,
  "num2": -50,
  "den2": -50
};
  const res3 = calculateFractionCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "num1": null,
  "den1": null,
  "operation": null,
  "num2": null,
  "den2": null
};
  const res4 = calculateFractionCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
