import { calculateGDPCalculator } from "./calculator";

export function runGDPCalculatorTests() {
  const defaultInputs = {
  "consumption": 14000,
  "investment": 4000,
  "government": 3500,
  "exports": 2500,
  "imports": 3000
};
  const res1 = calculateGDPCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "consumption": 0,
  "investment": 0,
  "government": 0,
  "exports": 0,
  "imports": 0
};
  const res2 = calculateGDPCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "consumption": -50,
  "investment": -50,
  "government": -50,
  "exports": -50,
  "imports": -50
};
  const res3 = calculateGDPCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "consumption": null,
  "investment": null,
  "government": null,
  "exports": null,
  "imports": null
};
  const res4 = calculateGDPCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
