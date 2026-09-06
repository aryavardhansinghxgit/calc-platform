import {
  PITCH_TABLE,
  getPitchInfo,
  getPitchFromAngle,
  calculateFootprintArea,
  calculateMultiPitchRoof,
  calculateRoofingMaterials,
  calculateRoofingCost,
  FootprintAreaInput,
  MultiPitchInput,
  MaterialEstimateInput,
  RoofingCostInput,
} from "../src/lib/calculator-engine/formulas/roofing";

console.log("=================================================");
console.log("ROOFING CALCULATOR COMPREHENSIVE REGRESSION AUDIT");
console.log("=================================================");

let allPass = true;
function assert(desc: string, condition: boolean, details?: any) {
  if (!condition) {
    console.error(`❌ FAIL: ${desc}`, details || "");
    allPass = false;
  } else {
    console.log(`✅ PASS: ${desc}`);
  }
}

// -------------------------------------------------------------
// TEST R1: Standard Gable (50x40, 6/12, 12", 12", 10%)
// -------------------------------------------------------------
console.log("\n--- TEST R1: Standard Gable ---");
const r1Input: FootprintAreaInput = {
  style: "gable",
  inputMode: "dimensions",
  houseLengthFt: 50,
  houseWidthFt: 40,
  eaveOverhangInches: 12,
  gableOverhangInches: 12,
  pitchRise: 6,
  wastePercent: 10,
};
const r1 = calculateFootprintArea(r1Input);
assert("R1 Flat Area with Overhangs == 2184", r1.flatAreaWithOverhangsSqFt === 2184);
assert("R1 Multiplier is ~1.118", Math.abs(r1.pitchMultiplier - 1.118) < 0.001);
assert("R1 True Roof Area is ~2441.8", Math.abs(r1.trueRoofSurfaceAreaSqFt - 2441.8) <= 0.5);
assert("R1 Total Covered with Waste is ~2686.0", Math.abs(r1.totalCoveredAreaSqFt - 2686.0) <= 0.5);
assert("R1 Roofing Squares == 26.9", r1.roofingSquares === 26.9);
assert("R1 Ridge Length == 52", r1.estimatedRidgeFt === 52);
assert("R1 Eaves Perimeter == 104", r1.eavesPerimeterFt === 104);
assert("R1 Rakes Perimeter == 94", r1.rakesPerimeterFt === 94);

// -------------------------------------------------------------
// TEST R2: Pitch Multiplier Matrix (1/12 to 12/12)
// -------------------------------------------------------------
console.log("\n--- TEST R2: Pitch Multiplier Matrix ---");
let r2Pass = true;
for (let rise = 1; rise <= 12; rise++) {
  const info = getPitchInfo(rise);
  const expectedRad = Math.atan(rise / 12);
  const expectedAngle = (expectedRad * 180) / Math.PI;
  const expectedMult = Math.sqrt(1 + Math.pow(rise / 12, 2));

  const angleDiff = Math.abs(info.angleDegrees - expectedAngle);
  const multDiff = Math.abs(info.multiplier - expectedMult);

  if (angleDiff > 0.15 || multDiff > 0.00001) {
    r2Pass = false;
  }
}
assert("R2 Pitch Multiplier & Angle Matrix (1/12 to 12/12)", r2Pass);

// -------------------------------------------------------------
// TEST R3: Shed Roof (40x30, 4/12, 0 overhangs, 0 waste)
// -------------------------------------------------------------
console.log("\n--- TEST R3: Shed Roof ---");
const r3Input: FootprintAreaInput = {
  style: "shed",
  inputMode: "dimensions",
  houseLengthFt: 40,
  houseWidthFt: 30,
  eaveOverhangInches: 0,
  gableOverhangInches: 0,
  pitchRise: 4,
  wastePercent: 0,
};
const r3 = calculateFootprintArea(r3Input);
const expectedR3Mult = Math.sqrt(1 + Math.pow(4 / 12, 2));
const expectedR3Area = 1200 * expectedR3Mult; // 1264.911
assert("R3 Shed Base Area == 1200", r3.flatAreaWithOverhangsSqFt === 1200);
assert("R3 True Area == 1264.9", Math.abs(r3.trueRoofSurfaceAreaSqFt - 1264.9) <= 0.1);
assert("R3 Roofing Squares == 12.7", r3.roofingSquares === 12.7);

// -------------------------------------------------------------
// TEST R4: Hip Roof
// -------------------------------------------------------------
console.log("\n--- TEST R4: Hip Roof ---");
const r4Input: FootprintAreaInput = {
  style: "hip",
  inputMode: "dimensions",
  houseLengthFt: 50,
  houseWidthFt: 40,
  eaveOverhangInches: 12,
  gableOverhangInches: 12,
  pitchRise: 6,
  wastePercent: 10,
};
const r4 = calculateFootprintArea(r4Input);
assert("R4 Hip Eaves covers 4 sides == 188", r4.eavesPerimeterFt === 188);
assert("R4 Hip Rakes == 0", r4.rakesPerimeterFt === 0);
assert("R4 Hip Ridge == 10", r4.estimatedRidgeFt === 10);

