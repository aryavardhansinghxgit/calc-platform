import { calculateTargetHeartRate } from "../src/lib/formulas/targetHeartRate";

function assert(condition: boolean, msg: string) {
  if (!condition) {
    throw new Error(`Assertion failed: ${msg}`);
  }
}

console.log("=== STARTING TARGET HEART RATE REGRESSION AUDIT ===");

// -------------------------------------------------------------
// BENCHMARK CASE 1: Age 30, Haskell, MHR 190, RHR 70, Karvonen 65%
// -------------------------------------------------------------
const c1 = calculateTargetHeartRate({
  mhrMode: "estimate",
  age: 30,
  rhr: 70,
  formula: "haskell",
  method: "karvonen",
});

assert(c1.isValid === true, "Case 1 must be valid");
assert(c1.calculatedMhr === 190, `Case 1 MHR should be 190, got ${c1.calculatedMhr}`);
assert(c1.rhr === 70, `Case 1 RHR should be 70, got ${c1.rhr}`);
assert(c1.hrr === 120, `Case 1 HRR should be 120, got ${c1.hrr}`);
assert(c1.targetBpm === 148, `Case 1 Karvonen target should be 148, got ${c1.targetBpm}`);
assert(c1.zones.length === 5, "Case 1 should have 5 zones");
assert(c1.zones[0].minBpm === 130 && c1.zones[0].maxBpm === 142, `Zone 1 should be 130-142, got ${c1.zones[0].minBpm}-${c1.zones[0].maxBpm}`);
assert(c1.zones[1].minBpm === 142 && c1.zones[1].maxBpm === 154, `Zone 2 should be 142-154, got ${c1.zones[1].minBpm}-${c1.zones[1].maxBpm}`);
assert(c1.zones[4].minBpm === 178 && c1.zones[4].maxBpm === 190, `Zone 5 should be 178-190, got ${c1.zones[4].minBpm}-${c1.zones[4].maxBpm}`);
console.log("✓ Benchmark Case 1 (Karvonen 65% = 148 BPM) passed");

// -------------------------------------------------------------
// BENCHMARK CASE 2: Age 30, Haskell, MHR 190, RHR 70, Standard 65%
// -------------------------------------------------------------
const c2 = calculateTargetHeartRate({
  mhrMode: "estimate",
  age: 30,
  rhr: 70,
  formula: "haskell",
  method: "standard",
});

assert(c2.isValid === true, "Case 2 must be valid");
assert(c2.calculatedMhr === 190, "Case 2 MHR should be 190");
assert(c2.targetBpm === 124, `Case 2 Standard target should be 124 (0.65 * 190 = 123.5 -> 124), got ${c2.targetBpm}`);
assert(c2.zones[1].minBpm === 114 && c2.zones[1].maxBpm === 133, `Zone 2 Standard should be 114-133, got ${c2.zones[1].minBpm}-${c2.zones[1].maxBpm}`);
console.log("✓ Benchmark Case 2 (Standard 65% = 124 BPM) passed");

// -------------------------------------------------------------
// BENCHMARK CASE 3: MHR 150, RHR 160 (RHR > MHR => BLOCKED)
// -------------------------------------------------------------
const c3 = calculateTargetHeartRate({
  mhrMode: "manual",
  age: 30,
  manualMhr: 150,
  rhr: 160,
  formula: "haskell",
  method: "karvonen",
});

assert(c3.isValid === false, "Case 3 must be blocked");
assert(c3.errorMessage === "Resting Heart Rate must be lower than Maximum Heart Rate.", `Error message mismatch: ${c3.errorMessage}`);
assert(c3.targetBpm === 0, `Case 3 targetBpm must be 0, got ${c3.targetBpm}`);
assert(c3.zones.length === 0, `Case 3 zones must be empty, got length ${c3.zones.length}`);
assert(c3.hrr === 0, `Case 3 HRR must be 0, got ${c3.hrr}`);
console.log("✓ Benchmark Case 3 (RHR 160 > MHR 150 BLOCKED) passed");

