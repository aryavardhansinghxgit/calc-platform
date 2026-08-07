import { calculateGFRCalculator } from "./calculator";

export function runGFRCalculatorTests() {
  const defaultInputs = {
  "serumCreatinine": 1,
  "age": 50,
  "gender": "male"
};
  const res1 = calculateGFRCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "serumCreatinine": 0,
  "age": 0,
  "gender": 0
};
  const res2 = calculateGFRCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "serumCreatinine": -50,
  "age": -50,
  "gender": -50
};
  const res3 = calculateGFRCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "serumCreatinine": null,
  "age": null,
  "gender": null
};
  const res4 = calculateGFRCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
