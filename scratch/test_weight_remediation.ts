export {};
import {
  calculateMassFromDensity,
  convertMass,
  calculateCelestialWeight,
  formatMassPrecision,
  MASS_UNITS,
  DENSITY_UNITS_CATALOG,
  VOLUME_UNITS_CATALOG,
} from "../src/lib/calculator-engine/formulas/mass";

console.log("=================================================");
console.log("POST-FIX VERIFICATION: WEIGHT CALCULATOR");
console.log("=================================================");

let passed = 0;
let failed = 0;

function check(cond: boolean, name: string, details?: string) {
  if (cond) {
    passed++;
  } else {
    failed++;
    console.error(`[FAIL] ${name}: ${details || ""}`);
  }
}

// 1. DEFECT-WEIGHT-01: Negative mass rejection in calculateCelestialWeight
const negCelestial = calculateCelestialWeight(-70);
check(!negCelestial.valid, "Negative mass rejected in celestial engine", `valid=${negCelestial.valid}`);
check(negCelestial.error === "Mass must be zero or greater.", "Explicit error message on negative mass", `error=${negCelestial.error}`);
check(negCelestial.bodyResults.length === 0, "No body results returned on negative mass");

// Explicit zero in celestial weight
const zeroCelestial = calculateCelestialWeight(0);
check(zeroCelestial.valid, "Zero mass valid in celestial engine");
check(zeroCelestial.bodyResults.every(b => b.weightNewtons === 0 && b.weightLbf === 0), "Zero mass yields 0 N and 0 lbf across all planets");

// 2. DEFECT-WEIGHT-02: Input validation in mass from density
const negDensity = calculateMassFromDensity({ densityValue: -8900, densityUnitId: "kg_m3", volumeValue: 1, volumeUnitId: "m3" });
check(!negDensity.valid, "Negative density rejected", `valid=${negDensity.valid}, error=${negDensity.error}`);

const negVolume = calculateMassFromDensity({ densityValue: 8900, densityUnitId: "kg_m3", volumeValue: -1, volumeUnitId: "m3" });
check(!negVolume.valid, "Negative volume rejected", `valid=${negVolume.valid}, error=${negVolume.error}`);

const zeroDensity = calculateMassFromDensity({ densityValue: 0, densityUnitId: "kg_m3", volumeValue: 1, volumeUnitId: "m3" });
check(zeroDensity.valid && zeroDensity.massKg === 0, "Zero density preserved and yields exact 0 kg mass", `massKg=${zeroDensity.massKg}`);

const zeroVolume = calculateMassFromDensity({ densityValue: 8900, densityUnitId: "kg_m3", volumeValue: 0, volumeUnitId: "m3" });
check(zeroVolume.valid && zeroVolume.massKg === 0, "Zero volume preserved and yields exact 0 kg mass", `massKg=${zeroVolume.massKg}`);

// 3. Converter validation
const negConv = convertMass("kg", "lb", -5);
check(!negConv.valid, "Negative mass in converter rejected", `valid=${negConv.valid}, error=${negConv.error}`);

const zeroConv = convertMass("kg", "lb", 0);
check(zeroConv.valid && zeroConv.outputValue === 0, "Zero mass in converter yields exact 0 output");

// 4. Golden tests
const tc01 = calculateMassFromDensity({ densityValue: 8900, densityUnitId: "kg_m3", volumeValue: 1, volumeUnitId: "m3" });
check(tc01.valid && tc01.massKg === 8900, "TC-01: Copper 8900 kg/m³ × 1 m³ = 8900 kg");
check(Math.abs(tc01.massLbs - 19621.1413) < 0.01, "TC-01b: 8900 kg ≈ 19621.1413 lbs");
check(tc01.massGrams === 8900000, "TC-01c: 8900 kg = 8,900,000 g");
check(tc01.massMetricTons === 8.9, "TC-01d: 8900 kg = 8.9 metric tonnes");

