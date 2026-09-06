/**
 * Core mathematical engine for Big Number Calculator & Arbitrary-Precision Math Suite
 */

export interface DigitAnalytics {
  digitCount: number;
  digitSum: number;
  frequencies: Record<number, number>;
  first100Digits: string;
  last100Digits: string;
}

export interface GoogologyPreset {
  name: string;
  powerOf10: string;
  shortScaleName: string;
  longScaleName: string;
  digitCount: string;
  description: string;
  exactValue?: string; // Materialized value if feasible
  isSymbolicOnly?: boolean;
}

export const GOOGOLOGY_PRESETS: GoogologyPreset[] = [
  {
    name: "Million",
    powerOf10: "10^6",
    shortScaleName: "Million",
    longScaleName: "Million",
    digitCount: "7 Digits",
    description: "1,000,000 (Base integer in high finance)",
    exactValue: "1000000"
  },
  {
    name: "Billion",
    powerOf10: "10^9",
    shortScaleName: "Billion",
    longScaleName: "Thousand Million",
    digitCount: "10 Digits",
    description: "1,000,000,000 (Standard short scale billion)",
    exactValue: "1000000000"
  },
  {
    name: "Trillion",
    powerOf10: "10^12",
    shortScaleName: "Trillion",
    longScaleName: "Billion",
    digitCount: "13 Digits",
    description: "1,000,000,000,000 (Global GDP scale)",
    exactValue: "1000000000000"
  },
  {
    name: "Quadrillion",
    powerOf10: "10^15",
    shortScaleName: "Quadrillion",
    longScaleName: "Thousand Billion",
    digitCount: "16 Digits",
    description: "1,000,000,000,000,000 (Supercomputing FLOPS scale)",
    exactValue: "1000000000000000"
  },
  {
    name: "Googol",
    powerOf10: "10^100",
    shortScaleName: "Googol",
    longScaleName: "Googol",
    digitCount: "101 Digits",
    description: "1 followed by 100 zeros (Coined by Milton Sirotta)",
    exactValue: "1" + "0".repeat(100)
  },
  {
    name: "Centillion",
    powerOf10: "10^303",
    shortScaleName: "Centillion",
    longScaleName: "Centillion (10^600)",
    digitCount: "304 Digits",
    description: "Highest named number in standard short scale dictionaries",
    exactValue: "1" + "0".repeat(303)
  },
  {
    name: "Googolplex",
    powerOf10: "10^(10^100)",
    shortScaleName: "Googolplex",
    longScaleName: "Googolplex",
    digitCount: "10^100 + 1 Digits",
    description: "1 followed by a Googol zeros (Exceeds total particles in observable universe; symbolic only)",
    isSymbolicOnly: true
  }
];

export interface BigIntValidationResult {
  isValid: boolean;
  value?: bigint;
  error?: string;
}

/**
 * Validates whether an input string is a valid arbitrary-precision integer.
 * Rejects letters, malformed symbols, and decimals.
 */
export function validateBigIntInput(val: string, fieldName = "Input"): BigIntValidationResult {
  const trimmed = val.trim();
  if (!trimmed) {
    return { isValid: false, error: `${fieldName} cannot be empty.` };
  }
  const cleaned = trimmed.replace(/,/g, "");
  if (cleaned.includes(".")) {
    return { isValid: false, error: `${fieldName} must be an integer. Decimal numbers are not permitted in arbitrary integer arithmetic.` };
  }
  if (!/^[+-]?\d+$/.test(cleaned)) {
    return { isValid: false, error: `${fieldName} contains invalid characters. Only digits (0-9) and an optional leading sign (+/-) are permitted.` };
  }
  try {
    const value = BigInt(cleaned);
    return { isValid: true, value };
  } catch {
    return { isValid: false, error: `${fieldName} could not be parsed as a valid BigInt.` };
  }
}

/**
 * Safely parse string or number to BigInt.
 * Note: Prefer validateBigIntInput for user-facing validation.
 */
export function parseBigIntSafe(val: string | number): bigint {
  if (typeof val === "number") {
    return BigInt(Math.floor(val));
  }
  const cleanStr = val.trim().replace(/,/g, "");
  if (!cleanStr) return 0n;
  try {
    return BigInt(cleanStr);
  } catch {
    return 0n;
  }
}

