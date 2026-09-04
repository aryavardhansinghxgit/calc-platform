import {
  computeTwoPointSlope,
  computePointSlopeDistance,
  computeParallelPerpLine,
  computeAngleBetweenLines
} from "../src/app/calculators/slope-calculator/slope-logic";
import { jsPDF } from "jspdf";
import * as fs from "fs";

console.log("=== VERIFYING ALL 10 REQUIRED GOLDEN CASES ===");

// CASE 1: (1,1) -> (4,7)
const c1 = computeTwoPointSlope(1, 1, 4, 7, 4);
console.log("Case 1 (1,1)->(4,7):", {
  dx: c1.deltaX,
  dy: c1.deltaY,
  m: c1.slope,
  mFormatted: c1.slopeFormatted,
  d: c1.distanceFormatted,
  angle: c1.angleDegFormatted,
  eq: c1.slopeInterceptForm
});
if (c1.deltaX !== 3 || c1.deltaY !== 6 || c1.slope !== 2 || c1.slopeInterceptForm !== "y = 2.0000x - 1.0000") {
  throw new Error("Case 1 failed");
}

// CASE 2: Reverse (4,7) -> (1,1)
const c2 = computeTwoPointSlope(4, 7, 1, 1, 4);
console.log("Case 2 Reverse (4,7)->(1,1):", {
  dx: c2.deltaX,
  dy: c2.deltaY,
  m: c2.slope,
  d: c2.distanceFormatted,
  eq: c2.slopeInterceptForm
});
if (c2.slope !== 2 || c2.slopeInterceptForm !== "y = 2.0000x - 1.0000") {
  throw new Error("Case 2 failed");
}

// CASE 3: Negative Slope (2,8) -> (6,0)
const c3 = computeTwoPointSlope(2, 8, 6, 0, 4);
console.log("Case 3 Negative (2,8)->(6,0):", {
  m: c3.slope,
  d: c3.distanceFormatted,
  eq: c3.slopeInterceptForm,
  angle: c3.angleDegFormatted
});
if (c3.slope !== -2 || c3.slopeInterceptForm !== "y = -2.0000x + 12.0000") {
  throw new Error("Case 3 failed");
}

// CASE 4: Horizontal (2,5) -> (10,5)
const c4 = computeTwoPointSlope(2, 5, 10, 5, 4);
console.log("Case 4 Horizontal (2,5)->(10,5):", {
  m: c4.slope,
  d: c4.distanceFormatted,
  angle: c4.angleDegFormatted,
  eq: c4.slopeInterceptForm
});
if (c4.slope !== 0 || c4.angleDeg !== 0 || c4.slopeInterceptForm !== "y = 5.0000") {
  throw new Error("Case 4 failed");
}

// CASE 5: Vertical (3,1) -> (3,9)
const c5 = computeTwoPointSlope(3, 1, 3, 9, 4);
console.log("Case 5 Vertical (3,1)->(3,9):", {
  m: c5.slope,
  mFormatted: c5.slopeFormatted,
  d: c5.distanceFormatted,
  angle: c5.angleDegFormatted,
  eq: c5.slopeInterceptForm
});
if (c5.slope !== null || c5.angleDeg !== 90 || c5.slopeInterceptForm !== "x = 3.0000 (Vertical Line)") {
  throw new Error("Case 5 failed");
}

// CASE 6: Coincident (5,5) -> (5,5)
const c6 = computeTwoPointSlope(5, 5, 5, 5, 4);
console.log("Case 6 Coincident (5,5)->(5,5):", {
  isCoincident: c6.isCoincident,
  slope: c6.slope,
  angleDeg: c6.angleDeg,
  error: c6.errorMessage
});
if (!c6.isCoincident || c6.slope !== null || !c6.errorMessage) {
  throw new Error("Case 6 failed");
}

// CASE 7: Endpoint P=(1,1), d=5, m=0.75
const c7 = computePointSlopeDistance(1, 1, 5, "slope", 0.75, 4);
console.log("Case 7 Endpoint:", {
  p2: `(${c7.x2Formatted}, ${c7.y2Formatted})`,
  p2Opposite: `(${c7.x2OppositeFormatted}, ${c7.y2OppositeFormatted})`
});
if (c7.x2Formatted !== "5.0000" || c7.y2Formatted !== "4.0000") {
  throw new Error("Case 7 failed");
}

