import {
  computeStandardZ,
  computeInverseZ,
  computeIntervalZ,
  computeBatchZ,
  normalCDF,
  inverseNormalCDF,
  normalPDF
} from "../src/app/calculators/z-score-calculator/z-score-logic";
import { calculateZScoreCalculator } from "../src/app/calculators/z-score-calculator/calculator";

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(`Assertion Failed: ${msg}`);
}

console.log("===============================================================================");
console.log("STARTING FULL AUDIT & STRESS TEST: Z-SCORE & NORMAL DISTRIBUTION SUITE");
console.log("===============================================================================");

// -----------------------------------------------------------------------------
// 1. GOLDEN CASES
// -----------------------------------------------------------------------------
console.log("\n--- PART 1: GOLDEN TEST CASES (G1 to G10) ---");

// G1: X = 85, μ = 70, σ = 10 -> Z = 1.5000, Left = 93.32%, Right = 6.68%, Two-tail = 13.36%, Central = 86.64%
const g1 = computeStandardZ(85, 70, 10, false, 4);
assert(g1.isValid, "G1 must be valid");
assert(Math.abs(g1.zScore - 1.5) < 1e-9, `G1 Z should be 1.5, got ${g1.zScore}`);
assert(g1.zScoreFormatted === "1.5000", `G1 zScoreFormatted should be 1.5000, got ${g1.zScoreFormatted}`);
assert(g1.leftTailPct === "93.32%", `G1 Left tail should be 93.32%, got ${g1.leftTailPct}`);
assert(g1.rightTailPct === "6.68%", `G1 Right tail should be 6.68%, got ${g1.rightTailPct}`);
assert(g1.twoTailsPct === "13.36%", `G1 Two-tail should be 13.36%, got ${g1.twoTailsPct}`);
assert(g1.betweenPct === "86.64%", `G1 Central between should be 86.64%, got ${g1.betweenPct}`);
assert(g1.percentileRank === "93.32%", `G1 Percentile should be 93.32%, got ${g1.percentileRank}`);
console.log("✓ G1 Passed: X=85, μ=70, σ=10 -> Z=1.5000, Left=93.32%, Right=6.68%, Two-tail=13.36%");

// G2: X = 55, μ = 70, σ = 10 -> Z = -1.5000, Left = 6.68%, Right = 93.32%, Two-tail = 13.36%
const g2 = computeStandardZ(55, 70, 10, false, 4);
assert(g2.isValid, "G2 must be valid");
assert(Math.abs(g2.zScore - (-1.5)) < 1e-9, `G2 Z should be -1.5, got ${g2.zScore}`);
assert(g2.leftTailPct === "6.68%", `G2 Left tail should be 6.68%, got ${g2.leftTailPct}`);
assert(g2.rightTailPct === "93.32%", `G2 Right tail should be 93.32%, got ${g2.rightTailPct}`);
assert(g2.twoTailsPct === "13.36%", `G2 Two-tail should be 13.36%, got ${g2.twoTailsPct}`);
console.log("✓ G2 Passed: X=55, μ=70, σ=10 -> Z=-1.5000, Left=6.68%, Right=93.32%");

// G3: X = 70, μ = 70, σ = 10 -> Z = 0, Left = 50.00%, Right = 50.00%, Two-tail = 100.00%, Central = 0.00%
const g3 = computeStandardZ(70, 70, 10, false, 4);
assert(g3.isValid, "G3 must be valid");
assert(Math.abs(g3.zScore) < 1e-9, `G3 Z should be 0, got ${g3.zScore}`);
assert(g3.leftTailPct === "50.00%", `G3 Left tail should be 50.00%, got ${g3.leftTailPct}`);
assert(g3.rightTailPct === "50.00%", `G3 Right tail should be 50.00%, got ${g3.rightTailPct}`);
assert(g3.betweenPct === "0.00%", `G3 Central between should be 0.00%, got ${g3.betweenPct}`);
assert(g3.twoTailsPct === "100.00%", `G3 Two-tail should be 100.00%, got ${g3.twoTailsPct}`);
console.log("✓ G3 Passed: X=70, μ=70, σ=10 -> Z=0, Left=50.00%, Right=50.00%, Two-tail=100.00%");

