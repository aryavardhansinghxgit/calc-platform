import { calculateHorsepowerFromInputs } from "./calculator";

export function runHorsepowerCalculatorTests() {
  const defaultInputs = {
    torqueLbFt: 400,
    rpm: 5252,
  };
  const res1 = calculateHorsepowerFromInputs(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
    torqueLbFt: 0,
    rpm: 0,
  };
  const res2 = calculateHorsepowerFromInputs(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  return true;
}
