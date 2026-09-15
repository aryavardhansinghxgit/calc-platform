import { calculateDayCounter } from "./calculator";
import {
  calculateDaysBetween,
  calculateAddSubtractDays,
  calculateDoomsday,
  isValidCalendarDate,
  getUSFederalHolidays,
} from "@/lib/calculator-engine/formulas/day-counter";

export function runDayCounterTests() {
  // Case A: Sep 14, 2026 to Dec 14, 2026 (Exclusive, holidays excluded)
  const resA = calculateDaysBetween({
    startYear: 2026,
    startMonth: 8, // September
    startDay: 14,
    endYear: 2026,
    endMonth: 11, // December
    endDay: 14,
    includeEndDay: false,
    excludeHolidays: true,
  });
  if (
    resA.totalCalendarDays !== 91 ||
    resA.weekdaysCount !== 65 ||
    resA.holidaysCount !== 3 ||
    resA.businessDays !== 62 ||
    resA.weekendDays !== 26 ||
    resA.totalWeeks !== 13 ||
    resA.totalHours !== 2184 ||
    resA.totalMinutes !== 131040 ||
    resA.percentOfYear !== 24.91
  ) {
    throw new Error(`Case A failed: ${JSON.stringify(resA)}`);
  }

  // Case B: Sep 13, 2026 to Dec 13, 2026 (Exclusive)
  const resB = calculateDaysBetween({
    startYear: 2026,
    startMonth: 8,
    startDay: 13,
    endYear: 2026,
    endMonth: 11,
    endDay: 13,
    includeEndDay: false,
    excludeHolidays: true,
  });
  if (resB.totalCalendarDays !== 91 || resB.businessDays !== 62 || resB.weekendDays !== 26) {
    throw new Error(`Case B failed: ${JSON.stringify(resB)}`);
  }

  // Case C: Inclusive mode (Sep 14 to Dec 14, 2026) -> 92 calendar days, 63 working days
  const resC = calculateDaysBetween({
    startYear: 2026,
    startMonth: 8,
    startDay: 14,
    endYear: 2026,
    endMonth: 11,
    endDay: 14,
    includeEndDay: true,
    excludeHolidays: true,
  });
  if (resC.totalCalendarDays !== 92 || resC.businessDays !== 63) {
    throw new Error(`Case C failed: ${JSON.stringify(resC)}`);
  }

  // Case D: Holiday exclusion OFF -> 65 working days
  const resD = calculateDaysBetween({
    startYear: 2026,
    startMonth: 8,
    startDay: 14,
    endYear: 2026,
    endMonth: 11,
    endDay: 14,
    includeEndDay: false,
    excludeHolidays: false,
  });
  if (resD.totalCalendarDays !== 91 || resD.businessDays !== 65) {
    throw new Error(`Case D failed: ${JSON.stringify(resD)}`);
  }

  // Case E: Same date
  const resEEx = calculateDaysBetween({
    startYear: 2026,
    startMonth: 5,
    startDay: 15,
    endYear: 2026,
    endMonth: 5,
    endDay: 15,
    includeEndDay: false,
  });
  const resEIn = calculateDaysBetween({
    startYear: 2026,
    startMonth: 5,
    startDay: 15,
    endYear: 2026,
    endMonth: 5,
    endDay: 15,
    includeEndDay: true,
  });
  if (resEEx.totalCalendarDays !== 0 || resEIn.totalCalendarDays !== 1) {
    throw new Error(`Case E failed: Ex=${resEEx.totalCalendarDays}, In=${resEIn.totalCalendarDays}`);
  }

  // Case F: Leap Feb 28, 2024 to Mar 1, 2024
  const resFEx = calculateDaysBetween({
    startYear: 2024,
    startMonth: 1, // Feb
    startDay: 28,
    endYear: 2024,
    endMonth: 2, // Mar
    endDay: 1,
    includeEndDay: false,
  });
  const resFIn = calculateDaysBetween({
    startYear: 2024,
    startMonth: 1,
    startDay: 28,
    endYear: 2024,
    endMonth: 2,
    endDay: 1,
    includeEndDay: true,
  });
  if (resFEx.totalCalendarDays !== 2 || resFIn.totalCalendarDays !== 3) {
    throw new Error(`Case F failed: Ex=${resFEx.totalCalendarDays}, In=${resFIn.totalCalendarDays}`);
  }

  // Case G: Invalid Feb 30, 2026
  const vG = isValidCalendarDate(2026, 1, 30);
  if (vG.isValid) {
    throw new Error("Case G failed: Feb 30, 2026 must be invalid!");
  }

  // Case H: 2025 Thanksgiving (Nov 25, 2025 to Nov 28, 2025, exclusive)
  // Thanksgiving 2025 = Nov 27. Weekdays in range: Tue Nov 25, Wed Nov 26, Thu Nov 27 (Thanksgiving).
  // Expected working days = 2 (Tue, Wed). Nov 26 must NOT be excluded!
  const resH = calculateDaysBetween({
    startYear: 2025,
    startMonth: 10, // Nov
    startDay: 25,
    endYear: 2025,
    endMonth: 10,
    endDay: 28,
    includeEndDay: false,
    excludeHolidays: true,
  });
  if (resH.businessDays !== 2 || resH.holidaysCount !== 1) {
    throw new Error(`Case H failed: expected 2 working days and 1 holiday, got businessDays=${resH.businessDays}, holidays=${resH.holidaysCount}`);
  }

  // Case I: Weekend holiday observation (July 4, 2026 on Saturday -> observed Friday July 3)
  const resI = calculateDaysBetween({
    startYear: 2026,
    startMonth: 6, // July
    startDay: 2,
    endYear: 2026,
    endMonth: 6,
    endDay: 6,
    includeEndDay: false,
    excludeHolidays: true,
  });
  // Days: July 2 (Thu - work), July 3 (Fri - observed holiday), July 4 (Sat - weekend), July 5 (Sun - weekend)
  // Total calendar: 4. Business days: 1 (July 2). Holidays: 1. Weekend days: 2.
  if (resI.totalCalendarDays !== 4 || resI.businessDays !== 1 || resI.holidaysCount !== 1 || resI.weekendDays !== 2) {
    throw new Error(`Case I failed: ${JSON.stringify(resI)}`);
  }

  // Case J: Reversed Dec 14, 2026 to Sep 14, 2026
  const resJ = calculateDaysBetween({
    startYear: 2026,
    startMonth: 11,
    startDay: 14,
    endYear: 2026,
    endMonth: 8,
    endDay: 14,
    includeEndDay: false,
    excludeHolidays: true,
  });
  if (resJ.totalCalendarDays !== 91 || !resJ.isReversed || !resJ.reorderNotice) {
    throw new Error(`Case J failed: ${JSON.stringify(resJ)}`);
  }

  // Case K: Doomsday Mar 15, 2026 -> Sunday
  const resK = calculateDoomsday(2026, 2, 15);
  if (resK.finalDayOfWeek !== "Sunday") {
    throw new Error(`Case K failed: expected Sunday, got ${resK.finalDayOfWeek}`);
  }

  // Case L: Doomsday Mar 15, 2292 -> Tuesday
  const resL = calculateDoomsday(2292, 2, 15);
  if (resL.finalDayOfWeek !== "Tuesday") {
    throw new Error(`Case L failed: expected Tuesday, got ${resL.finalDayOfWeek}`);
  }

  // Test Thanksgiving dynamically across 2024 to 2030
  const thx2024 = getUSFederalHolidays(2024).find((h) => h.name.includes("Thanksgiving"));
  const thx2025 = getUSFederalHolidays(2025).find((h) => h.name.includes("Thanksgiving"));
  const thx2026 = getUSFederalHolidays(2026).find((h) => h.name.includes("Thanksgiving"));
  const thx2027 = getUSFederalHolidays(2027).find((h) => h.name.includes("Thanksgiving"));
  if (thx2024?.day !== 28 || thx2025?.day !== 27 || thx2026?.day !== 26 || thx2027?.day !== 25) {
    throw new Error("Thanksgiving generation mismatch across 2024-2027");
  }

  // Module calculation wrapper test
  const defaultInputs = { startDate: "2026-09-14", endDate: "2026-12-14" };
  const resHarness = calculateDayCounter(defaultInputs);
  if (resHarness.totalDays !== 91 || resHarness.businessDays !== 62) {
    throw new Error("Default inputs harness mismatch");
  }

  return true;
}

export default runDayCounterTests;
