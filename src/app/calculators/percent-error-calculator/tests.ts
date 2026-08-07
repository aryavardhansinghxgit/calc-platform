import { calculatePercentErrorCalculator } from "./calculator";

export function runPercentErrorCalculatorTests() {
  const defaultInputs = {
  "expVal": 9.5,
  "theoVal": 9.8
};
  const res1 = calculatePercentErrorCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "expVal": 0,
  "theoVal": 0
};
  const res2 = calculatePercentErrorCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "expVal": -50,
  "theoVal": -50
};
  const res3 = calculatePercentErrorCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "expVal": null,
  "theoVal": null
};
  const res4 = calculatePercentErrorCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
