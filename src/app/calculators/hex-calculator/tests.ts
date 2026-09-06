import { calculateHexCalculator } from "./calculator";

export function runHexCalculatorTests() {
  // Canonical inputs
  const res1 = calculateHexCalculator({
    inputA: "8AB",
    inputB: "B78",
    operation: "+"
  });
  if (!res1 || res1.hexResult !== "00001423" || res1.decimalResult !== "5155") {
    throw new Error(`Formula failed for canonical inputs 8AB + B78: got ${JSON.stringify(res1)}`);
  }

  // Legacy inputs
  const resLegacy = calculateHexCalculator({
    hex1: "1A",
    hex2: "0F",
    operation: "+"
  });
  if (!resLegacy || typeof resLegacy !== "object") {
    throw new Error("Formula failed for legacy inputs");
  }

  // 8-bit unsigned carry test
  const resCarry = calculateHexCalculator({
    inputA: "FF",
    inputB: "01",
    operation: "+",
    bitWidth: 8
  });
  if (resCarry.hexResult !== "00" || resCarry.carryOut !== 1) {
    throw new Error(`Carry test failed: got ${JSON.stringify(resCarry)}`);
  }

  // Bitwise AND test
  const resAnd = calculateHexCalculator({
    inputA: "CC",
    inputB: "AA",
    operation: "AND",
    bitWidth: 8
  });
  if (resAnd.hexResult !== "88") {
    throw new Error(`Bitwise AND failed: got ${JSON.stringify(resAnd)}`);
  }

  // Logical Right Shift (>>>) test
  const resShift = calculateHexCalculator({
    inputA: "80",
    inputB: "1",
    operation: ">>>",
    bitWidth: 8
  });
  if (resShift.hexResult !== "40") {
    throw new Error(`Logical shift failed: got ${JSON.stringify(resShift)}`);
  }

  return true;
}
