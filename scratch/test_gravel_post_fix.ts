import {
  calculateGravelEstimator,
  calculateGravelCost,
  calculateMultiZoneGravel,
  calculateDrainageTrench,
  convertDimensionToFeet,
  convertDepthToInches,
  GRAVEL_TYPES,
} from "../src/lib/calculator-engine/formulas/gravel";

let passedCount = 0;
let failedCount = 0;

function check(name: string, condition: boolean, expected: any, actual: any) {
  if (condition) {
    passedCount++;
    console.log(`[PASS] ${name}`);
  } else {
    failedCount++;
    console.error(`[FAIL] ${name} | Expected: ${JSON.stringify(expected)} | Actual: ${JSON.stringify(actual)}`);
  }
}

console.log("=== 1. MANDATORY GOLDEN REGRESSION CASES ===");

// GC-01
const gc01 = calculateGravelEstimator({
  shape: "rectangle",
  length: 30,
  lengthUnit: "feet",
  width: 10,
  widthUnit: "feet",
  depth: 4,
  depthUnit: "inches",
  gravelType: "crushed_stone_57",
  compactionPct: 8,
  wastePct: 5,
  quantity: 1,
});
check("GC-01: Area = 300 sq ft", gc01.areaSqFt === 300, 300, gc01.areaSqFt);
check("GC-01: Adjusted Volume = 4.20 yd³", gc01.adjustedVolumeCuYards === 4.20, 4.20, gc01.adjustedVolumeCuYards);
check("GC-01: Weight = 5.96 tons", gc01.weightShortTons === 5.96, 5.96, gc01.weightShortTons);

// GC-02
const gc02 = calculateGravelEstimator({
  shape: "rectangle",
  length: 50,
  lengthUnit: "feet",
  width: 12,
  widthUnit: "feet",
  depth: 4,
  depthUnit: "inches",
  gravelType: "crushed_stone_57",
  compactionPct: 8,
  wastePct: 5,
  pricePerUnit: 45,
  pricingType: "per_ton",
  quantity: 1,
});
check("GC-02: Raw Volume = 7.41 yd³", gc02.netVolumeCuYards === 7.41, 7.41, gc02.netVolumeCuYards);
check("GC-02: Adjusted Volume = 8.40 yd³", gc02.adjustedVolumeCuYards === 8.40, 8.40, gc02.adjustedVolumeCuYards);
check("GC-02: Weight = 11.93 tons", gc02.weightShortTons === 11.93, 11.93, gc02.weightShortTons);
check("GC-02: Exact Material Cost ≈ $536.76", Math.abs(gc02.estimatedCost - 536.76) < 0.05, 536.76, gc02.estimatedCost);

// GC-03
const gc03 = calculateGravelEstimator({
  shape: "circle",
  diameter: 30,
  diameterUnit: "feet",
  depth: 4,
  depthUnit: "inches",
  gravelType: "crushed_stone_57",
  compactionPct: 0,
  wastePct: 0,
  quantity: 1,
});
check("GC-03: Circle Area ≈ 706.86 sq ft", Math.abs(gc03.areaSqFt - 706.86) < 0.1, 706.86, gc03.areaSqFt);

// GC-04
const gc04 = calculateGravelEstimator({
  shape: "triangle",
  length: 30,
  lengthUnit: "feet",
  width: 20,
  widthUnit: "feet",
  depth: 4,
  depthUnit: "inches",
  gravelType: "crushed_stone_57",
  compactionPct: 0,
  wastePct: 0,
  quantity: 1,
});
check("GC-04: Triangle Area = 300 sq ft", gc04.areaSqFt === 300, 300, gc04.areaSqFt);

// GC-05: Quantity = 3 Scaling
const gc05_1 = calculateGravelEstimator({
  shape: "rectangle",
  length: 30,
  lengthUnit: "feet",
  width: 10,
  widthUnit: "feet",
  depth: 4,
  depthUnit: "inches",
  gravelType: "crushed_stone_57",
  compactionPct: 8,
  wastePct: 5,
  pricePerUnit: 45,
  pricingType: "per_ton",
  quantity: 1,
});
const gc05_3 = calculateGravelEstimator({
  shape: "rectangle",
  length: 30,
  lengthUnit: "feet",
  width: 10,
  widthUnit: "feet",
  depth: 4,
  depthUnit: "inches",
  gravelType: "crushed_stone_57",
  compactionPct: 8,
  wastePct: 5,
  pricePerUnit: 45,
  pricingType: "per_ton",
  quantity: 3,
});
check("GC-05: Area scaled ×3", gc05_3.areaSqFt === gc05_1.areaSqFt * 3, gc05_1.areaSqFt * 3, gc05_3.areaSqFt);
check("GC-05: Net Cu Yds scaled ×3", Math.abs(gc05_3.netVolumeCuYards - gc05_1.netVolumeCuYards * 3) < 0.05, gc05_1.netVolumeCuYards * 3, gc05_3.netVolumeCuYards);
check("GC-05: Adj Cu Yds scaled ×3", Math.abs(gc05_3.adjustedVolumeCuYards - gc05_1.adjustedVolumeCuYards * 3) < 0.05, gc05_1.adjustedVolumeCuYards * 3, gc05_3.adjustedVolumeCuYards);
check("GC-05: Short Tons scaled ×3", Math.abs(gc05_3.weightShortTons - gc05_1.weightShortTons * 3) < 0.05, gc05_1.weightShortTons * 3, gc05_3.weightShortTons);
check("GC-05: Bags scaled ×3", Math.abs(gc05_3.bags50lb - gc05_1.bags50lb * 3) <= 1, gc05_1.bags50lb * 3, gc05_3.bags50lb);
check("GC-05: Cost scaled ×3", Math.abs(gc05_3.estimatedCost - gc05_1.estimatedCost * 3) < 0.1, gc05_1.estimatedCost * 3, gc05_3.estimatedCost);

