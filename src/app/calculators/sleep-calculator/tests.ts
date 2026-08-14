import { calculateSleepFromInputs } from "./calculator";

export function runSleepCalculatorTests() {
  const defaultInputs = {
    targetTime: "07:00 AM",
    latency: 15,
  };
  const res1 = calculateSleepFromInputs(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
    targetTime: "12:00 AM",
    latency: 0,
  };
  const res2 = calculateSleepFromInputs(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
    targetTime: "08:00 PM",
    latency: -50,
  };
  const res3 = calculateSleepFromInputs(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
    targetTime: null,
    latency: null,
  };
  const res4 = calculateSleepFromInputs(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
