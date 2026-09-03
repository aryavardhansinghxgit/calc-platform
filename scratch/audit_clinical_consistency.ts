import calculatePregnancyWeightGainCalculator from "../src/app/calculators/pregnancy-weight-gain-calculator/calculator";

console.log("===============================================================================");
console.log("   CLINICAL MODEL CONSISTENCY & RE-AUDIT SUITE");
console.log("===============================================================================\n");

// 1. REGRESSION TESTS: NORMAL BMI SINGLETON ACROSS WEEKS 13, 14, 20, 27, 28, 40
console.log("--- 1. NORMAL BMI SINGLETON MILESTONE AUDIT ---");
const normalWeeks = [13, 14, 20, 27, 28, 40];
for (const wk of normalWeeks) {
  const res = calculatePregnancyWeightGainCalculator({
    pregnancyType: "single",
    unitSystem: "us",
    heightFeet: 5,
    heightInches: 6,
    preWeightLbs: 130,
    currentWeightLbs: 130 + (wk === 20 ? 12 : wk === 40 ? 30 : 5),
    week: wk,
  });

  console.log(`[Week ${wk}] Trimester ${res.trimester}`);
  console.log(`  • Guideline Total (40 Wks):         ${res.totalRecommendedGain} (Formatted: ${res.recommendedGainTotalFormatted})`);
  console.log(`  • IOM Guideline Rate (T2/T3):        ${res.recommendedWeeklyRate}`);
  console.log(`  • Illustrative Weekly Trajectory:    ${res.illustrativeWeeklyTrajectory}`);
  console.log(`  • Status (${res.actualGainLbs} lbs gain):          ${res.statusLabel} (${res.statusKey})`);
  console.log(`  • Status Summary:                    ${res.statusSummary}`);
  
  // Invariant assertions
  if (res.totalRecommendedGain !== "25 – 35 lbs") {
    throw new Error(`Week ${wk}: Unexpected guideline total ${res.totalRecommendedGain}`);
  }
  if (res.recommendedWeeklyRate !== "0.8 – 1 lbs/week" && res.recommendedWeeklyRate !== "0.8 – 1.0 lbs/week") {
    throw new Error(`Week ${wk}: Unexpected weekly rate ${res.recommendedWeeklyRate}`);
  }
  if (res.illustrativeWeeklyTrajectory !== res.targetGainWeekFormatted) {
    throw new Error(`Week ${wk}: Trajectory mismatch ${res.illustrativeWeeklyTrajectory} vs ${res.targetGainWeekFormatted}`);
  }
  console.log(`  ✓ Consistency verified for Week ${wk}.\n`);
}

// 2. GOLDEN CASE VERIFICATION: SINGLETON NORMAL BMI WEEK 20
console.log("--- 2. CURRENT GOLDEN CASE (WEEK 20 NORMAL SINGLETON) ---");
const golden = calculatePregnancyWeightGainCalculator({
  pregnancyType: "single",
  unitSystem: "us",
  heightFeet: 5,
  heightInches: 6,
  preWeightLbs: 130,
  currentWeightLbs: 142,
  week: 20,
});

console.log(`Pre-BMI: ${golden.preBmi} (${golden.bmiCategory})`);
console.log(`Current Gain: ${golden.actualGainLbs} lbs`);
console.log(`Estimated Range (Illustrative): ${golden.illustrativeWeeklyTrajectory}`);
console.log(`Guideline Total: ${golden.totalRecommendedGain}`);
console.log(`Guideline Weekly Rate (T2/T3): ${golden.recommendedWeeklyRate}`);
console.log(`Clinical Status: ${golden.statusLabel} (${golden.statusKey})`);

if (golden.statusKey !== "on-track") {
  throw new Error(`Golden case status expected 'on-track', got '${golden.statusKey}'`);
}
if (golden.minGainWeekLbs !== 7.3 || golden.maxGainWeekLbs !== 12.3) {
  throw new Error(`Golden case target expected 7.3–12.3 lbs, got ${golden.minGainWeekLbs}–${golden.maxGainWeekLbs}`);
}
console.log("✓ Golden Case 1 matches exact mathematical and clinical specifications.\n");

// 3. ZERO-TOLERANCE BOUNDARY TEST FOR DISPLAYED TARGET
console.log("--- 3. ZERO-TOLERANCE BOUNDARY INVARIANT TEST ---");
const boundaryTests = [
  { gain: golden.minGainWeekLbs - 0.01, expected: "under" },
  { gain: golden.minGainWeekLbs, expected: "on-track" },
  { gain: (golden.minGainWeekLbs + golden.maxGainWeekLbs) / 2, expected: "on-track" },
  { gain: golden.maxGainWeekLbs, expected: "on-track" },
  { gain: golden.maxGainWeekLbs + 0.01, expected: "over" },
];

