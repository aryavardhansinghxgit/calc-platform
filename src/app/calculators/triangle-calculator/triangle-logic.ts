/**
 * Core mathematical engine for Universal Triangle Calculator & Trigonometric Suite
 */

export interface TriangleParams {
  a?: number;
  b?: number;
  c?: number;
  A?: number; // In degrees
  B?: number; // In degrees
  C?: number; // In degrees
}

export interface SolvedTriangle {
  a: number;
  b: number;
  c: number;
  A_deg: number;
  B_deg: number;
  C_deg: number;
  A_rad: number;
  B_rad: number;
  C_rad: number;
  area: number;
  perimeter: number;
  semiPerimeter: number;
  s: number;
  ha: number;
  hb: number;
  hc: number;
  ma: number;
  mb: number;
  mc: number;
  inradius: number;
  circumradius: number;
  r: number;
  R: number;
  sideType: "Equilateral" | "Isosceles" | "Scalene";
  angleType: "Right" | "Acute" | "Obtuse";
  caseType: "SSS" | "SAS" | "ASA" | "AAS" | "SSA";
  stepText: string;
  // Solution coordinates for drawing SVG (A at origin (0,0), B at (c,0), C at (x,y))
  coords: {
    Ax: number;
    Ay: number;
    Bx: number;
    By: number;
    Cx: number;
    Cy: number;
  };
  // Exact string formatted values preserving trailing zeros per active precision
  fmt: {
    a: string;
    b: string;
    c: string;
    A_deg: string;
    B_deg: string;
    C_deg: string;
    area: string;
    perimeter: string;
    semiPerimeter: string;
    ha: string;
    hb: string;
    hc: string;
    ma: string;
    mb: string;
    mc: string;
    inradius: string;
    circumradius: string;
    r: string;
    R: string;
  };
}

export interface TriangleSolveResult {
  success: boolean;
  errorMessage?: string;
  isAmbiguous?: boolean;
  solutions: SolvedTriangle[];
}

const radToDeg = (r: number) => (r * 180.0) / Math.PI;
const degToRad = (d: number) => (d * Math.PI) / 180.0;

/**
 * Safe deterministic angle parser supporting numeric values and fractional pi expressions.
 * Supported: pi/6, pi/4, pi/3, pi/2, 2*pi/3, 3*pi/4, 5*pi/6, 2*pi, 2pi/3, π/6, 2π/3, etc.
 * Zero eval/Function execution for strict security.
 */
export function parseAngleExpression(rawStr: string, angleUnit: "deg" | "rad" = "deg"): number | undefined {
  if (!rawStr || !rawStr.trim()) return undefined;
  const s = rawStr.trim().toLowerCase().replace(/π/g, "pi").replace(/\s+/g, "");

  if (s.includes("pi")) {
    const match = s.match(/^(?:([0-9]+(?:\.[0-9]+)?)\*?)?pi(?:\/([0-9]+(?:\.[0-9]+)?))?$/);
    if (match) {
      const coeff = match[1] !== undefined ? parseFloat(match[1]) : 1.0;
      const denom = match[2] !== undefined ? parseFloat(match[2]) : 1.0;
      if (denom === 0 || isNaN(coeff) || isNaN(denom)) return undefined;
      const radians = (coeff * Math.PI) / denom;
      if (radians <= 0) return undefined;
      return (radians * 180.0) / Math.PI; // Return in degrees for universal solver
    }
    return undefined;
  }

  const num = parseFloat(s);
  if (Number.isNaN(num) || num <= 0 || !Number.isFinite(num)) return undefined;
  return angleUnit === "rad" ? (num * 180.0) / Math.PI : num;
}

