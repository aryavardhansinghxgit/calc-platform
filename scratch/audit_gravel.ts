import {
  calculateGravelEstimator,
  calculateGravelCost,
  calculateMultiZoneGravel,
  calculateDrainageTrench,
  convertDimensionToFeet,
  convertDepthToInches,
  GRAVEL_TYPES,
  GravelType,
  GravelShape,
} from "../src/lib/calculator-engine/formulas/gravel";

interface TestResult {
  name: string;
  passed: boolean;
  expected: any;
  actual: any;
  details?: string;
}

const results: TestResult[] = [];

function assert(name: string, condition: boolean, expected: any, actual: any, details?: string) {
  results.push({ name, passed: condition, expected, actual, details });
  if (!condition) {
    console.error(`FAIL: ${name} | Expected: ${JSON.stringify(expected)} | Actual: ${JSON.stringify(actual)} | ${details || ""}`);
  }
}

console.log("=== 1. GOLDEN REGRESSION MATRIX AUDIT ===");

// GC-01: 30 × 10 × 4 in, #57 Stone, 8% comp, 5% waste
const gc01 = calculateGravelEstimator({
  shape: "rectangle",
  length: 30,
  lengthUnit: "feet",
  width: 10,
  widthUnit: "feet",
  diameter: 0,
  diameterUnit: "feet",
  depth: 4,
  depthUnit: "inches",
  gravelType: "crushed_stone_57",
  compactionPct: 8,
  wastePct: 5,
});
assert("GC-01: Adjusted Volume ≈ 4.20 yd³", Math.abs(gc01.adjustedVolumeCuYards - 4.20) < 0.05, 4.20, gc01.adjustedVolumeCuYards);
assert("GC-01: Weight ≈ 5.96 tons", Math.abs(gc01.weightShortTons - 5.96) < 0.05, 5.96, gc01.weightShortTons);
assert("GC-01: Area = 300 sq ft", gc01.areaSqFt === 300, 300, gc01.areaSqFt);

// GC-02: 50 × 12 × 4 in, #57 Stone, 8% comp, 5% waste, $45/ton
const gc02 = calculateGravelEstimator({
  shape: "rectangle",
  length: 50,
  lengthUnit: "feet",
  width: 12,
  widthUnit: "feet",
  diameter: 0,
  diameterUnit: "feet",
  depth: 4,
  depthUnit: "inches",
  gravelType: "crushed_stone_57",
  compactionPct: 8,
  wastePct: 5,
  pricePerUnit: 45,
  pricingType: "per_ton",
});
assert("GC-02: Net Volume ≈ 7.41 yd³", Math.abs(gc02.netVolumeCuYards - 7.41) < 0.05, 7.41, gc02.netVolumeCuYards);
assert("GC-02: Adjusted Volume ≈ 8.40 yd³", Math.abs(gc02.adjustedVolumeCuYards - 8.40) < 0.05, 8.40, gc02.adjustedVolumeCuYards);
assert("GC-02: Weight ≈ 11.93 tons", Math.abs(gc02.weightShortTons - 11.93) < 0.05, 11.93, gc02.weightShortTons);
assert("GC-02: Cost ≈ $536.85 or $536.76", Math.abs(gc02.estimatedCost - 536.85) < 1.0, 536.85, gc02.estimatedCost);

// GC-03: Circle Diameter = 30 ft, depth = 4 in
const gc03 = calculateGravelEstimator({
  shape: "circle",
  length: 0,
  lengthUnit: "feet",
  width: 0,
  widthUnit: "feet",
  diameter: 30,
  diameterUnit: "feet",
  depth: 4,
  depthUnit: "inches",
  gravelType: "crushed_stone_57",
  compactionPct: 0,
  wastePct: 0,
});
const expectedCircleArea = (Math.PI * 30 * 30) / 4; // 706.8583
assert("GC-03: Circle Area ≈ 706.86 sq ft", Math.abs(gc03.areaSqFt - expectedCircleArea) < 0.1, 706.86, gc03.areaSqFt);

