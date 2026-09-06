import {
  calculateRectangleArea,
  calculateRectangleBorderArea,
  calculateCircleArea,
  calculateRingArea,
  calculateTriangleHeron,
  calculateTriangleBaseHeight,
  calculateTrapezoidArea,
  calculateSectorArea,
  calculateParallelogramArea,
} from "../src/lib/calculator-engine/formulas/square-footage";

console.log("=== RUNNING REMEDIATION TESTS ===");

// 1. Golden cases
const rect = calculateRectangleArea({ length: 30, width: 20, unit: "feet", quantity: 1, wastePercent: 0, price: 0, priceUnit: "per_sq_ft" });
console.log("Rectangle 30x20:", rect.squareFeet, "Expected: 600", rect.squareFeet === 600 ? "PASS" : "FAIL");

const circ = calculateCircleArea({ diameter: 30, unit: "feet", quantity: 1, wastePercent: 0, price: 0, priceUnit: "per_sq_ft" });
console.log("Circle d=30:", circ.squareFeet, "Expected: 706.8583", Math.abs(circ.squareFeet - 706.8583) < 0.001 ? "PASS" : "FAIL");
console.log("Circle circumference:", circ.circumferenceFt, "Expected: 94.2478", Math.abs(circ.circumferenceFt - 94.2478) < 0.001 ? "PASS" : "FAIL");

const ring = calculateRingArea({ outerDiameter: 30, borderWidth: 2, unit: "feet", quantity: 1, wastePercent: 0, price: 0, priceUnit: "per_sq_ft" });
console.log("Ring d=30, b=2:", ring.squareFeet, "Expected: 175.9292", Math.abs(ring.squareFeet - 175.9292) < 0.001 ? "PASS" : "FAIL");

const tri = calculateTriangleHeron({ sideA: 30, sideB: 45, sideC: 50, unit: "feet", quantity: 1, wastePercent: 0, price: 0, priceUnit: "per_sq_ft" });
console.log("Triangle 30,45,50:", tri.squareFeet, "Expected: 666.5853", Math.abs(tri.squareFeet - 666.5853) < 0.001 ? "PASS" : "FAIL");

const trap = calculateTrapezoidArea({ base1: 30, base2: 45, height: 20, unit: "feet", quantity: 1, wastePercent: 0, price: 0, priceUnit: "per_sq_ft" });
console.log("Trapezoid 30,45,20:", trap.squareFeet, "Expected: 750", trap.squareFeet === 750 ? "PASS" : "FAIL");

const sector = calculateSectorArea({ radius: 30, angleDegrees: 90, unit: "feet", quantity: 1, wastePercent: 0, price: 0, priceUnit: "per_sq_ft" });
console.log("Sector r=30, a=90:", sector.squareFeet, "Expected: 706.8583", Math.abs(sector.squareFeet - 706.8583) < 0.001 ? "PASS" : "FAIL");
console.log("Sector arc length:", sector.arcLengthFt, "Expected: 47.1239", Math.abs(sector.arcLengthFt - 47.1239) < 0.001 ? "PASS" : "FAIL");

const para = calculateParallelogramArea({ base: 30, height: 20, unit: "feet", quantity: 1, wastePercent: 0, price: 0, priceUnit: "per_sq_ft" });
console.log("Parallelogram 30x20:", para.squareFeet, "Expected: 600", para.squareFeet === 600 ? "PASS" : "FAIL");

// 2. Exact test cases for Invalid Geometry:
console.log("\n=== INVALID GEOMETRY TEST CASES ===");

// Border: L=30 ft, W=20 ft, border=15 ft => INVALID
const borderInvalid1 = calculateRectangleBorderArea({ outerLength: 30, outerWidth: 20, borderWidth: 15, unit: "feet", quantity: 1, wastePercent: 0, price: 0, priceUnit: "per_sq_ft" });
console.log("Border L=30, W=20, b=15:", borderInvalid1.isValid === false ? "PASS (INVALID)" : "FAIL", borderInvalid1.error);

// Border: L=30 ft, W=20 ft, border=10 ft => INVALID because inner width becomes 0
const borderInvalid2 = calculateRectangleBorderArea({ outerLength: 30, outerWidth: 20, borderWidth: 10, unit: "feet", quantity: 1, wastePercent: 0, price: 0, priceUnit: "per_sq_ft" });
console.log("Border L=30, W=20, b=10:", borderInvalid2.isValid === false ? "PASS (INVALID)" : "FAIL", borderInvalid2.error);

// Ring: outer diameter=20 ft, border=12 ft => INVALID
const ringInvalid1 = calculateRingArea({ outerDiameter: 20, borderWidth: 12, unit: "feet", quantity: 1, wastePercent: 0, price: 0, priceUnit: "per_sq_ft" });
console.log("Ring D=20, b=12:", ringInvalid1.isValid === false ? "PASS (INVALID)" : "FAIL", ringInvalid1.error);

// Ring: outer diameter=20 ft, border=10 ft => INVALID because inner radius becomes 0
const ringInvalid2 = calculateRingArea({ outerDiameter: 20, borderWidth: 10, unit: "feet", quantity: 1, wastePercent: 0, price: 0, priceUnit: "per_sq_ft" });
console.log("Ring D=20, b=10:", ringInvalid2.isValid === false ? "PASS (INVALID)" : "FAIL", ringInvalid2.error);

// Sector: angle=-1 => INVALID
const sectorInvalid1 = calculateSectorArea({ radius: 30, angleDegrees: -1, unit: "feet", quantity: 1, wastePercent: 0, price: 0, priceUnit: "per_sq_ft" });
console.log("Sector angle=-1:", sectorInvalid1.isValid === false ? "PASS (INVALID)" : "FAIL", sectorInvalid1.error);

// Sector: angle=400 => INVALID
const sectorInvalid2 = calculateSectorArea({ radius: 30, angleDegrees: 400, unit: "feet", quantity: 1, wastePercent: 0, price: 0, priceUnit: "per_sq_ft" });
console.log("Sector angle=400:", sectorInvalid2.isValid === false ? "PASS (INVALID)" : "FAIL", sectorInvalid2.error);

// Sector: angle=360 => VALID
const sectorValid360 = calculateSectorArea({ radius: 30, angleDegrees: 360, unit: "feet", quantity: 1, wastePercent: 0, price: 0, priceUnit: "per_sq_ft" });
console.log("Sector angle=360:", sectorValid360.isValid === true ? "PASS (VALID)" : "FAIL", "sqFt:", sectorValid360.squareFeet);
