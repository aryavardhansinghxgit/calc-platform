import { calculateTdeeCalculator } from "../src/app/calculators/tdee-calculator/calculator";
import {
  TdeeCalculationMode,
  UnitSystem,
  EnergyUnit,
  Gender,
  ActivityLevel,
  FitnessGoal,
  BmrFormulaType,
} from "../src/app/calculators/tdee-calculator/types";

// ==========================================
// INDEPENDENT MATHEMATICAL ORACLES
// ==========================================

function oracleBmr(
  formula: BmrFormulaType,
  gender: Gender,
  weightKg: number,
  heightCm: number,
  age: number,
  lbmKg: number
): number {
  switch (formula) {
    case "katch":
      return 370 + 21.6 * lbmKg;
    case "harris":
      return gender === "male"
        ? 66.5 + 13.75 * weightKg + 5.003 * heightCm - 6.755 * age
        : 655.1 + 9.563 * weightKg + 1.85 * heightCm - 4.676 * age;
    case "revised-harris":
      return gender === "male"
        ? 88.362 + 13.397 * weightKg + 4.799 * heightCm - 5.677 * age
        : 447.593 + 9.247 * weightKg + 3.098 * heightCm - 4.330 * age;
    case "cunningham":
      return 500 + 22 * lbmKg;
    case "schofield":
      if (gender === "male") {
        if (age < 10) return 22.7 * weightKg + 495;
        if (age < 18) return 17.5 * weightKg + 651;
        if (age < 30) return 15.057 * weightKg + 679;
        if (age < 60) return 11.6 * weightKg + 879;
        return 13.5 * weightKg + 487;
      } else {
        if (age < 10) return 22.5 * weightKg + 499;
        if (age < 18) return 12.2 * weightKg + 746;
        if (age < 30) return 14.7 * weightKg + 496;
        if (age < 60) return 8.7 * weightKg + 829;
        return 10.5 * weightKg + 596;
      }
    case "owen":
      return gender === "male" ? 879 + 10.2 * weightKg : 795 + 7.18 * weightKg;
    case "mifflin":
    default:
      return gender === "male"
        ? 10 * weightKg + 6.25 * heightCm - 5 * age + 5
        : 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }
}

function oracleActivityMultiplier(act: ActivityLevel): number {
  switch (act) {
    case "sedentary":
      return 1.2;
    case "light":
      return 1.375;
    case "moderate":
      return 1.55;
    case "active":
      return 1.725;
    case "very-active":
      return 1.9;
    case "athlete":
      return 2.1;
  }
}

function oracleStepBonus(steps: number): number {
  if (steps >= 15000) return 450;
  if (steps >= 12500) return 350;
  if (steps >= 10000) return 250;
  if (steps >= 7500) return 100;
  return 0;
}

