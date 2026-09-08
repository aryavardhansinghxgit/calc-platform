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

console.log("============================================================");
console.log("STARTING ELECTRICITY CALCULATOR AUDIT SUITE");
console.log("============================================================\n");

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;
const anomalies: string[] = [];

function assert(condition: boolean, testName: string, detail?: string) {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
  } else {
    failedAssertions++;
    const msg = `FAIL: ${testName} ${detail ? `(${detail})` : ""}`;
    console.error(msg);
    anomalies.push(msg);
  }
}

// ------------------------------------------------------------
// 1. GOLDEN CASE 1 — SINGLE APPLIANCE
// ------------------------------------------------------------
console.log("--- 1. Testing Golden Case 1 (Single Appliance) ---");
const singleGoldenInput: SingleApplianceInput = {
  powerValue: 1500,
  powerUnit: "watts",
  dutyCyclePct: 60,
  hoursPerDay: 8,
  daysPerWeek: 7,
  monthsPerYear: 12,
  currency: "USD",
  ratePerKwh: 0.16,
};
const singleGoldenRes = calculateSingleAppliance(singleGoldenInput);

assert(singleGoldenRes.effectiveWatts === 900, "Single Appliance: Effective Watts = 900", `Got ${singleGoldenRes.effectiveWatts}`);
assert(singleGoldenRes.effectiveKw === 0.9, "Single Appliance: Effective kW = 0.9", `Got ${singleGoldenRes.effectiveKw}`);
assert(singleGoldenRes.dailyKwh === 7.2, "Single Appliance: Daily kWh = 7.2", `Got ${singleGoldenRes.dailyKwh}`);
assert(singleGoldenRes.monthlyKwh === 219.2 || singleGoldenRes.monthlyKwh === 219.15, "Single Appliance: Monthly kWh ≈ 219.2", `Got ${singleGoldenRes.monthlyKwh}`);
assert(singleGoldenRes.annualKwh === 2630 || singleGoldenRes.annualKwh === 2629.8, "Single Appliance: Annual kWh ≈ 2630", `Got ${singleGoldenRes.annualKwh}`);
assert(singleGoldenRes.dailyCost === 1.15, "Single Appliance: Daily Cost = $1.15", `Got ${singleGoldenRes.dailyCost}`);
assert(singleGoldenRes.monthlyCost === 35.06, "Single Appliance: Monthly Cost = $35.06", `Got ${singleGoldenRes.monthlyCost}`);
assert(singleGoldenRes.annualCost === 420.77, "Single Appliance: Annual Cost = $420.77", `Got ${singleGoldenRes.annualCost}`);
assert(singleGoldenRes.carbonKgPerYear === 1015, "Single Appliance: Carbon = 1015 kg", `Got ${singleGoldenRes.carbonKgPerYear}`);

// ------------------------------------------------------------
// 2. GOLDEN CASE 2 — TOU
// ------------------------------------------------------------
console.log("--- 2. Testing Golden Case 2 (TOU) ---");
const touGoldenInput: TimeOfUseInput = {
  peakKwhPerDay: 8,
  offPeakKwhPerDay: 16,
  peakRate: 0.28,
  offPeakRate: 0.12,
  fixedMonthlyGridFee: 15,
  currency: "USD",
};
const touGoldenRes = calculateTimeOfUse(touGoldenInput);

assert(touGoldenRes.totalDailyKwh === 24, "TOU: Total Daily kWh = 24", `Got ${touGoldenRes.totalDailyKwh}`);
assert(touGoldenRes.totalMonthlyKwh === 730.5, "TOU: Total Monthly kWh = 730.5", `Got ${touGoldenRes.totalMonthlyKwh}`);
assert(touGoldenRes.peakMonthlyCost === 68.18, "TOU: Peak Monthly Cost = $68.18", `Got ${touGoldenRes.peakMonthlyCost}`);
assert(touGoldenRes.offPeakMonthlyCost === 58.44, "TOU: Off-Peak Monthly Cost = $58.44", `Got ${touGoldenRes.offPeakMonthlyCost}`);
assert(touGoldenRes.fixedMonthlyFee === 15.00, "TOU: Fixed Fee = $15.00", `Got ${touGoldenRes.fixedMonthlyFee}`);
assert(touGoldenRes.totalMonthlyBill === 141.62, "TOU: Total Monthly Bill = $141.62", `Got ${touGoldenRes.totalMonthlyBill}`);
assert(touGoldenRes.effectiveRatePerKwh === 0.173, "TOU: Effective Rate = $0.173/kWh", `Got ${touGoldenRes.effectiveRatePerKwh}`);
assert(touGoldenRes.totalAnnualBill === 1699.44, "TOU: Total Annual Bill = $1699.44", `Got ${touGoldenRes.totalAnnualBill}`);

