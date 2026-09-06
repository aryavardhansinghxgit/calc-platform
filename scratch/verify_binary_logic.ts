import {
  executeBinaryOperation,
  executeBaseConversion,
  formatMultiBase,
  formatBinaryLatex,
} from "../src/app/calculators/binary-calculator/binary-logic";

console.log("=== VERIFYING BINARY LOGIC MODULE ===");

let passed = 0;
let failed = 0;

function check(desc: string, condition: boolean, got?: any) {
  if (condition) {
    passed++;
    console.log(`✓ PASS: ${desc}`);
  } else {
    failed++;
    console.error(`✗ FAIL: ${desc} -> Got: ${JSON.stringify(got)}`);
  }
}

// TC-01: 10101010 + 00001111
{
  const res = executeBinaryOperation("10101010", "00001111", "+", 8, "unsigned");
  check("TC-01 Addition", res.multiBaseRes.binRaw === "10111001" && res.multiBaseRes.decStr === "185" && res.multiBaseRes.hexRaw === "B9" && res.multiBaseRes.octRaw === "271", res.multiBaseRes);
}

// TC-02: 255 + 1, 8-bit unsigned -> overflow
{
  const res = executeBinaryOperation("11111111", "00000001", "+", 8, "unsigned");
  check("TC-02 Addition Overflow", res.multiBaseRes.binRaw === "00000000" && res.mathResultVal === 256n && res.isOverflow && res.carryOut, { bin: res.multiBaseRes.binRaw, math: res.mathResultVal.toString(), overflow: res.isOverflow, carry: res.carryOut });
}

// TC-03: 1 + 1 = 2 (10)
{
  const res = executeBinaryOperation("00000001", "00000001", "+", 8, "unsigned");
  check("TC-03 1 + 1 = 2", res.multiBaseRes.decStr === "2" && res.multiBaseRes.binRaw === "00000010", res.multiBaseRes);
}

// TC-04: 240 + 17 = 257 (8-bit reg: 00000001, carry = 1)
{
  const res = executeBinaryOperation("11110000", "00010001", "+", 8, "unsigned");
  check("TC-04 240 + 17 = 257", res.multiBaseRes.binRaw === "00000001" && res.carryOut && res.mathResultVal === 257n, res);
}

// TC-05: 10 - 3 = 7
{
  const res = executeBinaryOperation("00001010", "00000011", "-", 8, "unsigned");
  check("TC-05 10 - 3 = 7", res.multiBaseRes.decStr === "7" && res.multiBaseRes.binRaw === "00000111", res.multiBaseRes);
}

// TC-06: A - A = 0
{
  const res = executeBinaryOperation("10101010", "10101010", "-", 8, "unsigned");
  check("TC-06 A - A = 0", res.multiBaseRes.binRaw === "00000000" && res.multiBaseRes.decStr === "0", res.multiBaseRes);
}

// TC-07: 5 - 8, signed 8-bit -> binary 11111101, decimal -3
{
  const res = executeBinaryOperation("00000101", "00001000", "-", 8, "twos");
  check("TC-07 5 - 8 = -3 in signed 2's complement", res.multiBaseRes.binRaw === "11111101" && res.multiBaseRes.decStr === "-3", res.multiBaseRes);
}

// TC-08: NOT 00000000, signed 8-bit -> binary 11111111, decimal -1
{
  const res = executeBinaryOperation("00000000", "00000000", "NOT", 8, "twos");
  check("TC-08 NOT 00000000 = -1 in signed 8-bit", res.multiBaseRes.binRaw === "11111111" && res.multiBaseRes.decStr === "-1", res.multiBaseRes);
}

// TC-09: 10000000 signed 8-bit = -128
{
  const fmt = formatMultiBase(128n, 8, "twos");
  check("TC-09 10000000 = -128", fmt.decStr === "-128" && fmt.binRaw === "10000000", fmt);
}

// TC-10: 01111111 signed 8-bit = 127
{
  const fmt = formatMultiBase(127n, 8, "twos");
  check("TC-10 01111111 = 127", fmt.decStr === "127" && fmt.binRaw === "01111111", fmt);
}

// TC-11: 5 * 3 = 15
{
  const res = executeBinaryOperation("00000101", "00000011", "*", 8, "unsigned");
  check("TC-11 5 * 3 = 15", res.multiBaseRes.decStr === "15" && res.multiBaseRes.binRaw === "00001111", res.multiBaseRes);
}

// TC-12: 10 * 4 = 40
{
  const res = executeBinaryOperation("00001010", "00000100", "*", 8, "unsigned");
  check("TC-12 10 * 4 = 40", res.multiBaseRes.decStr === "40" && res.multiBaseRes.binRaw === "00101000", res.multiBaseRes);
}

// TC-13: 255 / 2 = 127, rem 1
{
  const res = executeBinaryOperation("11111111", "00000010", "/", 8, "unsigned");
  check("TC-13 255 / 2 = 127 rem 1", res.multiBaseRes.decStr === "127" && res.remainderMultiBase?.decStr === "1", { q: res.multiBaseRes.decStr, r: res.remainderMultiBase?.decStr });
}