function computeDerivedMetrics(
  a: number,
  b: number,
  c: number,
  A_deg: number,
  B_deg: number,
  C_deg: number,
  caseType: "SSS" | "SAS" | "ASA" | "AAS" | "SSA",
  precision: number = 4
): SolvedTriangle {
  const A_rad = degToRad(A_deg);
  const B_rad = degToRad(B_deg);
  const C_rad = degToRad(C_deg);

  const perimeter = a + b + c;
  const s = perimeter / 2.0;

  // Heron's formula for robust area
  const areaTerm = s * (s - a) * (s - b) * (s - c);
  const area = Math.sqrt(Math.max(0, areaTerm));

  // Altitudes
  const ha = (2.0 * area) / a;
  const hb = (2.0 * area) / b;
  const hc = (2.0 * area) / c;

  // Medians
  const ma = 0.5 * Math.sqrt(Math.max(0, 2 * b * b + 2 * c * c - a * a));
  const mb = 0.5 * Math.sqrt(Math.max(0, 2 * a * a + 2 * c * c - b * b));
  const mc = 0.5 * Math.sqrt(Math.max(0, 2 * a * a + 2 * b * b - c * c));

  // Inradius & Circumradius
  const inradius = area / s;
  const circumradius = (a * b * c) / (4.0 * Math.max(0.00001, area));

  // Classification by sides
  let sideType: "Equilateral" | "Isosceles" | "Scalene" = "Scalene";
  const diffAB = Math.abs(a - b);
  const diffBC = Math.abs(b - c);
  const diffAC = Math.abs(a - c);
  const tol = 0.001;

  if (diffAB < tol && diffBC < tol) {
    sideType = "Equilateral";
  } else if (diffAB < tol || diffBC < tol || diffAC < tol) {
    sideType = "Isosceles";
  }

  // Classification by angles
  let angleType: "Right" | "Acute" | "Obtuse" = "Acute";
  const maxAngle = Math.max(A_deg, B_deg, C_deg);
  if (Math.abs(maxAngle - 90.0) < 0.01) {
    angleType = "Right";
  } else if (maxAngle > 90.0) {
    angleType = "Obtuse";
  }

  // SVG Coordinates calculation (A at (0,0), B at (c,0), C at (b*cos(A), b*sin(A)))
  const Cx = b * Math.cos(A_rad);
  const Cy = b * Math.sin(A_rad);

  const fmt = (v: number) => v.toFixed(precision);

  const stepText = `Case: ${caseType}\nSides: a = ${fmt(a)}, b = ${fmt(b)}, c = ${fmt(c)}\nAngles: A = ${fmt(A_deg)}°, B = ${fmt(B_deg)}°, C = ${fmt(C_deg)}°\nPerimeter P = ${fmt(perimeter)}, Semi-perimeter s = ${fmt(s)}\nArea = ${fmt(area)} (via Heron's Formula)\nAltitudes: ha = ${fmt(ha)}, hb = ${fmt(hb)}, hc = ${fmt(hc)}\nMedians: ma = ${fmt(ma)}, mb = ${fmt(mb)}, mc = ${fmt(mc)}\nInradius r = ${fmt(inradius)}, Circumradius R = ${fmt(circumradius)}`;

  return {
    a: parseFloat(fmt(a)),
    b: parseFloat(fmt(b)),
    c: parseFloat(fmt(c)),
    A_deg: parseFloat(fmt(A_deg)),
    B_deg: parseFloat(fmt(B_deg)),
    C_deg: parseFloat(fmt(C_deg)),
    A_rad: parseFloat(fmt(A_rad)),
    B_rad: parseFloat(fmt(B_rad)),
    C_rad: parseFloat(fmt(C_rad)),
    area: parseFloat(fmt(area)),
    perimeter: parseFloat(fmt(perimeter)),
    semiPerimeter: parseFloat(fmt(s)),
    s: parseFloat(fmt(s)),
    ha: parseFloat(fmt(ha)),
    hb: parseFloat(fmt(hb)),
    hc: parseFloat(fmt(hc)),
    ma: parseFloat(fmt(ma)),
    mb: parseFloat(fmt(mb)),
    mc: parseFloat(fmt(mc)),
    inradius: parseFloat(fmt(inradius)),
    circumradius: parseFloat(fmt(circumradius)),
    r: parseFloat(fmt(inradius)),
    R: parseFloat(fmt(circumradius)),
    sideType,
    angleType,
    caseType,
    stepText,
    coords: {
      Ax: 0,
      Ay: 0,
      Bx: c,
      By: 0,
      Cx,
      Cy
    },
    fmt: {
      a: fmt(a),
      b: fmt(b),
      c: fmt(c),
      A_deg: fmt(A_deg),
      B_deg: fmt(B_deg),
      C_deg: fmt(C_deg),
      area: fmt(area),
      perimeter: fmt(perimeter),
      semiPerimeter: fmt(s),
      ha: fmt(ha),
      hb: fmt(hb),
      hc: fmt(hc),
      ma: fmt(ma),
      mb: fmt(mb),
      mc: fmt(mc),
      inradius: fmt(inradius),
      circumradius: fmt(circumradius),
      r: fmt(inradius),
      R: fmt(circumradius)
    }
  };
}

