export {};
import {
  DISTANCE_UNITS,
  SPEED_UNITS,
  REAL_WORLD_SPEED_REFERENCES,
  calculateSpeedSolver,
  calculateRacePace,
  calculateMultiSegmentSpeed,
  convertSpeedDirect,
  formatTimeHoursMinutesSeconds,
  formatPace,
  formatSpeedPrecision,
} from "../src/lib/calculator-engine/formulas/speed";

console.log("=================================================");
console.log("STARTING MASTER PRODUCTION AUDIT: SPEED CALCULATOR");
console.log("=================================================");

let totalPassed = 0;
let totalFailed = 0;
const defects: string[] = [];

function assert(condition: boolean, testName: string, details?: string) {
  if (condition) {
    totalPassed++;
  } else {
    totalFailed++;
    console.error(`[FAIL] ${testName}: ${details || ""}`);
    defects.push(`${testName}: ${details || ""}`);
  }
}

// -------------------------------------------------------------
// SECTION 1: GOLDEN TESTS TC-01 THROUGH TC-16
// -------------------------------------------------------------
console.log("\n--- Executing Golden Tests (TC-01 through TC-16) ---");

// TC-01: Distance = 100 miles, Time = 1 hour 30 minutes
const tc01 = calculateSpeedSolver({
  mode: "speed",
  distanceValue: 100,
  distanceUnit: "mi",
  timeHours: 1,
  timeMinutes: 30,
  timeSeconds: 0,
  speedValue: 0,
  speedUnit: "mph",
});
assert(Math.abs(tc01.speedMph - 66.6666667) < 0.01, "TC-01a: Speed in mph = 66.67 mph", `Got ${tc01.speedMph}`);
assert(Math.abs(tc01.speedKmh - 107.2912) < 0.02, "TC-01b: Speed in km/h ≈ 107.29 km/h", `Got ${tc01.speedKmh}`);
assert(Math.abs(tc01.speedMs - 29.803) < 0.05, "TC-01c: Speed in m/s ≈ 29.80 m/s", `Got ${tc01.speedMs}`);

// TC-02: Distance = 100 km, Time = 2 hours -> 50 km/h
const tc02 = calculateSpeedSolver({
  mode: "speed",
  distanceValue: 100,
  distanceUnit: "km",
  timeHours: 2,
  timeMinutes: 0,
  timeSeconds: 0,
  speedValue: 0,
  speedUnit: "kmh",
});
assert(Math.abs(tc02.speedKmh - 50) < 1e-9, "TC-02: 100 km / 2 h = 50 km/h", `Got ${tc02.speedKmh}`);

// TC-03: Speed = 60 mph, Time = 2 hours -> Distance = 120 miles
const tc03 = calculateSpeedSolver({
  mode: "distance",
  distanceValue: 0,
  distanceUnit: "mi",
  timeHours: 2,
  timeMinutes: 0,
  timeSeconds: 0,
  speedValue: 60,
  speedUnit: "mph",
});
const distMi03 = tc03.distanceMeters / 1609.344;
assert(Math.abs(distMi03 - 120) < 1e-6, "TC-03: 60 mph × 2 h = 120 miles", `Got ${distMi03}`);

// TC-04: Speed = 100 km/h, Distance = 250 km -> Time = 2.5 hours (9000 s)
const tc04 = calculateSpeedSolver({
  mode: "time",
  distanceValue: 250,
  distanceUnit: "km",
  timeHours: 0,
  timeMinutes: 0,
  timeSeconds: 0,
  speedValue: 100,
  speedUnit: "kmh",
});
assert(Math.abs(tc04.totalTimeSeconds - 9000) < 0.1, "TC-04: 250 km / 100 km/h = 2.5 hours", `Got ${tc04.totalTimeSeconds / 3600} hrs`);

