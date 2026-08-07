import { calculateVoltageDropCalculator } from "./calculator";

export function runVoltageDropCalculatorTests() {
  const defaultInputs = {
  "voltage": 120,
  "currentAmps": 15,
  "distanceFt": 100,
  "wireGauge": "12"
};
  const res1 = calculateVoltageDropCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "voltage": 0,
  "currentAmps": 0,
  "distanceFt": 0,
  "wireGauge": 0
};
  const res2 = calculateVoltageDropCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "voltage": -50,
  "currentAmps": -50,
  "distanceFt": -50,
  "wireGauge": -50
};
  const res3 = calculateVoltageDropCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "voltage": null,
  "currentAmps": null,
  "distanceFt": null,
  "wireGauge": null
};
  const res4 = calculateVoltageDropCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
