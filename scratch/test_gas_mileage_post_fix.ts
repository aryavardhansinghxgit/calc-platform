import { 
  calculateGasMileage, 
  convertUSMPGToL100km, 
  convertL100kmToUSMPG, 
  convertUKMPGToL100km, 
  convertL100kmToUKMPG, 
  convertUSMPGTokmL, 
  convertkmLToUSMPG 
} from "../src/app/calculators/gas-mileage-calculator/calculator";
import { FillUpEntry } from "../src/app/calculators/gas-mileage-calculator/types";

let passedAssertions = 0;
let failedAssertions = 0;

function assert(condition: boolean, message: string) {
  if (condition) {
    passedAssertions++;
  } else {
    failedAssertions++;
    if (failedAssertions <= 20) {
      console.error(`FAILURE: ${message}`);
    }
  }
}

console.log("=== STARTING 50,000+ INDEPENDENT ASSERTION TEST SUITE ===");

// -------------------------------------------------------------
// 1. GOLDEN CASES
// -------------------------------------------------------------
console.log("Testing Golden Cases...");

// Golden 1: Odometer
// Start: 12,000 mi, End: 12,360 mi, Fuel: 12 gal, Price: $3.50, Annual: 15,000 mi, Tank: 15 gal
{
  const res = calculateGasMileage(
    "odometer",
    "us",
    "gasoline",
    12000,
    12360,
    360,
    12,
    3.50,
    15,
    15000
  );
  assert(!res.validationError, `Golden 1: No error (got ${res.validationError})`);
  assert(res.totalDistance === 360, `Golden 1: Distance = 360 (got ${res.totalDistance})`);
  assert(res.usMPG === 30, `Golden 1: MPG = 30 (got ${res.usMPG})`);
  assert(Math.abs(res.l100km - 7.8405) < 0.001, `Golden 1: L/100km ≈ 7.8405 (got ${res.l100km})`);
  assert(res.tripFuelCost === 42.00, `Golden 1: tripFuelCost = $42.00 (got ${res.tripFuelCost})`);
  assert(Math.abs(res.costPerDistanceUnit - 0.116666) < 0.001, `Golden 1: costPerDistanceUnit ≈ 0.117 (got ${res.costPerDistanceUnit})`);
  assert(res.totalTankRange === 450, `Golden 1: totalTankRange = 450 (got ${res.totalTankRange})`);
  assert(res.costToFillTank === 52.50, `Golden 1: costToFillTank = $52.50 (got ${res.costToFillTank})`);
  assert(res.annualFuelVolume === 500, `Golden 1: annualFuelVolume = 500 (got ${res.annualFuelVolume})`);
  assert(res.annualFuelCost === 1750, `Golden 1: annualFuelCost = 1750 (got ${res.annualFuelCost})`);
  assert(Math.abs(res.carbonFootprintTons - 4.44) < 0.05, `Golden 1: CO2 ≈ 4.44 tons (got ${res.carbonFootprintTons})`);
}

// Golden 2: Indian Mode
// Distance: 360 km, Fuel: 12 L, Price: ₹96.72/L, Annual: 15,000 km
{
  const res = calculateGasMileage(
    "odometer",
    "indian",
    "gasoline",
    10000,
    10360,
    360,
    12,
    96.72,
    45,
    15000
  );
  assert(!res.validationError, `Golden 2: No error (got ${res.validationError})`);
  assert(res.kmL === 30, `Golden 2: km/L = 30 (got ${res.kmL})`);
  assert(Math.abs(res.l100km - 3.333333) < 0.001, `Golden 2: L/100km = 3.333333 (got ${res.l100km})`);
  assert(Math.abs(res.tripFuelCost - 1160.64) < 0.01, `Golden 2: tripFuelCost = 1160.64 (got ${res.tripFuelCost})`);
  assert(Math.abs(res.costPerDistanceUnit - 3.224) < 0.01, `Golden 2: costPerDistanceUnit ≈ 3.224 (got ${res.costPerDistanceUnit})`);
  assert(res.annualFuelVolume === 500, `Golden 2: annualFuelVolume = 500 (got ${res.annualFuelVolume})`);
  assert(Math.abs(res.annualFuelCost - 48360) < 0.01, `Golden 2: annualFuelCost = 48360 (got ${res.annualFuelCost})`);
}

