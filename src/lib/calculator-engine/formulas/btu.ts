/**
 * Pure mathematical calculation engine for BTU (British Thermal Unit) Calculator suite.
 * Covers:
 * 1. AC Cooling BTU & Sizing (Energy Star standard & environmental factors)
 * 2. Heating BTU & Temperature Delta Heat Load (Conductive & convective loss)
 * 3. Energy Operating Cost & SEER/EER Efficiency Comparison
 */

// ─── Unit Types ─────────────────────────────────────────────────────────────

export type LengthUnit = "feet" | "inches" | "meters";
export type AreaUnit = "sq_feet" | "sq_meters";
export type TempUnit = "fahrenheit" | "celsius";

export type InsulationLevel = "poor" | "average" | "good" | "excellent";
export type SunExposure = "shaded" | "moderate" | "high_sun";
export type RoomType = "bedroom" | "living_room" | "kitchen" | "office" | "server_room";
export type ClimateZone = "cool" | "average" | "hot_humid";
export type BuildingTightness = "poor_drafty" | "average_standard" | "tight_efficient";

// ─── Unit Conversion Helpers ────────────────────────────────────────────────

export function toFeet(value: number, unit: LengthUnit): number {
  if (isNaN(value) || value <= 0) return 0;
  switch (unit) {
    case "feet":
      return value;
    case "inches":
      return value / 12;
    case "meters":
      return value * 3.28084;
    default:
      return value;
  }
}

export function toSqFeet(value: number, unit: AreaUnit): number {
  if (isNaN(value) || value <= 0) return 0;
  switch (unit) {
    case "sq_feet":
      return value;
    case "sq_meters":
      return value * 10.7639;
    default:
      return value;
  }
}

export function toFahrenheit(value: number, unit: TempUnit): number {
  if (isNaN(value)) return 0;
  if (unit === "celsius") {
    return (value * 9) / 5 + 32;
  }
  return value;
}

export function toCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

// ─── Commercial AC Sizing Steps ─────────────────────────────────────────────

export const COMMERCIAL_TONNAGE_STEPS = [
  0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0,
];

export function getNearestCommercialTonnage(exactTons: number): number {
  for (const step of COMMERCIAL_TONNAGE_STEPS) {
    if (step >= exactTons) return step;
  }
  return Math.ceil(exactTons);
}

// ─── 1. AC Cooling BTU Calculation ──────────────────────────────────────────

export interface AcCoolingInput {
  areaSqFt?: number;
  length?: number;
  width?: number;
  dimensionUnit?: LengthUnit;
  ceilingHeight?: number;
  ceilingHeightUnit?: LengthUnit;
  occupants?: number;
  roomType?: RoomType;
  insulation?: InsulationLevel;
  sunExposure?: SunExposure;
  climateZone?: ClimateZone;
  quantity?: number;
}

export interface AcCoolingResult {
  baseBtu: number;
  totalBtuPerHour: number;
  exactTons: number;
  recommendedTons: number;
  powerKw: number;
  powerHp: number;
  unitTypeRecommendation: "Window Unit" | "Mini-Split / Single Zone" | "Central AC / Multi-Split";
  breakdown: {
    areaBtu: number;
    ceilingOffsetBtu: number;
    occupantsBtu: number;
    kitchenBtu: number;
    sunExposureMultiplier: number;
    insulationMultiplier: number;
    climateMultiplier: number;
  };
}

/**
 * Energy Star base cooling load curve:
 * Computes baseline cooling capacity for standard 8-ft ceilings, then applies
 * environmental, insulation, occupancy, and solar multipliers.
 */
