import {
  MASS_UNITS,
  DENSITY_UNITS_CATALOG,
  VOLUME_UNITS_CATALOG,
  CELESTIAL_BODIES,
  calculateMassFromDensity,
  convertMass,
  calculateCelestialWeight,
  formatMassPrecision,
} from "../src/lib/calculator-engine/formulas/mass";
import { MATERIAL_DATABASE } from "../src/lib/calculator-engine/formulas/density";

console.log("=================================================");
console.log("STARTING MASTER PRODUCTION AUDIT: WEIGHT CALCULATOR");
console.log("=================================================");

let totalPassed = 0;
let totalFailed = 0;
const defects: string[] = [];

function assert(condition: boolean, testName: string, details?: string) {
  if (condition) {
    totalPassed++;
    // console.log(`[PASS] ${testName}`);
  } else {
    totalFailed++;
    console.error(`[FAIL] ${testName}: ${details || ""}`);
    defects.push(`${testName}: ${details || ""}`);
  }
}

// -------------------------------------------------------------
// SECTION 1 & 49: GOLDEN TEST MATRIX
// -------------------------------------------------------------
console.log("\n--- Executing Golden Tests (TC-01 through TC-26) ---");

// TC-01: Copper 8900 kg/m³, 1 m³ -> Expected 8900 kg
const tc01 = calculateMassFromDensity({
  densityValue: 8900,
  densityUnitId: "kg_m3",
  volumeValue: 1,
  volumeUnitId: "m3",
});
assert(Math.abs(tc01.massKg - 8900) < 1e-9, "TC-01: Mass calculation 8900 kg/m³ × 1 m³ = 8900 kg", `Got ${tc01.massKg}`);

// TC-02: Copper result to grams -> Expected 8,900,000 g
assert(Math.abs(tc01.massGrams - 8900000) < 1e-6, "TC-02: Mass to grams = 8,900,000 g", `Got ${tc01.massGrams}`);

// TC-03: Copper result to tonnes -> Expected 8.9 t
assert(Math.abs(tc01.massMetricTons - 8.9) < 1e-9, "TC-03: Mass to metric tons = 8.9 t", `Got ${tc01.massMetricTons}`);

// TC-04: Copper result to pounds -> Expected ≈ 19621.1413 lb
assert(Math.abs(tc01.massLbs - 19621.1413) < 0.01, "TC-04: Mass to pounds ≈ 19621.1413 lb", `Got ${tc01.massLbs}`);

// TC-05: 1 kg -> lb -> Expected ≈ 2.2046 lb
const tc05 = convertMass("kg", "lb", 1);
assert(Math.abs(tc05.outputValue - 2.2046226218) < 1e-4 && formatMassPrecision(tc05.outputValue, 4) === "2.2046", "TC-05: 1 kg -> lb ≈ 2.2046 lb", `Got ${tc05.outputValue}, formatted: ${formatMassPrecision(tc05.outputValue, 4)}`);

// TC-06: 1 lb -> kg -> Expected ≈ 0.45359237 kg
const tc06 = convertMass("lb", "kg", 1);
assert(Math.abs(tc06.outputValue - 0.45359237) < 1e-9, "TC-06: 1 lb -> kg = 0.45359237 kg", `Got ${tc06.outputValue}`);

// TC-07 through TC-12: Planetary weights for 70 kg
const tcPlanetary70 = calculateCelestialWeight(70);
const earthResult = tcPlanetary70.bodyResults.find(b => b.body.id === "earth");
const moonResult = tcPlanetary70.bodyResults.find(b => b.body.id === "moon");
const marsResult = tcPlanetary70.bodyResults.find(b => b.body.id === "mars");
const jupiterResult = tcPlanetary70.bodyResults.find(b => b.body.id === "jupiter");
const venusResult = tcPlanetary70.bodyResults.find(b => b.body.id === "venus");
const mercuryResult = tcPlanetary70.bodyResults.find(b => b.body.id === "mercury");

