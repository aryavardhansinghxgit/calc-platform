// High-precision hexadecimal, multi-base, and computer-systems arithmetic engine.
// All operations use exact BigInt arithmetic with zero Number/parseInt precision loss.

export type HexOperator = "+" | "-" | "*" | "/" | "MOD" | "AND" | "OR" | "XOR" | "NOT" | "<<" | ">>" | ">>>";
export type BitWidth = 8 | 16 | 32 | 64;

export const BASE_ALPHABET = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

/**
 * Parses an arbitrary-base string into an exact BigInt.
 * Supports bases 2 through 36 without floating-point precision loss.
 */
export function decodeBaseExact(value: string, base: number): bigint {
  if (base < 2 || base > 36) {
    throw new Error(`Invalid base: ${base}. Must be between 2 and 36.`);
  }

  const raw = value.trim();
  if (!raw) return 0n;

  let isNegative = false;
  let clean = raw;

  if (clean.startsWith("-")) {
    isNegative = true;
    clean = clean.slice(1).trim();
  } else if (clean.startsWith("+")) {
    clean = clean.slice(1).trim();
  }

  // Strip prefixes if matching the base
  if (base === 16 && clean.toLowerCase().startsWith("0x")) {
    clean = clean.slice(2);
  } else if (base === 2 && clean.toLowerCase().startsWith("0b")) {
    clean = clean.slice(2);
  } else if (base === 8 && clean.toLowerCase().startsWith("0o")) {
    clean = clean.slice(2);
  }

  clean = clean.toUpperCase();
  if (!clean) return 0n;

  const baseBig = BigInt(base);
  let result = 0n;

  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    const digitValue = BASE_ALPHABET.indexOf(char);
    if (digitValue === -1 || digitValue >= base) {
      throw new Error(`Invalid character '${char}' for Base-${base} number.`);
    }
    result = result * baseBig + BigInt(digitValue);
  }

  return isNegative ? -result : result;
}

/**
 * Encodes an exact BigInt into an arbitrary-base string (2 through 36).
 * Uses exact Euclidean division with BigInt remainder.
 */
export function encodeBaseExact(value: bigint, base: number): string {
  if (base < 2 || base > 36) {
    throw new Error(`Invalid base: ${base}. Must be between 2 and 36.`);
  }

  if (value === 0n) return "0";

  let isNegative = false;
  let temp = value;
  if (temp < 0n) {
    isNegative = true;
    temp = -temp;
  }

  const baseBig = BigInt(base);
  let digits = "";

  while (temp > 0n) {
    const remainder = Number(temp % baseBig);
    digits = BASE_ALPHABET[remainder] + digits;
    temp = temp / baseBig;
  }

  return isNegative ? `-${digits}` : digits;
}

/**
 * Helper to convert an unsigned BigInt to two's complement signed BigInt for width W.
 */
export function toTwosComplementSigned(uVal: bigint, width: BitWidth): bigint {
  const mask = (1n << BigInt(width)) - 1n;
  const clamped = uVal & mask;
  const msbMask = 1n << BigInt(width - 1);
  if ((clamped & msbMask) !== 0n) {
    return clamped - (1n << BigInt(width));
  }
  return clamped;
}

/**
 * Formats a BigInt into a fixed-width padded hexadecimal string.
 */
export function formatHexFixed(uVal: bigint, width: BitWidth): string {
  const mask = (1n << BigInt(width)) - 1n;
  const clamped = uVal & mask;
  const hexChars = width / 4;
  return clamped.toString(16).toUpperCase().padStart(hexChars, "0");
}

/**
 * Formats a BigInt into a fixed-width binary string grouped in 4-bit nibbles.
 */
export function formatBinaryFixed(uVal: bigint, width: BitWidth): string {
  const mask = (1n << BigInt(width)) - 1n;
  const clamped = uVal & mask;
  const binRaw = clamped.toString(2).padStart(width, "0");
  return binRaw.match(/.{1,4}/g)?.join(" ") || binRaw;
}

/**
 * Generates Euclidean division steps for converting decimal BigInt to target base.
 */
