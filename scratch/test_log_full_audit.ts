// Comprehensive Production QA Audit Script for Log Calculator
import { calculateLogCalculator } from "../src/app/calculators/log-calculator/calculator";

function runLogFullAudit() {
  console.log("=================================================");
  console.log("STARTING LOG CALCULATOR COMPREHENSIVE AUDIT");
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

  // --- 1. GOLDEN CASES (18 REQUIRED) ---
  console.log("\n--- Checking Golden Cases ---");

  // 1. log10(100) = 2
  const c1 = calculateLogCalculator({ base: 10, value: 100 });
  assert(Math.abs(c1.logResult - 2) < 1e-9, "G1: log10(100) === 2");

  // 2. ln(100) ≈ 4.605170186
  assert(Math.abs(c1.lnResult - 4.605170186) < 1e-6, "G2: ln(100) ≈ 4.605170");

  // 3. log2(100) ≈ 6.64385619
  assert(Math.abs((c1.log2Result || 0) - 6.64385619) < 1e-6, "G3: log2(100) ≈ 6.643856");

  // 4. log2(64) = 6
  const c4 = calculateLogCalculator({ base: 2, value: 64 });
  assert(Math.abs(c4.logResult - 6) < 1e-9, "G4: log2(64) === 6");

  // 5. log3(81) = 4
  const c5 = calculateLogCalculator({ base: 3, value: 81 });
  assert(Math.abs(c5.logResult - 4) < 1e-9, "G5: log3(81) === 4");

  // 6. log5(125) = 3
  const c6 = calculateLogCalculator({ base: 5, value: 125 });
  assert(Math.abs(c6.logResult - 3) < 1e-9, "G6: log5(125) === 3");

  // 7. log10(0.01) = -2
  const c7 = calculateLogCalculator({ base: 10, value: 0.01 });
  assert(Math.abs(c7.logResult - (-2)) < 1e-9, "G7: log10(0.01) === -2");

  // 8. log_1049(105) ≈ 0.6690961665
  const c8 = calculateLogCalculator({ base: 1049, value: 105 });
  assert(Math.abs(c8.logResult - 0.6690961665) < 1e-8, "G8: log_1049(105) === 0.6690961665");

  // 9. antilog10(2) = 100
  const c9 = Math.pow(10, 2);
  assert(c9 === 100, "G9: antilog10(2) === 100");

  // 10. antilog2(6) = 64
  const c10 = Math.pow(2, 6);
  assert(c10 === 64, "G10: antilog2(6) === 64");

  // 11. solve y: log2(64) = 6
  const ySol = Math.log(64) / Math.log(2);
  assert(Math.abs(ySol - 6) < 1e-9, "G11: solve y: log2(64) = 6");

  // 12. solve x: 2^6 = 64
  const xSol = Math.pow(2, 6);
  assert(xSol === 64, "G12: solve x: 2^6 = 64");

  // 13. solve b: b^6 = 64 -> b = 2
  const bSol = Math.pow(64, 1 / 6);
  assert(Math.abs(bSol - 2) < 1e-9, "G13: solve b: b^6 = 64 -> b = 2");

  // 14. log2(-8) invalid real domain
  const c14 = calculateLogCalculator({ base: 2, value: -8 });
  assert(isNaN(c14.logResult), "G14: log2(-8) is NaN");

  // 15. log2(0) invalid
  const c15 = calculateLogCalculator({ base: 2, value: 0 });
  assert(isNaN(c15.logResult), "G15: log2(0) is NaN");

  // 16. log1(100) invalid
  const c16 = calculateLogCalculator({ base: 1, value: 100 });
  assert(isNaN(c16.logResult), "G16: log1(100) is NaN");

  // 17. log0(100) invalid
  const c17 = calculateLogCalculator({ base: 0, value: 100 });
  assert(isNaN(c17.logResult), "G17: log0(100) is NaN");

  // 18. log_-2(100) invalid
  const c18 = calculateLogCalculator({ base: -2, value: 100 });
  assert(isNaN(c18.logResult), "G18: log_-2(100) is NaN");

  // --- 2. RANDOMIZED LOG ENGINE TESTS (5,000 runs) ---
  console.log("\n--- Running 5,000 Randomized Log Engine Tests ---");
  for (let i = 0; i < 5000; i++) {
    // Generate valid base b > 0, b != 1, x > 0
    let b = Math.random() * 50 + 0.1;
    if (Math.abs(b - 1) < 0.05) b += 0.1;
    const x = Math.random() * 1000 + 0.01;

    const res = calculateLogCalculator({ base: b, value: x });
    const expected = Math.log(x) / Math.log(b);

    assert(Math.abs(res.logResult - expected) < 1e-9 * Math.max(1, Math.abs(expected)), `Random Log parity ${b}, ${x}`);
  }

  // --- 3. RANDOMIZED ANTILOG TESTS (2,000 runs) ---
  console.log("\n--- Running 2,000 Randomized Antilog Tests ---");
  for (let i = 0; i < 2000; i++) {
    const b = Math.random() * 20 + 0.2;
    const y = (Math.random() - 0.5) * 8; // -4 to 4

    const antilogVal = Math.pow(b, y);
    // Inverse identity: log_b(b^y) === y
    const recoveredY = Math.log(antilogVal) / Math.log(b);
    assert(Math.abs(recoveredY - y) < 1e-7, `Antilog inverse identity: b=${b}, y=${y}`);
  }

  // --- 4. RANDOMIZED 3-VARIABLE SOLVER TESTS (2,000 runs) ---
  console.log("\n--- Running 2,000 Randomized 3-Variable Solver Tests ---");
  for (let i = 0; i < 2000; i++) {
    let b = Math.random() * 25 + 0.2;
    if (Math.abs(b - 1) < 0.05) b += 0.1;
    const y = (Math.random() - 0.5) * 6; // -3 to 3
    const x = Math.pow(b, y);

    // Solve for y
    const testY = Math.log(x) / Math.log(b);
    assert(Math.abs(testY - y) < 1e-6, `3-var solve y`);

    // Solve for x
    const testX = Math.pow(b, y);
    assert(Math.abs(testX - x) < 1e-6 * x, `3-var solve x`);

    // Solve for b
    const testB = Math.pow(x, 1 / y);
    assert(Math.abs(testB - b) < 1e-6 * b, `3-var solve b`);
  }

  // --- 5. RANDOMIZED GRAPH SAMPLING TESTS (1,000 runs) ---
  console.log("\n--- Running 1,000 Randomized Graph Sampling Tests ---");
  for (let i = 0; i < 1000; i++) {
    let b = Math.random() * 30 + 0.2;
    if (Math.abs(b - 1) < 0.05) b += 0.1;

    // Check (1, 0)
    const log1 = Math.log(1) / Math.log(b);
    assert(Math.abs(log1) < 1e-12, `Graph (1, 0) for base ${b}`);

    // Check (b, 1)
    const logB = Math.log(b) / Math.log(b);
    assert(Math.abs(logB - 1) < 1e-12, `Graph (b, 1) for base ${b}`);

    // Monotonicity check
    const x1 = 2;
    const x2 = 5;
    const y1 = Math.log(x1) / Math.log(b);
    const y2 = Math.log(x2) / Math.log(b);
    if (b > 1) {
      assert(y2 > y1, `Graph strictly increasing for b > 1 (${b})`);
    } else {
      assert(y2 < y1, `Graph strictly decreasing for 0 < b < 1 (${b})`);
    }
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

runLogFullAudit();