export function calculateAcCoolingBtu(input: AcCoolingInput): AcCoolingResult {
  const dimUnit = input.dimensionUnit || "feet";
  let sqFt = input.areaSqFt || 0;
  if (!sqFt && input.length && input.width) {
    const lFt = toFeet(input.length, dimUnit);
    const wFt = toFeet(input.width, dimUnit);
    sqFt = lFt * wFt;
  }
  sqFt = Math.max(sqFt, 1);

  const ceilingHtFt = input.ceilingHeight ? toFeet(input.ceilingHeight, input.ceilingHeightUnit || "feet") : 8;
  const occupants = Math.max(input.occupants !== undefined ? input.occupants : 2, 0);
  const roomType = input.roomType || "bedroom";
  const insulation = input.insulation || "average";
  const sunExposure = input.sunExposure || "moderate";
  const climateZone = input.climateZone || "average";
  const qty = Math.max(input.quantity || 1, 1);

  // 1. Base Energy Star Area BTU calculation
  // Baseline formula: ~20-25 BTU/sq ft for small rooms, tapering with economy of scale
  let baseAreaBtu = 0;
  if (sqFt <= 100) baseAreaBtu = 5000;
  else if (sqFt <= 150) baseAreaBtu = 5000 + ((sqFt - 100) / 50) * 1000; // 5000 to 6000
  else if (sqFt <= 250) baseAreaBtu = 6000 + ((sqFt - 150) / 100) * 1000; // 6000 to 7000
  else if (sqFt <= 300) baseAreaBtu = 7000 + ((sqFt - 250) / 50) * 1000; // 7000 to 8000
  else if (sqFt <= 350) baseAreaBtu = 8000 + ((sqFt - 300) / 50) * 1000; // 8000 to 9000
  else if (sqFt <= 400) baseAreaBtu = 9000 + ((sqFt - 350) / 50) * 1000; // 9000 to 10000
  else if (sqFt <= 450) baseAreaBtu = 10000 + ((sqFt - 400) / 50) * 2000; // 10000 to 12000
  else if (sqFt <= 550) baseAreaBtu = 12000 + ((sqFt - 450) / 100) * 2000; // 12000 to 14000
  else if (sqFt <= 700) baseAreaBtu = 14000 + ((sqFt - 550) / 150) * 4000; // 14000 to 18000
  else if (sqFt <= 1000) baseAreaBtu = 18000 + ((sqFt - 700) / 300) * 3000; // 18000 to 21000
  else if (sqFt <= 1200) baseAreaBtu = 21000 + ((sqFt - 1000) / 200) * 2000; // 21000 to 23000
  else if (sqFt <= 1400) baseAreaBtu = 23000 + ((sqFt - 1200) / 200) * 1000; // 23000 to 24000
  else if (sqFt <= 1500) baseAreaBtu = 24000 + ((sqFt - 1400) / 100) * 6000; // 24000 to 30000
  else if (sqFt <= 2000) baseAreaBtu = 30000 + ((sqFt - 1500) / 500) * 4000; // 30000 to 34000
  else {
    baseAreaBtu = 34000 + (sqFt - 2000) * 16.5;
  }

  // 2. Ceiling Height Adjustment: Standard baseline is 8 ft. Add ~10% per 2 ft above 8ft.
  let ceilingOffsetBtu = 0;
  if (ceilingHtFt > 8) {
    ceilingOffsetBtu = baseAreaBtu * ((ceilingHtFt - 8) / 8) * 0.75;
  }

  // 3. Occupancy adjustment: Energy Star standard accounts for 2 people in base.
  // Add 600 BTU per additional person above 2. If 0 or 1 person, subtract 400.
  let occupantsBtu = 0;
  if (occupants > 2) {
    occupantsBtu = (occupants - 2) * 600;
  } else if (occupants < 2) {
    occupantsBtu = (occupants - 2) * 300;
  }

  // 4. Room Type adjustment
  let kitchenBtu = 0;
  if (roomType === "kitchen") kitchenBtu = 4000;
  else if (roomType === "server_room") kitchenBtu = 5000;
  else if (roomType === "living_room") kitchenBtu = 1000;
  else if (roomType === "office") kitchenBtu = 1500;

  // 5. Multipliers
  let sunMult = 1.0;
  if (sunExposure === "shaded") sunMult = 0.90; // -10% for heavily shaded
  else if (sunExposure === "high_sun") sunMult = 1.10; // +10% for sunny rooms

  let insMult = 1.0;
  if (insulation === "poor") insMult = 1.25;
  else if (insulation === "average") insMult = 1.0;
  else if (insulation === "good") insMult = 0.90;
  else if (insulation === "excellent") insMult = 0.80;

  let climMult = 1.0;
  if (climateZone === "cool") climMult = 0.90;
  else if (climateZone === "hot_humid") climMult = 1.15;

  const rawSubtotal = (baseAreaBtu + ceilingOffsetBtu + occupantsBtu + kitchenBtu);
  const adjustedSingleUnitBtu = rawSubtotal * sunMult * insMult * climMult;
  const totalBtuPerHour = Math.round(adjustedSingleUnitBtu * qty);

  // AC Tonnage: 1 Ton of Refrigeration = 12,000 BTU/hr
  const exactTons = parseFloat((totalBtuPerHour / 12000).toFixed(2));
  const recommendedTons = getNearestCommercialTonnage(exactTons);

  // Electrical Equivalents
  // 1 Watt = 3.412142 BTU/hr -> 1 kW = 3,412.142 BTU/hr
  const powerKw = parseFloat((totalBtuPerHour / 3412.142).toFixed(2));
  // 1 Mechanical HP = 0.7457 kW
  const powerHp = parseFloat((powerKw * 1.34102).toFixed(2));

  let unitTypeRecommendation: "Window Unit" | "Mini-Split / Single Zone" | "Central AC / Multi-Split" = "Mini-Split / Single Zone";
  if (totalBtuPerHour <= 12000 && qty === 1) {
    unitTypeRecommendation = "Window Unit";
  } else if (totalBtuPerHour > 24000 || qty > 1) {
    unitTypeRecommendation = "Central AC / Multi-Split";
  }

  return {
    baseBtu: Math.round(baseAreaBtu),
    totalBtuPerHour,
    exactTons,
    recommendedTons,
    powerKw,
    powerHp,
    unitTypeRecommendation,
    breakdown: {
      areaBtu: Math.round(baseAreaBtu),
      ceilingOffsetBtu: Math.round(ceilingOffsetBtu),
      occupantsBtu: Math.round(occupantsBtu),
      kitchenBtu: Math.round(kitchenBtu),
      sunExposureMultiplier: sunMult,
      insulationMultiplier: insMult,
      climateMultiplier: climMult,
    },
  };
}