export function generateBaseDerivationSteps(value: bigint, targetBase: number, maxSteps: number = 32): string[] {
  if (targetBase < 2 || targetBase > 36) return [];
  if (value === 0n) {
    return [`0 ÷ ${targetBase} = 0, Remainder 0 (${BASE_ALPHABET[0]}) &rarr; Result: 0`];
  }

  const steps: string[] = [];
  let temp = value < 0n ? -value : value;
  const baseBig = BigInt(targetBase);
  const remainders: string[] = [];
  let stepCount = 0;

  while (temp > 0n && stepCount < maxSteps) {
    const q = temp / baseBig;
    const r = Number(temp % baseBig);
    const char = BASE_ALPHABET[r];
    steps.push(`${temp.toString()} ÷ ${targetBase} = ${q.toString()}, Remainder ${r} (${char})`);
    remainders.push(char);
    temp = q;
    stepCount++;
  }

  if (temp > 0n) {
    steps.push(`... [Steps truncated for brevity, remaining quotient: ${temp.toString()}]`);
  } else {
    const converted = [...remainders].reverse().join("");
    steps.push(`Read remainders from bottom to top &rarr; ${converted} (Base ${targetBase})`);
  }

  return steps;
}

export interface CalculationResult {
  mathematicalResult: bigint;
  registerResult: bigint;
  carryOut: 0 | 1;
  borrowOut: 0 | 1;
  unsignedOverflow: boolean;
  signedOverflow: boolean;
  hexResult: string;
  decResult: string;
  binResult: string;
  octResult: string;
  signedDecResult: string;
  unsignedDecResult: string;
  remainderHex?: string;
  remainderDec?: string;
  steps: string[];
  error?: string;
}

/**
 * Full register arithmetic and bitwise engine.
 */
