import {
  computeCoreCircle,
  computeSector,
  computeSegment,
  computeAnnulus,
  computeCircleEquation,
  computeThreePointCircle,
  convertCircleUnits
} from "../src/app/calculators/circle-calculator/circle-logic";

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;
let maxAbsError = 0;
let maxRelError = 0;

function assert(condition: boolean, message: string) {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
  } else {
    failedAssertions++;
    console.error(`FAIL: ${message}`);
  }
}

function assertClose(actual: number, expected: number, tol: number, label: string) {
  totalAssertions++;
  const diff = Math.abs(actual - expected);
  const relDiff = expected !== 0 ? diff / Math.abs(expected) : diff;
  if (diff > maxAbsError) maxAbsError = diff;
  if (relDiff > maxRelError) maxRelError = relDiff;

  if (diff <= tol) {
    passedAssertions++;
  } else {
    failedAssertions++;
    console.error(`FAIL: ${label} | Expected ${expected}, got ${actual} (diff: ${diff}, tol: ${tol})`);
  }
}

console.log("=== STARTING CIRCLE CALCULATOR MATHEMATICAL AUDIT ===");

// 1. GOLDEN CASE: Core Bidirectional Circle Solver (r = 5)
console.log("\n--- Test 1: Core Circle Solver Bidirectional ---");
// A. Radius = 5
const c_r = computeCoreCircle("r", 5, 4);
assert(c_r.isValid, "Core r=5 should be valid");
assertClose(c_r.radius, 5, 1e-4, "r=5 -> radius");
assertClose(c_r.diameter, 10, 1e-4, "r=5 -> diameter");
assertClose(c_r.circumference, 10 * Math.PI, 1e-3, "r=5 -> circumference");
assertClose(c_r.area, 25 * Math.PI, 1e-3, "r=5 -> area");
assert(c_r.exactAreaPi === "25π", `r=5 exactAreaPi expected 25π, got ${c_r.exactAreaPi}`);
assert(c_r.exactCircumferencePi === "10π", `r=5 exactCircumferencePi expected 10π, got ${c_r.exactCircumferencePi}`);

// B. Diameter = 10
const c_d = computeCoreCircle("d", 10, 4);
assert(c_d.isValid, "Core d=10 should be valid");
assertClose(c_d.radius, 5, 1e-4, "d=10 -> radius");
assertClose(c_d.circumference, 10 * Math.PI, 1e-3, "d=10 -> circumference");
assertClose(c_d.area, 25 * Math.PI, 1e-3, "d=10 -> area");

// C. Circumference = 10π ≈ 31.4159265
const c_c = computeCoreCircle("c", 10 * Math.PI, 4);
assert(c_c.isValid, "Core C=10π should be valid");
assertClose(c_c.radius, 5, 1e-3, "C=10π -> radius");
assertClose(c_c.diameter, 10, 1e-3, "C=10π -> diameter");
assertClose(c_c.area, 25 * Math.PI, 1e-2, "C=10π -> area");

// D. Area = 25π ≈ 78.5398163
const c_a = computeCoreCircle("a", 25 * Math.PI, 4);
assert(c_a.isValid, "Core A=25π should be valid");
assertClose(c_a.radius, 5, 1e-3, "A=25π -> radius");
assertClose(c_a.diameter, 10, 1e-3, "A=25π -> diameter");
assertClose(c_a.circumference, 10 * Math.PI, 1e-2, "A=25π -> circumference");

// Invalid inputs: 0, negative, NaN
assert(!computeCoreCircle("r", 0).isValid, "r=0 must be invalid");
assert(!computeCoreCircle("r", -5).isValid, "r=-5 must be invalid");
assert(!computeCoreCircle("r", NaN).isValid, "r=NaN must be invalid");

// 2. GOLDEN CASE: Sector & Arc Length (r = 6, θ = 60°)
console.log("\n--- Test 2: Sector & Arc Length Solver ---");
const sec = computeSector(6, 60, "deg", 4);
assert(sec.isValid, "Sector r=6, θ=60° should be valid");
assertClose(sec.arcLength, 2 * Math.PI, 1e-3, "Sector arc length (expected 2π ≈ 6.2832)");
assertClose(sec.sectorArea, 6 * Math.PI, 1e-3, "Sector area (expected 6π ≈ 18.8496)");
assertClose(sec.sectorPerimeter, 12 + 2 * Math.PI, 1e-3, "Sector perimeter (expected 12 + 2π ≈ 18.2832)");

