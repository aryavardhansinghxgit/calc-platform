import { calculateBraSizeCalculator } from "./calculator";

export function runBraSizeCalculatorTests() {
  const defaultInputs = {
  "underbustInches": 32,
  "bustInches": 36
};
  const res1 = calculateBraSizeCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "underbustInches": 0,
  "bustInches": 0
};
  const res2 = calculateBraSizeCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "underbustInches": -50,
  "bustInches": -50
};
  const res3 = calculateBraSizeCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "underbustInches": null,
  "bustInches": null
};
  const res4 = calculateBraSizeCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