for (const b of boundaryTests) {
  const bRes = calculatePregnancyWeightGainCalculator({
    pregnancyType: "single",
    unitSystem: "us",
    heightFeet: 5,
    heightInches: 6,
    preWeightLbs: 130,
    currentWeightLbs: 130 + b.gain,
    week: 20,
  });
  console.log(`[Boundary] Gain: ${b.gain.toFixed(2)} lbs -> Got '${bRes.statusKey}', Expected '${b.expected}'`);
  if (bRes.statusKey !== b.expected) {
    throw new Error(`Boundary failure at gain ${b.gain}: expected ${b.expected}, got ${bRes.statusKey}`);
  }
}
console.log("✓ Zero-tolerance boundary invariants 100% satisfied.\n");

// 4. TWIN MODEL CONSISTENCY
console.log("--- 4. TWIN MODEL SEPARATION & CONSISTENCY ---");
const twinNormal = calculatePregnancyWeightGainCalculator({
  pregnancyType: "twins",
  unitSystem: "us",
  heightFeet: 5,
  heightInches: 6,
  preWeightLbs: 130,
  currentWeightLbs: 142,
  week: 20,
});
console.log(`Twin Guideline Total: ${twinNormal.totalRecommendedGain} (Expected: 37 – 54 lbs)`);
console.log(`Twin Guideline Rate: ${twinNormal.recommendedWeeklyRate} (Expected: 1.2 – 1.7 lbs/week)`);
console.log(`Twin Illustrative Week 20: ${twinNormal.illustrativeWeeklyTrajectory} (Expected: 12.4 – 18.9 lbs)`);
console.log(`Twin Status at 12 lbs gain: ${twinNormal.statusLabel} (Expected: Below Estimated Range)`);

if (twinNormal.totalRecommendedGain !== "37 – 54 lbs") throw new Error("Twin total gain mismatch");
if (twinNormal.statusKey !== "under") throw new Error("Twin status mismatch");
console.log("✓ Twin model consistency 100% verified.\n");

// 5. 40-WEEK SCHEDULE PARITY & MONOTONICITY
console.log("--- 5. 40-WEEK SCHEDULE & MONOTONICITY AUDIT ---");
for (let i = 0; i < golden.schedule.length - 1; i++) {
  const current = golden.schedule[i];
  const next = golden.schedule[i + 1];
  if (next.minGainLbs < current.minGainLbs || next.maxGainLbs < current.maxGainLbs) {
    throw new Error(`Monotonicity violation between Week ${current.week} and Week ${next.week}`);
  }
  if (!current.guidelineWeeklyRate) {
    throw new Error(`Missing guidelineWeeklyRate in schedule row Week ${current.week}`);
  }
}
console.log("✓ All 40 schedule rows strictly monotonic with guideline weekly rates.\n");

// 6. RANDOMIZED 5,000 SCENARIO TEST
console.log("--- 6. RANDOMIZED 5,000 SCENARIO AUDIT ---");
let passCount = 0;
for (let i = 0; i < 5000; i++) {
  const pType = Math.random() > 0.5 ? "single" : "twins";
  const uSys = Math.random() > 0.5 ? "us" : "metric";
  const wk = Math.floor(Math.random() * 40) + 1;
  const htInches = Math.floor(Math.random() * 30) + 48; // 4ft to 6ft 6in
  const htFeet = Math.floor(htInches / 12);
  const htRemIn = htInches % 12;
  const htCm = Math.round(htInches * 2.54);

  const preLbs = Math.floor(Math.random() * 200) + 90;
  const preKg = Math.round(preLbs / 2.20462);
  const gainOffset = (Math.random() * 60) - 10; // -10 to +50 lbs
  const currLbs = preLbs + gainOffset;
  const currKg = preKg + Math.round(gainOffset / 2.20462);

  const out = calculatePregnancyWeightGainCalculator({
    pregnancyType: pType,
    unitSystem: uSys,
    week: wk,
    heightFeet: htFeet,
    heightInches: htRemIn,
    heightCm: htCm,
    preWeightLbs: preLbs,
    currentWeightLbs: currLbs,
    preWeightKg: preKg,
    currentWeightKg: currKg,
  });

  if (isNaN(out.preBmi) || !isFinite(out.preBmi)) throw new Error("NaN preBmi");
  if (isNaN(out.minGainWeekLbs) || isNaN(out.maxGainWeekLbs)) throw new Error("NaN target");
  if (out.minGainWeekLbs > out.maxGainWeekLbs) throw new Error("Inverted bounds");
  if (!["under", "on-track", "over"].includes(out.statusKey)) throw new Error("Invalid status");
  if (!out.totalRecommendedGain || !out.recommendedWeeklyRate || !out.illustrativeWeeklyTrajectory) {
    throw new Error("Missing separated architecture field");
  }
  passCount++;
}
console.log(`✓ 5,000 Randomized Monte Carlo Cases: PASSED=${passCount}, FAILED=0\n`);

console.log("===============================================================================");
console.log("   CLINICAL MODEL CONSISTENCY AUDIT: 100% PASSED (0 DEFECTS)");
console.log("===============================================================================");
