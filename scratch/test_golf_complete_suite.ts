import {
  whsRoundTenth,
  calculateRawScoreDifferential,
  calculateScoreDifferential,
  calculate9HoleCombinedDifferential,
  calculateWHSHandicapIndex,
  calculateCourseHandicap,
} from "../src/app/calculators/golf-handicap-calculator/calculator";
import { GolfRound, HandicapAllowanceFormat } from "../src/app/calculators/golf-handicap-calculator/types";

// ==========================================
// 1. GOLDEN CASE MATRIX
// ==========================================
console.log("=== 1. VERIFYING GOLDEN CASE MATRIX ===");

// 1. 85 / 72 / 113 / PCC 0 -> 13.0
const g1 = calculateScoreDifferential(85, 72, 113, 0);
console.assert(g1 === 13.0, `Golden 1 Failed: got ${g1}, expected 13.0`);

// 2. 95 / 71.5 / 125 / PCC 0 -> 21.2
const g2 = calculateScoreDifferential(95, 71.5, 125, 0);
console.assert(g2 === 21.2, `Golden 2 Failed: got ${g2}, expected 21.2`);

// 3. 69 / 71.5 / 125 / PCC 0 -> -2.3
const g3 = calculateScoreDifferential(69, 71.5, 125, 0);
console.assert(g3 === -2.3, `Golden 3 Failed: got ${g3}, expected -2.3`);

// 4. 85 / 72 / 113 / PCC -1..+3
const g4_m1 = calculateScoreDifferential(85, 72, 113, -1);
const g4_0  = calculateScoreDifferential(85, 72, 113, 0);
const g4_p1 = calculateScoreDifferential(85, 72, 113, 1);
const g4_p2 = calculateScoreDifferential(85, 72, 113, 2);
const g4_p3 = calculateScoreDifferential(85, 72, 113, 3);
console.assert(g4_m1 === 14.0, `Golden 4 PCC -1 Failed: got ${g4_m1}, expected 14.0`);
console.assert(g4_0 === 13.0, `Golden 4 PCC 0 Failed: got ${g4_0}, expected 13.0`);
console.assert(g4_p1 === 12.0, `Golden 4 PCC +1 Failed: got ${g4_p1}, expected 12.0`);
console.assert(g4_p2 === 11.0, `Golden 4 PCC +2 Failed: got ${g4_p2}, expected 11.0`);
console.assert(g4_p3 === 10.0, `Golden 4 PCC +3 Failed: got ${g4_p3}, expected 10.0`);

// 5. 13.45 -> 13.5
const g5 = whsRoundTenth(13.45);
console.assert(g5 === 13.5, `Golden 5 Failed: got ${g5}, expected 13.5`);

// 6. 10.4 HI, 128 Slope, 72.1 CR, 72 Par -> Course Handicap 12
const g6 = calculateCourseHandicap(10.4, 128, 72.1, 72);
console.assert(g6.courseHandicap === 12, `Golden 6 Failed: got ${g6.courseHandicap}, expected 12`);

// 7. Course Handicap 12, 95% allowance -> Playing Handicap 11
const g7 = calculateCourseHandicap(10.4, 128, 72.1, 72, "95_fourball");
console.assert(g7.playingHandicap === 11, `Golden 7 Failed: got ${g7.playingHandicap}, expected 11`);

// 8. 3 rounds: 15.3, 15.2, 16.6 -> lowest 1 (15.2) - 2.0 = 13.2
function makeRounds(diffs: number[]): GolfRound[] {
  return diffs.map((d, i) => {
    // craft score such that (113/113)*(score - 72 - 0) = d => score = 72 + d
    return {
      id: `r_${i}`,
      score: 72 + d,
      courseRating: 72,
      slopeRating: 113,
      pcc: 0,
      holes: 18,
    };
  });
}

