/**
 * Authoritative Mathematical & Temporal Engine for Global Time Zone Conversions,
 * Dynamic IANA Time Zone Database (tzdb) rules, DST transitions, and Multi-City Meeting Planner.
 */

export interface TimeZoneDefinition {
  id: string;
  name: string;
  city: string;
  country: string;
  ianaName: string;
  region: "Americas" | "Europe" | "Asia" | "Africa" | "Oceania" | "Pacific" | "Military";
  coordinates?: { x: number; y: number }; // Percentage for interactive map (0-100)
}

// Comprehensive Global Time Zone Database covering distinct IANA zones UTC-12 to UTC+14
export const TIME_ZONE_DATABASE: TimeZoneDefinition[] = [
  // --- UTC -12 to -8 ---
  { id: "utc-12", name: "UTC-12:00 (Baker Island)", city: "Baker Island", country: "US Minor Islands", ianaName: "Etc/GMT+12", region: "Pacific", coordinates: { x: 5, y: 55 } },
  { id: "utc-11", name: "SST (Samoa Standard Time / UTC-11:00)", city: "Pago Pago", country: "American Samoa", ianaName: "Pacific/Pago_Pago", region: "Pacific", coordinates: { x: 8, y: 65 } },
  { id: "utc-10", name: "HST (Hawaii Standard Time / UTC-10:00)", city: "Honolulu", country: "United States", ianaName: "Pacific/Honolulu", region: "Americas", coordinates: { x: 12, y: 48 } },
  { id: "utc-9", name: "AKST / AKDT (Alaska Time / UTC-9:00)", city: "Anchorage", country: "United States", ianaName: "America/Anchorage", region: "Americas", coordinates: { x: 14, y: 22 } },
  { id: "utc-8-la", name: "PST / PDT (Pacific Time / UTC-8:00)", city: "Los Angeles", country: "United States", ianaName: "America/Los_Angeles", region: "Americas", coordinates: { x: 18, y: 38 } },
  { id: "utc-8-sf", name: "PST / PDT (San Francisco / UTC-8:00)", city: "San Francisco", country: "United States", ianaName: "America/Los_Angeles", region: "Americas", coordinates: { x: 17, y: 37 } },
  { id: "utc-8-sea", name: "PST / PDT (Seattle / UTC-8:00)", city: "Seattle", country: "United States", ianaName: "America/Los_Angeles", region: "Americas", coordinates: { x: 18, y: 30 } },
  { id: "utc-8-van", name: "PST / PDT (Vancouver / UTC-8:00)", city: "Vancouver", country: "Canada", ianaName: "America/Vancouver", region: "Americas", coordinates: { x: 18, y: 32 } },

  // --- UTC -7 to -4 ---
  { id: "utc-7-den", name: "MST / MDT (Mountain Time / UTC-7:00)", city: "Denver", country: "United States", ianaName: "America/Denver", region: "Americas", coordinates: { x: 22, y: 37 } },
  { id: "utc-7-phx", name: "MST (Phoenix / Arizona / UTC-7:00)", city: "Phoenix", country: "United States", ianaName: "America/Phoenix", region: "Americas", coordinates: { x: 21, y: 41 } },
  { id: "utc-6-chi", name: "CST / CDT (Central Time / UTC-6:00)", city: "Chicago", country: "United States", ianaName: "America/Chicago", region: "Americas", coordinates: { x: 25, y: 36 } },
  { id: "utc-6-dal", name: "CST / CDT (Dallas / UTC-6:00)", city: "Dallas", country: "United States", ianaName: "America/Chicago", region: "Americas", coordinates: { x: 24, y: 42 } },
  { id: "utc-6-mex", name: "CST (Mexico City / UTC-6:00)", city: "Mexico City", country: "Mexico", ianaName: "America/Mexico_City", region: "Americas", coordinates: { x: 23, y: 49 } },
  { id: "utc-5-ny", name: "EST / EDT (Eastern Time / UTC-5:00)", city: "New York", country: "United States", ianaName: "America/New_York", region: "Americas", coordinates: { x: 28, y: 35 } },
  { id: "utc-5-tor", name: "EST / EDT (Toronto / UTC-5:00)", city: "Toronto", country: "Canada", ianaName: "America/Toronto", region: "Americas", coordinates: { x: 27, y: 33 } },
  { id: "utc-4-hal", name: "AST / ADT (Atlantic Time / UTC-4:00)", city: "Halifax", country: "Canada", ianaName: "America/Halifax", region: "Americas", coordinates: { x: 31, y: 32 } },
  { id: "utc-4-scl", name: "CLT / CLST (Santiago / UTC-4:00)", city: "Santiago", country: "Chile", ianaName: "America/Santiago", region: "Americas", coordinates: { x: 31, y: 78 } },
  { id: "utc-3-30", name: "NST / NDT (Newfoundland / UTC-3:30)", city: "St. John's", country: "Canada", ianaName: "America/St_Johns", region: "Americas", coordinates: { x: 34, y: 29 } },
  { id: "utc-3-sao", name: "BRT (Brasilia Time / UTC-3:00)", city: "São Paulo", country: "Brazil", ianaName: "America/Sao_Paulo", region: "Americas", coordinates: { x: 36, y: 72 } },
  { id: "utc-3-bue", name: "ART (Argentina Time / UTC-3:00)", city: "Buenos Aires", country: "Argentina", ianaName: "America/Argentina/Buenos_Aires", region: "Americas", coordinates: { x: 33, y: 80 } },

  // --- UTC 0 to +4 ---
  { id: "utc-0-lon", name: "GMT / BST (Greenwich Mean Time / UTC+0:00)", city: "London", country: "United Kingdom", ianaName: "Europe/London", region: "Europe", coordinates: { x: 48, y: 28 } },
  { id: "utc-0-dub", name: "IST / GMT (Dublin / UTC+0:00)", city: "Dublin", country: "Ireland", ianaName: "Europe/Dublin", region: "Europe", coordinates: { x: 46, y: 27 } },
  { id: "utc-0-rey", name: "UTC (Reykjavik / UTC+0:00)", city: "Reykjavik", country: "Iceland", ianaName: "Atlantic/Reykjavik", region: "Europe", coordinates: { x: 45, y: 20 } },
  { id: "utc-1-par", name: "CET / CEST (Paris / UTC+1:00)", city: "Paris", country: "France", ianaName: "Europe/Paris", region: "Europe", coordinates: { x: 50, y: 30 } },
  { id: "utc-1-ber", name: "CET / CEST (Berlin / UTC+1:00)", city: "Berlin", country: "Germany", ianaName: "Europe/Berlin", region: "Europe", coordinates: { x: 52, y: 28 } },
  { id: "utc-1-rom", name: "CET / CEST (Rome / UTC+1:00)", city: "Rome", country: "Italy", ianaName: "Europe/Rome", region: "Europe", coordinates: { x: 52, y: 34 } },
  { id: "utc-1-mad", name: "CET / CEST (Madrid / UTC+1:00)", city: "Madrid", country: "Spain", ianaName: "Europe/Madrid", region: "Europe", coordinates: { x: 48, y: 34 } },
  { id: "utc-2-ath", name: "EET / EEST (Athens / UTC+2:00)", city: "Athens", country: "Greece", ianaName: "Europe/Athens", region: "Europe", coordinates: { x: 55, y: 35 } },
  { id: "utc-2-hel", name: "EET / EEST (Helsinki / UTC+2:00)", city: "Helsinki", country: "Finland", ianaName: "Europe/Helsinki", region: "Europe", coordinates: { x: 55, y: 20 } },
  { id: "utc-2-cai", name: "EEST / EET (Cairo / UTC+2:00)", city: "Cairo", country: "Egypt", ianaName: "Africa/Cairo", region: "Africa", coordinates: { x: 56, y: 38 } },
  { id: "utc-2-jnb", name: "SAST (South Africa Standard Time / UTC+2:00)", city: "Johannesburg", country: "South Africa", ianaName: "Africa/Johannesburg", region: "Africa", coordinates: { x: 56, y: 76 } },
  { id: "utc-3-msk", name: "MSK (Moscow Standard Time / UTC+3:00)", city: "Moscow", country: "Russia", ianaName: "Europe/Moscow", region: "Europe", coordinates: { x: 59, y: 24 } },
  { id: "utc-4-dxb", name: "GST (Gulf Standard Time / UTC+4:00)", city: "Dubai", country: "United Arab Emirates", ianaName: "Asia/Dubai", region: "Asia", coordinates: { x: 64, y: 44 } },
  { id: "utc-3-30-teh", name: "IRST (Iran Standard Time / UTC+3:30)", city: "Tehran", country: "Iran", ianaName: "Asia/Tehran", region: "Asia", coordinates: { x: 62, y: 38 } },

  // --- UTC +5 to +8 ---
  { id: "utc-5-khi", name: "PKT (Pakistan Standard Time / UTC+5:00)", city: "Karachi", country: "Pakistan", ianaName: "Asia/Karachi", region: "Asia", coordinates: { x: 68, y: 42 } },
  { id: "utc-5-30-del", name: "IST (Indian Standard Time / UTC+5:30)", city: "New Delhi", country: "India", ianaName: "Asia/Kolkata", region: "Asia", coordinates: { x: 71, y: 40 } },
  { id: "utc-5-30-mum", name: "IST (Mumbai / UTC+5:30)", city: "Mumbai", country: "India", ianaName: "Asia/Kolkata", region: "Asia", coordinates: { x: 70, y: 44 } },
  { id: "utc-5-45", name: "NPT (Nepal Time / UTC+5:45)", city: "Kathmandu", country: "Nepal", ianaName: "Asia/Kathmandu", region: "Asia", coordinates: { x: 73, y: 42 } },
  { id: "utc-6-dac", name: "BST (Bangladesh Standard Time / UTC+6:00)", city: "Dhaka", country: "Bangladesh", ianaName: "Asia/Dhaka", region: "Asia", coordinates: { x: 74, y: 44 } },
  { id: "utc-7-bkk", name: "ICT (Indochina Time / UTC+7:00)", city: "Bangkok", country: "Thailand", ianaName: "Asia/Bangkok", region: "Asia", coordinates: { x: 77, y: 49 } },
  { id: "utc-7-jkt", name: "WIB (Western Indonesia Time / UTC+7:00)", city: "Jakarta", country: "Indonesia", ianaName: "Asia/Jakarta", region: "Asia", coordinates: { x: 77, y: 60 } },
  { id: "utc-8-bei", name: "CST (China Standard Time / UTC+8:00)", city: "Beijing", country: "China", ianaName: "Asia/Shanghai", region: "Asia", coordinates: { x: 81, y: 36 } },
  { id: "utc-8-sha", name: "CST (Shanghai / UTC+8:00)", city: "Shanghai", country: "China", ianaName: "Asia/Shanghai", region: "Asia", coordinates: { x: 83, y: 40 } },
  { id: "utc-8-sgt", name: "SGT (Singapore Standard Time / UTC+8:00)", city: "Singapore", country: "Singapore", ianaName: "Asia/Singapore", region: "Asia", coordinates: { x: 78, y: 56 } },
  { id: "utc-8-hkg", name: "HKT (Hong Kong Time / UTC+8:00)", city: "Hong Kong", country: "Hong Kong", ianaName: "Asia/Hong_Kong", region: "Asia", coordinates: { x: 80, y: 45 } },
  { id: "utc-8-per", name: "AWST (Australian Western Time / UTC+8:00)", city: "Perth", country: "Australia", ianaName: "Australia/Perth", region: "Oceania", coordinates: { x: 80, y: 77 } },

  // --- UTC +9 to +14 ---
  { id: "utc-9-tok", name: "JST (Japan Standard Time / UTC+9:00)", city: "Tokyo", country: "Japan", ianaName: "Asia/Tokyo", region: "Asia", coordinates: { x: 87, y: 38 } },
  { id: "utc-9-seo", name: "KST (Korea Standard Time / UTC+9:00)", city: "Seoul", country: "South Korea", ianaName: "Asia/Seoul", region: "Asia", coordinates: { x: 84, y: 37 } },
  { id: "utc-9-30-adl", name: "ACST / ACDT (Australian Central / UTC+9:30)", city: "Adelaide", country: "Australia", ianaName: "Australia/Adelaide", region: "Oceania", coordinates: { x: 84, y: 76 } },
  { id: "utc-9-30-drw", name: "ACST (Darwin / UTC+9:30)", city: "Darwin", country: "Australia", ianaName: "Australia/Darwin", region: "Oceania", coordinates: { x: 83, y: 65 } },
  { id: "utc-10-syd", name: "AEST / AEDT (Australian Eastern / UTC+10:00)", city: "Sydney", country: "Australia", ianaName: "Australia/Sydney", region: "Oceania", coordinates: { x: 88, y: 79 } },
  { id: "utc-10-mel", name: "AEST / AEDT (Melbourne / UTC+10:00)", city: "Melbourne", country: "Australia", ianaName: "Australia/Melbourne", region: "Oceania", coordinates: { x: 87, y: 81 } },
  { id: "utc-12-akl", name: "NZST / NZDT (New Zealand Time / UTC+12:00)", city: "Auckland", country: "New Zealand", ianaName: "Pacific/Auckland", region: "Pacific", coordinates: { x: 94, y: 84 } },
  { id: "utc-12-45", name: "CHAST / CHADT (Chatham Islands / UTC+12:45)", city: "Chatham Islands", country: "New Zealand", ianaName: "Pacific/Chatham", region: "Pacific", coordinates: { x: 96, y: 86 } },
  { id: "utc-14", name: "LINT (Line Islands / UTC+14:00)", city: "Kiritimati", country: "Kiribati", ianaName: "Pacific/Kiritimati", region: "Pacific", coordinates: { x: 98, y: 52 } },
];

