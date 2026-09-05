/**
 * Mathematical logic engine for Circle Calculator & Circular Geometry Suite
 * Strict domain validation, no silent clamping of invalid inputs, high precision.
 */

export interface CoreCircleResult {
  isValid: boolean;
  errorMessage?: string;
  radius: number;
  diameter: number;
  circumference: number;
  area: number;
  exactAreaPi: string;
  exactCircumferencePi: string;
  stepText: string;
}

export function computeCoreCircle(
  givenType: "r" | "d" | "c" | "a",
  val: number,
  precision: number = 4
): CoreCircleResult {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  if (!isFinite(val) || val <= 0) {
    return {
      isValid: false,
      errorMessage: "Input value must be a positive real number greater than 0.",
      radius: 0,
      diameter: 0,
      circumference: 0,
      area: 0,
      exactAreaPi: "0π",
      exactCircumferencePi: "0π",
      stepText: "Please enter a valid positive numerical value."
    };
  }

  let r = 0;
  if (givenType === "r") {
    r = val;
  } else if (givenType === "d") {
    r = val / 2.0;
  } else if (givenType === "c") {
    r = val / (2.0 * Math.PI);
  } else {
    // Area
    r = Math.sqrt(val / Math.PI);
  }

  const d = 2.0 * r;
  const C = 2.0 * Math.PI * r;
  const A = Math.PI * r * r;

  const exactAreaPi = `${fmt(r * r)}π`;
  const exactCircumferencePi = `${fmt(2 * r)}π`;

  let stepText = "";
  if (givenType === "r") {
    stepText = `1. Given Radius r = ${val}.\n2. Diameter d = 2r = 2 × ${val} = ${fmt(d)}.\n3. Circumference C = 2πr = 2 × π × ${val} = ${exactCircumferencePi} ≈ ${fmt(C)}.\n4. Area A = πr² = π × ${val}² = ${exactAreaPi} ≈ ${fmt(A)}.`;
  } else if (givenType === "d") {
    stepText = `1. Given Diameter d = ${val}.\n2. Radius r = d / 2 = ${val} / 2 = ${fmt(r)}.\n3. Circumference C = πd = π × ${val} ≈ ${fmt(C)}.\n4. Area A = πr² = π × ${fmt(r)}² = ${exactAreaPi} ≈ ${fmt(A)}.`;
  } else if (givenType === "c") {
    stepText = `1. Given Circumference C = ${val}.\n2. Radius r = C / (2π) = ${val} / (2π) ≈ ${fmt(r)}.\n3. Diameter d = 2r = 2 × ${fmt(r)} ≈ ${fmt(d)}.\n4. Area A = πr² = π × ${fmt(r)}² ≈ ${fmt(A)}.`;
  } else {
    stepText = `1. Given Area A = ${val}.\n2. Radius r = √(A / π) = √(${val} / π) ≈ ${fmt(r)}.\n3. Diameter d = 2r ≈ ${fmt(d)}.\n4. Circumference C = 2πr ≈ ${fmt(C)}.`;
  }

  return {
    isValid: true,
    radius: fmt(r),
    diameter: fmt(d),
    circumference: fmt(C),
    area: fmt(A),
    exactAreaPi,
    exactCircumferencePi,
    stepText
  };
}

export interface SectorResult {
  isValid: boolean;
  errorMessage?: string;
  arcLength: number;
  sectorArea: number;
  sectorPerimeter: number;
  angleRad: number;
  angleDeg: number;
  stepText: string;
}

