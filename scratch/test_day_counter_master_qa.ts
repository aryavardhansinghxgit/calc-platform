import {
  calculateDaysBetween,
  calculateAddSubtractDays,
  calculateDoomsday,
  isValidCalendarDate,
  getUSFederalHolidays,
  isLeapYear,
  getDaysInMonth,
  getDayOfWeek,
} from "../src/lib/calculator-engine/formulas/day-counter";
import { runDayCounterTests } from "../src/app/calculators/day-counter-calculator/tests";
import { day_counter_calculatorFaqs } from "../src/app/calculators/day-counter-calculator/faq";
import { day_counter_calculatorConfig } from "../src/app/calculators/day-counter-calculator/config";

// ANSI colors for console output
const GREEN = "\x1b[32m";
const RED = "\x1b[31m";
const YELLOW = "\x1b[33m";
const CYAN = "\x1b[36m";
const RESET = "\x1b[0m";

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;

function assert(condition: boolean, msg: string) {
  totalTests++;
  if (condition) {
    passedTests++;
  } else {
    failedTests++;
    console.error(`${RED}FAIL: ${msg}${RESET}`);
  }
}

console.log(`${CYAN}==============================================================${RESET}`);
console.log(`${CYAN}MASTER PRODUCTION QA SUITE: DAY COUNTER / DATE DURATION SUITE${RESET}`);
console.log(`${CYAN}==============================================================${RESET}\n`);

// -----------------------------------------------------------------
// 1. RUN BUILT-IN TESTS (CASES A-L)
// -----------------------------------------------------------------
console.log(`${YELLOW}1. Running Built-in Benchmark Cases A through L...${RESET}`);
try {
  const builtInSuccess = runDayCounterTests();
  assert(builtInSuccess === true, "Built-in runDayCounterTests executed successfully");
  console.log(`${GREEN}✓ All mandatory benchmark cases A through L passed!${RESET}`);
} catch (e: any) {
  assert(false, `Built-in tests threw error: ${e.message}`);
}

// -----------------------------------------------------------------
// 2. DYNAMIC U.S. FEDERAL HOLIDAY VALIDATION (2024 to 2030)
// -----------------------------------------------------------------
console.log(`\n${YELLOW}2. Validating Dynamic US Federal Holidays (2024–2030)...${RESET}`);

const expectedThanksgivings: Record<number, number> = {
  2024: 28,
  2025: 27,
  2026: 26,
  2027: 25,
  2028: 23,
  2029: 22,
  2030: 28,
};

for (let y = 2024; y <= 2030; y++) {
  const hols = getUSFederalHolidays(y);
  // Each year should have at least 11 federal holidays (or 12 if Dec 31 observed is included)
  assert(hols.length >= 10, `Year ${y} holiday count >= 10 (got ${hols.length})`);

  const thx = hols.find((h) => h.name.includes("Thanksgiving"));
  assert(thx !== undefined, `Year ${y} has Thanksgiving`);
  if (thx) {
    assert(
      thx.month === 10 && thx.day === expectedThanksgivings[y],
      `Year ${y} Thanksgiving expected Nov ${expectedThanksgivings[y]}, got month ${thx.month + 1} day ${thx.day}`
    );
  }

  // MLK is 3rd Monday in January
  const mlk = hols.find((h) => h.name.includes("Martin Luther King"));
  assert(mlk !== undefined && mlk.month === 0, `Year ${y} has MLK Day in January`);
  if (mlk) {
    const dow = getDayOfWeek(y, 0, mlk.day);
    assert(dow === 1, `Year ${y} MLK Day falls on Monday (got DOW ${dow})`);
    assert(mlk.day >= 15 && mlk.day <= 21, `Year ${y} MLK Day is 3rd Monday (day ${mlk.day})`);
  }

  // Memorial Day is Last Monday in May
  const mem = hols.find((h) => h.name.includes("Memorial"));
  assert(mem !== undefined && mem.month === 4, `Year ${y} has Memorial Day in May`);
  if (mem) {
    const dow = getDayOfWeek(y, 4, mem.day);
    assert(dow === 1, `Year ${y} Memorial Day falls on Monday (got DOW ${dow})`);
    assert(mem.day >= 25 && mem.day <= 31, `Year ${y} Memorial Day is last Monday (day ${mem.day})`);
  }

  // Labor Day is 1st Monday in September
  const lab = hols.find((h) => h.name.includes("Labor"));
  assert(lab !== undefined && lab.month === 8, `Year ${y} has Labor Day in September`);
  if (lab) {
    const dow = getDayOfWeek(y, 8, lab.day);
    assert(dow === 1, `Year ${y} Labor Day falls on Monday (got DOW ${dow})`);
    assert(lab.day >= 1 && lab.day <= 7, `Year ${y} Labor Day is 1st Monday (day ${lab.day})`);
  }
}