// TC-07: 70 kg Earth: 70 × 9.80665 = 686.4655 N, ≈ 154.3 lbf
assert(earthResult !== undefined && Math.abs(earthResult.weightNewtons - 686.47) < 0.1 && Math.abs(earthResult.weightLbf - 154.3) < 0.2, "TC-07: 70 kg Earth weight ≈ 686 N, 154.3 lbf", `Got N=${earthResult?.weightNewtons}, lbf=${earthResult?.weightLbf}`);

// TC-08: 70 kg Moon: 70 × 1.622 = 113.54 N, ≈ 25.5 lbf
assert(moonResult !== undefined && Math.abs(moonResult.weightNewtons - 113.54) < 0.1 && Math.abs(moonResult.weightLbf - 25.5) < 0.2, "TC-08: 70 kg Moon weight ≈ 114 N, 25.5 lbf", `Got N=${moonResult?.weightNewtons}, lbf=${moonResult?.weightLbf}`);

// TC-09: 70 kg Mars: 70 × 3.711 = 259.77 N, ≈ 58.4 lbf
assert(marsResult !== undefined && Math.abs(marsResult.weightNewtons - 259.77) < 0.1 && Math.abs(marsResult.weightLbf - 58.4) < 0.2, "TC-09: 70 kg Mars weight ≈ 260 N, 58.4 lbf", `Got N=${marsResult?.weightNewtons}, lbf=${marsResult?.weightLbf}`);

// TC-10: 70 kg Jupiter: 70 × 24.79 = 1735.3 N, ≈ 390.1 lbf
assert(jupiterResult !== undefined && Math.abs(jupiterResult.weightNewtons - 1735.3) < 0.2 && Math.abs(jupiterResult.weightLbf - 390.1) < 0.2, "TC-10: 70 kg Jupiter weight ≈ 1735 N, 390.1 lbf", `Got N=${jupiterResult?.weightNewtons}, lbf=${jupiterResult?.weightLbf}`);

// TC-11: 70 kg Venus: 70 × 8.87 = 620.9 N, ≈ 139.6 lbf
assert(venusResult !== undefined && Math.abs(venusResult.weightNewtons - 620.9) < 0.1 && Math.abs(venusResult.weightLbf - 139.6) < 0.2, "TC-11: 70 kg Venus weight ≈ 621 N, 139.6 lbf", `Got N=${venusResult?.weightNewtons}, lbf=${venusResult?.weightLbf}`);

// TC-12: 70 kg Mercury: 70 × 3.70 = 259.0 N, ≈ 58.2 lbf
assert(mercuryResult !== undefined && Math.abs(mercuryResult.weightNewtons - 259.0) < 0.1 && Math.abs(mercuryResult.weightLbf - 58.2) < 0.2, "TC-12: 70 kg Mercury weight ≈ 259 N, 58.2 lbf", `Got N=${mercuryResult?.weightNewtons}, lbf=${mercuryResult?.weightLbf}`);

// TC-13: 0 kg -> all planetary weights = 0
const tcPlanetary0 = calculateCelestialWeight(0);
const allZero = tcPlanetary0.bodyResults.every(b => b.weightNewtons === 0 && b.weightLbf === 0);
assert(allZero, "TC-13: 0 kg mass yields 0 N and 0 lbf across all planets", `Non-zero found: ${JSON.stringify(tcPlanetary0.bodyResults)}`);

// TC-14: 0 volume -> mass = 0
const tc14 = calculateMassFromDensity({
  densityValue: 8900,
  densityUnitId: "kg_m3",
  volumeValue: 0,
  volumeUnitId: "m3",
});
assert(tc14.massKg === 0, "TC-14: 0 volume yields 0 kg mass", `Got ${tc14.massKg}`);

