import { calculateHeatIndexCalculator } from "./calculator";

export function runHeatIndexCalculatorTests() {
  const defaultInputs = {
  "tempF": 90,
  "humidityPct": 65
};
  const res1 = calculateHeatIndexCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "tempF": 0,
  "humidityPct": 0
};
  const res2 = calculateHeatIndexCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "tempF": -50,
  "humidityPct": -50
};
  const res3 = calculateHeatIndexCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "tempF": null,
  "humidityPct": null
};
  const res4 = calculateHeatIndexCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