// -------------------------------------------------------------
// BENCHMARK CASE 4: MHR 190, RHR 190 (RHR = MHR => BLOCKED)
// -------------------------------------------------------------
const c4 = calculateTargetHeartRate({
  mhrMode: "manual",
  age: 30,
  manualMhr: 190,
  rhr: 190,
  formula: "haskell",
  method: "karvonen",
});

assert(c4.isValid === false, "Case 4 must be blocked");
assert(c4.errorMessage === "Resting Heart Rate must be lower than Maximum Heart Rate.", `Error message mismatch: ${c4.errorMessage}`);
assert(c4.targetBpm === 0, `Case 4 targetBpm must be 0, got ${c4.targetBpm}`);
assert(c4.zones.length === 0, `Case 4 zones must be empty, got length ${c4.zones.length}`);
console.log("✓ Benchmark Case 4 (RHR 190 = MHR 190 BLOCKED) passed");

// -------------------------------------------------------------
// BENCHMARK CASE 5: Manual MHR 195, RHR 65
// -------------------------------------------------------------
const c5 = calculateTargetHeartRate({
  mhrMode: "manual",
  age: 30,
  manualMhr: 195,
  rhr: 65,
  formula: "haskell",
  method: "karvonen",
});

assert(c5.isValid === true, "Case 5 must be valid");
assert(c5.calculatedMhr === 195, `Case 5 MHR should be 195, got ${c5.calculatedMhr}`);
assert(c5.hrr === 130, `Case 5 HRR should be 130, got ${c5.hrr}`);
// Karvonen 60% = 65 + 0.60 * 130 = 65 + 78 = 143 BPM
assert(c5.zones[0].maxBpm === 143, `Zone 1 upper / Zone 2 lower (60%) should be 143, got ${c5.zones[0].maxBpm}`);
assert(c5.zones[1].minBpm === 143, `Zone 2 lower should be 143, got ${c5.zones[1].minBpm}`);
console.log("✓ Benchmark Case 5 (Manual MHR 195, RHR 65, HRR 130, 60% = 143 BPM) passed");

// -------------------------------------------------------------
// BENCHMARK CASE 6: Borg Rating 13
// -------------------------------------------------------------
const c6 = calculateTargetHeartRate({
  mhrMode: "manual",
  age: 30,
  manualMhr: 190,
  rhr: 70,
  formula: "haskell",
  method: "borg620",
  borg620Rating: 13,
});

assert(c6.isValid === true, "Case 6 must be valid");
// Borg 13 factor = (13 - 6) / 14 = 0.50 => 70 + 0.50 * 120 = 130 BPM
assert(c6.targetBpm === 130, `Case 6 Borg 13 target should be 130, got ${c6.targetBpm}`);
console.log("✓ Benchmark Case 6 (Borg 13 = 130 BPM) passed");

// -------------------------------------------------------------
// BENCHMARK CASE 7: Tanaka at Age 40 (208 - 0.7 * 40 = 180)
// -------------------------------------------------------------
const c7 = calculateTargetHeartRate({
  mhrMode: "estimate",
  age: 40,
  rhr: 60,
  formula: "tanaka",
  method: "karvonen",
});

assert(c7.isValid === true, "Case 7 must be valid");
assert(c7.calculatedMhr === 180, `Tanaka at 40 should be 180, got ${c7.calculatedMhr}`);
assert(c7.hrr === 120, `HRR should be 180 - 60 = 120, got ${c7.hrr}`);
console.log("✓ Benchmark Case 7 (Tanaka 40 = 180 BPM) passed");

// -------------------------------------------------------------
// BENCHMARK CASE 8: Nes at Age 30 (211 - 0.64 * 30 = 191.8 -> 192)
// -------------------------------------------------------------
const c8 = calculateTargetHeartRate({
  mhrMode: "estimate",
  age: 30,
  rhr: 60,
  formula: "nes",
  method: "karvonen",
});

assert(c8.isValid === true, "Case 8 must be valid");
assert(c8.calculatedMhr === 192, `Nes at 30 should be 192, got ${c8.calculatedMhr}`);
console.log("✓ Benchmark Case 8 (Nes 30 = 192 BPM) passed");

