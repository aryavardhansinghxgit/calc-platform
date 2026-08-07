import { calculateBodyTypeCalculator } from "./calculator";

export function runBodyTypeCalculatorTests() {
  const defaultInputs = {
  "gender": "female",
  "bustChest": 90,
  "waist": 70,
  "hip": 95
};
  const res1 = calculateBodyTypeCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "gender": 0,
  "bustChest": 0,
  "waist": 0,
  "hip": 0
};
  const res2 = calculateBodyTypeCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "gender": -50,
  "bustChest": -50,
  "waist": -50,
  "hip": -50
};
  const res3 = calculateBodyTypeCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "gender": null,
  "bustChest": null,
  "waist": null,
  "hip": null
};
  const res4 = calculateBodyTypeCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
