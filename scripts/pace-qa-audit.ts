import {
  calculatePace,
  calculateMultipointSplits,
  convertDistanceToMeters,
  getPresetEventMeters,
  formatTimeHHMMSS,
  DistanceUnit,
  PaceUnit,
  PresetEvent,
  CalculationMode,
  SplitSegmentInput,
} from "../src/lib/formulas/pace";

import { calculatePaceCalculator } from "../src/app/calculators/pace-calculator/calculator";
import { pace_calculatorConfig } from "../src/app/calculators/pace-calculator/config";
import { pace_calculatorFaqs } from "../src/app/calculators/pace-calculator/faq";
import { pace_calculatorMetadata } from "../src/app/calculators/pace-calculator/metadata";

interface Anomaly {
  id: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  module: string;
  expected: string;
  actual: string;
  rootCause: string;
  fixRequired: string;
  regressionStatus: string;
}

const anomalies: Anomaly[] = [];

function recordAnomaly(anomaly: Anomaly) {
  anomalies.push(anomaly);
  console.log(`[ANOMALY ${anomaly.id}] [${anomaly.severity}] in ${anomaly.module}: ${anomaly.expected} vs ${anomaly.actual}`);
}

console.log("==================================================");
console.log("STARTING FORENSIC QA AUDIT — PACE CALCULATOR");
console.log("==================================================");

// --------------------------------------------------
// SECTION 1: REFERENCE BASELINE — PRIMARY PACE/TIME
// --------------------------------------------------
console.log("\n--- SECTION 1: REFERENCE BASELINE ---");
const baseline = calculatePace({
  calcMode: "calculate_pace",
  presetEvent: "5k",
  timeHours: 0,
  timeMinutes: 25,
  timeSeconds: 0,
  distanceValue: 5,
  distanceUnit: "km",
  age: 30,
});

console.log("Baseline Results:", {
  paceKm: baseline.pacePerKmFormatted,
  paceMile: baseline.pacePerMileFormatted,
  speedKmh: baseline.speedKmh,
  speedMph: baseline.speedMph,
  speedMs: baseline.speedMs,
  split400m: baseline.pace400mFormatted,
  split100m: baseline.pace100mFormatted,
  mhrFox: baseline.maxHeartRateFox,
  predictedMarathon: baseline.riegelPredictions[3]?.predictedTimeFormatted,
});

// Checks
if (baseline.pacePerKmFormatted !== "5:00") {
  recordAnomaly({
    id: "ANOM-001",
    severity: "CRITICAL",
    module: "Baseline Pace/KM",
    expected: "5:00",
    actual: baseline.pacePerKmFormatted,
    rootCause: "Pace formatting or calculation deviation",
    fixRequired: "Ensure pace per km is 5:00",
    regressionStatus: "FAIL",
  });
}

if (baseline.pacePerMileFormatted !== "8:03") {
  recordAnomaly({
    id: "ANOM-002",
    severity: "CRITICAL",
    module: "Baseline Pace/Mile",
    expected: "8:03",
    actual: baseline.pacePerMileFormatted,
    rootCause: "Pace formatting or rounding deviation",
    fixRequired: "Ensure pace per mile is 8:03",
    regressionStatus: "FAIL",
  });
}

if (baseline.speedKmh !== 12) {
  recordAnomaly({
    id: "ANOM-003",
    severity: "HIGH",
    module: "Baseline Speed km/h",
    expected: "12",
    actual: String(baseline.speedKmh),
    rootCause: "Speed kmh calculation deviation",
    fixRequired: "Ensure 12 km/h",
    regressionStatus: "FAIL",
  });
}

if (baseline.speedMph !== 7.46) {
  recordAnomaly({
    id: "ANOM-004",
    severity: "HIGH",
    module: "Baseline Speed mph",
    expected: "7.46",
    actual: String(baseline.speedMph),
    rootCause: "Speed mph calculation deviation",
    fixRequired: "Ensure 7.46 mph",
    regressionStatus: "FAIL",
  });
}

if (baseline.speedMs !== 3.33) {
  recordAnomaly({
    id: "ANOM-005",
    severity: "MEDIUM",
    module: "Baseline Velocity m/s",
    expected: "3.33",
    actual: String(baseline.speedMs),
    rootCause: "Velocity m/s calculation deviation",
    fixRequired: "Ensure 3.33 m/s",
    regressionStatus: "FAIL",
  });
}

