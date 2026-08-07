import { calculateHexCalculator } from "./calculator";

export function runHexCalculatorTests() {
  const defaultInputs = {
  "hex1": "1A",
  "operation": "+",
  "hex2": "0F"
};
  const res1 = calculateHexCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "hex1": 0,
  "operation": 0,
  "hex2": 0
};
  const res2 = calculateHexCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "hex1": -50,
  "operation": -50,
  "hex2": -50
};
  const res3 = calculateHexCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "hex1": null,
  "operation": null,
  "hex2": null
};
  const res4 = calculateHexCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
