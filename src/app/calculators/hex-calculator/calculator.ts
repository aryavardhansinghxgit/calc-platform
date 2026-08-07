import { HexCalculatorOutputs } from "./types";

export function calculateHexCalculator(inputs: Record<string, any>): HexCalculatorOutputs {
  const h1 = parseInt(String(inputs.hex1 || "1A"), 16) || 0;
  const h2 = parseInt(String(inputs.hex2 || "0F"), 16) || 0;
  const op = inputs.operation || "+";
  let dec = 0;
  if (op === "+") dec = h1 + h2;
  else if (op === "-") dec = h1 - h2;
  else if (op === "*") dec = h1 * h2;
  const hexStr = (dec >= 0 ? dec.toString(16).toUpperCase() : "-" + Math.abs(dec).toString(16).toUpperCase());
  const binStr = (dec >= 0 ? dec.toString(2) : "-" + Math.abs(dec).toString(2));
  return { hexResult: hexStr, decimalResult: dec, binaryResult: binStr };
}
