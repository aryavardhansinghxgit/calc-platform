/**
 * Master Production QA + Mathematical Audit Test Suite
 * Pythagorean Theorem Calculator & Right Triangle Suite
 */

import {
  computePythagoreanCore,
  computeSideAngle,
  compute3DPythagorean,
  computeEuclidTriple,
  convertPythagoreanUnits,
  PythagoreanLengthUnit
} from "../src/app/calculators/pythagorean-theorem-calculator/pythagorean-logic";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures: string[] = [];

function assert(condition: boolean, testName: string, details?: string) {
  totalTests++;
  if (condition) {
    passedTests++;
  } else {
    failedTests++;
    const msg = `FAIL: ${testName}${details ? " - " + details : ""}`;
    failures.push(msg);
    console.error(msg);
  }
}

function approxEq(a: number, b: number, tol = 1e-4): boolean {
  return Math.abs(a - b) <= tol || (Math.abs(a - b) / Math.max(Math.abs(a), Math.abs(b), 1)) <= tol;
}

console.log("==================================================");
console.log("1. AUDITING CORE PYTHAGOREAN THEOREM GOLDEN CASES");
console.log("==================================================");

// TEST A: a = 3, b = 4 -> c = 5, area = 6, perimeter = 12, altitude = 2.4
{
  const res = computePythagoreanCore(3, 4, undefined, 4);
  assert(res.isValid, "TEST A: isValid");
  assert(res.c === 5, "TEST A: c = 5", `got ${res.c}`);
  assert(res.area === 6, "TEST A: area = 6", `got ${res.area}`);
  assert(res.perimeter === 12, "TEST A: perimeter = 12", `got ${res.perimeter}`);
  assert(res.altitudeHc === 2.4, "TEST A: altitude = 2.4", `got ${res.altitudeHc}`);
  assert(res.isTriple === true, "TEST A: isTriple = true");
  assert(res.isPrimitiveTriple === true, "TEST A: isPrimitiveTriple = true");
}

// TEST B: Given a = 5, b = 12 -> c = 13
{
  const res = computePythagoreanCore(5, 12, undefined, 4);
  assert(res.isValid, "TEST B: isValid");
  assert(res.c === 13, "TEST B: c = 13", `got ${res.c}`);
  assert(res.area === 30, "TEST B: area = 30", `got ${res.area}`);
  assert(res.perimeter === 30, "TEST B: perimeter = 30", `got ${res.perimeter}`);
}

// TEST C: Given a = 5, c = 13 -> b = 12
{
  const res = computePythagoreanCore(5, undefined, 13, 4);
  assert(res.isValid, "TEST C: isValid");
  assert(res.b === 12, "TEST C: b = 12", `got ${res.b}`);
}

// TEST D: Given b = 12, c = 13 -> a = 5
{
  const res = computePythagoreanCore(undefined, 12, 13, 4);
  assert(res.isValid, "TEST D: isValid");
  assert(res.a === 5, "TEST D: a = 5", `got ${res.a}`);
}

// TEST E: 5-12-13 preset
{
  const res = computePythagoreanCore(5, 12, undefined, 4);
  assert(res.c === 13 && res.isPrimitiveTriple, "TEST E: 5-12-13 preset");
}

// TEST F: 8-15-17 preset
{
  const res = computePythagoreanCore(8, 15, undefined, 4);
  assert(res.c === 17, "TEST F: 8-15-17 c = 17", `got ${res.c}`);
}

// TEST G: 7-24-25 preset
{
  const res = computePythagoreanCore(7, 24, undefined, 4);
  assert(res.c === 25, "TEST G: 7-24-25 c = 25", `got ${res.c}`);
}

// TEST H: fractional/decimal values: a = 3.5, b = 4.2
{
  const res = computePythagoreanCore(3.5, 4.2, undefined, 4);
  const expectedC = Math.sqrt(3.5 * 3.5 + 4.2 * 4.2); // ~5.46717477
  assert(approxEq(res.c, expectedC), "TEST H: fractional c", `expected ${expectedC}, got ${res.c}`);
}