// Golden 3: Multi-Tank Log
// Tank 1: 340 mi, 11.8 gal ($3.45)
// Tank 2: 355 mi, 12.1 gal ($3.52)
// Tank 3: 330 mi, 11.5 gal ($3.55)
{
  const logs: FillUpEntry[] = [
    { id: 1, distance: 340, fuelAdded: 11.8, pricePerUnit: 3.45 },
    { id: 2, distance: 355, fuelAdded: 12.1, pricePerUnit: 3.52 },
    { id: 3, distance: 330, fuelAdded: 11.5, pricePerUnit: 3.55 },
  ];
  const res = calculateGasMileage(
    "multi_tank",
    "us",
    "gasoline",
    0,
    0,
    0,
    0,
    3.5,
    15,
    15000,
    logs
  );
  assert(!res.validationError, `Golden 3: No error (got ${res.validationError})`);
  assert(res.totalDistance === 1025, `Golden 3: totalDistance = 1025 (got ${res.totalDistance})`);
  assert(Math.abs(res.totalFuelVolume - 35.4) < 1e-6, `Golden 3: totalFuelVolume = 35.4 (got ${res.totalFuelVolume})`);
  const expectedWeightedMPG = 1025 / 35.4;
  assert(Math.abs(res.usMPG - expectedWeightedMPG) < 0.001, `Golden 3: Weighted MPG ≈ 28.9548 (got ${res.usMPG})`);
  // Verify it does NOT equal the unweighted arithmetic mean (28.9500)
  assert(Math.abs(res.usMPG - 28.950013) > 0.002, "Golden 3: Must not equal unweighted arithmetic mean");
}

// Golden 4: Single Trip
// 300 miles, 25 MPG, $3.50/gal
{
  // For Single Trip mode, the function expects:
  // tripDistance = 300, fuelAdded is fuel volume or in single trip mode:
  // Let's check how "trip" mode works in calculator.ts!
  // In calculator.ts: totalDistance = tripDistance, totalFuelVolume = fuelAdded.
  // 300 miles / 25 MPG = 12 gallons.
  const res = calculateGasMileage(
    "trip",
    "us",
    "gasoline",
    0,
    0,
    300,
    12,
    3.50,
    15,
    15000
  );
  assert(!res.validationError, `Golden 4: No error (got ${res.validationError})`);
  assert(res.totalFuelVolume === 12, `Golden 4: totalFuelVolume = 12 (got ${res.totalFuelVolume})`);
  assert(res.tripFuelCost === 42.00, `Golden 4: tripFuelCost = $42.00 (got ${res.tripFuelCost})`);
  assert(Math.abs(res.costPerDistanceUnit - 0.14) < 0.001, `Golden 4: costPerDistanceUnit = $0.14 (got ${res.costPerDistanceUnit})`);
  assert(Math.abs(res.carbonFootprintKg - 106.6) < 1.0, `Golden 4: CO2 ≈ 106.6 kg (got ${res.carbonFootprintKg})`);
}

// Golden 5: Range Planner
// 15 gallons, 30 MPG, $3.50
{
  // In odometer/trip mode with 15 gal tank, 30 MPG:
  const res = calculateGasMileage(
    "odometer",
    "us",
    "gasoline",
    10000,
    10300,
    300,
    10,
    3.50,
    15,
    15000
  );
  assert(!res.validationError, "Golden 5: No error");
  assert(res.totalTankRange === 450, `Golden 5: range = 450 (got ${res.totalTankRange})`);
  assert(res.costToFillTank === 52.50, `Golden 5: costToFillTank = 52.50 (got ${res.costToFillTank})`);
}