/**
 * Format offset minutes into standard string like "+05:30" or "-04:00"
 */
export function formatOffsetString(offsetMinutes: number): string {
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `UTC${sign}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

const formatterCache = new Map<string, Intl.DateTimeFormat>();

function getCachedDtf(timeZone: string, optionsKey: string, options: Intl.DateTimeFormatOptions): Intl.DateTimeFormat {
  const key = `${timeZone}__${optionsKey}`;
  let dtf = formatterCache.get(key);
  if (!dtf) {
    dtf = new Intl.DateTimeFormat("en-US", { timeZone, ...options });
    formatterCache.set(key, dtf);
  }
  return dtf;
}

/**
 * Parse offset in minutes from a specific IANA zone at a given UTC Date instant
 */
function parseOffsetMinutesForIana(ianaName: string, date: Date): number {
  try {
    const dtf = getCachedDtf(ianaName, "shortOffset_ymdhms", {
      timeZoneName: "shortOffset",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });
    const parts = dtf.formatToParts(date);
    const tzPart = parts.find((p) => p.type === "timeZoneName")?.value || "";
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
    return offsetMinutes;
  } catch {
    return 0;
  }
}

/**
 * Extract active UTC offset in minutes and time zone abbreviation for a specific UTC Date instant in an IANA zone
 */
export function getIanaOffsetAtInstant(ianaName: string, utcInstant: Date): { offsetMinutes: number; abbr: string; isDst: boolean } {
  try {
    const offsetMinutes = parseOffsetMinutesForIana(ianaName, utcInstant);

    const dtfAbbr = getCachedDtf(ianaName, "short", {
      timeZoneName: "short",
    });
    const abbr = dtfAbbr.formatToParts(utcInstant).find((p) => p.type === "timeZoneName")?.value || formatOffsetString(offsetMinutes);

    // Check DST status numerically: compare with January and July offsets
    const year = utcInstant.getUTCFullYear();
    const janOffset = parseOffsetMinutesForIana(ianaName, new Date(Date.UTC(year, 0, 15, 12, 0, 0)));
    const julOffset = parseOffsetMinutesForIana(ianaName, new Date(Date.UTC(year, 6, 15, 12, 0, 0)));
    const standardOffset = Math.min(janOffset, julOffset);
    const isDst = janOffset !== julOffset && offsetMinutes > standardOffset;

    return { offsetMinutes, abbr, isDst };
  } catch {
    return { offsetMinutes: 0, abbr: "UTC", isDst: false };
  }
}

export interface IanaResolutionResult {
  utcInstant: Date;
  offsetMinutes: number;
  offsetFormatted: string;
  isDst: boolean;
  timeZoneAbbr: string;
  state: "VALID" | "AMBIGUOUS" | "NONEXISTENT";
  transitionNote?: string;
}

/**
 * High-precision resolution of local wall-clock time into authoritative UTC instant in an IANA zone
 */
export function resolveLocalWallClockToUtc(
  ianaName: string,
  year: number,
  month: number, // 0-11
  day: number,
  hour: number,
  minute: number,
  second: number = 0,
  fold: 0 | 1 = 0 // 0 = earlier/standard, 1 = later
): IanaResolutionResult {
  try {
    const guessUtc = Date.UTC(year, month, day, hour, minute, second);

    const getLocalParts = (utcMs: number) => {
      const d = new Date(utcMs);
      const dtf = getCachedDtf(ianaName, "ymdhms_24", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: false,
      });
      const p = dtf.formatToParts(d);
      const getVal = (type: string) => parseInt(p.find((x) => x.type === type)?.value || "0", 10);
      const yr = getVal("year");
      const mo = getVal("month") - 1;
      const dy = getVal("day");
      let hr = getVal("hour");
      if (hr === 24) hr = 0;
      const min = getVal("minute");
      const sec = getVal("second");
      const localMs = Date.UTC(yr, mo, dy, hr, min, sec);
      return { yr, mo, dy, hr, min, sec, localMs };
    };

    const l0 = getLocalParts(guessUtc);
    const targetMs = Date.UTC(year, month, day, hour, minute, second);
    const diffMs = targetMs - l0.localMs;
    let resolvedUtc = guessUtc + diffMs;

    const l1 = getLocalParts(resolvedUtc);

    let state: "VALID" | "AMBIGUOUS" | "NONEXISTENT" = "VALID";
    let transitionNote: string | undefined = undefined;

    if (l1.localMs !== targetMs) {
      state = "NONEXISTENT";
      transitionNote = `Local time ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} is skipped in ${ianaName} due to DST spring-forward. Adjusted deterministically to the next valid instant.`;
    } else {
      const candidateEarlier = resolvedUtc - 3600000;
      const candidateLater = resolvedUtc + 3600000;
      const lEarlier = getLocalParts(candidateEarlier);
      const lLater = getLocalParts(candidateLater);

      if (lEarlier.localMs === targetMs || lLater.localMs === targetMs) {
        state = "AMBIGUOUS";
        if (fold === 1 && lLater.localMs === targetMs) {
          resolvedUtc = candidateLater;
        }
        transitionNote = `Local time ${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")} occurs twice in ${ianaName} due to DST fall-back. Evaluated deterministically.`;
      }
    }

    const { offsetMinutes, abbr, isDst } = getIanaOffsetAtInstant(ianaName, new Date(resolvedUtc));

    return {
      utcInstant: new Date(resolvedUtc),
      offsetMinutes,
      offsetFormatted: formatOffsetString(offsetMinutes),
      isDst,
      timeZoneAbbr: abbr,
      state,
      transitionNote,
    };
  } catch {
    const fallbackUtc = new Date(Date.UTC(year, month, day, hour, minute, second));
    return {
      utcInstant: fallbackUtc,
      offsetMinutes: 0,
      offsetFormatted: "UTC+00:00",
      isDst: false,
      timeZoneAbbr: "UTC",
      state: "VALID",
    };
  }
}

