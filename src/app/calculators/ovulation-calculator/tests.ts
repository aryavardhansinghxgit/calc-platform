import { calculateOvulationCalculator } from "./calculator";

export function runOvulationCalculatorTests() {
  const defaultInputs = {
  "lastPeriod": "2026-08-01",
  "cycleLength": 28
};
  const res1 = calculateOvulationCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "lastPeriod": 0,
  "cycleLength": 0
};
  const res2 = calculateOvulationCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "lastPeriod": -50,
  "cycleLength": -50
};
  const res3 = calculateOvulationCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "lastPeriod": null,
  "cycleLength": null
};
  const res4 = calculateOvulationCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