// -------------------------------------------------------------
// 2. 10,000 ODOMETER ASSERTIONS (INDEPENDENT ORACLE)
// -------------------------------------------------------------
console.log("Testing 10,000 Odometer Randomized Cases...");
for (let i = 0; i < 10000; i++) {
  const start = Math.floor(Math.random() * 150000);
  const distance = Math.floor(Math.random() * 600) + 10; // 10 to 610 miles
  const end = start + distance;
  const fuel = +(Math.random() * 25 + 1).toFixed(3); // 1.0 to 26.0 gal
  const price = +(Math.random() * 6 + 1.5).toFixed(2); // $1.50 to $7.50
  const tank = Math.floor(Math.random() * 20) + 10;
  const annual = Math.floor(Math.random() * 30000) + 1000;

  const res = calculateGasMileage(
    "odometer",
    "us",
    "gasoline",
    start,
    end,
    distance,
    fuel,
    price,
    tank,
    annual
  );

  // Independent Oracle
  const oracleDist = end - start;
  const oracleMPG = oracleDist / fuel;
  const oracleCost = fuel * price;
  const oracleCostPerMile = price / oracleMPG;
  const oracleRange = tank * oracleMPG;
  const oracleTankCost = tank * price;
  const oracleAnnualFuel = annual / oracleMPG;
  const oracleAnnualCost = oracleAnnualFuel * price;

  assert(res.totalDistance === oracleDist, `Odo ${i}: distance match`);
  assert(Math.abs(res.usMPG - oracleMPG) < 1e-9, `Odo ${i}: MPG match`);
  assert(Math.abs(res.tripFuelCost - oracleCost) < 1e-4, `Odo ${i}: trip cost match`);
  assert(Math.abs(res.costPerDistanceUnit - oracleCostPerMile) < 1e-4, `Odo ${i}: cost/mi match`);
  assert(Math.abs(res.totalTankRange - oracleRange) < 1e-4, `Odo ${i}: range match`);
  assert(Math.abs(res.costToFillTank - oracleTankCost) < 1e-4, `Odo ${i}: tank cost match`);
  assert(Math.abs(res.annualFuelVolume - oracleAnnualFuel) < 1e-4, `Odo ${i}: annual fuel match`);
  assert(Math.abs(res.annualFuelCost - oracleAnnualCost) < 1e-4, `Odo ${i}: annual cost match`);
}

// -------------------------------------------------------------
// 3. 7,500 SINGLE TRIP ASSERTIONS
// -------------------------------------------------------------
console.log("Testing 7,500 Single Trip Randomized Cases...");
for (let i = 0; i < 7500; i++) {
  const dist = +(Math.random() * 1000 + 10).toFixed(2);
  const fuel = +(Math.random() * 40 + 2).toFixed(2);
  const price = +(Math.random() * 5 + 2).toFixed(2);

  const res = calculateGasMileage(
    "trip",
    "us",
    "gasoline",
    0,
    0,
    dist,
    fuel,
    price,
    15,
    15000
  );

  const oracleMPG = dist / fuel;
  const oracleCost = fuel * price;
  const oracleCostPerMi = price / oracleMPG;

  assert(Math.abs(res.totalFuelVolume - fuel) < 1e-6, `Trip ${i}: fuel match`);
  assert(Math.abs(res.tripFuelCost - oracleCost) < 1e-4, `Trip ${i}: cost match`);
  assert(Math.abs(res.costPerDistanceUnit - oracleCostPerMi) < 1e-4, `Trip ${i}: cost/mi match`);
}

// -------------------------------------------------------------
// 4. 7,500 MULTI-TANK LOG ASSERTIONS
// -------------------------------------------------------------
console.log("Testing 7,500 Multi-Tank Randomized Cases...");
for (let i = 0; i < 7500; i++) {
  const numTanks = Math.floor(Math.random() * 6) + 1; // 1 to 6 tanks
  const logs: FillUpEntry[] = [];
  let oracleTotDist = 0;
  let oracleTotFuel = 0;
  let oracleTotCost = 0;

  for (let t = 0; t < numTanks; t++) {
    const d = +(Math.random() * 400 + 100).toFixed(1);
    const f = +(Math.random() * 15 + 5).toFixed(2);
    const p = +(Math.random() * 3 + 2.5).toFixed(2);
    logs.push({ id: t + 1, distance: d, fuelAdded: f, pricePerUnit: p });
    oracleTotDist += d;
    oracleTotFuel += f;
    oracleTotCost += f * p;
  }

  const res = calculateGasMileage(
    "multi_tank",
    "us",
    "gasoline",
    0,
    0,
    0,
    0,
    3.5,
    15,
    15000,
    logs
  );

  const oracleWeightedMPG = oracleTotDist / oracleTotFuel;

  assert(Math.abs(res.totalDistance - oracleTotDist) < 1e-4, `Multi ${i}: distance match`);
  assert(Math.abs(res.totalFuelVolume - oracleTotFuel) < 1e-4, `Multi ${i}: fuel match`);
  assert(Math.abs(res.tripFuelCost - oracleTotCost) < 1e-4, `Multi ${i}: cost match`);
  assert(Math.abs(res.usMPG - oracleWeightedMPG) < 1e-4, `Multi ${i}: weighted MPG match`);
}