// TEST I: irrational result: a = 1, b = 1 -> c = sqrt(2)
{
  const res = computePythagoreanCore(1, 1, undefined, 4);
  assert(res.exactRadicalC === "√2", "TEST I: exact radical √2", `got ${res.exactRadicalC}`);
  assert(approxEq(res.c, Math.SQRT2), "TEST I: decimal sqrt(2)", `got ${res.c}`);
}

// TEST J: integer result: a = 6, b = 8 -> c = 10
{
  const res = computePythagoreanCore(6, 8, undefined, 4);
  assert(res.c === 10, "TEST J: 6-8-10 c = 10", `got ${res.c}`);
  assert(res.isTriple === true, "TEST J: isTriple");
  assert(res.isPrimitiveTriple === false, "TEST J: isPrimitiveTriple is false (gcd=2)");
}

console.log("==================================================");
console.log("2. AUDITING CRITICAL VALIDATION & INCONSISTENCY");
console.log("==================================================");

// Zero inputs
{
  const res1 = computePythagoreanCore(0, 4, undefined, 4);
  assert(!res1.isValid, "Validation: a = 0 rejected");
  const res2 = computePythagoreanCore(4, 0, undefined, 4);
  assert(!res2.isValid, "Validation: b = 0 rejected");
}

// Negative inputs
{
  const res = computePythagoreanCore(-3, 4, undefined, 4);
  assert(!res.isValid, "Validation: negative leg rejected");
}

// Inconsistent three values: a = 3, b = 4, c = 6
{
  const res = computePythagoreanCore(3, 4, 6, 4);
  assert(!res.isValid, "Validation: inconsistent 3 sides a=3, b=4, c=6 rejected");
  assert(Boolean(res.error?.includes("Inconsistent right triangle")), "Validation: descriptive error message for inconsistent 3 sides");
}

// Consistent three values: a = 3, b = 4, c = 5
{
  const res = computePythagoreanCore(3, 4, 5, 4);
  assert(res.isValid, "Validation: consistent 3 sides a=3, b=4, c=5 accepted");
  assert(res.solvedSide === "verified", "Validation: marked as verified");
}

// Hypotenuse less than leg
{
  const res = computePythagoreanCore(5, undefined, 4, 4);
  assert(!res.isValid, "Validation: c <= a rejected");
}

console.log("==================================================");
console.log("3. AUDITING RIGHT TRIANGLE SIDE + ANGLE SOLVER");
console.log("==================================================");

// CASE R1: Known hypotenuse c = 5, acute angle = 30°
// opp leg = 2.5, adj leg = 4.330127...
{
  const res = computeSideAngle("c", 5, 30, 6);
  assert(res.isValid, "CASE R1: isValid");
  assert(approxEq(res.a, 2.5), "CASE R1: opp leg a = 2.5", `got ${res.a}`);
  assert(approxEq(res.b, 4.330127), "CASE R1: adj leg b = 4.330127", `got ${res.b}`);
}

// CASE R2: Known hypotenuse c = 10, acute angle = 30°
// legs = 5 and 8.660254...
{
  const res = computeSideAngle("c", 10, 30, 6);
  assert(res.isValid, "CASE R2: isValid");
  assert(approxEq(res.a, 5.0), "CASE R2: leg a = 5", `got ${res.a}`);
  assert(approxEq(res.b, 8.660254), "CASE R2: leg b = 8.660254", `got ${res.b}`);
}

// CASE R3: Known hypotenuse c = 10, acute angle = 45°
// both legs = 7.07106781...
{
  const res = computeSideAngle("c", 10, 45, 6);
  assert(res.isValid, "CASE R3: isValid");
  assert(approxEq(res.a, 7.071068), "CASE R3: leg a = 7.071068", `got ${res.a}`);
  assert(approxEq(res.b, 7.071068), "CASE R3: leg b = 7.071068", `got ${res.b}`);
}

