import { calculateBmr, BmrInput, ActivityLevel, SmartGoal, BmrFormula, Gender } from "../src/lib/formulas/bmr";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, msg: string) {
  totalTests++;
  if (condition) {
    passedTests++;
  } else {
    failedTests++;
    console.error(`❌ FAILURE: ${msg}`);
  }
}

function approxEq(a: number, b: number, tolerance = 1.0): boolean {
  return Math.abs(a - b) <= tolerance;
}

// Independent Mathematical Oracles
function oracleMifflin(wKg: number, hCm: number, age: number, isMale: boolean): number {
  return Math.round(10 * wKg + 6.25 * hCm - 5 * age + (isMale ? 5 : -161));
}

function oracleHarris(wKg: number, hCm: number, age: number, isMale: boolean): number {
  if (isMale) {
    return Math.round(88.362 + 13.397 * wKg + 4.799 * hCm - 5.677 * age);
  } else {
    return Math.round(447.593 + 9.247 * wKg + 3.098 * hCm - 4.330 * age);
  }
}

function oracleKatch(wKg: number, bfp: number): number {
  const lbmKg = wKg * (1 - bfp / 100);
  return Math.round(370 + 21.6 * lbmKg);
}

console.log("\n==================================================");
console.log("MASTER QA + FORENSIC REGRESSION SUITE: BMR CALCULATOR");
console.log("==================================================");

// ----------------------------------------------------
// TEST SUITE 1: CANONICAL PDF BASELINE
// ----------------------------------------------------
console.log("\n--- TEST SUITE 1: Canonical PDF Reference Baseline ---");
{
  // PDF: Age 25, Male, 5 ft 10 in (70 in = 177.8 cm), 160 lbs (72.5748 kg), Mifflin, Moderate (1.55x)
  const resPdf = calculateBmr({
    unitSystem: "us",
    gender: "male",
    age: 25,
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 160,
    bmrFormula: "mifflin",
    activityLevel: "moderate",
    selectedGoal: "maintain",
  });

  assert(resPdf.selectedBmr === 1717, `PDF Selected BMR must be 1,717 kcal (got ${resPdf.selectedBmr})`);
  assert(resPdf.tdee === 2661, `PDF Maintenance TDEE must be 2,661 kcal (got ${resPdf.tdee})`);
  assert(resPdf.smartGoalInfo.targetCalories === 2661, `PDF Goal Target must be 2,661 kcal (got ${resPdf.smartGoalInfo.targetCalories})`);
  assert(approxEq(resPdf.leanMassLbs, 132.6, 0.2), `PDF Lean Body Mass must be approx 132.6 lbs (got ${resPdf.leanMassLbs})`);
  assert(approxEq(resPdf.estimatedBfp, 17.1, 0.1), `PDF Estimated Body Fat must be 17.1% (got ${resPdf.estimatedBfp})`);
  assert(resPdf.hydration.waterLiters === 3.2, `PDF Water target must be 3.2 L (got ${resPdf.hydration.waterLiters})`);
  assert(resPdf.hydration.waterCups === 14, `PDF Water cups must be 14 cups (got ${resPdf.hydration.waterCups})`);
}

// ----------------------------------------------------
// TEST SUITE 2: SCREENSHOT BASELINES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 2: Screenshot Baselines (Metric, Other, Harris) ---");
{
  // Screenshot 1: Metric units 178 cm, 72.6 kg, Age 25, Male, Mifflin, Moderate
  const resScreen1 = calculateBmr({
    unitSystem: "metric",
    gender: "male",
    age: 25,
    heightCm: 178,
    weightKg: 72.6,
    bmrFormula: "mifflin",
    activityLevel: "moderate",
    selectedGoal: "maintain",
  });
  assert(resScreen1.selectedBmr === 1719, `Screenshot 1 BMR must be 1,719 kcal (got ${resScreen1.selectedBmr})`);
  assert(resScreen1.tdee === 2664, `Screenshot 1 TDEE must be 2,664 kcal (got ${resScreen1.tdee})`);

  // Screenshot 2: Other units 1.78 m, 72.5 kg, Age 25, Male, Mifflin, Moderate
  const resScreen2 = calculateBmr({
    unitSystem: "other",
    gender: "male",
    age: 25,
    heightMeters: 1.78,
    weightKgOther: 72.5,
    bmrFormula: "mifflin",
    activityLevel: "moderate",
    selectedGoal: "maintain",
  });
  assert(resScreen2.selectedBmr === 1718, `Screenshot 2 BMR must be 1,718 kcal (got ${resScreen2.selectedBmr})`);
  assert(resScreen2.tdee === 2663, `Screenshot 2 TDEE must be 2,663 kcal (got ${resScreen2.tdee})`);

  // Screenshot 3: Revised Harris-Benedict (1984), Sedentary (1.2x), Aggressive Bulk (+500 kcal)
  const resScreen3 = calculateBmr({
    unitSystem: "us",
    gender: "male",
    age: 25,
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 160,
    bmrFormula: "harris",
    activityLevel: "sedentary",
    selectedGoal: "aggressive_bulk",
  });
  assert(resScreen3.selectedBmr === 1772, `Screenshot 3 Harris BMR must be 1,772 kcal (got ${resScreen3.selectedBmr})`);
  assert(resScreen3.tdee === 2126, `Screenshot 3 Sedentary TDEE must be 2,126 kcal (got ${resScreen3.tdee})`);
  assert(resScreen3.smartGoalInfo.targetCalories === 2626, `Screenshot 3 Aggressive Bulk target must be 2,626 kcal (got ${resScreen3.smartGoalInfo.targetCalories})`);
}

