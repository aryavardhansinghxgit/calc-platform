/**
 * Mathematical logic engine for Area Calculator & 2D Geometry Suite
 */

export interface AreaResult {
  shapeName: string;
  area: number;
  perimeter?: number;
  diagonal?: number;
  circumference?: number;
  arcLength?: number;
  apothem?: number;
  formula: string;
  conversions: {
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

export function toSquareMeters(areaVal: number, unit: AreaUnit): number {
  switch (unit) {
    case "cm": return areaVal * 0.0001;
    case "mm": return areaVal * 0.000001;
    case "ft": return areaVal * 0.09290304;
    case "in": return areaVal * 0.00064516;
    case "yd": return areaVal * 0.83612736;
    default: return areaVal; // m²
  }
}

export function convertAreaFromSquareMeters(areaM2: number, precision: number = 4) {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));
  return {
    sqMeters: fmt(areaM2),
    sqCentimeters: fmt(areaM2 * 10000),
    sqMillimeters: fmt(areaM2 * 1000000),
    sqFeet: fmt(areaM2 * 10.7639104),
    sqInches: fmt(areaM2 * 1550.0031),
    sqYards: fmt(areaM2 * 1.19599005),
    acres: fmt(areaM2 / 4046.85642),
    hectares: fmt(areaM2 / 10000),
    sqMiles: fmt(areaM2 / 2589988.11)
  };
}

export function computeRectangleArea(
  length: number,
  width: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const l = Math.max(0.0001, length);
  const w = Math.max(0.0001, width);
  const area = l * w;
  const perimeter = 2 * (l + w);
  const diagonal = Math.sqrt(l * l + w * w);

  const areaM2 = toSquareMeters(area, unit);
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  return {
    shapeName: "Rectangle",
    area: fmt(area),
    perimeter: fmt(perimeter),
    diagonal: fmt(diagonal),
    formula: "A = l × w",
    conversions: convertAreaFromSquareMeters(areaM2, precision),
    stepText: `1. Area A = length × width = ${l} × ${w} = ${fmt(area)} ${unit}².\n2. Perimeter P = 2(l + w) = 2(${l} + ${w}) = ${fmt(perimeter)} ${unit}.\n3. Diagonal d = √(l² + w²) = √(${l}² + ${w}²) = ${fmt(diagonal)} ${unit}.`
  };
}

export function computeTriangleAreaBaseHeight(
  base: number,
  height: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const b = Math.max(0.0001, base);
  const h = Math.max(0.0001, height);
  const area = 0.5 * b * h;

  const areaM2 = toSquareMeters(area, unit);
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  return {
    shapeName: "Triangle (Base & Height)",
    area: fmt(area),
    formula: "A = ½ × b × h",
    conversions: convertAreaFromSquareMeters(areaM2, precision),
    stepText: `1. Area A = ½ × base × height = 0.5 × ${b} × ${h} = ${fmt(area)} ${unit}².`
  };
}

export function computeTriangleAreaHeron(
  a: number,
  b: number,
  c: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const sideA = Math.max(0.0001, a);
  const sideB = Math.max(0.0001, b);
  const sideC = Math.max(0.0001, c);

  const s = (sideA + sideB + sideC) / 2.0;
  const val = s * (s - sideA) * (s - sideB) * (s - sideC);
  const area = val > 0 ? Math.sqrt(val) : 0;
  const perimeter = sideA + sideB + sideC;

  const areaM2 = toSquareMeters(area, unit);
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  return {
    shapeName: "Triangle (Heron's Formula)",
    area: fmt(area),
    perimeter: fmt(perimeter),
    formula: "A = √[s(s-a)(s-b)(s-c)]",
    conversions: convertAreaFromSquareMeters(areaM2, precision),
    stepText: `1. Semi-perimeter s = (${sideA} + ${sideB} + ${sideC}) / 2 = ${fmt(s)}.\n2. Heron's Formula A = √[${fmt(s)} × (${fmt(s)}-${sideA}) × (${fmt(s)}-${sideB}) × (${fmt(s)}-${sideC})] = ${fmt(area)} ${unit}².`
  };
}

