const {
  computeSphereSurfaceArea,
  computeConeSurfaceArea,
  computeCylinderSurfaceArea,
  computeBoxSurfaceArea,
  computePyramidSurfaceArea,
  computeCapsuleSurfaceArea,
  computeEllipsoidSurfaceArea,
  convertSurfaceAreaUnits
} = require("./src/app/calculators/surface-area-calculator/surface-area-logic.ts");

console.log("=== RUNNING MATHEMATICAL ORACLE FOR SURFACE AREA CALCULATOR ===");

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;
let maxAbsError = 0;
let maxRelError = 0;

function assertClose(actual, expected, tol, label) {
  totalAssertions++;
  const absErr = Math.abs(actual - expected);
  const relErr = expected !== 0 ? absErr / Math.abs(expected) : absErr;
  if (absErr > maxAbsError) maxAbsError = absErr;
  if (relErr > maxRelError) maxRelError = relErr;

  if (absErr <= tol) {
    passedAssertions++;
  } else {
    failedAssertions++;
    console.error(`FAIL: ${label} | Expected: ${expected}, Actual: ${actual}, AbsErr: ${absErr}`);
  }
}

// 1. Sphere Golden Case: r = 5
{
  const r = 5;
  const expectedTotalSA = 4 * Math.PI * r * r; // 100π ≈ 314.159265
  const expectedCurvedHemi = 2 * Math.PI * r * r; // 50π ≈ 157.07963
  const expectedClosedHemi = 3 * Math.PI * r * r; // 75π ≈ 235.619449
  const expectedSphereVol = (4/3) * Math.PI * r * r * r; // 500/3 π ≈ 523.5987756

  const res = computeSphereSurfaceArea(r, 4);
  assertClose(res.totalArea, parseFloat(expectedTotalSA.toFixed(4)), 1e-4, "Sphere Total SA (r=5)");
  assertClose(res.hemisphereArea, parseFloat(expectedClosedHemi.toFixed(4)), 1e-4, "Sphere Hemisphere Closed SA (r=5)");
  assertClose(res.volume, parseFloat(expectedSphereVol.toFixed(4)), 1e-4, "Sphere Volume (r=5)");
}

// 2. Cone Golden Case: r = 4, h = 10
{
  const r = 4;
  const h = 10;
  const s = Math.sqrt(r * r + h * h); // √116 ≈ 10.7703296
  const expectedBase = Math.PI * r * r; // 16π ≈ 50.265482
  const expectedLateral = Math.PI * r * s; // ≈ 135.34586
  const expectedTotal = expectedBase + expectedLateral; // ≈ 185.60936
  const expectedVol = (1/3) * Math.PI * r * r * h; // ≈ 167.5516

  const res = computeConeSurfaceArea(r, h, false, 0, 4);
  assertClose(res.slantHeight, parseFloat(s.toFixed(4)), 1e-4, "Cone Slant Height (r=4, h=10)");
  assertClose(res.baseArea, parseFloat(expectedBase.toFixed(4)), 1e-4, "Cone Base Area (r=4, h=10)");
  assertClose(res.lateralArea, parseFloat(expectedLateral.toFixed(4)), 1e-4, "Cone Lateral Area (r=4, h=10)");
  assertClose(res.totalArea, parseFloat(expectedTotal.toFixed(4)), 1e-4, "Cone Total Area (r=4, h=10)");
  assertClose(res.volume, parseFloat(expectedVol.toFixed(4)), 1e-4, "Cone Volume (r=4, h=10)");
}

// 3. Cylinder Golden Case: r = 4, h = 10
{
  const r = 4;
  const h = 10;
  const expectedBases = 2 * Math.PI * r * r; // 32π ≈ 100.53096
  const expectedLateral = 2 * Math.PI * r * h; // 80π ≈ 251.32741
  const expectedTotal = expectedBases + expectedLateral; // 112π ≈ 351.85838
  const expectedVol = Math.PI * r * r * h; // 160π ≈ 502.65482

  const res = computeCylinderSurfaceArea(r, h, false, 0, 4);
  assertClose(res.baseArea, parseFloat(expectedBases.toFixed(4)), 1e-4, "Cylinder Bases Area (r=4, h=10)");
  assertClose(res.lateralArea, parseFloat(expectedLateral.toFixed(4)), 1e-4, "Cylinder Lateral Area (r=4, h=10)");
  assertClose(res.totalArea, parseFloat(expectedTotal.toFixed(4)), 1e-4, "Cylinder Total Area (r=4, h=10)");
  assertClose(res.volume, parseFloat(expectedVol.toFixed(4)), 1e-4, "Cylinder Volume (r=4, h=10)");
}

// 4. Box Golden Case: l = 6, w = 4, h = 5
{
  const l = 6, w = 4, h = 5;
  const expectedBase = 2 * (l * w); // 48
  const expectedLateral = 2 * (l + w) * h; // 2 * 10 * 5 = 100
  const expectedTotal = 2 * (l * w + l * h + w * h); // 2 * (24 + 30 + 20) = 148
  const expectedOpenTop = l * w + 2 * (l * h + w * h); // 24 + 100 = 124
  const expectedVol = l * w * h; // 120

  const res = computeBoxSurfaceArea(l, w, h, 4);
  assertClose(res.baseArea, expectedBase, 1e-4, "Box Bases Area (6,4,5)");
  assertClose(res.lateralArea, expectedLateral, 1e-4, "Box Lateral Area (6,4,5)");
  assertClose(res.totalArea, expectedTotal, 1e-4, "Box Total Area (6,4,5)");
  assertClose(res.openTopArea, expectedOpenTop, 1e-4, "Box Open-Top Area (6,4,5)");
  assertClose(res.volume, expectedVol, 1e-4, "Box Volume (6,4,5)");
}