export function executeHexArithmetic(
  rawA: string,
  rawB: string,
  operator: HexOperator,
  width: BitWidth,
  isSigned: boolean
): CalculationResult {
  const mask = (1n << BigInt(width)) - 1n;
  const signedMin = -(1n << BigInt(width - 1));
  const signedMax = (1n << BigInt(width - 1)) - 1n;

  let aBig: bigint;
  let bBig: bigint;

  try {
    aBig = decodeBaseExact(rawA, 16);
  } catch (err: any) {
    return {
      mathematicalResult: 0n,
      registerResult: 0n,
      carryOut: 0,
      borrowOut: 0,
      unsignedOverflow: false,
      signedOverflow: false,
      hexResult: "0",
      decResult: "0",
      binResult: "0",
      octResult: "0",
      signedDecResult: "0",
      unsignedDecResult: "0",
      steps: [],
      error: `Operand A is invalid: ${err.message}`
    };
  }

  try {
    bBig = operator === "NOT" ? 0n : decodeBaseExact(rawB, 16);
  } catch (err: any) {
    return {
      mathematicalResult: 0n,
      registerResult: 0n,
      carryOut: 0,
      borrowOut: 0,
      unsignedOverflow: false,
      signedOverflow: false,
      hexResult: "0",
      decResult: "0",
      binResult: "0",
      octResult: "0",
      signedDecResult: "0",
      unsignedDecResult: "0",
      steps: [],
      error: `Operand B is invalid: ${err.message}`
    };
  }

  // Mask inputs to register width for register-level bit operations
  const uA = aBig & mask;
  const uB = bBig & mask;
  const sA = toTwosComplementSigned(uA, width);
  const sB = toTwosComplementSigned(uB, width);

  let mathematicalResult = 0n;
  let registerResult = 0n;
  let carryOut: 0 | 1 = 0;
  let borrowOut: 0 | 1 = 0;
  let unsignedOverflow = false;
  let signedOverflow = false;
  let remainderHex: string | undefined;
  let remainderDec: string | undefined;
  const steps: string[] = [];

  const hexA = formatHexFixed(uA, width);
  const hexB = formatHexFixed(uB, width);

  switch (operator) {
    case "+": {
      mathematicalResult = isSigned ? sA + sB : uA + uB;
      registerResult = (uA + uB) & mask;
      carryOut = (uA + uB) > mask ? 1 : 0;
      unsignedOverflow = (uA + uB) > mask;

      // Signed overflow: adding two positives gives negative, or two negatives gives positive
      const signedMathSum = sA + sB;
      signedOverflow = signedMathSum < signedMin || signedMathSum > signedMax;

      steps.push(`Hex Addition: 0x${hexA} + 0x${hexB}`);
      steps.push(`Decimal Equivalence: ${uA.toString()} + ${uB.toString()} = ${(uA + uB).toString()}`);
      if (isSigned) {
        steps.push(`Signed 2's Complement: (${sA.toString()}) + (${sB.toString()}) = ${signedMathSum.toString()}`);
      }
      steps.push(`Register Result (${width}-bit): 0x${formatHexFixed(registerResult, width)}`);
      if (carryOut) steps.push(`Carry-Out = 1 (Addition exceeded ${width}-bit register range).`);
      if (signedOverflow && isSigned) steps.push(`Signed Overflow = YES (Sum outside signed range [${signedMin}, ${signedMax}]).`);
      break;
    }

    case "-": {
      mathematicalResult = isSigned ? sA - sB : uA - uB;
      // In two's complement register, (uA - uB) & mask wraps correctly
      registerResult = ((uA - uB) % (1n << BigInt(width)) + (1n << BigInt(width))) & mask;
      borrowOut = uA < uB ? 1 : 0;
      unsignedOverflow = uA < uB;

      const signedMathDiff = sA - sB;
      signedOverflow = signedMathDiff < signedMin || signedMathDiff > signedMax;

      steps.push(`Hex Subtraction: 0x${hexA} - 0x${hexB}`);
      steps.push(`Decimal Equivalence: ${uA.toString()} - ${uB.toString()} = ${(uA - uB).toString()}`);
      if (isSigned) {
        steps.push(`Signed 2's Complement: (${sA.toString()}) - (${sB.toString()}) = ${signedMathDiff.toString()}`);
      }
      steps.push(`Register Result (${width}-bit): 0x${formatHexFixed(registerResult, width)}`);
      if (borrowOut) steps.push(`Borrow-Out = 1 (Minuend smaller than subtrahend).`);
      if (signedOverflow && isSigned) steps.push(`Signed Overflow = YES (Difference outside signed range [${signedMin}, ${signedMax}]).`);
      break;
    }

    case "*": {
      mathematicalResult = isSigned ? sA * sB : uA * uB;
      registerResult = (uA * uB) & mask;
      carryOut = (uA * uB) > mask ? 1 : 0;
      unsignedOverflow = (uA * uB) > mask;
      const signedProd = sA * sB;
      signedOverflow = signedProd < signedMin || signedProd > signedMax;

      steps.push(`Hex Multiplication: 0x${hexA} × 0x${hexB}`);
      steps.push(`Decimal Equivalence: ${uA.toString()} × ${uB.toString()} = ${(uA * uB).toString()}`);
      steps.push(`Register Result (${width}-bit): 0x${formatHexFixed(registerResult, width)}`);
      break;
    }

    case "/": {
      if (uB === 0n) {
        return {
          mathematicalResult: 0n,
          registerResult: 0n,
          carryOut: 0,
          borrowOut: 0,
          unsignedOverflow: false,
          signedOverflow: false,
          hexResult: "0",
          decResult: "0",
          binResult: "0",
          octResult: "0",
          signedDecResult: "0",
          unsignedDecResult: "0",
          steps: [],
          error: "Division by zero (0x0) is undefined."
        };
      }

      if (isSigned) {
        // Special case: signedMin / -1 causes signed overflow
        if (sA === signedMin && sB === -1n) {
          mathematicalResult = -(signedMin);
          registerResult = uA; // wraps back to signedMin
          signedOverflow = true;
        } else {
          mathematicalResult = sA / sB;
          const sRem = sA % sB;
          registerResult = (mathematicalResult + (1n << BigInt(width))) & mask;
          remainderDec = sRem.toString();
          remainderHex = `0x${formatHexFixed((sRem + (1n << BigInt(width))) & mask, width)}`;
        }
      } else {
        mathematicalResult = uA / uB;
        registerResult = mathematicalResult & mask;
        const uRem = uA % uB;
        remainderDec = uRem.toString();
        remainderHex = `0x${formatHexFixed(uRem, width)}`;
      }

      steps.push(`Hex Division: 0x${hexA} ÷ 0x${hexB}`);
      steps.push(`Quotient: 0x${formatHexFixed(registerResult, width)} (${registerResult.toString()})`);
      if (remainderDec !== undefined) steps.push(`Remainder: ${remainderHex} (${remainderDec})`);
      break;
    }

    case "MOD": {
      if (uB === 0n) {
        return {
          mathematicalResult: 0n,
          registerResult: 0n,
          carryOut: 0,
          borrowOut: 0,
          unsignedOverflow: false,
          signedOverflow: false,
          hexResult: "0",
          decResult: "0",
          binResult: "0",
          octResult: "0",
          signedDecResult: "0",
          unsignedDecResult: "0",
          steps: [],
          error: "Modulo by zero is undefined."
        };
      }

      mathematicalResult = isSigned ? sA % sB : uA % uB;
      registerResult = isSigned ? (mathematicalResult + (1n << BigInt(width))) & mask : mathematicalResult & mask;

      steps.push(`Hex Modulo: 0x${hexA} MOD 0x${hexB}`);
      steps.push(`Modulo Result: 0x${formatHexFixed(registerResult, width)} (${mathematicalResult.toString()})`);
      break;
    }

    case "AND": {
      mathematicalResult = uA & uB;
      registerResult = mathematicalResult;
      steps.push(`Bitwise AND: 0x${hexA} & 0x${hexB}`);
      steps.push(`Result: 0x${formatHexFixed(registerResult, width)}`);
      break;
    }

    case "OR": {
      mathematicalResult = uA | uB;
      registerResult = mathematicalResult;
      steps.push(`Bitwise OR: 0x${hexA} | 0x${hexB}`);
      steps.push(`Result: 0x${formatHexFixed(registerResult, width)}`);
      break;
    }

    case "XOR": {
      mathematicalResult = uA ^ uB;
      registerResult = mathematicalResult;
      steps.push(`Bitwise XOR: 0x${hexA} ^ 0x${hexB}`);
      steps.push(`Result: 0x${formatHexFixed(registerResult, width)}`);
      break;
    }

    case "NOT": {
      mathematicalResult = (~uA) & mask;
      registerResult = mathematicalResult;
      steps.push(`Bitwise NOT: ~0x${hexA}`);
      steps.push(`Inverted ${width} bits: 0x${formatHexFixed(registerResult, width)}`);
      break;
    }

    case "<<": {
      const shift = uB > BigInt(width) ? BigInt(width) : uB;
      mathematicalResult = uA << shift;
      registerResult = mathematicalResult & mask;
      carryOut = (uA << shift) > mask ? 1 : 0;
      unsignedOverflow = carryOut === 1;

      steps.push(`Left Shift: 0x${hexA} << ${uB.toString()}`);
      steps.push(`Shifted Register: 0x${formatHexFixed(registerResult, width)}`);
      if (carryOut) steps.push(`Bits shifted past MSB were discarded (Carry-out = 1).`);
      break;
    }

    case ">>": {
      const shift = uB > BigInt(width) ? BigInt(width) : uB;
      if (isSigned) {
        // Arithmetic right shift (preserves sign bit)
        const shifted = sA >> shift;
        mathematicalResult = shifted;
        registerResult = (shifted + (1n << BigInt(width))) & mask;
        steps.push(`Arithmetic Right Shift: (${sA.toString()}) >> ${uB.toString()} (Sign-extended)`);
      } else {
        // Logical right shift
        mathematicalResult = uA >> shift;
        registerResult = mathematicalResult & mask;
        steps.push(`Logical Right Shift: 0x${hexA} >> ${uB.toString()}`);
      }
      steps.push(`Shifted Register: 0x${formatHexFixed(registerResult, width)}`);
      break;
    }

    case ">>>": {
      // Logical / Zero-fill right shift
      const shift = uB > BigInt(width) ? BigInt(width) : uB;
      mathematicalResult = (uA >> shift) & mask;
      registerResult = mathematicalResult;
      steps.push(`Logical Right Shift (Zero-fill): 0x${hexA} >>> ${uB.toString()}`);
      steps.push(`Shifted Register: 0x${formatHexFixed(registerResult, width)}`);
      break;
    }
  }

  const sRes = toTwosComplementSigned(registerResult, width);

  return {
    mathematicalResult,
    registerResult,
    carryOut,
    borrowOut,
    unsignedOverflow,
    signedOverflow,
    hexResult: formatHexFixed(registerResult, width),
    decResult: isSigned ? sRes.toString() : registerResult.toString(),
    binResult: formatBinaryFixed(registerResult, width),
    octResult: registerResult.toString(8),
    signedDecResult: sRes.toString(),
    unsignedDecResult: registerResult.toString(),
    remainderHex,
    remainderDec,
    steps
  };
}

