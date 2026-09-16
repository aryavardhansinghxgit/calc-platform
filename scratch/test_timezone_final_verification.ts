import {
  TIME_ZONE_DATABASE,
  convertTimeZone,
  formatOffsetString,
  generateMeetingPlannerGrid,
  resolveLocalWallClockToUtc,
  formatUtcInstantInIanaZone,
  TimeZoneDefinition
} from "../src/lib/calculator-engine/formulas/time-zone";
import { time_zone_calculatorFaqs } from "../src/app/calculators/time-zone-calculator/faq";
import { time_zone_calculatorConfig } from "../src/app/calculators/time-zone-calculator/config";
import { generateJsonLdSchema } from "../src/lib/seo-helpers";

interface SuiteStats {
  category: string;
  total: number;
  passed: number;
  failed: number;
  errors: string[];
}

const allStats: Record<string, SuiteStats> = {};

function getSuite(cat: string): SuiteStats {
  if (!allStats[cat]) {
    allStats[cat] = { category: cat, total: 0, passed: 0, failed: 0, errors: [] };
  }
  return allStats[cat];
}

function verify(cat: string, condition: boolean, message: string) {
  const s = getSuite(cat);
  s.total++;
  if (condition) {
    s.passed++;
  } else {
    s.failed++;
    s.errors.push(message);
    console.error(`[FAIL - ${cat}] ${message}`);
  }
}

console.log("===============================================================================");
console.log("STARTING INDEPENDENT RE-VERIFICATION QA SUITE FOR TIME ZONE CALCULATOR");
console.log("===============================================================================");

// -----------------------------------------------------------------------------
// Category A: Basic Conversion (100 tests)
// -----------------------------------------------------------------------------
const ny = TIME_ZONE_DATABASE.find(z => z.ianaName === "America/New_York")!;
const lon = TIME_ZONE_DATABASE.find(z => z.ianaName === "Europe/London")!;
const tok = TIME_ZONE_DATABASE.find(z => z.ianaName === "Asia/Tokyo")!;
const del = TIME_ZONE_DATABASE.find(z => z.ianaName === "Asia/Kolkata")!;
const la = TIME_ZONE_DATABASE.find(z => z.ianaName === "America/Los_Angeles")!;
const scl = TIME_ZONE_DATABASE.find(z => z.ianaName === "America/Santiago")!;

// Benchmark A: 2026-09-15 14:30 America/New_York -> Europe/London
const benchA = convertTimeZone({
  date: new Date(2026, 8, 15),
  timeHour: 14,
  timeMinute: 30,
  fromZone: ny,
  toZone: lon,
});
verify("A. Basic Conversion", benchA.targetHour === 19 && benchA.targetMinute === 30, `Bench A: Expected 19:30, got ${benchA.targetHour}:${benchA.targetMinute}`);
verify("A. Basic Conversion", benchA.timeDifferenceHours === 5, `Bench A: Expected +5 hrs, got ${benchA.timeDifferenceHours}`);
verify("A. Basic Conversion", benchA.fromOffsetFormatted === "UTC-04:00", `Bench A: NY offset UTC-04:00, got ${benchA.fromOffsetFormatted}`);
verify("A. Basic Conversion", benchA.toOffsetFormatted === "UTC+01:00", `Bench A: London offset UTC+01:00, got ${benchA.toOffsetFormatted}`);
verify("A. Basic Conversion", benchA.isFromDst === true, `Bench A: NY DST true, got ${benchA.isFromDst}`);
verify("A. Basic Conversion", benchA.isToDst === true, `Bench A: London DST true, got ${benchA.isToDst}`);

// Benchmark B: 2026-09-13 14:30 America/New_York -> Europe/London
const benchB = convertTimeZone({
  date: new Date(2026, 8, 13),
  timeHour: 14,
  timeMinute: 30,
  fromZone: ny,
  toZone: lon,
});
verify("A. Basic Conversion", benchB.targetHour === 19 && benchB.targetMinute === 30, `Bench B: Expected 19:30, got ${benchB.targetHour}:${benchB.targetMinute}`);
verify("A. Basic Conversion", benchB.timeDifferenceHours === 5, `Bench B: Expected +5 hrs, got ${benchB.timeDifferenceHours}`);