export function computeSector(
  radius: number,
  angle: number,
  angleUnit: "deg" | "rad" = "deg",
  precision: number = 4
): SectorResult {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  if (!isFinite(radius) || radius <= 0) {
    return {
      isValid: false,
      errorMessage: "Radius must be a positive number greater than 0.",
      arcLength: 0,
      sectorArea: 0,
      sectorPerimeter: 0,
      angleRad: 0,
      angleDeg: 0,
      stepText: "Radius must be greater than 0."
    };
  }

  let angleDeg = 0;
  let angleRad = 0;

  if (angleUnit === "rad") {
    if (!isFinite(angle) || angle < 0 || angle > 2 * Math.PI + 1e-7) {
      return {
        isValid: false,
        errorMessage: "Central angle in radians must be between 0 and 2π (≈ 6.2832 rad).",
        arcLength: 0,
        sectorArea: 0,
        sectorPerimeter: 0,
        angleRad: 0,
        angleDeg: 0,
        stepText: "Central angle out of range."
      };
    }
    angleRad = angle;
    angleDeg = (angle * 180.0) / Math.PI;
  } else {
    if (!isFinite(angle) || angle < 0 || angle > 360) {
      return {
        isValid: false,
        errorMessage: "Central angle must be between 0° and 360°.",
        arcLength: 0,
        sectorArea: 0,
        sectorPerimeter: 0,
        angleRad: 0,
        angleDeg: 0,
        stepText: "Central angle out of range."
      };
    }
    angleDeg = angle;
    angleRad = (angle * Math.PI) / 180.0;
  }

  const arcLength = (angleDeg / 360.0) * 2.0 * Math.PI * radius;
  const sectorArea = (angleDeg / 360.0) * Math.PI * radius * radius;
  const sectorPerimeter = 2.0 * radius + arcLength;

  const stepText = `1. Central Angle θ = ${fmt(angleDeg)}° (${fmt(angleRad)} rad), Radius r = ${radius}.\n2. Arc Length L = (θ/360) × 2πr = (${fmt(angleDeg)}/360) × 2π × ${radius} ≈ ${fmt(arcLength)}.\n3. Sector Area A_sector = (θ/360) × πr² = (${fmt(angleDeg)}/360) × π × ${radius}² ≈ ${fmt(sectorArea)}.\n4. Sector Perimeter P = 2r + L = 2(${radius}) + ${fmt(arcLength)} = ${fmt(sectorPerimeter)}.`;

  return {
    isValid: true,
    arcLength: fmt(arcLength),
    sectorArea: fmt(sectorArea),
    sectorPerimeter: fmt(sectorPerimeter),
    angleRad: fmt(angleRad),
    angleDeg: fmt(angleDeg),
    stepText
  };
}

export interface SegmentResult {
  isValid: boolean;
  errorMessage?: string;
  chordLength: number;
  sagitta: number;
  segmentArea: number;
  centralAngleDeg: number;
  centralAngleRad: number;
  stepText: string;
}

