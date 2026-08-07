import { calculateScientificNotationCalculator } from "./calculator";

export function runScientificNotationCalculatorTests() {
  const defaultInputs = {
  "number": 3500000
};
  const res1 = calculateScientificNotationCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "number": 0
};
  const res2 = calculateScientificNotationCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "number": -50
};
  const res3 = calculateScientificNotationCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "number": null
};
  const res4 = calculateScientificNotationCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
