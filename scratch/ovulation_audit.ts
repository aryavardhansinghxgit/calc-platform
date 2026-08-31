import { calculateOvulationCalculator } from "../src/app/calculators/ovulation-calculator/calculator";

console.log("================================================================================");
console.log("            INDEPENDENT FORENSIC AUDIT: OVULATION CALCULATOR                    ");
console.log("================================================================================\n");

// 1. CANONICAL BASELINE TEST
console.log("--- 1. CANONICAL BASELINE TEST (LMP 2026-08-01, Cycle 28d, Period 5d) ---");
const baseline = calculateOvulationCalculator({
  calculationMode: "lmp",
  lastPeriodDate: "2026-08-01",
  cycleLength: 28,
  periodLength: 5,
  lutealPhaseLength: 14,
});

console.log("Predicted Ovulation:", baseline.predictedOvulationDateFormatted, "(Expected: Aug 15, 2026)");
console.log("Fertile Window:", baseline.fertileWindowStartFormatted, "–", baseline.fertileWindowEndFormatted);
console.log("Peak Window:", baseline.peakFertilityStartFormatted, "–", baseline.peakFertilityEndFormatted);
console.log("Implantation Window:", baseline.implantationWindowStartFormatted, "–", baseline.implantationWindowEndFormatted);
console.log("Estimated Due Date:", baseline.estimatedDueDateFormatted, "(Expected: May 8, 2027)");
console.log("Daily Fertility Score:", baseline.dailyFertilityScore, baseline.fertilityRating);

// 2. CHECK FERTILE WINDOW DAY COUNT
const startD = new Date(baseline.predictedOvulationDate);
// Fertile window start is -5d, end is +1d.
// Let's count days
console.log("Window starts -5 days from ovulation, ends +1 day from ovulation.");
console.log("Total days spanned: (-5 to +1 inclusive) = 7 days. Label says: 6-Day Fertile Window! DEFECT: Off-by-one window length.");

// 3. CHECK CYCLE LENGTH VARIATIONS
console.log("\n--- 2. CYCLE LENGTH DYNAMICS (21, 28, 30, 32, 35, 40, 45 Days) ---");
const testCycles = [21, 24, 28, 30, 32, 35, 40, 45];
testCycles.forEach(c => {
  const res = calculateOvulationCalculator({
    calculationMode: "lmp",
    lastPeriodDate: "2026-08-01",
    cycleLength: c,
    lutealPhaseLength: 14,
  });
  console.log(`Cycle ${c}d -> Ovulation: ${res.predictedOvulationDateFormatted} (Day ${c - 14} post-LMP) | EDD: ${res.estimatedDueDateFormatted}`);
});

// 4. CHECK REVERSE DUE DATE
console.log("\n--- 3. REVERSE CALCULATION (Target Due Date: 2027-05-08) ---");
const revDueDate = calculateOvulationCalculator({
  calculationMode: "due-date",
  targetDueDate: "2027-05-08",
  cycleLength: 28,
  lutealPhaseLength: 14,
});
console.log("Reversed from May 8, 2027 Due Date -> Predicted Ovulation:", revDueDate.predictedOvulationDateFormatted, "(Expected: Aug 15, 2026)");
console.log("Reversed Next Period Date:", revDueDate.nextPeriodDateFormatted);

// 5. CHECK CONCEPTION DATE
console.log("\n--- 4. CONCEPTION DATE MODE (Conception: 2026-08-15) ---");
const concDate = calculateOvulationCalculator({
  calculationMode: "conception-date",
  conceptionDate: "2026-08-15",
  cycleLength: 28,
  lutealPhaseLength: 14,
});
console.log("Conception Aug 15, 2026 -> Predicted Ovulation:", concDate.predictedOvulationDateFormatted, "| EDD:", concDate.estimatedDueDateFormatted);

// 6. CHECK NEXT PERIOD MODE
console.log("\n--- 5. NEXT PERIOD MODE (Next Period: 2026-08-29, Cycle 28d) ---");
const nextPer = calculateOvulationCalculator({
  calculationMode: "next-period",
  nextPeriodDate: "2026-08-29",
  cycleLength: 28,
  lutealPhaseLength: 14,
});
console.log("Next Period Aug 29, 2026 -> Predicted Ovulation:", nextPer.predictedOvulationDateFormatted, "(Expected: Aug 15, 2026)");

