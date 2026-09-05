/**
 * Mathematical engine for Pythagorean Theorem Calculator & Right Triangle Suite
 */

export interface SimplifiedRadical {
  coefficient: number;
  radicand: number;
  text: string;
}

export function simplifyRadical(valSquared: number): SimplifiedRadical {
  const roundedSq = Math.round(valSquared * 1e8) / 1e8;
  if (roundedSq <= 0) return { coefficient: 0, radicand: 0, text: "0" };

  // Check if perfect square
  const root = Math.sqrt(roundedSq);
  if (Math.abs(root - Math.round(root)) < 1e-7) {
    return { coefficient: Math.round(root), radicand: 1, text: `${Math.round(root)}` };
  }

  // Integer factorization for radical simplification if close to integer
  if (Math.abs(roundedSq - Math.round(roundedSq)) < 1e-5) {
    let intVal = Math.round(roundedSq);
    let coef = 1;
    for (let i = Math.floor(Math.sqrt(intVal)); i >= 2; i--) {
      if (intVal % (i * i) === 0) {
        coef *= i;
        intVal /= (i * i);
      }
    }
    const text = coef === 1 ? `√${intVal}` : `${coef}√${intVal}`;
    return { coefficient: coef, radicand: intVal, text };
  }

  const roundedVal = parseFloat(valSquared.toFixed(4));
  return { coefficient: 1, radicand: valSquared, text: `√${roundedVal}` };
}

export interface PythagoreanCoreResult {
  isValid: boolean;
  error?: string;
  solvedSide?: "a" | "b" | "c" | "verified";
  a: number;
  b: number;
  c: number;
  area: number;
  perimeter: number;
  altitudeHc: number;
  alphaDeg: number; // Angle at top vertex A (opposite to leg b)
  alphaRad: number;
  betaDeg: number;  // Angle at right vertex B (opposite to leg a)
  betaRad: number;
  inradius: number;
  circumradius: number;
  exactRadicalC?: string;
  exactRadicalLeg?: string;
  isTriple: boolean;
  isPrimitiveTriple: boolean;
  stepText: string;
}

export function gcd(x: number, y: number): number {
  let a = Math.abs(Math.round(x));
  let b = Math.abs(Math.round(y));
  while (b) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a;
}