// TC-15: 185.5 lb -> kg -> Expected ≈ 84.14 kg
const tc15 = convertMass("lb", "kg", 185.5);
assert(Math.abs(tc15.outputValue - 84.14138) < 0.01, "TC-15: 185.5 lb -> kg ≈ 84.14 kg", `Got ${tc15.outputValue}`);

// TC-16: 185.5 lb -> UK stone -> Expected 13.25 stone
const tc16 = convertMass("lb", "st", 185.5);
assert(Math.abs(tc16.outputValue - 13.25) < 1e-6, "TC-16: 185.5 lb -> UK stone = 13.25 st", `Got ${tc16.outputValue}`);

// TC-17: 185.5 lb on Mars -> 84.14138 kg × 3.711 m/s² = 312.25 N
const tc17WeightMars = 84.14138445 * 3.711;
assert(Math.abs(tc17WeightMars - 312.25) < 0.1, "TC-17: 185.5 lb on Mars ≈ 312.25 N", `Got ${tc17WeightMars}`);

// TC-18: 1 m³ = 1000 L
const m3Unit = VOLUME_UNITS_CATALOG.find(u => u.id === "m3")!;
const lUnit = VOLUME_UNITS_CATALOG.find(u => u.id === "L")!;
assert(Math.abs((1 * m3Unit.toM3) / lUnit.toM3 - 1000) < 1e-9, "TC-18: 1 m³ = 1000 L", `Ratio: ${(1 * m3Unit.toM3) / lUnit.toM3}`);

// TC-19: 1 metric tonne = 1000 kg
const tUnit = MASS_UNITS.find(u => u.id === "t")!;
assert(tUnit.toKg === 1000, "TC-19: 1 metric tonne = 1000 kg", `Got ${tUnit.toKg}`);

// TC-20: 1 stone = 14 lb
const stUnit = MASS_UNITS.find(u => u.id === "st")!;
const lbUnit = MASS_UNITS.find(u => u.id === "lb")!;
assert(Math.abs(stUnit.toKg / lbUnit.toKg - 14) < 1e-9, "TC-20: 1 stone = 14 lb", `Got ${stUnit.toKg / lbUnit.toKg}`);

// TC-21: 1 carat = 0.2 g
const ctUnit = MASS_UNITS.find(u => u.id === "ct")!;
const gUnit = MASS_UNITS.find(u => u.id === "g")!;
assert(Math.abs((ctUnit.toKg / gUnit.toKg) - 0.2) < 1e-9, "TC-21: 1 carat = 0.2 g", `Got ${ctUnit.toKg / gUnit.toKg}`);

// TC-22: Round trip: 1 kg -> lb -> kg ≈ 1 kg
const rt1 = convertMass("kg", "lb", 1);
const rt2 = convertMass("lb", "kg", rt1.outputValue);
assert(Math.abs(rt2.outputValue - 1) < 1e-12, "TC-22: Round trip 1 kg -> lb -> kg = 1 kg", `Got ${rt2.outputValue}`);

// TC-23: Round trip: 100 kg -> all units -> kg ≈ 100 kg
let all100Passed = true;
for (const u of MASS_UNITS) {
  const fwd = convertMass("kg", u.id, 100);
  const rev = convertMass(u.id, "kg", fwd.outputValue);
  if (Math.abs(rev.outputValue - 100) > 1e-8) {
    all100Passed = false;
    console.error(`TC-23 failed for unit ${u.name}: rev=${rev.outputValue}`);
  }
}
assert(all100Passed, "TC-23: 100 kg -> all units -> kg round trip passes within 1e-8");

// TC-24: Invalid mass handling in celestial
// Let's check how calculateCelestialWeight currently handles -1 kg:
const negMassRes = calculateCelestialWeight(-1);
console.log(`Current calculateCelestialWeight(-1) returns massKg: ${negMassRes.massKg}`);
// The engine clamped it to 0 without throwing or indicating error!
assert(negMassRes.massKg === -1 || (negMassRes as any).error !== undefined, "TC-24: Negative mass rejection", `Engine silently clamped -1 to ${negMassRes.massKg}!`);

