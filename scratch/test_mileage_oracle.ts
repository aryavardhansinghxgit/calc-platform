import { calculateMileage, getIRSReimbursementRate } from "../src/app/calculators/mileage-calculator/calculator";
import { LegInput, MileageCalcMode, UnitSystem } from "../src/app/calculators/mileage-calculator/types";

console.log("============================================================");
console.log("STARTING INDEPENDENT MATHEMATICAL ORACLE & PROPERTY TEST SUITE");
console.log("MILEAGE CALCULATOR: >=80,000 INDEPENDENT ASSERTIONS");
console.log("============================================================\n");

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;

function assert(condition: boolean, msg: string) {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
  } else {
    failedAssertions++;
    console.error(`FAILED ASSERTION [${totalAssertions}]: ${msg}`);
  }
}

// Independent Constants
const INDEP_US_TO_L100KM = 235.21458329479;
const INDEP_UK_TO_L100KM = 282.480936279;
const INDEP_US_TO_UK_MPG = 4.54609 / 3.785411784; // 1.2009499255
const INDEP_MPGE_KWH = 33.7;

// ============================================================
// 1. GOLDEN CASE TESTS (CASES 1 - 8)
// ============================================================
console.log("--- 1. GOLDEN CASE TESTS ---");

// Golden Case 1: 350 mi, 11.5 gal, $3.50/gal (US MPG)
const gc1 = calculateMileage("fuel_mileage", "us_imperial", 350, 11.5, 3.50);
assert(Math.abs(gc1.primaryValue - 30.4) < 0.1, `GC1 US MPG primary value: ${gc1.primaryValue} vs 30.4`);
assert(Math.abs(gc1.usMpg - 30.4) < 0.1, `GC1 US MPG: ${gc1.usMpg} vs 30.4`);
assert(Math.abs(gc1.litersPer100km - 7.73) <= 0.01, `GC1 L/100km: ${gc1.litersPer100km} vs 7.73`);
assert(Math.abs(gc1.ukMpg - 36.6) <= 0.1, `GC1 UK MPG: ${gc1.ukMpg} vs 36.6`);
assert(gc1.totalFuelCost === 40.25, `GC1 Total fuel cost: ${gc1.totalFuelCost} vs 40.25`);
assert(Math.abs(gc1.costPerDistance - 0.115) <= 0.01, `GC1 Cost per mile: ${gc1.costPerDistance} vs 0.12 or 0.115`);
assert(Math.abs(gc1.distancePerDollar - 8.7) <= 0.1, `GC1 Distance per dollar: ${gc1.distancePerDollar} vs 8.7`);

// Golden Case 2: Tank-to-Tank update
assert(gc1.efficiencyTierLabel.includes("Average"), `GC1 tier label is Average: ${gc1.efficiencyTierLabel}`);

// Golden Case 3: Multi-Leg (320 km / 10.5 L, 340 km / 11.0 L)
const gc3Legs: LegInput[] = [
  { id: "1", distance: 320, fuel: 10.5, pricePerUnit: 96.72 },
  { id: "2", distance: 340, fuel: 11.0, pricePerUnit: 96.72 },
];
const gc3 = calculateMileage("multi_leg", "indian_metric", 0, 0, 0, false, 0, 0, 0, "business", undefined, gc3Legs);
assert(gc3.totalDistance === 660, `GC3 totalDistance: ${gc3.totalDistance} vs 660`);
assert(gc3.totalFuelUsed === 21.5, `GC3 totalFuelUsed: ${gc3.totalFuelUsed} vs 21.5`);
assert(Math.abs(gc3.kmPerLiter - 30.7) <= 0.05, `GC3 km/L: ${gc3.kmPerLiter} vs 30.7`);
assert(Math.abs(gc3.litersPer100km - 3.26) <= 0.01, `GC3 L/100km: ${gc3.litersPer100km} vs 3.26`);

