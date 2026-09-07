import {
  calculateMassFromDensity,
  convertMass,
  calculateCelestialWeight,
  DENSITY_UNITS_CATALOG,
  VOLUME_UNITS_CATALOG,
  MASS_UNITS,
  CELESTIAL_BODIES,
  formatMassPrecision,
} from "../src/lib/calculator-engine/formulas/mass";
import { MATERIAL_DATABASE } from "../src/lib/calculator-engine/formulas/density";

interface TestReport {
  passed: number;
  failed: number;
  failures: string[];
  maxAbsError: number;
  maxRelError: number;
}

const report: TestReport = {
  passed: 0,
  failed: 0,
  failures: [],
  maxAbsError: 0,
  maxRelError: 0,
};

function assert(condition: boolean, message: string) {
  if (condition) {
    report.passed++;
  } else {
    report.failed++;
    report.failures.push(message);
    if (report.failures.length <= 10) {
      console.error(`FAIL: ${message}`);
    }
  }
}

function updateErrors(expected: number, actual: number) {
  const abs = Math.abs(expected - actual);
  const rel = expected !== 0 ? abs / Math.abs(expected) : abs;
  if (abs > report.maxAbsError) report.maxAbsError = abs;
  if (rel > report.maxRelError) report.maxRelError = rel;
}

console.log("=== STARTING MASS CALCULATOR MATHEMATICAL AUDIT ===");

// -------------------------------------------------------------
// 1. MODULE A: GOLDEN TESTS & DENSITY EQUIVALENCE
// -------------------------------------------------------------
console.log("\n--- Testing Module A: Mass from Density & Volume ---");

// Reference case: 8900 kg/m³ × 1 m³ = 8900 kg
const refCase = calculateMassFromDensity({
  densityValue: 8900,
  densityUnitId: "kg_m3",
  volumeValue: 1,
  volumeUnitId: "m3",
});
assert(refCase.valid, "Reference case should be valid");
assert(Math.abs(refCase.massKg - 8900) < 1e-9, `Reference mass in kg expected 8900, got ${refCase.massKg}`);
assert(Math.abs(refCase.massGrams - 8900000) < 1e-6, `Reference mass in grams expected 8900000, got ${refCase.massGrams}`);
assert(Math.abs(refCase.massLbs - 19621.1413) < 0.01, `Reference mass in lbs expected ~19621.1413, got ${refCase.massLbs}`);
assert(Math.abs(refCase.massMetricTons - 8.9) < 1e-9, `Reference mass in metric tons expected 8.9, got ${refCase.massMetricTons}`);
updateErrors(8900, refCase.massKg);

// Density Equivalence Invariance:
// 8900 kg/m³ × 1 m³ = 8900 kg
// 8.9 g/cm³ × 1,000,000 cm³ = 8900 kg
// 8.9 kg/L × 1,000 L = 8900 kg
const eq1 = calculateMassFromDensity({
  densityValue: 8.9,
  densityUnitId: "g_cm3",
  volumeValue: 1000000,
  volumeUnitId: "cm3",
});
assert(eq1.valid && Math.abs(eq1.massKg - 8900) < 1e-6, `8.9 g/cm³ × 1e6 cm³ expected 8900 kg, got ${eq1.massKg}`);

const eq2 = calculateMassFromDensity({
  densityValue: 8.9,
  densityUnitId: "kg_L",
  volumeValue: 1000,
  volumeUnitId: "L",
});
assert(eq2.valid && Math.abs(eq2.massKg - 8900) < 1e-6, `8.9 kg/L × 1000 L expected 8900 kg, got ${eq2.massKg}`);

// Zero handling
const zeroD = calculateMassFromDensity({ densityValue: 0, densityUnitId: "kg_m3", volumeValue: 1, volumeUnitId: "m3" });
assert(zeroD.valid && zeroD.massKg === 0, "Zero density should produce 0 kg");

const zeroV = calculateMassFromDensity({ densityValue: 8900, densityUnitId: "kg_m3", volumeValue: 0, volumeUnitId: "m3" });
assert(zeroV.valid && zeroV.massKg === 0, "Zero volume should produce 0 kg");

