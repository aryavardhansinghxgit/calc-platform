import {
  calculateAcCoolingBtu,
  calculateHeatingBtu,
  calculateEnergyCostAndSizing,
  toFeet,
  toSqFeet,
  toFahrenheit,
  toCelsius,
  getNearestCommercialTonnage,
  COMMERCIAL_TONNAGE_STEPS,
  LengthUnit,
  AreaUnit,
  TempUnit,
  InsulationLevel,
  SunExposure,
  RoomType,
  ClimateZone,
  BuildingTightness
} from "../src/lib/calculator-engine/formulas/btu";

console.log("=== STARTING MASTER BTU AUDIT SUITE ===");

// ─── 1. GOLDEN CASE TESTS ──────────────────────────────────────────────────
console.log("\n--- 1. GOLDEN CASE TESTS ---");

// AC Golden Test AC-01
const acGolden = calculateAcCoolingBtu({
  length: 15,
  width: 20,
  dimensionUnit: "feet",
  ceilingHeight: 9,
  ceilingHeightUnit: "feet",
  occupants: 2,
  roomType: "bedroom",
  insulation: "average",
  sunExposure: "moderate",
  climateZone: "average",
  quantity: 1
});

console.log("AC-01 Result:", {
  totalBtu: acGolden.totalBtuPerHour,
  expectedBtu: 8750,
  exactTons: acGolden.exactTons,
  recommendedTons: acGolden.recommendedTons,
  powerKw: acGolden.powerKw,
  powerHp: acGolden.powerHp,
  unitType: acGolden.unitTypeRecommendation,
  areaBtu: acGolden.breakdown.areaBtu,
  ceilingOffset: acGolden.breakdown.ceilingOffsetBtu
});

const passAC01 = (
  acGolden.totalBtuPerHour === 8750 &&
  acGolden.recommendedTons === 0.75 &&
  acGolden.powerKw === 2.56 &&
  acGolden.powerHp === 3.43 &&
  acGolden.unitTypeRecommendation === "Window Unit" &&
  acGolden.breakdown.areaBtu === 8000 &&
  acGolden.breakdown.ceilingOffsetBtu === 750
);
console.log("AC-01 PASS:", passAC01);

// AC Golden Test AC-02 (Direct Area equivalent)
const acDirectArea = calculateAcCoolingBtu({
  areaSqFt: 300,
  ceilingHeight: 9,
  ceilingHeightUnit: "feet",
  occupants: 2,
  roomType: "bedroom",
  insulation: "average",
  sunExposure: "moderate",
  climateZone: "average",
  quantity: 1
});
const passAC02 = acDirectArea.totalBtuPerHour === 8750;
console.log("AC-02 Direct Area PASS:", passAC02, `(got ${acDirectArea.totalBtuPerHour})`);

// Heating Golden Test HT-01
const heatGolden = calculateHeatingBtu({
  length: 30,
  width: 40,
  height: 9,
  dimensionUnit: "feet",
  desiredIndoorTemp: 70,
  outdoorLowTemp: 20,
  tempUnit: "fahrenheit",
  insulationCondition: "average_standard",
  altitudeFeet: 0,
  quantity: 1
});

console.log("HT-01 Result:", {
  volumeCuFt: heatGolden.volumeCuFt,
  deltaTempF: heatGolden.deltaTempF,
  totalHeatingBtu: heatGolden.totalHeatingBtu,
  heatingKw: heatGolden.heatingKw,
  gasTherms: heatGolden.fuelEquivalents.naturalGasThermsPerHour,
  propaneGal: heatGolden.fuelEquivalents.propaneGallonsPerHour,
  electricKwh: heatGolden.fuelEquivalents.electricKwhPerHour
});

const passHT01 = (
  heatGolden.volumeCuFt === 10800 &&
  heatGolden.deltaTempF === 50 &&
  heatGolden.totalHeatingBtu === 70200 &&
  heatGolden.heatingKw === 20.57 &&
  heatGolden.fuelEquivalents.naturalGasThermsPerHour === 0.826 &&
  heatGolden.fuelEquivalents.propaneGallonsPerHour === 0.903 &&
  heatGolden.fuelEquivalents.electricKwhPerHour === 20.57
);
console.log("HT-01 PASS:", passHT01);

// Energy Cost Golden Test EN-01
const energyGolden = calculateEnergyCostAndSizing({
  btuRating: 18000,
  seerRating: 16,
  dailyHours: 8,
  electricityRatePerKwh: 0.16
});

console.log("EN-01 Result:", {
  watts: energyGolden.watts,
  kw: energyGolden.kilowatts,
  dailyCost: energyGolden.dailyCost,
  monthlyCost: energyGolden.monthlyCost,
  annualCost: energyGolden.annualCost,
  co2: energyGolden.co2KgPerYear
});

const passEN01 = (
  energyGolden.dailyCost === 1.44 &&
  energyGolden.monthlyCost === 43.80 &&
  energyGolden.annualCost === 525.60 &&
  energyGolden.co2KgPerYear === 1275
);
console.log("EN-01 PASS:", passEN01);

