// ──────────────────────────────────────────────────────────────────────────────
// Concrete Calculator — Formula Engine
// Pure functions for volume, weight, bag, truck, mix & cost estimation.
// ──────────────────────────────────────────────────────────────────────────────

// ─── Types ───────────────────────────────────────────────────────────────────

export type LengthUnit = "feet" | "inches" | "yards" | "meters" | "centimeters";

export interface ConcreteResult {
  cubicFeet: number;
  cubicYards: number;
  cubicMeters: number;
  weightLbs: number;
  weightKg: number;
  bags40lb: number;
  bags50lb: number;
  bags60lb: number;
  bags80lb: number;
  truckLoads: number;
}

export interface MixBreakdown {
  cementLbs: number;
  sandLbs: number;
  aggregateLbs: number;
  waterGallons: number;
  flyAshLbs: number;
}

export interface CostEstimate {
  bags40Total: number;
  bags50Total: number;
  bags60Total: number;
  bags80Total: number;
  readyMixTotal: number;
}

export type MixRatioPreset = "1:2:4" | "1:1.5:3" | "1:2:3" | "1:3:6";

// ─── Constants ───────────────────────────────────────────────────────────────

/** Default density: pre-mixed concrete in lbs/ft³ */
export const DEFAULT_CONCRETE_DENSITY_LBS_PER_CUFT = 133;

/** Bag coverage in cubic feet per bag */
const BAG_COVERAGE_CUFT: Record<number, number> = {
  40: 0.30,
  50: 0.375,
  60: 0.45,
  80: 0.60,
};

/** Typical ready-mix truck capacity in cubic yards */
const TRUCK_CAPACITY_CUYD = 10;

/** Mix ratio definitions: parts cement : sand : aggregate */
const MIX_RATIOS: Record<MixRatioPreset, { cement: number; sand: number; aggregate: number }> = {
  "1:2:4": { cement: 1, sand: 2, aggregate: 4 },
  "1:1.5:3": { cement: 1, sand: 1.5, aggregate: 3 },
  "1:2:3": { cement: 1, sand: 2, aggregate: 3 },
  "1:3:6": { cement: 1, sand: 3, aggregate: 6 },
};

/** Cement density: ~94 lbs per cubic foot */
const CEMENT_DENSITY_LBS_PER_CUFT = 94;

// ─── Unit Conversion ─────────────────────────────────────────────────────────

export function convertToFeet(value: number, fromUnit: LengthUnit): number {
  switch (fromUnit) {
    case "feet":
      return value;
    case "inches":
      return value / 12;
    case "yards":
      return value * 3;
    case "meters":
      return value * 3.28084;
    case "centimeters":
      return value * 0.0328084;
    default:
      return value;
  }
}

// ─── Bag & Truck Estimation ──────────────────────────────────────────────────

export function estimateBags(cubicFeet: number): Pick<ConcreteResult, "bags40lb" | "bags50lb" | "bags60lb" | "bags80lb"> {
  return {
    bags40lb: Math.ceil(cubicFeet / BAG_COVERAGE_CUFT[40]),
    bags50lb: Math.ceil(cubicFeet / BAG_COVERAGE_CUFT[50]),
    bags60lb: Math.ceil(cubicFeet / BAG_COVERAGE_CUFT[60]),
    bags80lb: Math.ceil(cubicFeet / BAG_COVERAGE_CUFT[80]),
  };
}

export function estimateTruckLoads(cubicYards: number): number {
  if (cubicYards <= 0) return 0;
  return Math.ceil(cubicYards / TRUCK_CAPACITY_CUYD);
}

// ─── Core Result Builder ─────────────────────────────────────────────────────

function buildResult(cubicFeet: number, density: number = DEFAULT_CONCRETE_DENSITY_LBS_PER_CUFT): ConcreteResult {
  const cubicYards = cubicFeet / 27;
  const cubicMeters = cubicFeet * 0.0283168;
  const weightLbs = cubicFeet * density;
  const weightKg = weightLbs * 0.453592;
  const bags = estimateBags(cubicFeet);
  const truckLoads = estimateTruckLoads(cubicYards);
  return {
    cubicFeet: parseFloat(cubicFeet.toFixed(2)),
    cubicYards: parseFloat(cubicYards.toFixed(2)),
    cubicMeters: parseFloat(cubicMeters.toFixed(2)),
    weightLbs: parseFloat(weightLbs.toFixed(2)),
    weightKg: parseFloat(weightKg.toFixed(2)),
    ...bags,
    truckLoads,
  };
}

// ─── Calculator Functions ────────────────────────────────────────────────────

/**
 * Card 1: Slabs, Square Footings, or Walls
 * V = l × w × h × qty × (1 + wastage/100)
 */
