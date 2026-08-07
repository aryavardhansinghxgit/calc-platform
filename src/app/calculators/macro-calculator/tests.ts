import { calculateMacroCalculator } from "./calculator";

export function runMacroCalculatorTests() {
  const defaultInputs = {
  "dailyCalories": 2000,
  "dietRatio": "balanced"
};
  const res1 = calculateMacroCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "dailyCalories": 0,
  "dietRatio": 0
};
  const res2 = calculateMacroCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "dailyCalories": -50,
  "dietRatio": -50
};
  const res3 = calculateMacroCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "dailyCalories": null,
  "dietRatio": null
};
  const res4 = calculateMacroCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
