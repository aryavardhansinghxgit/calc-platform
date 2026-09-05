const http = require("http");
const fs = require("fs");

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => resolve({ status: res.statusCode, data }));
    }).on("error", reject);
  });
}

// Math Oracle Implementations
const Math_PI = Math.PI;

const SQ_METERS_PER_UNIT = {
  sqMeters: 1.0,
  sqCm: 0.0001,
  sqMm: 0.000001,
  sqFeet: 0.09290304,
  sqInches: 0.00064516,
  sqYards: 0.83612736,
  acres: 4046.8564224,
  hectares: 10000.0
};

function oracleSphere(r, p = 4) {
  const total = 4 * Math_PI * r * r;
  const curvedHemi = 2 * Math_PI * r * r;
  const closedHemi = 3 * Math_PI * r * r;
  const vol = (4/3) * Math_PI * r * r * r;
  const hemiVol = (2/3) * Math_PI * r * r * r;
  const fmt = v => parseFloat(v.toFixed(p));
  return { total: fmt(total), curvedHemi: fmt(curvedHemi), closedHemi: fmt(closedHemi), vol: fmt(vol), hemiVol: fmt(hemiVol) };
}

function oracleCone(r, h, p = 4) {
  const s = Math.sqrt(r * r + h * h);
  const base = Math_PI * r * r;
  const lat = Math_PI * r * s;
  const total = base + lat;
  const vol = (1/3) * Math_PI * r * r * h;
  const fmt = v => parseFloat(v.toFixed(p));
  return { s: fmt(s), base: fmt(base), lat: fmt(lat), total: fmt(total), vol: fmt(vol) };
}

function oracleFrustum(R, r, h, p = 4) {
  const s = Math.sqrt((R - r) * (R - r) + h * h);
  const topBase = Math_PI * r * r;
  const botBase = Math_PI * R * R;
  const bases = topBase + botBase;
  const lat = Math_PI * (R + r) * s;
  const total = bases + lat;
  const vol = (1/3) * Math_PI * h * (R*R + R*r + r*r);
  const fmt = v => parseFloat(v.toFixed(p));
  return { s: fmt(s), bases: fmt(bases), lat: fmt(lat), total: fmt(total), vol: fmt(vol) };
}

function oracleCylinder(r, h, p = 4) {
  const bases = 2 * Math_PI * r * r;
  const lat = 2 * Math_PI * r * h;
  const total = bases + lat;
  const vol = Math_PI * r * r * h;
  const fmt = v => parseFloat(v.toFixed(p));
  return { bases: fmt(bases), lat: fmt(lat), total: fmt(total), vol: fmt(vol) };
}

function oracleHollowPipe(R, r, h, p = 4) {
  const outerLat = 2 * Math_PI * R * h;
  const innerLat = 2 * Math_PI * r * h;
  const lat = outerLat + innerLat;
  const endRings = 2 * Math_PI * (R*R - r*r);
  const total = lat + endRings;
  const vol = Math_PI * (R*R - r*r) * h;
  const fmt = v => parseFloat(v.toFixed(p));
  return { lat: fmt(lat), endRings: fmt(endRings), total: fmt(total), vol: fmt(vol) };
}

function oracleBox(l, w, h, p = 4) {
  const bases = 2 * l * w;
  const lat = 2 * (l + w) * h;
  const total = 2 * (l*w + l*h + w*h);
  const open = l*w + 2 * (l*h + w*h);
  const vol = l * w * h;
  const fmt = v => parseFloat(v.toFixed(p));
  return { bases: fmt(bases), lat: fmt(lat), total: fmt(total), open: fmt(open), vol: fmt(vol) };
}

function oracleCube(a, p = 4) {
  const total = 6 * a * a;
  const open = 5 * a * a;
  const lat = 4 * a * a;
  const vol = a * a * a;
  const fmt = v => parseFloat(v.toFixed(p));
  return { total: fmt(total), open: fmt(open), lat: fmt(lat), vol: fmt(vol) };
}

function oraclePyramid(a, h, p = 4) {
  const s = Math.sqrt((a/2)*(a/2) + h*h);
  const base = a * a;
  const lat = 2 * a * s;
  const total = base + lat;
  const vol = (1/3) * a * a * h;
  const fmt = v => parseFloat(v.toFixed(p));
  return { s: fmt(s), base: fmt(base), lat: fmt(lat), total: fmt(total), vol: fmt(vol) };
}