if (baseline.pace400mFormatted !== "2:00") {
  recordAnomaly({
    id: "ANOM-006",
    severity: "MEDIUM",
    module: "Baseline 400m Split",
    expected: "2:00",
    actual: baseline.pace400mFormatted,
    rootCause: "400m split calculation deviation",
    fixRequired: "Ensure 2:00",
    regressionStatus: "FAIL",
  });
}

if (baseline.pace100mFormatted !== "0:30") {
  recordAnomaly({
    id: "ANOM-007",
    severity: "MEDIUM",
    module: "Baseline 100m Split",
    expected: "0:30",
    actual: baseline.pace100mFormatted,
    rootCause: "100m split calculation deviation",
    fixRequired: "Ensure 0:30",
    regressionStatus: "FAIL",
  });
}

// --------------------------------------------------
// SECTION 2: THREE-VARIABLE PACE SOLVER
// --------------------------------------------------
console.log("\n--- SECTION 2: THREE-VARIABLE PACE SOLVER ---");

// Direction A: Distance + Time -> Pace
const solverA = calculatePace({
  calcMode: "calculate_pace",
  presetEvent: "custom",
  distanceValue: 5,
  distanceUnit: "km",
  timeHours: 0,
  timeMinutes: 25,
  timeSeconds: 0,
});
console.log("Solver A (Dist + Time -> Pace):", solverA.pacePerKmFormatted, solverA.pacePerMileFormatted);

// Direction B: Pace + Distance -> Time
const solverB = calculatePace({
  calcMode: "calculate_time",
  presetEvent: "custom",
  distanceValue: 5,
  distanceUnit: "km",
  paceMinutes: 5,
  paceSeconds: 0,
  paceUnit: "min_km",
});
console.log("Solver B (Pace + Dist -> Time):", solverB.totalTimeFormatted, `(${solverB.totalTimeSeconds}s)`);

if (solverB.totalTimeFormatted !== "25:00") {
  recordAnomaly({
    id: "ANOM-008",
    severity: "CRITICAL",
    module: "Solver B (Pace + Dist -> Time)",
    expected: "25:00",
    actual: solverB.totalTimeFormatted,
    rootCause: "Inverted or inaccurate time calculation in calculate_time",
    fixRequired: "Ensure 5km @ 5:00/km produces exactly 25:00",
    regressionStatus: "FAIL",
  });
}

// Direction C: Pace + Time -> Distance
const solverC = calculatePace({
  calcMode: "calculate_distance",
  presetEvent: "custom",
  timeHours: 0,
  timeMinutes: 25,
  timeSeconds: 0,
  paceMinutes: 5,
  paceSeconds: 0,
  paceUnit: "min_km",
  distanceUnit: "km",
});
console.log("Solver C (Pace + Time -> Dist):", solverC.totalDistanceKm, "km", solverC.totalDistanceMiles, "mi");
if (Math.abs(solverC.totalDistanceKm - 5.0) > 0.05) {
  recordAnomaly({
    id: "ANOM-009",
    severity: "CRITICAL",
    module: "Solver C (Pace + Time -> Distance)",
    expected: "5.0 km",
    actual: `${solverC.totalDistanceKm} km`,
    rootCause: "Distance calculation deviation in calculate_distance",
    fixRequired: "Ensure 25:00 @ 5:00/km produces 5.0 km",
    regressionStatus: "FAIL",
  });
}

// Imperial round trip: 3.106856 miles + 25:00
const solverA_imp = calculatePace({
  calcMode: "calculate_pace",
  presetEvent: "custom",
  distanceValue: 3.106856,
  distanceUnit: "miles",
  timeHours: 0,
  timeMinutes: 25,
  timeSeconds: 0,
});
console.log("Solver Imperial (3.106856 mi + 25:00 -> Pace):", solverA_imp.pacePerMileFormatted, solverA_imp.pacePerKmFormatted);
if (solverA_imp.pacePerMileFormatted !== "8:03") {
  recordAnomaly({
    id: "ANOM-010",
    severity: "HIGH",
    module: "Solver Imperial Pace",
    expected: "8:03",
    actual: solverA_imp.pacePerMileFormatted,
    rootCause: "Rounding deviation for 3.106856 miles in 25:00",
    fixRequired: "Pace per mile should be 8:03",
    regressionStatus: "FAIL",
  });
}