// CASE R4: Known leg corresponding to OPPOSITE side of θ:
// side = 5, θ = 30° -> Expected hypotenuse = 10, Expected adj leg = 8.660254...
{
  const res = computeSideAngle("a", 5, 30, 6);
  assert(res.isValid, "CASE R4: isValid");
  assert(approxEq(res.c, 10), "CASE R4: hypotenuse c = 10", `got ${res.c}`);
  assert(approxEq(res.b, 8.660254), "CASE R4: adj leg b = 8.660254", `got ${res.b}`);
}

// CASE R5: Known leg corresponding to ADJACENT side of θ:
// side = 5, θ = 30° -> Expected opp leg = 2.886751..., hypotenuse = 5.773503...
{
  const res = computeSideAngle("b", 5, 30, 6);
  assert(res.isValid, "CASE R5: isValid");
  assert(approxEq(res.a, 2.886751), "CASE R5: opp leg a = 2.886751", `got ${res.a}`);
  assert(approxEq(res.c, 5.773503), "CASE R5: hypotenuse c = 5.773503", `got ${res.c}`);
}

// CASE R6: θ = 90° must be rejected
{
  const res = computeSideAngle("c", 10, 90, 4);
  assert(!res.isValid, "CASE R6: θ = 90° rejected");
}

// CASE R7: θ = 0° must be rejected
{
  const res = computeSideAngle("c", 10, 0, 4);
  assert(!res.isValid, "CASE R7: θ = 0° rejected");
}

// CRITICAL SCREENSHOT REGRESSION TEST:
// Known Side = Leg a, Side Length = 5, Acute Angle = 30° -> MUST NOT DISPLAY 3, 4, 5!
{
  const res = computeSideAngle("a", 5, 30, 4);
  assert(res.a === 5, "Screenshot regression: a = 5");
  assert(res.c === 10, "Screenshot regression: c = 10 (NOT 5!)");
  assert(approxEq(res.b, 8.6603), "Screenshot regression: b = 8.6603 (NOT 4!)");
}

console.log("==================================================");
console.log("4. AUDITING TRIGONOMETRIC IDENTITIES");
console.log("==================================================");

for (const angle of [30, 45, 60, 37]) {
  const res = computeSideAngle("c", 10, angle, 6);
  const sinExpected = Math.sin((angle * Math.PI) / 180);
  const cosExpected = Math.cos((angle * Math.PI) / 180);
  const tanExpected = Math.tan((angle * Math.PI) / 180);

  assert(approxEq(res.a / res.c, sinExpected), `Trig identity: sin(${angle}°) = a/c`);
  assert(approxEq(res.b / res.c, cosExpected), `Trig identity: cos(${angle}°) = b/c`);
  assert(approxEq(res.a / res.b, tanExpected), `Trig identity: tan(${angle}°) = a/b`);
  assert(approxEq(res.a * res.a + res.b * res.b, res.c * res.c), `Trig identity: a² + b² = c² for ${angle}°`);
}

console.log("==================================================");
console.log("5. AUDITING 3D PYTHAGOREAN DISTANCE");
console.log("==================================================");

// CASE D1: x = 3, y = 4, z = 12 -> d = 13
{
  const res = compute3DPythagorean(3, 4, 12, 4);
  assert(res.spaceDiag3D === 13, "CASE D1: 3D distance = 13", `got ${res.spaceDiag3D}`);
  assert(res.baseDiag2D === 5, "CASE D1: 2D base diagonal = 5", `got ${res.baseDiag2D}`);
}

// CASE D2: x = 1, y = 2, z = 2 -> d = 3
{
  const res = compute3DPythagorean(1, 2, 2, 4);
  assert(res.spaceDiag3D === 3, "CASE D2: 3D distance = 3", `got ${res.spaceDiag3D}`);
}

