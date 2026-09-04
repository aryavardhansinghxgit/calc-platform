/**
 * Mathematical logic engine for Area Calculator & 2D Geometry Suite
 * Fully audited, precision-aware, zero-preserving, and non-clamping.
 */

export interface AreaResult {
  isValid: boolean;
  error?: string;
  shapeName: string;
  area: number;
  formattedArea: string;
  perimeter?: number;
  formattedPerimeter?: string;
  diagonal?: number;
  formattedDiagonal?: string;
  circumference?: number;
  formattedCircumference?: string;
  arcLength?: number;
  formattedArcLength?: string;
  apothem?: number;
  formattedApothem?: string;
  formula: string;
  conversions: {
    sqMeters: string;
    sqCentimeters: string;
    sqMillimeters: string;
    sqFeet: string;
    sqInches: string;
    sqYards: string;
    acres: string;
    hectares: string;
    sqMiles: string;
  };
  rawConversions: {
    sqMeters: number;
    sqCentimeters: number;
    sqMillimeters: number;
    sqFeet: number;
    sqInches: number;
    sqYards: number;
    acres: number;
    hectares: number;
    sqMiles: number;
  };
  stepText: string;
}

export type AreaUnit = "m" | "cm" | "mm" | "ft" | "in" | "yd";

/**
 * Format a number to string with exact decimal precision, preserving trailing zeros.
 */
export function formatNumber(val: number, precision: number = 4): string {
  if (!Number.isFinite(val)) return "0";
  return val.toFixed(precision);
}

/**
 * Format small area conversions so that non-zero values never appear as 0.
 * If value < 10^(-precision), renders "< 0.0001" or scientific notation.
 */
export function formatSmallArea(val: number, precision: number = 4): string {
  if (!Number.isFinite(val)) return "0";
  if (val === 0) return (0).toFixed(precision);
  const threshold = Math.pow(10, -precision);
  if (Math.abs(val) < threshold) {
    return `< ${threshold.toFixed(precision)}`;
  }
  return val.toFixed(precision);
}

/**
 * Convert an area in a specified unit to square meters (m²).
 * All factors are exact SI / International Yard & Foot standard definitions.
 */
export function toSquareMeters(areaVal: number, unit: AreaUnit): number {
  if (!Number.isFinite(areaVal) || areaVal <= 0) return 0;
  switch (unit) {
    case "cm": return areaVal * 0.0001;
    case "mm": return areaVal * 0.000001;
    case "ft": return areaVal * 0.09290304; // (0.3048 m)^2
    case "in": return areaVal * 0.00064516; // (0.0254 m)^2
    case "yd": return areaVal * 0.83612736; // (0.9144 m)^2
    default: return areaVal; // m²
  }
}

/**
 * Convert area in m² to standard area units, returning both formatted strings and raw floats.
 */
export function convertAreaFromSquareMeters(areaM2: number, precision: number = 4) {
  const m2 = Math.max(0, Number.isFinite(areaM2) ? areaM2 : 0);
  const raw = {
    sqMeters: m2,
    sqCentimeters: m2 * 10000,
    sqMillimeters: m2 * 1000000,
    sqFeet: m2 / 0.09290304, // exact inverse: 1 ft² = 0.09290304 m²
    sqInches: m2 / 0.00064516, // exact inverse: 1 in² = 0.00064516 m²
    sqYards: m2 / 0.83612736, // exact inverse: 1 yd² = 0.83612736 m²
    acres: m2 / 4046.8564224, // 1 acre = 43,560 sq ft = 4046.8564224 m²
    hectares: m2 / 10000, // 1 ha = 10,000 m²
    sqMiles: m2 / 2589988.110336 // 1 sq mi = 640 acres = 2589988.110336 m²
  };

  const formatted = {
    sqMeters: formatNumber(raw.sqMeters, precision),
    sqCentimeters: formatNumber(raw.sqCentimeters, precision),
    sqMillimeters: formatNumber(raw.sqMillimeters, precision),
    sqFeet: formatNumber(raw.sqFeet, precision),
    sqInches: formatNumber(raw.sqInches, precision),
    sqYards: formatNumber(raw.sqYards, precision),
    acres: formatSmallArea(raw.acres, precision),
    hectares: formatSmallArea(raw.hectares, precision),
    sqMiles: formatSmallArea(raw.sqMiles, precision)
  };

  return { raw, formatted };
}

