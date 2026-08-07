import { calculateFuelCostCalculator } from "./calculator";

export function runFuelCostCalculatorTests() {
  const defaultInputs = {
  "distanceMiles": 300,
  "mpg": 28,
  "gasPrice": 3.5
};
  const res1 = calculateFuelCostCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "distanceMiles": 0,
  "mpg": 0,
  "gasPrice": 0
};
  const res2 = calculateFuelCostCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "distanceMiles": -50,
  "mpg": -50,
  "gasPrice": -50
};
  const res3 = calculateFuelCostCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "distanceMiles": null,
  "mpg": null,
  "gasPrice": null
};
  const res4 = calculateFuelCostCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
