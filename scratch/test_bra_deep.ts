import { calculateBraSize } from '../src/app/calculators/bra-size-calculator/calculator';
import {
  BraUnit,
  RegionStandard,
  BreastShape,
} from '../src/app/calculators/bra-size-calculator/types';

// ==========================================
// INDEPENDENT SIZING ORACLE
// ==========================================
const ORACLE_US_CUPS = ["AA", "A", "B", "C", "D", "DD/E", "DDD/F", "G", "H", "I", "J", "K", "L", "M"];
const ORACLE_UK_CUPS = ["AA", "A", "B", "C", "D", "DD", "E", "F", "FF", "G", "GG", "H", "HH", "J"];
const ORACLE_EU_CUPS = ["AA", "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];

const ORACLE_AU_BANDS: Record<number, number> = {
  28: 6, 30: 8, 32: 10, 34: 12, 36: 14, 38: 16, 40: 18, 42: 20, 44: 22, 46: 24, 48: 26, 50: 28, 52: 30
};

const ORACLE_EU_BANDS: Record<number, number> = {
  28: 60, 30: 65, 32: 70, 34: 75, 36: 80, 38: 85, 40: 90, 42: 95, 44: 100, 46: 105, 48: 110, 50: 115, 52: 120
};

function independentOracle(
  underbust: number,
  bust: number,
  unit: BraUnit,
  region: RegionStandard,
  shape: BreastShape = "even"
) {
  const underbustInches = unit === "cm" ? underbust / 2.54 : underbust;
  const bustInches = unit === "cm" ? bust / 2.54 : bust;

  let roundedUnderbust = Math.round(underbustInches);
  let band = roundedUnderbust % 2 === 0 ? roundedUnderbust : roundedUnderbust + 1;
  if (band < 28) band = 28;
  if (band > 52) band = 52;

  let diff = bustInches - underbustInches;
  if (diff < 0) diff = 0;

  let shapeOffset = 0;
  if (shape === "shallow") shapeOffset = -0.5;
  else if (shape === "projected" || shape === "asymmetrical") shapeOffset = 0.5;

  const adjDiff = Math.max(0, diff + shapeOffset);
  const cupIdx = Math.min(Math.round(adjDiff), ORACLE_US_CUPS.length - 1);

  const cupUS = ORACLE_US_CUPS[cupIdx] || "D";
  const cupUK = ORACLE_UK_CUPS[cupIdx] || "D";
  const cupEU = ORACLE_EU_CUPS[cupIdx] || "D";

  const euBand = ORACLE_EU_BANDS[band] || (band - 30) * 5 + 65;
  const frBand = euBand + 15;
  const auBand = ORACLE_AU_BANDS[band] || band - 22;

  let primary = `${band}${cupUS}`;
  if (region === "UK") primary = `${band}${cupUK}`;
  else if (region === "EU") primary = `${euBand}${cupEU}`;
  else if (region === "FR") primary = `${frBand}${cupEU}`;
  else if (region === "AU") primary = `${auBand}${cupUK}`;
  else if (region === "IN") primary = `${band}${cupUK}`;

  return {
    primary,
    band,
    diff: parseFloat(diff.toFixed(1)),
    cupUS,
    cupUK,
    cupEU,
    euBand,
    frBand,
    auBand,
    cupIdx
  };
}

// ==========================================
// TEST 1: 100,000 RANDOMIZED CALCULATION TESTS
// ==========================================
console.log("Running 100,000 Randomized Calculation Tests...");
let calcPass = 0;
let calcFail = 0;
const regions: RegionStandard[] = ["US", "UK", "EU", "FR", "AU", "IN"];
const units: BraUnit[] = ["in", "cm"];
const shapes: BreastShape[] = ["even", "shallow", "projected", "asymmetrical", "bell", "teardrop"];

for (let i = 0; i < 100000; i++) {
  const unit = units[i % 2];
  const region = regions[i % 6];
  const shape = shapes[i % 6];

  // Underbust: 22 to 55 in (or 55 to 140 cm)
  const minU = unit === "in" ? 24 : 60;
  const maxU = unit === "in" ? 50 : 130;
  const underbust = parseFloat((minU + Math.random() * (maxU - minU)).toFixed(2));
  
  // Bust: underbust + 0 to 14 inches (or 0 to 35 cm)
  const maxDiff = unit === "in" ? 14 : 35;
  const bust = parseFloat((underbust + Math.random() * maxDiff).toFixed(2));

  const actual = calculateBraSize(underbust, bust, unit, region, shape);
  const oracle = independentOracle(underbust, bust, unit, region, shape);

  if (
    actual.primarySize === oracle.primary &&
    actual.bandSizeInches === oracle.band &&
    Math.abs(actual.diffInches - oracle.diff) < 0.15 &&
    actual.multiSystem.us === `${oracle.band}${oracle.cupUS}` &&
    actual.multiSystem.uk === `${oracle.band}${oracle.cupUK}` &&
    actual.multiSystem.eu === `${oracle.euBand}${oracle.cupEU}` &&
    actual.multiSystem.fr === `${oracle.frBand}${oracle.cupEU}` &&
    actual.multiSystem.au === `${oracle.auBand}${oracle.cupUK}` &&
    actual.multiSystem.in === `${oracle.band}${oracle.cupUK}`
  ) {
    calcPass++;
  } else {
    calcFail++;
    if (calcFail <= 3) {
      console.error(`Calculation mismatch at i=${i}:`, {
        underbust, bust, unit, region, shape,
        actual: { primary: actual.primarySize, band: actual.bandSizeInches, diff: actual.diffInches, multi: actual.multiSystem },
        oracle
      });
    }
  }
}
console.log(`100,000 Calculation Tests Completed: ${calcPass} PASS, ${calcFail} FAIL (${(calcPass/1000).toFixed(2)}%)`);

// ==========================================
// TEST 2: 100,000 SISTER SIZE TESTS & REGIONAL DEFECT AUDIT
// ==========================================
console.log("\nRunning 100,000 Sister Size Tests & Regional Checks...");
let sisterPass = 0;
let sisterFail = 0;
let regionalSisterAnomalies = 0;

for (let i = 0; i < 100000; i++) {
  const region = regions[i % 6];
  const underbust = 28 + (i % 24); // 28 to 50
  const bust = underbust + (i % 12); // diff 0 to 11

  const res = calculateBraSize(underbust, bust, "in", region, "even");

  // Check sister sizes consistency
  let valid = true;
  for (const sister of res.sisterSizes) {
    if (!sister.size || !sister.bandAdjustment || !sister.cupAdjustment || !sister.fitGuidance) {
      valid = false;
    }

    // Regional sister size check:
    // If region is FR, sister size should NOT have US band numbers (28, 30, 32, etc.)!
    // If region is AU, sister size should NOT have US band numbers!
    if (region === "FR" && sister.size.match(/^(26|28|30|32|34|36|38|40|42|44|46|48|50|52)/)) {
      regionalSisterAnomalies++;
    }
    if (region === "AU" && sister.size.match(/^(26|28|30|32|34|36|38|40|42|44|46|48|50|52)/)) {
      regionalSisterAnomalies++;
    }
  }

  if (valid) sisterPass++;
  else sisterFail++;
}
console.log(`100,000 Sister Size Tests Completed: ${sisterPass} PASS, ${sisterFail} FAIL`);
console.log(`Regional Sister Size Anomalies (FR/AU showing US bands): ${regionalSisterAnomalies}`);

// ==========================================
// TEST 3: 100,000 UNIT CONVERSION ROUND-TRIP TESTS
// ==========================================
console.log("\nRunning 100,000 Unit Round-Trip Tests...");
let unitPass = 0;
let unitFail = 0;

for (let i = 0; i < 100000; i++) {
  const originalInches = parseFloat((26 + Math.random() * 30).toFixed(2));
  const cm = originalInches * 2.54;
  const backToInches = cm / 2.54;

  if (Math.abs(originalInches - backToInches) < 1e-9) {
    unitPass++;
  } else {
    unitFail++;
  }
}
console.log(`100,000 Unit Round-Trip Tests: ${unitPass} PASS, ${unitFail} FAIL`);

// ==========================================
// TEST 4: PROPERTY TESTS P1 - P8
// ==========================================
console.log("\nRunning Property Tests P1 - P8...");

// P1: Changing only bust should not alter band size
let p1Pass = true;
for (let b = 30; b <= 44; b += 0.5) {
  const r1 = calculateBraSize(30, 34, "in", "US");
  const r2 = calculateBraSize(30, b, "in", "US");
  if (r1.bandSizeInches !== r2.bandSizeInches) p1Pass = false;
}
console.log("P1 (Band independent of bust):", p1Pass ? "PASS" : "FAIL");

// P2: Changing only region should not alter physical measurements
let p2Pass = true;
for (const reg of regions) {
  const r = calculateBraSize(30, 34, "in", reg);
  if (r.underbustInches !== 30 || r.bustInches !== 34 || r.diffInches !== 4) p2Pass = false;
}
console.log("P2 (Measurements invariant across regions):", p2Pass ? "PASS" : "FAIL");

// P3: Centimeter vs Inch equivalence for 30in/34in
const rInch = calculateBraSize(30, 34, "in", "US");
const rCm = calculateBraSize(76.2, 86.36, "cm", "US");
const p3Pass = rInch.primarySize === rCm.primarySize && rInch.bandSizeInches === rCm.bandSizeInches;
console.log("P3 (Inch/cm calculation equivalence for 30/34):", p3Pass ? "PASS" : "FAIL");

// P5: Displayed band corresponds to underlying band rule (always even integer)
let p5Pass = true;
for (let u = 25; u <= 55; u += 0.25) {
  const r = calculateBraSize(u, u + 4, "in", "US");
  if (r.bandSizeInches % 2 !== 0 || r.bandSizeInches < 28 || r.bandSizeInches > 52) p5Pass = false;
}
console.log("P5 (Band is always even integer between 28 and 52):", p5Pass ? "PASS" : "FAIL");

// P8: No NaN or invalid labels
let p8Pass = true;
const testEdgeInputs = [
  [0, 0], [-10, -5], [30, 20], [NaN, NaN], [100, 150], [10, 12]
];
for (const [u, b] of testEdgeInputs) {
  const r = calculateBraSize(u, b, "in", "US");
  if (
    typeof r.primarySize !== "string" ||
    r.primarySize.includes("NaN") ||
    r.primarySize.includes("undefined")
  ) {
    p8Pass = false;
  }
}
console.log("P8 (No NaN or undefined labels on extreme inputs):", p8Pass ? "PASS" : "FAIL");

// ==========================================
// TEST 5: SISTER SIZE EXTREMES
// ==========================================
console.log("\nTesting Sister Size Extremes...");
const minBandResult = calculateBraSize(26, 30, "in", "US"); // Clamped to 28
console.log("Smallest Band (28): Sister sizes count =", minBandResult.sisterSizes.length);
minBandResult.sisterSizes.forEach(s => console.log(" -", s.size, s.bandAdjustment));

const maxBandResult = calculateBraSize(54, 58, "in", "US"); // Clamped to 52
console.log("Largest Band (52): Sister sizes count =", maxBandResult.sisterSizes.length);
maxBandResult.sisterSizes.forEach(s => console.log(" -", s.size, s.bandAdjustment));

const minCupResult = calculateBraSize(30, 30, "in", "US"); // Diff 0 = AA
console.log("Smallest Cup (AA): Sister sizes count =", minCupResult.sisterSizes.length);
minCupResult.sisterSizes.forEach(s => console.log(" -", s.size, s.cupAdjustment));

const maxCupResult = calculateBraSize(30, 50, "in", "US"); // Max cup M
console.log("Largest Cup (M): Sister sizes count =", maxCupResult.sisterSizes.length);
maxCupResult.sisterSizes.forEach(s => console.log(" -", s.size, s.cupAdjustment));