/**
 * Parses a hex color string (#RGB, #RRGGBB, #RRGGBBAA).
 */
export function parseHexColor(hexStr: string): {
  css: string;
  hexFormatted: string;
  rgb: string;
  r: number;
  g: number;
  b: number;
  a?: number;
} | null {
  const clean = hexStr.replace(/^#/, "").replace(/^0x/i, "").trim();
  if (!/^[0-9A-Fa-f]{3,8}$/.test(clean)) return null;

  let r = 0;
  let g = 0;
  let b = 0;
  let a: number | undefined;

  if (clean.length === 3) {
    r = parseInt(clean[0] + clean[0], 16);
    g = parseInt(clean[1] + clean[1], 16);
    b = parseInt(clean[2] + clean[2], 16);
    return {
      css: `rgb(${r}, ${g}, ${b})`,
      hexFormatted: `#${clean.toUpperCase()}`,
      rgb: `rgb(${r}, ${g}, ${b})`,
      r, g, b
    };
  }

  if (clean.length === 6) {
    r = parseInt(clean.slice(0, 2), 16);
    g = parseInt(clean.slice(2, 4), 16);
    b = parseInt(clean.slice(4, 6), 16);
    return {
      css: `rgb(${r}, ${g}, ${b})`,
      hexFormatted: `#${clean.toUpperCase()}`,
      rgb: `rgb(${r}, ${g}, ${b})`,
      r, g, b
    };
  }

  if (clean.length === 8) {
    r = parseInt(clean.slice(0, 2), 16);
    g = parseInt(clean.slice(2, 4), 16);
    b = parseInt(clean.slice(4, 6), 16);
    const alphaByte = parseInt(clean.slice(6, 8), 16);
    a = Number((alphaByte / 255).toFixed(2));
    return {
      css: `rgba(${r}, ${g}, ${b}, ${a})`,
      hexFormatted: `#${clean.toUpperCase()}`,
      rgb: `rgba(${r}, ${g}, ${b}, ${a})`,
      r, g, b, a
    };
  }

  return null;
}

/**
 * IEEE 754 single-precision 32-bit float inspection.
 */
export function inspectIEEE754Float(hexStr: string): {
  floatVal: number;
  signBit: number;
  exponentBits: number;
  exponentDec: number;
  mantissaBits: string;
  binStr: string;
} | null {
  const clean = hexStr.replace(/^0x/i, "").replace(/[^0-9A-Fa-f]/g, "");
  if (!clean || clean.length > 8) return null;

  try {
    const intVal = parseInt(clean.padStart(8, "0"), 16);
    const buffer = new ArrayBuffer(4);
    const view = new DataView(buffer);
    view.setUint32(0, intVal, false);
    const floatVal = view.getFloat32(0, false);

    const signBit = (intVal >> 31) & 1;
    const exponentBits = (intVal >> 23) & 0xff;
    const mantissaBits = intVal & 0x7fffff;
    const binStr = intVal.toString(2).padStart(32, "0");

    return {
      floatVal,
      signBit,
      exponentBits,
      exponentDec: exponentBits - 127,
      mantissaBits: mantissaBits.toString(16).toUpperCase().padStart(6, "0"),
      binStr: `${binStr[0]} ${binStr.slice(1, 9)} ${binStr.slice(9)}`
    };
  } catch {
    return null;
  }
}
