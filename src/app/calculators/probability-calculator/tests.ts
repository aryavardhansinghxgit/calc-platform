import { calculateProbabilityCalculator } from "./calculator";

export function runProbabilityCalculatorTests() {
  const defaultInputs = {
  "probA": 0.5,
  "probB": 0.4
};
  const res1 = calculateProbabilityCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "probA": 0,
  "probB": 0
};
  const res2 = calculateProbabilityCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "probA": -50,
  "probB": -50
};
  const res3 = calculateProbabilityCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "probA": null,
  "probB": null
};
  const res4 = calculateProbabilityCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
