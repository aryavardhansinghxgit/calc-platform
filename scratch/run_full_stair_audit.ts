import {
  calculateBasicStair,
  calculateComprehensiveStair,
  calculateHeadroomOpening,
  calculateStairMaterials,
  toInches,
  fromInches,
  toCarpentryFraction,
  evaluateStairCompliance,
  StairLinearUnit,
} from "../src/lib/calculator-engine/formulas/stair";

console.log("=== RUNNING FULL MATHEMATICAL AUDIT ===");

// 1. RANDOMIZED STAIRCASE GEOMETRY (5,000 cases)
let passedStairs = 0;
let failedStairs = 0;
let maxRelPythagoreanErr = 0;

for (let i = 0; i < 5000; i++) {
  // rise between 10 and 300 inches
  const rise = 10 + Math.random() * 290;
  // run between 8 and 16 inches
  const run = 8 + Math.random() * 8;
  // target riser between 5 and 9 inches
  const targetRiser = 5 + Math.random() * 4;
  const mountType = Math.random() > 0.5 ? "standard" : "flush";

  try {
    const res = calculateComprehensiveStair({
      runMode: "one_run",
      runValue: run,
      runUnit: "inches",
      totalRise: rise,
      riseUnit: "inches",
      riseMode: "fixed_rise",
      targetRiserHeight: targetRiser,
      hasTread: true,
      treadThickness: 1.0,
      nosingLength: 0.75,
      hasHeadroomRestriction: false,
      mountType,
    });

    // Invariants:
    // 1. rise > 0
    // 2. run > 0
    // 3. riser count integer >= 1
    // 4. exact riser = total rise / riser count (within rounding)
    // 5. total run = tread count * unit run (within rounding)
    // 6. angle finite and between 0 and 90
    // 7. stringer finite
    // 8. Pythagorean relation holds: stringer^2 ≈ rise^2 + run^2

    const calcRise = res.numberOfRisers * res.exactRiserHeightInches;
    const riseErr = Math.abs(calcRise - res.totalRiseInches) / res.totalRiseInches;

    const pythHypot = Math.sqrt(res.totalRiseInches ** 2 + res.totalRunInches ** 2);
    const pythErr = Math.abs(res.stringerLengthInches - pythHypot) / pythHypot;
    if (pythErr > maxRelPythagoreanErr) maxRelPythagoreanErr = pythErr;

    const angleCalc = (Math.atan2(res.totalRiseInches, res.totalRunInches) * 180) / Math.PI;
    const angleErr = Math.abs(res.inclineAngleDegrees - angleCalc);

    if (
      Number.isFinite(res.exactRiserHeightInches) &&
      Number.isFinite(res.totalRunInches) &&
      Number.isFinite(res.inclineAngleDegrees) &&
      Number.isFinite(res.stringerLengthInches) &&
      Number.isInteger(res.numberOfRisers) &&
      Number.isInteger(res.numberOfTreads) &&
      res.numberOfRisers >= 1 &&
      res.numberOfTreads >= 1 &&
      riseErr < 0.01 && // accounts for display rounding
      pythErr < 0.01 &&
      angleErr < 0.2
    ) {
      passedStairs++;
    } else {
      failedStairs++;
    }
  } catch (e) {
    failedStairs++;
  }
}
console.log(`Staircase Tests (5,000): Passed = ${passedStairs}, Failed = ${failedStairs}, Max Rel Pythagorean Error = ${maxRelPythagoreanErr.toExponential(3)}`);

// 2. RANDOMIZED HEADROOM (2,000 cases)
let passedHeadroom = 0;
let failedHeadroom = 0;
for (let i = 0; i < 2000; i++) {
  const rise = 60 + Math.random() * 120;
  const run = 80 + Math.random() * 150;
  const riser = 6 + Math.random() * 2.5;
  const tread = 9 + Math.random() * 3;
  const floorThickness = 8 + Math.random() * 6;
  const targetHeadroom = 75 + Math.random() * 15;
  const openingLength = 80 + Math.random() * 80;

  try {
    const res = calculateHeadroomOpening({
      totalRiseInches: rise,
      totalRunInches: run,
      riserHeightInches: riser,
      treadDepthInches: tread,
      floorThicknessInches: floorThickness,
      targetHeadroomInches: targetHeadroom,
      stairwellOpeningInches: openingLength,
    });

    if (
      Number.isFinite(res.actualHeadroomInches) &&
      Number.isFinite(res.minRequiredOpeningInches) &&
      Number.isInteger(res.stepsUnderCeiling) &&
      res.stepsUnderCeiling >= 0
    ) {
      // check math: minRequiredOpening = ((targetHeadroom + floorThickness) / riser) * tread
      const expectedMinOpen = ((targetHeadroom + floorThickness) / riser) * tread;
      const err = Math.abs(res.minRequiredOpeningInches - expectedMinOpen) / expectedMinOpen;
      if (err < 0.01) {
        passedHeadroom++;
      } else {
        failedHeadroom++;
      }
    } else {
      failedHeadroom++;
    }
  } catch {
    failedHeadroom++;
  }
}
console.log(`Headroom Tests (2,000): Passed = ${passedHeadroom}, Failed = ${failedHeadroom}`);

