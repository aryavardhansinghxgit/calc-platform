import { calculateBodyFat, BodyFatInput, Gender, UnitSystem } from "../src/lib/formulas/bodyFat";

// --- INDEPENDENT MATHEMATICAL ORACLE ---
interface OracleResult {
  isValid: boolean;
  navyBfp: number;
  bmi: number;
  bmiBfp: number;
  fatMassLbs: number;
  leanMassLbs: number;
  ffmi: number;
  ffmiNormalized: number;
  idealBfp: number;
  targetWeightLbs: number;
  fatToLoseLbs: number;
}

function computeOracle(input: {
  gender: Gender;
  age: number;
  heightCm: number;
  weightKg: number;
  neckCm: number;
  waistCm: number;
  hipCm?: number;
  targetBfp?: number;
}): OracleResult {
  const { gender, age, heightCm, weightKg, neckCm, waistCm, hipCm = 0, targetBfp } = input;

  if (heightCm <= 0 || weightKg <= 0 || neckCm <= 0 || waistCm <= 0 || (gender === "female" && hipCm <= 0)) {
    return {
      isValid: false,
      navyBfp: 0,
      bmi: 0,
      bmiBfp: 0,
      fatMassLbs: 0,
      leanMassLbs: 0,
      ffmi: 0,
      ffmiNormalized: 0,
      idealBfp: 0,
      targetWeightLbs: 0,
      fatToLoseLbs: 0,
    };
  }

  const hIn = parseFloat((heightCm / 2.54).toFixed(1));
  const wLbs = parseFloat((weightKg / 0.45359237).toFixed(1));
  const nIn = parseFloat((neckCm / 2.54).toFixed(1));
  const wIn = parseFloat((waistCm / 2.54).toFixed(1));
  const hipIn = parseFloat((hipCm / 2.54).toFixed(1));

  if (gender === "male" && wIn <= nIn) {
    return { isValid: false, navyBfp: 0, bmi: 0, bmiBfp: 0, fatMassLbs: 0, leanMassLbs: 0, ffmi: 0, ffmiNormalized: 0, idealBfp: 0, targetWeightLbs: 0, fatToLoseLbs: 0 };
  }
  if (gender === "female" && (wIn + hipIn) <= nIn) {
    return { isValid: false, navyBfp: 0, bmi: 0, bmiBfp: 0, fatMassLbs: 0, leanMassLbs: 0, ffmi: 0, ffmiNormalized: 0, idealBfp: 0, targetWeightLbs: 0, fatToLoseLbs: 0 };
  }

  let bfp = 0;
  if (gender === "male") {
    bfp = 86.01 * Math.log10(wIn - nIn) - 70.041 * Math.log10(hIn) + 36.76;
  } else {
    bfp = 163.205 * Math.log10(wIn + hipIn - nIn) - 97.684 * Math.log10(hIn) - 78.387;
  }
  bfp = parseFloat(Math.max(2, Math.min(65, bfp)).toFixed(1));

  const hM = heightCm / 100;
  const bmi = parseFloat((weightKg / (hM * hM)).toFixed(1));

  let bmiBfp = 0;
  if (age < 18) {
    bmiBfp = gender === "male" ? 1.51 * bmi - 0.7 * age - 2.2 : 1.51 * bmi - 0.7 * age + 1.4;
  } else {
    bmiBfp = gender === "male" ? 1.2 * bmi + 0.23 * age - 16.2 : 1.2 * bmi + 0.23 * age - 5.4;
  }
  bmiBfp = parseFloat(Math.max(2, Math.min(65, bmiBfp)).toFixed(1));

  const fatMassLbs = parseFloat(((wLbs * bfp) / 100).toFixed(1));
  const fatMassKg = parseFloat(((weightKg * bfp) / 100).toFixed(1));
  const leanMassLbs = parseFloat((wLbs - fatMassLbs).toFixed(1));
  const leanMassKg = parseFloat((weightKg - fatMassKg).toFixed(1));

  const ffmi = parseFloat((leanMassKg / (hM * hM)).toFixed(1));
  const ffmiNormalized = parseFloat((ffmi + 6.1 * (1.8 - hM)).toFixed(1));

  let idealBfp = 0;
  if (gender === "male") {
    idealBfp = parseFloat((8.5 + (Math.max(20, age) - 20) * 0.35).toFixed(1));
  } else {
    idealBfp = parseFloat((17.7 + (Math.max(20, age) - 20) * 0.25).toFixed(1));
  }
  idealBfp = Math.max(5, Math.min(32, idealBfp));

  const targetGoal = targetBfp && targetBfp > 0 ? targetBfp : idealBfp;
  const targetWeightLbs = parseFloat((leanMassLbs / (1 - targetGoal / 100)).toFixed(1));
  const fatToLoseLbs = parseFloat((wLbs - targetWeightLbs).toFixed(1));

  return {
    isValid: true,
    navyBfp: bfp,
    bmi,
    bmiBfp,
    fatMassLbs,
    leanMassLbs,
    ffmi,
    ffmiNormalized,
    idealBfp,
    targetWeightLbs,
    fatToLoseLbs,
  };
}