// Master QA Runner
async function runTdeeQaSuite() {
  console.log("==================================================");
  console.log("MASTER QA + FORENSIC REGRESSION SUITE: TDEE CALCULATOR");
  console.log("==================================================");

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  const failures: any[] = [];

  function assert(name: string, condition: boolean, details?: any) {
    totalTests++;
    if (condition) {
      passedTests++;
    } else {
      failedTests++;
      failures.push({ name, details });
      console.error(`[FAIL] ${name}`, details);
    }
  }

  // 1. REFERENCE CANONICAL BASELINE
  console.log("\n--- TEST SUITE 1: Reference Canonical Baseline ---");
  const baseline = calculateTdeeCalculator({
    unitSystem: "us",
    energyUnit: "kcal",
    calculationMode: "tdee",
    age: 25,
    gender: "male",
    heightFeet: 5,
    heightInches: 10,
    weightLbs: 165,
    activityLevel: "moderate",
    goal: "maintain",
    bmrFormula: "mifflin",
    dailySteps: 7500,
    workoutFrequency: 4,
    workoutDuration: 45,
  });

  assert("Baseline: BMR === 1740", baseline.bmr === 1740, { actual: baseline.bmr, expected: 1740 });
  assert("Baseline: TDEE === 2797", baseline.tdee === 2797, { actual: baseline.tdee, expected: 2797 });
  assert("Baseline: Target === 2797", baseline.targetCalories === 2797, { actual: baseline.targetCalories, expected: 2797 });
  assert("Baseline: NEAT === 623", baseline.components.neatCalories === 623, { actual: baseline.components.neatCalories, expected: 623 });
  assert("Baseline: EAT === 154", baseline.components.eatCalories === 154, { actual: baseline.components.eatCalories, expected: 154 });
  assert("Baseline: TEF === 280", baseline.components.tefCalories === 280, { actual: baseline.components.tefCalories, expected: 280 });
  const compSum = baseline.components.neatCalories + baseline.components.eatCalories + baseline.components.tefCalories;
  assert("Baseline: NEAT + EAT + TEF === 1057", compSum === 1057, { actual: compSum, expected: 1057 });
  assert("Baseline: BMR + Components === TDEE (2797)", baseline.bmr + compSum === 2797, {
    actual: baseline.bmr + compSum,
    expected: 2797,
  });

  // 2. SECONDARY ACTIVITY MULTIPLIER BASELINES
  console.log("\n--- TEST SUITE 2: Secondary Activity Multiplier Baselines ---");
  const actLevels: ActivityLevel[] = ["sedentary", "light", "moderate", "active", "very-active", "athlete"];
  const expMultipliers = [1.2, 1.375, 1.55, 1.725, 1.9, 2.1];

  for (let i = 0; i < actLevels.length; i++) {
    const act = actLevels[i];
    const mult = expMultipliers[i];
    const res = calculateTdeeCalculator({
      unitSystem: "us",
      energyUnit: "kcal",
      calculationMode: "tdee",
      age: 25,
      gender: "male",
      heightFeet: 5,
      heightInches: 10,
      weightLbs: 165,
      activityLevel: act,
      goal: "maintain",
      bmrFormula: "mifflin",
      dailySteps: 0, // No step bonus
      workoutFrequency: 0,
    });

    const expectedBmr = 1740;
    const expectedTdee = Math.round(1739.678 * mult);
    assert(`Activity ${act} multiplier (${mult})`, Math.abs(res.tdee - expectedTdee) <= 1, {
      actual: res.tdee,
      expected: expectedTdee,
    });
  }

  // 3. ALL 7 BMR FORMULAS DIFFERENTIAL SUITE (7 x 500 = 3,500 tests)
  console.log("\n--- TEST SUITE 3: 7 Clinical BMR Formulas Differential Testing ---");
  const formulas: BmrFormulaType[] = ["mifflin", "katch", "harris", "revised-harris", "cunningham", "schofield", "owen"];

  for (const formula of formulas) {
    for (let i = 0; i < 500; i++) {
      const age = 15 + Math.floor(Math.random() * 70);
      const gender: Gender = Math.random() > 0.5 ? "male" : "female";
      const heightCm = 145 + Math.random() * 55;
      const weightKg = 45 + Math.random() * 75;
      const bodyFat = 10 + Math.random() * 30;
      const lbmKg = weightKg * (1 - bodyFat / 100);

      const res = calculateTdeeCalculator({
        unitSystem: "metric",
        energyUnit: "kcal",
        age,
        gender,
        heightCm,
        weightKg,
        bodyFat,
        bmrFormula: formula,
        dailySteps: 5000,
        workoutFrequency: 2,
      });

      const oBmr = Math.round(oracleBmr(formula, gender, weightKg, heightCm, age, lbmKg));
      assert(
        `Formula ${formula} differential test #${i + 1}`,
        Math.abs(res.bmr - oBmr) <= 1,
        { actual: res.bmr, expected: oBmr }
      );
    }
  }

  // 4. COMPONENT SUM RECONCILIATION SUITE (1,000 tests)
  console.log("\n--- TEST SUITE 4: Component Sum Reconciliation (BMR + NEAT + EAT + TEF === TDEE) ---");
  for (let i = 0; i < 1000; i++) {
    const age = 18 + Math.floor(Math.random() * 65);
    const gender: Gender = Math.random() > 0.5 ? "male" : "female";
    const heightCm = 150 + Math.random() * 45;
    const weightKg = 50 + Math.random() * 60;
    const steps = Math.floor(Math.random() * 20000);
    const wf = Math.floor(Math.random() * 8);
    const act: ActivityLevel = actLevels[Math.floor(Math.random() * actLevels.length)];

    const res = calculateTdeeCalculator({
      unitSystem: "metric",
      energyUnit: "kcal",
      age,
      gender,
      heightCm,
      weightKg,
      dailySteps: steps,
      workoutFrequency: wf,
      activityLevel: act,
    });

    const sum = res.components.bmrCalories + res.components.neatCalories + res.components.eatCalories + res.components.tefCalories;
    assert(
      `Component reconciliation test #${i + 1}`,
      sum === res.tdee,
      { sum, tdee: res.tdee, bmr: res.components.bmrCalories, neat: res.components.neatCalories, eat: res.components.eatCalories, tef: res.components.tefCalories }
    );
  }

  // 5. GOAL MODES AND CALORIE TARGET MATRIX (10 modes x 100 = 1,000 tests)
  console.log("\n--- TEST SUITE 5: Goal Modes & Calorie Targets ---");
  const modes: TdeeCalculationMode[] = [
    "tdee",
    "maintenance",
    "loss",
    "gain",
    "lean-bulk",
    "cutting",
    "recomp",
    "athlete",
    "metabolism",
    "custom",
  ];

  for (const mode of modes) {
    for (let i = 0; i < 100; i++) {
      const customDelta = mode === "custom" ? -350 : 0;
      const res = calculateTdeeCalculator({
        unitSystem: "us",
        calculationMode: mode,
        age: 30,
        gender: "male",
        heightFeet: 5,
        heightInches: 11,
        weightLbs: 175,
        customDelta,
      });

      let expTarget = res.tdee;
      if (mode === "loss" || mode === "cutting") expTarget = Math.max(1200, res.tdee - 500);
      else if (mode === "gain") expTarget = res.tdee + 500;
      else if (mode === "lean-bulk") expTarget = res.tdee + 250;
      else if (mode === "recomp") expTarget = Math.max(1200, res.tdee - 200);
      else if (mode === "athlete") expTarget = res.tdee + 300;
      else if (mode === "custom") expTarget = Math.max(1200, res.tdee + customDelta);

      assert(`Mode ${mode} test #${i + 1}`, res.targetCalories === expTarget, {
        actual: res.targetCalories,
        expected: expTarget,
      });
    }
  }

  // 6. UNIT CONVERSION ROUND-TRIP TESTING (500 tests)
  console.log("\n--- TEST SUITE 6: Unit Conversion Round-Trip & Drift ---");
  for (let i = 0; i < 500; i++) {
    const feet = 5;
    const inches = 2 + Math.floor(Math.random() * 10);
    const weightLbs = 120 + Math.floor(Math.random() * 120);

    const usRes = calculateTdeeCalculator({
      unitSystem: "us",
      energyUnit: "kcal",
      age: 28,
      gender: "female",
      heightFeet: feet,
      heightInches: inches,
      weightLbs,
      activityLevel: "moderate",
    });

    const cm = (feet * 12 + inches) * 2.54;
    const kg = weightLbs / 2.20462;

    const metricRes = calculateTdeeCalculator({
      unitSystem: "metric",
      energyUnit: "kcal",
      age: 28,
      gender: "female",
      heightCm: cm,
      weightKg: kg,
      activityLevel: "moderate",
    });

    // Expect identical BMR and TDEE within rounding
    assert(`Unit conversion round-trip #${i + 1}`, Math.abs(usRes.tdee - metricRes.tdee) <= 1, {
      usTdee: usRes.tdee,
      metricTdee: metricRes.tdee,
    });

    // kJ conversion test (1 kcal = 4.184 kJ)
    const kjRes = calculateTdeeCalculator({
      unitSystem: "us",
      energyUnit: "kj",
      age: 28,
      gender: "female",
      heightFeet: feet,
      heightInches: inches,
      weightLbs,
      activityLevel: "moderate",
    });

    const expectedKj = Math.round(usRes.tdee * 4.184);
    assert(`kcal to kJ conversion #${i + 1}`, Math.abs(kjRes.tdee - expectedKj) <= 1, {
      actualKj: kjRes.tdee,
      expectedKj,
    });
  }

  // 7. ZERO & BOUNDARY EDGE CASES (500 tests)
  console.log("\n--- TEST SUITE 7: Boundary & Zero Edge Cases ---");
  // Test zero height inches (e.g. 6 ft 0 in)
  const zeroInches = calculateTdeeCalculator({
    unitSystem: "us",
    heightFeet: 6,
    heightInches: 0,
    weightLbs: 180,
    age: 30,
  });
  // 6 ft 0 in = 72 in = 182.88 cm; weight = 180 / 2.20462 = 81.6466 kg
  // BMR = 10*81.6466 + 6.25*182.88 - 5*30 + 5 = 816.466 + 1143 - 150 + 5 = 1814.46 -> 1814
  assert("Zero inches preserved (6 ft 0 in)", Math.abs(zeroInches.bmr - 1814) <= 1, {
    actual: zeroInches.bmr,
    expected: 1814,
  });

  // Test zero steps
  const zeroSteps = calculateTdeeCalculator({
    unitSystem: "us",
    dailySteps: 0,
    workoutFrequency: 0,
    workoutDuration: 0,
  });
  assert("Zero steps produces 0 step bonus", zeroSteps.components.eatCalories === 0, {
    eat: zeroSteps.components.eatCalories,
  });

  // Test invalid measurements
  const invalidAge = calculateTdeeCalculator({ age: -5 });
  assert("Negative age triggers isValid: false", invalidAge.isValid === false && invalidAge.bmr === 0);

  const invalidWeight = calculateTdeeCalculator({ weightKg: -10, unitSystem: "metric" });
  assert("Negative weight triggers isValid: false", invalidWeight.isValid === false && invalidWeight.bmr === 0);

  const invalidHeight = calculateTdeeCalculator({ heightFeet: 0, heightInches: 0, unitSystem: "us" });
  assert("Zero height triggers isValid: false", invalidHeight.isValid === false && invalidHeight.bmr === 0);

  for (let i = 0; i < 495; i++) {
    const isInvalid = i % 2 === 0;
    const testAge = isInvalid ? -Math.floor(Math.random() * 50) : 18 + Math.floor(Math.random() * 60);
    const testWeight = isInvalid ? -Math.floor(Math.random() * 50) : 50 + Math.floor(Math.random() * 60);

    const res = calculateTdeeCalculator({
      age: testAge,
      weightKg: testWeight,
      unitSystem: "metric",
    });

    if (isInvalid) {
      assert(`Invalid edge case #${i + 1}`, res.isValid === false, { age: testAge, weight: testWeight });
    } else {
      assert(`Valid boundary case #${i + 1}`, res.isValid === true, { age: testAge, weight: testWeight });
    }
  }

  // 8. 12-WEEK WEIGHT PROJECTION TESTS (500 tests)
  console.log("\n--- TEST SUITE 8: 12-Week Weight Trajectory Continuity ---");
  for (let i = 0; i < 500; i++) {
    const res = calculateTdeeCalculator({
      unitSystem: "us",
      calculationMode: "loss", // 500 deficit -> -1 lb/week
      weightLbs: 180,
    });

    assert(`12-Week projection points count === 13`, res.weightProjections.length === 13);
    assert(`Week 0 weight === 180`, res.weightProjections[0].weightLbs === 180);
    assert(`Week 1 weight === 179`, res.weightProjections[1].weightLbs === 179);
    assert(`Week 12 weight === 168`, res.weightProjections[12].weightLbs === 168);
  }

  // Final Summary Report
  console.log("\n==================================================");
  console.log("MASTER QA TEST RESULTS SUMMARY");
  console.log("==================================================");
  console.log(`TESTS RUN:    ${totalTests}`);
  console.log(`TESTS PASSED: ${passedTests}`);
  console.log(`TESTS FAILED: ${failedTests}`);
  const passRate = ((passedTests / totalTests) * 100).toFixed(2);
  console.log(`PASS RATE:    ${passRate}%`);

  if (failedTests > 0) {
    console.error(`\nFound ${failedTests} test failures:`);
    console.error(failures.slice(0, 10));
    process.exit(1);
  } else {
    console.log("\nALL 8 TEST SUITES COMPLETED WITH 100% SUCCESS!");
  }
}

runTdeeQaSuite();
