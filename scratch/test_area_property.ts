import {
  computeRectangleArea,
  computeTriangleAreaBaseHeight,
  computeTriangleAreaHeron,
  computeCircleArea,
  computeSectorArea,
  computeEllipseArea,
  computeTrapezoidArea,
  computeParallelogramArea,
  computeRhombusArea,
  computeAnnulusArea,
  computeRegularPolygonArea,
  computeShoelacePolygonArea,
  toSquareMeters,
  convertAreaFromSquareMeters
} from "../src/app/calculators/area-calculator/area-logic";

console.log("=================================================");
console.log("PHASE 19: RANDOMIZED PROPERTY-BASED TESTING");
console.log("=================================================");

let validTotal = 0;
let validPassed = 0;
let validFailed = 0;

let invalidTotal = 0;
let invalidCorrectlyRejected = 0;
let invalidIncorrectlyAccepted = 0;

// 1. RECTANGLES (5,000 cases)
for (let i = 0; i < 5000; i++) {
  validTotal++;
  const l = Math.random() * 1000 + 0.1;
  const w = Math.random() * 1000 + 0.1;
  const expected = l * w;
  const res = computeRectangleArea(l, w, "m", 4);
  const diff = Math.abs(res.area - expected);
  // tolerance for 4 decimal rounding
  if (diff < 0.01 || diff / expected < 0.0001) {
    validPassed++;
  } else {
    validFailed++;
    if (validFailed <= 3) console.error(`Rectangle failed: l=${l}, w=${w}, exp=${expected}, act=${res.area}`);
  }
}

// 2. TRIANGLES BASE & HEIGHT (5,000 cases)
for (let i = 0; i < 5000; i++) {
  validTotal++;
  const b = Math.random() * 1000 + 0.1;
  const h = Math.random() * 1000 + 0.1;
  const expected = 0.5 * b * h;
  const res = computeTriangleAreaBaseHeight(b, h, "m", 4);
  const diff = Math.abs(res.area - expected);
  if (diff < 0.01 || diff / expected < 0.0001) {
    validPassed++;
  } else {
    validFailed++;
    if (validFailed <= 3) console.error(`Triangle BH failed: b=${b}, h=${h}, exp=${expected}, act=${res.area}`);
  }
}

// 3. TRIANGLES HERON (5,000 valid cases)
for (let i = 0; i < 5000; i++) {
  validTotal++;
  // generate valid triangle sides
  const a = Math.random() * 500 + 10;
  const b = Math.random() * 500 + 10;
  // c must satisfy |a-b| < c < a+b
  const minC = Math.abs(a - b) + 1;
  const maxC = a + b - 1;
  const c = minC + Math.random() * (maxC - minC);

  const s = (a + b + c) / 2;
  const expected = Math.sqrt(s * (s - a) * (s - b) * (s - c));
  const res = computeTriangleAreaHeron(a, b, c, "m", 4);
  const diff = Math.abs(res.area - expected);
  if (diff < 0.01 || diff / expected < 0.0001) {
    validPassed++;
  } else {
    validFailed++;
    if (validFailed <= 3) console.error(`Heron failed: a=${a}, b=${b}, c=${c}, exp=${expected}, act=${res.area}`);
  }
}

// 4. CIRCLES (5,000 cases)
for (let i = 0; i < 5000; i++) {
  validTotal++;
  const r = Math.random() * 1000 + 0.1;
  const expected = Math.PI * r * r;
  const res = computeCircleArea(r, "m", 4);
  const diff = Math.abs(res.area - expected);
  if (diff < 0.01 || diff / expected < 0.0001) {
    validPassed++;
  } else {
    validFailed++;
    if (validFailed <= 3) console.error(`Circle failed: r=${r}, exp=${expected}, act=${res.area}`);
  }
}

// 5. CIRCULAR SECTORS (5,000 cases)
for (let i = 0; i < 5000; i++) {
  validTotal++;
  const r = Math.random() * 500 + 0.1;
  const angle = Math.random() * 360;
  const expected = (angle / 360) * Math.PI * r * r;
  const res = computeSectorArea(r, angle, "m", 4);
  const diff = Math.abs(res.area - expected);
  if (diff < 0.01 || diff / expected < 0.0001) {
    validPassed++;
  } else {
    validFailed++;
  }
}