/**
 * Format a UTC instant into a specific IANA target timezone
 */
export function formatUtcInstantInIanaZone(
  utcInstant: Date,
  ianaName: string
) {
  try {
    const dtf = getCachedDtf(ianaName, "weekday_ymdhms_24", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    });

    const parts = dtf.formatToParts(utcInstant);
    const getVal = (type: string) => parseInt(parts.find((x) => x.type === type)?.value || "0", 10);
    const weekday = parts.find((x) => x.type === "weekday")?.value || "";
    const year = getVal("year");
    const month = getVal("month") - 1;
    const day = getVal("day");
    let hour = getVal("hour");
    if (hour === 24) hour = 0;
    const minute = getVal("minute");
    const second = getVal("second");

    const { offsetMinutes, abbr, isDst } = getIanaOffsetAtInstant(ianaName, utcInstant);

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
      formatted,
    };
  } catch {
    return {
      targetDate: new Date(utcInstant),
      targetYear: utcInstant.getUTCFullYear(),
      targetMonth: utcInstant.getUTCMonth(),
      targetDay: utcInstant.getUTCDate(),
      targetHour: utcInstant.getUTCHours(),
      targetMinute: utcInstant.getUTCMinutes(),
      targetSecond: utcInstant.getUTCSeconds(),
      targetWeekday: "UTC",
      offsetMinutes: 0,
      offsetFormatted: "UTC+00:00",
      isDst: false,
      timeZoneAbbr: "UTC",
      formatted: utcInstant.toISOString(),
    };
  }
}