function createInvalidResult(shapeName: string, formula: string, error: string, precision: number = 4): AreaResult {
  const { raw, formatted } = convertAreaFromSquareMeters(0, precision);
  return {
    isValid: false,
    error,
    shapeName,
    area: 0,
    formattedArea: formatNumber(0, precision),
    formula,
    conversions: formatted,
    rawConversions: raw,
    stepText: `Error: ${error}`
  };
}

// 1. RECTANGLE
export function computeRectangleArea(
  length: number,
  width: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const formula = "A = l × w";
  if (!Number.isFinite(length) || length <= 0 || !Number.isFinite(width) || width <= 0) {
    return createInvalidResult("Rectangle", formula, "Length and width must be positive numbers greater than zero.", precision);
  }

  const area = length * width;
  const perimeter = 2 * (length + width);
  const diagonal = Math.sqrt(length * length + width * width);

  const areaM2 = toSquareMeters(area, unit);
  const { raw, formatted } = convertAreaFromSquareMeters(areaM2, precision);

  return {
    isValid: true,
    shapeName: "Rectangle",
    area,
    formattedArea: formatNumber(area, precision),
    perimeter,
    formattedPerimeter: formatNumber(perimeter, precision),
    diagonal,
    formattedDiagonal: formatNumber(diagonal, precision),
    formula,
    conversions: formatted,
    rawConversions: raw,
    stepText: `1. Area A = length × width = ${length} × ${width} = ${formatNumber(area, precision)} ${unit}².\n2. Perimeter P = 2(l + w) = 2(${length} + ${width}) = ${formatNumber(perimeter, precision)} ${unit}.\n3. Diagonal d = √(l² + w²) = √(${length}² + ${width}²) = ${formatNumber(diagonal, precision)} ${unit}.`
  };
}

// 2. TRIANGLE (BASE & HEIGHT)
export function computeTriangleAreaBaseHeight(
  base: number,
  height: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const formula = "A = ½ × b × h";
  if (!Number.isFinite(base) || base <= 0 || !Number.isFinite(height) || height <= 0) {
    return createInvalidResult("Triangle (Base & Height)", formula, "Base and height must be positive numbers greater than zero.", precision);
  }

  const area = 0.5 * base * height;
  const areaM2 = toSquareMeters(area, unit);
  const { raw, formatted } = convertAreaFromSquareMeters(areaM2, precision);

  return {
    isValid: true,
    shapeName: "Triangle (Base & Height)",
    area,
    formattedArea: formatNumber(area, precision),
    formula,
    conversions: formatted,
    rawConversions: raw,
    stepText: `1. Area A = ½ × base × height = 0.5 × ${base} × ${height} = ${formatNumber(area, precision)} ${unit}².`
  };
}

// 3. TRIANGLE (HERON'S FORMULA)
export function computeTriangleAreaHeron(
  a: number,
  b: number,
  c: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const formula = "A = √[s(s-a)(s-b)(s-c)]";
  if (!Number.isFinite(a) || a <= 0 || !Number.isFinite(b) || b <= 0 || !Number.isFinite(c) || c <= 0) {
    return createInvalidResult("Triangle (Heron's Formula)", formula, "All three side lengths must be positive numbers greater than zero.", precision);
  }

  // Triangle inequality check
  if (a + b <= c || a + c <= b || b + c <= a) {
    return createInvalidResult(
      "Triangle (Heron's Formula)",
      formula,
      "Side lengths must satisfy the triangle inequality (the sum of any two sides must exceed the third).",
      precision
    );
  }

  const s = (a + b + c) / 2.0;
  const val = s * (s - a) * (s - b) * (s - c);
  if (val <= 0) {
    return createInvalidResult(
      "Triangle (Heron's Formula)",
      formula,
      "The specified side lengths produce a degenerate or collinear triangle.",
      precision
    );
  }

  const area = Math.sqrt(val);
  const perimeter = a + b + c;
  const areaM2 = toSquareMeters(area, unit);
  const { raw, formatted } = convertAreaFromSquareMeters(areaM2, precision);

  return {
    isValid: true,
    shapeName: "Triangle (Heron's Formula)",
    area,
    formattedArea: formatNumber(area, precision),
    perimeter,
    formattedPerimeter: formatNumber(perimeter, precision),
    formula,
    conversions: formatted,
    rawConversions: raw,
    stepText: `1. Semi-perimeter s = (${a} + ${b} + ${c}) / 2 = ${formatNumber(s, precision)}.\n2. Heron's Formula A = √[${formatNumber(s, precision)} × (${formatNumber(s, precision)}-${a}) × (${formatNumber(s, precision)}-${b}) × (${formatNumber(s, precision)}-${c})] = ${formatNumber(area, precision)} ${unit}².\n3. Perimeter P = ${a} + ${b} + ${c} = ${formatNumber(perimeter, precision)} ${unit}.`
  };
}