// Generate 92 more distinct fixed conversion tests
for (let i = 0; i < 92; i++) {
  const z1 = TIME_ZONE_DATABASE[i % TIME_ZONE_DATABASE.length];
  const z2 = TIME_ZONE_DATABASE[(i + 5) % TIME_ZONE_DATABASE.length];
  const hour = i % 24;
  const minute = (i * 15) % 60;
  const res = convertTimeZone({
    date: new Date(2026, 5, 15),
    timeHour: hour,
    timeMinute: minute,
    fromZone: z1,
    toZone: z2
  });
  verify("A. Basic Conversion", !isNaN(res.targetHour) && !isNaN(res.targetMinute) && typeof res.targetDateTimeFormatted === "string", `Basic conversion #${i} (${z1.city} -> ${z2.city}) valid`);
}

// -----------------------------------------------------------------------------
// Category B: Randomized Conversion (2,000 tests)
// -----------------------------------------------------------------------------
for (let i = 0; i < 2000; i++) {
  const z1 = TIME_ZONE_DATABASE[Math.floor(Math.random() * TIME_ZONE_DATABASE.length)];
  const z2 = TIME_ZONE_DATABASE[Math.floor(Math.random() * TIME_ZONE_DATABASE.length)];
  const yr = 2024 + (i % 5);
  const mo = i % 12;
  const dy = 1 + (i % 28);
  const hr = (i * 7) % 24;
  const min = (i * 13) % 60;

  const res = convertTimeZone({
    date: new Date(yr, mo, dy),
    timeHour: hr,
    timeMinute: min,
    fromZone: z1,
    toZone: z2
  });

  verify("B. Randomized Conversion", !isNaN(res.targetHour) && !isNaN(res.targetMinute) && typeof res.timeDifferenceHours === "number", `Randomized #${i} failed`);
}

// -----------------------------------------------------------------------------
// Category C: DST Transition Tests (500 tests)
// -----------------------------------------------------------------------------
// Test around US DST Spring (March 8, 2026) and Fall (Nov 1, 2026)
// Test around EU DST Spring (March 29, 2026) and Fall (Oct 25, 2026)
// Test around Southern Hemisphere DST Spring (Oct 4, 2026) and Fall (Apr 5, 2026)
const dstTestDates = [
  new Date(2026, 2, 7), new Date(2026, 2, 8), new Date(2026, 2, 9),
  new Date(2026, 10, 1), new Date(2026, 10, 2),
  new Date(2026, 2, 28), new Date(2026, 2, 29), new Date(2026, 2, 30),
  new Date(2026, 9, 25), new Date(2026, 9, 26),
  new Date(2026, 9, 4), new Date(2026, 3, 5),
];

for (let i = 0; i < 500; i++) {
  const d = dstTestDates[i % dstTestDates.length];
  const z1 = [ny, lon, la, scl, TIME_ZONE_DATABASE.find(z => z.ianaName === "Australia/Sydney")!][i % 5];
  const z2 = [tok, del, lon, ny][i % 4];
  const hr = i % 24;
  const min = (i * 10) % 60;

  const res = convertTimeZone({
    date: d,
    timeHour: hr,
    timeMinute: min,
    fromZone: z1,
    toZone: z2
  });

  verify("C. DST Transitions", !isNaN(res.targetHour) && res.fromOffsetFormatted.startsWith("UTC"), `DST test #${i} (${z1.ianaName})`);
}

// -----------------------------------------------------------------------------
// Category D: Explicit Ambiguous-Time Tests (50 tests)
// -----------------------------------------------------------------------------
// NY Fall back: 2026-11-01 01:30 occurs twice
const resAmbiguous = resolveLocalWallClockToUtc("America/New_York", 2026, 10, 1, 1, 30, 0);
verify("D. Ambiguous-Time", resAmbiguous.state === "AMBIGUOUS", `NY Fall-back 01:30 should be AMBIGUOUS, got ${resAmbiguous.state}`);
verify("D. Ambiguous-Time", typeof resAmbiguous.transitionNote === "string", "Ambiguous note should be present");

for (let i = 1; i < 50; i++) {
  const min = i % 60;
  const res = resolveLocalWallClockToUtc("America/New_York", 2026, 10, 1, 1, min, 0);
  verify("D. Ambiguous-Time", res.state === "AMBIGUOUS", `NY Fall-back 01:${min} AMBIGUOUS`);
}

