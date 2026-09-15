import { calculateDayOfWeek, parseBatchDates, isLeapYear, getDaysInMonth } from "../src/lib/calculator-engine/formulas/day-of-week";

// Independent reference implementation for Gregorian Day of Week
function referenceGregorianDayOfWeek(y: number, m: number, d: number): number {
  // Using pure Tomohiko Sakamoto's algorithm (0=Sunday, 1=Monday, ..., 6=Saturday)
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  let year = y;
  if (m < 2) year -= 1;
  return (year + Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400) + t[m] + d) % 7;
}

// Independent reference for Julian Day of Week
function referenceJulianDayOfWeek(y: number, m: number, d: number): number {
  // 0=Sunday, 1=Monday... 6=Saturday
  // In Julian calendar, leap year is simply year % 4 === 0
  let a = Math.floor((14 - (m + 1)) / 12);
  let y_adj = y + 4800 - a;
  let m_adj = (m + 1) + 12 * a - 3;
  // Julian Day Number (JDN) for Julian calendar:
  let jdn = d + Math.floor((153 * m_adj + 2) / 5) + 365 * y_adj + Math.floor(y_adj / 4) - 32083;
  return (jdn + 1) % 7;
}

// Independent ISO 8601 Week Number
function referenceIsoWeek(y: number, m: number, d: number): { week: number; year: number } {
  const target = new Date(Date.UTC(y, m, d));
  const dayNr = (target.getUTCDay() + 6) % 7; // 0=Monday, ..., 6=Sunday
  target.setUTCDate(target.getUTCDate() - dayNr + 3); // Nearest Thursday
  const firstThursday = target.getTime();
  target.setUTCMonth(0, 1);
  if (target.getUTCDay() !== 4) {
    target.setUTCMonth(0, 1 + ((4 - target.getUTCDay() + 7) % 7));
  }
  const week = 1 + Math.ceil((firstThursday - target.getTime()) / 604800000);
  return { week, year: new Date(firstThursday).getUTCFullYear() };
}