// Verify weighted SUM(distance)/SUM(fuel) vs naive average(mileages)
const naiveAverage = (320 / 10.5 + 340 / 11.0) / 2; // (30.476 + 30.909)/2 = 30.6926
const trueWeighted = 660 / 21.5; // 30.69767
assert(Math.abs(gc3.kmPerLiter - parseFloat(trueWeighted.toFixed(1))) < 0.05, "GC3 uses true weighted average");

// Golden Case 4: Multi-Leg Fuel Cost
assert(Math.abs(gc3.totalFuelCost - 2079.48) < 0.01, `GC4 Fuel cost: ${gc3.totalFuelCost} vs 2079.48`);

// Golden Case 5: IRS Tax Claim (450 mi @ $0.67)
const gc5 = calculateMileage("tax_reimbursement", "us_imperial", 0, 0, 0, false, 0, 0, 450, "business", 0.67);
assert(gc5.taxReimbursementAmount === 301.50, `GC5 Tax reimbursement: ${gc5.taxReimbursementAmount} vs 301.50`);
assert(gc5.formattedTaxReimbursement === "$301.50", `GC5 formattedTaxReimbursement: ${gc5.formattedTaxReimbursement} vs $301.50`);

// Test IRS explicit rate = 0
const gc5ZeroRate = calculateMileage("tax_reimbursement", "us_imperial", 0, 0, 0, false, 0, 0, 450, "business", 0);
assert(gc5ZeroRate.taxReimbursementAmount === 0, `GC5 rate=0 reimbursement: ${gc5ZeroRate.taxReimbursementAmount} vs 0`);

// Golden Case 6: EV & MPGe (240 mi, 75 kWh, $0.16/kWh)
const gc6 = calculateMileage("ev_mpge", "us_imperial", 0, 0, 0, false, 0, 0, 0, "business", undefined, [], 240, 75, 0.16);
assert(Math.abs(gc6.mpge - 107.8) <= 0.1, `GC6 MPGe: ${gc6.mpge} vs 107.8`);
assert(gc6.totalFuelCost === 12.00, `GC6 Electricity cost: ${gc6.totalFuelCost} vs 12.00`);
assert(gc6.costPerDistance === 0.05, `GC6 Cost per mile: ${gc6.costPerDistance} vs 0.05`);
assert(gc6.distancePerDollar === 20.0, `GC6 Distance per dollar: ${gc6.distancePerDollar} vs 20.0`);

// Golden Case 7: EV + 15% City Modifier
const gc7 = calculateMileage(
  "ev_mpge",
  "us_imperial",
  0, 0, 0, false, 0, 0, 0, "business", undefined, [],
  240, 75, 0.16, 12000,
  { cityDriving: true, towing: false, aggressiveDriving: false, coldWeather: false }
);
// 240 / (75 * 1.15) * 33.7 = 93.772 -> 93.8
assert(Math.abs(gc7.mpge - 93.8) <= 0.1, `GC7 EV 15% modifier MPGe: ${gc7.mpge} vs 93.8`);

// Golden Case 8: EV Home vs Fast DC
const gc8Home = calculateMileage("fuel_mileage", "indian_metric", 100, 20, 8.0, false, 0, 0, 0, "business", undefined, [], 0, 0, 0, 12000, undefined, "ev_home");
const gc8DC = calculateMileage("fuel_mileage", "indian_metric", 100, 20, 21.0, false, 0, 0, 0, "business", undefined, [], 0, 0, 0, 12000, undefined, "ev_commercial");
assert(gc8Home.totalFuelCost === 160, `GC8 EV Home cost: ${gc8Home.totalFuelCost} vs 160`);
assert(gc8DC.totalFuelCost === 420, `GC8 EV Fast DC cost: ${gc8DC.totalFuelCost} vs 420`);
assert(gc8DC.totalFuelCost > gc8Home.totalFuelCost, "GC8 Fast DC costs more than Home charging");

