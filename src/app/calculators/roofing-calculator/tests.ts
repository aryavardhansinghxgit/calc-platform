import { calculateRoofingCalculator } from "./calculator";

export function runRoofingCalculatorTests() {
  const defaultInputs = {
  "houseLengthFt": 40,
  "houseWidthFt": 30,
  "pitch": "1.118"
};
  const res1 = calculateRoofingCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "houseLengthFt": 0,
  "houseWidthFt": 0,
  "pitch": 0
};
  const res2 = calculateRoofingCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "houseLengthFt": -50,
  "houseWidthFt": -50,
  "pitch": -50
};
  const res3 = calculateRoofingCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "houseLengthFt": null,
  "houseWidthFt": null,
  "pitch": null
};
  const res4 = calculateRoofingCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
