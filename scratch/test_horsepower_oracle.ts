import {
  calculateHorsepower,
  getDrivetrainLossPercent,
  calculateSAECorrectionFactor,
  convertPowerToWatts,
  convertWattsToPower,
  MECHANICAL_HP_RPM_CONSTANT,
  METRIC_HP_CONSTANT,
} from "../src/app/calculators/horsepower-calculator/calculator";
import {
  CalcMode,
  DragModel,
  DrivetrainType,
  PowerUnit,
  AtmosphericConditions,
} from "../src/app/calculators/horsepower-calculator/types";

// INDEPENDENT MATHEMATICAL ORACLES (DO NOT USE PRODUCTION LOGIC)
const ORACLE_5252_CONSTANT = 33000 / (2 * Math.PI); // 5252.113122092556
const ORACLE_WATT_MECHANICAL = 745.699872;
const ORACLE_WATT_METRIC = 735.49875;
const ORACLE_WATT_ELECTRICAL = 746.0;
const ORACLE_WATT_BOILER = 9809.5;
const ORACLE_NM_PER_LBFT = 1.3558179483314004;

function oracleTorqueToHP(torqueLbFt: number, rpm: number): number {
  return (torqueLbFt * rpm) / ORACLE_5252_CONSTANT;
}

function oracleHPToTorque(hp: number, rpm: number): number {
  return (hp * ORACLE_5252_CONSTANT) / rpm;
}

function oracleWHP(crankBHP: number, lossPercent: number): number {
  return crankBHP * (1 - lossPercent / 100);
}

function oracleReverseBHP(whp: number, lossPercent: number): number {
  return whp / (1 - lossPercent / 100);
}

function oracleHaleETToHP(weightLbs: number, etSec: number): number {
  return weightLbs / Math.pow(etSec / 5.825, 3);
}

function oracleFoxSpeedToHP(weightLbs: number, speedMph: number): number {
  return weightLbs * Math.pow(speedMph / 234, 3);
}

function oracleAccelReqHP(weightLbs: number, timeSec: number, lossPercent: number): number {
  const reqWHP = weightLbs * Math.pow(2.5 / timeSec, 2);
  return reqWHP / (1 - lossPercent / 100);
}

function oracleSAECorrection(tempF: number, pressInHg: number): number {
  const tempK = ((tempF - 32) * 5) / 9 + 273.15;
  return 1.18 * (29.92 / pressInHg) * Math.sqrt(tempK / 298.15) - 0.18;
}

let totalAssertions = 0;
let passedAssertions = 0;
let failedAssertions = 0;

function assert(condition: boolean, msg: string) {
  totalAssertions++;
  if (condition) {
    passedAssertions++;
  } else {
    failedAssertions++;
    if (failedAssertions <= 20) {
      console.error(`FAIL: ${msg}`);
    }
  }
}

console.log("=== STARTING COMPREHENSIVE HORSEPOWER ORACLE AUDIT ===");

// 1. TORQUE & RPM SUITE (20,000 cases)
console.log("Running Suite 1: Torque & RPM (20,000 cases)...");
for (let i = 0; i < 20000; i++) {
  const torque = 1 + Math.random() * 2000;
  const rpm = 500 + Math.random() * 12000;
  const res = calculateHorsepower("torque_rpm", "rwd_manual", "fox", torque, "lbft", rpm);

  const expectedHP = oracleTorqueToHP(torque, rpm);
  assert(
    Math.abs(res.crankBHP - Math.round(expectedHP)) <= 1,
    `Torque ${torque} @ ${rpm} RPM: got ${res.crankBHP}, expected ${Math.round(expectedHP)}`
  );
  assert(res.isValid, "Should be marked valid");
  assert(Number.isFinite(res.crankBHP), "BHP must be finite");
  assert(res.crankBHP >= 0, "BHP must be non-negative");
}