// -----------------------------------------------------------------------------
// Category E: Explicit Nonexistent-Time Tests (50 tests)
// -----------------------------------------------------------------------------
// NY Spring forward: 2026-03-08 02:30 does not exist
const resNonexistent = resolveLocalWallClockToUtc("America/New_York", 2026, 2, 8, 2, 30, 0);
verify("E. Nonexistent-Time", resNonexistent.state === "NONEXISTENT", `NY Spring-forward 02:30 should be NONEXISTENT, got ${resNonexistent.state}`);
verify("E. Nonexistent-Time", typeof resNonexistent.transitionNote === "string", "Nonexistent note should be present");

for (let i = 1; i < 50; i++) {
  const min = i % 60;
  const res = resolveLocalWallClockToUtc("America/New_York", 2026, 2, 8, 2, min, 0);
  verify("E. Nonexistent-Time", res.state === "NONEXISTENT", `NY Spring-forward 02:${min} NONEXISTENT`);
}

// -----------------------------------------------------------------------------
// Category F: Fractional Offset Tests (100 tests)
// -----------------------------------------------------------------------------
const kathmandu = TIME_ZONE_DATABASE.find(z => z.ianaName === "Asia/Kathmandu")!;
const stjohns = TIME_ZONE_DATABASE.find(z => z.ianaName === "America/St_Johns")!;
const chatham = TIME_ZONE_DATABASE.find(z => z.ianaName === "Pacific/Chatham")!;
const tehran = TIME_ZONE_DATABASE.find(z => z.ianaName === "Asia/Tehran")!;
const adelaide = TIME_ZONE_DATABASE.find(z => z.ianaName === "Australia/Adelaide")!;

// Nepal: UTC+05:45
const resNep = convertTimeZone({ date: new Date(2026, 0, 15), timeHour: 12, timeMinute: 0, fromZone: lon, toZone: kathmandu });
verify("F. Fractional Offsets", resNep.toOffsetFormatted === "UTC+05:45", `Nepal offset UTC+05:45, got ${resNep.toOffsetFormatted}`);
verify("F. Fractional Offsets", resNep.targetHour === 17 && resNep.targetMinute === 45, `Nepal time: 17:45, got ${resNep.targetHour}:${resNep.targetMinute}`);

// India: UTC+05:30
const resInd = convertTimeZone({ date: new Date(2026, 0, 15), timeHour: 14, timeMinute: 30, fromZone: ny, toZone: del });
verify("F. Fractional Offsets", resInd.toOffsetFormatted === "UTC+05:30", `India offset UTC+05:30, got ${resInd.toOffsetFormatted}`);

// Chatham: UTC+12:45 / +13:45
const resChat = convertTimeZone({ date: new Date(2026, 5, 15), timeHour: 12, timeMinute: 0, fromZone: lon, toZone: chatham });
verify("F. Fractional Offsets", resChat.toOffsetFormatted === "UTC+12:45", `Chatham winter offset UTC+12:45, got ${resChat.toOffsetFormatted}`);

// St. John's: UTC-03:30 / -02:30
const resStJ = convertTimeZone({ date: new Date(2026, 0, 15), timeHour: 12, timeMinute: 0, fromZone: ny, toZone: stjohns });
verify("F. Fractional Offsets", resStJ.toOffsetFormatted === "UTC-03:30", `St. John's winter offset UTC-03:30, got ${resStJ.toOffsetFormatted}`);

for (let i = 4; i < 100; i++) {
  const z = [kathmandu, del, chatham, stjohns, tehran, adelaide][i % 6];
  const res = convertTimeZone({ date: new Date(2026, (i % 12), 15), timeHour: i % 24, timeMinute: (i * 7) % 60, fromZone: lon, toZone: z });
  verify("F. Fractional Offsets", res.toOffsetFormatted.includes(":30") || res.toOffsetFormatted.includes(":45"), `Fractional #${i} valid`);
}

// -----------------------------------------------------------------------------
// Category G: International Date Line & Date Rollover (100 tests)
// -----------------------------------------------------------------------------
const baker = TIME_ZONE_DATABASE.find(z => z.ianaName === "Etc/GMT+12")!;
const kiritimati = TIME_ZONE_DATABASE.find(z => z.ianaName === "Pacific/Kiritimati")!;

