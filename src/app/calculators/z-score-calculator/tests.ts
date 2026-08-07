import { calculateZScoreCalculator } from "./calculator";

export function runZScoreCalculatorTests() {
  const defaultInputs = {
  "rawScore": 85,
  "mean": 70,
  "sd": 10
};
  const res1 = calculateZScoreCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "rawScore": 0,
  "mean": 0,
  "sd": 0
};
  const res2 = calculateZScoreCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "rawScore": -50,
  "mean": -50,
  "sd": -50
};
  const res3 = calculateZScoreCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "rawScore": null,
  "mean": null,
  "sd": null
};
  const res4 = calculateZScoreCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
