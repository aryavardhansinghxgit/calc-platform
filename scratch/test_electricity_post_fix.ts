import {
  calculateSingleAppliance,
  calculateTimeOfUse,
  calculateHouseAggregator,
  calculateEnergyEfficiency,
  convertPowerToWatts,
  CURRENCY_CONFIGS,
  APPLIANCE_PRESETS,
  SingleApplianceInput,
  TimeOfUseInput,
  HouseAggregatorInput,
  EnergyEfficiencyInput,
} from "../src/lib/calculator-engine/formulas/electricity";
import { calculateElectricityCalculator } from "../src/app/calculators/electricity-calculator/calculator";

console.log("============================================================");
console.log("POST-FIX EXHAUSTIVE REGRESSION SUITE: ELECTRICITY CALCULATOR");
console.log("============================================================\n");

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;
const failures: string[] = [];

function check(condition: boolean, testName: string, detail?: string) {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
  } else {
    failedAssertions++;
    const msg = `FAIL: ${testName} ${detail ? `(${detail})` : ""}`;
    console.error(msg);
    failures.push(msg);
  }
}

// ------------------------------------------------------------
// 1. GOLDEN CASE 1 — SINGLE APPLIANCE
// ------------------------------------------------------------
console.log("1. Verifying Golden Case 1 (Single Appliance)...");
const singleRes = calculateSingleAppliance({
  powerValue: 1500,
  powerUnit: "watts",
  dutyCyclePct: 60,
  hoursPerDay: 8,
  daysPerWeek: 7,
  monthsPerYear: 12,
  currency: "USD",
  ratePerKwh: 0.16,
});
check(singleRes.effectiveWatts === 900, "Single Appliance: Effective Watts == 900", `Got ${singleRes.effectiveWatts}`);
check(singleRes.effectiveKw === 0.9, "Single Appliance: Effective kW == 0.9", `Got ${singleRes.effectiveKw}`);
check(singleRes.dailyKwh === 7.2, "Single Appliance: Daily kWh == 7.2", `Got ${singleRes.dailyKwh}`);
check(singleRes.monthlyKwh === 219.2, "Single Appliance: Monthly kWh == 219.2", `Got ${singleRes.monthlyKwh}`);
check(singleRes.annualKwh === 2630, "Single Appliance: Annual kWh == 2630", `Got ${singleRes.annualKwh}`);
check(singleRes.dailyCost === 1.15, "Single Appliance: Daily Cost == $1.15", `Got ${singleRes.dailyCost}`);
check(singleRes.monthlyCost === 35.06, "Single Appliance: Monthly Cost == $35.06", `Got ${singleRes.monthlyCost}`);
check(singleRes.annualCost === 420.77, "Single Appliance: Annual Cost == $420.77", `Got ${singleRes.annualCost}`);
check(singleRes.carbonKgPerYear === 1015, "Single Appliance: Carbon == 1015 kg", `Got ${singleRes.carbonKgPerYear}`);

// ------------------------------------------------------------
// 2. GOLDEN CASE 2 — TIME-OF-USE (TOU)
// ------------------------------------------------------------
console.log("2. Verifying Golden Case 2 (TOU)...");
const touRes = calculateTimeOfUse({
  peakKwhPerDay: 8,
  offPeakKwhPerDay: 16,
  peakRate: 0.28,
  offPeakRate: 0.12,
  fixedMonthlyGridFee: 15,
  currency: "USD",
});
check(touRes.totalDailyKwh === 24.0, "TOU: Total Daily kWh == 24.0", `Got ${touRes.totalDailyKwh}`);
check(touRes.totalMonthlyKwh === 730.5, "TOU: Total Monthly kWh == 730.5", `Got ${touRes.totalMonthlyKwh}`);
check(touRes.peakMonthlyCost === 68.18, "TOU: Peak Monthly Cost == $68.18", `Got ${touRes.peakMonthlyCost}`);
check(touRes.offPeakMonthlyCost === 58.44, "TOU: Off-Peak Monthly Cost == $58.44", `Got ${touRes.offPeakMonthlyCost}`);
check(touRes.fixedMonthlyFee === 15.0, "TOU: Fixed Fee == $15.00", `Got ${touRes.fixedMonthlyFee}`);
check(touRes.totalMonthlyBill === 141.62, "TOU: Total Monthly Bill == $141.62", `Got ${touRes.totalMonthlyBill}`);
check(touRes.effectiveRatePerKwh === 0.173, "TOU: Effective Rate == $0.173/kWh", `Got ${touRes.effectiveRatePerKwh}`);
check(touRes.totalAnnualBill === 1699.44, "TOU: Total Annual Bill == $1699.44", `Got ${touRes.totalAnnualBill}`);

