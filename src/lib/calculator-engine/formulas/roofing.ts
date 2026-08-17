/**
 * Mathematical Calculation Engine for Roofing Calculator Suite
 * Compliant with IRC Chapter 9 (Roof Assemblies) & Standard Construction Estimating
 */

export type PitchRise = number; // e.g. 4 for 4/12 pitch
export type LinearUnit = "feet" | "inches" | "meters";
export type ShingleType = "three_tab" | "architectural" | "presidential" | "tile" | "metal";
export type UnderlaymentType = "synthetic" | "felt_15" | "felt_30";
export type RoofStyle = "gable" | "hip" | "shed" | "gambrel" | "mansard";

export interface PitchInfo {
  pitchString: string; // e.g. "6/12"
  rise: number; // 6
  angleDegrees: number; // 26.57°
  multiplier: number; // 1.1180
  gradePercent: number; // 50%
}

/**
 * Standard Pitch Lookup Table (1/12 to 24/12)
 */
export const PITCH_TABLE: PitchInfo[] = Array.from({ length: 24 }, (_, i) => {
  const rise = i + 1;
  const rad = Math.atan(rise / 12);
  const angleDegrees = Math.round((rad * 180 / Math.PI) * 10) / 10;
  const multiplier = Math.round(Math.sqrt(1 + Math.pow(rise / 12, 2)) * 1000) / 1000;
  const gradePercent = Math.round((rise / 12) * 1000) / 10;
  return {
    pitchString: `${rise}/12`,
    rise,
    angleDegrees,
    multiplier,
    gradePercent,
  };
});

export function getPitchInfo(rise: number): PitchInfo {
  const safeRise = Math.max(0.5, Math.min(30, rise));
  const rad = Math.atan(safeRise / 12);
  const angleDegrees = Math.round((rad * 180 / Math.PI) * 10) / 10;
  const multiplier = Math.round(Math.sqrt(1 + Math.pow(safeRise / 12, 2)) * 1000) / 1000;
  const gradePercent = Math.round((safeRise / 12) * 1000) / 10;
  return {
    pitchString: `${safeRise}/12`,
    rise: safeRise,
    angleDegrees,
    multiplier,
    gradePercent,
  };
}

export function getPitchFromAngle(angleDeg: number): PitchInfo {
  const safeAngle = Math.max(1, Math.min(80, angleDeg));
  const rad = (safeAngle * Math.PI) / 180;
  const rise = Math.tan(rad) * 12;
  return getPitchInfo(rise);
}

// ─── CARD 1: HOUSE FOOTPRINT & PITCH AREA ESTIMATOR ─────────────────────────

export interface FootprintAreaInput {
  inputMode: "dimensions" | "base_area";
  houseLengthFt?: number;
  houseWidthFt?: number;
  baseAreaSqFt?: number;
  eaveOverhangInches: number; // e.g. 12" (1ft)
  gableOverhangInches: number; // e.g. 12" (1ft)
  pitchRise: number; // e.g. 6 for 6/12
  wastePercent: number; // e.g. 10%
  pricePerSqFt?: number;
  style?: RoofStyle;
}

export interface FootprintAreaResult {
  flatFootprintSqFt: number;
  flatAreaWithOverhangsSqFt: number;
  pitchMultiplier: number;
  pitchAngleDeg: number;
  pitchString: string;
  style: RoofStyle;
  
  trueRoofSurfaceAreaSqFt: number;
  wastePercent: number;
  wasteAreaSqFt: number;
  totalCoveredAreaSqFt: number;
  roofingSquares: number; // 1 Square = 100 sq ft
  roofingSquaresRaw: number;
  
  eavesPerimeterFt: number;
  rakesPerimeterFt: number;
  totalPerimeterFt: number;
  estimatedRidgeFt: number;
  estimatedCost: number;
}

