import { calculateTimeCalculator } from "./calculator";

export function runTimeCalculatorTests() {
  const defaultInputs = {
  "h1": 4,
  "m1": 35,
  "operation": "+",
  "h2": 2,
  "m2": 45
};
  const res1 = calculateTimeCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "h1": 0,
  "m1": 0,
  "operation": 0,
  "h2": 0,
  "m2": 0
};
  const res2 = calculateTimeCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "h1": -50,
  "m1": -50,
  "operation": -50,
  "h2": -50,
  "m2": -50
};
  const res3 = calculateTimeCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "h1": null,
  "m1": null,
  "operation": null,
  "h2": null,
  "m2": null
};
  const res4 = calculateTimeCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
