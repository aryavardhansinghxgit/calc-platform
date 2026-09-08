/**
 * Pure Mathematical Calculation Engine for Density, Mass, Volume, Buoyancy & Gas Kinetics
 * Standard Reference: NIST Physics Standards, IUPAC STP Definitions, and Archimedes Fluid Dynamics.
 */

export type DensityCalcMode = "density" | "mass" | "volume";

export interface MaterialDensityItem {
  id: string;
  name: string;
  category: "metal" | "solid" | "liquid" | "gas" | "astronomical";
  densityKgM3: number;
  specificGravity: number;
  notes?: string;
}

export const MATERIAL_DATABASE: MaterialDensityItem[] = [
  // Metals
  { id: "gold", name: "Gold (24K)", category: "metal", densityKgM3: 19300, specificGravity: 19.3, notes: "Precious heavy metal" },
  { id: "platinum", name: "Platinum", category: "metal", densityKgM3: 21450, specificGravity: 21.45, notes: "Dense noble metal" },
  { id: "tungsten", name: "Tungsten", category: "metal", densityKgM3: 19250, specificGravity: 19.25, notes: "High melting point element" },
  { id: "lead", name: "Lead", category: "metal", densityKgM3: 11340, specificGravity: 11.34, notes: "Heavy radiation shielding metal" },
  { id: "silver", name: "Silver", category: "metal", densityKgM3: 10490, specificGravity: 10.49, notes: "Highly conductive precious metal" },
  { id: "copper", name: "Copper", category: "metal", densityKgM3: 8960, specificGravity: 8.96, notes: "Electrical wiring standard" },
  { id: "brass", name: "Brass (Commercial)", category: "metal", densityKgM3: 8500, specificGravity: 8.5, notes: "Copper-zinc alloy" },
  { id: "iron_steel", name: "Steel / Carbon Iron", category: "metal", densityKgM3: 7850, specificGravity: 7.85, notes: "Structural construction alloy" },
  { id: "cast_iron", name: "Cast Iron", category: "metal", densityKgM3: 7200, specificGravity: 7.2, notes: "Cookware and engine blocks" },
  { id: "titanium", name: "Titanium (Grade 5)", category: "metal", densityKgM3: 4506, specificGravity: 4.51, notes: "Aerospace high-strength alloy" },
  { id: "aluminum", name: "Aluminum (6061)", category: "metal", densityKgM3: 2700, specificGravity: 2.7, notes: "Lightweight structural metal" },
  { id: "magnesium", name: "Magnesium", category: "metal", densityKgM3: 1738, specificGravity: 1.74, notes: "Ultralight structural metal" },

  // Non-metal Solids
  { id: "diamond", name: "Diamond", category: "solid", densityKgM3: 3515, specificGravity: 3.52, notes: "Carbon allotrope gemstone" },
  { id: "granite", name: "Granite Stone", category: "solid", densityKgM3: 2650, specificGravity: 2.65, notes: "Igneous countertop rock" },
  { id: "glass", name: "Glass (Crown/Window)", category: "solid", densityKgM3: 2500, specificGravity: 2.5, notes: "Silica soda-lime glass" },
  { id: "concrete", name: "Concrete (Reinforced)", category: "solid", densityKgM3: 2400, specificGravity: 2.4, notes: "Standard civil concrete" },
  { id: "brick", name: "Clay Brick (Solid)", category: "solid", densityKgM3: 1920, specificGravity: 1.92, notes: "Masonry construction brick" },
  { id: "sand", name: "Dry Sand (Compacted)", category: "solid", densityKgM3: 1600, specificGravity: 1.6, notes: "Loose quartz aggregate" },
  { id: "ice", name: "Ice (0°C)", category: "solid", densityKgM3: 917, specificGravity: 0.917, notes: "Solid water (floats on liquid water)" },
  { id: "oak_wood", name: "Oak Wood (Seasoned)", category: "solid", densityKgM3: 750, specificGravity: 0.75, notes: "Dense hardwood (floats)" },
  { id: "pine_wood", name: "Pine Wood (Softwood)", category: "solid", densityKgM3: 500, specificGravity: 0.5, notes: "Common framing lumber" },
  { id: "cork", name: "Cork (Natural)", category: "solid", densityKgM3: 240, specificGravity: 0.24, notes: "High buoyancy bottle stopper" },
  { id: "balsa_wood", name: "Balsa Wood", category: "solid", densityKgM3: 130, specificGravity: 0.13, notes: "Ultralight model aircraft wood" },
  { id: "polystyrene", name: "Expanded Polystyrene (EPS)", category: "solid", densityKgM3: 30, specificGravity: 0.03, notes: "Styrofoam insulation packaging" },

  // Liquids
  { id: "mercury", name: "Mercury (Liquid Metal)", category: "liquid", densityKgM3: 13546, specificGravity: 13.55, notes: "Heavy liquid at room temp" },
  { id: "honey", name: "Honey (Pure)", category: "liquid", densityKgM3: 1420, specificGravity: 1.42, notes: "Viscous natural syrup" },
  { id: "glycerol", name: "Glycerol / Glycerin", category: "liquid", densityKgM3: 1260, specificGravity: 1.26, notes: "Pharmaceutical triol liquid" },
  { id: "milk", name: "Whole Cow's Milk", category: "liquid", densityKgM3: 1030, specificGravity: 1.03, notes: "Dairy emulsion" },
  { id: "seawater", name: "Seawater (3.5% Salinity)", category: "liquid", densityKgM3: 1025, specificGravity: 1.025, notes: "Global ocean surface water" },
  { id: "water_4c", name: "Pure Water (at 4°C peak)", category: "liquid", densityKgM3: 1000, specificGravity: 1.0, notes: "Standard reference benchmark" },
  { id: "water_20c", name: "Pure Water (at 20°C room temp)", category: "liquid", densityKgM3: 998.2, specificGravity: 0.998, notes: "Room temperature water" },
  { id: "olive_oil", name: "Olive Oil", category: "liquid", densityKgM3: 918, specificGravity: 0.918, notes: "Vegetable culinary oil (floats)" },
  { id: "diesel", name: "Diesel Fuel", category: "liquid", densityKgM3: 830, specificGravity: 0.83, notes: "Petroleum automotive fuel" },
  { id: "ethanol", name: "Ethanol (100% Ethyl Alcohol)", category: "liquid", densityKgM3: 789, specificGravity: 0.789, notes: "Volatile grain alcohol" },
  { id: "gasoline", name: "Gasoline / Petrol", category: "liquid", densityKgM3: 740, specificGravity: 0.74, notes: "Motor vehicle fuel (floats on water)" },

  // Gases (at 0°C, 1 atm STP)
  { id: "carbon_dioxide", name: "Carbon Dioxide (CO₂ gas)", category: "gas", densityKgM3: 1.977, specificGravity: 0.00198, notes: "Heavy asphyxiating gas" },
  { id: "oxygen", name: "Oxygen (O₂ gas)", category: "gas", densityKgM3: 1.429, specificGravity: 0.00143, notes: "Atmospheric oxidant" },
  { id: "air_stp", name: "Air (Sea level, 0°C STP)", category: "gas", densityKgM3: 1.293, specificGravity: 0.00129, notes: "Dry atmospheric air" },
  { id: "air_20c", name: "Air (Sea level, 20°C NTP)", category: "gas", densityKgM3: 1.204, specificGravity: 0.00120, notes: "Ambient room air" },
  { id: "nitrogen", name: "Nitrogen (N₂ gas)", category: "gas", densityKgM3: 1.251, specificGravity: 0.00125, notes: "78% of Earth atmosphere" },
  { id: "methane", name: "Methane (Natural Gas CH₄)", category: "gas", densityKgM3: 0.717, specificGravity: 0.00072, notes: "Hydrocarbon gas (floats in air)" },
  { id: "helium", name: "Helium (He gas)", category: "gas", densityKgM3: 0.1785, specificGravity: 0.00018, notes: "Noble lifting gas" },
  { id: "hydrogen", name: "Hydrogen (H₂ gas)", category: "gas", densityKgM3: 0.0899, specificGravity: 0.00009, notes: "Lightest element in universe" },

  // Astronomical
  { id: "earth_mean", name: "Planet Earth (Mean)", category: "astronomical", densityKgM3: 5515, specificGravity: 5.515, notes: "Terrestrial planetary body" },
  { id: "sun_core", name: "Sun Core", category: "astronomical", densityKgM3: 150000, specificGravity: 150.0, notes: "Solar thermonuclear core" },
  { id: "white_dwarf", name: "White Dwarf Star Matter", category: "astronomical", densityKgM3: 1e9, specificGravity: 1e6, notes: "Degenerate electron gas matter" },
  { id: "neutron_star", name: "Neutron Star Core", category: "astronomical", densityKgM3: 4e17, specificGravity: 4e14, notes: "Degenerate neutron matter" },
];