export function computePythagoreanCore(
  inputA?: number,
  inputB?: number,
  inputC?: number,
  precision: number = 4
): PythagoreanCoreResult {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const hasA = inputA !== undefined && !isNaN(inputA);
  const hasB = inputB !== undefined && !isNaN(inputB);
  const hasC = inputC !== undefined && !isNaN(inputC);

  // Validate non-positive numbers if provided
  if ((hasA && inputA! <= 0) || (hasB && inputB! <= 0) || (hasC && inputC! <= 0)) {
    return {
      isValid: false,
      error: "All side lengths must be strictly positive real numbers (> 0).",
      a: inputA || 0,
      b: inputB || 0,
      c: inputC || 0,
      area: 0,
      perimeter: 0,
      altitudeHc: 0,
      alphaDeg: 0,
      alphaRad: 0,
      betaDeg: 0,
      betaRad: 0,
      inradius: 0,
      circumradius: 0,
      isTriple: false,
      isPrimitiveTriple: false,
      stepText: "Error: Negative or zero side length entered."
    };
  }

  let a = 0;
  let b = 0;
  let c = 0;
  let solvedSide: "a" | "b" | "c" | "verified" = "c";
  let stepText = "";
  let exactRadicalC = "";
  let exactRadicalLeg = "";

  // CASE 1: All 3 provided -> Verify consistency, do NOT silently alter or accept invalid
  if (hasA && hasB && hasC) {
    a = inputA!;
    b = inputB!;
    c = inputC!;
    solvedSide = "verified";

    // Triangle inequality
    if (a + b <= c || a + c <= b || b + c <= a) {
      return {
        isValid: false,
        error: `Triangle inequality violated: sum of any two sides must exceed the third (a + b = ${fmt(a + b)}, c = ${c}).`,
        a, b, c,
        area: 0, perimeter: 0, altitudeHc: 0,
        alphaDeg: 0, alphaRad: 0, betaDeg: 0, betaRad: 0,
        inradius: 0, circumradius: 0,
        isTriple: false, isPrimitiveTriple: false,
        stepText: "Error: Triangle inequality violated."
      };
    }

    const cSqExpected = a * a + b * b;
    const cSqActual = c * c;
    const diff = Math.abs(cSqExpected - cSqActual);
    const relDiff = diff / Math.max(cSqExpected, cSqActual);

    if (relDiff > 1e-4) {
      const correctC = Math.sqrt(cSqExpected);
      return {
        isValid: false,
        error: `Inconsistent right triangle: a² + b² ≠ c² (${a}² + ${b}² = ${fmt(cSqExpected)}, but c² = ${fmt(cSqActual)}). For legs ${a} and ${b}, hypotenuse c must be ${fmt(correctC)}.`,
        a, b, c,
        area: 0, perimeter: 0, altitudeHc: 0,
        alphaDeg: 0, alphaRad: 0, betaDeg: 0, betaRad: 0,
        inradius: 0, circumradius: 0,
        isTriple: false, isPrimitiveTriple: false,
        stepText: `Error: Mathematically inconsistent sides entered (a=${a}, b=${b}, c=${c}).`
      };
    }

    const radObj = simplifyRadical(c * c);
    exactRadicalC = radObj.text;
    stepText = `1. Given all three sides: a = ${a}, b = ${b}, c = ${c}.\n2. Verify Pythagorean equation: a² + b² = ${a}² + ${b}² = ${fmt(a * a)} + ${fmt(b * b)} = ${fmt(cSqExpected)}.\n3. c² = ${c}² = ${fmt(cSqActual)}.\n4. Verified: a² + b² = c² confirms a valid right triangle.`;
  }
  // CASE 2: Given legs a and b -> Solve hypotenuse c
  else if (hasA && hasB && !hasC) {
    a = inputA!;
    b = inputB!;
    solvedSide = "c";
    const cSq = a * a + b * b;
    c = Math.sqrt(cSq);
    const radObj = simplifyRadical(cSq);
    exactRadicalC = radObj.text;
    stepText = `1. Given Leg a = ${a}, Leg b = ${b}.\n2. Apply Theorem: c² = a² + b² = ${a}² + ${b}² = ${fmt(a * a)} + ${fmt(b * b)} = ${fmt(cSq)}.\n3. Hypotenuse c = √${fmt(cSq)} = ${exactRadicalC} ≈ ${fmt(c)}.`;
  }
  // CASE 3: Given leg a and hypotenuse c -> Solve leg b
  else if (hasA && hasC && !hasB) {
    a = inputA!;
    c = inputC!;
    solvedSide = "b";
    if (c <= a) {
      return {
        isValid: false,
        error: `Hypotenuse c (${c}) must be strictly greater than leg a (${a}).`,
        a, b: 0, c,
        area: 0, perimeter: 0, altitudeHc: 0,
        alphaDeg: 0, alphaRad: 0, betaDeg: 0, betaRad: 0,
        inradius: 0, circumradius: 0,
        isTriple: false, isPrimitiveTriple: false,
        stepText: "Error: Hypotenuse must exceed leg length."
      };
    }
    const bSq = c * c - a * a;
    b = Math.sqrt(bSq);
    const radObj = simplifyRadical(bSq);
    exactRadicalLeg = radObj.text;
    stepText = `1. Given Hypotenuse c = ${c}, Leg a = ${a}.\n2. Apply Theorem: b² = c² - a² = ${c}² - ${a}² = ${fmt(c * c)} - ${fmt(a * a)} = ${fmt(bSq)}.\n3. Leg b = √${fmt(bSq)} = ${exactRadicalLeg} ≈ ${fmt(b)}.`;
  }
  // CASE 4: Given leg b and hypotenuse c -> Solve leg a
  else if (hasB && hasC && !hasA) {
    b = inputB!;
    c = inputC!;
    solvedSide = "a";
    if (c <= b) {
      return {
        isValid: false,
        error: `Hypotenuse c (${c}) must be strictly greater than leg b (${b}).`,
        a: 0, b, c,
        area: 0, perimeter: 0, altitudeHc: 0,
        alphaDeg: 0, alphaRad: 0, betaDeg: 0, betaRad: 0,
        inradius: 0, circumradius: 0,
        isTriple: false, isPrimitiveTriple: false,
        stepText: "Error: Hypotenuse must exceed leg length."
      };
    }
    const aSq = c * c - b * b;
    a = Math.sqrt(aSq);
    const radObj = simplifyRadical(aSq);
    exactRadicalLeg = radObj.text;
    stepText = `1. Given Hypotenuse c = ${c}, Leg b = ${b}.\n2. Apply Theorem: a² = c² - b² = ${c}² - ${b}² = ${fmt(c * c)} - ${fmt(b * b)} = ${fmt(aSq)}.\n3. Leg a = √${fmt(aSq)} = ${exactRadicalLeg} ≈ ${fmt(a)}.`;
  }
  // CASE 5: Default when empty or insufficient inputs
  else {
    a = 3;
    b = 4;
    c = 5;
    solvedSide = "c";
    exactRadicalC = "5";
    stepText = "Default 3-4-5 Right Triangle.";
  }

  const area = 0.5 * a * b;
  const perimeter = a + b + c;
  const altitudeHc = (a * b) / c;

  // In the geometric diagram:
  // Leg a is vertical (between corner C and top vertex A).
  // Leg b is horizontal (between corner C and right vertex B).
  // Top vertex angle A (alpha): opposite side is horizontal leg b, adjacent side is vertical leg a.
  // Right vertex angle B (beta): opposite side is vertical leg a, adjacent side is horizontal leg b.
  const alphaRad = Math.atan2(b, a);
  const alphaDeg = (alphaRad * 180) / Math.PI;
  const betaRad = Math.atan2(a, b);
  const betaDeg = (betaRad * 180) / Math.PI;

  const inradius = (a + b - c) / 2.0;
  const circumradius = c / 2.0;

  // Check if Pythagorean Triple (integers within precision)
  const isIntA = Math.abs(a - Math.round(a)) < 1e-5;
  const isIntB = Math.abs(b - Math.round(b)) < 1e-5;
  const isIntC = Math.abs(c - Math.round(c)) < 1e-5;
  const isTriple = isIntA && isIntB && isIntC;
  const g = isTriple ? gcd(gcd(Math.round(a), Math.round(b)), Math.round(c)) : 0;
  const isPrimitiveTriple = isTriple && g === 1;

  return {
    isValid: true,
    solvedSide,
    a: fmt(a),
    b: fmt(b),
    c: fmt(c),
    area: fmt(area),
    perimeter: fmt(perimeter),
    altitudeHc: fmt(altitudeHc),
    alphaDeg: fmt(alphaDeg),
    alphaRad: parseFloat(alphaRad.toFixed(precision + 2)),
    betaDeg: fmt(betaDeg),
    betaRad: parseFloat(betaRad.toFixed(precision + 2)),
    inradius: fmt(inradius),
    circumradius: fmt(circumradius),
    exactRadicalC,
    exactRadicalLeg,
    isTriple,
    isPrimitiveTriple,
    stepText
  };
}

