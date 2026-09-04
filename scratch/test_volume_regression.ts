import {
  computeSphereVolume,
  computeConeVolume,
  computeCylinderVolume,
  computeCubeVolume,
  computePrismVolume,
  computeCapsuleVolume,
  computeSphericalCapVolume,
  computeFrustumVolume,
  computeEllipsoidVolume,
  computePyramidVolume,
  computeTubeVolume,
  convertVolumeFromCubicMeters,
  formatNumber,
  toMeters
} from "../src/app/calculators/volume-calculator/volume-logic";

console.log("==================================================");
console.log("VOLUME CALCULATOR MASTER REGRESSION TEST SUITE");
console.log("==================================================");

let totalPassed = 0;
let totalFailed = 0;

function assert(condition: boolean, testName: string, details?: any) {
  if (condition) {
    totalPassed++;
    console.log(`[PASS] ${testName}`);
  } else {
    totalFailed++;
    console.error(`[FAIL] ${testName}`, details ?? "");
  }
}

// ----------------------------------------------------
// 1. RECTANGULAR TANK CAPACITY REGRESSION (FIX P0-1)
// ----------------------------------------------------
console.log("\n--- Test 1: Tank Capacity Separation (10x6x4 ft, fill=3 ft) ---");
const tankRes = computePrismVolume(10, 6, 4, 3, "ft", 4);
assert(tankRes.totalTankVolume === 240, "Total tank volume === 240 ft³", tankRes.totalTankVolume);
assert(tankRes.liquidVolume === 180, "Liquid volume === 180 ft³", tankRes.liquidVolume);
assert(tankRes.remainingAirVolume === 60, "Remaining air volume === 60 ft³", tankRes.remainingAirVolume);
assert(tankRes.formattedLiquidCapacityLiters === "5,097.0324", "Liquid capacity liters === 5,097.0324", tankRes.formattedLiquidCapacityLiters);
assert(tankRes.formattedLiquidCapacityUsGallons === "1,346.4935", "Liquid capacity gallons === 1,346.4935", tankRes.formattedLiquidCapacityUsGallons);
assert(tankRes.formattedTotalCapacityLiters === "6,796.0432", "Total tank capacity liters === 6,796.0432", tankRes.formattedTotalCapacityLiters);
assert(tankRes.formattedTotalCapacityUsGallons === "1,795.3247", "Total tank capacity gallons === 1,795.3247", tankRes.formattedTotalCapacityUsGallons);

// ----------------------------------------------------
// 2. PRECISION & TRAILING ZEROS REGRESSION (FIX P2-1)
// ----------------------------------------------------
console.log("\n--- Test 2: Precision & Trailing Zeros ---");
assert(formatNumber(125, 4) === "125.0000", "Preserves 4 trailing zeros for 125", formatNumber(125, 4));
assert(formatNumber(785.4, 2) === "785.40", "Preserves 2 decimals (785.40)", formatNumber(785.4, 2));
assert(formatNumber(100.531, 4) === "100.5310", "Preserves trailing zero on 100.5310", formatNumber(100.531, 4));
assert(formatNumber(0, 4) === "0.0000", "Preserves trailing zeros for 0", formatNumber(0, 4));

// ----------------------------------------------------
// 3. EXPLICIT VALIDATION & NO SILENT CLAMPING (FIX P0-2)
// ----------------------------------------------------
console.log("\n--- Test 3: Input Validation & Error Propagation ---");
// Tank depth > height
const tankOverflow = computePrismVolume(10, 6, 4, 5, "ft", 4);
assert(tankOverflow.error !== undefined, "Tank rejects liquid depth 5 > height 4", tankOverflow.error);

// Tank negative depth
const tankNegDepth = computePrismVolume(10, 6, 4, -1, "ft", 4);
assert(tankNegDepth.error !== undefined, "Tank rejects negative liquid depth", tankNegDepth.error);

// Hollow tube inner >= outer
const tubeInvalid = computeTubeVolume(10, 10, 20, "m", 4);
assert(tubeInvalid.error !== undefined, "Hollow tube rejects inner diameter >= outer diameter", tubeInvalid.error);

const tubeInvalid2 = computeTubeVolume(10, 12, 20, "m", 4);
assert(tubeInvalid2.error !== undefined, "Hollow tube rejects inner diameter 12 > outer diameter 10", tubeInvalid2.error);