// ─── UNIT CONVERSION FACTORS (To SI Base: kg for mass, m³ for volume) ────────

export const MASS_FACTORS: Record<string, { name: string; symbol: string; toKg: number }> = {
  kg: { name: "Kilograms", symbol: "kg", toKg: 1 },
  g: { name: "Grams", symbol: "g", toKg: 0.001 },
  mg: { name: "Milligrams", symbol: "mg", toKg: 1e-6 },
  metric_ton: { name: "Metric Tonnes", symbol: "t", toKg: 1000 },
  lb: { name: "Pounds", symbol: "lbs", toKg: 0.45359237 },
  oz: { name: "Ounces", symbol: "oz", toKg: 0.028349523125 },
  stone: { name: "Stones (UK)", symbol: "st", toKg: 6.35029318 },
  short_ton: { name: "Short Tons (US)", symbol: "ton (US)", toKg: 907.18474 },
};

export const VOLUME_FACTORS: Record<string, { name: string; symbol: string; toM3: number }> = {
  m3: { name: "Cubic Meters", symbol: "m³", toM3: 1 },
  cm3: { name: "Cubic Centimeters (mL)", symbol: "cm³", toM3: 1e-6 },
  liter: { name: "Liters", symbol: "L", toM3: 0.001 },
  ft3: { name: "Cubic Feet", symbol: "cu ft", toM3: 0.028316846592 },
  in3: { name: "Cubic Inches", symbol: "cu in", toM3: 0.000016387064 },
  yd3: { name: "Cubic Yards", symbol: "cu yd", toM3: 0.764554857984 },
  gal_us: { name: "Gallons (US liquid)", symbol: "gal (US)", toM3: 0.003785411784 },
  gal_uk: { name: "Gallons (UK imperial)", symbol: "gal (UK)", toM3: 0.00454609 },
};