// ----------------------------------------------------
// TEST SUITE 3: 1,000 RANDOMIZED MIFFLIN-ST JEOR CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 3: 1,000 Randomized Mifflin-St Jeor Cases ---");
for (let i = 0; i < 1000; i++) {
  const age = 15 + Math.floor(Math.random() * 85);
  const wKg = 40 + Math.random() * 120;
  const hCm = 130 + Math.random() * 80;
  const isMale = Math.random() > 0.5;
  const gender: Gender = isMale ? "male" : "female";

  const res = calculateBmr({
    unitSystem: "metric",
    gender,
    age,
    heightCm: hCm,
    weightKg: wKg,
    bmrFormula: "mifflin",
  });

  const expected = oracleMifflin(wKg, hCm, age, isMale);
  assert(res.selectedBmr === expected, `Mifflin Case #${i + 1} mismatch: got ${res.selectedBmr}, expected ${expected}`);
}

// ----------------------------------------------------
// TEST SUITE 4: 1,000 RANDOMIZED REVISED HARRIS-BENEDICT CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 4: 1,000 Randomized Revised Harris-Benedict Cases ---");
for (let i = 0; i < 1000; i++) {
  const age = 15 + Math.floor(Math.random() * 85);
  const wKg = 40 + Math.random() * 120;
  const hCm = 130 + Math.random() * 80;
  const isMale = Math.random() > 0.5;
  const gender: Gender = isMale ? "male" : "female";

  const res = calculateBmr({
    unitSystem: "metric",
    gender,
    age,
    heightCm: hCm,
    weightKg: wKg,
    bmrFormula: "harris",
  });

  const expected = oracleHarris(wKg, hCm, age, isMale);
  assert(res.selectedBmr === expected, `Harris Case #${i + 1} mismatch: got ${res.selectedBmr}, expected ${expected}`);
}

// ----------------------------------------------------
// TEST SUITE 5: 1,000 RANDOMIZED KATCH-MCARDLE CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 5: 1,000 Randomized Katch-McArdle Cases ---");
for (let i = 0; i < 1000; i++) {
  const age = 18 + Math.floor(Math.random() * 60);
  const wKg = 45 + Math.random() * 100;
  const hCm = 140 + Math.random() * 60;
  const bfp = parseFloat((8 + Math.random() * 35).toFixed(1));

  const res = calculateBmr({
    unitSystem: "metric",
    gender: "male",
    age,
    heightCm: hCm,
    weightKg: wKg,
    bmrFormula: "katch",
    bodyFatPercentage: bfp,
  });

  const expected = oracleKatch(wKg, bfp);
  assert(approxEq(res.selectedBmr, expected, 1), `Katch Case #${i + 1} mismatch: got ${res.selectedBmr}, expected ${expected}`);
}

// ----------------------------------------------------
// TEST SUITE 6: 1,000 ACTIVITY MULTIPLIER & TDEE CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 6: 1,000 Activity Multiplier & TDEE Cases ---");
const actLevels: ActivityLevel[] = ["sedentary", "light", "moderate", "active", "very_active", "extra_active"];
const actMultMap: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
  extra_active: 2.0,
};

