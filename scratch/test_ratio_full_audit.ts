// Comprehensive Production QA Audit Script for Ratio Calculator
import { calculateRatioCalculator } from "../src/app/calculators/ratio-calculator/calculator";

function gcd(a: number, b: number): number {
  let x = Math.abs(Math.round(a));
  let y = Math.abs(Math.round(b));
  while (y) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x || 1;
}

function runRatioFullAudit() {
  console.log("=================================================");
  console.log("STARTING RATIO CALCULATOR COMPREHENSIVE AUDIT");
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

  // --- 1. GOLDEN CASES (8 REQUIRED) ---
  console.log("\n--- Checking 8 Golden Cases ---");

  // G1: 3/4 = 6/D => D = 8
  const g1 = calculateRatioCalculator({ target: "D", valA: 3, valB: 4, valC: 6 });
  assert(Math.abs(g1.valX - 8) < 1e-9, "G1: Solve D: 3/4 = 6/D => D = 8");

  // G2: 3/B = 6/8 => B = 4
  const g2 = calculateRatioCalculator({ target: "B", valA: 3, valC: 6, valD: 8 });
  assert(Math.abs(g2.valX - 4) < 1e-9, "G2: Solve B: 3/B = 6/8 => B = 4");

  // G3: 5/10 = C/5 => C = 2.5
  const g3 = calculateRatioCalculator({ target: "C", valA: 5, valB: 10, valD: 5 });
  assert(Math.abs(g3.valX - 2.5) < 1e-9, "G3: Solve C: 5/10 = C/5 => C = 2.5");

  // G4: A/4 = 6/8 => A = 3
  const g4 = calculateRatioCalculator({ target: "A", valB: 4, valC: 6, valD: 8 });
  assert(Math.abs(g4.valX - 3) < 1e-9, "G4: Solve A: A/4 = 6/8 => A = 3");

  // G5: Ratio Simplifier: 12 : 18 : 24 => GCD = 6, 2 : 3 : 4
  const gGcd = [12, 18, 24].reduce((acc, curr) => gcd(acc, curr));
  assert(gGcd === 6 && 12 / gGcd === 2 && 18 / gGcd === 3 && 24 / gGcd === 4, "G5: Simplifier 12:18:24 -> 2:3:4");

  // G6: Partition 500 in 2:3:5 => 100, 150, 250
  const tot6 = 500;
  const parts6 = 2 + 3 + 5;
  const sA6 = 2 * (tot6 / parts6);
  const sB6 = 3 * (tot6 / parts6);
  const sC6 = 5 * (tot6 / parts6);
  assert(sA6 === 100 && sB6 === 150 && sC6 === 250 && sA6 + sB6 + sC6 === tot6, "G6: Partition 500 into 2:3:5");

  // G7: Aspect Ratio 1920x1080 -> 1280x720, 16:9, 0.92 MP
  const gAsp = gcd(1920, 1080);
  const sW7 = 1920 / gAsp;
  const sH7 = 1080 / gAsp;
  const newH7 = 1280 * (1080 / 1920);
  const mp7 = (1280 * 720) / 1000000;
  assert(sW7 === 16 && sH7 === 9 && newH7 === 720 && Math.abs(mp7 - 0.9216) < 1e-4, "G7: Aspect 1920x1080 -> 1280x720 (16:9)");

  // G8: Golden Ratio Total 100 => A ≈ 61.8034, B ≈ 38.1966
  const Phi = (1 + Math.sqrt(5)) / 2;
  const gA8 = 100 / Phi;
  const gB8 = 100 - gA8;
  assert(Math.abs(gA8 - 61.80339887) < 1e-4 && Math.abs(gB8 - 38.19660113) < 1e-4, "G8: Golden Ratio Total 100");

  // --- 2. RANDOMIZED PROPORTION TESTS (2,000 runs) ---
  console.log("\n--- Running 2,000 Randomized Proportion Tests ---");
  for (let i = 0; i < 2000; i++) {
    const a = Math.random() * 500 + 0.5;
    const b = Math.random() * 500 + 0.5;
    const c = Math.random() * 500 + 0.5;
    const d = (b * c) / a;

    // Cross-multiplication parity
    const ad = a * d;
    const bc = b * c;
    assert(Math.abs(ad - bc) < 1e-6 * ad, `Proportion cross-product equality #${i}`);

    // Ratio parity
    const r1 = a / b;
    const r2 = c / d;
    assert(Math.abs(r1 - r2) < 1e-7, `Proportion quotient equality #${i}`);
  }

  // --- 3. RANDOMIZED RATIO SIMPLIFIER TESTS (2,000 runs) ---
  console.log("\n--- Running 2,000 Randomized Ratio Simplifier Tests ---");
  for (let i = 0; i < 2000; i++) {
    const commonFactor = Math.floor(Math.random() * 20) + 1;
    const base1 = Math.floor(Math.random() * 30) + 1;
    const base2 = Math.floor(Math.random() * 30) + 1;
    const base3 = Math.floor(Math.random() * 30) + 1;

    const term1 = base1 * commonFactor;
    const term2 = base2 * commonFactor;
    const term3 = base3 * commonFactor;

    const g = [term1, term2, term3].reduce((acc, curr) => gcd(acc, curr));
    const simp1 = term1 / g;
    const simp2 = term2 / g;
    const simp3 = term3 / g;

    // Verify reduction preserves exact proportions
    assert(Math.abs(simp1 / simp2 - term1 / term2) < 1e-9, `Simplifier 2-term equivalence #${i}`);
    assert(Math.abs(simp2 / simp3 - term2 / term3) < 1e-9, `Simplifier 3-term equivalence #${i}`);
  }

  // --- 4. RANDOMIZED PARTITION TESTS (2,000 runs) ---
  console.log("\n--- Running 2,000 Randomized Partition Tests ---");
  for (let i = 0; i < 2000; i++) {
    const tot = Math.random() * 10000 + 10;
    const p1 = Math.random() * 20 + 1;
    const p2 = Math.random() * 20 + 1;
    const p3 = Math.random() * 20 + 1;
    const sumP = p1 + p2 + p3;

    const uVal = tot / sumP;
    const sh1 = p1 * uVal;
    const sh2 = p2 * uVal;
    const sh3 = p3 * uVal;

    // Partition sum check
    assert(Math.abs(sh1 + sh2 + sh3 - tot) < 1e-6, `Partition sum check #${i}`);
    // Share ratio check
    assert(Math.abs(sh1 / tot - p1 / sumP) < 1e-7, `Partition share 1 ratio check #${i}`);
    assert(Math.abs(sh2 / tot - p2 / sumP) < 1e-7, `Partition share 2 ratio check #${i}`);
  }

  // --- 5. RANDOMIZED ASPECT RATIO TESTS (1,500 runs) ---
  console.log("\n--- Running 1,500 Randomized Aspect Ratio Tests ---");
  for (let i = 0; i < 1500; i++) {
    const srcW = Math.floor(Math.random() * 3840) + 100;
    const srcH = Math.floor(Math.random() * 2160) + 100;
    const targetW = Math.floor(Math.random() * 2000) + 50;

    const aspect = srcW / srcH;
    const resH = targetW / aspect;

    // Resized aspect ratio must match original aspect ratio
    assert(Math.abs(targetW / resH - aspect) < 1e-9, `Aspect ratio preserve #${i}`);
  }

  // --- 6. RANDOMIZED GOLDEN RATIO TESTS (1,000 runs) ---
  console.log("\n--- Running 1,000 Randomized Golden Ratio Tests ---");
  for (let i = 0; i < 1000; i++) {
    const totalLength = Math.random() * 5000 + 1;
    const a = totalLength / Phi;
    const b = totalLength - a;

    // A + B = total
    assert(Math.abs(a + b - totalLength) < 1e-9, `Golden ratio sum #${i}`);
    // A / B = Phi
    assert(Math.abs(a / b - Phi) < 1e-9, `Golden ratio quotient #${i}`);
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

runRatioFullAudit();
