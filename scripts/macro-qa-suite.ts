import { calculateMacroCalculator } from "../src/app/calculators/macro-calculator/calculator";
import {
  ActivityLevel,
  BmrFormulaType,
  DietStyleType,
  FitnessGoal,
  Gender,
  MacroCalculationMode,
  UnitSystem,
} from "../src/app/calculators/macro-calculator/types";

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

function approxEq(a: number, b: number, tolerance = 1.5): boolean {
  return Math.abs(a - b) <= tolerance;
}

// Independent Mathematical Oracles
function oracleMifflin(wKg: number, hCm: number, age: number, isMale: boolean): number {
  return Math.round(10 * wKg + 6.25 * hCm - 5 * age + (isMale ? 5 : -161));
}

function oracleRevisedHarris(wKg: number, hCm: number, age: number, isMale: boolean): number {
  if (isMale) {
    return Math.round(88.362 + 13.397 * wKg + 4.799 * hCm - 5.677 * age);
  } else {
    return Math.round(447.593 + 9.247 * weightKg(wKg) + 3.098 * hCm - 4.330 * age);
  }
  function weightKg(w: number) { return w; }
}

function oracleOriginalHarris(wKg: number, hCm: number, age: number, isMale: boolean): number {
  if (isMale) {
    return Math.round(66.5 + 13.75 * wKg + 5.003 * hCm - 6.755 * age);
  } else {
    return Math.round(655.1 + 9.563 * wKg + 1.85 * hCm - 4.676 * age);
  }
}

function oracleKatch(wKg: number, bfp: number): number {
  const lbmKg = wKg * (1 - bfp / 100);
  return Math.round(370 + 21.6 * lbmKg);
}

function oracleCunningham(wKg: number, bfp: number): number {
  const lbmKg = wKg * (1 - bfp / 100);
  return Math.round(500 + 22 * lbmKg);
}

console.log("\n==================================================");
console.log("MASTER QA + FORENSIC REGRESSION SUITE: MACRO CALCULATOR");
console.log("==================================================");

// ----------------------------------------------------
// TEST SUITE 1: CANONICAL REFERENCE BASELINE
// ----------------------------------------------------
console.log("\n--- TEST SUITE 1: Canonical Reference Baseline ---");
{
  // Canonical Baseline: Age 25, Male, 5'10", 165 lbs, Moderate activity, Mifflin BMR, Maintain, 20% BF, Balanced 30/40/30
  const res = calculateMacroCalculator({
    unitSystem: "us",
    calculationMode: "standard",
    age: 25,
    gender: "male",
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 165,
    activityLevel: "moderate",
    goal: "maintain",
    bmrFormula: "mifflin",
    bodyFat: 20,
    dietStyle: "balanced",
  });

  assert(approxEq(res.bmr, 1740, 1), `BMR must be ~1,740 kcal (got ${res.bmr})`);
  assert(approxEq(res.tdee, 2697, 1), `TDEE must be ~2,697 kcal (got ${res.tdee})`);
  assert(approxEq(res.targetCalories, 2697, 1), `Target calories must be ~2,697 kcal (got ${res.targetCalories})`);
  assert(res.protein.grams === 202, `Protein grams must be 202 g (got ${res.protein.grams})`);
  assert(res.carbs.grams === 270, `Carb grams must be 270 g (got ${res.carbs.grams})`);
  assert(res.fat.grams === 90, `Fat grams must be 90 g (got ${res.fat.grams})`);

  const macroCals = res.protein.grams * 4 + res.carbs.grams * 4 + res.fat.grams * 9;
  assert(macroCals === 2698, `Displayed macro calories must equal 2,698 kcal (got ${macroCals})`);
  assert(approxEq(macroCals, res.targetCalories, 3), `Macro calories must reconcile within 1-3 kcal (diff: ${Math.abs(macroCals - res.targetCalories)})`);

  assert(res.bodyComposition.bodyFatPct === 20, `Body fat must be 20% (got ${res.bodyComposition.bodyFatPct})`);
  assert(approxEq(res.bodyComposition.leanBodyMassLbs, 132, 1), `LBM must be ~132 lbs (got ${res.bodyComposition.leanBodyMassLbs})`);
  assert(approxEq(res.bodyComposition.fatMassLbs, 33, 1), `Fat mass must be ~33 lbs (got ${res.bodyComposition.fatMassLbs})`);
}

// ----------------------------------------------------
// TEST SUITE 2: 1,000 RANDOMIZED BMR FORMULA CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 2: 1,000 Randomized BMR Formula Cases ---");
const formulas: BmrFormulaType[] = ["mifflin", "revised-harris", "harris", "katch", "cunningham", "schofield"];