const zeroBoth = calculateMassFromDensity({ densityValue: 0, densityUnitId: "kg_m3", volumeValue: 0, volumeUnitId: "m3" });
assert(zeroBoth.valid && zeroBoth.massKg === 0, "Zero density & zero volume should produce 0 kg");

// Negative inputs rejection
const negD = calculateMassFromDensity({ densityValue: -10, densityUnitId: "kg_m3", volumeValue: 1, volumeUnitId: "m3" });
assert(!negD.valid && Boolean(negD.error?.includes("negative")), "Negative density must be rejected");

const negV = calculateMassFromDensity({ densityValue: 10, densityUnitId: "kg_m3", volumeValue: -1, volumeUnitId: "m3" });
assert(!negV.valid && Boolean(negV.error?.includes("negative")), "Negative volume must be rejected");

// Non-finite
const nanCase = calculateMassFromDensity({ densityValue: NaN, densityUnitId: "kg_m3", volumeValue: 1, volumeUnitId: "m3" });
assert(!nanCase.valid, "NaN density must be rejected");

// -------------------------------------------------------------
// 2. DENSITY UNITS CATALOG TESTING (ALL 40+ UNITS)
// -------------------------------------------------------------
console.log(`\n--- Testing All ${DENSITY_UNITS_CATALOG.length} Density Units ---`);
assert(DENSITY_UNITS_CATALOG.length >= 35, `Catalog must have at least 35 density units (found ${DENSITY_UNITS_CATALOG.length})`);

for (const dUnit of DENSITY_UNITS_CATALOG) {
  // Test 100 [dUnit] × 1 m³
  const expectedKg = 100 * dUnit.toKgM3 * 1.0;
  const res = calculateMassFromDensity({
    densityValue: 100,
    densityUnitId: dUnit.id,
    volumeValue: 1,
    volumeUnitId: "m3",
  });
  assert(res.valid, `Density unit ${dUnit.id} calculation failed`);
  const relDiff = Math.abs(res.massKg - expectedKg) / expectedKg;
  assert(relDiff < 1e-7, `Density unit ${dUnit.id} mismatch: expected ${expectedKg}, got ${res.massKg}`);
  updateErrors(expectedKg, res.massKg);
}

// -------------------------------------------------------------
// 3. VOLUME UNITS CATALOG TESTING (ALL 18+ UNITS)
// -------------------------------------------------------------
console.log(`\n--- Testing All ${VOLUME_UNITS_CATALOG.length} Volume Units ---`);
assert(VOLUME_UNITS_CATALOG.length >= 18, `Catalog must have at least 18 volume units (found ${VOLUME_UNITS_CATALOG.length})`);

for (const vUnit of VOLUME_UNITS_CATALOG) {
  // Test 1000 kg/m³ (water) × 10 [vUnit]
  const expectedKg = 1000 * (10 * vUnit.toM3);
  const res = calculateMassFromDensity({
    densityValue: 1000,
    densityUnitId: "kg_m3",
    volumeValue: 10,
    volumeUnitId: vUnit.id,
  });
  assert(res.valid, `Volume unit ${vUnit.id} calculation failed`);
  const relDiff = Math.abs(res.massKg - expectedKg) / expectedKg;
  assert(relDiff < 1e-7, `Volume unit ${vUnit.id} mismatch: expected ${expectedKg}, got ${res.massKg}`);
  updateErrors(expectedKg, res.massKg);
}

// Check US vs UK gallon difference
const galUS = VOLUME_UNITS_CATALOG.find((u) => u.id === "gal_us")!;
const galUK = VOLUME_UNITS_CATALOG.find((u) => u.id === "gal_uk")!;
assert(Boolean(galUS && galUK), "Both US and UK gallons must exist in catalog");
assert(Math.abs(galUS.toM3 - 0.003785411784) < 1e-12, "US gallon factor must match 3.785411784 L");
assert(Math.abs(galUK.toM3 - 0.00454609) < 1e-12, "UK gallon factor must match 4.54609 L");
assert(galUS.toM3 !== galUK.toM3, "US and UK gallons must not be identical");

