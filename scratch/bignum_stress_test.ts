import {
  addBigInt,
  subtractBigInt,
  multiplyBigInt,
  divideBigInt,
  modBigInt,
  gcdBigInt,
  lcmBigInt,
  factorialBigInt,
  analyzeDigits,
  factorialTrailingZeros
} from "../src/app/calculators/big-number-calculator/big-number-logic";

function makeDigits(len: number): string {
  let s = "9";
  for (let i = 1; i < len; i++) {
    s += ((i * 7 + 3) % 10).toString();
  }
  return s;
}

const lengths = [100, 500, 1000, 5000];

for (const len of lengths) {
  console.log(`\nTesting ${len}-digit operations:`);
  const sA = makeDigits(len);
  const sB = makeDigits(Math.floor(len / 2) || 1);

  const t0 = Date.now();
  const addRes = addBigInt(sA, sB);
  const t1 = Date.now();
  const subRes = subtractBigInt(sA, sB);
  const t2 = Date.now();
  const multRes = multiplyBigInt(sA, sB);
  const t3 = Date.now();
  const divRes = divideBigInt(sA, sB);
  const t4 = Date.now();
  const modRes = modBigInt(sA, sB);
  const t5 = Date.now();

  console.log(`  Add: len=${addRes.length}, time=${t1 - t0}ms`);
  console.log(`  Sub: len=${subRes.length}, time=${t2 - t1}ms`);
  console.log(`  Mult: len=${multRes.length}, time=${t3 - t2}ms`);
  console.log(`  Div: qLen=${divRes.quotient.length}, rLen=${divRes.remainder.length}, time=${t4 - t3}ms`);
  console.log(`  Mod: rLen=${modRes.length}, time=${t5 - t4}ms`);
}

console.log("\nTesting 500! and 1000! Factorial:");
const tF0 = Date.now();
const f500 = factorialBigInt(500);
const tF1 = Date.now();
const a500 = analyzeDigits(f500);
console.log(`500!: ${a500.digitCount} digits, ${factorialTrailingZeros(500)} trailing zeros, time=${tF1 - tF0}ms`);

const tF2 = Date.now();
const f1000 = factorialBigInt(1000);
const tF3 = Date.now();
const a1000 = analyzeDigits(f1000);
console.log(`1000!: ${a1000.digitCount} digits, ${factorialTrailingZeros(1000)} trailing zeros, time=${tF3 - tF2}ms`);
