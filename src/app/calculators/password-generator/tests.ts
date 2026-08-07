import { calculatePasswordGenerator } from "./calculator";

export function runPasswordGeneratorTests() {
  const defaultInputs = {
  "length": 16
};
  const res1 = calculatePasswordGenerator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "length": 0
};
  const res2 = calculatePasswordGenerator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "length": -50
};
  const res3 = calculatePasswordGenerator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "length": null
};
  const res4 = calculatePasswordGenerator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
