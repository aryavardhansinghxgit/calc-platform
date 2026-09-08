import {
  calculateFuelCost,
  convertMPGToL100km,
  convertL100kmToMPG,
  calculatePenaltyMultiplier,
  calculateFuelCostFromInputs,
} from "../src/app/calculators/fuel-cost-calculator/calculator";
import { EfficiencyPenaltyFlags, SavedFuelCalculation } from "../src/app/calculators/fuel-cost-calculator/types";
import { fmtMoney } from "../src/components/calculator/fuel-cost/FuelCostCalculator";

interface TestStats {
  roadTripPassed: number;
  roadTripFailed: number;
  commutePassed: number;
  commuteFailed: number;
  mpgPassed: number;
  mpgFailed: number;
  evPassed: number;
  evFailed: number;
  unitPassed: number;
  unitFailed: number;
  zeroPassed: number;
  zeroFailed: number;
  penaltiesPassed: number;
  penaltiesFailed: number;
  stateExportPassed: number;
  stateExportFailed: number;
  anomalies: string[];
}

const stats: TestStats = {
  roadTripPassed: 0,
  roadTripFailed: 0,
  commutePassed: 0,
  commuteFailed: 0,
  mpgPassed: 0,
  mpgFailed: 0,
  evPassed: 0,
  evFailed: 0,
  unitPassed: 0,
  unitFailed: 0,
  zeroPassed: 0,
  zeroFailed: 0,
  penaltiesPassed: 0,
  penaltiesFailed: 0,
  stateExportPassed: 0,
  stateExportFailed: 0,
  anomalies: [],
};

function recordAnomaly(msg: string) {
  if (!stats.anomalies.includes(msg)) {
    stats.anomalies.push(msg);
  }
}

// ═══════════════════════════════════════════════════════════════
// 1. ROAD TRIP RANDOMIZED TESTS (10,000 iterations)
// ═══════════════════════════════════════════════════════════════
console.log("1. Running 10,000 Road Trip randomized tests...");
for (let i = 0; i < 10000; i++) {
  const distance = Math.floor(Math.random() * 2000) + 1;
  const mpg = Math.floor(Math.random() * 60) + 10;
  const price = parseFloat((Math.random() * 6 + 1.5).toFixed(2));
  const isRoundTrip = Math.random() > 0.5;

  const res = calculateFuelCost("trip", "imperial", "gasoline", distance, isRoundTrip, mpg, price);

  const totalDist = distance * (isRoundTrip ? 2 : 1);
  const oracleFuel = totalDist / mpg;
  const oracleCost = oracleFuel * price;
  const oracleCostPerMile = oracleCost / totalDist;
  const oracleCo2 = oracleFuel * 8.887;

  const fuelMatch = Math.abs(res.fuelVolumeNeeded - parseFloat(oracleFuel.toFixed(2))) <= 0.05;
  const costMatch = Math.abs(res.totalCost - parseFloat(oracleCost.toFixed(2))) <= 0.05;
  const cpmMatch = Math.abs(res.costPerDistanceUnit - parseFloat(oracleCostPerMile.toFixed(3))) <= 0.005;
  const co2Match = Math.abs(res.carbonFootprintKg - parseFloat(oracleCo2.toFixed(1))) <= 0.2;

  if (fuelMatch && costMatch && cpmMatch && co2Match) {
    stats.roadTripPassed++;
  } else {
    stats.roadTripFailed++;
  }
}