// -------------------------------------------------------------
// 4. MATERIAL DATABASE PRESETS TESTING
// -------------------------------------------------------------
console.log(`\n--- Testing All ${MATERIAL_DATABASE.length} Material Presets ---`);
assert(MATERIAL_DATABASE.length >= 35, `Material database must contain at least 35 presets (found ${MATERIAL_DATABASE.length})`);

for (const mat of MATERIAL_DATABASE) {
  assert(mat.densityKgM3 > 0, `Material ${mat.name} must have positive density`);
  // Mass for 1 m³ should equal densityKgM3
  const res = calculateMassFromDensity({
    densityValue: mat.densityKgM3,
    densityUnitId: "kg_m3",
    volumeValue: 1,
    volumeUnitId: "m3",
  });
  assert(res.valid && Math.abs(res.massKg - mat.densityKgM3) < 1e-9, `Preset ${mat.name} mass mismatch`);
  
  // Volume linearity: 2 m³ must double mass
  const res2 = calculateMassFromDensity({
    densityValue: mat.densityKgM3,
    densityUnitId: "kg_m3",
    volumeValue: 2,
    volumeUnitId: "m3",
  });
  assert(res2.valid && Math.abs(res2.massKg - 2 * mat.densityKgM3) < 1e-9, `Preset ${mat.name} volume doubling failed`);
}

// -------------------------------------------------------------
// 5. MODULE B: UNIVERSAL MASS CONVERTER & GOLDEN CASES
// -------------------------------------------------------------
console.log(`\n--- Testing Module B: Universal Mass Converter (${MASS_UNITS.length} Units) ---`);
assert(MASS_UNITS.length >= 15, `Mass units catalog must have at least 15 units (found ${MASS_UNITS.length})`);

// TC-M01: 1 kg -> lb ≈ 2.2046226218487757 lb
const tcM01 = convertMass("kg", "lb", 1);
assert(tcM01.valid, "TC-M01 should be valid");
assert(Math.abs(tcM01.outputValue - (1 / 0.45359237)) < 1e-9, `TC-M01 expected ~2.2046226218, got ${tcM01.outputValue}`);
updateErrors(1 / 0.45359237, tcM01.outputValue);

// TC-M02: 1 lb -> kg = 0.45359237 kg exact
const tcM02 = convertMass("lb", "kg", 1);
assert(tcM02.valid, "TC-M02 should be valid");
assert(Math.abs(tcM02.outputValue - 0.45359237) < 1e-12, `TC-M02 expected 0.45359237, got ${tcM02.outputValue}`);
updateErrors(0.45359237, tcM02.outputValue);

// TC-M03: 1 oz -> g = 28.349523125 g exact
const tcM03 = convertMass("oz", "g", 1);
assert(tcM03.valid, "TC-M03 should be valid");
assert(Math.abs(tcM03.outputValue - 28.349523125) < 1e-10, `TC-M03 expected 28.349523125, got ${tcM03.outputValue}`);
updateErrors(28.349523125, tcM03.outputValue);

// TC-M04: 1 stone -> kg = 6.35029318 kg exact
const tcM04 = convertMass("st", "kg", 1);
assert(tcM04.valid, "TC-M04 should be valid");
assert(Math.abs(tcM04.outputValue - 6.35029318) < 1e-10, `TC-M04 expected 6.35029318, got ${tcM04.outputValue}`);
updateErrors(6.35029318, tcM04.outputValue);

// TC-M05: 1 metric tonne -> kg = 1000 kg exact
const tcM05 = convertMass("t", "kg", 1);
assert(tcM05.valid && Math.abs(tcM05.outputValue - 1000) < 1e-12, `TC-M05 expected 1000, got ${tcM05.outputValue}`);

// TC-M06: 1 short ton (US) -> kg = 907.18474 kg exact
const tcM06 = convertMass("short_ton", "kg", 1);
assert(tcM06.valid && Math.abs(tcM06.outputValue - 907.18474) < 1e-10, `TC-M06 expected 907.18474, got ${tcM06.outputValue}`);