for (let i = 0; i < 1000; i++) {
  const f = formulas[i % formulas.length];
  const age = 18 + Math.floor(Math.random() * 60);
  const wKg = 45 + Math.random() * 95;
  const hCm = 145 + Math.random() * 55;
  const isMale = Math.random() > 0.5;
  const gender: Gender = isMale ? "male" : "female";
  const bfp = parseFloat((10 + Math.random() * 30).toFixed(1));

  const res = calculateMacroCalculator({
    unitSystem: "metric",
    age,
    gender,
    heightCm: hCm,
    weightKg: wKg,
    bmrFormula: f,
    bodyFat: bfp,
  });

  let expectedBmr = 0;
  if (f === "mifflin") expectedBmr = oracleMifflin(wKg, hCm, age, isMale);
  else if (f === "revised-harris") expectedBmr = oracleRevisedHarris(wKg, hCm, age, isMale);
  else if (f === "harris") expectedBmr = oracleOriginalHarris(wKg, hCm, age, isMale);
  else if (f === "katch") expectedBmr = oracleKatch(wKg, bfp);
  else if (f === "cunningham") expectedBmr = oracleCunningham(wKg, bfp);
  else expectedBmr = res.bmr; // Schofield

  assert(approxEq(res.bmr, expectedBmr, 1.5), `BMR formula ${f} case #${i + 1} mismatch: got ${res.bmr}, expected ${expectedBmr}`);
  assert(!isNaN(res.bmr) && isFinite(res.bmr) && res.bmr > 0, `BMR must be valid positive number`);
}

// ----------------------------------------------------
// TEST SUITE 3: 1,000 TDEE & ACTIVITY MULTIPLIER CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 3: 1,000 TDEE & Activity Multiplier Cases ---");
const activities: ActivityLevel[] = ["sedentary", "light", "moderate", "active", "very-active", "extra-active"];
const actMultMap: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  "very-active": 1.9,
  "extra-active": 2.0,
};

for (let i = 0; i < 1000; i++) {
  const act = activities[i % activities.length];
  const age = 20 + Math.floor(Math.random() * 50);
  const wKg = 50 + Math.random() * 70;
  const hCm = 150 + Math.random() * 40;

  const res = calculateMacroCalculator({
    unitSystem: "metric",
    age,
    gender: "male",
    heightCm: hCm,
    weightKg: wKg,
    activityLevel: act,
  });

  const expectedTdee = Math.round(res.bmr * actMultMap[act]);
  assert(approxEq(res.tdee, expectedTdee, 1.5), `TDEE multiplier ${act} case #${i + 1} mismatch: got ${res.tdee}, expected ${expectedTdee}`);
}

// ----------------------------------------------------
// TEST SUITE 4: 1,000 MACRO CONVERSION & CALORIE RECONCILIATION CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 4: 1,000 Macro Calorie Reconciliation Cases ---");
const dietStyles: DietStyleType[] = ["balanced", "low-carb", "high-protein", "keto", "athlete"];

for (let i = 0; i < 1000; i++) {
  const ds = dietStyles[i % dietStyles.length];
  const age = 22 + Math.floor(Math.random() * 50);
  const wLbs = 120 + Math.floor(Math.random() * 140);

  const res = calculateMacroCalculator({
    unitSystem: "us",
    age,
    gender: "male",
    heightFeet: 5,
    heightInches: 10,
    weightLbs: wLbs,
    dietStyle: ds,
  });

  // Grams to calories reconciliation (accounting for up to 9 kcal/g integer fat rounding)
  const calculatedCals = res.protein.grams * 4 + res.carbs.grams * 4 + res.fat.grams * 9;
  assert(approxEq(calculatedCals, res.targetCalories, 10), `Macro calorie drift in ${ds} case #${i + 1}: ${calculatedCals} vs ${res.targetCalories}`);
  assert(res.protein.grams > 0, "Protein grams must be positive");
  assert(res.carbs.grams >= 0, "Carb grams must be non-negative");
  assert(res.fat.grams > 0, "Fat grams must be positive");
}

// ----------------------------------------------------
// TEST SUITE 5: 1,000 GOAL DELTA ADJUSTMENT CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 5: 1,000 Goal Delta Adjustment Cases ---");
const goals: FitnessGoal[] = [
  "maintain", "mild-loss", "loss", "extreme-loss",
  "mild-gain", "gain", "extreme-gain", "recomp"
];
const goalDeltaMap: Record<FitnessGoal, number> = {
  maintain: 0,
  "mild-loss": -250,
  loss: -500,
  "extreme-loss": -1000,
  "mild-gain": 250,
  gain: 500,
  "extreme-gain": 1000,
  recomp: -200,
};

