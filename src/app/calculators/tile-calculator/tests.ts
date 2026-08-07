import { calculateTileCalculator } from "./calculator";

export function runTileCalculatorTests() {
  const defaultInputs = {
  "roomSqFt": 200,
  "tileSizeInches": "144",
  "wastePct": 10
};
  const res1 = calculateTileCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "roomSqFt": 0,
  "tileSizeInches": 0,
  "wastePct": 0
};
  const res2 = calculateTileCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "roomSqFt": -50,
  "tileSizeInches": -50,
  "wastePct": -50
};
  const res3 = calculateTileCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "roomSqFt": null,
  "tileSizeInches": null,
  "wastePct": null
};
  const res4 = calculateTileCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
