import { calculateScientificCalculator } from "./calculator";

export function runScientificCalculatorTests() {
  const defaultInputs = {
  "value1": 45,
  "operation": "sin"
};
  const res1 = calculateScientificCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "value1": 0,
  "operation": 0
};
  const res2 = calculateScientificCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "value1": -50,
  "operation": -50
};
  const res3 = calculateScientificCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "value1": null,
  "operation": null
};
  const res4 = calculateScientificCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