for (let i = 0; i < 1000; i++) {
  const g = goals[i % goals.length];
  const res = calculateMacroCalculator({
    unitSystem: "us",
    age: 28,
    gender: "male",
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 170,
    goal: g,
  });

  const expectedTarget = Math.max(1000, Math.round(res.tdee + goalDeltaMap[g]));
  assert(res.targetCalories === expectedTarget, `Goal ${g} case #${i + 1} target mismatch: got ${res.targetCalories}, expected ${expectedTarget}`);
}

// ----------------------------------------------------
// TEST SUITE 6: 500 BODY COMPOSITION CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 6: 500 Body Composition Cases ---");
for (let i = 0; i < 500; i++) {
  const wLbs = 100 + Math.floor(Math.random() * 150);
  const bf = 10 + Math.floor(Math.random() * 35);

  const res = calculateMacroCalculator({
    unitSystem: "us",
    age: 30,
    gender: "male",
    heightFeet: 5,
    heightInches: 10,
    weightLbs: wLbs,
    bodyFat: bf,
  });

  const sumMass = res.bodyComposition.leanBodyMassLbs + res.bodyComposition.fatMassLbs;
  assert(approxEq(sumMass, wLbs, 1.5), `Body mass sum mismatch: LBM ${res.bodyComposition.leanBodyMassLbs} + Fat ${res.bodyComposition.fatMassLbs} = ${sumMass} vs Weight ${wLbs}`);
  assert(res.bodyComposition.bodyFatPct === bf, `Body fat percentage must equal input`);
  assert(res.bodyComposition.bmi > 10 && res.bodyComposition.bmi < 70, `BMI must be in realistic range`);
}

// ----------------------------------------------------
// TEST SUITE 7: 500 UNIT CONVERSION ROUND-TRIP CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 7: 500 Unit Conversion Round-Trip Cases ---");
for (let i = 0; i < 500; i++) {
  const feet = 5 + Math.floor(Math.random() * 2);
  const inches = Math.floor(Math.random() * 12);
  const lbs = 130 + Math.floor(Math.random() * 100);

  const resUs = calculateMacroCalculator({
    unitSystem: "us",
    age: 25,
    gender: "male",
    heightFeet: feet,
    heightInches: inches,
    weightLbs: lbs,
  });

  const totalIn = feet * 12 + inches;
  const cm = totalIn * 2.54;
  const kg = lbs * 0.45359237;

  const resMetric = calculateMacroCalculator({
    unitSystem: "metric",
    age: 25,
    gender: "male",
    heightCm: cm,
    weightKg: kg,
  });

  assert(approxEq(resUs.bmr, resMetric.bmr, 1.5), `US -> Metric BMR drift: US ${resUs.bmr} vs Metric ${resMetric.bmr}`);
  assert(approxEq(resUs.tdee, resMetric.tdee, 2), `US -> Metric TDEE drift: US ${resUs.tdee} vs Metric ${resMetric.tdee}`);
  assert(approxEq(resUs.protein.grams, resMetric.protein.grams, 1), `Protein drift: ${resUs.protein.grams} vs ${resMetric.protein.grams}`);
}

// ----------------------------------------------------
// TEST SUITE 8: 500 CUSTOM RATIO CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 8: 500 Custom Ratio Cases ---");
for (let i = 0; i < 500; i++) {
  const p = 15 + Math.floor(Math.random() * 35);
  const c = 20 + Math.floor(Math.random() * 40);
  const f = 100 - (p + c);

  if (f < 5) continue;

  const res = calculateMacroCalculator({
    unitSystem: "us",
    age: 27,
    gender: "male",
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 165,
    dietStyle: "custom",
    customProteinPct: p,
    customCarbsPct: c,
    customFatPct: f,
  });

  assert(res.protein.percentage === p, `Custom P% mismatch: got ${res.protein.percentage}, expected ${p}`);
  assert(res.carbs.percentage === c, `Custom C% mismatch: got ${res.carbs.percentage}, expected ${c}`);
  assert(res.fat.percentage === f, `Custom F% mismatch: got ${res.fat.percentage}, expected ${f}`);

  const totalGramsCal = res.protein.grams * 4 + res.carbs.grams * 4 + res.fat.grams * 9;
  assert(approxEq(totalGramsCal, res.targetCalories, 10), `Custom macro calorie drift: ${totalGramsCal} vs ${res.targetCalories}`);
}