for (let i = 0; i < 1000; i++) {
  const act = actLevels[i % actLevels.length];
  const age = 20 + Math.floor(Math.random() * 60);
  const wKg = 50 + Math.random() * 80;
  const hCm = 150 + Math.random() * 45;

  const res = calculateBmr({
    unitSystem: "metric",
    gender: "male",
    age,
    heightCm: hCm,
    weightKg: wKg,
    activityLevel: act,
  });

  const expectedTdee = Math.round(res.selectedBmr * actMultMap[act]);
  assert(res.tdee === expectedTdee, `TDEE Case #${i + 1} mismatch: got ${res.tdee}, expected ${expectedTdee}`);

  // Check activity comparison tiers table in result
  res.activityTiers.forEach((tier) => {
    const expTierTdee = Math.round(res.selectedBmr * tier.multiplier);
    assert(tier.tdee === expTierTdee, `Activity tier ${tier.label} mismatch: got ${tier.tdee}, expected ${expTierTdee}`);
  });
}

// ----------------------------------------------------
// TEST SUITE 7: 500 UNIT CONVERSION ROUND-TRIP CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 7: 500 Unit Conversion Round-Trip Cases ---");
for (let i = 0; i < 500; i++) {
  const feet = 5 + Math.floor(Math.random() * 2);
  const inches = Math.floor(Math.random() * 12);
  const lbs = 120 + Math.floor(Math.random() * 120);

  // US result
  const resUs = calculateBmr({
    unitSystem: "us",
    gender: "male",
    age: 30,
    heightFeet: feet,
    heightInches: inches,
    weightLbs: lbs,
  });

  // Convert to Metric
  const totalInches = feet * 12 + inches;
  const cm = totalInches * 2.54;
  const kg = lbs * 0.45359237;

  const resMetric = calculateBmr({
    unitSystem: "metric",
    gender: "male",
    age: 30,
    heightCm: cm,
    weightKg: kg,
  });

  // Convert to Other (m, kg)
  const m = cm / 100;
  const resOther = calculateBmr({
    unitSystem: "other",
    gender: "male",
    age: 30,
    heightMeters: m,
    weightKgOther: kg,
  });

  assert(approxEq(resUs.selectedBmr, resMetric.selectedBmr, 1), `US -> Metric conversion drift: US ${resUs.selectedBmr} vs Metric ${resMetric.selectedBmr}`);
  assert(approxEq(resMetric.selectedBmr, resOther.selectedBmr, 1), `Metric -> Other conversion drift: Metric ${resMetric.selectedBmr} vs Other ${resOther.selectedBmr}`);
  assert(approxEq(resUs.tdee, resMetric.tdee, 2), `TDEE drift: US ${resUs.tdee} vs Metric ${resMetric.tdee}`);
}

// ----------------------------------------------------
// TEST SUITE 8: 500 SMART GOAL MACRO RECONCILIATION CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 8: 500 Smart Goal Macro Reconciliation Cases ---");
const goals: SmartGoal[] = ["aggressive_cut", "slow_cut", "maintain", "slow_bulk", "aggressive_bulk", "performance"];

for (let i = 0; i < 500; i++) {
  const goal = goals[i % goals.length];
  const res = calculateBmr({
    unitSystem: "metric",
    gender: "male",
    age: 28,
    heightCm: 175,
    weightKg: 75,
    selectedGoal: goal,
  });

  const g = res.smartGoalInfo;
  // Macro calories sum must be consistent with target calories within rounding tolerance
  const macroSum = g.proteinCalories + g.carbsCalories + g.fatCalories;
  assert(approxEq(macroSum, g.targetCalories, 3), `Macro calorie sum drift: sum ${macroSum} vs target ${g.targetCalories}`);

  // Grams must match calories: P * 4, C * 4, F * 9
  const gramsCal = g.proteinGrams * 4 + g.carbsGrams * 4 + g.fatGrams * 9;
  assert(approxEq(gramsCal, g.targetCalories, 20), `Macro grams calorie drift: got ${gramsCal}, target ${g.targetCalories}`);
}