// 5. Square Pyramid Golden Case: a = 6, h = 4
{
  const a = 6, h = 4;
  const s = Math.sqrt((a/2) * (a/2) + h * h); // √(9 + 16) = 5
  const expectedBase = a * a; // 36
  const expectedLateral = 2 * a * s; // 2 * 6 * 5 = 60
  const expectedTotal = expectedBase + expectedLateral; // 96
  const expectedVol = (1/3) * expectedBase * h; // 48

  const res = computePyramidSurfaceArea(a, h, false, 4);
  assertClose(res.slantHeight, s, 1e-4, "Pyramid Slant Height (a=6, h=4)");
  assertClose(res.baseArea, expectedBase, 1e-4, "Pyramid Base Area (a=6, h=4)");
  assertClose(res.lateralArea, expectedLateral, 1e-4, "Pyramid Lateral Area (a=6, h=4)");
  assertClose(res.totalArea, expectedTotal, 1e-4, "Pyramid Total Area (a=6, h=4)");
  assertClose(res.volume, expectedVol, 1e-4, "Pyramid Volume (a=6, h=4)");
}

// 6. Capsule Golden Case: r = 3, h = 8
{
  const r = 3, h = 8;
  const expectedSphereEnds = 4 * Math.PI * r * r; // 36π ≈ 113.0973
  const expectedCylLateral = 2 * Math.PI * r * h; // 48π ≈ 150.7964
  const expectedTotal = expectedSphereEnds + expectedCylLateral; // 84π ≈ 263.8938
  const expectedVol = Math.PI * r * r * h + (4/3) * Math.PI * r * r * r; // 72π + 36π = 108π ≈ 339.292

  const res = computeCapsuleSurfaceArea(r, h, 4);
  assertClose(res.sphereEndsArea, parseFloat(expectedSphereEnds.toFixed(4)), 1e-4, "Capsule Ends Area (r=3, h=8)");
  assertClose(res.cylinderLateralArea, parseFloat(expectedCylLateral.toFixed(4)), 1e-4, "Capsule Cyl Lateral Area (r=3, h=8)");
  assertClose(res.totalArea, parseFloat(expectedTotal.toFixed(4)), 1e-4, "Capsule Total Area (r=3, h=8)");
  assertClose(res.volume, parseFloat(expectedVol.toFixed(4)), 1e-4, "Capsule Volume (r=3, h=8)");
}

// 7. Ellipsoid Golden Case: a = 5, b = 4, c = 3
{
  const a = 5, b = 4, c = 3;
  const p = 1.6075;
  const term = (Math.pow(a*b, p) + Math.pow(a*c, p) + Math.pow(b*c, p)) / 3;
  const expectedSA = 4 * Math.PI * Math.pow(term, 1/p); // ≈ 243.696
  const expectedVol = (4/3) * Math.PI * a * b * c; // 80π ≈ 251.3274

  const res = computeEllipsoidSurfaceArea(a, b, c, 4);
  assertClose(res.surfaceArea, parseFloat(expectedSA.toFixed(4)), 1e-4, "Ellipsoid SA (5,4,3)");
  assertClose(res.volume, parseFloat(expectedVol.toFixed(4)), 1e-4, "Ellipsoid Volume (5,4,3)");
}

// 8. Unit Conversion Golden Case: 100 m²
{
  const res = convertSurfaceAreaUnits(100, 4);
  assertClose(res.sqMeters, 100, 1e-4, "Conv m²");
  assertClose(res.sqFeet, 1076.391, 1e-2, "Conv ft²");
  assertClose(res.sqInches, 155000.31, 1e-1, "Conv in²");
  assertClose(res.sqCm, 1000000, 1e-4, "Conv cm²");
  assertClose(res.hectares, 0.01, 1e-4, "Conv hectares");
  assertClose(res.acres, 0.0247, 1e-4, "Conv acres");
}

// Randomized property testing (500+ trials each)
for (let i = 0; i < 600; i++) {
  const r = 0.1 + Math.random() * 50;
  const h = 0.1 + Math.random() * 50;
  const s = Math.sqrt(r * r + h * h);
  const coneRes = computeConeSurfaceArea(r, h, false, 0, 4);
  const expectedConeTotal = Math.PI * r * (r + s);
  assertClose(coneRes.totalArea, parseFloat(expectedConeTotal.toFixed(4)), 1e-3, `Random Cone ${i}`);

  const cylRes = computeCylinderSurfaceArea(r, h, false, 0, 4);
  const expectedCylTotal = 2 * Math.PI * r * (r + h);
  assertClose(cylRes.totalArea, parseFloat(expectedCylTotal.toFixed(4)), 1e-3, `Random Cylinder ${i}`);

  const sphereRes = computeSphereSurfaceArea(r, 4);
  const expectedSphereTotal = 4 * Math.PI * r * r;
  assertClose(sphereRes.totalArea, parseFloat(expectedSphereTotal.toFixed(4)), 1e-3, `Random Sphere ${i}`);
}

console.log(`\n=== RESULTS ===`);
console.log(`Total assertions: ${totalAssertions}`);
console.log(`Passed: ${passedAssertions}`);
console.log(`Failed: ${failedAssertions}`);
console.log(`Max absolute error: ${maxAbsError}`);
console.log(`Max relative error: ${maxRelError}`);
