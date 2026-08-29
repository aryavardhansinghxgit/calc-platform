import { calculateProteinCalculator } from "../src/app/calculators/protein-calculator/calculator";
import { protein_calculatorFaqs } from "../src/app/calculators/protein-calculator/faq";
import {
  ProteinCalculationMode,
  UnitSystem,
  Gender,
  ActivityLevel,
  FitnessGoal,
  BmrFormulaType,
  PregnancyStatusType,
} from "../src/app/calculators/protein-calculator/types";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, testName: string, details?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
  } else {
    failedTests++;
    console.error(`❌ FAIL: ${testName}`);
    if (details) console.error(`   Details: ${details}`);
  }
}

console.log("==================================================");
console.log("MASTER QA + FORENSIC REGRESSION SUITE: PROTEIN CALCULATOR");
console.log("==================================================\n");

// -----------------------------------------------------------------------------
// TEST SUITE 1: CANONICAL REFERENCE BASELINE (PDF Page 1 & Screenshot 4)
// -----------------------------------------------------------------------------
console.log("--- TEST SUITE 1: Canonical Reference Baseline ---");
{
  const baseline = calculateProteinCalculator({
    unitSystem: "us",
    calculationMode: "daily",
    age: 25,
    gender: "male",
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 160,
    activityLevel: "light",
    goal: "maintain",
    bmrFormula: "mifflin",
    mealFrequency: 4,
  });

  // Expected from PDF page 1:
  // Daily Protein: 116 g/day
  // Ratio: 0.72 g/lb, 1.6 g/kg
  // Protein Calories: 464 kcal, 19.7%
  // RDA Min: 58 g/day
  // Per-Meal Target: 29 g (4 meals)
  // Leucine Target: 2.6 g
  // Target Calories: 2361 kcal (TDEE: 2361 kcal)
  assert(baseline.proteinTargetGrams === 116, "Canonical Baseline: Daily Protein is 116 g", `Got ${baseline.proteinTargetGrams}`);
  assert(baseline.proteinGramsPerLb === 0.72 || baseline.proteinGramsPerLb === 0.73, "Canonical Baseline: Ratio per lb is 0.72", `Got ${baseline.proteinGramsPerLb}`);
  assert(baseline.proteinGramsPerKg === 1.6, "Canonical Baseline: Ratio per kg is 1.6", `Got ${baseline.proteinGramsPerKg}`);
  assert(baseline.proteinCalories === 464, "Canonical Baseline: Protein Calories are 464 kcal", `Got ${baseline.proteinCalories}`);
  assert(baseline.proteinPercentage === 19.7, "Canonical Baseline: Protein % is 19.7%", `Got ${baseline.proteinPercentage}`);
  assert(baseline.rdaMinimumGrams === 58, "Canonical Baseline: RDA Minimum is 58 g", `Got ${baseline.rdaMinimumGrams}`);
  assert(baseline.perMealProteinGrams === 29, "Canonical Baseline: Per-Meal is 29 g", `Got ${baseline.perMealProteinGrams}`);
  assert(baseline.leucineTargetPerMeal === 2.6, "Canonical Baseline: Leucine Target is 2.6 g", `Got ${baseline.leucineTargetPerMeal}`);
  assert(baseline.targetCalories === 2361, "Canonical Baseline: Target Calories are 2361 kcal", `Got ${baseline.targetCalories}`);
  assert(baseline.tdee === 2361, "Canonical Baseline: TDEE is 2361 kcal", `Got ${baseline.tdee}`);
  assert(baseline.carbs.grams === 285, "Canonical Baseline: Carbs are 285 g", `Got ${baseline.carbs.grams}`);
  assert(baseline.fat.grams === 84, "Canonical Baseline: Fat is 84 g", `Got ${baseline.fat.grams}`);
}

