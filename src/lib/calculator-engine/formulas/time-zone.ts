/**
 * Comprehensive Mathematical Engine for Global Time Zone Conversions,
 * Automated Daylight Saving Time (DST) rules, and Multi-City Meeting Planner.
 */

export interface TimeZoneDefinition {
  id: string;
  name: string;
  city: string;
  country: string;
  standardOffsetMinutes: number; // in minutes from UTC (e.g. -300 for UTC-5)
  dstOffsetMinutes?: number;     // in minutes from UTC during DST (e.g. -240 for UTC-4)
  dstRegion?: "US" | "EU" | "AU" | "NZ" | "NONE";
  ianaName?: string;
  region: "Americas" | "Europe" | "Asia" | "Africa" | "Oceania" | "Pacific" | "Military";
  coordinates?: { x: number; y: number }; // Percentage for interactive map (0-100)
}

// Comprehensive Global Time Zone Database covering UTC-12 to UTC+14
export const TIME_ZONE_DATABASE: TimeZoneDefinition[] = [
  // --- UTC -12 to -8 ---
  { id: "utc-12", name: "UTC-12:00 (Baker Island)", city: "Baker Island", country: "US Minor Islands", standardOffsetMinutes: -720, dstRegion: "NONE", region: "Pacific", coordinates: { x: 5, y: 55 } },
  { id: "utc-11", name: "UTC-11:00 (Samoa Standard Time)", city: "Pago Pago", country: "American Samoa", standardOffsetMinutes: -660, dstRegion: "NONE", region: "Pacific", coordinates: { x: 8, y: 65 } },
  { id: "utc-10", name: "HST (Hawaii Standard Time / UTC-10:00)", city: "Honolulu", country: "United States", standardOffsetMinutes: -600, dstRegion: "NONE", ianaName: "Pacific/Honolulu", region: "Americas", coordinates: { x: 12, y: 48 } },
  { id: "utc-9", name: "AKST / AKDT (Alaska Time / UTC-9:00)", city: "Anchorage", country: "United States", standardOffsetMinutes: -540, dstOffsetMinutes: -480, dstRegion: "US", ianaName: "America/Anchorage", region: "Americas", coordinates: { x: 14, y: 22 } },
  { id: "utc-8", name: "PST / PDT (Pacific Time / UTC-8:00)", city: "Los Angeles", country: "United States", standardOffsetMinutes: -480, dstOffsetMinutes: -420, dstRegion: "US", ianaName: "America/Los_Angeles", region: "Americas", coordinates: { x: 18, y: 38 } },
  { id: "utc-8-van", name: "PST / PDT (Vancouver / UTC-8:00)", city: "Vancouver", country: "Canada", standardOffsetMinutes: -480, dstOffsetMinutes: -420, dstRegion: "US", ianaName: "America/Vancouver", region: "Americas", coordinates: { x: 18, y: 32 } },

  // --- UTC -7 to -4 ---
  { id: "utc-7", name: "MST / MDT (Mountain Time / UTC-7:00)", city: "Denver", country: "United States", standardOffsetMinutes: -420, dstOffsetMinutes: -360, dstRegion: "US", ianaName: "America/Denver", region: "Americas", coordinates: { x: 22, y: 37 } },
  { id: "utc-7-phx", name: "MST (Phoenix / Arizona / UTC-7:00)", city: "Phoenix", country: "United States", standardOffsetMinutes: -420, dstRegion: "NONE", ianaName: "America/Phoenix", region: "Americas", coordinates: { x: 21, y: 41 } },
  { id: "utc-6", name: "CST / CDT (Central Time / UTC-6:00)", city: "Chicago", country: "United States", standardOffsetMinutes: -360, dstOffsetMinutes: -300, dstRegion: "US", ianaName: "America/Chicago", region: "Americas", coordinates: { x: 25, y: 36 } },
  { id: "utc-6-mex", name: "CST (Mexico City / UTC-6:00)", city: "Mexico City", country: "Mexico", standardOffsetMinutes: -360, dstRegion: "NONE", ianaName: "America/Mexico_City", region: "Americas", coordinates: { x: 23, y: 49 } },
  { id: "utc-5", name: "EST / EDT (Eastern Time / UTC-5:00)", city: "New York", country: "United States", standardOffsetMinutes: -300, dstOffsetMinutes: -240, dstRegion: "US", ianaName: "America/New_York", region: "Americas", coordinates: { x: 28, y: 35 } },
  { id: "utc-5-tor", name: "EST / EDT (Toronto / UTC-5:00)", city: "Toronto", country: "Canada", standardOffsetMinutes: -300, dstOffsetMinutes: -240, dstRegion: "US", ianaName: "America/Toronto", region: "Americas", coordinates: { x: 27, y: 33 } },
  { id: "utc-4", name: "AST / ADT (Atlantic Time / UTC-4:00)", city: "Halifax", country: "Canada", standardOffsetMinutes: -240, dstOffsetMinutes: -180, dstRegion: "US", ianaName: "America/Halifax", region: "Americas", coordinates: { x: 31, y: 32 } },
  { id: "utc-4-scl", name: "CLT / CLST (Santiago / UTC-4:00)", city: "Santiago", country: "Chile", standardOffsetMinutes: -240, dstOffsetMinutes: -180, dstRegion: "AU", ianaName: "America/Santiago", region: "Americas", coordinates: { x: 31, y: 78 } },
  { id: "utc-3-30", name: "NST / NDT (Newfoundland / UTC-3:30)", city: "St. John's", country: "Canada", standardOffsetMinutes: -210, dstOffsetMinutes: -150, dstRegion: "US", ianaName: "America/St_Johns", region: "Americas", coordinates: { x: 34, y: 29 } },
  { id: "utc-3", name: "BRT (Brasilia Time / UTC-3:00)", city: "São Paulo", country: "Brazil", standardOffsetMinutes: -180, dstRegion: "NONE", ianaName: "America/Sao_Paulo", region: "Americas", coordinates: { x: 36, y: 72 } },
  { id: "utc-3-bue", name: "ART (Argentina Time / UTC-3:00)", city: "Buenos Aires", country: "Argentina", standardOffsetMinutes: -180, dstRegion: "NONE", ianaName: "America/Argentina/Buenos_Aires", region: "Americas", coordinates: { x: 33, y: 80 } },

  // --- UTC 0 to +4 ---
  { id: "utc-0-gmt", name: "GMT / BST (Greenwich Mean Time / UTC+0:00)", city: "London", country: "United Kingdom", standardOffsetMinutes: 0, dstOffsetMinutes: 60, dstRegion: "EU", ianaName: "Europe/London", region: "Europe", coordinates: { x: 48, y: 28 } },
  { id: "utc-0-utc", name: "UTC (Coordinated Universal Time / UTC+0:00)", city: "Reykjavik", country: "Iceland", standardOffsetMinutes: 0, dstRegion: "NONE", ianaName: "UTC", region: "Europe", coordinates: { x: 45, y: 20 } },
  { id: "utc-1", name: "CET / CEST (Central European Time / UTC+1:00)", city: "Paris / Berlin / Rome", country: "European Union", standardOffsetMinutes: 60, dstOffsetMinutes: 120, dstRegion: "EU", ianaName: "Europe/Paris", region: "Europe", coordinates: { x: 51, y: 30 } },
  { id: "utc-2", name: "EET / EEST (Eastern European Time / UTC+2:00)", city: "Athens / Cairo / Helsinki", country: "Greece / Egypt", standardOffsetMinutes: 120, dstOffsetMinutes: 180, dstRegion: "EU", ianaName: "Europe/Athens", region: "Europe", coordinates: { x: 55, y: 34 } },
  { id: "utc-2-jnb", name: "SAST (South Africa Standard Time / UTC+2:00)", city: "Johannesburg", country: "South Africa", standardOffsetMinutes: 120, dstRegion: "NONE", ianaName: "Africa/Johannesburg", region: "Africa", coordinates: { x: 56, y: 76 } },
  { id: "utc-3-msk", name: "MSK (Moscow Standard Time / UTC+3:00)", city: "Moscow", country: "Russia", standardOffsetMinutes: 180, dstRegion: "NONE", ianaName: "Europe/Moscow", region: "Europe", coordinates: { x: 59, y: 24 } },
  { id: "utc-3-dxb", name: "GST (Gulf Standard Time / UTC+4:00)", city: "Dubai", country: "United Arab Emirates", standardOffsetMinutes: 240, dstRegion: "NONE", ianaName: "Asia/Dubai", region: "Asia", coordinates: { x: 64, y: 44 } },
  { id: "utc-3-30-teh", name: "IRST (Iran Standard Time / UTC+3:30)", city: "Tehran", country: "Iran", standardOffsetMinutes: 210, dstRegion: "NONE", ianaName: "Asia/Tehran", region: "Asia", coordinates: { x: 62, y: 38 } },

  // --- UTC +5 to +8 ---
  { id: "utc-5-khi", name: "PKT (Pakistan Standard Time / UTC+5:00)", city: "Karachi / Islamabad", country: "Pakistan", standardOffsetMinutes: 300, dstRegion: "NONE", ianaName: "Asia/Karachi", region: "Asia", coordinates: { x: 68, y: 42 } },
  { id: "utc-5-30", name: "IST (Indian Standard Time / UTC+5:30)", city: "New Delhi / Mumbai", country: "India", standardOffsetMinutes: 330, dstRegion: "NONE", ianaName: "Asia/Kolkata", region: "Asia", coordinates: { x: 71, y: 44 } },
  { id: "utc-5-45", name: "NPT (Nepal Time / UTC+5:45)", city: "Kathmandu", country: "Nepal", standardOffsetMinutes: 345, dstRegion: "NONE", ianaName: "Asia/Kathmandu", region: "Asia", coordinates: { x: 73, y: 42 } },
  { id: "utc-6-dac", name: "BST (Bangladesh Standard Time / UTC+6:00)", city: "Dhaka", country: "Bangladesh", standardOffsetMinutes: 360, dstRegion: "NONE", ianaName: "Asia/Dhaka", region: "Asia", coordinates: { x: 74, y: 44 } },
  { id: "utc-7-bkk", name: "ICT (Indochina Time / UTC+7:00)", city: "Bangkok / Jakarta", country: "Thailand / Indonesia", standardOffsetMinutes: 420, dstRegion: "NONE", ianaName: "Asia/Bangkok", region: "Asia", coordinates: { x: 77, y: 49 } },
  { id: "utc-8-cst", name: "CST (China Standard Time / UTC+8:00)", city: "Beijing / Shanghai", country: "China", standardOffsetMinutes: 480, dstRegion: "NONE", ianaName: "Asia/Shanghai", region: "Asia", coordinates: { x: 81, y: 36 } },
  { id: "utc-8-sgt", name: "SGT (Singapore Standard Time / UTC+8:00)", city: "Singapore", country: "Singapore", standardOffsetMinutes: 480, dstRegion: "NONE", ianaName: "Asia/Singapore", region: "Asia", coordinates: { x: 78, y: 56 } },
  { id: "utc-8-per", name: "AWST (Australian Western Time / UTC+8:00)", city: "Perth", country: "Australia", standardOffsetMinutes: 480, dstRegion: "NONE", ianaName: "Australia/Perth", region: "Oceania", coordinates: { x: 80, y: 77 } },

  // --- UTC +9 to +14 ---
  { id: "utc-9-jst", name: "JST (Japan Standard Time / UTC+9:00)", city: "Tokyo", country: "Japan", standardOffsetMinutes: 540, dstRegion: "NONE", ianaName: "Asia/Tokyo", region: "Asia", coordinates: { x: 87, y: 38 } },
  { id: "utc-9-kst", name: "KST (Korea Standard Time / UTC+9:00)", city: "Seoul", country: "South Korea", standardOffsetMinutes: 540, dstRegion: "NONE", ianaName: "Asia/Seoul", region: "Asia", coordinates: { x: 84, y: 37 } },
  { id: "utc-9-30", name: "ACST / ACDT (Australian Central / UTC+9:30)", city: "Adelaide / Darwin", country: "Australia", standardOffsetMinutes: 570, dstOffsetMinutes: 630, dstRegion: "AU", ianaName: "Australia/Adelaide", region: "Oceania", coordinates: { x: 84, y: 76 } },
  { id: "utc-10-syd", name: "AEST / AEDT (Australian Eastern / UTC+10:00)", city: "Sydney / Melbourne", country: "Australia", standardOffsetMinutes: 600, dstOffsetMinutes: 660, dstRegion: "AU", ianaName: "Australia/Sydney", region: "Oceania", coordinates: { x: 88, y: 79 } },
  { id: "utc-12-akl", name: "NZST / NZDT (New Zealand Time / UTC+12:00)", city: "Auckland", country: "New Zealand", standardOffsetMinutes: 720, dstOffsetMinutes: 780, dstRegion: "NZ", ianaName: "Pacific/Auckland", region: "Pacific", coordinates: { x: 94, y: 84 } },
  { id: "utc-12-45", name: "CHAST (Chatham Islands / UTC+12:45)", city: "Chatham Islands", country: "New Zealand", standardOffsetMinutes: 765, dstOffsetMinutes: 825, dstRegion: "NZ", ianaName: "Pacific/Chatham", region: "Pacific", coordinates: { x: 96, y: 86 } },
  { id: "utc-14", name: "LINT (Line Islands / UTC+14:00)", city: "Kiritimati", country: "Kiribati", standardOffsetMinutes: 840, dstRegion: "NONE", ianaName: "Pacific/Kiritimati", region: "Pacific", coordinates: { x: 98, y: 52 } },
];

