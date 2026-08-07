import { calculateElectricityCalculator } from "./calculator";

export function runElectricityCalculatorTests() {
  const defaultInputs = {
  "wattage": 1500,
  "hoursPerDay": 4,
  "costPerKwh": 0.15
};
  const res1 = calculateElectricityCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "wattage": 0,
  "hoursPerDay": 0,
  "costPerKwh": 0
};
  const res2 = calculateElectricityCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "wattage": -50,
  "hoursPerDay": -50,
  "costPerKwh": -50
};
  const res3 = calculateElectricityCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "wattage": null,
  "hoursPerDay": null,
  "costPerKwh": null
};
  const res4 = calculateElectricityCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
