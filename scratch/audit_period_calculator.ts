import { calculatePeriodCalculator, calculatePeriodOutputs } from "../src/app/calculators/period-calculator/calculator";

console.log("=== PERIOD CALCULATOR CLINICAL & ENGINE AUDIT ===");

// Canonical Baseline
const c1 = calculatePeriodCalculator({
  lmpDate: "2026-01-01",
  cycleLength: 28,
  periodLength: 5,
  lutealPhaseLength: 14,
  userAge: 28,
  cycleRegularity: "regular",
  birthControl: "none",
  hasPcos: false,
});

console.log("Canonical 28-day baseline:", {
  nextPeriodStartDate: c1.nextPeriodStartDate,
  nextPeriodEndDate: c1.nextPeriodEndDate,
  daysUntilNextPeriod: c1.daysUntilNextPeriod,
  nextOvulationDate: c1.nextOvulationDate,
  fertileWindow: c1.fertileWindow,
  dueDateIfConceived: c1.dueDateIfConceived,
  healthScore: c1.healthScore,
  healthStatus: c1.healthStatus,
});

// Canonical 38-day baseline
const c2 = calculatePeriodCalculator({
  lmpDate: "2026-01-01",
  cycleLength: 38,
  periodLength: 9,
  lutealPhaseLength: 11,
  userAge: 48,
  cycleRegularity: "regular",
  birthControl: "none",
  hasPcos: false,
});

console.log("Canonical 38-day baseline:", {
  nextPeriodStartDate: c2.nextPeriodStartDate,
  nextPeriodEndDate: c2.nextPeriodEndDate,
  daysUntilNextPeriod: c2.daysUntilNextPeriod,
  nextOvulationDate: c2.nextOvulationDate,
  fertileWindow: c2.fertileWindow,
  dueDateIfConceived: c2.dueDateIfConceived,
  healthScore: c2.healthScore,
  healthStatus: c2.healthStatus,
});

// Check Date rollover (Leap year)
const cLeap = calculatePeriodCalculator({
  lmpDate: "2028-02-01",
  cycleLength: 28,
  periodLength: 5,
  lutealPhaseLength: 14,
});
console.log("Leap year 2028-02-01 + 28 days:", cLeap.nextPeriodStartDate);

const cEndYear = calculatePeriodCalculator({
  lmpDate: "2026-12-15",
  cycleLength: 28,
  periodLength: 5,
  lutealPhaseLength: 14,
});
console.log("Year rollover 2026-12-15 + 28 days:", cEndYear.nextPeriodStartDate);
console.log("Days until next period for 2026-12-15:", cEndYear.daysUntilNextPeriod);

// Test probability curve days
console.log("Probabilities length:", c1.probabilities.length);
console.log("Probabilities range:", c1.probabilities.map(p => ({ offset: p.dayOffset, date: p.date, prob: p.probability })));

// Test cycle phases
console.log("Cycle phases for 28-day:", c1.cyclePhases.map(p => ({ name: p.phaseName, start: p.startDate, end: p.endDate, days: p.durationDays })));

// Test 12-month future sequence
console.log("12-month future sequence (first 3):", c1.futurePeriods.slice(0, 3));
console.log("12-month future sequence (last 2):", c1.futurePeriods.slice(10));

// Test randomized 5000 runs
let errors = 0;
for (let i = 0; i < 5000; i++) {
  const y = 2024 + Math.floor(Math.random() * 5);
  const m = String(1 + Math.floor(Math.random() * 12)).padStart(2, "0");
  const d = String(1 + Math.floor(Math.random() * 28)).padStart(2, "0");
  const lmp = `${y}-${m}-${d}`;
  const cycle = 21 + Math.floor(Math.random() * 25);
  const period = 2 + Math.floor(Math.random() * 9);
  const luteal = 9 + Math.floor(Math.random() * 8);
  const age = 12 + Math.floor(Math.random() * 44);

  const res = calculatePeriodCalculator({
    lmpDate: lmp,
    cycleLength: cycle,
    periodLength: period,
    lutealPhaseLength: luteal,
    userAge: age,
  });

  if (!res.nextPeriodStartDate || res.nextPeriodStartDate === "NaN-NaN-NaN") errors++;
  if (res.futurePeriods.length !== 12) errors++;
  if (res.healthScore < 0 || res.healthScore > 100) errors++;
}
console.log(`Randomized 5,000 runs completed with ${errors} fatal errors.`);
