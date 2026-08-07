import { calculateTimeDurationCalculator } from "./calculator";

export function runTimeDurationCalculatorTests() {
  const defaultInputs = {
  "startDate": "2026-08-01",
  "startTime": "08:00",
  "endDate": "2026-08-07",
  "endTime": "17:30"
};
  const res1 = calculateTimeDurationCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "startDate": 0,
  "startTime": 0,
  "endDate": 0,
  "endTime": 0
};
  const res2 = calculateTimeDurationCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "startDate": -50,
  "startTime": -50,
  "endDate": -50,
  "endTime": -50
};
  const res3 = calculateTimeDurationCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "startDate": null,
  "startTime": null,
  "endDate": null,
  "endTime": null
};
  const res4 = calculateTimeDurationCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
