import {
  PeriodInputParams,
  PeriodCalculationResults,
  FutureCyclePeriod,
  DailyFertilityItem,
  MenstrualPhaseItem,
  CycleTrendItem,
  PeriodCalculatorOutputs,
} from "./types";

// Date Helpers
function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatMonthLabel(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

function formatDisplayDate(dateStr: string): string {
  if (!dateStr || dateStr === "N/A") return "N/A";
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return dateStr;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function parseDate(dateStr?: string, defaultFallback: Date = new Date("2026-01-01T00:00:00")): Date {
  if (!dateStr) return defaultFallback;
  const parsed = new Date(dateStr);
  return isNaN(parsed.getTime()) ? defaultFallback : parsed;
}

export function calculatePeriodCalculator(
  inputs: Record<string, any>
): PeriodCalculationResults {
  const mode = inputs.calculationMode || "lmp";
  const periodLength = Number(inputs.periodLength) || 5;
  const cycleLength = Number(inputs.cycleLength) || 28;
  const userAge = Number(inputs.userAge) || 28;
  const lutealPhaseLength = Number(inputs.lutealPhaseLength) || 14;
  const cycleRegularity = inputs.cycleRegularity || "regular";
  const birthControl = inputs.birthControl || "none";
  const isPregnant = inputs.isPregnant || "no";
  const isBreastfeeding = Boolean(inputs.isBreastfeeding);
  const hasPcos = Boolean(inputs.hasPcos);

  const lmpDateObj = parseDate(inputs.lmpDate, new Date("2026-01-01T00:00:00"));
  const today = new Date("2026-01-01T00:00:00");

  // Basic Cycle Calculations
  const nextPeriodStartObj = addDays(lmpDateObj, cycleLength);
  const nextPeriodEndObj = addDays(nextPeriodStartObj, periodLength - 1);
  const daysUntilNextPeriod = Math.max(0, Math.floor((nextPeriodStartObj.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

  const ovulationDateObj = addDays(lmpDateObj, cycleLength - lutealPhaseLength);
  const fertileStartObj = addDays(ovulationDateObj, -5);
  const fertileEndObj = addDays(ovulationDateObj, 1);
  const peakFertileStartObj = addDays(ovulationDateObj, -2);
  const peakFertileEndObj = ovulationDateObj;

  const conceptionStartObj = addDays(ovulationDateObj, -3);
  const conceptionEndObj = addDays(ovulationDateObj, 1);

  const implantationStartObj = addDays(ovulationDateObj, 6);
  const implantationEndObj = addDays(ovulationDateObj, 12);
  const implantationPeakObj = addDays(ovulationDateObj, 9);

  const dueDateIfConceivedObj = addDays(ovulationDateObj, 266);

  // 12-Month Future Period Matrix
  const futurePeriods: FutureCyclePeriod[] = [];
  let currentCycleStart = new Date(lmpDateObj);

  for (let i = 1; i <= 12; i++) {
    const periodStart = addDays(currentCycleStart, cycleLength);
    const periodEnd = addDays(periodStart, periodLength - 1);
    const ovulationDate = addDays(periodStart, cycleLength - lutealPhaseLength);
    const fertileStart = addDays(ovulationDate, -5);
    const fertileEnd = addDays(ovulationDate, 1);
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

  // Daily Fertility Probability Curve (-5 DPO to +1 DPO)
  const probabilities: DailyFertilityItem[] = [
    { dayOffset: -5, date: formatDate(addDays(ovulationDateObj, -5)), dayLabel: "5 Days Before Ovulation", probability: 5, status: "Low", description: "Early fertile window opens; sperm survival begins." },
    { dayOffset: -4, date: formatDate(addDays(ovulationDateObj, -4)), dayLabel: "4 Days Before Ovulation", probability: 12, status: "Moderate", description: "Moderate conception probability." },
    { dayOffset: -3, date: formatDate(addDays(ovulationDateObj, -3)), dayLabel: "3 Days Before Ovulation", probability: 18, status: "Moderate", description: "Good fertile window; high sperm viability." },
    { dayOffset: -2, date: formatDate(addDays(ovulationDateObj, -2)), dayLabel: "2 Days Before Ovulation", probability: 27, status: "High", description: "Prime fertile window." },
    { dayOffset: -1, date: formatDate(addDays(ovulationDateObj, -1)), dayLabel: "1 Day Before Ovulation", probability: 33, status: "Peak", description: "Highest single-day conception probability!" },
    { dayOffset: 0, date: formatDate(ovulationDateObj), dayLabel: "Ovulation Day", probability: 30, status: "Peak", description: "Egg released; 12 to 24-hour fertilization window." },
    { dayOffset: 1, date: formatDate(addDays(ovulationDateObj, 1)), dayLabel: "1 Day After Ovulation", probability: 5, status: "Low", description: "Fertilization window closing rapidly." },
  ];

  // Cycle Phase Breakdown
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
      startDate: formatDate(addDays(lmpDateObj, periodLength)),
      endDate: formatDate(addDays(ovulationDateObj, -1)),
      durationDays: Math.max(1, cycleLength - lutealPhaseLength - periodLength),
      description: "FSH stimulates ovarian follicle maturation and estrogen rise.",
      color: "#3b82f6",
    },
    {
      phaseName: "Ovulatory Phase",
      startDate: formatDate(fertileStartObj),
      endDate: formatDate(fertileEndObj),
      durationDays: 7,
      description: "LH surge triggers egg release; peak fertility days.",
      color: "#10b981",
    },
    {
      phaseName: "Luteal Phase",
      startDate: formatDate(addDays(ovulationDateObj, 1)),
      endDate: formatDate(addDays(lmpDateObj, cycleLength - 1)),
      durationDays: lutealPhaseLength,
      description: "Progesterone secretion maintains endometrial lining.",
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

  // Health Score & Status Calculation
  let healthScore = 95;
  if (cycleLength < 21 || cycleLength > 35) healthScore -= 15;
  if (cycleRegularity === "slightly-irregular") healthScore -= 10;
  if (cycleRegularity === "moderately-irregular") healthScore -= 20;
  if (cycleRegularity === "highly-irregular") healthScore -= 30;
  if (hasPcos) healthScore -= 20;
  if (userAge >= 40) healthScore -= 10;
  if (birthControl !== "none") healthScore -= 5;
  healthScore = Math.max(35, Math.min(100, healthScore));

  let healthStatus: "Normal" | "Slightly Irregular" | "Moderately Irregular" | "Highly Irregular" = "Normal";
  if (healthScore < 55) healthStatus = "Highly Irregular";
  else if (healthScore < 70) healthStatus = "Moderately Irregular";
  else if (healthScore < 85) healthStatus = "Slightly Irregular";

  // Insights & Recommendations
  const insights: string[] = [
    `Your next menstrual period is predicted to start on ${formatDisplayDate(formatDate(nextPeriodStartObj))}.`,
    `Your peak ovulation day for this cycle is ${formatDisplayDate(formatDate(ovulationDateObj))}.`,
    `Your fertile window spans from ${formatDisplayDate(formatDate(fertileStartObj))} to ${formatDisplayDate(formatDate(fertileEndObj))}.`,
  ];

  if (hasPcos) {
    insights.push(`PCOS can cause variable follicular phases. Tracking ovulation test strips (OPKs) improves timing precision.`);
  }
  if (birthControl !== "none") {
    insights.push(`Hormonal birth control (${birthControl}) alters or suppresses natural ovulatory cycles.`);
  }

  const recommendations: string[] = [
    `Track the first day of full menstrual flow each month to establish your baseline cycle length.`,
    `If trying to conceive, schedule intercourse every 1 to 2 days during your peak fertile window (${formatDisplayDate(formatDate(fertileStartObj))} – ${formatDisplayDate(formatDate(fertileEndObj))}).`,
    `Consult a gynecologist if your cycle duration is consistently shorter than 21 days or longer than 35 days.`,
    `Maintain healthy dietary habits, adequate hydration, and moderate physical activity to support hormonal balance.`,
  ];

  return {
    mode,
    lmpDate: formatDate(lmpDateObj),
    nextPeriodStartDate: formatDate(nextPeriodStartObj),
    nextPeriodEndDate: formatDate(nextPeriodEndObj),
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
    healthScore,
    healthStatus,
    insights,
    recommendations,
  };
}

export function calculatePeriodOutputs(inputs: Record<string, any>): PeriodCalculatorOutputs {
  const res = calculatePeriodCalculator(inputs);
  return {
    nextPeriodDate: res.nextPeriodStartDate,
    nextPeriodEndDate: res.nextPeriodEndDate,
    daysUntilNextPeriod: res.daysUntilNextPeriod,
    ovulationDate: res.nextOvulationDate,
    fertileWindow: `${res.fertileWindow.start} to ${res.fertileWindow.end}`,
    dueDateIfConceived: res.dueDateIfConceived,
    healthStatus: res.healthStatus,
    healthScore: res.healthScore,
  };
}