// TC-05: Distance = 5 km, Time = 24 min 30 sec -> Pace: 4:54 min/km, 7:53 min/mi, Speed: 12.24 km/h (7.61 mph)
const tc05Pace = calculateRacePace(5000, 24 * 60 + 30);
assert(tc05Pace.paceMinKm === "4:54", "TC-05a: 5K in 24:30 pace per km = 4:54", `Got ${tc05Pace.paceMinKm}`);
assert(tc05Pace.paceMinMile === "7:53", "TC-05b: 5K in 24:30 pace per mile = 7:53", `Got ${tc05Pace.paceMinMile}`);
assert(Math.abs(tc05Pace.speedMph - 7.61) < 0.02, "TC-05c: 5K in 24:30 speed in mph ≈ 7.61 mph", `Got ${tc05Pace.speedMph}`);
assert(Math.abs(tc05Pace.speedKmh - 12.24) < 0.02, "TC-05d: 5K in 24:30 speed in km/h ≈ 12.24 km/h", `Got ${tc05Pace.speedKmh}`);

// TC-06: Distance = 0, Time = valid -> Speed = 0
const tc06 = calculateSpeedSolver({
  mode: "speed",
  distanceValue: 0,
  distanceUnit: "mi",
  timeHours: 1,
  timeMinutes: 0,
  timeSeconds: 0,
  speedValue: 0,
  speedUnit: "mph",
});
assert(tc06.speedMs === 0 && tc06.speedMph === 0, "TC-06: 0 distance yields 0 speed", `Got ${tc06.speedMph}`);

// TC-07: Speed = 0, Time = 2 h -> Distance = 0
const tc07 = calculateSpeedSolver({
  mode: "distance",
  distanceValue: 0,
  distanceUnit: "mi",
  timeHours: 2,
  timeMinutes: 0,
  timeSeconds: 0,
  speedValue: 0,
  speedUnit: "mph",
});
assert(tc07.distanceMeters === 0, "TC-07: 0 speed yields 0 distance", `Got ${tc07.distanceMeters}`);

// TC-08: Time = 0 with non-zero distance (Division by zero check)
const tc08 = calculateSpeedSolver({
  mode: "speed",
  distanceValue: 100,
  distanceUnit: "mi",
  timeHours: 0,
  timeMinutes: 0,
  timeSeconds: 0,
  speedValue: 0,
  speedUnit: "mph",
});
console.log(`Current tc08 (Time=0) returns valid: ${tc08.valid}, error: ${tc08.error}`);
assert(tc08.valid === false && tc08.error === "Time must be greater than zero.", "TC-08: Time = 0 division by zero rejection", `Got valid=${tc08.valid}, error=${tc08.error}`);


// TC-09 through TC-16: Speed Converter
// TC-09: 1 mph -> m/s = 0.44704 m/s
const tc09 = convertSpeedDirect(1, "mph", "ms");
assert(Math.abs(tc09.outputValue - 0.44704) < 1e-9, "TC-09: 1 mph = 0.44704 m/s", `Got ${tc09.outputValue}`);

// TC-10: 1 m/s -> mph = 2.236936... mph
const tc10 = convertSpeedDirect(1, "ms", "mph");
assert(Math.abs(tc10.outputValue - 2.236936292) < 1e-5, "TC-10: 1 m/s ≈ 2.236936 mph", `Got ${tc10.outputValue}`);

// TC-11: 1 m/s -> km/h = 3.6 km/h
const tc11 = convertSpeedDirect(1, "ms", "kmh");
assert(Math.abs(tc11.outputValue - 3.6) < 1e-9, "TC-11: 1 m/s = 3.6 km/h", `Got ${tc11.outputValue}`);

// TC-12: 1 knot -> km/h = 1.852 km/h
const tc12 = convertSpeedDirect(1, "knots", "kmh");
assert(Math.abs(tc12.outputValue - 1.852) < 1e-9, "TC-12: 1 knot = 1.852 km/h", `Got ${tc12.outputValue}`);