/**
 * Determine if DST is active for a given region and date
 */
export function isDaylightSavingTime(date: Date, region?: "US" | "EU" | "AU" | "NZ" | "NONE"): boolean {
  if (!region || region === "NONE") return false;

  const year = date.getFullYear();
  const month = date.getMonth(); // 0 = Jan, 11 = Dec
  const day = date.getDate();

  if (region === "US") {
    // US DST: 2nd Sunday in March to 1st Sunday in November
    // 2nd Sunday in March falls between March 8 and March 14
    // 1st Sunday in Nov falls between Nov 1 and Nov 7
    if (month > 2 && month < 10) return true; // Apr-Oct
    if (month < 2 || month > 10) return false; // Jan, Feb, Dec

    if (month === 2) {
      // March: find 2nd Sunday
      const d = new Date(year, 2, 1);
      const firstSun = (7 - d.getDay()) % 7 + 1;
      const secondSun = firstSun + 7;
      return day >= secondSun;
    }
    if (month === 10) {
      // November: find 1st Sunday
      const d = new Date(year, 10, 1);
      const firstSun = (7 - d.getDay()) % 7 + 1;
      return day < firstSun;
    }
  }

  if (region === "EU") {
    // EU DST: Last Sunday in March to Last Sunday in October
    if (month > 2 && month < 9) return true; // Apr-Sep
    if (month < 2 || month > 9) return false; // Jan, Feb, Nov, Dec

    if (month === 2) {
      // March: last Sunday (31st minus day of week)
      const lastDay = new Date(year, 2, 31);
      const lastSun = 31 - lastDay.getDay();
      return day >= lastSun;
    }
    if (month === 9) {
      // October: last Sunday
      const lastDay = new Date(year, 9, 31);
      const lastSun = 31 - lastDay.getDay();
      return day < lastSun;
    }
  }

  if (region === "AU" || region === "NZ") {
    // Southern Hemisphere: 1st Sunday in October to 1st Sunday in April
    if (month >= 9 || month <= 2) return true; // Oct-Mar
    if (month > 3 && month < 9) return false; // May-Sep

    if (month === 3) {
      // April: 1st Sunday
      const d = new Date(year, 3, 1);
      const firstSun = (7 - d.getDay()) % 7 + 1;
      return day < firstSun;
    }
    if (month === 9) {
      // October: 1st Sunday
      const d = new Date(year, 9, 1);
      const firstSun = (7 - d.getDay()) % 7 + 1;
      return day >= firstSun;
    }
  }

  return false;
}