// ------------------------------------------------------------
// 3. GOLDEN CASE 3 — WHOLE HOUSE
// ------------------------------------------------------------
console.log("--- 3. Testing Golden Case 3 (Whole House) ---");
const houseGoldenInput: HouseAggregatorInput = {
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
};
const houseGoldenRes = calculateHouseAggregator(houseGoldenInput);

assert(houseGoldenRes.totalMonthlyKwh === 796.5, "Whole House: Total Monthly kWh = 796.5", `Got ${houseGoldenRes.totalMonthlyKwh}`);
assert(houseGoldenRes.totalMonthlyBill === 127.44, "Whole House: Total Monthly Bill = $127.44", `Got ${houseGoldenRes.totalMonthlyBill}`);
assert(houseGoldenRes.totalAnnualBill === 1529.26, "Whole House: Total Annual Bill = $1529.26", `Got ${houseGoldenRes.totalAnnualBill}`);
assert(houseGoldenRes.totalAnnualCarbonKg === 3689, "Whole House: Carbon = 3689 kg", `Got ${houseGoldenRes.totalAnnualCarbonKg}`);
assert(houseGoldenRes.topDrainingAppliance.includes("Living Room AC") && houseGoldenRes.topDrainingAppliance.includes("46%"), "Whole House: Top Hog = Living Room AC (46%)", `Got ${houseGoldenRes.topDrainingAppliance}`);

// ------------------------------------------------------------
// 4. GOLDEN CASE 4 — ENERGY EFFICIENCY ROI
// ------------------------------------------------------------
console.log("--- 4. Testing Golden Case 4 (Energy Efficiency ROI) ---");
const effGoldenInput: EnergyEfficiencyInput = {
  oldWatts: 60,
  newWatts: 9,
  quantity: 10,
  dailyHours: 6,
  ratePerKwh: 0.16,
  replacementCostPerUnit: 4.0,
  currency: "USD",
};
const effGoldenRes = calculateEnergyEfficiency(effGoldenInput);

assert(effGoldenRes.powerSavedWatts === 510, "Efficiency: Power Saved = 510 W", `Got ${effGoldenRes.powerSavedWatts}`);
assert(effGoldenRes.dailyKwhSaved === 3.06, "Efficiency: Daily Saved = 3.06 kWh", `Got ${effGoldenRes.dailyKwhSaved}`);
assert(effGoldenRes.annualKwhSaved === 1118, "Efficiency: Annual Saved = 1118 kWh", `Got ${effGoldenRes.annualKwhSaved}`);
assert(effGoldenRes.annualCostSaved === 178.83, "Efficiency: Annual Money Saved = $178.83", `Got ${effGoldenRes.annualCostSaved}`);
assert(effGoldenRes.totalInvestmentCost === 40, "Efficiency: Investment = $40", `Got ${effGoldenRes.totalInvestmentCost}`);
assert(effGoldenRes.paybackMonths === 2.7, "Efficiency: Payback = 2.7 Months", `Got ${effGoldenRes.paybackMonths}`);
assert(effGoldenRes.annualRoiPct === 447, "Efficiency: ROI = 447%", `Got ${effGoldenRes.annualRoiPct}`);
assert(effGoldenRes.fiveYearSavings === 894, "Efficiency: 5-Year Net/Cumulative = $894", `Got ${effGoldenRes.fiveYearSavings}`);
assert(effGoldenRes.annualCarbonAvoidedKg === 431, "Efficiency: Carbon Avoided = 431 kg", `Got ${effGoldenRes.annualCarbonAvoidedKg}`);

// ------------------------------------------------------------
// 5. ZERO HANDLING & TRUTHINESS AUDIT
// ------------------------------------------------------------
console.log("--- 5. Auditing Zero Handling & Truthiness Fallbacks ---");

// Test Power = 0
const zeroPowerRes = calculateSingleAppliance({
  powerValue: 0,
  powerUnit: "watts",
  dutyCyclePct: 100,
  hoursPerDay: 4,
  daysPerWeek: 7,
  monthsPerYear: 12,
  currency: "USD",
  ratePerKwh: 0.16,
});
assert(zeroPowerRes.dailyKwh === 0, "Zero Power -> Daily kWh = 0", `Got ${zeroPowerRes.dailyKwh}`);

// Test Duty = 0
const zeroDutyRes = calculateSingleAppliance({
  powerValue: 1000,
  powerUnit: "watts",
  dutyCyclePct: 0,
  hoursPerDay: 4,
  daysPerWeek: 7,
  monthsPerYear: 12,
  currency: "USD",
  ratePerKwh: 0.16,
});
assert(zeroDutyRes.dailyKwh === 0, "Zero Duty -> Daily kWh = 0", `Got ${zeroDutyRes.dailyKwh}`);

