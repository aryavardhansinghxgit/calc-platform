/**
 * Pure Mathematical Engine for Mulch Calculator Suite
 * Dual Support for Imperial (yd³, ft³, lbs) and Metric / SI Units (m³, m², Liters, kg, kg/m², Tonnes)
 * Compliant with ANSI A300 Standards & Landscaping Soil Mechanics
 */

export type DimensionUnit = "feet" | "inches" | "yards" | "meters" | "centimeters";
export type DepthUnit = "inches" | "centimeters" | "feet";
export type MulchType = "hardwood_bark" | "pine_bark" | "shredded_cedar" | "rubber" | "compost" | "pea_gravel";
export type VehicleType = "midsize_truck" | "halfton_truck" | "threequarter_truck" | "utility_trailer";
export type BedShape = "rectangle" | "circle" | "ring" | "triangle";

export interface MulchDensityInfo {
  name: string;
  lbsPerCubicYard: number;
  kgPerCubicMeter: number;
  lbsPer2CuFtBag: number;
  kgPer56LBag: number;
  isOrganic: boolean;
}

export const MULCH_TYPES: Record<MulchType, MulchDensityInfo> = {
  hardwood_bark: { name: "Hardwood / Bark Mulch", lbsPerCubicYard: 800, kgPerCubicMeter: 475, lbsPer2CuFtBag: 30, kgPer56LBag: 13.6, isOrganic: true },
  pine_bark: { name: "Pine Bark Nuggets", lbsPerCubicYard: 600, kgPerCubicMeter: 355, lbsPer2CuFtBag: 22, kgPer56LBag: 10.0, isOrganic: true },
  shredded_cedar: { name: "Shredded Cedar Mulch", lbsPerCubicYard: 700, kgPerCubicMeter: 415, lbsPer2CuFtBag: 26, kgPer56LBag: 11.8, isOrganic: true },
  rubber: { name: "Recycled Rubber Mulch", lbsPerCubicYard: 400, kgPerCubicMeter: 237, lbsPer2CuFtBag: 15, kgPer56LBag: 6.8, isOrganic: false },
  compost: { name: "Rich Compost / Soil Blend", lbsPerCubicYard: 1200, kgPerCubicMeter: 712, lbsPer2CuFtBag: 45, kgPer56LBag: 20.4, isOrganic: true },
  pea_gravel: { name: "Decorative Pea Gravel", lbsPerCubicYard: 2400, kgPerCubicMeter: 1424, lbsPer2CuFtBag: 90, kgPer56LBag: 40.8, isOrganic: false },
};

export const VEHICLE_CAPACITIES: Record<VehicleType, { name: string; maxCubicYards: number; maxCubicMeters: number; maxPayloadLbs: number; maxPayloadKg: number }> = {
  midsize_truck: { name: "Midsize Pickup (Tacoma / Ranger)", maxCubicYards: 1.5, maxCubicMeters: 1.15, maxPayloadLbs: 1500, maxPayloadKg: 680 },
  halfton_truck: { name: "Full-Size 1/2-Ton (F-150 / Silverado 1500)", maxCubicYards: 2.5, maxCubicMeters: 1.9, maxPayloadLbs: 2000, maxPayloadKg: 907 },
  threequarter_truck: { name: "Heavy Duty 3/4-Ton (F-250 / 2500 HD)", maxCubicYards: 3.5, maxCubicMeters: 2.7, maxPayloadLbs: 3500, maxPayloadKg: 1587 },
  utility_trailer: { name: "Single-Axle Landscape Utility Trailer", maxCubicYards: 4.0, maxCubicMeters: 3.0, maxPayloadLbs: 4000, maxPayloadKg: 1814 },
};

export const convertDimensionToFeet = (val: number, unit: DimensionUnit): number => {
  switch (unit) {
    case "inches": return val / 12;
    case "yards": return val * 3;
    case "meters": return val * 3.28084;
    case "centimeters": return (val / 100) * 3.28084;
    case "feet":
    default: return val;
  }
};

export const convertDepthToInches = (val: number, unit: DepthUnit): number => {
  switch (unit) {
    case "centimeters": return val / 2.54;
    case "feet": return val * 12;
    case "inches":
    default: return val;
  }
};

