import { calculateOhmsLawCalculator } from "./calculator";

export function runOhmsLawCalculatorTests() {
  const defaultInputs = {
  "voltage": 12,
  "resistance": 4
};
  const res1 = calculateOhmsLawCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "voltage": 0,
  "resistance": 0
};
  const res2 = calculateOhmsLawCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "voltage": -50,
  "resistance": -50
};
  const res3 = calculateOhmsLawCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "voltage": null,
  "resistance": null
};
  const res4 = calculateOhmsLawCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
