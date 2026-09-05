const Math_PI = Math.PI;

function computeSphereSurfaceArea(radius, precision = 4) {
  const r = Math.max(0.000001, radius);
  const totalArea = 4.0 * Math_PI * r * r;
  const lateralArea = totalArea;
  const baseArea = 0;
  const hemisphereArea = 3.0 * Math_PI * r * r;
  const volume = (4.0 / 3.0) * Math_PI * r * r * r;
  const fmt = (v) => parseFloat(v.toFixed(precision));
  return {
    totalArea: fmt(totalArea),
    lateralArea: fmt(lateralArea),
    baseArea: 0,
    hemisphereArea: fmt(hemisphereArea),
    volume: fmt(volume),
    exactPi: `${fmt(4 * r * r)}π`
  };
}

function computeConeSurfaceArea(r, h, isFrustum = false, topR = 0, precision = 4) {
  const safeR = Math.max(0.000001, r);
  const safeH = Math.max(0.000001, h);

  if (!isFrustum) {
    const s = Math.sqrt(safeR * safeR + safeH * safeH);
    const baseArea = Math_PI * safeR * safeR;
    const lateralArea = Math_PI * safeR * s;
    const totalArea = baseArea + lateralArea;
    const volume = (1.0 / 3.0) * Math_PI * safeR * safeR * safeH;
    const fmt = (v) => parseFloat(v.toFixed(precision));
    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(baseArea),
      slantHeight: fmt(s),
      volume: fmt(volume)
    };
  } else {
    const R = Math.max(safeR, topR);
    const rSmall = Math.min(safeR, topR);
    const s = Math.sqrt((R - rSmall) * (R - rSmall) + safeH * safeH);
    const topBase = Math_PI * rSmall * rSmall;
    const botBase = Math_PI * R * R;
    const baseArea = topBase + botBase;
    const lateralArea = Math_PI * (R + rSmall) * s;
    const totalArea = baseArea + lateralArea;
    const volume = (1.0 / 3.0) * Math_PI * safeH * (R * R + R * rSmall + rSmall * rSmall);
    const fmt = (v) => parseFloat(v.toFixed(precision));
    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(baseArea),
      slantHeight: fmt(s),
      volume: fmt(volume)
    };
  }
}

function computeCylinderSurfaceArea(r, h, isHollow = false, innerR = 0, precision = 4) {
  const safeR = Math.max(0.000001, r);
  const safeH = Math.max(0.000001, h);

  if (!isHollow) {
    const baseArea = 2.0 * Math_PI * safeR * safeR;
    const lateralArea = 2.0 * Math_PI * safeR * safeH;
    const totalArea = baseArea + lateralArea;
    const volume = Math_PI * safeR * safeR * safeH;
    const fmt = (v) => parseFloat(v.toFixed(precision));
    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(baseArea),
      volume: fmt(volume)
    };
  } else {
    const R = Math.max(safeR, innerR);
    const rSmall = Math.min(safeR, innerR);
    const outerLateral = 2.0 * Math_PI * R * safeH;
    const innerLateral = 2.0 * Math_PI * rSmall * safeH;
    const lateralArea = outerLateral + innerLateral;
    const endRings = 2.0 * Math_PI * (R * R - rSmall * rSmall);
    const totalArea = lateralArea + endRings;
    const volume = Math_PI * (R * R - rSmall * rSmall) * safeH;
    const fmt = (v) => parseFloat(v.toFixed(precision));
    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(endRings),
      volume: fmt(volume)
    };
  }
}

function computeBoxSurfaceArea(l, w, h, precision = 4) {
  const safeL = Math.max(0.000001, l);
  const safeW = Math.max(0.000001, w);
  const safeH = Math.max(0.000001, h);

  const baseArea = 2.0 * safeL * safeW;
  const lateralArea = 2.0 * (safeL + safeW) * safeH;
  const totalArea = 2.0 * (safeL * safeW + safeL * safeH + safeW * safeH);
  const openTopArea = safeL * safeW + 2.0 * (safeL * safeH + safeW * safeH);
  const volume = safeL * safeW * safeH;
  const fmt = (v) => parseFloat(v.toFixed(precision));
  return {
    totalArea: fmt(totalArea),
    lateralArea: fmt(lateralArea),
    baseArea: fmt(baseArea),
    openTopArea: fmt(openTopArea),
    volume: fmt(volume)
  };
}