export function calculateFootprintArea(input: FootprintAreaInput): FootprintAreaResult {
  const pitch = getPitchInfo(input.pitchRise);
  const eaveOverhangFt = (input.eaveOverhangInches || 0) / 12;
  const gableOverhangFt = (input.gableOverhangInches || 0) / 12;
  const style = input.style || "gable";

  let flatFootprintSqFt = 2000;
  let flatAreaWithOverhangsSqFt = 2000;
  let lengthFt = 50;
  let widthFt = 40;

  if (input.inputMode === "dimensions" && input.houseLengthFt && input.houseWidthFt) {
    lengthFt = input.houseLengthFt;
    widthFt = input.houseWidthFt;
    flatFootprintSqFt = lengthFt * widthFt;
    const totalLengthWithGable = lengthFt + 2 * gableOverhangFt;
    const totalWidthWithEaves = widthFt + 2 * eaveOverhangFt;
    flatAreaWithOverhangsSqFt = totalLengthWithGable * totalWidthWithEaves;
  } else {
    flatFootprintSqFt = input.baseAreaSqFt || 2000;
    // Approximate dimensions assuming 1.25:1 aspect ratio
    widthFt = Math.sqrt(flatFootprintSqFt / 1.25);
    lengthFt = widthFt * 1.25;
    const totalLengthWithGable = lengthFt + 2 * gableOverhangFt;
    const totalWidthWithEaves = widthFt + 2 * eaveOverhangFt;
    flatAreaWithOverhangsSqFt = totalLengthWithGable * totalWidthWithEaves;
  }

  // True surface area
  const trueRoofSurfaceAreaSqFt = flatAreaWithOverhangsSqFt * pitch.multiplier;
  const wasteFactor = 1 + (input.wastePercent || 0) / 100;
  const totalCoveredAreaSqFt = trueRoofSurfaceAreaSqFt * wasteFactor;
  const wasteAreaSqFt = totalCoveredAreaSqFt - trueRoofSurfaceAreaSqFt;

  const roofingSquaresRaw = totalCoveredAreaSqFt / 100;
  const roofingSquares = Math.ceil(roofingSquaresRaw * 10) / 10; // 1 decimal

  // Style-specific perimeters and ridge
  let eavesPerimeterFt = (lengthFt + 2 * gableOverhangFt) * 2;
  let rakesPerimeterFt = (widthFt + 2 * eaveOverhangFt) * 2 * pitch.multiplier;
  let estimatedRidgeFt = lengthFt + 2 * gableOverhangFt;

  if (style === "hip") {
    // 4 eaves on all sides, 0 rakes
    eavesPerimeterFt = 2 * ((lengthFt + 2 * gableOverhangFt) + (widthFt + 2 * eaveOverhangFt));
    rakesPerimeterFt = 0;
    estimatedRidgeFt = Math.max(10, (lengthFt + 2 * gableOverhangFt) - (widthFt + 2 * eaveOverhangFt));
  } else if (style === "shed") {
    // 1 upper eave/ridge, 1 lower eave
    eavesPerimeterFt = (lengthFt + 2 * gableOverhangFt) * 2;
    rakesPerimeterFt = (widthFt + 2 * eaveOverhangFt) * 2 * pitch.multiplier;
    estimatedRidgeFt = lengthFt + 2 * gableOverhangFt;
  }

  const totalPerimeterFt = eavesPerimeterFt + rakesPerimeterFt;
  const estimatedCost = (input.pricePerSqFt || 0) * totalCoveredAreaSqFt;

  return {
    flatFootprintSqFt: Math.round(flatFootprintSqFt),
    flatAreaWithOverhangsSqFt: Math.round(flatAreaWithOverhangsSqFt),
    pitchMultiplier: pitch.multiplier,
    pitchAngleDeg: pitch.angleDegrees,
    pitchString: pitch.pitchString,
    style,

    trueRoofSurfaceAreaSqFt: Math.round(trueRoofSurfaceAreaSqFt * 10) / 10,
    wastePercent: input.wastePercent,
    wasteAreaSqFt: Math.round(wasteAreaSqFt * 10) / 10,
    totalCoveredAreaSqFt: Math.round(totalCoveredAreaSqFt * 10) / 10,
    roofingSquares,
    roofingSquaresRaw: Math.round(roofingSquaresRaw * 100) / 100,

    eavesPerimeterFt: Math.round(eavesPerimeterFt),
    rakesPerimeterFt: Math.round(rakesPerimeterFt),
    totalPerimeterFt: Math.round(totalPerimeterFt),
    estimatedRidgeFt: Math.round(estimatedRidgeFt),
    estimatedCost: Math.round(estimatedCost * 100) / 100,
  };
}

// ─── CARD 2: MULTI-PITCH & ROOF STYLE CALCULATOR ────────────────────────────

export interface RoofPlane {
  id: string;
  name: string;
  lengthFt: number;
  widthFt: number;
  pitchRise: number;
}

export interface MultiPitchInput {
  style: RoofStyle;
  planes: RoofPlane[];
  valleyLengthFt: number;
  ridgeLengthFt: number;
  deductionAreaSqFt: number; // skylights, chimneys
  wastePercent: number;
}

