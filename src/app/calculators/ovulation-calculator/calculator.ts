import {
  OvulationCalculatorInputs,
  OvulationCalculatorOutputs,
  OvulationCalculationMode,
  FertilityGoal,
  CalendarDayInfo,
  ConceptionProbabilityPoint,
  HormoneDataPoint,
} from "./types";

/**
 * Timezone-safe local calendar-date parsing
 * Prevents UTC midnight boundary shifts in Western hemisphere timezones
 */
export function parseInputDate(val?: string, fallbackOffsetDays = 0): Date {
  if (val && typeof val === "string") {
    const parts = val.split("-").map(Number);
    if (parts.length === 3 && parts.every((n) => Number.isInteger(n))) {
      return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0, 0);
    }
  }
  const fallback = new Date();
  fallback.setHours(12, 0, 0, 0);
  fallback.setDate(fallback.getDate() + fallbackOffsetDays);
  return fallback;
}

/**
 * Timezone-safe local date formatting to ISO YYYY-MM-DD
 */
export function formatIso(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

/**
 * Standard US formatted date string (e.g. "Aug 15, 2026")
 */
export function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

/**
 * Add or subtract calendar days safely at midday
 */
export function addDays(d: Date, days: number): Date {
  const res = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 12, 0, 0, 0);
  res.setDate(res.getDate() + days);
  return res;
}

