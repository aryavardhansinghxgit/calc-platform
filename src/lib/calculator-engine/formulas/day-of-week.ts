/**
 * High-Precision Pure Mathematical Engine for Day of the Week Calculations
 * Implements Zeller's Congruence, ISO 8601 week counting,
 * Gregorian vs. Proleptic Julian calendar conversion, strict calendar date validation,
 * and multilingual etymology database.
 */

export interface DayOfWeekParams {
  year: number;
  month: number; // 0-11
  day: number;
  calendarSystem?: "gregorian" | "julian";
}

export interface DateValidationResult {
  isValid: boolean;
  maxDays: number;
  errorMessage?: string;
}

export interface DayEtymologyDetail {
  dayName: string;
  indexSunday0: number;
  indexMonday1: number;
  celestialBody: string;
  romanDeity: string;
  norseDeity: string;
  sanskritName: string;
  sanskritMeaning: string;
  japaneseName: string;
  japaneseMeaning: string;
  keyTrivia: string[];
}

export interface DayOfWeekResult {
  isValid: boolean;
  errorMessage?: string;
  dayName: string;
  dayOfWeekIndex: number; // 0=Sunday, 1=Monday...
  isoDayOfWeekIndex: number; // 1=Monday... 7=Sunday
  formattedDate: string;
  dayOfYear: number;
  totalDaysInYear: number;
  daysRemainingInYear: number;
  isoWeekNumber: number;
  isLeapYear: boolean;
  calendarSystem: "gregorian" | "julian";
  zellerSteps: {
    formula: string;
    q: number;
    m: number;
    K: number;
    J: number;
    h: number;
  };
  etymology: DayEtymologyDetail;
  calendarGrid: {
    year: number;
    month: number;
    daysInMonth: number;
    firstDayOfWeekIndex: number; // In the active calendar system!
    selectedDay: number;
  };
}

export interface BatchDateResultItem {
  dateString: string;
  dayName: string;
  dayOfYear: number;
  totalDaysInYear: number;
  isoWeekNumber: number;
  isLeapYear: boolean;
  isValid: boolean;
  errorMessage?: string;
}