// ------------------------------------------------------------
// 3. GOLDEN CASE 3 — WHOLE HOUSE AGGREGATOR
// ------------------------------------------------------------
console.log("3. Verifying Golden Case 3 (Whole House)...");
const houseRes = calculateHouseAggregator({
  appliances: [
    { id: "1", name: "Living Room AC (1.5 Ton)", quantity: 1, powerWatts: 1500, dailyHours: 8, category: "HVAC" },
    { id: "2", name: "Refrigerator (Frost-Free)", quantity: 1, powerWatts: 200, dailyHours: 24, category: "Kitchen" },
    { id: "3", name: "Water Heater / Geyser", quantity: 1, powerWatts: 3000, dailyHours: 1.5, category: "Laundry" },
    { id: "4", name: "Smart TV (55\")", quantity: 2, powerWatts: 110, dailyHours: 5, category: "Entertainment" },
    { id: "5", name: "Ceiling Fans", quantity: 4, powerWatts: 65, dailyHours: 12, category: "HVAC" },
    { id: "6", name: "LED Lights (9W)", quantity: 12, powerWatts: 9, dailyHours: 6, category: "Lighting" },
  ],
  ratePerKwh: 0.16,
  currency: "USD",
});
check(houseRes.totalMonthlyKwh === 796.5, "Whole House: Total Monthly kWh == 796.5", `Got ${houseRes.totalMonthlyKwh}`);
check(houseRes.totalMonthlyBill === 127.44, "Whole House: Total Monthly Bill == $127.44", `Got ${houseRes.totalMonthlyBill}`);
check(houseRes.totalAnnualBill === 1529.26, "Whole House: Total Annual Bill == $1529.26", `Got ${houseRes.totalAnnualBill}`);
check(houseRes.topDrainingAppliance.includes("Living Room AC") && houseRes.topDrainingAppliance.includes("46%"), "Whole House: Top Hog == Living Room AC (46%)", `Got ${houseRes.topDrainingAppliance}`);
check(houseRes.totalAnnualCarbonKg === 3689, "Whole House: Carbon == 3689 kg", `Got ${houseRes.totalAnnualCarbonKg}`);

// ------------------------------------------------------------
// 4. GOLDEN CASE 4 — ENERGY EFFICIENCY ROI
// ------------------------------------------------------------
console.log("4. Verifying Golden Case 4 (Efficiency Upgrade ROI)...");
const effRes = calculateEnergyEfficiency({
  oldWatts: 60,
  newWatts: 9,
  quantity: 10,
  dailyHours: 6,
  ratePerKwh: 0.16,
  replacementCostPerUnit: 4.0,
  currency: "USD",
});
check(effRes.powerSavedWatts === 510, "Efficiency: Power Saved == 510 W", `Got ${effRes.powerSavedWatts}`);
check(effRes.dailyKwhSaved === 3.06, "Efficiency: Daily Saved == 3.06 kWh", `Got ${effRes.dailyKwhSaved}`);
check(effRes.annualKwhSaved === 1118, "Efficiency: Annual Saved == 1118 kWh", `Got ${effRes.annualKwhSaved}`);
check(effRes.annualCostSaved === 178.83, "Efficiency: Annual Cost Saved == $178.83", `Got ${effRes.annualCostSaved}`);
check(effRes.totalInvestmentCost === 40.0, "Efficiency: Total Investment == $40.00", `Got ${effRes.totalInvestmentCost}`);
check(effRes.paybackMonths === 2.7, "Efficiency: Payback Period == 2.7 Months", `Got ${effRes.paybackMonths}`);
check(effRes.annualRoiPct === 447, "Efficiency: Annual ROI == 447%", `Got ${effRes.annualRoiPct}`);
check(effRes.fiveYearSavings === 894, "Efficiency: 5-Year Cumulative Savings == $894", `Got ${effRes.fiveYearSavings}`);
check(effRes.fiveYearNetProfit === 854, "Efficiency: 5-Year Net Profit == $854", `Got ${effRes.fiveYearNetProfit}`);
check(effRes.annualCarbonAvoidedKg === 431, "Efficiency: Carbon Avoided == 431 kg", `Got ${effRes.annualCarbonAvoidedKg}`);