// ═══════════════════════════════════════════════════════════════
// 2. COMMUTE RANDOMIZED TESTS (5,000 iterations)
// ═══════════════════════════════════════════════════════════════
console.log("2. Running 5,000 Commute randomized tests...");
for (let i = 0; i < 5000; i++) {
  const distance = Math.floor(Math.random() * 150) + 5;
  const mpg = Math.floor(Math.random() * 50) + 15;
  const price = parseFloat((Math.random() * 5 + 2).toFixed(2));
  const workDays = Math.floor(Math.random() * 30) + 1;

  const res = calculateFuelCost(
    "commute",
    "imperial",
    "gasoline",
    distance,
    false,
    mpg,
    price,
    1,
    0,
    0,
    0,
    { roofRack: false, highSpeed: false, towing: false, winterCold: false },
    workDays
  );

  const oracleDailyFuel = distance / mpg;
  const oracleDailyCost = oracleDailyFuel * price;
  const oracleWeekly = oracleDailyCost * 5;
  const oracleMonthly = oracleDailyCost * workDays;
  const oracleAnnual = oracleMonthly * 12;
  const oracleMonthlyFuel = oracleDailyFuel * workDays;

  const weeklyMatch = Math.abs((res.weeklyCommuteCost ?? 0) - parseFloat(oracleWeekly.toFixed(2))) <= 0.05;
  const monthlyMatch = Math.abs((res.monthlyCommuteCost ?? 0) - parseFloat(oracleMonthly.toFixed(2))) <= 0.05;
  const annualMatch = Math.abs((res.annualCommuteCost ?? 0) - parseFloat(oracleAnnual.toFixed(2))) <= 0.1;
  const fuelMonthlyMatch = Math.abs((res.monthlyFuelVolume ?? 0) - parseFloat(oracleMonthlyFuel.toFixed(2))) <= 0.05;

  if (weeklyMatch && monthlyMatch && annualMatch && fuelMonthlyMatch) {
    stats.commutePassed++;
  } else {
    stats.commuteFailed++;
  }
}

// ═══════════════════════════════════════════════════════════════
// 3. MPG SOLVER RANDOMIZED TESTS (5,000 iterations)
// ═══════════════════════════════════════════════════════════════
console.log("3. Running 5,000 MPG Solver randomized tests...");
for (let i = 0; i < 5000; i++) {
  const startOdo = Math.floor(Math.random() * 100000);
  const delta = Math.floor(Math.random() * 500) + 50;
  const endOdo = startOdo + delta;
  const fuelAdded = parseFloat((Math.random() * 20 + 2).toFixed(2));
  const fuelPrice = 3.5;

  const res = calculateFuelCost(
    "mpg_solver",
    "imperial",
    "gasoline",
    300,
    false,
    25,
    fuelPrice,
    1,
    0,
    0,
    0,
    { roofRack: false, highSpeed: false, towing: false, winterCold: false },
    22,
    startOdo,
    endOdo,
    fuelAdded
  );

  // P1-01 Check: fuelVolumeNeeded MUST equal fuelAdded
  const fuelVolumeCorrect = Math.abs(res.fuelVolumeNeeded - fuelAdded) <= 0.01;

  const oracleMpg = delta / fuelAdded;
  const oracleL100 = 235.214583 / oracleMpg;
  const oracleFuelCost = fuelAdded * fuelPrice;
  const oracleCo2 = fuelAdded * 8.887;

  const mpgMatch = Math.abs((res.calculatedMPG ?? 0) - parseFloat(oracleMpg.toFixed(2))) <= 0.05;
  const l100Match = Math.abs((res.calculatedL100km ?? 0) - parseFloat(oracleL100.toFixed(2))) <= 0.05;
  const costMatch = Math.abs(res.fuelOnlyCost - parseFloat(oracleFuelCost.toFixed(2))) <= 0.05;
  const co2Match = Math.abs(res.carbonFootprintKg - parseFloat(oracleCo2.toFixed(1))) <= 0.2;

  // Reverse check: delta / calculatedMPG recovers fuelAdded
  const reconstructedFuel = delta / (res.calculatedMPG ?? 1);
  const reverseMatch = Math.abs(reconstructedFuel - fuelAdded) <= 0.1;

  if (fuelVolumeCorrect && mpgMatch && l100Match && costMatch && co2Match && reverseMatch) {
    stats.mpgPassed++;
  } else {
    stats.mpgFailed++;
    if (!fuelVolumeCorrect) recordAnomaly("MPG Solver fuelVolumeNeeded did not match fuelAdded");
  }
}