export function solveUniversalTriangle(
  aIn?: number,
  bIn?: number,
  cIn?: number,
  AIn?: number,
  BIn?: number,
  CIn?: number,
  precision: number = 4
): TriangleSolveResult {
  let a = aIn && aIn > 0 ? aIn : undefined;
  let b = bIn && bIn > 0 ? bIn : undefined;
  let c = cIn && cIn > 0 ? cIn : undefined;
  let A = AIn && AIn > 0 ? AIn : undefined;
  let B = BIn && BIn > 0 ? BIn : undefined;
  let C = CIn && CIn > 0 ? CIn : undefined;

  const countSides = (a ? 1 : 0) + (b ? 1 : 0) + (c ? 1 : 0);
  const countAngles = (A ? 1 : 0) + (B ? 1 : 0) + (C ? 1 : 0);
  const total = countSides + countAngles;

  if (total < 3) {
    return { success: false, errorMessage: "Please provide at least 3 values (including at least 1 side length).", solutions: [] };
  }
  if (countSides === 0) {
    return { success: false, errorMessage: "Cannot solve triangle with only 3 angles. At least 1 side length is required.", solutions: [] };
  }

  // Check angle sum if 2 or 3 angles given
  if (countAngles >= 2) {
    const givenA = A || 0;
    const givenB = B || 0;
    const givenC = C || 0;
    const sumGiven = givenA + givenB + givenC;
    if (sumGiven >= 180.0) {
      return { success: false, errorMessage: `Sum of given interior angles (${sumGiven}°) must be strictly less than 180°.`, solutions: [] };
    }
    if (countAngles === 2) {
      if (!A) A = 180.0 - (givenB + givenC);
      if (!B) B = 180.0 - (givenA + givenC);
      if (!C) C = 180.0 - (givenA + givenB);
    }
  }

  // CASE 1: SSS (3 Sides)
  if (countSides === 3) {
    const sideA = a!, sideB = b!, sideC = c!;
    // Triangle Inequality Theorem
    if (sideA + sideB <= sideC || sideA + sideC <= sideB || sideB + sideC <= sideA) {
      return {
        success: false,
        errorMessage: "Triangle Inequality Theorem violated: The sum of any two sides must strictly exceed the third side.",
        solutions: []
      };
    }

    const cosA = (sideB * sideB + sideC * sideC - sideA * sideA) / (2 * sideB * sideC);
    const cosB = (sideA * sideA + sideC * sideC - sideB * sideB) / (2 * sideA * sideC);
    const angleA = radToDeg(Math.acos(Math.max(-1, Math.min(1, cosA))));
    const angleB = radToDeg(Math.acos(Math.max(-1, Math.min(1, cosB))));
    const angleC = 180.0 - angleA - angleB;

    return {
      success: true,
      solutions: [computeDerivedMetrics(sideA, sideB, sideC, angleA, angleB, angleC, "SSS", precision)]
    };
  }

  // CASE 2: ASA / AAS (1 Side & 2 Angles or 3 Angles solved above)
  if (countSides === 1 && countAngles >= 2) {
    const knownA = A!, knownB = B!, knownC = C!;
    let sideA = a, sideB = b, sideC = c;

    const sinA = Math.sin(degToRad(knownA));
    const sinB = Math.sin(degToRad(knownB));
    const sinC = Math.sin(degToRad(knownC));

    if (sideA) {
      sideB = (sideA * sinB) / sinA;
      sideC = (sideA * sinC) / sinA;
    } else if (sideB) {
      sideA = (sideB * sinA) / sinB;
      sideC = (sideB * sinC) / sinB;
    } else if (sideC) {
      sideA = (sideC * sinA) / sinC;
      sideB = (sideC * sinB) / sinC;
    }

    return {
      success: true,
      solutions: [computeDerivedMetrics(sideA!, sideB!, sideC!, knownA, knownB, knownC, "ASA", precision)]
    };
  }

  // CASE 3: SAS or SSA (2 Sides & 1 Angle)
  if (countSides === 2 && countAngles === 1) {
    // 3A. SAS Case (Angle is between the 2 known sides)
    if (a && b && C) {
      const cVal = Math.sqrt(a * a + b * b - 2 * a * b * Math.cos(degToRad(C)));
      const cosA = (b * b + cVal * cVal - a * a) / (2 * b * cVal);
      const angleA = radToDeg(Math.acos(Math.max(-1, Math.min(1, cosA))));
      const angleB = 180.0 - angleA - C;
      return { success: true, solutions: [computeDerivedMetrics(a, b, cVal, angleA, angleB, C, "SAS", precision)] };
    }
    if (a && c && B) {
      const bVal = Math.sqrt(a * a + c * c - 2 * a * c * Math.cos(degToRad(B)));
      const cosA = (bVal * bVal + c * c - a * a) / (2 * bVal * c);
      const angleA = radToDeg(Math.acos(Math.max(-1, Math.min(1, cosA))));
      const angleC = 180.0 - angleA - B;
      return { success: true, solutions: [computeDerivedMetrics(a, bVal, c, angleA, B, angleC, "SAS", precision)] };
    }
    if (b && c && A) {
      const aVal = Math.sqrt(b * b + c * c - 2 * b * c * Math.cos(degToRad(A)));
      const cosB = (aVal * aVal + c * c - b * b) / (2 * aVal * c);
      const angleB = radToDeg(Math.acos(Math.max(-1, Math.min(1, cosB))));
      const angleC = 180.0 - A - angleB;
      return { success: true, solutions: [computeDerivedMetrics(aVal, b, c, A, angleB, angleC, "SAS", precision)] };
    }

    // 3B. SSA Ambiguous Case (Angle is NOT between the 2 known sides)
    // Normalize to known angle A, adjacent side b, opposite side a
    let opp = 0, adj = 0, ang = 0;
    let typeOrder: "a_b_A" | "a_c_A" | "b_a_B" | "b_c_B" | "c_a_C" | "c_b_C" = "a_b_A";

    if (a && b && A) { opp = a; adj = b; ang = A; typeOrder = "a_b_A"; }
    else if (a && c && A) { opp = a; adj = c; ang = A; typeOrder = "a_c_A"; }
    else if (b && a && B) { opp = b; adj = a; ang = B; typeOrder = "b_a_B"; }
    else if (b && c && B) { opp = b; adj = c; ang = B; typeOrder = "b_c_B"; }
    else if (c && a && C) { opp = c; adj = a; ang = C; typeOrder = "c_a_C"; }
    else if (c && b && C) { opp = c; adj = b; ang = C; typeOrder = "c_b_C"; }

    const angRad = degToRad(ang);
    const h = adj * Math.sin(angRad);

    if (opp < h) {
      return {
        success: false,
        errorMessage: `No triangle exists (SSA Case): Opposite side (${opp}) is shorter than height h = b·sin(A) = ${h.toFixed(precision)}.`,
        solutions: []
      };
    }

    const sinOther = (adj * Math.sin(angRad)) / opp;
    const otherAngle1 = radToDeg(Math.asin(Math.max(-1, Math.min(1, sinOther))));
    const otherAngle2 = 180.0 - otherAngle1;

    const solutions: SolvedTriangle[] = [];

    // First Solution
    const thirdAngle1 = 180.0 - ang - otherAngle1;
    if (thirdAngle1 > 0) {
      const thirdSide1 = (opp * Math.sin(degToRad(thirdAngle1))) / Math.sin(angRad);
      let sA = 0, sB = 0, sC = 0, aA = 0, aB = 0, aC = 0;
      if (typeOrder === "a_b_A") { sA = opp; sB = adj; sC = thirdSide1; aA = ang; aB = otherAngle1; aC = thirdAngle1; }
      else if (typeOrder === "a_c_A") { sA = opp; sC = adj; sB = thirdSide1; aA = ang; aC = otherAngle1; aB = thirdAngle1; }
      else if (typeOrder === "b_a_B") { sB = opp; sA = adj; sC = thirdSide1; aB = ang; aA = otherAngle1; aC = thirdAngle1; }
      else if (typeOrder === "b_c_B") { sB = opp; sC = adj; sA = thirdSide1; aB = ang; aC = otherAngle1; aA = thirdAngle1; }
      else if (typeOrder === "c_a_C") { sC = opp; sA = adj; sB = thirdSide1; aC = ang; aA = otherAngle1; aB = thirdAngle1; }
      else if (typeOrder === "c_b_C") { sC = opp; sB = adj; sA = thirdSide1; aC = ang; aB = otherAngle1; aA = thirdAngle1; }

      solutions.push(computeDerivedMetrics(sA, sB, sC, aA, aB, aC, "SSA", precision));
    }

    // Second Solution (Ambiguous case when h < opp < adj)
    if (opp > h && opp < adj) {
      const thirdAngle2 = 180.0 - ang - otherAngle2;
      if (thirdAngle2 > 0) {
        const thirdSide2 = (opp * Math.sin(degToRad(thirdAngle2))) / Math.sin(angRad);
        let sA = 0, sB = 0, sC = 0, aA = 0, aB = 0, aC = 0;
        if (typeOrder === "a_b_A") { sA = opp; sB = adj; sC = thirdSide2; aA = ang; aB = otherAngle2; aC = thirdAngle2; }
        else if (typeOrder === "a_c_A") { sA = opp; sC = adj; sB = thirdSide2; aA = ang; aC = otherAngle2; aB = thirdAngle2; }
        else if (typeOrder === "b_a_B") { sB = opp; sA = adj; sC = thirdSide2; aB = ang; aA = otherAngle2; aC = thirdAngle2; }
        else if (typeOrder === "b_c_B") { sB = opp; sC = adj; sA = thirdSide2; aB = ang; aC = otherAngle2; aA = thirdAngle2; }
        else if (typeOrder === "c_a_C") { sC = opp; sA = adj; sB = thirdSide2; aC = ang; aA = otherAngle2; aB = thirdAngle2; }
        else if (typeOrder === "c_b_C") { sC = opp; sB = adj; sA = thirdSide2; aC = ang; aB = otherAngle2; aA = thirdAngle2; }

        solutions.push(computeDerivedMetrics(sA, sB, sC, aA, aB, aC, "SSA", precision));
      }
    }

    if (solutions.length === 0) {
      return { success: false, errorMessage: "No valid triangle configuration exists for given SSA values.", solutions: [] };
    }

    return {
      success: true,
      isAmbiguous: solutions.length === 2,
      solutions
    };
  }

  return { success: false, errorMessage: "Could not solve triangle with given parameters.", solutions: [] };
}

