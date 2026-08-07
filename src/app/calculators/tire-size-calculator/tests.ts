import { calculateTireSizeCalculator } from "./calculator";

export function runTireSizeCalculatorTests() {
  const defaultInputs = {
  "widthMm": 225,
  "aspectRatio": 45,
  "rimDiameterInches": 17
};
  const res1 = calculateTireSizeCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "widthMm": 0,
  "aspectRatio": 0,
  "rimDiameterInches": 0
};
  const res2 = calculateTireSizeCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "widthMm": -50,
  "aspectRatio": -50,
  "rimDiameterInches": -50
};
  const res3 = calculateTireSizeCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "widthMm": null,
  "aspectRatio": null,
  "rimDiameterInches": null
};
  const res4 = calculateTireSizeCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