/**
 * Arbitrary-precision Addition: X + Y
 */
export function addBigInt(x: string, y: string): string {
  const vx = validateBigIntInput(x, "Number X");
  if (!vx.isValid) throw new Error(vx.error);
  const vy = validateBigIntInput(y, "Number Y");
  if (!vy.isValid) throw new Error(vy.error);

  return (vx.value! + vy.value!).toString();
}

/**
 * Arbitrary-precision Subtraction: X - Y
 */
export function subtractBigInt(x: string, y: string): string {
  const vx = validateBigIntInput(x, "Number X");
  if (!vx.isValid) throw new Error(vx.error);
  const vy = validateBigIntInput(y, "Number Y");
  if (!vy.isValid) throw new Error(vy.error);

  return (vx.value! - vy.value!).toString();
}

/**
 * Arbitrary-precision Multiplication: X * Y
 */
export function multiplyBigInt(x: string, y: string): string {
  const vx = validateBigIntInput(x, "Number X");
  if (!vx.isValid) throw new Error(vx.error);
  const vy = validateBigIntInput(y, "Number Y");
  if (!vy.isValid) throw new Error(vy.error);

  return (vx.value! * vy.value!).toString();
}

/**
 * Arbitrary-precision Division: X / Y (Quotient & Remainder)
 */
export function divideBigInt(x: string, y: string): {
  quotient: string;
  remainder: string;
} {
  const vx = validateBigIntInput(x, "Number X");
  if (!vx.isValid) throw new Error(vx.error);
  const vy = validateBigIntInput(y, "Number Y");
  if (!vy.isValid) throw new Error(vy.error);

  if (vy.value! === 0n) {
    throw new Error("Division by Zero");
  }
  const quotient = (vx.value! / vy.value!).toString();
  const remainder = (vx.value! % vy.value!).toString();
  return { quotient, remainder };
}

/**
 * Arbitrary-precision Canonical Modulo: X mod Y (0 <= result < |Y|)
 */
export function modBigInt(x: string, y: string): string {
  const vx = validateBigIntInput(x, "Number X");
  if (!vx.isValid) throw new Error(vx.error);
  const vy = validateBigIntInput(y, "Number Y");
  if (!vy.isValid) throw new Error(vy.error);

  if (vy.value! === 0n) {
    throw new Error("Modulo by Zero");
  }
  const absM = vy.value! < 0n ? -vy.value! : vy.value!;
  let r = vx.value! % absM;
  if (r < 0n) {
    r += absM;
  }
  return r.toString();
}

/**
 * Modular Exponentiation: Base^Exp mod Modulus using binary square-and-multiply.
 * Guarantees canonical result in [0, |Modulus| - 1].
 */
export function modPowBigInt(baseStr: string, expStr: string, modStr: string): string {
  const vBase = validateBigIntInput(baseStr, "Base X");
  if (!vBase.isValid) throw new Error(vBase.error);
  const vExp = validateBigIntInput(expStr, "Exponent Y");
  if (!vExp.isValid) throw new Error(vExp.error);
  const vMod = validateBigIntInput(modStr, "Modulus M");
  if (!vMod.isValid) throw new Error(vMod.error);

  const mod = vMod.value!;
  if (mod === 0n) {
    throw new Error("Modulus cannot be zero");
  }
  const exp = vExp.value!;
  if (exp < 0n) {
    throw new Error("Negative exponents are not supported in integer modular exponentiation");
  }

  const absM = mod < 0n ? -mod : mod;
  if (absM === 1n) return "0";

  let result = 1n;
  let base = ((vBase.value! % absM) + absM) % absM;
  let e = exp;

  while (e > 0n) {
    if (e % 2n === 1n) {
      result = (result * base) % absM;
    }
    e = e / 2n;
    base = (base * base) % absM;
  }

  return result.toString();
}

/**
 * Arbitrary-precision Greatest Common Divisor GCD(A, B)
 */
