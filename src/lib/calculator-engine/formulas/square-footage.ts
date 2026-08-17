/**
 * Pure mathematical calculation engine for Square Footage & Area Calculator suite.
 * Covers:
 * 1. Rectangle / Square & Multi-Room Composite Sections
 * 2. Circle, Ring (Circular Border), and Circular Sector
 * 3. Triangle (Heron's 3-Side Formula & Base-Height), Trapezoid, Parallelogram
 * 4. Rectangular Border & Picture Frame
 * 5. Material Estimations (Tile boxes, Hardwood cartons, Paint gallons, Sod rolls, Carpet sq yds)
 */

export type LinearUnit = "feet" | "inches" | "yards" | "meters" | "centimeters";
export type PriceUnit = "per_sq_ft" | "per_sq_yd" | "per_sq_m";

// ─── Unit Conversion Helpers ────────────────────────────────────────────────

export function toFeet(value: number, unit: LinearUnit): number {
  if (isNaN(value) || value <= 0) return 0;
  switch (unit) {
    case "feet":
      return value;
    case "inches":
      return value / 12;
    case "yards":
      return value * 3;
    case "meters":
      return value * 3.28084;
    case "centimeters":
      return value / 30.48;
    default:
      return value;
  }
}

export function fromFeet(feet: number, unit: LinearUnit): number {
  switch (unit) {
    case "feet":
      return feet;
    case "inches":
      return feet * 12;
    case "yards":
      return feet / 3;
    case "meters":
      return feet / 3.28084;
    case "centimeters":
      return feet * 30.48;
    default:
      return feet;
  }
}

export interface AreaBreakdown {
  squareFeet: number;
  squareYards: number;
  squareMeters: number;
  acres: number;
  squareInches: number;
  squareCentimeters: number;
  wasteSquareFeet: number;
  wasteSquareYards: number;
  wasteSquareMeters: number;
  estimatedCost: number;
  pricePerSqFt: number;
}

export function computeAreaOutputs(
  rawSqFt: number,
  quantity: number = 1,
  wastePercent: number = 0,
  unitPrice: number = 0,
  priceUnit: PriceUnit = "per_sq_ft",
): AreaBreakdown {
  const safeQty = Math.max(quantity, 1);
  const totalRawSqFt = Math.max(rawSqFt * safeQty, 0);
  const safeWaste = Math.max(wastePercent, 0);
  const wasteMultiplier = 1 + safeWaste / 100;
  const wasteSqFt = totalRawSqFt * wasteMultiplier;

  // Conversions
  const squareFeet = parseFloat(totalRawSqFt.toFixed(2));
  const squareYards = parseFloat((totalRawSqFt / 9).toFixed(3));
  const squareMeters = parseFloat((totalRawSqFt * 0.092903).toFixed(3));
  const acres = parseFloat((totalRawSqFt / 43560).toFixed(5));
  const squareInches = Math.round(totalRawSqFt * 144);
  const squareCentimeters = Math.round(totalRawSqFt * 929.03);

  const wasteSquareFeet = parseFloat(wasteSqFt.toFixed(2));
  const wasteSquareYards = parseFloat((wasteSqFt / 9).toFixed(3));
  const wasteSquareMeters = parseFloat((wasteSqFt * 0.092903).toFixed(3));

  // Pricing conversion
  let pricePerSqFt = unitPrice;
  if (priceUnit === "per_sq_yd") {
    pricePerSqFt = unitPrice / 9;
  } else if (priceUnit === "per_sq_m") {
    pricePerSqFt = unitPrice / 10.7639;
  }
  const estimatedCost = parseFloat((wasteSquareFeet * pricePerSqFt).toFixed(2));

  return {
    squareFeet,
    squareYards,
    squareMeters,
    acres,
    squareInches,
    squareCentimeters,
    wasteSquareFeet,
    wasteSquareYards,
    wasteSquareMeters,
    estimatedCost,
    pricePerSqFt: parseFloat(pricePerSqFt.toFixed(3)),
  };
}

// ─── 1. Rectangle & Multi-Room Section Calculation ──────────────────────────

export interface RectangleInput {
  length: number;
  width: number;
  unit: LinearUnit;
  quantity?: number;
  wastePercent?: number;
  price?: number;
  priceUnit?: PriceUnit;
}

export interface RectangleResult extends AreaBreakdown {
  lengthFt: number;
  widthFt: number;
  perimeterFt: number;
}