// Sector with θ = 360° should equal full circle
const sec360 = computeSector(5, 360, "deg", 4);
assertClose(sec360.arcLength, 10 * Math.PI, 1e-3, "Sector θ=360° arc length == circle circumference");
assertClose(sec360.sectorArea, 25 * Math.PI, 1e-3, "Sector θ=360° area == circle area");

// Sector angle domain validation
assert(!computeSector(6, -10, "deg").isValid, "Sector θ=-10° must be invalid");
assert(!computeSector(6, 361, "deg").isValid, "Sector θ=361° must be invalid");
assert(!computeSector(-5, 60, "deg").isValid, "Sector r=-5 must be invalid");

// 3. GOLDEN CASE: Segment / Chord / Sagitta (r = 10, c = 12)
console.log("\n--- Test 3: Segment / Chord / Sagitta Solver ---");
const seg = computeSegment(10, 12, "chord", 4);
assert(seg.isValid, "Segment r=10, c=12 should be valid");
assertClose(seg.sagitta, 2.0, 1e-4, "Segment sagitta (expected 2)");
assertClose(seg.centralAngleDeg, 73.7398, 1e-3, "Segment central angle deg ≈ 73.7398°");
assertClose(seg.segmentArea, 16.3501, 1e-3, "Segment area ≈ 16.3501");

// Boundary: c = 2r (diameter case)
const segDiam = computeSegment(10, 20, "chord", 4);
assert(segDiam.isValid, "Segment c=2r should be valid (semicircle)");
assertClose(segDiam.sagitta, 10, 1e-4, "c=2r sagitta should equal radius (10)");
assertClose(segDiam.centralAngleDeg, 180, 1e-4, "c=2r central angle should equal 180°");
assertClose(segDiam.segmentArea, 0.5 * Math.PI * 100, 1e-2, "c=2r area should equal semicircle (50π)");

// Boundary: c > 2r MUST BE REJECTED
const segImpossible = computeSegment(10, 25, "chord", 4);
assert(!segImpossible.isValid, "Segment c=25 > 2r=20 MUST be rejected as impossible geometry");

// Boundary: negative c or negative r
assert(!computeSegment(10, -5, "chord").isValid, "Negative chord must be invalid");
assert(!computeSegment(-10, 12, "chord").isValid, "Negative radius must be invalid");

// 4. GOLDEN CASE: Annulus & Circular Ring (R = 10, r = 6)
console.log("\n--- Test 4: Annulus Solver ---");
const ann = computeAnnulus(10, 6, 4);
assert(ann.isValid, "Annulus R=10, r=6 should be valid");
assertClose(ann.annulusArea, 64 * Math.PI, 1e-3, "Annulus area (expected 64π ≈ 201.0619)");
assertClose(ann.wallThickness, 4.0, 1e-4, "Annulus wall thickness (expected 4)");
assertClose(ann.avgRadius, 8.0, 1e-4, "Annulus average radius (expected 8)");

// Inverted radii R <= r MUST BE REJECTED
const annInverted = computeAnnulus(6, 10, 4);
assert(!annInverted.isValid, "Annulus R=6, r=10 (R < r) MUST be rejected");
const annEqual = computeAnnulus(10, 10, 4);
assert(!annEqual.isValid, "Annulus R=10, r=10 (R == r) MUST be rejected");

// 5. GOLDEN CASE: Circle Equation (center (2, -3), r = 5)
console.log("\n--- Test 5: Circle Equation Solver ---");
const eq = computeCircleEquation(2, -3, 5, 4);
assert(eq.isValid, "Circle equation should be valid");
assert(eq.standardForm === "(x - 2)² + (y + 3)² = 25", `Standard form mismatch: got "${eq.standardForm}"`);
assert(eq.generalForm === "x² + y² - 4x + 6y - 12 = 0", `General form mismatch: got "${eq.generalForm}"`);

