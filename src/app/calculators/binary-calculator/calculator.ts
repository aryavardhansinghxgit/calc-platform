import { BinaryCalculatorOutputs } from "./types";

export function calculateBinaryCalculator(inputs: Record<string, any>): BinaryCalculatorOutputs {
  const b1 = parseInt(String(inputs.binary1 || "1010"), 2) || 0;
  const b2 = parseInt(String(inputs.binary2 || "0110"), 2) || 0;
  const op = inputs.operation || "+";
  let dec = 0;
  if (op === "+") dec = b1 + b2;
  else if (op === "-") dec = b1 - b2;
  else if (op === "*") dec = b1 * b2;
  const binStr = (dec >= 0 ? dec.toString(2) : "-" + Math.abs(dec).toString(2));
  const hexStr = (dec >= 0 ? dec.toString(16).toUpperCase() : "-" + Math.abs(dec).toString(16).toUpperCase());
  return { binaryResult: binStr, decimalResult: dec, hexResult: hexStr };
}