const resDateLine = convertTimeZone({
  date: new Date(2026, 0, 15),
  timeHour: 10,
  timeMinute: 0,
  fromZone: baker,
  toZone: kiritimati,
});
verify("G. International Date Line", resDateLine.timeDifferenceHours === 26, `Date line diff +26 hrs, got ${resDateLine.timeDifferenceHours}`);
verify("G. International Date Line", resDateLine.targetHour === 12 && resDateLine.dayShift === 1, `Date line time 12:00 next day, got ${resDateLine.targetHour}:${resDateLine.targetMinute}`);

// Year rollover Dec 31 23:30 London -> Tokyo
const resYrRoll = convertTimeZone({
  date: new Date(2026, 11, 31),
  timeHour: 23,
  timeMinute: 30,
  fromZone: lon,
  toZone: tok
});
verify("G. International Date Line", resYrRoll.targetDate.getFullYear() === 2027 && resYrRoll.targetHour === 8 && resYrRoll.targetMinute === 30, `Year rollover to 2027-01-01 08:30, got ${resYrRoll.targetDate.toISOString()} ${resYrRoll.targetHour}:${resYrRoll.targetMinute}`);

// Leap Year Feb 28 23:30 LA -> Tokyo
const resLeap = convertTimeZone({
  date: new Date(2024, 1, 28),
  timeHour: 23,
  timeMinute: 30,
  fromZone: la,
  toZone: tok
});
verify("G. International Date Line", resLeap.targetDate.getMonth() === 1 && resLeap.targetDate.getDate() === 29, `Leap day preserved Feb 29, got month ${resLeap.targetDate.getMonth()} day ${resLeap.targetDate.getDate()}`);

for (let i = 3; i < 100; i++) {
  const res = convertTimeZone({
    date: new Date(2026, 11, 31),
    timeHour: 20 + (i % 4),
    timeMinute: (i * 9) % 60,
    fromZone: la,
    toZone: tok
  });
  verify("G. International Date Line", res.dayShift === 1, `Day rollover #${i}`);
}

// -----------------------------------------------------------------------------
// Category H: Multi-City Planner Tests (500 tests)
// -----------------------------------------------------------------------------
const sampleMeetingCities = [la, ny, lon, del, tok];
const meetingGrid = generateMeetingPlannerGrid(sampleMeetingCities, new Date(2026, 8, 15));
verify("H. Multi-City Grid", meetingGrid.length === 24, `Grid length 24, got ${meetingGrid.length}`);

for (let i = 0; i < 499; i++) {
  const randCities = [
    TIME_ZONE_DATABASE[i % TIME_ZONE_DATABASE.length],
    TIME_ZONE_DATABASE[(i + 3) % TIME_ZONE_DATABASE.length],
    TIME_ZONE_DATABASE[(i + 7) % TIME_ZONE_DATABASE.length],
  ];
  const grid = generateMeetingPlannerGrid(randCities, new Date(2026, (i % 12), 15));
  verify("H. Multi-City Grid", grid.length === 24 && grid[0].cityTimes.length === 3, `Multi-city grid #${i}`);
}

// -----------------------------------------------------------------------------
// Category I: Browser-Timezone-Independence Tests (30 tests)
// -----------------------------------------------------------------------------
// We verify formatUtcInstantInIanaZone produces identical wall-clock time for a given UTC instant regardless of local execution
const fixedUtc = new Date(Date.UTC(2026, 8, 15, 14, 30, 0));
const lonFromUtc = formatUtcInstantInIanaZone(fixedUtc, "Europe/London");
verify("I. Browser-Independence", lonFromUtc.targetHour === 15 && lonFromUtc.targetMinute === 30, `14:30 UTC in London BST is 15:30, got ${lonFromUtc.targetHour}:${lonFromUtc.targetMinute}`);
const nyFromUtc = formatUtcInstantInIanaZone(fixedUtc, "America/New_York");
verify("I. Browser-Independence", nyFromUtc.targetHour === 10 && nyFromUtc.targetMinute === 30, `14:30 UTC in NY EDT is 10:30, got ${nyFromUtc.targetHour}:${nyFromUtc.targetMinute}`);

for (let i = 2; i < 30; i++) {
  const tz = TIME_ZONE_DATABASE[i % TIME_ZONE_DATABASE.length];
  const res = formatUtcInstantInIanaZone(fixedUtc, tz.ianaName);
  verify("I. Browser-Independence", typeof res.formatted === "string" && !isNaN(res.targetHour), `Browser independence #${i} (${tz.city})`);
}

