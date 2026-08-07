import { calculateDensityCalculator } from "./calculator";

export function runDensityCalculatorTests() {
  const defaultInputs = {
  "massKg": 50,
  "volumeM3": 0.02
};
  const res1 = calculateDensityCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "massKg": 0,
  "volumeM3": 0
};
  const res2 = calculateDensityCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "massKg": -50,
  "volumeM3": -50
};
  const res3 = calculateDensityCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "massKg": null,
  "volumeM3": null
};
  const res4 = calculateDensityCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
