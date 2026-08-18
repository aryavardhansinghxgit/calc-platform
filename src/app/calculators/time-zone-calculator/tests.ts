import { calculateTimeZoneCalculator } from "./calculator";
import {
  convertTimeZone,
  isDaylightSavingTime,
  generateMeetingPlannerGrid,
  TIME_ZONE_DATABASE,
} from "@/lib/calculator-engine/formulas/time-zone";

export function runTimeZoneCalculatorTests() {
  const ny = TIME_ZONE_DATABASE.find((z) => z.id === "utc-5")!;
  const london = TIME_ZONE_DATABASE.find((z) => z.id === "utc-0-gmt")!;
  const tokyo = TIME_ZONE_DATABASE.find((z) => z.id === "utc-9-jst")!;
  const india = TIME_ZONE_DATABASE.find((z) => z.id === "utc-5-30")!;

  // Test 1: NY (Winter UTC-5) to London (Winter UTC 0)
  const winterDate = new Date(2026, 0, 15); // Jan 15 (No DST)
  const resWinter = convertTimeZone({
    date: winterDate,
    timeHour: 14,
    timeMinute: 30,
    fromZone: ny,
    toZone: london,
    autoDst: true,
  });
  if (resWinter.targetHour !== 19 || resWinter.targetMinute !== 30 || resWinter.timeDifferenceHours !== 5) {
    throw new Error(`Expected 19:30 (+5h), got ${resWinter.targetHour}:${resWinter.targetMinute} (${resWinter.timeDifferenceHours}h)`);
  }

  // Test 2: Summer DST test (July 15: NY EDT UTC-4 to London BST UTC+1 -> 5 hours diff)
  const summerDate = new Date(2026, 6, 15); // July 15
  if (!isDaylightSavingTime(summerDate, "US")) throw new Error("Expected US DST to be active in July");
  if (!isDaylightSavingTime(summerDate, "EU")) throw new Error("Expected EU DST to be active in July");

  const resSummer = convertTimeZone({
    date: summerDate,
    timeHour: 14,
    timeMinute: 30,
    fromZone: ny,
    toZone: london,
    autoDst: true,
  });
  if (resSummer.targetHour !== 19 || resSummer.targetMinute !== 30) {
    throw new Error(`Expected 19:30 BST, got ${resSummer.targetHour}:${resSummer.targetMinute}`);
  }

  // Test 3: Fractional-Hour Timezone (NY 14:00 to India UTC+5:30 -> in Winter diff is 10.5 hours -> 00:30 next day)
  const resIndia = convertTimeZone({
    date: winterDate,
    timeHour: 14,
    timeMinute: 0,
    fromZone: ny,
    toZone: india,
    autoDst: false,
  });
  if (resIndia.targetHour !== 0 || resIndia.targetMinute !== 30 || resIndia.dayShift !== 1) {
    throw new Error(`Expected 00:30 (+1 Day) in India, got ${resIndia.targetHour}:${resIndia.targetMinute} (dayShift: ${resIndia.dayShift})`);
  }

  // Test 4: Meeting Planner Grid generates 24 hours
  const grid = generateMeetingPlannerGrid([ny, london, tokyo], winterDate, false);
  if (grid.length !== 24) throw new Error(`Expected 24 meeting slots, got ${grid.length}`);

  // Test 5: Default input harness
  const defaultInputs = {
    timeStr: "12:00",
    fromOffset: -5,
    toOffset: 1,
  };
  const resHarness = calculateTimeZoneCalculator(defaultInputs);
  if (!resHarness || typeof resHarness !== "object") throw new Error("Formula failed for default inputs");

  return true;
}