// CASE D3: x = 0, y = 0, z = 5 -> d = 5
{
  const res = compute3DPythagorean(0, 0, 5, 4);
  assert(res.spaceDiag3D === 5, "CASE D3: 3D distance = 5", `got ${res.spaceDiag3D}`);
}

// CASE D4: negative coordinate offsets: x = -3, y = 4, z = 12 -> d = 13
{
  const res = compute3DPythagorean(-3, 4, 12, 4);
  assert(res.spaceDiag3D === 13, "CASE D4: negative offset x=-3 distance = 13", `got ${res.spaceDiag3D}`);
  assert(res.baseDiag2D === 5, "CASE D4: base diagonal = 5", `got ${res.baseDiag2D}`);
}

console.log("==================================================");
console.log("6. AUDITING EUCLID PYTHAGOREAN TRIPLE GENERATOR");
console.log("==================================================");

// m = 2, n = 1 -> 3, 4, 5
{
  const res = computeEuclidTriple(2, 1);
  assert(res.isValid && res.a === 3 && res.b === 4 && res.c === 5, "Euclid: (2,1) -> (3,4,5)");
  assert(res.isPrimitive === true, "Euclid: (2,1) is primitive");
}

// m = 3, n = 2 -> 5, 12, 13
{
  const res = computeEuclidTriple(3, 2);
  assert(res.isValid && res.a === 5 && res.b === 12 && res.c === 13, "Euclid: (3,2) -> (5,12,13)");
  assert(res.isPrimitive === true, "Euclid: (3,2) is primitive");
}

// m = 4, n = 1 -> 15, 8, 17
{
  const res = computeEuclidTriple(4, 1);
  assert(res.isValid && res.a === 15 && res.b === 8 && res.c === 17, "Euclid: (4,1) -> (15,8,17)");
  assert(res.isPrimitive === true, "Euclid: (4,1) is primitive");
}

// m = 5, n = 2 -> 21, 20, 29
{
  const res = computeEuclidTriple(5, 2);
  assert(res.isValid && res.a === 21 && res.b === 20 && res.c === 29, "Euclid: (5,2) -> (21,20,29)");
  assert(res.isPrimitive === true, "Euclid: (5,2) is primitive");
}

// Invalid Euclid cases
assert(!computeEuclidTriple(2, 2).isValid, "Euclid invalid: m = 2, n = 2 rejected");
assert(!computeEuclidTriple(1, 2).isValid, "Euclid invalid: m = 1, n = 2 rejected");
assert(!computeEuclidTriple(0, 1).isValid, "Euclid invalid: m = 0 rejected");
assert(!computeEuclidTriple(-2, 1).isValid, "Euclid invalid: negative integer rejected");
assert(!computeEuclidTriple(2.5, 1).isValid, "Euclid invalid: non-integer decimal rejected");

console.log("==================================================");
console.log("7. AUDITING UNIT CONVERTER MATRIX");
console.log("==================================================");

// 5 meters:
// 5 m = 500 cm = 5000 mm ≈ 16.4042 ft ≈ 196.8504 in ≈ 5.4681 yd
{
  const res = convertPythagoreanUnits(5, "meters", 4);
  assert(res.meters === 5, "Converter: 5m = 5m");
  assert(res.cm === 500, "Converter: 5m = 500cm");
  assert(res.mm === 5000, "Converter: 5m = 5000mm");
  assert(res.feet === 16.4042, "Converter: 5m = 16.4042 ft", `got ${res.feet}`);
  assert(res.inches === 196.8504, "Converter: 5m = 196.8504 in", `got ${res.inches}`);
  assert(res.yards === 5.4681, "Converter: 5m = 5.4681 yd", `got ${res.yards}`);
}

// Reverse round trip tests: 1 ft, 1 in, 1 yd, 1 cm, 1 mm
for (const unit of ["cm", "mm", "feet", "inches", "yards"] as PythagoreanLengthUnit[]) {
  const conv = convertPythagoreanUnits(1, unit, 6);
  const roundTrip = convertPythagoreanUnits(conv.meters, "meters", 6);
  const backVal = (roundTrip as any)[unit];
  assert(approxEq(backVal, 1.0, 1e-4), `Converter roundtrip: 1 ${unit} -> meters -> ${unit} = ${backVal}`);
}