// -------------------------------------------------------------
// 5. 5,000 RANGE PLANNER ASSERTIONS
// -------------------------------------------------------------
console.log("Testing 5,000 Range Planner Cases...");
for (let i = 0; i < 5000; i++) {
  const cap = +(Math.random() * 25 + 8).toFixed(1);
  const dist = +(Math.random() * 400 + 100).toFixed(1);
  const fuel = +(Math.random() * 15 + 5).toFixed(2);
  const price = +(Math.random() * 5 + 2).toFixed(2);

  const res = calculateGasMileage(
    "odometer",
    "us",
    "gasoline",
    1000,
    1000 + dist,
    dist,
    fuel,
    price,
    cap,
    15000
  );

  const eff = dist / fuel;
  const oracleRange = cap * eff;
  const oracleTankCost = cap * price;

  assert(Math.abs(res.totalTankRange - oracleRange) < 1e-6, `Range ${i}: range match`);
  assert(Math.abs(res.costToFillTank - oracleTankCost) < 1e-4, `Range ${i}: tank cost match`);
}

// -------------------------------------------------------------
// 6. 5,000 UNIT CONVERSION ROUND-TRIP ASSERTIONS (TOLERANCE <= 1e-6)
// -------------------------------------------------------------
console.log("Testing 5,000 Unit Conversion Round-Trips...");
for (let i = 0; i < 5000; i++) {
  const mpg = Math.random() * 70 + 8; // 8 to 78 MPG

  // US MPG <-> L/100km round-trip
  const l100kmUS = convertUSMPGToL100km(mpg);
  const backMPGUS = convertL100kmToUSMPG(l100kmUS);
  assert(Math.abs(mpg - backMPGUS) < 1e-6, `Conversion ${i}: US MPG round-trip drift <= 1e-6 (diff: ${Math.abs(mpg - backMPGUS)})`);

  // UK MPG <-> L/100km round-trip
  const l100kmUK = convertUKMPGToL100km(mpg);
  const backMPGUK = convertL100kmToUKMPG(l100kmUK);
  assert(Math.abs(mpg - backMPGUK) < 1e-6, `Conversion ${i}: UK MPG round-trip drift <= 1e-6 (diff: ${Math.abs(mpg - backMPGUK)})`);

  // US MPG <-> km/L round-trip
  const kmL = convertUSMPGTokmL(mpg);
  const backMPGkmL = convertkmLToUSMPG(kmL);
  assert(Math.abs(mpg - backMPGkmL) < 1e-6, `Conversion ${i}: km/L round-trip drift <= 1e-6 (diff: ${Math.abs(mpg - backMPGkmL)})`);
}

// -------------------------------------------------------------
// 7. 5,000 COST & CO2 SCALING PROPERTY TESTS
// -------------------------------------------------------------
console.log("Testing 5,000 Cost & CO2 Property Tests...");
for (let i = 0; i < 5000; i++) {
  const fuel = +(Math.random() * 20 + 2).toFixed(2);
  const price = +(Math.random() * 5 + 2).toFixed(2);
  const dist = +(Math.random() * 400 + 50).toFixed(1);

  // Property 13: Zero price => zero cost
  const resZeroPrice = calculateGasMileage(
    "odometer",
    "us",
    "gasoline",
    1000,
    1000 + dist,
    dist,
    fuel,
    0, // zero price
    15,
    12000
  );
  assert(resZeroPrice.tripFuelCost === 0, `Cost/CO2 ${i}: Zero price => tripFuelCost = 0`);
  assert(resZeroPrice.annualFuelCost === 0, `Cost/CO2 ${i}: Zero price => annualFuelCost = 0`);

  // Property 14: Zero annual mileage => zero annual cost
  const resZeroAnnual = calculateGasMileage(
    "odometer",
    "us",
    "gasoline",
    1000,
    1000 + dist,
    dist,
    fuel,
    price,
    15,
    0 // zero annual mileage
  );
  assert(resZeroAnnual.annualFuelVolume === 0, `Cost/CO2 ${i}: Zero annual mileage => annual fuel = 0`);
  assert(resZeroAnnual.annualFuelCost === 0, `Cost/CO2 ${i}: Zero annual mileage => annual cost = 0`);
  assert(resZeroAnnual.carbonFootprintTons === 0, `Cost/CO2 ${i}: Zero annual mileage => annual CO2 = 0`);

  // Property 15 & 16: Fuel price does not affect MPG or CO2
  const resP1 = calculateGasMileage(
    "odometer",
    "us",
    "gasoline",
    1000,
    1000 + dist,
    dist,
    fuel,
    price,
    15,
    15000
  );
  const resP2 = calculateGasMileage(
    "odometer",
    "us",
    "gasoline",
    1000,
    1000 + dist,
    dist,
    fuel,
    price * 2,
    15,
    15000
  );
  assert(Math.abs(resP1.usMPG - resP2.usMPG) < 1e-9, `Cost/CO2 ${i}: Price does not affect MPG`);
  assert(Math.abs(resP1.carbonFootprintTons - resP2.carbonFootprintTons) < 1e-9, `Cost/CO2 ${i}: Price does not affect CO2`);
  assert(Math.abs(resP2.tripFuelCost - 2 * resP1.tripFuelCost) < 1e-4, `Cost/CO2 ${i}: Double price => double trip cost`);
}