// Spherical cap height > 2R
const capOverflow = computeSphericalCapVolume(0, 5, 12, "m", 4);
assert(capOverflow.error !== undefined, "Spherical cap rejects h (12) > 2R (10)", capOverflow.error);

// Negative radius
const sphNeg = computeSphereVolume(-3, "m", 4);
assert(sphNeg.error !== undefined, "Sphere rejects negative radius", sphNeg.error);

const cylNeg = computeCylinderVolume(-5, 10, "m", 4);
assert(cylNeg.error !== undefined, "Cylinder rejects negative radius", cylNeg.error);

// Zero radius handling
const sphZero = computeSphereVolume(0, "m", 4);
assert(sphZero.volume === 0 && sphZero.error === undefined, "Sphere with r=0 correctly has volume 0", sphZero.volume);

// ----------------------------------------------------
// 4. GOLDEN MATHEMATICAL VERIFICATION
// ----------------------------------------------------
console.log("\n--- Test 4: Golden Shapes ---");
// Cylinder r=5, h=10
const cyl510 = computeCylinderVolume(5, 10, "m", 4);
assert(Math.abs(cyl510.volume - 250 * Math.PI) < 1e-6, "Cylinder r=5 h=10 exact volume 250*pi");
assert(cyl510.formattedVolume === "785.3982", "Cylinder r=5 h=10 formatted === 785.3982");
assert(cyl510.formattedSurfaceArea === "471.2389", "Cylinder r=5 h=10 SA === 471.2389");

// Cylinder r=4, h=10
const cyl410 = computeCylinderVolume(4, 10, "m", 4);
assert(cyl410.formattedVolume === "502.6548", "Cylinder r=4 h=10 formatted === 502.6548");
assert(cyl410.formattedSurfaceArea === "351.8584", "Cylinder r=4 h=10 SA === 351.8584");

// Sphere r=4
const sph4 = computeSphereVolume(4, "m", 4);
assert(sph4.formattedVolume === "268.0826", "Sphere r=4 formatted === 268.0826");
assert(sph4.formattedSurfaceArea === "201.0619", "Sphere r=4 SA === 201.0619");

// Cone r=5, h=12
const cone512 = computeConeVolume(5, 12, "m", 4);
assert(cone512.formattedVolume === "314.1593", "Cone r=5 h=12 formatted === 314.1593");
assert(cone512.formattedSlantHeight === "13.0000", "Cone r=5 h=12 slant === 13.0000");
assert(cone512.formattedSurfaceArea === "282.7433", "Cone r=5 h=12 SA === 282.7433");

// Cube a=5
const cube5 = computeCubeVolume(5, "m", 4);
assert(cube5.formattedVolume === "125.0000", "Cube a=5 formatted === 125.0000");
assert(cube5.formattedSurfaceArea === "150.0000", "Cube a=5 SA === 150.0000");

// Prism 10x6x4
const prism10 = computePrismVolume(10, 6, 4, undefined, "m", 4);
assert(prism10.formattedVolume === "240.0000", "Prism 10x6x4 formatted === 240.0000");
assert(prism10.formattedSurfaceArea === "248.0000", "Prism 10x6x4 SA === 248.0000");

// Ellipsoid 2, 3, 4
const ell234 = computeEllipsoidVolume(2, 3, 4, "m", 4);
assert(ell234.formattedVolume === "100.5310", "Ellipsoid 2,3,4 formatted === 100.5310");

// Spherical Cap R=5, h=2
const capR5h2 = computeSphericalCapVolume(0, 5, 2, "m", 4);
assert(capR5h2.formattedVolume === "54.4543", "Cap R=5 h=2 formatted === 54.4543");

// Conical Frustum r=3, R=5, h=10
const frust35 = computeFrustumVolume(3, 5, 10, "m", 4);
assert(frust35.formattedVolume === "513.1268", "Frustum r=3 R=5 h=10 formatted === 513.1268");

// Square Pyramid a=6, h=10
const pyr610 = computePyramidVolume(6, 10, "m", 4);
assert(pyr610.formattedVolume === "120.0000", "Pyramid a=6 h=10 formatted === 120.0000");

// Hollow Tube d1=10, d2=6, l=10
const tube106 = computeTubeVolume(10, 6, 10, "m", 4);
assert(tube106.formattedVolume === "502.6548", "Hollow Tube d1=10 d2=6 l=10 formatted === 502.6548");
assert(tube106.formattedWallThickness === "2.0000", "Hollow Tube thickness === 2.0000");

