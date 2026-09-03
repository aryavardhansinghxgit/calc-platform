export type PregnancyMode =
  | "lmp"
  | "due-date"
  | "conception"
  | "ultrasound"
  | "ivf"
  | "custom"
  | "reverse";

export type PregnancyType = "single" | "twins" | "triplets";
export type EmbryoAge = "day3" | "day5" | "day6";
export type UnitSystem = "imperial" | "metric";

export interface PregnancyInputs {
  mode: PregnancyMode;
  lmpDate?: string;
  dueDate?: string;
  conceptionDate?: string;
  ultrasoundDate?: string;
  ultrasoundWeeks?: number;
  ultrasoundDays?: number;
  ivfDate?: string;
  embryoAge?: EmbryoAge;
  customStartDate?: string;
  targetDueDate?: string; // For reverse due date mode
  cycleLength?: number; // default 28
  pregnancyType?: PregnancyType;
  motherAge?: number;
  heightCm?: number;
  heightFt?: number;
  heightIn?: number;
  preWeightKg?: number;
  preWeightLbs?: number;
  currentWeightKg?: number;
  currentWeightLbs?: number;
  unitSystem?: UnitSystem;
  referenceDate?: string; // Deterministic test reference date (YYYY-MM-DD)
}

export interface MilestoneItem {
  id: string;
  title: string;
  week: number;
  dateStr: string;
  description: string;
  category: "clinical" | "developmental" | "lifestyle";
  isPassed: boolean;
}

export interface WeightGainMetrics {
  preBmi: number;
  bmiCategory: "Underweight" | "Normal Weight" | "Overweight" | "Obese";
  minRecommendedLbs: number;
  maxRecommendedLbs: number;
  minRecommendedKg: number;
  maxRecommendedKg: number;
  minWeekGainLbs: number;
  maxWeekGainLbs: number;
  currentGainLbs: number;
  currentGainKg: number;
  expectedGainLbs: number;
  expectedGainKg: number;
  status: "Below Target" | "On Track" | "Above Target" | "Not Calculated";
  weeklyRateLbs: string;
}

export interface ProbabilityMetrics {
  exactDueDatePercent: number; // ~4%
  plusMinusOneWeekPercent: number; // ~60%
  plusMinusTwoWeeksPercent: number; // ~90%
  earlyTermRange: string; // 37w0d - 38w6d
  fullTermRange: string; // 39w0d - 40w6d
  lateTermRange: string; // 41w0d - 41w6d
  postTermRange: string; // 42w0d+
}

export interface TrimesterInfo {
  trimester: 1 | 2 | 3;
  name: string;
  startDateStr: string;
  endDateStr: string;
  weeksRange: string;
  progressPercent: number;
}

export interface PregnancyCalculationResults {
  mode: PregnancyMode;
  lmpDateStr: string;
  conceptionDateStr: string;
  dueDateStr: string;
  gestationalAgeWeeks: number;
  gestationalAgeDays: number;
  totalDaysPregnant: number;
  daysRemaining: number;
  percentComplete: number;
  currentTrimester: 1 | 2 | 3;
  trimesters: TrimesterInfo[];
  estimatedBirthWindowStart: string;
  estimatedBirthWindowEnd: string;
  milestones: MilestoneItem[];
  weightMetrics: WeightGainMetrics;
  probability: ProbabilityMetrics;
  reverseDetails?: {
    estimatedLmp: string;
    estimatedConception: string;
    estimatedIvfDay5: string;
    estimatedUltrasound8W: string;
  };
}

// Calendar-safe date arithmetic functions (DST immune)
export function parseLocalDate(dateStr: string): Date {
  if (!dateStr) return new Date();
  const [year, month, day] = dateStr.split("-").map(Number);
  if (!year || !month || !day) return new Date();
  return new Date(year, month - 1, day);
}

export function formatDateStr(date: Date): string {
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function formatNiceDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function addDays(date: Date, days: number): Date {
  const res = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  res.setDate(res.getDate() + days);
  return res;
}

export function diffDays(d1: Date, d2: Date): number {
  const u1 = Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const u2 = Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate());
  return Math.round((u1 - u2) / 86400000);
}

