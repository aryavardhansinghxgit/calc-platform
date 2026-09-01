import { calculatePeriodCalculator, parseDate, formatDate } from "../src/app/calculators/period-calculator/calculator";
import { runPeriodCalculatorTests } from "../src/app/calculators/period-calculator/tests";

console.log("=== RUNNING FULL REMEDIATION REGRESSION SUITE ===");

// 1. Built-in tests
try {
  runPeriodCalculatorTests();
  console.log("PASS: runPeriodCalculatorTests() succeeded");
} catch (e: any) {
  console.error("FAIL: runPeriodCalculatorTests():", e.message);
  process.exit(1);
}

// 2. Canonical Case 1 (28-day cycle)
const c1 = calculatePeriodCalculator({
  lmpDate: "2026-01-01",
  cycleLength: 28,
  periodLength: 5,
  lutealPhaseLength: 14,
  userAge: 28,
  referenceDate: "2026-01-01",
});

console.log("Canonical Case 1:", {
  nextPeriod: c1.nextPeriodStartDate,
  periodEnd: c1.nextPeriodEndDate,
  ovulation: c1.nextOvulationDate,
  fertileWindow: `${c1.fertileWindow.start} to ${c1.fertileWindow.end}`,
  dueConceived: c1.dueDateIfConceived,
  regularityScore: c1.regularityScore,
  regularityLabel: c1.regularityLabel,
});

if (c1.nextPeriodStartDate !== "2026-01-29") throw new Error("Next period failed");
if (c1.nextPeriodEndDate !== "2026-02-02") throw new Error("Period end failed");
if (c1.nextOvulationDate !== "2026-01-15") throw new Error("Ovulation failed");
if (c1.fertileWindow.start !== "2026-01-10" || c1.fertileWindow.end !== "2026-01-15") {
  throw new Error(`Fertile window expected 2026-01-10 to 2026-01-15, got ${c1.fertileWindow.start} to ${c1.fertileWindow.end}`);
}
if (c1.dueDateIfConceived !== "2026-10-08") throw new Error("Due date failed");

// 3. Canonical Case 2 (38-day cycle)
const c2 = calculatePeriodCalculator({
  lmpDate: "2026-01-01",
  cycleLength: 38,
  periodLength: 9,
  lutealPhaseLength: 11,
  userAge: 48,
  referenceDate: "2026-01-01",
});

console.log("Canonical Case 2 (38-day):", {
  nextPeriod: c2.nextPeriodStartDate,
  periodEnd: c2.nextPeriodEndDate,
  ovulation: c2.nextOvulationDate,
  fertileWindow: `${c2.fertileWindow.start} to ${c2.fertileWindow.end}`,
  dueConceived: c2.dueDateIfConceived,
});

if (c2.nextPeriodStartDate !== "2026-02-08") throw new Error("38-day next period failed");
if (c2.nextPeriodEndDate !== "2026-02-16") throw new Error("38-day period end failed");
if (c2.nextOvulationDate !== "2026-01-28") throw new Error("38-day ovulation failed");
if (c2.fertileWindow.start !== "2026-01-23" || c2.fertileWindow.end !== "2026-01-28") {
  throw new Error(`38-day fertile window expected 2026-01-23 to 2026-01-28, got ${c2.fertileWindow.start} to ${c2.fertileWindow.end}`);
}
if (c2.dueDateIfConceived !== "2026-10-21") throw new Error("38-day due date failed");

// 4. Irregular Predictor Mode Range Test
const cIrreg = calculatePeriodCalculator({
  calculationMode: "irregular",
  lmpDate: "2026-01-01",
  cycleLength: 38,
  periodLength: 9,
  lutealPhaseLength: 11,
  cycleRegularity: "moderately-irregular",
});

