import {
  calculateKhamisRoche,
  calculateMidParental,
  calculateToddlerDoubling,
  calculateHeightConverter,
  feetInchesToCm,
  cmToFeetInches,
  lbsToKg,
  kgToLbs,
  formatOrdinalPercentile,
} from "../src/lib/calculator-engine/formulas/height";

console.log("=== COMPREHENSIVE HEIGHT INTEGRATION & PROPERTY AUDIT ===");

let totalAssertions = 0;
let passedAssertions = 0;

function assert(condition: boolean, msg: string) {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
  } else {
    console.error(`FAIL: ${msg}`);
    throw new Error(`Assertion failed: ${msg}`);
  }
}

// 1. Ordinal Percentile Formatter Tests
assert(formatOrdinalPercentile(1) === "1st %", "1st % check");
assert(formatOrdinalPercentile(2) === "2nd %", "2nd % check");
assert(formatOrdinalPercentile(3) === "3rd %", "3rd % check");
assert(formatOrdinalPercentile(4) === "4th %", "4th % check");
assert(formatOrdinalPercentile(11) === "11th %", "11th % check");
assert(formatOrdinalPercentile(12) === "12th %", "12th % check");
assert(formatOrdinalPercentile(13) === "13th %", "13th % check");
assert(formatOrdinalPercentile(21) === "21st %", "21st % check");
assert(formatOrdinalPercentile(22.4) === "22.4th %", "22.4th % check");
assert(formatOrdinalPercentile(35.4) === "35.4th %", "35.4th % check");
assert(formatOrdinalPercentile(41) === "41st %", "41st % check");
assert(formatOrdinalPercentile(96.5) === "96.5th %", "96.5th % check");
console.log("Ordinal percentile assertions passed.");

// 2. Khamis-Roche Reference Screenshot Case
const khamisScreenshot = calculateKhamisRoche({
  childGender: "male",
  childAgeYears: 5.2,
  childHeightCm: feetInchesToCm(3, 8),
  childWeightKg: lbsToKg(40),
  motherHeightCm: feetInchesToCm(5, 5),
  fatherHeightCm: feetInchesToCm(5, 10),
});

assert(khamisScreenshot.predictedHeightFtIn.text === `5' 7.4"`, `Khamis Screenshot pred ft/in expected 5' 7.4", got ${khamisScreenshot.predictedHeightFtIn.text}`);
assert(khamisScreenshot.predictedHeightCm === 171.3, `Khamis Screenshot pred cm expected 171.3, got ${khamisScreenshot.predictedHeightCm}`);
assert(khamisScreenshot.confidenceIntervalFtIn.lowerText === `5' 5"`, `CI lower expected 5' 5", got ${khamisScreenshot.confidenceIntervalFtIn.lowerText}`);
assert(khamisScreenshot.confidenceIntervalFtIn.upperText === `5' 9.8"`, `CI upper expected 5' 9.8", got ${khamisScreenshot.confidenceIntervalFtIn.upperText}`);
assert(khamisScreenshot.growthRemainingInches === 23.4, `Growth remaining expected 23.4", got ${khamisScreenshot.growthRemainingInches}`);
assert(khamisScreenshot.growthRemainingCm === 59.5, `Growth remaining cm expected 59.5, got ${khamisScreenshot.growthRemainingCm}`);
assert(khamisScreenshot.adultPercentile === 22.4, `Adult percentile expected 22.4, got ${khamisScreenshot.adultPercentile}`);
console.log("Khamis-Roche screenshot regression passed.");

// 3. Tanner Mid-Parental Reference Case
const tannerScreenshot = calculateMidParental({
  childGender: "male",
  motherHeightCm: feetInchesToCm(5, 2),
  fatherHeightCm: feetInchesToCm(5, 10),
});

assert(tannerScreenshot.targetHeightFtIn.text === `5' 8.6"`, `Tanner target ft/in expected 5' 8.6", got ${tannerScreenshot.targetHeightFtIn.text}`);
assert(tannerScreenshot.targetHeightCm === 174.2, `Tanner target cm expected 174.2, got ${tannerScreenshot.targetHeightCm}`);
assert(tannerScreenshot.targetRangeFtIn.lowerText === `5' 5.2"`, `Tanner lower expected 5' 5.2", got ${tannerScreenshot.targetRangeFtIn.lowerText}`);
assert(tannerScreenshot.targetRangeFtIn.upperText === `5' 11.9"`, `Tanner upper expected 5' 11.9", got ${tannerScreenshot.targetRangeFtIn.upperText}`);
assert(tannerScreenshot.adultPercentile === 35.4, `Tanner percentile expected 35.4, got ${tannerScreenshot.adultPercentile}`);
console.log("Tanner screenshot regression passed.");

// 4. Toddler Doubling Reference Case
const toddlerScreenshot = calculateToddlerDoubling({
  childGender: "male",
  heightAt2YearsCm: feetInchesToCm(2, 10),
});

assert(toddlerScreenshot.predictedHeightFtIn.text === `5' 8"`, `Toddler pred ft/in expected 5' 8", got ${toddlerScreenshot.predictedHeightFtIn.text}`);
assert(toddlerScreenshot.predictedHeightCm === 172.8, `Toddler pred cm expected 172.8, got ${toddlerScreenshot.predictedHeightCm}`);
assert(toddlerScreenshot.adultPercentile === 28.8, `Toddler percentile expected 28.8, got ${toddlerScreenshot.adultPercentile}`);
console.log("Toddler screenshot regression passed.");

