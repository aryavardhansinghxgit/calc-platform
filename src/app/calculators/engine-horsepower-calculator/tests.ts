import { calculateEngineHorsepowerCalculator } from "./calculator";

export function runEngineHorsepowerCalculatorTests() {
  const defaultInputs = {
  "weightLbs": 3400,
  "trapSpeedMph": 105
};
  const res1 = calculateEngineHorsepowerCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "weightLbs": 0,
  "trapSpeedMph": 0
};
  const res2 = calculateEngineHorsepowerCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "weightLbs": -50,
  "trapSpeedMph": -50
};
  const res3 = calculateEngineHorsepowerCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "weightLbs": null,
  "trapSpeedMph": null
};
  const res4 = calculateEngineHorsepowerCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