// 4. CIRCLE
export function computeCircleArea(
  radius: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const formula = "A = π × r²";
  if (!Number.isFinite(radius) || radius <= 0) {
    return createInvalidResult("Circle", formula, "Radius must be a positive number greater than zero.", precision);
  }

  const area = Math.PI * radius * radius;
  const circumference = 2 * Math.PI * radius;
  const areaM2 = toSquareMeters(area, unit);
  const { raw, formatted } = convertAreaFromSquareMeters(areaM2, precision);

  return {
    isValid: true,
    shapeName: "Circle",
    area,
    formattedArea: formatNumber(area, precision),
    circumference,
    formattedCircumference: formatNumber(circumference, precision),
    formula,
    conversions: formatted,
    rawConversions: raw,
    stepText: `1. Area A = π × r² = π × ${radius}² = ${formatNumber(area, precision)} ${unit}².\n2. Circumference C = 2 × π × r = 2 × π × ${radius} = ${formatNumber(circumference, precision)} ${unit}.`
  };
}

// 5. CIRCULAR SECTOR
export function computeSectorArea(
  radius: number,
  angleDeg: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const formula = "A = (θ / 360°) × πr²";
  if (!Number.isFinite(radius) || radius <= 0) {
    return createInvalidResult("Circular Sector", formula, "Radius must be a positive number greater than zero.", precision);
  }
  if (!Number.isFinite(angleDeg) || angleDeg <= 0 || angleDeg > 360) {
    return createInvalidResult("Circular Sector", formula, "Central angle must be greater than 0° and at most 360°.", precision);
  }

  const area = (angleDeg / 360.0) * Math.PI * radius * radius;
  const arcLength = (angleDeg / 360.0) * 2 * Math.PI * radius;
  const areaM2 = toSquareMeters(area, unit);
  const { raw, formatted } = convertAreaFromSquareMeters(areaM2, precision);

  return {
    isValid: true,
    shapeName: "Circular Sector",
    area,
    formattedArea: formatNumber(area, precision),
    arcLength,
    formattedArcLength: formatNumber(arcLength, precision),
    formula,
    conversions: formatted,
    rawConversions: raw,
    stepText: `1. Sector Area A = (${angleDeg}° / 360°) × π × ${radius}² = ${formatNumber(area, precision)} ${unit}².\n2. Arc Length L = (${angleDeg}° / 360°) × 2π × ${radius} = ${formatNumber(arcLength, precision)} ${unit}.`
  };
}

// 6. ANNULUS (RING)
export function computeAnnulusArea(
  outerR: number,
  innerR: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const formula = "A = π × (R² - r²)";
  if (!Number.isFinite(outerR) || outerR <= 0 || !Number.isFinite(innerR) || innerR <= 0) {
    return createInvalidResult("Annulus (Ring)", formula, "Both radii must be positive numbers greater than zero.", precision);
  }
  if (innerR >= outerR) {
    return createInvalidResult("Annulus (Ring)", formula, "Inner radius must be less than outer radius.", precision);
  }

  const area = Math.PI * (outerR * outerR - innerR * innerR);
  const areaM2 = toSquareMeters(area, unit);
  const { raw, formatted } = convertAreaFromSquareMeters(areaM2, precision);

  return {
    isValid: true,
    shapeName: "Annulus (Ring)",
    area,
    formattedArea: formatNumber(area, precision),
    formula,
    conversions: formatted,
    rawConversions: raw,
    stepText: `1. Annulus Area A = π × (${outerR}² - ${innerR}²) = π × (${outerR * outerR} - ${innerR * innerR}) = ${formatNumber(area, precision)} ${unit}².`
  };
}

