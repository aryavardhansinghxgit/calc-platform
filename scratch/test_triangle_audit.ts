import {
  solveUniversalTriangle,
  solveRightTriangle,
  calculateInradiusCircumradius,
  calculateHeron,
  parseAngleExpression
} from "../src/app/calculators/triangle-calculator/triangle-logic";
import { runTriangleCalculatorTests } from "../src/app/calculators/triangle-calculator/tests";

console.log("=================================================");
console.log("TRIANGLE CALCULATOR AUDIT - COMPREHENSIVE SUITE");
console.log("=================================================");

// 0. RUN BUILT-IN REGRESSION TEST SUITE
console.log("\n--- 0. BUILT-IN REGRESSION TESTS ---");
try {
  const tRes = runTriangleCalculatorTests();
  console.log("runTriangleCalculatorTests():", tRes ? "PASS" : "FAIL");
} catch (e: any) {
  console.error("runTriangleCalculatorTests() FAILED:", e.message);
}

// 1. SAFE RADIAN / PI EXPRESSION PARSER TESTS (P0)
console.log("\n--- 1. SAFE RADIAN / PI EXPRESSION PARSING (P0) ---");
const p0Cases: [string, number][] = [
  ["pi/6", 30],
  ["pi/4", 45],
  ["pi/3", 60],
  ["pi/2", 90],
  ["2*pi/3", 120],
  ["3*pi/4", 135],
  ["5*pi/6", 150],
  ["2*pi", 360],
  ["π/6", 30],
  ["π/4", 45],
  ["π/3", 60],
  ["π/2", 90],
  ["2π/3", 120],
  ["3π/4", 135],
  ["5π/6", 150],
  ["2π", 360]
];
let p0Pass = 0;
for (const [expr, deg] of p0Cases) {
  const res = parseAngleExpression(expr, "rad");
  if (res !== undefined && Math.abs(res - deg) < 1e-5) {
    p0Pass++;
  } else {
    console.error(`P0 FAIL: '${expr}' -> ${res} (expected ${deg})`);
  }
}
console.log(`P0 Radian Tests: ${p0Pass}/${p0Cases.length} passed.`);

// 2. GOLDEN CASES
console.log("\n--- 2. GOLDEN CASES ---");

// Case 1: 3-4-5
const g345 = solveUniversalTriangle(3, 4, 5, undefined, undefined, undefined, 6);
const s345 = g345.solutions[0];
const c345_ok =
  Math.abs(s345.area - 6) < 1e-5 &&
  Math.abs(s345.perimeter - 12) < 1e-5 &&
  Math.abs(s345.semiPerimeter - 6) < 1e-5 &&
  Math.abs(s345.ha - 4) < 1e-5 &&
  Math.abs(s345.hb - 3) < 1e-5 &&
  Math.abs(s345.hc - 2.4) < 1e-5 &&
  Math.abs(s345.inradius - 1) < 1e-5 &&
  Math.abs(s345.circumradius - 2.5) < 1e-5 &&
  Math.abs(s345.A_deg - 36.8698976) < 1e-4 &&
  Math.abs(s345.B_deg - 53.1301024) < 1e-4 &&
  Math.abs(s345.C_deg - 90) < 1e-5;
console.log("Golden Case 1 (3-4-5):", c345_ok ? "PASS" : "FAIL");

// Case 2: 6-8-10 Right Triangle
const g6810 = solveRightTriangle(6, 8, 4);
const s6810 = g6810.solution!;
const c6810_ok =
  Math.abs(s6810.c - 10) < 1e-5 &&
  Math.abs(s6810.area - 24) < 1e-5 &&
  Math.abs(s6810.perimeter - 24) < 1e-5 &&
  Math.abs(s6810.sinA - 0.6) < 1e-5 &&
  Math.abs(s6810.cosA - 0.8) < 1e-5 &&
  Math.abs(s6810.tanA - 0.75) < 1e-5;
console.log("Golden Case 2 (6-8-10 Right Triangle):", c6810_ok ? "PASS" : "FAIL");

// Case 3: 7-8-9 Inradius & Circumradius
const g789 = calculateInradiusCircumradius(7, 8, 9, 6);
const s789 = g789.solution!;
const c789_ok =
  Math.abs(s789.s - 12) < 1e-5 &&
  Math.abs(s789.area - Math.sqrt(720)) < 1e-4 &&
  Math.abs(s789.r - 2.236068) < 1e-4 &&
  Math.abs(s789.R - 4.695742) < 1e-4;
console.log("Golden Case 3 (7-8-9 Radius):", c789_ok ? "PASS" : "FAIL");

// Case 4: 5-6-7 Heron's Formula (m_a ≈ 6.020797)
const g567 = calculateHeron(5, 6, 7, 6);
const s567 = g567.solution!;
const c567_ok =
  Math.abs(s567.s - 9) < 1e-5 &&
  Math.abs(s567.area - 14.696938) < 1e-4 &&
  Math.abs(s567.ha - 5.878775) < 1e-4 &&
  Math.abs(s567.hb - 4.898979) < 1e-4 &&
  Math.abs(s567.hc - 4.199125) < 1e-4 &&
  Math.abs(s567.ma - 6.020797) < 1e-4 &&
  Math.abs(s567.mb - 5.291503) < 1e-4 &&
  Math.abs(s567.mc - 4.272002) < 1e-4;