export const DENSITY_FACTORS: Record<string, { name: string; symbol: string; toKgM3: number }> = {
  kg_m3: { name: "Kilogram / Cubic Meter", symbol: "kg/m³", toKgM3: 1 },
  g_cm3: { name: "Gram / Cubic Centimeter", symbol: "g/cm³", toKgM3: 1000 },
  g_ml: { name: "Gram / Milliliter", symbol: "g/mL", toKgM3: 1000 },
  kg_l: { name: "Kilogram / Liter", symbol: "kg/L", toKgM3: 1000 },
  lb_ft3: { name: "Pound / Cubic Foot", symbol: "lb/ft³", toKgM3: 0.45359237 / 0.028316846592 },
  lb_in3: { name: "Pound / Cubic Inch", symbol: "lb/in³", toKgM3: 0.45359237 / 0.000016387064 },
  lb_gal_us: { name: "Pound / US Gallon", symbol: "lb/gal", toKgM3: 0.45359237 / 0.003785411784 },
  oz_in3: { name: "Ounce / Cubic Inch", symbol: "oz/in³", toKgM3: 0.028349523125 / 0.000016387064 },
  ton_yd3: { name: "Short Ton / Cubic Yard", symbol: "ton/yd³", toKgM3: 907.18474 / 0.764554857984 },
};

// ─── CARD 1: TRI-MODAL DENSITY SOLVER ───────────────────────────────────────

export interface DensitySolverInput {
  mode: DensityCalcMode; // "density" | "mass" | "volume"
  massValue: number;
  massUnit: string;
  volumeValue: number;
  volumeUnit: string;
  densityValue: number;
  densityUnit: string;
}

export interface DensitySolverResult {
  mode: DensityCalcMode;
  densityKgM3: number;
  densityGCm3: number;
  densityLbFt3: number;
  massKg: number;
  volumeM3: number;
  specificGravity: number;
  buoyancyWater: "floats" | "sinks" | "neutral";
  buoyancyAir: "floats" | "sinks";
  submergedFractionPct: number; // 0 to 100%
  allDensityUnits: { unitKey: string; name: string; symbol: string; value: number; formatted: string }[];
  error?: string;
}

function makeErrorResult(mode: DensityCalcMode, errorMessage: string): DensitySolverResult {
  return {
    mode,
    densityKgM3: 0,
    densityGCm3: 0,
    densityLbFt3: 0,
    massKg: 0,
    volumeM3: 0,
    specificGravity: 0,
    buoyancyWater: "neutral",
    buoyancyAir: "sinks",
    submergedFractionPct: 0,
    allDensityUnits: [],
    error: errorMessage,
  };
}

