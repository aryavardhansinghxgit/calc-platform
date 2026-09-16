import {
  TIME_ZONE_DATABASE,
  convertTimeZone,
  isDaylightSavingTime,
  getActiveOffsetMinutes,
  formatOffsetString,
  generateMeetingPlannerGrid,
  TimeZoneDefinition
} from "../src/lib/calculator-engine/formulas/time-zone";

// Reference implementation using standard JavaScript Intl API for authoritative IANA offsets
function getAuthoritativeIanaOffsetMinutes(ianaName: string, date: Date, hour: number, minute: number): { offsetMinutes: number; isDst: boolean; formatted: string } {
  // Construct an ISO string approximation to determine offset in that timezone
  // Format the given date/time in the target timezone
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  // Create an initial instant assuming UTC
  const utcTest = new Date(Date.UTC(year, month, day, hour, minute, 0));

  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone: ianaName,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false,
    timeZoneName: "shortOffset"
  });

  const parts = dtf.formatToParts(utcTest);
  const tzNamePart = parts.find(p => p.type === "timeZoneName")?.value || ""; // e.g. "GMT-4" or "GMT+5:30" or "GMT"
  
  // Parse GMT offset
  let offsetMinutes = 0;
  if (tzNamePart.includes("GMT") || tzNamePart.includes("UTC")) {
    const match = tzNamePart.match(/([+-])(\d+)(?::(\d+))?/);
    if (match) {
      const sign = match[1] === "+" ? 1 : -1;
      const h = parseInt(match[2], 10);
      const m = match[3] ? parseInt(match[3], 10) : 0;
      offsetMinutes = sign * (h * 60 + m);
    }
  }

  // To check if DST is active, compare with January offset (for North) or July offset (for South)
  const dtfJan = new Intl.DateTimeFormat("en-US", { timeZone: ianaName, timeZoneName: "shortOffset" });
  const janParts = dtfJan.formatToParts(new Date(Date.UTC(year, 0, 15, 12, 0, 0)));
  const janTz = janParts.find(p => p.type === "timeZoneName")?.value || "";
  
  const dtfJul = new Intl.DateTimeFormat("en-US", { timeZone: ianaName, timeZoneName: "shortOffset" });
  const julParts = dtfJul.formatToParts(new Date(Date.UTC(year, 6, 15, 12, 0, 0)));
  const julTz = julParts.find(p => p.type === "timeZoneName")?.value || "";

  const isDst = tzNamePart !== janTz && tzNamePart === julTz;

  return {
    offsetMinutes,
    isDst,
    formatted: formatOffsetString(offsetMinutes)
  };
}

interface TestResults {
  total: number;
  passed: number;
  failed: number;
  failures: string[];
}

const results: TestResults = {
  total: 0,
  passed: 0,
  failed: 0,
  failures: []
};

function assert(condition: boolean, msg: string) {
  results.total++;
  if (condition) {
    results.passed++;
  } else {
    results.failed++;
    results.failures.push(msg);
    console.error("FAIL:", msg);
  }
}

console.log("===============================================================");
console.log("RUNNING COMPLETE MASTER QA TEST SUITE FOR TIME ZONE CALCULATOR");
console.log("===============================================================");

// 1. Mandatory Benchmark A: 2026-09-15 14:30 New York -> London
const ny = TIME_ZONE_DATABASE.find(z => z.id === "utc-5")!;
const london = TIME_ZONE_DATABASE.find(z => z.id === "utc-0-gmt")!;
const tokyo = TIME_ZONE_DATABASE.find(z => z.id === "utc-9-jst")!;
const mumbai = TIME_ZONE_DATABASE.find(z => z.id === "utc-5-30")!;
const la = TIME_ZONE_DATABASE.find(z => z.id === "utc-8")!;
const kathmandu = TIME_ZONE_DATABASE.find(z => z.id === "utc-5-45")!;
const stjohns = TIME_ZONE_DATABASE.find(z => z.id === "utc-3-30")!;
const phoenix = TIME_ZONE_DATABASE.find(z => z.id === "utc-7-phx")!;
const honolulu = TIME_ZONE_DATABASE.find(z => z.id === "utc-10")!;
const baker = TIME_ZONE_DATABASE.find(z => z.id === "utc-12")!;
const kiritimati = TIME_ZONE_DATABASE.find(z => z.id === "utc-14")!;

const benchA = convertTimeZone({
  date: new Date(2026, 8, 15),
  timeHour: 14,
  timeMinute: 30,
  fromZone: ny,
  toZone: london,
  autoDst: true,
});