// Capsule r=3, h=8
const cap38 = computeCapsuleVolume(3, 8, "m", 4);
assert(cap38.formattedVolume === "339.2920", "Capsule r=3 h=8 formatted === 339.2920");

// ----------------------------------------------------
// 5. RANDOMIZED PROPERTY TESTING (25,000 CASES)
// ----------------------------------------------------
console.log("\n--- Test 5: Randomized Property Tests (25,000 cases) ---");
let randFailed = 0;

for (let i = 0; i < 5000; i++) {
  const r = Math.random() * 50 + 0.1;
  const h = Math.random() * 50 + 0.1;
  const c = computeCylinderVolume(r, h, "m", 4);
  const exp = Math.PI * r * r * h;
  if (Math.abs(c.volume - exp) > 1e-7 || isNaN(c.volume)) randFailed++;
}

for (let i = 0; i < 5000; i++) {
  const r = Math.random() * 50 + 0.1;
  const s = computeSphereVolume(r, "m", 4);
  const exp = (4 / 3) * Math.PI * Math.pow(r, 3);
  if (Math.abs(s.volume - exp) > 1e-7 || isNaN(s.volume)) randFailed++;
}

for (let i = 0; i < 5000; i++) {
  const r = Math.random() * 50 + 0.1;
  const h = Math.random() * 50 + 0.1;
  const cn = computeConeVolume(r, h, "m", 4);
  const exp = (1 / 3) * Math.PI * r * r * h;
  if (Math.abs(cn.volume - exp) > 1e-7 || isNaN(cn.volume)) randFailed++;
}

for (let i = 0; i < 5000; i++) {
  const l = Math.random() * 50 + 0.1;
  const w = Math.random() * 50 + 0.1;
  const h = Math.random() * 50 + 0.1;
  const p = computePrismVolume(l, w, h, undefined, "m", 4);
  const exp = l * w * h;
  if (Math.abs(p.totalTankVolume - exp) > 1e-7 || isNaN(p.totalTankVolume)) randFailed++;
}

for (let i = 0; i < 5000; i++) {
  const r = Math.random() * 20 + 0.1;
  const h = Math.random() * 50 + 0.1;
  const cp = computeCapsuleVolume(r, h, "m", 4);
  const exp = Math.PI * r * r * h + (4 / 3) * Math.PI * Math.pow(r, 3);
  if (Math.abs(cp.volume - exp) > 1e-7 || isNaN(cp.volume)) randFailed++;
}

assert(randFailed === 0, "25,000 valid randomized test cases passed with 0 failures", randFailed);

// ----------------------------------------------------
// 6. INVALID DEGENERATE PROPERTY TESTING (1,000 CASES)
// ----------------------------------------------------
console.log("\n--- Test 6: Invalid & Degenerate Cases (1,000 cases) ---");
let invalidRejected = 0;

for (let i = 0; i < 200; i++) {
  const negR = -(Math.random() * 50 + 0.1);
  if (computeSphereVolume(negR).error) invalidRejected++;
}

for (let i = 0; i < 200; i++) {
  const h = Math.random() * 20 + 1;
  const overflowFill = h + Math.random() * 10 + 0.1;
  if (computePrismVolume(10, 10, h, overflowFill).error) invalidRejected++;
}

for (let i = 0; i < 200; i++) {
  const d1 = Math.random() * 20 + 1;
  const d2 = d1 + Math.random() * 10;
  if (computeTubeVolume(d1, d2, 10).error) invalidRejected++;
}

for (let i = 0; i < 200; i++) {
  const R = Math.random() * 20 + 1;
  const badH = 2 * R + Math.random() * 10 + 0.1;
  if (computeSphericalCapVolume(0, R, badH).error) invalidRejected++;
}

for (let i = 0; i < 200; i++) {
  const negL = -(Math.random() * 20 + 0.1);
  if (computePrismVolume(negL, 10, 10).error) invalidRejected++;
}

assert(invalidRejected === 1000, "1,000 degenerate/invalid cases explicitly rejected with error", invalidRejected);

console.log("\n==================================================");
console.log(`FINAL RESULT: Passed=${totalPassed}, Failed=${totalFailed}`);
console.log("==================================================");

if (totalFailed > 0) process.exit(1);
