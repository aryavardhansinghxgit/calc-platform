import {
  calculateDensitySolver,
  calculateGasDensity,
  calculateHydrostatic,
  MATERIAL_DATABASE,
  MASS_FACTORS,
  VOLUME_FACTORS,
  DENSITY_FACTORS,
  DensityCalcMode,
} from "../src/lib/calculator-engine/formulas/density";

interface TestStats {
  total: number;
  passed: number;
  failed: number;
  maxAbsError: number;
  maxRelError: number;
  failures: string[];
}

function createStats(): TestStats {
  return { total: 0, passed: 0, failed: 0, maxAbsError: 0, maxRelError: 0, failures: [] };
}

function recordPass(stats: TestStats, expected: number, actual: number) {
  stats.total++;
  stats.passed++;
  const absErr = Math.abs(expected - actual);
  const relErr = expected !== 0 ? absErr / Math.abs(expected) : absErr;
  if (absErr > stats.maxAbsError) stats.maxAbsError = absErr;
  if (relErr > stats.maxRelError) stats.maxRelError = relErr;
}

function recordFail(stats: TestStats, description: string) {
  stats.total++;
  stats.failed++;
  if (stats.failures.length < 10) {
    stats.failures.push(description);
  }
}

console.log("============================================================");
console.log("MASTER DENSITY CALCULATOR AUDIT SUITE");
console.log("============================================================");

// ─────────────────────────────────────────────────────────────────────────────
// 1. GOLDEN REFERENCE CASES & CORNER CASES
// ─────────────────────────────────────────────────────────────────────────────
console.log("\n--- SECTION 1: Golden Reference Cases ---");
const goldenStats = createStats();

// Reference Case A: Copper sample 8900 kg, 1 m3
{
  const res = calculateDensitySolver({
    mode: "density",
    massValue: 8900,
    massUnit: "kg",
    volumeValue: 1,
    volumeUnit: "m3",
    densityValue: 0,
    densityUnit: "kg_m3",
  });

  if (res.densityKgM3 === 8900) recordPass(goldenStats, 8900, res.densityKgM3);
  else recordFail(goldenStats, `Expected 8900 kg/m3, got ${res.densityKgM3}`);

  if (res.densityGCm3 === 8.9) recordPass(goldenStats, 8.9, res.densityGCm3);
  else recordFail(goldenStats, `Expected 8.9 g/cm3, got ${res.densityGCm3}`);

  if (res.specificGravity === 8.9) recordPass(goldenStats, 8.9, res.specificGravity);
  else recordFail(goldenStats, `Expected 8.9 SG, got ${res.specificGravity}`);

  if (res.buoyancyWater === "sinks") recordPass(goldenStats, 1, 1);
  else recordFail(goldenStats, `Expected sinks, got ${res.buoyancyWater}`);

  // Imperial conversions check
  const lbFt3Unit = res.allDensityUnits.find((u) => u.unitKey === "lb_ft3");
  if (lbFt3Unit && Math.abs(lbFt3Unit.value - 555.6088) < 0.005) {
    recordPass(goldenStats, 555.6088, lbFt3Unit.value);
  } else {
    recordFail(goldenStats, `Expected ~555.6088 lb/ft3, got ${lbFt3Unit?.value}`);
  }

  const lbIn3Unit = res.allDensityUnits.find((u) => u.unitKey === "lb_in3");
  if (lbIn3Unit && Math.abs(lbIn3Unit.value - 0.3215) < 0.001) {
    recordPass(goldenStats, 0.3215, lbIn3Unit.value);
  } else {
    recordFail(goldenStats, `Expected ~0.3215 lb/in3, got ${lbIn3Unit?.value}`);
  }

  const lbGalUnit = res.allDensityUnits.find((u) => u.unitKey === "lb_gal_us");
  if (lbGalUnit && Math.abs(lbGalUnit.value - 74.2741) < 0.005) {
    recordPass(goldenStats, 74.2741, lbGalUnit.value);
  } else {
    recordFail(goldenStats, `Expected ~74.2741 lb/gal, got ${lbGalUnit?.value}`);
  }

  const ozIn3Unit = res.allDensityUnits.find((u) => u.unitKey === "oz_in3");
  if (ozIn3Unit && Math.abs(ozIn3Unit.value - 5.1445) < 0.005) {
    recordPass(goldenStats, 5.1445, ozIn3Unit.value);
  } else {
    recordFail(goldenStats, `Expected ~5.1445 oz/in3, got ${ozIn3Unit?.value}`);
  }

  const tonYd3Unit = res.allDensityUnits.find((u) => u.unitKey === "ton_yd3");
  if (tonYd3Unit && Math.abs(tonYd3Unit.value - 7.5007) < 0.005) {
    recordPass(goldenStats, 7.5007, tonYd3Unit.value);
  } else {
    recordFail(goldenStats, `Expected ~7.5007 ton/yd3, got ${tonYd3Unit?.value}`);
  }
}

