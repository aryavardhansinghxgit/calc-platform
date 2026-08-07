import { calculateBinaryCalculator } from "./calculator";

export function runBinaryCalculatorTests() {
  const defaultInputs = {
  "binary1": "1010",
  "operation": "+",
  "binary2": "0110"
};
  const res1 = calculateBinaryCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "binary1": 0,
  "operation": 0,
  "binary2": 0
};
  const res2 = calculateBinaryCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "binary1": -50,
  "operation": -50,
  "binary2": -50
};
  const res3 = calculateBinaryCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "binary1": null,
  "operation": null,
  "binary2": null
};
  const res4 = calculateBinaryCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
