import { calculateGPACalculator } from "./calculator";

export function runGPACalculatorTests() {
  const defaultInputs = {
  "g1": 4,
  "c1": 3,
  "g2": 3,
  "c2": 4
};
  const res1 = calculateGPACalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "g1": 0,
  "c1": 0,
  "g2": 0,
  "c2": 0
};
  const res2 = calculateGPACalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "g1": -50,
  "c1": -50,
  "g2": -50,
  "c2": -50
};
  const res3 = calculateGPACalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "g1": null,
  "c1": null,
  "g2": null,
  "c2": null
};
  const res4 = calculateGPACalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