const tc02 = convertMass("kg", "lb", 1);
check(tc02.valid && formatMassPrecision(tc02.outputValue, 4) === "2.2046", "TC-02: 1 kg ≈ 2.2046 lbs");

const c70 = calculateCelestialWeight(70);
const earth = c70.bodyResults.find(b => b.body.id === "earth")!;
const moon = c70.bodyResults.find(b => b.body.id === "moon")!;
const mars = c70.bodyResults.find(b => b.body.id === "mars")!;
const jupiter = c70.bodyResults.find(b => b.body.id === "jupiter")!;
const venus = c70.bodyResults.find(b => b.body.id === "venus")!;
const mercury = c70.bodyResults.find(b => b.body.id === "mercury")!;

check(Math.abs(earth.weightNewtons - 686.47) < 0.1 && Math.abs(earth.weightLbf - 154.3) < 0.2, "TC-03: 70 kg Earth weight ≈ 686 N, 154.3 lbf");
check(Math.abs(moon.weightNewtons - 113.54) < 0.1 && Math.abs(moon.weightLbf - 25.5) < 0.2, "TC-04: 70 kg Moon weight ≈ 114 N, 25.5 lbf");
check(Math.abs(mars.weightNewtons - 259.77) < 0.1 && Math.abs(mars.weightLbf - 58.4) < 0.2, "TC-05: 70 kg Mars weight ≈ 260 N, 58.4 lbf");
check(Math.abs(jupiter.weightNewtons - 1735.3) < 0.2 && Math.abs(jupiter.weightLbf - 390.1) < 0.2, "TC-06: 70 kg Jupiter weight ≈ 1735 N, 390.1 lbf");
check(Math.abs(venus.weightNewtons - 620.9) < 0.1 && Math.abs(venus.weightLbf - 139.6) < 0.2, "TC-07: 70 kg Venus weight ≈ 621 N, 139.6 lbf");
check(Math.abs(mercury.weightNewtons - 259.0) < 0.1 && Math.abs(mercury.weightLbf - 58.2) < 0.2, "TC-08: 70 kg Mercury weight ≈ 259 N, 58.2 lbf");

// 5. Proportionality test
const c140 = calculateCelestialWeight(140);
const earth140 = c140.bodyResults.find(b => b.body.id === "earth")!;
check(Math.abs(earth140.weightNewtons - 2 * earth.weightNewtons) < 0.1, "Proportionality: doubling mass exactly doubles weight force");

// 6. 185.5 lb worked example
const conv185 = convertMass("lb", "kg", 185.5);
check(Math.abs(conv185.outputValue - 84.14138) < 0.01, "TC-09: 185.5 lb ≈ 84.14 kg");
const conv185Stone = convertMass("lb", "st", 185.5);
check(Math.abs(conv185Stone.outputValue - 13.25) < 1e-6, "TC-10: 185.5 lb = 13.25 stone");
const marsWeight185 = conv185.outputValue * 3.711;
check(Math.abs(marsWeight185 - 312.25) < 0.1, "TC-11: 185.5 lb on Mars ≈ 312.25 N");

// 7. Dimensional Invariance
const m1 = calculateMassFromDensity({ densityValue: 8900, densityUnitId: "kg_m3", volumeValue: 1, volumeUnitId: "m3" });
const m2 = calculateMassFromDensity({ densityValue: 8.9, densityUnitId: "g_cm3", volumeValue: 1000000, volumeUnitId: "cm3" });
const m3 = calculateMassFromDensity({ densityValue: 8.9, densityUnitId: "kg_L", volumeValue: 1000, volumeUnitId: "L" });
check(Math.abs(m1.massKg - m2.massKg) < 1e-6 && Math.abs(m1.massKg - m3.massKg) < 1e-6, "Invariance: 8900 kg/m³ × 1 m³ == 8.9 g/cm³ × 10⁶ cm³ == 8.9 kg/L × 1000 L");

console.log(`\nRESULTS: ${passed} PASSED, ${failed} FAILED`);
