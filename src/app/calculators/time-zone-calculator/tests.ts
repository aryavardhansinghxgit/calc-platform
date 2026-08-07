import { calculateTimeZoneCalculator } from "./calculator";

export function runTimeZoneCalculatorTests() {
  const defaultInputs = {
  "timeStr": "12:00",
  "fromOffset": -5,
  "toOffset": 1
};
  const res1 = calculateTimeZoneCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "timeStr": 0,
  "fromOffset": 0,
  "toOffset": 0
};
  const res2 = calculateTimeZoneCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "timeStr": -50,
  "fromOffset": -50,
  "toOffset": -50
};
  const res3 = calculateTimeZoneCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "timeStr": null,
  "fromOffset": null,
  "toOffset": null
};
  const res4 = calculateTimeZoneCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