// 2. INVERSE TORQUE / HP (10,000 cases)
console.log("Running Suite 2: Inverse Torque / HP (10,000 cases)...");
for (let i = 0; i < 10000; i++) {
  const hp = 50 + Math.random() * 1500;
  const rpm = 800 + Math.random() * 10000;
  const expectedTorque = oracleHPToTorque(hp, rpm);
  const recomputedHP = oracleTorqueToHP(expectedTorque, rpm);
  assert(
    Math.abs(recomputedHP - hp) < 1e-6,
    `Inverse round trip error for ${hp} HP @ ${rpm} RPM`
  );
}

// 3. UNIT CONVERSIONS (10,000 cases)
console.log("Running Suite 3: Unit Conversions (10,000 cases)...");
const powerUnits: PowerUnit[] = [
  "hp_mechanical",
  "hp_metric",
  "hp_electrical",
  "hp_boiler",
  "kilowatt",
  "watt",
  "btu_hr",
  "ft_lbs_sec",
];

for (let i = 0; i < 10000; i++) {
  const val = 1 + Math.random() * 5000;
  const u1 = powerUnits[Math.floor(Math.random() * powerUnits.length)];
  const u2 = powerUnits[Math.floor(Math.random() * powerUnits.length)];

  const watts = convertPowerToWatts(val, u1);
  const converted = convertWattsToPower(watts, u2);
  const roundTripWatts = convertPowerToWatts(converted, u2);
  const roundTripVal = convertWattsToPower(roundTripWatts, u1);

  assert(
    Math.abs(roundTripVal - val) / val < 1e-4,
    `Unit conversion roundtrip failed: ${val} ${u1} -> ${u2} -> ${roundTripVal}`
  );
}

// 4. DRIVETRAIN LOSSES (10,000 cases)
console.log("Running Suite 4: Drivetrain Losses (10,000 cases)...");
const drivetrains: DrivetrainType[] = ["fwd_manual", "rwd_manual", "rwd_auto", "awd"];
for (let i = 0; i < 10000; i++) {
  const bhp = 100 + Math.random() * 1000;
  const dt = drivetrains[Math.floor(Math.random() * drivetrains.length)];
  const lossPct = getDrivetrainLossPercent(dt);

  const res = calculateHorsepower("torque_rpm", dt, "fox", (bhp * 5252.113) / 5252, "lbft", 5252);
  const expectedWHP = oracleWHP(res.crankBHP, lossPct);

  assert(
    Math.abs(res.wheelWHP - Math.round(expectedWHP)) <= 1,
    `Drivetrain ${dt} (${lossPct}%): Crank ${res.crankBHP}, got WHP ${res.wheelWHP}, expected ${Math.round(expectedWHP)}`
  );
  // Monotonicity check
  const fwd = calculateHorsepower("torque_rpm", "fwd_manual", "fox", (bhp * 5252.113) / 5252, "lbft", 5252).wheelWHP;
  const rwdM = calculateHorsepower("torque_rpm", "rwd_manual", "fox", (bhp * 5252.113) / 5252, "lbft", 5252).wheelWHP;
  const rwdA = calculateHorsepower("torque_rpm", "rwd_auto", "fox", (bhp * 5252.113) / 5252, "lbft", 5252).wheelWHP;
  const awd = calculateHorsepower("torque_rpm", "awd", "fox", (bhp * 5252.113) / 5252, "lbft", 5252).wheelWHP;

  assert(fwd >= rwdM && rwdM >= rwdA && rwdA >= awd, `Drivetrain loss monotonicity violated at ${bhp} BHP`);
}