// CASE 8: Parallel/Perp m=2, target (3,4)
const c8 = computeParallelPerpLine(2, 3, 4, 4);
console.log("Case 8 Parallel/Perp:", {
  par: c8.parallelEq,
  perp: c8.perpEq,
  perpM: c8.perpSlopeFormatted
});
if (c8.parallelEq !== "y = 2.0000x - 2.0000" || c8.perpEq !== "y = -0.5000x + 5.5000") {
  throw new Error("Case 8 failed");
}

// CASE 9: Horizontal Original m=0, target (3,4)
const c9 = computeParallelPerpLine(0, 3, 4, 4);
console.log("Case 9 Horizontal Original m=0:", {
  par: c9.parallelEq,
  perp: c9.perpEq,
  perpM: c9.perpSlopeFormatted
});
if (c9.parallelEq !== "y = 4.0000" || c9.perpEq !== "x = 3.0000 (Vertical Line)" || c9.perpSlope !== null) {
  throw new Error("Case 9 failed");
}

// Reverse CASE 9: Vertical Original (m=null), target (3,4)
const c9rev = computeParallelPerpLine(null, 3, 4, 4);
console.log("Case 9 Rev Vertical Original m=null:", {
  par: c9rev.parallelEq,
  perp: c9rev.perpEq,
  perpM: c9rev.perpSlopeFormatted
});
if (c9rev.parallelEq !== "x = 3.0000 (Vertical Line)" || c9rev.perpEq !== "y = 4.0000 (Horizontal Line)" || c9rev.perpSlope !== 0) {
  throw new Error("Case 9 Rev failed");
}

// CASE 10: Angle m1=1, m2=-2
const c10 = computeAngleBetweenLines(1, -2, 4);
console.log("Case 10 Angle m1=1, m2=-2:", {
  acute: c10.acuteDegFormatted,
  obtuse: c10.obtuseDegFormatted,
  tanTheta: c10.tanThetaStr
});
if (c10.acuteDegFormatted !== "71.5651" || c10.obtuseDegFormatted !== "108.4349" || c10.tanThetaStr !== "3.0000") {
  throw new Error("Case 10 failed");
}

console.log("\n=== TESTING CSV GENERATION ===");
const timestamp = new Date().toISOString();
const rows = [
  ["Module", "Input Parameters", "Metric / Description", "Formula", "Calculated Value", "Formatted Value", "Equation", "Step / Notes", "Timestamp"],
  ["Two-Point Slope Engine", "P1=(1,1), P2=(4,7)", "Slope (m)", "m = (y2 - y1) / (x2 - x1)", "2", "2.0000", "y = 2.0000x - 1.0000", "Run=3, Rise=6", timestamp],
  ["Two-Point Slope Engine", "P1=(3,1), P2=(3,9)", "Slope (m)", "m = (y2 - y1) / (x2 - x1)", "Undefined", "Undefined (Vertical Line)", "x = 3.0000 (Vertical Line)", "Run=0, Rise=8", timestamp],
  ["Parallel & Perpendicular", "m=0, Point=(3,4)", "Perpendicular Line", "Orthogonal", "null", "Undefined (Vertical Line)", "x = 3.0000 (Vertical Line)", "Horizontal original", timestamp]
];
const csvContent = rows
  .map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(","))
  .join("\r\n");
fs.writeFileSync("scratch/test_slope_export.csv", csvContent);
console.log("CSV generated successfully. Size:", fs.statSync("scratch/test_slope_export.csv").size, "bytes");

console.log("\n=== TESTING PDF GENERATION (jsPDF) ===");
const doc = new jsPDF({ unit: "pt", format: "a4" });
doc.setFont("helvetica", "bold");
doc.setFontSize(18);
doc.text("Slope Calculator & Line Geometry Report", 40, 50);
doc.setFontSize(10);
doc.text("Two-Point Slope Engine: (1,1) to (4,7) -> Slope = 2.0000, Equation: y = 2.0000x - 1.0000", 40, 80);
doc.text("Vertical Line: (3,1) to (3,9) -> Slope = Undefined, Equation: x = 3.0000 (Vertical Line)", 40, 100);
doc.text("Perpendicular to m=0 at (3,4) -> Equation: x = 3.0000 (Vertical Line)", 40, 120);
const pdfBytes = doc.output();
fs.writeFileSync("scratch/test_slope_export.pdf", Buffer.from(pdfBytes, "binary"));
console.log("PDF generated successfully. Size:", fs.statSync("scratch/test_slope_export.pdf").size, "bytes");

console.log("\nALL VERIFICATIONS PASSED WITH 100% MATHEMATICAL PRECISION!");
