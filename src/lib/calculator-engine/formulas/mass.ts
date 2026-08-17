/**
 * Pure Mathematical Calculation Engine for Mass & Weight Conversion Suite
 * Compliant with BIPM 2019 SI Base Kilogram definition, NIST Handbook 44,
 * and Newtonian Gravitational Physics (W = m * g).
 */

export interface MassUnitDefinition {
  id: string;
  name: string;
  symbol: string;
  toKg: number; // Conversion factor to SI Base Unit: Kilogram
  system: "metric" | "imperial" | "us_customary" | "atomic" | "astronomical";
  description: string;
}

export const MASS_UNITS: MassUnitDefinition[] = [
  { id: "kg", name: "Kilogram", symbol: "kg", toKg: 1, system: "metric", description: "SI Base Unit of Mass (anchored to Planck constant h)" },
  { id: "g", name: "Gram", symbol: "g", toKg: 0.001, system: "metric", description: "1/1000th of a kilogram (CGS Base unit)" },
  { id: "mg", name: "Milligram", symbol: "mg", toKg: 1e-6, system: "metric", description: "1/1,000,000th of a kilogram" },
  { id: "ug", name: "Microgram", symbol: "µg", toKg: 1e-9, system: "metric", description: "1/1,000,000,000th of a kilogram" },
  { id: "t", name: "Metric Ton (Tonne)", symbol: "t", toKg: 1000, system: "metric", description: "1,000 kg (Megagram)" },
  { id: "lb", name: "Pound (Avoirdupois)", symbol: "lbs", toKg: 0.45359237, system: "imperial", description: "Exact international definition (1959 Agreement)" },
  { id: "oz", name: "Ounce (Avoirdupois)", symbol: "oz", toKg: 0.028349523125, system: "imperial", description: "1/16th of an avoirdupois pound" },
  { id: "st", name: "Stone (UK)", symbol: "st", toKg: 6.35029318, system: "imperial", description: "14 avoirdupois pounds" },
  { id: "ct", name: "Carat (Metric)", symbol: "ct", toKg: 0.0002, system: "metric", description: "200 milligrams (gemstone standard)" },
  { id: "gr", name: "Grain", symbol: "gr", toKg: 0.00006479891, system: "imperial", description: "1/7000th of a pound (traditional gun powder / pharma)" },
  { id: "short_ton", name: "Short Ton (US)", symbol: "ton (US)", toKg: 907.18474, system: "us_customary", description: "2,000 avoirdupois pounds" },
  { id: "long_ton", name: "Long Ton (UK)", symbol: "ton (UK)", toKg: 1016.0469088, system: "imperial", description: "2,240 avoirdupois pounds (Imperial ton)" },
  { id: "u", name: "Atomic Mass Unit (Dalton)", symbol: "u", toKg: 1.66053906660e-27, system: "atomic", description: "1/12th the mass of an unbound neutral Carbon-12 atom" },
  { id: "earth_mass", name: "Earth Mass", symbol: "M⊕", toKg: 5.9722e24, system: "astronomical", description: "Total mass of Planet Earth (5.9722 × 10²⁴ kg)" },
  { id: "solar_mass", name: "Solar Mass", symbol: "M☉", toKg: 1.98847e30, system: "astronomical", description: "Mass of the Sun (1.98847 × 10³⁰ kg)" },
];

export interface DensityUnitDef {
  id: string;
  name: string;
  symbol: string;
  toKgM3: number;
}

