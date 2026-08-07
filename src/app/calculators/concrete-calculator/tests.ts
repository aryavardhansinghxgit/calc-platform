import { calculateConcreteCalculator } from "./calculator";

export function runConcreteCalculatorTests() {
  const defaultInputs = {
  "lengthFt": 10,
  "widthFt": 10,
  "depthInches": 4
};
  const res1 = calculateConcreteCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "lengthFt": 0,
  "widthFt": 0,
  "depthInches": 0
};
  const res2 = calculateConcreteCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "lengthFt": -50,
  "widthFt": -50,
  "depthInches": -50
};
  const res3 = calculateConcreteCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "lengthFt": null,
  "widthFt": null,
  "depthInches": null
};
  const res4 = calculateConcreteCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
