import { calculateAgeCalculator } from "./calculator";

export function runAgeCalculatorTests() {
  const defaultInputs = {
  "birthDate": "2000-01-01",
  "targetDate": "2026-08-07"
};
  const res1 = calculateAgeCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "birthDate": 0,
  "targetDate": 0
};
  const res2 = calculateAgeCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "birthDate": -50,
  "targetDate": -50
};
  const res3 = calculateAgeCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "birthDate": null,
  "targetDate": null
};
  const res4 = calculateAgeCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
