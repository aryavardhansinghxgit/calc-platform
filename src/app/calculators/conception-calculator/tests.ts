import {
  calculateConceptionCalculator,
  parseInputDate,
  formatDate,
  addDays,
} from "./calculator";

export function runConceptionCalculatorTests() {
  console.log("Starting Conception Calculator Test Suite...");

  // 1. Canonical Baseline Test
  const canonical = calculateConceptionCalculator({
    calculationMode: "lmp",
    lmpDate: "2026-01-01",
    cycleLength: 28,
    periodLength: 5,
    lutealPhaseLength: 14,
    motherAge: 28,
  });

  if (canonical.ovulationDate !== "2026-01-15") {
    throw new Error(`Canonical ovulation date mismatch: expected 2026-01-15, got ${canonical.ovulationDate}`);
  }
  if (canonical.conceptionDate !== "2026-01-15") {
    throw new Error(`Canonical conception date mismatch: expected 2026-01-15, got ${canonical.conceptionDate}`);
  }
  if (canonical.estimatedDueDate !== "2026-10-08") {
    throw new Error(`Canonical EDD mismatch: expected 2026-10-08, got ${canonical.estimatedDueDate}`);
  }
  if (canonical.fertileWindow.start !== "2026-01-10" || canonical.fertileWindow.end !== "2026-01-15") {
    throw new Error(`Canonical fertile window mismatch: expected 2026-01-10 to 2026-01-15, got ${canonical.fertileWindow.start} to ${canonical.fertileWindow.end}`);
  }

  const startD = parseInputDate(canonical.fertileWindow.start);
  const endD = parseInputDate(canonical.fertileWindow.end);
  const fertileDays = Math.round((endD.getTime() - startD.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  if (fertileDays !== 6) {
    throw new Error(`Fertile window must be exactly 6 calendar days, got ${fertileDays}`);
  }

  // 2. Timezone-Safe Invariance Test
  const testDates = ["2026-01-01", "2026-01-31", "2026-12-31", "2028-02-29"];
  for (const td of testDates) {
    const parsed = parseInputDate(td);
    const formatted = formatDate(parsed);
    if (formatted !== td) {
      throw new Error(`Date round-trip drift for ${td}: got ${formatted}`);
    }
  }

  // 3. Due Date Reverse Dating Round-Trip Test (35-day cycle)
  const dd35 = calculateConceptionCalculator({
    calculationMode: "due-date",
    dueDate: "2026-10-08",
    cycleLength: 35,
    lutealPhaseLength: 14,
  });
  if (dd35.estimatedLmpDate !== "2025-12-25") {
    throw new Error(`Due Date 35d cycle LMP mismatch: expected 2025-12-25, got ${dd35.estimatedLmpDate}`);
  }
  const roundTripLmp = calculateConceptionCalculator({
    calculationMode: "lmp",
    lmpDate: "2025-12-25",
    cycleLength: 35,
    lutealPhaseLength: 14,
  });
  if (roundTripLmp.estimatedDueDate !== "2026-10-08") {
    throw new Error(`Round-trip EDD mismatch: expected 2026-10-08, got ${roundTripLmp.estimatedDueDate}`);
  }

  // 4. Ultrasound Mode Cycle Sensitivity Test
  const us35 = calculateConceptionCalculator({
    calculationMode: "ultrasound",
    ultrasoundDate: "2026-03-01",
    ultrasoundWeeks: 10,
    ultrasoundDays: 2,
    cycleLength: 35,
    lutealPhaseLength: 14,
  });
  if (us35.conceptionDate !== "2026-01-09" || us35.estimatedDueDate !== "2026-10-02") {
    throw new Error(`Ultrasound 35d cycle mismatch: conception ${us35.conceptionDate}, EDD ${us35.estimatedDueDate}`);
  }

  // 5. IVF Mode Tests
  const ivfDay5 = calculateConceptionCalculator({
    calculationMode: "ivf",
    ivfTransferDate: "2026-04-15",
    ivfEmbryoType: "day5",
    cycleLength: 28,
    lutealPhaseLength: 14,
  });
  if (ivfDay5.conceptionDate !== "2026-04-10" || ivfDay5.estimatedDueDate !== "2027-01-01") {
    throw new Error(`IVF Day 5 mismatch: conception ${ivfDay5.conceptionDate}, EDD ${ivfDay5.estimatedDueDate}`);
  }

  // 6. 5,000 Randomized Property Tests
  const modes = ["lmp", "ovulation", "due-date", "ultrasound", "ivf", "reverse", "planner", "timeline"];
  const embryoTypes = ["day3", "day5", "day6"];
  const mucusTypes = ["dry", "sticky", "creamy", "watery", "egg-white"];
  const opkResults = ["none", "negative", "positive", "peak"];

  for (let i = 0; i < 5000; i++) {
    const mode = modes[i % modes.length];
    const cycleLength = 20 + Math.floor(Math.random() * 26); // 20 to 45
    const periodLength = 1 + Math.floor(Math.random() * 15); // 1 to 15
    const lutealPhaseLength = 8 + Math.floor(Math.random() * 11); // 8 to 18
    const motherAge = 18 + Math.floor(Math.random() * 33); // 18 to 50
    const embryoType = embryoTypes[i % embryoTypes.length];
    const mucus = mucusTypes[i % mucusTypes.length];
    const opk = opkResults[i % opkResults.length];

    const res = calculateConceptionCalculator({
      calculationMode: mode,
      lmpDate: "2026-01-01",
      ovulationDate: "2026-01-15",
      dueDate: "2026-10-08",
      ultrasoundDate: "2026-03-01",
      ultrasoundWeeks: 8 + (i % 12),
      ultrasoundDays: i % 7,
      conceptionDate: "2026-01-15",
      ivfTransferDate: "2026-03-15",
      ivfEmbryoType: embryoType,
      cycleLength,
      periodLength,
      lutealPhaseLength,
      motherAge,
      cervicalMucus: mucus,
      opkResult: opk,
    });

    if (!res.conceptionDate || !res.ovulationDate || !res.estimatedDueDate || !res.fertileWindow.start) {
      throw new Error(`Randomized test #${i} failed: missing outputs`);
    }

    const s = parseInputDate(res.fertileWindow.start);
    const e = parseInputDate(res.fertileWindow.end);
    const dCount = Math.round((e.getTime() - s.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    if (dCount !== 6) {
      throw new Error(`Randomized test #${i} failed: fertile window length is ${dCount} (expected 6)`);
    }
  }

  console.log("Conception Calculator Test Suite: All 5,000+ tests passed successfully!");
  return true;
}