export interface SideAngleResult {
  isValid: boolean;
  error?: string;
  knownType: "a" | "b" | "c";
  knownVal: number;
  angleDeg: number;
  angleRad: number;
  complementaryAngleDeg: number;
  a: number;
  b: number;
  c: number;
  area: number;
  perimeter: number;
  altitudeHc: number;
  exactRadicalC?: string;
  exactRadicalLeg?: string;
  sinVal: number;
  cosVal: number;
  tanVal: number;
  stepText: string;
}

/**
 * Solve right triangle given one side and one acute angle θ.
 * Mathematical Convention:
 * - Acute Angle θ is strictly between 0° and 90° (0 < θ < 90).
 * - Leg a is the side OPPOSITE to angle θ.
 * - Leg b is the side ADJACENT to angle θ.
 * - Hypotenuse c is opposite the 90° right angle.
 *
 * Relationships:
 * sin(θ) = a / c
 * cos(θ) = b / c
 * tan(θ) = a / b
 */
export function computeSideAngle(
  knownType: "a" | "b" | "c",
  knownVal: number,
  angleDeg: number,
  precision: number = 4
): SideAngleResult {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  if (isNaN(angleDeg) || angleDeg <= 0 || angleDeg >= 90) {
    return {
      isValid: false,
      error: `Acute angle θ must be strictly between 0° and 90° (received ${angleDeg}°).`,
      knownType,
      knownVal,
      angleDeg,
      angleRad: 0,
      complementaryAngleDeg: 0,
      a: 0, b: 0, c: 0,
      area: 0, perimeter: 0, altitudeHc: 0,
      sinVal: 0, cosVal: 0, tanVal: 0,
      stepText: "Error: Invalid acute angle. An acute angle must satisfy 0° < θ < 90°."
    };
  }

  if (isNaN(knownVal) || knownVal <= 0) {
    return {
      isValid: false,
      error: `Side length must be a strictly positive real number (received ${knownVal}).`,
      knownType,
      knownVal,
      angleDeg,
      angleRad: 0,
      complementaryAngleDeg: 0,
      a: 0, b: 0, c: 0,
      area: 0, perimeter: 0, altitudeHc: 0,
      sinVal: 0, cosVal: 0, tanVal: 0,
      stepText: "Error: Invalid side length. Side length must be > 0."
    };
  }

  const rad = (angleDeg * Math.PI) / 180.0;
  const sinVal = Math.sin(rad);
  const cosVal = Math.cos(rad);
  const tanVal = Math.tan(rad);
  const compDeg = 90 - angleDeg;

  let a = 0;
  let b = 0;
  let c = 0;
  let stepText = "";
  let exactRadicalC = "";
  let exactRadicalLeg = "";

  if (knownType === "c") {
    c = knownVal;
    a = c * sinVal;
    b = c * cosVal;
    exactRadicalC = simplifyRadical(c * c).text;
    stepText = `1. Known Hypotenuse c = ${c}, Acute Angle θ = ${angleDeg}°.\n2. Opposite Leg a = c × sin(θ) = ${c} × ${fmt(sinVal)} = ${fmt(a)}.\n3. Adjacent Leg b = c × cos(θ) = ${c} × ${fmt(cosVal)} = ${fmt(b)}.\n4. Complementary Angle = 90° - ${angleDeg}° = ${compDeg}°.`;
  } else if (knownType === "a") {
    a = knownVal;
    c = a / sinVal;
    b = a / tanVal;
    exactRadicalC = simplifyRadical(c * c).text;
    exactRadicalLeg = simplifyRadical(b * b).text;
    stepText = `1. Known Leg a (Opposite to θ) = ${a}, Acute Angle θ = ${angleDeg}°.\n2. Hypotenuse c = a / sin(θ) = ${a} / ${fmt(sinVal)} = ${fmt(c)}.\n3. Adjacent Leg b = a / tan(θ) = ${a} / ${fmt(tanVal)} = ${fmt(b)}.\n4. Complementary Angle = 90° - ${angleDeg}° = ${compDeg}°.`;
  } else {
    // knownType === "b"
    b = knownVal;
    c = b / cosVal;
    a = b * tanVal;
    exactRadicalC = simplifyRadical(c * c).text;
    exactRadicalLeg = simplifyRadical(a * a).text;
    stepText = `1. Known Leg b (Adjacent to θ) = ${b}, Acute Angle θ = ${angleDeg}°.\n2. Hypotenuse c = b / cos(θ) = ${b} / ${fmt(cosVal)} = ${fmt(c)}.\n3. Opposite Leg a = b × tan(θ) = ${b} × ${fmt(tanVal)} = ${fmt(a)}.\n4. Complementary Angle = 90° - ${angleDeg}° = ${compDeg}°.`;
  }

  const area = 0.5 * a * b;
  const perimeter = a + b + c;
  const altitudeHc = (a * b) / c;

  return {
    isValid: true,
    knownType,
    knownVal,
    angleDeg,
    angleRad: parseFloat(rad.toFixed(6)),
    complementaryAngleDeg: compDeg,
    a: fmt(a),
    b: fmt(b),
    c: fmt(c),
    area: fmt(area),
    perimeter: fmt(perimeter),
    altitudeHc: fmt(altitudeHc),
    exactRadicalC,
    exactRadicalLeg,
    sinVal: fmt(sinVal),
    cosVal: fmt(cosVal),
    tanVal: fmt(tanVal),
    stepText
  };
}