// TC-13: 1 knot -> m/s = 0.514444... m/s
const tc13 = convertSpeedDirect(1, "knots", "ms");
assert(Math.abs(tc13.outputValue - (1852 / 3600)) < 1e-9, "TC-13: 1 knot ≈ 0.514444 m/s", `Got ${tc13.outputValue}`);

// TC-14: 1 mph -> km/h = 1.609344 km/h
const tc14 = convertSpeedDirect(1, "mph", "kmh");
assert(Math.abs(tc14.outputValue - 1.609344) < 1e-9, "TC-14: 1 mph = 1.609344 km/h", `Got ${tc14.outputValue}`);

// TC-15: 100 km/h -> mph ≈ 62.1371 mph
const tc15 = convertSpeedDirect(100, "kmh", "mph");
assert(Math.abs(tc15.outputValue - 62.137119) < 1e-3, "TC-15: 100 km/h ≈ 62.1371 mph", `Got ${tc15.outputValue}`);

// TC-16: 100 mph -> km/h = 160.9344 km/h
const tc16 = convertSpeedDirect(100, "mph", "kmh");
assert(Math.abs(tc16.outputValue - 160.9344) < 1e-6, "TC-16: 100 mph = 160.9344 km/h", `Got ${tc16.outputValue}`);

// Marathon Worked Example (from PDF page 4)
const marathonSecs = 3 * 3600 + 15 * 60 + 30; // 11,730 s
const marathonDistMeters = 42195;
const marathonDistMiles = 42195 / 1609.344; // 26.21875 mi
const marathonPace = calculateRacePace(marathonDistMeters, marathonSecs);
assert(marathonPace.paceMinMile === "7:27", "Marathon Worked Example: Pace per mile = 7:27 /mi", `Got ${marathonPace.paceMinMile}`);
assert(marathonPace.paceMinKm === "4:38", "Marathon Worked Example: Pace per km = 4:38 /km", `Got ${marathonPace.paceMinKm}`);
assert(Math.abs(marathonPace.speedMph - 8.05) < 0.02, "Marathon Worked Example: Speed ≈ 8.05 mph", `Got ${marathonPace.speedMph}`);
assert(Math.abs(marathonPace.speedKmh - 12.95) < 0.02, "Marathon Worked Example: Speed ≈ 12.95 km/h", `Got ${marathonPace.speedKmh}`);

// Multi-Segment Reference Case (from PDF page 3)
// Segment 1: 60 km / 45 min, Segment 2: 80 km / 60 min
const multiRes = calculateMultiSegmentSpeed([
  { id: "1", distanceKm: 60, timeMinutes: 45 },
  { id: "2", distanceKm: 80, timeMinutes: 60 },
]);
assert(multiRes.totalDistanceKm === 140, "Multi-segment: Total distance = 140 km", `Got ${multiRes.totalDistanceKm}`);
assert(multiRes.totalTimeMinutes === 105, "Multi-segment: Total time = 105 min", `Got ${multiRes.totalTimeMinutes}`);
assert(multiRes.averageSpeedKmh === 80, "Multi-segment: Average speed = 80 km/h", `Got ${multiRes.averageSpeedKmh}`);
assert(Math.abs(multiRes.averageSpeedMph - 49.71) < 0.02, "Multi-segment: Average speed ≈ 49.71 mph", `Got ${multiRes.averageSpeedMph}`);