export function calculateOvulationCalculator(
  rawInputs: Record<string, any>
): OvulationCalculatorOutputs {
  const inputs: OvulationCalculatorInputs = rawInputs || {};
  const mode: OvulationCalculationMode = inputs.calculationMode || "lmp";

  const cycleLength = Math.max(20, Math.min(45, Number(inputs.cycleLength) || 28));
  const periodLength = Math.max(2, Math.min(10, Number(inputs.periodLength) || 5));
  const lutealPhaseLength = Math.max(9, Math.min(18, Number(inputs.lutealPhaseLength) || 14));
  const motherAge = Math.max(18, Math.min(50, Number(inputs.motherAge) || 28));
  const fertilityGoal: FertilityGoal = inputs.fertilityGoal || "general-conception";

  const daysToOvulation = cycleLength - lutealPhaseLength;

  let estimatedLmpDate: Date;
  let predictedOvulationDate: Date;
  let confidenceLabel = "Standard Clinical Calculation";

  if (mode === "next-period") {
    const nextPeriod = parseInputDate(inputs.nextPeriodDate, 14);
    predictedOvulationDate = addDays(nextPeriod, -lutealPhaseLength);
    estimatedLmpDate = addDays(nextPeriod, -cycleLength);
    confidenceLabel = "Next Expected Period Method";
  } else if (mode === "due-date") {
    const targetDue = parseInputDate(inputs.targetDueDate, 266);
    predictedOvulationDate = addDays(targetDue, -266);
    estimatedLmpDate = addDays(predictedOvulationDate, -daysToOvulation);
    confidenceLabel = "Target Due Date Reverse Estimation";
  } else if (mode === "conception-date") {
    predictedOvulationDate = parseInputDate(inputs.conceptionDate, 0);
    estimatedLmpDate = addDays(predictedOvulationDate, -daysToOvulation);
    confidenceLabel = "Known Conception Date Mapping";
  } else if (mode === "reverse") {
    predictedOvulationDate = parseInputDate(inputs.reverseOvulationDate || inputs.lastPeriodDate, 0);
    estimatedLmpDate = addDays(predictedOvulationDate, -daysToOvulation);
    confidenceLabel = "Reverse Ovulation Date Estimator";
  } else if (mode === "advanced-planner") {
    estimatedLmpDate = parseInputDate(inputs.lastPeriodDate, 0);
    
    if (inputs.opkTestDate) {
      // If specific OPK positive surge test date is entered, ovulation occurs 24-36h later (1 day)
      const opkDate = parseInputDate(inputs.opkTestDate, 0);
      predictedOvulationDate = addDays(opkDate, 1);
      confidenceLabel = "Symptothermal LH Surge Confirmed (High Accuracy)";
    } else {
      predictedOvulationDate = addDays(estimatedLmpDate, daysToOvulation);
      if (inputs.opkResult === "positive" || inputs.opkResult === "peak") {
        confidenceLabel = "Symptothermal LH Surge Positive Supported";
      } else if (inputs.cervicalMucus === "egg-white") {
        confidenceLabel = "Egg-White Cervical Mucus Peak Fertility";
      } else {
        confidenceLabel = "Advanced Symptothermal Biomarker Planner";
      }
    }
  } else {
    // default LMP
    estimatedLmpDate = parseInputDate(inputs.lastPeriodDate, 0);
    predictedOvulationDate = addDays(estimatedLmpDate, daysToOvulation);
    confidenceLabel = "Standard LMP & Cycle Method";
  }

  // Fertile Window: exactly 6 calendar days (O-5 through O inclusive, ASRM standard)
  const fertileWindowStart = addDays(predictedOvulationDate, -5);
  const fertileWindowEnd = predictedOvulationDate;

  // Peak Fertility Window: 3 peak days (-2 DPO to 0 DPO inclusive)
  const peakFertilityStart = addDays(predictedOvulationDate, -2);
  const peakFertilityEnd = predictedOvulationDate;

  // Implantation Window: 6 to 12 DPO (Wilcox et al. NEJM data)
  const implantationWindowStart = addDays(predictedOvulationDate, 6);
  const implantationWindowEnd = addDays(predictedOvulationDate, 12);

  // Next Expected Period Date & Clinical Diagnostic Dates
  const nextPeriodDate = addDays(estimatedLmpDate, cycleLength);
  const earliestHcgUrineDate = addDays(predictedOvulationDate, 12);
  const estimatedDueDate = addDays(predictedOvulationDate, 266);

  // Daily Fertility Score & Rating (relative to today, evaluated on local calendar date)
  const today = new Date();
  today.setHours(12, 0, 0, 0);

  const diffDaysFromOvulation = Math.round(
    (today.getTime() - predictedOvulationDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  let dailyFertilityScore = 5;
  let fertilityRating: "Low" | "Moderate" | "High" | "Peak" = "Low";

  if (diffDaysFromOvulation === 0) {
    dailyFertilityScore = 98;
    fertilityRating = "Peak";
  } else if (diffDaysFromOvulation === -1) {
    dailyFertilityScore = 95;
    fertilityRating = "Peak";
  } else if (diffDaysFromOvulation === -2) {
    dailyFertilityScore = 88;
    fertilityRating = "Peak";
  } else if (diffDaysFromOvulation === -3) {
    dailyFertilityScore = 60;
    fertilityRating = "High";
  } else if (diffDaysFromOvulation === -4) {
    dailyFertilityScore = 35;
    fertilityRating = "Moderate";
  } else if (diffDaysFromOvulation === -5) {
    dailyFertilityScore = 15;
    fertilityRating = "Moderate";
  } else if (diffDaysFromOvulation === 1) {
    dailyFertilityScore = 10;
    fertilityRating = "Low";
  }

  const fecundabilityReferenceNote =
    "Population-level conception probability is substantially lower than relative fertility scores and averages approximately 27%–33% on peak days in healthy reference cohorts (Wilcox et al.). Individual fecundability varies by age, health, and clinical factors.";

  // Conception Probability Curve (-5 DPO to +1 DPO, Wilcox et al. NEJM / BMJ reference data)
  const conceptionProbabilityCurve: ConceptionProbabilityPoint[] = [
    {
      dayLabel: "O-5 (5 Days Before)",
      dayOffset: -5,
      probabilityPercent: 5,
      fertilityLevel: "Moderate",
      clinicalInterpretation: "Early fertile window; sperm survival depends on fertile cervical mucus",
    },
    {
      dayLabel: "O-4 (4 Days Before)",
      dayOffset: -4,
      probabilityPercent: 11,
      fertilityLevel: "Moderate",
      clinicalInterpretation: "Moderate conception potential; sperm viable in cervical crypts",
    },
    {
      dayLabel: "O-3 (3 Days Before)",
      dayOffset: -3,
      probabilityPercent: 16,
      fertilityLevel: "High",
      clinicalInterpretation: "High conception potential; viable sperm in Fallopian tube",
    },
    {
      dayLabel: "O-2 (2 Days Before)",
      dayOffset: -2,
      probabilityPercent: 27,
      fertilityLevel: "Peak",
      clinicalInterpretation: "Peak fertile day; coitus offers high statistical likelihood of fertilization",
    },
    {
      dayLabel: "O-1 (1 Day Before)",
      dayOffset: -1,
      probabilityPercent: 31,
      fertilityLevel: "Peak",
      clinicalInterpretation: "Optimal sperm arrival immediately prior to follicular rupture",
    },
    {
      dayLabel: "Ovulation Day (O)",
      dayOffset: 0,
      probabilityPercent: 33,
      fertilityLevel: "Peak",
      clinicalInterpretation: "Oocyte released; fertilization window active for 12 to 24 hours",
    },
    {
      dayLabel: "O+1 (1 Day After)",
      dayOffset: 1,
      probabilityPercent: 2,
      fertilityLevel: "Low",
      clinicalInterpretation: "Post-ovulatory day; unfertilized oocyte degrades rapidly",
    },
  ];

  // Timing Recommendation (Evidence-based ASRM guidance)
  let timingRecommendation = {
    title: "Conception Optimization Window",
    bestWindow: `${formatDate(fertileWindowStart)} – ${formatDate(fertileWindowEnd)}`,
    explanation:
      "To optimize conception likelihood, the American Society for Reproductive Medicine (ASRM) recommends intercourse every 1 to 2 days across your 6-day fertile window, with highest focus on peak days (O-2, O-1, and Ovulation Day).",
  };

  if (fertilityGoal === "fertile-window-optimization") {
    timingRecommendation = {
      title: "Peak Fertile Window Focus",
      bestWindow: `${formatDate(peakFertilityStart)} – ${formatDate(peakFertilityEnd)}`,
      explanation:
        "Focusing intercourse on the 2 days before ovulation and ovulation day accounts for the highest proportion of cycle conceptions (~80% of successful fertilizations in prospective cohort studies).",
    };
  } else if (fertilityGoal === "avoid-pregnancy") {
    timingRecommendation = {
      title: "Natural Family Planning (Fertile Window Abstinence)",
      bestWindow: `Abstain from ${formatDate(addDays(predictedOvulationDate, -7))} to ${formatDate(addDays(predictedOvulationDate, 2))}`,
      explanation:
        "For natural family planning, abstain from unprotected vaginal intercourse during the entire fertile interval (at least 7 days before ovulation through 2 days post-ovulation) to account for normal cycle variation and sperm longevity.",
    };
  }

  // Explicit Historical Shettles Context Note (Clinical evidence review)
  const historicalContextNote = {
    title: "Historical Shettles Method: Clinical Evidence Evaluation",
    explanation:
      "The Shettles method is a historical hypothesis about timing intercourse relative to ovulation. High-quality clinical evidence (including Wilcox et al. in the New England Journal of Medicine) does not establish that intercourse timing reliably determines fetal sex. Major reproductive societies (ASRM, ACOG) do not endorse intercourse timing for sex selection.",
  };

  // Monthly Calendar Days Array (Dynamically sized to cover cycle + 7 days, min 35)
  const totalCalendarDays = Math.max(35, cycleLength + 7);
  const monthlyCalendarDays: CalendarDayInfo[] = [];
  const calendarStart = addDays(estimatedLmpDate, 0);

  for (let i = 0; i < totalCalendarDays; i++) {
    const curr = addDays(calendarStart, i);
    const currIso = formatIso(curr);
    const isToday = currIso === formatIso(today);

    const diffFromOv = Math.round(
      (curr.getTime() - predictedOvulationDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    let status: CalendarDayInfo["status"] = "normal";
    let score = 1;
    let desc = "Low fertility day";

    if (i < periodLength) {
      status = "menstrual";
      desc = `Menstrual Cycle Day ${i + 1}`;
    } else if (currIso === formatIso(predictedOvulationDate)) {
      status = "ovulation";
      score = 98;
      desc = "PREDICTED OVULATION DAY (Peak Fertility)";
    } else if (diffFromOv >= -2 && diffFromOv < 0) {
      status = "peak";
      score = diffFromOv === -1 ? 95 : 88;
      desc = "Peak Fertile Window (High Conception Potential)";
    } else if (diffFromOv >= -5 && diffFromOv < -2) {
      status = "fertile";
      score = diffFromOv === -3 ? 60 : diffFromOv === -4 ? 35 : 15;
      desc = "Fertile Window (Sperm Survival Interval)";
    } else if (diffFromOv >= 6 && diffFromOv <= 12) {
      status = "implantation";
      desc = "Estimated Embryo Implantation Reference Window";
    } else if (currIso === formatIso(nextPeriodDate)) {
      status = "next-period";
      desc = "Predicted Next Menstrual Period Start";
    }

    monthlyCalendarDays.push({
      dateIso: currIso,
      dayOfMonth: curr.getDate(),
      monthName: curr.toLocaleDateString("en-US", { month: "short" }),
      dayOfWeekShort: curr.toLocaleDateString("en-US", { weekday: "narrow" }),
      status,
      fertilityScore: score,
      description: desc,
      isToday,
    });
  }

  // Dynamic Hormone Cycle Visualization (Days 1 to cycleLength)
  const hormoneCycleData: HormoneDataPoint[] = [];
  const ovDayNum = Math.max(5, daysToOvulation + 1); // e.g. Day 15 for 28-day cycle with 14d luteal

  for (let day = 1; day <= cycleLength; day++) {
    let estrogen = 20;
    let lh = 10;
    let progesterone = 5;

    if (day < ovDayNum - 4) {
      // Early follicular phase
      estrogen = 20 + (day / ovDayNum) * 15;
      lh = 10;
      progesterone = 5;
    } else if (day >= ovDayNum - 4 && day < ovDayNum) {
      // Pre-ovulatory follicular surge
      const progress = (day - (ovDayNum - 4)) / 4;
      estrogen = 35 + progress * 55; // peak ~90 pg/mL
      if (day >= ovDayNum - 1) {
        lh = 85; // LH surge
      } else {
        lh = 10 + progress * 35;
      }
      progesterone = 6;
    } else if (day === ovDayNum) {
      // Ovulation day
      estrogen = 65;
      lh = 75;
      progesterone = 8;
    } else {
      // Luteal phase
      const lutealProgress = (day - ovDayNum) / lutealPhaseLength;
      if (lutealProgress <= 1.0) {
        const bellCurve = Math.sin(lutealProgress * Math.PI);
        progesterone = 8 + bellCurve * 67; // peak ~75 ng/mL scale
        estrogen = 30 + bellCurve * 30; // secondary luteal rise
        lh = 10;
      } else {
        // Late luteal regression
        progesterone = 5;
        estrogen = 20;
        lh = 10;
      }
    }

    hormoneCycleData.push({
      day,
      dayLabel: `Day ${day}`,
      estrogen: Math.round(estrogen),
      lh: Math.round(lh),
      progesterone: Math.round(progesterone),
    });
  }

  // Personalized Educational Insights
  const personalizedInsights = [
    {
      title: "Fertile Window & Peak Timing",
      text: `Your predicted ovulation date is ${formatDate(predictedOvulationDate)}. The 6-day fertile window spans ${formatDate(fertileWindowStart)} through ${formatDate(fertileWindowEnd)}.`,
      advice:
        "The American Society for Reproductive Medicine (ASRM) recommends frequent intercourse (every 1–2 days) across the fertile window. Intercourse on the 2 days prior to ovulation offers the highest statistical chances of fertilization.",
    },
    {
      title: "Implantation & Clinical Testing Timeline",
      text: `If fertilization occurs, embryo implantation typically occurs 6 to 12 days after ovulation (${formatDate(implantationWindowStart)} through ${formatDate(implantationWindowEnd)}).`,
      advice: `A home urine pregnancy test can detect human chorionic gonadotropin (hCG) with high reliability on ${formatDate(earliestHcgUrineDate)}, around the day of your missed period.`,
    },
    {
      title: "Estimation Model & Biomarker Confirmation",
      text: `Calculated using ${confidenceLabel} for a ${cycleLength}-day cycle with a ${lutealPhaseLength}-day luteal phase.`,
      advice:
        "Calendar methods provide estimates based on population averages. Pairing cycle calculations with daily Basal Body Temperature (BBT) and urine Ovulation Predictor Kits (OPK) provides confirmation of actual physiological ovulation.",
    },
  ];

  return {
    calculationMode: mode,
    predictedOvulationDate: formatIso(predictedOvulationDate),
    predictedOvulationDateFormatted: formatDate(predictedOvulationDate),
    fertileWindowStartFormatted: formatDate(fertileWindowStart),
    fertileWindowEndFormatted: formatDate(fertileWindowEnd),
    peakFertilityStartFormatted: formatDate(peakFertilityStart),
    peakFertilityEndFormatted: formatDate(peakFertilityEnd),
    nextPeriodDateFormatted: formatDate(nextPeriodDate),
    implantationWindowStartFormatted: formatDate(implantationWindowStart),
    implantationWindowEndFormatted: formatDate(implantationWindowEnd),
    earliestHcgUrineTestDateFormatted: formatDate(earliestHcgUrineDate),
    estimatedDueDateFormatted: formatDate(estimatedDueDate),
    dailyFertilityScore,
    fertilityRating,
    fecundabilityReferenceNote,
    cycleLength,
    periodLength,
    lutealPhaseLength,
    motherAge,
    fertilityGoal,
    confidenceLabel,
    conceptionProbabilityCurve,
    hormoneCycleData,
    monthlyCalendarDays,
    timingRecommendation,
    historicalContextNote,
    personalizedInsights,
  };
}

export default calculateOvulationCalculator;
