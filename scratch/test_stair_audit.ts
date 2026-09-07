import {
  calculateBasicStair,
  calculateComprehensiveStair,
  calculateHeadroomOpening,
  calculateStairMaterials,
  toInches,
  fromInches,
  toCarpentryFraction,
  parseCarpentryDimension,
} from "../src/lib/calculator-engine/formulas/stair";

console.log("=== POST-FIX GOLDEN REGRESSION TEST SUITE ===");

// TC-01: Rise = 120 in, Target = 7.5, Run = 10
const tc01 = calculateComprehensiveStair({
  runMode: "one_run",
  runValue: 10,
  runUnit: "inches",
  totalRise: 120,
  riseUnit: "inches",
  riseMode: "fixed_rise",
  targetRiserHeight: 7.5,
  hasTread: true,
  treadThickness: 1.0,
  nosingLength: 0.75,
  hasHeadroomRestriction: false,
  mountType: "standard",
});

console.log("TC-01 (120 in rise, 7.5 target, 10 run):");
console.log(`- Risers: ${tc01.numberOfRisers} (Expected: 16) -> ${tc01.numberOfRisers === 16 ? "PASS" : "FAIL"}`);
console.log(`- Exact Riser: ${tc01.exactRiserHeightInches}" (Expected: 7.5) -> ${tc01.exactRiserHeightInches === 7.5 ? "PASS" : "FAIL"}`);
console.log(`- Treads: ${tc01.numberOfTreads} (Expected: 15) -> ${tc01.numberOfTreads === 15 ? "PASS" : "FAIL"}`);
console.log(`- Total Run: ${tc01.totalRunInches}" (Expected: 150) -> ${tc01.totalRunInches === 150 ? "PASS" : "FAIL"}`);
console.log(`- Incline Angle: ${tc01.inclineAngleDegrees}° (Expected: 38.7°) -> ${tc01.inclineAngleDegrees === 38.7 ? "PASS" : "FAIL"}`);
console.log(`- Stringer: ${tc01.stringerLengthInches}" (${tc01.stringerLengthFeet} ft) (Expected: ~192.09 / 16.01 ft) -> ${tc01.stringerLengthInches === 192.09 ? "PASS" : "FAIL"}`);

// TC-02: Rise = 108 in, Target = 7.5, Run = 10
const tc02 = calculateComprehensiveStair({
  runMode: "one_run",
  runValue: 10,
  runUnit: "inches",
  totalRise: 108,
  riseUnit: "inches",
  riseMode: "fixed_rise",
  targetRiserHeight: 7.5,
  hasTread: true,
  treadThickness: 1.0,
  nosingLength: 0.75,
  hasHeadroomRestriction: false,
  mountType: "standard",
});

console.log("\nTC-02 (108 in rise, 7.5 target, 10 run):");
console.log(`- Risers: ${tc02.numberOfRisers} (Expected: 15) -> ${tc02.numberOfRisers === 15 ? "PASS" : "FAIL"}`);
console.log(`- Exact Riser: ${tc02.exactRiserHeightInches}" (Expected: 7.2) -> ${tc02.exactRiserHeightInches === 7.2 ? "PASS" : "FAIL"}`);
console.log(`- Treads: ${tc02.numberOfTreads} (Expected: 14) -> ${tc02.numberOfTreads === 14 ? "PASS" : "FAIL"}`);
console.log(`- Total Run: ${tc02.totalRunInches}" (Expected: 140) -> ${tc02.totalRunInches === 140 ? "PASS" : "FAIL"}`);
console.log(`- Incline Angle: ${tc02.inclineAngleDegrees}° (Expected: ~37.6°) -> ${Math.abs(tc02.inclineAngleDegrees - 37.6) < 0.2 ? "PASS" : "FAIL"}`);
console.log(`- Stringer: ${tc02.stringerLengthInches}" (Expected: ~176.82) -> ${Math.abs(tc02.stringerLengthInches - 176.82) < 0.1 ? "PASS" : "FAIL"}`);

// TC-03: Rise = 96 in, Target = 7.5, Run = 11
const tc03 = calculateComprehensiveStair({
  runMode: "one_run",
  runValue: 11,
  runUnit: "inches",
  totalRise: 96,
  riseUnit: "inches",
  riseMode: "fixed_rise",
  targetRiserHeight: 7.5,
  hasTread: true,
  treadThickness: 1.0,
  nosingLength: 0.75,
  hasHeadroomRestriction: false,
  mountType: "standard",
});

