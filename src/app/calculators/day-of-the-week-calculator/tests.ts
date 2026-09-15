import { calculateDayoftheWeekCalculator } from "./calculator";
import {
  calculateDayOfWeek,
  isLeapYear,
  isValidCalendarDate,
  parseBatchDates,
  getWeekdayForCalendarDate,
} from "@/lib/calculator-engine/formulas/day-of-week";

export function runDayoftheWeekCalculatorTests() {
  // Test 1: Benchmark A: September 15, 2026 (Gregorian -> Tuesday)
  const gregSep15 = calculateDayOfWeek({ year: 2026, month: 8, day: 15, calendarSystem: "gregorian" });
  if (gregSep15.dayName !== "Tuesday" || gregSep15.dayOfYear !== 258 || gregSep15.daysRemainingInYear !== 107 || gregSep15.isoWeekNumber !== 38) {
    throw new Error(`Expected Tuesday, Day 258, 107 days left, ISO 38 for Sep 15, 2026 Gregorian. Got: ${JSON.stringify(gregSep15)}`);
  }

  // Test 2: Benchmark A in Proleptic Julian mode: September 15, 2026 -> Monday
  const julianSep15 = calculateDayOfWeek({ year: 2026, month: 8, day: 15, calendarSystem: "julian" });
  if (julianSep15.dayName !== "Monday") {
    throw new Error(`Expected Monday for Sep 15, 2026 in Proleptic Julian mode. Got: ${julianSep15.dayName}`);
  }

  // Test 2b: Grid synchronization: Month 1st and 15th match headline in Julian
  const julian1st = getWeekdayForCalendarDate(2026, 8, 1, "julian");
  if (julian1st.dayOfWeekIndex !== 1) { // Monday
    throw new Error(`Expected Julian Sep 1 to start on Monday (index 1), got ${julian1st.dayOfWeekIndex}`);
  }
  if (julianSep15.calendarGrid.firstDayOfWeekIndex !== 1) {
    throw new Error(`Expected calendarGrid.firstDayOfWeekIndex to be 1 in Julian mode, got ${julianSep15.calendarGrid.firstDayOfWeekIndex}`);
  }

  // Test 3: Benchmark B: September 13, 2026 (Sunday, Day 256, 109 days left, ISO 37)
  const gregSep13 = calculateDayOfWeek({ year: 2026, month: 8, day: 13, calendarSystem: "gregorian" });
  if (gregSep13.dayName !== "Sunday" || gregSep13.dayOfYear !== 256 || gregSep13.daysRemainingInYear !== 109 || gregSep13.isoWeekNumber !== 37) {
    throw new Error(`Expected Sunday, Day 256, 109 days left, ISO 37 for Sep 13, 2026. Got: ${JSON.stringify(gregSep13)}`);
  }

  // Test 4: Apollo 11 Moon Landing (July 20, 1969 is a Sunday, Day 201, ISO 29)
  const resApollo = calculateDayOfWeek({ year: 1969, month: 6, day: 20, calendarSystem: "gregorian" });
  if (resApollo.dayName !== "Sunday" || resApollo.dayOfYear !== 201 || resApollo.isoWeekNumber !== 29) {
    throw new Error(`Expected Sunday, Day 201, ISO 29 for Apollo 11, got ${JSON.stringify(resApollo)}`);
  }

  // Test 5: US Declaration of Independence (July 4, 1776 is Thursday, Day 186, Leap)
  const resDeclaration = calculateDayOfWeek({ year: 1776, month: 6, day: 4, calendarSystem: "gregorian" });
  if (resDeclaration.dayName !== "Thursday" || !resDeclaration.isLeapYear || resDeclaration.dayOfYear !== 186) {
    throw new Error(`Expected Thursday, Day 186, Leap for July 4, 1776, got ${JSON.stringify(resDeclaration)}`);
  }

  // Test 6: Leap date Feb 29, 2024 (Thursday, Day 60, 306 days remaining)
  const resLeap2024 = calculateDayOfWeek({ year: 2024, month: 1, day: 29, calendarSystem: "gregorian" });
  if (resLeap2024.dayName !== "Thursday" || resLeap2024.dayOfYear !== 60 || resLeap2024.daysRemainingInYear !== 306 || !resLeap2024.isLeapYear) {
    throw new Error(`Expected Thursday, Day 60, 306 left for Feb 29 2024, got ${JSON.stringify(resLeap2024)}`);
  }

  // Test 7: Strict Date Validation: Rejection of impossible dates
  const feb30Val = isValidCalendarDate(2026, 1, 30, false);
  if (feb30Val.isValid) {
    throw new Error("Validation failed: February 30, 2026 must be invalid!");
  }
  const apr31Val = isValidCalendarDate(2026, 3, 31, false);
  if (apr31Val.isValid) {
    throw new Error("Validation failed: April 31, 2026 must be invalid!");
  }
  const commonFeb29Val = isValidCalendarDate(2025, 1, 29, false);
  if (commonFeb29Val.isValid) {
    throw new Error("Validation failed: February 29, 2025 must be invalid!");
  }
  const leapFeb29Val = isValidCalendarDate(2024, 1, 29, false);
  if (!leapFeb29Val.isValid) {
    throw new Error("Validation failed: February 29, 2024 must be valid in leap year!");
  }

  // Test 8: Year 1-99 historical date preservation
  const year33 = calculateDayOfWeek({ year: 33, month: 3, day: 3, calendarSystem: "julian" });
  if (year33.calendarGrid.year !== 33) {
    throw new Error(`Year 33 corrupted: expected 33, got ${year33.calendarGrid.year}`);
  }

  // Test 9: Strict Batch Date Parser
  const batchOutput = parseBatchDates("2026-09-15\n2026-02-30\n1969-07-20\nabc");
  if (batchOutput.length !== 4) {
    throw new Error(`Batch parser expected 4 results, got ${batchOutput.length}`);
  }
  if (!batchOutput[0].isValid || batchOutput[0].dayName !== "Tuesday") {
    throw new Error("Batch item 0 failed: expected Tuesday");
  }
  if (batchOutput[1].isValid || batchOutput[1].dayName !== "Invalid Date") {
    throw new Error("Batch item 1 failed: 2026-02-30 must be Invalid Date without silent overflow!");
  }
  if (!batchOutput[2].isValid || batchOutput[2].dayName !== "Sunday") {
    throw new Error("Batch item 2 failed: expected Sunday");
  }
  if (batchOutput[3].isValid || batchOutput[3].dayName !== "Invalid Date") {
    throw new Error("Batch item 3 failed: abc must be Invalid Date");
  }

  // Test 10: Default harness test
  const resHarness = calculateDayoftheWeekCalculator({ targetDate: "1969-07-20" });
  if (!resHarness || resHarness.dayOfWeek !== "Sunday") {
    throw new Error("Formula failed for default inputs");
  }

  return true;
}