export interface Pythagorean3DResult {
  x: number;
  y: number;
  z: number;
  baseDiag2D: number;
  spaceDiag3D: number;
  exactRadical2D: string;
  exactRadical3D: string;
  stepText: string;
}

export function compute3DPythagorean(x: number, y: number, z: number, precision: number = 4): Pythagorean3DResult {
  // Support negative and positive coordinate offsets (coordinates in 3D Euclidean space)
  const baseDiag2DSq = x * x + y * y;
  const baseDiag2D = Math.sqrt(baseDiag2DSq);
  const spaceDiag3DSq = baseDiag2DSq + z * z;
  const spaceDiag3D = Math.sqrt(spaceDiag3DSq);

  const radObj2D = simplifyRadical(baseDiag2DSq);
  const radObj3D = simplifyRadical(spaceDiag3DSq);
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. 2D Base Diagonal d_2D = √(x² + y²) = √(${x}² + ${y}²) = √(${fmt(x * x)} + ${fmt(y * y)}) = √${fmt(baseDiag2DSq)} = ${radObj2D.text} ≈ ${fmt(baseDiag2D)}.\n2. 3D Space Distance d_3D = √(d_2D² + z²) = √(${fmt(baseDiag2DSq)} + ${z}²) = √${fmt(spaceDiag3DSq)} = ${radObj3D.text} ≈ ${fmt(spaceDiag3D)}.`;

  return {
    x,
    y,
    z,
    baseDiag2D: fmt(baseDiag2D),
    spaceDiag3D: fmt(spaceDiag3D),
    exactRadical2D: radObj2D.text,
    exactRadical3D: radObj3D.text,
    stepText
  };
}

export interface EuclidTripleResult {
  isValid: boolean;
  error?: string;
  m: number;
  n: number;
  a: number;
  b: number;
  c: number;
  isPrimitive: boolean;
  gcdMN: number;
  stepText: string;
}

export function computeEuclidTriple(mVal: number, nVal: number): EuclidTripleResult {
  if (isNaN(mVal) || isNaN(nVal)) {
    return {
      isValid: false,
      error: "Parameters m and n must be valid numbers.",
      m: mVal, n: nVal, a: 0, b: 0, c: 0, isPrimitive: false, gcdMN: 0,
      stepText: "Error: Non-numeric parameters entered."
    };
  }

  if (!Number.isInteger(mVal) || !Number.isInteger(nVal)) {
    return {
      isValid: false,
      error: `Parameters m and n must be positive integers (received m = ${mVal}, n = ${nVal}).`,
      m: mVal, n: nVal, a: 0, b: 0, c: 0, isPrimitive: false, gcdMN: 0,
      stepText: "Error: Euclid's formula requires integers."
    };
  }

  if (mVal <= 0 || nVal <= 0) {
    return {
      isValid: false,
      error: `Parameters m and n must be strictly positive (received m = ${mVal}, n = ${nVal}).`,
      m: mVal, n: nVal, a: 0, b: 0, c: 0, isPrimitive: false, gcdMN: 0,
      stepText: "Error: Non-positive parameters entered."
    };
  }

  if (mVal <= nVal) {
    return {
      isValid: false,
      error: `Parameter m must be strictly greater than n (received m = ${mVal}, n = ${nVal}).`,
      m: mVal, n: nVal, a: 0, b: 0, c: 0, isPrimitive: false, gcdMN: 0,
      stepText: `Error: m (${mVal}) is not greater than n (${nVal}).`
    };
  }

  const m = Math.round(mVal);
  const n = Math.round(nVal);
  const a = m * m - n * n;
  const b = 2 * m * n;
  const c = m * m + n * n;

  const g = gcd(m, n);
  // Primitive triple iff gcd(m, n) = 1 and one of m, n is even (i.e. (m - n) is odd)
  const isPrimitive = g === 1 && (m - n) % 2 !== 0;

  const stepText = `1. Given integers m = ${m}, n = ${n} with m > n.\n2. Side a = m² - n² = ${m}² - ${n}² = ${m * m} - ${n * n} = ${a}.\n3. Side b = 2mn = 2 × ${m} × ${n} = ${b}.\n4. Hypotenuse c = m² + n² = ${m}² + ${n}² = ${m * m} + ${n * n} = ${c}.\n5. Check: ${a}² + ${b}² = ${a * a} + ${b * b} = ${c * c} (${c}²). ${isPrimitive ? "Primitive triple (gcd(m,n)=1 and coprime parity)." : "Non-primitive triple (shares common factor)."}`;

  return {
    isValid: true,
    m,
    n,
    a,
    b,
    c,
    isPrimitive,
    gcdMN: g,
    stepText
  };
}

export type PythagoreanLengthUnit = "meters" | "cm" | "mm" | "km" | "feet" | "inches" | "yards" | "miles";

// Exact standard conversion factors relative to meters
const METERS_PER_UNIT: Record<PythagoreanLengthUnit, number> = {
  meters: 1,
  cm: 0.01,
  mm: 0.001,
  km: 1000,
  inches: 0.0254,
  feet: 0.3048,
  yards: 0.9144,
  miles: 1609.344
};

export interface ConvertedUnitsResult {
  meters: number;
  cm: number;
  mm: number;
  km: number;
  feet: number;
  inches: number;
  yards: number;
  miles: number;
}

export function convertPythagoreanUnits(
  val: number,
  fromUnit: PythagoreanLengthUnit = "meters",
  precision: number = 4
): ConvertedUnitsResult {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));
  const metersVal = val * METERS_PER_UNIT[fromUnit];

  return {
    meters: fmt(metersVal),
    cm: fmt(metersVal / METERS_PER_UNIT.cm),
    mm: fmt(metersVal / METERS_PER_UNIT.mm),
    km: fmt(metersVal / METERS_PER_UNIT.km),
    feet: fmt(metersVal / METERS_PER_UNIT.feet),
    inches: fmt(metersVal / METERS_PER_UNIT.inches),
    yards: fmt(metersVal / METERS_PER_UNIT.yards),
    miles: fmt(metersVal / METERS_PER_UNIT.miles)
  };
}
