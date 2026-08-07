import { calculateFatIntakeCalculator } from "./calculator";

export function runFatIntakeCalculatorTests() {
  const defaultInputs = {
  "dailyCalories": 2000,
  "fatPercent": 30
};
  const res1 = calculateFatIntakeCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "dailyCalories": 0,
  "fatPercent": 0
};
  const res2 = calculateFatIntakeCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "dailyCalories": -50,
  "fatPercent": -50
};
  const res3 = calculateFatIntakeCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "dailyCalories": null,
  "fatPercent": null
};
  const res4 = calculateFatIntakeCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