// 7. ELLIPSE
export function computeEllipseArea(
  semiMajorA: number,
  semiMinorB: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const formula = "A = π × a × b";
  if (!Number.isFinite(semiMajorA) || semiMajorA <= 0 || !Number.isFinite(semiMinorB) || semiMinorB <= 0) {
    return createInvalidResult("Ellipse", formula, "Semi-major and semi-minor axes must be positive numbers greater than zero.", precision);
  }

  const area = Math.PI * semiMajorA * semiMinorB;
  // Ramanujan first perimeter approximation
  const pApprox = Math.PI * (3 * (semiMajorA + semiMinorB) - Math.sqrt((3 * semiMajorA + semiMinorB) * (semiMajorA + 3 * semiMinorB)));

  const areaM2 = toSquareMeters(area, unit);
  const { raw, formatted } = convertAreaFromSquareMeters(areaM2, precision);

  return {
    isValid: true,
    shapeName: "Ellipse",
    area,
    formattedArea: formatNumber(area, precision),
    perimeter: pApprox,
    formattedPerimeter: formatNumber(pApprox, precision),
    formula,
    conversions: formatted,
    rawConversions: raw,
    stepText: `1. Ellipse Area A = π × a × b = π × ${semiMajorA} × ${semiMinorB} = ${formatNumber(area, precision)} ${unit}².\n2. Ramanujan Perimeter P ≈ ${formatNumber(pApprox, precision)} ${unit}.`
  };
}

// 8. TRAPEZOID
export function computeTrapezoidArea(
  base1: number,
  base2: number,
  height: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const formula = "A = ½ × (b₁ + b₂) × h";
  if (!Number.isFinite(base1) || base1 <= 0 || !Number.isFinite(base2) || base2 <= 0 || !Number.isFinite(height) || height <= 0) {
    return createInvalidResult("Trapezoid", formula, "Bases and height must be positive numbers greater than zero.", precision);
  }

  const area = ((base1 + base2) / 2.0) * height;
  const areaM2 = toSquareMeters(area, unit);
  const { raw, formatted } = convertAreaFromSquareMeters(areaM2, precision);

  return {
    isValid: true,
    shapeName: "Trapezoid",
    area,
    formattedArea: formatNumber(area, precision),
    formula,
    conversions: formatted,
    rawConversions: raw,
    stepText: `1. Trapezoid Area A = ½ × (${base1} + ${base2}) × ${height} = ${formatNumber(area, precision)} ${unit}².`
  };
}

// 9. PARALLELOGRAM
export function computeParallelogramArea(
  base: number,
  height: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const formula = "A = base × height";
  if (!Number.isFinite(base) || base <= 0 || !Number.isFinite(height) || height <= 0) {
    return createInvalidResult("Parallelogram", formula, "Base and height must be positive numbers greater than zero.", precision);
  }

  const area = base * height;
  const areaM2 = toSquareMeters(area, unit);
  const { raw, formatted } = convertAreaFromSquareMeters(areaM2, precision);

  return {
    isValid: true,
    shapeName: "Parallelogram",
    area,
    formattedArea: formatNumber(area, precision),
    formula,
    conversions: formatted,
    rawConversions: raw,
    stepText: `1. Parallelogram Area A = base × height = ${base} × ${height} = ${formatNumber(area, precision)} ${unit}².`
  };
}

