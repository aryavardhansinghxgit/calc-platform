import {
  toFeet,
  computeAreaOutputs,
  calculateRectangleArea,
  calculateRectangleBorderArea,
  calculateCircleArea,
  calculateRingArea,
  calculateSectorArea,
  calculateTriangleHeron,
  calculateTriangleBaseHeight,
  calculateTrapezoidArea,
  calculateParallelogramArea,
  calculateMultiRoomArea,
  estimateMaterials,
} from "../src/lib/calculator-engine/formulas/square-footage";

console.log("=== RUNNING MATHEMATICAL AUDIT SCRIPT ===");

// 1. RECTANGLE
const rect = calculateRectangleArea({
  length: 30,
  width: 20,
  unit: "feet",
  quantity: 1,
});
console.log("Rectangle 30x20:", rect.squareFeet, "ft2 (expected 600), perimeter:", rect.perimeterFt, "ft (expected 100)");

const rectQ2 = calculateRectangleArea({
  length: 30,
  width: 20,
  unit: "feet",
  quantity: 2,
});
console.log("Rectangle Q=2:", rectQ2.squareFeet, "ft2 (expected 1200)");

// 2. RECTANGLE BORDER
const border = calculateRectangleBorderArea({
  outerLength: 30,
  outerWidth: 20,
  borderWidth: 2,
  unit: "feet",
  quantity: 1,
});
console.log("Border 30x20, border 2:", border.squareFeet, "ft2 (expected 184), outer:", border.outerAreaSqFt, "inner:", border.innerAreaSqFt);

// Border edge case: Border width = 15 (outer width = 20, 20 - 2*15 = -10)
const borderEdge = calculateRectangleBorderArea({
  outerLength: 30,
  outerWidth: 20,
  borderWidth: 15,
  unit: "feet",
  quantity: 1,
});
console.log("Border edge (15):", borderEdge);

// 3. CIRCLE
const circle = calculateCircleArea({
  diameter: 30,
  unit: "feet",
  quantity: 1,
});
console.log("Circle d=30:", circle.squareFeet, "ft2 (expected ~706.86), circumference:", circle.circumferenceFt, "ft (expected ~94.25)");

// 4. RING / ANNULUS
const ring = calculateRingArea({
  outerDiameter: 30,
  borderWidth: 2,
  unit: "feet",
  quantity: 1,
});
console.log("Ring d=30, border=2:", ring.squareFeet, "ft2 (expected ~175.93), innerDia:", ring.innerDiameterFt, "ft (expected 26)");

// 5. TRIANGLE - BASE/HEIGHT
const triBH = calculateTriangleBaseHeight({
  base: 30,
  height: 20,
  unit: "feet",
  quantity: 1,
});
console.log("Triangle base/height 30, 20:", triBH.squareFeet, "ft2 (expected 300)");

// 6. TRIANGLE - HERON 3 SIDES
const triHeron = calculateTriangleHeron({
  sideA: 30,
  sideB: 45,
  sideC: 50,
  unit: "feet",
  quantity: 1,
});
console.log("Triangle Heron 30, 45, 50:", triHeron.squareFeet, "ft2 (expected 666.59)");

// Invalid Triangles
const triInv1 = calculateTriangleHeron({ sideA: 10, sideB: 20, sideC: 30, unit: "feet" });
const triInv2 = calculateTriangleHeron({ sideA: 1, sideB: 2, sideC: 10, unit: "feet" });
const triInv3 = calculateTriangleHeron({ sideA: 0, sideB: 5, sideC: 6, unit: "feet" });
const triInv4 = calculateTriangleHeron({ sideA: -5, sideB: 5, sideC: 6, unit: "feet" });
console.log("Invalid triangles:", {
  "10,20,30": { valid: triInv1.isValidTriangle, area: triInv1.squareFeet },
  "1,2,10": { valid: triInv2.isValidTriangle, area: triInv2.squareFeet },
  "0,5,6": { valid: triInv3.isValidTriangle, area: triInv3.squareFeet },
  "-5,5,6": { valid: triInv4.isValidTriangle, area: triInv4.squareFeet },
});

// 7. TRAPEZOID
const trap = calculateTrapezoidArea({
  base1: 30,
  base2: 45,
  height: 20,
  unit: "feet",
  quantity: 1,
});
console.log("Trapezoid 30, 45, 20:", trap.squareFeet, "ft2 (expected 750)");

// 8. SECTOR
const sector = calculateSectorArea({
  radius: 30,
  angleDegrees: 90,
  unit: "feet",
  quantity: 1,
});
console.log("Sector r=30, angle=90:", sector.squareFeet, "ft2 (expected ~706.86), arcLength:", sector.arcLengthFt, "ft (expected ~47.12)");

// 9. PARALLELOGRAM
const para = calculateParallelogramArea({
  base: 30,
  height: 20,
  unit: "feet",
  quantity: 1,
});
console.log("Parallelogram b=30, h=20:", para.squareFeet, "ft2 (expected 600)");

// 10. MULTI-ROOM
const multi = calculateMultiRoomArea([
  { id: "1", name: "Room 1", length: 10, width: 12, unit: "feet", quantity: 1 },
  { id: "2", name: "Room 2", length: 12, width: 15, unit: "feet", quantity: 1 },
  { id: "3", name: "Room 3", length: 8, width: 10, unit: "feet", quantity: 1 },
]);
console.log("Multi-room (120 + 180 + 80):", multi.squareFeet, "ft2 (expected 380)");

// 11. MATERIAL ESTIMATOR
const mat600 = estimateMaterials(600);
console.log("Materials for 600 sq ft:", mat600);