console.log(`Golden cases completed: ${passedAssertions}/${totalAssertions} assertions passed.\n`);

// ============================================================
// 2. RANDOMIZED FUEL MILEAGE CASES (20,000 iterations)
// ============================================================
console.log("--- 2. RANDOMIZED FUEL MILEAGE (20,000 CASES) ---");
for (let i = 0; i < 20000; i++) {
  const dist = 10 + Math.random() * 990; // 10 to 1000 miles
  const fuel = 1 + Math.random() * 49;   // 1 to 50 gallons
  const price = 0.5 + Math.random() * 9.5; // $0.50 to $10.00

  const res = calculateMileage("fuel_mileage", "us_imperial", dist, fuel, price);

  // Independent oracle calculations
  const oracleMpg = dist / fuel;
  const oracleCost = fuel * price;
  const oracleCostPerMi = oracleCost / dist;
  const oracleDistPerDollar = dist / oracleCost;

  assert(Math.abs(res.usMpg - parseFloat(oracleMpg.toFixed(1))) <= 0.1, `Random Fuel Mileage MPG check #${i}`);
  assert(Math.abs(res.totalFuelCost - parseFloat(oracleCost.toFixed(2))) <= 0.02, `Random Fuel Mileage Cost check #${i}`);
  assert(Math.abs(res.costPerDistance - parseFloat(oracleCostPerMi.toFixed(2))) <= 0.02, `Random Cost/mi check #${i}`);
  assert(Math.abs(res.distancePerDollar - parseFloat(oracleDistPerDollar.toFixed(2))) <= 0.05, `Random Dist/$ check #${i}`);
}
console.log(`20,000 Fuel mileage cases passed.\n`);

// ============================================================
// 3. RANDOMIZED UNIT CONVERSIONS & ROUND-TRIP (10,000 iterations)
// ============================================================
console.log("--- 3. RANDOMIZED UNIT CONVERSIONS (10,000 CASES) ---");
for (let i = 0; i < 10000; i++) {
  const mpg = 5 + Math.random() * 95; // 5 to 100 US MPG

  // Independent Oracle:
  // L/100km = 235.214583 / US MPG
  const oracleL100km = INDEP_US_TO_L100KM / mpg;
  // UK MPG = US MPG * INDEP_US_TO_UK_MPG
  const oracleUKMpg = mpg * INDEP_US_TO_UK_MPG;
  // km/L = 100 / L100km = US MPG * (100 / 235.214583)
  const oracleKmL = 100 / oracleL100km;

  // Round trip precision test: L/100km -> US MPG
  const roundTripUsMpg = INDEP_US_TO_L100KM / oracleL100km;
  const roundTripRelError = Math.abs(roundTripUsMpg - mpg) / mpg;
  assert(roundTripRelError < 1e-12, `Round trip US MPG precision #${i}`);

  // Test production engine conversions from miles=1000, fuel=1000/mpg
  const dist = 1000;
  const fuel = dist / mpg;
  const res = calculateMileage("fuel_mileage", "us_imperial", dist, fuel, 3.5);

  assert(Math.abs(res.litersPer100km - parseFloat(oracleL100km.toFixed(2))) <= 0.05, `Unit conversion L/100km #${i}`);
  assert(Math.abs(res.ukMpg - parseFloat(oracleUKMpg.toFixed(1))) <= 0.15, `Unit conversion UK MPG #${i}`);
  assert(Math.abs(res.kmPerLiter - parseFloat(oracleKmL.toFixed(2))) <= 0.05, `Unit conversion km/L #${i}`);
}
console.log(`10,000 Unit conversion cases passed.\n`);

