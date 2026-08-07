import { calculateExponentCalculator } from "./calculator";

export function runExponentCalculatorTests() {
  const defaultInputs = {
  "base": 2,
  "exponent": 10
};
  const res1 = calculateExponentCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "base": 0,
  "exponent": 0
};
  const res2 = calculateExponentCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "base": -50,
  "exponent": -50
};
  const res3 = calculateExponentCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "base": null,
  "exponent": null
};
  const res4 = calculateExponentCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