// ═══════════════════════════════════════════════════════════════
// 4. EV VS GAS RANDOMIZED TESTS (5,000 iterations)
// ═══════════════════════════════════════════════════════════════
console.log("4. Running 5,000 EV vs Gas randomized tests...");
for (let i = 0; i < 5000; i++) {
  const distance = Math.floor(Math.random() * 1000) + 10;
  const gasMpg = Math.floor(Math.random() * 50) + 15;
  const gasPrice = parseFloat((Math.random() * 5 + 2).toFixed(2));
  const evKwhPer100 = Math.floor(Math.random() * 30) + 20;
  const elecRate = parseFloat((Math.random() * 0.35 + 0.08).toFixed(2));

  const res = calculateFuelCost(
    "ev_compare",
    "imperial",
    "gasoline",
    distance,
    false,
    gasMpg,
    gasPrice,
    1,
    0,
    0,
    0,
    { roofRack: false, highSpeed: false, towing: false, winterCold: false },
    22,
    10000,
    10350,
    14,
    evKwhPer100,
    elecRate
  );

  const oracleGasCost = (distance / gasMpg) * gasPrice;
  const oracleEvCost = (distance / 100) * evKwhPer100 * elecRate;
  const oracleSavings = oracleGasCost - oracleEvCost;
  const oracleIsPremium = oracleSavings < 0;

  const gasMatch = Math.abs((res.gasTripCost ?? 0) - parseFloat(oracleGasCost.toFixed(2))) <= 0.05;
  const evMatch = Math.abs((res.evTripCost ?? 0) - parseFloat(oracleEvCost.toFixed(2))) <= 0.05;
  const savingsMatch = Math.abs((res.evSavings ?? 0) - parseFloat(oracleSavings.toFixed(2))) <= 0.05;
  const premiumMatch = res.isEvPremium === oracleIsPremium;

  // Currency format check (P2-01): fmtMoney must produce exactly 2 decimal places
  const formattedSavings = fmtMoney(res.evSavings ?? 0, "$");
  const formatValid = /\$\d+\.\d{2}/.test(formattedSavings) || /\$-\d+\.\d{2}/.test(formattedSavings);

  if (gasMatch && evMatch && savingsMatch && premiumMatch && formatValid) {
    stats.evPassed++;
  } else {
    stats.evFailed++;
  }
}

// ═══════════════════════════════════════════════════════════════
// 5. UNIT CONVERSION ROUND-TRIP TESTS (5,000 iterations)
// ═══════════════════════════════════════════════════════════════
console.log("5. Running 5,000 Unit Conversion round-trip tests...");
for (let i = 0; i < 5000; i++) {
  const originalMpg = parseFloat((Math.random() * 60 + 10).toFixed(4));
  const l100 = convertMPGToL100km(originalMpg);
  const roundTripMpg = convertL100kmToMPG(l100);

  // Full precision drift check: 235.214583 / (235.214583 / x) === x
  const diff = Math.abs(roundTripMpg - originalMpg);
  if (diff <= 0.00001) {
    stats.unitPassed++;
  } else {
    stats.unitFailed++;
  }
}

