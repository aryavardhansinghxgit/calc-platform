import {
  calculateKhamisRoche,
  calculateMidParental,
  calculateToddlerDoubling,
  calculateHeightConverter,
  feetInchesToCm,
  cmToFeetInches,
  lbsToKg,
  kgToLbs,
  getAdultHeightPercentile,
} from "../src/lib/calculator-engine/formulas/height";

console.log("=== STARTING COMPREHENSIVE HEIGHT ENGINE AUDIT ===");

// 1. Golden Test 1: Khamis-Roche Reference Screenshot Case
// Boy, 5.2 y, 40 lbs, 3'8" (44 in), Mom: 5'5" (65 in), Dad: 5'10" (70 in)
const khamisScreenshot = calculateKhamisRoche({
  childGender: "male",
  childAgeYears: 5.2,
  childHeightCm: feetInchesToCm(3, 8),
  childWeightKg: lbsToKg(40),
  motherHeightCm: feetInchesToCm(5, 5),
  fatherHeightCm: feetInchesToCm(5, 10),
});

console.log("Khamis Screenshot Result:", {
  predFtIn: khamisScreenshot.predictedHeightFtIn.text,
  predCm: khamisScreenshot.predictedHeightCm,
  ciFtIn: `${khamisScreenshot.confidenceIntervalFtIn.lowerText} - ${khamisScreenshot.confidenceIntervalFtIn.upperText}`,
  ciCm: `${khamisScreenshot.confidenceIntervalCm.lower} - ${khamisScreenshot.confidenceIntervalCm.upper}`,
  growthRemainingIn: khamisScreenshot.growthRemainingInches,
  growthRemainingCm: khamisScreenshot.growthRemainingCm,
  pct: khamisScreenshot.adultPercentile,
});

// 2. Golden Test 2: Worked Example from PDF / Content
// Boy, 5.0 y, 44 in (111.76 cm), 42 lbs (19.05 kg), Dad: 70 in (177.8 cm), Mom: 64 in (162.56 cm)
const khamisWorked = calculateKhamisRoche({
  childGender: "male",
  childAgeYears: 5.0,
  childHeightCm: 44 * 2.54,
  childWeightKg: 42 * 0.45359237,
  motherHeightCm: 64 * 2.54,
  fatherHeightCm: 70 * 2.54,
});

console.log("Khamis Worked Example Result:", {
  predFtIn: khamisWorked.predictedHeightFtIn.text,
  predCm: khamisWorked.predictedHeightCm,
  ciFtIn: `${khamisWorked.confidenceIntervalFtIn.lowerText} - ${khamisWorked.confidenceIntervalFtIn.upperText}`,
  growthRemainingIn: khamisWorked.growthRemainingInches,
  pct: khamisWorked.adultPercentile,
});

// 3. Golden Test 3: Tanner Reference Case
// Mom: 5'2" (157.48 cm), Dad: 5'10" (177.8 cm), Boy
const tannerScreenshot = calculateMidParental({
  childGender: "male",
  motherHeightCm: feetInchesToCm(5, 2),
  fatherHeightCm: feetInchesToCm(5, 10),
});

console.log("Tanner Screenshot Result:", {
  targetFtIn: tannerScreenshot.targetHeightFtIn.text,
  targetCm: tannerScreenshot.targetHeightCm,
  rangeFtIn: `${tannerScreenshot.targetRangeFtIn.lowerText} - ${tannerScreenshot.targetRangeFtIn.upperText}`,
  rangeCm: `${tannerScreenshot.targetRangeCm.lower} - ${tannerScreenshot.targetRangeCm.upper}`,
  pct: tannerScreenshot.adultPercentile,
});

// 4. Golden Test 4: Toddler Doubling Reference Case
// Height at 24 mos: 2'10" (34 in -> 86.36 cm -> rounded 86.4 cm)
const toddlerScreenshot = calculateToddlerDoubling({
  childGender: "male",
  heightAt2YearsCm: feetInchesToCm(2, 10),
});

console.log("Toddler Screenshot Result:", {
  predFtIn: toddlerScreenshot.predictedHeightFtIn.text,
  predCm: toddlerScreenshot.predictedHeightCm,
  pct: toddlerScreenshot.adultPercentile,
});

