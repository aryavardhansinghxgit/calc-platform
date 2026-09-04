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

console.log("=== RANDOMIZED & EDGE CASE AUDIT ===");

// 1. Check 5,000 valid random cases per major shape
let passedValid = 0;
let failedValid = 0;

for (let i = 0; i < 5000; i++) {
  // Cylinder
  const r = Math.random() * 100 + 0.1;
  const h = Math.random() * 100 + 0.1;
  const res = computeCylinderVolume(r, h, "m", 4);
  const expVol = Math.PI * r * r * h;
  const diff = Math.abs(res.volume - parseFloat(expVol.toFixed(4)));
  if (isNaN(res.volume) || !isFinite(res.volume) || diff > 0.001) {
    failedValid++;
  } else {
    passedValid++;
  }
}

for (let i = 0; i < 5000; i++) {
  // Sphere
  const r = Math.random() * 100 + 0.1;
  const res = computeSphereVolume(r, "m", 4);
  const expVol = (4 / 3) * Math.PI * Math.pow(r, 3);
  const diff = Math.abs(res.volume - parseFloat(expVol.toFixed(4)));
  if (isNaN(res.volume) || !isFinite(res.volume) || diff > 0.001) {
    failedValid++;
  } else {
    passedValid++;
  }
}

for (let i = 0; i < 5000; i++) {
  // Cone
  const r = Math.random() * 100 + 0.1;
  const h = Math.random() * 100 + 0.1;
  const res = computeConeVolume(r, h, "m", 4);
  const expVol = (1 / 3) * Math.PI * r * r * h;
  const diff = Math.abs(res.volume - parseFloat(expVol.toFixed(4)));
  if (isNaN(res.volume) || !isFinite(res.volume) || diff > 0.001) {
    failedValid++;
  } else {
    passedValid++;
  }
}

console.log(`Valid random cases tested: ${passedValid + failedValid}. Passed: ${passedValid}, Failed: ${failedValid}`);

// 2. Test Invalid / Degenerate Cases
console.log("\n--- Testing Invalid & Degenerate Cases ---");
console.log("Sphere r = 0:", computeSphereVolume(0));
console.log("Sphere r = -5:", computeSphereVolume(-5));
console.log("Cone r = 0, h = 10:", computeConeVolume(0, 10));
console.log("Cylinder r = -2, h = 5:", computeCylinderVolume(-2, 5));
console.log("Tank depth 10 > height 4:", computePrismVolume(10, 6, 4, 10));
console.log("Hollow tube inner 12 > outer 10:", computeTubeVolume(10, 12, 10));
console.log("Spherical cap h = 15 with R = 5 (h > 2R):", computeSphericalCapVolume(0, 5, 15));