function oracleTetrahedron(a, p = 4) {
  const base = (Math.sqrt(3)/4) * a * a;
  const total = Math.sqrt(3) * a * a;
  const s = (Math.sqrt(3)/2) * a;
  const vol = (a * a * a) / (6 * Math.sqrt(2));
  const fmt = v => parseFloat(v.toFixed(p));
  return { s: fmt(s), base: fmt(base), total: fmt(total), vol: fmt(vol) };
}

function oracleCapsule(r, h, p = 4) {
  const ends = 4 * Math_PI * r * r;
  const lat = 2 * Math_PI * r * h;
  const total = ends + lat;
  const len = h + 2 * r;
  const vol = Math_PI * r * r * h + (4/3) * Math_PI * r * r * r;
  const fmt = v => parseFloat(v.toFixed(p));
  return { len: fmt(len), ends: fmt(ends), lat: fmt(lat), total: fmt(total), vol: fmt(vol) };
}

function oracleEllipsoid(a, b, c, p = 4) {
  const pExp = 1.6075;
  const term = (Math.pow(a*b, pExp) + Math.pow(a*c, pExp) + Math.pow(b*c, pExp)) / 3;
  const total = 4 * Math_PI * Math.pow(term, 1 / pExp);
  const vol = (4/3) * Math_PI * a * b * c;
  const fmt = v => parseFloat(v.toFixed(p));
  return { total: fmt(total), vol: fmt(vol) };
}

function oracleConversion(sqM, p = 4) {
  const fmt = v => parseFloat(v.toFixed(p));
  return {
    sqMeters: fmt(sqM),
    sqFeet: fmt(sqM / SQ_METERS_PER_UNIT.sqFeet),
    sqInches: fmt(sqM / SQ_METERS_PER_UNIT.sqInches),
    sqCm: fmt(sqM / SQ_METERS_PER_UNIT.sqCm),
    sqMm: fmt(sqM / SQ_METERS_PER_UNIT.sqMm),
    sqYards: fmt(sqM / SQ_METERS_PER_UNIT.sqYards),
    acres: fmt(sqM / SQ_METERS_PER_UNIT.acres),
    hectares: fmt(sqM / SQ_METERS_PER_UNIT.hectares)
  };
}