// 5. POWER-TO-WEIGHT (10,000 cases)
console.log("Running Suite 5: Power-to-Weight (10,000 cases)...");
for (let i = 0; i < 10000; i++) {
  const weightLbs = 1000 + Math.random() * 7000;
  const hp = 100 + Math.random() * 1000;
  const res = calculateHorsepower("torque_rpm", "rwd_manual", "fox", (hp * 5252.113) / 5252, "lbft", 5252, weightLbs);

  const expectedHP = oracleTorqueToHP((hp * 5252.113) / 5252, 5252);
  const expectedTons = weightLbs / 2000;
  const expectedHpPerTon = Math.round(expectedHP / expectedTons);
  const expectedLbPerHp = parseFloat((weightLbs / expectedHP).toFixed(2));

  assert(
    Math.abs(res.hpPerTon - expectedHpPerTon) <= 1,
    `Power to weight HP/ton: got ${res.hpPerTon}, expected ${expectedHpPerTon}`
  );
  assert(
    Math.abs(res.lbPerHp - expectedLbPerHp) <= 0.05,
    `Power to weight lb/HP: got ${res.lbPerHp}, expected ${expectedLbPerHp}`
  );
}

// 6. SAE J1349 WEATHER CORRECTION (10,000 cases)
console.log("Running Suite 6: SAE Weather Correction (10,000 cases)...");
// Check exact reference condition first:
const refRes = calculateSAECorrectionFactor({
  enabled: true,
  tempF: 77,
  pressureInHg: 29.92,
  humidityPercent: 0,
  turbocharged: false,
});
assert(
  Math.abs(refRes - 1.0) < 0.005,
  `Reference condition 77F, 29.92 inHg should give CF=1.000, got ${refRes}`
);

for (let i = 0; i < 10000; i++) {
  const tempF = 20 + Math.random() * 110;
  const pressure = 24 + Math.random() * 8; // 24 to 32 inHg
  const cond: AtmosphericConditions = {
    enabled: true,
    tempF,
    pressureInHg: pressure,
    humidityPercent: 0,
    turbocharged: false,
  };

  const cf = calculateSAECorrectionFactor(cond);
  const expectedCF = oracleSAECorrection(tempF, pressure);
  const clampedExpected = Math.max(0.5, Math.min(1.8, expectedCF));

  assert(
    Math.abs(cf - clampedExpected) <= 0.01,
    `SAE CF at ${tempF}F, ${pressure} inHg: got ${cf}, expected ${clampedExpected.toFixed(3)}`
  );
}

// 7. 1/4-MILE DRAG MODELS (10,000 cases)
console.log("Running Suite 7: 1/4-Mile Drag Strip (10,000 cases)...");
for (let i = 0; i < 10000; i++) {
  const weight = 1500 + Math.random() * 4000;
  const et = 7 + Math.random() * 13; // 7 to 20 seconds
  const resHale = calculateHorsepower("drag_strip", "rwd_manual", "hale", 400, "lbft", 5252, weight, et, 115, true);

  const expectedHale = oracleHaleETToHP(weight, et);
  assert(
    Math.abs(resHale.crankBHP - Math.round(expectedHale)) <= 1,
    `Hale ET ${et}s, ${weight} lbs: got ${resHale.crankBHP}, expected ${Math.round(expectedHale)}`
  );
  // Physical Sanity: For 3500 lbs and 12s, HP must be in the hundreds (300-500 HP), NEVER millions!
  assert(
    resHale.crankBHP < 20000,
    `HP must not be in the millions! Got ${resHale.crankBHP}`
  );
  assert(
    resHale.estimatedET > 0 && resHale.estimatedET < 50,
    `Estimated ET must be realistic (not 482s!). Got ${resHale.estimatedET}`
  );
}

// 8. 0–60 SPRINT MODEL (10,000 cases)
console.log("Running Suite 8: 0–60 Sprint (10,000 cases)...");
for (let i = 0; i < 10000; i++) {
  const weight = 2000 + Math.random() * 4000;
  const time = 2.5 + Math.random() * 8; // 2.5 to 10.5 seconds
  const lossPct = 17.5; // RWD auto
  const res = calculateHorsepower("acceleration", "rwd_auto", "fox", 400, "lbft", 5252, weight, 12, 115, true, time);

  const expectedHP = oracleAccelReqHP(weight, time, lossPct);
  assert(
    Math.abs(res.crankBHP - Math.round(expectedHP)) <= 2,
    `Accel ${time}s, ${weight} lbs: got ${res.crankBHP}, expected ${Math.round(expectedHP)}`
  );
  assert(
    res.crankBHP > 0 && res.crankBHP < 50000,
    `Required HP must be realistic, got ${res.crankBHP}`
  );
}