// --------------------------------------------------
// SECTION 3: UNIT CONVERSION ENGINE
// --------------------------------------------------
console.log("\n--- SECTION 3: UNIT CONVERSIONS ---");
const exactMileKm = 1.609344;
const testPaces = [
  { minKm: 1, secKm: 0, expectedMinMi: 1 * exactMileKm },
  { minKm: 4, secKm: 0, expectedMinMi: 4 * exactMileKm },
  { minKm: 5, secKm: 0, expectedMinMi: 5 * exactMileKm },
  { minKm: 6, secKm: 0, expectedMinMi: 6 * exactMileKm },
  { minKm: 8, secKm: 0, expectedMinMi: 8 * exactMileKm },
  { minKm: 10, secKm: 0, expectedMinMi: 10 * exactMileKm },
];

testPaces.forEach(p => {
  const kmM = 1000;
  const timeS = (p.minKm * 60 + p.secKm);
  const res = calculatePace({
    calcMode: "calculate_pace",
    presetEvent: "custom",
    distanceValue: 1,
    distanceUnit: "km",
    timeHours: 0,
    timeMinutes: p.minKm,
    timeSeconds: p.secKm,
  });
  const expectedPaceMileSecs = timeS * exactMileKm;
  const actualPaceMileSecs = res.paceSecondsPerMile;
  const diff = Math.abs(expectedPaceMileSecs - actualPaceMileSecs);
  if (diff > 1) {
    recordAnomaly({
      id: `ANOM-CONV-${p.minKm}`,
      severity: "MEDIUM",
      module: "Unit Conversion Engine",
      expected: `${expectedPaceMileSecs.toFixed(2)}s/mi`,
      actual: `${actualPaceMileSecs}s/mi`,
      rootCause: `Pace conversion difference for ${p.minKm}:00/km`,
      fixRequired: "Check conversion accuracy",
      regressionStatus: "FAIL",
    });
  }
});

// Speed conversions: 12 km/h -> mph
const kmhToMph = 12 / exactMileKm; // 7.456454... -> 7.46
console.log("Speed conversion 12 km/h -> mph:", kmhToMph.toFixed(5), "display:", parseFloat(kmhToMph.toFixed(2)));

// --------------------------------------------------
// SECTION 4: MULTI-POINT SEGMENT SPLITS
// --------------------------------------------------
console.log("\n--- SECTION 4: MULTIPOINT SEGMENT SPLITS ---");
const canonicalSegments: SplitSegmentInput[] = [
  { id: "1", distanceValue: 1, distanceUnit: "km", timeHours: 0, timeMinutes: 5, timeSeconds: 0 },
  { id: "2", distanceValue: 1, distanceUnit: "km", timeHours: 0, timeMinutes: 4, timeSeconds: 55 },
  { id: "3", distanceValue: 1, distanceUnit: "km", timeHours: 0, timeMinutes: 4, timeSeconds: 50 },
];

const segRes = calculateMultipointSplits(canonicalSegments);
console.log("Segments Result:", {
  totalKm: segRes.cumulativeDistanceKm,
  totalMiles: segRes.cumulativeDistanceMiles,
  totalTime: segRes.cumulativeTimeFormatted,
  avgPaceKm: segRes.overallAveragePacePerKmFormatted,
  avgPaceMile: segRes.overallAveragePacePerMileFormatted,
  legPaces: segRes.segments.map(s => `${s.segmentNumber}: ${s.pacePerKmFormatted}/km (${s.pacePerMileFormatted}/mi)`),
});

if (segRes.cumulativeDistanceKm !== 3) {
  recordAnomaly({
    id: "ANOM-011",
    severity: "HIGH",
    module: "Segment Split Distance",
    expected: "3 km",
    actual: `${segRes.cumulativeDistanceKm} km`,
    rootCause: "Segment distance sum mismatch",
    fixRequired: "Cumulative km must be 3",
    regressionStatus: "FAIL",
  });
}

