import { calculateHeightCalculator } from "./calculator";

export function runHeightCalculatorTests() {
  const defaultInputs = {
  "fatherHeightCm": 178,
  "motherHeightCm": 165,
  "childGender": "male"
};
  const res1 = calculateHeightCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "fatherHeightCm": 0,
  "motherHeightCm": 0,
  "childGender": 0
};
  const res2 = calculateHeightCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "fatherHeightCm": -50,
  "motherHeightCm": -50,
  "childGender": -50
};
  const res3 = calculateHeightCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "fatherHeightCm": null,
  "motherHeightCm": null,
  "childGender": null
};
  const res4 = calculateHeightCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