// -----------------------------------------------------------------
// 3. WEEKEND OBSERVANCE SPECIFIC TESTS
// -----------------------------------------------------------------
console.log(`\n${YELLOW}3. Validating Weekend Holiday Observation Rules...${RESET}`);

// July 4, 2026 falls on Saturday -> observed Friday July 3, 2026
const hols2026 = getUSFederalHolidays(2026);
const indep2026 = hols2026.find((h) => h.name.startsWith("Independence Day"));
assert(indep2026 !== undefined, "2026 has Independence Day");
assert(
  indep2026?.month === 6 && indep2026?.day === 3 && indep2026?.isObserved === true,
  `2026 Independence Day observed Friday July 3 (got month ${indep2026?.month} day ${indep2026?.day})`
);

// Dec 25, 2022 was Sunday -> observed Monday Dec 26, 2022
const hols2022 = getUSFederalHolidays(2022);
const xmas2022 = hols2022.find((h) => h.name.includes("Christmas"));
assert(
  xmas2022?.month === 11 && xmas2022?.day === 26 && xmas2022?.isObserved === true,
  `2022 Christmas observed Monday Dec 26 (got month ${xmas2022?.month} day ${xmas2022?.day})`
);

// Jan 1, 2022 was Saturday -> observed Friday Dec 31, 2021
const hols2021 = getUSFederalHolidays(2021);
const ny2021 = hols2021.find((h) => h.name.includes("New Year") && h.month === 11 && h.day === 31);
assert(ny2021 !== undefined, "2021 has New Year's Day (Observed) on Dec 31");

// Veterans Day: Nov 11, 2023 was Saturday -> observed Friday Nov 10, 2023
const hols2023 = getUSFederalHolidays(2023);
const vet2023 = hols2023.find((h) => h.name.includes("Veterans"));
assert(
  vet2023?.month === 10 && vet2023?.day === 10 && vet2023?.isObserved === true,
  `2023 Veterans Day observed Friday Nov 10 (got month ${vet2023?.month} day ${vet2023?.day})`
);

// Juneteenth: June 19, 2022 was Sunday -> observed Monday June 20, 2022
const june2022 = hols2022.find((h) => h.name.includes("Juneteenth"));
assert(
  june2022?.month === 5 && june2022?.day === 20 && june2022?.isObserved === true,
  `2022 Juneteenth observed Monday June 20 (got month ${june2022?.month} day ${june2022?.day})`
);

// -----------------------------------------------------------------
// 4. STRICT INVALID DATE VALIDATION (MANDATORY TESTS)
// -----------------------------------------------------------------
console.log(`\n${YELLOW}4. Validating Strict Calendar Date Validation...${RESET}`);

const mandatoryRejections = [
  { y: 2026, m: 1, d: 30, name: "Feb 30, 2026" },
  { y: 2026, m: 1, d: 31, name: "Feb 31, 2026" },
  { y: 2026, m: 3, d: 31, name: "Apr 31, 2026" },
  { y: 2026, m: 5, d: 31, name: "Jun 31, 2026" },
  { y: 2026, m: 8, d: 31, name: "Sep 31, 2026" },
  { y: 2026, m: 10, d: 31, name: "Nov 31, 2026" },
  { y: 2025, m: 1, d: 29, name: "Feb 29, 2025 (non-leap)" },
  { y: 1900, m: 1, d: 29, name: "Feb 29, 1900 (century non-leap)" },
  { y: 0, m: 0, d: 1, name: "Year 0" },
  { y: -100, m: 5, d: 15, name: "Negative year" },
  { y: 10000, m: 0, d: 1, name: "Year > 9999" },
  { y: 2026, m: 12, d: 1, name: "Month > 11" },
  { y: 2026, m: 0, d: 0, name: "Day 0" },
];

