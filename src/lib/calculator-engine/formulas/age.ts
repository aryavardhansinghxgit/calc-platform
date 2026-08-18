/**
 * High-Precision Mathematical & Astronomical Logic for Age & Date Interval Calculations.
 */

export type LeapYearRule = "feb28" | "mar1";
export type MonthEndRule = "sequential" | "eom_anchor";
export type CulturalSystem = "western" | "chinese" | "korean";

export interface AgeCalculatorOptions {
  birthDate: string; // YYYY-MM-DD
  targetDate?: string; // YYYY-MM-DD (defaults to today)
  leapYearRule?: LeapYearRule; // for Feb 29 births in non-leap years
  monthEndRule?: MonthEndRule; // sequential vs end-of-month anchoring
  includeEndDay?: boolean; // inclusive counting (+1 day)
  culturalSystem?: CulturalSystem;
}

export interface SubUnitMatrix {
  yearsMonthsDays: string;
  totalMonthsDays: string;
  totalWeeksDays: string;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  totalBusinessDays: number;
  totalWeekendDays: number;
}

export interface NextBirthdayInfo {
  nextBirthdayDate: string; // YYYY-MM-DD
  dayOfWeek: string;
  daysRemaining: number;
  hoursRemaining: number;
  minutesRemaining: number;
  secondsRemaining: number;
  turningAge: number;
  halfBirthdayDate: string; // YYYY-MM-DD
  halfBirthdayDays: number;
}

export interface ZodiacInfo {
  westernSign: string;
  westernSymbol: string;
  westernElement: string;
  westernDates: string;
  chineseAnimal: string;
  chineseElement: string;
  chineseYinYang: string;
}

export interface PlanetAge {
  planet: string;
  orbitalDays: number;
  ageOnPlanet: number;
  nextPlanetBirthdayDays: number;
}

export interface MilestoneItem {
  name: string;
  date: string;
  daysRemaining: number;
  isPast: boolean;
  description: string;
}

export interface DetailedAgeResult {
  years: number;
  months: number;
  days: number;
  matrix: SubUnitMatrix;
  nextBirthday: NextBirthdayInfo;
  currentYearProgressPercent: number; // 0 to 100% through current age year
  zodiac: ZodiacInfo;
  planetAges: PlanetAge[];
  milestones: MilestoneItem[];
  culturalAges: {
    western: number;
    chineseSui: number;
    koreanAge: number;
  };
  goldenBirthday: {
    age: number;
    date: string;
    isPast: boolean;
  };
}

/**
 * Checks if a given year is a leap year according to the Gregorian calendar rules.
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Returns number of days in a given month and year.
 */
export function getDaysInMonth(year: number, monthIndex: number): number {
  return new Date(year, monthIndex + 1, 0).getDate();
}

/**
 * Parses YYYY-MM-DD safely into year, month (0-indexed), and day.
 */
export function parseDateParts(dateStr: string): { year: number; month: number; day: number } | null {
  if (!dateStr) return null;
  const parts = dateStr.split("-").map((p) => parseInt(p, 10));
  if (parts.length !== 3 || parts.some(isNaN)) return null;
  return { year: parts[0], month: parts[1] - 1, day: parts[2] };
}

/**
 * Formats a Date object to YYYY-MM-DD in local time.
 */