// TC-M07: 1 long ton (UK) -> kg = 1016.0469088 kg exact
const tcM07 = convertMass("long_ton", "kg", 1);
assert(tcM07.valid && Math.abs(tcM07.outputValue - 1016.0469088) < 1e-10, `TC-M07 expected 1016.0469088, got ${tcM07.outputValue}`);

// Carat: 1 ct = 0.2 g = 0.0002 kg
const ctTest = convertMass("ct", "g", 1);
assert(ctTest.valid && Math.abs(ctTest.outputValue - 0.2) < 1e-12, `1 carat should be 0.2 g, got ${ctTest.outputValue}`);

// Grain: 1 gr = 64.79891 mg = 0.00006479891 kg
const grTest = convertMass("gr", "mg", 1);
assert(grTest.valid && Math.abs(grTest.outputValue - 64.79891) < 1e-10, `1 grain should be 64.79891 mg, got ${grTest.outputValue}`);

// Dalton / u: 1 u = 1.66053906660e-27 kg
const uTest = convertMass("u", "kg", 1);
assert(uTest.valid && Math.abs(uTest.outputValue - 1.66053906660e-27) < 1e-35, `1 u should be 1.66053906660e-27 kg`);

// -------------------------------------------------------------
// 6. REFERENCE WORKED EXAMPLE: 185.5 LB
// -------------------------------------------------------------
console.log("\n--- Testing PDF Reference Worked Example: 185.5 lb ---");

// Step 1: 185.5 lb -> kg
const exKg = convertMass("lb", "kg", 185.5);
assert(exKg.valid, "185.5 lb conversion should be valid");
const expectedExKg = 185.5 * 0.45359237; // 84.141384635 kg
assert(Math.abs(exKg.outputValue - expectedExKg) < 1e-9, `185.5 lb in kg expected ~84.14138, got ${exKg.outputValue}`);
updateErrors(expectedExKg, exKg.outputValue);

// Step 2: 185.5 lb -> UK stones
const exSt = convertMass("lb", "st", 185.5);
assert(exSt.valid, "185.5 lb to stones should be valid");
const expectedSt = 185.5 / 14; // 13.25 stones
assert(Math.abs(exSt.outputValue - expectedSt) < 1e-9, `185.5 lb in stones expected 13.25, got ${exSt.outputValue}`);
// Stones decomposition: 13 st + 0.25 st = 13 st + 3.5 lb
const wholeSt = Math.floor(exSt.outputValue);
const remLb = (exSt.outputValue - wholeSt) * 14;
assert(wholeSt === 13 && Math.abs(remLb - 3.5) < 1e-9, `Decomposed stones expected 13 st 3.5 lb, got ${wholeSt} st ${remLb} lb`);

// Step 3: Mars weight for this mass
// W_mars = m * g_mars = 84.141384635 * 3.711 = 312.248678... N
const marsW = exKg.outputValue * 3.711;
assert(Math.abs(marsW - 312.25) < 0.05, `Mars weight expected ~312.25 N, got ${marsW}`);

// -------------------------------------------------------------
// 7. MODULE C: PLANETARY WEIGHT VISUALIZER (W = m * g)
// -------------------------------------------------------------
console.log("\n--- Testing Module C: Planetary Weight Visualizer ---");
assert(CELESTIAL_BODIES.length >= 6, `Celestial bodies must have at least 6 items (found ${CELESTIAL_BODIES.length})`);

// 70 kg Golden Case
const p70 = calculateCelestialWeight(70);
assert(p70.valid, "70 kg planetary weight should be valid");

const earthRes = p70.bodyResults.find((b) => b.body.id === "earth")!;
const moonRes = p70.bodyResults.find((b) => b.body.id === "moon")!;
const marsRes = p70.bodyResults.find((b) => b.body.id === "mars")!;
const jupiterRes = p70.bodyResults.find((b) => b.body.id === "jupiter")!;

assert(Boolean(earthRes && moonRes && marsRes && jupiterRes), "Earth, Moon, Mars, Jupiter must exist in planetary results");