// G4: X = 854, μ = 70, σ = 10 -> Z = 78.4000
const g4 = computeStandardZ(854, 70, 10, false, 4);
assert(g4.isValid, "G4 must be valid");
assert(Math.abs(g4.zScore - 78.4) < 1e-9, `G4 Z should be 78.4, got ${g4.zScore}`);
assert(g4.zScoreFormatted === "78.4000", `G4 zScoreFormatted should be 78.4000, got ${g4.zScoreFormatted}`);
assert(g4.leftTailP === 1.0, `G4 Left tail P should be 1.0, got ${g4.leftTailP}`);
assert(g4.rightTailP === 0.0, `G4 Right tail P should be 0.0, got ${g4.rightTailP}`);
assert(g4.percentileRank === "100.00%", `G4 Percentile should be 100.00%, got ${g4.percentileRank}`);
console.log("✓ G4 Passed: X=854, μ=70, σ=10 -> Z=78.4000, Left=100.00%, Right=0.00%");

// G5: Confidence = 95%, Two-Tail, μ=100, σ=15 -> z ≈ 1.959964, Raw X ≈ 129.3995, Margin of error ≈ 29.3995
const g5 = computeInverseZ(95, "conf", "two", 100, 15, 4);
assert(g5.isValid, "G5 must be valid");
assert(Math.abs(g5.criticalZ - 1.959964) < 1e-4, `G5 criticalZ should be ~1.959964, got ${g5.criticalZ}`);
assert(Math.abs(g5.rawValue - 129.3995) < 1e-3, `G5 rawValue should be ~129.3995, got ${g5.rawValue}`);
assert(Math.abs(g5.marginOfError - 29.3995) < 1e-3, `G5 marginOfError should be ~29.3995, got ${g5.marginOfError}`);
console.log("✓ G5 Passed: Conf=95% Two-tail -> z=1.959964, X=129.3995, MOE=±29.3995");

// G6: Interval X1=60, X2=80, μ=70, σ=10 -> Area Between = 68.27% (0.682689), Outside = 31.73%
const g6 = computeIntervalZ(60, 80, 70, 10, 4);
assert(g6.isValid, "G6 must be valid");
assert(Math.abs(g6.z1 - (-1.0)) < 1e-9, `G6 Z1 should be -1.0, got ${g6.z1}`);
assert(Math.abs(g6.z2 - 1.0) < 1e-9, `G6 Z2 should be 1.0, got ${g6.z2}`);
assert(g6.areaBetweenPct === "68.27%", `G6 Area between should be 68.27%, got ${g6.areaBetweenPct}`);
assert(g6.areaOutsidePct === "31.73%", `G6 Area outside should be 31.73%, got ${g6.areaOutsidePct}`);
console.log("✓ G6 Passed: [60, 80], μ=70, σ=10 -> Area Between=68.27%, Area Outside=31.73%");

// G7: Interval X1=61, X2=81, μ=73, σ=10 -> Z1 = -1.20, Z2 = 0.80, Area Between = 67.31%, Outside = 32.69%
const g7 = computeIntervalZ(61, 81, 73, 10, 4);
assert(g7.isValid, "G7 must be valid");
assert(Math.abs(g7.z1 - (-1.2)) < 1e-9, `G7 Z1 should be -1.2, got ${g7.z1}`);
assert(Math.abs(g7.z2 - 0.8) < 1e-9, `G7 Z2 should be 0.8, got ${g7.z2}`);
assert(g7.areaBetweenPct === "67.31%", `G7 Area between should be 67.31%, got ${g7.areaBetweenPct}`);
assert(g7.areaOutsidePct === "32.69%", `G7 Area outside should be 32.69%, got ${g7.areaOutsidePct}`);
console.log("✓ G7 Passed: [61, 81], μ=73, σ=10 -> Area Between=67.31%, Outside=32.69%");

// G8: Batch dataset: 65, 70, 72, 75, 80, 85, 90, 92, 95, 100 -> Mean=82.4, Median=82.5, s=11.79, s²=138.93
const g8 = computeBatchZ("65, 70, 72, 75, 80, 85, 90, 92, 95, 100", 2);
assert(g8.count === 10, `G8 count should be 10, got ${g8.count}`);
assert(g8.mean === 82.4, `G8 mean should be 82.4, got ${g8.mean}`);
assert(g8.median === 82.5, `G8 median should be 82.5, got ${g8.median}`);
assert(g8.sd === 11.79, `G8 SD should be 11.79, got ${g8.sd}`);
assert(g8.variance === 138.93, `G8 variance should be 138.93, got ${g8.variance}`);
assert(g8.items[0].zScoreFormatted === "-1.48", `G8 row 1 Z should be -1.48, got ${g8.items[0].zScoreFormatted}`);
assert(g8.items[0].percentilePct === "6.99%", `G8 row 1 percentile should be 6.99%, got ${g8.items[0].percentilePct}`);
console.log("✓ G8 Passed: Batch [65..100] -> Mean=82.4, Median=82.5, s=11.79, s²=138.93, row 1 Z=-1.48 (6.99%)");

