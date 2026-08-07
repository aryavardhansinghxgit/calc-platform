import { calculateTimeCardCalculator } from "./calculator";

export function runTimeCardCalculatorTests() {
  const defaultInputs = {
  "monHours": 8,
  "tueHours": 8,
  "wedHours": 8,
  "thuHours": 8,
  "friHours": 8,
  "hourlyRate": 25
};
  const res1 = calculateTimeCardCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "monHours": 0,
  "tueHours": 0,
  "wedHours": 0,
  "thuHours": 0,
  "friHours": 0,
  "hourlyRate": 0
};
  const res2 = calculateTimeCardCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "monHours": -50,
  "tueHours": -50,
  "wedHours": -50,
  "thuHours": -50,
  "friHours": -50,
  "hourlyRate": -50
};
  const res3 = calculateTimeCardCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "monHours": null,
  "tueHours": null,
  "wedHours": null,
  "thuHours": null,
  "friHours": null,
  "hourlyRate": null
};
  const res4 = calculateTimeCardCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