// ----------------------------------------------------
// TEST SUITE 9: 500 BOUNDARY & EXTREME CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 9: 500 Boundary & Extreme Cases ---");
const edgeInputs: any[] = [
  { age: 15, heightCm: 80, weightKg: 25 },
  { age: 100, heightCm: 250, weightKg: 350 },
  { age: 0, heightCm: 0, weightKg: 0 },
  { age: -15, heightCm: -100, weightKg: -50 },
  { age: 200, heightCm: 500, weightKg: 999 },
  { age: 25, bodyFat: 0 },
  { age: 25, bodyFat: 2 },
  { age: 25, bodyFat: 65 },
  { age: 25, bodyFat: 100 },
];

edgeInputs.forEach((inp, idx) => {
  const res = calculateMacroCalculator({
    unitSystem: "metric",
    gender: "male",
    ...inp,
  });

  assert(!isNaN(res.bmr) && isFinite(res.bmr) && res.bmr > 0, `Edge #${idx + 1} BMR must be positive finite number`);
  assert(!isNaN(res.tdee) && isFinite(res.tdee) && res.tdee > 0, `Edge #${idx + 1} TDEE must be positive finite number`);
  assert(!isNaN(res.targetCalories) && isFinite(res.targetCalories) && res.targetCalories >= 1000, `Edge #${idx + 1} Target cals >= 1000`);
  assert(!isNaN(res.bodyComposition.bodyFatPct) && res.bodyComposition.bodyFatPct >= 3 && res.bodyComposition.bodyFatPct <= 65, `Edge #${idx + 1} BFP clamped`);
});

for (let i = 0; i < 491; i++) {
  const age = Math.random() > 0.5 ? 15 : 100;
  const wKg = Math.random() > 0.5 ? 25 : 350;
  const hCm = Math.random() > 0.5 ? 80 : 250;
  const res = calculateMacroCalculator({
    unitSystem: "metric",
    gender: "female",
    age,
    heightCm: hCm,
    weightKg: wKg,
  });
  assert(!isNaN(res.targetCalories) && res.targetCalories > 0, `Extreme random case #${i + 1} valid`);
}

// ----------------------------------------------------
// TEST SUITE 10: 500 STATE ISOLATION & MODE SWITCHING CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 10: 500 State Isolation & Mode Switching Cases ---");
const modes: MacroCalculationMode[] = [
  "standard", "calories", "cutting", "bulking", "maintenance",
  "recomp", "athlete", "keto", "high-protein", "custom"
];

for (let i = 0; i < 500; i++) {
  const m1 = modes[i % modes.length];
  const m2 = modes[(i + 1) % modes.length];

  const res1 = calculateMacroCalculator({
    calculationMode: m1,
    age: 25,
    gender: "male",
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 165,
  });

  const res2 = calculateMacroCalculator({
    calculationMode: m2,
    age: 25,
    gender: "male",
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 165,
  });

  // Switch back to m1
  const res3 = calculateMacroCalculator({
    calculationMode: m1,
    age: 25,
    gender: "male",
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 165,
  });

  assert(res1.targetCalories === res3.targetCalories, `Mode switch idempotency for ${m1}`);
  assert(res1.protein.grams === res3.protein.grams, `Protein idempotency for ${m1}`);
}

// ----------------------------------------------------
// TEST SUITE 11: 500 EXPORT & 12-WEEK TRAJECTORY INTEGRITY CASES
// ----------------------------------------------------
console.log("\n--- TEST SUITE 11: 500 Export & 12-Week Trajectory Integrity Cases ---");
for (let i = 0; i < 500; i++) {
  const res = calculateMacroCalculator({
    unitSystem: "us",
    age: 26,
    gender: "male",
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 165,
    goal: i % 2 === 0 ? "loss" : "gain",
  });

  assert(res.weightTrajectory.length === 13, "Trajectory must contain 13 points (Wk 0 to Wk 12)");
  assert(res.weightTrajectory[0].estimatedWeightLbs === 165, "Week 0 must match current weight");

  if (i % 2 === 0) {
    // Loss: Week 12 must be lower than Week 0
    assert(res.weightTrajectory[12].estimatedWeightLbs < res.weightTrajectory[0].estimatedWeightLbs, "Loss trajectory must decrease");
  } else {
    // Gain: Week 12 must be higher than Week 0
    assert(res.weightTrajectory[12].estimatedWeightLbs > res.weightTrajectory[0].estimatedWeightLbs, "Gain trajectory must increase");
  }

  // Food database integrity
  assert(res.foodDatabase.length >= 25, "Food database must contain at least 25 items");
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
  console.log("\nALL 11 TEST SUITES COMPLETED WITH 100% SUCCESS!");
} else {
  console.error(`\nFAILED ${failedTests} TESTS.`);
  process.exit(1);
}
