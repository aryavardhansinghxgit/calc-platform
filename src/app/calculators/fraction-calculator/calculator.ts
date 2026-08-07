import { FractionCalculatorOutputs } from "./types";

export function calculateFractionCalculator(inputs: Record<string, any>): FractionCalculatorOutputs {
  const n1 = Number(inputs.num1) || 0;
  const d1 = Math.max(1, Number(inputs.den1) || 1);
  const n2 = Number(inputs.num2) || 0;
  const d2 = Math.max(1, Number(inputs.den2) || 1);
  const op = inputs.operation || "+";
  let numRes = 0, denRes = 1;
  if (op === "+") { numRes = n1 * d2 + n2 * d1; denRes = d1 * d2; }
  else if (op === "-") { numRes = n1 * d2 - n2 * d1; denRes = d1 * d2; }
  else if (op === "*") { numRes = n1 * n2; denRes = d1 * d2; }
  else if (op === "/") { numRes = n1 * d2; denRes = d1 * n2; }
  if (denRes === 0) return { resultFraction: "Undefined (div by 0)", decimalValue: 0, mixedNumber: "N/A" };
  const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
  const g = gcd(numRes, denRes);
  const finalNum = numRes / g;
  const finalDen = denRes / g;
  const dec = parseFloat((finalNum / finalDen).toFixed(4));
  let mixed = `${finalNum}/${finalDen}`;
  if (Math.abs(finalNum) >= finalDen && finalDen !== 1) {
    const whole = Math.floor(Math.abs(finalNum) / finalDen) * Math.sign(finalNum);
    const rem = Math.abs(finalNum) % finalDen;
    mixed = `${whole} ${rem}/${finalDen}`;
  }
  return { resultFraction: `${finalNum}/${finalDen}`, decimalValue: dec, mixedNumber: mixed };
}
