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

interface AuditDiscrepancy {
  test: string;
  inputs: any;
  expected: any;
  actual: any;
  severity: "P0" | "P1" | "P2" | "P3";
  rootCause: string;
  fix: string;
}

const discrepancies: AuditDiscrepancy[] = [];

console.log("=================================================");
console.log("STARTING AREA CALCULATOR MATHEMATICAL AUDIT");
console.log("=================================================");

// A. RECTANGLE
{
  const r = computeRectangleArea(10, 5, "m", 4);
  console.log("Rectangle (10, 5):", r.area, "P:", r.perimeter);
  if (r.area !== 50) {
    discrepancies.push({
      test: "Rectangle Area",
      inputs: { l: 10, w: 5 },
      expected: 50,
      actual: r.area,
      severity: "P0",
      rootCause: "Incorrect calculation",
      fix: "Fix formula"
    });
  }
  if (r.perimeter !== 30) {
    discrepancies.push({
      test: "Rectangle Perimeter",
      inputs: { l: 10, w: 5 },
      expected: 30,
      actual: r.perimeter,
      severity: "P1",
      rootCause: "Incorrect perimeter formula",
      fix: "Fix perimeter formula"
    });
  }
  // Check conversions for 50 m²
  const conv = r.rawConversions;
  console.log("50 m² conversions:", conv);
  if (Math.abs(conv.sqFeet - 538.1955) > 0.01) {
    discrepancies.push({
      test: "Rectangle Conversion sqFeet",
      inputs: { areaM2: 50 },
      expected: 538.1955,
      actual: conv.sqFeet,
      severity: "P2",
      rootCause: "Conversion rounding",
      fix: "Use high precision constant"
    });
  }
  if (Math.abs(conv.acres - 0.0124) > 0.001) {
    discrepancies.push({
      test: "Rectangle Conversion acres",
      inputs: { areaM2: 50 },
      expected: 0.0124,
      actual: conv.acres,
      severity: "P2",
      rootCause: "Conversion rounding",
      fix: "Use high precision constant"
    });
  }
}

// B. TRIANGLE BASE & HEIGHT
{
  const r = computeTriangleAreaBaseHeight(10, 6, "m", 4);
  console.log("Triangle (b=10, h=6):", r.area);
  if (r.area !== 30) {
    discrepancies.push({
      test: "Triangle Base Height",
      inputs: { b: 10, h: 6 },
      expected: 30,
      actual: r.area,
      severity: "P0",
      rootCause: "Formula error",
      fix: "Fix formula"
    });
  }
}

// C. TRIANGLE HERON
{
  const r = computeTriangleAreaHeron(7, 8, 9, "m", 4);
  const expectedHeron = Math.sqrt(720); // 26.832815729997478
  console.log("Triangle Heron (7, 8, 9):", r.area, "expected ≈", expectedHeron.toFixed(4));
  if (Math.abs(r.area - 26.8328) > 0.0001) {
    discrepancies.push({
      test: "Triangle Heron Area",
      inputs: { a: 7, b: 8, c: 9 },
      expected: 26.8328,
      actual: r.area,
      severity: "P0",
      rootCause: "Heron formula rounding or calculation discrepancy",
      fix: "Check rounding"
    });
  }

  // Degenerate / invalid triangle
  const invalidT = computeTriangleAreaHeron(1, 2, 4, "m", 4);
  console.log("Invalid Triangle (1, 2, 4) Heron area:", invalidT.area);
  // It returns 0, but does it indicate error?
}

// D. CIRCLE
{
  const r = computeCircleArea(5, "m", 4);
  const expectedArea = parseFloat((25 * Math.PI).toFixed(4)); // 78.5398
  const expectedCirc = parseFloat((10 * Math.PI).toFixed(4)); // 31.4159
  console.log("Circle (r=5):", r.area, "C:", r.circumference);
  if (r.area !== expectedArea) {
    discrepancies.push({
      test: "Circle Area",
      inputs: { r: 5 },
      expected: expectedArea,
      actual: r.area,
      severity: "P0",
      rootCause: "Formula discrepancy",
      fix: "Fix formula"
    });
  }
  if (r.circumference !== expectedCirc) {
    discrepancies.push({
      test: "Circle Circumference",
      inputs: { r: 5 },
      expected: expectedCirc,
      actual: r.circumference,
      severity: "P1",
      rootCause: "Circumference discrepancy",
      fix: "Fix formula"
    });
  }
}

