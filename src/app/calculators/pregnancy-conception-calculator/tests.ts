import {
  calculatePregnancyConceptionCalculator,
  parseInputDate,
  formatIso,
} from "./calculator";
import { ConceptionCalculationMode } from "./types";

export function runPregnancyConceptionCalculatorTests(): boolean {
  // Test 1: Canonical Baseline Verification
  const canonical = calculatePregnancyConceptionCalculator({
    calculationMode: "lmp",
    lmpDate: "2026-01-01",
    cycleLength: 28,
    lutealPhaseLength: 14,
    motherAge: 28,
  });

  if (canonical.estimatedConceptionDateFormatted !== "Jan 15, 2026") {
    throw new Error(`Canonical conception mismatch: expected Jan 15, 2026, got ${canonical.estimatedConceptionDateFormatted}`);
  }
  if (canonical.estimatedDueDateFormatted !== "Oct 8, 2026") {
    throw new Error(`Canonical EDD mismatch: expected Oct 8, 2026, got ${canonical.estimatedDueDateFormatted}`);
  }
  if (canonical.fertileWindowStartFormatted !== "Jan 10, 2026" || canonical.fertileWindowEndFormatted !== "Jan 15, 2026") {
    throw new Error(`Canonical 6-day fertile window mismatch: expected Jan 10 – Jan 15, got ${canonical.fertileWindowFormatted}`);
  }

  // Test 2: Due Date Mode with Custom Cycle (35d cycle, 14d luteal)
  const dd35 = calculatePregnancyConceptionCalculator({
    calculationMode: "due-date",
    dueDate: "2026-10-08",
    cycleLength: 35,
    lutealPhaseLength: 14,
  });
  if (dd35.estimatedConceptionDateFormatted !== "Jan 15, 2026") {
    throw new Error(`Due date 35d conception mismatch: got ${dd35.estimatedConceptionDateFormatted}`);
  }
  // Ovulation is on Day 21 (35 - 14). LMP must be Jan 15 - 21d = Dec 25, 2025
  if (dd35.lmpDateFormatted !== "Dec 25, 2025") {
    throw new Error(`Due date 35d LMP mismatch: expected Dec 25, 2025, got ${dd35.lmpDateFormatted}`);
  }

  // Round-trip verification: feed Dec 25, 2025 back to LMP mode with 35d cycle
  const roundTrip = calculatePregnancyConceptionCalculator({
    calculationMode: "lmp",
    lmpDate: "2025-12-25",
    cycleLength: 35,
    lutealPhaseLength: 14,
  });
  if (roundTrip.estimatedDueDateFormatted !== "Oct 8, 2026") {
    throw new Error(`Round trip EDD mismatch: expected Oct 8, 2026, got ${roundTrip.estimatedDueDateFormatted}`);
  }

  // Test 3: Ultrasound Mode with Custom Cycle
  const usRes = calculatePregnancyConceptionCalculator({
    calculationMode: "ultrasound",
    ultrasoundDate: "2026-03-01",
    ultrasoundWeeks: 10,
    ultrasoundDays: 2, // 72 days total
    cycleLength: 35,
    lutealPhaseLength: 14,
  });
  // Scan Date 2026-03-01 minus 72 days = 2025-12-19 LMP
  // Conception = Dec 19 + 21 days = Jan 9, 2026
  if (usRes.lmpDateFormatted !== "Dec 19, 2025") {
    throw new Error(`Ultrasound LMP mismatch: expected Dec 19, 2025, got ${usRes.lmpDateFormatted}`);
  }
  if (usRes.estimatedConceptionDateFormatted !== "Jan 9, 2026") {
    throw new Error(`Ultrasound conception mismatch: expected Jan 9, 2026, got ${usRes.estimatedConceptionDateFormatted}`);
  }

  // Test 4: IVF Mode (Day 5 blastocyst & Day 3 embryo)
  const ivfDay5 = calculatePregnancyConceptionCalculator({
    calculationMode: "ivf",
    ivfTransferDate: "2026-04-15",
    ivfEmbryoType: "day5",
  });
  if (ivfDay5.estimatedConceptionDateFormatted !== "Apr 10, 2026") {
    throw new Error(`IVF Day 5 conception mismatch: expected Apr 10, 2026, got ${ivfDay5.estimatedConceptionDateFormatted}`);
  }

  const ivfDay3 = calculatePregnancyConceptionCalculator({
    calculationMode: "ivf",
    ivfTransferDate: "2026-04-15",
    ivfEmbryoType: "day3",
  });
  if (ivfDay3.estimatedConceptionDateFormatted !== "Apr 12, 2026") {
    throw new Error(`IVF Day 3 conception mismatch: expected Apr 12, 2026, got ${ivfDay3.estimatedConceptionDateFormatted}`);
  }

  // Test 5: Timezone-Safe Date Parsing & Formatting
  const testDates = ["2026-01-01", "2026-01-31", "2026-12-31", "2028-02-29"];
  for (const str of testDates) {
    const parsed = parseInputDate(str);
    const formatted = formatIso(parsed);
    if (formatted !== str) {
      throw new Error(`Timezone date round-trip drift for ${str}: got ${formatted}`);
    }
  }

  // Test 6: 5,000 Randomized Property-Based Regression Scenarios
  const modes: ConceptionCalculationMode[] = [
    "due-date",
    "lmp",
    "ultrasound",
    "conception-date",
    "ovulation-date",
    "reverse",
    "ivf",
  ];

  for (let i = 0; i < 5000; i++) {
    const cycle = 20 + Math.floor(Math.random() * 26); // 20 to 45
    const luteal = 9 + Math.floor(Math.random() * 10); // 9 to 18
    const age = 18 + Math.floor(Math.random() * 33); // 18 to 50
    const mode = modes[i % modes.length];

    // Pick random year 2025-2028
    const year = 2025 + (i % 4);
    const month = String(1 + (i % 12)).padStart(2, "0");
    const day = String(1 + (i % 28)).padStart(2, "0");
    const testDate = `${year}-${month}-${day}`;

    const res = calculatePregnancyConceptionCalculator({
      calculationMode: mode,
      dueDate: testDate,
      lmpDate: testDate,
      ultrasoundDate: testDate,
      ultrasoundWeeks: 8 + (i % 20),
      ultrasoundDays: i % 7,
      conceptionDate: testDate,
      ovulationDate: testDate,
      ivfTransferDate: testDate,
      ivfEmbryoType: i % 2 === 0 ? "day5" : "day3",
      cycleLength: cycle,
      lutealPhaseLength: luteal,
      motherAge: age,
    });

    if (!res.estimatedConceptionDate || res.estimatedConceptionDate.includes("NaN")) {
      throw new Error(`NaN in estimatedConceptionDate at iteration ${i}`);
    }
    if (!res.estimatedDueDate || res.estimatedDueDate.includes("NaN")) {
      throw new Error(`NaN in estimatedDueDate at iteration ${i}`);
    }
    if (res.probabilityCurve.length !== 7) {
      throw new Error(`Probability curve length mismatch at iteration ${i}: got ${res.probabilityCurve.length}`);
    }
    if (res.timelineMilestones.length !== 7) {
      throw new Error(`Timeline milestones length mismatch at iteration ${i}: got ${res.timelineMilestones.length}`);
    }
    if (res.implantationStages.length !== 5) {
      throw new Error(`Implantation stages length mismatch at iteration ${i}: got ${res.implantationStages.length}`);
    }

    // Fertile window must span exactly 6 days: Start date + 5 days = End date
    const fStart = parseInputDate(res.fertileWindowStart);
    const fEnd = parseInputDate(res.fertileWindowEnd);
    const diffDays = Math.round((fEnd.getTime() - fStart.getTime()) / (1000 * 60 * 60 * 24));
    if (diffDays !== 5) {
      throw new Error(`Fertile window does not span 6 calendar days at iteration ${i}: diff is ${diffDays}`);
    }
  }

  return true;
}

export default runPregnancyConceptionCalculatorTests;