export function gcdBigInt(x: string, y: string): string {
  const vx = validateBigIntInput(x, "Number X");
  if (!vx.isValid) throw new Error(vx.error);
  const vy = validateBigIntInput(y, "Number Y");
  if (!vy.isValid) throw new Error(vy.error);

  let a = vx.value! < 0n ? -vx.value! : vx.value!;
  let b = vy.value! < 0n ? -vy.value! : vy.value!;

  while (b !== 0n) {
    const temp = b;
    b = a % b;
    a = temp;
  }
  return a.toString();
}

/**
 * Arbitrary-precision Least Common Multiple LCM(A, B)
 */
export function lcmBigInt(x: string, y: string): string {
  const vx = validateBigIntInput(x, "Number X");
  if (!vx.isValid) throw new Error(vx.error);
  const vy = validateBigIntInput(y, "Number Y");
  if (!vy.isValid) throw new Error(vy.error);

  const a = vx.value! < 0n ? -vx.value! : vx.value!;
  const b = vy.value! < 0n ? -vy.value! : vy.value!;
  if (a === 0n || b === 0n) return "0";

  const gcdVal = BigInt(gcdBigInt(x, y));
  const lcm = (a / gcdVal) * b;
  return lcm.toString();
}

/**
 * Large Factorial N! (safely up to N = 5000+)
 */
export function factorialBigInt(nVal: number | string | bigint): string {
  const n = typeof nVal === "bigint" ? nVal : BigInt(nVal);
  if (n < 0n) throw new Error("Factorial is undefined for negative numbers");
  if (n === 0n || n === 1n) return "1";

  let result = 1n;
  for (let i = 2n; i <= n; i++) {
    result *= i;
  }
  return result.toString();
}

/**
 * Legendre's Formula for Factorial Trailing Zeros: Z(n) = ∑ ⌊n / 5^k⌋
 */
export function factorialTrailingZeros(nVal: number | string | bigint): number {
  const n = typeof nVal === "number" ? nVal : Number(nVal);
  if (n <= 0) return 0;
  let count = 0;
  let d = 5;
  while (n >= d) {
    count += Math.floor(n / d);
    d *= 5;
  }
  return count;
}

/**
 * Permutations P(n, r) = n! / (n-r)!
 */
export function permutationsBigInt(nVal: number | string | bigint, rVal: number | string | bigint): string {
  const n = typeof nVal === "bigint" ? nVal : BigInt(nVal);
  const r = typeof rVal === "bigint" ? rVal : BigInt(rVal);
  if (n < 0n || r < 0n) throw new Error("Values n and r must be non-negative integers");
  if (r > n) return "0";
  if (r === 0n) return "1";

  let result = 1n;
  for (let i = n - r + 1n; i <= n; i++) {
    result *= i;
  }
  return result.toString();
}

/**
 * Combinations C(n, r) = n! / (r! * (n-r)!)
 */
export function combinationsBigInt(nVal: number | string | bigint, rVal: number | string | bigint): string {
  const n = typeof nVal === "bigint" ? nVal : BigInt(nVal);
  const r = typeof rVal === "bigint" ? rVal : BigInt(rVal);
  if (n < 0n || r < 0n) throw new Error("Values n and r must be non-negative integers");
  if (r > n) return "0";
  if (r === 0n || r === n) return "1";

  const k = r < n - r ? r : n - r;
  let num = 1n;
  let den = 1n;
  for (let i = 1n; i <= k; i++) {
    num *= n - i + 1n;
    den *= i;
  }
  return (num / den).toString();
}

function modPowInternal(base: bigint, exp: bigint, mod: bigint): bigint {
  let res = 1n;
  base = base % mod;
  while (exp > 0n) {
    if (exp % 2n === 1n) res = (res * base) % mod;
    exp = exp / 2n;
    base = (base * base) % mod;
  }
  return res;
}

/**
 * Miller-Rabin Primality Test.
 * Deterministic for integers up to 2^64 using standard bases.
 * Probabilistic with error probability < 4^(-12) for larger integers.
 */
