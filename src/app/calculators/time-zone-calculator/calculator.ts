import { TimeZoneCalculatorOutputs } from "./types";

export function calculateTimeZoneCalculator(inputs: Record<string, any>): TimeZoneCalculatorOutputs {
  const parts = String(inputs.timeStr || "12:00").split(":").map(Number);
  const hrs = parts[0] || 12;
  const mins = parts[1] || 0;
  const fromOff = Number(inputs.fromOffset) || -5;
  const toOff = Number(inputs.toOffset) || 1;
  const diff = toOff - fromOff;
  let newHrs = (hrs + diff) % 24;
  if (newHrs < 0) newHrs += 24;
  const hStr = Math.floor(newHrs).toString().padStart(2, "0");
  const mStr = mins.toString().padStart(2, "0");
  return { convertedTime: `${hStr}:${mStr}`, timeDiffHours: diff };
}