// SEER Comparison Chart Test CH-01
console.log("\n--- SEER Chart Check ---");
const chartExpected = [
  { seer: 10, cost: 840.96 },
  { seer: 14, cost: 600.69 },
  { seer: 16, cost: 525.60 },
  { seer: 18, cost: 467.20 },
  { seer: 20, cost: 420.48 },
  { seer: 24, cost: 350.40 },
];
let chartPass = true;
for (const exp of chartExpected) {
  const match = energyGolden.seerComparison.find(c => c.seer === exp.seer);
  if (!match || Math.abs(match.annualCost - exp.cost) > 0.01) {
    console.error(`Mismatch for SEER ${exp.seer}: expected ${exp.cost}, got ${match?.annualCost}`);
    chartPass = false;
  }
}
console.log("CH-01 PASS:", chartPass);

// ─── 2. TONNAGE MAPPING AUDIT ───────────────────────────────────────────────
console.log("\n--- 2. TONNAGE MAPPING AUDIT ---");
const tonnageCases = [
  { btu: 6000, exactTons: 0.5, expTons: 0.5, unit: "Window Unit" },
  { btu: 8750, exactTons: 0.73, expTons: 0.75, unit: "Window Unit" },
  { btu: 11999, exactTons: 1.0, expTons: 1.0, unit: "Window Unit" },
  { btu: 12000, exactTons: 1.0, expTons: 1.0, unit: "Window Unit" },
  { btu: 15000, exactTons: 1.25, expTons: 1.25, unit: "Mini-Split / Single Zone" },
  { btu: 17999, exactTons: 1.5, expTons: 1.5, unit: "Mini-Split / Single Zone" },
  { btu: 18000, exactTons: 1.5, expTons: 1.5, unit: "Mini-Split / Single Zone" },
  { btu: 23999, exactTons: 2.0, expTons: 2.0, unit: "Mini-Split / Single Zone" },
  { btu: 24000, exactTons: 2.0, expTons: 2.0, unit: "Mini-Split / Single Zone" },
  { btu: 24001, exactTons: 2.0, expTons: 2.0, unit: "Central AC / Multi-Split" },
  { btu: 36000, exactTons: 3.0, expTons: 3.0, unit: "Central AC / Multi-Split" },
];
let tonnagePass = true;
for (const tc of tonnageCases) {
  const tons = getNearestCommercialTonnage(tc.exactTons);
  if (tons !== tc.expTons) {
    console.error(`Tonnage mismatch for ${tc.btu}: expected ${tc.expTons}, got ${tons}`);
    tonnagePass = false;
  }
}
console.log("Tonnage Mapping PASS:", tonnagePass);

// ─── 3. DIRECT AREA MODE & ROOM COUNT ───────────────────────────────────────
console.log("\n--- 3. DIRECT AREA & ROOM COUNT AUDIT ---");
const directAreaCases = [500, 1000, 2000, 2500];
for (const area of directAreaCases) {
  const res = calculateAcCoolingBtu({ areaSqFt: area });
  console.log(`Area ${area} sq ft -> Base: ${res.baseBtu}, Total: ${res.totalBtuPerHour}`);
}

const roomCountCases = [0, 1, 2, 5, 100];
for (const rc of roomCountCases) {
  const res = calculateAcCoolingBtu({ areaSqFt: 300, quantity: rc });
  console.log(`Rooms ${rc} -> Total BTU: ${res.totalBtuPerHour}`);
}

// ─── 4. UNIT CONVERSIONS ───────────────────────────────────────────────────
console.log("\n--- 4. UNIT CONVERSIONS AUDIT ---");
console.log("1 ft to inches:", 12, "toFeet(12, 'inches') =", toFeet(12, "inches"));
console.log("1 m to feet:", 3.28084, "toFeet(1, 'meters') =", toFeet(1, "meters"));
console.log("1 sq_meters to sq_feet:", 10.7639, "toSqFeet(1, 'sq_meters') =", toSqFeet(1, "sq_meters"));
console.log("0 °C to °F:", 32, "toFahrenheit(0, 'celsius') =", toFahrenheit(0, "celsius"));
console.log("100 °C to °F:", 212, "toFahrenheit(100, 'celsius') =", toFahrenheit(100, "celsius"));
console.log("8,750 BTU/hr to kW:", (8750 / 3412.142).toFixed(2), "kW");

// ─── 5. HEATING BOUNDARY TEST MATRIX ────────────────────────────────────────
console.log("\n--- 5. HEATING BOUNDARY TEST MATRIX ---");
const heatMatrix = [
  { inT: 70, outT: 20, expDelta: 50 },
  { inT: 70, outT: 10, expDelta: 60 },
  { inT: 70, outT: 30, expDelta: 40 },
  { inT: 65, outT: 20, expDelta: 45 },
  { inT: 20, outT: 70, expDelta: 1 }, // Note: Math.max(indoor - outdoor, 1) clamps to 1!
];
for (const hm of heatMatrix) {
  const res = calculateHeatingBtu({
    length: 30, width: 40, height: 9,
    desiredIndoorTemp: hm.inT,
    outdoorLowTemp: hm.outT
  });
  console.log(`Indoor ${hm.inT}°F, Outdoor ${hm.outT}°F -> ΔT: ${res.deltaTempF}, BTU: ${res.totalHeatingBtu}`);
}