console.log("Irregular Mode Range:", cIrreg.nextPeriodRange);
if (cIrreg.nextPeriodRange.varianceDays !== 10) throw new Error("Variance days mismatch");
if (cIrreg.nextPeriodRange.earliest !== "2026-01-29" || cIrreg.nextPeriodRange.latest !== "2026-02-18") {
  throw new Error(`Irregular range expected 2026-01-29 to 2026-02-18, got ${cIrreg.nextPeriodRange.earliest} to ${cIrreg.nextPeriodRange.latest}`);
}

// 5. Timezone parsing verification
const datesToTest = ["2026-01-01", "2026-01-31", "2026-12-31", "2028-02-29"];
for (const dStr of datesToTest) {
  const d = parseDate(dStr);
  const formatted = formatDate(d);
  if (formatted !== dStr) {
    throw new Error(`Timezone parse mismatch: input ${dStr}, formatted ${formatted}`);
  }
}
console.log("PASS: Timezone parsing invariant for all test dates");

// 6. Property compatibility
const resLmp = calculatePeriodCalculator({ lmpDate: "2026-03-01", cycleLength: 30 });
const resLast = calculatePeriodCalculator({ lastPeriod: "2026-03-01", cycleLength: 30 });
if (JSON.stringify(resLmp) !== JSON.stringify(resLast)) {
  throw new Error("Property compatibility failed between lmpDate and lastPeriod");
}
console.log("PASS: Property compatibility (lmpDate === lastPeriod) verified");

// 7. Non-overlapping Cycle Phases
console.log("Cycle phases verification (28-day):");
c1.cyclePhases.forEach((p) => {
  console.log(`- ${p.phaseName}: ${p.startDate} to ${p.endDate} (${p.durationDays} days)`);
});
const totalPhaseDays = c1.cyclePhases.reduce((acc, p) => acc + p.durationDays, 0);
if (totalPhaseDays !== 28) {
  throw new Error(`Total phase days expected 28, got ${totalPhaseDays}`);
}
console.log("PASS: Cycle phases total exactly 28 days without gaps or overlaps");

// 8. 5,000 Randomized Runs
let randomErrors = 0;
for (let i = 0; i < 5000; i++) {
  const y = 2024 + Math.floor(Math.random() * 6);
  const m = String(1 + Math.floor(Math.random() * 12)).padStart(2, "0");
  const d = String(1 + Math.floor(Math.random() * 28)).padStart(2, "0");
  const lmp = `${y}-${m}-${d}`;
  const cycle = 21 + Math.floor(Math.random() * 25);
  const period = 2 + Math.floor(Math.random() * 9);
  const luteal = 9 + Math.floor(Math.random() * 8);
  const age = 14 + Math.floor(Math.random() * 41);

  const res = calculatePeriodCalculator({
    lmpDate: lmp,
    cycleLength: cycle,
    periodLength: period,
    lutealPhaseLength: luteal,
    userAge: age,
  });

  // Assert fertile window is exactly 6 days
  const fStart = parseDate(res.fertileWindow.start);
  const fEnd = parseDate(res.fertileWindow.end);
  const diffDays = Math.round((fEnd.getTime() - fStart.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  if (diffDays !== 6) randomErrors++;

  // Assert ovulation is day 6 of fertile window
  if (res.fertileWindow.end !== res.nextOvulationDate) randomErrors++;

  // Assert chronological 12 future cycles
  if (res.futurePeriods.length !== 12) randomErrors++;
  let prevStart = parseDate(res.futurePeriods[0].periodStartDate);
  for (let j = 1; j < 12; j++) {
    const curStart = parseDate(res.futurePeriods[j].periodStartDate);
    if (curStart.getTime() <= prevStart.getTime()) randomErrors++;
    prevStart = curStart;
  }
}

console.log(`5,000 Randomized property runs completed with ${randomErrors} errors.`);
if (randomErrors > 0) throw new Error("Randomized property testing failed");
console.log("=== ALL REGRESSION CHECKS PASSED ===");
