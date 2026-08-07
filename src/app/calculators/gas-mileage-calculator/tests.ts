import { calculateGasMileageCalculator } from "./calculator";

export function runGasMileageCalculatorTests() {
  const defaultInputs = {
  "startOdometer": 45000,
  "endOdometer": 45350,
  "gallonsFilled": 12.5
};
  const res1 = calculateGasMileageCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "startOdometer": 0,
  "endOdometer": 0,
  "gallonsFilled": 0
};
  const res2 = calculateGasMileageCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "startOdometer": -50,
  "endOdometer": -50,
  "gallonsFilled": -50
};
  const res3 = calculateGasMileageCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "startOdometer": null,
  "endOdometer": null,
  "gallonsFilled": null
};
  const res4 = calculateGasMileageCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