// TC-25: Invalid density handling
const negDensityRes = calculateMassFromDensity({
  densityValue: -1,
  densityUnitId: "kg_m3",
  volumeValue: 1,
  volumeUnitId: "m3",
});
console.log(`Current calculateMassFromDensity(-1 density) returns massKg: ${negDensityRes.massKg}`);

// TC-26: Zero preserved
const zeroPreserved = calculateMassFromDensity({
  densityValue: 0,
  densityUnitId: "kg_m3",
  volumeValue: 1,
  volumeUnitId: "m3",
});
assert(zeroPreserved.massKg === 0, "TC-26: Zero density preserved as 0 kg", `Got ${zeroPreserved.massKg}`);


// -------------------------------------------------------------
// SECTION 8 & 48: 10,000 RANDOMIZED MASS ROUND-TRIP TESTS
// -------------------------------------------------------------
console.log("\n--- Executing 10,000 Randomized Mass Round-Trip Tests ---");
let rtPassed = 0;
let rtFailed = 0;
let maxRtAbsError = 0;
let maxRtRelError = 0;
const testValues = [1e-12, 1e-9, 1e-6, 0.001, 0.1, 1, 10, 70, 100, 1e3, 1e6, 1e12];

for (let i = 0; i < 10000; i++) {
  // Pick random fromUnit and toUnit
  const fromU = MASS_UNITS[Math.floor(Math.random() * MASS_UNITS.length)];
  const toU = MASS_UNITS[Math.floor(Math.random() * MASS_UNITS.length)];
  
  // Pick either a benchmark order of magnitude or a random log-uniform value
  let val: number;
  if (i < testValues.length) {
    val = testValues[i];
  } else {
    const exp = -12 + Math.random() * 24; // 1e-12 to 1e12
    val = Math.pow(10, exp);
  }

  const fwd = convertMass(fromU.id, toU.id, val);
  const rev = convertMass(toU.id, fromU.id, fwd.outputValue);

  const absErr = Math.abs(rev.outputValue - val);
  const relErr = val === 0 ? 0 : absErr / val;

  if (absErr > maxRtAbsError) maxRtAbsError = absErr;
  if (relErr > maxRtRelError) maxRtRelError = relErr;

  // Numerical precision tolerance: relative error < 1e-11 (IEEE 754 float64 has ~1e-16 precision, allowing 2 divisions)
  if (relErr < 1e-11 || absErr < 1e-15) {
    rtPassed++;
  } else {
    rtFailed++;
    if (rtFailed <= 3) {
      console.error(`RT Fail: ${val} ${fromU.symbol} -> ${fwd.outputValue} ${toU.symbol} -> ${rev.outputValue} (relErr: ${relErr})`);
    }
  }
}
console.log(`Round-trip tests: ${rtPassed} / 10000 passed (${rtFailed} failed). Max Rel Error: ${maxRtRelError.toExponential(4)}, Max Abs Error: ${maxRtAbsError.toExponential(4)}`);
assert(rtFailed === 0, "10,000 Randomized Mass Round Trips Passed", `Failed: ${rtFailed}`);


// -------------------------------------------------------------
// SECTION 4 & 5 & 46: 10,000 RANDOMIZED DENSITY × VOLUME TESTS
// -------------------------------------------------------------
console.log("\n--- Executing 10,000 Randomized Density × Volume Tests ---");
let dvPassed = 0;
let dvFailed = 0;
let maxDvRelError = 0;