// Earth: 70 × 9.80665 = 686.4655 N
assert(Math.abs(earthRes.weightNewtons - 686.47) < 0.05, `Earth 70kg weight expected ~686.47 N, got ${earthRes.weightNewtons}`);
updateErrors(686.4655, earthRes.weightNewtons);

// Moon: 70 × 1.622 = 113.54 N
assert(Math.abs(moonRes.weightNewtons - 113.54) < 0.05, `Moon 70kg weight expected ~113.54 N, got ${moonRes.weightNewtons}`);
updateErrors(113.54, moonRes.weightNewtons);

// Mars: 70 × 3.711 = 259.77 N
assert(Math.abs(marsRes.weightNewtons - 259.77) < 0.05, `Mars 70kg weight expected ~259.77 N, got ${marsRes.weightNewtons}`);
updateErrors(259.77, marsRes.weightNewtons);

// Jupiter: 70 × 24.79 = 1735.3 N
assert(Math.abs(jupiterRes.weightNewtons - 1735.3) < 0.1, `Jupiter 70kg weight expected ~1735.3 N, got ${jupiterRes.weightNewtons}`);
updateErrors(1735.3, jupiterRes.weightNewtons);

// Linearity / Scaling: Doubling mass doubles force on all bodies
const p140 = calculateCelestialWeight(140);
for (let i = 0; i < p70.bodyResults.length; i++) {
  const b70 = p70.bodyResults[i];
  const b140 = p140.bodyResults[i];
  if (b70.weightNewtons > 0) {
    const ratio = b140.weightNewtons / b70.weightNewtons;
    assert(Math.abs(ratio - 2.0) < 0.02, `Body ${b70.body.name} did not scale linearly (ratio ${ratio})`);
  }
}

// -------------------------------------------------------------
// 8. MASS CONVERSION ALL-PAIRS ROUND-TRIP INVARIANCE
// -------------------------------------------------------------
console.log(`\n--- Testing Round-Trip Invariance Across All ${MASS_UNITS.length} Mass Units ---`);
let roundTripCount = 0;
for (const u1 of MASS_UNITS) {
  for (const u2 of MASS_UNITS) {
    const orig = 42.5;
    const fwd = convertMass(u1.id, u2.id, orig);
    const rev = convertMass(u2.id, u1.id, fwd.outputValue);
    assert(fwd.valid && rev.valid, `Conversion ${u1.id} -> ${u2.id} -> ${u1.id} failed`);
    const relDiff = Math.abs(rev.outputValue - orig) / orig;
    assert(relDiff < 1e-7, `Round-trip error ${u1.id} <-> ${u2.id}: expected ${orig}, got ${rev.outputValue}`);
    updateErrors(orig, rev.outputValue);
    roundTripCount++;
  }
}
console.log(`Verified ${roundTripCount} mass conversion pair round-trips.`);

// -------------------------------------------------------------
// 9. LARGE-SCALE RANDOMIZED PROPERTY TESTING (30,000+ TESTS)
// -------------------------------------------------------------
console.log("\n--- Running Large-Scale Randomized Property Testing (30,000+ Assertions) ---");

// Test 1: 10,000 randomized density-volume combinations
let randDensityPassed = 0;
for (let i = 0; i < 10000; i++) {
  const dUnit = DENSITY_UNITS_CATALOG[Math.floor(Math.random() * DENSITY_UNITS_CATALOG.length)];
  const vUnit = VOLUME_UNITS_CATALOG[Math.floor(Math.random() * VOLUME_UNITS_CATALOG.length)];
  const dVal = Math.random() * 10000 + 0.01;
  const vVal = Math.random() * 1000 + 0.001;

  // Independent Oracle calculation
  const oracleKg = (dVal * dUnit.toKgM3) * (vVal * vUnit.toM3);

  const res = calculateMassFromDensity({
    densityValue: dVal,
    densityUnitId: dUnit.id,
    volumeValue: vVal,
    volumeUnitId: vUnit.id,
  });

  const relDiff = Math.abs(res.massKg - oracleKg) / oracleKg;
  if (res.valid && relDiff < 1e-7) {
    randDensityPassed++;
    report.passed++;
  } else {
    report.failed++;
    report.failures.push(`Random density-volume failed at iter ${i}: oracle ${oracleKg}, got ${res.massKg}`);
  }
  updateErrors(oracleKg, res.massKg);
}
console.log(`Randomized Density-Volume Tests: ${randDensityPassed} / 10000 passed.`);