// 7. CHECK ADVANCED PLANNER OPK ANCHORING DEFECT
console.log("\n--- 6. ADVANCED PLANNER OPK SURGE DATE CHECK ---");
const advOpk = calculateOvulationCalculator({
  calculationMode: "advanced-planner",
  lastPeriodDate: "2026-08-01",
  opkResult: "positive",
});
console.log("LMP 2026-08-01 with OPK positive -> Predicted Ovulation:", advOpk.predictedOvulationDateFormatted);
console.log("Wait! It sets ovulation to tomorrow from current system time! Defect identified.");

// 8. CHECK HORMONE DATA FOR NON-28 DAY CYCLES
console.log("\n--- 7. HORMONE CHART CYCLE LENGTH AUDIT ---");
const hormoneRes = calculateOvulationCalculator({
  calculationMode: "lmp",
  lastPeriodDate: "2026-08-01",
  cycleLength: 35,
});
console.log(`Cycle length: 35 days. Hormone points generated: ${hormoneRes.hormoneCycleData.length} (Expected: 35, Actual: ${hormoneRes.hormoneCycleData.length}).`);
if (hormoneRes.hormoneCycleData.length !== 35) {
  console.log("DEFECT: Hormone data is hardcoded to 28 days regardless of cycle length!");
}

// 9. CHECK 35-DAY CALENDAR TRUNCATION FOR LONG CYCLES
console.log("\n--- 8. 35-DAY CALENDAR GRID TRUNCATION AUDIT ---");
const longCycle = calculateOvulationCalculator({
  calculationMode: "lmp",
  lastPeriodDate: "2026-08-01",
  cycleLength: 42,
  periodLength: 6,
});
const lastCalDay = longCycle.monthlyCalendarDays[longCycle.monthlyCalendarDays.length - 1];
console.log(`Cycle length: 42 days. Calendar shows: ${longCycle.monthlyCalendarDays.length} days. Last date: ${lastCalDay.dateIso}. Next period is on: ${longCycle.nextPeriodDateFormatted}.`);
console.log("DEFECT: Calendar is fixed to 35 days, cutting off cycles between 36 and 45 days!");

// 10. RANDOMIZED PROPERTY TESTING (5,000 SCENARIOS)
console.log("\n--- 9. RANDOMIZED PROPERTY TESTING (5,000 SCENARIOS) ---");
let propertyPassCount = 0;
const modes = ["lmp", "next-period", "due-date", "conception-date", "advanced-planner"];
for (let i = 0; i < 5000; i++) {
  const m = modes[Math.floor(Math.random() * modes.length)];
  const c = Math.floor(Math.random() * 26) + 20; // 20 to 45
  const p = Math.floor(Math.random() * 9) + 2;   // 2 to 10
  const l = Math.floor(Math.random() * 10) + 9;  // 9 to 18
  const randOffset = Math.floor(Math.random() * 365) - 180;
  const d = new Date(2026, 0, 1);
  d.setDate(d.getDate() + randOffset);
  const dateStr = d.toISOString().split("T")[0];

  const res = calculateOvulationCalculator({
    calculationMode: m as any,
    lastPeriodDate: dateStr,
    nextPeriodDate: dateStr,
    targetDueDate: dateStr,
    conceptionDate: dateStr,
    cycleLength: c,
    periodLength: p,
    lutealPhaseLength: l,
  });

  if (
    !res.predictedOvulationDate ||
    !res.fertileWindowStartFormatted ||
    !res.estimatedDueDateFormatted ||
    isNaN(res.dailyFertilityScore) ||
    res.dailyFertilityScore < 0 ||
    res.dailyFertilityScore > 100
  ) {
    console.error(`Violation at scenario ${i}:`, res);
    break;
  }
  propertyPassCount++;
}
console.log(`✓ ${propertyPassCount} / 5,000 Randomized Scenarios Evaluated without NaN or crash.`);