export interface ConvertTimeZoneParams {
  date: Date;
  timeHour: number;
  timeMinute: number;
  timeSecond?: number;
  fromZone: TimeZoneDefinition;
  toZone: TimeZoneDefinition;
}

export interface ConvertTimeZoneResult {
  sourceDateTimeFormatted: string;
  targetDateTimeFormatted: string;
  targetDate: Date;
  targetHour: number;
  targetMinute: number;
  targetSecond: number;
  timeDifferenceHours: number;
  timeDifferenceFormatted: string;
  isFromDst: boolean;
  isToDst: boolean;
  fromOffsetFormatted: string;
  toOffsetFormatted: string;
  fromAbbr: string;
  toAbbr: string;
  dayShift: -1 | 0 | 1;
  state: "VALID" | "AMBIGUOUS" | "NONEXISTENT";
  transitionNote?: string;
}

/**
 * Authoritative single time zone conversion engine
 */
export function convertTimeZone(params: ConvertTimeZoneParams): ConvertTimeZoneResult {
  const year = params.date.getFullYear();
  const month = params.date.getMonth();
  const day = params.date.getDate();
  const hour = params.timeHour;
  const minute = params.timeMinute;
  const second = params.timeSecond || 0;

  // Resolve source wall-clock time to UTC instant
  const resolvedOrigin = resolveLocalWallClockToUtc(
    params.fromZone.ianaName,
    year,
    month,
    day,
    hour,
    minute,
    second
  );

  // Format UTC instant into destination zone
  const targetFormatted = formatUtcInstantInIanaZone(
    resolvedOrigin.utcInstant,
    params.toZone.ianaName
  );

  // Calculate difference
  const diffMinutes = targetFormatted.offsetMinutes - resolvedOrigin.offsetMinutes;
  const diffHours = parseFloat((diffMinutes / 60).toFixed(2));
  const diffSign = diffMinutes >= 0 ? "+" : "-";
  const absDiffH = Math.floor(Math.abs(diffMinutes) / 60);
  const absDiffM = Math.abs(diffMinutes) % 60;

  let timeDifferenceFormatted = "";
  if (diffMinutes === 0) {
    timeDifferenceFormatted = "Same time (0 hrs difference)";
  } else {
    timeDifferenceFormatted = `${diffSign}${absDiffH} hr${absDiffH === 1 ? "" : "s"}${absDiffM > 0 ? ` ${absDiffM} min` : ""} (${diffSign}${Math.abs(diffHours)} hrs)`;
  }

  const originDate = new Date(year, month, day);
  const dayDifference = Math.round((targetFormatted.targetDate.getTime() - originDate.getTime()) / (1000 * 60 * 60 * 24));
  const dayShift: -1 | 0 | 1 = dayDifference > 0 ? 1 : dayDifference < 0 ? -1 : 0;

  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const ampm = hour >= 12 ? "PM" : "AM";
  const h12 = hour % 12 === 0 ? 12 : hour % 12;
  const sourceDateTimeFormatted = `${DAYS[originDate.getDay()]}, ${MONTH_NAMES[month]} ${day}, ${year} at ${h12}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")} ${ampm} (${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")})`;

  return {
    sourceDateTimeFormatted,
    targetDateTimeFormatted: targetFormatted.formatted,
    targetDate: targetFormatted.targetDate,
    targetHour: targetFormatted.targetHour,
    targetMinute: targetFormatted.targetMinute,
    targetSecond: targetFormatted.targetSecond,
    timeDifferenceHours: diffHours,
    timeDifferenceFormatted,
    isFromDst: resolvedOrigin.isDst,
    isToDst: targetFormatted.isDst,
    fromOffsetFormatted: resolvedOrigin.offsetFormatted,
    toOffsetFormatted: targetFormatted.offsetFormatted,
    fromAbbr: resolvedOrigin.timeZoneAbbr,
    toAbbr: targetFormatted.timeZoneAbbr,
    dayShift,
    state: resolvedOrigin.state,
    transitionNote: resolvedOrigin.transitionNote,
  };
}