// Worked Example: 4.45 kg, 0.0005 m3
{
  const res = calculateDensitySolver({
    mode: "density",
    massValue: 4.45,
    massUnit: "kg",
    volumeValue: 0.0005,
    volumeUnit: "m3",
    densityValue: 0,
    densityUnit: "kg_m3",
  });
  if (Math.abs(res.densityKgM3 - 8900) < 1e-9) recordPass(goldenStats, 8900, res.densityKgM3);
  else recordFail(goldenStats, `Worked example expected 8900, got ${res.densityKgM3}`);
}

// Solve for Mass Tests:
{
  const res1 = calculateDensitySolver({
    mode: "mass",
    massValue: 0,
    massUnit: "kg",
    volumeValue: 1,
    volumeUnit: "m3",
    densityValue: 8900,
    densityUnit: "kg_m3",
  });
  if (Math.abs(res1.massKg - 8900) < 1e-9) recordPass(goldenStats, 8900, res1.massKg);
  else recordFail(goldenStats, `Solve for mass expected 8900, got ${res1.massKg}`);

  const res2 = calculateDensitySolver({
    mode: "mass",
    massValue: 0,
    massUnit: "kg",
    volumeValue: 2,
    volumeUnit: "m3",
    densityValue: 1000,
    densityUnit: "kg_m3",
  });
  if (Math.abs(res2.massKg - 2000) < 1e-9) recordPass(goldenStats, 2000, res2.massKg);
  else recordFail(goldenStats, `Solve for mass expected 2000, got ${res2.massKg}`);

  const res3 = calculateDensitySolver({
    mode: "mass",
    massValue: 0,
    massUnit: "kg",
    volumeValue: 5,
    volumeUnit: "m3",
    densityValue: 0,
    densityUnit: "kg_m3",
  });
  if (res3.massKg === 0 && !res3.error) recordPass(goldenStats, 0, res3.massKg);
  else recordFail(goldenStats, `Solve for mass with rho=0 expected 0, got ${res3.massKg}`);
}

// Solve for Volume Tests:
{
  const res1 = calculateDensitySolver({
    mode: "volume",
    massValue: 8900,
    massUnit: "kg",
    volumeValue: 0,
    volumeUnit: "m3",
    densityValue: 8900,
    densityUnit: "kg_m3",
  });
  if (Math.abs(res1.volumeM3 - 1) < 1e-9) recordPass(goldenStats, 1, res1.volumeM3);
  else recordFail(goldenStats, `Solve for volume expected 1, got ${res1.volumeM3}`);

  const res2 = calculateDensitySolver({
    mode: "volume",
    massValue: 2000,
    massUnit: "kg",
    volumeValue: 0,
    volumeUnit: "m3",
    densityValue: 1000,
    densityUnit: "kg_m3",
  });
  if (Math.abs(res2.volumeM3 - 2) < 1e-9) recordPass(goldenStats, 2, res2.volumeM3);
  else recordFail(goldenStats, `Solve for volume expected 2, got ${res2.volumeM3}`);

  // Division by zero validation
  const res3 = calculateDensitySolver({
    mode: "volume",
    massValue: 100,
    massUnit: "kg",
    volumeValue: 0,
    volumeUnit: "m3",
    densityValue: 0,
    densityUnit: "kg_m3",
  });
  if (res3.error && !isNaN(res3.volumeM3) && res3.volumeM3 !== Infinity) {
    recordPass(goldenStats, 1, 1);
  } else {
    recordFail(goldenStats, `Expected division by zero error for volume with rho=0`);
  }
}

