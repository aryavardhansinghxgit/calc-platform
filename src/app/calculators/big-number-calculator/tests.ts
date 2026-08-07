import { calculateBigNumberCalculator } from "./calculator";

export function runBigNumberCalculatorTests() {
  const defaultInputs = {
  "num1": "1234567890123456789",
  "operation": "+",
  "num2": "9876543210987654321"
};
  const res1 = calculateBigNumberCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "num1": 0,
  "operation": 0,
  "num2": 0
};
  const res2 = calculateBigNumberCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "num1": -50,
  "operation": -50,
  "num2": -50
};
  const res3 = calculateBigNumberCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "num1": null,
  "operation": null,
  "num2": null
};
  const res4 = calculateBigNumberCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