// ─── CARD 1: RECTANGULAR & SQUARE BED ───────────────────────────────────────

export interface RectangularMulchInput {
  inputMode: "dimensions" | "total_area";
  length: number;
  lengthUnit: DimensionUnit;
  width: number;
  widthUnit: DimensionUnit;
  totalAreaSqFt?: number;

  depth: number;
  depthUnit: DepthUnit;
  mulchType: MulchType;
  
  pricePerBag?: number; // e.g. $4.25
  bagSizeCuFt?: number; // 1.5, 2.0, 3.0
  pricePerCubicYard?: number; // e.g. $38.00
  pricingType?: "per_bag" | "per_yard";
}

export interface RectangularMulchResult {
  areaSqFt: number;
  areaSqM: number;
  depthInches: number;
  depthCm: number;
  
  volumeCuFt: number;
  volumeCuYards: number;
  volumeCuMeters: number;
  volumeLiters: number;
  
  bags1_5CuFt: number;
  bags2_0CuFt: number;
  bags3_0CuFt: number;
  
  totalWeightLbs: number;
  totalWeightKg: number;
  totalWeightTons: number;
  totalWeightMetricTonnes: number;
  applicationRateKgPerM2: number;
  
  truckLoadsStandard: number; // 2 cu yd standard bed
  estimatedCost: number;
}

export function calculateRectangularMulch(input: RectangularMulchInput): RectangularMulchResult {
  let areaSqFt = 200;

  if (input.inputMode === "total_area" && input.totalAreaSqFt) {
    areaSqFt = input.totalAreaSqFt;
  } else {
    const lFt = convertDimensionToFeet(input.length || 20, input.lengthUnit || "feet");
    const wFt = convertDimensionToFeet(input.width || 10, input.widthUnit || "feet");
    areaSqFt = Math.max(0.1, lFt * wFt);
  }

  const areaSqM = Math.round(areaSqFt * 0.092903 * 100) / 100;
  const depthInches = Math.max(0.1, convertDepthToInches(input.depth || 3, input.depthUnit || "inches"));
  const depthCm = Math.round(depthInches * 2.54 * 10) / 10;
  const depthFeet = depthInches / 12;

  const volumeCuFt = areaSqFt * depthFeet;
  const volumeCuYards = volumeCuFt / 27;
  const volumeCuMeters = Math.round(volumeCuYards * 0.764555 * 100) / 100;
  const volumeLiters = Math.round(volumeCuMeters * 1000);

  const bags1_5CuFt = Math.ceil(volumeCuFt / 1.5);
  const bags2_0CuFt = Math.ceil(volumeCuFt / 2.0);
  const bags3_0CuFt = Math.ceil(volumeCuFt / 3.0);

  const density = MULCH_TYPES[input.mulchType || "hardwood_bark"] || MULCH_TYPES.hardwood_bark;
  const totalWeightLbs = Math.round(volumeCuYards * density.lbsPerCubicYard);
  const totalWeightKg = Math.round(totalWeightLbs * 0.453592);
  const totalWeightTons = Math.round((totalWeightLbs / 2000) * 100) / 100;
  const totalWeightMetricTonnes = Math.round((totalWeightKg / 1000) * 100) / 100;

  const applicationRateKgPerM2 = areaSqM > 0 ? Math.round((totalWeightKg / areaSqM) * 10) / 10 : 0;
  const truckLoadsStandard = Math.round((volumeCuYards / 2.0) * 10) / 10;

  let estimatedCost = 0;
  if (input.pricingType === "per_yard" && input.pricePerCubicYard) {
    estimatedCost = volumeCuYards * input.pricePerCubicYard;
  } else if (input.pricePerBag) {
    const selectedBags = input.bagSizeCuFt === 1.5 ? bags1_5CuFt : input.bagSizeCuFt === 3.0 ? bags3_0CuFt : bags2_0CuFt;
    estimatedCost = selectedBags * input.pricePerBag;
  }

  return {
    areaSqFt: Math.round(areaSqFt * 100) / 100,
    areaSqM,
    depthInches: Math.round(depthInches * 10) / 10,
    depthCm,

    volumeCuFt: Math.round(volumeCuFt * 10) / 10,
    volumeCuYards: Math.round(volumeCuYards * 100) / 100,
    volumeCuMeters,
    volumeLiters,

    bags1_5CuFt,
    bags2_0CuFt,
    bags3_0CuFt,

    totalWeightLbs,
    totalWeightKg,
    totalWeightTons,
    totalWeightMetricTonnes,
    applicationRateKgPerM2,

    truckLoadsStandard,
    estimatedCost: Math.round(estimatedCost * 100) / 100,
  };
}