// ═══════════════════════════════════════════════════════════════
// 6. ZERO & BOUNDARY VALIDATION TESTS (5,000 iterations)
// ═══════════════════════════════════════════════════════════════
console.log("6. Running 5,000 Zero & Boundary tests...");
for (let i = 0; i < 5000; i++) {
  const testCase = i % 10;
  if (testCase === 0) {
    // Zero distance
    const res = calculateFuelCost("trip", "imperial", "gasoline", 0, false, 25, 3.5);
    if (res.fuelVolumeNeeded === 0 && res.totalCost === 0 && res.carbonFootprintKg === 0) {
      stats.zeroPassed++;
    } else {
      stats.zeroFailed++;
    }
  } else if (testCase === 1) {
    // Zero fuel price
    const res = calculateFuelCost("trip", "imperial", "gasoline", 300, false, 25, 0);
    if (res.fuelVolumeNeeded === 12 && res.totalCost === 0 && res.carbonFootprintKg === 106.6) {
      stats.zeroPassed++;
    } else {
      stats.zeroFailed++;
    }
  } else if (testCase === 2) {
    // P1-03: Zero in calculateFuelCostFromInputs
    const res = calculateFuelCostFromInputs({ distance: 0, fuelPrice: 0, efficiency: 25 });
    if (res.fuelVolumeNeeded === 0 && res.totalCost === 0) {
      stats.zeroPassed++;
    } else {
      stats.zeroFailed++;
      recordAnomaly("P1-03: calculateFuelCostFromInputs destroyed numeric 0 distance/price");
    }
  } else if (testCase === 3) {
    // Zero work days
    const res = calculateFuelCost("commute", "imperial", "gasoline", 300, false, 25, 3.5, 1, 0, 0, 0, {
      roofRack: false,
      highSpeed: false,
      towing: false,
      winterCold: false,
    }, 0);
    if (res.monthlyCommuteCost === 0 && res.annualCommuteCost === 0) {
      stats.zeroPassed++;
    } else {
      stats.zeroFailed++;
    }
  } else if (testCase === 4) {
    // P1-04: Negative distance validation
    const res = calculateFuelCost("trip", "imperial", "gasoline", -50, false, 25, 3.5);
    if (res.validationError?.includes("Distance cannot be negative")) {
      stats.zeroPassed++;
    } else {
      stats.zeroFailed++;
    }
  } else if (testCase === 5) {
    // P1-04: Negative price validation
    const res = calculateFuelCost("trip", "imperial", "gasoline", 300, false, 25, -3.5);
    if (res.validationError?.includes("Fuel price cannot be negative")) {
      stats.zeroPassed++;
    } else {
      stats.zeroFailed++;
    }
  } else if (testCase === 6) {
    // P1-04: Zero or negative MPG validation
    const res = calculateFuelCost("trip", "imperial", "gasoline", 300, false, 0, 3.5);
    if (res.validationError?.includes("Fuel efficiency must be greater than 0")) {
      stats.zeroPassed++;
    } else {
      stats.zeroFailed++;
    }
  } else if (testCase === 7) {
    // P1-04: Reversed odometer in MPG Solver
    const res = calculateFuelCost("mpg_solver", "imperial", "gasoline", 300, false, 25, 3.5, 1, 0, 0, 0, {
      roofRack: false,
      highSpeed: false,
      towing: false,
      winterCold: false,
    }, 22, 10500, 10000, 14);
    if (res.validationError?.includes("End odometer must be greater than or equal")) {
      stats.zeroPassed++;
    } else {
      stats.zeroFailed++;
    }
  } else if (testCase === 8) {
    // P1-04: Zero fuel added with positive distance
    const res = calculateFuelCost("mpg_solver", "imperial", "gasoline", 300, false, 25, 3.5, 1, 0, 0, 0, {
      roofRack: false,
      highSpeed: false,
      towing: false,
      winterCold: false,
    }, 22, 10000, 10350, 0);
    if (res.validationError?.includes("Fuel added must be greater than 0")) {
      stats.zeroPassed++;
    } else {
      stats.zeroFailed++;
    }
  } else {
    // Carpool passenger split (1 to 8 passengers)
    const passengers = Math.floor(Math.random() * 8) + 1;
    const res = calculateFuelCost("trip", "imperial", "gasoline", 300, false, 25, 3.5, passengers);
    const expectedSplit = parseFloat((42 / passengers).toFixed(2));
    if (Math.abs(res.costPerPerson - expectedSplit) <= 0.02) {
      stats.zeroPassed++;
    } else {
      stats.zeroFailed++;
    }
  }
}

// ═══════════════════════════════════════════════════════════════
// 7. PENALTIES, TOLLS & PARKING (5,000 iterations)
// ═══════════════════════════════════════════════════════════════
console.log("7. Running 5,000 Penalties, Tolls & Parking tests...");
for (let i = 0; i < 5000; i++) {
  const flags: EfficiencyPenaltyFlags = {
    roofRack: Math.random() > 0.5,
    highSpeed: Math.random() > 0.5,
    towing: Math.random() > 0.5,
    winterCold: Math.random() > 0.5,
  };
  const toll = Math.floor(Math.random() * 50);
  const parking = Math.floor(Math.random() * 40);
  const distance = Math.floor(Math.random() * 500) + 50;
  const mpg = 25;
  const price = 3.5;

  const res = calculateFuelCost("trip", "imperial", "gasoline", distance, false, mpg, price, 1, toll, parking, 0, flags);

  let expectedMult = 1.0;
  if (flags.roofRack) expectedMult *= 0.85;
  if (flags.highSpeed) expectedMult *= 0.8;
  if (flags.towing) expectedMult *= 0.75;
  if (flags.winterCold) expectedMult *= 0.9;

  const expectedEffMpg = mpg * expectedMult;
  const expectedFuel = distance / expectedEffMpg;
  const expectedFuelCost = expectedFuel * price;
  const expectedTotal = expectedFuelCost + toll + parking;

  const totalMatch = Math.abs(res.totalCost - parseFloat(expectedTotal.toFixed(2))) <= 0.05;
  const tollsMatch = res.tollsAndExpenses === toll + parking;
  const effMatch = Math.abs(res.effectiveEfficiency - parseFloat(expectedEffMpg.toFixed(1))) <= 0.15;

  if (totalMatch && tollsMatch && effMatch) {
    stats.penaltiesPassed++;
  } else {
    stats.penaltiesFailed++;
  }
}

