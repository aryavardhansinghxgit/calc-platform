import {
  calculateArmyBodyFat,
  getMaxAllowableArmyBodyFat,
  UnitSystem,
  Gender,
  CalculationMethod
} from "../src/lib/formulas/armyBodyFat";
import { calculateArmyBodyFatCalculator } from "../src/app/calculators/army-body-fat-calculator/calculator";
import { runArmyBodyFatCalculatorTests } from "../src/app/calculators/army-body-fat-calculator/tests";
import { army_body_fat_calculatorFaqs } from "../src/app/calculators/army-body-fat-calculator/faq";

console.log("=================================================");
console.log("ARMY BODY FAT POST-FIX REGRESSION TEST SUITE");
console.log("=================================================\n");

let passedTests = 0;
let totalTests = 0;

function assert(condition: boolean, msg: string) {
  totalTests++;
  if (!condition) {
    console.error(`❌ FAIL: ${msg}`);
    throw new Error(`Test failed: ${msg}`);
  }
  passedTests++;
}

// 1. Built-in tests in tests.ts
console.log("--> Running runArmyBodyFatCalculatorTests()...");
runArmyBodyFatCalculatorTests();
assert(true, "tests.ts passed successfully");

// 2. DEFECT 1: Authoritative Army 2023 Single-Site Formula Verification
console.log("--> Testing Defect 1: Single-Site Equations...");
// Case A: Audited Benchmark: Male, 25 yo, 175 lb, 34 in waist
// %BF = -26.97 - (0.12 * 175) + (1.99 * 34) = -26.97 - 21.0 + 67.66 = 19.69% -> 19.7%
const benchA = calculateArmyBodyFat({
  unitSystem: "imperial",
  gender: "male",
  calculationMethod: "army_2023_single_site",
  age: 25,
  weightLbs: 175,
  waistInches: 34
});
assert(benchA.isValid === true, "Audited benchmark is valid");
assert(benchA.bodyFatPercentage === 19.7, `Audited male benchmark must be exactly 19.7% (was ${benchA.bodyFatPercentage}%)`);
assert(benchA.bodyFatPercentage !== 16.5, "Old 16.5% fallback must never be produced");
assert(benchA.isCompliant === true, "19.7% meets max allowable 22% for male age 25");
assert(benchA.complianceStatus === "COMPLIANT", "Status must be COMPLIANT");
assert(benchA.statusLabel === "COMPLIANT", "Status label must be COMPLIANT");
assert(benchA.ageBracketId === "21_27", "Age bracket id must be 21_27");

// Case B: Female Benchmark: Female, 25 yo, 140 lb, 30 in waist
// %BF = -9.15 - (0.015 * 140) + (1.27 * 30) = -9.15 - 2.1 + 38.1 = 26.85% -> 26.9%
const femaleA = calculateArmyBodyFat({
  unitSystem: "imperial",
  gender: "female",
  calculationMethod: "army_2023_single_site",
  age: 25,
  weightLbs: 140,
  waistInches: 30
});
assert(femaleA.isValid === true, "Female benchmark is valid");
assert(femaleA.bodyFatPercentage === 26.9, `Female benchmark must be 26.9% (was ${femaleA.bodyFatPercentage}%)`);
assert(femaleA.isCompliant === true, "26.9% meets max allowable 32% for female age 25");
assert(femaleA.complianceStatus === "COMPLIANT", "Status must be COMPLIANT");

// Verify that when single-site equation results in low/high values, NO silent fallback to Navy multi-site happens!
// E.g. extremely light weight or narrow waist:
const lowSingleSite = calculateArmyBodyFat({
  unitSystem: "imperial",
  gender: "male",
  calculationMethod: "army_2023_single_site",
  age: 20,
  weightLbs: 150,
  waistInches: 28
});
// %BF = -26.97 - (0.12 * 150) + (1.99 * 28) = -26.97 - 18.0 + 55.72 = 10.75% -> 10.8%
assert(lowSingleSite.bodyFatPercentage === 10.8, `Low single-site must use exact formula: got ${lowSingleSite.bodyFatPercentage}%`);

// 3. DEFECT 2: Input Validation (No Silent 175 Fallback)
console.log("--> Testing Defect 2: Strict Input Validation...");
const zeroWeight = calculateArmyBodyFat({
  unitSystem: "imperial",
  gender: "male",
  calculationMethod: "army_2023_single_site",
  age: 25,
  weightLbs: 0,
  waistInches: 34
});
assert(zeroWeight.isValid === false, "Weight = 0 must be invalid");
assert(zeroWeight.bodyFatPercentage === 0, "Weight = 0 body fat must be 0");
assert(zeroWeight.complianceStatus === "INVALID", "Weight = 0 status must be INVALID");
assert(zeroWeight.fatMassLbs === 0, "Weight = 0 fat mass must be 0");
assert(zeroWeight.leanMassLbs === 0, "Weight = 0 lean mass must be 0");
assert(zeroWeight.errorMessage !== undefined && zeroWeight.errorMessage.toLowerCase().includes("weight"), "Should provide weight error message");