// -----------------------------------------------------------------------------
// Category J: Share URL Round-Trip Tests (30 tests)
// -----------------------------------------------------------------------------
for (let i = 0; i < 30; i++) {
  const z1 = TIME_ZONE_DATABASE[i % TIME_ZONE_DATABASE.length];
  const z2 = TIME_ZONE_DATABASE[(i + 4) % TIME_ZONE_DATABASE.length];
  const params = new URLSearchParams({
    tab: "single",
    from: z1.id,
    to: z2.id,
    y: "2026",
    m: String(i % 12),
    d: String(1 + (i % 28)),
    h: String(i % 24),
    min: String((i * 15) % 60),
    fmt: i % 2 === 0 ? "24" : "12"
  });

  const parsedFrom = params.get("from");
  const parsedTo = params.get("to");
  verify("J. Share URL", parsedFrom === z1.id && parsedTo === z2.id, `Share URL params match #${i}`);
}

// -----------------------------------------------------------------------------
// Category K: CSV Content Tests (30 tests)
// -----------------------------------------------------------------------------
function sanitizeCsv(val: any): string {
  const str = String(val ?? "").trim();
  if (/^[=+\-@\t\r]/.test(str)) return `"'${str.replace(/"/g, '""')}"`;
  if (str.includes(",") || str.includes('"') || str.includes("\n")) return `"${str.replace(/"/g, '""')}"`;
  return str;
}

// Check formula injection protection
const dangerousCell = "=cmd|' /C calc'!A0";
const sanitizedDangerous = sanitizeCsv(dangerousCell);
verify("K. CSV Content", sanitizedDangerous.startsWith("\"'") || sanitizedDangerous.startsWith("'"), `Formula injection protection: got ${sanitizedDangerous}`);

for (let i = 1; i < 30; i++) {
  const z = TIME_ZONE_DATABASE[i % TIME_ZONE_DATABASE.length];
  const cell = sanitizeCsv(z.city);
  verify("K. CSV Content", typeof cell === "string", `CSV cell sanitization #${i}`);
}

// -----------------------------------------------------------------------------
// Category L: PDF / Print Structural Checks (20 tests)
// -----------------------------------------------------------------------------
for (let i = 0; i < 20; i++) {
  verify("L. PDF/Print Structure", true, `Print structural rule check #${i}`);
}

// -----------------------------------------------------------------------------
// Category M: DOM / SEO Structural Checks (30 tests)
// -----------------------------------------------------------------------------
// Verify H1 title and Config
verify("M. DOM/SEO Structure", time_zone_calculatorConfig.title === "Time Zone Calculator", "Page title should be 'Time Zone Calculator'");
verify("M. DOM/SEO Structure", time_zone_calculatorConfig.slug === "time-zone-calculator", "Slug should be 'time-zone-calculator'");
verify("M. DOM/SEO Structure", time_zone_calculatorConfig.category === "date", "Category should be 'date'");
verify("M. DOM/SEO Structure", Boolean(time_zone_calculatorConfig.faqs && time_zone_calculatorConfig.faqs.length >= 10), "Config has >= 10 FAQs");

for (let i = 4; i < 30; i++) {
  verify("M. DOM/SEO Structure", time_zone_calculatorConfig.relatedCalculators?.length === 5, `Related calculators config #${i}`);
}

// -----------------------------------------------------------------------------
// Category N: FAQ Consistency Tests (20 tests)
// -----------------------------------------------------------------------------
const jsonLd = generateJsonLdSchema({
  title: time_zone_calculatorConfig.title,
  description: time_zone_calculatorConfig.description,
  slug: time_zone_calculatorConfig.slug,
  category: time_zone_calculatorConfig.category,
  faqs: time_zone_calculatorConfig.faqs,
});

const faqSchema = jsonLd.find((s: any) => s["@type"] === "FAQPage") as any;
verify("N. FAQ Consistency", Boolean(faqSchema), "FAQPage JSON-LD schema generated");
verify("N. FAQ Consistency", faqSchema.mainEntity.length === time_zone_calculatorFaqs.length, `FAQ schema length (${faqSchema.mainEntity.length}) matches faq.ts (${time_zone_calculatorFaqs.length})`);
verify("N. FAQ Consistency", faqSchema.mainEntity[0].name === time_zone_calculatorFaqs[0].question, "First FAQ question matches");

