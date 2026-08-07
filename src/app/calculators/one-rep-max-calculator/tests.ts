import { calculateOneRepMaxCalculator } from "./calculator";

export function runOneRepMaxCalculatorTests() {
  const defaultInputs = {
  "weightLiftedKg": 80,
  "reps": 5
};
  const res1 = calculateOneRepMaxCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "weightLiftedKg": 0,
  "reps": 0
};
  const res2 = calculateOneRepMaxCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "weightLiftedKg": -50,
  "reps": -50
};
  const res3 = calculateOneRepMaxCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "weightLiftedKg": null,
  "reps": null
};
  const res4 = calculateOneRepMaxCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