export interface RightTriangleSolution {
  a: number;
  b: number;
  c: number;
  area: number;
  perimeter: number;
  sinA: number;
  cosA: number;
  tanA: number;
  A_deg: number;
  B_deg: number;
  C_deg: number;
  fmt: {
    a: string;
    b: string;
    c: string;
    area: string;
    perimeter: string;
    sinA: string;
    cosA: string;
    tanA: string;
    A_deg: string;
    B_deg: string;
    C_deg: string;
  };
}

export function solveRightTriangle(
  legA: number,
  legB: number,
  precision: number = 4
): { success: boolean; errorMessage?: string; solution?: RightTriangleSolution } {
  if (
    legA === undefined || legB === undefined ||
    isNaN(legA) || isNaN(legB) ||
    legA <= 0 || legB <= 0 ||
    !Number.isFinite(legA) || !Number.isFinite(legB)
  ) {
    return { success: false, errorMessage: "Leg lengths must be strictly positive finite numbers." };
  }

  const c = Math.hypot(legA, legB);
  const area = 0.5 * legA * legB;
  const perimeter = legA + legB + c;
  const sinA = legA / c;
  const cosA = legB / c;
  const tanA = legA / legB;
  const A_deg = (Math.asin(sinA) * 180.0) / Math.PI;
  const B_deg = 90.0 - A_deg;
  const C_deg = 90.0;

  const fmt = (v: number) => v.toFixed(precision);

  return {
    success: true,
    solution: {
      a: legA,
      b: legB,
      c,
      area,
      perimeter,
      sinA,
      cosA,
      tanA,
      A_deg,
      B_deg,
      C_deg,
      fmt: {
        a: fmt(legA),
        b: fmt(legB),
        c: fmt(c),
        area: fmt(area),
        perimeter: fmt(perimeter),
        sinA: fmt(sinA),
        cosA: fmt(cosA),
        tanA: fmt(tanA),
        A_deg: fmt(A_deg),
        B_deg: fmt(B_deg),
        C_deg: fmt(C_deg)
      }
    }
  };
}