// TC-14: 40 / 5 = 8 rem 0
{
  const res = executeBinaryOperation("00101000", "00000101", "/", 8, "unsigned");
  check("TC-14 40 / 5 = 8 rem 0", res.multiBaseRes.decStr === "8" && res.remainderMultiBase?.decStr === "0", res);
}

// TC-15: Division by zero -> error
{
  const res = executeBinaryOperation("00101000", "00000000", "/", 8, "unsigned");
  check("TC-15 Division by zero error", !!res.error && res.error.includes("zero"), res.error);
}

// TC-16: 13 % 5 = 3
{
  const res = executeBinaryOperation("00001101", "00000101", "%", 8, "unsigned");
  check("TC-16 13 % 5 = 3", res.multiBaseRes.decStr === "3" && res.multiBaseRes.binRaw === "00000011", res.multiBaseRes);
}

// TC-17: 255 % 16 = 15
{
  const res = executeBinaryOperation("11111111", "00010000", "%", 8, "unsigned");
  check("TC-17 255 % 16 = 15", res.multiBaseRes.decStr === "15" && res.multiBaseRes.hexRaw === "0F", res.multiBaseRes);
}

// TC-18: Modulo by zero -> error
{
  const res = executeBinaryOperation("00001010", "00000000", "%", 8, "unsigned");
  check("TC-18 Modulo by zero error", !!res.error && res.error.includes("zero"), res.error);
}

// TC-19: 11001100 AND 10101010 = 10001000
{
  const res = executeBinaryOperation("11001100", "10101010", "AND", 8, "unsigned");
  check("TC-19 Bitwise AND", res.multiBaseRes.binRaw === "10001000", res.multiBaseRes);
}

// TC-20: 11001100 OR 10101010 = 11101110
{
  const res = executeBinaryOperation("11001100", "10101010", "OR", 8, "unsigned");
  check("TC-20 Bitwise OR", res.multiBaseRes.binRaw === "11101110", res.multiBaseRes);
}

// TC-21: 11001100 XOR 10101010 = 01100110
{
  const res = executeBinaryOperation("11001100", "10101010", "XOR", 8, "unsigned");
  check("TC-21 Bitwise XOR", res.multiBaseRes.binRaw === "01100110", res.multiBaseRes);
}

// TC-22: NOT 00001111 = 11110000
{
  const res = executeBinaryOperation("00001111", "00000000", "NOT", 8, "unsigned");
  check("TC-22 Bitwise NOT", res.multiBaseRes.binRaw === "11110000", res.multiBaseRes);
}

// TC-23: 00000101 << 1 = 00001010
{
  const res = executeBinaryOperation("00000101", "", "<<", 8, "unsigned", 1);
  check("TC-23 Left Shift", res.multiBaseRes.binRaw === "00001010" && res.multiBaseRes.decStr === "10", res.multiBaseRes);
}

// TC-24: 10000000 >> 1 unsigned = 01000000
{
  const res = executeBinaryOperation("10000000", "", ">>", 8, "unsigned", 1);
  check("TC-24 Unsigned Right Shift", res.multiBaseRes.binRaw === "01000000" && res.multiBaseRes.decStr === "64", res.multiBaseRes);
}

// TC-24b: 10000000 >> 1 signed 2's complement = 11000000 (-64)
{
  const res = executeBinaryOperation("10000000", "", ">>", 8, "twos", 1);
  check("TC-24b Signed Right Shift (-128 >> 1 = -64)", res.multiBaseRes.binRaw === "11000000" && res.multiBaseRes.decStr === "-64", res.multiBaseRes);
}

// TC-25 & TC-26: 64-bit Exactness (18446744073709551615 = 2^64 - 1)
{
  const conv = executeBaseConversion("18446744073709551615", 10, 16);
  check("TC-25 64-bit Max Dec to Hex", conv.hexResult === "0xFFFFFFFFFFFFFFFF" && conv.targetResult === "FFFFFFFFFFFFFFFF", conv);

  const convReverse = executeBaseConversion("FFFFFFFFFFFFFFFF", 16, 10);
  check("TC-26 64-bit Max Hex to Dec", convReverse.decResult === "18446744073709551615" && convReverse.targetResult === "18446744073709551615", convReverse);
}

// Card 2 Base Conversion unconstrained by Card 1 width (256 base 10 -> 100000000 base 2)
{
  const conv256 = executeBaseConversion("256", 10, 2);
  check("Card 2 Dec 256 to Bin unconstrained", conv256.targetResult === "100000000" && conv256.decResult === "256", conv256);
}

// Card 2 Base 3 to Base 36 round-trip for large integer > 2^53
{
  const largeIntStr = "1234567890123456789012345";
  const toBase3 = executeBaseConversion(largeIntStr, 10, 3);
  const backToDec = executeBaseConversion(toBase3.targetResult, 3, 10);
  check("Base 3 round-trip large int", backToDec.targetResult === largeIntStr, { expected: largeIntStr, got: backToDec.targetResult });
}

console.log(`\n==========================================`);
console.log(`TOTAL CHECKS: ${passed + failed}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log(`==========================================`);

if (failed > 0) process.exit(1);

export {};