// -------------------------------------------------------------
// TEST R5: Ground-Area Mode (CRITICAL FIX VERIFICATION)
// -------------------------------------------------------------
console.log("\n--- TEST R5: Ground-Area Mode ---");
// Case 5.1: 2000 ft², 6/12 pitch, 10% waste
const r5Input1: FootprintAreaInput = {
  style: "gable",
  inputMode: "base_area",
  baseAreaSqFt: 2000,
  eaveOverhangInches: 12, // Must NOT contaminate base_area!
  gableOverhangInches: 12, // Must NOT contaminate base_area!
  pitchRise: 6,
  wastePercent: 10,
};
const r5_1 = calculateFootprintArea(r5Input1);
const expectedR5_1_True = 2000 * Math.sqrt(1.25); // 2236.06798
const expectedR5_1_Waste = expectedR5_1_True * 1.1; // 2459.67478
assert(
  "R5.1 Ground Base Area Flat == 2000 (No Overhang Contamination)",
  r5_1.flatAreaWithOverhangsSqFt === 2000,
);
assert(
  "R5.1 True Surface Area ≈ 2236.07 sq ft",
  Math.abs(r5_1.trueRoofSurfaceAreaExact - expectedR5_1_True) < 0.01,
  { actual: r5_1.trueRoofSurfaceAreaExact, expected: expectedR5_1_True },
);
assert(
  "R5.1 Total Area with Waste ≈ 2459.67 sq ft",
  Math.abs(r5_1.totalCoveredAreaExact - expectedR5_1_Waste) < 0.01,
  { actual: r5_1.totalCoveredAreaExact, expected: expectedR5_1_Waste },
);
assert("R5.1 Roofing Squares == 24.6", r5_1.roofingSquares === 24.6);

// Case 5.2: 1000 ft² at 12/12 with 0% waste
const r5Input2: FootprintAreaInput = {
  style: "gable",
  inputMode: "base_area",
  baseAreaSqFt: 1000,
  eaveOverhangInches: 24,
  gableOverhangInches: 24,
  pitchRise: 12,
  wastePercent: 0,
};
const r5_2 = calculateFootprintArea(r5Input2);
const expectedR5_2_True = 1000 * Math.sqrt(2); // 1414.21356
assert(
  "R5.2 (1000 ft², 12/12, 0% waste) True Area ≈ 1414.21 sq ft",
  Math.abs(r5_2.trueRoofSurfaceAreaExact - expectedR5_2_True) < 0.01,
);
assert("R5.2 (1000 ft², 12/12) Roofing Squares == 14.2", r5_2.roofingSquares === 14.2);

// Case 5.3: 2500 ft² at 4/12 with 5% waste
const r5Input3: FootprintAreaInput = {
  style: "shed",
  inputMode: "base_area",
  baseAreaSqFt: 2500,
  eaveOverhangInches: 18,
  gableOverhangInches: 18,
  pitchRise: 4,
  wastePercent: 5,
};
const r5_3 = calculateFootprintArea(r5Input3);
const expectedR5_3_True = 2500 * Math.sqrt(1 + Math.pow(4 / 12, 2)); // 2637.28
const expectedR5_3_Waste = expectedR5_3_True * 1.05; // 2769.14
assert(
  "R5.3 (2500 ft², 4/12, 5% waste) True Area ≈ 2637.28 sq ft",
  Math.abs(r5_3.trueRoofSurfaceAreaExact - expectedR5_3_True) < 0.01,
);
assert(
  "R5.3 (2500 ft², 4/12, 5% waste) Covered Area ≈ 2769.14 sq ft",
  Math.abs(r5_3.totalCoveredAreaExact - expectedR5_3_Waste) < 0.01,
);

// -------------------------------------------------------------
// TEST R6: Zero Waste Invariance
// -------------------------------------------------------------
console.log("\n--- TEST R6: Zero Waste ---");
const r6 = calculateFootprintArea({ ...r1Input, wastePercent: 0 });
assert(
  "R6 Zero Waste: trueArea == totalCoveredArea",
  r6.trueRoofSurfaceAreaSqFt === r6.totalCoveredAreaSqFt,
);

// -------------------------------------------------------------
// TEST R7: Waste Factor Scaling
// -------------------------------------------------------------
console.log("\n--- TEST R7: Waste Scaling ---");
let r7Pass = true;
for (const w of [5, 10, 15, 20, 25]) {
  const res = calculateFootprintArea({ ...r1Input, wastePercent: w });
  const expected = r1.trueRoofSurfaceAreaExact * (1 + w / 100);
  const diff = Math.abs(res.totalCoveredAreaExact - expected);
  if (diff > 0.01) r7Pass = false;
}
assert("R7 Waste Scaling (5%, 10%, 15%, 20%, 25%)", r7Pass);