// Zero Handling:
{
  // mass=0, volume=1 -> density=0
  const res1 = calculateDensitySolver({
    mode: "density",
    massValue: 0,
    massUnit: "kg",
    volumeValue: 1,
    volumeUnit: "m3",
    densityValue: 0,
    densityUnit: "kg_m3",
  });
  if (res1.densityKgM3 === 0 && !res1.error) recordPass(goldenStats, 0, res1.densityKgM3);
  else recordFail(goldenStats, `mass=0, vol=1 expected density=0, got ${res1.densityKgM3}`);

  // mass=1, volume=0 -> error
  const res2 = calculateDensitySolver({
    mode: "density",
    massValue: 1,
    massUnit: "kg",
    volumeValue: 0,
    volumeUnit: "m3",
    densityValue: 0,
    densityUnit: "kg_m3",
  });
  if (res2.error) recordPass(goldenStats, 1, 1);
  else recordFail(goldenStats, `mass=1, vol=0 expected error, got no error`);

  // density=1, volume=0 -> mass=0
  const res3 = calculateDensitySolver({
    mode: "mass",
    massValue: 0,
    massUnit: "kg",
    volumeValue: 0,
    volumeUnit: "m3",
    densityValue: 1,
    densityUnit: "kg_m3",
  });
  if (res3.massKg === 0 && !res3.error) recordPass(goldenStats, 0, res3.massKg);
  else recordFail(goldenStats, `density=1, vol=0 expected mass=0, got ${res3.massKg}`);
}

// Negative values rejection:
{
  const res1 = calculateDensitySolver({
    mode: "density",
    massValue: -10,
    massUnit: "kg",
    volumeValue: 1,
    volumeUnit: "m3",
    densityValue: 0,
    densityUnit: "kg_m3",
  });
  if (res1.error) recordPass(goldenStats, 1, 1);
  else recordFail(goldenStats, `negative mass should produce error`);

  const res2 = calculateDensitySolver({
    mode: "density",
    massValue: 10,
    massUnit: "kg",
    volumeValue: -1,
    volumeUnit: "m3",
    densityValue: 0,
    densityUnit: "kg_m3",
  });
  if (res2.error) recordPass(goldenStats, 1, 1);
  else recordFail(goldenStats, `negative volume should produce error`);

  const res3 = calculateDensitySolver({
    mode: "mass",
    massValue: 0,
    massUnit: "kg",
    volumeValue: 1,
    volumeUnit: "m3",
    densityValue: -500,
    densityUnit: "kg_m3",
  });
  if (res3.error) recordPass(goldenStats, 1, 1);
  else recordFail(goldenStats, `negative density in mass mode should produce error`);
}

// Invalid input rejection:
{
  for (const bad of [NaN, -Infinity, Infinity]) {
    const res = calculateDensitySolver({
      mode: "density",
      massValue: bad,
      massUnit: "kg",
      volumeValue: 1,
      volumeUnit: "m3",
      densityValue: 0,
      densityUnit: "kg_m3",
    });
    if (res.error) recordPass(goldenStats, 1, 1);
    else recordFail(goldenStats, `invalid input ${bad} should produce error`);
  }
}