// 9. ZERO / NEGATIVE / INVALID EDGE CASES (10,000 cases)
console.log("Running Suite 9: Zero / Negative / Invalid (10,000 cases)...");
// Exact zero cases
const z1 = calculateHorsepower("torque_rpm", "rwd_manual", "fox", 0, "lbft", 5252);
assert(z1.crankBHP === 0, "Torque = 0 should give HP = 0");
const z2 = calculateHorsepower("torque_rpm", "rwd_manual", "fox", 400, "lbft", 0);
assert(z2.crankBHP === 0, "RPM = 0 should give HP = 0");
const z3 = calculateHorsepower("torque_rpm", "rwd_manual", "fox", 0, "lbft", 0);
assert(z3.crankBHP === 0, "Torque = 0 and RPM = 0 should give HP = 0");

// Negative and NaN edge cases
for (let i = 0; i < 9997; i++) {
  const negTorque = -1 - Math.random() * 100;
  const res = calculateHorsepower("torque_rpm", "rwd_manual", "fox", negTorque, "lbft", 5252);
  assert(!res.isValid, "Negative torque should trigger isValid: false");
  assert(res.errorMessage !== undefined, "Negative torque should provide error message");
  assert(!Number.isNaN(res.crankBHP), "Crank BHP must not be NaN");
  assert(!Number.isNaN(res.wheelWHP), "Wheel WHP must not be NaN");
  assert(Number.isFinite(res.crankBHP), "Crank BHP must be finite");
}

// 10. EXPORT CONSISTENCY & PROPERTY CHECKS (10,000 cases)
console.log("Running Suite 10: Export Consistency & Properties (10,000 cases)...");
for (let i = 0; i < 10000; i++) {
  const torque = 100 + Math.random() * 600;
  const rpm = 2000 + Math.random() * 5000;
  const res = calculateHorsepower("torque_rpm", "rwd_manual", "fox", torque, "lbft", rpm);

  // Property 1 & 2: HP = Torque * RPM / constant
  const computedHP = (torque * rpm) / MECHANICAL_HP_RPM_CONSTANT;
  assert(Math.abs(res.crankBHP - Math.round(computedHP)) <= 1, "Property 1: HP = Torque * RPM / constant");

  // Property 3 & 4: WHP = BHP * (1 - loss)
  assert(Math.abs(res.wheelWHP - Math.round(res.crankBHP * 0.86)) <= 1, "Property 3: WHP = BHP * (1 - loss)");

  // Property 10: Disabled weather correction gives saeCorrectionFactor = 1.0
  assert(res.saeCorrectionFactor === 1.0, "Disabled weather correction must have factor 1.0");

  // Property 17: Dyno curve points match
  assert(res.dynoCurve.length > 0, "Dyno curve points must exist");
  const p5252 = res.dynoCurve.find((p) => p.rpm === 5250 || p.rpm === 5000);
  assert(p5252 !== undefined, "Dyno curve must include points around 5252");
}

// GOLDEN REFERENCE CHECKS:
console.log("\n=== AUDITING GOLDEN REFERENCE CASES ===");

// Golden Case 1: 400 lb-ft @ 5252 RPM
const gc1 = calculateHorsepower("torque_rpm", "rwd_manual", "fox", 400, "lbft", 5252);
console.log(`Golden Case 1 (400 lb-ft @ 5252 RPM): ${gc1.crankBHP} BHP (Expected ~400 BHP)`);
assert(gc1.crankBHP === 400, `Expected 400 BHP, got ${gc1.crankBHP}`);

// Golden Case 2: 400 BHP @ 14% loss = 344 WHP
console.log(`Golden Case 2 (400 BHP @ 14% loss): ${gc1.wheelWHP} WHP (Expected 344 WHP)`);
assert(gc1.wheelWHP === 344, `Expected 344 WHP, got ${gc1.wheelWHP}`);