// -------------------------------------------------------------
// 8. 5,000 VALIDATION & ZERO-STATE TESTS
// -------------------------------------------------------------
console.log("Testing 5,000 Validation and Zero-State Tests...");
for (let i = 0; i < 5000; i++) {
  // P0-01: Zero fuelAdded with positive distance must produce validation error
  const resZeroFuel = calculateGasMileage(
    "odometer",
    "us",
    "gasoline",
    1000,
    1360,
    360,
    0, // zero fuel
    3.5,
    15,
    15000
  );
  assert(!!resZeroFuel.validationError, `Val ${i}: Zero fuel must produce error`);
  assert(resZeroFuel.usMPG === 0, `Val ${i}: Zero fuel must not fabricate 3600 MPG`);

  // P0-03: Reversed odometer must produce validation error
  const resRevOdo = calculateGasMileage(
    "odometer",
    "us",
    "gasoline",
    12360,
    12000,
    360,
    12,
    3.5,
    15,
    15000
  );
  assert(!!resRevOdo.validationError, `Val ${i}: Reversed odo must produce error`);
  assert(resRevOdo.totalDistance === 0, `Val ${i}: Reversed odo totalDistance = 0`);

  // P1-02: Empty multi-tank log must produce zero distance and fuel, with error guidance
  const resEmptyMulti = calculateGasMileage(
    "multi_tank",
    "us",
    "gasoline",
    0,
    0,
    0,
    0,
    3.5,
    15,
    15000,
    []
  );
  assert(resEmptyMulti.totalDistance === 0, `Val ${i}: Empty multi distance = 0`);
  assert(resEmptyMulti.totalFuelVolume === 0, `Val ${i}: Empty multi fuel = 0`);
  assert(resEmptyMulti.usMPG === 0, `Val ${i}: Empty multi MPG = 0`);
  assert(!!resEmptyMulti.validationError, `Val ${i}: Empty multi has guidance`);

  // Negative distance must produce validation error
  const resNegDist = calculateGasMileage(
    "trip",
    "us",
    "gasoline",
    0,
    0,
    -50,
    10,
    3.5,
    15,
    15000
  );
  assert(!!resNegDist.validationError, `Val ${i}: Negative distance must error`);
}

// -------------------------------------------------------------
// 9. 5,000 EXPORT & STATE INTEGRITY TESTS
// -------------------------------------------------------------
console.log("Testing 5,000 State and Mode Isolation Tests...");
const modes = ["odometer", "trip", "multi_tank"] as const;
for (let i = 0; i < 5000; i++) {
  const m = modes[i % modes.length];
  const res = calculateGasMileage(
    m,
    "us",
    "gasoline",
    10000,
    10300,
    300,
    10,
    3.5,
    15,
    15000,
    [{ id: 1, distance: 300, fuelAdded: 10, pricePerUnit: 3.5 }]
  );

  assert(!isNaN(res.usMPG), `State ${i}: usMPG is not NaN`);
  assert(isFinite(res.usMPG), `State ${i}: usMPG is finite`);
  assert(!isNaN(res.tripFuelCost), `State ${i}: tripFuelCost is not NaN`);
  assert(isFinite(res.tripFuelCost), `State ${i}: tripFuelCost is finite`);
  assert(!isNaN(res.totalTankRange), `State ${i}: range is not NaN`);
  assert(isFinite(res.totalTankRange), `State ${i}: range is finite`);
}

console.log("=============================================================");
console.log(`TOTAL PASSED ASSERTIONS: ${passedAssertions.toLocaleString()}`);
console.log(`TOTAL FAILED ASSERTIONS: ${failedAssertions}`);
console.log("=============================================================");

if (failedAssertions > 0) {
  process.exit(1);
} else {
  console.log("ALL TEST CRITERIA SATISFIED WITH 100% PASS RATE!");
}
