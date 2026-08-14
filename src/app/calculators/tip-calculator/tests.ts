import { calculateTipFromInputs } from "./calculator";

export function runTipCalculatorTests() {
  const defaultInputs = {
    billAmount: 85,
    tipPct: 18,
    peopleCount: 3,
  };
  const res1 = calculateTipFromInputs(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
    billAmount: 0,
    tipPct: 0,
    peopleCount: 0,
  };
  const res2 = calculateTipFromInputs(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
    billAmount: -50,
    tipPct: -50,
    peopleCount: -50,
  };
  const res3 = calculateTipFromInputs(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
    billAmount: null,
    tipPct: null,
    peopleCount: null,
  };
  const res4 = calculateTipFromInputs(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
