/**
 * Mathematical logic engine for Circle Calculator & Circular Geometry Suite
 */

export interface CoreCircleResult {
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
  let r = 0;
  const safeVal = Math.max(0.000001, val);

  if (givenType === "r") {
    r = safeVal;
  } else if (givenType === "d") {
    r = safeVal / 2.0;
  } else if (givenType === "c") {
    r = safeVal / (2.0 * Math.PI);
  } else {
    // Area
    r = Math.sqrt(safeVal / Math.PI);
  }

  const d = 2.0 * r;
  const C = 2.0 * Math.PI * r;
  const A = Math.PI * r * r;

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const exactAreaPi = `${fmt(r * r)}π`;
  const exactCircumferencePi = `${fmt(2 * r)}π`;

  let stepText = "";
  if (givenType === "r") {
    stepText = `1. Given Radius r = ${r}.\n2. Diameter d = 2r = 2 × ${r} = ${fmt(d)}.\n3. Circumference C = 2πr = 2 × π × ${r} = ${exactCircumferencePi} ≈ ${fmt(C)}.\n4. Area A = πr² = π × ${r}² = ${exactAreaPi} ≈ ${fmt(A)}.`;
  } else if (givenType === "d") {
    stepText = `1. Given Diameter d = ${val}.\n2. Radius r = d / 2 = ${fmt(r)}.\n3. Circumference C = πd = π × ${val} ≈ ${fmt(C)}.\n4. Area A = πr² = π × ${r}² ≈ ${fmt(A)}.`;
  } else if (givenType === "c") {
    stepText = `1. Given Circumference C = ${val}.\n2. Radius r = C / (2π) = ${val} / (2π) ≈ ${fmt(r)}.\n3. Diameter d = 2r ≈ ${fmt(d)}.\n4. Area A = πr² ≈ ${fmt(A)}.`;
  } else {
    stepText = `1. Given Area A = ${val}.\n2. Radius r = √(A / π) = √(${val} / π) ≈ ${fmt(r)}.\n3. Diameter d = 2r ≈ ${fmt(d)}.\n4. Circumference C = 2πr ≈ ${fmt(C)}.`;
  }

  return {
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
  arcLength: number;
  sectorArea: number;
  sectorPerimeter: number;
  angleRad: number;
  stepText: string;
}

export function computeSector(
  radius: number,
  angleDeg: number,
  precision: number = 4
): SectorResult {
  const r = Math.max(0.000001, radius);
  const theta = Math.max(0, Math.min(360, angleDeg));
  const angleRad = (theta * Math.PI) / 180.0;

  const arcLength = (theta / 360.0) * 2.0 * Math.PI * r;
  const sectorArea = (theta / 360.0) * Math.PI * r * r;
  const sectorPerimeter = 2.0 * r + arcLength;

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. Central Angle θ = ${theta}° (${fmt(angleRad)} rad).\n2. Arc Length L = (θ/360) × 2πr = (${theta}/360) × 2π × ${r} = ${fmt(arcLength)}.\n3. Sector Area A_sector = (θ/360) × πr² = (${theta}/360) × π × ${r}² = ${fmt(sectorArea)}.\n4. Sector Perimeter P = 2r + L = ${2*r} + ${fmt(arcLength)} = ${fmt(sectorPerimeter)}.`;

  return {
    arcLength: fmt(arcLength),
    sectorArea: fmt(sectorArea),
    sectorPerimeter: fmt(sectorPerimeter),
    angleRad: fmt(angleRad),
    stepText
  };
}

export interface SegmentResult {
  chordLength: number;
  sagitta: number;
  segmentArea: number;
  centralAngleDeg: number;
  stepText: string;
}

export function computeSegment(
  radius: number,
  chordOrAngle: number,
  mode: "chord" | "angle",
  precision: number = 4
): SegmentResult {
  const r = Math.max(0.000001, radius);
  let c = 0;
  let thetaRad = 0;
  let thetaDeg = 0;

  if (mode === "angle") {
    thetaDeg = Math.max(0, Math.min(360, chordOrAngle));
    thetaRad = (thetaDeg * Math.PI) / 180.0;
    c = 2.0 * r * Math.sin(thetaRad / 2.0);
  } else {
    // Chord mode
    c = Math.min(2.0 * r, Math.max(0, chordOrAngle));
    thetaRad = 2.0 * Math.asin(c / (2.0 * r));
    thetaDeg = (thetaRad * 180.0) / Math.PI;
  }

  const sagitta = r - Math.sqrt(Math.max(0, r * r - (c / 2.0) * (c / 2.0)));
  const segmentArea = 0.5 * r * r * (thetaRad - Math.sin(thetaRad));

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. Radius r = ${r}, Central Angle θ = ${fmt(thetaDeg)}° (${fmt(thetaRad)} rad).\n2. Chord Length c = 2r sin(θ/2) = ${fmt(c)}.\n3. Sagitta (Height h) = r - √(r² - (c/2)²) = ${fmt(sagitta)}.\n4. Segment Area A_segment = ½r²(θ - sin θ) = ${fmt(segmentArea)}.`;

  return {
    chordLength: fmt(c),
    sagitta: fmt(sagitta),
    segmentArea: fmt(segmentArea),
    centralAngleDeg: fmt(thetaDeg),
    stepText
  };
}

export interface AnnulusResult {
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
  const R = Math.max(0.000002, Math.max(outerR, innerR));
  const r = Math.max(0.000001, Math.min(outerR, innerR));