/**
 * Get active offset in minutes for a timezone taking DST into account
 */
export function getActiveOffsetMinutes(tz: TimeZoneDefinition, date: Date, autoDst: boolean = true): { offsetMinutes: number; isDst: boolean } {
  if (autoDst && tz.dstOffsetMinutes !== undefined && tz.dstRegion && tz.dstRegion !== "NONE") {
    const dstActive = isDaylightSavingTime(date, tz.dstRegion);
    if (dstActive) {
      return { offsetMinutes: tz.dstOffsetMinutes, isDst: true };
    }
  }
  return { offsetMinutes: tz.standardOffsetMinutes, isDst: false };
}

/**
 * Format offset minutes into string like "+05:30" or "-04:00"
 */
export function formatOffsetString(offsetMinutes: number): string {
  const sign = offsetMinutes >= 0 ? "+" : "-";
  const abs = Math.abs(offsetMinutes);
  const h = Math.floor(abs / 60);
  const m = abs % 60;
  return `UTC${sign}${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
}

export interface ConvertTimeZoneParams {
  date: Date;
  timeHour: number;
  timeMinute: number;
  timeSecond?: number;
  fromZone: TimeZoneDefinition;
  toZone: TimeZoneDefinition;
  autoDst?: boolean;
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
  dayShift: -1 | 0 | 1; // -1 = Previous day, 0 = Same day, 1 = Next day
}

/**
 * High-precision single timezone converter
 */
export function convertTimeZone(params: ConvertTimeZoneParams): ConvertTimeZoneResult {
  const autoDst = params.autoDst ?? true;
  const fromOffset = getActiveOffsetMinutes(params.fromZone, params.date, autoDst);
  const toOffset = getActiveOffsetMinutes(params.toZone, params.date, autoDst);

  // 1. Convert local time to UTC minutes
  const localMinutes = params.timeHour * 60 + params.timeMinute;
  const utcMinutes = localMinutes - fromOffset.offsetMinutes;

  // 2. Convert UTC minutes to Target local minutes
  const targetMinutesTotal = utcMinutes + toOffset.offsetMinutes;

  // 3. Compute target date rollover
  const daysRollover = Math.floor(targetMinutesTotal / 1440);
  let targetNormalizedMin = targetMinutesTotal % 1440;
  if (targetNormalizedMin < 0) targetNormalizedMin += 1440;

  const targetHour = Math.floor(targetNormalizedMin / 60);
  const targetMinute = targetNormalizedMin % 60;
  const targetSecond = params.timeSecond || 0;

  const targetDate = new Date(params.date);
  targetDate.setDate(targetDate.getDate() + daysRollover);

  // Offset Difference in hours
  const diffMinutes = toOffset.offsetMinutes - fromOffset.offsetMinutes;
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

  const MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const formatDt = (d: Date, h: number, m: number, s: number) => {
    const ampm = h >= 12 ? "PM" : "AM";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${DAYS[d.getDay()]}, ${MONTH_NAMES[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} at ${h12}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")} ${ampm} (${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")})`;
  };

  return {
    sourceDateTimeFormatted: formatDt(params.date, params.timeHour, params.timeMinute, params.timeSecond || 0),
    targetDateTimeFormatted: formatDt(targetDate, targetHour, targetMinute, targetSecond),
    targetDate,
    targetHour,
    targetMinute,
    targetSecond,
    timeDifferenceHours: diffHours,
    timeDifferenceFormatted,
    isFromDst: fromOffset.isDst,
    isToDst: toOffset.isDst,
    fromOffsetFormatted: formatOffsetString(fromOffset.offsetMinutes),
    toOffsetFormatted: formatOffsetString(toOffset.offsetMinutes),
    dayShift: daysRollover > 0 ? 1 : daysRollover < 0 ? -1 : 0,
  };
}

// =========================================================================
// 2. MULTI-CITY MEETING PLANNER ENGINE
// =========================================================================

export interface MeetingPlannerCity {
  cityId: string;
  tz: TimeZoneDefinition;
  cityName: string;
}

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

export function generateMeetingPlannerGrid(cities: TimeZoneDefinition[], date: Date, autoDst: boolean = true): MeetingHourSlot[] {
  const slots: MeetingHourSlot[] = [];

  for (let utcHour = 0; utcHour < 24; utcHour++) {
    const cityTimes: MeetingHourSlot["cityTimes"] = [];
    let allWork = true;

    for (const city of cities) {
      const offset = getActiveOffsetMinutes(city, date, autoDst);
      const totalMin = utcHour * 60 + offset.offsetMinutes;
      let normMin = totalMin % 1440;
      if (normMin < 0) normMin += 1440;

      const localHour = Math.floor(normMin / 60);
      const localMinute = normMin % 60;

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