// Test Hours = 0
const zeroHoursRes = calculateSingleAppliance({
  powerValue: 1000,
  powerUnit: "watts",
  dutyCyclePct: 100,
  hoursPerDay: 0,
  daysPerWeek: 7,
  monthsPerYear: 12,
  currency: "USD",
  ratePerKwh: 0.16,
});
assert(zeroHoursRes.dailyKwh === 0, "Zero Hours -> Daily kWh = 0", `Got ${zeroHoursRes.dailyKwh}`);

// Test Days = 0
const zeroDaysRes = calculateSingleAppliance({
  powerValue: 1000,
  powerUnit: "watts",
  dutyCyclePct: 100,
  hoursPerDay: 4,
  daysPerWeek: 0,
  monthsPerYear: 12,
  currency: "USD",
  ratePerKwh: 0.16,
});
assert(zeroDaysRes.monthlyKwh === 0, "Zero Days/Wk -> Monthly kWh = 0", `Got ${zeroDaysRes.monthlyKwh}`);

// Test Tariff = 0
const zeroRateRes = calculateSingleAppliance({
  powerValue: 1000,
  powerUnit: "watts",
  dutyCyclePct: 100,
  hoursPerDay: 4,
  daysPerWeek: 7,
  monthsPerYear: 12,
  currency: "USD",
  ratePerKwh: 0,
});
assert(zeroRateRes.monthlyCost === 0, "Zero Tariff -> Monthly Cost = 0", `Got ${zeroRateRes.monthlyCost}`);

// Test TOU Zero Rates & Zeros
const touZerosRes = calculateTimeOfUse({
  peakKwhPerDay: 0,
  offPeakKwhPerDay: 0,
  peakRate: 0,
  offPeakRate: 0,
  fixedMonthlyGridFee: 0,
  currency: "USD",
});
assert(touZerosRes.totalDailyKwh === 0, "TOU Zero Inputs -> Daily kWh = 0", `Got ${touZerosRes.totalDailyKwh}`);
assert(touZerosRes.totalMonthlyBill === 0, "TOU Zero Inputs -> Monthly Bill = 0", `Got ${touZerosRes.totalMonthlyBill}`);
assert(!isNaN(touZerosRes.effectiveRatePerKwh) && isFinite(touZerosRes.effectiveRatePerKwh), "TOU Zero -> Effective Rate is not NaN", `Got ${touZerosRes.effectiveRatePerKwh}`);

// Test ROI Zero Upgrade
const effZeroRes = calculateEnergyEfficiency({
  oldWatts: 50,
  newWatts: 50,
  quantity: 10,
  dailyHours: 6,
  ratePerKwh: 0.16,
  replacementCostPerUnit: 4,
  currency: "USD",
});
assert(effZeroRes.powerSavedWatts === 0, "ROI Old == New -> Power Saved = 0", `Got ${effZeroRes.powerSavedWatts}`);
assert(effZeroRes.annualCostSaved === 0, "ROI Old == New -> Annual Cost Saved = 0", `Got ${effZeroRes.annualCostSaved}`);
assert(!isNaN(effZeroRes.paybackMonths) && isFinite(effZeroRes.paybackMonths), "ROI Zero Savings -> Payback is finite", `Got ${effZeroRes.paybackMonths}`);

// ------------------------------------------------------------
// 6. POWER UNIT CONVERSIONS AUDIT
// ------------------------------------------------------------
console.log("--- 6. Auditing Power Unit Conversions ---");
const kwW = convertPowerToWatts(1.5, "kilowatts");
assert(Math.abs(kwW - 1500) < 1e-6, "1.5 kW = 1500 W", `Got ${kwW}`);

const btuW = convertPowerToWatts(12000, "btu_hr");
assert(Math.abs(btuW - 3516.852) < 0.1, "12,000 BTU/hr ≈ 3,516.85 W", `Got ${btuW}`);

const mechHpW = convertPowerToWatts(1, "mechanical_hp");
assert(Math.abs(mechHpW - 745.7) < 0.1, "1 Mechanical HP ≈ 745.7 W", `Got ${mechHpW}`);

const metricHpW = convertPowerToWatts(1, "metric_hp");
assert(Math.abs(metricHpW - 735.5) < 0.1, "1 Metric HP ≈ 735.5 W", `Got ${metricHpW}`);

const trW = convertPowerToWatts(1, "refrigeration_tons");
assert(Math.abs(trW - 3516.85) < 0.1, "1 Ton Refrigeration ≈ 3,516.85 W", `Got ${trW}`);

// ------------------------------------------------------------
// 7. PROPERTY TESTS (5000+ per category, 30,000+ total)
// ------------------------------------------------------------
console.log("--- 7. Running Randomized Property Tests (30,000+ Assertions) ---");

