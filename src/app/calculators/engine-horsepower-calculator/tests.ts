import { calculateEngineHorsepowerFromInputs } from "./calculator";

export function runEngineHorsepowerCalculatorTests() {
  const defaultInputs = {
    weightLbs: 3400,
    trapSpeedMph: 105
  };
  const res1 = calculateEngineHorsepowerFromInputs(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
    weightLbs: 0,
    trapSpeedMph: 0
  };
  const res2 = calculateEngineHorsepowerFromInputs(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  return true;
}
