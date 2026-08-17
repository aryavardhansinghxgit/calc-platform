/**
 * Mathematical Calculation Engine for Tile Calculator Suite
 * Compliant with ANSI A108/A118 & TCNA (Tile Council of North America) Handbook Standards
 */

export type LengthUnit = "feet" | "inches" | "meters" | "centimeters";
export type TileUnit = "inches" | "centimeters" | "millimeters" | "feet";
export type GroutUnit = "inches" | "millimeters";
export type TilePattern = "grid" | "running_bond" | "offset_third" | "diagonal" | "herringbone";
export type GroutType = "sanded" | "unsanded" | "epoxy";

export interface UnitConversions {
  toFeet: (val: number, unit: LengthUnit) => number;
  toInches: (val: number, unit: TileUnit) => number;
  groutToInches: (val: number, unit: GroutUnit) => number;
}

export const convertLengthToFeet = (val: number, unit: LengthUnit): number => {
  switch (unit) {
    case "inches": return val / 12;
    case "meters": return val * 3.28084;
    case "centimeters": return (val / 100) * 3.28084;
    case "feet":
    default: return val;
  }
};

export const convertTileToInches = (val: number, unit: TileUnit): number => {
  switch (unit) {
    case "centimeters": return val / 2.54;
    case "millimeters": return val / 25.4;
    case "feet": return val * 12;
    case "inches":
    default: return val;
  }
};

export const convertGroutToInches = (val: number, unit: GroutUnit): number => {
  switch (unit) {
    case "millimeters": return val / 25.4;
    case "inches":
    default: return val;
  }
};

// Recommended waste factors by pattern
export const PATTERN_RECOMMENDED_WASTE: Record<TilePattern, number> = {
  grid: 10,
  running_bond: 10,
  offset_third: 12,
  diagonal: 15,
  herringbone: 18,
};

// ─── CARD 1: FLOOR & WALL TILE QUANTITY CALCULATOR ──────────────────────────

export interface TileQuantityInput {
  inputMode: "dimensions" | "total_area";
  roomLength: number;
  roomLengthUnit: LengthUnit;
  roomWidth: number;
  roomWidthUnit: LengthUnit;
  totalAreaSqFt?: number;

  tileLength: number;
  tileWidth: number;
  tileUnit: TileUnit;
  tileThicknessInches?: number; // e.g. 0.375" (3/8")

  groutJointWidth: number;
  groutJointUnit: GroutUnit;
  pattern: TilePattern;
  wastePercent: number; // e.g. 10%
  tilesPerBox: number; // e.g. 10 or 12
  pricePerUnit?: number;
  pricingType?: "per_tile" | "per_sqft" | "per_box";
}

export interface TileQuantityResult {
  roomAreaSqFt: number;
  roomAreaSqM: number;
  
  tileLengthInches: number;
  tileWidthInches: number;
  singleTileAreaSqInches: number;
  singleTileAreaSqFt: number;
  
  groutWidthInches: number;
  effectiveTileAreaSqInches: number;
  effectiveTileAreaSqFt: number;
  
  pattern: TilePattern;
  wastePercent: number;
  
  netTilesNeeded: number;
  wasteTilesCount: number;
  totalTilesNeeded: number;
  
  tilesPerBox: number;
  totalBoxesNeeded: number;
  boxCoverageSqFt: number;
  totalPurchasedAreaSqFt: number;
  
  estimatedGroutLbs: number;
  estimatedGroutKg: number;
  groutBagsNeeded: number; // 25-lb bags
  
  mortarBagsNeeded: number; // 50-lb bags
  recommendedTrowel: string;
  
  estimatedCost: number;
}