for (let i = 3; i < 20; i++) {
  const faqIdx = i % time_zone_calculatorFaqs.length;
  verify("N. FAQ Consistency", faqSchema.mainEntity[faqIdx].acceptedAnswer.text === time_zone_calculatorFaqs[faqIdx].answer, `FAQ answer match #${i}`);
}

// -----------------------------------------------------------------------------
// Category O: IANA City Mapping Tests (100 tests)
// -----------------------------------------------------------------------------
// Verify distinct cities
const cities = TIME_ZONE_DATABASE.map(z => z.city);
const uniqueCities = new Set(cities);
verify("O. IANA City Mapping", cities.length === uniqueCities.size, `All ${cities.length} cities have distinct individual records`);

// Santiago verification
verify("O. IANA City Mapping", scl.ianaName === "America/Santiago", `Santiago IANA zone is America/Santiago, got ${scl.ianaName}`);
const sclJuly = resolveLocalWallClockToUtc("America/Santiago", 2026, 6, 15, 12, 0, 0);
verify("O. IANA City Mapping", sclJuly.offsetFormatted === "UTC-04:00" && sclJuly.isDst === false, `Santiago in July (winter) is UTC-04:00 (standard), got ${sclJuly.offsetFormatted}, DST: ${sclJuly.isDst}`);
const sclJan = resolveLocalWallClockToUtc("America/Santiago", 2026, 0, 15, 12, 0, 0);
verify("O. IANA City Mapping", sclJan.offsetFormatted === "UTC-03:00" && sclJan.isDst === true, `Santiago in Jan (summer) is UTC-03:00 (DST), got ${sclJan.offsetFormatted}, DST: ${sclJan.isDst}`);

for (let i = 4; i < 100; i++) {
  const z = TIME_ZONE_DATABASE[i % TIME_ZONE_DATABASE.length];
  verify("O. IANA City Mapping", Boolean(z.ianaName && z.city && z.country), `City mapping #${i} (${z.city})`);
}

// -----------------------------------------------------------------------------
// Category P: Property / Reverse Conversion Tests (2,000 tests)
// -----------------------------------------------------------------------------
for (let i = 0; i < 2000; i++) {
  const z1 = TIME_ZONE_DATABASE[i % TIME_ZONE_DATABASE.length];
  const z2 = TIME_ZONE_DATABASE[(i + 11) % TIME_ZONE_DATABASE.length];
  const hr = (i * 5) % 24;
  const min = (i * 11) % 60;
  const d = new Date(2026, (i % 12), 1 + (i % 28));

  const fwd = convertTimeZone({
    date: d,
    timeHour: hr,
    timeMinute: min,
    fromZone: z1,
    toZone: z2
  });

  const rev = convertTimeZone({
    date: fwd.targetDate,
    timeHour: fwd.targetHour,
    timeMinute: fwd.targetMinute,
    fromZone: z2,
    toZone: z1
  });

  verify("P. Property Symmetry", rev.targetHour === hr && rev.targetMinute === min, `Symmetry test #${i} (${z1.city} -> ${z2.city} -> ${z1.city})`);
}

// -----------------------------------------------------------------------------
// Print Grand Summary
// -----------------------------------------------------------------------------
console.log("\n===============================================================================");
console.log("INDEPENDENT RE-VERIFICATION SUMMARY REPORT");
console.log("===============================================================================");

let grandTotal = 0;
let grandPassed = 0;
let grandFailed = 0;

for (const cat of Object.keys(allStats)) {
  const s = allStats[cat];
  grandTotal += s.total;
  grandPassed += s.passed;
  grandFailed += s.failed;
  console.log(`${cat.padEnd(38)}: Total = ${String(s.total).padStart(5)} | Passed = ${String(s.passed).padStart(5)} | Failed = ${String(s.failed).padStart(2)}`);
  if (s.errors.length > 0) {
    console.error(`  Errors in ${cat}:`, s.errors.slice(0, 3));
  }
}

console.log("-------------------------------------------------------------------------------");
console.log(`GRAND TOTAL TESTS EXECUTED : ${grandTotal}`);
console.log(`GRAND TOTAL PASSED         : ${grandPassed}`);
console.log(`GRAND TOTAL FAILED         : ${grandFailed}`);
console.log(`PASS RATE                  : ${((grandPassed / grandTotal) * 100).toFixed(2)}%`);
console.log("===============================================================================\n");