export function calculateRectangleArea(input: RectangleInput): RectangleResult {
  const lFt = toFeet(input.length, input.unit);
  const wFt = toFeet(input.width, input.unit);
  const rawSqFt = lFt * wFt;
  const perimeterFt = 2 * (lFt + wFt);
  const breakdown = computeAreaOutputs(
    rawSqFt,
    input.quantity || 1,
    input.wastePercent || 0,
    input.price || 0,
    input.priceUnit || "per_sq_ft",
  );

  return {
    ...breakdown,
    lengthFt: parseFloat(lFt.toFixed(2)),
    widthFt: parseFloat(wFt.toFixed(2)),
    perimeterFt: parseFloat(perimeterFt.toFixed(2)),
  };
}

export interface RoomSection {
  id: string;
  name: string;
  length: number;
  width: number;
  unit: LinearUnit;
  quantity: number;
}

export function calculateMultiRoomArea(
  sections: RoomSection[],
  wastePercent: number = 0,
  price: number = 0,
  priceUnit: PriceUnit = "per_sq_ft",
): AreaBreakdown & { sectionsCount: number; sectionBreakdowns: { id: string; name: string; sqFt: number }[] } {
  let totalSqFt = 0;
  const sectionBreakdowns: { id: string; name: string; sqFt: number }[] = [];

  for (const s of sections) {
    const l = toFeet(s.length, s.unit);
    const w = toFeet(s.width, s.unit);
    const sqFt = l * w * (s.quantity || 1);
    totalSqFt += sqFt;
    sectionBreakdowns.push({
      id: s.id,
      name: s.name || "Room",
      sqFt: parseFloat(sqFt.toFixed(2)),
    });
  }

  const breakdown = computeAreaOutputs(totalSqFt, 1, wastePercent, price, priceUnit);
  return {
    ...breakdown,
    sectionsCount: sections.length,
    sectionBreakdowns,
  };
}

// ─── 2. Circle, Ring & Sector Calculation ───────────────────────────────────

export interface CircleInput {
  diameter?: number;
  radius?: number;
  unit: LinearUnit;
  quantity?: number;
  wastePercent?: number;
  price?: number;
  priceUnit?: PriceUnit;
}

export interface CircleResult extends AreaBreakdown {
  radiusFt: number;
  diameterFt: number;
  circumferenceFt: number;
}

export function calculateCircleArea(input: CircleInput): CircleResult {
  let rFt = 0;
  if (input.radius !== undefined && input.radius > 0) {
    rFt = toFeet(input.radius, input.unit);
  } else if (input.diameter !== undefined && input.diameter > 0) {
    rFt = toFeet(input.diameter, input.unit) / 2;
  }

  const dFt = rFt * 2;
  const rawSqFt = Math.PI * rFt * rFt;
  const circumferenceFt = 2 * Math.PI * rFt;

  const breakdown = computeAreaOutputs(
    rawSqFt,
    input.quantity || 1,
    input.wastePercent || 0,
    input.price || 0,
    input.priceUnit || "per_sq_ft",
  );

  return {
    ...breakdown,
    radiusFt: parseFloat(rFt.toFixed(2)),
    diameterFt: parseFloat(dFt.toFixed(2)),
    circumferenceFt: parseFloat(circumferenceFt.toFixed(2)),
  };
}

export interface RingInput {
  outerDiameter: number;
  borderWidth: number;
  unit: LinearUnit;
  quantity?: number;
  wastePercent?: number;
  price?: number;
  priceUnit?: PriceUnit;
}

export interface RingResult extends AreaBreakdown {
  outerRadiusFt: number;
  innerRadiusFt: number;
  outerDiameterFt: number;
  innerDiameterFt: number;
  borderWidthFt: number;
}

export function calculateRingArea(input: RingInput): RingResult {
  const outerDFt = toFeet(input.outerDiameter, input.unit);
  const borderFt = toFeet(input.borderWidth, input.unit);

  const outerRFt = outerDFt / 2;
  const innerRFt = Math.max(outerRFt - borderFt, 0);
  const innerDFt = innerRFt * 2;

  const rawSqFt = Math.PI * (outerRFt * outerRFt - innerRFt * innerRFt);

  const breakdown = computeAreaOutputs(
    rawSqFt,
    input.quantity || 1,
    input.wastePercent || 0,
    input.price || 0,
    input.priceUnit || "per_sq_ft",
  );

  return {
    ...breakdown,
    outerRadiusFt: parseFloat(outerRFt.toFixed(2)),
    innerRadiusFt: parseFloat(innerRFt.toFixed(2)),
    outerDiameterFt: parseFloat(outerDFt.toFixed(2)),
    innerDiameterFt: parseFloat(innerDFt.toFixed(2)),
    borderWidthFt: parseFloat(borderFt.toFixed(2)),
  };
}