// Independent Day of Year
function referenceDayOfYear(y: number, m: number, d: number): number {
  const isLeap = (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
  const mDays = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let doy = 0;
  for (let i = 0; i < m; i++) doy += mDays[i];
  return doy + d;
}

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

async function runAllTests() {
  console.log("=================================================");
  console.log("RUNNING DAY OF THE WEEK CALCULATOR AUDIT SUITE");
  console.log("=================================================");

  let totalAssertions = 0;
  let passedAssertions = 0;
  let failedAssertions = 0;

  function assert(cond: boolean, msg: string) {
    totalAssertions++;
    if (cond) {
      passedAssertions++;
    } else {
      failedAssertions++;
      console.error(`FAIL [Assertion ${totalAssertions}]: ${msg}`);
    }
  }

  // 1. Benchmark A: September 15, 2026 (Gregorian)
  const bA = calculateDayOfWeek({ year: 2026, month: 8, day: 15, calendarSystem: "gregorian" });
  assert(bA.dayName === "Tuesday", `Benchmark A: Sep 15, 2026 should be Tuesday (got ${bA.dayName})`);
  assert(bA.dayOfYear === 258, `Benchmark A: Sep 15, 2026 dayOfYear should be 258 (got ${bA.dayOfYear})`);
  assert(bA.totalDaysInYear === 365, `Benchmark A: 2026 has 365 days (got ${bA.totalDaysInYear})`);
  assert(bA.daysRemainingInYear === 107, `Benchmark A: 107 days remaining (got ${bA.daysRemainingInYear})`);
  assert(bA.isoWeekNumber === 38, `Benchmark A: ISO Week 38 (got ${bA.isoWeekNumber})`);
  assert(!bA.isLeapYear, `Benchmark A: 2026 is not a leap year`);

  // 1b. Benchmark A in Julian mode:
  const bA_julian = calculateDayOfWeek({ year: 2026, month: 8, day: 15, calendarSystem: "julian" });
  console.log(`Sep 15, 2026 in Julian mode yields: ${bA_julian.dayName}`);
  const refJulianSep15 = dayNames[referenceJulianDayOfWeek(2026, 8, 15)];
  console.log(`Reference Julian day of week for Sep 15, 2026 is: ${refJulianSep15}`);
  assert(bA_julian.dayName === refJulianSep15, `Julian Sep 15 2026 matches reference Julian: ${refJulianSep15}`);

  // 2. Benchmark B: September 13, 2026 (Gregorian)
  const bB = calculateDayOfWeek({ year: 2026, month: 8, day: 13, calendarSystem: "gregorian" });
  assert(bB.dayName === "Sunday", `Benchmark B: Sep 13, 2026 should be Sunday (got ${bB.dayName})`);
  assert(bB.dayOfYear === 256, `Benchmark B: Sep 13, 2026 dayOfYear should be 256 (got ${bB.dayOfYear})`);
  assert(bB.daysRemainingInYear === 109, `Benchmark B: 109 days remaining (got ${bB.daysRemainingInYear})`);
  assert(bB.isoWeekNumber === 37, `Benchmark B: ISO Week 37 (got ${bB.isoWeekNumber})`);

  // 3. Benchmark C: Apollo 11 (July 20, 1969)
  const bC = calculateDayOfWeek({ year: 1969, month: 6, day: 20, calendarSystem: "gregorian" });
  assert(bC.dayName === "Sunday", `Apollo 11: Jul 20, 1969 should be Sunday (got ${bC.dayName})`);
  assert(bC.dayOfYear === 201, `Apollo 11: Day of year should be 201 (got ${bC.dayOfYear})`);
  assert(bC.isoWeekNumber === 29, `Apollo 11: ISO Week should be 29 (got ${bC.isoWeekNumber})`);

  // 4. Benchmark D: US Independence (July 4, 1776)
  const bD = calculateDayOfWeek({ year: 1776, month: 6, day: 4, calendarSystem: "gregorian" });
  assert(bD.dayName === "Thursday", `US Independence: Jul 4, 1776 should be Thursday (got ${bD.dayName})`);
  assert(bD.dayOfYear === 186, `US Independence: Day of year should be 186 (got ${bD.dayOfYear})`);
  assert(bD.isLeapYear === true, `1776 is leap year`);

  // 5. Benchmark E: Leap date Feb 29, 2024
  const bE = calculateDayOfWeek({ year: 2024, month: 1, day: 29, calendarSystem: "gregorian" });
  assert(bE.dayName === "Thursday", `Feb 29, 2024 should be Thursday (got ${bE.dayName})`);
  assert(bE.dayOfYear === 60, `Feb 29, 2024 day of year should be 60 (got ${bE.dayOfYear})`);
  assert(bE.daysRemainingInYear === 306, `Feb 29, 2024 days left should be 306 (got ${bE.daysRemainingInYear})`);
  assert(bE.isLeapYear === true, `2024 is leap year`);

  // 6. Mandatory Known Reference Targets
  const knownTargets = [
    { y: 1776, m: 6, d: 4, expected: "Thursday" },
    { y: 1969, m: 6, d: 20, expected: "Sunday" },
    { y: 2000, m: 0, d: 1, expected: "Saturday" },
    { y: 2024, m: 1, d: 29, expected: "Thursday" },
    { y: 2025, m: 0, d: 1, expected: "Wednesday" },
    { y: 2026, m: 0, d: 1, expected: "Thursday" },
    { y: 2026, m: 8, d: 13, expected: "Sunday" },
    { y: 2026, m: 8, d: 14, expected: "Monday" },
    { y: 2026, m: 8, d: 15, expected: "Tuesday" },
    { y: 2026, m: 8, d: 16, expected: "Wednesday" },
    { y: 2026, m: 11, d: 31, expected: "Thursday" },
  ];
  for (const t of knownTargets) {
    const res = calculateDayOfWeek({ year: t.y, month: t.m, day: t.d, calendarSystem: "gregorian" });
    assert(res.dayName === t.expected, `Target ${t.y}-${t.m+1}-${t.d} expected ${t.expected}, got ${res.dayName}`);
  }

  // 7. 1,000 Randomized Gregorian Dates vs Reference Algorithm
  let gregRandPassed = 0;
  let seed = 42;
  function random() {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  }

  for (let i = 0; i < 1000; i++) {
    const y = 1600 + Math.floor(random() * 800); // 1600 to 2400
    const m = Math.floor(random() * 12);
    const maxD = getDaysInMonth(y, m, false);
    const d = 1 + Math.floor(random() * maxD);

    const calc = calculateDayOfWeek({ year: y, month: m, day: d, calendarSystem: "gregorian" });
    const refIdx = referenceGregorianDayOfWeek(y, m, d);
    const refName = dayNames[refIdx];

    if (calc.dayName === refName) {
      gregRandPassed++;
    } else {
      assert(false, `Gregorian mismatch for ${y}-${m + 1}-${d}: calc=${calc.dayName}, ref=${refName}`);
    }
  }
  assert(gregRandPassed === 1000, `All 1,000 randomized Gregorian dates passed (got ${gregRandPassed})`);

  // 8. 500 Randomized Julian Dates vs Independent Julian Reference
  let julianRandPassed = 0;
  for (let i = 0; i < 500; i++) {
    const y = 1 + Math.floor(random() * 2100); // Year 1 to 2100
    const m = Math.floor(random() * 12);
    const maxD = getDaysInMonth(y, m, true);
    const d = 1 + Math.floor(random() * maxD);

    const calc = calculateDayOfWeek({ year: y, month: m, day: d, calendarSystem: "julian" });
    const refIdx = referenceJulianDayOfWeek(y, m, d);
    const refName = dayNames[refIdx];

    if (calc.dayName === refName) {
      julianRandPassed++;
    } else {
      assert(false, `Julian mismatch for ${y}-${m + 1}-${d}: calc=${calc.dayName}, ref=${refName}`);
    }
  }
  assert(julianRandPassed === 500, `All 500 randomized Julian dates passed (got ${julianRandPassed})`);

  // 9. 1,000 Randomized ISO Week Tests
  let isoRandPassed = 0;
  for (let i = 0; i < 1000; i++) {
    const y = 1970 + Math.floor(random() * 100);
    const m = Math.floor(random() * 12);
    const maxD = getDaysInMonth(y, m, false);
    const d = 1 + Math.floor(random() * maxD);

    const calc = calculateDayOfWeek({ year: y, month: m, day: d, calendarSystem: "gregorian" });
    const refIso = referenceIsoWeek(y, m, d);

    if (calc.isoWeekNumber === refIso.week) {
      isoRandPassed++;
    } else {
      assert(false, `ISO week mismatch for ${y}-${m + 1}-${d}: calc=${calc.isoWeekNumber}, ref=${refIso.week}`);
    }
  }
  assert(isoRandPassed === 1000, `All 1,000 randomized ISO week calculations passed (got ${isoRandPassed})`);

  // 10. 1,000 Randomized Day-of-Year Tests
  let doyRandPassed = 0;
  for (let i = 0; i < 1000; i++) {
    const y = 1600 + Math.floor(random() * 800);
    const m = Math.floor(random() * 12);
    const maxD = getDaysInMonth(y, m, false);
    const d = 1 + Math.floor(random() * maxD);

    const calc = calculateDayOfWeek({ year: y, month: m, day: d, calendarSystem: "gregorian" });
    const refDoy = referenceDayOfYear(y, m, d);

    if (calc.dayOfYear === refDoy) {
      doyRandPassed++;
    } else {
      assert(false, `Day of year mismatch for ${y}-${m + 1}-${d}: calc=${calc.dayOfYear}, ref=${refDoy}`);
    }
  }
  assert(doyRandPassed === 1000, `All 1,000 randomized Day of Year calculations passed (got ${doyRandPassed})`);

  // 11. Batch Parser Tests
  const batchTestSample = `1969-07-20\n1776-07-04\n2000-01-01\n2026-08-18`;
  const batchRes = parseBatchDates(batchTestSample);
  assert(batchRes.length === 4, `Batch parsed 4 rows (got ${batchRes.length})`);
  assert(batchRes[0].dayName === "Sunday", `Batch row 0: Jul 20, 1969 is Sunday`);
  assert(batchRes[1].dayName === "Thursday", `Batch row 1: Jul 4, 1776 is Thursday`);
  assert(batchRes[2].dayName === "Saturday", `Batch row 2: Jan 1, 2000 is Saturday`);
  assert(batchRes[3].dayName === "Tuesday", `Batch row 3: Aug 18, 2026 is Tuesday`);

  // Batch Parser with invalid / edge cases
  const mixedBatch = `2026-09-15\n2026-02-30\nabc\n2000-01-01\n   \n2024-02-29`;
  const mixedRes = parseBatchDates(mixedBatch);
  console.log("Mixed batch results:", mixedRes);
  // Notice: Does 2026-02-30 get detected as invalid by parseBatchDates?
  // Let's check:
  const feb30Item = mixedRes.find(r => r.dateString === "2026-02-30");
  console.log("Batch 2026-02-30 isValid:", feb30Item?.isValid, "dayName:", feb30Item?.dayName);

  // 12. Date Validation / Clamping check in calculateDayOfWeek
  // If user enters 2026, month=1 (Feb), day=30:
  const feb30Calc = calculateDayOfWeek({ year: 2026, month: 1, day: 30, calendarSystem: "gregorian" });
  console.log("Feb 30 2026 in calculateDayOfWeek clamped day:", feb30Calc.calendarGrid.selectedDay, "dayName:", feb30Calc.dayName);

  console.log("-------------------------------------------------");
  console.log(`TOTAL ASSERTIONS: ${totalAssertions}`);
  console.log(`PASSED: ${passedAssertions}`);
  console.log(`FAILED: ${failedAssertions}`);
  console.log("-------------------------------------------------");
}

runAllTests().catch(console.error);