for (const test of mandatoryRejections) {
  const res = isValidCalendarDate(test.y, test.m, test.d);
  assert(!res.isValid, `Strictly rejected impossible date: ${test.name}`);
  assert(res.error !== undefined && res.error.length > 5, `Descriptive error provided for ${test.name}`);
}

const mandatoryAcceptances = [
  { y: 2024, m: 1, d: 29, name: "Feb 29, 2024 (leap)" },
  { y: 2028, m: 1, d: 29, name: "Feb 29, 2028 (leap)" },
  { y: 2000, m: 1, d: 29, name: "Feb 29, 2000 (400-yr leap)" },
  { y: 2026, m: 1, d: 28, name: "Feb 28, 2026" },
  { y: 2026, m: 0, d: 31, name: "Jan 31, 2026" },
  { y: 2026, m: 3, d: 30, name: "Apr 30, 2026" },
  { y: 1, m: 0, d: 1, name: "Year 1 Min" },
  { y: 9999, m: 11, d: 31, name: "Year 9999 Max" },
];

for (const test of mandatoryAcceptances) {
  const res = isValidCalendarDate(test.y, test.m, test.d);
  assert(res.isValid, `Accepted valid calendar date: ${test.name}`);
}

// -----------------------------------------------------------------
// 5. 1,000 RANDOMIZED VALID DATE RANGES AGAINST INDEPENDENT ORACLE
// -----------------------------------------------------------------
console.log(`\n${YELLOW}5. Running 1,000 Randomized Valid Date Ranges against Reference Engine...${RESET}`);

