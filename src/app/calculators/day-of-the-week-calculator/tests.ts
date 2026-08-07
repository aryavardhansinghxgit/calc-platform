import { calculateDayoftheWeekCalculator } from "./calculator";

export function runDayoftheWeekCalculatorTests() {
  const defaultInputs = {
  "targetDate": "1969-07-20"
};
  const res1 = calculateDayoftheWeekCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "targetDate": 0
};
  const res2 = calculateDayoftheWeekCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "targetDate": -50
};
  const res3 = calculateDayoftheWeekCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "targetDate": null
};
  const res4 = calculateDayoftheWeekCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
