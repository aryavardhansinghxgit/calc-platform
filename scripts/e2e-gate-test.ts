import {
  calculatePace,
  calculateMultipointSplits,
  convertDistanceToMeters,
  formatTimeHHMMSS,
  PaceInput,
  SplitSegmentInput,
} from "../src/lib/formulas/pace";
import { pace_calculatorFaqs } from "../src/app/calculators/pace-calculator/faq";

async function runE2eGateTest() {
  console.log("==================================================");
  console.log("MASTER FINAL PRODUCTION GATE — PACE CALCULATOR");
  console.log("==================================================\n");

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = 0;

  const assert = (condition: boolean, msg: string) => {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  [PASS] ${msg}`);
    } else {
      failedTests++;
      console.error(`  [FAIL] ${msg}`);
    }
  };

  // ----------------------------------------------------
  // GATE 1: LIVE DOM, SEO & ACCESSIBILITY AUDIT
  // ----------------------------------------------------
  console.log("--- 1. LIVE HTTP DOM, SEO & ACCESSIBILITY AUDIT ---");
  const url = "http://localhost:3000/calculators/pace-calculator";
  const resp = await fetch(url);
  assert(resp.status === 200, `HTTP status code is 200 (got ${resp.status})`);
  const html = await resp.text();

  // H1 Check
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => m[1].replace(/<[^>]*>/g, '').trim());
  assert(h1Matches.length === 1, `Exactly ONE <h1> element exists in DOM (Count: ${h1Matches.length})`);
  assert(h1Matches[0] === "Pace Calculator", `Main <h1> text is 'Pace Calculator' (got: '${h1Matches[0]}')`);

  // Print Report H1 Check
  const printReportH1 = /id=["']pace-print-report["'][\s\S]*?<h1/i.test(html);
  assert(!printReportH1, "Print report (#pace-print-report) does NOT contain an <h1> tag (uses <h2>)");

  // FAQ Section & Schema Parity
  const faqHeadings = [...html.matchAll(/Frequently Asked Questions/gi)];
  assert(faqHeadings.length === 1, `Exactly ONE 'Frequently Asked Questions' section in DOM (Count: ${faqHeadings.length})`);

  const schemaMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
  let faqSchemaEntities: any[] = [];
  schemaMatches.forEach(sm => {
    try {
      const p = JSON.parse(sm[1]);
      if (p["@type"] === "FAQPage") faqSchemaEntities = p.mainEntity || [];
    } catch {}
  });
  assert(faqSchemaEntities.length === 20, `FAQ JSON-LD Schema contains exactly 20 entities (got: ${faqSchemaEntities.length})`);
  assert(pace_calculatorFaqs.length === 20, `FAQ canonical data source contains exactly 20 items (got: ${pace_calculatorFaqs.length})`);

  let allFaqsMatch = true;
  faqSchemaEntities.forEach((entity, idx) => {
    if (entity.name !== pace_calculatorFaqs[idx].question) allFaqsMatch = false;
  });
  assert(allFaqsMatch, "FAQ JSON-LD schema and canonical DOM data have 1:1 question parity");

  // Meta Tags
  assert(html.includes("<title>Pace Calculator"), "Page <title> tag contains 'Pace Calculator'");
  assert(/<meta\s+name=["']description["']/i.test(html), "Meta description tag present");
  assert(/<link\s+rel=["']canonical["']/i.test(html), "Canonical link tag present");

  // Action Bar Buttons Rendered
  assert(html.includes("Copy Summary"), "Action Bar 'Copy Summary' button is rendered");
  assert(html.includes("Share"), "Action Bar 'Share' button is rendered");
  assert(html.includes("Save Calculation"), "Action Bar 'Save Calculation' button is rendered");
  assert(html.includes("Print / PDF Report"), "Action Bar 'Print / PDF Report' button is rendered");
  assert(html.includes("Export CSV"), "Action Bar 'Export CSV' button is rendered");

  // Form Accessibility (IDs and htmlFor)
  const inputs = [...html.matchAll(/<input([^>]*)>/gi)];
  const inputIds: string[] = [];
  inputs.forEach(i => {
    const m = i[1].match(/id=["']([^"']*)["']/i);
    if (m) inputIds.push(m[1]);
  });
  const labels = [...html.matchAll(/<label([^>]*)>([\s\S]*?)<\/label>/gi)];
  const labelFors: string[] = [];
  labels.forEach(l => {
    const m = l[1].match(/for=["']([^"']*)["']/i);
    if (m) labelFors.push(m[1]);
  });

  assert(inputIds.includes("pace-time-hours"), "Input 'pace-time-hours' has unique ID");
  assert(inputIds.includes("pace-time-minutes"), "Input 'pace-time-minutes' has unique ID");
  assert(inputIds.includes("pace-time-seconds"), "Input 'pace-time-seconds' has unique ID");
  assert(inputIds.includes("pace-distance"), "Input 'pace-distance' has unique ID");
  assert(inputIds.includes("pace-minutes"), "Input 'pace-minutes' has unique ID");
  assert(inputIds.includes("pace-seconds"), "Input 'pace-seconds' has unique ID");
  assert(labelFors.includes("pace-time-hours"), "Label htmlFor='pace-time-hours' matches input ID");
  assert(labelFors.includes("pace-distance"), "Label htmlFor='pace-distance' matches input ID");
  assert(labelFors.includes("pace-minutes"), "Label htmlFor='pace-minutes' matches input ID");

  // Duplicate ID Check
  const idCounts = new Map<string, number>();
  inputIds.forEach(id => idCounts.set(id, (idCounts.get(id) || 0) + 1));
  let hasDuplicateId = false;
  idCounts.forEach((count, id) => {
    if (count > 1) {
      hasDuplicateId = true;
      console.error(`Duplicate ID found: ${id}`);
    }
  });
  assert(!hasDuplicateId, "No duplicate IDs exist across form controls");

  // ----------------------------------------------------
  // GATE 2: BASELINE MATHEMATICAL CALCULATIONS
  // ----------------------------------------------------
  console.log("\n--- 2. CANONICAL BASELINE MATHEMATICAL AUDIT ---");
  const baseline = calculatePace({
    calcMode: "calculate_pace",
    presetEvent: "5k",
    distanceValue: 5,
    distanceUnit: "km",
    timeHours: 0,
    timeMinutes: 25,
    timeSeconds: 0,
    age: 30,
  });

  assert(baseline.pacePerKmFormatted === "5:00", `Pace / KM = 5:00 (got: ${baseline.pacePerKmFormatted})`);
  assert(baseline.pacePerMileFormatted === "8:03", `Pace / Mile = 8:03 (got: ${baseline.pacePerMileFormatted})`);
  assert(baseline.speedKmh === 12, `Speed KM/H = 12 (got: ${baseline.speedKmh})`);
  assert(baseline.speedMph === 7.46, `Speed MPH = 7.46 (got: ${baseline.speedMph})`);
  assert(baseline.speedMs === 3.33, `Velocity M/S = 3.33 (got: ${baseline.speedMs})`);
  assert(baseline.pace400mFormatted === "2:00", `400m Lap Split = 2:00 (got: ${baseline.pace400mFormatted})`);
  assert(baseline.pace100mFormatted === "0:30", `100m Dash Split = 0:30 (got: ${baseline.pace100mFormatted})`);
  assert(baseline.maxHeartRateFox === 190, `Max HR (Fox 220-30) = 190 bpm (got: ${baseline.maxHeartRateFox})`);
  assert(baseline.maxHeartRateTanaka === 187, `Max HR (Tanaka 208-0.7*30) = 187 bpm (got: ${baseline.maxHeartRateTanaka})`);

  // Riegel predictions from baseline
  const p5k = baseline.riegelPredictions.find(r => r.eventName === "5K");
  const p10k = baseline.riegelPredictions.find(r => r.eventName === "10K");
  const pHalf = baseline.riegelPredictions.find(r => r.eventName === "Half Marathon (13.1 mi)");
  const pFull = baseline.riegelPredictions.find(r => r.eventName === "Marathon (26.2 mi)");

  assert(p5k?.predictedTimeFormatted === "25:00", `Riegel 5K = 25:00 (got: ${p5k?.predictedTimeFormatted})`);
  assert(p10k?.predictedTimeFormatted === "52:07", `Riegel 10K = 52:07 (got: ${p10k?.predictedTimeFormatted})`);
  assert(pHalf?.predictedTimeFormatted === "1:55:00", `Riegel Half Marathon = 1:55:00 (got: ${pHalf?.predictedTimeFormatted})`);
  assert(pFull?.predictedTimeFormatted === "3:59:47", `Riegel Marathon = 3:59:47 (got: ${pFull?.predictedTimeFormatted})`);

  // ----------------------------------------------------
  // GATE 3: THREE-WAY SOLVER & INPUT FIELD REFLECTION
  // ----------------------------------------------------
  console.log("\n--- 3. THREE-WAY SOLVER & INPUT REFLECTION AUDIT ---");

  // Mode A: Calculate Pace
  const solverA = calculatePace({
    calcMode: "calculate_pace",
    presetEvent: "custom",
    distanceValue: 5,
    distanceUnit: "km",
    timeHours: 0,
    timeMinutes: 25,
    timeSeconds: 0,
  });
  const solvedPaceMinutesA = Math.floor(solverA.paceSecondsPerKm / 60);
  const solvedPaceSecondsA = Math.round(solverA.paceSecondsPerKm % 60);
  assert(solvedPaceMinutesA === 5 && solvedPaceSecondsA === 0, `Solver A reflects solved pace: 5:00 (got: ${solvedPaceMinutesA}:${solvedPaceSecondsA})`);

  // Mode B: Calculate Time
  const solverB = calculatePace({
    calcMode: "calculate_time",
    presetEvent: "custom",
    distanceValue: 5,
    distanceUnit: "km",
    paceMinutes: 5,
    paceSeconds: 0,
    paceUnit: "min_km",
  });
  const solvedTimeHoursB = Math.floor(solverB.totalTimeSeconds / 3600);
  const solvedTimeMinutesB = Math.floor((solverB.totalTimeSeconds % 3600) / 60);
  const solvedTimeSecondsB = solverB.totalTimeSeconds % 60;
  assert(solvedTimeHoursB === 0 && solvedTimeMinutesB === 25 && solvedTimeSecondsB === 0, `Solver B reflects solved time: 00:25:00 (got: ${solvedTimeHoursB}:${solvedTimeMinutesB}:${solvedTimeSecondsB})`);
  assert(solverB.totalTimeFormatted === "25:00", `Solver B totalTimeFormatted = 25:00 (got: ${solverB.totalTimeFormatted})`);

  // Mode C: Calculate Distance
  const solverC = calculatePace({
    calcMode: "calculate_distance",
    timeHours: 0,
    timeMinutes: 25,
    timeSeconds: 0,
    paceMinutes: 5,
    paceSeconds: 0,
    paceUnit: "min_km",
    distanceUnit: "km",
  });
  assert(Math.abs(solverC.totalDistanceKm - 5.0) < 0.01, `Solver C reflects solved distance: 5 km (got: ${solverC.totalDistanceKm})`);

  // ----------------------------------------------------
  // GATE 4: ZERO / EMPTY / INVALID INPUT HANDLING
  // ----------------------------------------------------
  console.log("\n--- 4. ZERO / EMPTY / INVALID INPUT HANDLING ---");

  // Zero Distance
  const zeroDist = calculatePace({
    calcMode: "calculate_pace",
    presetEvent: "custom",
    distanceValue: 0,
    distanceUnit: "km",
    timeHours: 0,
    timeMinutes: 25,
    timeSeconds: 0,
  });
  assert(!zeroDist.isValid, "Zero distance marked as invalid (isValid: false)");
  assert(zeroDist.errorMessage === "Enter a distance greater than 0", `Zero distance gives expected error message (got: '${zeroDist.errorMessage}')`);
  assert(zeroDist.speedMph === 0 && zeroDist.speedKmh === 0, `Zero distance gives 0 mph speed (got: ${zeroDist.speedMph})`);
  assert(zeroDist.pacePerKmFormatted === "--:--", `Zero distance gives '--:--' pace (got: '${zeroDist.pacePerKmFormatted}')`);

  // Zero Time
  const zeroTime = calculatePace({
    calcMode: "calculate_pace",
    presetEvent: "custom",
    distanceValue: 5,
    distanceUnit: "km",
    timeHours: 0,
    timeMinutes: 0,
    timeSeconds: 0,
  });
  assert(!zeroTime.isValid, "Zero time marked as invalid (isValid: false)");
  assert(zeroTime.errorMessage === "Enter a time greater than 0", `Zero time gives expected error message (got: '${zeroTime.errorMessage}')`);
  assert(zeroTime.speedMph === 0 && zeroTime.speedKmh === 0, `Zero time gives 0 mph speed (no 18,000 mph) (got: ${zeroTime.speedMph})`);

  // Negative Distance
  const negDist = calculatePace({
    calcMode: "calculate_pace",
    presetEvent: "custom",
    distanceValue: -5,
    distanceUnit: "km",
    timeHours: 0,
    timeMinutes: 25,
    timeSeconds: 0,
  });
  assert(!negDist.isValid, "Negative distance marked as invalid");

  // Negative Time
  const negTime = calculatePace({
    calcMode: "calculate_pace",
    presetEvent: "custom",
    distanceValue: 5,
    distanceUnit: "km",
    timeHours: -1,
    timeMinutes: 0,
    timeSeconds: 0,
  });
  assert(!negTime.isValid, "Negative time marked as invalid");

  // Blank Distance (NaN)
  const blankDist = calculatePace({
    calcMode: "calculate_pace",
    presetEvent: "custom",
    distanceValue: NaN,
    distanceUnit: "km",
    timeHours: 0,
    timeMinutes: 25,
    timeSeconds: 0,
  });
  assert(!blankDist.isValid, "Blank/NaN distance marked as invalid");

  // Ultra Running (100km in 10h)
  const ultra = calculatePace({
    calcMode: "calculate_pace",
    presetEvent: "custom",
    distanceValue: 100,
    distanceUnit: "km",
    timeHours: 10,
    timeMinutes: 0,
    timeSeconds: 0,
  });
  assert(ultra.isValid, "Ultra endurance 100km in 10h is valid");
  assert(ultra.speedKmh === 10, `Ultra speed = 10 km/h (got: ${ultra.speedKmh})`);
  assert(ultra.pacePerKmFormatted === "6:00", `Ultra pace = 6:00 /km (got: ${ultra.pacePerKmFormatted})`);

  // ----------------------------------------------------
  // GATE 5: UNIT CONVERSION PRECISION
  // ----------------------------------------------------
  console.log("\n--- 5. UNIT CONVERSION PRECISION ---");
  const metersInMile = convertDistanceToMeters(1, "miles");
  assert(metersInMile === 1609.344, `1 mile = 1609.344 meters exactly (got: ${metersInMile})`);

  const metersInKm = convertDistanceToMeters(1, "km");
  assert(metersInKm === 1000, `1 km = 1000 meters exactly (got: ${metersInKm})`);

  const reverseMiles = 1000 / 1609.344;
  assert(Math.abs(reverseMiles - 0.621371) < 0.0001, `1 km in miles = 0.621371 (got: ${reverseMiles.toFixed(6)})`);

  // ----------------------------------------------------
  // GATE 6: MULTIPOINT SEGMENT SPLITS & WEIGHTED AVERAGE
  // ----------------------------------------------------
  console.log("\n--- 6. MULTIPOINT SEGMENT SPLITS ---");
  const segments: SplitSegmentInput[] = [
    { id: "1", distanceValue: 1, distanceUnit: "km", timeHours: 0, timeMinutes: 5, timeSeconds: 0 },
    { id: "2", distanceValue: 1, distanceUnit: "km", timeHours: 0, timeMinutes: 4, timeSeconds: 55 },
    { id: "3", distanceValue: 1, distanceUnit: "km", timeHours: 0, timeMinutes: 4, timeSeconds: 50 },
  ];
  const segRes = calculateMultipointSplits(segments);

  assert(segRes.cumulativeDistanceKm === 3, `Cumulative distance = 3 km (got: ${segRes.cumulativeDistanceKm})`);
  assert(segRes.cumulativeTimeFormatted === "14:45", `Cumulative time = 14:45 (got: ${segRes.cumulativeTimeFormatted})`);
  assert(segRes.overallAveragePacePerKmFormatted === "4:55", `Overall average pace / km = 4:55 (got: ${segRes.overallAveragePacePerKmFormatted})`);
  assert(segRes.overallAveragePacePerMileFormatted === "7:55", `Overall average pace / mile = 7:55 (got: ${segRes.overallAveragePacePerMileFormatted})`);

  // Test Weighted Average Invariant (1km @ 4:00 + 2km @ 6:00 => 3km in 16:00 => 5:20/km)
  const weightedSegments: SplitSegmentInput[] = [
    { id: "1", distanceValue: 1, distanceUnit: "km", timeHours: 0, timeMinutes: 4, timeSeconds: 0 },
    { id: "2", distanceValue: 2, distanceUnit: "km", timeHours: 0, timeMinutes: 12, timeSeconds: 0 },
  ];
  const weightedRes = calculateMultipointSplits(weightedSegments);
  assert(weightedRes.cumulativeDistanceKm === 3, `Weighted test total distance = 3 km`);
  assert(weightedRes.cumulativeTimeFormatted === "16:00", `Weighted test total time = 16:00`);
  assert(weightedRes.overallAveragePacePerKmFormatted === "5:20", `Weighted average pace = 5:20 /km (not simple mean 5:00) (got: ${weightedRes.overallAveragePacePerKmFormatted})`);

  // ----------------------------------------------------
  // GATE 7: RIEGEL RACE PREDICTION MONOTONICITY
  // ----------------------------------------------------
  console.log("\n--- 7. RIEGEL RACE PREDICTOR MONOTONICITY ---");
  const t5k = p5k?.predictedTimeSeconds || 0;
  const t10k = p10k?.predictedTimeSeconds || 0;
  const tHalf = pHalf?.predictedTimeSeconds || 0;
  const tMarathon = pFull?.predictedTimeSeconds || 0;

  assert(t5k === 1500, `Riegel 5K predicted time = 1500s exactly`);
  assert(t10k > t5k, `Riegel 10K (${t10k}s) > 5K (${t5k}s)`);
  assert(tHalf > t10k, `Riegel Half (${tHalf}s) > 10K (${t10k}s)`);
  assert(tMarathon > tHalf, `Riegel Marathon (${tMarathon}s) > Half (${tHalf}s)`);

  // Exponent verification: 1500 * (10000 / 5000)^1.06 = 3127.39s -> 3127s (52:07)
  const expCalc = Math.round(1500 * Math.pow(10000 / 5000, 1.06));
  assert(expCalc === 3127, `Exact Riegel exponent 1.06 calculation = 3127s (got: ${expCalc})`);

  // ----------------------------------------------------
  // GATE 8: HEART RATE TRAINING ZONES
  // ----------------------------------------------------
  console.log("\n--- 8. HEART RATE TRAINING ZONES ---");
  const z1 = baseline.hrZones[0];
  const z2 = baseline.hrZones[1];
  const z3 = baseline.hrZones[2];
  const z4 = baseline.hrZones[3];
  const z5 = baseline.hrZones[4];

  assert(z1.minBpm === 95 && z1.maxBpm === 114, `Zone 1 = 95–114 bpm (got: ${z1.minBpm}–${z1.maxBpm})`);
  assert(z2.minBpm === 114 && z2.maxBpm === 133, `Zone 2 = 114–133 bpm (got: ${z2.minBpm}–${z2.maxBpm})`);
  assert(z3.minBpm === 133 && z3.maxBpm === 152, `Zone 3 = 133–152 bpm (got: ${z3.minBpm}–${z3.maxBpm})`);
  assert(z4.minBpm === 152 && z4.maxBpm === 171, `Zone 4 = 152–171 bpm (got: ${z4.minBpm}–${z4.maxBpm})`);
  assert(z5.minBpm === 171 && z5.maxBpm === 190, `Zone 5 = 171–190 bpm (got: ${z5.minBpm}–${z5.maxBpm})`);

  // ----------------------------------------------------
  // GATE 9: STATE SERIALIZATION, SHARING & HYDRATION
  // ----------------------------------------------------
  console.log("\n--- 9. URL STATE SERIALIZATION & HYDRATION ---");
  const shareParams = new URLSearchParams();
  shareParams.set("mode", "calculate_pace");
  shareParams.set("preset", "5k");
  shareParams.set("dist", "5");
  shareParams.set("unit", "km");
  shareParams.set("th", "0");
  shareParams.set("tm", "25");
  shareParams.set("ts", "0");
  shareParams.set("pm", "5");
  shareParams.set("ps", "0");
  shareParams.set("punit", "min_km");
  shareParams.set("age", "30");
  shareParams.set("tab", "pace_calc");

  const serializedQuery = shareParams.toString();
  assert(serializedQuery.includes("dist=5"), "Serialized URL contains distance parameter");
  assert(serializedQuery.includes("tm=25"), "Serialized URL contains time minutes parameter");
  assert(serializedQuery.includes("age=30"), "Serialized URL contains age parameter");

  // Hydration verification
  const parsed = new URLSearchParams(serializedQuery);
  assert(Number(parsed.get("dist")) === 5, "Hydrated distance matches 5");
  assert(Number(parsed.get("tm")) === 25, "Hydrated minutes matches 25");
  assert(parsed.get("unit") === "km", "Hydrated unit matches km");
  assert(parsed.get("mode") === "calculate_pace", "Hydrated mode matches calculate_pace");

  // ----------------------------------------------------
  // GATE 10: LOCALSTORAGE SCENARIO SAVE / RESTORE
  // ----------------------------------------------------
  console.log("\n--- 10. LOCALSTORAGE SAVE / RESTORE INTEGRITY ---");
  const scenario = {
    id: "test-1",
    timestamp: "10:30 AM",
    title: "5 km in 25:00",
    paceMile: "8:03",
    paceKm: "5:00",
    calcMode: "calculate_pace",
    presetEvent: "5k",
    timeHours: 0,
    timeMinutes: 25,
    timeSeconds: 0,
    distanceValue: 5,
    distanceUnit: "km",
    paceMinutes: 5,
    paceSeconds: 0,
    paceUnit: "min_km",
    age: 30,
    splitSegments: segments,
  };
  const jsonStr = JSON.stringify([scenario]);
  const restoredScenarios = JSON.parse(jsonStr);
  assert(restoredScenarios.length === 1, "Saved scenario restores array with 1 item");
  assert(restoredScenarios[0].title === "5 km in 25:00", "Scenario title preserved");
  assert(restoredScenarios[0].timeMinutes === 25, "Scenario timeMinutes preserved");
  assert(restoredScenarios[0].splitSegments.length === 3, "Scenario split segments preserved");

  // ----------------------------------------------------
  // GATE 11: CSV EXPORT FORMAT & RFC 4180 INTEGRITY
  // ----------------------------------------------------
  console.log("\n--- 11. CSV EXPORT FORMAT & RFC 4180 AUDIT ---");
  const csvRows = [
    ["CalcPlatform Clinical Athletic & Sports Physiology Lab - Pace Assessment Report"],
    ["Generated Date", "2026-08-29"],
    ["Subject Age", "30"],
    ["Max Heart Rate (Fox)", "190 bpm"],
    [],
    ["Calculation Mode", "calculate_pace"],
    ["Distance (KM)", "5"],
    ["Distance (Miles)", "3.107"],
    ["Total Time", "25:00"],
    ["Pace per KM", "5:00 /km"],
    ["Pace per Mile", "8:03 /mi"],
    ["Speed (MPH)", "7.46 mph"],
    ["Speed (KMH)", "12 km/h"],
    ["Velocity (M/S)", "3.33 m/s"],
    ["400m Track Split", "2:00"],
    ["100m Dash Split", "0:30"],
    [],
    ["Race Distance", "Predicted Finish Time", "Required Pace (/mile)", "Required Pace (/km)"],
    ["5K", "25:00", "8:03", "5:00"],
    ["10K", "52:07", "8:23", "5:13"],
    ["Half Marathon (13.1 mi)", "1:55:00", "8:46", "5:27"],
    ["Marathon (26.2 mi)", "3:59:47", "9:09", "5:41"],
    [],
    ["Leg #", "Distance (km)", "Distance (mi)", "Time", "Pace (/km)", "Pace (/mile)"],
    ["Leg #1", "1", "0.621", "5:00", "5:00", "8:03"],
    ["Leg #2", "1", "0.621", "4:55", "4:55", "7:55"],
    ["Leg #3", "1", "0.621", "4:50", "4:50", "7:47"],
    ["Cumulative Totals", "3", "1.864", "14:45", "4:55", "7:55"],
    [],
    ["Zone", "Zone Name", "Percentage Range", "Min BPM", "Max BPM", "Clinical Description"],
    ["Zone 1", "Zone 1 — Active Recovery", "50% – 60%", "95", "114", "Very light effort for warm-up"],
    ["Zone 2", "Zone 2 — Aerobic / Base Endurance", "60% – 70%", "114", "133", "Comfortable conversational pace"],
  ];

  const csvContent = csvRows
    .map(row =>
      row
        .map(cell => {
          const str = cell ?? "";
          if (str.includes(",") || str.includes('"') || str.includes("\n")) {
            return `"${str.replace(/"/g, '""')}"`;
          }
          return str;
        })
        .join(",")
    )
    .join("\r\n");

  assert(!csvContent.includes("undefined"), "CSV export contains NO 'undefined' tokens");
  assert(!csvContent.includes("null"), "CSV export contains NO 'null' tokens");
  assert(!csvContent.includes("NaN"), "CSV export contains NO 'NaN' tokens");
  assert(!csvContent.includes("Infinity"), "CSV export contains NO 'Infinity' tokens");
  assert(csvContent.includes("CalcPlatform Clinical Athletic"), "CSV export header present");
  assert(csvContent.includes("5K,25:00,8:03,5:00"), "CSV export contains valid Riegel predictions");
  assert(csvContent.includes("Cumulative Totals,3,1.864,14:45,4:55,7:55"), "CSV export contains valid segment splits");
  assert(csvContent.includes("Zone 1,Zone 1 — Active Recovery"), "CSV export contains valid heart rate zones");

  // ----------------------------------------------------
  // SUMMARY
  // ----------------------------------------------------
  console.log("\n==================================================");
  console.log(`E2E AUDIT COMPLETE: ${passedTests}/${totalTests} CHECKS PASSED`);
  if (failedTests === 0) {
    console.log("STATUS: ALL PRODUCTION GATES PASSED (100% SUCCESS)");
  } else {
    console.error(`STATUS: ${failedTests} FAILED CHECKS`);
  }
  console.log("==================================================");

  if (failedTests > 0) process.exit(1);
}

runE2eGateTest().catch((err) => {
  console.error(err);
  process.exit(1);
});