// -----------------------------------------------------------------------------
// TEST SUITE 2: ALL 10 PROTEIN MODES COHERENCE
// -----------------------------------------------------------------------------
console.log("\n--- TEST SUITE 2: All 10 Protein Modes ---");
{
  const modes: ProteinCalculationMode[] = [
    "daily",
    "hypertrophy",
    "cutting",
    "maintenance",
    "pregnancy",
    "senior",
    "endurance",
    "strength",
    "vegan",
    "custom",
  ];

  const expectedGrams: Record<ProteinCalculationMode, number> = {
    daily: 116,
    hypertrophy: 145,
    cutting: 174,
    maintenance: 102,
    pregnancy: 102, // without pregnancy status (1.4 g/kg)
    senior: 102,
    endurance: 116,
    strength: 160,
    vegan: 131,
    custom: 131, // default 1.8 g/kg -> 131 g
  };

  modes.forEach((mode) => {
    const res = calculateProteinCalculator({
      unitSystem: "us",
      calculationMode: mode,
      age: 25,
      gender: "male",
      heightFeet: 5,
      heightInches: 10,
      weightLbs: 160,
      activityLevel: "light",
      goal: "maintain",
      bmrFormula: "mifflin",
      mealFrequency: 4,
      customProteinGramsPerKg: 1.8,
    });

    assert(
      res.proteinTargetGrams === expectedGrams[mode],
      `Mode [${mode}] produces expected protein (${expectedGrams[mode]} g)`,
      `Expected ${expectedGrams[mode]} g, got ${res.proteinTargetGrams} g`
    );
    assert(res.proteinCalories === res.proteinTargetGrams * 4, `Mode [${mode}] protein calories match 4 kcal/g`);
    assert(res.perMealProteinGrams === Math.round(res.proteinTargetGrams / 4), `Mode [${mode}] per-meal protein divides by 4`);
  });
}

// -----------------------------------------------------------------------------
// TEST SUITE 3: PREGNANCY & LACTATION ADDITIONS
// -----------------------------------------------------------------------------
console.log("\n--- TEST SUITE 3: Pregnancy & Lactation Additions ---");
{
  const testCases: { status: PregnancyStatusType; extra: number }[] = [
    { status: "none", extra: 0 },
    { status: "t1", extra: 1 },
    { status: "t2", extra: 10 },
    { status: "t3", extra: 31 },
    { status: "lactation-1", extra: 19 },
    { status: "lactation-2", extra: 13 },
  ];

  testCases.forEach(({ status, extra }) => {
    const base = calculateProteinCalculator({
      unitSystem: "metric",
      calculationMode: "pregnancy",
      weightKg: 60,
      pregnancyStatus: "none",
    });

    const withPreg = calculateProteinCalculator({
      unitSystem: "metric",
      calculationMode: "pregnancy",
      weightKg: 60,
      pregnancyStatus: status,
    });

    assert(
      withPreg.proteinTargetGrams === base.proteinTargetGrams + extra,
      `Pregnancy status [${status}] adds exactly +${extra}g protein`,
      `Base: ${base.proteinTargetGrams}, with preg: ${withPreg.proteinTargetGrams}, extra: ${extra}`
    );
  });
}

// -----------------------------------------------------------------------------
// TEST SUITE 4: SENIOR SARCOPENIA LOGIC
// -----------------------------------------------------------------------------
console.log("\n--- TEST SUITE 4: Senior Sarcopenia Logic ---");
{
  // Age 70 should recommend at least 1.4 g/kg
  const senior = calculateProteinCalculator({
    unitSystem: "metric",
    calculationMode: "maintenance",
    age: 70,
    weightKg: 70,
  });

  assert(senior.proteinGramsPerKg >= 1.4, "Senior age 70 gets at least 1.4 g/kg", `Got ${senior.proteinGramsPerKg} g/kg`);
  assert(senior.proteinTargetGrams >= 98, "Senior 70kg gets >= 98g protein", `Got ${senior.proteinTargetGrams} g`);
}

