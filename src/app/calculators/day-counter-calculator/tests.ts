import { calculateDayCounter } from "./calculator";
import {
  calculateDaysBetween,
  calculateAddSubtractDays,
  calculateDoomsday,
} from "@/lib/calculator-engine/formulas/day-counter";

export function runDayCounterTests() {
  // Test 1: Days Between Two Dates (Jan 1, 2026 to Jan 31, 2026 exclusive = 30 days)
  const res1 = calculateDaysBetween({
    startYear: 2026,
    startMonth: 0,
    startDay: 1,
    endYear: 2026,
    endMonth: 0,
    endDay: 31,
    includeEndDay: false,
  });
  if (res1.totalCalendarDays !== 30) {
    throw new Error(`Expected 30 days, got ${res1.totalCalendarDays}`);
  }

  // Test 2: Inclusive Mode (Jan 1 to Jan 31 inclusive = 31 days)
  const res2 = calculateDaysBetween({
    startYear: 2026,
    startMonth: 0,
    startDay: 1,
    endYear: 2026,
    endMonth: 0,
    endDay: 31,
    includeEndDay: true,
  });
  if (res2.totalCalendarDays !== 31) {
    throw new Error(`Expected 31 days inclusive, got ${res2.totalCalendarDays}`);
  }

  // Test 3: Add 5 Business Days from Monday Aug 3, 2026 -> Mon Aug 10, 2026
  const res3 = calculateAddSubtractDays({
    startYear: 2026,
    startMonth: 7, // Aug
    startDay: 3, // Monday
    daysToOffset: 5,
    operation: "add",
    businessDaysOnly: true,
    excludeHolidays: false,
  });
  if (res3.targetDay !== 10 || res3.targetDayOfWeek !== "Monday") {
    throw new Error(`Expected Monday Aug 10, got ${res3.targetDateFormatted} (${res3.targetDayOfWeek})`);
  }

  // Test 4: Conway's Doomsday Rule for March 15, 2292 (Must be Tuesday)
  const resDoom = calculateDoomsday(2292, 2, 15);
  if (resDoom.finalDayOfWeek !== "Tuesday") {
    throw new Error(`Expected Tuesday for 3/15/2292, got ${resDoom.finalDayOfWeek}`);
  }

  // Test 5: Default input harness
  const defaultInputs = {
    startDate: "2026-01-01",
    endDate: "2026-12-31",
  };
  const resHarness = calculateDayCounter(defaultInputs);
  if (!resHarness || typeof resHarness !== "object") throw new Error("Formula failed for default inputs");

  return true;
}