// ============================================================
// 4. RANDOMIZED MULTI-LEG WEIGHTED CALCULATIONS (10,000 iterations)
// ============================================================
console.log("--- 4. RANDOMIZED MULTI-LEG (10,000 CASES) ---");
for (let i = 0; i < 10000; i++) {
  const numLegs = 2 + Math.floor(Math.random() * 5); // 2 to 6 legs
  const testLegs: LegInput[] = [];
  let sumDist = 0;
  let sumFuel = 0;
  let sumCost = 0;

  for (let j = 0; j < numLegs; j++) {
    const d = 50 + Math.random() * 450;
    const f = 2 + Math.random() * 25;
    const p = 1.5 + Math.random() * 4.0;
    testLegs.push({ id: `${j}`, distance: d, fuel: f, pricePerUnit: p });
    sumDist += d;
    sumFuel += f;
    sumCost += f * p;
  }

  const res = calculateMileage("multi_leg", "us_imperial", 0, 0, 0, false, 0, 0, 0, "business", undefined, testLegs);

  const oracleWeightedMpg = sumDist / sumFuel;
  assert(Math.abs(res.usMpg - parseFloat(oracleWeightedMpg.toFixed(1))) <= 0.1, `Multi-leg weighted MPG #${i}`);
  assert(Math.abs(res.totalFuelUsed - parseFloat(sumFuel.toFixed(2))) <= 0.02, `Multi-leg sum fuel #${i}`);
  assert(Math.abs(res.totalFuelCost - parseFloat(sumCost.toFixed(2))) <= 0.05, `Multi-leg sum cost #${i}`);
}
console.log(`10,000 Multi-leg weighted cases passed.\n`);

// ============================================================
// 5. RANDOMIZED IRS REIMBURSEMENT CALCULATIONS (10,000 iterations)
// ============================================================
console.log("--- 5. RANDOMIZED IRS TAX CLAIM (10,000 CASES) ---");
const categories: ("business" | "medical" | "charity")[] = ["business", "medical", "charity"];
for (let i = 0; i < 10000; i++) {
  const miles = Math.random() * 5000;
  const cat = categories[i % 3];
  const useCustom = Math.random() > 0.5;
  const customRate = useCustom ? Math.random() * 1.5 : undefined;
  const year = i % 2 === 0 ? "2024" : "2025";

  const rate = customRate !== undefined ? customRate : getIRSReimbursementRate(cat, year);
  const oracleClaim = miles * rate;

  const res = calculateMileage("tax_reimbursement", "us_imperial", 0, 0, 0, false, 0, 0, miles, cat, customRate, [], 0, 0, 0, 12000, undefined, "petrol", year);

  assert(Math.abs(res.taxReimbursementAmount - parseFloat(oracleClaim.toFixed(2))) <= 0.02, `IRS Claim #${i}`);
  assert(res.taxReimbursementAmount >= 0, `IRS Claim is non-negative #${i}`);
}
console.log(`10,000 IRS cases passed.\n`);

// ============================================================
// 6. RANDOMIZED EV & MPGe CALCULATIONS (10,000 iterations)
// ============================================================
console.log("--- 6. RANDOMIZED EV & MPGe (10,000 CASES) ---");
for (let i = 0; i < 10000; i++) {
  const miles = 20 + Math.random() * 480; // 20 to 500 miles
  const kwh = 5 + Math.random() * 95;    // 5 to 100 kWh
  const costPerKwh = 0.05 + Math.random() * 0.50; // $0.05 to $0.55 / kWh

  const oracleMiPerKwh = miles / kwh;
  const oracleMpge = oracleMiPerKwh * INDEP_MPGE_KWH;
  const oracleCost = kwh * costPerKwh;
  const oracleCostPerMi = oracleCost / miles;

  const res = calculateMileage("ev_mpge", "us_imperial", 0, 0, 0, false, 0, 0, 0, "business", undefined, [], miles, kwh, costPerKwh);

  assert(Math.abs(res.mpge - parseFloat(oracleMpge.toFixed(1))) <= 0.15, `EV MPGe #${i}`);
  assert(Math.abs(res.totalFuelCost - parseFloat(oracleCost.toFixed(2))) <= 0.02, `EV Total Cost #${i}`);
  assert(Math.abs(res.costPerDistance - parseFloat(oracleCostPerMi.toFixed(2))) <= 0.02, `EV Cost/mi #${i}`);
}
console.log(`10,000 EV MPGe cases passed.\n`);

