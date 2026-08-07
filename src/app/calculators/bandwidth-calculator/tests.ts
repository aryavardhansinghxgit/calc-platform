import { calculateBandwidthCalculator } from "./calculator";

export function runBandwidthCalculatorTests() {
  const defaultInputs = {
  "fileSizeMb": 1000,
  "speedMbps": 100
};
  const res1 = calculateBandwidthCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "fileSizeMb": 0,
  "speedMbps": 0
};
  const res2 = calculateBandwidthCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "fileSizeMb": -50,
  "speedMbps": -50
};
  const res3 = calculateBandwidthCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "fileSizeMb": null,
  "speedMbps": null
};
  const res4 = calculateBandwidthCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
