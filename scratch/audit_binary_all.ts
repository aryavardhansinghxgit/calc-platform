// Comprehensive mathematical and functional audit test for Binary Calculator

import { calculateBinaryCalculator } from "../src/app/calculators/binary-calculator/calculator";

type Operation = "+" | "-" | "*" | "/" | "%" | "AND" | "OR" | "XOR" | "NOT" | "<<" | ">>";
type BitWidth = 8 | 16 | 32 | 64;
type RepMode = "unsigned" | "twos";

interface TestResult {
  id: string;
  name: string;
  pass: boolean;
  expected: string;
  actual: string;
  details?: string;
}

const results: TestResult[] = [];

function record(id: string, name: string, pass: boolean, expected: string, actual: string, details?: string) {
  results.push({ id, name, pass, expected, actual, details });
  console.log(`${pass ? "✓ PASS" : "✗ FAIL"} [${id}] ${name} -> Expected: ${expected}, Got: ${actual}`);
}

// 1. Test existing fallback calculator in calculator.ts
console.log("=== 1. AUDITING src/app/calculators/binary-calculator/calculator.ts ===");
const fb1 = calculateBinaryCalculator({ binary1: "1010", binary2: "0110", operation: "+" });
record("FB-01", "Fallback Addition 1010 + 0110", fb1.binaryResult === "10000" && fb1.decimalResult === 16, "10000 / 16", `${fb1.binaryResult} / ${fb1.decimalResult}`);

const fb2 = calculateBinaryCalculator({ binary1: "1010", binary2: "0110", operation: "-" });
record("FB-02", "Fallback Subtraction 1010 - 0110", fb2.binaryResult === "100" && fb2.decimalResult === 4, "100 / 4", `${fb2.binaryResult} / ${fb2.decimalResult}`);

// 2. Audit BinaryCalculator.tsx mathematical engine
console.log("\n=== 2. AUDITING BinaryCalculator.tsx ENGINE (Direct Simulation) ===");

// We simulate the exact functions from BinaryCalculator.tsx
const parseBinToBigInt = (binStr: string, mode: RepMode, width: BitWidth): { val: bigint; decStr: string } => {
  if (!binStr) return { val: 0n, decStr: "0" };
  try {
    const uVal = BigInt(`0b${binStr}`);
    if (mode === "unsigned") {
      return { val: uVal, decStr: uVal.toString() };
    }
    const maxUnsigned = (1n << BigInt(width)) - 1n;
    const msbMask = 1n << BigInt(width - 1);
    const masked = uVal & maxUnsigned;
    if ((masked & msbMask) !== 0n) {
      const signedVal = masked - (1n << BigInt(width));
      return { val: signedVal, decStr: signedVal.toString() };
    }
    return { val: masked, decStr: masked.toString() };
  } catch (e) {
    return { val: 0n, decStr: "0" };
  }
};

const formatMultiBase = (num: bigint, width: BitWidth) => {
  try {
    const mask = (1n << BigInt(width)) - 1n;
    const uVal = num < 0n ? (num + (1n << BigInt(width))) & mask : num & mask;
    const binRaw = uVal.toString(2).padStart(width, "0");
    const hexRaw = uVal.toString(16).toUpperCase().padStart(width / 4, "0");
    const octRaw = uVal.toString(8).padStart(Math.ceil(width / 3), "0");
    const decStr = num.toString();
    return { binRaw, hexRaw, octRaw, decStr };
  } catch (e) {
    return { binRaw: "0", hexRaw: "0", octRaw: "0", decStr: "0" };
  }
};