export interface MultiPitchResult {
  style: RoofStyle;
  totalTrueAreaSqFt: number;
  deductionsSqFt: number;
  netTrueAreaSqFt: number;
  wasteAreaSqFt: number;
  grossCoveredAreaSqFt: number;
  roofingSquares: number;
  
  totalRidgeLengthFt: number;
  totalValleyLengthFt: number;
  starterStripLengthFt: number;
  dripEdgePieces: number; // 10-ft pieces
}

export function calculateMultiPitchRoof(input: MultiPitchInput): MultiPitchResult {
  let totalTrueAreaSqFt = 0;

  for (const plane of input.planes) {
    const pitch = getPitchInfo(plane.pitchRise);
    const planeTrueArea = (plane.lengthFt * plane.widthFt) * pitch.multiplier;
    totalTrueAreaSqFt += planeTrueArea;
  }

  const deductionsSqFt = Math.max(0, input.deductionAreaSqFt || 0);
  const netTrueAreaSqFt = Math.max(0, totalTrueAreaSqFt - deductionsSqFt);
  const wasteFactor = 1 + (input.wastePercent || 10) / 100;
  const grossCoveredAreaSqFt = netTrueAreaSqFt * wasteFactor;
  const wasteAreaSqFt = grossCoveredAreaSqFt - netTrueAreaSqFt;
  const roofingSquares = Math.ceil((grossCoveredAreaSqFt / 100) * 10) / 10;

  const totalRidgeLengthFt = input.ridgeLengthFt || 0;
  const totalValleyLengthFt = input.valleyLengthFt || 0;

  // Starter strip along eaves + rakes
  let starterStripLengthFt = 0;
  for (const plane of input.planes) {
    starterStripLengthFt += plane.lengthFt + plane.widthFt;
  }

  const dripEdgePieces = Math.ceil(starterStripLengthFt / 10);

  return {
    style: input.style,
    totalTrueAreaSqFt: Math.round(totalTrueAreaSqFt * 10) / 10,
    deductionsSqFt,
    netTrueAreaSqFt: Math.round(netTrueAreaSqFt * 10) / 10,
    wasteAreaSqFt: Math.round(wasteAreaSqFt * 10) / 10,
    grossCoveredAreaSqFt: Math.round(grossCoveredAreaSqFt * 10) / 10,
    roofingSquares,

    totalRidgeLengthFt,
    totalValleyLengthFt,
    starterStripLengthFt: Math.round(starterStripLengthFt),
    dripEdgePieces,
  };
}

// ─── CARD 3: MATERIAL REQUIREMENT & BUNDLE ESTIMATOR ─────────────────────────

export interface MaterialEstimateInput {
  targetAreaSqFt: number; // or squares * 100
  shingleType: ShingleType;
  underlaymentType: UnderlaymentType;
  iceShieldMarginFt: number; // 0, 3, or 6 ft
  eavesLengthFt: number;
  valleysLengthFt: number;
  ridgeLengthFt: number;
  isHighWindZone: boolean; // 6 nails vs 4 nails
}

export interface MaterialEstimateResult {
  totalSquares: number;
  shingleType: ShingleType;
  bundlesPerSquare: number;
  shingleBundlesNeeded: number; // integer rounded up
  
  underlaymentType: UnderlaymentType;
  underlaymentCoveragePerRollSqFt: number;
  underlaymentRollsNeeded: number;

  iceShieldCoverageSqFt: number;
  iceShieldRollsNeeded: number; // 200 sq ft per roll (3ft x 66.7ft)

  ridgeCapBundlesNeeded: number; // 1 bundle per 25-33 lin ft
  starterStripBundlesNeeded: number; // 1 bundle per 100 lin ft
  
  nailsCountTotal: number;
  nailsPoundsNeeded: number; // ~320 nails/lb of 1-1/4" roofing nails
}