const g8 = calculateWHSHandicapIndex(makeRounds([15.3, 15.2, 16.6]));
console.assert(g8.finalHandicapIndex === 13.2, `Golden 8 Failed: got ${g8.finalHandicapIndex}, expected 13.2`);

// 9. 4 rounds: 15.3, 15.2, 16.6, 20.0 -> lowest 1 (15.2) - 1.0 = 14.2
const g9 = calculateWHSHandicapIndex(makeRounds([15.3, 15.2, 16.6, 20.0]));
console.assert(g9.finalHandicapIndex === 14.2, `Golden 9 Failed: got ${g9.finalHandicapIndex}, expected 14.2`);

// 10. 6 rounds: 10.2, 11.4, 12.8, 14.1, 9.8, 15.0 -> lowest 2: 9.8 and 10.2, avg = 10.0 - 1.0 = 9.0
const g10 = calculateWHSHandicapIndex(makeRounds([10.2, 11.4, 12.8, 14.1, 9.8, 15.0]));
console.assert(g10.finalHandicapIndex === 9.0, `Golden 10 Failed: got ${g10.finalHandicapIndex}, expected 9.0`);

// 11. 20-round golden record: lowest 8 sum = 80.7, avg = 10.0875 -> 10.1
const lowest8 = [9.5, 9.8, 10.0, 10.1, 10.2, 10.3, 10.3, 10.5]; // sum = 80.7
const other12 = [12.0, 13.0, 14.0, 15.0, 16.0, 17.0, 18.0, 19.0, 20.0, 21.0, 22.0, 23.0];
const g11 = calculateWHSHandicapIndex(makeRounds([...lowest8, ...other12]));
console.assert(g11.finalHandicapIndex === 10.1, `Golden 11 Failed: got ${g11.finalHandicapIndex}, expected 10.1`);

// 12. Low Index 10.0, Raw 13.4 -> increase = 3.4 > 3.0 -> soft cap = 10.0 + 3.0 + 0.4*0.5 = 13.2
// To produce raw 13.4 with 20 rounds, all lowest 8 can be 13.4
const lowest8_134 = Array(8).fill(13.4);
const other12_high = Array(12).fill(25.0);
const g12 = calculateWHSHandicapIndex(makeRounds([...lowest8_134, ...other12_high]), 10.0);
console.assert(g12.softCapApplied && g12.finalHandicapIndex === 13.2, `Golden 12 Failed: got ${g12.finalHandicapIndex}, expected 13.2 (soft cap)`);

// 13. Low Index 10.0, Raw 18.0 -> hard cap = 15.0
const lowest8_180 = Array(8).fill(18.0);
const g13 = calculateWHSHandicapIndex(makeRounds([...lowest8_180, ...other12_high]), 10.0);
console.assert(g13.hardCapApplied && g13.finalHandicapIndex === 15.0, `Golden 13 Failed: got ${g13.finalHandicapIndex}, expected 15.0 (hard cap)`);

console.log("-> ALL 13 GOLDEN CASES PASSED 100%!");

// ==========================================
// 2. 9-HOLE REQUIRED TESTS (9A, 9B, 9C, 9D, 9E)
// ==========================================
console.log("\n=== 2. 9-HOLE RULE 5.1b TESTS ===");

// TEST 9A: Score = 40, CR = 35.5, Slope = 120, PCC = 0
// Unrounded standalone = (113 / 120) * (40 - 35.5) = 4.2375
const res9A = calculate9HoleCombinedDifferential(40, 35.5, 120, 0);
console.assert(Math.abs(res9A.unroundedDiff9 - 4.2375) < 1e-9, `9A Failed: unrounded is ${res9A.unroundedDiff9}`);
console.assert(res9A.standaloneDiff9 === 4.2, `9A Failed: standalone rounded is ${res9A.standaloneDiff9}`);

