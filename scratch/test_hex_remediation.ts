import {
  decodeBaseExact,
  encodeBaseExact,
  executeHexArithmetic,
  generateBaseDerivationSteps,
  formatHexFixed,
  toTwosComplementSigned,
  BitWidth,
  HexOperator
} from "../src/app/calculators/hex-calculator/hex-logic";
import { calculateHexCalculator } from "../src/app/calculators/hex-calculator/calculator";
import { runHexCalculatorTests } from "../src/app/calculators/hex-calculator/tests";

async function runRemediationVerification() {
  console.log("=== STARTING HEX CALCULATOR REMEDIATION AUDIT ===");

  let allPassed = true;

  // 1. UNIT TESTS FROM tests.ts
  try {
    const res = runHexCalculatorTests();
    console.log("✓ runHexCalculatorTests passed:", res);
  } catch (err: any) {
    console.error("✗ runHexCalculatorTests failed:", err.message);
    allPassed = false;
  }

  // 2. CARD 2 DECOUPLING TESTS (P0-01)
  console.log("\n--- Testing Card 2 Decoupled Base Conversion ---");
  const card2Tests = [
    { input: "256", fromB: 10, toB: 16, expected: "100" },
    { input: "4294967295", fromB: 10, toB: 16, expected: "FFFFFFFF" },
    { input: "FFFFFFFF", fromB: 16, toB: 10, expected: "4294967295" },
    { input: "18446744073709551615", fromB: 10, toB: 16, expected: "FFFFFFFFFFFFFFFF" },
    { input: "FFFFFFFFFFFFFFFF", fromB: 16, toB: 10, expected: "18446744073709551615" },
    { input: "FF", fromB: 16, toB: 2, expected: "11111111" },
    { input: "FF", fromB: 16, toB: 8, expected: "377" },
    { input: "10101011", fromB: 2, toB: 16, expected: "AB" },
    { input: "10101011", fromB: 2, toB: 10, expected: "171" },
    { input: "AB", fromB: 16, toB: 10, expected: "171" },
    { input: "171", fromB: 10, toB: 16, expected: "AB" },
    { input: "377", fromB: 8, toB: 16, expected: "FF" }
  ];

  for (const t of card2Tests) {
    const decVal = decodeBaseExact(t.input, t.fromB);
    const converted = encodeBaseExact(decVal, t.toB);
    if (converted !== t.expected) {
      console.error(`✗ Card 2 conversion failed for ${t.input} (Base ${t.fromB} -> ${t.toB}): expected ${t.expected}, got ${converted}`);
      allPassed = false;
    } else {
      console.log(`✓ Card 2: ${t.input} (Base ${t.fromB}) -> Base ${t.toB} = ${converted}`);
    }
  }

  // 3. LARGE INTEGER 64-BIT PRECISION & ARBITRARY BASES (P0-02)
  console.log("\n--- Testing Large Integer 64-Bit Precision ---");
  const largeHexValues = [
    "0xFFFFFFFF",
    "0xFFFFFFFFFFFFFFFF",
    "0x123456789ABCDEF0",
    "0xFEDCBA9876543210"
  ];

  for (const h of largeHexValues) {
    const val = decodeBaseExact(h, 16);
    const reEncoded = "0x" + encodeBaseExact(val, 16);
    if (reEncoded.toUpperCase() !== h.toUpperCase()) {
      console.error(`✗ Large hex round-trip failed for ${h}: got ${reEncoded}`);
      allPassed = false;
    } else {
      console.log(`✓ Large hex exact round-trip: ${h} -> ${reEncoded}`);
    }
  }

  // 1,000 Randomized round trips across bases 2..36
  console.log("\n--- Running 1,000 Randomized Base 2..36 Exact Round Trips ---");
  const bases = [2, 3, 5, 8, 10, 12, 16, 20, 24, 32, 36];
  let roundTripsPassed = 0;
  for (let i = 0; i < 1000; i++) {
    // Generate large BigInt up to 128-bit
    const high = BigInt(Math.floor(Math.random() * 0xFFFFFFFF));
    const mid = BigInt(Math.floor(Math.random() * 0xFFFFFFFF));
    const low = BigInt(Math.floor(Math.random() * 0xFFFFFFFF));
    const testVal = (high << 64n) | (mid << 32n) | low;

    const b1 = bases[Math.floor(Math.random() * bases.length)];
    const b2 = bases[Math.floor(Math.random() * bases.length)];

    const encodedB1 = encodeBaseExact(testVal, b1);
    const decodedB1 = decodeBaseExact(encodedB1, b1);
    const encodedB2 = encodeBaseExact(decodedB1, b2);
    const decodedB2 = decodeBaseExact(encodedB2, b2);

    if (decodedB2 === testVal) {
      roundTripsPassed++;
    } else {
      console.error(`✗ Round-trip failed at iteration ${i}: original ${testVal}, got ${decodedB2}`);
      allPassed = false;
      break;
    }
  }
  console.log(`✓ Arbitrary base round trips: ${roundTripsPassed}/1000 passed.`);

  // 4. LOGICAL RIGHT SHIFT `>>>` (P1-01)
  console.log("\n--- Testing Logical Right Shift (>>>) ---");
  const shiftCases = [
    { a: "80", b: "1", width: 8 as BitWidth, expected: "40" },
    { a: "FF", b: "4", width: 8 as BitWidth, expected: "0F" },
    { a: "81", b: "1", width: 8 as BitWidth, expected: "40" },
    { a: "8000", b: "1", width: 16 as BitWidth, expected: "4000" },
    { a: "80000000", b: "1", width: 32 as BitWidth, expected: "40000000" },
    { a: "80", b: "0", width: 8 as BitWidth, expected: "80" },
    { a: "80", b: "8", width: 8 as BitWidth, expected: "00" }
  ];

  for (const sc of shiftCases) {
    const res = executeHexArithmetic(sc.a, sc.b, ">>>", sc.width, false);
    if (res.hexResult !== sc.expected) {
      console.error(`✗ Logical shift failed for 0x${sc.a} >>> ${sc.b} (${sc.width}-bit): expected ${sc.expected}, got ${res.hexResult}`);
      allPassed = false;
    } else {
      console.log(`✓ 0x${sc.a} >>> ${sc.b} (${sc.width}-bit) = 0x${res.hexResult}`);
    }
  }

  // 5. HARDWARE REGISTER FLAGS & OVERFLOW (P1-02)
  console.log("\n--- Testing Carry, Borrow, Overflow & Mathematical Separation ---");

  // 8-bit unsigned: 0xFF + 0x01
  {
    const r = executeHexArithmetic("FF", "01", "+", 8, false);
    const ok = r.mathematicalResult === 256n && r.hexResult === "00" && r.carryOut === 1 && r.unsignedOverflow === true;
    if (!ok) {
      console.error("✗ 8-bit unsigned 0xFF + 0x01 failed:", r);
      allPassed = false;
    } else {
      console.log("✓ 8-bit unsigned 0xFF + 0x01: math=256, reg=0x00, carryOut=1, unsignedOverflow=true");
    }
  }

  // 8-bit signed: 0x7F + 0x01
  {
    const r = executeHexArithmetic("7F", "01", "+", 8, true);
    const ok = r.mathematicalResult === 128n && r.hexResult === "80" && r.decResult === "-128" && r.signedOverflow === true;
    if (!ok) {
      console.error("✗ 8-bit signed 0x7F + 0x01 failed:", r);
      allPassed = false;
    } else {
      console.log("✓ 8-bit signed 0x7F + 0x01: math=128, reg=0x80, signedDec=-128, signedOverflow=true");
    }
  }

  // 8-bit signed: 0x00 - 0x01
  {
    const r = executeHexArithmetic("00", "01", "-", 8, true);
    const ok = r.mathematicalResult === -1n && r.hexResult === "FF" && r.borrowOut === 1 && r.signedDecResult === "-1" && r.unsignedDecResult === "255";
    if (!ok) {
      console.error("✗ 8-bit 0x00 - 0x01 failed:", r);
      allPassed = false;
    } else {
      console.log("✓ 8-bit 0x00 - 0x01: math=-1, reg=0xFF, borrow=1, signedDec=-1, unsignedDec=255");
    }
  }

  // 64-bit addition: 0xFFFFFFFFFFFFFFFF + 0x1
  {
    const r = executeHexArithmetic("FFFFFFFFFFFFFFFF", "1", "+", 64, false);
    const ok = r.mathematicalResult === 18446744073709551616n && r.hexResult === "0000000000000000" && r.carryOut === 1 && r.unsignedOverflow === true;
    if (!ok) {
      console.error("✗ 64-bit addition failed:", r);
      allPassed = false;
    } else {
      console.log("✓ 64-bit addition 0xFFFFFFFFFFFFFFFF + 1: math=0x10000000000000000, reg=0x0000000000000000, carryOut=1");
    }
  }

  // 6. 5,000 RANDOMIZED ARITHMETIC PROPERTY TRIALS (ORACLE AUDIT)
  console.log("\n--- Running 5,000 Randomized Arithmetic Property Trials ---");
  const ops: HexOperator[] = ["+", "-", "*", "/", "MOD", "AND", "OR", "XOR", "NOT", "<<", ">>", ">>>"];
  const testWidths: BitWidth[] = [8, 16, 32, 64];
  let randomPassed = 0;

  for (let i = 0; i < 5000; i++) {
    const w = testWidths[i % testWidths.length];
    const mask = (1n << BigInt(w)) - 1n;
    const op = ops[i % ops.length];
    const isS = (i % 2) === 0;

    const rA = BigInt(Math.floor(Math.random() * 0xFFFFFF)) & mask;
    const rB = (BigInt(Math.floor(Math.random() * 0xFFFFFF)) + 1n) & mask; // non-zero for div/mod

    const res = executeHexArithmetic(rA.toString(16), rB.toString(16), op, w, isS);

    // Verify against independent oracle
    let oracleReg = 0n;
    if (op === "+") oracleReg = (rA + rB) & mask;
    else if (op === "-") oracleReg = ((rA - rB) % (1n << BigInt(w)) + (1n << BigInt(w))) & mask;
    else if (op === "*") oracleReg = (rA * rB) & mask;
    else if (op === "/") {
      if (isS) {
        const sA = toTwosComplementSigned(rA, w);
        const sB = toTwosComplementSigned(rB, w);
        if (sB === 0n) continue;
        const signedMin = -(1n << BigInt(w - 1));
        if (sA === signedMin && sB === -1n) {
          oracleReg = rA;
        } else {
          const sQ = sA / sB;
          oracleReg = (sQ + (1n << BigInt(w))) & mask;
        }
      } else {
        oracleReg = (rA / rB) & mask;
      }
    }
    else if (op === "MOD") {
      if (isS) {
        const sA = toTwosComplementSigned(rA, w);
        const sB = toTwosComplementSigned(rB, w);
        if (sB === 0n) continue;
        const sRem = sA % sB;
        oracleReg = (sRem + (1n << BigInt(w))) & mask;
      } else {
        oracleReg = (rA % rB) & mask;
      }
    }
    else if (op === "AND") oracleReg = (rA & rB) & mask;
    else if (op === "OR") oracleReg = (rA | rB) & mask;
    else if (op === "XOR") oracleReg = (rA ^ rB) & mask;
    else if (op === "NOT") oracleReg = (~rA) & mask;
    else if (op === "<<") {
      const shift = rB > BigInt(w) ? BigInt(w) : rB;
      oracleReg = (rA << shift) & mask;
    } else if (op === ">>") {
      const shift = rB > BigInt(w) ? BigInt(w) : rB;
      if (isS) {
        const sA = toTwosComplementSigned(rA, w);
        oracleReg = ((sA >> shift) + (1n << BigInt(w))) & mask;
      } else {
        oracleReg = (rA >> shift) & mask;
      }
    } else if (op === ">>>") {
      const shift = rB > BigInt(w) ? BigInt(w) : rB;
      oracleReg = (rA >> shift) & mask;
    }

    if (res.registerResult === oracleReg) {
      randomPassed++;
    } else {
      console.error(`✗ Randomized test failed at i=${i}, op=${op}, w=${w}: expected ${oracleReg.toString(16)}, got ${res.registerResult.toString(16)}`);
      allPassed = false;
      break;
    }
  }

  console.log(`✓ 5,000 Randomized trials passed: ${randomPassed}/5000`);

  // 7. ALL 26 GOLDEN CASES TABLE VERIFICATION
  console.log("\n--- Verifying All 26 Golden Cases (TC-HEX-01 through TC-HEX-26) ---");
  const goldenSuite = [
    { id: "TC-HEX-01", a: "8AB", b: "B78", op: "+" as HexOperator, w: 16 as BitWidth, s: false, expHex: "1423", expDec: "5155" },
    { id: "TC-HEX-02", a: "FF", b: "0", op: "NOT" as HexOperator, w: 8 as BitWidth, s: false, check: decodeBaseExact("FF", 16).toString() === "255" },
    { id: "TC-HEX-03", a: "FF", b: "0", op: "NOT" as HexOperator, w: 8 as BitWidth, s: false, check: encodeBaseExact(255n, 16) === "FF" },
    { id: "TC-HEX-04", a: "FF", b: "01", op: "+" as HexOperator, w: 8 as BitWidth, s: false, expHex: "00", expCarry: 1, expOverflow: true },
    { id: "TC-HEX-05", a: "10", b: "01", op: "-" as HexOperator, w: 8 as BitWidth, s: false, expHex: "0F", expDec: "15" },
    { id: "TC-HEX-06", a: "00", b: "01", op: "-" as HexOperator, w: 8 as BitWidth, s: true, expHex: "FF", expDec: "-1", expBorrow: 1 },
    { id: "TC-HEX-07", a: "0F", b: "10", op: "*" as HexOperator, w: 8 as BitWidth, s: false, expHex: "F0", expDec: "240" },
    { id: "TC-HEX-08", a: "FF", b: "0F", op: "/" as HexOperator, w: 8 as BitWidth, s: false, expHex: "11", expDec: "17" },
    { id: "TC-HEX-09", a: "0D", b: "05", op: "MOD" as HexOperator, w: 8 as BitWidth, s: false, expHex: "03", expDec: "3" },
    { id: "TC-HEX-10", a: "10", b: "00", op: "MOD" as HexOperator, w: 8 as BitWidth, s: false, expError: "Modulo by zero is undefined." },
    { id: "TC-HEX-11", a: "CC", b: "AA", op: "AND" as HexOperator, w: 8 as BitWidth, s: false, expHex: "88" },
    { id: "TC-HEX-12", a: "CC", b: "AA", op: "OR" as HexOperator, w: 8 as BitWidth, s: false, expHex: "EE" },
    { id: "TC-HEX-13", a: "CC", b: "AA", op: "XOR" as HexOperator, w: 8 as BitWidth, s: false, expHex: "66" },
    { id: "TC-HEX-14", a: "0F", b: "0", op: "NOT" as HexOperator, w: 8 as BitWidth, s: false, expHex: "F0" },
    { id: "TC-HEX-15", a: "05", b: "1", op: "<<" as HexOperator, w: 8 as BitWidth, s: false, expHex: "0A" },
    { id: "TC-HEX-16", a: "80", b: "1", op: ">>" as HexOperator, w: 8 as BitWidth, s: false, expHex: "40" },
    { id: "TC-HEX-17", a: "7F", b: "0", op: "NOT" as HexOperator, w: 8 as BitWidth, s: true, check: toTwosComplementSigned(0x7Fn, 8) === 127n && toTwosComplementSigned(0x80n, 8) === -128n && toTwosComplementSigned(0xFFn, 8) === -1n },
    { id: "TC-HEX-18", a: "5", b: "8", op: "-" as HexOperator, w: 8 as BitWidth, s: true, expHex: "FD", expDec: "-3" },
    { id: "TC-HEX-19", a: "7F", b: "01", op: "+" as HexOperator, w: 8 as BitWidth, s: true, expHex: "80", expDec: "-128", expOverflow: true },
    { id: "TC-HEX-20", a: "FF", b: "01", op: "+" as HexOperator, w: 8 as BitWidth, s: false, expHex: "00", expCarry: 1, expOverflow: true },
    { id: "TC-HEX-21", a: "00", b: "00", op: "+" as HexOperator, w: 8 as BitWidth, s: false, expHex: "00", expDec: "0" },
    { id: "TC-HEX-22", a: "FFFFFFFF", b: "0", op: "NOT" as HexOperator, w: 32 as BitWidth, s: false, check: decodeBaseExact("FFFFFFFF", 16).toString() === "4294967295" },
    { id: "TC-HEX-23", a: "FFFFFFFFFFFFFFFF", b: "0", op: "NOT" as HexOperator, w: 64 as BitWidth, s: false, check: decodeBaseExact("FFFFFFFFFFFFFFFF", 16).toString() === "18446744073709551615" },
    { id: "TC-HEX-24", a: "FFFFFFFFFFFFFFFF", b: "1", op: "+" as HexOperator, w: 64 as BitWidth, s: false, expHex: "0000000000000000", expCarry: 1 },
    { id: "TC-HEX-25", a: "000000FF", b: "0", op: "NOT" as HexOperator, w: 32 as BitWidth, s: false, check: formatHexFixed(0xFFn, 32) === "000000FF" },
    { id: "TC-HEX-26", a: "123456789ABCDEF0", b: "0", op: "NOT" as HexOperator, w: 64 as BitWidth, s: false, check: formatHexFixed(0x123456789ABCDEF0n, 8) === "F0" && formatHexFixed(0x123456789ABCDEF0n, 16) === "DEF0" && formatHexFixed(0x123456789ABCDEF0n, 32) === "9ABCDEF0" }
  ];

  let goldenPassed = 0;
  for (const gc of goldenSuite) {
    if (gc.check !== undefined) {
      if (gc.check) {
        goldenPassed++;
      } else {
        console.error(`✗ Golden case ${gc.id} failed custom check`);
        allPassed = false;
      }
      continue;
    }

    const r = executeHexArithmetic(gc.a, gc.b, gc.op, gc.w, gc.s);
    if (gc.expError) {
      if (r.error === gc.expError) {
        goldenPassed++;
      } else {
        console.error(`✗ Golden case ${gc.id} failed error check: expected '${gc.expError}', got '${r.error}'`);
        allPassed = false;
      }
      continue;
    }

    let ok = true;
    if (gc.expHex && r.hexResult !== gc.expHex) ok = false;
    if (gc.expDec && r.decResult !== gc.expDec) ok = false;
    if (gc.expCarry !== undefined && r.carryOut !== gc.expCarry) ok = false;
    if (gc.expBorrow !== undefined && r.borrowOut !== gc.expBorrow) ok = false;
    if (gc.expOverflow !== undefined && (r.unsignedOverflow || r.signedOverflow) !== gc.expOverflow) ok = false;

    if (ok) {
      goldenPassed++;
    } else {
      console.error(`✗ Golden case ${gc.id} failed:`, r);
      allPassed = false;
    }
  }

  console.log(`✓ Golden cases passed: ${goldenPassed}/${goldenSuite.length}`);

  if (allPassed) {
    console.log("\n=======================================================");
    console.log(">>> ALL AUDIT CHECKS PASSED WITH ZERO DEFECTS! <<<");
    console.log("=======================================================");
  } else {
    console.error("\n>>> SOME AUDIT CHECKS FAILED! <<<");
  }
}

runRemediationVerification();
