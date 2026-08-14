import { calculateDewPointFromInputs } from "./calculator";

export function runDewPointCalculatorTests() {
  const defaultInputs = {
    airTemp: 70,
    relativeHumidity: 65,
    unit: "F",
  };
  const res1 = calculateDewPointFromInputs(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
    airTemp: 0,
    relativeHumidity: 0,
    unit: "C",
  };
  const res2 = calculateDewPointFromInputs(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
    airTemp: -50,
    relativeHumidity: -50,
    unit: "F",
  };
  const res3 = calculateDewPointFromInputs(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
    airTemp: null,
    relativeHumidity: null,
    unit: null,
  };
  const res4 = calculateDewPointFromInputs(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
