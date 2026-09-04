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
  toMeters
} from "../src/app/calculators/volume-calculator/volume-logic";

console.log("=== PHASE 2: MATHEMATICAL GOLDEN-CASE TESTING ===");

// A. Cylinder
console.log("\n--- A. Cylinder ---");
const cylA = computeCylinderVolume(5, 10, "m", 4);
const expectedCylAVol = 250 * Math.PI; // ~785.398163...
const expectedCylASA = 2 * Math.PI * 5 * 15; // 150 * PI ~ 471.238898...
console.log(`Cylinder (r=5, h=10): Vol=${cylA.volume} (exp ${expectedCylAVol.toFixed(4)}), SA=${cylA.surfaceArea} (exp ${expectedCylASA.toFixed(4)})`);

const cylA2 = computeCylinderVolume(4, 10, "m", 4);
const expectedCylA2Vol = 160 * Math.PI; // ~502.6548245...
const expectedCylA2SA = 2 * Math.PI * 4 * 14; // 112 * PI ~ 351.858377...
console.log(`Cylinder (r=4, h=10): Vol=${cylA2.volume} (exp ${expectedCylA2Vol.toFixed(4)}), SA=${cylA2.surfaceArea} (exp ${expectedCylA2SA.toFixed(4)})`);

// B. Rectangular Tank
console.log("\n--- B. Rectangular Tank ---");
const tank = computePrismVolume(10, 6, 4, 3, "ft", 4);
console.log(`Tank (10x6x4, fill=3 ft):`);
console.log(`Total Vol=${tank.volume} ft³ (exp 240)`);
console.log(`Filled Vol=${tank.filledVolume} ft³ (exp 180)`);
console.log(`Remaining Air Vol=${tank.emptyVolume} ft³ (exp 60)`);
console.log(`Capacity Liters in current logic=${tank.capacityLiters}`);
const ft3ToLiters = Math.pow(0.3048, 3) * 1000;
console.log(`True 240 ft³ in Liters = ${(240 * ft3ToLiters).toFixed(4)}`);
console.log(`True 180 ft³ in Liters = ${(180 * ft3ToLiters).toFixed(4)}`);
console.log(`True 180 ft³ in US Gal = ${(180 * ft3ToLiters * 0.264172052).toFixed(4)}`);

// C. Sphere
console.log("\n--- C. Sphere ---");
const sph = computeSphereVolume(4, "m", 4);
const expectedSphVol = (256 * Math.PI) / 3; // ~268.082573...
const expectedSphSA = 64 * Math.PI; // ~201.0619298...
console.log(`Sphere (r=4): Vol=${sph.volume} (exp ${expectedSphVol.toFixed(4)}), SA=${sph.surfaceArea} (exp ${expectedSphSA.toFixed(4)})`);

// D. Cone
console.log("\n--- D. Cone ---");
const cone = computeConeVolume(5, 12, "m", 4);
const expConeVol = 100 * Math.PI; // ~314.159265...
const expConeSlant = 13;
const expConeSA = 90 * Math.PI; // ~282.7433388...
console.log(`Cone (r=5, h=12): Vol=${cone.volume} (exp ${expConeVol.toFixed(4)}), Slant=${cone.slantHeight} (exp 13), SA=${cone.surfaceArea} (exp ${expConeSA.toFixed(4)})`);

// F. Cube & Rectangular Prism
console.log("\n--- F. Cube & Rectangular Prism ---");
const cube = computeCubeVolume(5, "m", 4);
console.log(`Cube (a=5): Vol=${cube.volume} (exp 125), SA=${cube.surfaceArea} (exp 150)`);
const prism = computePrismVolume(10, 6, 4, undefined, "m", 4);
console.log(`Prism (10x6x4): Vol=${prism.volume} (exp 240), SA=${prism.surfaceArea} (exp 248)`);

// G. Ellipsoid
console.log("\n--- G. Ellipsoid ---");
const ell = computeEllipsoidVolume(2, 3, 4, "m", 4);
const expEllVol = 32 * Math.PI; // ~100.5309649...
console.log(`Ellipsoid (a=2, b=3, c=4): Vol=${ell.volume} (exp ${expEllVol.toFixed(4)}), SA=${ell.surfaceArea}`);

// H. Spherical Cap
console.log("\n--- H. Spherical Cap ---");
// If R=5, h=2 -> V = (1/3)*pi*h^2*(3R - h) = (1/3)*pi*4*(15 - 2) = 52*pi/3 ~ 54.45427
const cap1 = computeSphericalCapVolume(0, 5, 2, "m", 4);
const expCap1 = (52 * Math.PI) / 3;
console.log(`Spherical Cap (R=5, h=2): Vol=${cap1.volume} (exp ${expCap1.toFixed(4)})`);

// I. Conical Frustum
console.log("\n--- I. Conical Frustum ---");
// r1=5, r2=3, h=10 -> V = (10*pi/3)*(25 + 15 + 9) = 490*pi/3 ~ 513.1268
const frust = computeFrustumVolume(3, 5, 10, "m", 4);
const expFrustVol = (490 * Math.PI) / 3;
console.log(`Frustum (r1=3, r2=5, h=10): Vol=${frust.volume} (exp ${expFrustVol.toFixed(4)})`);

// J. Square Pyramid
console.log("\n--- J. Square Pyramid ---");
// a=6, h=10 -> V = (1/3)*36*10 = 120
const pyr = computePyramidVolume(6, 10, "m", 4);
console.log(`Pyramid (a=6, h=10): Vol=${pyr.volume} (exp 120)`);

// K. Hollow Tube
console.log("\n--- K. Hollow Tube ---");
// R=5, r=3, h=10 -> diameter d1=10, d2=6, length=10
// V = pi*h*(R^2 - r^2) = pi*10*(25 - 9) = 160*pi ~ 502.6548
const tube = computeTubeVolume(10, 6, 10, "m", 4);
const expTubeVol = 160 * Math.PI;
console.log(`Hollow Tube (d1=10, d2=6, l=10): Vol=${tube.volume} (exp ${expTubeVol.toFixed(4)}), thickness=${tube.wallThickness} (exp 2)`);

// L. Capsule
console.log("\n--- L. Capsule ---");
// r=3, h=8 -> V = pi*9*8 + (4/3)*pi*27 = 72*pi + 36*pi = 108*pi ~ 339.2920
const cap = computeCapsuleVolume(3, 8, "m", 4);
const expCapVol = 108 * Math.PI;
console.log(`Capsule (r=3, h=8): Vol=${cap.volume} (exp ${expCapVol.toFixed(4)})`);

console.log("\n=== PHASE 3: UNIT CONVERSION AUDIT ===");
const conv1m3 = convertVolumeFromCubicMeters(1, 6);
console.log("1 m3 conversions:");
console.log("Liters:", conv1m3.liters, "exp: 1000");
console.log("mL:", conv1m3.milliliters, "exp: 1000000");
console.log("US Gal:", conv1m3.usGallons, "exp: ~264.172052");
console.log("Cu Ft:", conv1m3.cubicFeet, "exp: ~35.314667");
console.log("Cu In:", conv1m3.cubicInches, "exp: ~61023.7441");
console.log("Cu Yd:", conv1m3.cubicYards, "exp: ~1.307951");
