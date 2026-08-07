import { calculateRandomNumberGenerator } from "./calculator";

export function runRandomNumberGeneratorTests() {
  const defaultInputs = {
  "min": 1,
  "max": 100,
  "count": 5
};
  const res1 = calculateRandomNumberGenerator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "min": 0,
  "max": 0,
  "count": 0
};
  const res2 = calculateRandomNumberGenerator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "min": -50,
  "max": -50,
  "count": -50
};
  const res3 = calculateRandomNumberGenerator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "min": null,
  "max": null,
  "count": null
};
  const res4 = calculateRandomNumberGenerator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