// G9: Extreme probability & Z tests
const g9_neg = computeStandardZ(-1000000, 0, 1);
assert(g9_neg.isValid, "G9_neg should be valid");
assert(g9_neg.leftTailP === 0.0, `G9_neg Left tail should be 0.0, got ${g9_neg.leftTailP}`);
assert(g9_neg.rightTailP === 1.0, `G9_neg Right tail should be 1.0, got ${g9_neg.rightTailP}`);
assert(g9_neg.percentileRank === "0.00%", `G9_neg Percentile should be 0.00%, got ${g9_neg.percentileRank}`);

// G10: Inverse CDF Round-Trip tests
const roundTripProbs = [0.001, 0.01, 0.025, 0.05, 0.1, 0.5, 0.9, 0.95, 0.975, 0.99, 0.999];
for (const p of roundTripProbs) {
  const z = inverseNormalCDF(p);
  const pBack = normalCDF(z);
  assert(Math.abs(pBack - p) < 1e-6, `Round trip failed for p=${p}: got pBack=${pBack}`);
}
console.log("✓ G10 Passed: Inverse CDF Round-trip verified across all probability checkpoints");

// Edge Cases: Zero SD and Negative SD
const edgeZeroSD = computeStandardZ(10, 10, 0);
assert(!edgeZeroSD.isValid, "Zero SD must be flagged invalid");
assert(isNaN(edgeZeroSD.zScore), "Zero SD Z-score must be NaN");

const edgeNegSD = computeStandardZ(10, 10, -10);
assert(!edgeNegSD.isValid, "Negative SD must be flagged invalid");
assert(isNaN(edgeNegSD.zScore), "Negative SD Z-score must be NaN");

// Reversed Interval (X1 > X2)
const edgeReversedInt = computeIntervalZ(80, 60, 70, 10);
assert(edgeReversedInt.isValid, "Reversed interval should auto-order bounds");
assert(edgeReversedInt.x1 === 60 && edgeReversedInt.x2 === 80, "x1 and x2 should be properly ordered");
assert(edgeReversedInt.areaBetweenPct === "68.27%", "Reversed interval area should match 68.27%");

// Equal Interval (X1 == X2)
const edgeEqualInt = computeIntervalZ(70, 70, 70, 10);
assert(edgeEqualInt.isValid, "Equal interval should be valid");
assert(edgeEqualInt.areaBetween === 0.0, "Equal interval area between must be 0");
assert(edgeEqualInt.areaOutside === 1.0, "Equal interval area outside must be 1.0");

// Batch Invalid Tokens
const edgeBatchInvalid = computeBatchZ("65, 70, abc, 80");
assert(edgeBatchInvalid.count === 3, "Batch should parse valid numbers");
assert(edgeBatchInvalid.invalidTokens.includes("abc"), "Batch should flag 'abc' as invalid token");

console.log("✓ All Edge Cases Passed (Zero SD, Negative SD, Reversed Interval, Equal Interval, Token Validation)");

// -----------------------------------------------------------------------------
// 2. RANDOMIZED STRESS TESTING
// -----------------------------------------------------------------------------
console.log("\n--- PART 2: RANDOMIZED TESTING (18,000 RUNS) ---");

// Test A: 5,000 Randomized Standard Z-Scores
let passedZ = 0;
for (let i = 0; i < 5000; i++) {
  const x = (Math.random() - 0.5) * 10000;
  const mu = (Math.random() - 0.5) * 5000;
  const sigma = Math.random() * 500 + 0.001;

  const expectedZ = (x - mu) / sigma;
  const res = computeStandardZ(x, mu, sigma, false, 4);

  assert(res.isValid, `Random Z #${i} must be valid`);
  assert(Math.abs(res.zScore - expectedZ) < 1e-9, `Random Z #${i} mismatch`);
  assert(res.leftTailP >= 0 && res.leftTailP <= 1, `Left tail P #${i} must be in [0,1]`);
  assert(res.rightTailP >= 0 && res.rightTailP <= 1, `Right tail P #${i} must be in [0,1]`);
  assert(res.twoTailsP >= 0 && res.twoTailsP <= 1, `Two-tail P #${i} must be in [0,1]`);
  assert(res.betweenP >= 0 && res.betweenP <= 1, `Between P #${i} must be in [0,1]`);
  passedZ++;
}
console.log(`✓ 5,000 / 5,000 Randomized Standard Z-Score tests passed (100.00%)`);