// ------------------------------------------------------------
// 5. ZERO HANDLING TEST MATRIX
// ------------------------------------------------------------
console.log("5. Testing Exact Zero Handling...");
// Power = 0
const z1 = calculateSingleAppliance({ powerValue: 0, powerUnit: "watts", dutyCyclePct: 100, hoursPerDay: 4, daysPerWeek: 7, monthsPerYear: 12, currency: "USD", ratePerKwh: 0.16 });
check(z1.effectiveWatts === 0 && z1.dailyKwh === 0 && z1.monthlyCost === 0, "Zero Power Rating produces 0 kWh and $0 cost", `Got ${z1.dailyKwh}`);

// Duty = 0
const z2 = calculateSingleAppliance({ powerValue: 1500, powerUnit: "watts", dutyCyclePct: 0, hoursPerDay: 4, daysPerWeek: 7, monthsPerYear: 12, currency: "USD", ratePerKwh: 0.16 });
check(z2.effectiveWatts === 0 && z2.dailyKwh === 0 && z2.monthlyCost === 0, "Zero Duty Cycle produces 0 kWh and $0 cost", `Got ${z2.dailyKwh}`);

// Hours = 0
const z3 = calculateSingleAppliance({ powerValue: 1500, powerUnit: "watts", dutyCyclePct: 100, hoursPerDay: 0, daysPerWeek: 7, monthsPerYear: 12, currency: "USD", ratePerKwh: 0.16 });
check(z3.dailyKwh === 0 && z3.monthlyCost === 0, "Zero Hours produces 0 kWh and $0 cost", `Got ${z3.dailyKwh}`);

// Days = 0
const z4 = calculateSingleAppliance({ powerValue: 1500, powerUnit: "watts", dutyCyclePct: 100, hoursPerDay: 4, daysPerWeek: 0, monthsPerYear: 12, currency: "USD", ratePerKwh: 0.16 });
check(z4.monthlyKwh === 0 && z4.monthlyCost === 0, "Zero Days/Week produces 0 monthly kWh and $0 cost", `Got ${z4.monthlyKwh}`);

// Tariff = 0
const z5 = calculateSingleAppliance({ powerValue: 1500, powerUnit: "watts", dutyCyclePct: 100, hoursPerDay: 4, daysPerWeek: 7, monthsPerYear: 12, currency: "USD", ratePerKwh: 0 });
check(z5.dailyKwh > 0 && z5.monthlyCost === 0, "Zero Tariff produces positive kWh but $0 cost", `Got cost: ${z5.monthlyCost}`);

// TOU Zero Inputs
const z6 = calculateTimeOfUse({ peakKwhPerDay: 0, offPeakKwhPerDay: 0, peakRate: 0, offPeakRate: 0, fixedMonthlyGridFee: 0, currency: "USD" });
check(z6.totalDailyKwh === 0 && z6.totalMonthlyBill === 0 && z6.effectiveRatePerKwh === 0, "TOU All Zeros produces $0 bill without NaN", `Got ${z6.totalMonthlyBill}`);

// TOU Fixed Fee Zero
const z7 = calculateTimeOfUse({ peakKwhPerDay: 10, offPeakKwhPerDay: 10, peakRate: 0.20, offPeakRate: 0.10, fixedMonthlyGridFee: 0, currency: "USD" });
check(z7.fixedMonthlyFee === 0, "TOU Zero Fixed Fee preserved as $0.00", `Got ${z7.fixedMonthlyFee}`);

// Whole House All Zeros
const z8 = calculateHouseAggregator({ appliances: [{ id: "1", name: "A", quantity: 0, powerWatts: 0, dailyHours: 0, category: "G" }], ratePerKwh: 0.16, currency: "USD" });
check(z8.totalDailyKwh === 0 && z8.totalMonthlyBill === 0 && z8.topDrainingAppliance === "None", "Whole House All Zeros produces 0 kWh and top hog 'None'", `Got ${z8.topDrainingAppliance}`);

