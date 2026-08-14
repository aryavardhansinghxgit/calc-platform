import { calculateMileageFromInputs } from "./calculator";

export function runMileageCalculatorTests() {
  const defaultInputs = {
    distanceMiles: 120,
    irsRate: 0.67
  };
  const res1 = calculateMileageFromInputs(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
    distanceMiles: 0,
    irsRate: 0
  };
  const res2 = calculateMileageFromInputs(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  return true;
}
