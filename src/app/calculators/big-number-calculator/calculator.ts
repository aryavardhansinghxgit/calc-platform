import { BigNumberCalculatorOutputs } from "./types";
import { addBigInt, subtractBigInt, multiplyBigInt, analyzeDigits } from "./big-number-logic";

export function calculateBigNumberCalculator(inputs: Record<string, any>): BigNumberCalculatorOutputs {
  const s1 = String(inputs.num1 ?? "1000000000000000000000000000000").trim();
  const s2 = String(inputs.num2 ?? "98765432109876543210987654321").trim();
  const op = inputs.operation || "*";
  let resStr = "0";

  try {
    if (op === "+") resStr = addBigInt(s1, s2);
    else if (op === "-") resStr = subtractBigInt(s1, s2);
    else if (op === "*") resStr = multiplyBigInt(s1, s2);
    else resStr = multiplyBigInt(s1, s2);
  } catch (err) {
    resStr = "Invalid BigInt input";
  }

  const analytics = analyzeDigits(resStr);

  return { result: resStr, digitCount: analytics.digitCount };
}
