export {};

import {
  calculateAcCoolingBtu,
  calculateHeatingBtu,
  calculateEnergyCostAndSizing,
} from "../src/lib/calculator-engine/formulas/btu";

console.log("=== BTU POST-FIX REGRESSION TEST SUITE ===");

// ─── 1. DEFECT-BTU-01: Zero Cost / Zero Hours Tests ─────────────────────────
console.log("\n--- 1. ZERO COST / HOURS TESTS ---");

// Test 1A: hours = 0, rate = 0.16
const c1 = calculateEnergyCostAndSizing({
  btuRating: 18000,
  seerRating: 16,
  dailyHours: 0,
  electricityRatePerKwh: 0.16,
});
console.log("Hours = 0, Rate = 0.16:", {
  dailyCost: c1.dailyCost,
  monthlyCost: c1.monthlyCost,
  annualCost: c1.annualCost,
  co2: c1.co2KgPerYear,
});
const pass1A = c1.dailyCost === 0 && c1.monthlyCost === 0 && c1.annualCost === 0 && c1.co2KgPerYear === 0;
console.log("Test 1A (Hours = 0 -> Cost = 0) PASS:", pass1A);

// Test 1B: hours = 8, rate = 0
const c2 = calculateEnergyCostAndSizing({
  btuRating: 18000,
  seerRating: 16,
  dailyHours: 8,
  electricityRatePerKwh: 0,
});
console.log("Hours = 8, Rate = 0:", {
  dailyCost: c2.dailyCost,
  monthlyCost: c2.monthlyCost,
  annualCost: c2.annualCost,
});
const pass1B = c2.dailyCost === 0 && c2.monthlyCost === 0 && c2.annualCost === 0;
console.log("Test 1B (Rate = 0 -> Cost = 0) PASS:", pass1B);

// Test 1C: hours = 0, rate = 0
const c3 = calculateEnergyCostAndSizing({
  btuRating: 18000,
  seerRating: 16,
  dailyHours: 0,
  electricityRatePerKwh: 0,
});
const pass1C = c3.dailyCost === 0 && c3.monthlyCost === 0 && c3.annualCost === 0;
console.log("Test 1C (Hours = 0 & Rate = 0 -> Cost = 0) PASS:", pass1C);

// Test 1D: Standard Golden Reference Case EN-01
const cGold = calculateEnergyCostAndSizing({
  btuRating: 18000,
  seerRating: 16,
  dailyHours: 8,
  electricityRatePerKwh: 0.16,
});
const pass1D = (
  cGold.dailyCost === 1.44 &&
  cGold.monthlyCost === 43.80 &&
  cGold.annualCost === 525.60 &&
  cGold.co2KgPerYear === 1275
);
console.log("Test 1D (Golden EN-01 Unchanged) PASS:", pass1D, cGold);

// ─── 2. DEFECT-BTU-02 & Heating Gradient Tests ─────────────────────────────
console.log("\n--- 2. HEATING TEMPERATURE GRADIENT TESTS ---");

// Test 2A: 70°F in / 20°F out -> Valid
const h1 = calculateHeatingBtu({ length: 30, width: 40, height: 9, desiredIndoorTemp: 70, outdoorLowTemp: 20 });
console.log("70°F in / 20°F out:", { btu: h1.totalHeatingBtu, invalid: h1.invalidTempGradient });
const pass2A = !h1.invalidTempGradient && h1.totalHeatingBtu === 70200;
console.log("Test 2A PASS:", pass2A);

// Test 2B: 70°F in / 30°F out -> Valid
const h2 = calculateHeatingBtu({ length: 30, width: 40, height: 9, desiredIndoorTemp: 70, outdoorLowTemp: 30 });
const pass2B = !h2.invalidTempGradient && h2.totalHeatingBtu === 56160;
console.log("Test 2B PASS:", pass2B);

// Test 2C: 65°F in / 20°F out -> Valid
const h3 = calculateHeatingBtu({ length: 30, width: 40, height: 9, desiredIndoorTemp: 65, outdoorLowTemp: 20 });
const pass2C = !h3.invalidTempGradient && h3.totalHeatingBtu === 63180;
console.log("Test 2C PASS:", pass2C);