// GC-04: Triangle Base = 30 ft, Height = 20 ft, depth = 4 in
const gc04 = calculateGravelEstimator({
  shape: "triangle",
  length: 30,
  lengthUnit: "feet",
  width: 20,
  widthUnit: "feet",
  diameter: 0,
  diameterUnit: "feet",
  depth: 4,
  depthUnit: "inches",
  gravelType: "crushed_stone_57",
  compactionPct: 0,
  wastePct: 0,
});
assert("GC-04: Triangle Area = 300 sq ft", gc04.areaSqFt === 300, 300, gc04.areaSqFt);

// GC-05: Quantity Multiplier (Check if quantity is supported)
// GravelEstimatorInput currently has no quantity property!
const hasQuantityInType = "quantity" in gc01;
assert("GC-05: Quantity Multiplier supported in type/output", hasQuantityInType, true, hasQuantityInType, "DEFECT: Quantity is not supported in GravelEstimatorInput");

// GC-06: Compaction = 0% vs 8%
const gc06_0 = calculateGravelEstimator({
  shape: "rectangle",
  length: 30,
  lengthUnit: "feet",
  width: 10,
  widthUnit: "feet",
  diameter: 0,
  diameterUnit: "feet",
  depth: 4,
  depthUnit: "inches",
  gravelType: "crushed_stone_57",
  compactionPct: 0,
  wastePct: 0,
});
const gc06_8 = calculateGravelEstimator({
  shape: "rectangle",
  length: 30,
  lengthUnit: "feet",
  width: 10,
  widthUnit: "feet",
  diameter: 0,
  diameterUnit: "feet",
  depth: 4,
  depthUnit: "inches",
  gravelType: "crushed_stone_57",
  compactionPct: 8,
  wastePct: 0,
});
assert("GC-06: 8% compaction increases volume", gc06_8.adjustedVolumeCuYards > gc06_0.adjustedVolumeCuYards, true, gc06_8.adjustedVolumeCuYards > gc06_0.adjustedVolumeCuYards);
assert("GC-06: Volume ratio is 1.08", Math.abs(gc06_8.adjustedVolumeCuYards / gc06_0.adjustedVolumeCuYards - 1.08) < 0.01, 1.08, gc06_8.adjustedVolumeCuYards / gc06_0.adjustedVolumeCuYards);

// GC-07: Waste = 0% vs 5%
const gc07_5 = calculateGravelEstimator({
  shape: "rectangle",
  length: 30,
  lengthUnit: "feet",
  width: 10,
  widthUnit: "feet",
  diameter: 0,
  diameterUnit: "feet",
  depth: 4,
  depthUnit: "inches",
  gravelType: "crushed_stone_57",
  compactionPct: 0,
  wastePct: 5,
});
assert("GC-07: 5% waste increases volume", gc07_5.adjustedVolumeCuYards > gc06_0.adjustedVolumeCuYards, true, gc07_5.adjustedVolumeCuYards > gc06_0.adjustedVolumeCuYards);

// GC-08: 50-lb bag equivalent
// 5.96 tons = 11,928 lbs. 11,928 / 50 = 238.56 -> 239 bags
assert("GC-08: Bags calculation rounds up to 239", gc01.bags50lb === 239, 239, gc01.bags50lb);

// GC-09: Multi-zone reference configuration
const gc09 = calculateMultiZoneGravel({
  zones: [
    { id: "1", name: "Main Driveway", shape: "rectangle", dim1: 50, dim2: 12, depthInches: 4, gravelType: "crushed_stone_57" },
    { id: "2", name: "Driveway Sub-Base", shape: "rectangle", dim1: 50, dim2: 12, depthInches: 4, gravelType: "crusher_run" },
    { id: "3", name: "Garden Walkway", shape: "rectangle", dim1: 30, dim2: 3.5, depthInches: 2.5, gravelType: "pea_gravel" },
  ],
  compactionPct: 10,
  wastePct: 5,
  pricePerTon: 45,
  deliveryFee: 75,
});
console.log("GC-09 Multi-zone output:", gc09);
assert("GC-09: Total Short Tons ≈ 27.14", Math.abs(gc09.totalShortTons - 27.14) < 0.1, 27.14, gc09.totalShortTons);
assert("GC-09: Total Volume ≈ 18.05 cu yd", Math.abs(gc09.totalCuYards - 18.05) < 0.1, 18.05, gc09.totalCuYards);
assert("GC-09: Total Coverage Area = 1305 sq ft", gc09.totalSqFt === 1305, 1305, gc09.totalSqFt);