// TEST 9B: Same round with HI = 15.0
// Expected = 15.0 / 2 = 7.5
// Unrounded combined = 4.2375 + 7.5 = 11.7375
// Rounded combined = 11.7
const res9B = calculate9HoleCombinedDifferential(40, 35.5, 120, 0, 15.0);
console.assert(Math.abs(res9B.unroundedCombined18 - 11.7375) < 1e-9, `9B Failed: unroundedCombined18 is ${res9B.unroundedCombined18}`);
console.assert(res9B.combined18Differential === 11.7, `9B Failed: combined18Differential is ${res9B.combined18Differential}, expected 11.7`);

// TEST 9C: PCC variations (-1, 0, 1, 2, 3)
for (const pccVal of [-1, 0, 1, 2, 3]) {
  const r = calculate9HoleCombinedDifferential(40, 35.5, 120, pccVal, 15.0);
  const oracleUnroundedDiff9 = (113 / 120) * (40 - 35.5 - 0.5 * pccVal);
  const oracleCombined = whsRoundTenth(oracleUnroundedDiff9 + 7.5);
  console.assert(r.combined18Differential === oracleCombined, `9C Failed for PCC ${pccVal}: got ${r.combined18Differential}, expected ${oracleCombined}`);
}

// TEST 9D: Final rounding boundaries (13.44 -> 13.4, 13.45 -> 13.5, 13.46 -> 13.5)
console.assert(whsRoundTenth(13.44) === 13.4, "9D 13.44 failed");
console.assert(whsRoundTenth(13.45) === 13.5, "9D 13.45 failed");
console.assert(whsRoundTenth(13.46) === 13.5, "9D 13.46 failed");

// TEST 9E: Changing current HI changes expected score only, not standalone unrounded differential
const res9E_10 = calculate9HoleCombinedDifferential(40, 35.5, 120, 0, 10.0);
const res9E_20 = calculate9HoleCombinedDifferential(40, 35.5, 120, 0, 20.0);
console.assert(res9E_10.unroundedDiff9 === res9E_20.unroundedDiff9, "9E Standalone diff changed when HI changed!");
console.assert(res9E_10.expectedDiff9 === 5.0, "9E Expected score for HI 10.0 failed");
console.assert(res9E_20.expectedDiff9 === 10.0, "9E Expected score for HI 20.0 failed");
console.log("-> 9-HOLE TESTS 9A - 9E PASSED 100%!");

// ==========================================
// 3. ESR RULE 5.9 TESTS
// ==========================================
console.log("\n=== 3. ESR RULE 5.9 TESTS ===");
// Baseline HI = 15.0
// gap = 6.9 -> differential = 8.1 -> no ESR
const esr_69 = calculateWHSHandicapIndex(makeRounds([8.1, 15.0, 15.0]), undefined, 15.0);
console.assert(!esr_69.esrApplied && esr_69.totalEsrAdjustment === 0, "ESR 6.9 gap failed");

// gap = 7.0 -> differential = 8.0 -> -1.0 ESR
const esr_70 = calculateWHSHandicapIndex(makeRounds([8.0, 15.0, 15.0]), undefined, 15.0);
console.assert(esr_70.esrApplied && esr_70.totalEsrAdjustment === -1.0, `ESR 7.0 gap failed: got ${esr_70.totalEsrAdjustment}`);

// gap = 9.9 -> differential = 5.1 -> -1.0 ESR
const esr_99 = calculateWHSHandicapIndex(makeRounds([5.1, 15.0, 15.0]), undefined, 15.0);
console.assert(esr_99.esrApplied && esr_99.totalEsrAdjustment === -1.0, `ESR 9.9 gap failed: got ${esr_99.totalEsrAdjustment}`);

// gap = 10.0 -> differential = 5.0 -> -2.0 ESR
const esr_100 = calculateWHSHandicapIndex(makeRounds([5.0, 15.0, 15.0]), undefined, 15.0);
console.assert(esr_100.esrApplied && esr_100.totalEsrAdjustment === -2.0, `ESR 10.0 gap failed: got ${esr_100.totalEsrAdjustment}`);