// Property 1: Linearity with power
for (let i = 0; i < 6000; i++) {
  const w1 = Math.floor(Math.random() * 5000) + 10;
  const w2 = w1 * 2;
  const hrs = Math.random() * 20 + 1;
  const duty = Math.floor(Math.random() * 100) + 1;
  const r1 = calculateSingleAppliance({ powerValue: w1, powerUnit: "watts", dutyCyclePct: duty, hoursPerDay: hrs, daysPerWeek: 7, monthsPerYear: 12, currency: "USD", ratePerKwh: 0.16 });
  const r2 = calculateSingleAppliance({ powerValue: w2, powerUnit: "watts", dutyCyclePct: duty, hoursPerDay: hrs, daysPerWeek: 7, monthsPerYear: 12, currency: "USD", ratePerKwh: 0.16 });
  assert(Math.abs(r2.dailyKwh - 2 * r1.dailyKwh) <= 0.03, `Property 1: Daily kWh scales linearly with Watts (iter ${i})`, `r1: ${r1.dailyKwh}, r2: ${r2.dailyKwh}`);
}

// Property 2: TOU conservation of energy
for (let i = 0; i < 6000; i++) {
  const peak = Math.random() * 30 + 1;
  const offpeak = Math.random() * 30 + 1;
  const resA = calculateTimeOfUse({ peakKwhPerDay: peak, offPeakKwhPerDay: offpeak, peakRate: 0.25, offPeakRate: 0.10, fixedMonthlyGridFee: 10, currency: "USD" });
  const resB = calculateTimeOfUse({ peakKwhPerDay: offpeak, offPeakKwhPerDay: peak, peakRate: 0.25, offPeakRate: 0.10, fixedMonthlyGridFee: 10, currency: "USD" });
  assert(Math.abs(resA.totalDailyKwh - resB.totalDailyKwh) <= 0.1, `Property 2: TOU Energy conservation regardless of peak/offpeak swap (iter ${i})`);
}

// Property 3: TOU flat rate cross-check
for (let i = 0; i < 6000; i++) {
  const peak = Math.random() * 20 + 1;
  const offpeak = Math.random() * 20 + 1;
  const flatRate = 0.20;
  const res = calculateTimeOfUse({ peakKwhPerDay: peak, offPeakKwhPerDay: offpeak, peakRate: flatRate, offPeakRate: flatRate, fixedMonthlyGridFee: 0, currency: "USD" });
  const expectedMonthlyCost = res.totalMonthlyKwh * flatRate;
  assert(Math.abs(res.totalMonthlyBill - expectedMonthlyCost) <= 0.05, `Property 3: Equal TOU rates with zero fixed fee = flat tariff (iter ${i})`);
}

// Property 4: Whole-house quantity scaling
for (let i = 0; i < 6000; i++) {
  const w = Math.floor(Math.random() * 2000) + 10;
  const h = Math.random() * 20 + 1;
  const res1 = calculateHouseAggregator({ appliances: [{ id: "1", name: "A", quantity: 1, powerWatts: w, dailyHours: h, category: "G" }], ratePerKwh: 0.16, currency: "USD" });
  const res2 = calculateHouseAggregator({ appliances: [{ id: "1", name: "A", quantity: 3, powerWatts: w, dailyHours: h, category: "G" }], ratePerKwh: 0.16, currency: "USD" });
  assert(Math.abs(res2.totalMonthlyBill - 3 * res1.totalMonthlyBill) <= 0.05, `Property 4: Whole-House Quantity scales total bill (iter ${i})`);
}

// Property 5: ROI savings scale with power reduction
for (let i = 0; i < 6000; i++) {
  const oldW = 100;
  const newW1 = 50; // delta 50
  const newW2 = 0;  // delta 100
  const res1 = calculateEnergyEfficiency({ oldWatts: oldW, newWatts: newW1, quantity: 5, dailyHours: 8, ratePerKwh: 0.16, replacementCostPerUnit: 5, currency: "USD" });
  const res2 = calculateEnergyEfficiency({ oldWatts: oldW, newWatts: newW2, quantity: 5, dailyHours: 8, ratePerKwh: 0.16, replacementCostPerUnit: 5, currency: "USD" });
  assert(Math.abs(res2.annualCostSaved - 2 * res1.annualCostSaved) <= 0.05, `Property 5: ROI savings scale linearly with watt delta (iter ${i})`);
}

console.log("\n============================================================");
console.log(`AUDIT COMPLETE: ${totalAssertions} assertions`);
console.log(`PASSED: ${passedAssertions}`);
console.log(`FAILED: ${failedAssertions}`);
console.log(`ANOMALIES DETECTED: ${anomalies.length}`);
console.log("============================================================\n");

if (anomalies.length > 0) {
  console.log("ANOMALY SUMMARY:");
  anomalies.slice(0, 20).forEach((a) => console.log(" - " + a));
}