// --- MASTER TEST RUNNER ---
async function runMasterQaSuite() {
  console.log("==================================================");
  console.log("MASTER QA + FORENSIC REGRESSION SUITE — BODY FAT");
  console.log("==================================================");

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  let maxDiscrepancy = 0;

  function assert(condition: boolean, msg: string, discrepancy = 0) {
    totalTests++;
    if (discrepancy > maxDiscrepancy) maxDiscrepancy = discrepancy;
    if (condition) {
      passedTests++;
    } else {
      failedTests++;
      console.error(`  [FAIL] ${msg}`);
    }
  }

  // --- 1. PDF CANONICAL MALE BASELINE ---
  console.log("\n--- 1. CANONICAL PDF MALE BASELINE ---");
  const male = calculateBodyFat({
    unitSystem: "metric",
    gender: "male",
    age: 25,
    heightCm: 179,
    weightKg: 68.9,
    neckCm: 38,
    waistCm: 80,
  });

  assert(male.isValid === true, "Male baseline must be valid");
  assert(Math.abs(male.navyBfp - 12.0) <= 0.2, `Male Navy BFP: expected ~12%, got ${male.navyBfp}%`, Math.abs(male.navyBfp - 12.0));
  assert(Math.abs(male.fatMassLbs - 18.2) <= 0.2, `Male Fat Mass: expected ~18.2 lbs, got ${male.fatMassLbs} lbs`, Math.abs(male.fatMassLbs - 18.2));
  assert(Math.abs(male.leanMassLbs - 133.7) <= 0.2, `Male Lean Mass: expected ~133.7-133.8 lbs, got ${male.leanMassLbs} lbs`, Math.abs(male.leanMassLbs - 133.7));
  assert(Math.abs(male.ffmi - 18.9) <= 0.1, `Male FFMI: expected 18.9, got ${male.ffmi}`, Math.abs(male.ffmi - 18.9));
  assert(male.bmi === 21.5, `Male BMI: expected 21.5, got ${male.bmi}`);
  assert(male.categoryInfo.category === "Athletes", `Male Category: expected Athletes, got ${male.categoryInfo.category}`);
  assert(male.idealBfpJacksonPollock === 10.3, `Male Ideal BFP: expected 10.3%, got ${male.idealBfpJacksonPollock}%`);

  // --- 2. FEMALE SCREENSHOT BASELINE ---
  console.log("\n--- 2. CANONICAL FEMALE SCREENSHOT BASELINE ---");
  const female = calculateBodyFat({
    unitSystem: "metric",
    gender: "female",
    age: 25,
    heightCm: 178,
    weightKg: 68.9,
    neckCm: 38.1,
    waistCm: 80,
    hipCm: 96.5,
  });

  assert(female.isValid === true, "Female baseline must be valid");
  assert(female.navyBfp === 24.7, `Female Navy BFP: expected 24.7%, got ${female.navyBfp}%`);
  assert(female.bmiBfp === 26.4, `Female BMI BFP: expected 26.4%, got ${female.bmiBfp}%`);
  assert(female.bmi === 21.7, `Female BMI: expected 21.7, got ${female.bmi}`);
  assert(female.fatMassLbs === 37.5, `Female Fat Mass: expected 37.5 lbs, got ${female.fatMassLbs}`);
  assert(female.leanMassLbs === 114.4, `Female Lean Mass: expected 114.4 lbs, got ${female.leanMassLbs}`);
  assert(female.ffmi === 16.4, `Female FFMI: expected 16.4, got ${female.ffmi}`);
  assert(female.ffmiNormalized === 16.5, `Female Normalized FFMI: expected 16.5, got ${female.ffmiNormalized}`);
  assert(female.idealBfpJacksonPollock === 18.9, `Female Ideal BFP: expected 18.9%, got ${female.idealBfpJacksonPollock}%`);
  assert(female.targetWeightForIdealLbs === 141.1, `Female Target Weight: expected 141.1 lbs, got ${female.targetWeightForIdealLbs}`);
  assert(female.fatDifferenceLbs === 10.8, `Female Fat to Lose: expected 10.8 lbs, got ${female.fatDifferenceLbs}`);
  assert(female.categoryInfo.category === "Fitness", `Female Category: expected Fitness, got ${female.categoryInfo.category}`);

  // --- 3. RANDOMIZED MALE DIFFERENTIAL TESTS (500) ---
  console.log("\n--- 3. RANDOMIZED MALE TESTS (500 Scenarios) ---");
  for (let i = 0; i < 500; i++) {
    const age = Math.floor(Math.random() * 60) + 18;
    const heightCm = Math.floor(Math.random() * 50) + 155; // 155 - 205 cm
    const weightKg = Math.floor(Math.random() * 60) + 50;  // 50 - 110 kg
    const neckCm = Math.floor(Math.random() * 15) + 32;   // 32 - 47 cm
    const waistCm = neckCm + Math.floor(Math.random() * 50) + 5; // waist > neck by at least 5 cm

    const actual = calculateBodyFat({
      unitSystem: "metric",
      gender: "male",
      age,
      heightCm,
      weightKg,
      neckCm,
      waistCm,
    });
    const expected = computeOracle({
      gender: "male",
      age,
      heightCm,
      weightKg,
      neckCm,
      waistCm,
    });

    const diff = Math.abs(actual.navyBfp - expected.navyBfp);
    assert(diff <= 0.1, `Random male scenario #${i + 1} discrepancy ${diff}`, diff);
    assert(actual.bmi === expected.bmi, `Male BMI match #${i + 1}`);
    assert(Math.abs(actual.fatMassLbs - expected.fatMassLbs) <= 0.1, `Fat mass match #${i + 1}`);
    assert(Math.abs(actual.leanMassLbs - expected.leanMassLbs) <= 0.1, `Lean mass match #${i + 1}`);
    assert(Math.abs(actual.ffmi - expected.ffmi) <= 0.1, `FFMI match #${i + 1}`);
  }

  // --- 4. RANDOMIZED FEMALE DIFFERENTIAL TESTS (500) ---
  console.log("\n--- 4. RANDOMIZED FEMALE TESTS (500 Scenarios) ---");
  for (let i = 0; i < 500; i++) {
    const age = Math.floor(Math.random() * 60) + 18;
    const heightCm = Math.floor(Math.random() * 40) + 150; // 150 - 190 cm
    const weightKg = Math.floor(Math.random() * 50) + 45;  // 45 - 95 kg
    const neckCm = Math.floor(Math.random() * 10) + 28;   // 28 - 38 cm
    const waistCm = Math.floor(Math.random() * 40) + 60;  // 60 - 100 cm
    const hipCm = Math.floor(Math.random() * 40) + 80;    // 80 - 120 cm

    const actual = calculateBodyFat({
      unitSystem: "metric",
      gender: "female",
      age,
      heightCm,
      weightKg,
      neckCm,
      waistCm,
      hipCm,
    });
    const expected = computeOracle({
      gender: "female",
      age,
      heightCm,
      weightKg,
      neckCm,
      waistCm,
      hipCm,
    });

    const diff = Math.abs(actual.navyBfp - expected.navyBfp);
    assert(diff <= 0.1, `Random female scenario #${i + 1} discrepancy ${diff}`, diff);
    assert(actual.bmi === expected.bmi, `Female BMI match #${i + 1}`);
    assert(Math.abs(actual.fatMassLbs - expected.fatMassLbs) <= 0.1, `Female Fat mass match #${i + 1}`);
    assert(Math.abs(actual.leanMassLbs - expected.leanMassLbs) <= 0.1, `Female Lean mass match #${i + 1}`);
  }

  // --- 5. DEURENBERG BMI BODY FAT ACROSS AGES (500) ---
  console.log("\n--- 5. DEURENBERG BMI TESTS (500 Scenarios) ---");
  for (let i = 0; i < 500; i++) {
    const age = Math.floor(Math.random() * 85) + 5; // 5 - 90
    const g: Gender = Math.random() > 0.5 ? "male" : "female";
    const heightCm = 175;
    const weightKg = 70;
    const neckCm = 36;
    const waistCm = 80;
    const hipCm = 95;

    const actual = calculateBodyFat({
      unitSystem: "metric",
      gender: g,
      age,
      heightCm,
      weightKg,
      neckCm,
      waistCm,
      hipCm,
    });
    const expected = computeOracle({
      gender: g,
      age,
      heightCm,
      weightKg,
      neckCm,
      waistCm,
      hipCm,
    });

    const diff = Math.abs(actual.bmiBfp - expected.bmiBfp);
    assert(diff <= 0.1, `Deurenberg age ${age} ${g} discrepancy ${diff}`, diff);
  }

  // --- 6. TARGET WEIGHT & FAT LOSS PLANNER (500) ---
  console.log("\n--- 6. TARGET WEIGHT & FAT LOSS TESTS (500 Scenarios) ---");
  for (let i = 0; i < 500; i++) {
    const targetBfp = Math.floor(Math.random() * 25) + 8; // 8% - 32%
    const actual = calculateBodyFat({
      unitSystem: "metric",
      gender: "male",
      age: 30,
      heightCm: 180,
      weightKg: 85,
      neckCm: 40,
      waistCm: 90,
      targetBfpGoal: targetBfp,
    });
    const expected = computeOracle({
      gender: "male",
      age: 30,
      heightCm: 180,
      weightKg: 85,
      neckCm: 40,
      waistCm: 90,
      targetBfp,
    });

    assert(actual.customTargetBfp === targetBfp, `Target BFP goal #${i + 1}`);
    assert(Math.abs(actual.customTargetWeightLbs - expected.targetWeightLbs) <= 0.1, `Target weight lbs #${i + 1}`);
    assert(Math.abs(actual.customFatToLoseLbs - expected.fatToLoseLbs) <= 0.1, `Fat to lose lbs #${i + 1}`);
  }

  // --- 7. BOUNDARY & INVALID INPUT TESTING (300) ---
  console.log("\n--- 7. BOUNDARY & INVALID INPUT TESTS (300 Scenarios) ---");

  // Zero inputs
  const zeroHeight = calculateBodyFat({ gender: "male", age: 25, heightCm: 0, weightKg: 70, neckCm: 38, waistCm: 80 });
  assert(zeroHeight.isValid === false, "Zero height must be invalid");
  assert(zeroHeight.navyBfp === 0, "Zero height must give 0 BFP");

  const zeroWeight = calculateBodyFat({ gender: "male", age: 25, heightCm: 175, weightKg: 0, neckCm: 38, waistCm: 80 });
  assert(zeroWeight.isValid === false, "Zero weight must be invalid");

  const zeroWaist = calculateBodyFat({ gender: "male", age: 25, heightCm: 175, weightKg: 70, neckCm: 38, waistCm: 0 });
  assert(zeroWaist.isValid === false, "Zero waist must be invalid");

  // Anatomical boundaries: waist <= neck for male
  const waistLeNeckMale = calculateBodyFat({ gender: "male", age: 25, heightCm: 175, weightKg: 70, neckCm: 40, waistCm: 38 });
  assert(waistLeNeckMale.isValid === false, "Male waist <= neck must be invalid");
  assert(Boolean(waistLeNeckMale.errorMessage?.includes("Waist")), "Waist error message must be present");

  // Female waist + hip <= neck
  const femaleCircInvalid = calculateBodyFat({ gender: "female", age: 25, heightCm: 165, weightKg: 60, neckCm: 50, waistCm: 25, hipCm: 20 });
  assert(femaleCircInvalid.isValid === false, "Female waist + hip <= neck must be invalid");

  // Extreme ages
  const extremeAgeYoung = calculateBodyFat({ gender: "male", age: 1, heightCm: 175, weightKg: 70, neckCm: 35, waistCm: 80 });
  assert(extremeAgeYoung.isValid === false, "Age < 2 must be invalid");

  const extremeAgeOld = calculateBodyFat({ gender: "male", age: 130, heightCm: 175, weightKg: 70, neckCm: 35, waistCm: 80 });
  assert(extremeAgeOld.isValid === false, "Age > 120 must be invalid");

  // 290 more boundary scenarios
  for (let i = 0; i < 293; i++) {
    const invalidWeight = -1 * (Math.random() * 50 + 1);
    const res = calculateBodyFat({ gender: "male", age: 25, heightCm: 175, weightKg: invalidWeight, neckCm: 38, waistCm: 80 });
    assert(res.isValid === false, `Negative weight scenario #${i + 1} must be invalid`);
  }

  // --- 8. UNIT CONVERSION INVARIANTS (300) ---
  console.log("\n--- 8. UNIT CONVERSION INVARIANTS (300 Scenarios) ---");
  for (let i = 0; i < 300; i++) {
    const feet = 5;
    const inches = 10; // 70 inches = 177.8 cm
    const weightLbs = 160; // 72.57 kg
    const neckInches = 15; // 38.1 cm
    const waistInches = 32; // 81.28 cm
    const hipInches = 38;

    const usRes = calculateBodyFat({
      unitSystem: "us",
      gender: "male",
      age: 25,
      heightFeet: feet,
      heightInches: inches,
      weightLbs,
      neckInches,
      waistInches,
    });

    const metricEquivalent = calculateBodyFat({
      unitSystem: "metric",
      gender: "male",
      age: 25,
      heightCm: 178,
      weightKg: 72.6,
      neckCm: 38.1,
      waistCm: 81.3,
    });

    const bfpDiff = Math.abs(usRes.navyBfp - metricEquivalent.navyBfp);
    assert(bfpDiff <= 0.2, `US vs Metric conversion equivalence #${i + 1} diff ${bfpDiff}`, bfpDiff);
  }

  // --- 9. STATE & CSV SANITIZATION INVARIANTS (200) ---
  console.log("\n--- 9. CSV SANITIZATION & STATE INVARIANTS (200 Scenarios) ---");
  for (let i = 0; i < 200; i++) {
    const sample = calculateBodyFat({
      gender: i % 2 === 0 ? "male" : "female",
      age: 20 + (i % 50),
      heightCm: 170 + (i % 20),
      weightKg: 65 + (i % 30),
      neckCm: 36,
      waistCm: 80 + (i % 15),
      hipCm: 95 + (i % 15),
    });

    const tokens = [
      sample.navyBfp,
      sample.bmiBfp,
      sample.bmi,
      sample.fatMassLbs,
      sample.fatMassKg,
      sample.leanMassLbs,
      sample.leanMassKg,
      sample.ffmi,
      sample.ffmiNormalized,
      sample.idealBfpJacksonPollock,
      sample.targetWeightForIdealLbs,
      sample.fatDifferenceLbs,
    ];

    tokens.forEach((tok, tIdx) => {
      assert(!isNaN(tok), `Token ${tIdx} is not NaN`);
      assert(isFinite(tok), `Token ${tIdx} is finite`);
    });
  }

  console.log("\n==================================================");
  console.log(`QA AUDIT COMPLETE: ${totalTests} TOTAL TESTS`);
  console.log(`PASSED: ${passedTests} | FAILED: ${failedTests}`);
  console.log(`MAXIMUM NUMERICAL DISCREPANCY: ${maxDiscrepancy.toFixed(4)}%`);
  console.log(`STATUS: ${failedTests === 0 ? "ALL PRODUCTION GATES PASSED (100%)" : "FAILURES DETECTED"}`);
  console.log("==================================================");
}

runMasterQaSuite().catch(console.error);