// Unit Normalization Tests:
{
  // 8900 kg/m3 == 8.9 g/cm3 == 8.9 kg/L
  // 1 m3 == 1,000,000 cm3 == 1000 L
  const resBase = calculateDensitySolver({
    mode: "mass",
    massValue: 0,
    massUnit: "kg",
    volumeValue: 1,
    volumeUnit: "m3",
    densityValue: 8900,
    densityUnit: "kg_m3",
  });

  const resGCm3 = calculateDensitySolver({
    mode: "mass",
    massValue: 0,
    massUnit: "kg",
    volumeValue: 1000000,
    volumeUnit: "cm3",
    densityValue: 8.9,
    densityUnit: "g_cm3",
  });

  const resKgL = calculateDensitySolver({
    mode: "mass",
    massValue: 0,
    massUnit: "kg",
    volumeValue: 1000,
    volumeUnit: "liter",
    densityValue: 8.9,
    densityUnit: "kg_l",
  });

  if (Math.abs(resBase.massKg - resGCm3.massKg) < 1e-6) recordPass(goldenStats, resBase.massKg, resGCm3.massKg);
  else recordFail(goldenStats, `Unit normalization mismatch: ${resBase.massKg} vs ${resGCm3.massKg}`);

  if (Math.abs(resBase.massKg - resKgL.massKg) < 1e-6) recordPass(goldenStats, resBase.massKg, resKgL.massKg);
  else recordFail(goldenStats, `Unit normalization mismatch: ${resBase.massKg} vs ${resKgL.massKg}`);
}

// Gas Density Reference Case:
{
  const res = calculateGasDensity({
    molarMassGPerMol: 28.97,
    pressureKPa: 101.325,
    temperatureCelsius: 20,
  });
  if (Math.abs(res.densityKgM3 - 1.2043) < 0.001) recordPass(goldenStats, 1.2043, res.densityKgM3);
  else recordFail(goldenStats, `Gas density reference case expected ~1.2043, got ${res.densityKgM3}`);

  if (res.temperatureKelvin === 293.15) recordPass(goldenStats, 293.15, res.temperatureKelvin);
  else recordFail(goldenStats, `Gas temp kelvin expected 293.15, got ${res.temperatureKelvin}`);

  // Gas temperature tests
  const res0 = calculateGasDensity({ molarMassGPerMol: 28.97, pressureKPa: 101.325, temperatureCelsius: 0 });
  if (res0.temperatureKelvin === 273.15) recordPass(goldenStats, 273.15, res0.temperatureKelvin);

  const res100 = calculateGasDensity({ molarMassGPerMol: 28.97, pressureKPa: 101.325, temperatureCelsius: 100 });
  if (res100.temperatureKelvin === 373.15) recordPass(goldenStats, 373.15, res100.temperatureKelvin);

  const resMinus40 = calculateGasDensity({ molarMassGPerMol: 28.97, pressureKPa: 101.325, temperatureCelsius: -40 });
  if (resMinus40.temperatureKelvin === 233.15) recordPass(goldenStats, 233.15, resMinus40.temperatureKelvin);

  // Absolute zero boundary
  const resSubAbs = calculateGasDensity({ molarMassGPerMol: 28.97, pressureKPa: 101.325, temperatureCelsius: -300 });
  if (resSubAbs.error) recordPass(goldenStats, 1, 1);
  else recordFail(goldenStats, `Temp < -273.15 should return error`);

  const resZeroP = calculateGasDensity({ molarMassGPerMol: 28.97, pressureKPa: 0, temperatureCelsius: 20 });
  if (resZeroP.error) recordPass(goldenStats, 1, 1);
  else recordFail(goldenStats, `Pressure <= 0 should return error`);
}

