import { calculatePeriodCalculator } from "./calculator";

export function runPeriodCalculatorTests() {
  // 1. Property compatibility: lmpDate vs lastPeriod
  const resLmp = calculatePeriodCalculator({ lmpDate: "2026-01-01", cycleLength: 28, lutealPhaseLength: 14 });
  const resLast = calculatePeriodCalculator({ lastPeriod: "2026-01-01", cycleLength: 28, lutealPhaseLength: 14 });

  if (resLmp.nextPeriodStartDate !== "2026-01-29" || resLast.nextPeriodStartDate !== "2026-01-29") {
    throw new Error("Property compatibility test failed for lmpDate vs lastPeriod");
  }

  // 2. 6-Day Fertile Window verification (O-5 through O)
  if (resLmp.nextOvulationDate !== "2026-01-15") {
    throw new Error("Ovulation calculation failed");
  }
  if (resLmp.fertileWindow.start !== "2026-01-10" || resLmp.fertileWindow.end !== "2026-01-15") {
    throw new Error(`Fertile window must be 2026-01-10 to 2026-01-15 (6 days), got ${resLmp.fertileWindow.start} to ${resLmp.fertileWindow.end}`);
  }

  // 3. Due Date If Conceived: Ovulation + 266 days
  if (resLmp.dueDateIfConceived !== "2026-10-08") {
    throw new Error("Due date calculation failed");
  }

  // 4. Irregular Predictor Range
  const resIrreg = calculatePeriodCalculator({
    lmpDate: "2026-01-01",
    cycleLength: 32,
    cycleRegularity: "moderately-irregular",
  });
  if (!resIrreg.nextPeriodRange || resIrreg.nextPeriodRange.varianceDays !== 10) {
    throw new Error("Irregular predictor variance range calculation failed");
  }

  // 5. Edge cases: zero, negative, null
  const resZero = calculatePeriodCalculator({ lastPeriod: 0, cycleLength: 0 });
  if (!resZero || !resZero.nextPeriodStartDate) throw new Error("Formula failed for zero inputs");

  const resNeg = calculatePeriodCalculator({ lastPeriod: -50, cycleLength: -50 });
  if (!resNeg || !resNeg.nextPeriodStartDate) throw new Error("Formula failed for negative inputs");

  const resNull = calculatePeriodCalculator({ lastPeriod: null, cycleLength: null });
  if (!resNull || !resNull.nextPeriodStartDate) throw new Error("Formula failed for null inputs");

  return true;
}