// ─── CARD 2: CIRCULAR & TREE RING / DONUT BED ───────────────────────────────

export interface CircularMulchInput {
  mode: "full_circle" | "tree_ring";
  outerDiameter: number;
  outerDiameterUnit: DimensionUnit;
  innerDiameter: number; // trunk diameter or inner ring
  innerDiameterUnit: DimensionUnit;
  depthInches: number;
  mulchType: MulchType;
  pricePerBag?: number;
}

export interface CircularMulchResult {
  mode: "full_circle" | "tree_ring";
  outerAreaSqFt: number;
  innerAreaSqFt: number;
  netAreaSqFt: number;
  netAreaSqM: number;
  depthInches: number;
  depthCm: number;

  volumeCuFt: number;
  volumeCuYards: number;
  volumeCuMeters: number;
  volumeLiters: number;
  
  bags2_0CuFt: number;
  bags3_0CuFt: number;

  weightLbs: number;
  weightKg: number;
  weightMetricTonnes: number;
  applicationRateKgPerM2: number;
  
  treeSafetyStatus: "safe_donut" | "volcano_hazard";
  estimatedCost: number;
}

export function calculateCircularMulch(input: CircularMulchInput): CircularMulchResult {
  const outerDiaFt = convertDimensionToFeet(input.outerDiameter || 8, input.outerDiameterUnit || "feet");
  const outerRadiusFt = outerDiaFt / 2;
  const outerAreaSqFt = Math.PI * Math.pow(outerRadiusFt, 2);

  let innerAreaSqFt = 0;
  if (input.mode === "tree_ring") {
    const innerDiaFt = convertDimensionToFeet(input.innerDiameter || 1.5, input.innerDiameterUnit || "feet");
    const innerRadiusFt = innerDiaFt / 2;
    innerAreaSqFt = Math.PI * Math.pow(innerRadiusFt, 2);
  }

  const netAreaSqFt = Math.max(0.1, outerAreaSqFt - innerAreaSqFt);
  const netAreaSqM = Math.round(netAreaSqFt * 0.092903 * 100) / 100;
  const depthInches = Math.max(0.1, input.depthInches || 3);
  const depthCm = Math.round(depthInches * 2.54 * 10) / 10;
  const depthFeet = depthInches / 12;

  const volumeCuFt = netAreaSqFt * depthFeet;
  const volumeCuYards = volumeCuFt / 27;
  const volumeCuMeters = Math.round(volumeCuYards * 0.764555 * 100) / 100;
  const volumeLiters = Math.round(volumeCuMeters * 1000);

  const bags2_0CuFt = Math.ceil(volumeCuFt / 2.0);
  const bags3_0CuFt = Math.ceil(volumeCuFt / 3.0);

  const density = MULCH_TYPES[input.mulchType || "hardwood_bark"] || MULCH_TYPES.hardwood_bark;
  const weightLbs = Math.round(volumeCuYards * density.lbsPerCubicYard);
  const weightKg = Math.round(weightLbs * 0.453592);
  const weightMetricTonnes = Math.round((weightKg / 1000) * 100) / 100;
  const applicationRateKgPerM2 = netAreaSqM > 0 ? Math.round((weightKg / netAreaSqM) * 10) / 10 : 0;

  // Arboricultural Safety Rule: Keep mulch depth <= 4 inches and maintain a 3" to 6" gap from the trunk (Donut method)
  const treeSafetyStatus = depthInches > 4.5 || (input.mode === "full_circle" && outerDiaFt < 4)
    ? "volcano_hazard"
    : "safe_donut";

  const pricePerBag = input.pricePerBag || 0;
  const estimatedCost = bags2_0CuFt * pricePerBag;

  return {
    mode: input.mode,
    outerAreaSqFt: Math.round(outerAreaSqFt * 100) / 100,
    innerAreaSqFt: Math.round(innerAreaSqFt * 100) / 100,
    netAreaSqFt: Math.round(netAreaSqFt * 100) / 100,
    netAreaSqM,
    depthInches,
    depthCm,

    volumeCuFt: Math.round(volumeCuFt * 10) / 10,
    volumeCuYards: Math.round(volumeCuYards * 100) / 100,
    volumeCuMeters,
    volumeLiters,
    
    bags2_0CuFt,
    bags3_0CuFt,

    weightLbs,
    weightKg,
    weightMetricTonnes,
    applicationRateKgPerM2,
    
    treeSafetyStatus,
    estimatedCost: Math.round(estimatedCost * 100) / 100,
  };
}