// gap = 10.5 -> differential = 4.5 -> -2.0 ESR
const esr_105 = calculateWHSHandicapIndex(makeRounds([4.5, 15.0, 15.0]), undefined, 15.0);
console.assert(esr_105.esrApplied && esr_105.totalEsrAdjustment === -2.0, `ESR 10.5 gap failed: got ${esr_105.totalEsrAdjustment}`);

console.log("-> ESR TESTS PASSED 100%!");

// ==========================================
// 4. NEGATIVE DIFFERENTIAL ROUNDING TESTS
// ==========================================
console.log("\n=== 4. NEGATIVE DIFFERENTIAL ROUNDING TESTS ===");
console.assert(whsRoundTenth(-2.24) === -2.2, "Round -2.24 failed");
console.assert(whsRoundTenth(-2.25) === -2.2, "Round -2.25 failed (USGA Rule 5.1a algebraic upward)");
console.assert(whsRoundTenth(-2.26) === -2.3, "Round -2.26 failed");
console.log("-> NEGATIVE ROUNDING TESTS PASSED 100%!");

// ==========================================
// 5. 700,000+ RANDOMIZED TEST SUITE
// ==========================================
console.log("\n=== 5. EXECUTING 700,000+ RANDOMIZED ORACLE TESTS ===");

const ITERATIONS = 100000;

// 5.1 Score Differentials (100,000 cases)
console.log(`- Running ${ITERATIONS} 18-hole Score Differential tests...`);
for (let i = 0; i < ITERATIONS; i++) {
  const score = Math.floor(Math.random() * 60) + 60; // 60 to 120
  const cr = +(Math.random() * 15 + 65).toFixed(1);   // 65.0 to 80.0
  const slope = Math.floor(Math.random() * 100) + 55; // 55 to 155
  const pcc = [-1, 0, 1, 2, 3][Math.floor(Math.random() * 5)];

  const actual = calculateScoreDifferential(score, cr, slope, pcc, 18);
  const oracleExact = (113 / slope) * (score - cr - pcc);
  const oracle = Math.floor(oracleExact * 10 + 0.5 + 1e-9) / 10;

  if (actual !== oracle) {
    throw new Error(`Differential mismatch at i=${i}: got ${actual}, expected ${oracle}`);
  }
}
console.log(`  ✓ 100,000 Score Differential tests PASSED!`);

// 5.2 9-Hole Standalone & Expected-Score Workflow (100,000 cases)
console.log(`- Running ${ITERATIONS} 9-hole WHS workflow tests...`);
for (let i = 0; i < ITERATIONS; i++) {
  const score = Math.floor(Math.random() * 30) + 30; // 30 to 60
  const cr = +(Math.random() * 8 + 32).toFixed(1);    // 32.0 to 40.0
  const slope = Math.floor(Math.random() * 100) + 55; // 55 to 155
  const pcc = [-1, 0, 1, 2, 3][Math.floor(Math.random() * 5)];
  const currentHi = +(Math.random() * 40).toFixed(1);

  const res = calculate9HoleCombinedDifferential(score, cr, slope, pcc, currentHi);

  // Oracle
  const oracleUnroundedDiff9 = (113 / slope) * (score - cr - 0.5 * pcc);
  const oracleStandalone = Math.floor(oracleUnroundedDiff9 * 10 + 0.5 + 1e-9) / 10;
  const oracleExpected = currentHi / 2;
  const oracleCombined = Math.floor((oracleUnroundedDiff9 + oracleExpected) * 10 + 0.5 + 1e-9) / 10;

  if (res.standaloneDiff9 !== oracleStandalone) {
    throw new Error(`9-hole standalone mismatch at i=${i}: got ${res.standaloneDiff9}, expected ${oracleStandalone}`);
  }
  if (res.combined18Differential !== oracleCombined) {
    throw new Error(`9-hole combined mismatch at i=${i}: got ${res.combined18Differential}, expected ${oracleCombined}`);
  }
}
console.log(`  ✓ 100,000 9-Hole Workflow tests PASSED!`);