export function formatDateYMD(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Calculates Western Zodiac from month (0-indexed) and day.
 */
export function getWesternZodiac(month: number, day: number): {
  sign: string;
  symbol: string;
  element: string;
  dates: string;
} {
  const m = month + 1; // 1-12
  if ((m === 3 && day >= 21) || (m === 4 && day <= 19))
    return { sign: "Aries", symbol: "♈", element: "Fire", dates: "Mar 21 – Apr 19" };
  if ((m === 4 && day >= 20) || (m === 5 && day <= 20))
    return { sign: "Taurus", symbol: "♉", element: "Earth", dates: "Apr 20 – May 20" };
  if ((m === 5 && day >= 21) || (m === 6 && day <= 20))
    return { sign: "Gemini", symbol: "♊", element: "Air", dates: "May 21 – Jun 20" };
  if ((m === 6 && day >= 21) || (m === 7 && day <= 22))
    return { sign: "Cancer", symbol: "♋", element: "Water", dates: "Jun 21 – Jul 22" };
  if ((m === 7 && day >= 23) || (m === 8 && day <= 22))
    return { sign: "Leo", symbol: "♌", element: "Fire", dates: "Jul 23 – Aug 22" };
  if ((m === 8 && day >= 23) || (m === 9 && day <= 22))
    return { sign: "Virgo", symbol: "♍", element: "Earth", dates: "Aug 23 – Sep 22" };
  if ((m === 9 && day >= 23) || (m === 10 && day <= 22))
    return { sign: "Libra", symbol: "♎", element: "Air", dates: "Sep 23 – Oct 22" };
  if ((m === 10 && day >= 23) || (m === 11 && day <= 21))
    return { sign: "Scorpio", symbol: "♏", element: "Water", dates: "Oct 23 – Nov 21" };
  if ((m === 11 && day >= 22) || (m === 12 && day <= 21))
    return { sign: "Sagittarius", symbol: "♐", element: "Fire", dates: "Nov 22 – Dec 21" };
  if ((m === 12 && day >= 22) || (m === 1 && day <= 19))
    return { sign: "Capricorn", symbol: "♑", element: "Earth", dates: "Dec 22 – Jan 19" };
  if ((m === 1 && day >= 20) || (m === 2 && day <= 18))
    return { sign: "Aquarius", symbol: "♒", element: "Air", dates: "Jan 20 – Feb 18" };
  return { sign: "Pisces", symbol: "♓", element: "Water", dates: "Feb 19 – Mar 20" };
}

/**
 * Calculates Chinese Zodiac Animal and Wu Xing Element.
 */
export function getChineseZodiac(birthYear: number): {
  animal: string;
  element: string;
  yinYang: string;
} {
  const animals = [
    "Rat 🐀", "Ox 🐂", "Tiger 🐅", "Rabbit 🐇", "Dragon 🐉", "Snake 🐍",
    "Horse 🐎", "Goat 🐐", "Monkey 🐒", "Rooster 🐓", "Dog 🐕", "Pig 🐖",
  ];
  // 1900 was Year of the Rat (index 0)
  const animalIndex = Math.abs((birthYear - 1900) % 12);
  const animal = animals[animalIndex];

  // Stem element based on last digit of solar year
  const lastDigit = birthYear % 10;
  let element = "Metal";
  if (lastDigit === 0 || lastDigit === 1) element = "Metal 🪙";
  else if (lastDigit === 2 || lastDigit === 3) element = "Water 💧";
  else if (lastDigit === 4 || lastDigit === 5) element = "Wood 🌲";
  else if (lastDigit === 6 || lastDigit === 7) element = "Fire 🔥";
  else if (lastDigit === 8 || lastDigit === 9) element = "Earth ⛰️";

  const yinYang = birthYear % 2 === 0 ? "Yang" : "Yin";

  return { animal, element, yinYang };
}

/**
 * Main Pure Age Calculation Function
 */
export function calculateDetailedAge(options: AgeCalculatorOptions): DetailedAgeResult {
  const todayStr = formatDateYMD(new Date());
  const birthStr = options.birthDate || "2000-01-01";
  const targetStr = options.targetDate || todayStr;
  const leapRule = options.leapYearRule || "feb28";
  const monthEndRule = options.monthEndRule || "sequential";
  const includeEnd = options.includeEndDay || false;

  const bParts = parseDateParts(birthStr) || { year: 2000, month: 0, day: 1 };
  const tParts = parseDateParts(targetStr) || { year: 2026, month: 7, day: 18 };

  const bDate = new Date(bParts.year, bParts.month, bParts.day, 0, 0, 0, 0);
  const tDate = new Date(tParts.year, tParts.month, tParts.day, 0, 0, 0, 0);

  // Handle future birth date
  if (bDate.getTime() > tDate.getTime()) {
    const emptyMatrix: SubUnitMatrix = {
      yearsMonthsDays: "0 years, 0 months, 0 days",
      totalMonthsDays: "0 months, 0 days",
      totalWeeksDays: "0 weeks, 0 days",
      totalDays: 0,
      totalHours: 0,
      totalMinutes: 0,
      totalSeconds: 0,
      totalBusinessDays: 0,
      totalWeekendDays: 0,
    };
    return {
      years: 0,
      months: 0,
      days: 0,
      matrix: emptyMatrix,
      nextBirthday: {
        nextBirthdayDate: birthStr,
        dayOfWeek: "Unknown",
        daysRemaining: 0,
        hoursRemaining: 0,
        minutesRemaining: 0,
        secondsRemaining: 0,
        turningAge: 0,
        halfBirthdayDate: birthStr,
        halfBirthdayDays: 0,
      },
      currentYearProgressPercent: 0,
      zodiac: {
        westernSign: "Unknown",
        westernSymbol: "",
        westernElement: "",
        westernDates: "",
        chineseAnimal: "Unknown",
        chineseElement: "",
        chineseYinYang: "",
      },
      planetAges: [],
      milestones: [],
      culturalAges: { western: 0, chineseSui: 1, koreanAge: 1 },
      goldenBirthday: { age: bParts.day, date: "", isPast: false },
    };
  }

  // Calculate Years, Months, Days
  let years = tParts.year - bParts.year;
  let months = tParts.month - bParts.month;
  let days = tParts.day - bParts.day + (includeEnd ? 1 : 0);

  // Handle Feb 29 birth date adjustment
  const isFeb29Birth = bParts.month === 1 && bParts.day === 29;

  // Day borrow logic
  if (days < 0) {
    months--;
    // Days in preceding month before target month
    const prevMonthYear = tParts.month === 0 ? tParts.year - 1 : tParts.year;
    const prevMonthIndex = tParts.month === 0 ? 11 : tParts.month - 1;
    const daysInPrevMonth = getDaysInMonth(prevMonthYear, prevMonthIndex);

    if (monthEndRule === "eom_anchor") {
      // If birth day was end of month (e.g. Feb 28 in non-leap or 31st)
      const bMonthDays = getDaysInMonth(bParts.year, bParts.month);
      const isBirthEom = bParts.day === bMonthDays;
      const tMonthDays = getDaysInMonth(tParts.year, tParts.month);
      const isTargetEom = tParts.day === tMonthDays;

      if (isBirthEom && isTargetEom) {
        days = 0;
        months++;
      } else {
        days += daysInPrevMonth;
      }
    } else {
      days += daysInPrevMonth;
    }
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Calculate Total Days lived
  const diffMs = tDate.getTime() - bDate.getTime();
  let totalDays = Math.floor(diffMs / 86400000) + (includeEnd ? 1 : 0);
  if (totalDays < 0) totalDays = 0;

  // Calculate Total Months & Remainder Days
  const totalMonthsCount = years * 12 + months;
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDaysAfterWeeks = totalDays % 7;
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  // Calculate Business Days (Mon-Fri) vs Weekend Days
  let businessDays = 0;
  let weekendDays = 0;
  const curr = new Date(bDate);
  const endLimit = new Date(tDate);
  if (includeEnd) {
    endLimit.setDate(endLimit.getDate() + 1);
  }
  // Fast approximate or exact for reasonable spans
  if (totalDays < 15000) {
    while (curr < endLimit) {
      const dayOfWeek = curr.getDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDays++;
      } else {
        businessDays++;
      }
      curr.setDate(curr.getDate() + 1);
    }
  } else {
    // Math approximation for very large ranges
    const fullWeeks = Math.floor(totalDays / 7);
    const remDays = totalDays % 7;
    businessDays = fullWeeks * 5;
    weekendDays = fullWeeks * 2;
    for (let i = 0; i < remDays; i++) {
      const dow = (bDate.getDay() + i) % 7;
      if (dow === 0 || dow === 6) weekendDays++;
      else businessDays++;
    }
  }

  // Next Birthday Calculation
  let nextBdayYear = tParts.year;
  let nextBdayMonth = bParts.month;
  let nextBdayDay = bParts.day;

  // Adjust for Feb 29 birth in non-leap year
  if (isFeb29Birth && !isLeapYear(nextBdayYear)) {
    if (leapRule === "mar1") {
      nextBdayMonth = 2; // March
      nextBdayDay = 1;
    } else {
      nextBdayMonth = 1; // Feb
      nextBdayDay = 28;
    }
  }

  let nextBday = new Date(nextBdayYear, nextBdayMonth, nextBdayDay, 0, 0, 0, 0);
  if (nextBday.getTime() <= tDate.getTime()) {
    nextBdayYear += 1;
    if (isFeb29Birth && !isLeapYear(nextBdayYear)) {
      if (leapRule === "mar1") {
        nextBdayMonth = 2;
        nextBdayDay = 1;
      } else {
        nextBdayMonth = 1;
        nextBdayDay = 28;
      }
    } else if (isFeb29Birth) {
      nextBdayMonth = 1;
      nextBdayDay = 29;
    }
    nextBday = new Date(nextBdayYear, nextBdayMonth, nextBdayDay, 0, 0, 0, 0);
  }

  const nextBdayMs = nextBday.getTime() - tDate.getTime();
  const nextBdayDays = Math.max(0, Math.ceil(nextBdayMs / 86400000));
  const nextBdayHours = nextBdayDays * 24;
  const nextBdayMinutes = nextBdayHours * 60;
  const nextBdaySeconds = nextBdayMinutes * 60;
  const turningAge = years + 1;

  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const nextBdayDayOfWeek = dayNames[nextBday.getDay()];

  // Previous Birthday to calculate year progress percentage
  let prevBdayYear = nextBdayYear - 1;
  let prevBdayMonth = bParts.month;
  let prevBdayDay = bParts.day;
  if (isFeb29Birth && !isLeapYear(prevBdayYear)) {
    prevBdayMonth = leapRule === "mar1" ? 2 : 1;
    prevBdayDay = leapRule === "mar1" ? 1 : 28;
  }
  const prevBday = new Date(prevBdayYear, prevBdayMonth, prevBdayDay, 0, 0, 0, 0);
  const yearSpanMs = nextBday.getTime() - prevBday.getTime();
  const elapsedInYearMs = tDate.getTime() - prevBday.getTime();
  let yearProgressPct = Math.min(100, Math.max(0, (elapsedInYearMs / yearSpanMs) * 100));

  // Half Birthday Calculation (6 months after previous birthday)
  const halfBday = new Date(prevBday);
  halfBday.setMonth(halfBday.getMonth() + 6);
  let nextHalfBday = halfBday;
  if (nextHalfBday.getTime() < tDate.getTime()) {
    nextHalfBday = new Date(nextBday);
    nextHalfBday.setMonth(nextHalfBday.getMonth() - 6);
    if (nextHalfBday.getTime() < tDate.getTime()) {
      nextHalfBday = new Date(nextBday);
      nextHalfBday.setMonth(nextHalfBday.getMonth() + 6);
    }
  }
  const halfBdayDays = Math.max(0, Math.ceil((nextHalfBday.getTime() - tDate.getTime()) / 86400000));

  // Zodiac Info
  const western = getWesternZodiac(bParts.month, bParts.day);
  const chinese = getChineseZodiac(bParts.year);

  // Planetary Ages (Orbital revolution period in Earth days)
  const planets = [
    { planet: "Mercury", orbitalDays: 87.97 },
    { planet: "Venus", orbitalDays: 224.7 },
    { planet: "Earth", orbitalDays: 365.256 },
    { planet: "Mars", orbitalDays: 686.98 },
    { planet: "Jupiter", orbitalDays: 4332.59 },
    { planet: "Saturn", orbitalDays: 10759.22 },
    { planet: "Uranus", orbitalDays: 30685.4 },
    { planet: "Neptune", orbitalDays: 60189.0 },
  ];

  const planetAges: PlanetAge[] = planets.map((p) => {
    const ageOnP = totalDays / p.orbitalDays;
    const nextPlanetAgeInt = Math.floor(ageOnP) + 1;
    const daysToNextP = Math.max(0, Math.ceil(nextPlanetAgeInt * p.orbitalDays - totalDays));
    return {
      planet: p.planet,
      orbitalDays: p.orbitalDays,
      ageOnPlanet: parseFloat(ageOnP.toFixed(2)),
      nextPlanetBirthdayDays: daysToNextP,
    };
  });

  // Milestones
  const milestoneDays = [
    { target: 1000, label: "1,000 Days Alive" },
    { target: 5000, label: "5,000 Days Alive" },
    { target: 10000, label: "10,000 Days Milestone (~27.4 yrs)" },
    { target: 15000, label: "15,000 Days Milestone (~41.1 yrs)" },
    { target: 20000, label: "20,000 Days Milestone (~54.8 yrs)" },
    { target: 25000, label: "25,000 Days Milestone (~68.5 yrs)" },
    { target: 30000, label: "30,000 Days Milestone (~82.1 yrs)" },
  ];

  const milestones: MilestoneItem[] = milestoneDays.map((m) => {
    const mDate = new Date(bDate);
    mDate.setDate(mDate.getDate() + m.target);
    const daysDiff = Math.ceil((mDate.getTime() - tDate.getTime()) / 86400000);
    return {
      name: m.label,
      date: formatDateYMD(mDate),
      daysRemaining: Math.abs(daysDiff),
      isPast: daysDiff <= 0,
      description: daysDiff <= 0 ? `Achieved on ${formatDateYMD(mDate)}` : `Occurs on ${formatDateYMD(mDate)}`,
    };
  });

  // 1 Billion Seconds Milestone (~31.7 years)
  const billionSecDate = new Date(bDate.getTime() + 1000000000 * 1000);
  const billionSecDiffDays = Math.ceil((billionSecDate.getTime() - tDate.getTime()) / 86400000);
  milestones.push({
    name: "1 Billion Seconds Alive",
    date: formatDateYMD(billionSecDate),
    daysRemaining: Math.abs(billionSecDiffDays),
    isPast: billionSecDiffDays <= 0,
    description: billionSecDiffDays <= 0 ? `Achieved on ${formatDateYMD(billionSecDate)}` : `Occurs on ${formatDateYMD(billionSecDate)}`,
  });

  // Golden Birthday: Turning the age of your day of birth (e.g. 18th birthday on 18th of month)
  const goldenDate = new Date(bParts.year + bParts.day, bParts.month, bParts.day);
  const isGoldenPast = goldenDate.getTime() <= tDate.getTime();

  // Cultural Ages
  // Traditional Chinese (Sui): Starts at 1 at birth, increments on Chinese New Year. Approximate = (targetYear - birthYear) + 1
  const chineseSui = years + 1;
  // Traditional Korean: 1 at birth, increments on Jan 1st each year = (targetYear - birthYear) + 1
  const koreanAge = tParts.year - bParts.year + 1;

  const matrix: SubUnitMatrix = {
    yearsMonthsDays: `${years} years, ${months} months, ${days} days`,
    totalMonthsDays: `${totalMonthsCount} months, ${days} days`,
    totalWeeksDays: `${totalWeeks} weeks, ${remainingDaysAfterWeeks} days`,
    totalDays,
    totalHours,
    totalMinutes,
    totalSeconds,
    totalBusinessDays: businessDays,
    totalWeekendDays: weekendDays,
  };

  return {
    years,
    months,
    days,
    matrix,
    nextBirthday: {
      nextBirthdayDate: formatDateYMD(nextBday),
      dayOfWeek: nextBdayDayOfWeek,
      daysRemaining: nextBdayDays,
      hoursRemaining: nextBdayHours,
      minutesRemaining: nextBdayMinutes,
      secondsRemaining: nextBdaySeconds,
      turningAge,
      halfBirthdayDate: formatDateYMD(nextHalfBday),
      halfBirthdayDays: halfBdayDays,
    },
    currentYearProgressPercent: parseFloat(yearProgressPct.toFixed(1)),
    zodiac: {
      westernSign: western.sign,
      westernSymbol: western.symbol,
      westernElement: western.element,
      westernDates: western.dates,
      chineseAnimal: chinese.animal,
      chineseElement: chinese.element,
      chineseYinYang: chinese.yinYang,
    },
    planetAges,
    milestones,
    culturalAges: {
      western: years,
      chineseSui,
      koreanAge,
    },
    goldenBirthday: {
      age: bParts.day,
      date: formatDateYMD(goldenDate),
      isPast: isGoldenPast,
    },
  };
}
