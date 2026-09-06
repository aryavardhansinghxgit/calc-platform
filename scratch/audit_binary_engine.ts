// Audit script to test existing BinaryCalculator logic

type Operation = "+" | "-" | "*" | "/" | "AND" | "OR" | "XOR" | "NOT" | "<<" | ">>";
type BitWidth = 8 | 16 | 32 | 64;
type RepMode = "unsigned" | "twos" | "ones" | "signed_magnitude";

const parseBinToBigInt = (binStr: string, mode: RepMode, width: BitWidth): { val: bigint; decStr: string } => {
  if (!binStr) return { val: 0n, decStr: "0" };
  try {
    const uVal = BigInt(`0b${binStr}`);
    if (mode === "unsigned") {
      return { val: uVal, decStr: uVal.toString() };
    }

    // Signed 2's complement
    const maxUnsigned = (1n << BigInt(width)) - 1n;
    const msbMask = 1n << BigInt(width - 1);
    const masked = uVal & maxUnsigned;

    if ((masked & msbMask) !== 0n) {
      // Negative in 2's complement
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

// Test 5 - 8 in 8-bit twos complement
const cleanA = "00000101"; // 5
const cleanB = "00001000"; // 8
const bitWidth = 8;
const repMode: RepMode = "twos";
const mask = (1n << BigInt(bitWidth)) - 1n;

const { val: aVal, decStr: aDec } = parseBinToBigInt(cleanA, repMode, bitWidth);
const { val: bVal, decStr: bDec } = parseBinToBigInt(cleanB, repMode, bitWidth);
console.log("aVal:", aVal, "bVal:", bVal);

// From BinaryCalculator.tsx:
const resVal = (aVal - bVal) & mask;
console.log("resVal in BinaryCalculator:", resVal);
const resFormatted = formatMultiBase(resVal, bitWidth);
console.log("resFormatted decimal:", resFormatted.decStr);
console.log("resFormatted binary:", resFormatted.binRaw);

export {};
