import {
  calculateFootprintArea,
  calculateMultiPitchRoof,
  calculateRoofingMaterials,
  calculateRoofingCost,
  getPitchInfo,
  getPitchFromAngle,
} from "../src/lib/calculator-engine/formulas/roofing";

console.log("=== RUNNING VALIDATION & BOUNDARY LOGIC TESTS ===");

let passCount = 0;
let failCount = 0;

function check(desc: string, ok: boolean) {
  if (ok) {
    console.log(`✅ PASS: ${desc}`);
    passCount++;
  } else {
    console.error(`❌ FAIL: ${desc}`);
    failCount++;
  }
}

// 1. Pitch & Angle Boundaries
const p1 = getPitchInfo(6);
check("6/12 pitch has multiplier ≈ 1.118", Math.abs(p1.multiplier - 1.1180339887) < 0.0001);
check("6/12 pitch has angle ≈ 26.6°", p1.angleDegrees === 26.6);

const pAngle = getPitchFromAngle(45);
check("45° angle maps to 12/12 pitch (rise = 12)", Math.round(pAngle.rise) === 12);
check("45° multiplier == sqrt(2)", Math.abs(pAngle.multiplier - Math.SQRT2) < 0.0001);

// 2. Deduction area exceeds gross area
const mpExceed = calculateMultiPitchRoof({
  style: "gable",
  planes: [
    { id: "1", name: "Slope 1", lengthFt: 20, widthFt: 10, pitchRise: 6 },
  ],
  valleyLengthFt: 0,
  ridgeLengthFt: 20,
  deductionAreaSqFt: 500, // Gross is 20 * 10 * 1.118 = 223.6
  wastePercent: 10,
});
// Engine clamps net to 0, ensuring no negative roof areas
check("Excess deduction clamps netTrueAreaSqFt to 0 (no negative area)", mpExceed.netTrueAreaSqFt === 0);
check("Excess deduction clamps grossCoveredAreaSqFt to 0", mpExceed.grossCoveredAreaSqFt === 0);

// 3. Ground area invariance across diverse geometries
for (const [sqft, rise, waste] of [
  [500, 4, 0],
  [1500, 8, 5],
  [3000, 10, 15],
  [10000, 12, 20],
]) {
  const res = calculateFootprintArea({
    style: "gable",
    inputMode: "base_area",
    baseAreaSqFt: sqft,
    eaveOverhangInches: 24, // Must not affect base_area
    gableOverhangInches: 24, // Must not affect base_area
    pitchRise: rise,
    wastePercent: waste,
  });
  const expectedM = Math.sqrt(1 + Math.pow(rise / 12, 2));
  const expectedTrue = sqft * expectedM;
  const expectedCovered = expectedTrue * (1 + waste / 100);
  check(
    `Base Area ${sqft} ft² (pitch ${rise}/12, waste ${waste}%): true matches exact (${Math.round(expectedTrue)} sq ft)`,
    Math.abs(res.trueRoofSurfaceAreaExact - expectedTrue) < 0.001
  );
  check(
    `Base Area ${sqft} ft² (pitch ${rise}/12, waste ${waste}%): covered matches exact (${Math.round(expectedCovered)} sq ft)`,
    Math.abs(res.totalCoveredAreaExact - expectedCovered) < 0.001
  );
}

// 4. Extreme Dimensions (1000x10 and 10x1000)
const ext1 = calculateFootprintArea({
  style: "gable",
  inputMode: "dimensions",
  houseLengthFt: 1000,
  houseWidthFt: 10,
  eaveOverhangInches: 12,
  gableOverhangInches: 12,
  pitchRise: 6,
  wastePercent: 10,
});
check("Extreme dimensions 1000x10 produces valid positive area", ext1.trueRoofSurfaceAreaSqFt > 0 && !isNaN(ext1.trueRoofSurfaceAreaSqFt));

const ext2 = calculateFootprintArea({
  style: "gable",
  inputMode: "dimensions",
  houseLengthFt: 10,
  houseWidthFt: 1000,
  eaveOverhangInches: 12,
  gableOverhangInches: 12,
  pitchRise: 6,
  wastePercent: 10,
});
check("Extreme dimensions 10x1000 produces valid positive area", ext2.trueRoofSurfaceAreaSqFt > 0 && !isNaN(ext2.trueRoofSurfaceAreaSqFt));

console.log(`\nResults: ${passCount} Passed, ${failCount} Failed.`);
if (failCount > 0) process.exit(1);
