import { calculateRoundingCalculator } from "./calculator";

export function runRoundingCalculatorTests() {
  const defaultInputs = {
  "number": 3.14159,
  "precision": "2"
};
  const res1 = calculateRoundingCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "number": 0,
  "precision": 0
};
  const res2 = calculateRoundingCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "number": -50,
  "precision": -50
};
  const res3 = calculateRoundingCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "number": null,
  "precision": null
};
  const res4 = calculateRoundingCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