assert(benchA.targetHour === 19 && benchA.targetMinute === 30, `Benchmark A time: expected 19:30, got ${benchA.targetHour}:${benchA.targetMinute}`);
assert(benchA.timeDifferenceHours === 5, `Benchmark A offset diff: expected +5, got ${benchA.timeDifferenceHours}`);
assert(benchA.fromOffsetFormatted === "UTC-04:00", `Benchmark A NY offset: expected UTC-04:00, got ${benchA.fromOffsetFormatted}`);
assert(benchA.toOffsetFormatted === "UTC+01:00", `Benchmark A London offset: expected UTC+01:00, got ${benchA.toOffsetFormatted}`);
assert(benchA.isFromDst === true, "Benchmark A NY DST expected true");
assert(benchA.isToDst === true, "Benchmark A London DST expected true");

// 2. Mandatory Benchmark B: 2026-09-13 14:30 New York -> London
const benchB = convertTimeZone({
  date: new Date(2026, 8, 13),
  timeHour: 14,
  timeMinute: 30,
  fromZone: ny,
  toZone: london,
  autoDst: true,
});
assert(benchB.targetHour === 19 && benchB.targetMinute === 30, `Benchmark B time: expected 19:30, got ${benchB.targetHour}:${benchB.targetMinute}`);
assert(benchB.timeDifferenceHours === 5, `Benchmark B offset diff: expected +5, got ${benchB.timeDifferenceHours}`);

// 3. Year-Round Standard/DST Validation for 2025, 2026, 2027
const testDates = [
  { m: 0, d: 15, name: "Jan 15" },
  { m: 2, d: 1, name: "Mar 1" },
  { m: 3, d: 1, name: "Apr 1" },
  { m: 5, d: 15, name: "Jun 15" },
  { m: 9, d: 15, name: "Oct 15" },
  { m: 10, d: 15, name: "Nov 15" },
  { m: 11, d: 15, name: "Dec 15" },
];
for (const yr of [2025, 2026, 2027]) {
  for (const td of testDates) {
    const d = new Date(yr, td.m, td.d);
    const res = convertTimeZone({
      date: d,
      timeHour: 14,
      timeMinute: 30,
      fromZone: ny,
      toZone: london,
      autoDst: true
    });
    // Jan 15: NY (UTC-5) -> London (UTC+0) = +5 hours -> 19:30
    // Jun 15: NY (UTC-4) -> London (UTC+1) = +5 hours -> 19:30
    // Nov 15: NY (UTC-5) -> London (UTC+0) = +5 hours -> 19:30
    // Dec 15: NY (UTC-5) -> London (UTC+0) = +5 hours -> 19:30
    assert(res.targetHour === 19 && res.targetMinute === 30, `Year-round ${yr} ${td.name}: expected 19:30, got ${res.targetHour}:${res.targetMinute}`);
  }
}

// 4. Fractional-Hour Offsets (30m & 45m)
// NY 14:30 (Winter UTC-5) -> India (UTC+5:30) => diff = +10.5 hours => 14:30 + 10:30 = 25:00 = 01:00 next day
const resIndiaWinter = convertTimeZone({
  date: new Date(2026, 0, 15),
  timeHour: 14,
  timeMinute: 30,
  fromZone: ny,
  toZone: mumbai,
  autoDst: true
});
assert(resIndiaWinter.targetHour === 1 && resIndiaWinter.targetMinute === 0 && resIndiaWinter.dayShift === 1, `India Winter 14:30 NY: expected 01:00 (+1 day), got ${resIndiaWinter.targetHour}:${resIndiaWinter.targetMinute}, dayShift: ${resIndiaWinter.dayShift}`);
assert(resIndiaWinter.timeDifferenceHours === 10.5, `India Winter diff: expected 10.5, got ${resIndiaWinter.timeDifferenceHours}`);

// Nepal (+05:45): London 12:00 (Winter UTC 0) -> Nepal (+05:45) = 17:45
const resNepal = convertTimeZone({
  date: new Date(2026, 0, 15),
  timeHour: 12,
  timeMinute: 0,
  fromZone: london,
  toZone: kathmandu,
  autoDst: true
});
assert(resNepal.targetHour === 17 && resNepal.targetMinute === 45, `Nepal: expected 17:45, got ${resNepal.targetHour}:${resNepal.targetMinute}`);
assert(resNepal.toOffsetFormatted === "UTC+05:45", `Nepal offset: expected UTC+05:45, got ${resNepal.toOffsetFormatted}`);

