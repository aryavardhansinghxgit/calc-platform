import { calculateFuelCostFromInputs } from "./calculator";

export function runFuelCostCalculatorTests() {
  const defaultInputs = {
    distance: 300,
    efficiency: 25,
    fuelPrice: 3.5,
  };
  const res1 = calculateFuelCostFromInputs(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
    distance: 0,
    efficiency: 0,
    fuelPrice: 0,
  };
  const res2 = calculateFuelCostFromInputs(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
    distance: -50,
    efficiency: -50,
    fuelPrice: -50,
  };
  const res3 = calculateFuelCostFromInputs(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
    distance: null,
    efficiency: null,
    fuelPrice: null,
  };
  const res4 = calculateFuelCostFromInputs(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