// -------------------------------------------------------------
// BENCHMARK CASE 9: Gellish at Age 30 (207 - 0.7 * 30 = 186)
// -------------------------------------------------------------
const c9 = calculateTargetHeartRate({
  mhrMode: "estimate",
  age: 30,
  rhr: 60,
  formula: "gellish",
  method: "karvonen",
});

assert(c9.isValid === true, "Case 9 must be valid");
assert(c9.calculatedMhr === 186, `Gellish at 30 should be 186, got ${c9.calculatedMhr}`);
console.log("✓ Benchmark Case 9 (Gellish 30 = 186 BPM) passed");

// -------------------------------------------------------------
// BENCHMARK CASE 10: Borg Table Mathematical Consistency
// -------------------------------------------------------------
assert(c1.borgTable.length === 7, "Borg table must have 7 rows");
for (const row of c1.borgTable) {
  const expectedBpm = row.rating === 20 ? 190 : Math.round(70 + row.multiplier * 120);
  assert(row.bpm === expectedBpm, `Borg rating ${row.rating}: expected ${expectedBpm}, got ${row.bpm}`);
  const expectedPctStr = `${Math.round(row.multiplier * 100)}%`;
  assert(row.pct === expectedPctStr, `Borg rating ${row.rating}: expected pct ${expectedPctStr}, got ${row.pct}`);
}
console.log("✓ Benchmark Case 10 (Borg Table 100% mathematical consistency) passed");

// -------------------------------------------------------------
// BENCHMARK CASE 11: 500 Randomized Valid Trials
// -------------------------------------------------------------
let validPassed = 0;
for (let i = 0; i < 500; i++) {
  const testAge = Math.floor(Math.random() * 70) + 15; // 15 to 84
  const testRhr = Math.floor(Math.random() * 50) + 40; // 40 to 89
  const mhr = 220 - testAge;
  if (testRhr < mhr) {
    const res = calculateTargetHeartRate({
      mhrMode: "estimate",
      age: testAge,
      rhr: testRhr,
      formula: "haskell",
      method: i % 2 === 0 ? "karvonen" : "standard",
    });

    assert(res.isValid === true, `Random trial ${i} should be valid`);
    assert(res.hrr > 0, `Random trial ${i} HRR must be > 0`);
    assert(res.targetBpm >= res.rhr && res.targetBpm <= res.calculatedMhr, `Random trial ${i} targetBpm ${res.targetBpm} must be in [${res.rhr}, ${res.calculatedMhr}]`);
    assert(res.zones.length === 5, `Random trial ${i} must have 5 zones`);
    for (let z = 0; z < 5; z++) {
      assert(res.zones[z].minBpm <= res.zones[z].maxBpm, `Zone ${z} bounds must be ordered`);
      if (z > 0) {
        assert(res.zones[z - 1].maxBpm <= res.zones[z].minBpm, `Zone boundaries must be continuous`);
      }
    }
    validPassed++;
  }
}
console.log(`✓ Benchmark Case 11 (${validPassed}/500 Randomized Valid Trials) passed`);

// -------------------------------------------------------------
// BENCHMARK CASE 12: Edge Cases & Boundary Fuzzing
// -------------------------------------------------------------
const edgeCases = [
  { mhr: 100, rhr: 100, valid: false },
  { mhr: 100, rhr: 101, valid: false },
  { mhr: 100, rhr: 99, valid: true },
  { mhr: 220, rhr: 0, valid: false },
  { mhr: 220, rhr: -10, valid: false },
  { mhr: 0, rhr: 60, valid: false },
  { mhr: -10, rhr: 60, valid: false },
];

for (const ec of edgeCases) {
  const res = calculateTargetHeartRate({
    mhrMode: "manual",
    age: 30,
    manualMhr: ec.mhr,
    rhr: ec.rhr,
    formula: "haskell",
    method: "karvonen",
  });
  assert(res.isValid === ec.valid, `Edge case mhr=${ec.mhr}, rhr=${ec.rhr} should have isValid=${ec.valid}`);
}
console.log("✓ Benchmark Case 12 (Edge cases & Boundary fuzzing) passed");

console.log("=== ALL TARGET HEART RATE REGRESSION BENCHMARKS PASSED SUCCESSFULLY ===");
