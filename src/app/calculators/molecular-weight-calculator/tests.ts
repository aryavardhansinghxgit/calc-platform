import { calculateMolecularWeightCalculator } from "./calculator";

export function runMolecularWeightCalculatorTests() {
  const defaultInputs = {
  "presetCompound": "H2O"
};
  const res1 = calculateMolecularWeightCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "presetCompound": 0
};
  const res2 = calculateMolecularWeightCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "presetCompound": -50
};
  const res3 = calculateMolecularWeightCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "presetCompound": null
};
  const res4 = calculateMolecularWeightCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
