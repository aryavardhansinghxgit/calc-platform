import { HexCalculatorInputs, HexCalculatorOutputs } from "./types";
import { executeHexArithmetic, HexOperator, BitWidth } from "./hex-logic";

export function calculateHexCalculator(inputs: Record<string, any>): HexCalculatorOutputs {
  const rawA = String(inputs.inputA ?? inputs.hex1 ?? "8AB").trim();
  const rawB = String(inputs.inputB ?? inputs.hex2 ?? "B78").trim();
  const op = (inputs.operation || "+").toUpperCase() as HexOperator;
  const bitWidth = (Number(inputs.bitWidth) || 32) as BitWidth;
  const isSigned = Boolean(inputs.isSigned);

  const result = executeHexArithmetic(rawA, rawB, op, bitWidth, isSigned);

  return {
    hexResult: result.hexResult,
    decimalResult: result.decResult,
    binaryResult: result.binResult,
    octalResult: result.octResult,
    carryOut: result.carryOut,
    overflow: result.unsignedOverflow || result.signedOverflow,
    mathematicalResult: result.mathematicalResult.toString()
  };
}

export default calculateHexCalculator;
