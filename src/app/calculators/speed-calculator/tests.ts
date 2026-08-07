import { calculateSpeedCalculator } from "./calculator";

export function runSpeedCalculatorTests() {
  const defaultInputs = {
  "distanceKm": 150,
  "timeHours": 2
};
  const res1 = calculateSpeedCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "distanceKm": 0,
  "timeHours": 0
};
  const res2 = calculateSpeedCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "distanceKm": -50,
  "timeHours": -50
};
  const res3 = calculateSpeedCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "distanceKm": null,
  "timeHours": null
};
  const res4 = calculateSpeedCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