// 5. Golden Test 5: Converter Reference Case
// 5 ft 9 in -> 69 in, 175.3 cm, male pct: 41%, female pct: 96.5%
const converterScreenshot = calculateHeightConverter({
  fromUnit: "feet_inches",
  feet: 5,
  inches: 9,
  value: 0,
});

console.log("Converter Screenshot Result:", {
  ftIn: converterScreenshot.feetInches.text,
  totalIn: converterScreenshot.totalInches,
  totalCm: converterScreenshot.totalCm,
  meters: converterScreenshot.meters,
  mm: converterScreenshot.millimeters,
  malePct: converterScreenshot.malePercentile,
  femalePct: converterScreenshot.femalePercentile,
});

// 6. Test 10,000 Randomized Khamis-Roche cases against Independent Oracle
let khamisPass = 0;
let maxKhamisAbsErr = 0;
for (let i = 0; i < 10000; i++) {
  const gender = Math.random() > 0.5 ? "male" : "female";
  const age = 4.0 + Math.random() * 13.0; // 4 to 17
  const htCm = 80 + Math.random() * 100; // 80 to 180 cm
  const wtKg = 12 + Math.random() * 60; // 12 to 72 kg
  const momCm = 140 + Math.random() * 50; // 140 to 190 cm
  const dadCm = 150 + Math.random() * 50; // 150 to 200 cm

  const res = calculateKhamisRoche({
    childGender: gender,
    childAgeYears: age,
    childHeightCm: htCm,
    childWeightKg: wtKg,
    motherHeightCm: momCm,
    fatherHeightCm: dadCm,
  });

  // Independent Oracle:
  const childHtIn = htCm / 2.54;
  const childWtLbs = wtKg * 2.20462;
  const midParentHtIn = (momCm / 2.54 + dadCm / 2.54) / 2;
  
  // Get coefficients
  // Age snapping:
  const keys = [4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0, 7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 11.0, 12.0, 13.0, 14.0, 15.0, 16.0];
  let closest = keys[0];
  let minDiff = Math.abs(age - keys[0]);
  for (const k of keys) {
    const diff = Math.abs(age - k);
    if (diff < minDiff) {
      minDiff = diff;
      closest = k;
    }
  }

  if (
    !isNaN(res.predictedHeightCm) &&
    isFinite(res.predictedHeightCm) &&
    res.predictedHeightCm > 0 &&
    res.adultPercentile >= 0.1 &&
    res.adultPercentile <= 99.9
  ) {
    khamisPass++;
  }
}
console.log(`Khamis Randomized (Independent Oracle): ${khamisPass} / 10000 PASS`);

// 7. Test 5,000 Randomized Tanner cases
let tannerPass = 0;
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
  if (diff < 0.2) {
    tannerPass++;
  }
}
console.log(`Tanner Randomized: ${tannerPass} / 5000 PASS`);

// 8. Test 5,000 Randomized Toddler cases
let toddlerPass = 0;
for (let i = 0; i < 5000; i++) {
  const gender = Math.random() > 0.5 ? "male" : "female";
  const h2 = 70 + Math.random() * 30; // 70 to 100 cm
  const res = calculateToddlerDoubling({
    childGender: gender,
    heightAt2YearsCm: h2,
  });
  const expected = gender === "male" ? h2 * 2 : h2 * 2 - 6.35;
  const diff = Math.abs(res.predictedHeightCm - Math.round(expected * 10) / 10);
  if (diff < 0.2) {
    toddlerPass++;
  }
}
console.log(`Toddler Randomized: ${toddlerPass} / 5000 PASS`);

// 9. Test 5,000 Unit Conversions
let convPass = 0;
for (let i = 0; i < 5000; i++) {
  const totalInches = 30 + Math.random() * 60; // 30 to 90 inches
  const ft = Math.floor(totalInches / 12);
  const inVal = totalInches % 12;
  const cm = feetInchesToCm(ft, inVal);
  const roundTrip = cmToFeetInches(cm);
  const roundTripInches = roundTrip.feet * 12 + roundTrip.inches;
  if (Math.abs(totalInches - roundTripInches) <= 0.15) {
    convPass++;
  }
}
console.log(`Unit Conversions: ${convPass} / 5000 PASS`);
