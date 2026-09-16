// Prototype of the high-precision dynamic IANA engine

export interface IanaTimeResolution {
  utcDate: Date;
  offsetMinutes: number;
  offsetFormatted: string;
  isDst: boolean;
  timeZoneAbbr: string;
  state: "VALID" | "AMBIGUOUS" | "NONEXISTENT";
  disambiguationNote?: string;
}

export function getOffsetMinutesFromParts(timeZone: string, date: Date): { offsetMinutes: number; abbr: string } {
  // Use Intl with timeZoneName: 'shortOffset' or 'longOffset'
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "shortOffset",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false
  });
  
  const parts = dtf.formatToParts(date);
  const tzPart = parts.find(p => p.type === "timeZoneName")?.value || ""; // "GMT-4", "GMT+5:30", "GMT"
  
  let offsetMinutes = 0;
  if (tzPart.includes("GMT") || tzPart.includes("UTC")) {
    const match = tzPart.match(/([+-])(\d+)(?::(\d+))?/);
    if (match) {
      const sign = match[1] === "+" ? 1 : -1;
      const h = parseInt(match[2], 10);
      const m = match[3] ? parseInt(match[3], 10) : 0;
      offsetMinutes = sign * (h * 60 + m);
    }
  }

  // Get short abbreviation if available
  const dtfAbbr = new Intl.DateTimeFormat("en-US", {
    timeZone,
    timeZoneName: "short",
  });
  const abbr = dtfAbbr.formatToParts(date).find(p => p.type === "timeZoneName")?.value || tzPart;

  return { offsetMinutes, abbr };
}

