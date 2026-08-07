import { calculateHorsepowerCalculator } from "./calculator";

export function runHorsepowerCalculatorTests() {
  const defaultInputs = {
  "torqueLbFt": 300,
  "rpm": 5252
};
  const res1 = calculateHorsepowerCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "torqueLbFt": 0,
  "rpm": 0
};
  const res2 = calculateHorsepowerCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "torqueLbFt": -50,
  "rpm": -50
};
  const res3 = calculateHorsepowerCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "torqueLbFt": null,
  "rpm": null
};
  const res4 = calculateHorsepowerCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
