import { calculateGasMileageFromInputs } from "./calculator";

export function runGasMileageCalculatorTests() {
  const defaultInputs = {
    startOdometer: 12000,
    endOdometer: 12360,
    fuelAdded: 12,
    fuelPrice: 3.5,
  };
  const res1 = calculateGasMileageFromInputs(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
    startOdometer: 0,
    endOdometer: 0,
    fuelAdded: 0,
    fuelPrice: 0,
  };
  const res2 = calculateGasMileageFromInputs(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
    startOdometer: -50,
    endOdometer: -50,
    fuelAdded: -50,
    fuelPrice: -50,
  };
  const res3 = calculateGasMileageFromInputs(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
    startOdometer: null,
    endOdometer: null,
    fuelAdded: null,
    fuelPrice: null,
  };
  const res4 = calculateGasMileageFromInputs(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
