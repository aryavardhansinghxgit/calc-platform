import { calculateGravelCalculator } from "./calculator";

export function runGravelCalculatorTests() {
  const defaultInputs = {
  "areaSqFt": 500,
  "depthInches": 4
};
  const res1 = calculateGravelCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "areaSqFt": 0,
  "depthInches": 0
};
  const res2 = calculateGravelCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "areaSqFt": -50,
  "depthInches": -50
};
  const res3 = calculateGravelCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "areaSqFt": null,
  "depthInches": null
};
  const res4 = calculateGravelCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