export interface InradiusCircumradiusSolution {
  a: number;
  b: number;
  c: number;
  s: number;
  area: number;
  r: number;
  R: number;
  fmt: {
    a: string;
    b: string;
    c: string;
    s: string;
    area: string;
    r: string;
    R: string;
  };
}

export function calculateInradiusCircumradius(
  a: number,
  b: number,
  c: number,
  precision: number = 4
): { success: boolean; errorMessage?: string; solution?: InradiusCircumradiusSolution } {
  if (
    a === undefined || b === undefined || c === undefined ||
    isNaN(a) || isNaN(b) || isNaN(c) ||
    a <= 0 || b <= 0 || c <= 0 ||
    !Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)
  ) {
    return { success: false, errorMessage: "Side lengths must be positive real numbers." };
  }

  if (a + b <= c + 1e-9 || a + c <= b + 1e-9 || b + c <= a + 1e-9) {
    return { success: false, errorMessage: "Triangle inequality violated (sum of any two sides must exceed the third)." };
  }

  const s = (a + b + c) / 2.0;
  const areaTerm = s * (s - a) * (s - b) * (s - c);
  if (areaTerm <= 0) {
    return { success: false, errorMessage: "Degenerate triangle configuration." };
  }
  const area = Math.sqrt(areaTerm);
  const r = area / s;
  const R = (a * b * c) / (4.0 * area);

  const fmt = (v: number) => v.toFixed(precision);

  return {
    success: true,
    solution: {
      a,
      b,
      c,
      s,
      area,
      r,
      R,
      fmt: {
        a: fmt(a),
        b: fmt(b),
        c: fmt(c),
        s: fmt(s),
        area: fmt(area),
        r: fmt(r),
        R: fmt(R)
      }
    }
  };
}

