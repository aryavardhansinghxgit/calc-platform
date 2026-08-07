import { calculateResistorCalculator } from "./calculator";

export function runResistorCalculatorTests() {
  const defaultInputs = {
  "band1": "1",
  "band2": "0",
  "multiplier": "100"
};
  const res1 = calculateResistorCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "band1": 0,
  "band2": 0,
  "multiplier": 0
};
  const res2 = calculateResistorCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "band1": -50,
  "band2": -50,
  "multiplier": -50
};
  const res3 = calculateResistorCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "band1": null,
  "band2": null,
  "multiplier": null
};
  const res4 = calculateResistorCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