// E. SECTOR
{
  const r = computeSectorArea(10, 90, "m", 4);
  const expectedArea = parseFloat((25 * Math.PI).toFixed(4)); // 78.5398
  const expectedArc = parseFloat((5 * Math.PI).toFixed(4)); // 15.7080
  console.log("Sector (r=10, θ=90°):", r.area, "Arc:", r.arcLength);
  if (r.area !== expectedArea) {
    discrepancies.push({
      test: "Sector Area",
      inputs: { r: 10, theta: 90 },
      expected: expectedArea,
      actual: r.area,
      severity: "P0",
      rootCause: "Formula discrepancy",
      fix: "Fix formula"
    });
  }
}

// F. ANNULUS
{
  const r = computeAnnulusArea(10, 5, "m", 4);
  const expectedArea = parseFloat((75 * Math.PI).toFixed(4)); // 235.6194
  console.log("Annulus (R=10, r=5):", r.area);
  if (r.area !== expectedArea) {
    discrepancies.push({
      test: "Annulus Area",
      inputs: { R: 10, r: 5 },
      expected: expectedArea,
      actual: r.area,
      severity: "P0",
      rootCause: "Formula discrepancy",
      fix: "Fix formula"
    });
  }

  // What happens when R=5, r=10 (invalid)?
  const invalidAnn = computeAnnulusArea(5, 10, "m", 4);
  console.log("Invalid Annulus (R=5, r=10):", invalidAnn.area);
  // It silently clamps and computes area!
}

// G. TRAPEZOID
{
  const r = computeTrapezoidArea(10, 6, 4, "m", 4);
  console.log("Trapezoid (10, 6, 4):", r.area);
  if (r.area !== 32) {
    discrepancies.push({
      test: "Trapezoid Area",
      inputs: { b1: 10, b2: 6, h: 4 },
      expected: 32,
      actual: r.area,
      severity: "P0",
      rootCause: "Formula discrepancy",
      fix: "Fix formula"
    });
  }
}

// H. PARALLELOGRAM
{
  const r = computeParallelogramArea(10, 6, "m", 4);
  console.log("Parallelogram (10, 6):", r.area);
  if (r.area !== 60) {
    discrepancies.push({
      test: "Parallelogram Area",
      inputs: { b: 10, h: 6 },
      expected: 60,
      actual: r.area,
      severity: "P0",
      rootCause: "Formula discrepancy",
      fix: "Fix formula"
    });
  }
}

// I. RHOMBUS
{
  const r = computeRhombusArea(10, 8, "m", 4);
  console.log("Rhombus (10, 8):", r.area);
  if (r.area !== 40) {
    discrepancies.push({
      test: "Rhombus Area",
      inputs: { d1: 10, d2: 8 },
      expected: 40,
      actual: r.area,
      severity: "P0",
      rootCause: "Formula discrepancy",
      fix: "Fix formula"
    });
  }
}

// J. KITE
{
  const r = computeRhombusArea(10, 6, "m", 4);
  console.log("Kite (10, 6):", r.area);
  if (r.area !== 30) {
    discrepancies.push({
      test: "Kite Area",
      inputs: { d1: 10, d2: 6 },
      expected: 30,
      actual: r.area,
      severity: "P0",
      rootCause: "Formula discrepancy",
      fix: "Fix formula"
    });
  }
}

// K. REGULAR POLYGON
{
  const r = computeRegularPolygonArea(6, 5, "m", 4);
  console.log("Regular 6-gon (s=5):", r.area, "Apothem:", r.apothem, "P:", r.perimeter);
  if (Math.abs(r.area - 64.9519) > 0.0001) {
    discrepancies.push({
      test: "Regular Polygon 6-gon Area",
      inputs: { n: 6, s: 5 },
      expected: 64.9519,
      actual: r.area,
      severity: "P0",
      rootCause: "Formula discrepancy",
      fix: "Fix formula"
    });
  }
  if (Math.abs((r.apothem || 0) - 4.3301) > 0.0001) {
    discrepancies.push({
      test: "Regular Polygon 6-gon Apothem",
      inputs: { n: 6, s: 5 },
      expected: 4.3301,
      actual: r.apothem,
      severity: "P1",
      rootCause: "Apothem discrepancy",
      fix: "Fix formula"
    });
  }
  if (r.perimeter !== 30) {
    discrepancies.push({
      test: "Regular Polygon 6-gon Perimeter",
      inputs: { n: 6, s: 5 },
      expected: 30,
      actual: r.perimeter,
      severity: "P1",
      rootCause: "Perimeter discrepancy",
      fix: "Fix formula"
    });
  }
}

