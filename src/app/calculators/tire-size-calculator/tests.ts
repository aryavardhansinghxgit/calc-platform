import { calculateTireSizeFromInputs } from "./calculator";

export function runTireSizeCalculatorTests() {
  const defaultInputs = {
    widthMm: 225,
    aspectRatio: 45,
    rimDiameterInches: 17
  };
  const res1 = calculateTireSizeFromInputs(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
    widthMm: 0,
    aspectRatio: 0,
    rimDiameterInches: 0
  };
  const res2 = calculateTireSizeFromInputs(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  return true;
}
