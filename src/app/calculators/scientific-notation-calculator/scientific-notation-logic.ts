/**
 * Core mathematical engine for Scientific Notation Calculator & Converter Suite
 */

export interface ScientificNumber {
  mantissa: number; // 1 <= |mantissa| < 10 (when normalized)
  exponent: number; // Integer exponent of 10
}

export interface SIConversionResult {
  scientificNotation: string;
  engineeringNotation: string;
  siPrefixName: string;
  siPrefixSymbol: string;
  eNotation: string;
  standardDecimal: string;
  wordShortScale: string;
}

export interface PhysicalConstantPreset {
  name: string;
  symbol: string;
  unit: string;
  mantissa: number;
  exponent: number;
  description: string;
}

export const PHYSICAL_CONSTANTS: PhysicalConstantPreset[] = [
  {
    name: "Speed of Light",
    symbol: "c",
    unit: "m/s",
    mantissa: 2.9979,
    exponent: 8,
    description: "Speed of electromagnetic waves in vacuum"
  },
  {
    name: "Avogadro's Number",
    symbol: "N_A",
    unit: "mol⁻¹",
    mantissa: 6.0221,
    exponent: 23,
    description: "Number of constituent particles per mole"
  },
  {
    name: "Planck's Constant",
    symbol: "h",
    unit: "J·s",
    mantissa: 6.6261,
    exponent: -34,
    description: "Quantum of electromagnetic action"
  },
  {
    name: "Gravitational Constant",
    symbol: "G",
    unit: "N·m²/kg²",
    mantissa: 6.6743,
    exponent: -11,
    description: "Newtonian constant of gravitation"
  },
  {
    name: "Elementary Charge",
    symbol: "e",
    unit: "C",
    mantissa: 1.6022,
    exponent: -19,
    description: "Electric charge carried by a single proton"
  },
  {
    name: "Mass of Electron",
    symbol: "m_e",
    unit: "kg",
    mantissa: 9.1094,
    exponent: -31,
    description: "Rest mass of a fundamental electron"
  }
];

/**
 * Parse raw decimal, E-notation (3.5e8), or number into ScientificNumber
 */
export function parseToScientific(val: string | number): ScientificNumber {
  if (typeof val === "number") {
    if (val === 0 || !Number.isFinite(val)) return { mantissa: 0, exponent: 0 };
    const exp = Math.floor(Math.log10(Math.abs(val)));
    const man = val / Math.pow(10, exp);
    return normalizeScientific({ mantissa: man, exponent: exp });
  }

  const str = val.trim().toLowerCase();
  if (!str || str === "0") return { mantissa: 0, exponent: 0 };

  if (str.includes("e")) {
    const parts = str.split("e");
    const man = parseFloat(parts[0]) || 0;
    const exp = parseInt(parts[1], 10) || 0;
    return normalizeScientific({ mantissa: man, exponent: exp });
  }

  const num = parseFloat(str);
  if (Number.isNaN(num) || num === 0) return { mantissa: 0, exponent: 0 };

  const exp = Math.floor(Math.log10(Math.abs(num)));
  const man = num / Math.pow(10, exp);
  return normalizeScientific({ mantissa: man, exponent: exp });
}

/**
 * Normalize ScientificNumber so that 1 <= |mantissa| < 10
 */
export function normalizeScientific(num: ScientificNumber): ScientificNumber {
  if (num.mantissa === 0) return { mantissa: 0, exponent: 0 };

  let man = num.mantissa;
  let exp = num.exponent;

  while (Math.abs(man) >= 10) {
    man /= 10;
    exp += 1;
  }

  while (Math.abs(man) < 1 && man !== 0) {
    man *= 10;
    exp -= 1;
  }

  return { mantissa: man, exponent: exp };
}

/**
 * Convert to Normalized Scientific Notation string (e.g. "3.5 × 10⁸")
 */