// 10. RHOMBUS / KITE
export function computeRhombusArea(
  diag1: number,
  diag2: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const formula = "A = ½ × d₁ × d₂";
  if (!Number.isFinite(diag1) || diag1 <= 0 || !Number.isFinite(diag2) || diag2 <= 0) {
    return createInvalidResult("Rhombus / Kite", formula, "Both diagonals must be positive numbers greater than zero.", precision);
  }

  const area = 0.5 * diag1 * diag2;
  const areaM2 = toSquareMeters(area, unit);
  const { raw, formatted } = convertAreaFromSquareMeters(areaM2, precision);

  return {
    isValid: true,
    shapeName: "Rhombus / Kite",
    area,
    formattedArea: formatNumber(area, precision),
    formula,
    conversions: formatted,
    rawConversions: raw,
    stepText: `1. Rhombus / Kite Area A = ½ × d₁ × d₂ = 0.5 × ${diag1} × ${diag2} = ${formatNumber(area, precision)} ${unit}².`
  };
}

// 11. REGULAR POLYGON (n-gon)
export function computeRegularPolygonArea(
  numSides: number,
  sideLength: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const formula = "A = ½ × Apothem × Perimeter";
  if (!Number.isFinite(numSides) || !Number.isInteger(numSides) || numSides < 3) {
    return createInvalidResult("Regular Polygon", formula, "Number of sides must be an integer of at least 3.", precision);
  }
  if (!Number.isFinite(sideLength) || sideLength <= 0) {
    return createInvalidResult("Regular Polygon", formula, "Side length must be a positive number greater than zero.", precision);
  }

  const n = numSides;
  const s = sideLength;
  const apothem = s / (2.0 * Math.tan(Math.PI / n));
  const perimeter = n * s;
  const area = 0.5 * apothem * perimeter;

  const areaM2 = toSquareMeters(area, unit);
  const { raw, formatted } = convertAreaFromSquareMeters(areaM2, precision);

  return {
    isValid: true,
    shapeName: `Regular ${n}-gon`,
    area,
    formattedArea: formatNumber(area, precision),
    perimeter,
    formattedPerimeter: formatNumber(perimeter, precision),
    apothem,
    formattedApothem: formatNumber(apothem, precision),
    formula,
    conversions: formatted,
    rawConversions: raw,
    stepText: `1. Apothem a = ${s} / [2 × tan(π / ${n})] = ${formatNumber(apothem, precision)}.\n2. Perimeter P = ${n} × ${s} = ${formatNumber(perimeter, precision)}.\n3. Regular Polygon Area A = ½ × ${formatNumber(apothem, precision)} × ${formatNumber(perimeter, precision)} = ${formatNumber(area, precision)} ${unit}².`
  };
}

// 12. IRREGULAR POLYGON (GAUSS SHOELACE ALGORITHM)
export function parseShoelaceCoordinates(rawText: string): { isValid: boolean; points: Array<{ x: number; y: number }>; error?: string } {
  if (!rawText || !rawText.trim()) {
    return { isValid: false, points: [], error: "Please enter at least 3 vertices." };
  }

  const lines = rawText.split("\n").map(l => l.trim()).filter(l => l.length > 0);
  if (lines.length < 3) {
    return { isValid: false, points: [], error: `At least 3 vertices are required (found ${lines.length}).` };
  }

  const points: Array<{ x: number; y: number }> = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // Support comma or whitespace separated: "x, y", "x,y", "x y", "x \t y"
    let parts: string[];
    if (line.includes(",")) {
      parts = line.split(",").map(p => p.trim());
    } else {
      parts = line.split(/\s+/).map(p => p.trim());
    }

    if (parts.length !== 2) {
      return {
        isValid: false,
        points: [],
        error: `Line ${i + 1} ("${line}") must contain exactly two coordinates (X and Y).`
      };
    }

    const x = parseFloat(parts[0]);
    const y = parseFloat(parts[1]);
    if (!Number.isFinite(x) || !Number.isFinite(y)) {
      return {
        isValid: false,
        points: [],
        error: `Line ${i + 1} contains invalid coordinate values ("${parts[0]}", "${parts[1]}").`
      };
    }

    points.push({ x, y });
  }

  return { isValid: true, points };
}