// 6. ANNULI (5,000 valid cases)
for (let i = 0; i < 5000; i++) {
  validTotal++;
  const R = Math.random() * 500 + 10;
  const r = Math.random() * (R - 0.5) + 0.1;
  const expected = Math.PI * (R * R - r * r);
  const res = computeAnnulusArea(R, r, "m", 4);
  const diff = Math.abs(res.area - expected);
  if (diff < 0.01 || diff / expected < 0.0001) {
    validPassed++;
  } else {
    validFailed++;
  }
}

// 7. TRAPEZOIDS (5,000 cases)
for (let i = 0; i < 5000; i++) {
  validTotal++;
  const b1 = Math.random() * 500 + 0.1;
  const b2 = Math.random() * 500 + 0.1;
  const h = Math.random() * 500 + 0.1;
  const expected = 0.5 * (b1 + b2) * h;
  const res = computeTrapezoidArea(b1, b2, h, "m", 4);
  const diff = Math.abs(res.area - expected);
  if (diff < 0.01 || diff / expected < 0.0001) {
    validPassed++;
  } else {
    validFailed++;
  }
}

// 8. REGULAR POLYGONS (5,000 cases)
for (let i = 0; i < 5000; i++) {
  validTotal++;
  const n = Math.floor(Math.random() * 50) + 3; // 3 to 52
  const s = Math.random() * 100 + 0.1;
  const apothem = s / (2 * Math.tan(Math.PI / n));
  const expected = 0.5 * apothem * (n * s);
  const res = computeRegularPolygonArea(n, s, "m", 4);
  const diff = Math.abs(res.area - expected);
  if (diff < 0.01 || diff / expected < 0.0001) {
    validPassed++;
  } else {
    validFailed++;
  }
}

console.log(`Valid Property Tests: Total = ${validTotal}, Passed = ${validPassed}, Failed = ${validFailed}`);

// =========================================================================
// INVALID / DEGENERATE TESTING (1,000+ cases)
// =========================================================================

// Test 1: Impossible triangle inequality (e.g. 1, 2, 10)
for (let i = 0; i < 200; i++) {
  invalidTotal++;
  const a = 1 + Math.random() * 5;
  const b = 1 + Math.random() * 5;
  const c = a + b + 5 + Math.random() * 10; // clearly violates triangle inequality
  const res = computeTriangleAreaHeron(a, b, c, "m", 4);
  // Current implementation returns 0 without error status
  if (res.area === 0) {
    invalidCorrectlyRejected++;
  } else {
    invalidIncorrectlyAccepted++;
  }
}

// Test 2: Annulus where innerRadius >= outerRadius
for (let i = 0; i < 200; i++) {
  invalidTotal++;
  const R = 5 + Math.random() * 10;
  const r = R + 1 + Math.random() * 10; // inner > outer!
  const res = computeAnnulusArea(R, r, "m", 4);
  // Current implementation SILENTLY CLAMPS r to R - 0.0001 and returns a small positive area!
  if (res.area > 0) {
    invalidIncorrectlyAccepted++; // It accepted invalid geometry!
  } else {
    invalidCorrectlyRejected++;
  }
}

// Test 3: Negative dimensions in Rectangle
for (let i = 0; i < 200; i++) {
  invalidTotal++;
  const l = -(Math.random() * 100 + 1);
  const w = Math.random() * 100 + 1;
  const res = computeRectangleArea(l, w, "m", 4);
  // Current implementation clamps l to 0.0001 and computes positive area!
  if (res.area > 0) {
    invalidIncorrectlyAccepted++; // Clamped instead of rejecting!
  } else {
    invalidCorrectlyRejected++;
  }
}

// Test 4: Sector with angle > 360°
for (let i = 0; i < 200; i++) {
  invalidTotal++;
  const r = 10;
  const angle = 450 + Math.random() * 100;
  const res = computeSectorArea(r, angle, "m", 4);
  // Current implementation clamps angle to 360!
  // It returns area for 360° instead of rejecting!
  invalidIncorrectlyAccepted++;
}

// Test 5: Regular polygon with n < 3
for (let i = 0; i < 200; i++) {
  invalidTotal++;
  const n = Math.floor(Math.random() * 3); // 0, 1, or 2
  const s = 10;
  const res = computeRegularPolygonArea(n, s, "m", 4);
  // Current implementation clamps n to 3 and computes area for a triangle!
  if (res.area > 0) {
    invalidIncorrectlyAccepted++;
  } else {
    invalidCorrectlyRejected++;
  }
}

console.log(`Invalid / Degenerate Tests: Total = ${invalidTotal}, Correctly Rejected = ${invalidCorrectlyRejected}, Incorrectly Accepted / Clamped = ${invalidIncorrectlyAccepted}`);