export function calculatePregnancy(inputs: PregnancyInputs): PregnancyCalculationResults {
  const mode = inputs.mode || "lmp";
  const cycle = Number(inputs.cycleLength) || 28;
  const cycleAdj = cycle - 28;
  const pregType = inputs.pregnancyType || "single";

  // Standard gestational duration from LMP:
  // Single = 280 days (40 weeks)
  // Twins = 259 days (37 weeks)
  // Triplets = 238 days (34 weeks)
  const totalStandardDays = pregType === "triplets" ? 238 : pregType === "twins" ? 259 : 280;

  let estimatedLmpDate: Date;
  let estimatedDueDate: Date;
  let estimatedConceptionDate: Date;

  // Use deterministic reference date if provided; otherwise current system local date
  const today = inputs.referenceDate ? parseLocalDate(inputs.referenceDate) : new Date();
  today.setHours(0, 0, 0, 0);

  if (mode === "lmp") {
    const lmp = parseLocalDate(inputs.lmpDate || formatDateStr(today));
    estimatedLmpDate = lmp;
    estimatedDueDate = addDays(lmp, totalStandardDays + cycleAdj);
    estimatedConceptionDate = addDays(lmp, 14 + cycleAdj);
  } else if (mode === "due-date") {
    const due = parseLocalDate(inputs.dueDate || formatDateStr(addDays(today, 200)));
    estimatedDueDate = due;
    estimatedLmpDate = addDays(due, -(totalStandardDays + cycleAdj));
    estimatedConceptionDate = addDays(due, -(totalStandardDays - 14));
  } else if (mode === "conception") {
    const conc = parseLocalDate(inputs.conceptionDate || formatDateStr(addDays(today, -30)));
    estimatedConceptionDate = conc;
    estimatedLmpDate = addDays(conc, -14);
    estimatedDueDate = addDays(conc, totalStandardDays - 14);
  } else if (mode === "ultrasound") {
    const usDate = parseLocalDate(inputs.ultrasoundDate || formatDateStr(today));
    const usWeeks = Number(inputs.ultrasoundWeeks) || 8;
    const usDays = Number(inputs.ultrasoundDays) || 0;
    const daysAtUs = usWeeks * 7 + usDays;
    estimatedLmpDate = addDays(usDate, -daysAtUs);
    estimatedDueDate = addDays(estimatedLmpDate, totalStandardDays);
    estimatedConceptionDate = addDays(estimatedLmpDate, 14);
  } else if (mode === "ivf") {
    const transfer = parseLocalDate(inputs.ivfDate || formatDateStr(today));
    const age = inputs.embryoAge || "day5";
    const embryoDays = age === "day3" ? 3 : age === "day6" ? 6 : 5;
    estimatedConceptionDate = addDays(transfer, -embryoDays);
    estimatedLmpDate = addDays(estimatedConceptionDate, -14);
    estimatedDueDate = addDays(estimatedConceptionDate, totalStandardDays - 14);
  } else if (mode === "custom") {
    const customStart = parseLocalDate(inputs.customStartDate || formatDateStr(today));
    estimatedLmpDate = customStart;
    estimatedDueDate = addDays(customStart, totalStandardDays);
    estimatedConceptionDate = addDays(customStart, 14);
  } else {
    // Reverse due date mode
    const targetDue = parseLocalDate(inputs.targetDueDate || formatDateStr(addDays(today, 180)));
    estimatedDueDate = targetDue;
    estimatedLmpDate = addDays(targetDue, -(totalStandardDays + cycleAdj));
    estimatedConceptionDate = addDays(targetDue, -(totalStandardDays - 14));
  }

  // Calculate Gestational Age using calendar days
  const diffFromLmp = Math.max(0, diffDays(today, estimatedLmpDate));
  const totalDaysPregnant = Math.min(diffFromLmp, totalStandardDays + 21);
  const gestationalAgeWeeks = Math.floor(totalDaysPregnant / 7);
  const gestationalAgeDays = totalDaysPregnant % 7;
  const daysRemaining = Math.max(0, diffDays(estimatedDueDate, today));
  const percentComplete = Math.min(100, Math.max(0, Math.round((totalDaysPregnant / totalStandardDays) * 100)));

  // Determine Trimester
  let currentTrimester: 1 | 2 | 3 = 1;
  if (gestationalAgeWeeks >= 28) currentTrimester = 3;
  else if (gestationalAgeWeeks >= 13) currentTrimester = 2;

  // Trimester Dates
  const t1Start = estimatedLmpDate;
  const t1End = addDays(estimatedLmpDate, 13 * 7);
  const t2Start = addDays(estimatedLmpDate, 13 * 7 + 1);
  const t2End = addDays(estimatedLmpDate, 27 * 7);
  const t3Start = addDays(estimatedLmpDate, 27 * 7 + 1);
  const t3End = estimatedDueDate;

  const trimesters: TrimesterInfo[] = [
    {
      trimester: 1,
      name: "First Trimester",
      startDateStr: formatNiceDate(t1Start),
      endDateStr: formatNiceDate(t1End),
      weeksRange: "Weeks 1–13",
      progressPercent: Math.min(100, Math.max(0, Math.round((totalDaysPregnant / (13 * 7)) * 100))),
    },
    {
      trimester: 2,
      name: "Second Trimester",
      startDateStr: formatNiceDate(t2Start),
      endDateStr: formatNiceDate(t2End),
      weeksRange: "Weeks 14–27",
      progressPercent: Math.min(100, Math.max(0, Math.round((Math.max(0, totalDaysPregnant - 13 * 7) / (14 * 7)) * 100))),
    },
    {
      trimester: 3,
      name: "Third Trimester",
      startDateStr: formatNiceDate(t3Start),
      endDateStr: formatNiceDate(t3End),
      weeksRange: pregType === "triplets" ? "Weeks 28–34" : pregType === "twins" ? "Weeks 28–37" : "Weeks 28–40+",
      progressPercent: Math.min(100, Math.max(0, Math.round((Math.max(0, totalDaysPregnant - 27 * 7) / Math.max(1, (totalStandardDays - 27 * 7))) * 100))),
    },
  ];

  // Clinical Birth Windows:
  // - Singleton: 37w0d to 42w0d (ACOG term to post-term boundary)
  // - Twins: 36w0d to 38w6d (ACOG/SMFM uncomplicated twin target interval)
  // - Triplets: 32w0d to 35w0d (ACOG/SMFM multiple gestation interval)
  let windowStart: Date;
  let windowEnd: Date;
  if (pregType === "triplets") {
    windowStart = addDays(estimatedLmpDate, 32 * 7);
    windowEnd = addDays(estimatedLmpDate, 35 * 7);
  } else if (pregType === "twins") {
    windowStart = addDays(estimatedLmpDate, 36 * 7);
    windowEnd = addDays(estimatedLmpDate, 38 * 7 + 6);
  } else {
    windowStart = addDays(estimatedLmpDate, 37 * 7);
    windowEnd = addDays(estimatedLmpDate, 42 * 7);
  }

  // Milestones Engine
  const milestoneDefs: Array<{ id: string; title: string; week: number; category: "clinical" | "developmental" | "lifestyle"; description: string }> = [
    { id: "conception", title: "Fertilization & Conception", week: 2, category: "developmental", description: "Sperm fertilizes egg in fallopian tube." },
    { id: "implantation", title: "Embryo Implantation", week: 3, category: "developmental", description: "Blastocyst implants into nutrient-rich endometrial lining." },
    { id: "pos-test", title: "Positive Pregnancy Test Window", week: 4, category: "clinical", description: "hCG hormone levels detectable by home urine test." },
    { id: "heartbeat", title: "First Heartbeat Detection", week: 6, category: "clinical", description: "Cardiac activity visible via transvaginal ultrasound." },
    { id: "first-us", title: "First Trimester Dating Ultrasound", week: 10, category: "clinical", description: "Confirms gestational age & heartbeat visual." },
    { id: "nipt", title: "NIPT / Genetic Screening Window", week: 11, category: "clinical", description: "Cell-free DNA screening for chromosomal conditions." },
    { id: "t2-start", title: "Second Trimester Begins", week: 13, category: "lifestyle", description: "Morning sickness often fades; energy returns." },
    { id: "quickening", title: "First Baby Movements (Quickening)", week: 18, category: "developmental", description: "Mother feels subtle fluttering baby kicks." },
    { id: "anatomy-scan", title: "Anatomy Scan Ultrasound", week: 20, category: "clinical", description: "Detailed 20-week scan examining organs and anatomy." },
    { id: "viability", title: "Fetal Viability Milestone", week: 24, category: "clinical", description: "Baby reaches 24-week survival milestone with neonatal intensive support." },
    { id: "glucose", title: "Gestational Diabetes Screening", week: 26, category: "clinical", description: "Glucose challenge blood testing window." },
    { id: "t3-start", title: "Third Trimester Begins", week: 28, category: "lifestyle", description: "Final stretch! Rapid fetal brain & lung surfactant development." },
    { id: "gbs-test", title: "Group B Strep (GBS) Screening", week: 36, category: "clinical", description: "Routine screening swab prior to delivery." },
    { id: "early-term", title: pregType === "triplets" ? "Triplet Delivery Target" : pregType === "twins" ? "Twin Delivery Window" : "Early Term Milestone", week: pregType === "triplets" ? 34 : pregType === "twins" ? 37 : 37, category: "clinical", description: pregType === "triplets" ? "Median triplet delivery timing." : pregType === "twins" ? "Recommended term timing for uncomplicated twin gestation." : "Baby organs fully formed; enters early term." },
    { id: "full-term", title: "Full Term Milestone", week: 39, category: "clinical", description: "Optimal birth timing for singleton neonatal outcomes." },
    { id: "due-date", title: "Estimated Due Date (EDD)", week: pregType === "triplets" ? 34 : pregType === "twins" ? 37 : 40, category: "clinical", description: `Target delivery milestone (${totalStandardDays / 7} weeks).` },
  ];

  const milestones: MilestoneItem[] = milestoneDefs
    .filter((m) => pregType === "single" || m.week <= totalStandardDays / 7 + 1)
    .map((m) => {
      const mDate = addDays(estimatedLmpDate, m.week * 7);
      return {
        ...m,
        dateStr: formatNiceDate(mDate),
        isPassed: totalDaysPregnant >= m.week * 7,
      };
    });

  // Maternal Health & Weight Gain Logic (IOM 2009 Standards)
  const isMetric = inputs.unitSystem === "metric";
  let heightM = 1.65;
  if (isMetric && inputs.heightCm) {
    heightM = inputs.heightCm / 100;
  } else if (!isMetric) {
    const ft = Number(inputs.heightFt) || 5;
    const inches = Number(inputs.heightIn) || 5;
    const totalInches = ft * 12 + inches;
    heightM = totalInches * 0.0254;
  }

  let preWeightKg = 60;
  if (isMetric && inputs.preWeightKg) preWeightKg = inputs.preWeightKg;
  else if (!isMetric && inputs.preWeightLbs) preWeightKg = inputs.preWeightLbs * 0.45359237;

  let currentWeightKg = preWeightKg;
  if (isMetric && inputs.currentWeightKg) currentWeightKg = inputs.currentWeightKg;
  else if (!isMetric && inputs.currentWeightLbs) currentWeightKg = inputs.currentWeightLbs * 0.45359237;

  // Raw unrounded BMI for boundary evaluation
  const rawBmi = preWeightKg / (heightM * heightM);
  const preBmi = Math.round(rawBmi * 10) / 10;

  let bmiCategory: "Underweight" | "Normal Weight" | "Overweight" | "Obese" = "Normal Weight";
  let minRecLbs = 25;
  let maxRecLbs = 35;
  let weeklyRateLbs = "0.8 – 1.0 lb/week";

  if (rawBmi < 18.5) {
    bmiCategory = "Underweight";
    minRecLbs = pregType === "twins" ? 50 : 28;
    maxRecLbs = pregType === "twins" ? 62 : 40;
    weeklyRateLbs = pregType === "twins" ? "1.2 – 1.7 lb/week" : "1.0 – 1.3 lb/week";
  } else if (rawBmi < 25.0) {
    bmiCategory = "Normal Weight";
    minRecLbs = pregType === "twins" ? 37 : 25;
    maxRecLbs = pregType === "twins" ? 54 : 35;
    weeklyRateLbs = pregType === "twins" ? "1.2 – 1.7 lb/week" : "0.8 – 1.0 lb/week";
  } else if (rawBmi < 30.0) {
    bmiCategory = "Overweight";
    minRecLbs = pregType === "twins" ? 31 : 15;
    maxRecLbs = pregType === "twins" ? 50 : 25;
    weeklyRateLbs = pregType === "twins" ? "1.2 – 1.7 lb/week" : "0.5 – 0.7 lb/week";
  } else {
    bmiCategory = "Obese";
    minRecLbs = pregType === "twins" ? 25 : 11;
    maxRecLbs = pregType === "twins" ? 42 : 20;
    weeklyRateLbs = pregType === "twins" ? "1.2 – 1.7 lb/week" : "0.4 – 0.6 lb/week";
  }

  const currentGainKg = Math.max(-15, currentWeightKg - preWeightKg);
  const currentGainLbs = Math.round(currentGainKg * 2.20462262 * 10) / 10;
  const minRecKg = Math.round(minRecLbs * 0.45359237 * 10) / 10;
  const maxRecKg = Math.round(maxRecLbs * 0.45359237 * 10) / 10;

  // IOM Trimester Gestational Weight Curve (Illustrative weekly bounds)
  // T1 (Weeks 1-13): 1.1–4.4 lbs (single), 4.0–7.0 lbs (twins)
  const t1Min = pregType === "twins" ? 4.0 : 1.1;
  const t1Max = pregType === "twins" ? 7.0 : 4.4;
  const w = Math.min(40, gestationalAgeWeeks);

  let minWeekGainLbs: number;
  let maxWeekGainLbs: number;

  if (w <= 13) {
    minWeekGainLbs = Math.round((t1Min * (w / 13)) * 10) / 10;
    maxWeekGainLbs = Math.round((t1Max * (w / 13)) * 10) / 10;
  } else {
    const postT1Weeks = w - 13;
    const slopeMin = (minRecLbs - t1Min) / 27;
    const slopeMax = (maxRecLbs - t1Max) / 27;
    minWeekGainLbs = Math.round((t1Min + postT1Weeks * slopeMin) * 10) / 10;
    maxWeekGainLbs = Math.round((t1Max + postT1Weeks * slopeMax) * 10) / 10;
  }

  const expectedGainLbs = Math.round(((minWeekGainLbs + maxWeekGainLbs) / 2) * 10) / 10;
  const expectedGainKg = Math.round(expectedGainLbs * 0.45359237 * 10) / 10;

  // Strict zero-tolerance status calculation against displayed week range
  let weightStatus: "Below Target" | "On Track" | "Above Target" | "Not Calculated" = "On Track";
  if (currentGainLbs < minWeekGainLbs - 1e-4) {
    weightStatus = "Below Target";
  } else if (currentGainLbs > maxWeekGainLbs + 1e-4) {
    weightStatus = "Above Target";
  } else {
    weightStatus = "On Track";
  }

  const weightMetrics: WeightGainMetrics = {
    preBmi,
    bmiCategory,
    minRecommendedLbs: minRecLbs,
    maxRecommendedLbs: maxRecLbs,
    minRecommendedKg: minRecKg,
    maxRecommendedKg: maxRecKg,
    minWeekGainLbs,
    maxWeekGainLbs,
    currentGainLbs,
    currentGainKg: Math.round(currentGainKg * 10) / 10,
    expectedGainLbs,
    expectedGainKg,
    status: weightStatus,
    weeklyRateLbs,
  };

  const probability: ProbabilityMetrics = {
    exactDueDatePercent: 4,
    plusMinusOneWeekPercent: 60,
    plusMinusTwoWeeksPercent: 90,
    earlyTermRange: "Weeks 37w0d – 38w6d",
    fullTermRange: "Weeks 39w0d – 40w6d",
    lateTermRange: "Weeks 41w0d – 41w6d",
    postTermRange: "Weeks 42w0d+",
  };

  let reverseDetails;
  if (mode === "reverse") {
    const estLmp = addDays(estimatedDueDate, -(totalStandardDays + cycleAdj));
    const estConc = addDays(estimatedDueDate, -(totalStandardDays - 14));
    const estIvf = addDays(estConc, 5);
    const estUs = addDays(estLmp, 56);

    reverseDetails = {
      estimatedLmp: formatNiceDate(estLmp),
      estimatedConception: formatNiceDate(estConc),
      estimatedIvfDay5: formatNiceDate(estIvf),
      estimatedUltrasound8W: formatNiceDate(estUs),
    };
  }

  return {
    mode,
    lmpDateStr: formatNiceDate(estimatedLmpDate),
    conceptionDateStr: formatNiceDate(estimatedConceptionDate),
    dueDateStr: formatNiceDate(estimatedDueDate),
    gestationalAgeWeeks,
    gestationalAgeDays,
    totalDaysPregnant,
    daysRemaining,
    percentComplete,
    currentTrimester,
    trimesters,
    estimatedBirthWindowStart: formatNiceDate(windowStart),
    estimatedBirthWindowEnd: formatNiceDate(windowEnd),
    milestones,
    weightMetrics,
    probability,
    reverseDetails,
  };
}
