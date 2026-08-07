import { calculateWeightCalculator } from "./calculator";

export function runWeightCalculatorTests() {
  const defaultInputs = {
  "massKg": 70,
  "celestialBody": "9.81"
};
  const res1 = calculateWeightCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "massKg": 0,
  "celestialBody": 0
};
  const res2 = calculateWeightCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "massKg": -50,
  "celestialBody": -50
};
  const res3 = calculateWeightCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "massKg": null,
  "celestialBody": null
};
  const res4 = calculateWeightCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
