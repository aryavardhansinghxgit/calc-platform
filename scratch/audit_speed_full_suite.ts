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

async function runComprehensiveSpeedAudit() {
  console.log("=================================================");
  console.log("STARTING FULL SUITE AUDIT: SPEED CALCULATOR");
  console.log("=================================================");

  const results: { id: string; name: string; status: "PASS" | "FAIL"; details: string }[] = [];

  // FLOW A: Find Speed (100 mi in 1h 30m)
  const flowA = calculateSpeedSolver({
    mode: "speed",
    distanceValue: 100,
    distanceUnit: "mi",
    timeHours: 1,
    timeMinutes: 30,
    timeSeconds: 0,
    speedValue: 0,
    speedUnit: "mph",
  });
  const flowAPass =
    Math.abs(flowA.speedMph - 66.666666) < 0.01 &&
    Math.abs(flowA.speedKmh - 107.291) < 0.05 &&
    Math.abs(flowA.speedMs - 29.8028) < 0.05 &&
    flowA.closestReference.name === "Cheetah (Full Sprint)";
  results.push({
    id: "FLOW-A",
    name: "Find Speed (100 mi, 1:30) -> 66.67 mph",
    status: flowAPass ? "PASS" : "FAIL",
    details: `speedMph=${flowA.speedMph.toFixed(2)}, speedKmh=${flowA.speedKmh.toFixed(2)}, speedMs=${flowA.speedMs.toFixed(2)}, benchmark=${flowA.closestReference.name}`,
  });

  // FLOW B: Find Distance (60 mph, 2h)
  const flowB = calculateSpeedSolver({
    mode: "distance",
    distanceValue: 0,
    distanceUnit: "mi",
    timeHours: 2,
    timeMinutes: 0,
    timeSeconds: 0,
    speedValue: 60,
    speedUnit: "mph",
  });
  const distMiles = flowB.distanceMeters / 1609.344;
  const flowBPass = Math.abs(distMiles - 120) < 0.001;
  results.push({
    id: "FLOW-B",
    name: "Find Distance (60 mph, 2 h) -> 120 mi",
    status: flowBPass ? "PASS" : "FAIL",
    details: `distanceMiles=${distMiles.toFixed(2)}`,
  });

  // FLOW C: Find Time (100 km/h, 250 km)
  const flowC = calculateSpeedSolver({
    mode: "time",
    distanceValue: 250,
    distanceUnit: "km",
    timeHours: 0,
    timeMinutes: 0,
    timeSeconds: 0,
    speedValue: 100,
    speedUnit: "kmh",
  });
  const flowCPass = Math.abs(flowC.totalTimeSeconds - 9000) < 0.1 && flowC.timeFormatted === "02:30:00";
  results.push({
    id: "FLOW-C",
    name: "Find Time (250 km, 100 km/h) -> 2.5 h (02:30:00)",
    status: flowCPass ? "PASS" : "FAIL",
    details: `totalTimeSeconds=${flowC.totalTimeSeconds}, formatted=${flowC.timeFormatted}`,
  });

  // FLOW D: Speed Converter 1 mph -> m/s
  const flowD = convertSpeedDirect(1, "mph", "ms", 6);
  const flowDPass = Math.abs(flowD.outputValue - 0.44704) < 1e-9;
  results.push({
    id: "FLOW-D",
    name: "Converter: 1 mph -> m/s = 0.44704 m/s",
    status: flowDPass ? "PASS" : "FAIL",
    details: `output=${flowD.outputValue}`,
  });

  // FLOW E: Race Pace 5K (5000m) in 24:30
  const flowE = calculateRacePace(5000, 24 * 60 + 30);
  const flowEPass =
    flowE.paceMinMile === "7:53" &&
    flowE.paceMinKm === "4:54" &&
    Math.abs(flowE.speedMph - 7.6107) < 0.01 &&
    flowE.splits.length === 5 &&
    flowE.splits[0].cumulativeTimeFormatted === "04:54" &&
    flowE.splits[1].cumulativeTimeFormatted === "09:48" &&
    flowE.splits[2].cumulativeTimeFormatted === "14:42" &&
    flowE.splits[3].cumulativeTimeFormatted === "19:36" &&
    flowE.splits[4].cumulativeTimeFormatted === "24:30";
  results.push({
    id: "FLOW-E",
    name: "Race Pace 5K at 24:30 -> Pace 7:53/mi, 4:54/km, splits exact",
    status: flowEPass ? "PASS" : "FAIL",
    details: `paceMile=${flowE.paceMinMile}, paceKm=${flowE.paceMinKm}, speedMph=${flowE.speedMph.toFixed(2)}, splits=${flowE.splits.map(s => s.cumulativeTimeFormatted).join(", ")}`,
  });

  // FLOW F: Multi-Segment (60 km/45 min + 80 km/60 min)
  const flowF = calculateMultiSegmentSpeed([
    { id: "1", distanceKm: 60, timeMinutes: 45 },
    { id: "2", distanceKm: 80, timeMinutes: 60 },
  ]);
  const flowFPass =
    flowF.totalDistanceKm === 140 &&
    flowF.totalTimeMinutes === 105 &&
    Math.abs(flowF.averageSpeedKmh - 80) < 0.01 &&
    Math.abs(flowF.averageSpeedMph - 49.71) < 0.01;
  results.push({
    id: "FLOW-F",
    name: "Multi-Segment 60km/45m + 80km/60m -> 140km, 105min, 80km/h, 49.71 mph",
    status: flowFPass ? "PASS" : "FAIL",
    details: `totDist=${flowF.totalDistanceKm}, totTime=${flowF.totalTimeMinutes}, avgKmh=${flowF.averageSpeedKmh}, avgMph=${flowF.averageSpeedMph}`,
  });

  // Marathon Worked Example (26.21875 miles / 42.195 km in 3h 15m 30s)
  const marathonSeconds = 3 * 3600 + 15 * 60 + 30; // 11730s
  const marathonPace = calculateRacePace(42195, marathonSeconds);
  const marathonMilesPace = 11730 / 26.21875; // 447.39s -> 7:27
  const marathonKmPace = 11730 / 42.195; // 277.995s -> 4:38
  const marathonPass =
    formatPace(marathonMilesPace) === "7:27" &&
    formatPace(marathonKmPace) === "4:38" &&
    Math.abs((26.21875 / (11730 / 3600)) - 8.0466) < 0.01 &&
    Math.abs((42.195 / (11730 / 3600)) - 12.9504) < 0.01;
  results.push({
    id: "MARATHON",
    name: "Marathon Worked Example (42.195 km in 3:15:30) -> 8.05 mph, 12.95 km/h, 7:27 /mi, 4:38 /km",
    status: marathonPass ? "PASS" : "FAIL",
    details: `mph=${(26.21875 / (11730 / 3600)).toFixed(2)}, kmh=${(42.195 / (11730 / 3600)).toFixed(2)}, paceMi=${formatPace(marathonMilesPace)}, paceKm=${formatPace(marathonKmPace)}`,
  });

  // Benchmark dynamic transitions
  const benchSpeeds = [
    { s: 1, expected: "Human Walking" },
    { s: 10, expected: "City Bicycling" },
    { s: 50, expected: "Cheetah (Full Sprint)" },
    { s: 75, expected: "Cheetah (Full Sprint)" },
    { s: 500, expected: "Boeing 747-8 Cruise" },
  ];
  let benchPass = true;
  for (const b of benchSpeeds) {
    const res = calculateSpeedSolver({
      mode: "speed",
      distanceValue: b.s,
      distanceUnit: "mi",
      timeHours: 1,
      timeMinutes: 0,
      timeSeconds: 0,
      speedValue: 0,
      speedUnit: "mph",
    });
    console.log(`Benchmark for ${b.s} mph: ${res.closestReference.name} (${res.closestReference.speedMph} mph)`);
  }

  console.log("\n--- TEST SUMMARY ---");
  for (const r of results) {
    console.log(`[${r.status}] ${r.id}: ${r.name}`);
    console.log(`       Details: ${r.details}`);
  }
}

runComprehensiveSpeedAudit().catch(console.error);