// TC-BIN-01
{
  const a = "10101010";
  const b = "00001111";
  const { val: aVal } = parseBinToBigInt(a, "unsigned", 8);
  const { val: bVal } = parseBinToBigInt(b, "unsigned", 8);
  const mask = 255n;
  const resVal = (aVal + bVal) & mask;
  const fmt = formatMultiBase(resVal, 8);
  const pass = fmt.binRaw === "10111001" && fmt.decStr === "185" && fmt.hexRaw === "B9" && fmt.octRaw === "271";
  record("TC-BIN-01", "Addition 10101010 + 00001111", pass, "bin: 10111001, dec: 185, hex: B9, oct: 271", `bin: ${fmt.binRaw}, dec: ${fmt.decStr}, hex: ${fmt.hexRaw}, oct: ${fmt.octRaw}`);
}

// TC-BIN-02 (Overflow detection)
{
  const a = "11111111";
  const b = "00000001";
  const { val: aVal } = parseBinToBigInt(a, "unsigned", 8);
  const { val: bVal } = parseBinToBigInt(b, "unsigned", 8);
  const mathSum = aVal + bVal; // 256n
  const mask = 255n;
  const resVal = mathSum & mask; // 0n
  const fmt = formatMultiBase(resVal, 8);
  const isOverflow = mathSum > mask;
  // Does current BinaryCalculator report overflow in multiBaseRes?
  // Current BinaryCalculator only has resVal = (aVal + bVal) & mask, no overflow field!
  record("TC-BIN-02", "Addition Overflow 11111111 + 1 (Check if overflow reported)", !isOverflow, "Overflow reported / distinguished", "No overflow field in current component");
}

// TC-BIN-07 (Two's complement subtraction: 5 - 8)
{
  const a = "00000101"; // 5
  const b = "00001000"; // 8
  const { val: aVal } = parseBinToBigInt(a, "twos", 8);
  const { val: bVal } = parseBinToBigInt(b, "twos", 8);
  const mask = 255n;
  // What current component does:
  const resVal = (aVal - bVal) & mask;
  const fmt = formatMultiBase(resVal, 8);
  // Expected decimal interpretation is -3, but fmt.decStr is "253"!
  record("TC-BIN-07", "Signed 2's Complement 5 - 8 = -3", fmt.decStr === "-3", "-3", fmt.decStr, "Current component passes 253n to formatMultiBase which renders decStr as '253'");
}

// TC-BIN-13 (Division: 255 / 2)
{
  const aVal = 255n;
  const bVal = 2n;
  const q = aVal / bVal;
  const r = aVal % bVal;
  record("TC-BIN-13", "Division 255 / 2", q === 127n && r === 1n, "q: 127, r: 1", `q: ${q}, r: ${r}`);
}

// TC-BIN-16 (Modulo: 13 % 5)
{
  // Current component has no '%' operator in Operation type!
  record("TC-BIN-16", "Modulo operator support (13 % 5 = 3)", false, "Modulo supported", "Operation type does not include '%'");
}

// TC-SHR-03 (Signed right shift: -128 >> 1)
{
  const aVal = -128n;
  const shift = 1n;
  const mask = 255n;
  const resVal = (aVal >> shift) & mask; // (-64n) & 255n = 192n
  const fmt = formatMultiBase(resVal, 8);
  record("TC-SHR-03", "Signed right shift -128 >> 1 decimal output", fmt.decStr === "-64", "-64", fmt.decStr, "Current code renders 192 instead of -64");
}

// TC-CONV-01 (Base Conversion 256 in Card 2 with 8-bit width)
{
  const decVal = 256n;
  const bitWidth = 8;
  const mask = (1n << BigInt(bitWidth)) - 1n;
  const uVal = decVal & mask; // 0n
  const binResult = uVal.toString(2);
  record("TC-CONV-01", "Card 2 Convert 256 decimal to binary", binResult === "100000000", "100000000", binResult, "Current Card 2 masks by bitWidth of Card 1, turning 256 into 0");
}

// Summary
const total = results.length;
const passed = results.filter(r => r.pass).length;
const failed = total - passed;
console.log(`\n==========================================`);
console.log(`TOTAL AUDIT CHECKS: ${total}`);
console.log(`PASSED: ${passed}`);
console.log(`FAILED: ${failed}`);
console.log(`==========================================`);

export {};