console.log("\nTC-03 (96 in rise, 7.5 target, 11 run):");
console.log(`- Risers: ${tc03.numberOfRisers} (Expected: 13) -> ${tc03.numberOfRisers === 13 ? "PASS" : "FAIL"}`);
console.log(`- Exact Riser: ${tc03.exactRiserHeightInches}" (Expected: 7.385) -> ${tc03.exactRiserHeightInches === 7.385 ? "PASS" : "FAIL"}`);
console.log(`- Treads: ${tc03.numberOfTreads} (Expected: 12) -> ${tc03.numberOfTreads === 12 ? "PASS" : "FAIL"}`);
console.log(`- Total Run: ${tc03.totalRunInches}" (Expected: 132) -> ${tc03.totalRunInches === 132 ? "PASS" : "FAIL"}`);
console.log(`- Incline Angle: ${tc03.inclineAngleDegrees}° (Expected: 36.0°) -> ${tc03.inclineAngleDegrees === 36.0 ? "PASS" : "FAIL"}`);
console.log(`- Stringer: ${tc03.stringerLengthInches}" (Expected: 163.22) -> ${tc03.stringerLengthInches === 163.22 ? "PASS" : "FAIL"}`);

// TC-04: Fixed Steps (120 in rise, 16 steps -> 7.5, 15 steps -> 8.0)
const tc04_16 = calculateComprehensiveStair({
  runMode: "one_run",
  runValue: 10,
  runUnit: "inches",
  totalRise: 120,
  riseUnit: "inches",
  riseMode: "fixed_steps",
  fixedStepsCount: 16,
  hasTread: true,
  treadThickness: 1.0,
  nosingLength: 0.75,
  hasHeadroomRestriction: false,
  mountType: "standard",
});
const tc04_15 = calculateComprehensiveStair({
  runMode: "one_run",
  runValue: 10,
  runUnit: "inches",
  totalRise: 120,
  riseUnit: "inches",
  riseMode: "fixed_steps",
  fixedStepsCount: 15,
  hasTread: true,
  treadThickness: 1.0,
  nosingLength: 0.75,
  hasHeadroomRestriction: false,
  mountType: "standard",
});

console.log("\nTC-04 (Fixed Steps 16 vs 15):");
console.log(`- 16 Steps Riser: ${tc04_16.exactRiserHeightInches}" (Expected: 7.5) -> ${tc04_16.exactRiserHeightInches === 7.5 ? "PASS" : "FAIL"}`);
console.log(`- 15 Steps Riser: ${tc04_15.exactRiserHeightInches}" (Expected: 8.0) -> ${tc04_15.exactRiserHeightInches === 8.0 ? "PASS" : "FAIL"}`);

// Fraction Parser Tests
console.log("\nFraction Parser Tests:");
const fractionCases = [
  { in: "7 1/2", exp: 7.5 },
  { in: "10 1/4", exp: 10.25 },
  { in: "3/4", exp: 0.75 },
  { in: "7 3/16", exp: 7.1875 },
  { in: " 7 1/2 ", exp: 7.5 },
  { in: "7    1/2", exp: 7.5 },
  { in: "7.5", exp: 7.5 },
  { in: "10", exp: 10 },
  { in: "7½", exp: 7.5 },
  { in: "1/0", exp: NaN },
  { in: "abc", exp: NaN },
  { in: "-5", exp: NaN },
  { in: "0", exp: NaN },
];

let fractionPass = true;
for (const tc of fractionCases) {
  const actual = parseCarpentryDimension(tc.in);
  const match = isNaN(tc.exp) ? isNaN(actual) : Math.abs(actual - tc.exp) < 1e-6;
  if (!match) {
    console.log(`FAIL fraction: "${tc.in}" -> got ${actual}, expected ${tc.exp}`);
    fractionPass = false;
  }
}
console.log(`Fraction Tests Result: ${fractionPass ? "ALL PASS" : "SOME FAILED"}`);

// Reference Case Cost
const costRes = calculateStairMaterials({
  stairResult: tc01,
  materialInput: {
    stairWidthInches: 36,
    stringerLumberSize: "2x12",
    treadMaterial: "oak",
    riserMaterial: "primed_mdf",
    pricePerStringerBoard: 35,
    pricePerTread: 24,
    pricePerRiser: 14,
    fastenersAndBracketsCost: 45,
    handrailCost: 0,
    laborCost: 0,
    taxRatePercent: 7,
  },
});
console.log("\nReference Cost Test:");
console.log(`Subtotal: $${costRes.materialsSubtotal} (Expected: 734) -> ${costRes.materialsSubtotal === 734 ? "PASS" : "FAIL"}`);
console.log(`Tax: $${costRes.taxCost} (Expected: 51.38) -> ${costRes.taxCost === 51.38 ? "PASS" : "FAIL"}`);
console.log(`Total: $${costRes.totalEstimatedCost} (Expected: 785.38) -> ${costRes.totalEstimatedCost === 785.38 ? "PASS" : "FAIL"}`);
