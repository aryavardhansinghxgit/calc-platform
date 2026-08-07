import { calculateConfidenceIntervalCalculator } from "./calculator";

export function runConfidenceIntervalCalculatorTests() {
  const defaultInputs = {
  "mean": 50,
  "sd": 8,
  "sampleSize": 100,
  "confidenceLevel": "95"
};
  const res1 = calculateConfidenceIntervalCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "mean": 0,
  "sd": 0,
  "sampleSize": 0,
  "confidenceLevel": 0
};
  const res2 = calculateConfidenceIntervalCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "mean": -50,
  "sd": -50,
  "sampleSize": -50,
  "confidenceLevel": -50
};
  const res3 = calculateConfidenceIntervalCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "mean": null,
  "sd": null,
  "sampleSize": null,
  "confidenceLevel": null
};
  const res4 = calculateConfidenceIntervalCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