export const DENSITY_UNITS_CATALOG: DensityUnitDef[] = [
  { id: "kg_m3", name: "kilogram/cubic meter", symbol: "kg/m³", toKgM3: 1 },
  { id: "kg_cm3", name: "kilogram/cubic centimeter", symbol: "kg/cm³", toKgM3: 1e6 },
  { id: "g_m3", name: "gram/cubic meter", symbol: "g/m³", toKgM3: 0.001 },
  { id: "g_cm3", name: "gram/cubic centimeter", symbol: "g/cm³", toKgM3: 1000 },
  { id: "g_mm3", name: "gram/cubic millimeter", symbol: "g/mm³", toKgM3: 1e6 },
  { id: "mg_m3", name: "milligram/cubic meter", symbol: "mg/m³", toKgM3: 1e-6 },
  { id: "mg_cm3", name: "milligram/cubic centimeter", symbol: "mg/cm³", toKgM3: 1 },
  { id: "mg_mm3", name: "milligram/cubic millimeter", symbol: "mg/mm³", toKgM3: 1000 },
  { id: "Eg_L", name: "exagram/liter", symbol: "Eg/L", toKgM3: 1e21 },
  { id: "Pg_L", name: "petagram/liter", symbol: "Pg/L", toKgM3: 1e18 },
  { id: "Tg_L", name: "teragram/liter", symbol: "Tg/L", toKgM3: 1e15 },
  { id: "Gg_L", name: "gigagram/liter", symbol: "Gg/L", toKgM3: 1e12 },
  { id: "Mg_L", name: "megagram/liter", symbol: "Mg/L", toKgM3: 1e9 },
  { id: "kg_L", name: "kilogram/liter", symbol: "kg/L", toKgM3: 1000 },
  { id: "hg_L", name: "hectogram/liter", symbol: "hg/L", toKgM3: 100 },
  { id: "dag_L", name: "dekagram/liter", symbol: "dag/L", toKgM3: 10 },
  { id: "g_L", name: "gram/liter", symbol: "g/L", toKgM3: 1 },
  { id: "dg_L", name: "decigram/liter", symbol: "dg/L", toKgM3: 0.1 },
  { id: "cg_L", name: "centigram/liter", symbol: "cg/L", toKgM3: 0.01 },
  { id: "mg_L", name: "milligram/liter", symbol: "mg/L", toKgM3: 0.001 },
  { id: "ng_L", name: "nanogram/liter", symbol: "ng/L", toKgM3: 1e-9 },
  { id: "pg_L", name: "picogram/liter", symbol: "pg/L", toKgM3: 1e-12 },
  { id: "fg_L", name: "femtogram/liter", symbol: "fg/L", toKgM3: 1e-15 },
  { id: "ag_L", name: "attogram/liter", symbol: "ag/L", toKgM3: 1e-18 },
  { id: "lb_in3", name: "pound/cubic inch", symbol: "lb/in³", toKgM3: 27679.90471 },
  { id: "lb_ft3", name: "pound/cubic foot", symbol: "lb/ft³", toKgM3: 16.01846337 },
  { id: "lb_yd3", name: "pound/cubic yard", symbol: "lb/yd³", toKgM3: 0.59327642 },
  { id: "lb_gal_us", name: "pound/gallon (US)", symbol: "lb/gal (US)", toKgM3: 119.826427 },
  { id: "lb_gal_uk", name: "pound/gallon (UK)", symbol: "lb/gal (UK)", toKgM3: 99.7763726 },
  { id: "oz_in3", name: "ounce/cubic inch", symbol: "oz/in³", toKgM3: 1729.99404 },
  { id: "oz_ft3", name: "ounce/cubic foot", symbol: "oz/ft³", toKgM3: 1.00115396 },
  { id: "oz_gal_us", name: "ounce/gallon (US)", symbol: "oz/gal (US)", toKgM3: 7.4891517 },
  { id: "oz_gal_uk", name: "ounce/gallon (UK)", symbol: "oz/gal (UK)", toKgM3: 6.2360233 },
  { id: "gr_gal_us", name: "grain/gallon (US)", symbol: "gr/gal (US)", toKgM3: 0.017118 },
  { id: "gr_gal_uk", name: "grain/gallon (UK)", symbol: "gr/gal (UK)", toKgM3: 0.0142537 },
  { id: "gr_ft3", name: "grain/cubic foot", symbol: "gr/ft³", toKgM3: 0.00228835 },
  { id: "ton_short_yd3", name: "ton (short)/cubic yard", symbol: "ton/yd³ (US)", toKgM3: 1186.5528 },
  { id: "ton_long_yd3", name: "ton (long)/cubic yard", symbol: "ton/yd³ (UK)", toKgM3: 1328.9391 },
  { id: "slug_ft3", name: "slug/cubic foot", symbol: "slug/ft³", toKgM3: 515.3788 },
];

