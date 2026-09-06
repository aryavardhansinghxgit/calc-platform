/**
 * Mathematical engine for Right Triangle Calculator & Trigonometric Solver Suite
 */

export interface TrigRatios {
  sin: number;
  cos: number;
  tan: number;
  csc: number;
  sec: number;
  cot: number;
  sinFrac: string;
  cosFrac: string;
  tanFrac: string;
}

export interface RightTriangleResult {
  isValid: boolean;
  errorMessage?: string;
  a: number;
  b: number;
  c: number;
  alphaDeg: number;
  alphaRad: number;
  betaDeg: number;
  betaRad: number;
  area: number;
  perimeter: number;
  altitudeHc: number;
  hypSegmentP: number;
  hypSegmentQ: number;
  inradius: number;
  circumradius: number;
  medianMc: number;
  gradePercent: number;
  roofPitch: string;
  trigRatiosAlpha: TrigRatios;
  trigRatiosBeta: TrigRatios;
  stepText: string;
}

export function computeRightTriangleUniversal(
  inputA?: number,
  inputB?: number,
  inputC?: number,
  inputAlphaDeg?: number,
  inputBetaDeg?: number,
  inputArea?: number,
  inputPerimeter?: number,
  precision: number = 4
): RightTriangleResult {
  const fmt = (v: number): number => {
    if (!Number.isFinite(v)) return 0;
    const abs = Math.abs(v);
    if (abs > 0 && abs < 10 ** (-precision)) {
      return parseFloat(v.toExponential(Math.min(precision, 8)));
    }
    return parseFloat(v.toFixed(precision));
  };

  const createInvalidResult = (msg: string): RightTriangleResult => {
    const zeroTrig: TrigRatios = {
      sin: 0,
      cos: 0,
      tan: 0,
      csc: 0,
      sec: 0,
      cot: 0,
      sinFrac: "0 / 0",
      cosFrac: "0 / 0",
      tanFrac: "0 / 0"
    };
    return {
      isValid: false,
      errorMessage: msg,
      a: 0,
      b: 0,
      c: 0,
      alphaDeg: 0,
      alphaRad: 0,
      betaDeg: 0,
      betaRad: 0,
      area: 0,
      perimeter: 0,
      altitudeHc: 0,
      hypSegmentP: 0,
      hypSegmentQ: 0,
      inradius: 0,
      circumradius: 0,
      medianMc: 0,
      gradePercent: 0,
      roofPitch: "0:12",
      trigRatiosAlpha: zeroTrig,
      trigRatiosBeta: zeroTrig,
      stepText: `Validation error: ${msg}`
    };
  };

  // Check for negative or zero inputs if provided
  if (inputA !== undefined && inputA <= 0) return createInvalidResult("Leg a must be a positive number.");
  if (inputB !== undefined && inputB <= 0) return createInvalidResult("Leg b must be a positive number.");
  if (inputC !== undefined && inputC <= 0) return createInvalidResult("Hypotenuse c must be a positive number.");
  if (inputAlphaDeg !== undefined && (inputAlphaDeg <= 0 || inputAlphaDeg >= 90)) {
    return createInvalidResult("Acute angle α must be strictly between 0° and 90°.");
  }
  if (inputBetaDeg !== undefined && (inputBetaDeg <= 0 || inputBetaDeg >= 90)) {
    return createInvalidResult("Acute angle β must be strictly between 0° and 90°.");
  }

  let a = 0;
  let b = 0;
  let c = 0;
  let alphaRad = 0;
  let betaRad = 0;

  // Case: All three sides supplied -> check consistency
  if (inputA !== undefined && inputB !== undefined && inputC !== undefined) {
    const diff = Math.abs(inputA * inputA + inputB * inputB - inputC * inputC);
    const relDiff = diff / (inputC * inputC);
    if (relDiff > 0.01) {
      return createInvalidResult("Contradictory side lengths: a² + b² ≠ c².");
    }
    if (inputC <= inputA || inputC <= inputB) {
      return createInvalidResult("Hypotenuse c must be strictly greater than legs a and b.");
    }
    a = inputA;
    b = inputB;
    c = inputC;
    alphaRad = Math.atan2(a, b);
    betaRad = Math.PI / 2.0 - alphaRad;
  }
  // Case: Given a and c
  else if (inputA !== undefined && inputC !== undefined) {
    if (inputC <= inputA) {
      return createInvalidResult("Hypotenuse c must be strictly greater than leg a.");
    }
    a = inputA;
    c = inputC;
    b = Math.sqrt(c * c - a * a);
    alphaRad = Math.asin(a / c);
    betaRad = Math.PI / 2.0 - alphaRad;
  }
  // Case: Given b and c
  else if (inputB !== undefined && inputC !== undefined) {
    if (inputC <= inputB) {
      return createInvalidResult("Hypotenuse c must be strictly greater than leg b.");
    }
    b = inputB;
    c = inputC;
    a = Math.sqrt(c * c - b * b);
    alphaRad = Math.acos(b / c);
    betaRad = Math.PI / 2.0 - alphaRad;
  }
  // Case: Given a and b
  else if (inputA !== undefined && inputB !== undefined) {
    a = inputA;
    b = inputB;
    c = Math.sqrt(a * a + b * b);
    alphaRad = Math.atan2(a, b);
    betaRad = Math.PI / 2.0 - alphaRad;
  }
  // Case: Given a and alpha
  else if (inputA !== undefined && inputAlphaDeg !== undefined) {
    a = inputA;
    alphaRad = (inputAlphaDeg * Math.PI) / 180.0;
    betaRad = Math.PI / 2.0 - alphaRad;
    c = a / Math.sin(alphaRad);
    b = a / Math.tan(alphaRad);
  }
  // Case: Given b and alpha
  else if (inputB !== undefined && inputAlphaDeg !== undefined) {
    b = inputB;
    alphaRad = (inputAlphaDeg * Math.PI) / 180.0;
    betaRad = Math.PI / 2.0 - alphaRad;
    c = b / Math.cos(alphaRad);
    a = b * Math.tan(alphaRad);
  }
  // Case: Given c and alpha
  else if (inputC !== undefined && inputAlphaDeg !== undefined) {
    c = inputC;
    alphaRad = (inputAlphaDeg * Math.PI) / 180.0;
    betaRad = Math.PI / 2.0 - alphaRad;
    a = c * Math.sin(alphaRad);
    b = c * Math.cos(alphaRad);
  }
  // Case: Given Area and a
  else if (inputArea !== undefined && inputA !== undefined) {
    a = inputA;
    b = (2.0 * inputArea) / a;
    c = Math.sqrt(a * a + b * b);
    alphaRad = Math.atan2(a, b);
    betaRad = Math.PI / 2.0 - alphaRad;
  }
  // Default canonical 5-12-13
  else {
    a = 5;
    b = 12;
    c = 13;
    alphaRad = Math.atan2(a, b);
    betaRad = Math.PI / 2.0 - alphaRad;
  }

  const alphaDeg = (alphaRad * 180.0) / Math.PI;
  const betaDeg = (betaRad * 180.0) / Math.PI;

  const area = 0.5 * a * b;
  const perimeter = a + b + c;
  const altitudeHc = (a * b) / c;
  const hypSegmentP = (a * a) / c;
  const hypSegmentQ = (b * b) / c;
  const inradius = (a + b - c) / 2.0;
  const circumradius = c / 2.0;
  const medianMc = c / 2.0;
  const gradePercent = b !== 0 ? (a / b) * 100.0 : 0;

  // Roof pitch string
  const pitchRatio = b !== 0 ? (a / b) * 12.0 : 0;
  const roofPitch = `${fmt(pitchRatio)}:12`;

  const buildTrig = (opp: number, adj: number, hyp: number): TrigRatios => {
    return {
      sin: fmt(opp / hyp),
      cos: fmt(adj / hyp),
      tan: fmt(opp / adj),
      csc: fmt(hyp / opp),
      sec: fmt(hyp / adj),
      cot: fmt(adj / opp),
      sinFrac: `${fmt(opp)} / ${fmt(hyp)}`,
      cosFrac: `${fmt(adj)} / ${fmt(hyp)}`,
      tanFrac: `${fmt(opp)} / ${fmt(adj)}`
    };
  };

  const trigRatiosAlpha = buildTrig(a, b, c);
  const trigRatiosBeta = buildTrig(b, a, c);

  const stepText = `1. Right Triangle dimensions: Leg a = ${fmt(a)}, Leg b = ${fmt(b)}, Hypotenuse c = ${fmt(c)}.\n2. Angles: α = ${fmt(alphaDeg)}° (${fmt(alphaRad)} rad), β = 90° - α = ${fmt(betaDeg)}°.\n3. Area K = ½ab = ½ × ${fmt(a)} × ${fmt(b)} = ${fmt(area)}.\n4. Perimeter P = a + b + c = ${fmt(perimeter)}.\n5. Altitude to Hypotenuse h_c = ab/c = ${fmt(altitudeHc)}.\n6. Inradius r = (a+b-c)/2 = ${fmt(inradius)}, Circumradius R = c/2 = ${fmt(circumradius)}.`;

  return {
    isValid: true,
    a: fmt(a),
    b: fmt(b),
    c: fmt(c),
    alphaDeg: fmt(alphaDeg),
    alphaRad: fmt(alphaRad),
    betaDeg: fmt(betaDeg),
    betaRad: fmt(betaRad),
    area: fmt(area),
    perimeter: fmt(perimeter),
    altitudeHc: fmt(altitudeHc),
    hypSegmentP: fmt(hypSegmentP),
    hypSegmentQ: fmt(hypSegmentQ),
    inradius: fmt(inradius),
    circumradius: fmt(circumradius),
    medianMc: fmt(medianMc),
    gradePercent: fmt(gradePercent),
    roofPitch,
    trigRatiosAlpha,
    trigRatiosBeta,
    stepText
  };
}

export function convertRightTriangleUnits(metersVal: number, precision: number = 4) {
  const fmt = (v: number): number => {
    if (!Number.isFinite(v)) return 0;
    const abs = Math.abs(v);
    if (abs > 0 && abs < 10 ** (-precision)) {
      return parseFloat(v.toExponential(Math.min(precision, 8)));
    }
    return parseFloat(v.toFixed(precision));
  };

  const m = metersVal;

  return {
    meters: fmt(m),
    cm: fmt(m * 100.0),
    mm: fmt(m * 1000.0),
    km: fmt(m / 1000.0),
    feet: fmt(m * 3.280839895),
    inches: fmt(m * 39.37007874),
    yards: fmt(m * 1.093613298),
    miles: fmt(m / 1609.344)
  };
}