const negWaist = calculateArmyBodyFat({
  unitSystem: "imperial",
  gender: "male",
  calculationMethod: "army_2023_single_site",
  age: 25,
  weightLbs: 175,
  waistInches: -5
});
assert(negWaist.isValid === false, "Waist = -5 must be invalid");
assert(negWaist.bodyFatPercentage === 0, "Waist = -5 body fat must be 0");
assert(negWaist.complianceStatus === "INVALID", "Waist = -5 status must be INVALID");

const infWeight = calculateArmyBodyFat({
  unitSystem: "imperial",
  gender: "male",
  calculationMethod: "army_2023_single_site",
  age: 25,
  weightLbs: Infinity,
  waistInches: 34
});
assert(infWeight.isValid === false, "Weight = Infinity must be invalid");
assert(infWeight.bodyFatPercentage === 0, "Weight = Infinity body fat must be 0");

const nanWaist = calculateArmyBodyFat({
  unitSystem: "imperial",
  gender: "male",
  calculationMethod: "army_2023_single_site",
  age: 25,
  weightLbs: 175,
  waistInches: NaN
});
assert(nanWaist.isValid === false, "Waist = NaN must be invalid");

// 4. DEFECT 7 & ACFT EXEMPTION LOGIC
console.log("--> Testing Defect 7: Dual-Condition ACFT Exemption & Status...");
// Case E: ACFT 540 + all events >= 80, body fat > standard
const acftExempt = calculateArmyBodyFat({
  unitSystem: "imperial",
  gender: "male",
  calculationMethod: "army_2023_single_site",
  age: 25,
  weightLbs: 210,
  waistInches: 38, // BF = -26.97 - 25.2 + 75.62 = 23.45% -> 23.5% (> 22% max)
  acftScore: 540,
  acftPassedAllEvents80: true
});
assert(acftExempt.bodyFatPercentage === 23.5, "BF is 23.5%");
assert(acftExempt.isAcftExempt === true, "isAcftExempt must be true");
assert(acftExempt.complianceStatus === "HISTORICAL_ONLY", "complianceStatus must be HISTORICAL_ONLY");
assert(acftExempt.statusLabel.includes("EXEMPT"), "statusLabel must mention EXEMPT");

// Case F: ACFT Failure: Score = 540, but one event < 80
const acftFailEvent = calculateArmyBodyFat({
  unitSystem: "imperial",
  gender: "male",
  calculationMethod: "army_2023_single_site",
  age: 25,
  weightLbs: 210,
  waistInches: 38,
  acftScore: 540,
  acftPassedAllEvents80: false
});
assert(acftFailEvent.isAcftExempt === false, "isAcftExempt must be false when an event < 80");
assert(acftFailEvent.complianceStatus === "NON_COMPLIANT", "complianceStatus must be NON_COMPLIANT");

// Score 539 + all events >= 80
const acftScore539 = calculateArmyBodyFat({
  unitSystem: "imperial",
  gender: "male",
  calculationMethod: "army_2023_single_site",
  age: 25,
  weightLbs: 210,
  waistInches: 38,
  acftScore: 539,
  acftPassedAllEvents80: true
});
assert(acftScore539.isAcftExempt === false, "Score 539 must not be exempt");

// Score 600 + one event = 79
const acftScore600Fail = calculateArmyBodyFat({
  unitSystem: "imperial",
  gender: "male",
  calculationMethod: "army_2023_single_site",
  age: 25,
  weightLbs: 210,
  waistInches: 38,
  acftScore: 600,
  acftPassedAllEvents80: false
});
assert(acftScore600Fail.isAcftExempt === false, "Score 600 with event < 80 must not be exempt");