// L. IRREGULAR POLYGON SHOELACE
{
  const pts = [
    { x: 0, y: 0 },
    { x: 10, y: 0 },
    { x: 10, y: 6 },
    { x: 4, y: 10 },
    { x: 0, y: 6 }
  ];
  const r = computeShoelacePolygonArea(pts, "m", 4);
  console.log("Shoelace Polygon:", r.area);
  if (r.area !== 80) {
    discrepancies.push({
      test: "Shoelace Polygon Area",
      inputs: pts,
      expected: 80,
      actual: r.area,
      severity: "P0",
      rootCause: "Formula discrepancy",
      fix: "Fix formula"
    });
  }

  // Reverse order
  const rRev = computeShoelacePolygonArea([...pts].reverse(), "m", 4);
  console.log("Shoelace Reverse Order Area:", rRev.area);
  if (rRev.area !== 80) {
    discrepancies.push({
      test: "Shoelace Reverse Order",
      inputs: "reversed pts",
      expected: 80,
      actual: rRev.area,
      severity: "P0",
      rootCause: "Shoelace orientation sensitivity",
      fix: "Use Math.abs(sum) / 2"
    });
  }

  // Known rectangle (0,0), (10,0), (10,5), (0,5)
  const rectPts = [{ x: 0, y: 0 }, { x: 10, y: 0 }, { x: 10, y: 5 }, { x: 0, y: 5 }];
  const rRect = computeShoelacePolygonArea(rectPts, "m", 4);
  console.log("Shoelace Rectangle Area:", rRect.area);
  if (rRect.area !== 50) {
    discrepancies.push({
      test: "Shoelace Rectangle Area",
      inputs: rectPts,
      expected: 50,
      actual: rRect.area,
      severity: "P0",
      rootCause: "Formula error",
      fix: "Fix formula"
    });
  }
}

// M. UNIT CONVERTER MATRIX
{
  const convRes = convertAreaFromSquareMeters(1, 4);
  const conv1 = convRes.raw;
  console.log("1 m² conversions:", conv1);
  if (conv1.sqMeters !== 1) discrepancies.push({ test: "1 m² to m²", inputs: 1, expected: 1, actual: conv1.sqMeters, severity: "P1", rootCause: "bad factor", fix: "fix" });
  if (conv1.sqCentimeters !== 10000) discrepancies.push({ test: "1 m² to cm²", inputs: 1, expected: 10000, actual: conv1.sqCentimeters, severity: "P1", rootCause: "bad factor", fix: "fix" });
  if (Math.abs(conv1.sqFeet - 10.7639) > 0.001) discrepancies.push({ test: "1 m² to ft²", inputs: 1, expected: 10.7639, actual: conv1.sqFeet, severity: "P1", rootCause: "bad factor", fix: "fix" });
  if (Math.abs(conv1.sqInches - 1550.0031) > 0.01) discrepancies.push({ test: "1 m² to in²", inputs: 1, expected: 1550.0031, actual: conv1.sqInches, severity: "P1", rootCause: "bad factor", fix: "fix" });
  if (Math.abs(conv1.acres - 0.0002) > 0.0001) discrepancies.push({ test: "1 m² to acres", inputs: 1, expected: 0.0002, actual: conv1.acres, severity: "P1", rootCause: "bad factor", fix: "fix" });
  if (Math.abs(conv1.hectares - 0.0001) > 0.0001) discrepancies.push({ test: "1 m² to ha", inputs: 1, expected: 0.0001, actual: conv1.hectares, severity: "P1", rootCause: "bad factor", fix: "fix" });
}

console.log("\n--- DISCREPANCIES FOUND SO FAR ---");
console.log(JSON.stringify(discrepancies, null, 2));