// GC-06: French Drain 50 ft × 12 in × 18 in, 4 in pipe
const gc06 = calculateDrainageTrench({
  trenchLengthFt: 50,
  trenchWidthInches: 12,
  totalDepthInches: 18,
  pipeDiameterInches: 4,
  gravelType: "crushed_stone_57",
});
check("GC-06: Net Gravel Volume ≈ 2.88 yd³", Math.abs(gc06.netGravelCuYards - 2.88) < 0.05, 2.88, gc06.netGravelCuYards);
check("GC-06: Gravel Weight ≈ 4.09 Tons", Math.abs(gc06.gravelWeightShortTons - 4.09) < 0.05, 4.09, gc06.gravelWeightShortTons);
check("GC-06: Geotextile Fabric = 250 sq ft", gc06.fabricAreaSqFt === 250, 250, gc06.fabricAreaSqFt);
check("GC-06: Bag Equivalent = 164 Bags", gc06.bags50lb === 164, 164, gc06.bags50lb);

// GC-07: French Drain with No Pipe
const gc07 = calculateDrainageTrench({
  trenchLengthFt: 50,
  trenchWidthInches: 12,
  totalDepthInches: 18,
  pipeDiameterInches: 0,
  gravelType: "crushed_stone_57",
});
check("GC-07: Pipe displacement = 0", gc07.pipeDisplacementCuYards === 0, 0, gc07.pipeDisplacementCuYards);
check("GC-07: Net volume > volume with pipe", gc07.netGravelCuYards > gc06.netGravelCuYards, true, gc07.netGravelCuYards > gc06.netGravelCuYards);

console.log("\n=== 2. MANDATORY DEFECT RESOLUTION TESTS ===");

// 1. Compaction = 0 produces no compaction uplift
const base0 = calculateGravelEstimator({
  shape: "rectangle", length: 30, width: 10, depth: 4, gravelType: "crushed_stone_57", compactionPct: 0, wastePct: 0,
});
check("Compaction 0 produces no uplift", base0.adjustedVolumeCuYards === base0.netVolumeCuYards, base0.netVolumeCuYards, base0.adjustedVolumeCuYards);

// 2. Waste = 0 produces no waste uplift
const baseWaste0 = calculateGravelEstimator({
  shape: "rectangle", length: 30, width: 10, depth: 4, gravelType: "crushed_stone_57", compactionPct: 8, wastePct: 0,
});
check("Waste 0 produces only 8% compaction uplift", Math.abs(baseWaste0.adjustedVolumeCuYards / base0.netVolumeCuYards - 1.08) < 0.01, 1.08, baseWaste0.adjustedVolumeCuYards / base0.netVolumeCuYards);

// 3. Price = 0 in Cost Card yields $0 material cost
const costP0 = calculateGravelCost({
  totalTons: 10, totalCuYards: 7, materialUnitPrice: 0, deliveryFlatFee: 50, laborCostPerTon: 20, salesTaxPct: 7,
});
check("Cost Card: Price = 0 yields materialSubtotal = $0", costP0.materialSubtotal === 0, 0, costP0.materialSubtotal);

// 4. Delivery = 0 in Cost Card yields $0 delivery
const costD0 = calculateGravelCost({
  totalTons: 10, totalCuYards: 7, materialUnitPrice: 45, deliveryFlatFee: 0, laborCostPerTon: 0, salesTaxPct: 0,
});
check("Cost Card: Delivery = 0 yields deliveryFee = $0", costD0.deliveryFee === 0, 0, costD0.deliveryFee);

// 5. Labor = 0 in Cost Card yields $0 labor
check("Cost Card: Labor = 0 yields laborSubtotal = $0", costD0.laborSubtotal === 0, 0, costD0.laborSubtotal);

// 6. Invalid Pipe Diameter >= Trench Width
const invalidPipe = calculateDrainageTrench({
  trenchLengthFt: 50,
  trenchWidthInches: 4,
  totalDepthInches: 18,
  pipeDiameterInches: 6,
  gravelType: "crushed_stone_57",
});
check("Invalid Pipe (6 in >= 4 in trench): isValidGeometry = false", invalidPipe.isValidGeometry === false, false, invalidPipe.isValidGeometry);
check("Invalid Pipe: validationError is populated", typeof invalidPipe.validationError === "string", true, typeof invalidPipe.validationError);

// 7. Multi-Zone zero values
const multi0 = calculateMultiZoneGravel({
  zones: [{ id: "1", name: "Driveway", shape: "rectangle", dim1: 50, dim2: 12, depthInches: 4, gravelType: "crushed_stone_57" }],
  compactionPct: 0,
  wastePct: 0,
  pricePerTon: 0,
  deliveryFee: 0,
});
const rawZ1Yards = (600 * (4 / 12)) / 27; // 7.4074
check("Multi-Zone: 0% comp & 0% waste has zero uplift", Math.abs(multi0.totalCuYards - rawZ1Yards) < 0.05, Math.round(rawZ1Yards * 100) / 100, multi0.totalCuYards);
check("Multi-Zone: $0/ton and $0 delivery yields $0 grandTotalCost", multi0.grandTotalCost === 0, 0, multi0.grandTotalCost);

console.log(`\n=== REGRESSION TEST SUMMARY: ${passedCount} PASSED, ${failedCount} FAILED ===`);
if (failedCount > 0) {
  process.exit(1);
}
