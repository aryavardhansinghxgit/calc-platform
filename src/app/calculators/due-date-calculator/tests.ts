import { calculateDueDateCalculator } from "./calculator";

export function runDueDateCalculatorTests() {
  // Test 1: Standard LMP Mode
  const res1 = calculateDueDateCalculator({
    calculationMode: "lmp",
    lmpDate: "2026-01-01",
    cycleLength: 28,
  });
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for LMP mode");
  if (!res1.estimatedDueDateFormatted) throw new Error("Missing estimatedDueDateFormatted in res1");
  if (!res1.timelineMilestones || res1.timelineMilestones.length < 5) throw new Error("Missing timelineMilestones in res1");

  // Test 2: Ultrasound Mode
  const res2 = calculateDueDateCalculator({
    calculationMode: "ultrasound",
    ultrasoundDate: "2026-03-01",
    ultrasoundWeeks: 10,
    ultrasoundDays: 2,
  });
  if (!res2 || res2.calculationMode !== "ultrasound") throw new Error("Formula failed for Ultrasound mode");

  // Test 3: Conception Date Mode
  const res3 = calculateDueDateCalculator({
    calculationMode: "conception-date",
    conceptionDate: "2026-01-15",
  });
  if (!res3 || !res3.estimatedDueDate) throw new Error("Formula failed for Conception Date mode");

  // Test 4: IVF Mode (Day 5 blastocyst)
  const res4 = calculateDueDateCalculator({
    calculationMode: "ivf",
    ivfTransferDate: "2026-04-15",
    ivfEmbryoType: "day5",
  });
  if (!res4 || !res4.confidenceRangeLabel.includes("Clinical Precision")) throw new Error("Formula failed for IVF mode");

  // Test 5: Fallback for empty/null inputs
  const res5 = calculateDueDateCalculator({
    calculationMode: null,
    lmpDate: null,
  });
  if (!res5 || !res5.estimatedDueDate) throw new Error("Formula failed for empty fallback inputs");

  return true;
}

export default runDueDateCalculatorTests;