export interface VolumeUnitDef {
  id: string;
  name: string;
  symbol: string;
  toM3: number;
}

export const VOLUME_UNITS_CATALOG: VolumeUnitDef[] = [
  { id: "m3", name: "cubic meter", symbol: "m³", toM3: 1 },
  { id: "ft3", name: "cubic foot", symbol: "ft³", toM3: 0.028316846592 },
  { id: "yd3", name: "cubic yard", symbol: "yd³", toM3: 0.764554857984 },
  { id: "in3", name: "cubic inch", symbol: "in³", toM3: 0.000016387064 },
  { id: "km3", name: "cubic kilometer", symbol: "km³", toM3: 1e9 },
  { id: "mi3", name: "cubic mile", symbol: "mi³", toM3: 4.16818182544e9 },
  { id: "cm3", name: "cubic centimeter", symbol: "cm³", toM3: 1e-6 },
  { id: "mm3", name: "cubic millimeter", symbol: "mm³", toM3: 1e-9 },
  { id: "L", name: "liter", symbol: "L", toM3: 0.001 },
  { id: "mL", name: "milliliter", symbol: "mL", toM3: 1e-6 },
  { id: "pt", name: "pint", symbol: "pt", toM3: 0.000473176473 },
  { id: "qt", name: "quart", symbol: "qt", toM3: 0.000946352946 },
  { id: "gal_us", name: "gallon (US)", symbol: "gal (US)", toM3: 0.003785411784 },
  { id: "gal_uk", name: "gallon (UK)", symbol: "gal (UK)", toM3: 0.00454609 },
  { id: "floz_us", name: "fluid ounce (US)", symbol: "fl oz", toM3: 0.0000295735295625 },
  { id: "tbsp_us", name: "tablespoon (US)", symbol: "tbsp", toM3: 0.00001478676478125 },
  { id: "tsp_us", name: "teaspoon (US)", symbol: "tsp", toM3: 0.00000492892159375 },
  { id: "cup_us", name: "cup (US)", symbol: "cup", toM3: 0.0002365882365 },
];

export interface RealWorldMassReference {
  name: string;
  massKg: number;
  description: string;
  iconName: string;
}

export const REAL_WORLD_REFERENCES: RealWorldMassReference[] = [
  { name: "Proton", massKg: 1.6726e-27, description: "Subatomic nucleon particle", iconName: "Atom" },
  { name: "Grain of Sand", massKg: 3.5e-9, description: "Fine quartz sand particle (~3.5 µg)", iconName: "Sparkles" },
  { name: "Honeybee", massKg: 0.0001, description: "Single worker honeybee (~100 mg)", iconName: "Bug" },
  { name: "Paperclip", massKg: 0.001, description: "Standard steel paperclip (1 gram)", iconName: "Paperclip" },
  { name: "US Nickel Coin", massKg: 0.005, description: "US 5-cent coin (exact 5 grams)", iconName: "Coins" },
  { name: "Apple", massKg: 0.18, description: "Medium fresh orchard apple (~180 g)", iconName: "Apple" },
  { name: "Smartphone", massKg: 0.20, description: "Modern glass-aluminum smartphone (~200 g)", iconName: "Smartphone" },
  { name: "1L Water Bottle", massKg: 1.0, description: "1 liter pure water at 4°C (1 kg / 2.2 lbs)", iconName: "Droplets" },
  { name: "Cat (Domestic)", massKg: 4.5, description: "Average domestic adult cat (~4.5 kg / 10 lbs)", iconName: "Cat" },
  { name: "Human Adult", massKg: 70.0, description: "Global average adult human (70 kg / 154 lbs)", iconName: "User" },
  { name: "Compact Car", massKg: 1500.0, description: "Sedan automobile (1.5 tonnes / 3,300 lbs)", iconName: "Car" },
  { name: "African Elephant", massKg: 6000.0, description: "Adult male bull elephant (6 tonnes)", iconName: "TreePine" },
  { name: "Boeing 747 (Max)", massKg: 442000.0, description: "Fully fueled jumbo jet (442 tonnes)", iconName: "Plane" },
  { name: "Blue Whale", massKg: 150000.0, description: "Largest mammal on Earth (~150 tonnes)", iconName: "Waves" },
  { name: "Great Pyramid", massKg: 5.9e9, description: "Great Pyramid of Giza stone mass (~5.9M tons)", iconName: "Building" },
  { name: "Planet Earth", massKg: 5.9722e24, description: "Entire terrestrial planetary body", iconName: "Globe" },
];

