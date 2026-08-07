import { calculateGradeCalculator } from "./calculator";

export function runGradeCalculatorTests() {
  const defaultInputs = {
  "currentGrade": 85,
  "targetGrade": 90,
  "finalWeight": 20
};
  const res1 = calculateGradeCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "currentGrade": 0,
  "targetGrade": 0,
  "finalWeight": 0
};
  const res2 = calculateGradeCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "currentGrade": -50,
  "targetGrade": -50,
  "finalWeight": -50
};
  const res3 = calculateGradeCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "currentGrade": null,
  "targetGrade": null,
  "finalWeight": null
};
  const res4 = calculateGradeCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