export function computeCircleArea(
  radius: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const r = Math.max(0.0001, radius);
  const area = Math.PI * r * r;
  const circumference = 2 * Math.PI * r;

  const areaM2 = toSquareMeters(area, unit);
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  return {
    shapeName: "Circle",
    area: fmt(area),
    circumference: fmt(circumference),
    formula: "A = π × r²",
    conversions: convertAreaFromSquareMeters(areaM2, precision),
    stepText: `1. Area A = π × r² = π × ${r}² = ${fmt(area)} ${unit}².\n2. Circumference C = 2 × π × r = 2 × π × ${r} = ${fmt(circumference)} ${unit}.`
  };
}

export function computeSectorArea(
  radius: number,
  angleDeg: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const r = Math.max(0.0001, radius);
  const angle = Math.max(0, Math.min(360, angleDeg));
  const area = (angle / 360.0) * Math.PI * r * r;
  const arcLength = (angle / 360.0) * 2 * Math.PI * r;

  const areaM2 = toSquareMeters(area, unit);
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  return {
    shapeName: "Circular Sector",
    area: fmt(area),
    arcLength: fmt(arcLength),
    formula: "A = (θ / 360°) × πr²",
    conversions: convertAreaFromSquareMeters(areaM2, precision),
    stepText: `1. Sector Area A = (${angle}° / 360°) × π × ${r}² = ${fmt(area)} ${unit}².\n2. Arc Length L = (${angle}° / 360°) × 2π × ${r} = ${fmt(arcLength)} ${unit}.`
  };
}

export function computeEllipseArea(
  semiMajorA: number,
  semiMinorB: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const a = Math.max(0.0001, semiMajorA);
  const b = Math.max(0.0001, semiMinorB);
  const area = Math.PI * a * b;

  // Ramanujan perimeter approximation
  const pApprox = Math.PI * (3 * (a + b) - Math.sqrt((3 * a + b) * (a + 3 * b)));

  const areaM2 = toSquareMeters(area, unit);
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  return {
    shapeName: "Ellipse",
    area: fmt(area),
    perimeter: fmt(pApprox),
    formula: "A = π × a × b",
    conversions: convertAreaFromSquareMeters(areaM2, precision),
    stepText: `1. Ellipse Area A = π × a × b = π × ${a} × ${b} = ${fmt(area)} ${unit}².\n2. Ramanujan Perimeter P ≈ ${fmt(pApprox)} ${unit}.`
  };
}

export function computeTrapezoidArea(
  base1: number,
  base2: number,
  height: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const b1 = Math.max(0.0001, base1);
  const b2 = Math.max(0.0001, base2);
  const h = Math.max(0.0001, height);
  const area = ((b1 + b2) / 2.0) * h;

  const areaM2 = toSquareMeters(area, unit);
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  return {
    shapeName: "Trapezoid",
    area: fmt(area),
    formula: "A = ½ × (b₁ + b₂) × h",
    conversions: convertAreaFromSquareMeters(areaM2, precision),
    stepText: `1. Trapezoid Area A = ½ × (${b1} + ${b2}) × ${h} = ${fmt(area)} ${unit}².`
  };
}

export function computeParallelogramArea(
  base: number,
  height: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const b = Math.max(0.0001, base);
  const h = Math.max(0.0001, height);
  const area = b * h;

  const areaM2 = toSquareMeters(area, unit);
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  return {
    shapeName: "Parallelogram",
    area: fmt(area),
    formula: "A = base × height",
    conversions: convertAreaFromSquareMeters(areaM2, precision),
    stepText: `1. Parallelogram Area A = base × height = ${b} × ${h} = ${fmt(area)} ${unit}².`
  };
}

