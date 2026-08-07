import { calculateIPSubnetCalculator } from "./calculator";

export function runIPSubnetCalculatorTests() {
  const defaultInputs = {
  "ipAddress": "192.168.1.1",
  "cidr": 24
};
  const res1 = calculateIPSubnetCalculator(defaultInputs);
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for default inputs");

  const zeroInputs = {
  "ipAddress": 0,
  "cidr": 0
};
  const res2 = calculateIPSubnetCalculator(zeroInputs);
  if (!res2) throw new Error("Formula failed for zero inputs");

  const negInputs = {
  "ipAddress": -50,
  "cidr": -50
};
  const res3 = calculateIPSubnetCalculator(negInputs);
  if (!res3) throw new Error("Formula failed for negative inputs");

  const nanInputs = {
  "ipAddress": null,
  "cidr": null
};
  const res4 = calculateIPSubnetCalculator(nanInputs);
  if (!res4) throw new Error("Formula failed for NaN inputs");

  return true;
}