export function millerRabinTest(nStr: string): { isPrime: boolean; details: string; isDeterministic: boolean } {
  const v = validateBigIntInput(nStr, "Number");
  if (!v.isValid || !v.value) {
    return { isPrime: false, details: v.error || "Invalid integer input.", isDeterministic: false };
  }
  const n = v.value;

  if (n <= 1n) return { isPrime: false, details: `${n} is not prime (prime numbers are integers strictly greater than 1).`, isDeterministic: true };
  if (n === 2n || n === 3n) return { isPrime: true, details: `${n} is prime.`, isDeterministic: true };
  if (n % 2n === 0n) return { isPrime: false, details: `${n} is composite (even integer divisible by 2).`, isDeterministic: true };
  if (n % 3n === 0n) return { isPrime: false, details: `${n} is composite (divisible by 3).`, isDeterministic: true };

  // Trial division with small primes
  const smallPrimes = [5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n, 53n, 59n, 61n, 67n, 71n, 73n, 79n, 83n, 89n, 97n];
  for (const p of smallPrimes) {
    if (n === p) return { isPrime: true, details: `${n} is a known prime.`, isDeterministic: true };
    if (n % p === 0n) return { isPrime: false, details: `${n} is composite (divisible by ${p}).`, isDeterministic: true };
  }

  // Decompose n - 1 = 2^s * d
  let d = n - 1n;
  let s = 0n;
  while (d % 2n === 0n) {
    d /= 2n;
    s += 1n;
  }

  // Deterministic bases for 64-bit numbers (covers all integers < 2^64 ~ 1.84 * 10^19)
  const testBases = [2n, 3n, 5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n];

  for (const a of testBases) {
    if (n <= a) break;
    let x = modPowInternal(a, d, n);
    if (x === 1n || x === n - 1n) continue;

    let composite = true;
    for (let r = 1n; r < s; r++) {
      x = (x * x) % n;
      if (x === n - 1n) {
        composite = false;
        break;
      }
    }
    if (composite) {
      return { isPrime: false, details: `${n} is composite (failed Miller-Rabin test at witness base ${a}).`, isDeterministic: true };
    }
  }

  const isDeterministic = n < 18446744073709551616n;
  return {
    isPrime: true,
    isDeterministic,
    details: isDeterministic
      ? `${n} is verified PRIME (deterministic across all Miller-Rabin test bases).`
      : `${n} is PROBABLE PRIME (passed all ${testBases.length} Miller-Rabin test rounds with error probability < 4⁻¹²).`
  };
}

/**
 * Digit Inspector & Frequency Analytics
 */
export function analyzeDigits(numStr: string): DigitAnalytics {
  const clean = numStr.replace(/[^0-9]/g, "");
  if (!clean) {
    return {
      digitCount: 0,
      digitSum: 0,
      frequencies: { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 },
      first100Digits: "0",
      last100Digits: "0"
    };
  }

  const frequencies: Record<number, number> = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  let digitSum = 0;

  for (let i = 0; i < clean.length; i++) {
    const d = parseInt(clean[i], 10);
    frequencies[d] = (frequencies[d] || 0) + 1;
    digitSum += d;
  }

  const first100Digits = clean.length > 100 ? clean.substring(0, 100) + "..." : clean;
  const last100Digits = clean.length > 100 ? "..." + clean.substring(clean.length - 100) : clean;

  return {
    digitCount: clean.length,
    digitSum,
    frequencies,
    first100Digits,
    last100Digits
  };
}

/**
 * Format scientific notation approximation for massive numbers.
 * Preserves negative sign, formats lead with rounding, and matches exponent magnitude.
 */
export function formatScientificApprox(numStr: string): string {
  const trimmed = numStr.trim();
  if (!trimmed) return "0";
  const isNegative = trimmed.startsWith("-");
  const unsigned = trimmed.replace(/^[+-]/, "").replace(/,/g, "");
  if (!unsigned || unsigned === "0") return "0";

  const len = unsigned.length;
  if (len <= 5) {
    return (isNegative ? "-" : "") + unsigned;
  }

  let lead5 = unsigned.substring(0, 5);
  const decidingDigit = len > 5 ? parseInt(unsigned[5], 10) : 0;
  let exp = len - 1;

  if (decidingDigit >= 5) {
    let leadNum = parseInt(lead5, 10) + 1;
    if (leadNum >= 100000) {
      leadNum = Math.floor(leadNum / 10);
      exp += 1;
    }
    lead5 = leadNum.toString().padStart(5, "0");
  }

  const formattedLead = `${lead5[0]}.${lead5.substring(1)}`;
  return `${isNegative ? "-" : ""}${formattedLead} × 10^${exp}`;
}
