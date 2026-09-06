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
  analyzeDigits
} from "../src/app/calculators/big-number-calculator/big-number-logic";

function randomDigits(len: number): string {
  let s = (Math.floor(Math.random() * 9) + 1).toString();
  for (let i = 1; i < len; i++) {
    s += Math.floor(Math.random() * 10).toString();
  }
  return s;
}

console.log("Starting 24,000 randomized property tests...");

// 1. ADDITION (5,000 tests)
let addPass = 0;
for (let i = 0; i < 5000; i++) {
  const lenA = Math.floor(Math.random() * 100) + 1;
  const lenB = Math.floor(Math.random() * 100) + 1;
  const sA = randomDigits(lenA);
  const sB = randomDigits(lenB);
  const bA = BigInt(sA);
  const bB = BigInt(sB);

  const res = addBigInt(sA, sB);
  const exp = (bA + bB).toString();
  if (res === exp && addBigInt(sB, sA) === res) {
    addPass++;
  }
}
console.log(`Addition: ${addPass} / 5000 passed`);

// 2. SUBTRACTION (5,000 tests)
let subPass = 0;
for (let i = 0; i < 5000; i++) {
  const lenA = Math.floor(Math.random() * 100) + 1;
  const lenB = Math.floor(Math.random() * 100) + 1;
  const sA = randomDigits(lenA);
  const sB = randomDigits(lenB);
  const bA = BigInt(sA);
  const bB = BigInt(sB);

  const res = subtractBigInt(sA, sB);
  const exp = (bA - bB).toString();
  if (res === exp) {
    subPass++;
  }
}
console.log(`Subtraction: ${subPass} / 5000 passed`);

// 3. MULTIPLICATION (5,000 tests)
let multPass = 0;
for (let i = 0; i < 5000; i++) {
  const lenA = Math.floor(Math.random() * 50) + 1;
  const lenB = Math.floor(Math.random() * 50) + 1;
  const sA = randomDigits(lenA);
  const sB = randomDigits(lenB);
  const bA = BigInt(sA);
  const bB = BigInt(sB);

  const res = multiplyBigInt(sA, sB);
  const exp = (bA * bB).toString();
  if (res === exp && multiplyBigInt(sB, sA) === res) {
    multPass++;
  }
}
console.log(`Multiplication: ${multPass} / 5000 passed`);

// 4. MODULO (2,000 tests)
let modPass = 0;
for (let i = 0; i < 2000; i++) {
  const lenA = Math.floor(Math.random() * 80) + 1;
  const lenB = Math.floor(Math.random() * 40) + 1;
  const sA = randomDigits(lenA);
  const sB = randomDigits(lenB);
  const bA = BigInt(sA);
  const bB = BigInt(sB);

  const res = modBigInt(sA, sB);
  const exp = (bA % bB).toString();
  if (res === exp) {
    modPass++;
  }
}
console.log(`Modulo: ${modPass} / 2000 passed`);

// 5. GCD & LCM (2,000 tests each)
let gcdPass = 0;
let lcmPass = 0;
for (let i = 0; i < 2000; i++) {
  const lenA = Math.floor(Math.random() * 30) + 1;
  const lenB = Math.floor(Math.random() * 30) + 1;
  const sA = randomDigits(lenA);
  const sB = randomDigits(lenB);
  const bA = BigInt(sA);
  const bB = BigInt(sB);

  // Independent GCD oracle
  let u = bA, v = bB;
  while (v !== 0n) {
    const t = v;
    v = u % v;
    u = t;
  }
  const expGcd = u.toString();
  const resGcd = gcdBigInt(sA, sB);
  if (resGcd === expGcd) gcdPass++;

  const expLcm = ((bA * bB) / u).toString();
  const resLcm = lcmBigInt(sA, sB);
  if (resLcm === expLcm) lcmPass++;
}
console.log(`GCD: ${gcdPass} / 2000 passed`);
console.log(`LCM: ${lcmPass} / 2000 passed`);

// 6. MODULAR EXPONENTIATION (2,000 tests)
let modPowPass = 0;
for (let i = 0; i < 2000; i++) {
  const base = BigInt(Math.floor(Math.random() * 1000000) + 1);
  const exp = BigInt(Math.floor(Math.random() * 100000) + 1);
  const mod = BigInt(Math.floor(Math.random() * 1000000000) + 2);

  // Independent oracle
  let r = 1n;
  let b = base % mod;
  let e = exp;
  while (e > 0n) {
    if (e % 2n === 1n) r = (r * b) % mod;
    e = e / 2n;
    b = (b * b) % mod;
  }

  const res = modPowBigInt(base.toString(), exp.toString(), mod.toString());
  if (res === r.toString()) modPowPass++;
}
console.log(`Modular Exponentiation: ${modPowPass} / 2000 passed`);

// 7. FACTORIAL & TRAILING ZEROS (1,000 tests)
let factPass = 0;
for (let i = 0; i <= 200; i++) {
  const n = i;
  let f = 1n;
  for (let j = 2n; j <= BigInt(n); j++) f *= j;
  const expStr = f.toString();
  const resStr = factorialBigInt(n);

  let expZeros = 0;
  let p5 = 5;
  while (n >= p5) {
    expZeros += Math.floor(n / p5);
    p5 *= 5;
  }
  const resZeros = factorialTrailingZeros(n);

  const analytics = analyzeDigits(resStr);
  const sumFreq = Object.values(analytics.frequencies).reduce((a, b) => a + b, 0);

  if (resStr === expStr && resZeros === expZeros && sumFreq === analytics.digitCount) {
    factPass++;
  }
}
console.log(`Factorial + Trailing Zeros: ${factPass} / 201 passed`);