export function calculateTileQuantity(input: TileQuantityInput): TileQuantityResult {
  let roomAreaSqFt = 100;

  if (input.inputMode === "total_area" && input.totalAreaSqFt) {
    roomAreaSqFt = input.totalAreaSqFt;
  } else {
    const lFt = convertLengthToFeet(input.roomLength || 10, input.roomLengthUnit || "feet");
    const wFt = convertLengthToFeet(input.roomWidth || 10, input.roomWidthUnit || "feet");
    roomAreaSqFt = Math.max(0.1, lFt * wFt);
  }

  const roomAreaSqM = roomAreaSqFt * 0.092903;

  const tLengthIn = convertTileToInches(input.tileLength || 12, input.tileUnit || "inches");
  const tWidthIn = convertTileToInches(input.tileWidth || 12, input.tileUnit || "inches");
  const gWidthIn = convertGroutToInches(input.groutJointWidth || 0.125, input.groutJointUnit || "inches");

  const singleTileAreaSqInches = tLengthIn * tWidthIn;
  const singleTileAreaSqFt = singleTileAreaSqInches / 144;

  // Effective tile area including grout gap
  const effectiveTileAreaSqInches = (tLengthIn + gWidthIn) * (tWidthIn + gWidthIn);
  const effectiveTileAreaSqFt = effectiveTileAreaSqInches / 144;

  // Net tiles without waste
  const netTilesNeededExact = (roomAreaSqFt * 144) / effectiveTileAreaSqInches;
  const netTilesNeeded = Math.ceil(netTilesNeededExact);

  const wastePercent = input.wastePercent ?? 10;
  const totalTilesNeeded = Math.ceil(netTilesNeededExact * (1 + wastePercent / 100));
  const wasteTilesCount = Math.max(0, totalTilesNeeded - netTilesNeeded);

  const tilesPerBox = Math.max(1, input.tilesPerBox || 10);
  const totalBoxesNeeded = Math.ceil(totalTilesNeeded / tilesPerBox);
  const boxCoverageSqFt = Math.round((tilesPerBox * singleTileAreaSqFt) * 100) / 100;
  const totalPurchasedAreaSqFt = Math.round((totalBoxesNeeded * boxCoverageSqFt) * 100) / 100;

  // Grout Calculation: TCNA formula
  // Weight (lbs) = [(L + W) * Depth * Gap * 0.065 * Area_sqft * 144] / [L * W * 144]
  // 0.065 is dry Portland cement grout density factor in lbs/cu in.
  const thicknessIn = input.tileThicknessInches || (tLengthIn >= 12 ? 0.375 : 0.25);
  const groutWeightLbsExact =
    singleTileAreaSqInches > 0
      ? ((tLengthIn + tWidthIn) * thicknessIn * gWidthIn * 0.065 * (roomAreaSqFt * 144)) / singleTileAreaSqInches
      : 5;
  const estimatedGroutLbs = Math.max(1, Math.round(groutWeightLbsExact * 1.1 * 10) / 10); // +10% standard cleanup waste
  const estimatedGroutKg = Math.round((estimatedGroutLbs * 0.453592) * 10) / 10;
  const groutBagsNeeded = Math.ceil(estimatedGroutLbs / 25); // standard 25-lb bag

  // Thin-set Mortar Calculation
  // 1 50-lb bag covers ~40-45 sq ft for medium tile, ~30 sq ft for large format
  const maxTileDim = Math.max(tLengthIn, tWidthIn);
  let sqFtPerMortarBag = 45;
  let recommendedTrowel = "1/4\" x 1/4\" Square Notch";

  if (maxTileDim <= 4) {
    sqFtPerMortarBag = 55;
    recommendedTrowel = "3/16\" V-Notch (Mosaics)";
  } else if (maxTileDim <= 8) {
    sqFtPerMortarBag = 45;
    recommendedTrowel = "1/4\" x 1/4\" Square Notch";
  } else if (maxTileDim <= 15) {
    sqFtPerMortarBag = 35;
    recommendedTrowel = "1/4\" x 3/8\" Square Notch";
  } else {
    sqFtPerMortarBag = 30;
    recommendedTrowel = "1/2\" x 1/2\" Square Notch (Large Format Tile)";
  }

  const mortarBagsNeeded = Math.ceil(roomAreaSqFt / sqFtPerMortarBag);

  // Price Calculation
  let estimatedCost = 0;
  const price = input.pricePerUnit || 0;
  if (price > 0) {
    if (input.pricingType === "per_sqft") {
      estimatedCost = roomAreaSqFt * (1 + wastePercent / 100) * price;
    } else if (input.pricingType === "per_box") {
      estimatedCost = totalBoxesNeeded * price;
    } else {
      // per_tile
      estimatedCost = totalTilesNeeded * price;
    }
  }

  return {
    roomAreaSqFt: Math.round(roomAreaSqFt * 100) / 100,
    roomAreaSqM: Math.round(roomAreaSqM * 100) / 100,

    tileLengthInches: Math.round(tLengthIn * 100) / 100,
    tileWidthInches: Math.round(tWidthIn * 100) / 100,
    singleTileAreaSqInches: Math.round(singleTileAreaSqInches * 100) / 100,
    singleTileAreaSqFt: Math.round(singleTileAreaSqFt * 1000) / 1000,

    groutWidthInches: Math.round(gWidthIn * 1000) / 1000,
    effectiveTileAreaSqInches: Math.round(effectiveTileAreaSqInches * 100) / 100,
    effectiveTileAreaSqFt: Math.round(effectiveTileAreaSqFt * 1000) / 1000,

    pattern: input.pattern || "grid",
    wastePercent,

    netTilesNeeded,
    wasteTilesCount,
    totalTilesNeeded,

    tilesPerBox,
    totalBoxesNeeded,
    boxCoverageSqFt,
    totalPurchasedAreaSqFt,

    estimatedGroutLbs,
    estimatedGroutKg,
    groutBagsNeeded,

    mortarBagsNeeded,
    recommendedTrowel,

    estimatedCost: Math.round(estimatedCost * 100) / 100,
  };
}

