import { calculateBTUCalculator } from "./calculator";

export function runBTUCalculatorTests() {
  const defaultInputs = {
  "lengthFt": 15,
  "widthFt": 20,
  "insulation": "average"
};
  const res1 = calculateBTUCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "lengthFt": 0,
  "widthFt": 0,
  "insulation": 0
};
  const res2 = calculateBTUCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "lengthFt": -50,
  "widthFt": -50,
  "insulation": -50
};
  const res3 = calculateBTUCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "lengthFt": null,
  "widthFt": null,
  "insulation": null
};
  const res4 = calculateBTUCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