export function formatMassPrecision(val: number, precision = 4, scientific = false): string {
  if (val === 0) return "0";
  if (scientific || Math.abs(val) >= 1e9 || (Math.abs(val) < 1e-4 && Math.abs(val) > 0)) {
    return val.toExponential(precision);
  }
  const fixed = val.toFixed(precision);
  const parsed = parseFloat(fixed);
  return fixed.includes(".") ? fixed.replace(/\.?0+$/, "") : parsed.toString();
}

// ─── CARD 1: MASS FROM DENSITY & VOLUME ─────────────────────────────────────

export interface MassFromDensityInput {
  densityValue: number;
  densityUnitId: string;
  volumeValue: number;
  volumeUnitId: string;
}

export interface MassFromDensityResult {
  massKg: number;
  massGrams: number;
  massLbs: number;
  massMetricTons: number;
  massShortTons: number;
  massOz: number;
  formulaDescription: string;
  closestReference: RealWorldMassReference;
  allConversions: {
    unit: MassUnitDefinition;
    value: number;
    formatted: string;
  }[];
}

export function calculateMassFromDensity(input: MassFromDensityInput): MassFromDensityResult {
  const dUnit = DENSITY_UNITS_CATALOG.find((u) => u.id === input.densityUnitId) || DENSITY_UNITS_CATALOG[0];
  const vUnit = VOLUME_UNITS_CATALOG.find((u) => u.id === input.volumeUnitId) || VOLUME_UNITS_CATALOG[0];

  const rhoKgM3 = (input.densityValue || 0) * dUnit.toKgM3;
  const volM3 = (input.volumeValue || 0) * vUnit.toM3;

  const massKg = rhoKgM3 * volM3;
  const massGrams = massKg * 1000;
  const massLbs = massKg / 0.45359237;
  const massMetricTons = massKg / 1000;
  const massShortTons = massKg / 907.18474;
  const massOz = massKg / 0.028349523125;

  const formulaDescription = `Mass = Density × Volume = (${input.densityValue} ${dUnit.symbol}) × (${input.volumeValue} ${vUnit.symbol}) = ${formatMassPrecision(massKg, 4)} kg (${formatMassPrecision(massLbs, 4)} lbs)`;

  // Find closest real world reference
  let closestRef = REAL_WORLD_REFERENCES[0];
  let minDiff = Math.abs(Math.log10(Math.max(1e-30, massKg)) - Math.log10(closestRef.massKg));
  for (const ref of REAL_WORLD_REFERENCES) {
    const diff = Math.abs(Math.log10(Math.max(1e-30, massKg)) - Math.log10(ref.massKg));
    if (diff < minDiff) {
      minDiff = diff;
      closestRef = ref;
    }
  }

  const allConversions = MASS_UNITS.map((u) => {
    const val = massKg / u.toKg;
    return {
      unit: u,
      value: val,
      formatted: formatMassPrecision(val, 4),
    };
  });

  return {
    massKg,
    massGrams,
    massLbs,
    massMetricTons,
    massShortTons,
    massOz,
    formulaDescription,
    closestReference: closestRef,
    allConversions,
  };
}

// ─── CARD 2: CONVERTER ENGINE ───────────────────────────────────────────────

export interface MassConversionResult {
  fromUnit: MassUnitDefinition;
  toUnit: MassUnitDefinition;
  inputValue: number;
  outputValue: number;
  massInKg: number;
  formulaDescription: string;
  closestReference: RealWorldMassReference;
  allConversions: {
    unit: MassUnitDefinition;
    value: number;
    formatted: string;
  }[];
}