// 5. Universal Height Converter Reference Case
const convScreenshot = calculateHeightConverter({
  fromUnit: "feet_inches",
  feet: 5,
  inches: 9,
  value: 0,
});

assert(convScreenshot.feetInches.text === `5' 9"`, `Conv ft/in expected 5' 9", got ${convScreenshot.feetInches.text}`);
assert(convScreenshot.totalInches === 69, `Conv total inches expected 69, got ${convScreenshot.totalInches}`);
assert(convScreenshot.totalCm === 175.3, `Conv total cm expected 175.3, got ${convScreenshot.totalCm}`);
assert(convScreenshot.meters === 1.753, `Conv meters expected 1.753, got ${convScreenshot.meters}`);
assert(convScreenshot.millimeters === 1753, `Conv mm expected 1753, got ${convScreenshot.millimeters}`);
assert(convScreenshot.malePercentile === 41, `Conv male percentile expected 41, got ${convScreenshot.malePercentile}`);
assert(convScreenshot.femalePercentile === 96.5, `Conv female percentile expected 96.5, got ${convScreenshot.femalePercentile}`);
console.log("Universal Height Converter screenshot regression passed.");

// 6. Inches Rounding Rollover Test (e.g. 59.99 in -> 5' 0", not 4' 12")
const rolloverCheck = cmToFeetInches(182.87); // 71.996 inches
assert(!rolloverCheck.text.includes('12"'), `Inches rounding rollover check failed, got ${rolloverCheck.text}`);
console.log(`Rollover check passed: ${rolloverCheck.text}`);

// 7. Monotonicity Test
let prevPred = 0;
for (let ht = 90; ht <= 140; ht += 5) {
  const res = calculateKhamisRoche({
    childGender: "male",
    childAgeYears: 6.0,
    childHeightCm: ht,
    childWeightKg: 22,
    motherHeightCm: 165,
    fatherHeightCm: 178,
  });
  if (prevPred > 0) {
    assert(res.predictedHeightCm > prevPred, `Khamis monotonicity failed: at ht ${ht}, pred ${res.predictedHeightCm} not > ${prevPred}`);
  }
  prevPred = res.predictedHeightCm;
}
console.log("Khamis stature monotonicity passed.");

// 8. 10,000 Randomized Khamis-Roche Model Tests
for (let i = 0; i < 10000; i++) {
  const gender = Math.random() > 0.5 ? "male" : "female";
  const age = 4.0 + Math.random() * 13.0;
  const htCm = 80 + Math.random() * 100;
  const wtKg = 12 + Math.random() * 60;
  const momCm = 140 + Math.random() * 50;
  const dadCm = 150 + Math.random() * 50;

  const res = calculateKhamisRoche({
    childGender: gender,
    childAgeYears: age,
    childHeightCm: htCm,
    childWeightKg: wtKg,
    motherHeightCm: momCm,
    fatherHeightCm: dadCm,
  });

  assert(!isNaN(res.predictedHeightCm) && isFinite(res.predictedHeightCm) && res.predictedHeightCm > 0, "Khamis prediction validity");
  assert(res.adultPercentile >= 0.1 && res.adultPercentile <= 99.9, "Khamis percentile range");
}
console.log("10,000 randomized Khamis-Roche cases passed.");

// 9. 5,000 Randomized Tanner Mid-Parental Tests
for (let i = 0; i < 5000; i++) {
  const gender = Math.random() > 0.5 ? "male" : "female";
  const momCm = 140 + Math.random() * 50;
  const dadCm = 150 + Math.random() * 50;

  const res = calculateMidParental({
    childGender: gender,
    motherHeightCm: momCm,
    fatherHeightCm: dadCm,
  });

  const expectedMid = gender === "male" ? (dadCm + momCm + 13) / 2 : (dadCm + momCm - 13) / 2;
  const diff = Math.abs(res.targetHeightCm - Math.round(expectedMid * 10) / 10);
  assert(diff < 0.2, "Tanner calculation precision");
}
console.log("5,000 randomized Tanner cases passed.");

// 10. 5,000 Randomized Toddler Doubling Tests
for (let i = 0; i < 5000; i++) {
  const gender = Math.random() > 0.5 ? "male" : "female";
  const h2 = 70 + Math.random() * 30;

  const res = calculateToddlerDoubling({
    childGender: gender,
    heightAt2YearsCm: h2,
  });

  const expected = gender === "male" ? h2 * 2 : h2 * 2 - 6.35;
  const diff = Math.abs(res.predictedHeightCm - Math.round(expected * 10) / 10);
  assert(diff < 0.2, "Toddler calculation precision");
}
console.log("5,000 randomized Toddler cases passed.");

// 11. 5,000 Randomized Unit Conversion Round-Trips
for (let i = 0; i < 5000; i++) {
  const totalInches = 30 + Math.random() * 60;
  const ft = Math.floor(totalInches / 12);
  const inVal = totalInches % 12;
  const cm = feetInchesToCm(ft, inVal);
  const roundTrip = cmToFeetInches(cm);
  const roundTripInches = roundTrip.feet * 12 + roundTrip.inches;
  assert(Math.abs(totalInches - roundTripInches) <= 0.15, "Unit conversion round-trip invariance");
}
console.log("5,000 randomized unit conversions passed.");

console.log(`=== ALL ${passedAssertions} ASSERTIONS PASSED WITH ZERO FAILURES! ===`);