  const outerArea = Math.PI * R * R;
  const innerArea = Math.PI * r * r;
  const annulusArea = Math.PI * (R * R - r * r);
  const wallThickness = R - r;
  const avgRadius = (R + r) / 2.0;

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. Outer Radius R = ${R}, Inner Radius r = ${r}.\n2. Outer Area A_outer = πR² = ${fmt(outerArea)}.\n3. Inner Area A_inner = πr² = ${fmt(innerArea)}.\n4. Annulus Area = π(R² - r²) = ${fmt(annulusArea)}.\n5. Wall Thickness t = R - r = ${fmt(wallThickness)}.`;

  return {
    outerArea: fmt(outerArea),
    innerArea: fmt(innerArea),
    annulusArea: fmt(annulusArea),
    wallThickness: fmt(wallThickness),
    avgRadius: fmt(avgRadius),
    stepText
  };
}

export interface CircleEquationResult {
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
  const safeR = Math.max(0.000001, r);
  const rSq = safeR * safeR;

  const D = -2 * h;
  const E = -2 * k;
  const F = h * h + k * k - rSq;

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const hStr = h >= 0 ? `- ${fmt(h)}` : `+ ${fmt(Math.abs(h))}`;
  const kStr = k >= 0 ? `- ${fmt(k)}` : `+ ${fmt(Math.abs(k))}`;
  const standardForm = `(x ${hStr})² + (y ${kStr})² = ${fmt(rSq)}`;

  const dSign = D >= 0 ? `+ ${fmt(D)}` : `- ${fmt(Math.abs(D))}`;
  const eSign = E >= 0 ? `+ ${fmt(E)}` : `- ${fmt(Math.abs(E))}`;
  const fSign = F >= 0 ? `+ ${fmt(F)}` : `- ${fmt(Math.abs(F))}`;
  const generalForm = `x² + y² ${dSign}x ${eSign}y ${fSign} = 0`;

  const stepText = `1. Center (h, k) = (${h}, ${k}), Radius r = ${safeR}.\n2. Standard Form: (x - h)² + (y - k)² = r² => ${standardForm}.\n3. General Form: x² + y² + Dx + Ey + F = 0 where D = ${D}, E = ${E}, F = ${fmt(F)}.`;

  return {
    standardForm,
    generalForm,
    center: { h: fmt(h), k: fmt(k) },
    radius: fmt(safeR),
    D: fmt(D),
    E: fmt(E),
    F: fmt(F),
    stepText
  };
}

export interface ThreePointCircleResult {
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
  const d = 2.0 * (x1 * (y2 - y3) + x2 * (y3 - y1) + x3 * (y1 - y2));
  if (Math.abs(d) < 1e-9) {
    // Collinear fallback
    return {
      center: { h: 0, k: 0 },
      radius: 0,
      area: 0,
      circumference: 0,
      stepText: "Points are collinear! No unique circumcircle exists."
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

  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. Points: (${x1},${y1}), (${x2},${y2}), (${x3},${y3}).\n2. Circumcenter (h, k) = (${fmt(ux)}, ${fmt(uy)}).\n3. Circumradius R = ${fmt(r)}.\n4. Area A = πR² = ${fmt(area)}, Circumference C = ${fmt(circumference)}.`;

  return {
    center: { h: fmt(ux), k: fmt(uy) },
    radius: fmt(r),
    area: fmt(area),
    circumference: fmt(circumference),
    stepText
  };
}

export function convertCircleUnits(radiusInMeters: number, precision: number = 4) {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const r_m = radiusInMeters;
  const d_m = 2 * r_m;
  const c_m = 2 * Math.PI * r_m;
  const a_m2 = Math.PI * r_m * r_m;

  return {
    meters: { r: fmt(r_m), d: fmt(d_m), c: fmt(c_m), a: fmt(a_m2) },
    cm: { r: fmt(r_m * 100), d: fmt(d_m * 100), c: fmt(c_m * 100), a: fmt(a_m2 * 10000) },
    mm: { r: fmt(r_m * 1000), d: fmt(d_m * 1000), c: fmt(c_m * 1000), a: fmt(a_m2 * 1000000) },
    feet: { r: fmt(r_m * 3.28084), d: fmt(d_m * 3.28084), c: fmt(c_m * 3.28084), a: fmt(a_m2 * 10.7639) },
    inches: { r: fmt(r_m * 39.3701), d: fmt(d_m * 39.3701), c: fmt(c_m * 39.3701), a: fmt(a_m2 * 1550) },
    yards: { r: fmt(r_m * 1.09361), d: fmt(d_m * 1.09361), c: fmt(c_m * 1.09361), a: fmt(a_m2 * 1.19599) },
    km: { r: fmt(r_m / 1000), d: fmt(d_m / 1000), c: fmt(c_m / 1000), a: fmt(a_m2 / 1000000) },
    miles: { r: fmt(r_m / 1609.34), d: fmt(d_m / 1609.34), c: fmt(c_m / 1609.34), a: fmt(a_m2 / 2589988) }
  };
}