export function computeShoelacePolygonArea(
  points: Array<{ x: number; y: number }>,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const formula = "A = ½ |Σ(x_i y_{i+1} - x_{i+1} y_i)|";
  const n = points ? points.length : 0;
  if (n < 3) {
    return createInvalidResult(
      "Irregular Polygon (Shoelace)",
      formula,
      "At least 3 valid vertices are required to calculate polygon area.",
      precision
    );
  }

  for (let i = 0; i < n; i++) {
    if (!Number.isFinite(points[i].x) || !Number.isFinite(points[i].y)) {
      return createInvalidResult(
        "Irregular Polygon (Shoelace)",
        formula,
        `Vertex ${i + 1} has non-numeric coordinates.`,
        precision
      );
    }
  }

  let sum = 0;
  let perimeter = 0;
  for (let i = 0; i < n; i++) {
    const current = points[i];
    const next = points[(i + 1) % n];
    sum += current.x * next.y - next.x * current.y;
    const dx = next.x - current.x;
    const dy = next.y - current.y;
    perimeter += Math.sqrt(dx * dx + dy * dy);
  }

  const area = Math.abs(sum) / 2.0;
  const areaM2 = toSquareMeters(area, unit);
  const { raw, formatted } = convertAreaFromSquareMeters(areaM2, precision);

  return {
    isValid: true,
    shapeName: `Irregular Polygon (${n} Vertices)`,
    area,
    formattedArea: formatNumber(area, precision),
    perimeter,
    formattedPerimeter: formatNumber(perimeter, precision),
    formula,
    conversions: formatted,
    rawConversions: raw,
    stepText: `1. Applied Gauss's Shoelace Algorithm on ${n} ordered Cartesian vertices.\n2. Evaluated Determinant Sum = ${sum.toFixed(precision)}.\n3. Area A = ½ × |${sum.toFixed(precision)}| = ${formatNumber(area, precision)} ${unit}².\n4. Perimeter P = ${formatNumber(perimeter, precision)} ${unit}.`
  };
}

export const computeShoelaceArea = computeShoelacePolygonArea;

// Polymorphic Triangle helper
export function computeTriangleArea(
  params:
    | { mode: "base-height"; base: number; height: number; unit?: AreaUnit; precision?: number }
    | { mode: "heron"; sideA: number; sideB: number; sideC: number; unit?: AreaUnit; precision?: number }
): AreaResult {
  if (params.mode === "base-height") {
    return computeTriangleAreaBaseHeight(params.base, params.height, params.unit, params.precision);
  }
  return computeTriangleAreaHeron(params.sideA, params.sideB, params.sideC, params.unit, params.precision);
}

// Polymorphic Quadrilateral helper
export function computeQuadrilateralArea(
  mode: "rectangle" | "trapezoid" | "parallelogram" | "rhombus" | "kite",
  params: any,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  switch (mode) {
    case "trapezoid":
      return computeTrapezoidArea(params.b1, params.b2, params.h, unit, precision);
    case "parallelogram":
      return computeParallelogramArea(params.b, params.h, unit, precision);
    case "rhombus":
    case "kite":
      return computeRhombusArea(params.d1, params.d2, unit, precision);
    default:
      return computeRectangleArea(params.length, params.width, unit, precision);
  }
}

// 13. MATERIAL ESTIMATOR
export function computeMaterialEstimate(
  baseArea: number,
  costPerUnit: number,
  wastePercent: number = 0
): { isValid: boolean; error?: string; totalArea: number; totalCost: number } {
  if (!Number.isFinite(baseArea) || baseArea <= 0) {
    return { isValid: false, error: "Base area must be a positive number greater than zero.", totalArea: 0, totalCost: 0 };
  }
  if (!Number.isFinite(costPerUnit) || costPerUnit < 0) {
    return { isValid: false, error: "Unit cost must be a non-negative number.", totalArea: 0, totalCost: 0 };
  }
  if (!Number.isFinite(wastePercent) || wastePercent < 0) {
    return { isValid: false, error: "Waste percentage cannot be negative.", totalArea: 0, totalCost: 0 };
  }

  const totalArea = baseArea * (1.0 + wastePercent / 100.0);
  const totalCost = totalArea * costPerUnit;

  return {
    isValid: true,
    totalArea,
    totalCost
  };
}