console.log("Golden Case 4 (5-6-7 Heron, ma≈6.020797):", c567_ok ? "PASS" : "FAIL");

// Case 5: Exact 30-60-90 Preset
const g3060 = solveUniversalTriangle(5, undefined, 10, 30, undefined, undefined, 4);
const s3060 = g3060.solutions[0];
const c3060_ok =
  Math.abs(s3060.A_deg - 30) < 1e-5 &&
  Math.abs(s3060.B_deg - 60) < 1e-5 &&
  Math.abs(s3060.C_deg - 90) < 1e-5;
console.log("Golden Case 5 (30-60-90 Preset):", c3060_ok ? "PASS" : "FAIL");

// 3. TRUE-TO-SCALE SVG GEOMETRY TESTS
console.log("\n--- 3. TRUE-TO-SCALE SVG GEOMETRIC TESTS ---");
function verifySvgGeometry(a: number, b: number, c: number) {
  const sol = solveUniversalTriangle(a, b, c).solutions[0];
  const { Ax, Ay, Bx, By, Cx, Cy } = sol.coords;
  const inradius = sol.inradius;
  const circumradius = sol.circumradius;

  // Incenter (IX, IY)
  const P = a + b + c;
  const Ix = (a * Ax + b * Bx + c * Cx) / P;
  const Iy = (a * Ay + b * By + c * Cy) / P;

  // Circumcenter (UX, UY)
  const Ux = c / 2;
  const Uy = (b * b - c * Cx) / (2 * Cy);

  // Uniform scale simulation
  const width = 360, height = 240, pad = 24;
  const minX = Math.min(Ax, Bx, Cx, Ux - circumradius);
  const maxX = Math.max(Ax, Bx, Cx, Ux + circumradius);
  const minY = Math.min(Ay, By, Cy, Uy - circumradius);
  const maxY = Math.max(Ay, By, Cy, Uy + circumradius);
  const rangeX = maxX - minX || 1;
  const rangeY = maxY - minY || 1;
  const scale = Math.min((width - 2 * pad) / rangeX, (height - 2 * pad) / rangeY);
  const offsetX = pad + (width - 2 * pad - rangeX * scale) / 2 - minX * scale;
  const offsetY = pad + (height - 2 * pad - rangeY * scale) / 2 - minY * scale;

  const toSvgX = (x: number) => offsetX + x * scale;
  const toSvgY = (y: number) => height - (offsetY + y * scale);

  // Check 1: Circumcircle passes through vertices A, B, C
  const svgUx = toSvgX(Ux);
  const svgUy = toSvgY(Uy);
  const svgR = circumradius * scale;

  const distA = Math.hypot(toSvgX(Ax) - svgUx, toSvgY(Ay) - svgUy);
  const distB = Math.hypot(toSvgX(Bx) - svgUx, toSvgY(By) - svgUy);
  const distC = Math.hypot(toSvgX(Cx) - svgUx, toSvgY(Cy) - svgUy);

  const circA_ok = Math.abs(distA - svgR) < 0.01;
  const circB_ok = Math.abs(distB - svgR) < 0.01;
  const circC_ok = Math.abs(distC - svgR) < 0.01;

  // Check 2: Incircle tangent to side AB (along y=0 since Ay=0, By=0)
  const svgIx = toSvgX(Ix);
  const svgIy = toSvgY(Iy);
  const svgr = inradius * scale;
  const distToAB = Math.abs(svgIy - toSvgY(0));
  const incircle_ok = Math.abs(distToAB - svgr) < 0.01;

  return circA_ok && circB_ok && circC_ok && incircle_ok;
}

const geomCases: [number, number, number, string][] = [
  [3, 4, 5, "3-4-5"],
  [5, 6, 7, "5-6-7"],
  [7, 8, 9, "7-8-9"],
  [6, 6, 6, "Equilateral 6-6-6"],
  [5, 5, 8, "Isosceles 5-5-8"]
];
for (const [a, b, c, name] of geomCases) {
  const ok = verifySvgGeometry(a, b, c);
  console.log(`Visualizer Geometry Test (${name}):`, ok ? "PASS" : "FAIL");
}

// 4. DISPLAY DECIMAL PRECISION & TRAILING ZEROS (P2)
console.log("\n--- 4. DISPLAY DECIMAL PRECISION & TRAILING ZEROS (P2) ---");
const p2Prec2 = solveUniversalTriangle(3, 4, 5, undefined, undefined, undefined, 2).solutions[0];
const p2Prec4 = solveUniversalTriangle(3, 4, 5, undefined, undefined, undefined, 4).solutions[0];
const p2Prec6 = solveUniversalTriangle(3, 4, 5, undefined, undefined, undefined, 6).solutions[0];

