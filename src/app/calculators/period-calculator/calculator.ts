import {
  PeriodCalculationResults,
  FutureCyclePeriod,
  DailyFertilityItem,
  MenstrualPhaseItem,
  CycleTrendItem,
  PeriodCalculatorOutputs,
  PredictionRange,
  CycleRegularityType,
} from "./types";

// Date Helpers (Timezone-Safe Local Calendar Arithmetic)
export function addDays(date: Date, days: number): Date {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  result.setDate(result.getDate() + days);
  return result;
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function formatMonthLabel(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

export function formatDisplayDate(dateStr: string): string {
  if (!dateStr || dateStr === "N/A") return "N/A";
  const parts = dateStr.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return dateStr;
  const date = new Date(parts[0], parts[1] - 1, parts[2]);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function parseDate(
  dateStr?: string,
  defaultFallback: Date = new Date(2026, 0, 1)
): Date {
  if (!dateStr) {
    return new Date(
      defaultFallback.getFullYear(),
      defaultFallback.getMonth(),
      defaultFallback.getDate()
    );
  }
  const parts = String(dateStr).split("-").map(Number);
  if (parts.length === 3 && parts.every(Number.isFinite)) {
    return new Date(parts[0], parts[1] - 1, parts[2]);
  }
  return new Date(
    defaultFallback.getFullYear(),
    defaultFallback.getMonth(),
    defaultFallback.getDate()
  );
}

function getVarianceDays(regularity: CycleRegularityType): number {
  switch (regularity) {
    case "highly-irregular":
      return 15;
    case "moderately-irregular":
      return 10;
    case "slightly-irregular":
      return 5;
    case "regular":
    default:
      return 2;
  }
}

export function calculatePeriodCalculator(
  inputs: Record<string, any>,
  options?: { referenceDate?: Date | string }
): PeriodCalculationResults {
  const mode = inputs.calculationMode || "lmp";
  const periodLength = Math.max(1, Math.min(14, Number(inputs.periodLength) || 5));
  const cycleLength = Math.max(20, Math.min(60, Number(inputs.cycleLength) || 28));
  const userAge = Number(inputs.userAge) || 28;
  const lutealPhaseLength = Math.max(8, Math.min(18, Number(inputs.lutealPhaseLength) || 14));
  const cycleRegularity: CycleRegularityType = inputs.cycleRegularity || "regular";
  const birthControl = inputs.birthControl || "none";
  const isPregnant = inputs.isPregnant || "no";
  const isBreastfeeding = Boolean(inputs.isBreastfeeding);
  const hasPcos = Boolean(inputs.hasPcos);

  // Support both lmpDate and lastPeriod input properties
  const lmpRaw = inputs.lmpDate || inputs.lastPeriod || "2026-01-01";
  const lmpDateObj = parseDate(lmpRaw, new Date(2026, 0, 1));

  // Determine reference 'today' for daysUntilNextPeriod (dynamic or test-injected)
  let today: Date;
  const refDateRaw = options?.referenceDate || inputs.referenceDate;
  if (refDateRaw) {
    if (refDateRaw instanceof Date) {
      today = new Date(refDateRaw.getFullYear(), refDateRaw.getMonth(), refDateRaw.getDate());
    } else {
      today = parseDate(String(refDateRaw));
    }
  } else {
    const now = new Date();
    today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  }

  // Core Period Calculations
  const nextPeriodStartObj = addDays(lmpDateObj, cycleLength);
  const nextPeriodEndObj = addDays(nextPeriodStartObj, periodLength - 1);
  const daysUntilNextPeriod = Math.max(
    0,
    Math.round((nextPeriodStartObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
  );

  // Ovulation & Clinical 6-Day Fertile Window (O-5 through O inclusive)
  const ovulationDay = Math.max(1, cycleLength - lutealPhaseLength);
  const ovulationDateObj = addDays(lmpDateObj, ovulationDay);
  const fertileStartObj = addDays(ovulationDateObj, -5);
  const fertileEndObj = ovulationDateObj; // Exactly 6 calendar days: O-5, O-4, O-3, O-2, O-1, O
  const peakFertileStartObj = addDays(ovulationDateObj, -2);
  const peakFertileEndObj = ovulationDateObj;

  // Conception & Implantation Timing
  const conceptionStartObj = addDays(ovulationDateObj, -3);
  const conceptionEndObj = ovulationDateObj;
  const implantationStartObj = addDays(ovulationDateObj, 6);
  const implantationEndObj = addDays(ovulationDateObj, 12);
  const implantationPeakObj = addDays(ovulationDateObj, 9);
  const dueDateIfConceivedObj = addDays(ovulationDateObj, 266);

  // Irregular Predictor Variance Range
  const varianceDays = getVarianceDays(cycleRegularity);
  const nextPeriodRange: PredictionRange = {
    earliest: formatDate(addDays(nextPeriodStartObj, -varianceDays)),
    latest: formatDate(addDays(nextPeriodStartObj, varianceDays)),
    varianceDays,
  };

  // 12-Month Future Prediction Schedule
  const futurePeriods: FutureCyclePeriod[] = [];
  let currentCycleStart = new Date(lmpDateObj);

  for (let i = 1; i <= 12; i++) {
    const periodStart = addDays(currentCycleStart, cycleLength);
    const periodEnd = addDays(periodStart, periodLength - 1);
    const ovulationDate = addDays(periodStart, cycleLength - lutealPhaseLength);
    const fertileStart = addDays(ovulationDate, -5);
    const fertileEnd = ovulationDate; // 6-day fertile window
    const dueIfConceived = addDays(ovulationDate, 266);

    futurePeriods.push({
      cycleNumber: i,
      periodStartDate: formatDate(periodStart),
      periodEndDate: formatDate(periodEnd),
      ovulationDate: formatDate(ovulationDate),
      fertileWindowStart: formatDate(fertileStart),
      fertileWindowEnd: formatDate(fertileEnd),
      dueDateIfConceived: formatDate(dueIfConceived),
      monthLabel: formatMonthLabel(periodStart),
    });

    currentCycleStart = periodStart;
  }

  // Daily Fertility Probability Curve (6-Day Clinical Window + Context)
  const probabilities: DailyFertilityItem[] = [
    { dayOffset: -5, date: formatDate(addDays(ovulationDateObj, -5)), dayLabel: "5 Days Before Ovulation", probability: 5, status: "Low", description: "Early fertile window opens; sperm survival begins." },
    { dayOffset: -4, date: formatDate(addDays(ovulationDateObj, -4)), dayLabel: "4 Days Before Ovulation", probability: 12, status: "Moderate", description: "Moderate conception probability." },
    { dayOffset: -3, date: formatDate(addDays(ovulationDateObj, -3)), dayLabel: "3 Days Before Ovulation", probability: 18, status: "Moderate", description: "Good fertile window; high sperm viability." },
    { dayOffset: -2, date: formatDate(addDays(ovulationDateObj, -2)), dayLabel: "2 Days Before Ovulation", probability: 27, status: "High", description: "Prime fertile window." },
    { dayOffset: -1, date: formatDate(addDays(ovulationDateObj, -1)), dayLabel: "1 Day Before Ovulation", probability: 33, status: "Peak", description: "Highest single-day conception probability!" },
    { dayOffset: 0, date: formatDate(ovulationDateObj), dayLabel: "Ovulation Day", probability: 30, status: "Peak", description: "Egg released; 12 to 24-hour fertilization window." },
    { dayOffset: 1, date: formatDate(addDays(ovulationDateObj, 1)), dayLabel: "1 Day After Ovulation", probability: 0, status: "Post-Ovulatory", description: "Oocyte degrades; fertile window closed." },
  ];

  // Physiologically Coherent Menstrual Cycle Phases (No Overlaps, No Gaps)
  const follicularStart = addDays(lmpDateObj, periodLength);
  const follicularEnd = addDays(ovulationDateObj, -1);
  const follicularDuration = Math.max(1, Math.round((follicularEnd.getTime() - follicularStart.getTime()) / (1000 * 60 * 60 * 24)) + 1);

  const lutealStart = addDays(ovulationDateObj, 1);
  const lutealEnd = addDays(lmpDateObj, cycleLength - 1);
  const lutealDuration = Math.max(1, Math.round((lutealEnd.getTime() - lutealStart.getTime()) / (1000 * 60 * 60 * 24)) + 1);

  const cyclePhases: MenstrualPhaseItem[] = [
    {
      phaseName: "Menstrual Phase",
      startDate: formatDate(lmpDateObj),
      endDate: formatDate(addDays(lmpDateObj, periodLength - 1)),
      durationDays: periodLength,
      description: "Uterine lining sheds; menstrual flow occurs.",
      color: "#ec4899",
    },
    {
      phaseName: "Follicular Phase",
      startDate: formatDate(follicularStart),
      endDate: formatDate(follicularEnd),
      durationDays: follicularDuration,
      description: "FSH stimulates ovarian follicle maturation and estrogen rise.",
      color: "#3b82f6",
    },
    {
      phaseName: "Ovulation Day",
      startDate: formatDate(ovulationDateObj),
      endDate: formatDate(ovulationDateObj),
      durationDays: 1,
      description: "LH surge triggers release of mature oocyte into fallopian tube.",
      color: "#10b981",
    },
    {
      phaseName: "Luteal Phase",
      startDate: formatDate(lutealStart),
      endDate: formatDate(lutealEnd),
      durationDays: lutealDuration,
      description: "Corpus luteum secretes progesterone to maintain endometrium.",
      color: "#8b5cf6",
    },
  ];

  // 12-Month Cycle Trend Data
  const cycleTrends: CycleTrendItem[] = futurePeriods.map((fp, idx) => ({
    cycleIndex: idx + 1,
    cycleLabel: `Cycle ${idx + 1} (${fp.monthLabel})`,
    cycleLength: cycleLength + (hasPcos ? (idx % 2 === 0 ? 3 : -2) : 0),
    periodLength: periodLength,
    regularityScore: hasPcos ? 65 : cycleRegularity === "regular" ? 95 : 75,
  }));

  // Cycle Regularity Score (Medically Neutral Heuristic)
  let regularityScore = 95;
  if (cycleLength < 21 || cycleLength > 35) regularityScore -= 15;
  if (cycleRegularity === "slightly-irregular") regularityScore -= 10;
  if (cycleRegularity === "moderately-irregular") regularityScore -= 20;
  if (cycleRegularity === "highly-irregular") regularityScore -= 30;
  if (hasPcos) regularityScore -= 15;
  regularityScore = Math.max(35, Math.min(100, regularityScore));

  let regularityLabel: string;
  let healthStatus: "Normal" | "Slightly Irregular" | "Moderately Irregular" | "Highly Irregular";

  if (regularityScore >= 85) {
    regularityLabel = "Regular Pattern";
    healthStatus = "Normal";
  } else if (regularityScore >= 70) {
    regularityLabel = "Slightly Variable Pattern";
    healthStatus = "Slightly Irregular";
  } else if (regularityScore >= 55) {
    regularityLabel = "Moderately Variable Pattern";
    healthStatus = "Moderately Irregular";
  } else {
    regularityLabel = "Highly Variable Pattern";
    healthStatus = "Highly Irregular";
  }

  // Insights & Educational Observations
  const insights: string[] = [
    `Your next menstrual period is predicted to start on ${formatDisplayDate(formatDate(nextPeriodStartObj))}.`,
    `Your peak ovulation day for this cycle is ${formatDisplayDate(formatDate(ovulationDateObj))}.`,
    `Your 6-day fertile window spans from ${formatDisplayDate(formatDate(fertileStartObj))} through ${formatDisplayDate(formatDate(fertileEndObj))}.`,
  ];

  if (mode === "irregular" || cycleRegularity !== "regular") {
    insights.push(
      `Estimated prediction range: ${formatDisplayDate(nextPeriodRange.earliest)} – ${formatDisplayDate(nextPeriodRange.latest)} (±${varianceDays} days).`
    );
  }

  if (hasPcos) {
    insights.push(`PCOS can be associated with irregular follicular phases and unpredictable ovulation timing.`);
  }

  if (birthControl !== "none") {
    insights.push(`Hormonal birth control (${birthControl}) suppresses or alters natural ovulation; dates represent calendar estimates rather than natural fertility.`);
  }

  const recommendations: string[] = [
    `Track the first day of full menstrual flow each month to establish your baseline cycle length.`,
    `If trying to conceive, time intercourse during your 6-day fertile window (${formatDisplayDate(formatDate(fertileStartObj))} – ${formatDisplayDate(formatDate(fertileEndObj))}).`,
    `Consult a healthcare provider if your cycle duration is consistently shorter than 21 days or longer than 35 days.`,
    `Maintain balanced nutrition, adequate sleep, and consistent physical activity to support hormonal rhythm.`,
  ];

  return {
    mode,
    lmpDate: formatDate(lmpDateObj),
    nextPeriodStartDate: formatDate(nextPeriodStartObj),
    nextPeriodEndDate: formatDate(nextPeriodEndObj),
    nextPeriodRange,
    daysUntilNextPeriod,
    nextOvulationDate: formatDate(ovulationDateObj),
    fertileWindow: {
      start: formatDate(fertileStartObj),
      end: formatDate(fertileEndObj),
      peakStart: formatDate(peakFertileStartObj),
      peakEnd: formatDate(peakFertileEndObj),
    },
    conceptionWindow: {
      start: formatDate(conceptionStartObj),
      end: formatDate(conceptionEndObj),
    },
    implantationWindow: {
      start: formatDate(implantationStartObj),
      end: formatDate(implantationEndObj),
      peakDate: formatDate(implantationPeakObj),
    },
    dueDateIfConceived: formatDate(dueDateIfConceivedObj),
    futurePeriods,
    probabilities,
    cyclePhases,
    cycleTrends,
    healthScore: regularityScore,
    healthStatus,
    regularityScore,
    regularityLabel,
    insights,
    recommendations,
  };
}

export function calculatePeriodOutputs(inputs: Record<string, any>): PeriodCalculatorOutputs {
  const res = calculatePeriodCalculator(inputs);
  return {
    nextPeriodDate: res.nextPeriodStartDate,
    nextPeriodEndDate: res.nextPeriodEndDate,
    nextPeriodRange: `${res.nextPeriodRange.earliest} to ${res.nextPeriodRange.latest}`,
    daysUntilNextPeriod: res.daysUntilNextPeriod,
    ovulationDate: res.nextOvulationDate,
    fertileWindow: `${res.fertileWindow.start} to ${res.fertileWindow.end}`,
    dueDateIfConceived: res.dueDateIfConceived,
    healthStatus: res.healthStatus,
    healthScore: res.healthScore,
    regularityScore: res.regularityScore,
  };
}