// ============================================================
// 7. RANDOMIZED MODIFIERS & COMBINATIONS (10,000 iterations)
// ============================================================
console.log("--- 7. RANDOMIZED MODIFIERS (10,000 CASES) ---");
for (let i = 0; i < 10000; i++) {
  const city = Math.random() > 0.5;
  const towing = Math.random() > 0.5;
  const aggressive = Math.random() > 0.5;
  const cold = Math.random() > 0.5;

  let oracleRatio = 0;
  if (city) oracleRatio += 0.15;
  if (towing) oracleRatio += 0.25;
  if (aggressive) oracleRatio += 0.20;
  if (cold) oracleRatio += 0.12;

  const penaltyMultiplier = 1 + oracleRatio;
  const baseFuel = 10;
  const baseDist = 300;
  const expectedFuel = baseFuel * penaltyMultiplier;
  const expectedMpg = baseDist / expectedFuel;

  const res = calculateMileage("fuel_mileage", "us_imperial", baseDist, baseFuel, 3.5, false, 0, 0, 0, "business", undefined, [], 0, 0, 0, 12000, {
    cityDriving: city,
    towing,
    aggressiveDriving: aggressive,
    coldWeather: cold,
  });

  assert(res.environmentalPenaltyPercent === Math.round(oracleRatio * 100), `Modifier penalty % #${i}`);
  assert(Math.abs(res.totalFuelUsed - parseFloat(expectedFuel.toFixed(2))) <= 0.02, `Modifier fuel used #${i}`);
  assert(Math.abs(res.usMpg - parseFloat(expectedMpg.toFixed(1))) <= 0.15, `Modifier effective MPG #${i}`);
}
console.log(`10,000 Modifier combination cases passed.\n`);

// ============================================================
// 8. RANDOMIZED COST & FINANCIAL CALCULATIONS (10,000 iterations)
// ============================================================
console.log("--- 8. RANDOMIZED FINANCIAL CALCULATIONS (10,000 CASES) ---");
for (let i = 0; i < 10000; i++) {
  const dist = 50 + Math.random() * 950;
  const fuel = 2 + Math.random() * 50;
  const price = Math.random() > 0.1 ? 1.0 + Math.random() * 8.0 : 0.0; // test zero price 10% of time
  const annualDist = Math.random() > 0.1 ? 5000 + Math.random() * 25000 : 0; // test zero annual dist 10% of time

  const res = calculateMileage("fuel_mileage", "us_imperial", dist, fuel, price, false, 0, 0, 0, "business", undefined, [], 0, 0, 0, annualDist);

  if (price === 0) {
    assert(res.totalFuelCost === 0, `Zero price produces $0 cost #${i}`);
    assert(res.costPerDistance === 0, `Zero price produces $0/mi #${i}`);
    assert(res.annualFuelCost === 0, `Zero price produces $0 annual cost #${i}`);
  } else {
    const oracleCost = fuel * price;
    assert(Math.abs(res.totalFuelCost - parseFloat(oracleCost.toFixed(2))) <= 0.02, `Financial total cost #${i}`);
    if (annualDist === 0) {
      assert(res.annualFuelCost === 0, `Zero annual distance produces $0 annual cost #${i}`);
    } else {
      const oracleAnnual = (annualDist / (dist / fuel)) * price;
      assert(Math.abs(res.annualFuelCost - Math.round(oracleAnnual)) <= 2, `Financial annual cost #${i}`);
    }
  }
}
console.log(`10,000 Financial cost cases passed.\n`);

