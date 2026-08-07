import { calculateFactorCalculator } from "./calculator";

export function runFactorCalculatorTests() {
  const defaultInputs = {
  "number": 120
};
  const res1 = calculateFactorCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "number": 0
};
  const res2 = calculateFactorCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "number": -50
};
  const res3 = calculateFactorCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "number": null
};
  const res4 = calculateFactorCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
