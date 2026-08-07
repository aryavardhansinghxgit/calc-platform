import { calculateMolarityCalculator } from "./calculator";

export function runMolarityCalculatorTests() {
  const defaultInputs = {
  "massGrams": 58.44,
  "molarMass": 58.44,
  "volumeLiters": 1
};
  const res1 = calculateMolarityCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "massGrams": 0,
  "molarMass": 0,
  "volumeLiters": 0
};
  const res2 = calculateMolarityCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "massGrams": -50,
  "molarMass": -50,
  "volumeLiters": -50
};
  const res3 = calculateMolarityCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "massGrams": null,
  "molarMass": null,
  "volumeLiters": null
};
  const res4 = calculateMolarityCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
