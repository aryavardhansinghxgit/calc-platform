import { calculateDayoftheWeekCalculator } from "./calculator";
import { calculateDayOfWeek, isLeapYear } from "@/lib/calculator-engine/formulas/day-of-week";

export function runDayoftheWeekCalculatorTests() {
  // Test 1: Apollo 11 Moon Landing (July 20, 1969 is a Sunday)
  const res1 = calculateDayOfWeek({ year: 1969, month: 6, day: 20 });
  if (res1.dayName !== "Sunday") {
    throw new Error(`Expected Sunday for Apollo 11, got ${res1.dayName}`);
  }

  // Test 2: US Declaration of Independence (July 4, 1776 is a Thursday & Leap Year)
  const res2 = calculateDayOfWeek({ year: 1776, month: 6, day: 4 });
  if (res2.dayName !== "Thursday" || !res2.isLeapYear) {
    throw new Error(`Expected Thursday (Leap) for July 4, 1776, got ${res2.dayName}, leap: ${res2.isLeapYear}`);
  }

  // Test 3: Century date (Jan 1, 2000 is Saturday & Leap Year)
  const res3 = calculateDayOfWeek({ year: 2000, month: 0, day: 1 });
  if (res3.dayName !== "Saturday" || !res3.isLeapYear) {
    throw new Error(`Expected Saturday for Jan 1, 2000, got ${res3.dayName}`);
  }

  // Test 4: Default input harness
  const defaultInputs = {
    targetDate: "1969-07-20",
  };
  const resHarness = calculateDayoftheWeekCalculator(defaultInputs);
  if (!resHarness || resHarness.dayOfWeek !== "Sunday") {
    throw new Error("Formula failed for default inputs");
  }

  return true;
}
