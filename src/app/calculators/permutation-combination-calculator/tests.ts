import { calculatePermutationCombinationCalculator } from "./calculator";

export function runPermutationCombinationCalculatorTests() {
  const defaultInputs = {
  "nVal": 8,
  "rVal": 3
};
  const res1 = calculatePermutationCombinationCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "nVal": 0,
  "rVal": 0
};
  const res2 = calculatePermutationCombinationCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "nVal": -50,
  "rVal": -50
};
  const res3 = calculatePermutationCombinationCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "nVal": null,
  "rVal": null
};
  const res4 = calculatePermutationCombinationCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
