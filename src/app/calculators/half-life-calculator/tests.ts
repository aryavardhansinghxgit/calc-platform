import { calculateHalfLifeCalculator } from "./calculator";

export function runHalfLifeCalculatorTests() {
  const defaultInputs = {
  "initialAmount": 100,
  "halfLife": 5,
  "elapsedTime": 15
};
  const res1 = calculateHalfLifeCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "initialAmount": 0,
  "halfLife": 0,
  "elapsedTime": 0
};
  const res2 = calculateHalfLifeCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "initialAmount": -50,
  "halfLife": -50,
  "elapsedTime": -50
};
  const res3 = calculateHalfLifeCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "initialAmount": null,
  "halfLife": null,
  "elapsedTime": null
};
  const res4 = calculateHalfLifeCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