export function convertMass(
  fromUnitId: string,
  toUnitId: string,
  value: number,
  precision = 4,
  scientific = false
): MassConversionResult {
  const fromUnit = MASS_UNITS.find((u) => u.id === fromUnitId) || MASS_UNITS[0];
  const toUnit = MASS_UNITS.find((u) => u.id === toUnitId) || MASS_UNITS[5] || MASS_UNITS[0];

  const massInKg = (value || 0) * fromUnit.toKg;
  const outputValue = massInKg / toUnit.toKg;

  const factor = fromUnit.toKg / toUnit.toKg;
  const formulaDescription = `${value} ${fromUnit.symbol} × ${formatMassPrecision(factor, 6)} = ${formatMassPrecision(outputValue, precision, scientific)} ${toUnit.symbol}`;

  // Find closest real world reference
  let closestRef = REAL_WORLD_REFERENCES[0];
  let minDiff = Math.abs(Math.log10(Math.max(1e-30, massInKg)) - Math.log10(closestRef.massKg));
  for (const ref of REAL_WORLD_REFERENCES) {
    const diff = Math.abs(Math.log10(Math.max(1e-30, massInKg)) - Math.log10(ref.massKg));
    if (diff < minDiff) {
      minDiff = diff;
      closestRef = ref;
    }
  }

  const allConversions = MASS_UNITS.map((u) => {
    const val = massInKg / u.toKg;
    return {
      unit: u,
      value: val,
      formatted: formatMassPrecision(val, precision, scientific),
    };
  });

  return {
    fromUnit,
    toUnit,
    inputValue: value,
    outputValue,
    massInKg,
    formulaDescription,
    closestReference: closestRef,
    allConversions,
  };
}

// ─── CARD 3: CELESTIAL WEIGHT CALCULATOR (W = m * g) ─────────────────────────

export interface CelestialBodyGravity {
  id: string;
  name: string;
  surfaceGravity: number; // m/s²
  relativeToEarth: number; // % relative to 9.80665
}

export const CELESTIAL_BODIES: CelestialBodyGravity[] = [
  { id: "earth", name: "Earth (Surface)", surfaceGravity: 9.80665, relativeToEarth: 1.0 },
  { id: "moon", name: "Moon", surfaceGravity: 1.622, relativeToEarth: 0.1654 },
  { id: "mars", name: "Mars", surfaceGravity: 3.711, relativeToEarth: 0.3784 },
  { id: "jupiter", name: "Jupiter", surfaceGravity: 24.79, relativeToEarth: 2.5279 },
  { id: "venus", name: "Venus", surfaceGravity: 8.87, relativeToEarth: 0.9045 },
  { id: "mercury", name: "Mercury", surfaceGravity: 3.70, relativeToEarth: 0.3773 },
  { id: "sun", name: "Sun (Surface)", surfaceGravity: 274.0, relativeToEarth: 27.94 },
  { id: "pluto", name: "Pluto", surfaceGravity: 0.62, relativeToEarth: 0.0632 },
  { id: "iss", name: "Space (Orbit Apparent)", surfaceGravity: 0.0, relativeToEarth: 0.0 },
];

export interface CelestialWeightResult {
  massKg: number;
  bodyResults: {
    body: CelestialBodyGravity;
    weightNewtons: number;
    weightLbf: number;
    weightKgEquivalent: number;
  }[];
}

export function calculateCelestialWeight(massKg: number): CelestialWeightResult {
  const m = Math.max(0, massKg || 0);

  const bodyResults = CELESTIAL_BODIES.map((b) => {
    const weightNewtons = m * b.surfaceGravity;
    const weightLbf = weightNewtons * 0.224808943;
    const weightKgEquivalent = m * b.relativeToEarth;
    return {
      body: b,
      weightNewtons: Math.round(weightNewtons * 100) / 100,
      weightLbf: Math.round(weightLbf * 100) / 100,
      weightKgEquivalent: Math.round(weightKgEquivalent * 100) / 100,
    };
  });

  return {
    massKg: m,
    bodyResults,
  };
}
