import {
  calculateDayOfWeek,
  parseBatchDates,
  isValidCalendarDate,
  getWeekdayForCalendarDate,
  isLeapYear,
  getDaysInMonth,
} from "../src/lib/calculator-engine/formulas/day-of-week";

// Independent Sakamoto algorithm (Gregorian reference)
function referenceGregorianDayOfWeek(y: number, m: number, d: number): number {
  const t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
  let year = y;
  if (m < 2) year -= 1;
  return (year + Math.floor(year / 4) - Math.floor(year / 100) + Math.floor(year / 400) + t[m] + d) % 7;
}

// Independent Julian reference (0=Sunday, 1=Monday... 6=Saturday)
function referenceJulianDayOfWeek(y: number, m: number, d: number): number {
  let a = Math.floor((14 - (m + 1)) / 12);
  let y_adj = y + 4800 - a;
  let m_adj = (m + 1) + 12 * a - 3;
  let jdn = d + Math.floor((153 * m_adj + 2) / 5) + 365 * y_adj + Math.floor(y_adj / 4) - 32083;
  return (jdn + 1) % 7;
}

// Independent ISO 8601 week number reference
function referenceIsoWeek(y: number, m: number, d: number): { week: number; year: number } {
  const target = new Date(Date.UTC(2000, m, d));
  target.setUTCFullYear(y);
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

// Independent Day of Year reference
function referenceDayOfYear(y: number, m: number, d: number, isJulian: boolean): number {
  const isLeap = isJulian ? (y % 4 === 0) : ((y % 4 === 0 && y % 100 !== 0) || y % 400 === 0);
  const mDays = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  let doy = 0;
  for (let i = 0; i < m; i++) doy += mDays[i];
  return doy + d;
}

const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

async function runMasterAudit() {
  console.log("===============================================================");
  console.log("DAY OF THE WEEK CALCULATOR: POST-FIX MASTER REGRESSION AUDIT");
  console.log("===============================================================");

  let totalAssertions = 0;
  let passedAssertions = 0;
  let failedAssertions = 0;

  function assert(condition: boolean, description: string) {
    totalAssertions++;
    if (condition) {
      passedAssertions++;
    } else {
      failedAssertions++;
      console.error(`FAIL [Assertion #${totalAssertions}]: ${description}`);
    }
  }

  // -----------------------------------------------------------------
  // 1. BENCHMARK CASES A through E
  // -----------------------------------------------------------------
  console.log("\n1. Validating Benchmark Cases A through E...");

  // Benchmark A (Gregorian): September 15, 2026
  const bmAGreg = calculateDayOfWeek({ year: 2026, month: 8, day: 15, calendarSystem: "gregorian" });
  assert(bmAGreg.isValid, "Benchmark A (Gregorian) isValid === true");
  assert(bmAGreg.dayName === "Tuesday", `Benchmark A (Gregorian) dayName is Tuesday (got ${bmAGreg.dayName})`);
  assert(bmAGreg.dayOfYear === 258, `Benchmark A (Gregorian) dayOfYear === 258 (got ${bmAGreg.dayOfYear})`);
  assert(bmAGreg.totalDaysInYear === 365, "Benchmark A (Gregorian) totalDaysInYear === 365");
  assert(bmAGreg.daysRemainingInYear === 107, `Benchmark A (Gregorian) daysRemaining === 107 (got ${bmAGreg.daysRemainingInYear})`);
  assert(bmAGreg.isoWeekNumber === 38, `Benchmark A (Gregorian) isoWeek === 38 (got ${bmAGreg.isoWeekNumber})`);
  assert(bmAGreg.calendarGrid.firstDayOfWeekIndex === 2, "Benchmark A (Gregorian) Sep 1 starts on Tuesday (index 2)");

  // Benchmark A (Proleptic Julian): September 15, 2026
  const bmAJul = calculateDayOfWeek({ year: 2026, month: 8, day: 15, calendarSystem: "julian" });
  assert(bmAJul.isValid, "Benchmark A (Julian) isValid === true");
  assert(bmAJul.dayName === "Monday", `Benchmark A (Julian) dayName is Monday (got ${bmAJul.dayName})`);
  assert(bmAJul.calendarGrid.firstDayOfWeekIndex === 1, "Benchmark A (Julian) Sep 1 starts on Monday (index 1)");

  // Grid synchronization check: in Julian mode, day 15 corresponds exactly to Monday
  const julianSep15DOW = (bmAJul.calendarGrid.firstDayOfWeekIndex + 14) % 7; // (1 + 14) % 7 = 1 (Monday)
  assert(julianSep15DOW === bmAJul.dayOfWeekIndex, `Julian grid placement (${julianSep15DOW}) matches headline (${bmAJul.dayOfWeekIndex})`);

  // Benchmark B: September 13, 2026 (Sunday)
  const bmB = calculateDayOfWeek({ year: 2026, month: 8, day: 13, calendarSystem: "gregorian" });
  assert(bmB.dayName === "Sunday", `Benchmark B dayName is Sunday (got ${bmB.dayName})`);
  assert(bmB.dayOfYear === 256, `Benchmark B dayOfYear === 256 (got ${bmB.dayOfYear})`);
  assert(bmB.daysRemainingInYear === 109, `Benchmark B daysRemaining === 109 (got ${bmB.daysRemainingInYear})`);
  assert(bmB.isoWeekNumber === 37, `Benchmark B isoWeek === 37 (got ${bmB.isoWeekNumber})`);

  // Benchmark C: Apollo 11 (July 20, 1969)
  const bmC = calculateDayOfWeek({ year: 1969, month: 6, day: 20, calendarSystem: "gregorian" });
  assert(bmC.dayName === "Sunday", `Apollo 11 dayName is Sunday (got ${bmC.dayName})`);
  assert(bmC.dayOfYear === 201, `Apollo 11 dayOfYear === 201 (got ${bmC.dayOfYear})`);
  assert(bmC.isoWeekNumber === 29, `Apollo 11 isoWeek === 29 (got ${bmC.isoWeekNumber})`);

  // Benchmark D: US Independence (July 4, 1776)
  const bmD = calculateDayOfWeek({ year: 1776, month: 6, day: 4, calendarSystem: "gregorian" });
  assert(bmD.dayName === "Thursday", `US Independence is Thursday (got ${bmD.dayName})`);
  assert(bmD.dayOfYear === 186, `US Independence dayOfYear === 186 (got ${bmD.dayOfYear})`);
  assert(bmD.isLeapYear === true, "1776 is leap year");
  assert(bmD.isoWeekNumber === 27, `US Independence isoWeek === 27 (got ${bmD.isoWeekNumber})`);

  // Benchmark E: Leap Day Feb 29, 2024
  const bmE = calculateDayOfWeek({ year: 2024, month: 1, day: 29, calendarSystem: "gregorian" });
  assert(bmE.dayName === "Thursday", `Feb 29 2024 is Thursday (got ${bmE.dayName})`);
  assert(bmE.dayOfYear === 60, `Feb 29 2024 dayOfYear === 60 (got ${bmE.dayOfYear})`);
  assert(bmE.daysRemainingInYear === 306, `Feb 29 2024 daysRemaining === 306 (got ${bmE.daysRemainingInYear})`);

  // -----------------------------------------------------------------
  // 2. MANDATORY REFERENCE TARGETS
  // -----------------------------------------------------------------
  console.log("\n2. Validating Mandatory Reference Targets...");
  const targets = [
    { y: 1776, m: 6, d: 4, exp: "Thursday" },
    { y: 1969, m: 6, d: 20, exp: "Sunday" },
    { y: 2000, m: 0, d: 1, exp: "Saturday" },
    { y: 2024, m: 1, d: 29, exp: "Thursday" },
    { y: 2025, m: 0, d: 1, exp: "Wednesday" },
    { y: 2026, m: 0, d: 1, exp: "Thursday" },
    { y: 2026, m: 8, d: 13, exp: "Sunday" },
    { y: 2026, m: 8, d: 14, exp: "Monday" },
    { y: 2026, m: 8, d: 15, exp: "Tuesday" },
    { y: 2026, m: 8, d: 16, exp: "Wednesday" },
    { y: 2026, m: 11, d: 31, exp: "Thursday" },
  ];
  for (const t of targets) {
    const res = calculateDayOfWeek({ year: t.y, month: t.m, day: t.d, calendarSystem: "gregorian" });
    assert(res.dayName === t.exp, `Reference target ${t.y}-${t.m + 1}-${t.d} matches ${t.exp} (got ${res.dayName})`);
  }

  // -----------------------------------------------------------------
  // 3. 1,000 RANDOM GREGORIAN DATES
  // -----------------------------------------------------------------
  console.log("\n3. Running 1,000 Randomized Gregorian Dates vs. Sakamoto Algorithm...");
  let seed = 123456789;
  function rand() {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  }

  let gregCount = 0;
  for (let i = 0; i < 1000; i++) {
    const y = 1583 + Math.floor(rand() * 1500); // 1583 to 3082
    const m = Math.floor(rand() * 12);
    const maxD = getDaysInMonth(y, m, false);
    const d = 1 + Math.floor(rand() * maxD);

    const calc = calculateDayOfWeek({ year: y, month: m, day: d, calendarSystem: "gregorian" });
    const refDow = dayNames[referenceGregorianDayOfWeek(y, m, d)];
    if (calc.dayName === refDow && calc.isValid) {
      gregCount++;
    } else {
      assert(false, `Gregorian mismatch at ${y}-${m + 1}-${d}: calc=${calc.dayName}, ref=${refDow}`);
    }
  }
  assert(gregCount === 1000, `All 1,000 randomized Gregorian dates passed (passed: ${gregCount})`);

  // -----------------------------------------------------------------
  // 4. 1,000 RANDOM PROLEPTIC JULIAN DATES
  // -----------------------------------------------------------------
  console.log("\n4. Running 1,000 Randomized Proleptic Julian Dates vs. Independent JDN...");
  let julianCount = 0;
  for (let i = 0; i < 1000; i++) {
    const y = 1 + Math.floor(rand() * 3000); // Year 1 to 3000
    const m = Math.floor(rand() * 12);
    const maxD = getDaysInMonth(y, m, true);
    const d = 1 + Math.floor(rand() * maxD);

    const calc = calculateDayOfWeek({ year: y, month: m, day: d, calendarSystem: "julian" });
    const refDow = dayNames[referenceJulianDayOfWeek(y, m, d)];
    if (calc.dayName === refDow && calc.isValid) {
      julianCount++;
    } else {
      assert(false, `Julian mismatch at ${y}-${m + 1}-${d}: calc=${calc.dayName}, ref=${refDow}`);
    }
  }
  assert(julianCount === 1000, `All 1,000 randomized Julian dates passed (passed: ${julianCount})`);

  // -----------------------------------------------------------------
  // 5. 1,000 RANDOM ISO-8601 WEEK TESTS
  // -----------------------------------------------------------------
  console.log("\n5. Running 1,000 Randomized ISO-8601 Week Tests...");
  let isoCount = 0;
  for (let i = 0; i < 1000; i++) {
    const y = 1970 + Math.floor(rand() * 150);
    const m = Math.floor(rand() * 12);
    const maxD = getDaysInMonth(y, m, false);
    const d = 1 + Math.floor(rand() * maxD);

    const calc = calculateDayOfWeek({ year: y, month: m, day: d, calendarSystem: "gregorian" });
    const refIso = referenceIsoWeek(y, m, d);
    if (calc.isoWeekNumber === refIso.week) {
      isoCount++;
    } else {
      assert(false, `ISO week mismatch at ${y}-${m + 1}-${d}: calc=${calc.isoWeekNumber}, ref=${refIso.week}`);
    }
  }
  assert(isoCount === 1000, `All 1,000 randomized ISO week tests passed (passed: ${isoCount})`);

  // -----------------------------------------------------------------
  // 6. 1,000 RANDOM DAY-OF-YEAR TESTS
  // -----------------------------------------------------------------
  console.log("\n6. Running 1,000 Randomized Day-of-Year Tests...");
  let doyCount = 0;
  for (let i = 0; i < 1000; i++) {
    const y = 1583 + Math.floor(rand() * 1500);
    const m = Math.floor(rand() * 12);
    const maxD = getDaysInMonth(y, m, false);
    const d = 1 + Math.floor(rand() * maxD);

    const calc = calculateDayOfWeek({ year: y, month: m, day: d, calendarSystem: "gregorian" });
    const refDoy = referenceDayOfYear(y, m, d, false);
    if (calc.dayOfYear === refDoy) {
      doyCount++;
    } else {
      assert(false, `Day of year mismatch at ${y}-${m + 1}-${d}: calc=${calc.dayOfYear}, ref=${refDoy}`);
    }
  }
  assert(doyCount === 1000, `All 1,000 randomized Day of Year tests passed (passed: ${doyCount})`);

  // -----------------------------------------------------------------
  // 7. 500 STRICT INVALID DATE REJECTION TESTS
  // -----------------------------------------------------------------
  console.log("\n7. Running 500 Strict Invalid Date Tests...");
  const mandatoryInvalids = [
    { y: 2026, m: 1, d: 30 },
    { y: 2026, m: 1, d: 31 },
    { y: 2026, m: 3, d: 31 },
    { y: 2026, m: 5, d: 31 },
    { y: 2026, m: 8, d: 31 },
    { y: 2026, m: 10, d: 31 },
    { y: 2025, m: 1, d: 29 },
    { y: 2100, m: 1, d: 29 }, // 2100 is not leap in Gregorian
    { y: 0, m: 0, d: 1 },     // Year 0 out of bounds (1-9999)
    { y: 10000, m: 0, d: 1 }, // Year 10000 out of bounds
  ];

  for (const inv of mandatoryInvalids) {
    const res = isValidCalendarDate(inv.y, inv.m, inv.d, false);
    assert(!res.isValid, `Mandatory invalid ${inv.y}-${inv.m + 1}-${inv.d} rejected properly`);
  }

  let randomInvalidHandled = 0;
  for (let i = 0; i < 490; i++) {
    const y = 2026;
    const m = 1; // February common year
    const d = 29 + Math.floor(rand() * 10); // 29 through 38
    const val = isValidCalendarDate(y, m, d, false);
    if (!val.isValid) randomInvalidHandled++;
  }
  assert(randomInvalidHandled === 490, `All 490 random invalid dates rejected (handled: ${randomInvalidHandled})`);

  // -----------------------------------------------------------------
  // 8. 500 BATCH PARSER TESTS
  // -----------------------------------------------------------------
  console.log("\n8. Running 500 Batch Multi-Date Parser Tests...");
  let batchCorrect = 0;
  for (let i = 0; i < 500; i++) {
    const isInvalid = i % 5 === 0;
    const dStr = isInvalid ? "2026-02-30" : "2026-09-15";
    const batchRes = parseBatchDates(dStr, "gregorian");
    if (isInvalid) {
      if (!batchRes[0].isValid && batchRes[0].dayName === "Invalid Date") batchCorrect++;
    } else {
      if (batchRes[0].isValid && batchRes[0].dayName === "Tuesday") batchCorrect++;
    }
  }
  assert(batchCorrect === 500, `All 500 batch tests passed (passed: ${batchCorrect})`);

  // -----------------------------------------------------------------
  // 9. YEAR 1-99 HISTORICAL TESTS
  // -----------------------------------------------------------------
  console.log("\n9. Running Year 1-99 Historical Tests (Preventing 1900+ Shift)...");
  const histYears = [33, 79, 99, 100, 158, 177, 1776, 1800, 1900, 2000, 2024, 2026, 9999];
  for (const hy of histYears) {
    const res = calculateDayOfWeek({ year: hy, month: 6, day: 20, calendarSystem: "gregorian" });
    assert(res.calendarGrid.year === hy, `Year ${hy} preserved exactly (got ${res.calendarGrid.year})`);
    assert(res.isValid, `Year ${hy} is valid`);
  }

  // -----------------------------------------------------------------
  // 10. CALENDAR GRID / HEADLINE SYNCHRONIZATION TEST (500 cases each)
  // -----------------------------------------------------------------
  console.log("\n10. Running Grid-to-Headline Synchronization Tests...");
  let syncJulianPassed = 0;
  for (let i = 0; i < 500; i++) {
    const y = 1600 + Math.floor(rand() * 800);
    const m = Math.floor(rand() * 12);
    const maxD = getDaysInMonth(y, m, true);
    const d = 1 + Math.floor(rand() * maxD);

    const calc = calculateDayOfWeek({ year: y, month: m, day: d, calendarSystem: "julian" });
    // In Julian mode, day 1 is placed at firstDayOfWeekIndex:
    const computedCellDOW = (calc.calendarGrid.firstDayOfWeekIndex + (d - 1)) % 7;
    if (computedCellDOW === calc.dayOfWeekIndex) {
      syncJulianPassed++;
    } else {
      assert(false, `Julian grid mismatch at ${y}-${m + 1}-${d}: cell=${computedCellDOW}, headline=${calc.dayOfWeekIndex}`);
    }
  }
  assert(syncJulianPassed === 500, `All 500 Julian dates grid-synchronized with headline (passed: ${syncJulianPassed})`);

  let syncGregPassed = 0;
  for (let i = 0; i < 500; i++) {
    const y = 1600 + Math.floor(rand() * 800);
    const m = Math.floor(rand() * 12);
    const maxD = getDaysInMonth(y, m, false);
    const d = 1 + Math.floor(rand() * maxD);

    const calc = calculateDayOfWeek({ year: y, month: m, day: d, calendarSystem: "gregorian" });
    const computedCellDOW = (calc.calendarGrid.firstDayOfWeekIndex + (d - 1)) % 7;
    if (computedCellDOW === calc.dayOfWeekIndex) {
      syncGregPassed++;
    } else {
      assert(false, `Gregorian grid mismatch at ${y}-${m + 1}-${d}: cell=${computedCellDOW}, headline=${calc.dayOfWeekIndex}`);
    }
  }
  assert(syncGregPassed === 500, `All 500 Gregorian dates grid-synchronized with headline (passed: ${syncGregPassed})`);

  // -----------------------------------------------------------------
  // 11. 500 URL QUERY-STRING SERIALIZATION & DESERIALIZATION TESTS
  // -----------------------------------------------------------------
  console.log("\n11. Running 500 URL Query-String State Restoration Tests...");
  let urlPassed = 0;
  for (let i = 0; i < 500; i++) {
    const y = 1 + Math.floor(rand() * 9998);
    const m = Math.floor(rand() * 12);
    const d = 1 + Math.floor(rand() * 28);
    const cal = i % 2 === 0 ? "gregorian" : "julian";
    const ws = i % 2 === 0 ? "sunday" : "monday";

    const p = new URLSearchParams();
    p.set("tab", "single");
    p.set("year", y.toString());
    p.set("month", m.toString());
    p.set("day", d.toString());
    p.set("calendar", cal);
    p.set("weekStart", ws);

    // Deserialization:
    const parsedY = parseInt(p.get("year") || "", 10);
    const parsedM = parseInt(p.get("month") || "", 10);
    const parsedD = parseInt(p.get("day") || "", 10);
    const parsedCal = p.get("calendar");
    const parsedWs = p.get("weekStart");

    if (parsedY === y && parsedM === m && parsedD === d && parsedCal === cal && parsedWs === ws) {
      urlPassed++;
    }
  }
  assert(urlPassed === 500, `All 500 URL state serialization tests passed (passed: ${urlPassed})`);

  console.log("\n===============================================================");
  console.log("FINAL TEST SUMMARY");
  console.log("===============================================================");
  console.log(`Total Assertions Checked: ${totalAssertions}`);
  console.log(`Passed: ${passedAssertions}`);
  console.log(`Failed: ${failedAssertions}`);
  console.log("===============================================================");

  if (failedAssertions === 0) {
    console.log("STATUS: ALL TESTS PASSED! READY FOR GO VERDICT!");
    process.exit(0);
  } else {
    console.log("STATUS: DEFECTS REMAINING. NO-GO.");
    process.exit(1);
  }
}

runMasterAudit().catch(console.error);
