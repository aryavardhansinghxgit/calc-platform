import {
  addBigInt,
  subtractBigInt,
  multiplyBigInt,
  divideBigInt,
  modBigInt,
  modPowBigInt,
  gcdBigInt,
  lcmBigInt,
  factorialBigInt,
  factorialTrailingZeros,
  analyzeDigits,
  formatScientificApprox,
  parseBigIntSafe
} from "../src/app/calculators/big-number-calculator/big-number-logic";

console.log("=========================================");
console.log("TESTING GOLDEN CASES");
console.log("=========================================");

// TC-BIG-01
const x1 = "1000000000000000000000000000000";
const y1 = "98765432109876543210987654321";
const res1 = multiplyBigInt(x1, y1);
const exp1 = "98765432109876543210987654321000000000000000000000000000000";
console.log("TC-BIG-01 Result exact:", res1 === exp1, "Len:", res1.length, "Exp Len: 59");
console.log("TC-BIG-01 Sci approx:", formatScientificApprox(res1));

// TC-BIG-02
const x2 = "12345678901234567890";
const y2 = "9876543210";
const res2 = multiplyBigInt(x2, y2);
const exp2 = (12345678901234567890n * 9876543210n).toString();
console.log("TC-BIG-02 Exact mult:", res2 === exp2, res2);

// TC-BIG-03
const x3 = "999999999999999999999999999999999999999999";
const y3 = "1";
const res3 = addBigInt(x3, y3);
const exp3 = "1000000000000000000000000000000000000000000";
console.log("TC-BIG-03 Addition carry:", res3 === exp3, res3);

// TC-BIG-04
const x4 = "1000000000000000000000000000000000000";
const y4 = "1";
const res4 = subtractBigInt(x4, y4);
const exp4 = "999999999999999999999999999999999999";
console.log("TC-BIG-04 Borrow subtraction:", res4 === exp4, res4);

// TC-BIG-05
const x5 = "12345678901234567890";
const y5 = "12345678901234567890";
const res5 = subtractBigInt(x5, y5);
console.log("TC-BIG-05 Subtract to zero:", res5 === "0", res5);

// TC-BIG-06
const x6 = "123456789012345678901234567890";
const y6 = "1234567890";
const res6 = divideBigInt(x6, y6);
const exp6Quot = (123456789012345678901234567890n / 1234567890n).toString();
const exp6Rem = (123456789012345678901234567890n % 1234567890n).toString();
console.log("TC-BIG-06 Division quot & rem:", res6.quotient === exp6Quot, res6.remainder === exp6Rem, res6);

// TC-BIG-07
const x7 = "123456789012345678901234567890";
const y7 = "987654321";
const res7 = modBigInt(x7, y7);
const exp7 = (123456789012345678901234567890n % 987654321n).toString();
console.log("TC-BIG-07 Modulo:", res7 === exp7, res7);

// TC-BIG-08 & 09
const x8 = "12345678901234567890";
const y8 = "9876543210";
const res8 = gcdBigInt(x8, y8);
const res9 = lcmBigInt(x8, y8);
console.log("TC-BIG-08 GCD:", res8);
console.log("TC-BIG-09 LCM:", res9);

// MODULAR EXPONENTIATION
console.log("\n--- MODULAR EXPONENTIATION ---");
const modSample = modPowBigInt("2", "100", "1000000007");
console.log("MOD sample 2^100 mod 1000000007:", modSample, "Exp: 976371285", modSample === "976371285");

const mod01 = modPowBigInt("2", "10", "1000");
console.log("MOD-01 2^10 mod 1000:", mod01, "Exp: 24", mod01 === "24");

const mod02 = modPowBigInt("10", "0", "7");
console.log("MOD-02 10^0 mod 7:", mod02, "Exp: 1", mod02 === "1");

const mod03 = modPowBigInt("123456789", "12345", "1000000007");
console.log("MOD-03 123456789^12345 mod 1000000007:", mod03);

const tStart = Date.now();
const mod04 = modPowBigInt("2", "1000000", "1000000007");
const tEnd = Date.now();
console.log("MOD-04 2^1000000 mod 1000000007:", mod04, "Time:", tEnd - tStart, "ms");

try {
  modPowBigInt("2", "10", "0");
  console.log("MOD-06 M=0 did NOT throw!");
} catch (e: any) {
  console.log("MOD-06 M=0 threw correctly:", e.message);
}

// FACTORIAL
console.log("\n--- FACTORIAL ---");
console.log("FACTORIAL-01 (0!):", factorialBigInt(0) === "1");
console.log("FACTORIAL-02 (1!):", factorialBigInt(1) === "1");
console.log("FACTORIAL-03 (5!):", factorialBigInt(5) === "120");
console.log("FACTORIAL-04 (10!):", factorialBigInt(10) === "3628800", "Zeros:", factorialTrailingZeros(10));

const f100 = factorialBigInt(100);
const a100 = analyzeDigits(f100);
console.log("FACTORIAL 100! Digits:", a100.digitCount, "Exp: 158");
console.log("FACTORIAL 100! Trailing zeros:", factorialTrailingZeros(100), "Exp: 24");
console.log("FACTORIAL 100! Sci approx:", formatScientificApprox(f100));
console.log("FACTORIAL 100! Frequencies:", a100.frequencies);
const sumFreq = Object.values(a100.frequencies).reduce((a, b) => a + b, 0);
console.log("FACTORIAL 100! Sum of Freqs:", sumFreq, "Equals digitCount:", sumFreq === a100.digitCount);

// Check negative inputs behavior
console.log("\n--- NEGATIVE & MALFORMED INPUTS ---");
console.log("Negative Modulo: -13 mod 5 ->", modBigInt("-13", "5"));
console.log("Negative ModPow: (-2)^3 mod 5 ->", modPowBigInt("-2", "3", "5"));
console.log("Malformed parse 'abc' ->", parseBigIntSafe("abc").toString());
console.log("Malformed parse '12.5' ->", parseBigIntSafe("12.5").toString());
console.log("Scientific approx of negative: -98765432109876543210 ->", formatScientificApprox("-98765432109876543210"));