// ─── CARD 3: MULTI-BED LANDSCAPE MASTER AGGREGATOR ──────────────────────────

export interface LandscapeBedSection {
  id: string;
  name: string;
  shape: BedShape;
  dim1: number; // Length or Diameter
  dim2: number; // Width or Inner Diameter
  depthInches: number;
}

export interface MultiBedInput {
  beds: LandscapeBedSection[];
  mulchType: MulchType;
  bagCost: number; // e.g. $4.00 per 2-cu-ft bag
  bulkCostPerYard: number; // e.g. $36.00 per cu yd
  deliveryFee: number; // e.g. $45.00
}

export interface MultiBedResult {
  totalSqFt: number;
  totalSqM: number;
  totalCuFt: number;
  totalCuYards: number;
  totalCuMeters: number;
  totalLiters: number;
  
  total2CuFtBags: number;
  totalWeightLbs: number;
  totalWeightKg: number;
  totalWeightTons: number;
  totalWeightMetricTonnes: number;
  avgApplicationRateKgPerM2: number;

  baggedTotalCost: number;
  bulkTotalCost: number;
  costDifference: number;
  recommendedOption: "buy_bags" | "buy_bulk";
}

export function calculateMultiBedLandscape(input: MultiBedInput): MultiBedResult {
  let totalSqFt = 0;
  let totalCuFt = 0;

  for (const bed of input.beds) {
    let bedSqFt = 0;
    const d1 = bed.dim1 || 10;
    const d2 = bed.dim2 || 5;

    if (bed.shape === "rectangle") {
      bedSqFt = d1 * d2;
    } else if (bed.shape === "circle") {
      bedSqFt = Math.PI * Math.pow(d1 / 2, 2);
    } else if (bed.shape === "ring") {
      const outerArea = Math.PI * Math.pow(d1 / 2, 2);
      const innerArea = Math.PI * Math.pow(d2 / 2, 2);
      bedSqFt = Math.max(0, outerArea - innerArea);
    } else if (bed.shape === "triangle") {
      bedSqFt = 0.5 * d1 * d2;
    }

    const depthFt = (bed.depthInches || 3) / 12;
    totalSqFt += bedSqFt;
    totalCuFt += bedSqFt * depthFt;
  }

  const totalSqM = Math.round(totalSqFt * 0.092903 * 100) / 100;
  const totalCuYards = totalCuFt / 27;
  const totalCuMeters = Math.round(totalCuYards * 0.764555 * 100) / 100;
  const totalLiters = Math.round(totalCuMeters * 1000);
  const total2CuFtBags = Math.ceil(totalCuFt / 2.0);

  const density = MULCH_TYPES[input.mulchType || "hardwood_bark"] || MULCH_TYPES.hardwood_bark;
  const totalWeightLbs = Math.round(totalCuYards * density.lbsPerCubicYard);
  const totalWeightKg = Math.round(totalWeightLbs * 0.453592);
  const totalWeightTons = Math.round((totalWeightLbs / 2000) * 100) / 100;
  const totalWeightMetricTonnes = Math.round((totalWeightKg / 1000) * 100) / 100;
  const avgApplicationRateKgPerM2 = totalSqM > 0 ? Math.round((totalWeightKg / totalSqM) * 10) / 10 : 0;

  const baggedTotalCost = total2CuFtBags * (input.bagCost || 4.0);
  const bulkTotalCost = (totalCuYards * (input.bulkCostPerYard || 36.0)) + (input.deliveryFee || 45.0);
  const costDifference = Math.abs(baggedTotalCost - bulkTotalCost);
  const recommendedOption = bulkTotalCost < baggedTotalCost && totalCuYards >= 3 ? "buy_bulk" : "buy_bags";

  return {
    totalSqFt: Math.round(totalSqFt * 100) / 100,
    totalSqM,
    totalCuFt: Math.round(totalCuFt * 10) / 10,
    totalCuYards: Math.round(totalCuYards * 100) / 100,
    totalCuMeters,
    totalLiters,

    total2CuFtBags,
    totalWeightLbs,
    totalWeightKg,
    totalWeightTons,
    totalWeightMetricTonnes,
    avgApplicationRateKgPerM2,

    baggedTotalCost: Math.round(baggedTotalCost * 100) / 100,
    bulkTotalCost: Math.round(bulkTotalCost * 100) / 100,
    costDifference: Math.round(costDifference * 100) / 100,
    recommendedOption,
  };
}

