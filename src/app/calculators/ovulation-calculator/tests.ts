import { calculateOvulationCalculator } from "./calculator";

export function runOvulationCalculatorTests() {
  // Test 1: Standard LMP Mode
  const res1 = calculateOvulationCalculator({
    calculationMode: "lmp",
    lastPeriodDate: "2026-08-01",
    cycleLength: 28,
  });
  if (!res1 || typeof res1 !== "object") throw new Error("Formula failed for LMP mode");
  if (!res1.predictedOvulationDateFormatted) throw new Error("Missing predictedOvulationDateFormatted in res1");
  if (!res1.monthlyCalendarDays || res1.monthlyCalendarDays.length < 30) throw new Error("Missing monthlyCalendarDays in res1");

  // Test 2: Next Period Mode
  const res2 = calculateOvulationCalculator({
    calculationMode: "next-period",
    nextPeriodDate: "2026-08-29",
    cycleLength: 28,
  });
  if (!res2 || res2.calculationMode !== "next-period") throw new Error("Formula failed for Next Period mode");

  // Test 3: Due Date Mode
  const res3 = calculateOvulationCalculator({
    calculationMode: "due-date",
    targetDueDate: "2027-05-15",
  });
  if (!res3 || !res3.predictedOvulationDate) throw new Error("Formula failed for Due Date mode");

  // Test 4: Advanced Planner Mode with OPK LH surge
  const res4 = calculateOvulationCalculator({
    calculationMode: "advanced-planner",
    lastPeriodDate: "2026-08-01",
    opkResult: "positive",
  });
  if (!res4 || !res4.confidenceLabel.includes("LH Surge Confirmed")) throw new Error("Formula failed for Advanced Planner OPK mode");

  // Test 5: Shettles Boy Goal
  const res5 = calculateOvulationCalculator({
    calculationMode: "lmp",
    fertilityGoal: "conceive-boy",
  });
  if (!res5 || !res5.shettlesRecommendation.title.includes("Boy")) throw new Error("Formula failed for Shettles Boy goal");

  // Test 6: Fallback for empty/null inputs
  const res6 = calculateOvulationCalculator({
    calculationMode: null,
    lastPeriodDate: null,
  });
  if (!res6 || !res6.predictedOvulationDate) throw new Error("Formula failed for empty fallback inputs");

  return true;
}

export default runOvulationCalculatorTests;
