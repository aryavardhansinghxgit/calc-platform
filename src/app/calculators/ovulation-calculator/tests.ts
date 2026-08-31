import { calculateOvulationCalculator } from "./calculator";

export function runOvulationCalculatorTests() {
  // Test 1: Canonical Baseline (LMP 2026-08-01, Cycle 28d, Period 5d, Luteal 14d)
  const res1 = calculateOvulationCalculator({
    calculationMode: "lmp",
    lastPeriodDate: "2026-08-01",
    cycleLength: 28,
    periodLength: 5,
    lutealPhaseLength: 14,
  });
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for LMP mode");
  if (res1.predictedOvulationDateFormatted !== "Aug 15, 2026") {
    throw new Error(`Expected Aug 15, 2026, got ${res1.predictedOvulationDateFormatted}`);
  }
  if (res1.fertileWindowStartFormatted !== "Aug 10, 2026" || res1.fertileWindowEndFormatted !== "Aug 15, 2026") {
    throw new Error(`Expected 6-day fertile window Aug 10 - Aug 15, 2026, got ${res1.fertileWindowStartFormatted} – ${res1.fertileWindowEndFormatted}`);
  }
  if (res1.peakFertilityStartFormatted !== "Aug 13, 2026" || res1.peakFertilityEndFormatted !== "Aug 15, 2026") {
    throw new Error(`Expected peak fertility Aug 13 - Aug 15, 2026, got ${res1.peakFertilityStartFormatted} – ${res1.peakFertilityEndFormatted}`);
  }
  if (res1.implantationWindowStartFormatted !== "Aug 21, 2026" || res1.implantationWindowEndFormatted !== "Aug 27, 2026") {
    throw new Error(`Expected implantation window Aug 21 - Aug 27, 2026, got ${res1.implantationWindowStartFormatted} – ${res1.implantationWindowEndFormatted}`);
  }
  if (res1.estimatedDueDateFormatted !== "May 8, 2027") {
    throw new Error(`Expected EDD May 8, 2027, got ${res1.estimatedDueDateFormatted}`);
  }
  if (res1.nextPeriodDateFormatted !== "Aug 29, 2026") {
    throw new Error(`Expected next period Aug 29, 2026, got ${res1.nextPeriodDateFormatted}`);
  }

  // Test 2: Next Expected Period Mode
  const res2 = calculateOvulationCalculator({
    calculationMode: "next-period",
    nextPeriodDate: "2026-08-29",
    cycleLength: 28,
    lutealPhaseLength: 14,
  });
  if (res2.predictedOvulationDateFormatted !== "Aug 15, 2026") {
    throw new Error(`Next period mode failed: expected Aug 15, 2026, got ${res2.predictedOvulationDateFormatted}`);
  }

  // Test 3: Target Due Date Mode (May 8, 2027 Due Date -> Aug 15, 2026 Ovulation)
  const res3 = calculateOvulationCalculator({
    calculationMode: "due-date",
    targetDueDate: "2027-05-08",
    cycleLength: 28,
    lutealPhaseLength: 14,
  });
  if (res3.predictedOvulationDateFormatted !== "Aug 15, 2026") {
    throw new Error(`Target due date mode failed: expected Aug 15, 2026, got ${res3.predictedOvulationDateFormatted}`);
  }

  // Test 4: Conception Date Mode (Conception Aug 15, 2026 -> EDD May 8, 2027)
  const res4 = calculateOvulationCalculator({
    calculationMode: "conception-date",
    conceptionDate: "2026-08-15",
    cycleLength: 28,
    lutealPhaseLength: 14,
  });
  if (res4.predictedOvulationDateFormatted !== "Aug 15, 2026" || res4.estimatedDueDateFormatted !== "May 8, 2027") {
    throw new Error(`Conception date mode failed`);
  }

  // Test 5: Reverse Ovulation Mode
  const res5 = calculateOvulationCalculator({
    calculationMode: "reverse",
    reverseOvulationDate: "2026-08-15",
    cycleLength: 28,
    lutealPhaseLength: 14,
  });
  if (res5.nextPeriodDateFormatted !== "Aug 29, 2026") {
    throw new Error(`Reverse mode failed: expected Aug 29, 2026 next period, got ${res5.nextPeriodDateFormatted}`);
  }

  // Test 6: Advanced Planner with Specific OPK Date (Surge Aug 14 -> Ovulation Aug 15)
  const res6 = calculateOvulationCalculator({
    calculationMode: "advanced-planner",
    lastPeriodDate: "2026-08-01",
    opkTestDate: "2026-08-14",
    opkResult: "positive",
  });
  if (res6.predictedOvulationDateFormatted !== "Aug 15, 2026") {
    throw new Error(`Advanced planner with OPK surge date failed: expected Aug 15, 2026, got ${res6.predictedOvulationDateFormatted}`);
  }

  // Test 7: Dynamic Hormone Cycle Chart length
  const res7_21 = calculateOvulationCalculator({ calculationMode: "lmp", cycleLength: 21, lutealPhaseLength: 14 });
  const res7_35 = calculateOvulationCalculator({ calculationMode: "lmp", cycleLength: 35, lutealPhaseLength: 14 });
  const res7_45 = calculateOvulationCalculator({ calculationMode: "lmp", cycleLength: 45, lutealPhaseLength: 14 });
  if (res7_21.hormoneCycleData.length !== 21) throw new Error("Hormone data failed to size to 21 days");
  if (res7_35.hormoneCycleData.length !== 35) throw new Error("Hormone data failed to size to 35 days");
  if (res7_45.hormoneCycleData.length !== 45) throw new Error("Hormone data failed to size to 45 days");

  // Test 8: Calendar Grid Length for Long Cycles
  if (res7_45.monthlyCalendarDays.length < 52) {
    throw new Error("Calendar grid failed to expand for 45-day cycle");
  }

  // Test 9: Leap Year Calendar Arithmetic (Feb 29, 2028)
  const resLeap = calculateOvulationCalculator({
    calculationMode: "lmp",
    lastPeriodDate: "2028-02-15",
    cycleLength: 28,
    lutealPhaseLength: 14,
  });
  if (resLeap.predictedOvulationDateFormatted !== "Feb 29, 2028") {
    throw new Error(`Leap year test failed: expected Feb 29, 2028, got ${resLeap.predictedOvulationDateFormatted}`);
  }

  // Test 10: Year Rollover (LMP Dec 25, 2026 -> Ovulation Jan 8, 2027)
  const resYear = calculateOvulationCalculator({
    calculationMode: "lmp",
    lastPeriodDate: "2026-12-25",
    cycleLength: 28,
    lutealPhaseLength: 14,
  });
  if (resYear.predictedOvulationDateFormatted !== "Jan 8, 2027") {
    throw new Error(`Year boundary test failed: expected Jan 8, 2027, got ${resYear.predictedOvulationDateFormatted}`);
  }

  // Test 11: Shettles Scientific Review Integrity
  if (!res1.historicalContextNote.title.includes("Historical Shettles Method")) {
    throw new Error("Missing historical Shettles evaluation note");
  }

  // Test 12: 5,000 Randomized Property Runs
  const modes = ["lmp", "next-period", "due-date", "conception-date", "reverse", "advanced-planner"];
  for (let i = 0; i < 5000; i++) {
    const m = modes[i % modes.length];
    const c = Math.floor(Math.random() * 26) + 20; // 20 to 45
    const p = Math.floor(Math.random() * 9) + 2;   // 2 to 10
    const l = Math.floor(Math.random() * 10) + 9;  // 9 to 18
    const randDays = Math.floor(Math.random() * 365) - 180;
    const d = new Date(2026, 0, 1, 12, 0, 0);
    d.setDate(d.getDate() + randDays);
    const dateIso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;

    const res = calculateOvulationCalculator({
      calculationMode: m as any,
      lastPeriodDate: dateIso,
      nextPeriodDate: dateIso,
      targetDueDate: dateIso,
      conceptionDate: dateIso,
      reverseOvulationDate: dateIso,
      cycleLength: c,
      periodLength: p,
      lutealPhaseLength: l,
    });

    if (
      !res.predictedOvulationDate ||
      !res.fertileWindowStartFormatted ||
      !res.fertileWindowEndFormatted ||
      !res.estimatedDueDateFormatted ||
      isNaN(res.dailyFertilityScore) ||
      res.dailyFertilityScore < 0 ||
      res.dailyFertilityScore > 100 ||
      res.hormoneCycleData.length !== c ||
      res.monthlyCalendarDays.length < Math.max(35, c + 7)
    ) {
      throw new Error(`Property violation at scenario ${i}`);
    }
  }

  return true;
}

export default runOvulationCalculatorTests;