// ROI Zero New Power
const z9 = calculateEnergyEfficiency({ oldWatts: 50, newWatts: 0, quantity: 2, dailyHours: 5, ratePerKwh: 0.16, replacementCostPerUnit: 10, currency: "USD" });
check(z9.powerSavedWatts === 100, "ROI Zero New Watts saves full 50W per unit (100W total)", `Got ${z9.powerSavedWatts}`);

// ROI Zero Investment
const z10 = calculateEnergyEfficiency({ oldWatts: 50, newWatts: 10, quantity: 2, dailyHours: 5, ratePerKwh: 0.16, replacementCostPerUnit: 0, currency: "USD" });
check(z10.totalInvestmentCost === 0 && z10.paybackMonths === 0 && !isNaN(z10.paybackMonths), "ROI Zero Cost produces 0 payback months without NaN/Infinity", `Got ${z10.paybackMonths}`);

// ------------------------------------------------------------
// 6. POWER UNIT CONVERSIONS
// ------------------------------------------------------------
console.log("6. Verifying Power Unit Conversions...");
check(Math.abs(convertPowerToWatts(1.5, "kilowatts") - 1500) < 1e-6, "1.5 kW == 1500 W");
check(Math.abs(convertPowerToWatts(12000, "btu_hr") - 3516.852) < 0.1, "12,000 BTU/hr ≈ 3516.85 W");
check(Math.abs(convertPowerToWatts(1, "mechanical_hp") - 745.7) < 0.1, "1 Mechanical HP ≈ 745.7 W");
check(Math.abs(convertPowerToWatts(1, "metric_hp") - 735.5) < 0.1, "1 Metric HP ≈ 735.5 W");
check(Math.abs(convertPowerToWatts(1, "refrigeration_tons") - 3516.85) < 0.1, "1 Ton Refrigeration ≈ 3516.85 W");

// ------------------------------------------------------------
// 7. RANDOMIZED PROPERTY TESTS (35,000+ Assertions)
// ------------------------------------------------------------
console.log("7. Running Randomized Property Batteries (35,000+ Assertions)...");

// Battery 1: Single Appliance Power Linearity (5,000 tests)
for (let i = 0; i < 5000; i++) {
  const w = Math.floor(Math.random() * 4000) + 1;
  const h = Math.random() * 24;
  const d = Math.random() * 100;
  const r1 = calculateSingleAppliance({ powerValue: w, powerUnit: "watts", dutyCyclePct: d, hoursPerDay: h, daysPerWeek: 7, monthsPerYear: 12, currency: "USD", ratePerKwh: 0.16 });
  const r2 = calculateSingleAppliance({ powerValue: w * 2, powerUnit: "watts", dutyCyclePct: d, hoursPerDay: h, daysPerWeek: 7, monthsPerYear: 12, currency: "USD", ratePerKwh: 0.16 });
  check(Math.abs(r2.dailyKwh - 2 * r1.dailyKwh) <= 0.03, `Power Linearity iter ${i}`);
}

// Battery 2: Runtime Linearity (5,000 tests)
for (let i = 0; i < 5000; i++) {
  const w = Math.floor(Math.random() * 2000) + 50;
  const h = Math.random() * 12;
  const r1 = calculateSingleAppliance({ powerValue: w, powerUnit: "watts", dutyCyclePct: 100, hoursPerDay: h, daysPerWeek: 7, monthsPerYear: 12, currency: "USD", ratePerKwh: 0.16 });
  const r2 = calculateSingleAppliance({ powerValue: w, powerUnit: "watts", dutyCyclePct: 100, hoursPerDay: h * 2, daysPerWeek: 7, monthsPerYear: 12, currency: "USD", ratePerKwh: 0.16 });
  check(Math.abs(r2.dailyKwh - 2 * r1.dailyKwh) <= 0.03, `Runtime Linearity iter ${i}`);
}

