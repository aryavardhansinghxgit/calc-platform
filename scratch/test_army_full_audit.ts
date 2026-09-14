import { calculateArmyBodyFat, getMaxAllowableArmyBodyFat } from "../src/lib/formulas/armyBodyFat";

console.log("==========================================");
console.log("EXHAUSTIVE TEST HARNESS: ARMY BODY FAT");
console.log("==========================================\n");

let passCount = 0;
let failCount = 0;

function assert(cond: boolean, name: string, details?: any) {
  if (cond) {
    passCount++;
  } else {
    failCount++;
    console.error(`FAIL: ${name}`, details || "");
  }
}

// 1. Regulatory Age Brackets & Standards Test
const ageMatrix = [
  { age: 17, maleMax: 20, femaleMax: 30, label: "Age 17–20" },
  { age: 20, maleMax: 20, femaleMax: 30, label: "Age 17–20" },
  { age: 21, maleMax: 22, femaleMax: 32, label: "Age 21–27" },
  { age: 27, maleMax: 22, femaleMax: 32, label: "Age 21–27" },
  { age: 28, maleMax: 24, femaleMax: 34, label: "Age 28–39" },
  { age: 39, maleMax: 24, femaleMax: 34, label: "Age 28–39" },
  { age: 40, maleMax: 26, femaleMax: 36, label: "Age 40+" },
  { age: 60, maleMax: 26, femaleMax: 36, label: "Age 40+" },
];

for (const item of ageMatrix) {
  const m = getMaxAllowableArmyBodyFat("male", item.age);
  const f = getMaxAllowableArmyBodyFat("female", item.age);
  assert(m.maxPct === item.maleMax, `Male age ${item.age} maxPct == ${item.maleMax}`);
  assert(f.maxPct === item.femaleMax, `Female age ${item.age} maxPct == ${item.femaleMax}`);
  assert(m.bracketLabel === item.label, `Male age ${item.age} label == ${item.label}`);
}

// 2. ACFT Exemption Tests
// 540 + all 80
const ex1 = calculateArmyBodyFat({
  unitSystem: "imperial", gender: "male", age: 25, weightLbs: 175, heightInches: 70, waistInches: 34,
  acftScore: 540, acftPassedAllEvents80: true
});
assert(ex1.isAcftExempt === true, "540 + all 80 -> exempt");

// 539 + all 80
const ex2 = calculateArmyBodyFat({
  unitSystem: "imperial", gender: "male", age: 25, weightLbs: 175, heightInches: 70, waistInches: 34,
  acftScore: 539, acftPassedAllEvents80: true
});
assert(ex2.isAcftExempt === false, "539 + all 80 -> NOT exempt");

// 540 + NOT all 80 (one event < 80)
const ex3 = calculateArmyBodyFat({
  unitSystem: "imperial", gender: "male", age: 25, weightLbs: 175, heightInches: 70, waistInches: 34,
  acftScore: 540, acftPassedAllEvents80: false
});
assert(ex3.isAcftExempt === false, "540 + failed event -> NOT exempt");

// 600 + NOT all 80
const ex4 = calculateArmyBodyFat({
  unitSystem: "imperial", gender: "male", age: 25, weightLbs: 175, heightInches: 70, waistInches: 34,
  acftScore: 600, acftPassedAllEvents80: false
});
assert(ex4.isAcftExempt === false, "600 + failed event -> NOT exempt");

// 3. Lean Mass & Fat Mass Exact Rounding
// Weight 175, BF 16.5% -> Fat Mass = 175 * 0.165 = 28.875 -> 28.9 lbs. Lean Mass = 175 - 28.875 = 146.125 -> 146.1 lbs
assert(ex1.fatMassLbs === 28.9, `Fat mass 28.9 (got ${ex1.fatMassLbs})`);
assert(ex1.leanMassLbs === 146.1, `Lean mass 146.1 (got ${ex1.leanMassLbs})`);
assert(Number((ex1.fatMassLbs + ex1.leanMassLbs).toFixed(1)) === 175.0, "Fat mass + Lean mass == Total weight");

// 4. Randomized Valid Tests (1,000 cases)
let validPasses = 0;
for (let i = 0; i < 1000; i++) {
  const gender = i % 2 === 0 ? "male" : "female";
  const age = Math.floor(Math.random() * 50) + 17; // 17 to 66
  const weightLbs = Math.round((Math.random() * 180 + 100) * 10) / 10; // 100 to 280 lbs
  const heightInches = Math.round((Math.random() * 25 + 55) * 10) / 10; // 55 to 80 inches
  const waistInches = Math.round((Math.random() * 25 + 24) * 10) / 10; // 24 to 49 inches
  const acftScore = Math.floor(Math.random() * 601);
  const acftPassedAll80 = Math.random() > 0.5;

  const res = calculateArmyBodyFat({
    unitSystem: "imperial",
    gender,
    age,
    weightLbs,
    heightInches,
    waistInches,
    acftScore,
    acftPassedAllEvents80: acftPassedAll80
  });

  if (
    Number.isFinite(res.bodyFatPercentage) &&
    res.bodyFatPercentage >= 3 &&
    res.bodyFatPercentage <= 60 &&
    Number.isFinite(res.leanMassLbs) &&
    res.leanMassLbs > 0 &&
    Number.isFinite(res.fatMassLbs) &&
    res.fatMassLbs >= 0 &&
    typeof res.isCompliant === "boolean" &&
    typeof res.isAcftExempt === "boolean"
  ) {
    validPasses++;
  }
}
assert(validPasses === 1000, `1,000 valid random cases passed (got ${validPasses})`);

// 5. Randomized Invalid Tests (250 cases)
// Currently, the code has no isValid flag and defaults 0 / negative / NaN / Infinity!
let invalidHandledCount = 0;
const invalidPool = [
  { weightLbs: 0, heightInches: 70, waistInches: 34 },
  { weightLbs: -100, heightInches: 70, waistInches: 34 },
  { weightLbs: NaN, heightInches: 70, waistInches: 34 },
  { weightLbs: Infinity, heightInches: 70, waistInches: 34 },
  { weightLbs: 175, heightInches: 0, waistInches: 34 },
  { weightLbs: 175, heightInches: -50, waistInches: 34 },
  { weightLbs: 175, heightInches: 70, waistInches: 0 },
  { weightLbs: 175, heightInches: 70, waistInches: -20 },
  { weightLbs: 175, heightInches: 70, waistInches: NaN },
  { weightLbs: 175, heightInches: 70, waistInches: Infinity }
];

for (let i = 0; i < 250; i++) {
  const item = invalidPool[i % invalidPool.length];
  const res = calculateArmyBodyFat({
    unitSystem: "imperial",
    gender: "male",
    age: 25,
    ...item
  });
  // Check if current code handles it properly (as a defect detection)
  // If weight is 0, does it return 0 or invalid, or does it return 16.5%?
  if ((item.weightLbs === 0 || item.weightLbs === -100) && res.fatMassLbs > 0 && res.bodyFatPercentage === 16.5) {
    // This is the bug!
  } else {
    invalidHandledCount++;
  }
}

console.log(`Initial harness completed: ${passCount} tests passed, ${failCount} failed.`);
console.log(`Invalid cases properly handled by current code: ${invalidHandledCount} / 250 (Failures due to silent 0 || fallback: ${250 - invalidHandledCount})`);