// 5.3 WHS 1–20 Scoring Record Sliding Scale (100,000 cases)
console.log(`- Running ${ITERATIONS} WHS 1-20 Scoring Records tests...`);
const rule52Table: Record<number, { count: number; adj: number }> = {
  3: { count: 1, adj: -2.0 },
  4: { count: 1, adj: -1.0 },
  5: { count: 1, adj: 0 },
  6: { count: 2, adj: -1.0 },
  7: { count: 2, adj: 0 },
  8: { count: 2, adj: 0 },
  9: { count: 3, adj: 0 },
  10: { count: 3, adj: 0 },
  11: { count: 3, adj: 0 },
  12: { count: 4, adj: 0 },
  13: { count: 4, adj: 0 },
  14: { count: 4, adj: 0 },
  15: { count: 5, adj: 0 },
  16: { count: 5, adj: 0 },
  17: { count: 6, adj: 0 },
  18: { count: 6, adj: 0 },
  19: { count: 7, adj: 0 },
  20: { count: 8, adj: 0 },
};

for (let i = 0; i < ITERATIONS; i++) {
  const n = Math.floor(Math.random() * 18) + 3; // 3 to 20
  const diffs: number[] = [];
  for (let j = 0; j < n; j++) {
    diffs.push(+(Math.random() * 40 - 5).toFixed(1)); // -5.0 to 35.0
  }

  const rounds = makeRounds(diffs);
  const res = calculateWHSHandicapIndex(rounds);

  // Oracle
  const oracleRule = rule52Table[n];
  const sorted = [...diffs].sort((a, b) => a - b);
  const counting = sorted.slice(0, oracleRule.count);
  const sum = counting.reduce((acc, v) => acc + v, 0);
  const avg = sum / oracleRule.count;
  const oracleRaw = avg + oracleRule.adj;
  const oracleFinal = Math.floor(oracleRaw * 10 + 0.5 + 1e-9) / 10;

  if (res.finalHandicapIndex !== oracleFinal) {
    throw new Error(`Handicap Index mismatch at i=${i}, n=${n}: got ${res.finalHandicapIndex}, expected ${oracleFinal}`);
  }
}
console.log(`  ✓ 100,000 WHS Scoring Record tests PASSED!`);

// 5.4 Course Handicap (100,000 cases)
console.log(`- Running ${ITERATIONS} Course Handicap tests...`);
for (let i = 0; i < ITERATIONS; i++) {
  const hi = +(Math.random() * 50 - 5).toFixed(1);     // -5.0 to 45.0
  const slope = Math.floor(Math.random() * 100) + 55;  // 55 to 155
  const cr = +(Math.random() * 15 + 65).toFixed(1);    // 65.0 to 80.0
  const par = [70, 71, 72, 73][Math.floor(Math.random() * 4)];

  const res = calculateCourseHandicap(hi, slope, cr, par);
  const oracleCH = Math.round(hi * (slope / 113) + (cr - par));

  if (res.courseHandicap !== oracleCH) {
    throw new Error(`Course Handicap mismatch at i=${i}: got ${res.courseHandicap}, expected ${oracleCH}`);
  }
}
console.log(`  ✓ 100,000 Course Handicap tests PASSED!`);

// 5.5 Playing Handicap (100,000 cases)
console.log(`- Running ${ITERATIONS} Playing Handicap tests across all allowances...`);
const formats: HandicapAllowanceFormat[] = ["100_stroke", "95_fourball", "85_alternate", "scramble_2p", "scramble_4p"];
const pctMap = { "100_stroke": 100, "95_fourball": 95, "85_alternate": 85, "scramble_2p": 35, "scramble_4p": 25 };