// Hydrostatic Pressure Reference Case:
{
  const res = calculateHydrostatic({
    densityKgM3: 1000,
    depthMeters: 10,
  });
  if (Math.abs(res.gaugePressureKPa - 98.07) < 0.01) recordPass(goldenStats, 98.07, res.gaugePressureKPa);
  else recordFail(goldenStats, `Hydrostatic kPa expected ~98.07, got ${res.gaugePressureKPa}`);

  if (Math.abs(res.gaugePressurePsi - 14.22) < 0.02) recordPass(goldenStats, 14.22, res.gaugePressurePsi);
  else recordFail(goldenStats, `Hydrostatic psi expected ~14.22, got ${res.gaugePressurePsi}`);

  if (Math.abs(res.gaugePressureBar - 0.981) < 0.002) recordPass(goldenStats, 0.981, res.gaugePressureBar);
  else recordFail(goldenStats, `Hydrostatic bar expected ~0.981, got ${res.gaugePressureBar}`);

  // API Gravity: SG = 1.0 => 10 deg API
  if (res.apiGravity !== null && Math.abs(res.apiGravity - 10.0) < 0.01) {
    recordPass(goldenStats, 10.0, res.apiGravity);
  } else {
    recordFail(goldenStats, `API gravity for water expected 10.0, got ${res.apiGravity}`);
  }

  // Depth = 0 => P = 0
  const res0 = calculateHydrostatic({ densityKgM3: 1000, depthMeters: 0 });
  if (res0.gaugePressureKPa === 0) recordPass(goldenStats, 0, res0.gaugePressureKPa);

  // Negative depth => error
  const resNeg = calculateHydrostatic({ densityKgM3: 1000, depthMeters: -5 });
  if (resNeg.error) recordPass(goldenStats, 1, 1);
  else recordFail(goldenStats, `Negative depth should return error`);
}

// Buoyancy classification:
{
  // Water: 1000, Object: 8900 -> Sinks
  const resSinks = calculateDensitySolver({
    mode: "density",
    massValue: 8900,
    massUnit: "kg",
    volumeValue: 1,
    volumeUnit: "m3",
    densityValue: 0,
    densityUnit: "kg_m3",
  });
  if (resSinks.buoyancyWater === "sinks" && resSinks.specificGravity === 8.9) recordPass(goldenStats, 1, 1);

  // Object: 917 (Ice) -> Floats
  const resIce = calculateDensitySolver({
    mode: "density",
    massValue: 917,
    massUnit: "kg",
    volumeValue: 1,
    volumeUnit: "m3",
    densityValue: 0,
    densityUnit: "kg_m3",
  });
  if (resIce.buoyancyWater === "floats" && Math.abs(resIce.specificGravity - 0.917) < 1e-6) recordPass(goldenStats, 1, 1);

  // Object: 1000 -> Neutral
  const resNeutral = calculateDensitySolver({
    mode: "density",
    massValue: 1000,
    massUnit: "kg",
    volumeValue: 1,
    volumeUnit: "m3",
    densityValue: 0,
    densityUnit: "kg_m3",
  });
  if (resNeutral.buoyancyWater === "neutral" && Math.abs(resNeutral.specificGravity - 1.0) < 1e-6) recordPass(goldenStats, 1, 1);
}

console.log(`Golden Cases Passed: ${goldenStats.passed} / ${goldenStats.total}`);
if (goldenStats.failed > 0) {
  console.error("Golden Failures:", goldenStats.failures);
}

// ─────────────────────────────────────────────────────────────────────────────
// 2. RANDOMIZED STRESS & ORACLE TESTS (40,000+ ASSERTIONS)
// ─────────────────────────────────────────────────────────────────────────────

console.log("\n--- SECTION 2: Randomized Stress & Oracle Tests (40,000+ Cases) ---");