export function formatNormalizedScientific(num: ScientificNumber, precision: number = 4): string {
  const norm = normalizeScientific(num);
  if (norm.mantissa === 0) return "0";
  const formattedMan = norm.mantissa.toFixed(precision).replace(/\.?0+$/, "");
  return `${formattedMan} × 10^${norm.exponent}`;
}

/**
 * Convert to Engineering Notation (exponent is multiple of 3) & SI Metric Prefix
 */
export function formatEngineeringNotation(num: ScientificNumber, precision: number = 4): {
  engineeringString: string;
  prefixName: string;
  prefixSymbol: string;
} {
  const norm = normalizeScientific(num);
  if (norm.mantissa === 0) {
    return { engineeringString: "0", prefixName: "none", prefixSymbol: "" };
  }

  const exp = norm.exponent;
  const rem = ((exp % 3) + 3) % 3; // Ensure positive remainder
  const engExp = exp - rem;
  const engMan = norm.mantissa * Math.pow(10, rem);

  const siPrefixes: Record<number, { name: string; symbol: string }> = {
    24: { name: "Yotta", symbol: "Y" },
    21: { name: "Zetta", symbol: "Z" },
    18: { name: "Exa", symbol: "E" },
    15: { name: "Peta", symbol: "P" },
    12: { name: "Tera", symbol: "T" },
    9: { name: "Giga", symbol: "G" },
    6: { name: "Mega", symbol: "M" },
    3: { name: "Kilo", symbol: "k" },
    0: { name: "", symbol: "" },
    "-3": { name: "Milli", symbol: "m" },
    "-6": { name: "Micro", symbol: "μ" },
    "-9": { name: "Nano", symbol: "n" },
    "-12": { name: "Pico", symbol: "p" },
    "-15": { name: "Femto", symbol: "f" },
    "-18": { name: "Atto", symbol: "a" },
    "-21": { name: "Zepto", symbol: "z" },
    "-24": { name: "Yocto", symbol: "y" }
  };

  const prefix = siPrefixes[engExp] || { name: "", symbol: "" };
  const formattedMan = engMan.toFixed(precision).replace(/\.?0+$/, "");
  const engineeringString = `${formattedMan} × 10^${engExp}`;

  return {
    engineeringString,
    prefixName: prefix.name,
    prefixSymbol: prefix.symbol
  };
}

/**
 * Format to E-Notation (e.g. 3.5E+08)
 */
export function formatENotation(num: ScientificNumber, precision: number = 4): string {
  const norm = normalizeScientific(num);
  if (norm.mantissa === 0) return "0E+00";
  const sign = norm.exponent >= 0 ? "+" : "";
  const formattedMan = norm.mantissa.toFixed(precision).replace(/\.?0+$/, "");
  return `${formattedMan}E${sign}${norm.exponent}`;
}

/**
 * Format to Standard Expanded Decimal Form with comma digit grouping
 */
export function formatStandardDecimal(num: ScientificNumber, precision: number = 4): string {
  const norm = normalizeScientific(num);
  const realVal = norm.mantissa * Math.pow(10, norm.exponent);

  if (!Number.isFinite(realVal)) {
    return `${norm.mantissa} × 10^${norm.exponent}`;
  }

  if (Math.abs(norm.exponent) > 20) {
    return realVal.toExponential(precision);
  }

  return realVal.toLocaleString("en-US", { maximumFractionDigits: precision });
}

/**
 * Format to Short Scale Written English Word Representation
 */
export function formatWordRepresentation(num: ScientificNumber): string {
  const norm = normalizeScientific(num);
  const exp = norm.exponent;

  const scales: Record<number, string> = {
    3: "Thousand",
    6: "Million",
    9: "Billion",
    12: "Trillion",
    15: "Quadrillion",
    18: "Quintillion",
    "-3": "Thousandths",
    "-6": "Millionths",
    "-9": "Billionths",
    "-12": "Trillionths"
  };

  const rem = ((exp % 3) + 3) % 3;
  const scaleExp = exp - rem;
  const val = norm.mantissa * Math.pow(10, rem);

  const word = scales[scaleExp];
  if (word) {
    return `${val.toFixed(2).replace(/\.?0+$/, "")} ${word}`;
  }

  return formatNormalizedScientific(norm);
}