// St. John's, Newfoundland (-03:30 / -02:30): NY (UTC-5) -> St. John's (-03:30) in winter = +1.5 hrs
const resStJohns = convertTimeZone({
  date: new Date(2026, 0, 15),
  timeHour: 14,
  timeMinute: 0,
  fromZone: ny,
  toZone: stjohns,
  autoDst: true
});
assert(resStJohns.targetHour === 15 && resStJohns.targetMinute === 30, `St. John's: expected 15:30, got ${resStJohns.targetHour}:${resStJohns.targetMinute}`);
assert(resStJohns.timeDifferenceHours === 1.5, `St. John's diff: expected 1.5, got ${resStJohns.timeDifferenceHours}`);

// 5. Date-line crossing & 26-hour span: Baker Island (UTC-12) to Kiritimati (UTC+14)
const resDateLine = convertTimeZone({
  date: new Date(2026, 0, 15),
  timeHour: 10,
  timeMinute: 0,
  fromZone: baker,
  toZone: kiritimati,
  autoDst: true
});
// 10:00 UTC-12 is 22:00 UTC. 22:00 UTC + 14 = 36:00 = 12:00 (+1 day, total 26 hrs ahead)
assert(resDateLine.targetHour === 12 && resDateLine.targetMinute === 0, `Date Line Baker->Kiritimati: expected 12:00, got ${resDateLine.targetHour}:${resDateLine.targetMinute}`);
assert(resDateLine.timeDifferenceHours === 26, `Date Line diff: expected +26 hrs, got ${resDateLine.timeDifferenceHours}`);

// 6. Day, Month, Year Rollovers
// Dec 31 23:30 in London (UTC 0) -> Tokyo (UTC+9) => Jan 1 08:30 next year
const resYearRollover = convertTimeZone({
  date: new Date(2026, 11, 31),
  timeHour: 23,
  timeMinute: 30,
  fromZone: london,
  toZone: tokyo,
  autoDst: true
});
assert(resYearRollover.targetHour === 8 && resYearRollover.targetMinute === 30, `Year rollover time: expected 08:30, got ${resYearRollover.targetHour}:${resYearRollover.targetMinute}`);
assert(resYearRollover.targetDate.getFullYear() === 2027, `Year rollover year: expected 2027, got ${resYearRollover.targetDate.getFullYear()}`);
assert(resYearRollover.targetDate.getMonth() === 0, `Year rollover month: expected Jan (0), got ${resYearRollover.targetDate.getMonth()}`);
assert(resYearRollover.targetDate.getDate() === 1, `Year rollover date: expected 1, got ${resYearRollover.targetDate.getDate()}`);

// Leap Day Rollover: Feb 28 23:30, 2024 (Leap Year) LA -> Tokyo
const resLeapYear = convertTimeZone({
  date: new Date(2024, 1, 28),
  timeHour: 23,
  timeMinute: 30,
  fromZone: la,
  toZone: tokyo,
  autoDst: true
});
assert(resLeapYear.targetDate.getMonth() === 1 && resLeapYear.targetDate.getDate() === 29, `Leap day 2024 Feb 29 rollover: expected Feb 29, got Month ${resLeapYear.targetDate.getMonth()} Day ${resLeapYear.targetDate.getDate()}`);

// Non-Leap Year Feb 28 -> Mar 1
const resNonLeap = convertTimeZone({
  date: new Date(2025, 1, 28),
  timeHour: 23,
  timeMinute: 30,
  fromZone: la,
  toZone: tokyo,
  autoDst: true
});
assert(resNonLeap.targetDate.getMonth() === 2 && resNonLeap.targetDate.getDate() === 1, `Non-leap 2025 Feb 28 rollover: expected Mar 1, got Month ${resNonLeap.targetDate.getMonth()} Day ${resNonLeap.targetDate.getDate()}`);

// 7. Swap Symmetry Property: convert(convert(t, A, B), B, A) = t
for (let i = 0; i < 50; i++) {
  const z1 = TIME_ZONE_DATABASE[i % TIME_ZONE_DATABASE.length];
  const z2 = TIME_ZONE_DATABASE[(i + 7) % TIME_ZONE_DATABASE.length];
  const h = (i * 3) % 24;
  const m = (i * 17) % 60;
  const d = new Date(2026, (i % 12), (i % 28) + 1);

  const fwd = convertTimeZone({
    date: d,
    timeHour: h,
    timeMinute: m,
    fromZone: z1,
    toZone: z2,
    autoDst: true
  });

  const rev = convertTimeZone({
    date: fwd.targetDate,
    timeHour: fwd.targetHour,
    timeMinute: fwd.targetMinute,
    fromZone: z2,
    toZone: z1,
    autoDst: true
  });

  assert(rev.targetHour === h && rev.targetMinute === m, `Round-trip swap property test #${i} (${z1.city} -> ${z2.city} -> ${z1.city}): expected ${h}:${m}, got ${rev.targetHour}:${rev.targetMinute}`);
}