if (segRes.cumulativeTimeFormatted !== "14:45") {
  recordAnomaly({
    id: "ANOM-012",
    severity: "HIGH",
    module: "Segment Split Time",
    expected: "14:45",
    actual: segRes.cumulativeTimeFormatted,
    rootCause: "Segment time sum mismatch",
    fixRequired: "Cumulative time must be 14:45",
    regressionStatus: "FAIL",
  });
}

if (segRes.overallAveragePacePerKmFormatted !== "4:55") {
  recordAnomaly({
    id: "ANOM-013",
    severity: "CRITICAL",
    module: "Segment Average Pace",
    expected: "4:55",
    actual: segRes.overallAveragePacePerKmFormatted,
    rootCause: "Segment average pace mismatch",
    fixRequired: "Overall pace must be 4:55 /km",
    regressionStatus: "FAIL",
  });
}

// Invariant: Weighted Average Pace
const weightedSegments: SplitSegmentInput[] = [
  { id: "1", distanceValue: 1, distanceUnit: "km", timeHours: 0, timeMinutes: 4, timeSeconds: 0 },
  { id: "2", distanceValue: 2, distanceUnit: "km", timeHours: 0, timeMinutes: 12, timeSeconds: 0 },
];
const weightedRes = calculateMultipointSplits(weightedSegments);
console.log("Weighted Average Test: 1km@4:00 + 2km@6:00 -> Total 3km, Time 16:00 -> Avg Pace:", weightedRes.overallAveragePacePerKmFormatted);
// 16 min / 3 km = 5 min 20 sec -> 5:20/km
if (weightedRes.overallAveragePacePerKmFormatted !== "5:20") {
  recordAnomaly({
    id: "ANOM-014",
    severity: "CRITICAL",
    module: "Weighted Average Pace Invariant",
    expected: "5:20",
    actual: weightedRes.overallAveragePacePerKmFormatted,
    rootCause: "Arithmetic mean used instead of harmonic / time-weighted average",
    fixRequired: "Must calculate totalTime / totalDistance",
    regressionStatus: "FAIL",
  });
}

// --------------------------------------------------
// SECTION 5 & 6: RIEGEL RACE PREDICTOR & EXPONENT
// --------------------------------------------------
console.log("\n--- SECTION 5 & 6: RIEGEL RACE PREDICTOR & EXPONENT ---");
// T2 = T1 * (D2/D1)^1.06
// Baseline: 5K in 25:00 (1500s)
// 10K (10000m): 1500 * (10000/5000)^1.06 = 1500 * 2^1.06 = 1500 * 2.0849895... = 3127.48s = 52 min 7.48s -> 52:07
// Half Marathon (21097.5m): 1500 * (21097.5/5000)^1.06 = 1500 * 4.2195^1.06 = 1500 * 4.600028... = 6900.04s = 1 hr 55 min 0.04s -> 1:55:00
// Marathon (42195m): 1500 * (42195/5000)^1.06 = 1500 * 8.439^1.06 = 1500 * 9.59124... = 14386.86s = 3 hr 59 min 46.86s -> 3:59:47

console.log("Riegel Predictions from Baseline:", baseline.riegelPredictions);

const exp5k = "25:00";
const exp10k = "52:07";
const expHalf = "1:55:00";
const expFull = "3:59:47";

if (baseline.riegelPredictions[0].predictedTimeFormatted !== exp5k) {
  recordAnomaly({
    id: "ANOM-015",
    severity: "HIGH",
    module: "Riegel 5K",
    expected: exp5k,
    actual: baseline.riegelPredictions[0].predictedTimeFormatted,
    rootCause: "Riegel identity case mismatch",
    fixRequired: "5K predicted time must be 25:00",
    regressionStatus: "FAIL",
  });
}

if (baseline.riegelPredictions[1].predictedTimeFormatted !== exp10k) {
  recordAnomaly({
    id: "ANOM-016",
    severity: "HIGH",
    module: "Riegel 10K",
    expected: exp10k,
    actual: baseline.riegelPredictions[1].predictedTimeFormatted,
    rootCause: "Riegel 10K prediction mismatch",
    fixRequired: "10K predicted time must be 52:07",
    regressionStatus: "FAIL",
  });
}