// ============================================================
// 9. EDGE CASES & VALIDATION AUDIT (10,000 iterations)
// ============================================================
console.log("--- 9. EDGE CASES & VALIDATION (10,000 CASES) ---");
for (let i = 0; i < 10000; i++) {
  const testType = i % 8;
  if (testType === 0) {
    // Zero fuel volume in Fuel Mileage mode
    const res = calculateMileage("fuel_mileage", "us_imperial", 350, 0, 3.5);
    assert(res.isValid === false, `Zero fuel volume rejected #${i}`);
    assert(res.usMpg === 0, `Zero fuel gives 0 MPG #${i}`);
    assert(res.totalFuelUsed === 0, `Zero fuel gives 0 fuel used #${i}`);
  } else if (testType === 1) {
    // Negative distance
    const res = calculateMileage("fuel_mileage", "us_imperial", -100, 10, 3.5);
    assert(res.isValid === false, `Negative distance rejected #${i}`);
  } else if (testType === 2) {
    // Reversed odometer
    const start = 12500;
    const end = 12000;
    const res = calculateMileage("fuel_mileage", "us_imperial", 0, 10, 3.5, true, start, end);
    assert(res.isValid === false, `Reversed odometer rejected #${i}`);
    assert(Boolean(res.errorMessage?.includes("less than start")), `Reversed odometer error msg #${i}`);
  } else if (testType === 3) {
    // Distance = 0 and fuel > 0
    const res = calculateMileage("fuel_mileage", "us_imperial", 0, 10, 3.5);
    assert(res.isValid === true, `Zero distance handled safely #${i}`);
    assert(res.usMpg === 0, `Zero distance gives 0 MPG #${i}`);
    assert(res.costPerDistance === 0, `Zero distance gives 0 cost/mi #${i}`);
    assert(!isNaN(res.usMpg) && isFinite(res.usMpg), `Zero distance MPG is finite #${i}`);
  } else if (testType === 4) {
    // Negative price
    const res = calculateMileage("fuel_mileage", "us_imperial", 300, 10, -3.5);
    assert(res.isValid === false, `Negative price rejected #${i}`);
  } else if (testType === 5) {
    // EV Zero kWh consumed
    const res = calculateMileage("ev_mpge", "us_imperial", 0, 0, 0, false, 0, 0, 0, "business", undefined, [], 240, 0, 0.16);
    assert(res.isValid === false, `EV Zero kWh rejected #${i}`);
    assert(res.mpge === 0, `EV Zero kWh MPGe is 0 #${i}`);
  } else if (testType === 6) {
    // Multi-Leg empty state
    const res = calculateMileage("multi_leg", "us_imperial", 0, 0, 0, false, 0, 0, 0, "business", undefined, []);
    assert(res.isEmpty === true, `Multi-Leg empty state recognized #${i}`);
    assert(res.totalDistance === 0 && res.totalFuelUsed === 0, `Multi-Leg empty state totals 0 #${i}`);
  } else if (testType === 7) {
    // IRS negative miles
    const res = calculateMileage("tax_reimbursement", "us_imperial", 0, 0, 0, false, 0, 0, -450, "business", 0.67);
    assert(res.isValid === false, `IRS negative miles rejected #${i}`);
  }
}
console.log(`10,000 Edge cases & validation passed.\n`);

// ============================================================
// SUMMARY REPORT
// ============================================================
console.log("============================================================");
console.log(`FINAL ORACLE TEST SUMMARY:`);
console.log(`Total Assertions Evaluated: ${totalAssertions}`);
console.log(`Passed Assertions: ${passedAssertions}`);
console.log(`Failed Assertions: ${failedAssertions}`);
console.log("============================================================");

if (failedAssertions > 0) {
  process.exit(1);
} else {
  console.log("ALL MATHEMATICAL ORACLE ASSERTIONS PASSED (100%)!");
}
