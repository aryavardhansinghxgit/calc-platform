import { calculateHeatIndexFromInputs } from "./calculator";

export function runHeatIndexCalculatorTests() {
  const defaultInputs = {
    temperature: 85,
    relativeHumidity: 70,
  };
  const res1 = calculateHeatIndexFromInputs(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
    temperature: 0,
    relativeHumidity: 0,
  };
  const res2 = calculateHeatIndexFromInputs(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
    temperature: -50,
    relativeHumidity: -50,
  };
  const res3 = calculateHeatIndexFromInputs(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
    temperature: null,
    relativeHumidity: null,
  };
  const res4 = calculateHeatIndexFromInputs(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