// -----------------------------------------------------------------------------
// TEST SUITE 5: BMR FORMULAS INTEGRITY
// -----------------------------------------------------------------------------
console.log("\n--- TEST SUITE 5: BMR Formulas ---");
{
  const formulas: BmrFormulaType[] = ["mifflin", "katch", "harris", "revised-harris", "cunningham", "schofield"];

  formulas.forEach((formula) => {
    const res = calculateProteinCalculator({
      unitSystem: "metric",
      age: 25,
      gender: "male",
      heightCm: 178,
      weightKg: 72.6,
      bmrFormula: formula,
      bodyFat: 15,
    });

    assert(res.bmr > 1200 && res.bmr < 2500, `Formula [${formula}] produces plausible BMR: ${res.bmr} kcal`);
    assert(res.tdee > res.bmr, `Formula [${formula}] TDEE (${res.tdee}) > BMR (${res.bmr})`);
  });
}

// -----------------------------------------------------------------------------
// TEST SUITE 6: MEAL FREQUENCIES & LEUCINE INVARIANTS
// -----------------------------------------------------------------------------
console.log("\n--- TEST SUITE 6: Meal Frequency & Leucine Threshold ---");
{
  for (let meals = 1; meals <= 6; meals++) {
    const res = calculateProteinCalculator({
      weightKg: 70,
      calculationMode: "daily",
      mealFrequency: meals,
    });

    assert(
      res.perMealProteinGrams === Math.round(res.proteinTargetGrams / meals),
      `Meal frequency ${meals}: perMeal (${res.perMealProteinGrams}) === total / meals`
    );
    assert(
      res.leucineTargetPerMeal === Number((res.perMealProteinGrams * 0.09).toFixed(1)),
      `Meal frequency ${meals}: leucine (${res.leucineTargetPerMeal}) === perMeal * 0.09`
    );
  }
}

// -----------------------------------------------------------------------------
// TEST SUITE 7: 9 ESSENTIAL AMINO ACIDS (EAAs)
// -----------------------------------------------------------------------------
console.log("\n--- TEST SUITE 7: 9 Essential Amino Acids Completeness ---");
{
  const res = calculateProteinCalculator({ weightKg: 75 });
  const eaaNames = res.eaaProfile.map((e) => e.aminoAcid);
  const requiredEaas = [
    "Leucine",
    "Isoleucine",
    "Valine",
    "Lysine",
    "Methionine",
    "Phenylalanine",
    "Threonine",
    "Tryptophan",
    "Histidine",
  ];

  assert(res.eaaProfile.length === 9, "EAA profile contains exactly 9 amino acids");
  requiredEaas.forEach((eaa) => {
    assert(eaaNames.includes(eaa), `EAA profile contains [${eaa}]`);
  });
}

// -----------------------------------------------------------------------------
// TEST SUITE 8: HIGH-PROTEIN FOOD DATABASE INTEGRITY
// -----------------------------------------------------------------------------
console.log("\n--- TEST SUITE 8: High-Protein Food Database ---");
{
  const res = calculateProteinCalculator({});
  assert(res.foodDatabase.length >= 20, `Food database contains ${res.foodDatabase.length} items (>= 20)`);

  res.foodDatabase.forEach((food) => {
    assert(food.protein > 0, `Food [${food.name}] has positive protein: ${food.protein}g`);
    assert(food.calories > 0, `Food [${food.name}] has positive calories: ${food.calories} kcal`);
    assert(food.leucineContent > 0, `Food [${food.name}] has positive leucine: ${food.leucineContent}g`);
    assert(
      food.qualityType === "Complete Protein" || food.qualityType === "Incomplete Protein",
      `Food [${food.name}] has valid quality classification`
    );
  });
}

