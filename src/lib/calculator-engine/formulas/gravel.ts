/**
 * Pure Mathematical Calculation Engine for Gravel Calculator Suite
 * Dual Support for Imperial (yd³, ft³, Tons, lbs) and Metric / SI Units (m³, m², Tonnes, kg, kg/m²)
 * Compliant with ASTM C33 / AASHTO Aggregate Standards & Civil Engineering Practices
 */

export type DimensionUnit = "feet" | "inches" | "yards" | "meters" | "centimeters";
export type DepthUnit = "inches" | "centimeters" | "feet";
export type GravelShape = "rectangle" | "circle" | "triangle";
export type GravelType =
  | "pea_gravel"
  | "crushed_stone_57"
  | "crusher_run"
  | "river_rock"
  | "decomposed_granite"
  | "crushed_stone_411"
  | "custom";

export interface GravelDensityInfo {
  name: string;
  tonsPerCubicYard: number; // short tons (2,000 lbs)
  lbsPerCubicYard: number;
  kgPerCubicMeter: number;
  defaultCompactionPct: number; // typical settlement %
  description: string;
}

export const GRAVEL_TYPES: Record<GravelType, GravelDensityInfo> = {
  pea_gravel: {
    name: "Pea Gravel (3/8\" smooth)",
    tonsPerCubicYard: 1.39,
    lbsPerCubicYard: 2780,
    kgPerCubicMeter: 1650,
    defaultCompactionPct: 5,
    description: "Smooth, rounded stones ideal for walkways, patios, and dog runs.",
  },
  crushed_stone_57: {
    name: "Crushed Stone #57 (3/4\" clean)",
    tonsPerCubicYard: 1.42,
    lbsPerCubicYard: 2840,
    kgPerCubicMeter: 1685,
    defaultCompactionPct: 8,
    description: "Standard angular drainage rock for driveways, French drains, and concrete.",
  },
  crusher_run: {
    name: "Crusher Run / Dense Grade / Road Base",
    tonsPerCubicYard: 1.60,
    lbsPerCubicYard: 3200,
    kgPerCubicMeter: 1900,
    defaultCompactionPct: 20,
    description: "Crushed rock blended with stone dust; compacts extremely hard for driveway bases.",
  },
  river_rock: {
    name: "River Rock (1\" - 3\" rounded)",
    tonsPerCubicYard: 1.50,
    lbsPerCubicYard: 3000,
    kgPerCubicMeter: 1780,
    defaultCompactionPct: 5,
    description: "Decorative landscaping stone, dry creek beds, and water features.",
  },
  decomposed_granite: {
    name: "Decomposed Granite (DG)",
    tonsPerCubicYard: 1.45,
    lbsPerCubicYard: 2900,
    kgPerCubicMeter: 1720,
    defaultCompactionPct: 15,
    description: "Fine, granitic material that packs tightly for rustic pathways and bocce courts.",
  },
  crushed_stone_411: {
    name: "Crushed Stone #411 (#57 with dust)",
    tonsPerCubicYard: 1.55,
    lbsPerCubicYard: 3100,
    kgPerCubicMeter: 1840,
    defaultCompactionPct: 18,
    description: "Heavy-duty base material with stone fines for paving sub-bases.",
  },
  custom: {
    name: "Custom Aggregate Density",
    tonsPerCubicYard: 1.40,
    lbsPerCubicYard: 2800,
    kgPerCubicMeter: 1660,
    defaultCompactionPct: 10,
    description: "User-defined custom quarry aggregate density.",
  },
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

// ─── CARD 1: RECTANGULAR, CIRCULAR & TRIANGULAR GRAVEL ESTIMATOR ────────────

export interface GravelEstimatorInput {
  shape: GravelShape;
  length: number;
  lengthUnit: DimensionUnit;
  width: number;
  widthUnit: DimensionUnit;
  diameter: number;
  diameterUnit: DimensionUnit;
  totalAreaSqFt?: number;

  depth: number;
  depthUnit: DepthUnit;
  gravelType: GravelType;
  customDensityLbsPerCuYd?: number;

  compactionPct: number; // e.g. 10%
  wastePct: number; // e.g. 5%

  pricePerUnit?: number;
  pricingType?: "per_ton" | "per_yard" | "per_bag";
}

export interface GravelEstimatorResult {
  areaSqFt: number;
  areaSqM: number;
  depthInches: number;
  depthCm: number;

  netVolumeCuYards: number;
  netVolumeCuFt: number;
  netVolumeCuMeters: number;

  adjustedVolumeCuYards: number;
  adjustedVolumeCuFt: number;
  adjustedVolumeCuMeters: number;

  weightLbs: number;
  weightShortTons: number;
  weightMetricTonnes: number;
  weightKg: number;
  applicationRateKgPerM2: number;

  bags50lb: number;
  truckLoads10Ton: number;
  estimatedCost: number;
}

export function calculateGravelEstimator(input: GravelEstimatorInput): GravelEstimatorResult {
  let areaSqFt = 200;

  if (input.totalAreaSqFt && input.totalAreaSqFt > 0) {
    areaSqFt = input.totalAreaSqFt;
  } else if (input.shape === "circle") {
    const diaFt = convertDimensionToFeet(input.diameter || 16, input.diameterUnit || "feet");
    areaSqFt = Math.PI * Math.pow(diaFt / 2, 2);
  } else if (input.shape === "triangle") {
    const baseFt = convertDimensionToFeet(input.length || 20, input.lengthUnit || "feet");
    const heightFt = convertDimensionToFeet(input.width || 10, input.widthUnit || "feet");
    areaSqFt = 0.5 * baseFt * heightFt;
  } else {
    // rectangle
    const lFt = convertDimensionToFeet(input.length || 30, input.lengthUnit || "feet");
    const wFt = convertDimensionToFeet(input.width || 10, input.widthUnit || "feet");
    areaSqFt = Math.max(0.1, lFt * wFt);
  }

  const areaSqM = Math.round(areaSqFt * 0.092903 * 100) / 100;
  const depthInches = Math.max(0.1, convertDepthToInches(input.depth || 4, input.depthUnit || "inches"));
  const depthCm = Math.round(depthInches * 2.54 * 10) / 10;
  const depthFeet = depthInches / 12;

  // Net Volume
  const netVolumeCuFt = areaSqFt * depthFeet;
  const netVolumeCuYards = netVolumeCuFt / 27;
  const netVolumeCuMeters = netVolumeCuYards * 0.764555;

  // Compaction & Waste Multipliers
  const compactionMultiplier = 1 + (input.compactionPct || 0) / 100;
  const wasteMultiplier = 1 + (input.wastePct || 0) / 100;

  const adjustedVolumeCuYards = netVolumeCuYards * compactionMultiplier * wasteMultiplier;
  const adjustedVolumeCuFt = adjustedVolumeCuYards * 27;
  const adjustedVolumeCuMeters = adjustedVolumeCuYards * 0.764555;

  // Density Calculation
  let lbsPerCuYd = 2840;
  if (input.gravelType === "custom" && input.customDensityLbsPerCuYd) {
    lbsPerCuYd = input.customDensityLbsPerCuYd;
  } else {
    const info = GRAVEL_TYPES[input.gravelType || "crushed_stone_57"] || GRAVEL_TYPES.crushed_stone_57;
    lbsPerCuYd = info.lbsPerCubicYard;
  }

  const weightLbs = Math.round(adjustedVolumeCuYards * lbsPerCuYd);
  const weightShortTons = Math.round((weightLbs / 2000) * 100) / 100;
  const weightKg = Math.round(weightLbs * 0.453592);
  const weightMetricTonnes = Math.round((weightKg / 1000) * 100) / 100;

  const applicationRateKgPerM2 = areaSqM > 0 ? Math.round((weightKg / areaSqM) * 10) / 10 : 0;
  const bags50lb = Math.ceil(weightLbs / 50);
  const truckLoads10Ton = Math.ceil(weightShortTons / 10);

  // Price Calculation
  let estimatedCost = 0;
  const price = input.pricePerUnit || 0;
  if (price > 0) {
    if (input.pricingType === "per_yard") {
      estimatedCost = adjustedVolumeCuYards * price;
    } else if (input.pricingType === "per_bag") {
      estimatedCost = bags50lb * price;
    } else {
      // per_ton default
      estimatedCost = weightShortTons * price;
    }
  }

  return {
    areaSqFt: Math.round(areaSqFt * 100) / 100,
    areaSqM,
    depthInches: Math.round(depthInches * 10) / 10,
    depthCm,

    netVolumeCuYards: Math.round(netVolumeCuYards * 100) / 100,
    netVolumeCuFt: Math.round(netVolumeCuFt * 10) / 10,
    netVolumeCuMeters: Math.round(netVolumeCuMeters * 100) / 100,

    adjustedVolumeCuYards: Math.round(adjustedVolumeCuYards * 100) / 100,
    adjustedVolumeCuFt: Math.round(adjustedVolumeCuFt * 10) / 10,
    adjustedVolumeCuMeters: Math.round(adjustedVolumeCuMeters * 100) / 100,

    weightLbs,
    weightShortTons,
    weightMetricTonnes,
    weightKg,
    applicationRateKgPerM2,

    bags50lb,
    truckLoads10Ton,
    estimatedCost: Math.round(estimatedCost * 100) / 100,
  };
}

// ─── CARD 2: GRAVEL COST & DELIVERY BUDGET ESTIMATOR ────────────────────────

export interface GravelCostInput {
  totalTons: number;
  totalCuYards: number;
  pricingBasis: "per_ton" | "per_yard";
  materialUnitPrice: number; // e.g. $45.00/ton
  deliveryFlatFee: number; // e.g. $75.00
  salesTaxPct: number; // e.g. 7%
  laborCostPerTon?: number; // e.g. $25.00/ton
  totalSqFt?: number;
}

export interface GravelCostResult {
  materialSubtotal: number;
  deliveryFee: number;
  laborSubtotal: number;
  salesTaxAmount: number;
  grandTotalCost: number;
  costPerSqFt: number;
}

export function calculateGravelCost(input: GravelCostInput): GravelCostResult {
  const tons = Math.max(0.1, input.totalTons || 5);
  const yards = Math.max(0.1, input.totalCuYards || 3.5);

  let materialSubtotal = 0;
  if (input.pricingBasis === "per_yard") {
    materialSubtotal = yards * (input.materialUnitPrice || 45);
  } else {
    materialSubtotal = tons * (input.materialUnitPrice || 45);
  }

  const deliveryFee = input.deliveryFlatFee || 0;
  const laborSubtotal = tons * (input.laborCostPerTon || 0);

  const taxableAmount = materialSubtotal;
  const salesTaxAmount = taxableAmount * ((input.salesTaxPct || 0) / 100);

  const grandTotalCost = materialSubtotal + deliveryFee + laborSubtotal + salesTaxAmount;
  const sqFt = input.totalSqFt || 300;
  const costPerSqFt = sqFt > 0 ? Math.round((grandTotalCost / sqFt) * 100) / 100 : 0;

  return {
    materialSubtotal: Math.round(materialSubtotal * 100) / 100,
    deliveryFee: Math.round(deliveryFee * 100) / 100,
    laborSubtotal: Math.round(laborSubtotal * 100) / 100,
    salesTaxAmount: Math.round(salesTaxAmount * 100) / 100,
    grandTotalCost: Math.round(grandTotalCost * 100) / 100,
    costPerSqFt,
  };
}

// ─── CARD 3: MULTI-ZONE PROJECT MASTER AGGREGATOR ───────────────────────────

export interface GravelZoneSection {
  id: string;
  name: string;
  shape: GravelShape;
  dim1: number; // Length or Diameter (ft)
  dim2: number; // Width (ft)
  depthInches: number;
  gravelType: GravelType;
}

export interface MultiZoneGravelInput {
  zones: GravelZoneSection[];
  compactionPct: number;
  wastePct: number;
  pricePerTon: number;
  deliveryFee: number;
}

export interface MultiZoneGravelResult {
  totalSqFt: number;
  totalSqM: number;
  totalCuYards: number;
  totalCuMeters: number;
  totalShortTons: number;
  totalMetricTonnes: number;
  totalWeightKg: number;
  avgApplicationRateKgPerM2: number;
  totalBags50lb: number;
  totalTruckloads: number;
  grandTotalCost: number;
}

export function calculateMultiZoneGravel(input: MultiZoneGravelInput): MultiZoneGravelResult {
  let totalSqFt = 0;
  let totalCuYards = 0;
  let totalWeightLbs = 0;

  const compactionMultiplier = 1 + (input.compactionPct || 10) / 100;
  const wasteMultiplier = 1 + (input.wastePct || 5) / 100;

  for (const zone of input.zones) {
    let zoneSqFt = 0;
    const d1 = zone.dim1 || 20;
    const d2 = zone.dim2 || 10;

    if (zone.shape === "circle") {
      zoneSqFt = Math.PI * Math.pow(d1 / 2, 2);
    } else if (zone.shape === "triangle") {
      zoneSqFt = 0.5 * d1 * d2;
    } else {
      zoneSqFt = d1 * d2;
    }

    const depthFt = (zone.depthInches || 4) / 12;
    const zoneCuYards = (zoneSqFt * depthFt) / 27;
    const adjustedZoneCuYards = zoneCuYards * compactionMultiplier * wasteMultiplier;

    const densityInfo = GRAVEL_TYPES[zone.gravelType || "crushed_stone_57"] || GRAVEL_TYPES.crushed_stone_57;
    const zoneWeightLbs = adjustedZoneCuYards * densityInfo.lbsPerCubicYard;

    totalSqFt += zoneSqFt;
    totalCuYards += adjustedZoneCuYards;
    totalWeightLbs += zoneWeightLbs;
  }

  const totalSqM = Math.round(totalSqFt * 0.092903 * 100) / 100;
  const totalCuMeters = Math.round(totalCuYards * 0.764555 * 100) / 100;
  const totalShortTons = Math.round((totalWeightLbs / 2000) * 100) / 100;
  const totalWeightKg = Math.round(totalWeightLbs * 0.453592);
  const totalMetricTonnes = Math.round((totalWeightKg / 1000) * 100) / 100;
  const avgApplicationRateKgPerM2 = totalSqM > 0 ? Math.round((totalWeightKg / totalSqM) * 10) / 10 : 0;

  const totalBags50lb = Math.ceil(totalWeightLbs / 50);
  const totalTruckloads = Math.ceil(totalShortTons / 10);
  const grandTotalCost = Math.round(totalShortTons * (input.pricePerTon || 45) + (input.deliveryFee || 65));

  return {
    totalSqFt: Math.round(totalSqFt * 100) / 100,
    totalSqM,
    totalCuYards: Math.round(totalCuYards * 100) / 100,
    totalCuMeters,
    totalShortTons,
    totalMetricTonnes,
    totalWeightKg,
    avgApplicationRateKgPerM2,
    totalBags50lb,
    totalTruckloads,
    grandTotalCost,
  };
}

// ─── CARD 4: SUB-BASE & FRENCH DRAIN / DRAINAGE TRENCH ───────────────────────

export interface DrainageTrenchInput {
  trenchLengthFt: number;
  trenchWidthInches: number;
  totalDepthInches: number;
  pipeDiameterInches: number; // 0, 4, or 6 inches
  gravelBeddingDepthInches: number;
  gravelType: GravelType;
}

export interface DrainageTrenchResult {
  trenchLengthFt: number;
  trenchWidthFt: number;
  trenchDepthFt: number;
  
  trenchGrossVolumeCuYards: number;
  pipeDisplacementCuYards: number;
  netGravelCuYards: number;
  netGravelCuMeters: number;

  gravelWeightShortTons: number;
  gravelWeightMetricTonnes: number;
  gravelWeightKg: number;
  
  fabricLengthFt: number;
  fabricAreaSqFt: number;
  fabricAreaSqM: number;
  bags50lb: number;
}

export function calculateDrainageTrench(input: DrainageTrenchInput): DrainageTrenchResult {
  const lengthFt = Math.max(1, input.trenchLengthFt || 50);
  const widthIn = Math.max(4, input.trenchWidthInches || 12);
  const totalDepthIn = Math.max(6, input.totalDepthInches || 18);
  const pipeDiaIn = input.pipeDiameterInches || 4;

  const widthFt = widthIn / 12;
  const depthFt = totalDepthIn / 12;

  // Gross trench volume
  const grossCuFt = lengthFt * widthFt * depthFt;
  const grossCuYards = grossCuFt / 27;

  // Pipe displacement volume
  let pipeDisplacementCuFt = 0;
  if (pipeDiaIn > 0) {
    const pipeRadiusFt = (pipeDiaIn / 2) / 12;
    pipeDisplacementCuFt = Math.PI * Math.pow(pipeRadiusFt, 2) * lengthFt;
  }
  const pipeDisplacementCuYards = pipeDisplacementCuFt / 27;

  // Net gravel volume
  const netCuFt = Math.max(0.1, grossCuFt - pipeDisplacementCuFt);
  const netGravelCuYards = Math.round((netCuFt / 27) * 1.10 * 100) / 100; // +10% compaction
  const netGravelCuMeters = Math.round(netGravelCuYards * 0.764555 * 100) / 100;

  const density = GRAVEL_TYPES[input.gravelType || "crushed_stone_57"] || GRAVEL_TYPES.crushed_stone_57;
  const gravelWeightLbs = netGravelCuYards * density.lbsPerCubicYard;
  const gravelWeightShortTons = Math.round((gravelWeightLbs / 2000) * 100) / 100;
  const gravelWeightKg = Math.round(gravelWeightLbs * 0.453592);
  const gravelWeightMetricTonnes = Math.round((gravelWeightKg / 1000) * 100) / 100;

  // Geotextile Fabric Envelope: Width = trench width + (2 * depth) + 1 ft overlap
  const fabricPerimeterWidthFt = widthFt + (2 * depthFt) + 1.0;
  const fabricAreaSqFt = Math.round(lengthFt * fabricPerimeterWidthFt * 10) / 10;
  const fabricAreaSqM = Math.round(fabricAreaSqFt * 0.092903 * 10) / 10;
  const bags50lb = Math.ceil(gravelWeightLbs / 50);

  return {
    trenchLengthFt: lengthFt,
    trenchWidthFt: Math.round(widthFt * 100) / 100,
    trenchDepthFt: Math.round(depthFt * 100) / 100,

    trenchGrossVolumeCuYards: Math.round(grossCuYards * 100) / 100,
    pipeDisplacementCuYards: Math.round(pipeDisplacementCuYards * 100) / 100,
    netGravelCuYards,
    netGravelCuMeters,

    gravelWeightShortTons,
    gravelWeightMetricTonnes,
    gravelWeightKg,

    fabricLengthFt: lengthFt,
    fabricAreaSqFt,
    fabricAreaSqM,
    bags50lb,
  };
}
