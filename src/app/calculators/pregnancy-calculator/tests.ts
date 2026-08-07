import { calculatePregnancyCalculator } from "./calculator";

export function runPregnancyCalculatorTests() {
  const defaultInputs = {
  "lmpDate": "2026-01-01",
  "cycleLength": 28
};
  const res1 = calculatePregnancyCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "lmpDate": 0,
  "cycleLength": 0
};
  const res2 = calculatePregnancyCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "lmpDate": -50,
  "cycleLength": -50
};
  const res3 = calculatePregnancyCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "lmpDate": null,
  "cycleLength": null
};
  const res4 = calculatePregnancyCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