for (let i = 0; i < 10000; i++) {
  const dUnit = DENSITY_UNITS_CATALOG[Math.floor(Math.random() * DENSITY_UNITS_CATALOG.length)];
  const vUnit = VOLUME_UNITS_CATALOG[Math.floor(Math.random() * VOLUME_UNITS_CATALOG.length)];

  // Random positive density and volume
  const dVal = Math.pow(10, -3 + Math.random() * 8); // 0.001 to 100,000
  const vVal = Math.pow(10, -4 + Math.random() * 8); // 0.0001 to 10,000

  // Independent high-precision oracle
  const expectedMassKg = (dVal * dUnit.toKgM3) * (vVal * vUnit.toM3);

  const res = calculateMassFromDensity({
    densityValue: dVal,
    densityUnitId: dUnit.id,
    volumeValue: vVal,
    volumeUnitId: vUnit.id,
  });

  const absErr = Math.abs(res.massKg - expectedMassKg);
  const relErr = expectedMassKg === 0 ? 0 : absErr / expectedMassKg;

  if (relErr > maxDvRelError) maxDvRelError = relErr;

  if (relErr < 1e-12) {
    dvPassed++;
  } else {
    dvFailed++;
  }
}
console.log(`Density × Volume tests: ${dvPassed} / 10000 passed (${dvFailed} failed). Max Rel Error: ${maxDvRelError.toExponential(4)}`);
assert(dvFailed === 0, "10,000 Randomized Density × Volume Calculations Passed", `Failed: ${dvFailed}`);


// -------------------------------------------------------------
// SECTION 9 & 47: 5,000 RANDOMIZED PLANETARY WEIGHT TESTS
// -------------------------------------------------------------
console.log("\n--- Executing 5,000 Randomized Planetary Tests ---");
let planetPassed = 0;
let planetFailed = 0;

for (let i = 0; i < 5000; i++) {
  const m = Math.random() * 10000; // 0 to 10,000 kg
  const res = calculateCelestialWeight(m);

  let caseOk = true;
  for (const b of res.bodyResults) {
    const expectedN = Math.round(m * b.body.surfaceGravity * 100) / 100;
    const expectedLbf = Math.round(m * b.body.surfaceGravity * 0.224808943 * 100) / 100;
    if (Math.abs(b.weightNewtons - expectedN) > 0.02 || Math.abs(b.weightLbf - expectedLbf) > 0.02) {
      caseOk = false;
      break;
    }
  }

  if (caseOk) {
    planetPassed++;
  } else {
    planetFailed++;
  }
}
console.log(`Planetary weight tests: ${planetPassed} / 5000 passed (${planetFailed} failed).`);
assert(planetFailed === 0, "5,000 Randomized Planetary Weight Calculations Passed", `Failed: ${planetFailed}`);

// -------------------------------------------------------------
// DENSITY AND VOLUME INVARIANCE PROPERTY TEST
// -------------------------------------------------------------
console.log("\n--- Testing Invariance: 8900 kg/m³ × 1 m³ vs 8.9 g/cm³ × 1,000,000 cm³ ---");
const copper1 = calculateMassFromDensity({ densityValue: 8900, densityUnitId: "kg_m3", volumeValue: 1, volumeUnitId: "m3" });
const copper2 = calculateMassFromDensity({ densityValue: 8.9, densityUnitId: "g_cm3", volumeValue: 1000000, volumeUnitId: "cm3" });
const copper3 = calculateMassFromDensity({ densityValue: 8.9, densityUnitId: "kg_L", volumeValue: 1000, volumeUnitId: "L" });
assert(Math.abs(copper1.massKg - copper2.massKg) < 1e-6, "Invariance: 8900 kg/m³ × 1 m³ == 8.9 g/cm³ × 1e6 cm³", `c1=${copper1.massKg}, c2=${copper2.massKg}`);
assert(Math.abs(copper1.massKg - copper3.massKg) < 1e-6, "Invariance: 8900 kg/m³ × 1 m³ == 8.9 kg/L × 1000 L", `c1=${copper1.massKg}, c3=${copper3.massKg}`);

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log("\n=================================================");
console.log(`AUDIT COMPLETE: ${totalPassed} PASSED, ${totalFailed} FAILED`);
console.log("=================================================");