export function calculateSlabVolume(
  length: number,
  width: number,
  height: number,
  lengthUnit: LengthUnit,
  widthUnit: LengthUnit,
  heightUnit: LengthUnit,
  quantity: number = 1,
  wastagePercent: number = 0,
  density: number = DEFAULT_CONCRETE_DENSITY_LBS_PER_CUFT,
): ConcreteResult {
  const lFt = convertToFeet(Math.max(0, length), lengthUnit);
  const wFt = convertToFeet(Math.max(0, width), widthUnit);
  const hFt = convertToFeet(Math.max(0, height), heightUnit);
  const qty = Math.max(1, Math.round(quantity));
  const wastageMultiplier = 1 + Math.max(0, wastagePercent) / 100;
  const cubicFeet = lFt * wFt * hFt * qty * wastageMultiplier;
  return buildResult(cubicFeet, density);
}

/**
 * Card 2: Hole, Column, or Round Footings
 * V = π × (d/2)² × h × qty × (1 + wastage/100)
 */
export function calculateColumnVolume(
  diameter: number,
  height: number,
  diameterUnit: LengthUnit,
  heightUnit: LengthUnit,
  quantity: number = 1,
  wastagePercent: number = 0,
  density: number = DEFAULT_CONCRETE_DENSITY_LBS_PER_CUFT,
): ConcreteResult {
  const dFt = convertToFeet(Math.max(0, diameter), diameterUnit);
  const hFt = convertToFeet(Math.max(0, height), heightUnit);
  const qty = Math.max(1, Math.round(quantity));
  const wastageMultiplier = 1 + Math.max(0, wastagePercent) / 100;
  const radius = dFt / 2;
  const cubicFeet = Math.PI * radius * radius * hFt * qty * wastageMultiplier;
  return buildResult(cubicFeet, density);
}

/**
 * Card 3: Circular Slab or Tube
 * V = π × ((d1/2)² − (d2/2)²) × h × qty × (1 + wastage/100)
 */
export function calculateTubeVolume(
  outerDiameter: number,
  innerDiameter: number,
  height: number,
  outerUnit: LengthUnit,
  innerUnit: LengthUnit,
  heightUnit: LengthUnit,
  quantity: number = 1,
  wastagePercent: number = 0,
  density: number = DEFAULT_CONCRETE_DENSITY_LBS_PER_CUFT,
): ConcreteResult {
  const d1Ft = convertToFeet(Math.max(0, outerDiameter), outerUnit);
  const d2Ft = convertToFeet(Math.max(0, innerDiameter), innerUnit);
  const hFt = convertToFeet(Math.max(0, height), heightUnit);
  const qty = Math.max(1, Math.round(quantity));
  const wastageMultiplier = 1 + Math.max(0, wastagePercent) / 100;
  const r1 = d1Ft / 2;
  const r2 = d2Ft / 2;
  const cubicFeet = Math.PI * (r1 * r1 - r2 * r2) * hFt * qty * wastageMultiplier;
  return buildResult(Math.max(0, cubicFeet), density);
}

/**
 * Card 4: Curb & Gutter Barrier
 * Cross-section: L-shaped profile = (curbDepth × curbHeight) + (gutterWidth × flagThickness)
 * V = crossSectionArea × length × qty
 */
export function calculateCurbVolume(
  curbDepth: number,
  gutterWidth: number,
  curbHeight: number,
  flagThickness: number,
  length: number,
  curbDepthUnit: LengthUnit,
  gutterWidthUnit: LengthUnit,
  curbHeightUnit: LengthUnit,
  flagThicknessUnit: LengthUnit,
  lengthUnit: LengthUnit,
  quantity: number = 1,
): ConcreteResult {
  const cdFt = convertToFeet(Math.max(0, curbDepth), curbDepthUnit);
  const gwFt = convertToFeet(Math.max(0, gutterWidth), gutterWidthUnit);
  const chFt = convertToFeet(Math.max(0, curbHeight), curbHeightUnit);
  const ftFt = convertToFeet(Math.max(0, flagThickness), flagThicknessUnit);
  const lFt = convertToFeet(Math.max(0, length), lengthUnit);
  const qty = Math.max(1, Math.round(quantity));

  // L-profile: vertical curb + horizontal gutter flag
  const crossSectionArea = (cdFt * chFt) + (gwFt * ftFt);
  const cubicFeet = crossSectionArea * lFt * qty;
  return buildResult(cubicFeet);
}

/**
 * Card 5: Stairs Calculator
 * Each step is a rectangular block: run × rise × width
 * Steps form a cumulative staircase: step i has height = rise × i
 * Total = sum of all step blocks + platform slab
 * Simplified: V = width × numRisers × run × rise / 2 + width × platformDepth × rise × numRisers
 * More accurately: V = width × [ Σ(i=1..n)(run × rise) + platformDepth × (rise × n) ]
 * Using the standard stepped approach:
 * stepVolume = width × run × rise × n  (each step is same size, stacked cumulatively)
 * triangleVolume = width × (run × n) × (rise × n) / 2
 * platformVolume = width × platformDepth × (rise × n)
 */