export function calculateDensitySolver(input: DensitySolverInput): DensitySolverResult {
  const mFact = MASS_FACTORS[input.massUnit] || MASS_FACTORS.kg;
  const vFact = VOLUME_FACTORS[input.volumeUnit] || VOLUME_FACTORS.m3;
  const dFact = DENSITY_FACTORS[input.densityUnit] || DENSITY_FACTORS.kg_m3;

  let massKg = 0;
  let volumeM3 = 0;
  let densityKgM3 = 0;

  if (input.mode === "density") {
    if (!isFinite(input.massValue) || !isFinite(input.volumeValue)) {
      return makeErrorResult(input.mode, "Please enter valid finite numerical values for mass and volume.");
    }
    if (input.massValue < 0) {
      return makeErrorResult(input.mode, "Object mass cannot be negative. Please enter a value ≥ 0.");
    }
    if (input.volumeValue < 0) {
      return makeErrorResult(input.mode, "Volume cannot be negative. Please enter a volume > 0.");
    }
    if (input.volumeValue === 0) {
      return makeErrorResult(input.mode, "Volume must be strictly greater than zero for density calculation. Division by zero is undefined.");
    }
    massKg = input.massValue * mFact.toKg;
    volumeM3 = input.volumeValue * vFact.toM3;
    densityKgM3 = massKg / volumeM3;
  } else if (input.mode === "mass") {
    if (!isFinite(input.densityValue) || !isFinite(input.volumeValue)) {
      return makeErrorResult(input.mode, "Please enter valid finite numerical values for density and volume.");
    }
    if (input.densityValue < 0) {
      return makeErrorResult(input.mode, "Material density cannot be negative. Please enter a value ≥ 0.");
    }
    if (input.volumeValue < 0) {
      return makeErrorResult(input.mode, "Volume cannot be negative. Please enter a value ≥ 0.");
    }
    densityKgM3 = input.densityValue * dFact.toKgM3;
    volumeM3 = input.volumeValue * vFact.toM3;
    massKg = densityKgM3 * volumeM3;
  } else {
    // Mode volume: V = M / D
    if (!isFinite(input.massValue) || !isFinite(input.densityValue)) {
      return makeErrorResult(input.mode, "Please enter valid finite numerical values for mass and density.");
    }
    if (input.massValue < 0) {
      return makeErrorResult(input.mode, "Object mass cannot be negative. Please enter a value ≥ 0.");
    }
    if (input.densityValue < 0) {
      return makeErrorResult(input.mode, "Material density cannot be negative. Please enter a density > 0.");
    }
    if (input.densityValue === 0) {
      return makeErrorResult(input.mode, "Density must be strictly greater than zero for volume calculation. Division by zero is undefined.");
    }
    massKg = input.massValue * mFact.toKg;
    densityKgM3 = input.densityValue * dFact.toKgM3;
    volumeM3 = massKg / densityKgM3;
  }

  const densityGCm3 = densityKgM3 / 1000;
  const densityLbFt3 = densityKgM3 / (0.45359237 / 0.028316846592);
  const specificGravity = densityKgM3 / 1000;

  let buoyancyWater: "floats" | "sinks" | "neutral" = "sinks";
  if (Math.abs(specificGravity - 1.0) <= 0.0001) {
    buoyancyWater = "neutral";
  } else if (specificGravity < 1.0) {
    buoyancyWater = "floats";
  } else {
    buoyancyWater = "sinks";
  }

  const buoyancyAir = densityKgM3 < 1.2041 ? "floats" : "sinks";
  const submergedFractionPct = Math.min(100, Math.max(0, specificGravity * 100));

  const allDensityUnits = Object.entries(DENSITY_FACTORS).map(([key, def]) => {
    const val = densityKgM3 / def.toKgM3;
    let formatted = "";
    if (val === 0) {
      formatted = "0";
    } else if (val >= 1e6 || (val < 1e-4 && val > 0)) {
      formatted = val.toExponential(4);
    } else {
      formatted = val.toLocaleString("en-US", {
        minimumFractionDigits: 0,
        maximumFractionDigits: 4,
      });
    }
    return {
      unitKey: key,
      name: def.name,
      symbol: def.symbol,
      value: val,
      formatted,
    };
  });

  return {
    mode: input.mode,
    densityKgM3,
    densityGCm3,
    densityLbFt3,
    massKg,
    volumeM3,
    specificGravity,
    buoyancyWater,
    buoyancyAir,
    submergedFractionPct,
    allDensityUnits,
  };
}

// ─── CARD 3: IDEAL GAS DENSITY & STP/NTP CORRECTION ─────────────────────────

