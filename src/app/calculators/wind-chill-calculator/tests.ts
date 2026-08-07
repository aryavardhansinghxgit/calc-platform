import { calculateWindChillCalculator } from "./calculator";

export function runWindChillCalculatorTests() {
  const defaultInputs = {
  "tempF": 30,
  "windMph": 15
};
  const res1 = calculateWindChillCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "tempF": 0,
  "windMph": 0
};
  const res2 = calculateWindChillCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "tempF": -50,
  "windMph": -50
};
  const res3 = calculateWindChillCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "tempF": null,
  "windMph": null
};
  const res4 = calculateWindChillCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
