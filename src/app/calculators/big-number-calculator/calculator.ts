import { BigNumberCalculatorOutputs } from "./types";

export function calculateBigNumberCalculator(inputs: Record<string, any>): BigNumberCalculatorOutputs {
  const s1 = String(inputs.num1 ?? "1234567890123456789").trim();
  const s2 = String(inputs.num2 ?? "9876543210987654321").trim();
  const op = inputs.operation || "+";
  let resStr = "0";
  try {
    const b1 = BigInt(s1);
    const b2 = BigInt(s2);
    if (op === "+") resStr = (b1 + b2).toString();
    else if (op === "-") resStr = (b1 - b2).toString();
    else if (op === "*") resStr = (b1 * b2).toString();
  } catch (err) {
    resStr = "Invalid BigInt input";
  }
  return { result: resStr, digitCount: resStr.replace("-", "").length };
}
