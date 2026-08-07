import { calculateLoveCalculator } from "./calculator";

export function runLoveCalculatorTests() {
  const defaultInputs = {
  "name1": "Romeo",
  "name2": "Juliet"
};
  const res1 = calculateLoveCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "name1": 0,
  "name2": 0
};
  const res2 = calculateLoveCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "name1": -50,
  "name2": -50
};
  const res3 = calculateLoveCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "name1": null,
  "name2": null
};
  const res4 = calculateLoveCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