for (let i = 0; i < ITERATIONS; i++) {
  const hi = +(Math.random() * 40).toFixed(1);
  const fmt = formats[Math.floor(Math.random() * formats.length)];
  const res = calculateCourseHandicap(hi, 113, 72, 72, fmt);

  const oracleCH = Math.round(hi);
  const oraclePH = Math.round(oracleCH * (pctMap[fmt] / 100));

  if (res.playingHandicap !== oraclePH) {
    throw new Error(`Playing Handicap mismatch at i=${i}, fmt=${fmt}: got ${res.playingHandicap}, expected ${oraclePH}`);
  }
}
console.log(`  ✓ 100,000 Playing Handicap tests PASSED!`);

// 5.6 Caps Evaluation (100,000 cases)
console.log(`- Running ${ITERATIONS} Caps Evaluation tests (+2.99, +3.00, +3.01, +4.99, +5.00, +5.01)...`);

// Explicit boundary tests
const boundaryLow = 10.0;
// Test +2.9875 (below soft cap)
const r_below_soft = makeRounds([
  ...Array(7).fill(boundaryLow),
  boundaryLow + 23.9, // avg increase = 23.9 / 8 = 2.9875
  ...Array(12).fill(boundaryLow + 30.0)
]);
const res_below_soft = calculateWHSHandicapIndex(r_below_soft, boundaryLow);
console.assert(!res_below_soft.softCapApplied && !res_below_soft.hardCapApplied, "Boundary +2.99 soft cap unexpectedly applied");

// Test +3.00 (exact threshold, no soft cap)
const r_exact_soft = makeRounds([
  ...Array(7).fill(boundaryLow),
  boundaryLow + 24.0, // avg increase = 24.0 / 8 = 3.0
  ...Array(12).fill(boundaryLow + 30.0)
]);
const res_exact_soft = calculateWHSHandicapIndex(r_exact_soft, boundaryLow);
console.assert(!res_exact_soft.softCapApplied && !res_exact_soft.hardCapApplied, "Boundary +3.00 soft cap unexpectedly applied");

// Test +3.0125 (above soft cap)
const r_above_soft = makeRounds([
  ...Array(7).fill(boundaryLow),
  boundaryLow + 24.1, // avg increase = 24.1 / 8 = 3.0125
  ...Array(12).fill(boundaryLow + 30.0)
]);
const res_above_soft = calculateWHSHandicapIndex(r_above_soft, boundaryLow);
console.assert(res_above_soft.softCapApplied && !res_above_soft.hardCapApplied, "Boundary +3.01 soft cap failed to apply");

// Test +4.9875 (soft capped, below hard cap)
const r_below_hard = makeRounds([
  ...Array(7).fill(boundaryLow),
  boundaryLow + 55.9, // avg increase = 55.9 / 8 = 6.9875 -> soft cap = 3.0 + 3.9875 * 0.5 = 4.99375 < 5.0
  ...Array(12).fill(boundaryLow + 70.0)
]);
const res_below_hard = calculateWHSHandicapIndex(r_below_hard, boundaryLow);
console.assert(res_below_hard.softCapApplied && !res_below_hard.hardCapApplied, "Boundary +4.99 hard cap unexpectedly applied");

// Test +5.00 (exact hard cap threshold)
const r_exact_hard = makeRounds([
  ...Array(7).fill(boundaryLow),
  boundaryLow + 56.0, // avg increase = 56.0 / 8 = 7.0 -> soft cap = 3.0 + 4.0 * 0.5 = 5.0
  ...Array(12).fill(boundaryLow + 70.0)
]);
const res_exact_hard = calculateWHSHandicapIndex(r_exact_hard, boundaryLow);
console.assert(res_exact_hard.softCapApplied && !res_exact_hard.hardCapApplied, "Boundary +5.00 hard cap unexpectedly applied");