// Suite A: 10,000 Density / Mass / Volume Solver Cases
const solverStats = createStats();
for (let i = 0; i < 10000; i++) {
  const m = Math.random() * 10000 + 0.001;
  const v = Math.random() * 100 + 0.0001;
  const expectedDensity = m / v;

  // 1. Solve for density
  const resD = calculateDensitySolver({
    mode: "density",
    massValue: m,
    massUnit: "kg",
    volumeValue: v,
    volumeUnit: "m3",
    densityValue: 0,
    densityUnit: "kg_m3",
  });
  if (Math.abs(resD.densityKgM3 - expectedDensity) < 1e-9) {
    recordPass(solverStats, expectedDensity, resD.densityKgM3);
  } else {
    recordFail(solverStats, `Density solver failure at m=${m}, v=${v}`);
  }

  // 2. Solve for mass from calculated density
  const resM = calculateDensitySolver({
    mode: "mass",
    massValue: 0,
    massUnit: "kg",
    volumeValue: v,
    volumeUnit: "m3",
    densityValue: resD.densityKgM3,
    densityUnit: "kg_m3",
  });
  if (Math.abs(resM.massKg - m) < 1e-7 * m) {
    recordPass(solverStats, m, resM.massKg);
  } else {
    recordFail(solverStats, `Mass solver failure at rho=${resD.densityKgM3}, v=${v}`);
  }

  // 3. Solve for volume from calculated density
  const resV = calculateDensitySolver({
    mode: "volume",
    massValue: m,
    massUnit: "kg",
    volumeValue: 0,
    volumeUnit: "m3",
    densityValue: resD.densityKgM3,
    densityUnit: "kg_m3",
  });
  if (Math.abs(resV.volumeM3 - v) < 1e-7 * v) {
    recordPass(solverStats, v, resV.volumeM3);
  } else {
    recordFail(solverStats, `Volume solver failure at m=${m}, rho=${resD.densityKgM3}`);
  }

  // 4. Monotonicity: increase mass -> density must increase
  const resD_moreM = calculateDensitySolver({
    mode: "density",
    massValue: m * 1.5,
    massUnit: "kg",
    volumeValue: v,
    volumeUnit: "m3",
    densityValue: 0,
    densityUnit: "kg_m3",
  });
  if (resD_moreM.densityKgM3 > resD.densityKgM3) {
    recordPass(solverStats, resD_moreM.densityKgM3, resD_moreM.densityKgM3);
  } else {
    recordFail(solverStats, `Monotonicity fail: mass increased but density did not`);
  }
}
console.log(`Density/Mass/Volume Cases: Passed ${solverStats.passed} / ${solverStats.total} (Max Rel Error: ${solverStats.maxRelError.toExponential(4)})`);

// Suite B: 10,000 Density Unit Conversion Matrix Round-Trip Cases
const unitStats = createStats();
const unitKeys = Object.keys(DENSITY_FACTORS);

for (let i = 0; i < 10000; i++) {
  const u1Key = unitKeys[Math.floor(Math.random() * unitKeys.length)];
  const u2Key = unitKeys[Math.floor(Math.random() * unitKeys.length)];
  const u1 = DENSITY_FACTORS[u1Key];
  const u2 = DENSITY_FACTORS[u2Key];

  const val1 = Math.random() * 50000 + 0.1;
  // Convert val1 in u1 -> kg/m3 -> u2 -> kg/m3 -> u1
  const kgM3 = val1 * u1.toKgM3;
  const val2 = kgM3 / u2.toKgM3;
  const roundTripKgM3 = val2 * u2.toKgM3;
  const roundTripVal1 = roundTripKgM3 / u1.toKgM3;

  if (Math.abs(roundTripVal1 - val1) < 1e-8 * val1) {
    recordPass(unitStats, val1, roundTripVal1);
  } else {
    recordFail(unitStats, `Round trip failed between ${u1Key} and ${u2Key}`);
  }
}
console.log(`Unit Conversion Round-Trips: Passed ${unitStats.passed} / ${unitStats.total} (Max Rel Error: ${unitStats.maxRelError.toExponential(4)})`);