// Independent reference function using Julian Day Number algorithm
function gregorianToJDN(year: number, month: number, day: number): number {
  // month is 0-11. Convert to 1-12.
  const m = month + 1;
  const a = Math.floor((14 - m) / 12);
  const y = year + 4800 - a;
  const mAdj = m + 12 * a - 3;
  return (
    day +
    Math.floor((153 * mAdj + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

// Seeded pseudo-random generator
let seed = 42;
function pseudoRandom() {
  seed = (seed * 9301 + 49297) % 233280;
  return seed / 233280;
}

let randPassed = 0;
for (let i = 0; i < 1000; i++) {
  const startY = 1970 + Math.floor(pseudoRandom() * 60); // 1970 - 2030
  const startM = Math.floor(pseudoRandom() * 12);
  const maxStartD = getDaysInMonth(startY, startM);
  const startD = 1 + Math.floor(pseudoRandom() * maxStartD);

  const spanDays = Math.floor(pseudoRandom() * 400); // 0 to 400 days span
  // compute target date
  const startMs = Date.UTC(startY, startM, startD);
  const endMs = startMs + spanDays * 86400000;
  const endObj = new Date(endMs);
  const endY = endObj.getUTCFullYear();
  const endM = endObj.getUTCMonth();
  const endD = endObj.getUTCDate();

  const isInclusive = pseudoRandom() > 0.5;

  const engineRes = calculateDaysBetween({
    startYear: startY,
    startMonth: startM,
    startDay: startD,
    endYear: endY,
    endMonth: endM,
    endDay: endD,
    includeEndDay: isInclusive,
    excludeHolidays: false,
  });

  const jdnStart = gregorianToJDN(startY, startM, startD);
  const jdnEnd = gregorianToJDN(endY, endM, endD);
  const expectedDays = (jdnEnd - jdnStart) + (isInclusive ? 1 : 0);

  if (engineRes.totalCalendarDays === expectedDays) {
    randPassed++;
  } else {
    assert(
      false,
      `Mismatch on random test #${i}: ${startY}-${startM + 1}-${startD} to ${endY}-${endM + 1}-${endD} (incl=${isInclusive}). Expected ${expectedDays}, got ${engineRes.totalCalendarDays}`
    );
  }
}
assert(randPassed === 1000, `All 1,000 randomized date ranges passed (passed: ${randPassed})`);

// -----------------------------------------------------------------
// 6. 500 RANDOMIZED HOLIDAY-AWARE RANGES
// -----------------------------------------------------------------
console.log(`\n${YELLOW}6. Running 500 Randomized Holiday-Aware Ranges...${RESET}`);
let holPassed = 0;
for (let i = 0; i < 500; i++) {
  const y = 2020 + Math.floor(pseudoRandom() * 10); // 2020 - 2029
  const m1 = Math.floor(pseudoRandom() * 6);
  const d1 = 1 + Math.floor(pseudoRandom() * 28);
  const m2 = 6 + Math.floor(pseudoRandom() * 6);
  const d2 = 1 + Math.floor(pseudoRandom() * 28);

  const res = calculateDaysBetween({
    startYear: y,
    startMonth: m1,
    startDay: d1,
    endYear: y,
    endMonth: m2,
    endDay: d2,
    includeEndDay: false,
    excludeHolidays: true,
  });

  // Invariant: totalCalendarDays must strictly equal businessDays + weekendDays + holidaysCount
  if (res.totalCalendarDays === res.businessDays + res.weekendDays + res.holidaysCount) {
    holPassed++;
  } else {
    assert(
      false,
      `Holiday partition mismatch: total=${res.totalCalendarDays}, b=${res.businessDays}, w=${res.weekendDays}, h=${res.holidaysCount}`
    );
  }
}
assert(holPassed === 500, `All 500 holiday-aware ranges passed partition check (passed: ${holPassed})`);

// -----------------------------------------------------------------
// 7. 500 RANDOMIZED ADD / SUBTRACT CASES
// -----------------------------------------------------------------
console.log(`\n${YELLOW}7. Running 500 Randomized Add/Subtract Cases...${RESET}`);
let addSubPassed = 0;
for (let i = 0; i < 500; i++) {
  const y = 2024 + Math.floor(pseudoRandom() * 4);
  const m = Math.floor(pseudoRandom() * 12);
  const maxD = getDaysInMonth(y, m);
  const d = 1 + Math.floor(pseudoRandom() * maxD);
  const offset = 1 + Math.floor(pseudoRandom() * 120);
  const op = pseudoRandom() > 0.5 ? "add" : "subtract";

  const res = calculateAddSubtractDays({
    startYear: y,
    startMonth: m,
    startDay: d,
    daysToOffset: offset,
    operation: op,
    businessDaysOnly: false,
  });

  // Compare with direct UTC Date offset
  const dir = op === "add" ? 1 : -1;
  const expectedDate = new Date(Date.UTC(y, m, d) + dir * offset * 86400000);
  if (
    res.targetYear === expectedDate.getUTCFullYear() &&
    res.targetMonth === expectedDate.getUTCMonth() &&
    res.targetDay === expectedDate.getUTCDate()
  ) {
    addSubPassed++;
  } else {
    assert(false, `Add/Subtract mismatch for ${y}-${m + 1}-${d} ${op} ${offset} days`);
  }
}
assert(addSubPassed === 500, `All 500 Add/Subtract cases passed (passed: ${addSubPassed})`);

// -----------------------------------------------------------------
// 8. 500 RANDOMIZED BUSINESS-DAY CASES
// -----------------------------------------------------------------
console.log(`\n${YELLOW}8. Running 500 Randomized Business-Day Offset Cases...${RESET}`);
let bdayPassed = 0;
for (let i = 0; i < 500; i++) {
  const y = 2025;
  const m = Math.floor(pseudoRandom() * 12);
  const maxD = getDaysInMonth(y, m);
  const d = 1 + Math.floor(pseudoRandom() * maxD);
  const offset = 1 + Math.floor(pseudoRandom() * 30);

  const res = calculateAddSubtractDays({
    startYear: y,
    startMonth: m,
    startDay: d,
    daysToOffset: offset,
    operation: "add",
    businessDaysOnly: true,
    excludeHolidays: true,
  });

  // Target day should never be a weekend
  const targetDow = getDayOfWeek(res.targetYear, res.targetMonth, res.targetDay);
  if (targetDow !== 0 && targetDow !== 6 && res.isValid) {
    bdayPassed++;
  } else {
    assert(false, `Business day target landed on weekend (DOW ${targetDow})`);
  }
}
assert(bdayPassed === 500, `All 500 business-day cases landed on working days (passed: ${bdayPassed})`);

// -----------------------------------------------------------------
// 9. 250 INVALID DATE CASES
// -----------------------------------------------------------------
console.log(`\n${YELLOW}9. Running 250 Invalid Date Edge Cases...${RESET}`);
let invalidHandled = 0;
for (let i = 0; i < 250; i++) {
  const badDay = 32 + i;
  const res = isValidCalendarDate(2026, 0, badDay);
  if (!res.isValid) {
    invalidHandled++;
  }
}
assert(invalidHandled === 250, `All 250 invalid date cases rejected properly (handled: ${invalidHandled})`);

// -----------------------------------------------------------------
// 10. CONWAY'S DOOMSDAY RULE DEEP TEST (1,200 Dates)
// -----------------------------------------------------------------
console.log(`\n${YELLOW}10. Validating Conway's Doomsday Rule on 1,200 Dates...${RESET}`);
const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let doomPassed = 0;
for (let y = 1900; y <= 2099; y++) {
  for (let m = 0; m < 12; m++) {
    const d = 15; // 15th of each month
    const res = calculateDoomsday(y, m, d);
    const expectedDow = dayNames[new Date(Date.UTC(y, m, d)).getUTCDay()];
    if (res.finalDayOfWeek === expectedDow) {
      doomPassed++;
    } else {
      assert(false, `Doomsday failed on ${y}-${m + 1}-${d}: expected ${expectedDow}, got ${res.finalDayOfWeek}`);
    }
  }
}
assert(doomPassed === 2400, `Doomsday passed all 2,400 date checks (passed: ${doomPassed})`);

// -----------------------------------------------------------------
// 11. FAQ & CONFIG VERIFICATION
// -----------------------------------------------------------------
console.log(`\n${YELLOW}11. Verifying Curated FAQs & Config Structure...${RESET}`);
assert(day_counter_calculatorConfig.faqs !== undefined, "Config has faqs defined");
assert(day_counter_calculatorConfig.faqs!.length === 21, `Config has exactly 21 FAQs (got ${day_counter_calculatorConfig.faqs?.length})`);

// Ensure no generic filler terms in FAQ
const faqString = JSON.stringify(day_counter_calculatorConfig.faqs).toLowerCase();
assert(!faqString.includes("inches"), "FAQ does not contain 'inches'");
assert(!faqString.includes("centimeters"), "FAQ does not contain 'centimeters'");
assert(!faqString.includes("export csv"), "FAQ does not contain false 'export csv' claim");
assert(!faqString.includes("100% accurate"), "FAQ does not contain generic '100% accurate' claim");

console.log(`\n${CYAN}==============================================================${RESET}`);
console.log(`${CYAN}FINAL TEST SUMMARY${RESET}`);
console.log(`${CYAN}==============================================================${RESET}`);
console.log(`Total Assertions Checked: ${totalTests}`);
console.log(`${GREEN}Passed: ${passedTests}${RESET}`);
console.log(`${failedTests === 0 ? GREEN : RED}Failed: ${failedTests}${RESET}`);

if (failedTests === 0) {
  console.log(`\n${GREEN}STATUS: ALL PRODUCTION CHECKS PASSED. READY FOR GO VERDICT!${RESET}`);
  process.exit(0);
} else {
  console.log(`\n${RED}STATUS: DEFECTS REMAINING. NO-GO.${RESET}`);
  process.exit(1);
}
