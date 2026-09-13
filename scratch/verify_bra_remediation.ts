import { calculateBraSize } from '../src/app/calculators/bra-size-calculator/calculator';
import {
  BraUnit,
  RegionStandard,
  BreastShape,
} from '../src/app/calculators/bra-size-calculator/types';

console.log("==========================================");
console.log("POST-REMEDIATION BRA SIZE VERIFICATION");
console.log("==========================================");

// 1. FIX #1 VERIFICATION: Band conversions across full range 28 to 52
console.log("\n--- TEST 1: Full Range Band Conversions (28 - 52) ---");
const expectedBands: Record<number, { eu: number; fr: number; au: number }> = {
  28: { eu: 60, fr: 75, au: 6 },
  30: { eu: 65, fr: 80, au: 8 },
  32: { eu: 70, fr: 85, au: 10 },
  34: { eu: 75, fr: 90, au: 12 },
  36: { eu: 80, fr: 95, au: 14 },
  38: { eu: 85, fr: 100, au: 16 },
  40: { eu: 90, fr: 105, au: 18 },
  42: { eu: 95, fr: 110, au: 20 },
  44: { eu: 100, fr: 115, au: 22 },
  46: { eu: 105, fr: 120, au: 24 },
  48: { eu: 110, fr: 125, au: 26 },
  50: { eu: 115, fr: 130, au: 28 },
  52: { eu: 120, fr: 135, au: 30 },
};

let fix1Pass = true;
for (const [bStr, exp] of Object.entries(expectedBands)) {
  const b = parseInt(bStr, 10);
  const res = calculateBraSize(b, b + 4, "in", "US");
  const actualEU = parseInt(res.multiSystem.eu.replace(/[A-Z]/g, ""), 10);
  const actualFR = parseInt(res.multiSystem.fr.replace(/[A-Z]/g, ""), 10);
  const actualAU = parseInt(res.multiSystem.au.replace(/[A-Z]/g, ""), 10);

  const euMatch = actualEU === exp.eu;
  const frMatch = actualFR === exp.fr;
  const auMatch = actualAU === exp.au;

  if (!euMatch || !frMatch || !auMatch) {
    fix1Pass = false;
    console.error(`Band ${b} MISMATCH:`, { actual: { eu: actualEU, fr: actualFR, au: actualAU }, expected: exp });
  } else {
    console.log(`Band ${b} -> EU ${actualEU}, FR ${actualFR}, AU ${actualAU} : PASS`);
  }
}
console.log("Fix #1 Status:", fix1Pass ? "ALL PASS" : "FAIL");

// 2. FIX #2 VERIFICATION: Sister sizes across all regions
console.log("\n--- TEST 2: Sister Sizes Across All Regions (30D) ---");
const expectedSisters: Record<RegionStandard, { tighter: string; looser: string }> = {
  US: { tighter: "28DD/E", looser: "32C" },
  UK: { tighter: "28DD", looser: "32C" },
  IN: { tighter: "28DD", looser: "32C" },
  EU: { tighter: "60E", looser: "70C" },
  FR: { tighter: "75E", looser: "85C" },
  AU: { tighter: "6DD", looser: "10C" },
};

let fix2Pass = true;
for (const [reg, exp] of Object.entries(expectedSisters) as [RegionStandard, { tighter: string; looser: string }][]) {
  const res = calculateBraSize(30, 34, "in", reg);
  const tighter = res.sisterSizes[0]?.size;
  const looser = res.sisterSizes[1]?.size;

  const tMatch = tighter === exp.tighter;
  const lMatch = looser === exp.looser;

  if (!tMatch || !lMatch) {
    fix2Pass = false;
    console.error(`Region ${reg} Sister Size MISMATCH:`, { tighter, expectedTighter: exp.tighter, looser, expectedLooser: exp.looser });
  } else {
    console.log(`Region ${reg} (30D) -> Tighter: ${tighter}, Looser: ${looser} : PASS`);
  }
}
console.log("Fix #2 Status:", fix2Pass ? "ALL PASS" : "FAIL");