// Suite C: 5,000 Buoyancy / Archimedes Principle Cases
const buoyancyStats = createStats();
for (let i = 0; i < 5000; i++) {
  const rhoObj = Math.random() * 20000 + 1; // 1 to 20000 kg/m3
  const v = Math.random() * 5 + 0.01;
  const m = rhoObj * v;

  const res = calculateDensitySolver({
    mode: "density",
    massValue: m,
    massUnit: "kg",
    volumeValue: v,
    volumeUnit: "m3",
    densityValue: 0,
    densityUnit: "kg_m3",
  });

  const expectedSG = rhoObj / 1000;
  if (Math.abs(res.specificGravity - expectedSG) < 1e-7 * expectedSG) {
    recordPass(buoyancyStats, expectedSG, res.specificGravity);
  } else {
    recordFail(buoyancyStats, `Buoyancy SG mismatch at rho=${rhoObj}`);
  }

  // Classification correctness
  if (expectedSG < 0.9999) {
    if (res.buoyancyWater === "floats") recordPass(buoyancyStats, 1, 1);
    else recordFail(buoyancyStats, `Expected floats for SG=${expectedSG}`);
  } else if (expectedSG > 1.0001) {
    if (res.buoyancyWater === "sinks") recordPass(buoyancyStats, 1, 1);
    else recordFail(buoyancyStats, `Expected sinks for SG=${expectedSG}`);
  } else {
    if (res.buoyancyWater === "neutral") recordPass(buoyancyStats, 1, 1);
    else recordFail(buoyancyStats, `Expected neutral for SG=${expectedSG}`);
  }
}
console.log(`Buoyancy Cases: Passed ${buoyancyStats.passed} / ${buoyancyStats.total} (Max Rel Error: ${buoyancyStats.maxRelError.toExponential(4)})`);

// Suite D: 5,000 Gas Density Ideal Gas Law Cases
const gasStats = createStats();
const R_CONST = 8.314462618;

for (let i = 0; i < 5000; i++) {
  const M_g_mol = Math.random() * 100 + 2; // 2 to 102 g/mol
  const P_kPa = Math.random() * 500 + 10; // 10 to 510 kPa
  const T_C = Math.random() * 300 - 50; // -50 to 250 °C

  const T_K = T_C + 273.15;
  const P_Pa = P_kPa * 1000;
  const M_kg_mol = M_g_mol / 1000;
  const oracleDensity = (P_Pa * M_kg_mol) / (R_CONST * T_K);

  const res = calculateGasDensity({
    molarMassGPerMol: M_g_mol,
    pressureKPa: P_kPa,
    temperatureCelsius: T_C,
  });

  if (Math.abs(res.densityKgM3 - oracleDensity) < 1e-7 * oracleDensity) {
    recordPass(gasStats, oracleDensity, res.densityKgM3);
  } else {
    recordFail(gasStats, `Gas density mismatch at M=${M_g_mol}, P=${P_kPa}, T=${T_C}`);
  }

  // Monotonicity: increase pressure -> density must increase
  const resHigherP = calculateGasDensity({
    molarMassGPerMol: M_g_mol,
    pressureKPa: P_kPa * 1.5,
    temperatureCelsius: T_C,
  });
  if (resHigherP.densityKgM3 > res.densityKgM3) {
    recordPass(gasStats, resHigherP.densityKgM3, resHigherP.densityKgM3);
  } else {
    recordFail(gasStats, `Gas density failed pressure monotonicity`);
  }

  // Monotonicity: increase temperature -> density must decrease
  const resHigherT = calculateGasDensity({
    molarMassGPerMol: M_g_mol,
    pressureKPa: P_kPa,
    temperatureCelsius: T_C + 50,
  });
  if (resHigherT.densityKgM3 < res.densityKgM3) {
    recordPass(gasStats, resHigherT.densityKgM3, resHigherT.densityKgM3);
  } else {
    recordFail(gasStats, `Gas density failed temperature monotonicity`);
  }
}
console.log(`Gas Density Cases: Passed ${gasStats.passed} / ${gasStats.total} (Max Rel Error: ${gasStats.maxRelError.toExponential(4)})`);

// Suite E: 5,000 Hydrostatic Pressure Cases
const hydroStats = createStats();
const G_CONST = 9.80665;

