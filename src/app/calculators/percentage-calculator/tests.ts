import { calculatePercentageCalculator } from "./calculator";

export function runPercentageCalculatorTests() {
  const defaultInputs = {
  "calcType": "what_is_x_pct_of_y",
  "valueX": 20,
  "valueY": 150
};
  const res1 = calculatePercentageCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "calcType": 0,
  "valueX": 0,
  "valueY": 0
};
  const res2 = calculatePercentageCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "calcType": -50,
  "valueX": -50,
  "valueY": -50
};
  const res3 = calculatePercentageCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "calcType": null,
  "valueX": null,
  "valueY": null
};
  const res4 = calculatePercentageCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