export function calculateStairsVolume(
  run: number,
  rise: number,
  width: number,
  platformDepth: number,
  numRisers: number,
  runUnit: LengthUnit,
  riseUnit: LengthUnit,
  widthUnit: LengthUnit,
  platformUnit: LengthUnit,
): ConcreteResult {
  const runFt = convertToFeet(Math.max(0, run), runUnit);
  const riseFt = convertToFeet(Math.max(0, rise), riseUnit);
  const widthFt = convertToFeet(Math.max(0, width), widthUnit);
  const platFt = convertToFeet(Math.max(0, platformDepth), platformUnit);
  const n = Math.max(1, Math.round(numRisers));

  // Concrete stairs are solid concrete poured as a wedge shape
  // The volume = width × [ (totalRun × totalRise / 2) + platformDepth × totalRise ]
  // where totalRun = run × n, totalRise = rise × n
  // But more accurately, each step adds its own block
  // Step i (1-indexed) has dimensions: run × (rise × i) — but that's the full height
  // Standard approach: sum of rectangular steps
  // Step 1: run × rise × width
  // Step 2: run × (2 × rise) × width  ... etc.
  // Total = run × width × rise × Σ(i=1..n)(i) = run × width × rise × n(n+1)/2

  const stepsVolume = runFt * widthFt * riseFt * (n * (n + 1)) / 2;

  // Platform: a slab on top
  const platformVolume = platFt * widthFt * (riseFt * n);

  const totalCubicFeet = stepsVolume + platformVolume;
  return buildResult(totalCubicFeet);
}

// ─── Mix Material Estimation ─────────────────────────────────────────────────

/**
 * Estimate cement, sand, aggregate quantities for site-mixed concrete.
 * Based on mix ratio and total volume.
 */
export function estimateMixMaterials(
  cubicFeet: number,
  ratio: MixRatioPreset = "1:2:4",
  flyAshReplacementPercent: number = 0,
): MixBreakdown {
  if (cubicFeet <= 0) {
    return { cementLbs: 0, sandLbs: 0, aggregateLbs: 0, waterGallons: 0, flyAshLbs: 0 };
  }

  const mix = MIX_RATIOS[ratio] || MIX_RATIOS["1:2:4"];
  const totalParts = mix.cement + mix.sand + mix.aggregate;

  // Total weight of concrete
  const totalWeightLbs = cubicFeet * DEFAULT_CONCRETE_DENSITY_LBS_PER_CUFT;

  // Dry materials make up ~75% of total weight (rest is water)
  const dryWeightLbs = totalWeightLbs * 0.75;

  let cementLbs = (mix.cement / totalParts) * dryWeightLbs;
  const sandLbs = (mix.sand / totalParts) * dryWeightLbs;
  const aggregateLbs = (mix.aggregate / totalParts) * dryWeightLbs;

  // Fly ash replacement
  const flyAshPct = Math.max(0, Math.min(50, flyAshReplacementPercent)) / 100;
  const flyAshLbs = cementLbs * flyAshPct;
  cementLbs = cementLbs * (1 - flyAshPct);

  // Water: approximately 5-6 gallons per bag of cement (94 lbs)
  const cementBags = (cementLbs + flyAshLbs) / CEMENT_DENSITY_LBS_PER_CUFT;
  const waterGallons = cementBags * 5.5;

  return {
    cementLbs: parseFloat(cementLbs.toFixed(1)),
    sandLbs: parseFloat(sandLbs.toFixed(1)),
    aggregateLbs: parseFloat(aggregateLbs.toFixed(1)),
    waterGallons: parseFloat(waterGallons.toFixed(1)),
    flyAshLbs: parseFloat(flyAshLbs.toFixed(1)),
  };
}

// ─── Cost Estimation ─────────────────────────────────────────────────────────

export function estimateCost(
  result: ConcreteResult,
  costPerBag40: number = 0,
  costPerBag50: number = 0,
  costPerBag60: number = 0,
  costPerBag80: number = 0,
  costPerCubicYard: number = 0,
): CostEstimate {
  return {
    bags40Total: parseFloat((result.bags40lb * costPerBag40).toFixed(2)),
    bags50Total: parseFloat((result.bags50lb * costPerBag50).toFixed(2)),
    bags60Total: parseFloat((result.bags60lb * costPerBag60).toFixed(2)),
    bags80Total: parseFloat((result.bags80lb * costPerBag80).toFixed(2)),
    readyMixTotal: parseFloat((result.cubicYards * costPerCubicYard).toFixed(2)),
  };
}