// -------------------------------------------------------------
// Multi-Pitch & Deductions Audit
// -------------------------------------------------------------
console.log("\n--- MULTI-PITCH & DEDUCTIONS AUDIT ---");
const mpInput: MultiPitchInput = {
  style: "gable",
  planes: [
    { id: "1", name: "Front Slope", lengthFt: 50, widthFt: 22, pitchRise: 6 },
    { id: "2", name: "Rear Slope", lengthFt: 50, widthFt: 22, pitchRise: 6 },
  ],
  valleyLengthFt: 0,
  ridgeLengthFt: 50,
  deductionAreaSqFt: 100, // 100 sq ft skylights
  wastePercent: 10,
};
const mpRes = calculateMultiPitchRoof(mpInput);
const planeArea = 50 * 22 * Math.sqrt(1.25); // 1229.837 * 2 = 2459.675
const expectedGross = 2459.675;
const expectedNet = expectedGross - 100; // 2359.675
const expectedCovered = expectedNet * 1.1; // 2595.64
assert("Multi-pitch gross area is accurate", Math.abs(mpRes.totalTrueAreaSqFt - 2459.7) <= 0.5);
assert("Multi-pitch net area subtracts deduction", Math.abs(mpRes.netTrueAreaSqFt - 2359.7) <= 0.5);
assert("Multi-pitch squares == 26.0", mpRes.roofingSquares === 26.0);
assert("Multi-pitch starter strip length == 144", mpRes.starterStripLengthFt === 144);
assert("Multi-pitch drip edge pieces == 15", mpRes.dripEdgePieces === 15);

// -------------------------------------------------------------
// Material Estimator Audit (2706 sq ft)
// -------------------------------------------------------------
console.log("\n--- MATERIAL ESTIMATOR AUDIT ---");
const matInput: MaterialEstimateInput = {
  targetAreaSqFt: 2706,
  shingleType: "architectural",
  underlaymentType: "synthetic",
  iceShieldMarginFt: 3,
  eavesLengthFt: 104,
  valleysLengthFt: 0,
  ridgeLengthFt: 52,
  isHighWindZone: false,
};
const matRes = calculateRoofingMaterials(matInput);
// 2706 sq ft / 100 = 27.06 -> 27.1 squares
// 27.1 * 3 = 81.3 -> ceil = 82 bundles
assert("Material Squares == 27.1", matRes.totalSquares === 27.1);
assert("Architectural bundles == 82", matRes.shingleBundlesNeeded === 82);
assert("Synthetic underlayment rolls == 4", matRes.underlaymentRollsNeeded === 4);
assert("Ice & water coverage == 312 sq ft", matRes.iceShieldCoverageSqFt === 312);
assert("Ice & water rolls == 2", matRes.iceShieldRollsNeeded === 2);
assert("Ridge cap bundles == 2", matRes.ridgeCapBundlesNeeded === 2);
assert("Standard nails count == 8672", matRes.nailsCountTotal === 8672);
assert("Standard nails weight == 35 lbs", matRes.nailsPoundsNeeded === 35);

// High wind check (480 nails/sq)
const matHighWind = calculateRoofingMaterials({ ...matInput, isHighWindZone: true });
assert("High wind nails count == 13008", matHighWind.nailsCountTotal === 13008);
assert("High wind nails weight == 53 lbs", matHighWind.nailsPoundsNeeded === 53);

// -------------------------------------------------------------
// Cost Calculator Audit (27.1 sq, $160, $50, $200, $650, 7%)
// -------------------------------------------------------------
console.log("\n--- COST ESTIMATOR AUDIT ---");
const costInput: RoofingCostInput = {
  roofingSquares: 27.1,
  materialCostPerSquare: 160,
  tearOffCostPerSquare: 50,
  laborCostPerSquare: 200,
  dumpsterAndPermitCost: 650,
  salesTaxPercent: 7,
};
const costRes = calculateRoofingCost(costInput);
assert("Material Subtotal == $4336.00", costRes.materialSubtotal === 4336.0);
assert("Tear-Off Subtotal == $1355.00", costRes.tearOffSubtotal === 1355.0);
assert("Labor Subtotal == $5420.00", costRes.laborSubtotal === 5420.0);
assert("Dumpster & Permit == $650.00", costRes.dumpsterAndPermits === 650.0);
assert("Material Sales Tax (7% on materials) == $303.52", costRes.salesTaxAmount === 303.52);
assert("Total Replacement Cost == $12064.52", costRes.totalEstimatedCost === 12064.52);
assert("Low Bid Estimate (-15%) == $10255", costRes.lowEstimateCost === 10255);
assert("High Bid Estimate (+20%) == $14477", costRes.highEstimateCost === 14477);

console.log("\n=================================================");
if (allPass) {
  console.log("🎉 ALL MATHEMATICAL & REGRESSION TESTS PASSED!");
} else {
  console.error("❌ SOME TESTS FAILED!");
}
console.log("=================================================");