console.log("==================================================");
console.log("8. RANDOMIZED STRESS TESTING (ORACLE VALIDATION)");
console.log("==================================================");

// 5,000 randomized valid right triangles
let randPassed = 0;
let randFailed = 0;
for (let i = 0; i < 5000; i++) {
  const a = Math.random() * 999 + 0.1;
  const b = Math.random() * 999 + 0.1;
  const expectedC = Math.sqrt(a * a + b * b);

  const res = computePythagoreanCore(a, b, undefined, 4);
  if (res.isValid && approxEq(res.c, expectedC, 1e-3)) {
    randPassed++;
  } else {
    randFailed++;
  }
}
assert(randFailed === 0, "5,000 Randomized Valid Triangles", `Passed: ${randPassed}, Failed: ${randFailed}`);

// 1,000 invalid / edge cases
let invalidPassed = 0;
let invalidFailed = 0;
for (let i = 0; i < 1000; i++) {
  const type = i % 5;
  let res;
  if (type === 0) {
    // Negative leg
    res = computePythagoreanCore(-Math.random() * 10 - 0.1, Math.random() * 10 + 1);
  } else if (type === 1) {
    // Zero leg
    res = computePythagoreanCore(0, Math.random() * 10 + 1);
  } else if (type === 2) {
    // Inconsistent 3 sides (a, b, c where c != sqrt(a^2+b^2))
    const a = Math.random() * 10 + 1;
    const b = Math.random() * 10 + 1;
    const c = Math.sqrt(a * a + b * b) + (Math.random() * 5 + 1);
    res = computePythagoreanCore(a, b, c);
  } else if (type === 3) {
    // Hypotenuse less than leg
    const a = Math.random() * 10 + 5;
    const c = a - Math.random() * 3 - 0.1;
    res = computePythagoreanCore(a, undefined, c);
  } else {
    // Side angle invalid angle (>= 90 or <= 0)
    const angle = i % 2 === 0 ? 90 + Math.random() * 50 : -Math.random() * 50;
    res = computeSideAngle("c", 10, angle);
  }

  if (!res.isValid) {
    invalidPassed++;
  } else {
    invalidFailed++;
  }
}
assert(invalidFailed === 0, "1,000 Invalid / Edge Cases", `Passed: ${invalidPassed}, Failed: ${invalidFailed}`);

// 2,000 randomized 3D coordinate triples
let rand3DPassed = 0;
let rand3DFailed = 0;
for (let i = 0; i < 2000; i++) {
  const x = (Math.random() - 0.5) * 200;
  const y = (Math.random() - 0.5) * 200;
  const z = (Math.random() - 0.5) * 200;

  const expectedD = Math.sqrt(x * x + y * y + z * z);
  const expectedBase = Math.sqrt(x * x + y * y);

  const res = compute3DPythagorean(x, y, z, 4);
  if (approxEq(res.spaceDiag3D, expectedD, 1e-3) && approxEq(res.baseDiag2D, expectedBase, 1e-3)) {
    rand3DPassed++;
  } else {
    rand3DFailed++;
  }
}
assert(rand3DFailed === 0, "2,000 Randomized 3D Triples", `Passed: ${rand3DPassed}, Failed: ${rand3DFailed}`);

console.log("==================================================");
console.log(`AUDIT COMPLETE: ${passedTests} PASSED, ${failedTests} FAILED out of ${totalTests} tests`);
console.log("==================================================");

if (failedTests > 0) {
  console.error("FAILURES:");
  failures.forEach(f => console.error(" - " + f));
  process.exit(1);
} else {
  console.log("ALL MATHEMATICAL AND CRITICAL TESTS PASSED 100%!");
  process.exit(0);
}