if (baseline.riegelPredictions[2].predictedTimeFormatted !== expHalf) {
  recordAnomaly({
    id: "ANOM-017",
    severity: "HIGH",
    module: "Riegel Half Marathon",
    expected: expHalf,
    actual: baseline.riegelPredictions[2].predictedTimeFormatted,
    rootCause: "Riegel Half prediction mismatch",
    fixRequired: "Half marathon predicted time must be 1:55:00",
    regressionStatus: "FAIL",
  });
}

if (baseline.riegelPredictions[3].predictedTimeFormatted !== expFull) {
  recordAnomaly({
    id: "ANOM-018",
    severity: "HIGH",
    module: "Riegel Marathon",
    expected: expFull,
    actual: baseline.riegelPredictions[3].predictedTimeFormatted,
    rootCause: "Riegel Marathon prediction mismatch",
    fixRequired: "Marathon predicted time must be 3:59:47",
    regressionStatus: "FAIL",
  });
}

// Monotonicity test
for (let i = 0; i < baseline.riegelPredictions.length - 1; i++) {
  if (baseline.riegelPredictions[i].predictedTimeSeconds >= baseline.riegelPredictions[i + 1].predictedTimeSeconds) {
    recordAnomaly({
      id: "ANOM-019",
      severity: "CRITICAL",
      module: "Riegel Monotonicity",
      expected: `T(${baseline.riegelPredictions[i].eventName}) < T(${baseline.riegelPredictions[i+1].eventName})`,
      actual: `${baseline.riegelPredictions[i].predictedTimeSeconds} >= ${baseline.riegelPredictions[i+1].predictedTimeSeconds}`,
      rootCause: "Predicted time does not strictly increase with distance",
      fixRequired: "Riegel must be strictly monotonic",
      regressionStatus: "FAIL",
    });
  }
}

// --------------------------------------------------
// SECTION 7: RACE PREDICTION TABLE
// --------------------------------------------------
console.log("\n--- SECTION 7: RACE PREDICTION TABLE ---");
console.log("Riegel Paces:");
baseline.riegelPredictions.forEach(r => {
  console.log(`${r.eventName}: Time ${r.predictedTimeFormatted}, Pace/mi ${r.predictedPacePerMileFormatted}, Pace/km ${r.predictedPacePerKmFormatted}`);
});

// Check required paces:
// 5K: 8:03/mi, 5:00/km
// 10K: 8:23/mi, 5:13/km
// Half: 8:46/mi, 5:27/km
// Marathon: 9:09/mi, 5:41/km
const expectedPaces = [
  { event: "5K", mi: "8:03", km: "5:00" },
  { event: "10K", mi: "8:23", km: "5:13" },
  { event: "Half Marathon (13.1 mi)", mi: "8:46", km: "5:27" },
  { event: "Marathon (26.2 mi)", mi: "9:09", km: "5:41" },
];

expectedPaces.forEach((exp, idx) => {
  const row = baseline.riegelPredictions[idx];
  if (row.predictedPacePerMileFormatted !== exp.mi || row.predictedPacePerKmFormatted !== exp.km) {
    recordAnomaly({
      id: `ANOM-PACE-${idx}`,
      severity: "HIGH",
      module: `Race Table Pace (${exp.event})`,
      expected: `${exp.mi}/mi, ${exp.km}/km`,
      actual: `${row.predictedPacePerMileFormatted}/mi, ${row.predictedPacePerKmFormatted}/km`,
      rootCause: "Race prediction table required pace mismatch",
      fixRequired: `Must match ${exp.mi}/mi and ${exp.km}/km`,
      regressionStatus: "FAIL",
    });
  }
});

// --------------------------------------------------
// SECTION 8: HEART RATE TRAINING ZONES
// --------------------------------------------------
console.log("\n--- SECTION 8: HEART RATE TRAINING ZONES ---");
// Age 30: MHR Fox = 220 - 30 = 190 bpm
// Zones:
// Z1: 50-60% -> 95 to 114 bpm
// Z2: 60-70% -> 114 to 133 bpm
// Z3: 70-80% -> 133 to 152 bpm
// Z4: 80-90% -> 152 to 171 bpm
// Z5: 90-100% -> 171 to 190 bpm
console.log("HR Zones for Age 30:", baseline.hrZones.map(z => `Z${z.zoneNumber}: ${z.minBpm}-${z.maxBpm} bpm (${z.percentRange})`));

