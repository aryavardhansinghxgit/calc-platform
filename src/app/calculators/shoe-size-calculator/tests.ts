import { calculateShoeSizeFromInputs } from "./calculator";

export function runShoeSizeConversionCalculatorTests() {
  const defaultInputs = {
    footLength: 10,
    gender: "men",
  };
  const res1 = calculateShoeSizeFromInputs(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
    footLength: 0,
    gender: 0,
  };
  const res2 = calculateShoeSizeFromInputs(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
    footLength: -50,
    gender: -50,
  };
  const res3 = calculateShoeSizeFromInputs(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
    footLength: null,
    gender: null,
  };
  const res4 = calculateShoeSizeFromInputs(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