// 3. RANDOMIZED COST (2,000 cases)
let passedCost = 0;
let failedCost = 0;
for (let i = 0; i < 2000; i++) {
  const width = 30 + Math.random() * 40;
  const pStringer = 20 + Math.random() * 30;
  const pTread = 15 + Math.random() * 40;
  const pRiser = 10 + Math.random() * 20;
  const pFast = Math.random() * 100;
  const tax = Math.random() * 15;

  const dummyStair: any = {
    stringerLengthInches: 180,
    numberOfTreads: 14,
    numberOfRisers: 15,
  };

  try {
    const res = calculateStairMaterials({
      stairResult: dummyStair,
      materialInput: {
        stairWidthInches: width,
        stringerLumberSize: "2x12",
        treadMaterial: "oak",
        riserMaterial: "primed_mdf",
        pricePerStringerBoard: pStringer,
        pricePerTread: pTread,
        pricePerRiser: pRiser,
        fastenersAndBracketsCost: pFast,
        taxRatePercent: tax,
      },
    });

    const expectedSubtotal =
      res.stringersCount * pStringer +
      14 * pTread +
      15 * pRiser +
      pFast;
    const subtotalErr = Math.abs(res.materialsSubtotal - expectedSubtotal) / expectedSubtotal;
    const expectedTax = res.materialsSubtotal * (tax / 100);
    const taxErr = Math.abs(res.taxCost - expectedTax);

    if (subtotalErr < 0.01 && taxErr < 0.05) {
      passedCost++;
    } else {
      failedCost++;
    }
  } catch {
    failedCost++;
  }
}
console.log(`Cost Tests (2,000): Passed = ${passedCost}, Failed = ${failedCost}`);

// 4. EDGE CASES: TC-08 (small rise), TC-09 (large rise)
console.log("\nEdge Cases:");
const smallRise = calculateComprehensiveStair({
  runMode: "one_run",
  runValue: 10,
  runUnit: "inches",
  totalRise: 1,
  riseUnit: "inches",
  riseMode: "fixed_rise",
  targetRiserHeight: 7.5,
  hasTread: true,
  treadThickness: 1.0,
  nosingLength: 0.75,
  hasHeadroomRestriction: false,
  mountType: "standard",
});
console.log("TC-08 (1 in rise):", {
  risers: smallRise.numberOfRisers,
  exactRiser: smallRise.exactRiserHeightInches,
  treads: smallRise.numberOfTreads,
  angle: smallRise.inclineAngleDegrees,
  compliant: smallRise.compliance.isCompliant,
});

const largeRise = calculateComprehensiveStair({
  runMode: "one_run",
  runValue: 10,
  runUnit: "inches",
  totalRise: 1000,
  riseUnit: "inches",
  riseMode: "fixed_rise",
  targetRiserHeight: 7.5,
  hasTread: true,
  treadThickness: 1.0,
  nosingLength: 0.75,
  hasHeadroomRestriction: false,
  mountType: "standard",
});
console.log("TC-09 (1000 in rise):", {
  risers: largeRise.numberOfRisers,
  exactRiser: largeRise.exactRiserHeightInches,
  stringer: largeRise.stringerLengthInches,
});

// 5. UNIT INVARIANCE
console.log("\nUnit Invariance:");
const in10ft = calculateBasicStair({
  runMode: "one_run",
  runValue: 10,
  runUnit: "inches",
  totalRise: 10,
  riseUnit: "feet",
});
const in120in = calculateBasicStair({
  runMode: "one_run",
  runValue: 10,
  runUnit: "inches",
  totalRise: 120,
  riseUnit: "inches",
});
const in304_8cm = calculateBasicStair({
  runMode: "one_run",
  runValue: 25.4,
  runUnit: "centimeters",
  totalRise: 304.8,
  riseUnit: "centimeters",
});
console.log("10 ft vs 120 in rise match:", in10ft.totalRiseInches === in120in.totalRiseInches);
console.log("304.8 cm riseInches:", in304_8cm.totalRiseInches, "diff from 120:", Math.abs(in304_8cm.totalRiseInches - 120));