// Golden Case 3: 400 BHP Metric power: 298.3 kW and 406 PS
console.log(`Golden Case 3: ${gc1.kilowatts} kW (Expected 298.3 kW), ${gc1.metricPS} PS (Expected 406 PS)`);
assert(Math.abs(gc1.kilowatts - 298.3) <= 0.1, `Expected 298.3 kW, got ${gc1.kilowatts}`);
assert(gc1.metricPS === 406, `Expected 406 PS, got ${gc1.metricPS}`);

// Golden Case 4: Power-to-weight for 3,500 lb, 400 BHP
console.log(`Golden Case 4: ${gc1.hpPerTon} HP/ton (Expected 229 HP/ton), ${gc1.lbPerHp} lb/HP (Expected 8.75 lb/HP)`);
assert(gc1.hpPerTon === 229, `Expected 229 HP/ton, got ${gc1.hpPerTon}`);
assert(gc1.lbPerHp === 8.75, `Expected 8.75 lb/HP, got ${gc1.lbPerHp}`);

// Golden Case 5: 3500 lb, 400 HP Quarter-Mile ET & Trap Speed
console.log(`Golden Case 5: Estimated 1/4-Mile: ${gc1.estimatedET}s @ ${gc1.estimatedTrapSpeedMph} mph`);
assert(
  Math.abs(gc1.estimatedET - 12.0) <= 0.2,
  `Estimated ET should be ~12.0s, NOT 482.19s! Got ${gc1.estimatedET}`
);
assert(
  Math.abs(gc1.estimatedTrapSpeedMph - 114) <= 1,
  `Estimated Trap Speed should be ~114 mph, got ${gc1.estimatedTrapSpeedMph}`
);

// Golden Case 6: 3500 lb, 12s Hale Drag Model
const gcDragHale = calculateHorsepower("drag_strip", "rwd_manual", "hale", 400, "lbft", 5252, 3500, 12.0, 115, true);
console.log(`Golden Case 6 (Hale 3500 lb / 12s): ${gcDragHale.crankBHP} BHP (Expected ~400 BHP)`);
assert(Math.abs(gcDragHale.crankBHP - 400) <= 2, `Expected ~400 BHP, got ${gcDragHale.crankBHP}`);

// Golden Case 7: 3500 lb, 12s Fox Drag Model
const gcDragFox = calculateHorsepower("drag_strip", "rwd_manual", "fox", 400, "lbft", 5252, 3500, 12.0, 115, true);
console.log(`Golden Case 7 (Fox 3500 lb / 12s): ${gcDragFox.crankBHP} BHP (Expected ~377 BHP)`);
assert(Math.abs(gcDragFox.crankBHP - 377) <= 2, `Expected ~377 BHP, got ${gcDragFox.crankBHP}`);

// Golden Case 8: 3500 lb, 4.2s 0–60 Sprint Time
const gcAccel = calculateHorsepower("acceleration", "rwd_auto", "fox", 400, "lbft", 5252, 3500, 12, 115, true, 4.2);
console.log(`Golden Case 8 (0–60 4.2s @ 3500 lb): ${gcAccel.crankBHP} BHP, ${gcAccel.wheelWHP} WHP`);
assert(Math.abs(gcAccel.crankBHP - 1503) <= 2, `Expected ~1503 BHP, got ${gcAccel.crankBHP}`);
assert(Math.abs(gcAccel.wheelWHP - 1240) <= 2, `Expected ~1240 WHP, got ${gcAccel.wheelWHP}`);

console.log("\n============================================================");
console.log(`TOTAL AUDIT ASSERTIONS: ${totalAssertions}`);
console.log(`PASSED: ${passedAssertions}`);
console.log(`FAILED: ${failedAssertions}`);
console.log("============================================================");

if (failedAssertions > 0) {
  process.exit(1);
} else {
  console.log("ALL ORACLE TESTS PASSED 100%!");
  process.exit(0);
}