// Battery 3: TOU Energy Conservation on Swap (5,000 tests)
for (let i = 0; i < 5000; i++) {
  const p = Math.random() * 50;
  const op = Math.random() * 50;
  const resA = calculateTimeOfUse({ peakKwhPerDay: p, offPeakKwhPerDay: op, peakRate: 0.30, offPeakRate: 0.15, fixedMonthlyGridFee: 10, currency: "USD" });
  const resB = calculateTimeOfUse({ peakKwhPerDay: op, offPeakKwhPerDay: p, peakRate: 0.30, offPeakRate: 0.15, fixedMonthlyGridFee: 10, currency: "USD" });
  check(Math.abs(resA.totalDailyKwh - resB.totalDailyKwh) <= 0.01, `TOU Swap Energy Conservation iter ${i}`);
}

// Battery 4: TOU Flat-Rate Invariance (5,000 tests)
for (let i = 0; i < 5000; i++) {
  const p = Math.random() * 30;
  const op = Math.random() * 30;
  const flat = Math.random() * 0.40 + 0.05;
  const res = calculateTimeOfUse({ peakKwhPerDay: p, offPeakKwhPerDay: op, peakRate: flat, offPeakRate: flat, fixedMonthlyGridFee: 0, currency: "USD" });
  const expectedMonthlyCost = res.totalMonthlyKwh * flat;
  check(Math.abs(res.totalMonthlyBill - expectedMonthlyCost) <= 0.05, `TOU Flat-Rate Invariance iter ${i}`);
}

// Battery 5: TOU Fixed Fee Differential (5,000 tests)
for (let i = 0; i < 5000; i++) {
  const p = Math.random() * 20;
  const op = Math.random() * 20;
  const fee1 = Math.random() * 20;
  const delta = Math.random() * 15;
  const res1 = calculateTimeOfUse({ peakKwhPerDay: p, offPeakKwhPerDay: op, peakRate: 0.25, offPeakRate: 0.12, fixedMonthlyGridFee: fee1, currency: "USD" });
  const res2 = calculateTimeOfUse({ peakKwhPerDay: p, offPeakKwhPerDay: op, peakRate: 0.25, offPeakRate: 0.12, fixedMonthlyGridFee: fee1 + delta, currency: "USD" });
  check(Math.abs((res2.totalMonthlyBill - res1.totalMonthlyBill) - delta) <= 0.02, `TOU Fixed Fee Delta iter ${i}`);
}

// Battery 6: Whole House Quantity Scaling (5,000 tests)
for (let i = 0; i < 5000; i++) {
  const w = Math.floor(Math.random() * 2500) + 10;
  const h = Math.random() * 24;
  const res1 = calculateHouseAggregator({ appliances: [{ id: "1", name: "A", quantity: 1, powerWatts: w, dailyHours: h, category: "G" }], ratePerKwh: 0.16, currency: "USD" });
  const res3 = calculateHouseAggregator({ appliances: [{ id: "1", name: "A", quantity: 3, powerWatts: w, dailyHours: h, category: "G" }], ratePerKwh: 0.16, currency: "USD" });
  check(Math.abs(res3.totalMonthlyBill - 3 * res1.totalMonthlyBill) <= 0.05, `Whole-House Qty Scaling iter ${i}`);
}

// Battery 7: Fallback Calculator Equivalence (5,000 tests)
for (let i = 0; i < 5000; i++) {
  const w = Math.floor(Math.random() * 3000) + 10;
  const h = Math.random() * 20 + 0.5;
  const r = Math.random() * 0.4 + 0.05;
  const primary = calculateSingleAppliance({ powerValue: w, powerUnit: "watts", dutyCyclePct: 100, hoursPerDay: h, daysPerWeek: 7, monthsPerYear: 12, currency: "USD", ratePerKwh: r });
  const fallback = calculateElectricityCalculator({ wattage: w, hoursPerDay: h, costPerKwh: r });
  check(Math.abs(primary.monthlyCost - fallback.monthlyCost) <= 0.02, `Fallback Engine Equivalence iter ${i}`);
}

console.log("\n============================================================");
console.log(`POST-FIX TEST RESULTS: ${totalAssertions} assertions`);
console.log(`PASSED: ${passedAssertions}`);
console.log(`FAILED: ${failedAssertions}`);
console.log(`STATUS: ${failedAssertions === 0 ? "100% CLEAN - ALL TESTS PASSED" : "FAILURES DETECTED"}`);
console.log("============================================================\n");