export function computeSegment(
  radius: number,
  chordOrAngle: number,
  mode: "chord" | "angle",
  precision: number = 4
): SegmentResult {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  if (!isFinite(radius) || radius <= 0) {
    return {
      isValid: false,
      errorMessage: "Radius must be a positive number greater than 0.",
      chordLength: 0,
      sagitta: 0,
      segmentArea: 0,
      centralAngleDeg: 0,
      centralAngleRad: 0,
      stepText: "Radius must be greater than 0."
    };
  }

  let c = 0;
  let thetaRad = 0;
  let thetaDeg = 0;

  if (mode === "angle") {
    if (!isFinite(chordOrAngle) || chordOrAngle < 0 || chordOrAngle > 360) {
      return {
        isValid: false,
        errorMessage: "Central angle must be between 0° and 360°.",
        chordLength: 0,
        sagitta: 0,
        segmentArea: 0,
        centralAngleDeg: 0,
        centralAngleRad: 0,
        stepText: "Central angle must be between 0° and 360°."
      };
    }
    thetaDeg = chordOrAngle;
    thetaRad = (thetaDeg * Math.PI) / 180.0;
    c = 2.0 * radius * Math.sin(thetaRad / 2.0);
  } else {
    // Chord mode
    if (!isFinite(chordOrAngle) || chordOrAngle < 0) {
      return {
        isValid: false,
        errorMessage: "Chord length must be a non-negative number.",
        chordLength: 0,
        sagitta: 0,
        segmentArea: 0,
        centralAngleDeg: 0,
        centralAngleRad: 0,
        stepText: "Chord length must be non-negative."
      };
    }
    const maxChord = 2.0 * radius;
    if (chordOrAngle > maxChord + 1e-9) {
      return {
        isValid: false,
        errorMessage: `Geometrically impossible: Chord length (${chordOrAngle}) cannot exceed the circle diameter 2r = ${fmt(maxChord)}.`,
        chordLength: fmt(chordOrAngle),
        sagitta: 0,
        segmentArea: 0,
        centralAngleDeg: 0,
        centralAngleRad: 0,
        stepText: `Error: A chord cannot be longer than the diameter (${fmt(maxChord)}).`
      };
    }
    c = Math.min(maxChord, chordOrAngle);
    if (radius === 0) {
      thetaRad = 0;
      thetaDeg = 0;
    } else {
      const ratio = Math.min(1, Math.max(0, c / (2.0 * radius)));
      thetaRad = 2.0 * Math.asin(ratio);
      thetaDeg = (thetaRad * 180.0) / Math.PI;
    }
  }

  const sagitta = radius - Math.sqrt(Math.max(0, radius * radius - (c / 2.0) * (c / 2.0)));
  const segmentArea = 0.5 * radius * radius * (thetaRad - Math.sin(thetaRad));

  const stepText = `1. Radius r = ${radius}, Chord Length c = ${fmt(c)}.\n2. Central Angle θ = 2 × asin(c / 2r) = ${fmt(thetaDeg)}° (${fmt(thetaRad)} rad).\n3. Sagitta (Height h) = r - √(r² - (c/2)²) = ${fmt(sagitta)}.\n4. Segment Area A_segment = ½r²(θ - sin θ) = ½(${radius}²)(${fmt(thetaRad)} - ${fmt(Math.sin(thetaRad))}) = ${fmt(segmentArea)}.`;

  return {
    isValid: true,
    chordLength: fmt(c),
    sagitta: fmt(sagitta),
    segmentArea: fmt(segmentArea),
    centralAngleDeg: fmt(thetaDeg),
    centralAngleRad: fmt(thetaRad),
    stepText
  };
}

export interface AnnulusResult {
  isValid: boolean;
  errorMessage?: string;
  outerArea: number;
  innerArea: number;
  annulusArea: number;
  wallThickness: number;
  avgRadius: number;
  stepText: string;
}

export function computeAnnulus(
  outerR: number,
  innerR: number,
  precision: number = 4
): AnnulusResult {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  if (!isFinite(outerR) || !isFinite(innerR) || outerR <= 0 || innerR < 0) {
    return {
      isValid: false,
      errorMessage: "Radii must be valid numbers with Outer Radius R > 0 and Inner Radius r ≥ 0.",
      outerArea: 0,
      innerArea: 0,
      annulusArea: 0,
      wallThickness: 0,
      avgRadius: 0,
      stepText: "Please enter valid radii."
    };
  }

  if (outerR <= innerR) {
    return {
      isValid: false,
      errorMessage: `Outer radius R (${outerR}) must be strictly greater than inner radius r (${innerR}).`,
      outerArea: fmt(Math.PI * outerR * outerR),
      innerArea: fmt(Math.PI * innerR * innerR),
      annulusArea: 0,
      wallThickness: 0,
      avgRadius: fmt((outerR + innerR) / 2.0),
      stepText: "Error: Outer radius must be greater than inner radius (R > r)."
    };
  }

  const R = outerR;
  const r = innerR;

  const outerArea = Math.PI * R * R;
  const innerArea = Math.PI * r * r;
  const annulusArea = Math.PI * (R * R - r * r);
  const wallThickness = R - r;
  const avgRadius = (R + r) / 2.0;

  const stepText = `1. Outer Radius R = ${R}, Inner Radius r = ${r}.\n2. Outer Area A_outer = πR² = π × ${R}² ≈ ${fmt(outerArea)}.\n3. Inner Area A_inner = πr² = π × ${r}² ≈ ${fmt(innerArea)}.\n4. Annulus Area = π(R² - r²) = π(${R * R} - ${r * r}) = ${fmt(R * R - r * r)}π ≈ ${fmt(annulusArea)}.\n5. Wall Thickness t = R - r = ${fmt(wallThickness)}.\n6. Average Radius = (R + r)/2 = ${fmt(avgRadius)}.`;

  return {
    isValid: true,
    outerArea: fmt(outerArea),
    innerArea: fmt(innerArea),
    annulusArea: fmt(annulusArea),
    wallThickness: fmt(wallThickness),
    avgRadius: fmt(avgRadius),
    stepText
  };
}