// =========================================================================
// 2. MULTI-CITY MEETING PLANNER ENGINE
// =========================================================================

export interface MeetingHourSlot {
  utcHour: number;
  cityTimes: {
    cityId: string;
    cityName: string;
    localHour: number;
    localMinute: number;
    status: "work" | "evening" | "night"; // work = 9-17, evening = 7-9 or 17-21, night = 21-7
    isOverlappingWork: boolean;
  }[];
  allWorkingHours: boolean;
}

/**
 * Generate 24-hour availability grid across multiple cities from UTC instants
 */
export function generateMeetingPlannerGrid(cities: TimeZoneDefinition[], date: Date): MeetingHourSlot[] {
  const slots: MeetingHourSlot[] = [];
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  for (let utcHour = 0; utcHour < 24; utcHour++) {
    const cityTimes: MeetingHourSlot["cityTimes"] = [];
    let allWork = true;
    const utcInstant = new Date(Date.UTC(year, month, day, utcHour, 0, 0));

    for (const city of cities) {
      const formatted = formatUtcInstantInIanaZone(utcInstant, city.ianaName);
      const localHour = formatted.targetHour;
      const localMinute = formatted.targetMinute;

      let status: "work" | "evening" | "night" = "night";
      if (localHour >= 9 && localHour < 17) {
        status = "work";
      } else if ((localHour >= 7 && localHour < 9) || (localHour >= 17 && localHour < 21)) {
        status = "evening";
      } else {
        status = "night";
      }

      if (status !== "work") {
        allWork = false;
      }

      cityTimes.push({
        cityId: city.id,
        cityName: city.city,
        localHour,
        localMinute,
        status,
        isOverlappingWork: status === "work",
      });
    }

    slots.push({
      utcHour,
      cityTimes,
      allWorkingHours: allWork,
    });
  }

  return slots;
}