/**
 * Addition: X + Y
 */
export function addScientific(x: ScientificNumber, y: ScientificNumber): ScientificNumber {
  const maxExp = Math.max(x.exponent, y.exponent);
  const xScaled = x.mantissa * Math.pow(10, x.exponent - maxExp);
  const yScaled = y.mantissa * Math.pow(10, y.exponent - maxExp);
  return normalizeScientific({ mantissa: xScaled + yScaled, exponent: maxExp });
}

/**
 * Subtraction: X - Y
 */
export function subtractScientific(x: ScientificNumber, y: ScientificNumber): ScientificNumber {
  const maxExp = Math.max(x.exponent, y.exponent);
  const xScaled = x.mantissa * Math.pow(10, x.exponent - maxExp);
  const yScaled = y.mantissa * Math.pow(10, y.exponent - maxExp);
  return normalizeScientific({ mantissa: xScaled - yScaled, exponent: maxExp });
}

/**
 * Multiplication: X * Y
 */
export function multiplyScientific(x: ScientificNumber, y: ScientificNumber): ScientificNumber {
  return normalizeScientific({
    mantissa: x.mantissa * y.mantissa,
    exponent: x.exponent + y.exponent
  });
}

/**
 * Division: X / Y
 */
export function divideScientific(x: ScientificNumber, y: ScientificNumber): ScientificNumber {
  if (y.mantissa === 0) {
    throw new Error("Division by Zero");
  }
  return normalizeScientific({
    mantissa: x.mantissa / y.mantissa,
    exponent: x.exponent - y.exponent
  });
}

/**
 * Power: X^p
 */
export function powerScientific(x: ScientificNumber, p: number): ScientificNumber {
  const realVal = x.mantissa * Math.pow(10, x.exponent);
  const powered = Math.pow(realVal, p);
  return parseToScientific(powered);
}

/**
 * Square Root: sqrt(X)
 */
export function squareRootScientific(x: ScientificNumber): ScientificNumber {
  const realVal = x.mantissa * Math.pow(10, x.exponent);
  if (realVal < 0) {
    throw new Error("Square root of negative number");
  }
  return parseToScientific(Math.sqrt(realVal));
}

/**
 * Square: X^2
 */
export function squareScientific(x: ScientificNumber): ScientificNumber {
  return multiplyScientific(x, x);
}

/**
 * Step-by-step arithmetic derivation explanation generator
 */