// ─── CARD 2: TILE COST & BUDGET ESTIMATOR ───────────────────────────────────

export interface TileCostInput {
  totalSqFt: number;
  tileCostPerSqFt: number; // e.g. $4.50
  groutCostPerBag: number; // e.g. $18.00 / 25-lb bag
  groutBags: number;
  mortarCostPerBag: number; // e.g. $22.00 / 50-lb bag
  mortarBags: number;
  spacersAndSealerCost: number; // e.g. $35.00
  laborCostPerSqFt: number; // e.g. $8.00 - $14.00
  salesTaxPercent: number; // e.g. 7%
}

export interface TileCostResult {
  tileMaterialSubtotal: number;
  groutSubtotal: number;
  mortarSubtotal: number;
  sundriesSubtotal: number;
  materialsTotal: number;
  laborSubtotal: number;
  salesTaxAmount: number;
  grandTotalProjectCost: number;
  costPerSquareFoot: number;
}

export function calculateTileCost(input: TileCostInput): TileCostResult {
  const sqFt = Math.max(1, input.totalSqFt || 100);
  const tileMaterialSubtotal = sqFt * (input.tileCostPerSqFt || 0);
  const groutSubtotal = (input.groutBags || 1) * (input.groutCostPerBag || 0);
  const mortarSubtotal = (input.mortarBags || 2) * (input.mortarCostPerBag || 0);
  const sundriesSubtotal = input.spacersAndSealerCost || 0;

  const materialsTotal = tileMaterialSubtotal + groutSubtotal + mortarSubtotal + sundriesSubtotal;
  const laborSubtotal = sqFt * (input.laborCostPerSqFt || 0);

  const salesTaxAmount = materialsTotal * ((input.salesTaxPercent || 0) / 100);
  const grandTotalProjectCost = materialsTotal + laborSubtotal + salesTaxAmount;
  const costPerSquareFoot = grandTotalProjectCost / sqFt;

  return {
    tileMaterialSubtotal: Math.round(tileMaterialSubtotal * 100) / 100,
    groutSubtotal: Math.round(groutSubtotal * 100) / 100,
    mortarSubtotal: Math.round(mortarSubtotal * 100) / 100,
    sundriesSubtotal: Math.round(sundriesSubtotal * 100) / 100,
    materialsTotal: Math.round(materialsTotal * 100) / 100,
    laborSubtotal: Math.round(laborSubtotal * 100) / 100,
    salesTaxAmount: Math.round(salesTaxAmount * 100) / 100,
    grandTotalProjectCost: Math.round(grandTotalProjectCost * 100) / 100,
    costPerSquareFoot: Math.round(costPerSquareFoot * 100) / 100,
  };
}

// ─── CARD 3: MULTI-ROOM / COMPLEX LAYOUT AGGREGATOR ─────────────────────────

export interface RoomSection {
  id: string;
  name: string;
  lengthFt: number;
  widthFt: number;
  deductionSqFt: number; // islands, tubs, vanities
}

export interface MultiRoomInput {
  rooms: RoomSection[];
  tileLengthIn: number;
  tileWidthIn: number;
  tilesPerBox: number;
  wastePercent: number;
}

export interface MultiRoomResult {
  totalGrossSqFt: number;
  totalDeductionsSqFt: number;
  totalNetSqFt: number;
  totalNetSqM: number;
  totalTilesWithWaste: number;
  totalBoxesNeeded: number;
  totalGroutBagsNeeded: number;
  totalMortarBagsNeeded: number;
}

