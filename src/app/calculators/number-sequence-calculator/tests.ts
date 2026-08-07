import { calculateNumberSequenceCalculator } from "./calculator";

export function runNumberSequenceCalculatorTests() {
  const defaultInputs = {
  "seqType": "arithmetic",
  "firstTerm": 2,
  "diffRatio": 3,
  "termCount": 10
};
  const res1 = calculateNumberSequenceCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "seqType": 0,
  "firstTerm": 0,
  "diffRatio": 0,
  "termCount": 0
};
  const res2 = calculateNumberSequenceCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "seqType": -50,
  "firstTerm": -50,
  "diffRatio": -50,
  "termCount": -50
};
  const res3 = calculateNumberSequenceCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "seqType": null,
  "firstTerm": null,
  "diffRatio": null,
  "termCount": null
};
  const res4 = calculateNumberSequenceCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