export function explainArithmeticStepByStep(
  x: ScientificNumber,
  y: ScientificNumber,
  op: "add" | "sub" | "mult" | "div" | "sqrt" | "sq"
): string {
  const normX = normalizeScientific(x);
  const normY = normalizeScientific(y);

  if (op === "add") {
    const maxExp = Math.max(normX.exponent, normY.exponent);
    const xScaled = normX.mantissa * Math.pow(10, normX.exponent - maxExp);
    const yScaled = normY.mantissa * Math.pow(10, normY.exponent - maxExp);
    const sumMan = xScaled + yScaled;
    const alignedStr = normX.exponent === normY.exponent
      ? `Add coefficients: (${normX.mantissa.toFixed(4)} + ${normY.mantissa.toFixed(4)}) × 10^${maxExp} = ${sumMan.toFixed(4)} × 10^${maxExp}`
      : `Align exponents to 10^${maxExp}: (${xScaled.toFixed(4)} + ${yScaled.toFixed(4)}) × 10^${maxExp} = ${sumMan.toFixed(4)} × 10^${maxExp}`;
    const normalized = normalizeScientific({ mantissa: sumMan, exponent: maxExp });
    if (sumMan !== 0 && (Math.abs(sumMan) >= 10 || Math.abs(sumMan) < 1)) {
      return `${alignedStr} → Re-normalize: ${normalized.mantissa.toFixed(4)} × 10^${normalized.exponent}`;
    }
    return alignedStr;
  }

  if (op === "sub") {
    const maxExp = Math.max(normX.exponent, normY.exponent);
    const xScaled = normX.mantissa * Math.pow(10, normX.exponent - maxExp);
    const yScaled = normY.mantissa * Math.pow(10, normY.exponent - maxExp);
    const diffMan = xScaled - yScaled;
    const alignedStr = normX.exponent === normY.exponent
      ? `Subtract coefficients: (${normX.mantissa.toFixed(4)} - ${normY.mantissa.toFixed(4)}) × 10^${maxExp} = ${diffMan.toFixed(4)} × 10^${maxExp}`
      : `Align exponents to 10^${maxExp}: (${xScaled.toFixed(4)} - ${yScaled.toFixed(4)}) × 10^${maxExp} = ${diffMan.toFixed(4)} × 10^${maxExp}`;
    const normalized = normalizeScientific({ mantissa: diffMan, exponent: maxExp });
    if (diffMan !== 0 && (Math.abs(diffMan) >= 10 || Math.abs(diffMan) < 1)) {
      return `${alignedStr} → Re-normalize: ${normalized.mantissa.toFixed(4)} × 10^${normalized.exponent}`;
    }
    return alignedStr;
  }

  if (op === "mult") {
    const productMan = normX.mantissa * normY.mantissa;
    const sumExp = normX.exponent + normY.exponent;
    const rawStr = `Multiply coefficients & add exponents: (${normX.mantissa} × ${normY.mantissa}) × 10^(${normX.exponent} + ${normY.exponent}) = ${productMan.toFixed(4)} × 10^${sumExp}`;
    const normalized = normalizeScientific({ mantissa: productMan, exponent: sumExp });
    if (productMan !== 0 && (Math.abs(productMan) >= 10 || Math.abs(productMan) < 1)) {
      return `${rawStr} → Re-normalize: ${normalized.mantissa.toFixed(4)} × 10^${normalized.exponent}`;
    }
    return rawStr;
  }

  if (op === "div") {
    if (normY.mantissa === 0) return "Error: Division by zero is undefined.";
    const divMan = normX.mantissa / normY.mantissa;
    const diffExp = normX.exponent - normY.exponent;
    const rawStr = `Divide coefficients & subtract exponents: (${normX.mantissa} / ${normY.mantissa}) × 10^(${normX.exponent} - ${normY.exponent}) = ${divMan.toFixed(4)} × 10^${diffExp}`;
    const normalized = normalizeScientific({ mantissa: divMan, exponent: diffExp });
    if (divMan !== 0 && (Math.abs(divMan) >= 10 || Math.abs(divMan) < 1)) {
      return `${rawStr} → Re-normalize: ${normalized.mantissa.toFixed(4)} × 10^${normalized.exponent}`;
    }
    return rawStr;
  }

  if (op === "sq") {
    const sqMan = normX.mantissa * normX.mantissa;
    const sqExp = normX.exponent * 2;
    const rawStr = `Square coefficient & double exponent: (${normX.mantissa})² × 10^(${normX.exponent} × 2) = ${sqMan.toFixed(4)} × 10^${sqExp}`;
    const normalized = normalizeScientific({ mantissa: sqMan, exponent: sqExp });
    if (sqMan >= 10) {
      return `${rawStr} → Re-normalize: ${normalized.mantissa.toFixed(4)} × 10^${normalized.exponent}`;
    }
    return rawStr;
  }

  if (op === "sqrt") {
    const realVal = normX.mantissa * Math.pow(10, normX.exponent);
    if (realVal < 0) return "Error: Square root of a negative number is undefined in real numbers.";
    return `sqrt(${normX.mantissa} × 10^${normX.exponent}) = sqrt(${realVal}) = ${Math.sqrt(realVal).toExponential(4)}`;
  }

  return "Calculation completed.";
}
