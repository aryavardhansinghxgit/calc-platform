/**
 * Universal Unit Conversion Engine
 * Covers 12 metrological categories with high-precision SI base constants,
 * non-linear affine scales (Temperature), and reciprocal inverse scales (Fuel Economy).
 */

export type UnitCategory =
  | "length"
  | "temperature"
  | "area"
  | "volume"
  | "weight"
  | "time"
  | "speed"
  | "pressure"
  | "energy"
  | "power"
  | "data"
  | "fuel";

export interface UnitDefinition {
  id: string;
  name: string;
  symbol: string;
  toBase: (val: number) => number; // Converts unit value to base unit
  fromBase: (val: number) => number; // Converts base unit value to target unit
  system?: "metric" | "imperial" | "us_customary" | "other";
}

export interface CategoryDefinition {
  id: UnitCategory;
  name: string;
  baseUnit: string;
  units: UnitDefinition[];
}

export const CONVERSION_CATEGORIES: Record<UnitCategory, CategoryDefinition> = {
  length: {
    id: "length",
    name: "Length & Distance",
    baseUnit: "meter",
    units: [
      { id: "meter", name: "Meter", symbol: "m", system: "metric", toBase: (v) => v, fromBase: (v) => v },
      { id: "kilometer", name: "Kilometer", symbol: "km", system: "metric", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "centimeter", name: "Centimeter", symbol: "cm", system: "metric", toBase: (v) => v * 0.01, fromBase: (v) => v / 0.01 },
      { id: "millimeter", name: "Millimeter", symbol: "mm", system: "metric", toBase: (v) => v * 0.001, fromBase: (v) => v / 0.001 },
      { id: "micrometer", name: "Micrometer", symbol: "µm", system: "metric", toBase: (v) => v * 1e-6, fromBase: (v) => v / 1e-6 },
      { id: "nanometer", name: "Nanometer", symbol: "nm", system: "metric", toBase: (v) => v * 1e-9, fromBase: (v) => v / 1e-9 },
      { id: "mile", name: "Mile", symbol: "mi", system: "imperial", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { id: "yard", name: "Yard", symbol: "yd", system: "imperial", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { id: "foot", name: "Foot", symbol: "ft", system: "imperial", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: "inch", name: "Inch", symbol: "in", system: "imperial", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
      { id: "nautical_mile", name: "Nautical Mile", symbol: "nmi", system: "other", toBase: (v) => v * 1852, fromBase: (v) => v / 1852 },
      { id: "light_year", name: "Light Year", symbol: "ly", system: "other", toBase: (v) => v * 9.4607304725808e15, fromBase: (v) => v / 9.4607304725808e15 },
    ],
  },
  temperature: {
    id: "temperature",
    name: "Temperature",
    baseUnit: "celsius",
    units: [
      { id: "celsius", name: "Celsius", symbol: "°C", system: "metric", toBase: (v) => v, fromBase: (v) => v },
      { id: "fahrenheit", name: "Fahrenheit", symbol: "°F", system: "imperial", toBase: (v) => ((v - 32) * 5) / 9, fromBase: (v) => (v * 9) / 5 + 32 },
      { id: "kelvin", name: "Kelvin", symbol: "K", system: "metric", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
      { id: "rankine", name: "Rankine", symbol: "°R", system: "imperial", toBase: (v) => ((v - 491.67) * 5) / 9, fromBase: (v) => (v + 273.15) * 1.8 },
    ],
  },
  area: {
    id: "area",
    name: "Area",
    baseUnit: "square_meter",
    units: [
      { id: "square_meter", name: "Square Meter", symbol: "m²", system: "metric", toBase: (v) => v, fromBase: (v) => v },
      { id: "square_kilometer", name: "Square Kilometer", symbol: "km²", system: "metric", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
      { id: "square_centimeter", name: "Square Centimeter", symbol: "cm²", system: "metric", toBase: (v) => v * 0.0001, fromBase: (v) => v / 0.0001 },
      { id: "square_foot", name: "Square Foot", symbol: "sq ft", system: "imperial", toBase: (v) => v * 0.09290304, fromBase: (v) => v / 0.09290304 },
      { id: "square_yard", name: "Square Yard", symbol: "sq yd", system: "imperial", toBase: (v) => v * 0.83612736, fromBase: (v) => v / 0.83612736 },
      { id: "square_mile", name: "Square Mile", symbol: "sq mi", system: "imperial", toBase: (v) => v * 2589988.110336, fromBase: (v) => v / 2589988.110336 },
      { id: "acre", name: "Acre", symbol: "ac", system: "imperial", toBase: (v) => v * 4046.8564224, fromBase: (v) => v / 4046.8564224 },
      { id: "hectare", name: "Hectare", symbol: "ha", system: "metric", toBase: (v) => v * 10000, fromBase: (v) => v / 10000 },
      { id: "square_inch", name: "Square Inch", symbol: "sq in", system: "imperial", toBase: (v) => v * 0.00064516, fromBase: (v) => v / 0.00064516 },
    ],
  },
  volume: {
    id: "volume",
    name: "Volume & Capacity",
    baseUnit: "liter",
    units: [
      { id: "liter", name: "Liter", symbol: "L", system: "metric", toBase: (v) => v, fromBase: (v) => v },
      { id: "cubic_meter", name: "Cubic Meter", symbol: "m³", system: "metric", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "milliliter", name: "Milliliter", symbol: "mL", system: "metric", toBase: (v) => v * 0.001, fromBase: (v) => v / 0.001 },
      { id: "gallon_us", name: "Gallon (US)", symbol: "gal (US)", system: "us_customary", toBase: (v) => v * 3.785411784, fromBase: (v) => v / 3.785411784 },
      { id: "quart_us", name: "Quart (US)", symbol: "qt", system: "us_customary", toBase: (v) => v * 0.946352946, fromBase: (v) => v / 0.946352946 },
      { id: "pint_us", name: "Pint (US)", symbol: "pt", system: "us_customary", toBase: (v) => v * 0.473176473, fromBase: (v) => v / 0.473176473 },
      { id: "cup_us", name: "Cup (US)", symbol: "cup", system: "us_customary", toBase: (v) => v * 0.2365882365, fromBase: (v) => v / 0.2365882365 },
      { id: "fluid_ounce_us", name: "Fluid Ounce (US)", symbol: "fl oz", system: "us_customary", toBase: (v) => v * 0.0295735295625, fromBase: (v) => v / 0.0295735295625 },
      { id: "tablespoon_us", name: "Tablespoon (US)", symbol: "tbsp", system: "us_customary", toBase: (v) => v * 0.01478676478125, fromBase: (v) => v / 0.01478676478125 },
      { id: "teaspoon_us", name: "Teaspoon (US)", symbol: "tsp", system: "us_customary", toBase: (v) => v * 0.00492892159375, fromBase: (v) => v / 0.00492892159375 },
      { id: "cubic_foot", name: "Cubic Foot", symbol: "cu ft", system: "imperial", toBase: (v) => v * 28.316846592, fromBase: (v) => v / 28.316846592 },
      { id: "cubic_inch", name: "Cubic Inch", symbol: "cu in", system: "imperial", toBase: (v) => v * 0.016387064, fromBase: (v) => v / 0.016387064 },
      { id: "gallon_uk", name: "Gallon (UK)", symbol: "gal (UK)", system: "imperial", toBase: (v) => v * 4.54609, fromBase: (v) => v / 4.54609 },
    ],
  },
  weight: {
    id: "weight",
    name: "Weight & Mass",
    baseUnit: "kilogram",
    units: [
      { id: "kilogram", name: "Kilogram", symbol: "kg", system: "metric", toBase: (v) => v, fromBase: (v) => v },
      { id: "gram", name: "Gram", symbol: "g", system: "metric", toBase: (v) => v * 0.001, fromBase: (v) => v / 0.001 },
      { id: "milligram", name: "Milligram", symbol: "mg", system: "metric", toBase: (v) => v * 1e-6, fromBase: (v) => v / 1e-6 },
      { id: "metric_ton", name: "Metric Ton (Tonne)", symbol: "t", system: "metric", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "pound", name: "Pound", symbol: "lbs", system: "imperial", toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
      { id: "ounce", name: "Ounce", symbol: "oz", system: "imperial", toBase: (v) => v * 0.028349523125, fromBase: (v) => v / 0.028349523125 },
      { id: "stone", name: "Stone (UK)", symbol: "st", system: "imperial", toBase: (v) => v * 6.35029318, fromBase: (v) => v / 6.35029318 },
      { id: "carat", name: "Carat", symbol: "ct", system: "other", toBase: (v) => v * 0.0002, fromBase: (v) => v / 0.0002 },
      { id: "grain", name: "Grain", symbol: "gr", system: "imperial", toBase: (v) => v * 0.00006479891, fromBase: (v) => v / 0.00006479891 },
      { id: "short_ton", name: "Short Ton (US)", symbol: "ton (US)", system: "us_customary", toBase: (v) => v * 907.18474, fromBase: (v) => v / 907.18474 },
      { id: "long_ton", name: "Long Ton (UK)", symbol: "ton (UK)", system: "imperial", toBase: (v) => v * 1016.0469088, fromBase: (v) => v / 1016.0469088 },
    ],
  },
  time: {
    id: "time",
    name: "Time",
    baseUnit: "second",
    units: [
      { id: "second", name: "Second", symbol: "s", system: "metric", toBase: (v) => v, fromBase: (v) => v },
      { id: "millisecond", name: "Millisecond", symbol: "ms", system: "metric", toBase: (v) => v * 0.001, fromBase: (v) => v / 0.001 },
      { id: "minute", name: "Minute", symbol: "min", system: "other", toBase: (v) => v * 60, fromBase: (v) => v / 60 },
      { id: "hour", name: "Hour", symbol: "hr", system: "other", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { id: "day", name: "Day", symbol: "d", system: "other", toBase: (v) => v * 86400, fromBase: (v) => v / 86400 },
      { id: "week", name: "Week", symbol: "wk", system: "other", toBase: (v) => v * 604800, fromBase: (v) => v / 604800 },
      { id: "month", name: "Month (Avg)", symbol: "mo", system: "other", toBase: (v) => v * 2629800, fromBase: (v) => v / 2629800 },
      { id: "year", name: "Year (Avg)", symbol: "yr", system: "other", toBase: (v) => v * 31557600, fromBase: (v) => v / 31557600 },
      { id: "decade", name: "Decade", symbol: "dec", system: "other", toBase: (v) => v * 315576000, fromBase: (v) => v / 315576000 },
      { id: "century", name: "Century", symbol: "cen", system: "other", toBase: (v) => v * 3155760000, fromBase: (v) => v / 3155760000 },
    ],
  },
  speed: {
    id: "speed",
    name: "Speed & Velocity",
    baseUnit: "meters_per_second",
    units: [
      { id: "meters_per_second", name: "Meters per Second", symbol: "m/s", system: "metric", toBase: (v) => v, fromBase: (v) => v },
      { id: "kilometers_per_hour", name: "Kilometers per Hour", symbol: "km/h", system: "metric", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { id: "miles_per_hour", name: "Miles per Hour", symbol: "mph", system: "imperial", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { id: "knot", name: "Knot (Nautical mi/h)", symbol: "kn", system: "other", toBase: (v) => (v * 1852) / 3600, fromBase: (v) => (v * 3600) / 1852 },
      { id: "feet_per_second", name: "Feet per Second", symbol: "ft/s", system: "imperial", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: "mach", name: "Mach (Speed of Sound)", symbol: "M", system: "other", toBase: (v) => v * 340.29, fromBase: (v) => v / 340.29 },
    ],
  },
  pressure: {
    id: "pressure",
    name: "Pressure",
    baseUnit: "pascal",
    units: [
      { id: "pascal", name: "Pascal", symbol: "Pa", system: "metric", toBase: (v) => v, fromBase: (v) => v },
      { id: "kilopascal", name: "Kilopascal", symbol: "kPa", system: "metric", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "megapascal", name: "Megapascal", symbol: "MPa", system: "metric", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
      { id: "bar", name: "Bar", symbol: "bar", system: "metric", toBase: (v) => v * 100000, fromBase: (v) => v / 100000 },
      { id: "psi", name: "Pounds per Square Inch", symbol: "psi", system: "imperial", toBase: (v) => v * 6894.757293, fromBase: (v) => v / 6894.757293 },
      { id: "atmosphere", name: "Standard Atmosphere", symbol: "atm", system: "other", toBase: (v) => v * 101325, fromBase: (v) => v / 101325 },
      { id: "torr", name: "Torr (mmHg)", symbol: "Torr", system: "other", toBase: (v) => (v * 101325) / 760, fromBase: (v) => (v * 760) / 101325 },
    ],
  },
  energy: {
    id: "energy",
    name: "Energy & Work",
    baseUnit: "joule",
    units: [
      { id: "joule", name: "Joule", symbol: "J", system: "metric", toBase: (v) => v, fromBase: (v) => v },
      { id: "kilojoule", name: "Kilojoule", symbol: "kJ", system: "metric", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "calorie", name: "Calorie (thermochemical)", symbol: "cal", system: "metric", toBase: (v) => v * 4.184, fromBase: (v) => v / 4.184 },
      { id: "kilocalorie", name: "Kilocalorie (Food Cal)", symbol: "kcal", system: "metric", toBase: (v) => v * 4184, fromBase: (v) => v / 4184 },
      { id: "watt_hour", name: "Watt-hour", symbol: "Wh", system: "metric", toBase: (v) => v * 3600, fromBase: (v) => v / 3600 },
      { id: "kilowatt_hour", name: "Kilowatt-hour", symbol: "kWh", system: "metric", toBase: (v) => v * 3.6e6, fromBase: (v) => v / 3.6e6 },
      { id: "btu", name: "British Thermal Unit (ISO)", symbol: "BTU", system: "imperial", toBase: (v) => v * 1055.05585, fromBase: (v) => v / 1055.05585 },
      { id: "electronvolt", name: "Electronvolt", symbol: "eV", system: "other", toBase: (v) => v * 1.602176634e-19, fromBase: (v) => v / 1.602176634e-19 },
      { id: "foot_pound", name: "Foot-pound", symbol: "ft⋅lbf", system: "imperial", toBase: (v) => v * 1.3558179483314, fromBase: (v) => v / 1.3558179483314 },
    ],
  },
  power: {
    id: "power",
    name: "Power",
    baseUnit: "watt",
    units: [
      { id: "watt", name: "Watt", symbol: "W", system: "metric", toBase: (v) => v, fromBase: (v) => v },
      { id: "kilowatt", name: "Kilowatt", symbol: "kW", system: "metric", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "megawatt", name: "Megawatt", symbol: "MW", system: "metric", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
      { id: "horsepower_us", name: "Horsepower (Mechanical)", symbol: "hp", system: "imperial", toBase: (v) => v * 745.6998715822702, fromBase: (v) => v / 745.6998715822702 },
      { id: "horsepower_metric", name: "Horsepower (Metric PS)", symbol: "PS", system: "metric", toBase: (v) => v * 735.49875, fromBase: (v) => v / 735.49875 },
      { id: "btu_per_hour", name: "BTU per Hour", symbol: "BTU/hr", system: "imperial", toBase: (v) => v * 0.29307107, fromBase: (v) => v / 0.29307107 },
    ],
  },
  data: {
    id: "data",
    name: "Digital Storage & Data",
    baseUnit: "byte",
    units: [
      { id: "byte", name: "Byte", symbol: "B", system: "metric", toBase: (v) => v, fromBase: (v) => v },
      { id: "bit", name: "Bit", symbol: "b", system: "metric", toBase: (v) => v * 0.125, fromBase: (v) => v / 0.125 },
      { id: "kilobyte", name: "Kilobyte (SI)", symbol: "kB", system: "metric", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "megabyte", name: "Megabyte (SI)", symbol: "MB", system: "metric", toBase: (v) => v * 1e6, fromBase: (v) => v / 1e6 },
      { id: "gigabyte", name: "Gigabyte (SI)", symbol: "GB", system: "metric", toBase: (v) => v * 1e9, fromBase: (v) => v / 1e9 },
      { id: "terabyte", name: "Terabyte (SI)", symbol: "TB", system: "metric", toBase: (v) => v * 1e12, fromBase: (v) => v / 1e12 },
      { id: "petabyte", name: "Petabyte (SI)", symbol: "PB", system: "metric", toBase: (v) => v * 1e15, fromBase: (v) => v / 1e15 },
      { id: "kibibyte", name: "Kibibyte (Binary)", symbol: "KiB", system: "other", toBase: (v) => v * 1024, fromBase: (v) => v / 1024 },
      { id: "mebibyte", name: "Mebibyte (Binary)", symbol: "MiB", system: "other", toBase: (v) => v * 1048576, fromBase: (v) => v / 1048576 },
      { id: "gibibyte", name: "Gibibyte (Binary)", symbol: "GiB", system: "other", toBase: (v) => v * 1073741824, fromBase: (v) => v / 1073741824 },
      { id: "tebibyte", name: "Tebibyte (Binary)", symbol: "TiB", system: "other", toBase: (v) => v * 1099511627776, fromBase: (v) => v / 1099511627776 },
    ],
  },
  fuel: {
    id: "fuel",
    name: "Fuel Economy",
    baseUnit: "mpg_us",
    units: [
      { id: "mpg_us", name: "Miles per Gallon (US)", symbol: "MPG (US)", system: "us_customary", toBase: (v) => v, fromBase: (v) => v },
      { id: "mpg_uk", name: "Miles per Gallon (UK)", symbol: "MPG (UK)", system: "imperial", toBase: (v) => v / 1.20095, fromBase: (v) => v * 1.20095 },
      { id: "liters_per_100km", name: "Liters per 100 km", symbol: "L/100km", system: "metric", toBase: (v) => (v > 0 ? 235.214583 / v : 0), fromBase: (v) => (v > 0 ? 235.214583 / v : 0) },
      { id: "km_per_liter", name: "Kilometers per Liter", symbol: "km/L", system: "metric", toBase: (v) => v * 2.35214583, fromBase: (v) => v / 2.35214583 },
    ],
  },
};

export interface ConversionResult {
  fromUnit: UnitDefinition;
  toUnit: UnitDefinition;
  inputValue: number;
  outputValue: number;
  formulaDescription: string;
  allConversions: {
    unit: UnitDefinition;
    value: number;
    formatted: string;
  }[];
}

export function formatNumberPrecision(val: number, precision = 4, scientific = false): string {
  if (val === 0) return "0";
  if (scientific || Math.abs(val) >= 1e9 || (Math.abs(val) < 1e-4 && Math.abs(val) > 0)) {
    return val.toExponential(precision);
  }
  // Trim trailing zeroes for clean aesthetic
  const fixed = val.toFixed(precision);
  const parsed = parseFloat(fixed);
  return fixed.includes(".") ? fixed.replace(/\.?0+$/, "") : parsed.toString();
}

export function convertUnit(
  category: UnitCategory,
  fromUnitId: string,
  toUnitId: string,
  value: number,
  precision = 4,
  scientific = false
): ConversionResult {
  const cat = CONVERSION_CATEGORIES[category] || CONVERSION_CATEGORIES.length;
  const fromUnit = cat.units.find((u) => u.id === fromUnitId) || cat.units[0];
  const toUnit = cat.units.find((u) => u.id === toUnitId) || cat.units[1] || cat.units[0];

  // 1. Convert to Base
  const baseVal = fromUnit.toBase(value);

  // 2. Convert from Base to Target
  const outputValue = toUnit.fromBase(baseVal);

  // 3. Construct Formula String
  let formulaDescription = "";
  if (category === "temperature") {
    if (fromUnit.id === "celsius" && toUnit.id === "fahrenheit") {
      formulaDescription = `(${value} × 9/5) + 32 = ${formatNumberPrecision(outputValue, precision, scientific)} °F`;
    } else if (fromUnit.id === "fahrenheit" && toUnit.id === "celsius") {
      formulaDescription = `(${value} - 32) × 5/9 = ${formatNumberPrecision(outputValue, precision, scientific)} °C`;
    } else if (fromUnit.id === "celsius" && toUnit.id === "kelvin") {
      formulaDescription = `${value} + 273.15 = ${formatNumberPrecision(outputValue, precision, scientific)} K`;
    } else {
      formulaDescription = `T(${toUnit.symbol}) = f(T(${fromUnit.symbol}))`;
    }
  } else if (category === "fuel") {
    formulaDescription = `${value} ${fromUnit.symbol} ➔ ${formatNumberPrecision(outputValue, precision, scientific)} ${toUnit.symbol}`;
  } else {
    // Ratio multiplier
    const factor = toUnit.fromBase(fromUnit.toBase(1));
    formulaDescription = `${value} ${fromUnit.symbol} × ${formatNumberPrecision(factor, 6)} = ${formatNumberPrecision(outputValue, precision, scientific)} ${toUnit.symbol}`;
  }

  // 4. Compute All Units in Category Matrix
  const allConversions = cat.units.map((u) => {
    const val = u.fromBase(baseVal);
    return {
      unit: u,
      value: val,
      formatted: formatNumberPrecision(val, precision, scientific),
    };
  });

  return {
    fromUnit,
    toUnit,
    inputValue: value,
    outputValue,
    formulaDescription,
    allConversions,
  };
}
