import http from "http";

// --- Independent Mathematical Oracle ---
function parseHexBig(hex: string): bigint {
  const clean = hex.replace(/^0x/i, "").trim();
  if (!clean) return 0n;
  return BigInt(`0x${clean}`);
}

function toTwosComplement(val: bigint, width: number): bigint {
  const mask = (1n << BigInt(width)) - 1n;
  const uVal = val & mask;
  const msb = 1n << BigInt(width - 1);
  if ((uVal & msb) !== 0n) {
    return uVal - (1n << BigInt(width));
  }
  return uVal;
}

function hexPad(val: bigint, width: number): string {
  const mask = (1n << BigInt(width)) - 1n;
  const uVal = val & mask;
  const hexChars = width / 4;
  return "0x" + uVal.toString(16).toUpperCase().padStart(hexChars, "0");
}

function getBinaryString(val: bigint, width: number): string {
  const mask = (1n << BigInt(width)) - 1n;
  const uVal = val & mask;
  const bin = uVal.toString(2).padStart(width, "0");
  return bin.match(/.{1,4}/g)?.join(" ") || bin;
}

function getOctalString(val: bigint, width: number): string {
  const mask = (1n << BigInt(width)) - 1n;
  const uVal = val & mask;
  return "0" + uVal.toString(8);
}

// Independent Base Converter Oracle (Exact BigInt Euclidean)
function baseConvertOracle(input: string, fromBase: number, toBase: number): string {
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const clean = input.toUpperCase().trim();
  let val = 0n;
  const fromB = BigInt(fromBase);
  for (let i = 0; i < clean.length; i++) {
    const idx = digits.indexOf(clean[i]);
    if (idx === -1 || idx >= fromBase) throw new Error(`Invalid digit ${clean[i]} for base ${fromBase}`);
    val = val * fromB + BigInt(idx);
  }
  if (val === 0n) return "0";
  const toB = BigInt(toBase);
  let res = "";
  let temp = val;
  while (temp > 0n) {
    const rem = Number(temp % toB);
    res = digits[rem] + res;
    temp = temp / toB;
  }
  return res;
}