// 5. DEFECT 10: Age Bracket Normalization & Standards
console.log("--> Testing Defect 10: Age Bracket Normalization & Standards...");
const agesToTest = [
  { age: 17, gender: "male" as Gender, expectedMax: 20, bracketId: "17_20" },
  { age: 20, gender: "male" as Gender, expectedMax: 20, bracketId: "17_20" },
  { age: 21, gender: "male" as Gender, expectedMax: 22, bracketId: "21_27" },
  { age: 27, gender: "male" as Gender, expectedMax: 22, bracketId: "21_27" },
  { age: 28, gender: "male" as Gender, expectedMax: 24, bracketId: "28_39" },
  { age: 39, gender: "male" as Gender, expectedMax: 24, bracketId: "28_39" },
  { age: 40, gender: "male" as Gender, expectedMax: 26, bracketId: "40_plus" },
  { age: 60, gender: "male" as Gender, expectedMax: 26, bracketId: "40_plus" },
  { age: 80, gender: "male" as Gender, expectedMax: 26, bracketId: "40_plus" },
  { age: 17, gender: "female" as Gender, expectedMax: 30, bracketId: "17_20" },
  { age: 20, gender: "female" as Gender, expectedMax: 30, bracketId: "17_20" },
  { age: 21, gender: "female" as Gender, expectedMax: 32, bracketId: "21_27" },
  { age: 27, gender: "female" as Gender, expectedMax: 32, bracketId: "21_27" },
  { age: 28, gender: "female" as Gender, expectedMax: 34, bracketId: "28_39" },
  { age: 39, gender: "female" as Gender, expectedMax: 34, bracketId: "28_39" },
  { age: 40, gender: "female" as Gender, expectedMax: 36, bracketId: "40_plus" },
  { age: 60, gender: "female" as Gender, expectedMax: 36, bracketId: "40_plus" }
];

for (const t of agesToTest) {
  const std = getMaxAllowableArmyBodyFat(t.gender, t.age);
  assert(std.maxPct === t.expectedMax, `Age ${t.age} ${t.gender} expected max ${t.expectedMax}, got ${std.maxPct}`);
  assert(std.bracketId === t.bracketId, `Age ${t.age} bracketId expected ${t.bracketId}, got ${std.bracketId}`);
}

// 6. Body Mass & Required Weight Loss Calculations
console.log("--> Testing Body Mass and Required Weight Loss Model...");
// Male, 175 lb, 19.69% BF
// Fat Mass = 175 * 0.1969 = 34.4575 -> 34.5 lb
// Lean Mass = 175 - 34.4575 = 140.5425 -> 140.5 lb
// Total = 34.5 + 140.5 = 175.0 lb
assert(benchA.fatMassLbs === 34.5, `Fat mass lbs expected 34.5, got ${benchA.fatMassLbs}`);
assert(benchA.leanMassLbs === 140.5, `Lean mass lbs expected 140.5, got ${benchA.leanMassLbs}`);
assert(Math.abs((benchA.fatMassLbs + benchA.leanMassLbs) - 175) < 0.1, "Lean mass + Fat mass == Total Weight");

// Non-compliant case: Male age 25 (max 22%), 200 lb, 40 in waist
// %BF = -26.97 - (0.12 * 200) + (1.99 * 40) = -26.97 - 24 + 79.6 = 28.63% -> 28.6%
// Fat mass = 200 * 0.2863 = 57.26 lb -> 57.3 lb
// Lean mass = 200 - 57.26 = 142.74 lb -> 142.7 lb
// Target weight at 22% max with constant lean mass = 142.74 / (1 - 0.22) = 142.74 / 0.78 = 183.0 lb
// Required loss = 200 - 183.0 = 17.0 lb
const nonComp = calculateArmyBodyFat({
  unitSystem: "imperial",
  gender: "male",
  calculationMethod: "army_2023_single_site",
  age: 25,
  weightLbs: 200,
  waistInches: 40
});
assert(nonComp.isCompliant === false, "28.6% is non-compliant");
assert(nonComp.targetWeightLbs === 183.1, `Target weight expected 183.1 lb, got ${nonComp.targetWeightLbs}`);
assert(nonComp.requiredWeightLossLbs === 16.9, `Weight loss required expected 16.9 lb, got ${nonComp.requiredWeightLossLbs}`);

// 7. Unit Conversion Roundtrip & Metric Equivalence
console.log("--> Testing Metric / Imperial Equivalence...");
// 175 lb = 79.3787 kg -> 79.4 kg
// 34 in = 86.36 cm -> 86.4 cm
const metricRes = calculateArmyBodyFat({
  unitSystem: "metric",
  gender: "male",
  calculationMethod: "army_2023_single_site",
  age: 25,
  weightKg: 79.4,
  waistCm: 86.4
});
// 79.4 kg * 2.20462 = 175.047 lb -> 175.0 lb
// 86.4 cm / 2.54 = 34.0157 in -> 34.0 in
// Result should be approximately 19.7%
assert(Math.abs(metricRes.bodyFatPercentage - 19.7) <= 0.1, `Metric equivalent expected ~19.7%, got ${metricRes.bodyFatPercentage}%`);