export function calculateMultiRoomTiles(input: MultiRoomInput): MultiRoomResult {
  let totalGrossSqFt = 0;
  let totalDeductionsSqFt = 0;

  for (const r of input.rooms) {
    const gross = (r.lengthFt || 0) * (r.widthFt || 0);
    totalGrossSqFt += gross;
    totalDeductionsSqFt += (r.deductionSqFt || 0);
  }

  const totalNetSqFt = Math.max(0, totalGrossSqFt - totalDeductionsSqFt);
  const totalNetSqM = Math.round(totalNetSqFt * 0.092903 * 100) / 100;

  const tLengthIn = input.tileLengthIn || 12;
  const tWidthIn = input.tileWidthIn || 12;
  const singleTileSqFt = (tLengthIn * tWidthIn) / 144;

  const netTiles = (totalNetSqFt * 144) / (tLengthIn * tWidthIn);
  const totalTilesWithWaste = Math.ceil(netTiles * (1 + (input.wastePercent || 10) / 100));

  const tilesPerBox = Math.max(1, input.tilesPerBox || 10);
  const totalBoxesNeeded = Math.ceil(totalTilesWithWaste / tilesPerBox);

  // Grout and Mortar
  const totalGroutLbs = (totalNetSqFt * 0.45); // ~0.45 lbs/sq ft average for 1/8" joints
  const totalGroutBagsNeeded = Math.ceil(totalGroutLbs / 25);
  const totalMortarBagsNeeded = Math.ceil(totalNetSqFt / 40);

  return {
    totalGrossSqFt: Math.round(totalGrossSqFt * 100) / 100,
    totalDeductionsSqFt: Math.round(totalDeductionsSqFt * 100) / 100,
    totalNetSqFt: Math.round(totalNetSqFt * 100) / 100,
    totalNetSqM,
    totalTilesWithWaste,
    totalBoxesNeeded,
    totalGroutBagsNeeded: Math.max(1, totalGroutBagsNeeded),
    totalMortarBagsNeeded: Math.max(1, totalMortarBagsNeeded),
  };
}

// ─── CARD 4: GROUT & MORTAR REQUIREMENT CALCULATOR ──────────────────────────

export interface GroutMortarInput {
  surfaceAreaSqFt: number;
  tileLengthInches: number;
  tileWidthInches: number;
  tileThicknessInches: number;
  groutJointWidthInches: number;
  groutType: GroutType;
}

export interface GroutMortarResult {
  groutType: GroutType;
  recommendedGroutType: string;
  groutLbs: number;
  groutKg: number;
  bags10lb: number;
  bags25lb: number;
  
  mortarBags50lb: number;
  trowelRecommendation: string;
  trowelCoverageSqFtPerBag: number;
}

export function calculateGroutAndMortar(input: GroutMortarInput): GroutMortarResult {
  const L = input.tileLengthInches || 12;
  const W = input.tileWidthInches || 12;
  const T = input.tileThicknessInches || 0.375;
  const G = input.groutJointWidthInches || 0.125;
  const area = input.surfaceAreaSqFt || 100;

  // Recommendation: Sanded for >= 1/8", Unsanded for < 1/8"
  let recommendedGroutType = "Sanded Grout (Joints ≥ 1/8\")";
  if (G < 0.125) {
    recommendedGroutType = "Unsanded Grout (Narrow Joints < 1/8\" to prevent scratching)";
  } else if (input.groutType === "epoxy") {
    recommendedGroutType = "Epoxy Grout (100% Stainproof / Chemical / Shower Wet Areas)";
  }

  // Weight formula
  const singleTileSqIn = L * W;
  const rawLbs = singleTileSqIn > 0 ? ((L + W) * T * G * 0.065 * (area * 144)) / singleTileSqIn : 10;
  const groutLbs = Math.max(1, Math.round(rawLbs * 1.15 * 10) / 10); // +15% waste allowance
  const groutKg = Math.round((groutLbs * 0.453592) * 10) / 10;

  const bags10lb = Math.ceil(groutLbs / 10);
  const bags25lb = Math.ceil(groutLbs / 25);

  const maxDim = Math.max(L, W);
  let trowelCoverageSqFtPerBag = 40;
  let trowelRecommendation = "1/4\" x 1/4\" Square Notch Trowel";

  if (maxDim <= 4) {
    trowelCoverageSqFtPerBag = 55;
    trowelRecommendation = "3/16\" V-Notch Trowel";
  } else if (maxDim <= 8) {
    trowelCoverageSqFtPerBag = 45;
    trowelRecommendation = "1/4\" x 1/4\" Square Notch Trowel";
  } else if (maxDim <= 15) {
    trowelCoverageSqFtPerBag = 35;
    trowelRecommendation = "1/4\" x 3/8\" Square Notch Trowel";
  } else {
    trowelCoverageSqFtPerBag = 28;
    trowelRecommendation = "1/2\" x 1/2\" Square Notch / Euro Trowel (Large Format Tile)";
  }

  const mortarBags50lb = Math.ceil(area / trowelCoverageSqFtPerBag);

  return {
    groutType: input.groutType,
    recommendedGroutType,
    groutLbs,
    groutKg,
    bags10lb,
    bags25lb,
    mortarBags50lb,
    trowelRecommendation,
    trowelCoverageSqFtPerBag,
  };
}
