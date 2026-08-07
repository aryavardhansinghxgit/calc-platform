import { calculateShoeSizeConversionCalculator } from "./calculator";

export function runShoeSizeConversionCalculatorTests() {
  const defaultInputs = {
  "footCm": 26,
  "gender": "men"
};
  const res1 = calculateShoeSizeConversionCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "footCm": 0,
  "gender": 0
};
  const res2 = calculateShoeSizeConversionCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "footCm": -50,
  "gender": -50
};
  const res3 = calculateShoeSizeConversionCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "footCm": null,
  "gender": null
};
  const res4 = calculateShoeSizeConversionCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