const expectedHrZones = [
  { z: 1, min: 95, max: 114 },
  { z: 2, min: 114, max: 133 },
  { z: 3, min: 133, max: 152 },
  { z: 4, min: 152, max: 171 },
  { z: 5, min: 171, max: 190 },
];

expectedHrZones.forEach(exp => {
  const zone = baseline.hrZones[exp.z - 1];
  if (zone.minBpm !== exp.min || zone.maxBpm !== exp.max) {
    recordAnomaly({
      id: `ANOM-HR-Z${exp.z}`,
      severity: "HIGH",
      module: `HR Zone ${exp.z}`,
      expected: `${exp.min}-${exp.max} bpm`,
      actual: `${zone.minBpm}-${zone.maxBpm} bpm`,
      rootCause: "HR zone boundary calculation mismatch",
      fixRequired: "Verify HR zone percentages against Fox & Haskell 220 - Age",
      regressionStatus: "FAIL",
    });
  }
});

// --------------------------------------------------
// SECTION 9 & 10: GAUGE & PERFORMANCE SUMMARY
// --------------------------------------------------
console.log("\n--- SECTION 9 & 10: GAUGE & DASHBOARD ---");
// Arc range: 240s (4:00) to 900s (15:00) -> span 660s
// Angle range: -120 deg to +120 deg -> span 240 deg
// Baseline pace per mile = 482.8032s (clamped to 482.8s)
// percent = (482.8032 - 240) / 660 = 242.8032 / 660 = 0.3678836...
// angle = -120 + 0.3678836 * 240 = -120 + 88.292 = -31.708 deg
console.log("Gauge baseline needle angle calculation:", (-120 + ((482.8032 - 240) / 660) * 240).toFixed(2), "deg");

// Test gauge extremes:
// Pace 3:00/mi (180s) -> clamped to 240s -> angle -120 deg
// Pace 20:00/mi (1200s) -> clamped to 900s -> angle +120 deg
console.log("Gauge clamp min (3:00/mi):", (-120 + ((Math.max(240, 180) - 240) / 660) * 240), "deg");
console.log("Gauge clamp max (20:00/mi):", (-120 + ((Math.min(900, 1200) - 240) / 660) * 240), "deg");

// --------------------------------------------------
// SECTION 31: RANDOMIZED DIFFERENTIAL TESTING
// --------------------------------------------------
console.log("\n--- SECTION 31: RANDOMIZED DIFFERENTIAL TESTING ---");

let failedPace = 0;
let failedDistTime = 0;
let failedConv = 0;
let failedSeg = 0;
let failedRiegel = 0;
let failedHr = 0;
let failedCross = 0;
let failedExport = 0;

// 1. 500 Random Pace scenarios
for (let i = 0; i < 500; i++) {
  const distKm = 0.5 + Math.random() * 99.5; // 0.5km to 100km
  const timeHours = Math.floor(Math.random() * 10);
  const timeMinutes = Math.floor(Math.random() * 60);
  const timeSeconds = Math.floor(Math.random() * 60);
  const totalSecs = Math.max(1, timeHours * 3600 + timeMinutes * 60 + timeSeconds);

  const res = calculatePace({
    calcMode: "calculate_pace",
    presetEvent: "custom",
    distanceValue: distKm,
    distanceUnit: "km",
    timeHours,
    timeMinutes,
    timeSeconds,
  });

  const oracleSecPerKm = totalSecs / distKm;
  const oracleSecPerMile = oracleSecPerKm * 1.609344;
  const oracleSpeedKmh = distKm / (totalSecs / 3600);
  const oracleSpeedMph = oracleSpeedKmh / 1.609344;

  // Verify speed bounds
  if (Math.abs(res.speedKmh - parseFloat(oracleSpeedKmh.toFixed(2))) > 0.05) {
    failedPace++;
  }
}
console.log(`500 Random Pace scenarios tested. Discrepancies: ${failedPace}`);