// ─── CARD 4: MULCH WEIGHT & TRUCK LOAD ESTIMATOR ────────────────────────────

export interface TruckLoadInput {
  totalCubicYards: number;
  mulchType: MulchType;
  vehicleType: VehicleType;
}

export interface TruckLoadResult {
  totalWeightLbs: number;
  totalWeightKg: number;
  totalWeightTons: number;
  totalWeightMetricTonnes: number;
  
  vehicleName: string;
  maxCubicYardsPerTrip: number;
  maxCubicMetersPerTrip: number;
  maxPayloadLbs: number;
  maxPayloadKg: number;
  
  tripsNeededByVolume: number;
  tripsNeededByWeight: number;
  tripsRecommended: number;
  
  isOverloadedPerTrip: boolean;
  weightUtilizationPercent: number;
  safetyStatus: "safe" | "caution" | "overloaded";
}

export function calculateTruckLoads(input: TruckLoadInput): TruckLoadResult {
  const yards = Math.max(0.1, input.totalCubicYards || 3);
  const density = MULCH_TYPES[input.mulchType || "hardwood_bark"] || MULCH_TYPES.hardwood_bark;
  const vehicle = VEHICLE_CAPACITIES[input.vehicleType || "halfton_truck"] || VEHICLE_CAPACITIES.halfton_truck;

  const totalWeightLbs = Math.round(yards * density.lbsPerCubicYard);
  const totalWeightKg = Math.round(totalWeightLbs * 0.453592);
  const totalWeightTons = Math.round((totalWeightLbs / 2000) * 100) / 100;
  const totalWeightMetricTonnes = Math.round((totalWeightKg / 1000) * 100) / 100;

  const tripsNeededByVolume = Math.ceil(yards / vehicle.maxCubicYards);
  const tripsNeededByWeight = Math.ceil(totalWeightLbs / vehicle.maxPayloadLbs);
  const tripsRecommended = Math.max(tripsNeededByVolume, tripsNeededByWeight);

  const weightPerTripLbs = totalWeightLbs / tripsRecommended;
  const weightUtilizationPercent = Math.round((weightPerTripLbs / vehicle.maxPayloadLbs) * 100);

  let safetyStatus: "safe" | "caution" | "overloaded" = "safe";
  let isOverloadedPerTrip = false;

  if (weightUtilizationPercent > 100) {
    safetyStatus = "overloaded";
    isOverloadedPerTrip = true;
  } else if (weightUtilizationPercent > 85) {
    safetyStatus = "caution";
  }

  return {
    totalWeightLbs,
    totalWeightKg,
    totalWeightTons,
    totalWeightMetricTonnes,
    
    vehicleName: vehicle.name,
    maxCubicYardsPerTrip: vehicle.maxCubicYards,
    maxCubicMetersPerTrip: vehicle.maxCubicMeters,
    maxPayloadLbs: vehicle.maxPayloadLbs,
    maxPayloadKg: vehicle.maxPayloadKg,

    tripsNeededByVolume,
    tripsNeededByWeight,
    tripsRecommended,

    isOverloadedPerTrip,
    weightUtilizationPercent,
    safetyStatus,
  };
}