// ─── 2. Heating BTU & Temperature Delta Calculation ────────────────────────

export interface HeatingBtuInput {
  length: number;
  width: number;
  height: number;
  dimensionUnit?: LengthUnit;
  desiredIndoorTemp: number;
  outdoorLowTemp: number;
  tempUnit?: TempUnit;
  insulationCondition?: BuildingTightness;
  altitudeFeet?: number;
  quantity?: number;
}

export interface HeatingBtuResult {
  volumeCuFt: number;
  volumeCuM: number;
  deltaTempF: number;
  totalHeatingBtu: number;
  heatingKw: number;
  fuelEquivalents: {
    naturalGasThermsPerHour: number;
    propaneGallonsPerHour: number;
    heatingOilGallonsPerHour: number;
    electricKwhPerHour: number;
  };
}

/**
 * Standard heat loss method:
 * Q (BTU/hr) = Volume (ft³) × ΔT (°F) × Heat Loss Factor (H)
 * Where H represents BTU/hr per ft³ per °F:
 * - Poor / Drafty (older home, uninsulated walls): ~0.18 BTU / (ft³ · °F)
 * - Average / Standard (moderate insulation, double pane): ~0.13 BTU / (ft³ · °F)
 * - Tight / Energy Efficient (modern 2x6 framing, spray foam): ~0.08 BTU / (ft³ · °F)
 */
export function calculateHeatingBtu(input: HeatingBtuInput): HeatingBtuResult {
  const dimUnit = input.dimensionUnit || "feet";
  const tempUnit = input.tempUnit || "fahrenheit";

  const lFt = toFeet(input.length, dimUnit);
  const wFt = toFeet(input.width, dimUnit);
  const hFt = toFeet(input.height, dimUnit);
  const qty = Math.max(input.quantity || 1, 1);

  const volumeCuFt = lFt * wFt * hFt * qty;
  const volumeCuM = volumeCuFt * 0.0283168;

  const indoorF = toFahrenheit(input.desiredIndoorTemp, tempUnit);
  const outdoorF = toFahrenheit(input.outdoorLowTemp, tempUnit);
  const deltaTempF = Math.max(indoorF - outdoorF, 1);

  let heatLossFactor = 0.13;
  const ins = input.insulationCondition || "average_standard";
  if (ins === "poor_drafty") heatLossFactor = 0.18;
  else if (ins === "average_standard") heatLossFactor = 0.13;
  else if (ins === "tight_efficient") heatLossFactor = 0.08;

  let rawBtu = volumeCuFt * deltaTempF * heatLossFactor;

  // Altitude derating: High altitudes have thinner air. Add ~2% per 1000 ft above 2000 ft.
  const altFt = input.altitudeFeet || 0;
  if (altFt > 2000) {
    const extraThousandFt = (altFt - 2000) / 1000;
    rawBtu *= 1 + extraThousandFt * 0.02;
  }

  const totalHeatingBtu = Math.round(rawBtu);
  const heatingKw = parseFloat((totalHeatingBtu / 3412.142).toFixed(2));

  // Fuel heating values (nominal 85-90% system efficiency):
  // 1 Therm Natural Gas = 100,000 BTU
  // 1 Gallon Propane = 91,500 BTU
  // 1 Gallon #2 Heating Oil = 138,500 BTU
  // 1 kWh Electricity = 3,412.14 BTU
  const naturalGasThermsPerHour = parseFloat((totalHeatingBtu / 100000 / 0.85).toFixed(3));
  const propaneGallonsPerHour = parseFloat((totalHeatingBtu / 91500 / 0.85).toFixed(3));
  const heatingOilGallonsPerHour = parseFloat((totalHeatingBtu / 138500 / 0.85).toFixed(3));
  const electricKwhPerHour = parseFloat((totalHeatingBtu / 3412.142).toFixed(2));

  return {
    volumeCuFt: Math.round(volumeCuFt),
    volumeCuM: parseFloat(volumeCuM.toFixed(1)),
    deltaTempF: Math.round(deltaTempF),
    totalHeatingBtu,
    heatingKw,
    fuelEquivalents: {
      naturalGasThermsPerHour,
      propaneGallonsPerHour,
      heatingOilGallonsPerHour,
      electricKwhPerHour,
    },
  };
}