export const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
export const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Helper: Leap year checker
export function isLeapYear(year: number, isJulian?: boolean): boolean {
  if (isJulian) {
    return year % 4 === 0;
  }
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

// Days in month
export function getDaysInMonth(year: number, month: number, isJulian?: boolean): number {
  if (month < 0 || month > 11) return 31;
  if (month === 1) {
    return isLeapYear(year, isJulian) ? 29 : 28;
  }
  const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return days[month];
}

// Strict calendar date validator (Year 1 to 9999)
export function isValidCalendarDate(
  year: number,
  month: number, // 0-11
  day: number,
  isJulian?: boolean
): DateValidationResult {
  if (isNaN(year) || !Number.isInteger(year) || year < 1 || year > 9999) {
    return {
      isValid: false,
      maxDays: 31,
      errorMessage: `Year ${year} is out of supported range (1 to 9999).`,
    };
  }
  if (isNaN(month) || !Number.isInteger(month) || month < 0 || month > 11) {
    return {
      isValid: false,
      maxDays: 31,
      errorMessage: `Month index ${month} is invalid (must be between 0 and 11).`,
    };
  }
  const maxDays = getDaysInMonth(year, month, isJulian);
  if (isNaN(day) || !Number.isInteger(day) || day < 1 || day > maxDays) {
    const calName = isJulian ? "Proleptic Julian" : "Gregorian";
    return {
      isValid: false,
      maxDays,
      errorMessage: `${MONTH_NAMES[month]} ${year} (${calName}) has ${maxDays} days. Day ${day} does not exist.`,
    };
  }
  return { isValid: true, maxDays };
}

// Pure authoritative weekday engine (Zeller's congruence)
export function getWeekdayForCalendarDate(
  year: number,
  month: number, // 0-11
  day: number,
  calendarSystem: "gregorian" | "julian" = "gregorian"
): {
  dayName: string;
  dayOfWeekIndex: number; // 0=Sunday, 1=Monday... 6=Saturday
  isoDayOfWeekIndex: number; // 1=Monday... 7=Sunday
  zellerSteps: {
    formula: string;
    q: number;
    m: number;
    K: number;
    J: number;
    h: number;
  };
} {
  const isJulian = calendarSystem === "julian";
  let zMonth = month + 1;
  let zYear = year;
  if (zMonth < 3) {
    zMonth += 12;
    zYear -= 1;
  }

  const q = day;
  const m = zMonth;
  const K = zYear % 100;
  const J = Math.floor(zYear / 100);

  let h = 0;
  if (isJulian) {
    // Julian formula
    h = (q + Math.floor((13 * (m + 1)) / 5) + K + Math.floor(K / 4) + 5 - J) % 7;
  } else {
    // Gregorian formula
    h = (q + Math.floor((13 * (m + 1)) / 5) + K + Math.floor(K / 4) + Math.floor(J / 4) - 2 * J) % 7;
  }
  h = ((h % 7) + 7) % 7;

  // Zeller's result mapping: 0=Saturday, 1=Sunday, 2=Monday, 3=Tuesday, 4=Wednesday, 5=Thursday, 6=Friday
  const zellerToSunday0: Record<number, number> = {
    0: 6, // Saturday
    1: 0, // Sunday
    2: 1, // Monday
    3: 2, // Tuesday
    4: 3, // Wednesday
    5: 4, // Thursday
    6: 5, // Friday
  };

  const dayOfWeekIndex = zellerToSunday0[h];
  const dayName = DAY_NAMES[dayOfWeekIndex];
  const isoDayOfWeekIndex = dayOfWeekIndex === 0 ? 7 : dayOfWeekIndex;

  return {
    dayName,
    dayOfWeekIndex,
    isoDayOfWeekIndex,
    zellerSteps: {
      formula: isJulian
        ? "h = (q + ⌊13(m+1)/5⌋ + K + ⌊K/4⌋ + 5 - J) mod 7"
        : "h = (q + ⌊13(m+1)/5⌋ + K + ⌊K/4⌋ + ⌊J/4⌋ - 2J) mod 7",
      q,
      m,
      K,
      J,
      h,
    },
  };
}

// =========================================================================
// 1. DAY-OF-THE-WEEK ETYMOLOGY & TRIVIA DATABASE
// =========================================================================

export const DAY_ETYMOLOGY_DATABASE: Record<string, DayEtymologyDetail> = {
  Sunday: {
    dayName: "Sunday",
    indexSunday0: 0,
    indexMonday1: 7,
    celestialBody: "The Sun (Sol / Helios)",
    romanDeity: "Sol (Sun God)",
    norseDeity: "Sunna (Goddess of the Sun)",
    sanskritName: "Ravivara (रविवार)",
    sanskritMeaning: "Ravi (Sun God, vitality and life)",
    japaneseName: "Nichiyōbi (日曜日)",
    japaneseMeaning: "Sun Day (日 = Sun)",
    keyTrivia: [
      "In traditional Christian, Jewish, and Islamic week structures, Sunday is the first day of the weekly cycle.",
      "Recognized globally as a traditional day of rest and communal worship in Western cultures.",
      "Any common year that begins on a Sunday will contain exactly two Friday the 13ths.",
      "Named 'Dies Solis' in ancient Roman calendars, later translated into Old English as Sunnandæg."
    ]
  },
  Monday: {
    dayName: "Monday",
    indexSunday0: 1,
    indexMonday1: 1,
    celestialBody: "The Moon (Luna / Selene)",
    romanDeity: "Luna (Moon Goddess)",
    norseDeity: "Máni (God of the Moon)",
    sanskritName: "Somavara (सोमवार)",
    sanskritMeaning: "Soma / Chandra (Moon, tranquility and mind)",
    japaneseName: "Getsuyōbi (月曜日)",
    japaneseMeaning: "Moon Day (月 = Moon)",
    keyTrivia: [
      "ISO 8601 defines Monday as day 1 of the international standard calendar week.",
      "Monday is the only day of the week whose English name forms a single-word anagram: 'Dynamo'.",
      "In the Hellenistic planetary week, Monday was consecrated to the Moon (Dies Lunae).",
      "Traditional civil calendars in many European countries begin work schedules on Monday."
    ]
  },
  Tuesday: {
    dayName: "Tuesday",
    indexSunday0: 2,
    indexMonday1: 2,
    celestialBody: "Mars (Ares)",
    romanDeity: "Mars (God of War)",
    norseDeity: "Tiw / Týr (One-handed Norse God of Combat)",
    sanskritName: "Mangalavara (मंगलवार)",
    sanskritMeaning: "Mangala (Mars, courage and fiery action)",
    japaneseName: "Kayōbi (火曜日)",
    japaneseMeaning: "Fire Day (火 = Fire / Mars)",
    keyTrivia: [
      "Named after Tiw (Týr), the Norse god of single-combat duels and law.",
      "In Greek and Spanish-speaking cultures, Tuesday the 13th is traditionally considered an unlucky day.",
      "Black Tuesday (October 29, 1929) marked the historic Wall Street stock market crash that catalyzed the Great Depression.",
      "Super Tuesday is the primary election day on which the greatest number of US states hold presidential primaries."
    ]
  },
  Wednesday: {
    dayName: "Wednesday",
    indexSunday0: 3,
    indexMonday1: 3,
    celestialBody: "Mercury (Hermes)",
    romanDeity: "Mercurius (God of Commerce & Travel)",
    norseDeity: "Woden / Odin (Allfather of Norse Gods)",
    sanskritName: "Budhavara (बुधवार)",
    sanskritMeaning: "Budha (Mercury, intellect and communication)",
    japaneseName: "Suiyōbi (水曜日)",
    japaneseMeaning: "Water Day (水 = Water / Mercury)",
    keyTrivia: [
      "Commonly known as 'Hump Day' in North America due to its position as the midpoint of the standard workweek.",
      "Ash Wednesday marks the solemn first day of Lent in Western Christian liturgical calendars.",
      "Named 'Mittwoch' (Mid-week) in German, deliberately avoiding pagan planetary names.",
      "Dedicated in French (Mercredi) and Spanish (Miércoles) directly to the Roman god Mercury."
    ]
  },
  Thursday: {
    dayName: "Thursday",
    indexSunday0: 4,
    indexMonday1: 4,
    celestialBody: "Jupiter (Zeus)",
    romanDeity: "Jupiter / Jove (King of Gods & Thunder)",
    norseDeity: "Thor (God of Thunder and Strength)",
    sanskritName: "Guruvara (गुरुवार) / Brihaspativara",
    sanskritMeaning: "Guru / Brihaspati (Teacher of the Gods, planet Jupiter)",
    japaneseName: "Mokuyōbi (木曜日)",
    japaneseMeaning: "Wood Day (木 = Wood / Jupiter)",
    keyTrivia: [
      "Derived from Old English Þūresdæg, meaning 'Thor's Day', honoring the Norse god of thunder.",
      "In the United Kingdom, parliamentary and local elections are traditionally held on Thursdays by constitutional convention.",
      "Thanksgiving in the United States is officially celebrated on the fourth Thursday of November by federal statute.",
      "In Christian liturgical tradition, Maundy Thursday commemorates the Last Supper of Jesus Christ."
    ]
  },
  Friday: {
    dayName: "Friday",
    indexSunday0: 5,
    indexMonday1: 5,
    celestialBody: "Venus (Aphrodite)",
    romanDeity: "Venus (Goddess of Love, Beauty & Wealth)",
    norseDeity: "Frigg / Freyja (Goddess of Love and Fertility)",
    sanskritName: "Shukravara (शुक्रवार)",
    sanskritMeaning: "Shukra (Venus, arts, beauty and harmony)",
    japaneseName: "Kinyōbi (金曜日)",
    japaneseMeaning: "Gold / Metal Day (金 = Gold / Venus)",
    keyTrivia: [
      "Named after the Norse goddess Frigg (or Freyja), associated with love, beauty, and destiny.",
      "In Islamic tradition, Friday (Jum'ah) is the sacred day of weekly congregational prayers.",
      "Good Friday is observed globally prior to Easter Sunday in solemn remembrance of the crucifixion of Jesus.",
      "When a Friday coincides with the 13th day of any month, it is associated with the superstition of paraskevidekatriaphobia."
    ]
  },
  Saturday: {
    dayName: "Saturday",
    indexSunday0: 6,
    indexMonday1: 6,
    celestialBody: "Saturn (Cronus)",
    romanDeity: "Saturnus (God of Agriculture & Wealth)",
    norseDeity: "Lørdag (Washing Day in Scandinavian tradition)",
    sanskritName: "Shanivara (शनिवार)",
    sanskritMeaning: "Shani (Saturn, discipline and karma)",
    japaneseName: "Doyōbi (土曜日)",
    japaneseMeaning: "Earth / Soil Day (土 = Earth / Saturn)",
    keyTrivia: [
      "Saturday is the official day of rest (Shabbat) in Judaism, observed from Friday sunset to Saturday nightfall.",
      "Australia and New Zealand legally mandate all federal and state parliamentary elections to be held on Saturdays.",
      "Saturday is the only day of the English week that retains its original Roman deity name (Saturn) without Germanic substitution.",
      "In Scandinavian languages, Saturday is 'Lördag' or 'Lørdag', derived from Old Norse laugardagr, meaning 'bath day'."
    ]
  }
};

// =========================================================================
// 2. MAIN CALCULATION FUNCTION WITH SYNCHRONIZED CALENDAR
// =========================================================================

export function calculateDayOfWeek(params: DayOfWeekParams): DayOfWeekResult {
  const calendarSystem = params.calendarSystem === "julian" ? "julian" : "gregorian";
  const isJulian = calendarSystem === "julian";
  const year = params.year;
  const month = params.month; // 0-11
  const day = params.day;

  // 1. Strict validation
  const validation = isValidCalendarDate(year, month, day, isJulian);
  const isValid = validation.isValid;

  // Authoritative calculation
  const safeDay = isValid ? day : Math.min(getDaysInMonth(year, month, isJulian), Math.max(1, day));
  const weekdayInfo = getWeekdayForCalendarDate(year, month, safeDay, calendarSystem);

  // Day of year calculation
  const isLeap = isLeapYear(year, isJulian);
  const totalDaysInYear = isLeap ? 366 : 365;
  const monthDays = [31, isLeap ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  let dayOfYear = 0;
  if (month >= 0 && month <= 11) {
    for (let i = 0; i < month; i++) {
      dayOfYear += monthDays[i];
    }
    dayOfYear += safeDay;
  }
  const daysRemainingInYear = totalDaysInYear - dayOfYear;

  // ISO 8601 Week Number (Strict Year 1-9999 Safe)
  // JavaScript's new Date(year, ...) interprets 0-99 as 1900-1999!
  // To prevent this bug, we use setUTCFullYear(year):
  const d = new Date(Date.UTC(2000, Math.max(0, Math.min(11, month)), safeDay));
  d.setUTCFullYear(year);
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const targetIsoYear = d.getUTCFullYear();
  const yearStart = new Date(Date.UTC(2000, 0, 1));
  yearStart.setUTCFullYear(targetIsoYear);
  const isoWeekNumber = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);

  // Synchronized Calendar Grid:
  // Use the ACTIVE calendar system to compute the 1st day of the month!
  const firstDayInfo = getWeekdayForCalendarDate(year, month, 1, calendarSystem);
  const firstDayOfWeekIndex = firstDayInfo.dayOfWeekIndex; // 0=Sunday, 1=Monday... in ACTIVE calendar!
  const daysInMonth = getDaysInMonth(year, month, isJulian);

  const formattedDate = `${MONTH_NAMES[month] || "Unknown"} ${day}, ${year}`;
  const etymology = DAY_ETYMOLOGY_DATABASE[weekdayInfo.dayName] || DAY_ETYMOLOGY_DATABASE["Sunday"];

  return {
    isValid,
    errorMessage: validation.errorMessage,
    dayName: weekdayInfo.dayName,
    dayOfWeekIndex: weekdayInfo.dayOfWeekIndex,
    isoDayOfWeekIndex: weekdayInfo.isoDayOfWeekIndex,
    formattedDate,
    dayOfYear,
    totalDaysInYear,
    daysRemainingInYear,
    isoWeekNumber,
    isLeapYear: isLeap,
    calendarSystem,
    zellerSteps: weekdayInfo.zellerSteps,
    etymology,
    calendarGrid: {
      year,
      month,
      daysInMonth,
      firstDayOfWeekIndex,
      selectedDay: day,
    },
  };
}

// =========================================================================
// 3. STRICT BATCH MULTI-DATE PARSER
// =========================================================================

export function parseBatchDates(
  text: string,
  calendarSystem: "gregorian" | "julian" = "gregorian"
): BatchDateResultItem[] {
  const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);
  const results: BatchDateResultItem[] = [];

  for (const line of lines.slice(0, 100)) {
    // Match standard YYYY-MM-DD or YYYY/MM/DD
    const match = line.match(/^(\d{1,4})[-/.](\d{1,2})[-/.](\d{1,2})$/);
    if (match) {
      const year = parseInt(match[1], 10);
      const month = parseInt(match[2], 10) - 1; // 0-indexed
      const day = parseInt(match[3], 10);

      const val = isValidCalendarDate(year, month, day, calendarSystem === "julian");
      if (val.isValid) {
        const res = calculateDayOfWeek({ year, month, day, calendarSystem });
        results.push({
          dateString: line,
          dayName: res.dayName,
          dayOfYear: res.dayOfYear,
          totalDaysInYear: res.totalDaysInYear,
          isoWeekNumber: res.isoWeekNumber,
          isLeapYear: res.isLeapYear,
          isValid: true,
        });
      } else {
        results.push({
          dateString: line,
          dayName: "Invalid Date",
          dayOfYear: 0,
          totalDaysInYear: 0,
          isoWeekNumber: 0,
          isLeapYear: false,
          isValid: false,
          errorMessage: val.errorMessage,
        });
      }
    } else {
      results.push({
        dateString: line,
        dayName: "Invalid Date",
        dayOfYear: 0,
        totalDaysInYear: 0,
        isoWeekNumber: 0,
        isLeapYear: false,
        isValid: false,
        errorMessage: "Malformed format. Expected YYYY-MM-DD.",
      });
    }
  }

  return results;
}
