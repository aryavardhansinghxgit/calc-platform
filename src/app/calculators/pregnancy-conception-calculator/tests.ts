import { calculatePregnancyConceptionCalculator } from "./calculator";

export function runPregnancyConceptionCalculatorTests() {
  // Test 1: Due Date Mode
  const res1 = calculatePregnancyConceptionCalculator({
    calculationMode: "due-date",
    dueDate: "2026-10-08",
  });
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for Due Date mode");
  if (!res1.estimatedConceptionDateFormatted) throw new Error("Missing estimatedConceptionDateFormatted in res1");
  if (!res1.timelineMilestones || res1.timelineMilestones.length < 5) throw new Error("Missing timelineMilestones in res1");

  // Test 2: LMP Mode
  const res2 = calculatePregnancyConceptionCalculator({
    calculationMode: "lmp",
    lmpDate: "2026-01-01",
    cycleLength: 28,
    lutealPhaseLength: 14,
  });
  if (!res2 || res2.calculationMode !== "lmp") throw new Error("Formula failed for LMP mode");

  // Test 3: Ultrasound Mode
  const res3 = calculatePregnancyConceptionCalculator({
    calculationMode: "ultrasound",
    ultrasoundDate: "2026-03-01",
    ultrasoundWeeks: 10,
    ultrasoundDays: 2,
  });
  if (!res3 || !res3.estimatedDueDateFormatted) throw new Error("Formula failed for Ultrasound mode");

  // Test 4: IVF Mode (Day 5 blastocyst)
  const res4 = calculatePregnancyConceptionCalculator({
    calculationMode: "ivf",
    ivfTransferDate: "2026-04-15",
    ivfEmbryoType: "day5",
  });
  if (!res4 || !res4.confidenceRangeLabel.includes("Medical Date")) throw new Error("Formula failed for IVF mode");

  // Test 5: Fallback for empty/null/zero inputs
  const res5 = calculatePregnancyConceptionCalculator({
    calculationMode: null,
    dueDate: null,
    cycleLength: 0,
  });
  if (!res5 || !res5.estimatedConceptionDate) throw new Error("Formula failed for empty fallback inputs");

  return true;
}

export default runPregnancyConceptionCalculatorTests;