export interface HeronSolution {
  a: number;
  b: number;
  c: number;
  s: number;
  area: number;
  ha: number;
  hb: number;
  hc: number;
  ma: number;
  mb: number;
  mc: number;
  fmt: {
    a: string;
    b: string;
    c: string;
    s: string;
    area: string;
    ha: string;
    hb: string;
    hc: string;
    ma: string;
    mb: string;
    mc: string;
  };
}

export function calculateHeron(
  a: number,
  b: number,
  c: number,
  precision: number = 4
): { success: boolean; errorMessage?: string; solution?: HeronSolution } {
  if (
    a === undefined || b === undefined || c === undefined ||
    isNaN(a) || isNaN(b) || isNaN(c) ||
    a <= 0 || b <= 0 || c <= 0 ||
    !Number.isFinite(a) || !Number.isFinite(b) || !Number.isFinite(c)
  ) {
    return { success: false, errorMessage: "Side lengths must be positive real numbers." };
  }

  if (a + b <= c + 1e-9 || a + c <= b + 1e-9 || b + c <= a + 1e-9) {
    return { success: false, errorMessage: "Triangle inequality violated (sum of any two sides must exceed the third)." };
  }

  const s = (a + b + c) / 2.0;
  const areaTerm = s * (s - a) * (s - b) * (s - c);
  if (areaTerm <= 0) {
    return { success: false, errorMessage: "Degenerate triangle configuration." };
  }
  const area = Math.sqrt(areaTerm);
  const ha = (2.0 * area) / a;
  const hb = (2.0 * area) / b;
  const hc = (2.0 * area) / c;

  const ma = 0.5 * Math.sqrt(Math.max(0, 2 * b * b + 2 * c * c - a * a));
  const mb = 0.5 * Math.sqrt(Math.max(0, 2 * a * a + 2 * c * c - b * b));
  const mc = 0.5 * Math.sqrt(Math.max(0, 2 * a * a + 2 * b * b - c * c));

  const fmt = (v: number) => v.toFixed(precision);

  return {
    success: true,
    solution: {
      a,
      b,
      c,
      s,
      area,
      ha,
      hb,
      hc,
      ma,
      mb,
      mc,
      fmt: {
        a: fmt(a),
        b: fmt(b),
        c: fmt(c),
        s: fmt(s),
        area: fmt(area),
        ha: fmt(ha),
        hb: fmt(hb),
        hc: fmt(hc),
        ma: fmt(ma),
        mb: fmt(mb),
        mc: fmt(mc)
      }
    }
  };
}