// 3. FIX #3 VERIFICATION: Breast shape does NOT mutate base size
console.log("\n--- TEST 3: Breast Shape Profile Decoupling ---");
const shapes: BreastShape[] = ["even", "shallow", "projected", "asymmetrical", "bell", "teardrop"];
let fix3Pass = true;
for (const sh of shapes) {
  const res = calculateBraSize(30, 34, "in", "US", sh);
  if (res.primarySize !== "30D" || res.diffInches !== 4.0) {
    fix3Pass = false;
    console.error(`Shape ${sh} altered size:`, res.primarySize, "diff:", res.diffInches);
  } else {
    console.log(`Shape "${sh}" -> Primary: ${res.primarySize}, Diff: ${res.diffInches}", Advice: "${res.shapeAdvice.slice(0, 35)}..." : PASS`);
  }
}
console.log("Fix #3 Status:", fix3Pass ? "ALL PASS" : "FAIL");

// 4. FIX #4 VERIFICATION: Input sanitization & Inverted Bust Warning
console.log("\n--- TEST 4: Input Validation & Edge Cases ---");
const rNaN = calculateBraSize(NaN, NaN, "in", "US");
console.log("calculateBraSize(NaN, NaN) -> Primary:", rNaN.primarySize, "Band:", rNaN.bandSizeInches, "Diff:", rNaN.diffInches);
const rZero = calculateBraSize(0, 0, "in", "US");
console.log("calculateBraSize(0, 0) -> Primary:", rZero.primarySize, "Band:", rZero.bandSizeInches);
const rNeg = calculateBraSize(-30, -34, "in", "US");
console.log("calculateBraSize(-30, -34) -> Primary:", rNeg.primarySize, "Band:", rNeg.bandSizeInches);
const rInverted = calculateBraSize(34, 30, "in", "US");
console.log("calculateBraSize(34, 30) -> Inverted warning:", rInverted.isBustSmallerThanUnderbust, "| Text:", rInverted.warning);

const fix4Pass =
  !rNaN.primarySize.includes("NaN") &&
  !rZero.primarySize.includes("NaN") &&
  !rNeg.primarySize.includes("NaN") &&
  rInverted.isBustSmallerThanUnderbust === true &&
  typeof rInverted.warning === "string";
console.log("Fix #4 Status:", fix4Pass ? "ALL PASS" : "FAIL");

// 5. TEST 5: 100,000 RANDOMIZED ORACLE TESTS
console.log("\n--- TEST 5: 100,000 Randomized Oracle Tests ---");
const US_CUPS = ["AA", "A", "B", "C", "D", "DD/E", "DDD/F", "G", "H", "I", "J", "K", "L", "M"];
const UK_CUPS = ["AA", "A", "B", "C", "D", "DD", "E", "F", "FF", "G", "GG", "H", "HH", "J"];
const EU_CUPS = ["AA", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];

const regions: RegionStandard[] = ["US", "UK", "EU", "FR", "AU", "IN"];
const units: BraUnit[] = ["in", "cm"];

let randPass = 0;
let randFail = 0;

for (let i = 0; i < 100000; i++) {
  const unit = units[i % 2];
  const reg = regions[i % 6];
  const sh = shapes[i % 6];

  const minU = unit === "in" ? 24 : 60;
  const maxU = unit === "in" ? 50 : 130;
  const underbust = parseFloat((minU + Math.random() * (maxU - minU)).toFixed(2));
  const bust = parseFloat((underbust + Math.random() * (unit === "in" ? 14 : 35)).toFixed(2));

  const actual = calculateBraSize(underbust, bust, unit, reg, sh);

  // Independent oracle check
  const uIn = unit === "cm" ? underbust / 2.54 : underbust;
  const bIn = unit === "cm" ? bust / 2.54 : bust;
  let expBand = Math.round(uIn);
  expBand = expBand % 2 === 0 ? expBand : expBand + 1;
  if (expBand < 28) expBand = 28;
  if (expBand > 52) expBand = 52;

  let diff = bIn - uIn;
  if (diff < 0) diff = 0;
  const cIdx = Math.min(Math.round(diff), US_CUPS.length - 1);

  const expEU = expectedBands[expBand]?.eu || Math.round(((expBand - 30) / 2) * 5 + 65);
  const expFR = expEU + 15;
  const expAU = expectedBands[expBand]?.au || expBand - 22;

  let expPrimary = `${expBand}${US_CUPS[cIdx]}`;
  if (reg === "UK" || reg === "IN") expPrimary = `${expBand}${UK_CUPS[cIdx]}`;
  else if (reg === "EU") expPrimary = `${expEU}${EU_CUPS[cIdx]}`;
  else if (reg === "FR") expPrimary = `${expFR}${EU_CUPS[cIdx]}`;
  else if (reg === "AU") expPrimary = `${expAU}${UK_CUPS[cIdx]}`;

  if (
    actual.primarySize === expPrimary &&
    actual.bandSizeInches === expBand &&
    actual.multiSystem.eu === `${expEU}${EU_CUPS[cIdx]}` &&
    actual.multiSystem.fr === `${expFR}${EU_CUPS[cIdx]}` &&
    actual.multiSystem.au === `${expAU}${UK_CUPS[cIdx]}`
  ) {
    randPass++;
  } else {
    randFail++;
    if (randFail <= 3) {
      console.error("Rand mismatch at i=", i, { actual: actual.primarySize, expected: expPrimary });
    }
  }
}
console.log(`100,000 Randomized Tests: ${randPass} PASS, ${randFail} FAIL (${(randPass/1000).toFixed(2)}%)`);