export function computeRhombusArea(
  diag1: number,
  diag2: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const d1 = Math.max(0.0001, diag1);
  const d2 = Math.max(0.0001, diag2);
  const area = 0.5 * d1 * d2;

  const areaM2 = toSquareMeters(area, unit);
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  return {
    shapeName: "Rhombus / Kite",
    area: fmt(area),
    formula: "A = ½ × d₁ × d₂",
    conversions: convertAreaFromSquareMeters(areaM2, precision),
    stepText: `1. Rhombus Area A = ½ × d₁ × d₂ = 0.5 × ${d1} × ${d2} = ${fmt(area)} ${unit}².`
  };
}

export function computeAnnulusArea(
  outerR: number,
  innerR: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const R = Math.max(0.0001, outerR);
  const r = Math.min(R - 0.0001, Math.max(0.0001, innerR));
  const area = Math.PI * (R * R - r * r);

  const areaM2 = toSquareMeters(area, unit);
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  return {
    shapeName: "Annulus (Ring)",
    area: fmt(area),
    formula: "A = π × (R² - r²)",
    conversions: convertAreaFromSquareMeters(areaM2, precision),
    stepText: `1. Annulus Area A = π × (${R}² - ${r}²) = π × (${R * R} - ${r * r}) = ${fmt(area)} ${unit}².`
  };
}

export function computeRegularPolygonArea(
  numSides: number,
  sideLength: number,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const n = Math.max(3, Math.floor(numSides));
  const s = Math.max(0.0001, sideLength);

  const apothem = s / (2 * Math.tan(Math.PI / n));
  const perimeter = n * s;
  const area = 0.5 * apothem * perimeter;

  const areaM2 = toSquareMeters(area, unit);
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  return {
    shapeName: `Regular ${n}-gon`,
    area: fmt(area),
    perimeter: fmt(perimeter),
    apothem: fmt(apothem),
    formula: "A = ½ × Apothem × Perimeter",
    conversions: convertAreaFromSquareMeters(areaM2, precision),
    stepText: `1. Apothem a = ${s} / [2 × tan(π / ${n})] = ${fmt(apothem)}.\n2. Perimeter P = ${n} × ${s} = ${fmt(perimeter)}.\n3. Regular Polygon Area A = ½ × ${fmt(apothem)} × ${fmt(perimeter)} = ${fmt(area)} ${unit}².`
  };
}

export function computeShoelacePolygonArea(
  points: Array<{ x: number; y: number }>,
  unit: AreaUnit = "m",
  precision: number = 4
): AreaResult {
  const n = points.length;
  if (n < 3) {
    return {
      shapeName: "Irregular Polygon (Shoelace)",
      area: 0,
      formula: "A = ½ |Σ(x_i y_{i+1} - x_{i+1} y_i)|",
      conversions: convertAreaFromSquareMeters(0, precision),
      stepText: "At least 3 vertices are required to calculate polygon area."
    };
  }

  let sum = 0;
  for (let i = 0; i < n; i++) {
    const current = points[i];
    const next = points[(i + 1) % n];
    sum += current.x * next.y - next.x * current.y;
  }

  const area = Math.abs(sum) / 2.0;
  const areaM2 = toSquareMeters(area, unit);
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  return {
    shapeName: `Irregular Polygon (${n} Vertices)`,
    area: fmt(area),
    formula: "A = ½ |Σ(x_i y_{i+1} - x_{i+1} y_i)|",
    conversions: convertAreaFromSquareMeters(areaM2, precision),
    stepText: `1. Applied Gauss's Shoelace Algorithm on ${n} ordered Cartesian vertices.\n2. Evaluated Determinant Sum = ${sum.toFixed(precision)}.\n3. Area A = ½ × |${sum.toFixed(precision)}| = ${fmt(area)} ${unit}².`
  };
}
