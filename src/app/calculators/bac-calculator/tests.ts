import { calculateBACCalculator } from "./calculator";

export function runBACCalculatorTests() {
  const defaultInputs = {
  "gender": "male",
  "weightKg": 75,
  "drinksCount": 3,
  "hoursSinceFirst": 2
};
  const res1 = calculateBACCalculator(defaultInputs as any);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "gender": 0,
  "weightKg": 0,
  "drinksCount": 0,
  "hoursSinceFirst": 0
};
  const res2 = calculateBACCalculator(zeroInputs as any);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "gender": -50,
  "weightKg": -50,
  "drinksCount": -50,
  "hoursSinceFirst": -50
};
  const res3 = calculateBACCalculator(negInputs as any);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "gender": null,
  "weightKg": null,
  "drinksCount": null,
  "hoursSinceFirst": null
};
  const res4 = calculateBACCalculator(nanInputs as any);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