export interface CircleEquationResult {
  isValid: boolean;
  errorMessage?: string;
  standardForm: string;
  generalForm: string;
  center: { h: number; k: number };
  radius: number;
  D: number;
  E: number;
  F: number;
  stepText: string;
}

export function computeCircleEquation(
  h: number,
  k: number,
  r: number,
  precision: number = 4
): CircleEquationResult {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  if (!isFinite(h) || !isFinite(k) || !isFinite(r) || r <= 0) {
    return {
      isValid: false,
      errorMessage: "Radius r must be a positive number greater than 0.",
      standardForm: "Invalid",
      generalForm: "Invalid",
      center: { h: 0, k: 0 },
      radius: 0,
      D: 0,
      E: 0,
      F: 0,
      stepText: "Radius must be greater than 0."
    };
  }

  const rSq = r * r;
  const D = -2 * h;
  const E = -2 * k;
  const F = h * h + k * k - rSq;

  // Standard Form: (x - h)² + (y - k)² = r²
  const hPart = h === 0 ? "x²" : h > 0 ? `(x - ${fmt(h)})²` : `(x + ${fmt(Math.abs(h))})²`;
  const kPart = k === 0 ? "y²" : k > 0 ? `(y - ${fmt(k)})²` : `(y + ${fmt(Math.abs(k))})²`;
  const standardForm = `${hPart} + ${kPart} = ${fmt(rSq)}`;

  // General Form: x² + y² + Dx + Ey + F = 0
  let generalForm = "x² + y²";
  if (D !== 0) {
    generalForm += D > 0 ? ` + ${fmt(D)}x` : ` - ${fmt(Math.abs(D))}x`;
  }
  if (E !== 0) {
    generalForm += E > 0 ? ` + ${fmt(E)}y` : ` - ${fmt(Math.abs(E))}y`;
  }
  if (F !== 0) {
    generalForm += F > 0 ? ` + ${fmt(F)}` : ` - ${fmt(Math.abs(F))}`;
  }
  generalForm += " = 0";

  const stepText = `1. Center (h, k) = (${h}, ${k}), Radius r = ${r}.\n2. Standard Form: (x - h)² + (y - k)² = r² => ${standardForm}.\n3. Expanding: x² - 2hx + h² + y² - 2ky + k² = r²\n   x² + y² + (${fmt(D)})x + (${fmt(E)})y + (${fmt(F)}) = 0\n   => ${generalForm}.`;

  return {
    isValid: true,
    standardForm,
    generalForm,
    center: { h: fmt(h), k: fmt(k) },
    radius: fmt(r),
    D: fmt(D),
    E: fmt(E),
    F: fmt(F),
    stepText
  };
}

export interface ThreePointCircleResult {
  isValid: boolean;
  isCollinear: boolean;
  errorMessage?: string;
  center: { h: number; k: number };
  radius: number;
  area: number;
  circumference: number;
  stepText: string;
}

