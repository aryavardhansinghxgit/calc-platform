import { calculateGolfHandicapFromInputs } from "./calculator";

export function runGolfHandicapCalculatorTests() {
  const defaultInputs = {
    score: 85,
    courseRating: 72.1,
    slopeRating: 125,
  };
  const res1 = calculateGolfHandicapFromInputs(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
    score: 0,
    courseRating: 0,
    slopeRating: 0,
  };
  const res2 = calculateGolfHandicapFromInputs(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
    score: -50,
    courseRating: -50,
    slopeRating: -50,
  };
  const res3 = calculateGolfHandicapFromInputs(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
    score: null,
    courseRating: null,
    slopeRating: null,
  };
  const res4 = calculateGolfHandicapFromInputs(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