export interface GasDensityInput {
  molarMassGPerMol: number; // e.g. Air = 28.97 g/mol, CO2 = 44.01 g/mol
  pressureKPa: number; // e.g. 101.325 kPa (1 atm)
  temperatureCelsius: number; // e.g. 20 °C
}

export interface GasDensityResult {
  densityKgM3: number;
  densityGCm3: number;
  temperatureKelvin: number;
  specificVolumeM3PerKg: number;
  isLighterThanAir: boolean;
  error?: string;
}

function makeGasError(errorMessage: string): GasDensityResult {
  return {
    densityKgM3: 0,
    densityGCm3: 0,
    temperatureKelvin: 0,
    specificVolumeM3PerKg: 0,
    isLighterThanAir: false,
    error: errorMessage,
  };
}

export function calculateGasDensity(input: GasDensityInput): GasDensityResult {
  if (!isFinite(input.molarMassGPerMol) || !isFinite(input.pressureKPa) || !isFinite(input.temperatureCelsius)) {
    return makeGasError("Please enter valid finite numerical values for molar mass, pressure, and temperature.");
  }
  if (input.temperatureCelsius < -273.15) {
    return makeGasError("Temperature cannot be below absolute zero (-273.15 °C / 0 K).");
  }
  if (input.temperatureCelsius === -273.15) {
    return makeGasError("Temperature must be strictly above absolute zero (-273.15 °C / 0 K). Division by zero is undefined.");
  }
  if (input.pressureKPa <= 0) {
    return makeGasError("Absolute pressure must be strictly greater than zero.");
  }
  if (input.molarMassGPerMol <= 0) {
    return makeGasError("Gas molar mass must be strictly greater than zero.");
  }

  const T_K = input.temperatureCelsius + 273.15;
  const P_Pa = input.pressureKPa * 1000;
  const M_kg_mol = input.molarMassGPerMol / 1000;
  const R = 8.314462618; // Universal gas constant J/(mol·K) [NIST CODATA]

  // ρ = (P · M) / (R · T)
  const densityKgM3 = (P_Pa * M_kg_mol) / (R * T_K);
  const densityGCm3 = densityKgM3 / 1000;
  const specificVolumeM3PerKg = 1 / densityKgM3;
  const isLighterThanAir = densityKgM3 < 1.2041; // Room air at 20°C, 101.325 kPa is ~1.2043 kg/m³

  return {
    densityKgM3,
    densityGCm3,
    temperatureKelvin: T_K,
    specificVolumeM3PerKg,
    isLighterThanAir,
  };
}

// ─── CARD 4: HYDROSTATIC PRESSURE & API GRAVITY ─────────────────────────────

export interface HydrostaticInput {
  densityKgM3: number;
  depthMeters: number;
}

export interface HydrostaticResult {
  gaugePressureKPa: number;
  gaugePressurePsi: number;
  gaugePressureBar: number;
  apiGravity: number | null; // For oils: (141.5 / SG) - 131.5 (null if rho <= 0)
  error?: string;
}

function makeHydroError(errorMessage: string): HydrostaticResult {
  return {
    gaugePressureKPa: 0,
    gaugePressurePsi: 0,
    gaugePressureBar: 0,
    apiGravity: null,
    error: errorMessage,
  };
}

export function calculateHydrostatic(input: HydrostaticInput): HydrostaticResult {
  if (!isFinite(input.densityKgM3) || !isFinite(input.depthMeters)) {
    return makeHydroError("Please enter valid finite numerical values for fluid density and submerged depth.");
  }
  if (input.densityKgM3 < 0) {
    return makeHydroError("Fluid density cannot be negative. Please enter a value ≥ 0.");
  }
  if (input.depthMeters < 0) {
    return makeHydroError("Submerged depth cannot be negative. Please enter a depth ≥ 0.");
  }

  const g = 9.80665; // Standard acceleration due to gravity (m/s²) ISO 80000-3
  const rho = input.densityKgM3;
  const h = input.depthMeters;

  const pPa = rho * g * h;
  const gaugePressureKPa = pPa / 1000;
  const gaugePressurePsi = pPa / 6894.757293168;
  const gaugePressureBar = pPa / 100000;

  let apiGravity: number | null = null;
  if (rho > 0) {
    const sg = rho / 1000;
    apiGravity = (141.5 / sg) - 131.5;
  }

  return {
    gaugePressureKPa,
    gaugePressurePsi,
    gaugePressureBar,
    apiGravity,
  };
}
