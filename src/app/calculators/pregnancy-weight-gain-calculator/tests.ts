import { calculatePregnancyWeightGainCalculator } from "./calculator";

export function runPregnancyWeightGainCalculatorTests() {
  const defaultInputs = {
  "preWeightKg": 62,
  "heightCm": 165,
  "week": 20
};
  const res1 = calculatePregnancyWeightGainCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "preWeightKg": 0,
  "heightCm": 0,
  "week": 0
};
  const res2 = calculatePregnancyWeightGainCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "preWeightKg": -50,
  "heightCm": -50,
  "week": -50
};
  const res3 = calculatePregnancyWeightGainCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "preWeightKg": null,
  "heightCm": null,
  "week": null
};
  const res4 = calculatePregnancyWeightGainCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
