import { calculateConceptionCalculator } from "./calculator";

export function runConceptionCalculatorTests() {
  const defaultInputs = {
  "dueDate": "2026-10-08"
};
  const res1 = calculateConceptionCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "dueDate": 0
};
  const res2 = calculateConceptionCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "dueDate": -50
};
  const res3 = calculateConceptionCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "dueDate": null
};
  const res4 = calculateConceptionCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
