import { calculateProteinCalculator } from "./calculator";

export function runProteinCalculatorTests() {
  const defaultInputs = {
  "weightKg": 70,
  "goal": "strength"
};
  const res1 = calculateProteinCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "weightKg": 0,
  "goal": 0
};
  const res2 = calculateProteinCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "weightKg": -50,
  "goal": -50
};
  const res3 = calculateProteinCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "weightKg": null,
  "goal": null
};
  const res4 = calculateProteinCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