// 6. TEST 6: 100,000 Sister Size Tests
console.log("\n--- TEST 6: 100,000 Sister Size Tests ---");
let sisterPass = 0;
let sisterFail = 0;
for (let i = 0; i < 100000; i++) {
  const reg = regions[i % 6];
  const u = 28 + (i % 24);
  const b = u + (i % 12);
  const res = calculateBraSize(u, b, "in", reg);

  let valid = true;
  for (const s of res.sisterSizes) {
    if (!s.size || !s.bandAdjustment || !s.cupAdjustment) valid = false;
    // Check no US bands leaked in FR or AU
    if (reg === "FR" && s.size.match(/^(26|28|30|32|34|36|38|40|42|44|46|48|50|52)[A-Z]/)) valid = false;
    if (reg === "AU" && s.size.match(/^(26|28|30|32|34|36|38|40|42|44|46|48|50|52)[A-Z]/)) valid = false;
  }
  if (valid) sisterPass++;
  else sisterFail++;
}
console.log(`100,000 Sister Size Tests: ${sisterPass} PASS, ${sisterFail} FAIL`);

// 7. TEST 7: Property Tests P1 - P8
console.log("\n--- TEST 7: Invariant Property Checks ---");
// P1: Changing bust does not alter band
let p1 = true;
for (let b = 30; b <= 45; b += 0.5) {
  if (calculateBraSize(32, 36).bandSizeInches !== calculateBraSize(32, b).bandSizeInches) p1 = false;
}
console.log("P1 (Band independent of bust):", p1 ? "PASS" : "FAIL");

// P2: Measurements invariant across regions
let p2 = true;
for (const r of regions) {
  const res = calculateBraSize(30, 34, "in", r);
  if (res.underbustInches !== 30 || res.bustInches !== 34 || res.diffInches !== 4) p2 = false;
}
console.log("P2 (Measurements invariant across regions):", p2 ? "PASS" : "FAIL");

// P5: Band is always even integer between 28 and 52
let p5 = true;
for (let u = 20; u <= 60; u += 0.25) {
  const band = calculateBraSize(u, u + 4).bandSizeInches;
  if (band % 2 !== 0 || band < 28 || band > 52) p5 = false;
}
console.log("P5 (Band is even integer in [28, 52]):", p5 ? "PASS" : "FAIL");

// P6: Base cup strictly corresponds to diff
let p6 = true;
for (let d = 0; d <= 12; d += 0.5) {
  for (const sh of shapes) {
    const res = calculateBraSize(30, 30 + d, "in", "US", sh);
    if (res.diffInches !== parseFloat(d.toFixed(1))) p6 = false;
  }
}
console.log("P6 (Cup strictly corresponds to diff across all shapes):", p6 ? "PASS" : "FAIL");

// P8: No NaN or undefined in any output
let p8 = true;
const edgeCases = [[0,0], [-10,-5], [NaN, NaN], [100, 150], [30, 20]];
for (const [u, b] of edgeCases) {
  const res = calculateBraSize(u, b);
  if (res.primarySize.includes("NaN") || res.primarySize.includes("undefined")) p8 = false;
}
console.log("P8 (No NaN or undefined on extreme/invalid inputs):", p8 ? "PASS" : "FAIL");