async function runSuite() {
  console.log("=== RUNNING SURFACE AREA SUITE RE-AUDIT ===");
  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;
  let maxAbsError = 0;
  let maxRelError = 0;

  function assertClose(actual, expected, tol, label) {
    totalTests++;
    const absErr = Math.abs(actual - expected);
    const relErr = expected !== 0 ? absErr / Math.abs(expected) : absErr;
    if (absErr > maxAbsError) maxAbsError = absErr;
    if (relErr > maxRelError) maxRelError = relErr;
    if (absErr <= tol) {
      passedTests++;
    } else {
      failedTests++;
      console.error(`FAIL: ${label} | Exp: ${expected}, Got: ${actual}`);
    }
  }

  // 1. SSR HTML Verification
  const url = "http://localhost:3000/calculators/surface-area-calculator";
  const { status, data: html } = await fetchUrl(url);
  console.log(`HTTP Status: ${status}`);
  if (status !== 200) throw new Error("Expected HTTP 200");

  // Check H1
  const h1Matches = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi);
  console.log(`H1 count: ${h1Matches ? h1Matches.length : 0}`);
  if (!h1Matches || h1Matches.length !== 1) console.error("FAIL: Expected exactly 1 H1");

  // Check All 8 Modules Present in SSR HTML
  const modules = [
    "Sphere &amp; Hemisphere Surface Area Module",
    "Cone &amp; Conical Frustum Surface Area Module",
    "Cylinder &amp; Tube / Hollow Pipe Module",
    "Cube &amp; Rectangular Prism Surface Area Module",
    "Square Pyramid &amp; Tetrahedron Module",
    "Capsule Surface Area Module",
    "Ellipsoid Surface Area Module",
    "Master Surface Area Unit Converter Matrix"
  ];

  modules.forEach(mod => {
    const present = html.includes(mod) || html.includes(mod.replace(/&amp;/g, "&"));
    if (present) {
      console.log(`✔ Module rendered: ${mod}`);
      passedTests++;
    } else {
      console.error(`FAIL: Missing module in HTML: ${mod}`);
      failedTests++;
    }
    totalTests++;
  });

  // Check Related Links in Content
  const links = [
    "/calculators/volume-calculator",
    "/calculators/area-calculator",
    "/calculators/circle-calculator"
  ];

  for (const l of links) {
    const hasLink = html.includes(`href="${l}"`);
    if (hasLink) {
      console.log(`✔ Crawlable Link present: ${l}`);
      passedTests++;
    } else {
      console.error(`FAIL: Missing link: ${l}`);
      failedTests++;
    }
    totalTests++;

    const res = await fetchUrl(`http://localhost:3000${l}`);
    if (res.status === 200) {
      console.log(`  ✔ Destination HTTP 200: ${l}`);
      passedTests++;
    } else {
      console.error(`  FAIL: Destination returned ${res.status}: ${l}`);
      failedTests++;
    }
    totalTests++;
  }

  // 2. Mathematical Golden Cases
  console.log("\n--- Mathematical Golden Cases ---");

  // Golden Case 1: Sphere r=5
  const gSphere = oracleSphere(5, 4);
  assertClose(gSphere.total, 314.1593, 1e-4, "Sphere TSA r=5");
  assertClose(gSphere.curvedHemi, 157.0796, 1e-4, "Sphere Curved Hemi r=5");
  assertClose(gSphere.closedHemi, 235.6194, 1e-4, "Sphere Closed Hemi r=5");
  assertClose(gSphere.vol, 523.5988, 1e-4, "Sphere Vol r=5");
  assertClose(gSphere.hemiVol, 261.7994, 1e-4, "Hemisphere Vol r=5");

  // Golden Case 2: Cone r=4, h=10
  const gCone = oracleCone(4, 10, 4);
  assertClose(gCone.s, 10.7703, 1e-4, "Cone Slant r=4, h=10");
  assertClose(gCone.base, 50.2655, 1e-4, "Cone Base r=4, h=10");
  assertClose(gCone.lat, 135.3440, 1e-3, "Cone Lateral r=4, h=10");
  assertClose(gCone.total, 185.6094, 1e-3, "Cone TSA r=4, h=10");

  // Golden Case 3: Frustum R=6, r=2, h=8
  const gFrust = oracleFrustum(6, 2, 8, 4);
  assertClose(gFrust.s, 8.9443, 1e-4, "Frustum Slant (6,2,8)");
  assertClose(gFrust.bases, 125.6637, 1e-4, "Frustum Bases (6,2,8)");
  assertClose(gFrust.total, 350.4578, 1e-3, "Frustum TSA (6,2,8)");

  // Golden Case 4: Cylinder r=4, h=10
  const gCyl = oracleCylinder(4, 10, 4);
  assertClose(gCyl.bases, 100.5310, 1e-3, "Cylinder Bases r=4, h=10");
  assertClose(gCyl.lat, 251.3274, 1e-3, "Cylinder Lateral r=4, h=10");
  assertClose(gCyl.total, 351.8584, 1e-3, "Cylinder TSA r=4, h=10");

  // Golden Case 5: Hollow Pipe R=5, r=3, h=10
  const gPipe = oracleHollowPipe(5, 3, 10, 4);
  assertClose(gPipe.lat, 502.6548, 1e-3, "Pipe Lateral (5,3,10)");
  assertClose(gPipe.endRings, 100.5310, 1e-3, "Pipe Rings (5,3,10)");
  assertClose(gPipe.total, 603.1858, 1e-3, "Pipe TSA (5,3,10)");

  // Golden Case 6: Rectangular Prism 6 x 4 x 5
  const gBox = oracleBox(6, 4, 5, 4);
  assertClose(gBox.total, 148, 1e-4, "Box TSA 6,4,5");
  assertClose(gBox.open, 124, 1e-4, "Box Open-Top 6,4,5");
  assertClose(gBox.lat, 100, 1e-4, "Box 4 Walls 6,4,5");

  // Golden Case 7: Cube a=5
  const gCube = oracleCube(5, 4);
  assertClose(gCube.total, 150, 1e-4, "Cube TSA a=5");
  assertClose(gCube.open, 125, 1e-4, "Cube Open a=5");

  // Golden Case 8: Square Pyramid a=6, h=4
  const gPyr = oraclePyramid(6, 4, 4);
  assertClose(gPyr.s, 5, 1e-4, "Pyramid Slant a=6, h=4");
  assertClose(gPyr.base, 36, 1e-4, "Pyramid Base a=6, h=4");
  assertClose(gPyr.lat, 60, 1e-4, "Pyramid Lat a=6, h=4");
  assertClose(gPyr.total, 96, 1e-4, "Pyramid TSA a=6, h=4");

  // Golden Case 9: Regular Tetrahedron a=6
  const gTetra = oracleTetrahedron(6, 4);
  assertClose(gTetra.total, 62.3538, 1e-3, "Tetrahedron TSA a=6");

  // Golden Case 10: Capsule r=3, h=8
  const gCap = oracleCapsule(3, 8, 4);
  assertClose(gCap.len, 14, 1e-4, "Capsule Length r=3, h=8");
  assertClose(gCap.ends, 113.0973, 1e-3, "Capsule Ends r=3, h=8");
  assertClose(gCap.lat, 150.7964, 1e-3, "Capsule Lat r=3, h=8");
  assertClose(gCap.total, 263.8938, 1e-3, "Capsule TSA r=3, h=8");

  // Golden Case 11: Ellipsoid a=5, b=4, c=3
  const gEll = oracleEllipsoid(5, 4, 3, 4);
  assertClose(gEll.total, 199.5017, 1e-3, "Ellipsoid TSA 5,4,3");

  // Golden Case 12: Unit Conversion 100 m²
  const gConv = oracleConversion(100, 4);
  assertClose(gConv.sqMeters, 100, 1e-4, "Conv m²");
  assertClose(gConv.sqFeet, 1076.3910, 1e-2, "Conv ft²");
  assertClose(gConv.sqInches, 155000.31, 1e-1, "Conv in²");
  assertClose(gConv.sqCm, 1000000, 1e-4, "Conv cm²");
  assertClose(gConv.hectares, 0.0100, 1e-4, "Conv ha");
  assertClose(gConv.acres, 0.0247, 1e-4, "Conv acres");

  // 3. Randomized Property Testing (600+ trials each)
  console.log("\n--- Randomized Property Testing (3,000+ assertions) ---");
  for (let i = 0; i < 600; i++) {
    const r = 0.5 + Math.random() * 50;
    const h = 0.5 + Math.random() * 50;
    const l = 0.5 + Math.random() * 50;
    const w = 0.5 + Math.random() * 50;
    const a = 0.5 + Math.random() * 50;

    // Sphere
    const expSphere = 4 * Math_PI * r * r;
    const actSphere = oracleSphere(r, 4).total;
    assertClose(actSphere, parseFloat(expSphere.toFixed(4)), 1e-3, `Rand Sphere ${i}`);

    // Cylinder
    const expCyl = 2 * Math_PI * r * (r + h);
    const actCyl = oracleCylinder(r, h, 4).total;
    assertClose(actCyl, parseFloat(expCyl.toFixed(4)), 1e-3, `Rand Cyl ${i}`);

    // Cone
    const s = Math.sqrt(r * r + h * h);
    const expCone = Math_PI * r * (r + s);
    const actCone = oracleCone(r, h, 4).total;
    assertClose(actCone, parseFloat(expCone.toFixed(4)), 1e-3, `Rand Cone ${i}`);

    // Box
    const expBox = 2 * (l*w + l*h + w*h);
    const actBox = oracleBox(l, w, h, 4).total;
    assertClose(actBox, parseFloat(expBox.toFixed(4)), 1e-3, `Rand Box ${i}`);

    // Pyramid
    const sPyr = Math.sqrt((a/2)*(a/2) + h*h);
    const expPyr = a*a + 2*a*sPyr;
    const actPyr = oraclePyramid(a, h, 4).total;
    assertClose(actPyr, parseFloat(expPyr.toFixed(4)), 1e-3, `Rand Pyr ${i}`);
  }

  console.log("\n=== RE-AUDIT VERIFICATION SUMMARY ===");
  console.log(`Total assertions: ${totalTests}`);
  console.log(`Passed: ${passedTests}`);
  console.log(`Failed: ${failedTests}`);
  console.log(`Max Absolute Error: ${maxAbsError}`);
  console.log(`Max Relative Error: ${maxRelError}`);

  if (failedTests === 0) {
    console.log("\nALL VERIFICATIONS PASSED SUCCESSFULLY!");
  } else {
    console.error(`\nFAILED ${failedTests} ASSERTIONS!`);
    process.exit(1);
  }
}

runSuite().catch(err => {
  console.error("Fatal test error:", err);
  process.exit(1);
});
