import {
  TIME_ZONE_DATABASE,
  convertTimeZone,
  isDaylightSavingTime,
  getActiveOffsetMinutes,
  generateMeetingPlannerGrid
} from "../src/lib/calculator-engine/formulas/time-zone";

console.log("=== TIME ZONE ENGINE AUDIT ===");

// Benchmark A: 2026-09-15 14:30 America/New_York -> Europe/London
const ny = TIME_ZONE_DATABASE.find(z => z.id === "utc-5")!;
const london = TIME_ZONE_DATABASE.find(z => z.id === "utc-0-gmt")!;

const benchA = convertTimeZone({
  date: new Date(2026, 8, 15), // Month 8 = September
  timeHour: 14,
  timeMinute: 30,
  fromZone: ny,
  toZone: london,
  autoDst: true,
});

console.log("Benchmark A (2026-09-15 14:30 NY -> London):", {
  source: benchA.sourceDateTimeFormatted,
  target: benchA.targetDateTimeFormatted,
  diff: benchA.timeDifferenceFormatted,
  fromOffset: benchA.fromOffsetFormatted,
  toOffset: benchA.toOffsetFormatted,
  isFromDst: benchA.isFromDst,
  isToDst: benchA.isToDst,
});

// Benchmark B: 2026-09-13 14:30
const benchB = convertTimeZone({
  date: new Date(2026, 8, 13),
  timeHour: 14,
  timeMinute: 30,
  fromZone: ny,
  toZone: london,
  autoDst: true,
});

console.log("Benchmark B (2026-09-13 14:30 NY -> London):", {
  source: benchB.sourceDateTimeFormatted,
  target: benchB.targetDateTimeFormatted,
  diff: benchB.timeDifferenceFormatted,
});

// Check IANA native Intl offsets vs engine offsets
function getIntlOffset(timeZone: string, date: Date) {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "longOffset",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const parts = formatter.formatToParts(date);
  const tzName = parts.find(p => p.type === "timeZoneName")?.value || "";
  return tzName;
}

console.log("Intl NY 2026-09-15:", getIntlOffset("America/New_York", new Date(2026, 8, 15, 14, 30)));
console.log("Intl London 2026-09-15:", getIntlOffset("Europe/London", new Date(2026, 8, 15, 14, 30)));

// Test Santiago DST issue in engine
const santiago = TIME_ZONE_DATABASE.find(z => z.id === "utc-4-scl")!;
console.log("Santiago in DB:", santiago);
const santiagoJuly = getActiveOffsetMinutes(santiago, new Date(2026, 6, 15), true);
console.log("Engine Santiago July offset (Winter in Chile!):", santiagoJuly);
console.log("Intl Santiago July offset:", getIntlOffset("America/Santiago", new Date(2026, 6, 15, 12, 0)));

// Test Spring forward boundary (US: March 8, 2026 at 2:00 AM -> 3:00 AM)
const usSpringDay = new Date(2026, 2, 8); // March 8, 2026
console.log("March 8 2026 is DST in US according to engine?", isDaylightSavingTime(usSpringDay, "US"));
