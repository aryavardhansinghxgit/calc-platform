import {
  calculateSpeedSolver,
  calculateRacePace,
  calculateMultiSegmentSpeed,
  convertSpeedDirect,
  parseNumericInput,
  SPEED_UNITS,
} from "../src/lib/calculator-engine/formulas/speed";
import { speed_calculatorFaqs } from "../src/app/calculators/speed-calculator/faq";

async function verifyRemediation() {
  console.log("==================================================");
  console.log("RUNNING REMEDIATION REGRESSION TEST SUITE");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  function testAssert(condition: boolean, testName: string, details?: string) {
    if (condition) {
      passed++;
      console.log(`[PASS] ${testName}`);
    } else {
      failed++;
      console.error(`[FAIL] ${testName} - ${details || ""}`);
    }
  }

  // TC-A1: 100 mi / 1h30m -> 66.67 mph
  const tcA1 = calculateSpeedSolver({
    mode: "speed",
    distanceValue: 100,
    distanceUnit: "mi",
    timeHours: 1,
    timeMinutes: 30,
    timeSeconds: 0,
    speedValue: 0,
    speedUnit: "mph",
  });
  testAssert(tcA1.valid && Math.abs(tcA1.speedMph - 66.666666) < 0.01, "TC-A1: 100 mi / 1h30m -> 66.67 mph");

  // TC-A2: 100 mi / 0 -> validation error
  const tcA2 = calculateSpeedSolver({
    mode: "speed",
    distanceValue: 100,
    distanceUnit: "mi",
    timeHours: 0,
    timeMinutes: 0,
    timeSeconds: 0,
    speedValue: 0,
    speedUnit: "mph",
  });
  testAssert(!tcA2.valid && tcA2.error === "Time must be greater than zero.", "TC-A2: 100 mi / 0 -> validation error");

  // TC-A3: 0 mi / 1h -> 0 mph (valid)
  const tcA3 = calculateSpeedSolver({
    mode: "speed",
    distanceValue: 0,
    distanceUnit: "mi",
    timeHours: 1,
    timeMinutes: 0,
    timeSeconds: 0,
    speedValue: 0,
    speedUnit: "mph",
  });
  testAssert(tcA3.valid && tcA3.speedMph === 0, "TC-A3: 0 mi / 1h -> 0 mph (valid zero)");

  // TC-A4: 120 mi / 60 mph -> 2h
  const tcA4 = calculateSpeedSolver({
    mode: "time",
    distanceValue: 120,
    distanceUnit: "mi",
    timeHours: 0,
    timeMinutes: 0,
    timeSeconds: 0,
    speedValue: 60,
    speedUnit: "mph",
  });
  testAssert(tcA4.valid && tcA4.totalTimeSeconds === 7200 && tcA4.timeFormatted === "02:00:00", "TC-A4: 120 mi / 60 mph -> 2h");

  // TC-A5: 120 mi / 0 mph -> validation
  const tcA5 = calculateSpeedSolver({
    mode: "time",
    distanceValue: 120,
    distanceUnit: "mi",
    timeHours: 0,
    timeMinutes: 0,
    timeSeconds: 0,
    speedValue: 0,
    speedUnit: "mph",
  });
  testAssert(!tcA5.valid && tcA5.error === "Speed must be greater than zero.", "TC-A5: 120 mi / 0 mph -> validation error");

  // Negative validation
  const tcNegDist = calculateSpeedSolver({
    mode: "speed",
    distanceValue: -10,
    distanceUnit: "mi",
    timeHours: 1,
    timeMinutes: 0,
    timeSeconds: 0,
    speedValue: 0,
    speedUnit: "mph",
  });
  testAssert(!tcNegDist.valid && tcNegDist.error === "Distance cannot be negative.", "Negative distance rejected");

  const tcNegSpeed = calculateSpeedSolver({
    mode: "distance",
    distanceValue: 0,
    distanceUnit: "mi",
    timeHours: 1,
    timeMinutes: 0,
    timeSeconds: 0,
    speedValue: -60,
    speedUnit: "mph",
  });
  testAssert(!tcNegSpeed.valid && tcNegSpeed.error === "Speed cannot be negative.", "Negative speed rejected");

  // parseNumericInput tests
  const pEmpty = parseNumericInput("", "Distance");
  testAssert(!pEmpty.valid && pEmpty.error === "Distance is required.", "parseNumericInput empty rejected");

  const pAbc = parseNumericInput("abc", "Speed");
  testAssert(!pAbc.valid && pAbc.error === "Speed must be a valid number.", "parseNumericInput 'abc' rejected");

  const pDoubleDot = parseNumericInput("1.2.3", "Time");
  testAssert(!pDoubleDot.valid && pDoubleDot.error === "Time must be a valid number.", "parseNumericInput '1.2.3' rejected");

  const pDoubleMinus = parseNumericInput("--10", "Distance");
  testAssert(!pDoubleMinus.valid && pDoubleMinus.error === "Distance must be a valid number.", "parseNumericInput '--10' rejected");

  const pZeroAllowed = parseNumericInput("0", "Distance", { allowZero: true });
  testAssert(pZeroAllowed.valid && pZeroAllowed.value === 0, "parseNumericInput zero allowed when configured");

  const pZeroDisallowed = parseNumericInput("0", "Time", { allowZero: false });
  testAssert(!pZeroDisallowed.valid && pZeroDisallowed.error === "Time must be greater than zero.", "parseNumericInput zero disallowed when configured");

  // Race Pace
  const race5k = calculateRacePace(5000, 24 * 60 + 30);
  testAssert(
    race5k.valid &&
    race5k.paceMinMile === "7:53" &&
    race5k.paceMinKm === "4:54" &&
    Math.abs(race5k.speedMph - 7.61) < 0.01 &&
    race5k.splits[0].cumulativeTimeFormatted === "04:54" &&
    race5k.splits[1].cumulativeTimeFormatted === "09:48" &&
    race5k.splits[2].cumulativeTimeFormatted === "14:42" &&
    race5k.splits[3].cumulativeTimeFormatted === "19:36" &&
    race5k.splits[4].cumulativeTimeFormatted === "24:30",
    "Race Pace 5K: Pace 7:53/mi, 4:54/km, splits exact"
  );

  const raceZeroDist = calculateRacePace(0, 1470);
  testAssert(!raceZeroDist.valid && raceZeroDist.error === "Race distance must be greater than zero.", "Race Pace 0 distance rejected");

  const raceZeroTime = calculateRacePace(5000, 0);
  testAssert(!raceZeroTime.valid && raceZeroTime.error === "Target finish time must be greater than zero.", "Race Pace 0 time rejected");

  // Multi-Segment Trip
  const multiSeg = calculateMultiSegmentSpeed([
    { id: "1", distanceKm: 60, timeMinutes: 45 },
    { id: "2", distanceKm: 80, timeMinutes: 60 },
  ]);
  testAssert(
    multiSeg.valid &&
    multiSeg.totalDistanceKm === 140 &&
    multiSeg.totalTimeMinutes === 105 &&
    multiSeg.averageSpeedKmh === 80 &&
    multiSeg.averageSpeedMph === 49.71,
    "Multi-Segment: 60km/45m + 80km/60m -> 140km, 105m, 80km/h, 49.71 mph"
  );

  // Speed Converter (27 units)
  testAssert(SPEED_UNITS.length === 27, "All 27 speed units defined");
  const c1 = convertSpeedDirect(1, "mph", "ms");
  testAssert(Math.abs(c1.outputValue - 0.44704) < 1e-9, "Speed Converter 1 mph = 0.44704 m/s");

  // FAQ Count
  testAssert(speed_calculatorFaqs.length === 12, `FAQ count is 12 (Found: ${speed_calculatorFaqs.length})`);

  // SSR Audit
  const res = await fetch("http://localhost:3000/calculators/speed-calculator");
  testAssert(res.status === 200, `SSR HTTP status is 200 (Got: ${res.status})`);
  const html = await res.text();

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/gi) || [];
  testAssert(h1Match.length === 1, `SSR has exactly 1 H1 (Found: ${h1Match.length})`);

  testAssert(!html.includes("Harmonic Avg Velocity"), "SSR does NOT contain 'Harmonic Avg Velocity'");
  testAssert(html.includes("Average Trip Speed"), "SSR contains 'Average Trip Speed'");
  testAssert(!html.includes("Velocity Benchmarks"), "SSR does NOT contain 'Velocity Benchmarks'");
  testAssert(html.includes("Speed Benchmarks"), "SSR contains 'Speed Benchmarks'");

  // Check for raw tokens
  const visible = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '').replace(/<[^>]+>/g, ' ');
  for (const tok of ["NaN", "Infinity", "undefined", "null"]) {
    const reg = new RegExp(`\\b${tok}\\b`, "g");
    const m = visible.match(reg);
    testAssert(!m || m.length === 0, `SSR contains 0 occurrences of '${tok}' (Found: ${m ? m.length : 0})`);
  }

  console.log("\n==================================================");
  console.log(`REMEDIATION TEST SUMMARY: ${passed} PASSED, ${failed} FAILED`);
  console.log("==================================================");
}

verifyRemediation().catch(console.error);