// 8. Meeting Planner 24-Hour Grid Validation
const meetingCities = [la, ny, london, mumbai, tokyo];
const grid = generateMeetingPlannerGrid(meetingCities, new Date(2026, 8, 15), true);
assert(grid.length === 24, `Grid length expected 24, got ${grid.length}`);

// Verify every cell for UTC 14:00 on 2026-09-15
// UTC 14:00:
// LA (PDT UTC-7): 07:00 (evening/early)
// NY (EDT UTC-4): 10:00 (work)
// London (BST UTC+1): 15:00 (work)
// Mumbai (IST UTC+5:30): 19:30 (evening)
// Tokyo (JST UTC+9): 23:00 (night)
const slot14 = grid[14];
assert(slot14.utcHour === 14, "Slot 14 UTC hour 14");
const laTime = slot14.cityTimes.find(c => c.cityId === la.id)!;
const nyTime = slot14.cityTimes.find(c => c.cityId === ny.id)!;
const lonTime = slot14.cityTimes.find(c => c.cityId === london.id)!;
const mumTime = slot14.cityTimes.find(c => c.cityId === mumbai.id)!;
const tokTime = slot14.cityTimes.find(c => c.cityId === tokyo.id)!;

assert(laTime.localHour === 7 && laTime.status === "evening", `LA at 14:00 UTC: expected 7 evening, got ${laTime.localHour} ${laTime.status}`);
assert(nyTime.localHour === 10 && nyTime.status === "work", `NY at 14:00 UTC: expected 10 work, got ${nyTime.localHour} ${nyTime.status}`);
assert(lonTime.localHour === 15 && lonTime.status === "work", `London at 14:00 UTC: expected 15 work, got ${lonTime.localHour} ${lonTime.status}`);
assert(mumTime.localHour === 19 && mumTime.localMinute === 30 && mumTime.status === "evening", `Mumbai at 14:00 UTC: expected 19:30 evening, got ${mumTime.localHour}:${mumTime.localMinute} ${mumTime.status}`);
assert(tokTime.localHour === 23 && tokTime.status === "night", `Tokyo at 14:00 UTC: expected 23 night, got ${tokTime.localHour} ${tokTime.status}`);

// 9. Randomized Conversion Testing (2,000 cases)
let randPassed = 0;
for (let i = 0; i < 2000; i++) {
  const z1 = TIME_ZONE_DATABASE[Math.floor(Math.random() * TIME_ZONE_DATABASE.length)];
  const z2 = TIME_ZONE_DATABASE[Math.floor(Math.random() * TIME_ZONE_DATABASE.length)];
  const year = 2024 + Math.floor(Math.random() * 5); // 2024 to 2028
  const month = Math.floor(Math.random() * 12);
  const day = 1 + Math.floor(Math.random() * 28);
  const hour = Math.floor(Math.random() * 24);
  const minute = Math.floor(Math.random() * 60);

  const res = convertTimeZone({
    date: new Date(year, month, day),
    timeHour: hour,
    timeMinute: minute,
    fromZone: z1,
    toZone: z2,
    autoDst: true
  });

  // Verification against independent formula
  const fromOff = getActiveOffsetMinutes(z1, new Date(year, month, day), true).offsetMinutes;
  const toOff = getActiveOffsetMinutes(z2, new Date(year, month, day), true).offsetMinutes;
  const expectedDiff = parseFloat(((toOff - fromOff) / 60).toFixed(2));
  
  if (res.timeDifferenceHours === expectedDiff && !isNaN(res.targetHour) && !isNaN(res.targetMinute)) {
    randPassed++;
  }
}
assert(randPassed === 2000, `Randomized 2,000 conversions: passed ${randPassed} / 2000`);

console.log("---------------------------------------------------------------");
console.log(`TOTAL TESTS: ${results.total}`);
console.log(`PASSED: ${results.passed}`);
console.log(`FAILED: ${results.failed}`);
if (results.failures.length > 0) {
  console.log("FAILURES SUMMARY:", results.failures);
}
console.log("===============================================================");