// ─── 6. FACTOR AUDITS (Insulation, Sun, Room Type, Occupancy) ───────────────
console.log("\n--- 6. FACTOR AUDITS ---");
// Insulation:
console.log("Heating Insulation Factors:");
const insOptions: BuildingTightness[] = ["poor_drafty", "average_standard", "tight_efficient"];
for (const ins of insOptions) {
  const res = calculateHeatingBtu({ length: 30, width: 40, height: 9, desiredIndoorTemp: 70, outdoorLowTemp: 20, insulationCondition: ins });
  console.log(`Insulation ${ins} -> BTU: ${res.totalHeatingBtu}`);
}

console.log("\nAC Sun Exposure Factors:");
const sunOptions: SunExposure[] = ["shaded", "moderate", "high_sun"];
for (const sun of sunOptions) {
  const res = calculateAcCoolingBtu({ areaSqFt: 300, sunExposure: sun });
  console.log(`Sun ${sun} -> BTU: ${res.totalBtuPerHour}`);
}

console.log("\nAC Room Type Factors:");
const roomOptions: RoomType[] = ["bedroom", "living_room", "kitchen", "office", "server_room"];
for (const rt of roomOptions) {
  const res = calculateAcCoolingBtu({ areaSqFt: 300, roomType: rt });
  console.log(`Room Type ${rt} -> BTU: ${res.totalBtuPerHour}`);
}

console.log("\nAC Occupancy Factors:");
const occOptions = [0, 1, 2, 4, 6, 10, -1];
for (const occ of occOptions) {
  const res = calculateAcCoolingBtu({ areaSqFt: 300, occupants: occ });
  console.log(`Occupants ${occ} -> Occupants BTU: ${res.breakdown.occupantsBtu}, Total: ${res.totalBtuPerHour}`);
}

// ─── 7. CARBON FOOTPRINT AUDIT ──────────────────────────────────────────────
console.log("\n--- 7. CARBON FOOTPRINT AUDIT ---");
const kwhCases = [0, 100, 1000, 3285, 10000];
for (const kwh of kwhCases) {
  const co2 = Math.round(kwh * 0.388);
  console.log(`${kwh} kWh -> ${co2} kg CO2/year (at 0.388 kg/kWh)`);
}

// ─── 8. 5,000 RANDOMIZED PROPERTY TESTS ─────────────────────────────────────
console.log("\n--- 8. 5,000 RANDOMIZED PROPERTY TESTS ---");
let randomPass = true;
let totalCases = 5000;

for (let i = 0; i < totalCases; i++) {
  // AC Cooling properties:
  const area1 = 100 + Math.random() * 2000;
  const area2 = area1 + 10 + Math.random() * 500;
  const ac1 = calculateAcCoolingBtu({ areaSqFt: area1 });
  const ac2 = calculateAcCoolingBtu({ areaSqFt: area2 });
  if (ac2.totalBtuPerHour < ac1.totalBtuPerHour) {
    console.error(`FAIL: Monotonicity violation: area ${area2} had less BTU than ${area1}`);
    randomPass = false;
    break;
  }

  // Heating properties:
  const dt1 = 10 + Math.random() * 40;
  const dt2 = dt1 + 5 + Math.random() * 20;
  const h1 = calculateHeatingBtu({ length: 20, width: 30, height: 8, desiredIndoorTemp: 70, outdoorLowTemp: 70 - dt1 });
  const h2 = calculateHeatingBtu({ length: 20, width: 30, height: 8, desiredIndoorTemp: 70, outdoorLowTemp: 70 - dt2 });
  if (h2.totalHeatingBtu < h1.totalHeatingBtu) {
    console.error(`FAIL: Heating monotonicity violation: ΔT ${dt2} had less BTU than ${dt1}`);
    randomPass = false;
    break;
  }

  // Energy properties:
  const seer1 = 10 + Math.random() * 5;
  const seer2 = seer1 + 2 + Math.random() * 5;
  const e1 = calculateEnergyCostAndSizing({ btuRating: 18000, seerRating: seer1, dailyHours: 8, electricityRatePerKwh: 0.15 });
  const e2 = calculateEnergyCostAndSizing({ btuRating: 18000, seerRating: seer2, dailyHours: 8, electricityRatePerKwh: 0.15 });
  if (e2.annualCost > e1.annualCost) {
    console.error(`FAIL: Energy monotonicity violation: SEER ${seer2} had higher cost than SEER ${seer1}`);
    randomPass = false;
    break;
  }
}
console.log(`Randomized Property Tests (5,000 cases): ${randomPass ? "ALL PASSED" : "FAILED"}`);

console.log("\n=== MASTER BTU AUDIT SUITE COMPLETE ===");