export function calculateRoofingMaterials(input: MaterialEstimateInput): MaterialEstimateResult {
  const totalSquares = Math.ceil((input.targetAreaSqFt / 100) * 10) / 10;
  
  let bundlesPerSquare = 3;
  if (input.shingleType === "presidential") bundlesPerSquare = 4;
  else if (input.shingleType === "tile") bundlesPerSquare = 9; // e.g. 90 tiles
  else if (input.shingleType === "architectural") bundlesPerSquare = 3;

  const shingleBundlesNeeded = Math.ceil(totalSquares * bundlesPerSquare);

  // Underlayment roll size
  let underlaymentCoveragePerRollSqFt = 1000; // Synthetic = 10 squares
  if (input.underlaymentType === "felt_15") underlaymentCoveragePerRollSqFt = 400; // #15 = 4 squares
  else if (input.underlaymentType === "felt_30") underlaymentCoveragePerRollSqFt = 200; // #30 = 2 squares

  // Effective coverage accounting for 4" overlap (10% loss)
  const netRollCoverage = underlaymentCoveragePerRollSqFt * 0.9;
  const underlaymentRollsNeeded = Math.ceil(input.targetAreaSqFt / netRollCoverage);

  // Ice and water shield: eaves margin (3ft or 6ft) + valleys (3ft wide)
  const iceShieldCoverageSqFt =
    (input.eavesLengthFt * (input.iceShieldMarginFt || 3)) + (input.valleysLengthFt * 3);
  const iceShieldRollsNeeded = Math.ceil(iceShieldCoverageSqFt / 200); // 200 sq ft per roll

  // Ridge cap shingles (30 lin ft per bundle)
  const ridgeCapBundlesNeeded = Math.ceil((input.ridgeLengthFt || 40) / 30);

  // Starter strip shingles (100 lin ft per bundle)
  const starterStripBundlesNeeded = Math.ceil(((input.eavesLengthFt || 100) * 1.2) / 100);

  // Nails: 320/sq normal, 480/sq high wind
  const nailsPerSquare = input.isHighWindZone ? 480 : 320;
  const nailsCountTotal = Math.round(totalSquares * nailsPerSquare);
  const nailsPoundsNeeded = Math.ceil(nailsCountTotal / 250); // ~250 nails/lb

  return {
    totalSquares,
    shingleType: input.shingleType,
    bundlesPerSquare,
    shingleBundlesNeeded,

    underlaymentType: input.underlaymentType,
    underlaymentCoveragePerRollSqFt,
    underlaymentRollsNeeded,

    iceShieldCoverageSqFt: Math.round(iceShieldCoverageSqFt),
    iceShieldRollsNeeded: Math.max(0, iceShieldRollsNeeded),

    ridgeCapBundlesNeeded: Math.max(1, ridgeCapBundlesNeeded),
    starterStripBundlesNeeded: Math.max(1, starterStripBundlesNeeded),

    nailsCountTotal,
    nailsPoundsNeeded,
  };
}

// ─── CARD 4: ROOFING COST & CONTRACTOR QUOTE ESTIMATOR ──────────────────────

export interface RoofingCostInput {
  roofingSquares: number;
  materialCostPerSquare: number; // $/square
  tearOffCostPerSquare: number; // $/square
  laborCostPerSquare: number; // $/square
  dumpsterAndPermitCost: number; // lump sum
  salesTaxPercent: number;
}

export interface RoofingCostResult {
  roofingSquares: number;
  materialSubtotal: number;
  tearOffSubtotal: number;
  laborSubtotal: number;
  dumpsterAndPermits: number;
  salesTaxAmount: number;
  
  totalEstimatedCost: number;
  lowEstimateCost: number; // -15%
  highEstimateCost: number; // +20%
}

export function calculateRoofingCost(input: RoofingCostInput): RoofingCostResult {
  const sq = input.roofingSquares || 20;
  const materialSubtotal = sq * (input.materialCostPerSquare || 0);
  const tearOffSubtotal = sq * (input.tearOffCostPerSquare || 0);
  const laborSubtotal = sq * (input.laborCostPerSquare || 0);
  const dumpsterAndPermits = input.dumpsterAndPermitCost || 0;

  const taxableMaterials = materialSubtotal;
  const salesTaxAmount = taxableMaterials * ((input.salesTaxPercent || 0) / 100);

  const totalEstimatedCost =
    materialSubtotal + tearOffSubtotal + laborSubtotal + dumpsterAndPermits + salesTaxAmount;

  const lowEstimateCost = Math.round(totalEstimatedCost * 0.85);
  const highEstimateCost = Math.round(totalEstimatedCost * 1.20);

  return {
    roofingSquares: sq,
    materialSubtotal: Math.round(materialSubtotal * 100) / 100,
    tearOffSubtotal: Math.round(tearOffSubtotal * 100) / 100,
    laborSubtotal: Math.round(laborSubtotal * 100) / 100,
    dumpsterAndPermits: Math.round(dumpsterAndPermits * 100) / 100,
    salesTaxAmount: Math.round(salesTaxAmount * 100) / 100,

    totalEstimatedCost: Math.round(totalEstimatedCost * 100) / 100,
    lowEstimateCost,
    highEstimateCost,
  };
}