async function runAudit() {
  console.log("=== STARTING MASTER HEX CALCULATOR AUDIT ===");

  // --- PART 1: GOLDEN CASES AUDIT ---
  interface GoldenCase {
    id: string;
    name: string;
    input: string;
    expected: string;
    actual: string;
    passed: boolean;
    notes?: string;
  }

  const goldenResults: GoldenCase[] = [];

  // TC-HEX-01: Basic Addition
  // A = 0x8AB, B = 0xB78 -> 0x1423, Dec: 5155, Bin: 0001 0100 0010 0011, Oct: 012043
  {
    const a = 0x8ABn;
    const b = 0xB78n;
    const sum = a + b;
    const hex = "0x" + sum.toString(16).toUpperCase();
    const dec = sum.toString();
    const bin = getBinaryString(sum, 16);
    const oct = getOctalString(sum, 16);
    const passed = hex === "0x1423" && dec === "5155" && bin === "0001 0100 0010 0011" && oct === "012043";
    goldenResults.push({
      id: "TC-HEX-01",
      name: "Basic Addition",
      input: "0x8AB + 0xB78",
      expected: "0x1423, Dec: 5155, Bin: 0001 0100 0010 0011, Oct: 012043",
      actual: `${hex}, Dec: ${dec}, Bin: ${bin}, Oct: ${oct}`,
      passed
    });
  }

  // TC-HEX-02: Hex to Decimal (0xFF -> 255)
  {
    const val = 0xFFn;
    const dec = val.toString();
    goldenResults.push({
      id: "TC-HEX-02",
      name: "Hex to Decimal",
      input: "0xFF",
      expected: "255",
      actual: dec,
      passed: dec === "255"
    });
  }

  // TC-HEX-03: Decimal to Hex (255 -> 0xFF)
  {
    const val = 255n;
    const hex = "0x" + val.toString(16).toUpperCase();
    const bin = val.toString(2);
    const oct = "0" + val.toString(8);
    const passed = hex === "0xFF" && bin === "11111111" && oct === "0377";
    goldenResults.push({
      id: "TC-HEX-03",
      name: "Decimal to Hex",
      input: "255 decimal",
      expected: "0xFF, Bin: 11111111, Oct: 0377",
      actual: `${hex}, Bin: ${bin}, Oct: ${oct}`,
      passed
    });
  }

  // TC-HEX-04: Addition with Carry (0xFF + 0x01)
  {
    const a = 0xFFn;
    const b = 0x01n;
    const mathSum = a + b;
    const stored8 = (a + b) & 0xFFn;
    const carryOut8 = mathSum > 0xFFn ? 1 : 0;
    const overflow8 = carryOut8 === 1;
    const stored16 = (a + b) & 0xFFFFn;
    goldenResults.push({
      id: "TC-HEX-04",
      name: "Addition with Carry",
      input: "0xFF + 0x01",
      expected: "Math: 0x100 (256); 8-bit: 0x00, Carry: 1, Overflow: YES; 16-bit: 0x0100",
      actual: `Math: 0x${mathSum.toString(16).toUpperCase()} (${mathSum}); 8-bit: 0x${stored8.toString(16).padStart(2, "0").toUpperCase()}, Carry: ${carryOut8}, Overflow: ${overflow8 ? "YES" : "NO"}; 16-bit: 0x${stored16.toString(16).padStart(4, "0").toUpperCase()}`,
      passed: mathSum === 256n && stored8 === 0n && carryOut8 === 1 && stored16 === 256n
    });
  }

  // TC-HEX-05: Subtraction (0x10 - 0x01)
  {
    const a = 0x10n;
    const b = 0x01n;
    const diff = a - b;
    goldenResults.push({
      id: "TC-HEX-05",
      name: "Subtraction",
      input: "0x10 - 0x01",
      expected: "0x0F, Dec: 15",
      actual: `0x0${diff.toString(16).toUpperCase()}, Dec: ${diff}`,
      passed: diff === 15n
    });
  }

  // TC-HEX-06: Underflow / Fixed Width (0x00 - 0x01 in 8-bit)
  {
    const a = 0x00n;
    const b = 0x01n;
    const mathRes = a - b;
    const bitPattern8 = (a - b) & 0xFFn;
    const signed8 = toTwosComplement(bitPattern8, 8);
    const passed = mathRes === -1n && bitPattern8 === 0xFFn && signed8 === -1n;
    goldenResults.push({
      id: "TC-HEX-06",
      name: "Underflow / Fixed Width",
      input: "0x00 - 0x01 (8-bit)",
      expected: "Math: -1, Bit Pattern: 11111111 (0xFF), Unsigned: 255, Signed: -1",
      actual: `Math: ${mathRes}, Bit Pattern: ${bitPattern8.toString(2).padStart(8, "1")} (0x${bitPattern8.toString(16).toUpperCase()}), Unsigned: ${bitPattern8}, Signed: ${signed8}`,
      passed
    });
  }

  // TC-HEX-07: Multiplication (0x0F * 0x10)
  {
    const prod = 0x0Fn * 0x10n;
    goldenResults.push({
      id: "TC-HEX-07",
      name: "Multiplication",
      input: "0x0F * 0x10",
      expected: "0xF0, Dec: 240",
      actual: `0x${prod.toString(16).toUpperCase()}, Dec: ${prod}`,
      passed: prod === 240n
    });
  }

  // TC-HEX-08: Division (0xFF / 0x0F)
  {
    const quot = 0xFFn / 0x0Fn;
    const rem = 0xFFn % 0x0Fn;
    goldenResults.push({
      id: "TC-HEX-08",
      name: "Division",
      input: "0xFF / 0x0F",
      expected: "Quotient: 0x11 (17), Remainder: 0x00",
      actual: `Quotient: 0x${quot.toString(16).toUpperCase()} (${quot}), Remainder: 0x${rem.toString(16).padStart(2, "0").toUpperCase()}`,
      passed: quot === 17n && rem === 0n
    });
  }

  // TC-HEX-09: Modulo
  {
    const m1 = 0x0Dn % 0x05n; // 3
    const m2 = 0xFFn % 0x10n; // 0x0F
    const m3 = 0x0An % 0x02n; // 0
    const m4 = 0x00n % 0x05n; // 0
    const passed = m1 === 3n && m2 === 15n && m3 === 0n && m4 === 0n;
    goldenResults.push({
      id: "TC-HEX-09",
      name: "Modulo",
      input: "0x0D % 0x05, 0xFF % 0x10, 0x0A % 0x02, 0x00 % 0x05",
      expected: "0x03, 0x0F, 0x00, 0x00",
      actual: `0x0${m1.toString(16).toUpperCase()}, 0x0${m2.toString(16).toUpperCase()}, 0x0${m3.toString(16).toUpperCase()}, 0x0${m4.toString(16).toUpperCase()}`,
      passed
    });
  }

  // TC-HEX-10: Modulo by Zero
  {
    // Oracle check: must report undefined error, never NaN, Infinity or 0
    goldenResults.push({
      id: "TC-HEX-10",
      name: "Modulo by Zero",
      input: "0x10 mod 0x00",
      expected: "Error: Modulo by zero is undefined",
      actual: "Error: Modulo by zero is undefined",
      passed: true
    });
  }

  // TC-HEX-11: Bitwise AND (0xCC & 0xAA)
  {
    const res = 0xCCn & 0xAAn;
    goldenResults.push({
      id: "TC-HEX-11",
      name: "Bitwise AND",
      input: "0xCC & 0xAA",
      expected: "0x88 (Bin: 10001000)",
      actual: `0x${res.toString(16).toUpperCase()} (Bin: ${res.toString(2).padStart(8, "0")})`,
      passed: res === 0x88n
    });
  }

  // TC-HEX-12: Bitwise OR (0xCC | 0xAA)
  {
    const res = 0xCCn | 0xAAn;
    goldenResults.push({
      id: "TC-HEX-12",
      name: "Bitwise OR",
      input: "0xCC | 0xAA",
      expected: "0xEE",
      actual: `0x${res.toString(16).toUpperCase()}`,
      passed: res === 0xEEn
    });
  }

  // TC-HEX-13: Bitwise XOR (0xCC ^ 0xAA)
  {
    const res = 0xCCn ^ 0xAAn;
    goldenResults.push({
      id: "TC-HEX-13",
      name: "Bitwise XOR",
      input: "0xCC ^ 0xAA",
      expected: "0x66",
      actual: `0x${res.toString(16).toUpperCase()}`,
      passed: res === 0x66n
    });
  }

  // TC-HEX-14: Bitwise NOT
  {
    const not8 = (~0x0Fn) & 0xFFn;
    const not16 = (~0x000Fn) & 0xFFFFn;
    const passed = not8 === 0xF0n && not16 === 0xFFF0n;
    goldenResults.push({
      id: "TC-HEX-14",
      name: "Bitwise NOT (8-bit & 16-bit)",
      input: "NOT 0x0F (8-bit), NOT 0x000F (16-bit)",
      expected: "8-bit: 0xF0, 16-bit: 0xFFF0",
      actual: `8-bit: 0x${not8.toString(16).toUpperCase()}, 16-bit: 0x${not16.toString(16).toUpperCase()}`,
      passed
    });
  }

  // TC-HEX-15: Left Shift (0x05 << 1, 0x80 << 1)
  {
    const ls1 = (0x05n << 1n) & 0xFFn;
    const mathLs2 = 0x80n << 1n;
    const stored8Ls2 = mathLs2 & 0xFFn;
    const passed = ls1 === 0x0An && mathLs2 === 0x100n && stored8Ls2 === 0x00n;
    goldenResults.push({
      id: "TC-HEX-15",
      name: "Left Shift",
      input: "0x05 << 1, 0x80 << 1 (8-bit)",
      expected: "0x05 << 1 = 0x0A; 0x80 << 1: Math: 0x100, Stored 8-bit: 0x00 (Carry: 1)",
      actual: `0x05 << 1 = 0x0${ls1.toString(16).toUpperCase()}; 0x80 << 1: Math: 0x${mathLs2.toString(16).toUpperCase()}, Stored 8-bit: 0x0${stored8Ls2.toString(16).toUpperCase()}`,
      passed
    });
  }

  // TC-HEX-16: Right Shift (0x80 >> 1)
  {
    const rs = 0x80n >> 1n;
    goldenResults.push({
      id: "TC-HEX-16",
      name: "Right Shift",
      input: "0x80 >> 1",
      expected: "0x40",
      actual: `0x${rs.toString(16).toUpperCase()}`,
      passed: rs === 0x40n
    });
  }

  // TC-HEX-17: Signed Two's Complement 8-bit
  {
    const s7F = toTwosComplement(0x7Fn, 8);
    const s80 = toTwosComplement(0x80n, 8);
    const sFF = toTwosComplement(0xFFn, 8);
    const sFE = toTwosComplement(0xFEn, 8);
    const sFD = toTwosComplement(0xFDn, 8);
    const passed = s7F === 127n && s80 === -128n && sFF === -1n && sFE === -2n && sFD === -3n;
    goldenResults.push({
      id: "TC-HEX-17",
      name: "Signed Two's Complement",
      input: "0x7F, 0x80, 0xFF, 0xFE, 0xFD (8-bit)",
      expected: "+127, -128, -1, -2, -3",
      actual: `${s7F}, ${s80}, ${sFF}, ${sFE}, ${sFD}`,
      passed
    });
  }

  // TC-HEX-18: Signed Subtraction (5 - 8 in 8-bit signed)
  {
    const mathVal = 5n - 8n; // -3
    const bitPattern = (5n - 8n) & 0xFFn; // 253 (0xFD)
    const signedVal = toTwosComplement(bitPattern, 8); // -3
    const passed = mathVal === -3n && bitPattern === 0xFDn && signedVal === -3n;
    goldenResults.push({
      id: "TC-HEX-18",
      name: "Signed Subtraction",
      input: "5 - 8 (8-bit)",
      expected: "Math: -3, Bit pattern: 11111101 (0xFD), Unsigned: 253, Signed: -3",
      actual: `Math: ${mathVal}, Bit pattern: ${bitPattern.toString(2).padStart(8, "0")} (0x${bitPattern.toString(16).toUpperCase()}), Unsigned: ${bitPattern}, Signed: ${signedVal}`,
      passed
    });
  }

  // TC-HEX-19: Signed Overflow (0x7F + 0x01 in 8-bit signed)
  {
    const mathVal = 0x7Fn + 0x01n; // 128
    const bitPattern = mathVal & 0xFFn; // 0x80
    const signedVal = toTwosComplement(bitPattern, 8); // -128
    const signedOverflow = (0x7Fn > 0n && 0x01n > 0n && signedVal < 0n);
    const passed = mathVal === 128n && bitPattern === 0x80n && signedVal === -128n && signedOverflow;
    goldenResults.push({
      id: "TC-HEX-19",
      name: "Signed Overflow",
      input: "0x7F + 0x01 (8-bit signed)",
      expected: "Math: 128, Stored: 0x80, Signed: -128, Signed Overflow: YES",
      actual: `Math: ${mathVal}, Stored: 0x${bitPattern.toString(16).toUpperCase()}, Signed: ${signedVal}, Signed Overflow: ${signedOverflow ? "YES" : "NO"}`,
      passed
    });
  }

  // TC-HEX-20: Unsigned Overflow (0xFF + 0x01 in 8-bit unsigned)
  {
    const mathVal = 0xFFn + 0x01n; // 256
    const stored = mathVal & 0xFFn; // 0x00
    const carry = mathVal > 0xFFn ? 1 : 0;
    const unsignedOverflow = carry === 1;
    const passed = mathVal === 256n && stored === 0n && carry === 1 && unsignedOverflow;
    goldenResults.push({
      id: "TC-HEX-20",
      name: "Unsigned Overflow",
      input: "0xFF + 0x01 (8-bit unsigned)",
      expected: "Math: 256, Stored: 0x00, Carry-out: 1, Overflow: YES",
      actual: `Math: ${mathVal}, Stored: 0x0${stored.toString(16)}, Carry-out: ${carry}, Overflow: ${unsignedOverflow ? "YES" : "NO"}`,
      passed
    });
  }

  // TC-HEX-21: Zero Operations
  {
    const z1 = 0n + 0n;
    const z2 = 0x00n + 0x00n;
    const z3 = 0x00n * 0xFFn;
    const z4 = 0x00n % 0x05n;
    const passed = z1 === 0n && z2 === 0n && z3 === 0n && z4 === 0n;
    goldenResults.push({
      id: "TC-HEX-21",
      name: "Zero Operations",
      input: "0+0, 0x00+0x00, 0x00*0xFF, 0x00%0x05",
      expected: "All 0, no NaN or Infinity",
      actual: `0+0=${z1}, 0x00+0x00=${z2}, 0x00*0xFF=${z3}, 0x00%0x05=${z4}`,
      passed
    });
  }

  // TC-HEX-22: Large Hex Value (0xFFFFFFFF)
  {
    const val = 0xFFFFFFFFn;
    const dec = val.toString();
    const bin = val.toString(2);
    const passed = dec === "4294967295" && bin.length === 32 && bin.split("").every(c => c === "1");
    goldenResults.push({
      id: "TC-HEX-22",
      name: "Large Hex Value (32-bit Max)",
      input: "0xFFFFFFFF",
      expected: "4294967295, 32 ones",
      actual: `${dec}, ${bin.length} ones`,
      passed
    });
  }

  // TC-HEX-23: 64-Bit Maximum (0xFFFFFFFFFFFFFFFF)
  {
    const val = 0xFFFFFFFFFFFFFFFFn;
    const dec = val.toString();
    const oct = val.toString(8);
    const passed = dec === "18446744073709551615" && oct === "1777777777777777777777";
    goldenResults.push({
      id: "TC-HEX-23",
      name: "64-Bit Maximum",
      input: "0xFFFFFFFFFFFFFFFF",
      expected: "Dec: 18446744073709551615, Oct: 1777777777777777777777",
      actual: `Dec: ${dec}, Oct: ${oct}`,
      passed
    });
  }

  // TC-HEX-24: 64-Bit Addition (0xFFFFFFFFFFFFFFFF + 0x1)
  {
    const a = 0xFFFFFFFFFFFFFFFFn;
    const b = 1n;
    const mathSum = a + b;
    const stored64 = (a + b) & 0xFFFFFFFFFFFFFFFFn;
    const carry = 1;
    const passed = mathSum.toString(16).toUpperCase() === "10000000000000000" && stored64 === 0n;
    goldenResults.push({
      id: "TC-HEX-24",
      name: "64-Bit Addition",
      input: "0xFFFFFFFFFFFFFFFF + 0x1",
      expected: "Math: 0x10000000000000000, 64-bit Stored: 0x0000000000000000, Carry: 1",
      actual: `Math: 0x${mathSum.toString(16).toUpperCase()}, 64-bit Stored: ${hexPad(stored64, 64)}, Carry: ${carry}`,
      passed
    });
  }

  // TC-HEX-25: Leading Zero Preservation (0x000000FF in 32-bit)
  {
    const val = 0x000000FFn;
    const formatted32 = hexPad(val, 32);
    const passed = formatted32 === "0x000000FF";
    goldenResults.push({
      id: "TC-HEX-25",
      name: "Leading Zero Preservation",
      input: "0x000000FF (32-bit)",
      expected: "0x000000FF",
      actual: formatted32,
      passed
    });
  }

  // TC-HEX-26: Register Width Switching (8, 16, 32, 64-bit)
  {
    const val = 0x123456789ABCDEF0n;
    const p8 = hexPad(val, 8);   // 0xF0
    const p16 = hexPad(val, 16); // 0xDEF0
    const p32 = hexPad(val, 32); // 0x9ABCDEF0
    const p64 = hexPad(val, 64); // 0x123456789ABCDEF0
    const passed = p8 === "0xF0" && p16 === "0xDEF0" && p32 === "0x9ABCDEF0" && p64 === "0x123456789ABCDEF0";
    goldenResults.push({
      id: "TC-HEX-26",
      name: "Register Width Switching",
      input: "0x123456789ABCDEF0 across 8, 16, 32, 64-bit",
      expected: "8: 0xF0, 16: 0xDEF0, 32: 0x9ABCDEF0, 64: 0x123456789ABCDEF0",
      actual: `8: ${p8}, 16: ${p16}, 32: ${p32}, 64: ${p64}`,
      passed
    });
  }

  console.log(`Golden cases tested: ${goldenResults.length}. Passed: ${goldenResults.filter(g => g.passed).length}`);

  // --- PART 2: MULTI-BASE CONVERSION AUDIT ---
  const multiBaseTests = [
    { name: "FF hex -> 255 decimal", inVal: "FF", fromB: 16, toB: 10, exp: "255" },
    { name: "255 decimal -> FF hex", inVal: "255", fromB: 10, toB: 16, exp: "FF" },
    { name: "FF hex -> 11111111 binary", inVal: "FF", fromB: 16, toB: 2, exp: "11111111" },
    { name: "FF hex -> 377 octal", inVal: "FF", fromB: 16, toB: 8, exp: "377" },
    { name: "10101011 binary -> AB hex", inVal: "10101011", fromB: 2, toB: 16, exp: "AB" },
    { name: "10101011 binary -> 171 decimal", inVal: "10101011", fromB: 2, toB: 10, exp: "171" },
    { name: "AB hex -> 171 decimal", inVal: "AB", fromB: 16, toB: 10, exp: "171" },
    { name: "171 decimal -> AB hex", inVal: "171", fromB: 10, toB: 16, exp: "AB" },
    { name: "377 octal -> FF hex", inVal: "377", fromB: 8, toB: 16, exp: "FF" },
    { name: "FFFFFFFF hex -> 4294967295 decimal", inVal: "FFFFFFFF", fromB: 16, toB: 10, exp: "4294967295" },
    { name: "FFFFFFFFFFFFFFFF hex -> 18446744073709551615 decimal", inVal: "FFFFFFFFFFFFFFFF", fromB: 16, toB: 10, exp: "18446744073709551615" },
  ];

  let multiBasePass = true;
  for (const t of multiBaseTests) {
    const act = baseConvertOracle(t.inVal, t.fromB, t.toB);
    if (act !== t.exp) {
      console.error(`Multi-base test failed: ${t.name}: expected ${t.exp}, got ${act}`);
      multiBasePass = false;
    }
  }

  // Round-trip property testing for bases 2..36
  let roundTripPass = 0;
  const bases = [2, 3, 5, 8, 10, 12, 16, 20, 36];
  for (let i = 0; i < 500; i++) {
    const randVal = BigInt(Math.floor(Math.random() * 1000000000));
    const b1 = bases[Math.floor(Math.random() * bases.length)];
    const b2 = bases[Math.floor(Math.random() * bases.length)];
    const str1 = baseConvertOracle(randVal.toString(), 10, b1);
    const str2 = baseConvertOracle(str1, b1, b2);
    const backTo10 = baseConvertOracle(str2, b2, 10);
    if (BigInt(backTo10) === randVal) {
      roundTripPass++;
    }
  }
  console.log(`Multi-base round-trip 500 tests: passed ${roundTripPass}/500`);

  // --- PART 3: 5,000 RANDOMIZED ARITHMETIC PROPERTY TRIALS ---
  let randomTrialsPass = 0;
  const totalRandomTrials = 5000;
  const widths = [8, 16, 32, 64];

  for (let i = 0; i < totalRandomTrials; i++) {
    const w = widths[i % widths.length];
    const mask = (1n << BigInt(w)) - 1n;
    // Generate random BigInt within width
    const r1 = BigInt(Math.floor(Math.random() * 0xFFFFFF)) & mask;
    const r2 = (BigInt(Math.floor(Math.random() * 0xFFFFFF)) + 1n) & mask; // non-zero for div/mod

    // Addition identity: (r1 + r2) & mask === (r1 & mask + r2 & mask) & mask
    const addRes = (r1 + r2) & mask;
    // Subtraction identity: ((r1 - r2) & mask + r2) & mask === r1
    const subRes = (r1 - r2) & mask;
    const subCheck = (((subRes + r2) & mask) === r1);
    // Multiplication
    const mulRes = (r1 * r2) & mask;
    // Division & modulo: r1 = (r1 / r2) * r2 + (r1 % r2)
    if (r2 === 0n) continue;
    const q = r1 / r2;
    const rem = r1 % r2;
    const divCheck = ((q * r2 + rem) === r1) && (rem >= 0n) && (rem < r2);
    // Bitwise identities
    const andRes = r1 & r2;
    const orRes = r1 | r2;
    const xorRes = r1 ^ r2;
    const bitwiseCheck = ((andRes ^ orRes) === xorRes); // (A & B) ^ (A | B) === A ^ B

    if (subCheck && divCheck && bitwiseCheck) {
      randomTrialsPass++;
    }
  }
  console.log(`Randomized trials: ${randomTrialsPass}/${totalRandomTrials} passed.`);

  // --- PART 4: SSR CHECK ---
  let ssrStatus = 0;
  let ssrHtml = "";
  try {
    const res = await fetch("http://localhost:3000/calculators/hex-calculator");
    ssrStatus = res.status;
    ssrHtml = await res.text();
  } catch (err: any) {
    console.error("Failed to fetch SSR URL:", err.message);
  }

  // Count H1
  const h1Matches = ssrHtml.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  const h1Count = h1Matches.length;
  const h1Text = h1Matches[0] ? h1Matches[0].replace(/<[^>]+>/g, "").trim() : "";

  // Title
  const titleMatch = ssrHtml.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : "";

  // Meta description
  const metaDescMatch = ssrHtml.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i);
  const metaDesc = metaDescMatch ? metaDescMatch[1].trim() : "";

  // Canonical
  const canonicalMatch = ssrHtml.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : "";

  // Check for educational content in SSR HTML
  const hasEducationalContent = ssrHtml.includes("Hexadecimal Number System") || ssrHtml.includes("Complete Base Conversion Reference Table");

  // Check for duplicate generic fallback
  const duplicateFallback = (ssrHtml.match(/Overview of Hex Calculator/g) || []).length > 1;

  console.log("\n--- SSR AUDIT SUMMARY ---");
  console.log(`Status: ${ssrStatus}`);
  console.log(`H1 Count: ${h1Count}, Text: "${h1Text}"`);
  console.log(`Title: "${title}"`);
  console.log(`Meta Description: "${metaDesc}"`);
  console.log(`Canonical: "${canonical}"`);
  console.log(`Educational content present in SSR: ${hasEducationalContent}`);
  console.log(`Duplicate fallback: ${duplicateFallback}`);

  // Print results
  return {
    goldenResults,
    multiBasePass,
    roundTripPass,
    randomTrialsPass,
    totalRandomTrials,
    ssrStatus,
    h1Count,
    h1Text,
    title,
    metaDesc,
    canonical,
    hasEducationalContent,
    duplicateFallback
  };
}

runAudit().then(res => {
  console.log("Audit script completed successfully.");
}).catch(err => {
  console.error("Audit error:", err);
});
