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

// ─── CARD 1: CONVERTER ENGINE ───────────────────────────────────────────────

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

// ─── CARD 2: MASS FROM DENSITY & VOLUME ─────────────────────────────────────

export interface MassFromDensityInput {
  densityKgM3: number;
  volumeM3: number;
}

export interface MassFromDensityResult {
  massKg: number;
  massGrams: number;
  massLbs: number;
  massMetricTons: number;
  massShortTons: number;
}

export function calculateMassFromDensity(input: MassFromDensityInput): MassFromDensityResult {
  const rho = Math.max(0, input.densityKgM3 || 0);
  const vol = Math.max(0, input.volumeM3 || 0);
  const massKg = rho * vol;
  const massGrams = massKg * 1000;
  const massLbs = massKg / 0.45359237;
  const massMetricTons = massKg / 1000;
  const massShortTons = massKg / 907.18474;

  return {
    massKg,
    massGrams,
    massLbs,
    massMetricTons,
    massShortTons,
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