// Test center at origin (0, 0)
const eqOrigin = computeCircleEquation(0, 0, 5, 4);
assert(eqOrigin.standardForm === "x² + y² = 25", `Origin standard form mismatch: got "${eqOrigin.standardForm}"`);
assert(eqOrigin.generalForm === "x² + y² - 25 = 0", `Origin general form mismatch: got "${eqOrigin.generalForm}"`);

// 6. GOLDEN CASE: 3-Point Circumcircle ((0,0), (4,0), (0,3))
console.log("\n--- Test 6: 3-Point Circumcircle Solver ---");
const p3 = computeThreePointCircle(0, 0, 4, 0, 0, 3, 4);
assert(p3.isValid, "3-point circumcircle should be valid");
assertClose(p3.center.h, 2.0, 1e-4, "Circumcenter h should be 2");
assertClose(p3.center.k, 1.5, 1e-4, "Circumcenter k should be 1.5");
assertClose(p3.radius, 2.5, 1e-4, "Circumradius should be 2.5");
assertClose(p3.area, Math.PI * 6.25, 1e-3, "Circumcircle area should be 6.25π ≈ 19.635");
assertClose(p3.circumference, 2 * Math.PI * 2.5, 1e-3, "Circumcircle circumference should be 5π ≈ 15.708");

// Verify all 3 points lie on the circle
const d1 = Math.sqrt((0 - p3.center.h) ** 2 + (0 - p3.center.k) ** 2);
const d2 = Math.sqrt((4 - p3.center.h) ** 2 + (0 - p3.center.k) ** 2);
const d3 = Math.sqrt((0 - p3.center.h) ** 2 + (3 - p3.center.k) ** 2);
assertClose(d1, p3.radius, 1e-4, "Distance P1 to center must equal R");
assertClose(d2, p3.radius, 1e-4, "Distance P2 to center must equal R");
assertClose(d3, p3.radius, 1e-4, "Distance P3 to center must equal R");

// Collinear points test
const pCollinear = computeThreePointCircle(0, 0, 1, 1, 2, 2, 4);
assert(!pCollinear.isValid && pCollinear.isCollinear, "Collinear points must be rejected");

// Duplicate points test
const pDup = computeThreePointCircle(0, 0, 0, 0, 1, 2, 4);
assert(!pDup.isValid && pDup.isCollinear, "Duplicate points must be rejected");

// 7. GOLDEN CASE: Unit Converter (radius = 1 meter)
console.log("\n--- Test 7: Unit Converter Matrix ---");
const conv = convertCircleUnits(1, "meters", 4);
assertClose(conv.meters.r, 1, 1e-4, "1 m -> r in meters");
assertClose(conv.meters.d, 2, 1e-4, "1 m -> d in meters");
assertClose(conv.meters.c, 2 * Math.PI, 1e-3, "1 m -> C in meters ≈ 6.2832");
assertClose(conv.meters.a, Math.PI, 1e-3, "1 m -> A in meters ≈ 3.1416");

assertClose(conv.cm.r, 100, 1e-2, "1 m -> r in cm = 100");
assertClose(conv.cm.d, 200, 1e-2, "1 m -> d in cm = 200");
assertClose(conv.cm.c, 200 * Math.PI, 1e-1, "1 m -> C in cm ≈ 628.3185");
assertClose(conv.cm.a, 10000 * Math.PI, 1e0, "1 m -> A in cm² = 10000π ≈ 31415.9265");

// Check consistency within inches row: A must equal π * r²
assertClose(conv.inches.a, Math.PI * conv.inches.r * conv.inches.r, 1e-1, "Inches row internal area consistency");

// 8. RANDOMIZED STRESS TESTING (1,500 Trials)
console.log("\n--- Test 8: Randomized Property-Based Testing (1,500 trials) ---");
let randTrials = 0;

