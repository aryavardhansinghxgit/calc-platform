import { calculateDateCalculator } from "./calculator";

export function runDateCalculatorTests() {
  const defaultInputs = {
  "startDate": "2026-08-07",
  "operation": "add",
  "years": 0,
  "months": 0,
  "days": 30
};
  const res1 = calculateDateCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "startDate": 0,
  "operation": 0,
  "years": 0,
  "months": 0,
  "days": 0
};
  const res2 = calculateDateCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "startDate": -50,
  "operation": -50,
  "years": -50,
  "months": -50,
  "days": -50
};
  const res3 = calculateDateCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "startDate": null,
  "operation": null,
  "years": null,
  "months": null,
  "days": null
};
  const res4 = calculateDateCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
