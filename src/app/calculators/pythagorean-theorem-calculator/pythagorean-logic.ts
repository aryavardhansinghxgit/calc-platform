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

  return { coefficient: 1, radicand: valSquared, text: `√${parseFloat(valSquared.toFixed(4))}` };
}

export interface PythagoreanCoreResult {
  a: number;
  b: number;
  c: number;
  area: number;
  perimeter: number;
  altitudeHc: number;
  alphaDeg: number;
  alphaRad: number;
  betaDeg: number;
  betaRad: number;
  inradius: number;
  circumradius: number;
  exactRadicalC?: string;
  exactRadicalLeg?: string;
  isTriple: boolean;
  isPrimitiveTriple: boolean;
  stepText: string;
}

function gcd(x: number, y: number): number {
  let a = Math.abs(x);
  let b = Math.abs(y);
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

  let a = 0;
  let b = 0;
  let c = 0;
  let stepText = "";
  let exactRadicalC = "";
  let exactRadicalLeg = "";

  if (inputA && inputB && (!inputC || inputC === 0)) {
    // Solve for Hypotenuse c = √(a² + b²)
    a = Math.max(0.0001, inputA);
    b = Math.max(0.0001, inputB);
    const cSq = a * a + b * b;
    c = Math.sqrt(cSq);
    const radObj = simplifyRadical(cSq);
    exactRadicalC = radObj.text;

    stepText = `1. Given Leg a = ${a}, Leg b = ${b}.\n2. Apply Theorem: c² = a² + b² = ${a}² + ${b}² = ${a * a} + ${b * b} = ${cSq}.\n3. Hypotenuse c = √${cSq} = ${exactRadicalC} ≈ ${fmt(c)}.`;
  } else if (inputC && inputA && (!inputB || inputB === 0)) {
    // Solve for Leg b = √(c² - a²)
    c = Math.max(0.0001, inputC);
    a = Math.max(0.0001, inputA);
    if (c <= a) {
      // Validation error fallback
      c = a + 1;
    }
    const bSq = c * c - a * a;
    b = Math.sqrt(bSq);
    const radObj = simplifyRadical(bSq);
    exactRadicalLeg = radObj.text;

    stepText = `1. Given Hypotenuse c = ${c}, Leg a = ${a}.\n2. Apply Theorem: b² = c² - a² = ${c}² - ${a}² = ${c * c} - ${a * a} = ${bSq}.\n3. Leg b = √${bSq} = ${exactRadicalLeg} ≈ ${fmt(b)}.`;
  } else if (inputC && inputB && (!inputA || inputA === 0)) {
    // Solve for Leg a = √(c² - b²)
    c = Math.max(0.0001, inputC);
    b = Math.max(0.0001, inputB);
    if (c <= b) {
      c = b + 1;
    }
    const aSq = c * c - b * b;
    a = Math.sqrt(aSq);
    const radObj = simplifyRadical(aSq);
    exactRadicalLeg = radObj.text;

    stepText = `1. Given Hypotenuse c = ${c}, Leg b = ${b}.\n2. Apply Theorem: a² = c² - b² = ${c}² - ${b}² = ${c * c} - ${b * b} = ${aSq}.\n3. Leg a = √${aSq} = ${exactRadicalLeg} ≈ ${fmt(a)}.`;
  } else {
    // Default 3-4-5
    a = 3; b = 4; c = 5;
    exactRadicalC = "5";
    stepText = "Default 3-4-5 Right Triangle.";
  }

  const area = 0.5 * a * b;
  const perimeter = a + b + c;
  const altitudeHc = (a * b) / c;
  const alphaRad = Math.atan2(a, b);
  const alphaDeg = (alphaRad * 180) / Math.PI;
  const betaRad = Math.atan2(b, a);
  const betaDeg = (betaRad * 180) / Math.PI;
  const inradius = (a + b - c) / 2.0;
  const circumradius = c / 2.0;

  // Check if Pythagorean Triple
  const isIntA = Math.abs(a - Math.round(a)) < 1e-5;
  const isIntB = Math.abs(b - Math.round(b)) < 1e-5;
  const isIntC = Math.abs(c - Math.round(c)) < 1e-5;
  const isTriple = isIntA && isIntB && isIntC;
  const g = isTriple ? gcd(gcd(Math.round(a), Math.round(b)), Math.round(c)) : 0;
  const isPrimitiveTriple = isTriple && g === 1;

  return {
    a: fmt(a),
    b: fmt(b),
    c: fmt(c),
    area: fmt(area),
    perimeter: fmt(perimeter),
    altitudeHc: fmt(altitudeHc),
    alphaDeg: fmt(alphaDeg),
    alphaRad: fmt(alphaRad),
    betaDeg: fmt(betaDeg),
    betaRad: fmt(betaRad),
    inradius: fmt(inradius),
    circumradius: fmt(circumradius),
    exactRadicalC,
    exactRadicalLeg,
    isTriple,
    isPrimitiveTriple,
    stepText
  };
}

export interface Pythagorean3DResult {
  x: number;
  y: number;
  z: number;
  baseDiag2D: number;
  spaceDiag3D: number;
  exactRadical3D: string;
  stepText: string;
}

export function compute3DPythagorean(x: number, y: number, z: number, precision: number = 4): Pythagorean3DResult {
  const safeX = Math.max(0, x);
  const safeY = Math.max(0, y);
  const safeZ = Math.max(0, z);

  const baseDiag2DSq = safeX * safeX + safeY * safeY;
  const baseDiag2D = Math.sqrt(baseDiag2DSq);
  const spaceDiag3DSq = baseDiag2DSq + safeZ * safeZ;
  const spaceDiag3D = Math.sqrt(spaceDiag3DSq);

  const radObj = simplifyRadical(spaceDiag3DSq);
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  const stepText = `1. 2D Base Diagonal d_2D = √(x² + y²) = √(${safeX}² + ${safeY}²) = ${fmt(baseDiag2D)}.\n2. 3D Space Distance d_3D = √(d_2D² + z²) = √(${safeX}² + ${safeY}² + ${safeZ}²) = √${spaceDiag3DSq} = ${radObj.text} ≈ ${fmt(spaceDiag3D)}.`;

  return {
    x: safeX,
    y: safeY,
    z: safeZ,
    baseDiag2D: fmt(baseDiag2D),
    spaceDiag3D: fmt(spaceDiag3D),
    exactRadical3D: radObj.text,
    stepText
  };
}

export function convertPythagoreanUnits(metersVal: number, precision: number = 4) {
  const fmt = (v: number) => parseFloat(v.toFixed(precision));
  const m = metersVal;

  return {
    meters: fmt(m),
    cm: fmt(m * 100.0),
    mm: fmt(m * 1000.0),
    km: fmt(m / 1000.0),
    feet: fmt(m * 3.2808399),
    inches: fmt(m * 39.3700787),
    yards: fmt(m * 1.0936133),
    miles: fmt(m / 1609.344)
  };
}