export interface SectorInput {
  radius: number;
  angleDegrees: number;
  unit: LinearUnit;
  quantity?: number;
  wastePercent?: number;
  price?: number;
  priceUnit?: PriceUnit;
}

export interface SectorResult extends AreaBreakdown {
  radiusFt: number;
  angleDegrees: number;
  arcLengthFt: number;
}

export function calculateSectorArea(input: SectorInput): SectorResult {
  const rFt = toFeet(input.radius, input.unit);
  const angle = Math.min(Math.max(input.angleDegrees, 0), 360);
  const rawSqFt = (angle / 360) * Math.PI * rFt * rFt;
  const arcLengthFt = (angle / 360) * 2 * Math.PI * rFt;

  const breakdown = computeAreaOutputs(
    rawSqFt,
    input.quantity || 1,
    input.wastePercent || 0,
    input.price || 0,
    input.priceUnit || "per_sq_ft",
  );

  return {
    ...breakdown,
    radiusFt: parseFloat(rFt.toFixed(2)),
    angleDegrees: angle,
    arcLengthFt: parseFloat(arcLengthFt.toFixed(2)),
  };
}

// ─── 3. Triangle, Trapezoid & Parallelogram Calculation ─────────────────────

export interface TriangleHeronInput {
  sideA: number;
  sideB: number;
  sideC: number;
  unit: LinearUnit;
  quantity?: number;
  wastePercent?: number;
  price?: number;
  priceUnit?: PriceUnit;
}

export interface TriangleResult extends AreaBreakdown {
  sideAFt: number;
  sideBFt: number;
  sideCFt: number;
  perimeterFt: number;
  isValidTriangle: boolean;
}

export function calculateTriangleHeron(input: TriangleHeronInput): TriangleResult {
  const a = toFeet(input.sideA, input.unit);
  const b = toFeet(input.sideB, input.unit);
  const c = toFeet(input.sideC, input.unit);

  const isValid = a + b > c && a + c > b && b + c > a && a > 0 && b > 0 && c > 0;
  let rawSqFt = 0;
  const perimeterFt = a + b + c;

  if (isValid) {
    const s = perimeterFt / 2;
    rawSqFt = Math.sqrt(Math.max(s * (s - a) * (s - b) * (s - c), 0));
  }

  const breakdown = computeAreaOutputs(
    rawSqFt,
    input.quantity || 1,
    input.wastePercent || 0,
    input.price || 0,
    input.priceUnit || "per_sq_ft",
  );

  return {
    ...breakdown,
    sideAFt: parseFloat(a.toFixed(2)),
    sideBFt: parseFloat(b.toFixed(2)),
    sideCFt: parseFloat(c.toFixed(2)),
    perimeterFt: parseFloat(perimeterFt.toFixed(2)),
    isValidTriangle: isValid,
  };
}

export interface TriangleBaseHeightInput {
  base: number;
  height: number;
  unit: LinearUnit;
  quantity?: number;
  wastePercent?: number;
  price?: number;
  priceUnit?: PriceUnit;
}

export function calculateTriangleBaseHeight(input: TriangleBaseHeightInput): AreaBreakdown & { baseFt: number; heightFt: number } {
  const bFt = toFeet(input.base, input.unit);
  const hFt = toFeet(input.height, input.unit);
  const rawSqFt = 0.5 * bFt * hFt;

  const breakdown = computeAreaOutputs(
    rawSqFt,
    input.quantity || 1,
    input.wastePercent || 0,
    input.price || 0,
    input.priceUnit || "per_sq_ft",
  );

  return {
    ...breakdown,
    baseFt: parseFloat(bFt.toFixed(2)),
    heightFt: parseFloat(hFt.toFixed(2)),
  };
}

export interface TrapezoidInput {
  base1: number;
  base2: number;
  height: number;
  unit: LinearUnit;
  quantity?: number;
  wastePercent?: number;
  price?: number;
  priceUnit?: PriceUnit;
}

