import { calculateQuadraticFormulaCalculator } from "./calculator";

export function runQuadraticFormulaCalculatorTests() {
  const defaultInputs = {
  "coeffA": 1,
  "coeffB": -5,
  "coeffC": 6
};
  const res1 = calculateQuadraticFormulaCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "coeffA": 0,
  "coeffB": 0,
  "coeffC": 0
};
  const res2 = calculateQuadraticFormulaCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "coeffA": -50,
  "coeffB": -50,
  "coeffC": -50
};
  const res3 = calculateQuadraticFormulaCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "coeffA": null,
  "coeffB": null,
  "coeffC": null
};
  const res4 = calculateQuadraticFormulaCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
