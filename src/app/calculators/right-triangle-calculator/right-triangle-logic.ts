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
  const fmt = (v: number) => parseFloat(v.toFixed(precision));

  let a = 0; let b = 0; let c = 0;
  let alphaRad = 0; let betaRad = 0;

  // Case 1: Given a and b
  if (inputA && inputB && inputA > 0 && inputB > 0) {
    a = inputA; b = inputB;
    c = Math.sqrt(a * a + b * b);
    alphaRad = Math.atan2(a, b);
    betaRad = Math.PI / 2.0 - alphaRad;
  }
  // Case 2: Given a and c
  else if (inputA && inputC && inputA > 0 && inputC > inputA) {
    a = inputA; c = inputC;
    b = Math.sqrt(c * c - a * a);
    alphaRad = Math.asin(a / c);
    betaRad = Math.PI / 2.0 - alphaRad;
  }
  // Case 3: Given b and c
  else if (inputB && inputC && inputB > 0 && inputC > inputB) {
    b = inputB; c = inputC;
    a = Math.sqrt(c * c - b * b);
    alphaRad = Math.acos(b / c);
    betaRad = Math.PI / 2.0 - alphaRad;
  }
  // Case 4: Given a and alpha
  else if (inputA && inputAlphaDeg && inputA > 0 && inputAlphaDeg > 0 && inputAlphaDeg < 90) {
    a = inputA;
    alphaRad = (inputAlphaDeg * Math.PI) / 180.0;
    betaRad = Math.PI / 2.0 - alphaRad;
    c = a / Math.sin(alphaRad);
    b = a / Math.tan(alphaRad);
  }
  // Case 5: Given c and alpha
  else if (inputC && inputAlphaDeg && inputC > 0 && inputAlphaDeg > 0 && inputAlphaDeg < 90) {
    c = inputC;
    alphaRad = (inputAlphaDeg * Math.PI) / 180.0;
    betaRad = Math.PI / 2.0 - alphaRad;
    a = c * Math.sin(alphaRad);
    b = c * Math.cos(alphaRad);
  }
  // Case 6: Given Area and a
  else if (inputArea && inputA && inputArea > 0 && inputA > 0) {
    a = inputA;
    b = (2.0 * inputArea) / a;
    c = Math.sqrt(a * a + b * b);
    alphaRad = Math.atan2(a, b);
    betaRad = Math.PI / 2.0 - alphaRad;
  }
  // Default 5-12-13
  else {
    a = 5; b = 12; c = 13;
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
  const gradePercent = (a / b) * 100.0;

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

  const stepText = `1. Given Right Triangle parameters: Leg a = ${fmt(a)}, Leg b = ${fmt(b)}, Hypotenuse c = ${fmt(c)}.\n2. Angles: α = ${fmt(alphaDeg)}° (${fmt(alphaRad)} rad), β = 90° - α = ${fmt(betaDeg)}°.\n3. Area K = ½ab = ½ × ${fmt(a)} × ${fmt(b)} = ${fmt(area)}.\n4. Perimeter P = a + b + c = ${fmt(perimeter)}.\n5. Altitude to Hypotenuse h_c = ab/c = ${fmt(altitudeHc)}.\n6. Inradius r = (a+b-c)/2 = ${fmt(inradius)}, Circumradius R = c/2 = ${fmt(circumradius)}.`;

  return {
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