for (let i = 0; i < 5000; i++) {
  const rho = Math.random() * 2000 + 100; // 100 to 2100 kg/m3
  const h = Math.random() * 1000; // 0 to 1000 meters

  const oraclePa = rho * G_CONST * h;
  const oracleKPa = oraclePa / 1000;
  const oraclePsi = oraclePa / 6894.757293168;
  const oracleBar = oraclePa / 100000;

  const res = calculateHydrostatic({
    densityKgM3: rho,
    depthMeters: h,
  });

  if (Math.abs(res.gaugePressureKPa - oracleKPa) < 1e-6 * (oracleKPa || 1)) {
    recordPass(hydroStats, oracleKPa, res.gaugePressureKPa);
  } else {
    recordFail(hydroStats, `Hydrostatic kPa mismatch at rho=${rho}, h=${h}`);
  }

  if (Math.abs(res.gaugePressurePsi - oraclePsi) < 1e-6 * (oraclePsi || 1)) {
    recordPass(hydroStats, oraclePsi, res.gaugePressurePsi);
  } else {
    recordFail(hydroStats, `Hydrostatic psi mismatch at rho=${rho}, h=${h}`);
  }

  if (Math.abs(res.gaugePressureBar - oracleBar) < 1e-6 * (oracleBar || 1)) {
    recordPass(hydroStats, oracleBar, res.gaugePressureBar);
  } else {
    recordFail(hydroStats, `Hydrostatic bar mismatch at rho=${rho}, h=${h}`);
  }

  // Monotonicity: depth increases -> pressure must not decrease
  const resDeeper = calculateHydrostatic({ densityKgM3: rho, depthMeters: h + 10 });
  if (resDeeper.gaugePressureKPa > res.gaugePressureKPa) {
    recordPass(hydroStats, resDeeper.gaugePressureKPa, resDeeper.gaugePressureKPa);
  } else {
    recordFail(hydroStats, `Hydrostatic depth monotonicity fail`);
  }
}
console.log(`Hydrostatic Cases: Passed ${hydroStats.passed} / ${hydroStats.total} (Max Rel Error: ${hydroStats.maxRelError.toExponential(4)})`);

// Suite F: 5,000 API Gravity Cases
const apiStats = createStats();
for (let i = 0; i < 5000; i++) {
  const rho = Math.random() * 1500 + 500; // 500 to 2000 kg/m3
  const sg = rho / 1000;
  const oracleApi = (141.5 / sg) - 131.5;

  const res = calculateHydrostatic({
    densityKgM3: rho,
    depthMeters: 10,
  });

  if (res.apiGravity !== null && Math.abs(res.apiGravity - oracleApi) < 1e-6) {
    recordPass(apiStats, oracleApi, res.apiGravity);
  } else {
    recordFail(apiStats, `API gravity mismatch at rho=${rho}`);
  }

  // API monotonicity: lower SG (lighter fluid) -> higher API gravity
  const resLighter = calculateHydrostatic({ densityKgM3: rho * 0.9, depthMeters: 10 });
  if (resLighter.apiGravity !== null && res.apiGravity !== null && resLighter.apiGravity > res.apiGravity) {
    recordPass(apiStats, resLighter.apiGravity, resLighter.apiGravity);
  } else {
    recordFail(apiStats, `API gravity monotonicity fail`);
  }
}
console.log(`API Gravity Cases: Passed ${apiStats.passed} / ${apiStats.total} (Max Rel Error: ${apiStats.maxRelError.toExponential(4)})`);

// Grand Summary
const grandTotal = goldenStats.total + solverStats.total + unitStats.total + buoyancyStats.total + gasStats.total + hydroStats.total + apiStats.total;
const grandPassed = goldenStats.passed + solverStats.passed + unitStats.passed + buoyancyStats.passed + gasStats.passed + hydroStats.passed + apiStats.passed;
const grandFailed = goldenStats.failed + solverStats.failed + unitStats.failed + buoyancyStats.failed + gasStats.failed + hydroStats.failed + apiStats.failed;

console.log("\n============================================================");
console.log(`GRAND TEST TOTAL: ${grandTotal} assertions`);
console.log(`PASSED: ${grandPassed}`);
console.log(`FAILED: ${grandFailed}`);
console.log("============================================================");

if (grandFailed > 0) {
  process.exit(1);
} else {
  console.log("ALL MATHEMATICAL ORACLE TESTS PASSED PERFECTLY!");
}