// ----------------------------------------------------
// TEST SUITE 9: 500 BOUNDARY & EXTREME CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 9: 500 Boundary & Extreme Cases ---");
const boundaryInputs: Partial<BmrInput>[] = [
  { age: 15, heightCm: 80, weightKg: 25 },
  { age: 120, heightCm: 250, weightKg: 350 },
  { age: 0, heightCm: 0, weightKg: 0 },
  { age: -10, heightCm: -50, weightKg: -20 },
  { age: 999, heightCm: 999, weightKg: 999 },
  { age: 25, heightFeet: 3, heightInches: 0, weightLbs: 50 },
  { age: 25, heightFeet: 8, heightInches: 11, weightLbs: 700 },
  { age: 25, heightMeters: 0.5, weightKgOther: 10 },
  { age: 25, heightMeters: 3.0, weightKgOther: 500 },
  { age: 25, bodyFatPercentage: 0 },
  { age: 25, bodyFatPercentage: 4 },
  { age: 25, bodyFatPercentage: 60 },
  { age: 25, bodyFatPercentage: 100 },
];

boundaryInputs.forEach((inp, idx) => {
  const res = calculateBmr({
    gender: "male",
    age: inp.age || 25,
    heightCm: inp.heightCm,
    weightKg: inp.weightKg,
    heightFeet: inp.heightFeet,
    heightInches: inp.heightInches,
    weightLbs: inp.weightLbs,
    heightMeters: inp.heightMeters,
    weightKgOther: inp.weightKgOther,
    bodyFatPercentage: inp.bodyFatPercentage,
  });

  assert(!isNaN(res.selectedBmr) && isFinite(res.selectedBmr) && res.selectedBmr > 0, `Boundary #${idx + 1} BMR must be positive finite number`);
  assert(!isNaN(res.tdee) && isFinite(res.tdee) && res.tdee > 0, `Boundary #${idx + 1} TDEE must be positive finite number`);
  assert(!isNaN(res.bmi) && isFinite(res.bmi) && res.bmi > 0, `Boundary #${idx + 1} BMI must be positive finite number`);
  assert(!isNaN(res.estimatedBfp) && res.estimatedBfp >= 4 && res.estimatedBfp <= 65, `Boundary #${idx + 1} BFP clamp valid`);
});

for (let i = 0; i < 487; i++) {
  const age = Math.random() > 0.5 ? 15 : 120;
  const wKg = Math.random() > 0.5 ? 25 : 350;
  const hCm = Math.random() > 0.5 ? 80 : 250;
  const res = calculateBmr({
    gender: "female",
    age,
    heightCm: hCm,
    weightKg: wKg,
  });
  assert(!isNaN(res.selectedBmr) && res.selectedBmr > 0, `Extreme Case #${i + 1} valid`);
}

// ----------------------------------------------------
// TEST SUITE 10: 500 STATE-SWITCHING CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 10: 500 State-Switching Cases ---");
const formulas: BmrFormula[] = ["mifflin", "harris", "katch"];
for (let i = 0; i < 500; i++) {
  const f1 = formulas[i % formulas.length];
  const f2 = formulas[(i + 1) % formulas.length];
  const g1 = goals[i % goals.length];
  const g2 = goals[(i + 1) % goals.length];

  const res1 = calculateBmr({
    gender: "male",
    age: 25,
    heightCm: 178,
    weightKg: 72.6,
    bmrFormula: f1,
    selectedGoal: g1,
  });

  const res2 = calculateBmr({
    gender: "male",
    age: 25,
    heightCm: 178,
    weightKg: 72.6,
    bmrFormula: f2,
    selectedGoal: g2,
  });

  // Switch back to f1 and g1
  const res3 = calculateBmr({
    gender: "male",
    age: 25,
    heightCm: 178,
    weightKg: 72.6,
    bmrFormula: f1,
    selectedGoal: g1,
  });

  assert(res1.selectedBmr === res3.selectedBmr, `Formula switch state idempotency for ${f1}`);
  assert(res1.smartGoalInfo.targetCalories === res3.smartGoalInfo.targetCalories, `Goal switch state idempotency for ${g1}`);
}

// ----------------------------------------------------
// SUMMARY
// ----------------------------------------------------
console.log("\n==================================================");
console.log("MASTER QA TEST RESULTS SUMMARY");
console.log("==================================================");
console.log(`TOTAL TESTS:  ${totalTests}`);
console.log(`TESTS PASSED: ${passedTests}`);
console.log(`TESTS FAILED: ${failedTests}`);
console.log(`PASS RATE:    ${((passedTests / totalTests) * 100).toFixed(2)}%`);

if (failedTests === 0) {
  console.log("\nALL 10 TEST SUITES COMPLETED WITH 100% SUCCESS!");
} else {
  console.error(`\nFAILED ${failedTests} TESTS.`);
  process.exit(1);
}
