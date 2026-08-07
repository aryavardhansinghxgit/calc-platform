import { calculateMassCalculator } from "./calculator";

export function runMassCalculatorTests() {
  const defaultInputs = {
  "densityKgM3": 7850,
  "volumeM3": 0.5
};
  const res1 = calculateMassCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "densityKgM3": 0,
  "volumeM3": 0
};
  const res2 = calculateMassCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "densityKgM3": -50,
  "volumeM3": -50
};
  const res3 = calculateMassCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "densityKgM3": null,
  "volumeM3": null
};
  const res4 = calculateMassCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