// Test 2D: 70°F in / 70°F out -> Invalid Gradient
const h4 = calculateHeatingBtu({ length: 30, width: 40, height: 9, desiredIndoorTemp: 70, outdoorLowTemp: 70 });
console.log("70°F in / 70°F out:", { btu: h4.totalHeatingBtu, invalid: h4.invalidTempGradient, err: h4.validationError });
const pass2D = h4.invalidTempGradient === true && h4.totalHeatingBtu === 0;
console.log("Test 2D (70°F / 70°F Invalid) PASS:", pass2D);

// Test 2E: 20°F in / 70°F out -> Invalid Gradient
const h5 = calculateHeatingBtu({ length: 30, width: 40, height: 9, desiredIndoorTemp: 20, outdoorLowTemp: 70 });
console.log("20°F in / 70°F out:", { btu: h5.totalHeatingBtu, invalid: h5.invalidTempGradient, err: h5.validationError });
const pass2E = h5.invalidTempGradient === true && h5.totalHeatingBtu === 0;
console.log("Test 2E (20°F / 70°F Invalid) PASS:", pass2E);

// ─── 3. AC COOLING GOLDEN TESTS ─────────────────────────────────────────────
console.log("\n--- 3. AC COOLING GOLDEN TESTS ---");
const acGold = calculateAcCoolingBtu({
  length: 15,
  width: 20,
  ceilingHeight: 9,
  occupants: 2,
  roomType: "bedroom",
  insulation: "average",
  sunExposure: "moderate",
  climateZone: "average",
  quantity: 1,
});
const passAC = (
  acGold.totalBtuPerHour === 8750 &&
  acGold.recommendedTons === 0.75 &&
  acGold.powerKw === 2.56 &&
  acGold.powerHp === 3.43 &&
  acGold.unitTypeRecommendation === "Window Unit"
);
console.log("AC Golden AC-01 PASS:", passAC, { btu: acGold.totalBtuPerHour, tons: acGold.recommendedTons });

// ─── 4. 5,000 RANDOMIZED PROPERTY TESTS ─────────────────────────────────────
console.log("\n--- 4. 5,000 RANDOMIZED PROPERTY TESTS ---");
let propertyPass = true;
for (let i = 0; i < 5000; i++) {
  // SEER monotonicity: higher SEER must never increase annual cost
  const btu = 5000 + Math.random() * 40000;
  const hours = Math.random() * 24;
  const rate = Math.random() * 0.5;
  const seer1 = 10 + Math.random() * 7;
  const seer2 = seer1 + 1 + Math.random() * 7;

  const costA = calculateEnergyCostAndSizing({ btuRating: btu, seerRating: seer1, dailyHours: hours, electricityRatePerKwh: rate });
  const costB = calculateEnergyCostAndSizing({ btuRating: btu, seerRating: seer2, dailyHours: hours, electricityRatePerKwh: rate });

  if (costB.annualCost > costA.annualCost) {
    console.error(`Property violation: SEER ${seer2} cost ${costB.annualCost} > SEER ${seer1} cost ${costA.annualCost}`);
    propertyPass = false;
    break;
  }
}
console.log("5,000 Randomized Property Tests PASS:", propertyPass);

// ─── 5. SSR & FAQ LEAK TEST ────────────────────────────────────────────────
console.log("\n--- 5. SSR & FAQ LEAK AUDIT ---");
async function testSSR() {
  const res = await fetch("http://localhost:3000/calculators/btu-calculator");
  console.log("SSR Status:", res.status);
  const html = await res.text();

  const hasH1 = html.includes("<h1") && html.includes("BTU Calculator</h1>");
  // Check if FAQ header is rendered on page
  const hasFaqH3 = html.includes("<h3") && html.includes("Frequently Asked Questions");
  console.log("Single H1 Present:", hasH1);
  console.log("FAQ Section Leakage in SSR HTML:", hasFaqH3);
  const passSSR = res.status === 200 && hasH1 && !hasFaqH3;
  console.log("SSR / SEO Cleanliness (No FAQ Leak) PASS:", passSSR);
}

testSSR().catch(console.error);