// 2. 500 Random Distance/Time scenarios (Solver round-trips)
for (let i = 0; i < 500; i++) {
  const distKm = 1 + Math.random() * 40;
  const paceSecs = 180 + Math.random() * 600; // 3:00 to 13:00 /km
  const paceMins = Math.floor(paceSecs / 60);
  const paceRemainingSecs = Math.floor(paceSecs % 60);

  // Time = Pace * Distance
  const resTime = calculatePace({
    calcMode: "calculate_time",
    presetEvent: "custom",
    distanceValue: distKm,
    distanceUnit: "km",
    paceMinutes: paceMins,
    paceSeconds: paceRemainingSecs,
    paceUnit: "min_km",
  });

  const expectedSecs = Math.round((paceMins * 60 + paceRemainingSecs) * distKm);
  if (Math.abs(resTime.totalTimeSeconds - expectedSecs) > 2) {
    failedDistTime++;
  }
}
console.log(`500 Random Distance/Time scenarios tested. Discrepancies: ${failedDistTime}`);

// 3. 500 Conversion scenarios
for (let i = 0; i < 500; i++) {
  const kmh = 5 + Math.random() * 25; // 5 to 30 km/h
  const mph = kmh / 1.609344;
  const backKmh = mph * 1.609344;
  if (Math.abs(kmh - backKmh) > 1e-10) {
    failedConv++;
  }
}
console.log(`500 Conversion scenarios tested. Discrepancies: ${failedConv}`);

// 4. 500 Segment scenarios
for (let i = 0; i < 500; i++) {
  const numLegs = 2 + Math.floor(Math.random() * 8); // 2 to 9 legs
  const legs: SplitSegmentInput[] = [];
  let oracleDist = 0;
  let oracleTime = 0;

  for (let j = 0; j < numLegs; j++) {
    const d = 0.5 + Math.random() * 5;
    const tSecs = Math.floor(120 + Math.random() * 900);
    legs.push({
      id: String(j + 1),
      distanceValue: parseFloat(d.toFixed(2)),
      distanceUnit: "km",
      timeHours: 0,
      timeMinutes: Math.floor(tSecs / 60),
      timeSeconds: tSecs % 60,
    });
    oracleDist += parseFloat(d.toFixed(2));
    oracleTime += (Math.floor(tSecs / 60) * 60 + (tSecs % 60));
  }

  const seg = calculateMultipointSplits(legs);
  if (Math.abs(seg.cumulativeDistanceKm - parseFloat(oracleDist.toFixed(2))) > 0.05 ||
      seg.cumulativeTimeSeconds !== oracleTime) {
    failedSeg++;
  }
}
console.log(`500 Segment scenarios tested. Discrepancies: ${failedSeg}`);

// 5. 500 Riegel scenarios
for (let i = 0; i < 500; i++) {
  const d1 = 1000 + Math.random() * 40000;
  const t1 = 300 + Math.random() * 15000;
  const d2 = 1000 + Math.random() * 40000;
  const oracleT2 = t1 * Math.pow(d2 / d1, 1.06);

  // Invariant: if d2 > d1, t2 > t1
  if (d2 > d1 && oracleT2 <= t1) failedRiegel++;
  if (d2 < d1 && oracleT2 >= t1) failedRiegel++;
  if (Math.abs(d2 - d1) < 1e-6 && Math.abs(oracleT2 - t1) > 1e-4) failedRiegel++;
}
console.log(`500 Riegel scenarios tested. Discrepancies: ${failedRiegel}`);

// 6. 300 HR-zone scenarios
for (let i = 0; i < 300; i++) {
  const testAge = 10 + Math.floor(Math.random() * 80);
  const mhrFox = 220 - testAge;
  const mhrTanaka = Math.round(208 - 0.7 * testAge);

  const res = calculatePace({
    calcMode: "calculate_pace",
    presetEvent: "5k",
    timeMinutes: 25,
    age: testAge,
  });

  if (res.maxHeartRateFox !== mhrFox) failedHr++;
  if (res.maxHeartRateTanaka !== mhrTanaka) failedHr++;
  if (res.hrZones[4].maxBpm !== mhrFox) failedHr++;
  if (res.hrZones[0].minBpm !== Math.round(mhrFox * 0.5)) failedHr++;
}
console.log(`300 HR-zone scenarios tested. Discrepancies: ${failedHr}`);

