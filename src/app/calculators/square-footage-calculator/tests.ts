import { calculateSquareFootageCalculator } from "./calculator";

export function runSquareFootageCalculatorTests() {
  const defaultInputs = {
  "lengthFt": 12,
  "widthFt": 15,
  "pricePerSqFt": 5
};
  const res1 = calculateSquareFootageCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "lengthFt": 0,
  "widthFt": 0,
  "pricePerSqFt": 0
};
  const res2 = calculateSquareFootageCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "lengthFt": -50,
  "widthFt": -50,
  "pricePerSqFt": -50
};
  const res3 = calculateSquareFootageCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "lengthFt": null,
  "widthFt": null,
  "pricePerSqFt": null
};
  const res4 = calculateSquareFootageCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
