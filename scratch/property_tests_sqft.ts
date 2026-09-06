import {
  toFeet,
  calculateRectangleArea,
  calculateRectangleBorderArea,
  calculateCircleArea,
  calculateRingArea,
  calculateSectorArea,
  calculateTriangleHeron,
  calculateTriangleBaseHeight,
  calculateTrapezoidArea,
  calculateParallelogramArea,
} from "../src/lib/calculator-engine/formulas/square-footage";

console.log("=== RUNNING PROPERTY AND UNIT-INVARIANCE TESTS ===");

const ITERATIONS = 1000;
const EPSILON = 1e-5;

// 1. RECTANGLE
let rectPass = 0;
for (let i = 0; i < ITERATIONS; i++) {
  const l = Math.random() * 500 + 0.1;
  const w = Math.random() * 500 + 0.1;
  const q = Math.floor(Math.random() * 10) + 1;
  const res = calculateRectangleArea({ length: l, width: w, unit: "feet", quantity: q });
  const expected = l * w * q;
  if (!isNaN(res.squareFeet) && Math.abs(res.squareFeet - expected) / Math.max(expected, 1) < 0.01) {
    rectPass++;
  }
}
console.log(`Rectangle Property Tests: ${rectPass}/${ITERATIONS}`);

// 2. CIRCLE
let circlePass = 0;
for (let i = 0; i < ITERATIONS; i++) {
  const d = Math.random() * 500 + 0.1;
  const q = Math.floor(Math.random() * 10) + 1;
  const res = calculateCircleArea({ diameter: d, unit: "feet", quantity: q });
  const r = d / 2;
  const expected = Math.PI * r * r * q;
  if (!isNaN(res.squareFeet) && Math.abs(res.squareFeet - expected) / Math.max(expected, 1) < 0.01) {
    circlePass++;
  }
}
console.log(`Circle Property Tests: ${circlePass}/${ITERATIONS}`);

// 3. RING
let ringPass = 0;
for (let i = 0; i < ITERATIONS; i++) {
  const outerD = Math.random() * 500 + 10;
  const border = Math.random() * (outerD / 2 - 0.5) + 0.1;
  const q = Math.floor(Math.random() * 10) + 1;
  const res = calculateRingArea({ outerDiameter: outerD, borderWidth: border, unit: "feet", quantity: q });
  const R = outerD / 2;
  const r = R - border;
  const expected = Math.PI * (R * R - r * r) * q;
  if (!isNaN(res.squareFeet) && Math.abs(res.squareFeet - expected) / Math.max(expected, 1) < 0.01) {
    ringPass++;
  }
}
console.log(`Ring Property Tests: ${ringPass}/${ITERATIONS}`);

// 4. TRIANGLE HERON
let triPass = 0;
for (let i = 0; i < ITERATIONS; i++) {
  const a = Math.random() * 100 + 10;
  const b = Math.random() * 100 + 10;
  const c = Math.random() * (a + b - Math.abs(a - b) - 2) + Math.abs(a - b) + 1;
  const res = calculateTriangleHeron({ sideA: a, sideB: b, sideC: c, unit: "feet", quantity: 1 });
  const s = (a + b + c) / 2;
  const expected = Math.sqrt(Math.max(0, s * (s - a) * (s - b) * (s - c)));
  if (!isNaN(res.squareFeet) && Math.abs(res.squareFeet - expected) / Math.max(expected, 1) < 0.01) {
    triPass++;
  }
}
console.log(`Triangle Heron Property Tests: ${triPass}/${ITERATIONS}`);

// 5. TRAPEZOID
let trapPass = 0;
for (let i = 0; i < ITERATIONS; i++) {
  const b1 = Math.random() * 100 + 1;
  const b2 = Math.random() * 100 + 1;
  const h = Math.random() * 100 + 1;
  const q = Math.floor(Math.random() * 10) + 1;
  const res = calculateTrapezoidArea({ base1: b1, base2: b2, height: h, unit: "feet", quantity: q });
  const expected = ((b1 + b2) / 2) * h * q;
  if (!isNaN(res.squareFeet) && Math.abs(res.squareFeet - expected) / Math.max(expected, 1) < 0.01) {
    trapPass++;
  }
}
console.log(`Trapezoid Property Tests: ${trapPass}/${ITERATIONS}`);

// 6. SECTOR
let sectorPass = 0;
for (let i = 0; i < ITERATIONS; i++) {
  const r = Math.random() * 100 + 1;
  const angle = Math.random() * 359 + 1;
  const q = Math.floor(Math.random() * 10) + 1;
  const res = calculateSectorArea({ radius: r, angleDegrees: angle, unit: "feet", quantity: q });
  const expected = (angle / 360) * Math.PI * r * r * q;
  if (!isNaN(res.squareFeet) && Math.abs(res.squareFeet - expected) / Math.max(expected, 1) < 0.01) {
    sectorPass++;
  }
}
console.log(`Sector Property Tests: ${sectorPass}/${ITERATIONS}`);

// 7. PARALLELOGRAM
let paraPass = 0;
for (let i = 0; i < ITERATIONS; i++) {
  const b = Math.random() * 100 + 1;
  const h = Math.random() * 100 + 1;
  const q = Math.floor(Math.random() * 10) + 1;
  const res = calculateParallelogramArea({ base: b, height: h, unit: "feet", quantity: q });
  const expected = b * h * q;
  if (!isNaN(res.squareFeet) && Math.abs(res.squareFeet - expected) / Math.max(expected, 1) < 0.01) {
    paraPass++;
  }
}
console.log(`Parallelogram Property Tests: ${paraPass}/${ITERATIONS}`);

// 8. UNIT-INVARIANCE TEST
console.log("\n--- UNIT INVARIANCE TEST ---");
// 30 ft x 20 ft = 600 ft2
// In inches: 360 in x 240 in = 86,400 in2 -> 600 ft2
// In yards: 10 yd x 6.66667 yd -> 600 ft2
// In meters: 9.144 m x 6.096 m -> ~600 ft2
const rFt = calculateRectangleArea({ length: 30, width: 20, unit: "feet" });
const rIn = calculateRectangleArea({ length: 360, width: 240, unit: "inches" });
const rYd = calculateRectangleArea({ length: 10, width: 20 / 3, unit: "yards" });
const rM = calculateRectangleArea({ length: 30 / 3.28084, width: 20 / 3.28084, unit: "meters" });
const rCm = calculateRectangleArea({ length: 30 * 30.48, width: 20 * 30.48, unit: "centimeters" });

console.log("Feet:", rFt.squareFeet);
console.log("Inches:", rIn.squareFeet);
console.log("Yards:", rYd.squareFeet);
console.log("Meters:", rM.squareFeet);
console.log("Centimeters:", rCm.squareFeet);