// GC-10: French Drain reference: 50 ft × 12 in × 18 in, 4 in pipe
const gc10 = calculateDrainageTrench({
  trenchLengthFt: 50,
  trenchWidthInches: 12,
  totalDepthInches: 18,
  pipeDiameterInches: 4,
  gravelBeddingDepthInches: 18,
  gravelType: "crushed_stone_57",
});
console.log("GC-10 French Drain output:", gc10);
assert("GC-10: Net Gravel Volume ≈ 2.88 yd³", Math.abs(gc10.netGravelCuYards - 2.88) < 0.05, 2.88, gc10.netGravelCuYards);
assert("GC-10: Gravel Weight ≈ 4.09 Tons", Math.abs(gc10.gravelWeightShortTons - 4.09) < 0.05, 4.09, gc10.gravelWeightShortTons);
assert("GC-10: Fabric Area = 250 sq ft", gc10.fabricAreaSqFt === 250, 250, gc10.fabricAreaSqFt);
assert("GC-10: Bags = 164", gc10.bags50lb === 164, 164, gc10.bags50lb);

console.log("\n=== 2. ZERO-VALUE & TRUTHINESS DEFECT AUDITS ===");

// Check pipeDiameterInches = 0
const trenchZeroPipe = calculateDrainageTrench({
  trenchLengthFt: 50,
  trenchWidthInches: 12,
  totalDepthInches: 18,
  pipeDiameterInches: 0,
  gravelBeddingDepthInches: 18,
  gravelType: "crushed_stone_57",
});
assert(
  "Trench with pipeDiameter=0 should have 0 pipe displacement",
  trenchZeroPipe.pipeDisplacementCuYards === 0,
  0,
  trenchZeroPipe.pipeDisplacementCuYards,
  "DEFECT: pipeDiameterInches || 4 overrides 0 with 4!"
);

// Check pricePerUnit = 0 in calculateGravelCost
const costZeroPrice = calculateGravelCost({
  totalTons: 10,
  totalCuYards: 7,
  pricingBasis: "per_ton",
  materialUnitPrice: 0,
  deliveryFlatFee: 0,
  salesTaxPct: 0,
  laborCostPerTon: 0,
});
assert(
  "calculateGravelCost with materialUnitPrice=0 should yield 0 material subtotal",
  costZeroPrice.materialSubtotal === 0,
  0,
  costZeroPrice.materialSubtotal,
  "DEFECT: materialUnitPrice || 45 overrides 0 with 45!"
);

// Check multi-zone compaction = 0% and waste = 0%
const multiZeroComp = calculateMultiZoneGravel({
  zones: [{ id: "1", name: "Z1", shape: "rectangle", dim1: 10, dim2: 10, depthInches: 4, gravelType: "crushed_stone_57" }],
  compactionPct: 0,
  wastePct: 0,
  pricePerTon: 0,
  deliveryFee: 0,
});
const z1CuYdsRaw = (100 * (4 / 12)) / 27; // 1.2345679
assert(
  "calculateMultiZoneGravel with compactionPct=0 should not add 10% compaction",
  Math.abs(multiZeroComp.totalCuYards - z1CuYdsRaw) < 0.05,
  Math.round(z1CuYdsRaw * 100) / 100,
  multiZeroComp.totalCuYards,
  "DEFECT: compactionPct || 10 overrides 0 with 10!"
);
assert(
  "calculateMultiZoneGravel with pricePerTon=0 should have 0 grandTotalCost when delivery is 0",
  multiZeroComp.grandTotalCost === 0,
  0,
  multiZeroComp.grandTotalCost,
  "DEFECT: pricePerTon || 45 overrides 0 with 45!"
);

// Check length = 0 in calculateGravelEstimator
const gravelZeroLength = calculateGravelEstimator({
  shape: "rectangle",
  length: 0,
  lengthUnit: "feet",
  width: 10,
  widthUnit: "feet",
  diameter: 0,
  diameterUnit: "feet",
  depth: 4,
  depthUnit: "inches",
  gravelType: "crushed_stone_57",
  compactionPct: 0,
  wastePct: 0,
});
assert(
  "calculateGravelEstimator with length=0 should produce area=0",
  gravelZeroLength.areaSqFt === 0,
  0,
  gravelZeroLength.areaSqFt,
  "DEFECT: length || 30 overrides 0 with 30!"
);

