import { calculateDayCounter } from "./calculator";

export function runDayCounterTests() {
  const defaultInputs = {
  "startDate": "2026-01-01",
  "endDate": "2026-12-31"
};
  const res1 = calculateDayCounter(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "startDate": 0,
  "endDate": 0
};
  const res2 = calculateDayCounter(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "startDate": -50,
  "endDate": -50
};
  const res3 = calculateDayCounter(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "startDate": null,
  "endDate": null
};
  const res4 = calculateDayCounter(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
