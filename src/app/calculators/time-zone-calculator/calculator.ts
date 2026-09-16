import {
  convertTimeZone,
  TIME_ZONE_DATABASE,
  TimeZoneDefinition,
} from "@/lib/calculator-engine/formulas/time-zone";
import { TimeZoneCalculatorOutputs } from "./types";

export function calculateTimeZoneCalculator(inputs: Record<string, any>): TimeZoneCalculatorOutputs {
  const parts = String(inputs.timeStr || "14:30").split(":").map(Number);
  const hrs = isNaN(parts[0]) ? 14 : parts[0];
  const mins = isNaN(parts[1]) ? 30 : parts[1];

  const fromOff = Number(inputs.fromOffset);
  const toOff = Number(inputs.toOffset);

  // Map offsets to matching or custom IANA zones
  const customFrom: TimeZoneDefinition = {
    id: "custom-from",
    name: `UTC${fromOff >= 0 ? "+" : ""}${fromOff}`,
    city: "Origin",
    country: "Custom",
    ianaName: fromOff === -5 ? "America/New_York" : fromOff === -8 ? "America/Los_Angeles" : "UTC",
    region: "Americas",
  };

  const customTo: TimeZoneDefinition = {
    id: "custom-to",
    name: `UTC${toOff >= 0 ? "+" : ""}${toOff}`,
    city: "Destination",
    country: "Custom",
    ianaName: toOff === 0 ? "Europe/London" : toOff === 1 ? "Europe/Paris" : "UTC",
    region: "Europe",
  };

  const result = convertTimeZone({
    date: new Date(),
    timeHour: hrs,
    timeMinute: mins,
    fromZone: customFrom,
    toZone: customTo,
  });

  return {
    convertedTime: result.targetDateTimeFormatted,
    timeDiffHours: result.timeDifferenceHours,
  };
}