// -----------------------------------------------------------------------------
// TEST SUITE 9: RANDOMIZED PROPERTY TESTING (5,000 SCENARIOS)
// -----------------------------------------------------------------------------
console.log("\n--- TEST SUITE 9: 5,000 Randomized Property Test Scenarios ---");
{
  const modes: ProteinCalculationMode[] = [
    "daily", "hypertrophy", "cutting", "maintenance", "pregnancy",
    "senior", "endurance", "strength", "vegan", "custom"
  ];
  const genders: Gender[] = ["male", "female"];
  const activityLevels: ActivityLevel[] = ["sedentary", "light", "moderate", "active", "very-active", "extra-active"];
  const goals: FitnessGoal[] = ["maintain", "mild-loss", "loss", "extreme-loss", "mild-gain", "gain", "extreme-gain", "recomp"];
  const formulas: BmrFormulaType[] = ["mifflin", "katch", "harris", "revised-harris", "cunningham", "schofield"];

  for (let i = 0; i < 5000; i++) {
    const mode = modes[i % modes.length];
    const gender = genders[i % genders.length];
    const act = activityLevels[i % activityLevels.length];
    const goal = goals[i % goals.length];
    const formula = formulas[i % formulas.length];
    const age = 15 + (i % 85);
    const weightKg = 35 + (i % 150);
    const heightCm = 120 + (i % 90);
    const meals = 1 + (i % 6);

    const res = calculateProteinCalculator({
      unitSystem: "metric",
      calculationMode: mode,
      gender,
      activityLevel: act,
      goal,
      bmrFormula: formula,
      age,
      weightKg,
      heightCm,
      mealFrequency: meals,
      bodyFat: 15,
    });

    // Invariants
    assert(!isNaN(res.proteinTargetGrams) && res.proteinTargetGrams > 0, `Rand #${i}: proteinTargetGrams valid`);
    assert(!isNaN(res.proteinCalories) && res.proteinCalories === res.proteinTargetGrams * 4, `Rand #${i}: proteinCalories === grams * 4`);
    assert(!isNaN(res.tdee) && res.tdee > 0, `Rand #${i}: tdee is positive number`);
    assert(!isNaN(res.targetCalories) && res.targetCalories >= 1200, `Rand #${i}: targetCalories >= 1200 kcal`);
    assert(res.perMealProteinGrams === Math.round(res.proteinTargetGrams / meals), `Rand #${i}: perMealProtein === total / meals`);
  }
}

// -----------------------------------------------------------------------------
// TEST SUITE 10: FAQ REPOSITORY INTEGRITY
// -----------------------------------------------------------------------------
console.log("\n--- TEST SUITE 10: FAQ Repository Verification ---");
{
  assert(protein_calculatorFaqs.length === 15, `FAQ count is exactly 15 (got ${protein_calculatorFaqs.length})`);

  // Ensure no competitor spam exists
  const hasCompetitorSpam = protein_calculatorFaqs.some(
    (f) =>
      f.question.toLowerCase().includes("calculator.net") ||
      f.answer.toLowerCase().includes("calculator.net")
  );
  assert(!hasCompetitorSpam, "No competitor comparison promotional spam in FAQs");

  protein_calculatorFaqs.forEach((faq, idx) => {
    assert(faq.question.trim().length > 10, `FAQ #${idx + 1} has substantial question`);
    assert(faq.answer.trim().length > 20, `FAQ #${idx + 1} has substantial answer`);
  });
}

console.log("\n==================================================");
console.log("MASTER QA TEST RESULTS SUMMARY");
console.log("==================================================");
console.log(`TOTAL TESTS:  ${totalTests}`);
console.log(`TESTS PASSED: ${passedTests}`);
console.log(`TESTS FAILED: ${failedTests}`);
console.log(`PASS RATE:    ${((passedTests / totalTests) * 100).toFixed(2)}%`);

if (failedTests === 0) {
  console.log("\n✨ ALL 10 TEST SUITES COMPLETED WITH 100% SUCCESS!");
} else {
  console.error(`\n❌ FAILED WITH ${failedTests} DEFECTS!`);
  process.exit(1);
}
