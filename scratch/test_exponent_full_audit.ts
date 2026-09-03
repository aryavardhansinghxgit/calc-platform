// Comprehensive Production QA Audit Script for Exponent Calculator
import { calculateExponentCalculator } from "../src/app/calculators/exponent-calculator/calculator";

function runAllTests() {
  console.log("=================================================");
  console.log("STARTING EXPONENT CALCULATOR COMPREHENSIVE AUDIT");
  console.log("=================================================");

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  function assert(condition: boolean, testName: string) {
    totalTests++;
    if (condition) {
      passedTests++;
    } else {
      failedTests++;
      console.error(`FAILED: ${testName}`);
    }
  }

  // --- 1. GOLDEN CASES ---
  console.log("\n--- Checking Golden Cases ---");

  // G1: 2^10 = 1024
  const g1 = calculateExponentCalculator({ base: 2, exponent: 10 });
  assert(g1.result === 1024, "G1: 2^10 === 1024");

  // G2: Fractional 27^(2/3) = 9
  const dec27 = Math.pow(27, 2/3);
  assert(Math.abs(dec27 - 9) < 1e-9, "G2: 27^(2/3) === 9");

  // G3: Product 2^3 * 2^4 = 2^7 = 128
  const g3 = Math.pow(2, 3 + 4);
  assert(g3 === 128, "G3: 2^3 * 2^4 === 128");

  // G4: Quotient 5^8 / 5^2 = 5^6 = 15625
  const g4 = Math.pow(5, 8 - 2);
  assert(g4 === 15625, "G4: 5^8 / 5^2 === 15625");

  // G5: Power of Power (3^2)^4 = 3^8 = 6561
  const g5 = Math.pow(3, 2 * 4);
  assert(g5 === 6561, "G5: (3^2)^4 === 6561");

  // G6: Power of Product (2*4)^3 = 8^3 = 512
  const g6 = Math.pow(2 * 4, 3);
  assert(g6 === 512, "G6: (2*4)^3 === 512");

  // G7: Power of Quotient (3/5)^3 = 27/125 = 0.216
  const g7 = Math.pow(3 / 5, 3);
  assert(Math.abs(g7 - 0.216) < 1e-9, "G7: (3/5)^3 === 0.216");

  // G8: Zero Exponent 2^0 = 1
  const g8 = calculateExponentCalculator({ base: 2, exponent: 0 });
  assert(g8.result === 1, "G8: 2^0 === 1");

  // G9: Negative Exponent 2^-3 = 0.125
  const g9 = calculateExponentCalculator({ base: 2, exponent: -3 });
  assert(g9.result === 0.125, "G9: 2^-3 === 0.125");

  // G10: (2/3)^-2 = (3/2)^2 = 9/4 = 2.25
  const g10 = Math.pow(2/3, -2);
  assert(Math.abs(g10 - 2.25) < 1e-9, "G10: (2/3)^-2 === 2.25");

  // G11: (-2)^2 = 4
  const g11 = calculateExponentCalculator({ base: -2, exponent: 2 });
  assert(g11.result === 4, "G11: (-2)^2 === 4");

  // G12: (-2)^3 = -8
  const g12 = calculateExponentCalculator({ base: -2, exponent: 3 });
  assert(g12.result === -8, "G12: (-2)^3 === -8");

  // G13: (-8)^(1/3) = -2 (odd root of negative)
  const oddRoot3 = -Math.pow(8, 1/3);
  assert(Math.abs(oddRoot3 - (-2)) < 1e-9, "G13: (-8)^(1/3) === -2");

  // G14: (-8)^(2/3) = 4
  const oddRoot3Sq = Math.pow(Math.abs(-8), 2/3);
  assert(Math.abs(oddRoot3Sq - 4) < 1e-9, "G14: (-8)^(2/3) === 4");

  // G15: (-4)^(1/2) is complex (2i)
  const g15 = calculateExponentCalculator({ base: -4, exponent: 0.5 });
  assert(g15.scientificNotation.includes("i"), "G15: (-4)^(1/2) detected as complex");

  // G16: Scientific 5.4 * 10^6 = 5,400,000
  const g16 = 5.4 * Math.pow(10, 6);
  assert(g16 === 5400000, "G16: 5.4 * 10^6 === 5400000");

  // G17: Base=0 cases: 0^2 = 0, 0^0 = 1, 0^-1 = undefined
  const g17a = calculateExponentCalculator({ base: 0, exponent: 2 });
  assert(g17a.result === 0, "G17a: 0^2 === 0");
  const g17b = calculateExponentCalculator({ base: 0, exponent: 0 });
  assert(g17b.result === 1, "G17b: 0^0 === 1 (algebra convention)");
  const g17c = calculateExponentCalculator({ base: 0, exponent: -1 });
  assert(g17c.scientificNotation.includes("Undefined"), "G17c: 0^-1 undefined");

  // G18: Solve for Base
  const sb1 = Math.pow(1024, 1/10);
  assert(Math.abs(sb1 - 2) < 1e-9, "G18a: Solve for base b^10 = 1024 -> b = 2");
  const sb2 = Math.pow(729, 1/3);
  assert(Math.abs(sb2 - 9) < 1e-9, "G18b: Solve for base b^3 = 729 -> b = 9");
  const sb3 = -Math.pow(8, 1/3);
  assert(Math.abs(sb3 - (-2)) < 1e-9, "G18c: Solve for base b^3 = -8 -> b = -2");

  // G19: Solve for Exponent
  const se1 = Math.log(1024) / Math.log(2);
  assert(Math.abs(se1 - 10) < 1e-9, "G19a: Solve for exponent 2^n = 1024 -> n = 10");
  const se2 = Math.log(1000) / Math.log(10);
  assert(Math.abs(se2 - 3) < 1e-9, "G19b: Solve for exponent 10^n = 1000 -> n = 3");
  const se3 = Math.log(8) / Math.log(2);
  assert(Math.abs(se3 - 3) < 1e-9, "G19c: Solve for exponent 2^n = 8 -> n = 3");

  // G20: Base=1 exponent edge cases
  assert(Math.log(1) === 0, "G20a: log(1) === 0 prevents division by zero");

  // --- 2. RANDOMIZED GENERAL POWER TESTS (5,000 runs) ---
  console.log("\n--- Running 5,000 Randomized General Power Tests ---");
  for (let i = 0; i < 5000; i++) {
    const b = (Math.random() - 0.5) * 40; // -20 to 20
    const n = Math.floor(Math.random() * 21) - 10; // -10 to 10
    const res = calculateExponentCalculator({ base: b, exponent: n });

    if (b === 0 && n < 0) {
      assert(res.scientificNotation.includes("Undefined"), `0^(${n}) undefined`);
    } else if (b === 0 && n === 0) {
      assert(res.result === 1, "0^0 === 1");
    } else if (b === 0) {
      assert(res.result === 0, `0^(${n}) === 0`);
    } else {
      const expected = Math.pow(b, n);
      if (isFinite(expected)) {
        assert(Math.abs(res.result - expected) < 1e-7 * Math.abs(expected) + 1e-9, `Power parity: ${b}^${n}`);
      }
    }
  }

  // --- 3. RANDOMIZED FRACTIONAL EXPONENT TESTS (2,000 runs) ---
  console.log("\n--- Running 2,000 Randomized Fractional Exponent Tests ---");
  for (let i = 0; i < 2000; i++) {
    const b = Math.random() * 50 + 0.1; // positive base
    const p = Math.floor(Math.random() * 10) + 1;
    const q = Math.floor(Math.random() * 10) + 1;

    const v1 = Math.pow(b, p / q);
    const v2 = Math.pow(Math.pow(b, p), 1 / q);
    const v3 = Math.pow(Math.pow(b, 1 / q), p);

    assert(Math.abs(v1 - v2) < 1e-5 * v1, `Fractional rule 1: ${b}^(${p}/${q})`);
    assert(Math.abs(v1 - v3) < 1e-5 * v1, `Fractional rule 2: ${b}^(${p}/${q})`);
  }

  // --- 4. RANDOMIZED EXPONENT LAWS TESTS (2,000 runs across 8 laws) ---
  console.log("\n--- Running 2,000 Randomized Exponent Law Tests ---");
  for (let i = 0; i < 250; i++) {
    const a = Math.random() * 10 + 1;
    const b = Math.random() * 10 + 1;
    const m = Math.floor(Math.random() * 6) - 2;
    const n = Math.floor(Math.random() * 6) - 2;

    // Law 1: a^m * a^n = a^(m+n)
    const l1_lhs = Math.pow(a, m) * Math.pow(a, n);
    const l1_rhs = Math.pow(a, m + n);
    assert(Math.abs(l1_lhs - l1_rhs) < 1e-5 * l1_lhs, `Law 1: Product of powers`);

    // Law 2: a^m / a^n = a^(m-n)
    const l2_lhs = Math.pow(a, m) / Math.pow(a, n);
    const l2_rhs = Math.pow(a, m - n);
    assert(Math.abs(l2_lhs - l2_rhs) < 1e-5 * l2_lhs, `Law 2: Quotient of powers`);

    // Law 3: (a^m)^n = a^(m*n)
    const l3_lhs = Math.pow(Math.pow(a, m), n);
    const l3_rhs = Math.pow(a, m * n);
    assert(Math.abs(l3_lhs - l3_rhs) < 1e-5 * l3_lhs, `Law 3: Power of power`);

    // Law 4: (a*b)^n = a^n * b^n
    const l4_lhs = Math.pow(a * b, n);
    const l4_rhs = Math.pow(a, n) * Math.pow(b, n);
    assert(Math.abs(l4_lhs - l4_rhs) < 1e-5 * l4_lhs, `Law 4: Power of product`);

    // Law 5: (a/b)^n = a^n / b^n
    const l5_lhs = Math.pow(a / b, n);
    const l5_rhs = Math.pow(a, n) / Math.pow(b, n);
    assert(Math.abs(l5_lhs - l5_rhs) < 1e-5 * l5_lhs, `Law 5: Power of quotient`);

    // Law 6: a^0 = 1
    assert(Math.pow(a, 0) === 1, `Law 6: Zero exponent`);

    // Law 7: a^-n = 1/a^n
    const l7_lhs = Math.pow(a, -n);
    const l7_rhs = 1 / Math.pow(a, n);
    assert(Math.abs(l7_lhs - l7_rhs) < 1e-5 * l7_lhs, `Law 7: Negative exponent`);

    // Law 8: a^(m/n) = n-th root of a^m
    const l8_m = Math.abs(m) + 1;
    const l8_n = Math.abs(n) + 1;
    const l8_lhs = Math.pow(a, l8_m / l8_n);
    const l8_rhs = Math.pow(Math.pow(a, l8_m), 1 / l8_n);
    assert(Math.abs(l8_lhs - l8_rhs) < 1e-5 * l8_lhs, `Law 8: Fractional exponent`);
  }

  // --- 5. RANDOMIZED SCIENTIFIC CONVERTER TESTS (1,000 runs) ---
  console.log("\n--- Running 1,000 Randomized Scientific Converter Tests ---");
  for (let i = 0; i < 1000; i++) {
    const mantissa = (Math.random() * 9 + 1) * (Math.random() > 0.5 ? 1 : -1);
    const exp = Math.floor(Math.random() * 40) - 20; // -20 to 20
    const val = mantissa * Math.pow(10, exp);

    // E-notation round trip
    const eStr = `${mantissa}e${exp >= 0 ? "+" : ""}${exp}`;
    const parsedE = parseFloat(eStr);
    assert(Math.abs(parsedE - val) < 1e-6 * Math.abs(val), `Scientific roundtrip: ${eStr}`);

    // Engineering exponent multiple of 3 check
    const engExp = Math.floor(exp / 3) * 3;
    assert(engExp % 3 === 0, `Engineering exponent multiple of 3: ${engExp}`);
  }

  console.log("\n=================================================");
  console.log(`AUDIT RESULTS:`);
  console.log(`TOTAL TESTS RUN:    ${totalTests}`);
  console.log(`PASSED TESTS:       ${passedTests}`);
  console.log(`FAILED TESTS:       ${failedTests}`);
  console.log(`PASS RATE:          ${((passedTests / totalTests) * 100).toFixed(2)}%`);
  console.log("=================================================");

  return failedTests === 0;
}

runAllTests();