// Category A: 300 Core Circle Inversions
for (let i = 0; i < 300; i++) {
  const r = 0.01 + Math.random() * 500;
  const resR = computeCoreCircle("r", r, 6);
  assertClose(resR.diameter, 2 * r, 1e-4, `Rand Core r=${r} diameter`);
  assertClose(resR.circumference, 2 * Math.PI * r, 1e-4, `Rand Core r=${r} circumference`);
  assertClose(resR.area, Math.PI * r * r, 1e-3, `Rand Core r=${r} area`);

  // Invert from Area
  const resA = computeCoreCircle("a", Math.PI * r * r, 6);
  assertClose(resA.radius, r, 1e-3, `Rand Core invert area to radius r=${r}`);
  randTrials++;
}

// Category B: 300 Sector Calculations
for (let i = 0; i < 300; i++) {
  const r = 0.1 + Math.random() * 200;
  const deg = Math.random() * 360;
  const s = computeSector(r, deg, "deg", 6);
  const expectedL = (deg / 360) * 2 * Math.PI * r;
  const expectedA = (deg / 360) * Math.PI * r * r;
  assertClose(s.arcLength, expectedL, 1e-4, `Rand Sector r=${r} deg=${deg} arc`);
  assertClose(s.sectorArea, expectedA, 1e-3, `Rand Sector r=${r} deg=${deg} area`);
  randTrials++;
}

// Category C: 300 Segment Calculations
for (let i = 0; i < 300; i++) {
  const r = 1 + Math.random() * 100;
  const c = Math.random() * (1.98 * r); // strictly valid chord
  const s = computeSegment(r, c, "chord", 6);
  const theta = 2 * Math.asin(c / (2 * r));
  const expectedH = r - Math.sqrt(r * r - (c / 2) ** 2);
  const expectedArea = 0.5 * r * r * (theta - Math.sin(theta));
  assertClose(s.sagitta, expectedH, 1e-4, `Rand Segment r=${r} c=${c} sagitta`);
  assertClose(s.segmentArea, expectedArea, 1e-3, `Rand Segment r=${r} c=${c} area`);
  randTrials++;
}

// Category D: 300 Annulus Calculations
for (let i = 0; i < 300; i++) {
  const r = 0.1 + Math.random() * 50;
  const t = 0.1 + Math.random() * 50;
  const R = r + t;
  const a = computeAnnulus(R, r, 6);
  const expectedArea = Math.PI * (R * R - r * r);
  assertClose(a.annulusArea, expectedArea, 1e-3, `Rand Annulus R=${R} r=${r} area`);
  assertClose(a.wallThickness, t, 1e-4, `Rand Annulus R=${R} r=${r} thickness`);
  randTrials++;
}

// Category E: 300 3-Point Circumcircle Calculations
for (let i = 0; i < 300; i++) {
  // Generate a random center and radius, pick 3 random angles
  const h = (Math.random() - 0.5) * 100;
  const k = (Math.random() - 0.5) * 100;
  const r = 1 + Math.random() * 50;
  const a1 = Math.random() * 2 * Math.PI;
  const a2 = a1 + 0.5 + Math.random() * 1.5;
  const a3 = a2 + 0.5 + Math.random() * 1.5;

  const x1 = h + r * Math.cos(a1);
  const y1 = k + r * Math.sin(a1);
  const x2 = h + r * Math.cos(a2);
  const y2 = k + r * Math.sin(a2);
  const x3 = h + r * Math.cos(a3);
  const y3 = k + r * Math.sin(a3);

  const res = computeThreePointCircle(x1, y1, x2, y2, x3, y3, 6);
  assert(res.isValid, `Rand 3-point circle should be valid trial ${i}`);
  assertClose(res.center.h, h, 1e-2, `Rand 3-point center h`);
  assertClose(res.center.k, k, 1e-2, `Rand 3-point center k`);
  assertClose(res.radius, r, 1e-2, `Rand 3-point circumradius`);
  randTrials++;
}

console.log("\n==================================================");
console.log(`TOTAL TEST ASSERTIONS: ${totalAssertions}`);
console.log(`PASSED: ${passedAssertions}`);
console.log(`FAILED: ${failedAssertions}`);
console.log(`MAX ABSOLUTE ERROR: ${maxAbsError.toExponential(4)}`);
console.log(`MAX RELATIVE ERROR: ${maxRelError.toExponential(4)}`);
console.log("==================================================");

if (failedAssertions > 0) {
  process.exit(1);
}