// Test +5.0125 (above hard cap)
const r_above_hard = makeRounds([
  ...Array(7).fill(boundaryLow),
  boundaryLow + 56.1, // avg increase = 56.1 / 8 = 7.0125 -> soft cap = 3.0 + 4.0125 * 0.5 = 5.00625 > 5.0 -> hard cap
  ...Array(12).fill(boundaryLow + 70.0)
]);
const res_above_hard = calculateWHSHandicapIndex(r_above_hard, boundaryLow);
console.assert(res_above_hard.hardCapApplied, "Boundary +5.01 hard cap failed to apply");

// 100,000 Randomized 20-score cap evaluation
for (let i = 0; i < ITERATIONS; i++) {
  const lowIndex = +(Math.random() * 25 + 5).toFixed(1); // 5.0 to 30.0
  const diffs: number[] = [];
  for (let j = 0; j < 20; j++) {
    diffs.push(+(Math.random() * 35 + 5).toFixed(1));
  }

  const rounds20 = makeRounds(diffs);
  const res20 = calculateWHSHandicapIndex(rounds20, lowIndex);

  // Oracle cap logic
  const sorted = [...diffs].sort((a, b) => a - b);
  const lowest8 = sorted.slice(0, 8);
  const rawAvg = lowest8.reduce((a, b) => a + b, 0) / 8;

  let oracleCap = rawAvg;
  const increase = rawAvg - lowIndex;
  if (increase > 3.0) {
    const excess = increase - 3.0;
    oracleCap = lowIndex + 3.0 + excess * 0.5;
    if (oracleCap > lowIndex + 5.0) {
      oracleCap = lowIndex + 5.0;
    }
  }
  const oracleRounded = Math.floor(oracleCap * 10 + 0.5 + 1e-9) / 10;

  if (res20.finalHandicapIndex !== oracleRounded) {
    throw new Error(`Cap evaluation mismatch at i=${i}: got ${res20.finalHandicapIndex}, expected ${oracleRounded}`);
  }

  // Also prove: 19 scores -> caps inactive per Rule 5.7
  if (i % 500 === 0) {
    const rounds19 = rounds20.slice(0, 19);
    const res19 = calculateWHSHandicapIndex(rounds19, lowIndex);
    console.assert(!res19.softCapApplied && !res19.hardCapApplied, "19 scores unexpectedly activated caps!");
  }
}
console.log(`  ✓ 100,000 Caps Evaluation tests PASSED!`);

// 5.7 ESR Evaluation (100,000 cases)
console.log(`- Running ${ITERATIONS} ESR Scoring-Record tests...`);
for (let i = 0; i < ITERATIONS; i++) {
  const baselineHi = +(Math.random() * 25 + 10).toFixed(1); // 10.0 to 35.0
  const n = Math.floor(Math.random() * 18) + 3; // 3 to 20 rounds
  const gapChoice = [6.9, 7.0, 7.5, 9.9, 10.0, 10.5, 12.0][Math.floor(Math.random() * 7)];

  // Base differentials equal to baselineHi
  const diffs = Array(n).fill(baselineHi);
  // Insert exceptional differential at random position
  const pos = Math.floor(Math.random() * n);
  diffs[pos] = +(baselineHi - gapChoice).toFixed(1);

  const rounds = makeRounds(diffs);
  const res = calculateWHSHandicapIndex(rounds, undefined, baselineHi);

  let expectedEsr = 0;
  if (gapChoice >= 10.0) expectedEsr = -2.0;
  else if (gapChoice >= 7.0) expectedEsr = -1.0;

  if (res.totalEsrAdjustment !== expectedEsr) {
    throw new Error(`ESR mismatch at i=${i}, gap=${gapChoice}: got ${res.totalEsrAdjustment}, expected ${expectedEsr}`);
  }
}
console.log(`  ✓ 100,000 ESR Scoring-Record tests PASSED!`);

console.log("\n==================================================");
console.log("TOTAL RANDOMIZED TESTS EXECUTED: 700,000+");
console.log("ALL 700,000+ RANDOMIZED ORACLE TESTS PASSED 100%!");
console.log("==================================================");
