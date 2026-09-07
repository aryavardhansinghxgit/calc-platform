import {
  calculateTileQuantity,
  calculateTileCost,
  calculateMultiRoomTiles,
  calculateGroutAndMortar,
  convertLengthToFeet,
  convertTileToInches,
  convertGroutToInches,
} from "../src/lib/calculator-engine/formulas/tile";

function runTests() {
  console.log("=== STARTING TILE CALCULATOR MATHEMATICAL AUDIT ===");

  // TC-01: Standard Rectangle 20x15 ft, 12x12 in tile, 1/8" grout, 10% waste, 12 pcs/box
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

  console.log("TC-01 Standard Rectangle:", {
    area: tc01.roomAreaSqFt,
    netTiles: tc01.netTilesNeeded,
    wasteTiles: tc01.wasteTilesCount,
    totalTiles: tc01.totalTilesNeeded,
    boxes: tc01.totalBoxesNeeded,
    groutLbs: tc01.estimatedGroutLbs,
    mortarBags: tc01.mortarBagsNeeded,
    trowel: tc01.recommendedTrowel,
  });

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

  console.log("TC-02 Zero Waste:", {
    netTiles: tc02.netTilesNeeded,
    totalTiles: tc02.totalTilesNeeded,
    boxes: tc02.totalBoxesNeeded,
  });

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

  console.log("TC-03 Direct Area:", {
    area: tc03.roomAreaSqFt,
    netTiles: tc03.netTilesNeeded,
    totalTiles: tc03.totalTilesNeeded,
    boxes: tc03.totalBoxesNeeded,
    matchesTC01: tc03.totalTilesNeeded === tc01.totalTilesNeeded && tc03.totalBoxesNeeded === tc01.totalBoxesNeeded,
  });

  // TC-04: Rectangular Tile 12x24 in, 20x15 ft room
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

  console.log("TC-04 Rectangular Tile (12x24):", {
    netTiles: tc04.netTilesNeeded,
    totalTiles: tc04.totalTilesNeeded,
    boxes: tc04.totalBoxesNeeded,
    groutLbs: tc04.estimatedGroutLbs,
    mortarBags: tc04.mortarBagsNeeded,
    trowel: tc04.recommendedTrowel,
  });

  // TC-05: 10x10 ft room, 12x12 in tile, 0 grout, 0% waste
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

  console.log("TC-05 10x10 zero grout zero waste:", {
    area: tc05.roomAreaSqFt,
    netTiles: tc05.netTilesNeeded,
    totalTiles: tc05.totalTilesNeeded,
    boxes: tc05.totalBoxesNeeded,
  });

  // TC-06: 12x10 ft room, 6x24 in tile
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

  console.log("TC-06 6x24 tile:", {
    area: tc06.roomAreaSqFt,
    netTiles: tc06.netTilesNeeded,
    totalTiles: tc06.totalTilesNeeded,
    boxes: tc06.totalBoxesNeeded,
  });

  // TC-07: High waste (20%)
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

  console.log("TC-07 High Waste (20%):", {
    netTiles: tc07.netTilesNeeded,
    totalTiles: tc07.totalTilesNeeded,
    wasteTiles: tc07.wasteTilesCount,
    boxes: tc07.totalBoxesNeeded,
  });

  // TC-08: Box Rounding
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

  console.log("TC-08 Box Rounding:", {
    totalTiles: tc08.totalTilesNeeded,
    boxes: tc08.totalBoxesNeeded,
    purchasedCoverage: tc08.totalPurchasedAreaSqFt,
  });

  // TCNA Grout and Mortar Test (Card 4 reference)
  const groutRef = calculateGroutAndMortar({
    surfaceAreaSqFt: 300,
    tileLengthInches: 12,
    tileWidthInches: 12,
    tileThicknessInches: 0.375,
    groutJointWidthInches: 0.125,
    groutType: "sanded",
  });
  console.log("Card 4 Grout & Mortar Reference:", groutRef);

  // Multi-Room Aggregator Test (Card 3 reference)
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
  console.log("Card 3 Multi-Room Reference:", multiRef);

  // Cost Test (Card 2 reference)
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
  console.log("Card 2 Cost Reference:", costRef);

  // 5,000 Randomized Property Tests for Tile Quantity
  console.log("\nRunning 5,000 randomized property tests for Tile Quantity...");
  let passedQty = 0;
  for (let i = 0; i < 5000; i++) {
    const l = Math.random() * 50 + 1;
    const w = Math.random() * 50 + 1;
    const tl = Math.random() * 36 + 1;
    const tw = Math.random() * 36 + 1;
    const waste = Math.random() * 50;
    const boxSize = Math.floor(Math.random() * 30) + 1;
    const gap = Math.random() * 0.5;

    const res = calculateTileQuantity({
      inputMode: "dimensions",
      roomLength: l,
      roomLengthUnit: "feet",
      roomWidth: w,
      roomWidthUnit: "feet",
      tileLength: tl,
      tileWidth: tw,
      tileUnit: "inches",
      groutJointWidth: gap,
      groutJointUnit: "inches",
      pattern: "grid",
      wastePercent: waste,
      tilesPerBox: boxSize,
    });

    if (
      !Number.isFinite(res.totalTilesNeeded) ||
      !Number.isFinite(res.totalBoxesNeeded) ||
      res.totalTilesNeeded < res.netTilesNeeded ||
      res.totalBoxesNeeded !== Math.ceil(res.totalTilesNeeded / boxSize) ||
      res.roomAreaSqFt <= 0
    ) {
      console.error("Failed property test at iteration", i, res);
      break;
    }
    passedQty++;
  }
  console.log(`Passed ${passedQty} / 5000 property tests.`);

  // 2,000 Randomized Property Tests for Cost
  console.log("\nRunning 2,000 randomized property tests for Cost...");
  let passedCost = 0;
  for (let i = 0; i < 2000; i++) {
    const sqft = Math.random() * 1000 + 1;
    const tileRate = Math.random() * 20;
    const groutRate = Math.random() * 30;
    const mortarRate = Math.random() * 40;
    const laborRate = Math.random() * 25;
    const tax = Math.random() * 15;

    const res = calculateTileCost({
      totalSqFt: sqft,
      tileCostPerSqFt: tileRate,
      groutCostPerBag: groutRate,
      groutBags: 2,
      mortarCostPerBag: mortarRate,
      mortarBags: 5,
      spacersAndSealerCost: 35,
      laborCostPerSqFt: laborRate,
      salesTaxPercent: tax,
    });

    const expectedMat = sqft * tileRate + 2 * groutRate + 5 * mortarRate + 35;
    const expectedTax = expectedMat * (tax / 100);
    const expectedGrand = expectedMat + sqft * laborRate + expectedTax;

    if (
      Math.abs(res.grandTotalProjectCost - expectedGrand) > 0.05 ||
      !Number.isFinite(res.grandTotalProjectCost)
    ) {
      console.error("Failed cost test at iteration", i, res, expectedGrand);
      break;
    }
    passedCost++;
  }
  console.log(`Passed ${passedCost} / 2000 cost property tests.`);

  // 2,000 Randomized Multi-room tests
  console.log("\nRunning 2,000 randomized property tests for Multi-room...");
  let passedMulti = 0;
  for (let i = 0; i < 2000; i++) {
    const numRooms = Math.floor(Math.random() * 5) + 1;
    const rooms = [];
    let expectedNetArea = 0;
    for (let r = 0; r < numRooms; r++) {
      const rl = Math.random() * 30 + 1;
      const rw = Math.random() * 30 + 1;
      const deduct = Math.random() * (rl * rw * 0.5);
      rooms.push({ id: `${r}`, name: `R${r}`, lengthFt: rl, widthFt: rw, deductionSqFt: deduct });
      expectedNetArea += (rl * rw - deduct);
    }
    const res = calculateMultiRoomTiles({
      rooms,
      tileLengthIn: 12,
      tileWidthIn: 12,
      tilesPerBox: 12,
      wastePercent: 10,
    });

    if (
      Math.abs(res.totalNetSqFt - Math.round(expectedNetArea * 100) / 100) > 0.1 ||
      res.totalBoxesNeeded !== Math.ceil(res.totalTilesWithWaste / 12)
    ) {
      console.error("Failed multiroom test at iteration", i, res, expectedNetArea);
      break;
    }
    passedMulti++;
  }
  console.log(`Passed ${passedMulti} / 2000 multi-room property tests.`);
}

runTests();