// -------------------------------------------------------------
// SECTION 2: CRITICAL HARMONIC MEAN TERMINOLOGY CHECK
// -------------------------------------------------------------
console.log("\n--- Testing Harmonic Mean vs Total-Time Weighted Average Speed ---");
// Unequal distance test:
// Leg 1: 60 km at 60 km/h (1 hr = 60 min)
// Leg 2: 80 km at 80 km/h (1 hr = 60 min)
const unequalMulti = calculateMultiSegmentSpeed([
  { id: "1", distanceKm: 60, timeMinutes: 60 },
  { id: "2", distanceKm: 80, timeMinutes: 60 },
]);
// Total distance = 140 km, total time = 2 hrs -> v_avg = 70 km/h.
// But harmonic mean of speeds 60 and 80: 2 / (1/60 + 1/80) = 2 / (7/240) = 480 / 7 ≈ 68.5714 km/h!
console.log(`Unequal distance case: Total distance/time average = ${unequalMulti.averageSpeedKmh} km/h`);
const harmonicMeanSpeeds = 2 / (1/60 + 1/80);
console.log(`Harmonic mean of speeds (60 and 80) = ${harmonicMeanSpeeds.toFixed(4)} km/h`);
// This proves the formula in calculateMultiSegmentSpeed is strictly total distance / total time (70 km/h).
// Labeling it "Harmonic Avg Velocity" in the UI is mathematically incorrect!
const terminologyDefect = unequalMulti.averageSpeedKmh !== Math.round(harmonicMeanSpeeds * 100) / 100;
assert(terminologyDefect, "TERMINOLOGY DEFECT CONFIRMED: calculateMultiSegmentSpeed calculates Sigma d / Sigma t, NOT Harmonic Mean!");

// -------------------------------------------------------------
// SECTION 3: 10,000 RANDOMIZED SPEED ROUND-TRIP CONVERSIONS
// -------------------------------------------------------------
console.log(`\n--- Executing 10,000 Randomized Speed Conversion Round Trips across ${SPEED_UNITS.length} units ---`);
let rtPassed = 0;
let rtFailed = 0;
let maxRtRelError = 0;
let maxRtAbsError = 0;

for (let i = 0; i < 10000; i++) {
  const u1 = SPEED_UNITS[Math.floor(Math.random() * SPEED_UNITS.length)];
  const u2 = SPEED_UNITS[Math.floor(Math.random() * SPEED_UNITS.length)];

  // Random positive speed value spanning 1e-6 to 1e6
  const val = Math.pow(10, -6 + Math.random() * 12);

  const fwd = convertSpeedDirect(val, u1.id, u2.id, 8);
  const rev = convertSpeedDirect(fwd.outputValue, u2.id, u1.id, 8);

  const absErr = Math.abs(rev.outputValue - val);
  const relErr = val === 0 ? 0 : absErr / val;

  if (relErr > maxRtRelError) maxRtRelError = relErr;
  if (absErr > maxRtAbsError) maxRtAbsError = absErr;

  if (relErr < 1e-9 || absErr < 1e-12) {
    rtPassed++;
  } else {
    rtFailed++;
  }
}
console.log(`Round trips: ${rtPassed} / 10,000 passed (${rtFailed} failed). Max Rel Err: ${maxRtRelError.toExponential(4)}, Max Abs Err: ${maxRtAbsError.toExponential(4)}`);
assert(rtFailed === 0, "10,000 Randomized Speed Round Trips Passed");

// -------------------------------------------------------------
// SECTION 4: 10,000 RANDOMIZED KINEMATIC PROPERTY TESTS (v = d/t, d = vt, t = d/v)
// -------------------------------------------------------------
console.log("\n--- Executing 10,000 Randomized Kinematic Property Tests ---");
let kinPassed = 0;
let kinFailed = 0;

