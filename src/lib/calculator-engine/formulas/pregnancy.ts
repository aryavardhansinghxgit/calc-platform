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
  currentGainLbs: number;
  currentGainKg: number;
  expectedGainLbs: number;
  expectedGainKg: number;
  status: "Under Target" | "On Track" | "Above Target" | "Not Calculated";
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

const MS_PER_DAY = 86400000;

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

export function calculatePregnancy(inputs: PregnancyInputs): PregnancyCalculationResults {
  const mode = inputs.mode || "lmp";
  const cycle = Number(inputs.cycleLength) || 28;
  const cycleAdj = cycle - 28;
  const pregType = inputs.pregnancyType || "single";

  // Standard duration: Single = 280 days (40 weeks), Twins = 259 days (37 weeks), Triplets = 238 days (34 weeks)
  const totalStandardDays = pregType === "triplets" ? 238 : pregType === "twins" ? 259 : 280;

  let estimatedLmpDate: Date;
  let estimatedDueDate: Date;
  let estimatedConceptionDate: Date;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (mode === "lmp") {
    const lmp = parseLocalDate(inputs.lmpDate || formatDateStr(today));
    estimatedLmpDate = lmp;
    estimatedDueDate = new Date(lmp.getTime() + (totalStandardDays + cycleAdj) * MS_PER_DAY);
    estimatedConceptionDate = new Date(lmp.getTime() + (14 + cycleAdj) * MS_PER_DAY);
  } else if (mode === "due-date") {
    const due = parseLocalDate(inputs.dueDate || formatDateStr(new Date(today.getTime() + 200 * MS_PER_DAY)));
    estimatedDueDate = due;
    estimatedLmpDate = new Date(due.getTime() - (totalStandardDays + cycleAdj) * MS_PER_DAY);
    estimatedConceptionDate = new Date(due.getTime() - (totalStandardDays - 14) * MS_PER_DAY);
  } else if (mode === "conception") {
    const conc = parseLocalDate(inputs.conceptionDate || formatDateStr(new Date(today.getTime() - 30 * MS_PER_DAY)));
    estimatedConceptionDate = conc;
    estimatedLmpDate = new Date(conc.getTime() - 14 * MS_PER_DAY);
    estimatedDueDate = new Date(conc.getTime() + (totalStandardDays - 14) * MS_PER_DAY);
  } else if (mode === "ultrasound") {
    const usDate = parseLocalDate(inputs.ultrasoundDate || formatDateStr(today));
    const usWeeks = Number(inputs.ultrasoundWeeks) || 8;
    const usDays = Number(inputs.ultrasoundDays) || 0;
    const daysAtUs = usWeeks * 7 + usDays;
    estimatedLmpDate = new Date(usDate.getTime() - daysAtUs * MS_PER_DAY);
    estimatedDueDate = new Date(estimatedLmpDate.getTime() + totalStandardDays * MS_PER_DAY);
    estimatedConceptionDate = new Date(estimatedLmpDate.getTime() + 14 * MS_PER_DAY);
  } else if (mode === "ivf") {
    const transfer = parseLocalDate(inputs.ivfDate || formatDateStr(today));
    const age = inputs.embryoAge || "day5";
    const embryoDays = age === "day3" ? 3 : age === "day6" ? 6 : 5;
    // Conception is effectively (transfer - embryoDays)
    estimatedConceptionDate = new Date(transfer.getTime() - embryoDays * MS_PER_DAY);
    estimatedLmpDate = new Date(estimatedConceptionDate.getTime() - 14 * MS_PER_DAY);
    estimatedDueDate = new Date(estimatedConceptionDate.getTime() + (totalStandardDays - 14) * MS_PER_DAY);
  } else if (mode === "custom") {
    const customStart = parseLocalDate(inputs.customStartDate || formatDateStr(today));
    estimatedLmpDate = customStart;
    estimatedDueDate = new Date(customStart.getTime() + totalStandardDays * MS_PER_DAY);
    estimatedConceptionDate = new Date(customStart.getTime() + 14 * MS_PER_DAY);
  } else {
    // Reverse due date mode
    const targetDue = parseLocalDate(inputs.targetDueDate || formatDateStr(new Date(today.getTime() + 180 * MS_PER_DAY)));
    estimatedDueDate = targetDue;
    estimatedLmpDate = new Date(targetDue.getTime() - (totalStandardDays + cycleAdj) * MS_PER_DAY);
    estimatedConceptionDate = new Date(targetDue.getTime() - (totalStandardDays - 14) * MS_PER_DAY);
  }

  // Calculate Gestational Age
  const diffFromLmp = Math.max(0, Math.floor((today.getTime() - estimatedLmpDate.getTime()) / MS_PER_DAY));
  const totalDaysPregnant = Math.min(diffFromLmp, totalStandardDays + 21);
  const gestationalAgeWeeks = Math.floor(totalDaysPregnant / 7);
  const gestationalAgeDays = totalDaysPregnant % 7;
  const daysRemaining = Math.max(0, Math.floor((estimatedDueDate.getTime() - today.getTime()) / MS_PER_DAY));
  const percentComplete = Math.min(100, Math.max(0, Math.round((totalDaysPregnant / totalStandardDays) * 100)));

  // Determine Trimester
  let currentTrimester: 1 | 2 | 3 = 1;
  if (gestationalAgeWeeks >= 28) currentTrimester = 3;
  else if (gestationalAgeWeeks >= 13) currentTrimester = 2;

  // Trimester Dates
  const t1Start = estimatedLmpDate;
  const t1End = new Date(estimatedLmpDate.getTime() + 13 * 7 * MS_PER_DAY);
  const t2Start = new Date(estimatedLmpDate.getTime() + 13 * 7 * MS_PER_DAY + MS_PER_DAY);
  const t2End = new Date(estimatedLmpDate.getTime() + 27 * 7 * MS_PER_DAY);
  const t3Start = new Date(estimatedLmpDate.getTime() + 27 * 7 * MS_PER_DAY + MS_PER_DAY);
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
      weeksRange: "Weeks 28–40+",
      progressPercent: Math.min(100, Math.max(0, Math.round((Math.max(0, totalDaysPregnant - 27 * 7) / (13 * 7)) * 100))),
    },
  ];

  // Estimated Birth Window (37 weeks to 42 weeks)
  const windowStart = new Date(estimatedLmpDate.getTime() + 37 * 7 * MS_PER_DAY);
  const windowEnd = new Date(estimatedLmpDate.getTime() + 42 * 7 * MS_PER_DAY);

  // Milestones Engine
  const milestoneDefs: Array<{ id: string; title: string; week: number; category: "clinical" | "developmental" | "lifestyle"; description: string }> = [
    { id: "conception", title: "Fertilization & Conception", week: 2, category: "developmental", description: "Sperm fertilizes egg in fallopian tube." },
    { id: "implantation", title: "Embryo Implantation", week: 3, category: "developmental", description: "Blastocyst implants into uterine lining." },
    { id: "pos-test", title: "Positive Pregnancy Test Window", week: 4, category: "clinical", description: "hCG hormone levels detectable by home urine test." },
    { id: "heartbeat", title: "First Heartbeat Detection", week: 6, category: "clinical", description: "Cardiac activity visible via transvaginal ultrasound." },
    { id: "first-us", title: "First Trimester Dating Ultrasound", week: 10, category: "clinical", description: "Confirms gestational age & heartbeat visual." },
    { id: "nipt", title: "NIPT / Genetic Screening Window", week: 11, category: "clinical", description: "Cell-free DNA screening for chromosomal conditions." },
    { id: "t2-start", title: "Second Trimester Begins", week: 13, category: "lifestyle", description: "Morning sickness often fades; energy returns." },
    { id: "quickening", title: "First Baby Movements (Quickening)", week: 18, category: "developmental", description: "Mother feels subtle fluttering baby kicks." },
    { id: "anatomy-scan", title: "Anatomy Scan Ultrasound", week: 20, category: "clinical", description: "Detailed 20-week scan examining organs and gender." },
    { id: "viability", title: "Fetal Viability Milestone", week: 24, category: "clinical", description: "Baby reaches 24-week survival milestone with medical support." },
    { id: "glucose", title: "Gestational Diabetes Screening", week: 26, category: "clinical", description: "Glucose tolerance blood testing window." },
    { id: "t3-start", title: "Third Trimester Begins", week: 28, category: "lifestyle", description: "Final stretch! Rapid fetal brain & lung development." },
    { id: "gbs-test", title: "Group B Strep (GBS) Screening", week: 36, category: "clinical", description: "Swab testing prior to delivery." },
    { id: "early-term", title: "Early Term Milestone", week: 37, category: "clinical", description: "Baby organs fully formed; ready for birth." },
    { id: "full-term", title: "Full Term Milestone", week: 39, category: "clinical", description: "Optimal birth timing for neonatal health." },
    { id: "due-date", title: "Estimated Due Date (EDD)", week: 40, category: "clinical", description: "Target 40-week delivery date." },
  ];

  const milestones: MilestoneItem[] = milestoneDefs.map((m) => {
    const mDate = new Date(estimatedLmpDate.getTime() + m.week * 7 * MS_PER_DAY);
    return {
      ...m,
      dateStr: formatNiceDate(mDate),
      isPassed: totalDaysPregnant >= m.week * 7,
    };
  });

  // Pre-pregnancy Weight & Gain Calculator
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

  const preBmi = Math.round((preWeightKg / (heightM * heightM)) * 10) / 10;

  let bmiCategory: "Underweight" | "Normal Weight" | "Overweight" | "Obese" = "Normal Weight";
  let minRecLbs = 25;
  let maxRecLbs = 35;

  if (preBmi < 18.5) {
    bmiCategory = "Underweight";
    minRecLbs = pregType === "twins" ? 50 : 28;
    maxRecLbs = pregType === "twins" ? 62 : 40;
  } else if (preBmi < 25) {
    bmiCategory = "Normal Weight";
    minRecLbs = pregType === "twins" ? 37 : 25;
    maxRecLbs = pregType === "twins" ? 54 : 35;
  } else if (preBmi < 30) {
    bmiCategory = "Overweight";
    minRecLbs = pregType === "twins" ? 31 : 15;
    maxRecLbs = pregType === "twins" ? 50 : 25;
  } else {
    bmiCategory = "Obese";
    minRecLbs = pregType === "twins" ? 25 : 11;
    maxRecLbs = pregType === "twins" ? 42 : 20;
  }

  const currentGainKg = Math.max(0, currentWeightKg - preWeightKg);
  const currentGainLbs = Math.round(currentGainKg * 2.20462 * 10) / 10;
  const minRecKg = Math.round(minRecLbs * 0.453592 * 10) / 10;
  const maxRecKg = Math.round(maxRecLbs * 0.453592 * 10) / 10;

  // Linear target gain based on week
  const fractionOfPregnancy = Math.min(1, gestationalAgeWeeks / 40);
  const expectedGainLbs = Math.round((minRecLbs + (maxRecLbs - minRecLbs) / 2) * fractionOfPregnancy * 10) / 10;
  const expectedGainKg = Math.round(expectedGainLbs * 0.453592 * 10) / 10;

  let weightStatus: "Under Target" | "On Track" | "Above Target" | "Not Calculated" = "On Track";
  const toleranceLbs = 3;
  if (currentGainLbs < expectedGainLbs - toleranceLbs && gestationalAgeWeeks > 12) weightStatus = "Under Target";
  else if (currentGainLbs > expectedGainLbs + toleranceLbs && gestationalAgeWeeks > 12) weightStatus = "Above Target";

  const weeklyRateLbs = gestationalAgeWeeks > 13 ? (preBmi < 25 ? "1.0 lb / week" : "0.6 lb / week") : "0.2 - 0.5 lb / week (Trimester 1)";

  const weightMetrics: WeightGainMetrics = {
    preBmi,
    bmiCategory,
    minRecommendedLbs: minRecLbs,
    maxRecommendedLbs: maxRecLbs,
    minRecommendedKg: minRecKg,
    maxRecommendedKg: maxRecKg,
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
    const estLmp = new Date(estimatedDueDate.getTime() - 280 * MS_PER_DAY);
    const estConc = new Date(estimatedDueDate.getTime() - 266 * MS_PER_DAY);
    const estIvf = new Date(estConc.getTime() + 5 * MS_PER_DAY);
    const estUs = new Date(estLmp.getTime() + 8 * 7 * MS_PER_DAY);

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