// Test 2: 10,000 randomized mass conversions
let randConvPassed = 0;
for (let i = 0; i < 10000; i++) {
  const uFrom = MASS_UNITS[Math.floor(Math.random() * MASS_UNITS.length)];
  const uTo = MASS_UNITS[Math.floor(Math.random() * MASS_UNITS.length)];
  const val = Math.random() * 50000 + 0.001;

  // Oracle calculation
  const oracleTarget = (val * uFrom.toKg) / uTo.toKg;

  const res = convertMass(uFrom.id, uTo.id, val);
  const relDiff = Math.abs(res.outputValue - oracleTarget) / oracleTarget;
  if (res.valid && relDiff < 1e-7) {
    randConvPassed++;
    report.passed++;
  } else {
    report.failed++;
    report.failures.push(`Random conversion failed at iter ${i}: oracle ${oracleTarget}, got ${res.outputValue}`);
  }
  updateErrors(oracleTarget, res.outputValue);
}
console.log(`Randomized Mass Conversion Tests: ${randConvPassed} / 10000 passed.`);

// Test 3: 5,000 randomized planetary weight calculations
let randPlanetPassed = 0;
for (let i = 0; i < 5000; i++) {
  const m = Math.random() * 1000 + 0.1;
  const res = calculateCelestialWeight(m);

  let allBodiesOk = true;
  for (const bRes of res.bodyResults) {
    const oracleN = m * bRes.body.surfaceGravity;
    // Account for 2-decimal rounding in output
    const diff = Math.abs(bRes.weightNewtons - oracleN);
    if (diff > 0.05) {
      allBodiesOk = false;
      break;
    }
    updateErrors(oracleN, bRes.weightNewtons);
  }

  if (res.valid && allBodiesOk) {
    randPlanetPassed++;
    report.passed++;
  } else {
    report.failed++;
    report.failures.push(`Random planetary failed at iter ${i} for mass ${m}`);
  }
}
console.log(`Randomized Planetary Weight Tests: ${randPlanetPassed} / 5000 passed.`);

// Test 4: 5,000 round-trip conversion property tests
let randRtPassed = 0;
for (let i = 0; i < 5000; i++) {
  const u1 = MASS_UNITS[Math.floor(Math.random() * MASS_UNITS.length)];
  const u2 = MASS_UNITS[Math.floor(Math.random() * MASS_UNITS.length)];
  const val = Math.random() * 10000 + 0.0001;

  const fwd = convertMass(u1.id, u2.id, val);
  const rev = convertMass(u2.id, u1.id, fwd.outputValue);

  const relDiff = Math.abs(rev.outputValue - val) / val;
  if (fwd.valid && rev.valid && relDiff < 1e-7) {
    randRtPassed++;
    report.passed++;
  } else {
    report.failed++;
    report.failures.push(`Random round-trip failed at iter ${i}: original ${val}, restored ${rev.outputValue}`);
  }
  updateErrors(val, rev.outputValue);
}
console.log(`Randomized Round-Trip Tests: ${randRtPassed} / 5000 passed.`);

console.log("\n=======================================================");
console.log("MATHEMATICAL AUDIT SUMMARY");
console.log(`Total Assertions Evaluated: ${report.passed + report.failed}`);
console.log(`Passed: ${report.passed}`);
console.log(`Failed: ${report.failed}`);
console.log(`Max Absolute Error: ${report.maxAbsError}`);
console.log(`Max Relative Error: ${report.maxRelError}`);
console.log("=======================================================");

if (report.failed > 0) {
  console.error("Failures logged (first 10):", report.failures.slice(0, 10));
  process.exit(1);
} else {
  console.log(">>> ALL MATHEMATICAL AND CONVERSION ASSERTIONS PASSED (100%) <<<");
}
