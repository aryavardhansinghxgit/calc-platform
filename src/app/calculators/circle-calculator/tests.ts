import { calculateCircleCalculator } from "./calculator";

export function runCircleCalculatorTests() {
  const defaultInputs = {
  "radius": 5
};
  const res1 = calculateCircleCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "radius": 0
};
  const res2 = calculateCircleCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "radius": -50
};
  const res3 = calculateCircleCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "radius": null
};
  const res4 = calculateCircleCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
