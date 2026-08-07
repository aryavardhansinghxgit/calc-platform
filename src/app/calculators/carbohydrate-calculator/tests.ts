import { calculateCarbohydrateCalculator } from "./calculator";

export function runCarbohydrateCalculatorTests() {
  const defaultInputs = {
  "dailyCalories": 2000,
  "activityLevel": "moderate"
};
  const res1 = calculateCarbohydrateCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "dailyCalories": 0,
  "activityLevel": 0
};
  const res2 = calculateCarbohydrateCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "dailyCalories": -50,
  "activityLevel": -50
};
  const res3 = calculateCarbohydrateCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "dailyCalories": null,
  "activityLevel": null
};
  const res4 = calculateCarbohydrateCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
