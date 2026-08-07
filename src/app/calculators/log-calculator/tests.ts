import { calculateLogCalculator } from "./calculator";

export function runLogCalculatorTests() {
  const defaultInputs = {
  "value": 100,
  "base": 10
};
  const res1 = calculateLogCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "value": 0,
  "base": 0
};
  const res2 = calculateLogCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "value": -50,
  "base": -50
};
  const res3 = calculateLogCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "value": null,
  "base": null
};
  const res4 = calculateLogCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