// ─── 3. Energy Running Cost & SEER Sizing Calculator ────────────────────────

export interface EnergyCostInput {
  btuRating: number;
  seerRating: number; // e.g. 14, 16, 18, 20, 24
  dailyHours: number; // e.g. 8 hours
  electricityRatePerKwh: number; // e.g. $0.15 / kWh
  heatingEfficiencyAfue?: number; // e.g. 90%
}

export interface SeerComparisonItem {
  seer: number;
  watts: number;
  annualCost: number;
  annualSavingsVsBaseline: number;
  co2KgPerYear: number;
}

export interface EnergyCostResult {
  watts: number;
  kilowatts: number;
  hourlyCost: number;
  dailyCost: number;
  monthlyCost: number;
  annualCost: number;
  co2KgPerYear: number;
  seerComparison: SeerComparisonItem[];
}

/**
 * Energy consumption formula for cooling:
 * Power (Watts) = BTU / SEER (or EER for instantaneous draw)
 * Energy per day (kWh) = (Watts × Daily Hours) / 1000
 * Daily Cost = kWh × $/kWh
 * Carbon Footprint = Annual kWh × 0.388 kg CO₂/kWh (US Grid average)
 */
export function calculateEnergyCostAndSizing(input: EnergyCostInput): EnergyCostResult {
  const btu = Math.max(input.btuRating, 1000);
  const seer = Math.max(input.seerRating, 8);
  const hours = Math.min(Math.max(input.dailyHours, 0.5), 24);
  const rate = Math.max(input.electricityRatePerKwh, 0.01);

  const watts = btu / seer;
  const kilowatts = watts / 1000;

  const dailyKwh = kilowatts * hours;
  const hourlyCost = kilowatts * rate;
  const dailyCost = dailyKwh * rate;
  const monthlyCost = dailyCost * 30.416; // Average month
  const annualCost = dailyCost * 365;

  const annualKwh = dailyKwh * 365;
  const co2KgPerYear = Math.round(annualKwh * 0.388);

  // Baseline standard: 10 SEER (older unit) or 14 SEER (older code minimum)
  const baselineWatts = btu / 10;
  const baselineAnnualCost = (baselineWatts / 1000) * hours * 365 * rate;

  const SEER_BENCHMARKS = [10, 14, 16, 18, 20, 24];
  const seerComparison: SeerComparisonItem[] = SEER_BENCHMARKS.map((s) => {
    const w = btu / s;
    const annKwh = (w / 1000) * hours * 365;
    const cost = annKwh * rate;
    const savings = Math.max(baselineAnnualCost - cost, 0);
    return {
      seer: s,
      watts: Math.round(w),
      annualCost: parseFloat(cost.toFixed(2)),
      annualSavingsVsBaseline: parseFloat(savings.toFixed(2)),
      co2KgPerYear: Math.round(annKwh * 0.388),
    };
  });

  return {
    watts: Math.round(watts),
    kilowatts: parseFloat(kilowatts.toFixed(2)),
    hourlyCost: parseFloat(hourlyCost.toFixed(4)),
    dailyCost: parseFloat(dailyCost.toFixed(2)),
    monthlyCost: parseFloat(monthlyCost.toFixed(2)),
    annualCost: parseFloat(annualCost.toFixed(2)),
    co2KgPerYear,
    seerComparison,
  };
}