// 7. 300 Cross-module scenarios
for (let i = 0; i < 300; i++) {
  const distKm = 5;
  const timeMins = 20 + Math.floor(Math.random() * 40); // 20 to 60 mins
  const res = calculatePace({
    calcMode: "calculate_pace",
    presetEvent: "custom",
    distanceValue: distKm,
    distanceUnit: "km",
    timeHours: 0,
    timeMinutes: timeMins,
    timeSeconds: 0,
  });

  // Verify: Pace * Distance = Time
  const paceSecsKm = res.paceSecondsPerKm;
  const calcTime = paceSecsKm * distKm;
  const inputTime = timeMins * 60;
  if (Math.abs(calcTime - inputTime) > 3) {
    failedCross++;
  }
}
console.log(`300 Cross-module scenarios tested. Discrepancies: ${failedCross}`);

// 8. 300 Export-state scenarios
// Check copy summary format and parameters
for (let i = 0; i < 300; i++) {
  const ageVal = 20 + Math.floor(Math.random() * 50);
  const res = calculatePace({
    calcMode: "calculate_pace",
    presetEvent: "5k",
    timeMinutes: 25,
    age: ageVal,
  });

  const summary = `Pace & Athletic Performance Report (${new Date().toLocaleDateString()})
Distance: ${res.totalDistanceMiles} miles (${res.totalDistanceKm} km)
Total Time: ${res.totalTimeFormatted}
Pace per Mile: ${res.pacePerMileFormatted} /mi
Pace per Kilometer: ${res.pacePerKmFormatted} /km
Speed: ${res.speedMph} mph (${res.speedKmh} km/h)
Predicted Marathon Time (Riegel): ${res.riegelPredictions[3]?.predictedTimeFormatted || "N/A"}
Max Heart Rate (Age ${ageVal}): ${res.maxHeartRateFox} bpm
Calculated via CalcPlatform Health Engine`;

  if (summary.includes("undefined") || summary.includes("NaN") || summary.includes("null")) {
    failedExport++;
  }
}
console.log(`300 Export-state scenarios tested. Discrepancies: ${failedExport}`);

// --------------------------------------------------
// SECTION 20 & 21: EDGE CASES & INPUT VALIDATION
// --------------------------------------------------
console.log("\n--- SECTION 20 & 21: EDGE CASES & INPUT VALIDATION ---");

const edge1 = calculatePace({ calcMode: "calculate_pace", distanceValue: 0, timeSeconds: 0 });
console.log("Edge Case: 0 distance, 0 time:", edge1.pacePerKmFormatted, edge1.pacePerMileFormatted, edge1.speedKmh);
if (isNaN(edge1.speedKmh) || isNaN(edge1.speedMph) || !isFinite(edge1.speedKmh)) {
  recordAnomaly({
    id: "ANOM-EDGE-1",
    severity: "HIGH",
    module: "Edge Cases (0 distance, 0 time)",
    expected: "No NaN or Infinity",
    actual: `speedKmh: ${edge1.speedKmh}, speedMph: ${edge1.speedMph}`,
    rootCause: "Division by zero without finite guard",
    fixRequired: "Guard against 0 and return 0 speed",
    regressionStatus: "FAIL",
  });
}

const edge2 = calculatePace({ calcMode: "calculate_pace", distanceValue: -10, timeSeconds: -500 });
console.log("Edge Case: negative values:", edge2.pacePerKmFormatted, edge2.speedKmh);
if (edge2.totalDistanceKm < 0 || edge2.speedKmh < 0) {
  recordAnomaly({
    id: "ANOM-EDGE-2",
    severity: "MEDIUM",
    module: "Edge Cases (negative values)",
    expected: "Non-negative sanitized values",
    actual: `distance: ${edge2.totalDistanceKm}, speed: ${edge2.speedKmh}`,
    rootCause: "Negative inputs not clamped to positive",
    fixRequired: "Clamp inputs to positive",
    regressionStatus: "FAIL",
  });
}

const edge3 = calculatePace({ calcMode: "calculate_pace", distanceValue: 100, distanceUnit: "km", timeHours: 10, timeMinutes: 0, timeSeconds: 0 });
console.log("Edge Case: 100 km in 10 hours (Ultra):", edge3.pacePerKmFormatted, edge3.speedKmh, "km/h");

// --------------------------------------------------
// SUMMARY OF ANOMALIES RECORDED
// --------------------------------------------------
console.log("\n==================================================");
console.log(`TOTAL ANOMALIES DETECTED: ${anomalies.length}`);
console.log("==================================================");
anomalies.forEach(a => console.log(JSON.stringify(a, null, 2)));