export function calculateTrapezoidArea(input: TrapezoidInput): AreaBreakdown & { base1Ft: number; base2Ft: number; heightFt: number } {
  const b1 = toFeet(input.base1, input.unit);
  const b2 = toFeet(input.base2, input.unit);
  const h = toFeet(input.height, input.unit);
  const rawSqFt = ((b1 + b2) / 2) * h;

  const breakdown = computeAreaOutputs(
    rawSqFt,
    input.quantity || 1,
    input.wastePercent || 0,
    input.price || 0,
    input.priceUnit || "per_sq_ft",
  );

  return {
    ...breakdown,
    base1Ft: parseFloat(b1.toFixed(2)),
    base2Ft: parseFloat(b2.toFixed(2)),
    heightFt: parseFloat(h.toFixed(2)),
  };
}

export interface ParallelogramInput {
  base: number;
  height: number;
  unit: LinearUnit;
  quantity?: number;
  wastePercent?: number;
  price?: number;
  priceUnit?: PriceUnit;
}

export function calculateParallelogramArea(input: ParallelogramInput): AreaBreakdown & { baseFt: number; heightFt: number } {
  const b = toFeet(input.base, input.unit);
  const h = toFeet(input.height, input.unit);
  const rawSqFt = b * h;

  const breakdown = computeAreaOutputs(
    rawSqFt,
    input.quantity || 1,
    input.wastePercent || 0,
    input.price || 0,
    input.priceUnit || "per_sq_ft",
  );

  return {
    ...breakdown,
    baseFt: parseFloat(b.toFixed(2)),
    heightFt: parseFloat(h.toFixed(2)),
  };
}

// ─── 4. Rectangular Border & Frame Calculation ──────────────────────────────

export interface RectangleBorderInput {
  outerLength: number;
  outerWidth: number;
  borderWidth: number;
  unit: LinearUnit;
  quantity?: number;
  wastePercent?: number;
  price?: number;
  priceUnit?: PriceUnit;
}

export interface RectangleBorderResult extends AreaBreakdown {
  outerLengthFt: number;
  outerWidthFt: number;
  innerLengthFt: number;
  innerWidthFt: number;
  borderWidthFt: number;
  innerAreaSqFt: number;
  outerAreaSqFt: number;
}

export function calculateRectangleBorderArea(input: RectangleBorderInput): RectangleBorderResult {
  const outLFt = toFeet(input.outerLength, input.unit);
  const outWFt = toFeet(input.outerWidth, input.unit);
  const borderFt = toFeet(input.borderWidth, input.unit);

  const inLFt = Math.max(outLFt - 2 * borderFt, 0);
  const inWFt = Math.max(outWFt - 2 * borderFt, 0);

  const outerArea = outLFt * outWFt;
  const innerArea = inLFt * inWFt;
  const rawSqFt = Math.max(outerArea - innerArea, 0);

  const breakdown = computeAreaOutputs(
    rawSqFt,
    input.quantity || 1,
    input.wastePercent || 0,
    input.price || 0,
    input.priceUnit || "per_sq_ft",
  );

  return {
    ...breakdown,
    outerLengthFt: parseFloat(outLFt.toFixed(2)),
    outerWidthFt: parseFloat(outWFt.toFixed(2)),
    innerLengthFt: parseFloat(inLFt.toFixed(2)),
    innerWidthFt: parseFloat(inWFt.toFixed(2)),
    borderWidthFt: parseFloat(borderFt.toFixed(2)),
    outerAreaSqFt: parseFloat(outerArea.toFixed(2)),
    innerAreaSqFt: parseFloat(innerArea.toFixed(2)),
  };
}

// ─── 5. Material Estimator Presets ──────────────────────────────────────────

export interface MaterialEstimation {
  tileBoxes: number;
  hardwoodCartons: number;
  paintGallons: number;
  sodRolls: number;
  carpetYards: number;
}

export function estimateMaterials(wasteSqFt: number): MaterialEstimation {
  const sqFt = Math.max(wasteSqFt, 0);

  // Tile boxes: standard box covers 10 sq ft
  const tileBoxes = Math.ceil(sqFt / 10);
  // Hardwood cartons: standard box covers 20 sq ft
  const hardwoodCartons = Math.ceil(sqFt / 20);
  // Paint gallons: 1 gallon covers ~350-400 sq ft (1 coat)
  const paintGallons = Math.ceil(sqFt / 350);
  // Sod / grass rolls: standard roll covers 10 sq ft (2 ft x 5 ft)
  const sodRolls = Math.ceil(sqFt / 10);
  // Carpet: in square yards
  const carpetYards = parseFloat((sqFt / 9).toFixed(2));

  return {
    tileBoxes,
    hardwoodCartons,
    paintGallons,
    sodRolls,
    carpetYards,
  };
}
