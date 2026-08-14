import { calculateBraSizeFromInputs } from "./calculator";

export function runBraSizeCalculatorTests() {
  const defaultInputs = {
    underbust: 30,
    bust: 34,
  };
  const res1 = calculateBraSizeFromInputs(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
    underbust: 0,
    bust: 0,
  };
  const res2 = calculateBraSizeFromInputs(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
    underbust: -50,
    bust: -50,
  };
  const res3 = calculateBraSizeFromInputs(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
    underbust: null,
    bust: null,
  };
  const res4 = calculateBraSizeFromInputs(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
