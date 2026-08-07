import { calculateRatioCalculator } from "./calculator";

export function runRatioCalculatorTests() {
  const defaultInputs = {
  "valA": 4,
  "valB": 16,
  "valC": 10
};
  const res1 = calculateRatioCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "valA": 0,
  "valB": 0,
  "valC": 0
};
  const res2 = calculateRatioCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "valA": -50,
  "valB": -50,
  "valC": -50
};
  const res3 = calculateRatioCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "valA": null,
  "valB": null,
  "valC": null
};
  const res4 = calculateRatioCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
