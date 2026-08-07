import { calculateConversionCalculator } from "./calculator";

export function runConversionCalculatorTests() {
  const defaultInputs = {
  "value": 100,
  "unitCategory": "length"
};
  const res1 = calculateConversionCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "value": 0,
  "unitCategory": 0
};
  const res2 = calculateConversionCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "value": -50,
  "unitCategory": -50
};
  const res3 = calculateConversionCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "value": null,
  "unitCategory": null
};
  const res4 = calculateConversionCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
