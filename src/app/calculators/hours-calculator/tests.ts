import { calculateHoursCalculator } from "./calculator";

export function runHoursCalculatorTests() {
  const defaultInputs = {
  "startTime": "09:00",
  "endTime": "17:00",
  "breakMins": 30
};
  const res1 = calculateHoursCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "startTime": 0,
  "endTime": 0,
  "breakMins": 0
};
  const res2 = calculateHoursCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "startTime": -50,
  "endTime": -50,
  "breakMins": -50
};
  const res3 = calculateHoursCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "startTime": null,
  "endTime": null,
  "breakMins": null
};
  const res4 = calculateHoursCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
