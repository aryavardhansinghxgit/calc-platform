import { calculateSampleSizeCalculator } from "./calculator";

export function runSampleSizeCalculatorTests() {
  const defaultInputs = {
  "confidenceLevel": "95",
  "marginError": 5,
  "population": 10000
};
  const res1 = calculateSampleSizeCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "confidenceLevel": 0,
  "marginError": 0,
  "population": 0
};
  const res2 = calculateSampleSizeCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "confidenceLevel": -50,
  "marginError": -50,
  "population": -50
};
  const res3 = calculateSampleSizeCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "confidenceLevel": null,
  "marginError": null,
  "population": null
};
  const res4 = calculateSampleSizeCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