// 8. 1,000 Valid Randomized Cases
console.log("--> Running 1,000 Valid Randomized Cases...");
let validCount = 0;
for (let i = 0; i < 1000; i++) {
  const gender: Gender = Math.random() > 0.5 ? "male" : "female";
  const age = Math.floor(Math.random() * (65 - 17 + 1)) + 17;
  const weightLbs = Math.floor(Math.random() * (260 - 110 + 1)) + 110;
  const waistInches = Math.floor(Math.random() * (46 - 26 + 1)) + 26;
  const isMetric = Math.random() > 0.5;
  const method: CalculationMethod = Math.random() > 0.5 ? "army_2023_single_site" : "navy_traditional_multi_site";
  const hasAcft = Math.random() > 0.5;
  const acftScore = Math.floor(Math.random() * (600 - 450 + 1)) + 450;
  const acftEvents = Math.random() > 0.3;

  const res = calculateArmyBodyFat({
    unitSystem: isMetric ? "metric" : "imperial",
    gender,
    calculationMethod: method,
    age,
    weightLbs: isMetric ? undefined : weightLbs,
    weightKg: isMetric ? parseFloat((weightLbs / 2.20462).toFixed(1)) : undefined,
    heightInches: 68,
    heightCm: 172.7,
    waistInches: isMetric ? undefined : waistInches,
    waistCm: isMetric ? parseFloat((waistInches * 2.54).toFixed(1)) : undefined,
    neckInches: 15.5,
    neckCm: 39.4,
    hipInches: 38,
    hipCm: 96.5,
    acftScore: hasAcft ? acftScore : 0,
    acftPassedAllEvents80: hasAcft ? acftEvents : false
  });

  assert(res.isValid === true, `Random test #${i} must be valid`);
  assert(Number.isFinite(res.bodyFatPercentage), `Random test #${i} BF must be finite`);
  assert(res.bodyFatPercentage >= 3 && res.bodyFatPercentage <= 60, `Random test #${i} BF out of bounds: ${res.bodyFatPercentage}`);
  assert(Number.isFinite(res.fatMassLbs), `Random test #${i} fat mass must be finite`);
  assert(Number.isFinite(res.leanMassLbs), `Random test #${i} lean mass must be finite`);
  assert(
    res.complianceStatus === "COMPLIANT" ||
    res.complianceStatus === "NON_COMPLIANT" ||
    res.complianceStatus === "HISTORICAL_ONLY",
    `Random test #${i} unexpected status: ${res.complianceStatus}`
  );
  validCount++;
}
console.log(`✓ 1,000 valid randomized cases passed cleanly (${validCount}/1000).`);

// 9. 250 Invalid Randomized Cases
console.log("--> Running 250 Invalid Randomized Cases...");
let invalidHandled = 0;
const invalidScenarios = [
  { weightLbs: 0 },
  { weightLbs: -10 },
  { waistInches: 0 },
  { waistInches: -5 },
  { weightLbs: NaN },
  { waistInches: Infinity },
  { waistInches: -Infinity },
  { age: 0 },
  { age: -18 },
  { heightInches: 0, calculationMethod: "navy_traditional_multi_site" as CalculationMethod },
  { neckInches: 0, calculationMethod: "navy_traditional_multi_site" as CalculationMethod },
  { hipInches: -20, gender: "female" as Gender, calculationMethod: "navy_traditional_multi_site" as CalculationMethod }
];

for (let i = 0; i < 250; i++) {
  const scenario = invalidScenarios[i % invalidScenarios.length];
  const res = calculateArmyBodyFat({
    unitSystem: "imperial",
    gender: scenario.gender || "male",
    calculationMethod: scenario.calculationMethod || "army_2023_single_site",
    age: scenario.age !== undefined ? scenario.age : 25,
    weightLbs: scenario.weightLbs !== undefined ? scenario.weightLbs : 175,
    heightInches: scenario.heightInches !== undefined ? scenario.heightInches : 70,
    waistInches: scenario.waistInches !== undefined ? scenario.waistInches : 34,
    neckInches: scenario.neckInches !== undefined ? scenario.neckInches : 15.5,
    hipInches: scenario.hipInches !== undefined ? scenario.hipInches : 38
  });

  assert(res.isValid === false, `Invalid scenario #${i} must have isValid: false`);
  assert(res.complianceStatus === "INVALID", `Invalid scenario #${i} must have status INVALID`);
  assert(res.bodyFatPercentage === 0, `Invalid scenario #${i} must have BF 0`);
  invalidHandled++;
}
console.log(`✓ 250 invalid randomized cases correctly rejected (${invalidHandled}/250).`);

// 10. FAQ Sync Check
console.log("--> Verifying FAQ Synchronization...");
assert(army_body_fat_calculatorFaqs.length === 20, `army_body_fat_calculatorFaqs must have 20 items, got ${army_body_fat_calculatorFaqs.length}`);
assert(army_body_fat_calculatorFaqs[0].answer.includes("AR 600-9"), "FAQ #1 must cover AR 600-9");
assert(army_body_fat_calculatorFaqs[1].question.includes("June 12, 2023"), "FAQ #2 must cover 2023 directive");

console.log("\n=================================================");
console.log(`ALL TESTS PASSED: ${passedTests}/${totalTests}`);
console.log("=================================================");