console.log("\n=== 3. DENSITY MATRIX CONSISTENCY AUDIT ===");
const expectedDensities: Record<string, { tons: number; lbs: number }> = {
  pea_gravel: { tons: 1.39, lbs: 2780 },
  crushed_stone_57: { tons: 1.42, lbs: 2840 },
  crusher_run: { tons: 1.60, lbs: 3200 },
  river_rock: { tons: 1.50, lbs: 3000 },
  decomposed_granite: { tons: 1.45, lbs: 2900 },
  crushed_stone_411: { tons: 1.55, lbs: 3100 },
};

for (const [key, exp] of Object.entries(expectedDensities)) {
  const actual = GRAVEL_TYPES[key as GravelType];
  assert(`Density tons/yd³ for ${key}`, actual.tonsPerCubicYard === exp.tons, exp.tons, actual.tonsPerCubicYard);
  assert(`Density lbs/yd³ for ${key}`, actual.lbsPerCubicYard === exp.lbs, exp.lbs, actual.lbsPerCubicYard);
  assert(`Density consistency (lbs = tons * 2000) for ${key}`, actual.lbsPerCubicYard === actual.tonsPerCubicYard * 2000, actual.tonsPerCubicYard * 2000, actual.lbsPerCubicYard);
}

console.log("\n=== 4. RANDOMIZED PROPERTY TESTING (7,000+ CASES) ===");

let randomPassCount = 0;
let randomFailCount = 0;
let maxRelError = 0;

for (let i = 0; i < 7000; i++) {
  const l = Math.random() * 200 + 1; // 1 to 201 ft
  const w = Math.random() * 50 + 1; // 1 to 51 ft
  const d = Math.random() * 20 + 0.5; // 0.5 to 20.5 in
  const comp = Math.floor(Math.random() * 30); // 0 to 30%
  const waste = Math.floor(Math.random() * 20); // 0 to 20%
  const types: GravelType[] = ["pea_gravel", "crushed_stone_57", "crusher_run", "river_rock", "decomposed_granite", "crushed_stone_411"];
  const type = types[Math.floor(Math.random() * types.length)];

  const res = calculateGravelEstimator({
    shape: "rectangle",
    length: l,
    lengthUnit: "feet",
    width: w,
    widthUnit: "feet",
    diameter: 0,
    diameterUnit: "feet",
    depth: d,
    depthUnit: "inches",
    gravelType: type,
    compactionPct: comp,
    wastePct: waste,
  });

  // Oracle:
  const expArea = l * w;
  const expNetVolCuFt = expArea * (d / 12);
  const expNetVolCuYd = expNetVolCuFt / 27;
  const expAdjVolCuYd = expNetVolCuYd * (1 + comp / 100) * (1 + waste / 100);
  const expLbs = expAdjVolCuYd * GRAVEL_TYPES[type].lbsPerCubicYard;
  const expTons = expLbs / 2000;

  const relErrArea = Math.abs(res.areaSqFt - expArea) / expArea;
  const relErrVol = Math.abs(res.adjustedVolumeCuYards - expAdjVolCuYd) / expAdjVolCuYd;
  const relErrTons = Math.abs(res.weightShortTons - expTons) / expTons;

  if (relErrArea < 0.01 && relErrVol < 0.015 && relErrTons < 0.015) {
    randomPassCount++;
  } else {
    randomFailCount++;
  }
  maxRelError = Math.max(maxRelError, relErrArea, relErrVol, relErrTons);
}

console.log(`Randomized Geometry (7,000 cases): ${randomPassCount} passed, ${randomFailCount} failed. Max rel error: ${(maxRelError * 100).toFixed(4)}%`);

console.log("\n=== SUMMARY OF TESTS ===");
const totalTests = results.length;
const passedTests = results.filter((r) => r.passed).length;
const failedTests = results.filter((r) => !r.passed).length;
console.log(`Total: ${totalTests} | Passed: ${passedTests} | Failed: ${failedTests}`);
for (const f of results.filter((r) => !r.passed)) {
  console.log(`- FAIL: ${f.name} => ${f.details || ""}`);
}