const prec2Ok = p2Prec2.fmt.area === "6.00" && p2Prec2.fmt.r === "1.00" && p2Prec2.fmt.R === "2.50";
const prec4Ok = p2Prec4.fmt.area === "6.0000" && p2Prec4.fmt.r === "1.0000" && p2Prec4.fmt.R === "2.5000";
const prec6Ok = p2Prec6.fmt.area === "6.000000" && p2Prec6.fmt.r === "1.000000" && p2Prec6.fmt.R === "2.500000";
console.log("Precision 2 trailing zeros:", prec2Ok ? "PASS" : `FAIL (area=${p2Prec2.fmt.area})`);
console.log("Precision 4 trailing zeros:", prec4Ok ? "PASS" : `FAIL (area=${p2Prec4.fmt.area})`);
console.log("Precision 6 trailing zeros:", prec6Ok ? "PASS" : `FAIL (area=${p2Prec6.fmt.area})`);

// 5. INPUT VALIDATION - NO SILENT CLAMPING (P2)
console.log("\n--- 5. RIGHT TRIANGLE INPUT VALIDATION (NO SILENT CLAMPING) ---");
const rtBlank = solveRightTriangle(0, 5);
const rtNeg = solveRightTriangle(-3, 4);
const rtValid = solveRightTriangle(3, 4);
const rtValidVal = !rtBlank.success && !rtNeg.success && rtValid.success;
console.log("Zero input rejected:", !rtBlank.success ? "PASS" : "FAIL");
console.log("Negative input rejected:", !rtNeg.success ? "PASS" : "FAIL");
console.log("Positive valid accepted:", rtValid.success ? "PASS" : "FAIL");

// 6. RANDOMIZED REGRESSION SUITE: 5,000 VALID + 1,200 INVALID
console.log("\n--- 6. RANDOMIZED REGRESSION SUITE ---");
let validPassed = 0;
let validFailed = 0;
for (let i = 0; i < 5000; i++) {
  const a = 0.5 + Math.random() * 99;
  const b = 0.5 + Math.random() * 99;
  const minC = Math.abs(a - b) + 0.05;
  const maxC = a + b - 0.05;
  if (minC >= maxC) continue;
  const c = minC + Math.random() * (maxC - minC);

  const res = solveUniversalTriangle(a, b, c, undefined, undefined, undefined, 6);
  if (!res.success || res.solutions.length === 0) {
    validFailed++;
    continue;
  }
  const s = res.solutions[0];
  const angleSum = s.A_deg + s.B_deg + s.C_deg;
  const angleSumOk = Math.abs(angleSum - 180.0) < 0.01;

  const areaHeron = s.area;
  const areaHa = 0.5 * s.a * s.ha;
  const areaHb = 0.5 * s.b * s.hb;
  const areaHc = 0.5 * s.c * s.hc;

  const haOk = Math.abs(areaHeron - areaHa) / Math.max(1, areaHeron) < 0.001;
  const hbOk = Math.abs(areaHeron - areaHb) / Math.max(1, areaHeron) < 0.001;
  const hcOk = Math.abs(areaHeron - areaHc) / Math.max(1, areaHeron) < 0.001;

  const rOk = Math.abs(s.inradius * s.semiPerimeter - areaHeron) / Math.max(1, areaHeron) < 0.001;
  const Rok = Math.abs((s.a * s.b * s.c) / (4 * s.circumradius) - areaHeron) / Math.max(1, areaHeron) < 0.001;

  if (angleSumOk && haOk && hbOk && hcOk && rOk && Rok) {
    validPassed++;
  } else {
    validFailed++;
  }
}
console.log(`5,000 Valid Triangles Property Test: ${validPassed} PASSED, ${validFailed} FAILED.`);

let invalidPassed = 0;
let invalidFailed = 0;
for (let i = 0; i < 1200; i++) {
  const caseType = i % 3;
  let res;
  if (caseType === 0) {
    // Degenerate / Impossible triangle inequality (a + b <= c)
    const a = 2 + Math.random() * 10;
    const b = 2 + Math.random() * 10;
    const c = a + b + Math.random() * 5; // violation
    res = solveUniversalTriangle(a, b, c);
  } else if (caseType === 1) {
    // Non-positive sides
    const a = -(1 + Math.random() * 10);
    const b = 5;
    const c = 5;
    res = solveUniversalTriangle(a, b, c);
  } else {
    // Angle sum >= 180
    const A = 100 + Math.random() * 50;
    const B = 90 + Math.random() * 20;
    res = solveUniversalTriangle(5, undefined, undefined, A, B, undefined);
  }

  if (!res.success) {
    invalidPassed++;
  } else {
    invalidFailed++;
  }
}
console.log(`1,200 Invalid Cases Rejection Test: ${invalidPassed} REJECTED (CORRECT), ${invalidFailed} ERRONEOUSLY PASSED.`);

console.log("\n=================================================");
console.log("ALL TESTS FINISHED");
console.log("=================================================");
