import { calculatePaceCalculator } from "./calculator";

export function runPaceCalculatorTests() {
  const defaultInputs = {
  "distanceKm": 10,
  "timeHours": 0,
  "timeMinutes": 50,
  "timeSeconds": 0
};
  const res1 = calculatePaceCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "distanceKm": 0,
  "timeHours": 0,
  "timeMinutes": 0,
  "timeSeconds": 0
};
  const res2 = calculatePaceCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "distanceKm": -50,
  "timeHours": -50,
  "timeMinutes": -50,
  "timeSeconds": -50
};
  const res3 = calculatePaceCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "distanceKm": null,
  "timeHours": null,
  "timeMinutes": null,
  "timeSeconds": null
};
  const res4 = calculatePaceCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
