import { calculateGolfHandicapCalculator } from "./calculator";

export function runGolfHandicapCalculatorTests() {
  const defaultInputs = {
  "adjustedScore": 85,
  "courseRating": 72.1,
  "slopeRating": 125
};
  const res1 = calculateGolfHandicapCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "adjustedScore": 0,
  "courseRating": 0,
  "slopeRating": 0
};
  const res2 = calculateGolfHandicapCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "adjustedScore": -50,
  "courseRating": -50,
  "slopeRating": -50
};
  const res3 = calculateGolfHandicapCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "adjustedScore": null,
  "courseRating": null,
  "slopeRating": null
};
  const res4 = calculateGolfHandicapCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
