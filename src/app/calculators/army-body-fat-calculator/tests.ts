import { calculateArmyBodyFatCalculator } from "./calculator";

export function runArmyBodyFatCalculatorTests() {
  const defaultInputs = {
  "gender": "male",
  "age": "21",
  "heightCm": 175,
  "neckCm": 38,
  "waistCm": 82,
  "hipCm": 95
};
  const res1 = calculateArmyBodyFatCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "gender": 0,
  "age": 0,
  "heightCm": 0,
  "neckCm": 0,
  "waistCm": 0,
  "hipCm": 0
};
  const res2 = calculateArmyBodyFatCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "gender": -50,
  "age": -50,
  "heightCm": -50,
  "neckCm": -50,
  "waistCm": -50,
  "hipCm": -50
};
  const res3 = calculateArmyBodyFatCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "gender": null,
  "age": null,
  "heightCm": null,
  "neckCm": null,
  "waistCm": null,
  "hipCm": null
};
  const res4 = calculateArmyBodyFatCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
