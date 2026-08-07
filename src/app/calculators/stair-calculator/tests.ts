import { calculateStairCalculator } from "./calculator";

export function runStairCalculatorTests() {
  const defaultInputs = {
  "totalRiseInches": 108,
  "targetRiserHeight": 7.5
};
  const res1 = calculateStairCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "totalRiseInches": 0,
  "targetRiserHeight": 0
};
  const res2 = calculateStairCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "totalRiseInches": -50,
  "targetRiserHeight": -50
};
  const res3 = calculateStairCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "totalRiseInches": null,
  "targetRiserHeight": null
};
  const res4 = calculateStairCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