function computePyramidSurfaceArea(a, h, isTetrahedron = false, precision = 4) {
  const safeA = Math.max(0.000001, a);
  const safeH = Math.max(0.000001, h);

  if (!isTetrahedron) {
    const s = Math.sqrt((safeA / 2.0) * (safeA / 2.0) + safeH * safeH);
    const baseArea = safeA * safeA;
    const lateralArea = 2.0 * safeA * s;
    const totalArea = baseArea + lateralArea;
    const volume = (1.0 / 3.0) * baseArea * safeH;
    const fmt = (v) => parseFloat(v.toFixed(precision));
    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(baseArea),
      slantHeight: fmt(s),
      volume: fmt(volume)
    };
  } else {
    const baseArea = (Math.sqrt(3) / 4.0) * safeA * safeA;
    const lateralArea = 3.0 * baseArea;
    const totalArea = Math.sqrt(3) * safeA * safeA;
    const volume = (safeA * safeA * safeA) / (6.0 * Math.sqrt(2));
    const slantHeight = (Math.sqrt(3) / 2.0) * safeA;
    const fmt = (v) => parseFloat(v.toFixed(precision));
    return {
      totalArea: fmt(totalArea),
      lateralArea: fmt(lateralArea),
      baseArea: fmt(baseArea),
      slantHeight: fmt(slantHeight),
      volume: fmt(volume)
    };
  }
}

function computeCapsuleSurfaceArea(r, h, precision = 4) {
  const safeR = Math.max(0.000001, r);
  const safeH = Math.max(0.000001, h);

  const sphereEndsArea = 4.0 * Math_PI * safeR * safeR;
  const cylinderLateralArea = 2.0 * Math_PI * safeR * safeH;
  const totalArea = sphereEndsArea + cylinderLateralArea;
  const volume = Math_PI * safeR * safeR * safeH + (4.0 / 3.0) * Math_PI * safeR * safeR * safeR;
  const fmt = (v) => parseFloat(v.toFixed(precision));
  return {
    totalArea: fmt(totalArea),
    sphereEndsArea: fmt(sphereEndsArea),
    cylinderLateralArea: fmt(cylinderLateralArea),
    volume: fmt(volume)
  };
}

function computeEllipsoidSurfaceArea(a, b, c, precision = 4) {
  const safeA = Math.max(0.000001, a);
  const safeB = Math.max(0.000001, b);
  const safeC = Math.max(0.000001, c);

  const p = 1.6075;
  const term1 = Math.pow(safeA * safeB, p);
  const term2 = Math.pow(safeA * safeC, p);
  const term3 = Math.pow(safeB * safeC, p);

  const surfaceArea = 4.0 * Math_PI * Math.pow((term1 + term2 + term3) / 3.0, 1.0 / p);
  const volume = (4.0 / 3.0) * Math_PI * safeA * safeB * safeC;
  const fmt = (v) => parseFloat(v.toFixed(precision));
  return {
    surfaceArea: fmt(surfaceArea),
    volume: fmt(volume)
  };
}

function convertSurfaceAreaUnits(sqMeters, precision = 4) {
  const fmt = (v) => parseFloat(v.toFixed(precision));
  const m2 = sqMeters;
  return {
    sqMeters: fmt(m2),
    sqCm: fmt(m2 * 10000.0),
    sqMm: fmt(m2 * 1000000.0),
    sqFeet: fmt(m2 * 10.7639104),
    sqInches: fmt(m2 * 1550.0031),
    sqYards: fmt(m2 * 1.19599005),
    acres: fmt(m2 / 4046.85642),
    hectares: fmt(m2 / 10000.0)
  };
}

console.log("=== RUNNING MATHEMATICAL ORACLE SUITE ===");

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

// Case 1: Sphere r = 5
{
  const r = 5;
  const expSA = 4 * Math_PI * 25; // 100π ≈ 314.159265
  const res = computeSphereSurfaceArea(r, 4);
  assertClose(res.totalArea, parseFloat(expSA.toFixed(4)), 1e-4, "Sphere Total SA r=5");
  assertClose(res.hemisphereArea, parseFloat((3 * Math_PI * 25).toFixed(4)), 1e-4, "Sphere Closed Hemi r=5");
  assertClose(res.volume, parseFloat(((4/3) * Math_PI * 125).toFixed(4)), 1e-4, "Sphere Vol r=5");
}

