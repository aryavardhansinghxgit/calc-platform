import { calculateDewPointCalculator } from "./calculator";

export function runDewPointCalculatorTests() {
  const defaultInputs = {
  "tempC": 25,
  "humidityPct": 60
};
  const res1 = calculateDewPointCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "tempC": 0,
  "humidityPct": 0
};
  const res2 = calculateDewPointCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "tempC": -50,
  "humidityPct": -50
};
  const res3 = calculateDewPointCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "tempC": null,
  "humidityPct": null
};
  const res4 = calculateDewPointCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