// Test B: 5,000 Randomized CDF calculations
let passedCDF = 0;
for (let i = 0; i < 5000; i++) {
  const z = (Math.random() - 0.5) * 20; // range [-10, 10]
  const p = normalCDF(z);
  const pNeg = normalCDF(-z);

  assert(p >= 0 && p <= 1, `CDF #${i} must be in [0,1]`);
  assert(Math.abs(p + pNeg - 1.0) < 1e-5, `CDF symmetry #${i} violated: p=${p}, pNeg=${pNeg}`);
  passedCDF++;
}
console.log(`✓ 5,000 / 5,000 Randomized Normal CDF tests passed (100.00%)`);

// Test C: 3,000 Randomized Inverse CDF Round-Trip calculations
let passedInv = 0;
for (let i = 0; i < 3000; i++) {
  const p = Math.random() * 0.998 + 0.001; // range [0.001, 0.999]
  const z = inverseNormalCDF(p);
  const pBack = normalCDF(z);

  assert(Number.isFinite(z), `Inverse CDF #${i} returned non-finite: ${z}`);
  assert(Math.abs(pBack - p) < 1e-5, `Inverse CDF round-trip #${i} mismatch: orig=${p}, back=${pBack}`);
  passedInv++;
}
console.log(`✓ 3,000 / 3,000 Randomized Inverse Normal CDF round-trip tests passed (100.00%)`);

// Test D: 3,000 Randomized Interval Area calculations
let passedInt = 0;
for (let i = 0; i < 3000; i++) {
  const x1 = (Math.random() - 0.5) * 5000;
  const x2 = (Math.random() - 0.5) * 5000;
  const mu = (Math.random() - 0.5) * 2500;
  const sigma = Math.random() * 200 + 0.01;

  const res = computeIntervalZ(x1, x2, mu, sigma, 4);
  assert(res.isValid, `Interval #${i} must be valid`);
  assert(res.areaBetween >= 0 && res.areaBetween <= 1, `Area between #${i} must be in [0,1]`);
  assert(res.areaOutside >= 0 && res.areaOutside <= 1, `Area outside #${i} must be in [0,1]`);
  assert(Math.abs(res.areaBetween + res.areaOutside - 1.0) < 1e-4, `Area sum #${i} must be 1.0`);
  passedInt++;
}
console.log(`✓ 3,000 / 3,000 Randomized Interval Area calculations passed (100.00%)`);

// Test E: 2,000 Randomized Batch Dataset calculations
let passedBatch = 0;
for (let i = 0; i < 2000; i++) {
  const n = Math.floor(Math.random() * 30) + 3; // 3 to 32 elements
  const data: number[] = [];
  for (let j = 0; j < n; j++) {
    data.push(parseFloat(((Math.random() - 0.5) * 200).toFixed(2)));
  }

  const str = data.join(", ");
  const res = computeBatchZ(str, 4);

  assert(res.count === n, `Batch #${i} count mismatch`);
  const expectedMean = data.reduce((a, b) => a + b, 0) / n;
  assert(Math.abs(res.mean - expectedMean) < 1e-3, `Batch #${i} mean mismatch`);

  const expectedSqDev = data.reduce((acc, v) => acc + Math.pow(v - expectedMean, 2), 0);
  const expectedVar = expectedSqDev / (n - 1);
  const expectedSD = Math.sqrt(expectedVar);
  assert(Math.abs(res.sd - expectedSD) < 1e-3, `Batch #${i} SD mismatch`);
  passedBatch++;
}
console.log(`✓ 2,000 / 2,000 Randomized Batch Dataset calculations passed (100.00%)`);

console.log("\n===============================================================================");
console.log(`AUDIT COMPLETE: ${passedZ + passedCDF + passedInv + passedInt + passedBatch} RANDOMIZED TESTS PASSED (100.00%)`);
console.log("===============================================================================");
