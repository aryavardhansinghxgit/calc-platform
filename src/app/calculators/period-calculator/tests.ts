import { calculatePeriodCalculator } from "./calculator";

export function runPeriodCalculatorTests() {
  const defaultInputs = {
  "lastPeriod": "2026-08-01",
  "cycleLength": 28
};
  const res1 = calculatePeriodCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "lastPeriod": 0,
  "cycleLength": 0
};
  const res2 = calculatePeriodCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "lastPeriod": -50,
  "cycleLength": -50
};
  const res3 = calculatePeriodCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "lastPeriod": null,
  "cycleLength": null
};
  const res4 = calculatePeriodCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