export function formatOffsetString(offsetMinutes: number): string {
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `UTC${sign}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export function resolveLocalToUtc(
  timeZone: string,
  year: number,
  month: number, // 0-11
  day: number,
  hour: number,
  minute: number,
  second: number = 0,
  fold: 0 | 1 = 0 // 0 = earlier/standard, 1 = later
): IanaTimeResolution {
  // Step 1: Initial UTC guess
  const guessUtc = Date.UTC(year, month, day, hour, minute, second);
  
  // Helper to get local wall-clock components for a UTC timestamp in this zone
  const getLocal = (utcMs: number) => {
    const d = new Date(utcMs);
    const dtf = new Intl.DateTimeFormat("en-US", {
      timeZone,
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false
    });
    const p = dtf.formatToParts(d);
    const getVal = (type: string) => parseInt(p.find(x => x.type === type)?.value || "0", 10);
    const yr = getVal("year");
    const mo = getVal("month") - 1; // 0-indexed
    const dy = getVal("day");
    let hr = getVal("hour");
    if (hr === 24) hr = 0; // Some engines return 24:00 for midnight
    const min = getVal("minute");
    const sec = getVal("second");
    const localMs = Date.UTC(yr, mo, dy, hr, min, sec);
    return { yr, mo, dy, hr, min, sec, localMs };
  };

  const l0 = getLocal(guessUtc);
  const targetMs = Date.UTC(year, month, day, hour, minute, second);
  const diffMs = targetMs - l0.localMs;
  let resolvedUtc = guessUtc + diffMs;

  let l1 = getLocal(resolvedUtc);

  // Check if l1 matches target
  let state: "VALID" | "AMBIGUOUS" | "NONEXISTENT" = "VALID";
  let disambiguationNote: string | undefined = undefined;

  if (l1.localMs !== targetMs) {
    // Non-existent time (e.g. spring forward 2:30 AM)
    state = "NONEXISTENT";
    disambiguationNote = `Local time ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} does not exist in ${timeZone} due to DST spring-forward (clock skipped forward). Auto-adjusted to next valid instant.`;
  } else {
    // Check for ambiguity (fall back) by testing candidate offsets +/- 1 hour
    const candidateEarlier = resolvedUtc - 3600000;
    const candidateLater = resolvedUtc + 3600000;
    const lEarlier = getLocal(candidateEarlier);
    const lLater = getLocal(candidateLater);

    if (lEarlier.localMs === targetMs || lLater.localMs === targetMs) {
      state = "AMBIGUOUS";
      if (fold === 1 && lLater.localMs === targetMs) {
        resolvedUtc = candidateLater;
      }
      disambiguationNote = `Local time ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} occurs twice in ${timeZone} due to DST fall-back. Deterministically evaluated using standard offset.`;
    }
  }

  const { offsetMinutes, abbr } = getOffsetMinutesFromParts(timeZone, new Date(resolvedUtc));

  // Determine isDst by checking if offset differs from standard winter offset
  const janOffset = getOffsetMinutesFromParts(timeZone, new Date(Date.UTC(year, 0, 15, 12, 0, 0))).offsetMinutes;
  const julOffset = getOffsetMinutesFromParts(timeZone, new Date(Date.UTC(year, 6, 15, 12, 0, 0))).offsetMinutes;
  const isDst = offsetMinutes !== Math.min(janOffset, julOffset);

  return {
    utcDate: new Date(resolvedUtc),
    offsetMinutes,
    offsetFormatted: formatOffsetString(offsetMinutes),
    isDst,
    timeZoneAbbr: abbr,
    state,
    disambiguationNote
  };
}

// Convert UTC instant to target zone
export function formatUtcInZone(
  utcDate: Date,
  timeZone: string
) {
  const dtf = new Intl.DateTimeFormat("en-US", {
    timeZone,
    year: "numeric",
    month: "numeric",
    day: "numeric",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false
  });

  const parts = dtf.formatToParts(utcDate);
  const getVal = (type: string) => parseInt(parts.find(x => x.type === type)?.value || "0", 10);
  const weekday = parts.find(x => x.type === "weekday")?.value || "";
  const year = getVal("year");
  const month = getVal("month") - 1;
  const day = getVal("day");
  let hour = getVal("hour");
  if (hour === 24) hour = 0;
  const minute = getVal("minute");
  const second = getVal("second");

  const { offsetMinutes, abbr } = getOffsetMinutesFromParts(timeZone, utcDate);
  
  const janOffset = getOffsetMinutesFromParts(timeZone, new Date(Date.UTC(year, 0, 15, 12, 0, 0))).offsetMinutes;
  const julOffset = getOffsetMinutesFromParts(timeZone, new Date(Date.UTC(year, 6, 15, 12, 0, 0))).offsetMinutes;
  const isDst = offsetMinutes !== Math.min(janOffset, julOffset);

  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;

  const formatted = `${weekday}, ${MONTH_NAMES[month]} ${day}, ${year} at ${h12}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")} ${ampm} (${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")})`;

  return {
    targetDate: new Date(year, month, day),
    targetYear: year,
    targetMonth: month,
    targetDay: day,
    targetHour: hour,
    targetMinute: minute,
    targetSecond: second,
    targetWeekday: weekday,
    offsetMinutes,
    offsetFormatted: formatOffsetString(offsetMinutes),
    isDst,
    timeZoneAbbr: abbr,
    formatted
  };
}

console.log("Testing prototype engine...");

// Test Benchmark A: 2026-09-15 14:30 America/New_York -> Europe/London
const resA = resolveLocalToUtc("America/New_York", 2026, 8, 15, 14, 30, 0);
console.log("Benchmark A Origin (NY):", resA);
const resALondon = formatUtcInZone(resA.utcDate, "Europe/London");
console.log("Benchmark A Destination (London):", resALondon);

// Test Spring forward nonexistent time in NY: 2026-03-08 02:30 (Clocks jump from 02:00 to 03:00)
const resSpring = resolveLocalToUtc("America/New_York", 2026, 2, 8, 2, 30, 0);
console.log("Spring forward 02:30 in NY:", resSpring);

// Test Fall back ambiguous time in NY: 2026-11-01 01:30 (Clocks repeat 01:00-02:00)
const resFall = resolveLocalToUtc("America/New_York", 2026, 10, 1, 1, 30, 0);
console.log("Fall back 01:30 in NY:", resFall);

// Test Santiago in July (Winter in Chile!) vs January (Summer in Chile!)
const resSclJul = resolveLocalToUtc("America/Santiago", 2026, 6, 15, 12, 0, 0);
console.log("Santiago July:", resSclJul.offsetFormatted, "isDst:", resSclJul.isDst);
const resSclJan = resolveLocalToUtc("America/Santiago", 2026, 0, 15, 12, 0, 0);
console.log("Santiago Jan:", resSclJan.offsetFormatted, "isDst:", resSclJan.isDst);
