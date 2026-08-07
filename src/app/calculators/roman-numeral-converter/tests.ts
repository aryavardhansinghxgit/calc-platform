import { calculateRomanNumeralConverter } from "./calculator";

export function runRomanNumeralConverterTests() {
  const defaultInputs = {
  "numberVal": 2026
};
  const res1 = calculateRomanNumeralConverter(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "numberVal": 0
};
  const res2 = calculateRomanNumeralConverter(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "numberVal": -50
};
  const res3 = calculateRomanNumeralConverter(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "numberVal": null
};
  const res4 = calculateRomanNumeralConverter(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