export function computeThreePointCircle(
  x1: number, y1: number,
  x2: number, y2: number,
  x3: number, y3: number,
  precision: number = 4
): ThreePointCircleResult {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  if (![x1, y1, x2, y2, x3, y3].every(isFinite)) {
    return {
      isValid: false,
      isCollinear: false,
      errorMessage: "All coordinates must be valid finite numbers.",
      center: { h: 0, k: 0 },
      radius: 0,
      area: 0,
      circumference: 0,
      stepText: "Invalid coordinates entered."
    };
  }

  // Check duplicate points
  const d12 = (x1 - x2) ** 2 + (y1 - y2) ** 2;
  const d23 = (x2 - x3) ** 2 + (y2 - y3) ** 2;
  const d31 = (x3 - x1) ** 2 + (y3 - y1) ** 2;
  if (d12 < 1e-12 || d23 < 1e-12 || d31 < 1e-12) {
    return {
      isValid: false,
      isCollinear: true,
      errorMessage: "Points must be distinct. At least two points are coincident.",
      center: { h: 0, k: 0 },
      radius: 0,
      area: 0,
      circumference: 0,
      stepText: "Duplicate points: a unique circumcircle requires three distinct points."
    };
  }

  const d = 2.0 * (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
  if (Math.abs(d) < 1e-11) {
    return {
      isValid: false,
      isCollinear: true,
      errorMessage: "Points are collinear! No unique circumcircle exists for points along a straight line.",
      center: { h: 0, k: 0 },
      radius: 0,
      area: 0,
      circumference: 0,
      stepText: "Collinear points: the cross product determinant equals zero; circumradius is infinite."
    };
  }

  const ux =
    ((x1 * x1 + y1 * y1) * (y2 - y3) +
      (x2 * x2 + y2 * y2) * (y3 - y1) +
      (x3 * x3 + y3 * y3) * (y1 - y2)) /
    d;
  const uy =
    ((x1 * x1 + y1 * y1) * (x3 - x2) +
      (x2 * x2 + y2 * y2) * (x1 - x3) +
      (x3 * x3 + y3 * y3) * (x2 - x1)) /
    d;

  const r = Math.sqrt((x1 - ux) * (x1 - ux) + (y1 - uy) * (y1 - uy));
  const area = Math.PI * r * r;
  const circumference = 2.0 * Math.PI * r;

  const stepText = `1. Points: P1(${x1}, ${y1}), P2(${x2}, ${y2}), P3(${x3}, ${y3}).\n2. Perpendicular Bisector Intersection (Circumcenter):\n   h = ${fmt(ux)}, k = ${fmt(uy)}.\n3. Circumradius R = √[(x₁ - h)² + (y₁ - k)²] = ${fmt(r)}.\n4. Circumcircle Area A = πR² ≈ ${fmt(area)}.\n5. Circumference C = 2πR ≈ ${fmt(circumference)}.`;

  return {
    isValid: true,
    isCollinear: false,
    center: { h: fmt(ux), k: fmt(uy) },
    radius: fmt(r),
    area: fmt(area),
    circumference: fmt(circumference),
    stepText
  };
}

export const UNIT_FACTORS_METERS: Record<string, number> = {
  meters: 1.0,
  cm: 0.01,
  mm: 0.001,
  feet: 0.3048,
  inches: 0.0254,
  yards: 0.9144,
  km: 1000.0,
  miles: 1609.344
};

export function convertCircleUnits(
  inputRadius: number,
  baseUnit: string = "meters",
  precision: number = 4
) {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));
  const factorToBase = UNIT_FACTORS_METERS[baseUnit] || 1.0;
  const r_m = Math.max(0, inputRadius) * factorToBase;

  const units = ["meters", "cm", "mm", "feet", "inches", "yards", "km", "miles"] as const;
  const result: Record<string, { r: number; d: number; c: number; a: number }> = {};

  for (const u of units) {
    const uFactor = UNIT_FACTORS_METERS[u];
    const r_u = r_m / uFactor;
    const d_u = 2.0 * r_u;
    const c_u = 2.0 * Math.PI * r_u;
    const a_u = Math.PI * r_u * r_u;
    result[u] = {
      r: fmt(r_u),
      d: fmt(d_u),
      c: fmt(c_u),
      a: fmt(a_u)
    };
  }

  return result as Record<(typeof units)[number], { r: number; d: number; c: number; a: number }>;
}
