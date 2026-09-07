import {
  calculateTileQuantity,
  calculateTileCost,
  calculateMultiRoomTiles,
  calculateGroutAndMortar,
  convertLengthToFeet,
  convertTileToInches,
  convertGroutToInches,
} from "../src/lib/calculator-engine/formulas/tile";

function runFullRegression() {
  console.log("=== TILE CALCULATOR FULL REGRESSION SUITE ===");

  let passed = 0;
  let total = 0;

  function assert(condition: boolean, testName: string, detail?: any) {
    total++;
    if (condition) {
      passed++;
      console.log(`[PASS] ${testName}`);
    } else {
      console.error(`[FAIL] ${testName}`, detail);
    }
  }

  // TC-01: 20x15 ft, 12x12 in, 1/8" grout, 10% waste, 12 pcs/box
  const tc01 = calculateTileQuantity({
    inputMode: "dimensions",
    roomLength: 20,
    roomLengthUnit: "feet",
    roomWidth: 15,
    roomWidthUnit: "feet",
    tileLength: 12,
    tileWidth: 12,
    tileUnit: "inches",
    groutJointWidth: 0.125,
    groutJointUnit: "inches",
    pattern: "grid",
    wastePercent: 10,
    tilesPerBox: 12,
  });
  assert(tc01.roomAreaSqFt === 300, "TC-01: Room Area is 300 sq ft");
  assert(tc01.netTilesNeeded === 294, "TC-01: Net tiles is 294");
  assert(tc01.totalTilesNeeded === 324, "TC-01: Purchased tiles with 10% waste is 324");
  assert(tc01.totalBoxesNeeded === 27, "TC-01: Total boxes needed is 27");
  assert(tc01.estimatedGroutLbs === 24.1, "TC-01: Grout is 24.1 lbs");
  assert(tc01.mortarBagsNeeded === 9, "TC-01: Mortar is 9 bags");

  // TC-02: Same room, 0% waste
  const tc02 = calculateTileQuantity({
    inputMode: "dimensions",
    roomLength: 20,
    roomLengthUnit: "feet",
    roomWidth: 15,
    roomWidthUnit: "feet",
    tileLength: 12,
    tileWidth: 12,
    tileUnit: "inches",
    groutJointWidth: 0.125,
    groutJointUnit: "inches",
    pattern: "grid",
    wastePercent: 0,
    tilesPerBox: 12,
  });
  assert(tc02.netTilesNeeded === 294, "TC-02: Net tiles is 294");
  assert(tc02.totalTilesNeeded === 294, "TC-02: Total tiles is 294");
  assert(tc02.totalBoxesNeeded === 25, "TC-02: Boxes needed is 25");

  // TC-03: Direct Area Mode 300 sq ft
  const tc03 = calculateTileQuantity({
    inputMode: "total_area",
    roomLength: 0,
    roomLengthUnit: "feet",
    roomWidth: 0,
    roomWidthUnit: "feet",
    totalAreaSqFt: 300,
    tileLength: 12,
    tileWidth: 12,
    tileUnit: "inches",
    groutJointWidth: 0.125,
    groutJointUnit: "inches",
    pattern: "grid",
    wastePercent: 10,
    tilesPerBox: 12,
  });
  assert(tc03.totalTilesNeeded === 324 && tc03.totalBoxesNeeded === 27, "TC-03: Direct Area Mode agrees with Dimensions mode");

  // TC-04: 12x24 in tile, 1/8" grout, 10 pcs/box, 10% waste
  const tc04 = calculateTileQuantity({
    inputMode: "dimensions",
    roomLength: 20,
    roomLengthUnit: "feet",
    roomWidth: 15,
    roomWidthUnit: "feet",
    tileLength: 12,
    tileWidth: 24,
    tileUnit: "inches",
    groutJointWidth: 0.125,
    groutJointUnit: "inches",
    pattern: "running_bond",
    wastePercent: 10,
    tilesPerBox: 10,
  });
  assert(tc04.netTilesNeeded === 148, "TC-04: Net tiles is 148");
  assert(tc04.totalTilesNeeded === 163, "TC-04: Purchased tiles with 10% waste is 163");
  assert(tc04.totalBoxesNeeded === 17, "TC-04: Total boxes needed is 17");

  // TC-05: 10x10 ft, 12x12 in tile, 0 in grout, 0% waste, 10 tiles/box
  const tc05 = calculateTileQuantity({
    inputMode: "dimensions",
    roomLength: 10,
    roomLengthUnit: "feet",
    roomWidth: 10,
    roomWidthUnit: "feet",
    tileLength: 12,
    tileWidth: 12,
    tileUnit: "inches",
    groutJointWidth: 0,
    groutJointUnit: "inches",
    pattern: "grid",
    wastePercent: 0,
    tilesPerBox: 10,
  });
  assert(tc05.roomAreaSqFt === 100, "TC-05: Area is 100 sq ft");
  assert(tc05.netTilesNeeded === 100, "TC-05: Net tiles is 100");
  assert(tc05.totalTilesNeeded === 100, "TC-05: Total tiles is 100");
  assert(tc05.totalBoxesNeeded === 10, "TC-05: Total boxes is 10");
  assert(tc05.estimatedGroutLbs === 0, "TC-05: Grout weight is 0 for 0 grout");

  // Zero grout with 10% waste
  const tc05_waste = calculateTileQuantity({
    inputMode: "total_area",
    roomLength: 0,
    roomLengthUnit: "feet",
    roomWidth: 0,
    roomWidthUnit: "feet",
    totalAreaSqFt: 100,
    tileLength: 12,
    tileWidth: 12,
    tileUnit: "inches",
    groutJointWidth: 0,
    groutJointUnit: "inches",
    pattern: "grid",
    wastePercent: 10,
    tilesPerBox: 10,
  });
  assert(tc05_waste.netTilesNeeded === 100, "TC-05b: Net tiles is 100");
  assert(tc05_waste.totalTilesNeeded === 110, "TC-05b: Total tiles with 10% waste is 110");
  assert(tc05_waste.totalBoxesNeeded === 11, "TC-05b: Boxes needed is 11");

  // TC-06: 12x10 ft, 6x24 in tile, 8 pcs/box, 10% waste
  const tc06 = calculateTileQuantity({
    inputMode: "dimensions",
    roomLength: 12,
    roomLengthUnit: "feet",
    roomWidth: 10,
    roomWidthUnit: "feet",
    tileLength: 6,
    tileWidth: 24,
    tileUnit: "inches",
    groutJointWidth: 0.125,
    groutJointUnit: "inches",
    pattern: "running_bond",
    wastePercent: 10,
    tilesPerBox: 8,
  });
  assert(tc06.roomAreaSqFt === 120, "TC-06: Room Area is 120 sq ft");
  assert(tc06.netTilesNeeded === 117, "TC-06: Net tiles is 117");
  assert(tc06.totalTilesNeeded === 129, "TC-06: Total tiles is 129");
  assert(tc06.totalBoxesNeeded === 17, "TC-06: Boxes is 17");

  // TC-07: High waste (20%) for TC-01 geometry
  const tc07 = calculateTileQuantity({
    inputMode: "dimensions",
    roomLength: 20,
    roomLengthUnit: "feet",
    roomWidth: 15,
    roomWidthUnit: "feet",
    tileLength: 12,
    tileWidth: 12,
    tileUnit: "inches",
    groutJointWidth: 0.125,
    groutJointUnit: "inches",
    pattern: "grid",
    wastePercent: 20,
    tilesPerBox: 12,
  });
  assert(tc07.totalTilesNeeded === 353, "TC-07: Total tiles with 20% waste is 353");
  assert(tc07.totalBoxesNeeded === 30, "TC-07: Boxes is 30");

  // TC-08: 25 tiles with 12 tiles/box
  const tc08 = calculateTileQuantity({
    inputMode: "total_area",
    roomLength: 0,
    roomLengthUnit: "feet",
    roomWidth: 0,
    roomWidthUnit: "feet",
    totalAreaSqFt: 25.5,
    tileLength: 12,
    tileWidth: 12,
    tileUnit: "inches",
    groutJointWidth: 0,
    groutJointUnit: "inches",
    pattern: "grid",
    wastePercent: 0,
    tilesPerBox: 12,
  });
  assert(tc08.totalBoxesNeeded === 3, "TC-08: Boxes rounds up to 3");
  assert(tc08.totalPurchasedAreaSqFt === 36, "TC-08: Purchased coverage is 36 sq ft");

  // Multi-room regression
  const multiRef = calculateMultiRoomTiles({
    rooms: [
      { id: "1", name: "Master Bathroom", lengthFt: 12, widthFt: 10, deductionSqFt: 15 },
      { id: "2", name: "Kitchen Floor", lengthFt: 18, widthFt: 14, deductionSqFt: 25 },
      { id: "3", name: "Backsplash", lengthFt: 15, widthFt: 2.5, deductionSqFt: 0 },
    ],
    tileLengthIn: 12,
    tileWidthIn: 12,
    tilesPerBox: 12,
    wastePercent: 10,
  });
  assert(multiRef.totalNetSqFt === 369.5, "Multi-Room: Total net area is 369.5 sq ft");
  assert(multiRef.totalTilesWithWaste === 407, "Multi-Room: Total tiles with waste is 407 pcs");
  assert(multiRef.totalBoxesNeeded === 34, "Multi-Room: Total boxes needed is 34 Boxes");
  assert(multiRef.totalGroutBagsNeeded === 7, "Multi-Room: Grout bags is 7");
  assert(multiRef.totalMortarBagsNeeded === 10, "Multi-Room: Mortar bags is 10");

  // Cost regression
  const costRef = calculateTileCost({
    totalSqFt: 300,
    tileCostPerSqFt: 4.50,
    groutCostPerBag: 18.00,
    groutBags: 1,
    mortarCostPerBag: 22.00,
    mortarBags: 9,
    spacersAndSealerCost: 35.00,
    laborCostPerSqFt: 9.00,
    salesTaxPercent: 7,
  });
  assert(costRef.tileMaterialSubtotal === 1350, "Cost: Tile material is $1350.00");
  assert(costRef.groutSubtotal === 18, "Cost: Grout is $18.00");
  assert(costRef.mortarSubtotal === 198, "Cost: Mortar is $198.00");
  assert(costRef.sundriesSubtotal === 35, "Cost: Sundries is $35.00");
  assert(costRef.materialsTotal === 1601, "Cost: Materials subtotal is $1601.00");
  assert(costRef.laborSubtotal === 2700, "Cost: Labor subtotal is $2700.00");
  assert(costRef.salesTaxAmount === 112.07, "Cost: Sales tax (7% on materials) is $112.07");
  assert(costRef.grandTotalProjectCost === 4413.07, "Cost: Grand Total is $4413.07");
  assert(costRef.costPerSquareFoot === 14.71, "Cost: Unit cost is $14.71/sq ft");

  // Card 4 Grout & Mortar Regression
  const groutRef = calculateGroutAndMortar({
    surfaceAreaSqFt: 300,
    tileLengthInches: 12,
    tileWidthInches: 12,
    tileThicknessInches: 0.375,
    groutJointWidthInches: 0.125,
    groutType: "sanded",
  });
  assert(groutRef.groutLbs === 25.2, "Grout: Total weight is 25.2 lbs");
  assert(groutRef.bags25lb === 2, "Grout: 25-lb bags is 2");
  assert(groutRef.mortarBags50lb === 9, "Grout: Mortar 50-lb bags is 9");

  // Zero grout test in Card 4
  const zeroGrout = calculateGroutAndMortar({
    surfaceAreaSqFt: 300,
    tileLengthInches: 12,
    tileWidthInches: 12,
    tileThicknessInches: 0.375,
    groutJointWidthInches: 0,
    groutType: "sanded",
  });
  assert(zeroGrout.groutLbs === 0, "Zero Grout: Weight is 0 lbs");
  assert(zeroGrout.bags25lb === 0, "Zero Grout: Bags is 0");

  // Unit conversion tests
  assert(convertLengthToFeet(12, "inches") === 1, "Unit: 12 inches is 1 foot");
  assert(Math.abs(convertLengthToFeet(1, "meters") - 3.28084) < 0.0001, "Unit: 1 meter is ~3.28084 feet");
  assert(convertTileToInches(1, "feet") === 12, "Unit: 1 foot tile is 12 inches");
  assert(Math.abs(convertTileToInches(25.4, "millimeters") - 1) < 0.0001, "Unit: 25.4 mm is 1 inch");
  assert(Math.abs(convertTileToInches(2.54, "centimeters") - 1) < 0.0001, "Unit: 2.54 cm is 1 inch");

  console.log(`\nRegression Suite Result: ${passed} / ${total} tests passed.`);
}

runFullRegression();