for (let i = 0; i < 10000; i++) {
  const dUnit = DISTANCE_UNITS[Math.floor(Math.random() * DISTANCE_UNITS.length)];
  const sUnit = SPEED_UNITS[Math.floor(Math.random() * SPEED_UNITS.length)];

  // Random distance and time
  const dVal = Math.random() * 1000 + 0.1;
  const hrs = Math.floor(Math.random() * 5);
  const mins = Math.floor(Math.random() * 60);
  const secs = Math.floor(Math.random() * 60) + 1; // >= 1 sec

  // 1. Solve Speed
  const resSpeed = calculateSpeedSolver({
    mode: "speed",
    distanceValue: dVal,
    distanceUnit: dUnit.id,
    timeHours: hrs,
    timeMinutes: mins,
    timeSeconds: secs,
    speedValue: 0,
    speedUnit: sUnit.id,
  });

  // 2. Solve Distance with calculated speed
  const speedInUnit = resSpeed.speedMs / sUnit.toMetersPerSecond;
  const resDist = calculateSpeedSolver({
    mode: "distance",
    distanceValue: 0,
    distanceUnit: dUnit.id,
    timeHours: hrs,
    timeMinutes: mins,
    timeSeconds: secs,
    speedValue: speedInUnit,
    speedUnit: sUnit.id,
  });

  // Check round-trip distance
  const recoveredDist = resDist.distanceMeters / dUnit.toMeters;
  const distErr = Math.abs(recoveredDist - dVal) / dVal;

  if (distErr < 1e-9) {
    kinPassed++;
  } else {
    kinFailed++;
  }
}
console.log(`Kinematic property tests: ${kinPassed} / 10,000 passed (${kinFailed} failed).`);
assert(kinFailed === 0, "10,000 Randomized Kinematic Property Tests Passed");

// -------------------------------------------------------------
// SECTION 5: 5,000 RANDOMIZED RACE PACE TESTS
// -------------------------------------------------------------
console.log("\n--- Executing 5,000 Randomized Race Pace Tests ---");
let pacePassed = 0;
let paceFailed = 0;

for (let i = 0; i < 5000; i++) {
  const meters = Math.random() * 42000 + 100; // 100m to 42km
  const totSec = Math.random() * 18000 + 30; // 30s to 5 hours

  const paceRes = calculateRacePace(meters, totSec);
  const speedMs = meters / totSec;
  const expectedKmh = speedMs * 3.6;
  const expectedMph = speedMs * (3600 / 1609.344);

  if (Math.abs(paceRes.speedKmh - expectedKmh) < 1e-4 && Math.abs(paceRes.speedMph - expectedMph) < 1e-4) {
    pacePassed++;
  } else {
    paceFailed++;
  }
}
console.log(`Race pace tests: ${pacePassed} / 5,000 passed (${paceFailed} failed).`);
assert(paceFailed === 0, "5,000 Randomized Race Pace Tests Passed");

// -------------------------------------------------------------
// SECTION 6: 5,000 RANDOMIZED MULTI-SEGMENT TESTS
// -------------------------------------------------------------
console.log("\n--- Executing 5,000 Randomized Multi-Segment Tests ---");
let multiPassed = 0;
let multiFailed = 0;

for (let i = 0; i < 5000; i++) {
  const numLegs = Math.floor(Math.random() * 6) + 1; // 1 to 6 legs
  const testLegs: { id: string; distanceKm: number; timeMinutes: number }[] = [];
  let expDist = 0;
  let expTimeMin = 0;

  for (let j = 0; j < numLegs; j++) {
    const d = Math.random() * 200 + 1;
    const t = Math.random() * 180 + 1;
    testLegs.push({ id: j.toString(), distanceKm: d, timeMinutes: t });
    expDist += d;
    expTimeMin += t;
  }

  const res = calculateMultiSegmentSpeed(testLegs);
  const expAvgKmh = Math.round((expDist / (expTimeMin / 60)) * 100) / 100;

  if (Math.abs(res.totalDistanceKm - expDist) < 1e-6 && Math.abs(res.averageSpeedKmh - expAvgKmh) < 0.02) {
    multiPassed++;
  } else {
    multiFailed++;
  }
}
console.log(`Multi-segment tests: ${multiPassed} / 5,000 passed (${multiFailed} failed).`);
assert(multiFailed === 0, "5,000 Randomized Multi-Segment Tests Passed");

// -------------------------------------------------------------
// SUMMARY
// -------------------------------------------------------------
console.log("\n=================================================");
console.log(`ENGINE AUDIT COMPLETED: ${totalPassed} PASSED, ${totalFailed} FAILED`);
console.log("=================================================");
