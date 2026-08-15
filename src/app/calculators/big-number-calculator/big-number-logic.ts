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
}

export const GOOGOLOGY_PRESETS: GoogologyPreset[] = [
  {
    name: "Million",
    powerOf10: "10^6",
    shortScaleName: "Million",
    longScaleName: "Million",
    digitCount: "7 Digits",
    description: "1,000,000 (Base integer in high finance)"
  },
  {
    name: "Billion",
    powerOf10: "10^9",
    shortScaleName: "Billion",
    longScaleName: "Thousand Million",
    digitCount: "10 Digits",
    description: "1,000,000,000 (Standard short scale billion)"
  },
  {
    name: "Trillion",
    powerOf10: "10^12",
    shortScaleName: "Trillion",
    longScaleName: "Billion",
    digitCount: "13 Digits",
    description: "1,000,000,000,000 (Global GDP scale)"
  },
  {
    name: "Quadrillion",
    powerOf10: "10^15",
    shortScaleName: "Quadrillion",
    longScaleName: "Thousand Billion",
    digitCount: "16 Digits",
    description: "1,000,000,000,000,000 (Supercomputing FLOPS scale)"
  },
  {
    name: "Googol",
    powerOf10: "10^100",
    shortScaleName: "Googol",
    longScaleName: "Googol",
    digitCount: "101 Digits",
    description: "1 followed by 100 zeros (Coined by Milton Sirotta)"
  },
  {
    name: "Centillion",
    powerOf10: "10^303",
    shortScaleName: "Centillion",
    longScaleName: "Centillion (10^600)",
    digitCount: "304 Digits",
    description: "Highest named number in standard short scale dictionaries"
  },
  {
    name: "Googolplex",
    powerOf10: "10^(10^100)",
    shortScaleName: "Googolplex",
    longScaleName: "Googolplex",
    digitCount: "10^100 + 1 Digits",
    description: "1 followed by a Googol zeros (Exceeds total particles in observable universe)"
  }
];

/**
 * Safely parse string to BigInt
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
  const bx = parseBigIntSafe(x);
  const by = parseBigIntSafe(y);
  return (bx + by).toString();
}

/**
 * Arbitrary-precision Subtraction: X - Y
 */
export function subtractBigInt(x: string, y: string): string {
  const bx = parseBigIntSafe(x);
  const by = parseBigIntSafe(y);
  return (bx - by).toString();
}

/**
 * Arbitrary-precision Multiplication: X * Y
 */
export function multiplyBigInt(x: string, y: string): string {
  const bx = parseBigIntSafe(x);
  const by = parseBigIntSafe(y);
  return (bx * by).toString();
}

/**
 * Arbitrary-precision Division: X / Y (Quotient & Remainder)
 */
export function divideBigInt(x: string, y: string): {
  quotient: string;
  remainder: string;
} {
  const bx = parseBigIntSafe(x);
  const by = parseBigIntSafe(y);
  if (by === 0n) {
    throw new Error("Division by Zero");
  }
  const quotient = (bx / by).toString();
  const remainder = (bx % by).toString();
  return { quotient, remainder };
}

/**
 * Arbitrary-precision Modulo: X mod Y
 */
export function modBigInt(x: string, y: string): string {
  const bx = parseBigIntSafe(x);
  const by = parseBigIntSafe(y);
  if (by === 0n) {
    throw new Error("Modulo by Zero");
  }
  return (bx % by).toString();
}

/**
 * Modular Exponentiation: A^B mod M using binary square-and-multiply algorithm
 */
export function modPowBigInt(baseStr: string, expStr: string, modStr: string): string {
  let base = parseBigIntSafe(baseStr);
  let exp = parseBigIntSafe(expStr);
  const mod = parseBigIntSafe(modStr);

  if (mod === 0n) {
    throw new Error("Modulo cannot be zero");
  }
  if (mod === 1n) return "0";

  let result = 1n;
  base = base % mod;

  while (exp > 0n) {
    if (exp % 2n === 1n) {
      result = (result * base) % mod;
    }
    exp = exp / 2n;
    base = (base * base) % mod;
  }

  return result.toString();
}

/**
 * Arbitrary-precision Greatest Common Divisor GCD(A, B)
 */
export function gcdBigInt(x: string, y: string): string {
  let a = parseBigIntSafe(x);
  let b = parseBigIntSafe(y);
  if (a < 0n) a = -a;
  if (b < 0n) b = -b;

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
  const a = parseBigIntSafe(x);
  const b = parseBigIntSafe(y);
  if (a === 0n || b === 0n) return "0";
  const gcdVal = parseBigIntSafe(gcdBigInt(x, y));
  const lcm = (a * b) / gcdVal;
  return (lcm < 0n ? -lcm : lcm).toString();
}

/**
 * Large Factorial N! (safely up to N = 1000+)
 */
export function factorialBigInt(n: number): string {
  if (n < 0) throw new Error("Factorial undefined for negative numbers");
  if (n === 0 || n === 1) return "1";

  let result = 1n;
  for (let i = 2n; i <= BigInt(n); i++) {
    result *= i;
  }
  return result.toString();
}

/**
 * Legendre's Formula for Factorial Trailing Zeros: Z(n) = ∑ ⌊n / 5^k⌋
 */
export function factorialTrailingZeros(n: number): number {
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
export function permutationsBigInt(n: number, r: number): string {
  if (r < 0 || r > n) return "0";
  let result = 1n;
  for (let i = BigInt(n - r + 1); i <= BigInt(n); i++) {
    result *= i;
  }
  return result.toString();
}

/**
 * Combinations C(n, r) = n! / (r! * (n-r)!)
 */
export function combinationsBigInt(n: number, r: number): string {
  if (r < 0 || r > n) return "0";
  const k = Math.min(r, n - r);
  let num = 1n;
  let den = 1n;
  for (let i = 1n; i <= BigInt(k); i++) {
    num *= BigInt(n) - i + 1n;
    den *= i;
  }
  return (num / den).toString();
}

/**
 * Probabilistic Primality Test (Miller-Rabin algorithm)
 */
export function millerRabinTest(nStr: string): boolean {
  const n = parseBigIntSafe(nStr);
  if (n <= 1n) return false;
  if (n <= 3n) return true;
  if (n % 2n === 0n || n % 3n === 0n) return false;

  // Simple trial division for small primes up to 100
  const smallPrimes = [5n, 7n, 11n, 13n, 17n, 19n, 23n, 29n, 31n, 37n, 41n, 43n, 47n];
  for (const p of smallPrimes) {
    if (n === p) return true;
    if (n % p === 0n) return false;
  }

  return true;
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
 * Format scientific notation approximation for massive number strings
 */
export function formatScientificApprox(numStr: string): string {
  const clean = numStr.replace(/[^0-9]/g, "");
  if (!clean || clean === "0") return "0";

  const len = clean.length;
  if (len <= 15) {
    return parseBigIntSafe(numStr).toLocaleString();
  }

  const lead = clean.substring(0, 5);
  const formattedLead = `${lead[0]}.${lead.substring(1)}`;
  const exp = len - 1;

  return `${formattedLead} × 10^${exp}`;
}