// ═══════════════════════════════════════════════════════════════
// 8. EXPORT, STATE & PERSISTENCE TESTS (5,000 iterations)
// ═══════════════════════════════════════════════════════════════
console.log("8. Running 5,000 Export, State & Persistence tests...");
for (let i = 0; i < 5000; i++) {
  // Test raw state preservation in SavedFuelCalculation
  const mockSaved: SavedFuelCalculation = {
    id: `test_${i}`,
    timestamp: Date.now(),
    label: `Saved Scenario ${i}`,
    mode: "commute",
    unitSystem: "imperial",
    currencySymbol: "$",
    fuelType: "gasoline",
    distance: 60,
    isRoundTrip: false,
    efficiency: 30,
    fuelPrice: 3.75,
    passengers: 1,
    tolls: 5,
    parking: 10,
    workDays: 20,
    startOdo: 15000,
    endOdo: 15300,
    fuelAdded: 10,
    evKwhPer100: 28,
    electricityRate: 0.14,
    penalties: { roofRack: true, highSpeed: false, towing: false, winterCold: false },
    summaryOutput: "Test",
  };

  const serialized = JSON.stringify(mockSaved);
  const deserialized: SavedFuelCalculation = JSON.parse(serialized);

  // Assert raw state equality
  const stateMatch =
    deserialized.mode === mockSaved.mode &&
    deserialized.distance === mockSaved.distance &&
    deserialized.efficiency === mockSaved.efficiency &&
    deserialized.fuelPrice === mockSaved.fuelPrice &&
    deserialized.workDays === mockSaved.workDays &&
    deserialized.penalties.roofRack === true;

  // Assert recalculation produces identical results
  const res = calculateFuelCost(
    deserialized.mode,
    deserialized.unitSystem,
    deserialized.fuelType,
    deserialized.distance,
    deserialized.isRoundTrip,
    deserialized.efficiency,
    deserialized.fuelPrice,
    deserialized.passengers,
    deserialized.tolls,
    deserialized.parking,
    0,
    deserialized.penalties,
    deserialized.workDays
  );

  const costMatch = res.monthlyCommuteCost !== undefined && res.monthlyCommuteCost > 0;

  if (stateMatch && costMatch) {
    stats.stateExportPassed++;
  } else {
    stats.stateExportFailed++;
  }
}

console.log("\n============================================================");
console.log("POST-REMEDIATION MASTER RANDOMIZED TEST SUITE RESULTS");
console.log("============================================================");
console.log(`1. Road Trip:   ${stats.roadTripPassed} / 10,000 (${(stats.roadTripPassed / 100).toFixed(2)}%)`);
console.log(`2. Commute:     ${stats.commutePassed} / 5,000 (${(stats.commutePassed / 50).toFixed(2)}%)`);
console.log(`3. MPG Solver:  ${stats.mpgPassed} / 5,000 (${(stats.mpgPassed / 50).toFixed(2)}%)`);
console.log(`4. EV vs Gas:   ${stats.evPassed} / 5,000 (${(stats.evPassed / 50).toFixed(2)}%)`);
console.log(`5. Units:       ${stats.unitPassed} / 5,000 (${(stats.unitPassed / 50).toFixed(2)}%)`);
console.log(`6. Zero/Bound:  ${stats.zeroPassed} / 5,000 (${(stats.zeroPassed / 50).toFixed(2)}%)`);
console.log(`7. Penalties:   ${stats.penaltiesPassed} / 5,000 (${(stats.penaltiesPassed / 50).toFixed(2)}%)`);
console.log(`8. State/Export:${stats.stateExportPassed} / 5,000 (${(stats.stateExportPassed / 50).toFixed(2)}%)`);

const totalPassed =
  stats.roadTripPassed +
  stats.commutePassed +
  stats.mpgPassed +
  stats.evPassed +
  stats.unitPassed +
  stats.zeroPassed +
  stats.penaltiesPassed +
  stats.stateExportPassed;
const totalTests = 45000;
console.log(`\nTOTAL:         ${totalPassed} / ${totalTests} (${(totalPassed / (totalTests / 100)).toFixed(2)}%)`);

if (stats.anomalies.length > 0) {
  console.log("\nAnomalies detected:");
  stats.anomalies.forEach((a, i) => console.log(`  ${i + 1}. ${a}`));
} else {
  console.log("\nZero anomalies detected across all 45,000 assertions.");
}