// Case 2: Cone r = 4, h = 10
{
  const r = 4, h = 10;
  const s = Math.sqrt(16 + 100); // √116 ≈ 10.7703
  const expBase = Math_PI * 16;
  const expLat = Math_PI * 4 * s;
  const expTot = expBase + expLat;
  const res = computeConeSurfaceArea(r, h, false, 0, 4);
  assertClose(res.slantHeight, parseFloat(s.toFixed(4)), 1e-4, "Cone Slant r=4, h=10");
  assertClose(res.baseArea, parseFloat(expBase.toFixed(4)), 1e-4, "Cone Base r=4, h=10");
  assertClose(res.lateralArea, parseFloat(expLat.toFixed(4)), 1e-4, "Cone Lateral r=4, h=10");
  assertClose(res.totalArea, parseFloat(expTot.toFixed(4)), 1e-4, "Cone Total r=4, h=10");
}

// Case 3: Cylinder r = 4, h = 10
{
  const r = 4, h = 10;
  const expBase = 2 * Math_PI * 16; // 32π
  const expLat = 2 * Math_PI * 4 * 10; // 80π
  const expTot = 112 * Math_PI; // 351.8584
  const res = computeCylinderSurfaceArea(r, h, false, 0, 4);
  assertClose(res.baseArea, parseFloat(expBase.toFixed(4)), 1e-4, "Cyl Bases r=4, h=10");
  assertClose(res.lateralArea, parseFloat(expLat.toFixed(4)), 1e-4, "Cyl Lat r=4, h=10");
  assertClose(res.totalArea, parseFloat(expTot.toFixed(4)), 1e-4, "Cyl Tot r=4, h=10");
}

// Case 4: Rectangular Prism 6 x 4 x 5
{
  const l = 6, w = 4, h = 5;
  const expTot = 2 * (24 + 30 + 20); // 148
  const expOpen = 24 + 2 * (30 + 20); // 124
  const res = computeBoxSurfaceArea(l, w, h, 4);
  assertClose(res.totalArea, expTot, 1e-4, "Box Tot 6,4,5");
  assertClose(res.openTopArea, expOpen, 1e-4, "Box Open 6,4,5");
}

// Case 5: 100 m² conversion
{
  const res = convertSurfaceAreaUnits(100, 4);
  assertClose(res.sqMeters, 100, 1e-4, "Conv m²");
  assertClose(res.sqFeet, 1076.391, 1e-2, "Conv ft²");
  assertClose(res.sqInches, 155000.31, 1e-1, "Conv in²");
  assertClose(res.sqCm, 1000000, 1e-4, "Conv cm²");
  assertClose(res.hectares, 0.01, 1e-4, "Conv hectares");
  assertClose(res.acres, 0.0247, 1e-4, "Conv acres");
}

// 500+ Randomized Tests for each shape
for (let i = 0; i < 500; i++) {
  const r = 0.5 + Math.random() * 40;
  const h = 0.5 + Math.random() * 40;
  const l = 0.5 + Math.random() * 40;
  const w = 0.5 + Math.random() * 40;
  const a = 0.5 + Math.random() * 40;

  // Sphere
  const sRes = computeSphereSurfaceArea(r, 4);
  assertClose(sRes.totalArea, parseFloat((4 * Math_PI * r * r).toFixed(4)), 1e-3, `Rand Sphere ${i}`);

  // Cylinder
  const cylRes = computeCylinderSurfaceArea(r, h, false, 0, 4);
  assertClose(cylRes.totalArea, parseFloat((2 * Math_PI * r * (r + h)).toFixed(4)), 1e-3, `Rand Cyl ${i}`);

  // Cone
  const s = Math.sqrt(r * r + h * h);
  const coneRes = computeConeSurfaceArea(r, h, false, 0, 4);
  assertClose(coneRes.totalArea, parseFloat((Math_PI * r * (r + s)).toFixed(4)), 1e-3, `Rand Cone ${i}`);

  // Box
  const bRes = computeBoxSurfaceArea(l, w, h, 4);
  assertClose(bRes.totalArea, parseFloat((2 * (l*w + l*h + w*h)).toFixed(4)), 1e-3, `Rand Box ${i}`);

  // Pyramid
  const sPyr = Math.sqrt((a/2)*(a/2) + h*h);
  const pyrRes = computePyramidSurfaceArea(a, h, false, 4);
  assertClose(pyrRes.totalArea, parseFloat((a*a + 2*a*sPyr).toFixed(4)), 1e-3, `Rand Pyr ${i}`);
}

console.log(`\n=== FINAL RESULTS ===`);
console.log(`Total assertions: ${totalAssertions}`);
console.log(`Passed: ${passedAssertions}`);
console.log(`Failed: ${failedAssertions}`);
console.log(`Max absolute error: ${maxAbsError}`);
console.log(`Max relative error: ${maxRelError}`);
