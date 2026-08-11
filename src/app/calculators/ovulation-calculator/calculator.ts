import {
  OvulationCalculatorInputs,
  OvulationCalculatorOutputs,
  OvulationCalculationMode,
  FertilityGoal,
  CalendarDayInfo,
  ConceptionProbabilityPoint,
  HormoneDataPoint,
} from "./types";

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

  // Helper date functions
  const formatDate = (d: Date): string => {
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatIso = (d: Date): string => {
    return d.toISOString().split("T")[0];
  };

  const addDays = (d: Date, days: number): Date => {
    const res = new Date(d.getTime());
    res.setDate(res.getDate() + days);
    return res;
  };

  const parseInputDate = (val?: string, fallbackOffsetDays = 0): Date => {
    if (val) {
      const parsed = new Date(val);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return addDays(today, fallbackOffsetDays);
  };

  let estimatedLmpDate: Date;
  let predictedOvulationDate: Date;
  let confidenceLabel = "Standard Clinical Calculation";

  const daysToOvulation = cycleLength - lutealPhaseLength;

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
    predictedOvulationDate = parseInputDate(inputs.lastPeriodDate, 0);
    estimatedLmpDate = addDays(predictedOvulationDate, -daysToOvulation);
    confidenceLabel = "Reverse Ovulation Estimator";
  } else if (mode === "advanced-planner") {
    estimatedLmpDate = parseInputDate(inputs.lastPeriodDate, -14);
    predictedOvulationDate = addDays(estimatedLmpDate, daysToOvulation);

    // Advanced biomarker tweaks
    if (inputs.opkResult === "positive" || inputs.opkResult === "peak") {
      predictedOvulationDate = addDays(new Date(), 1); // 24-36 hours from LH surge
      confidenceLabel = "Symptothermal LH Surge Confirmed (High Accuracy)";
    } else if (inputs.cervicalMucus === "egg-white") {
      confidenceLabel = "Egg-White Cervical Mucus Peak Fertility";
    } else {
      confidenceLabel = "Advanced Symptothermal Biomarker Planner";
    }
  } else {
    // default LMP
    estimatedLmpDate = parseInputDate(inputs.lastPeriodDate, -14);
    predictedOvulationDate = addDays(estimatedLmpDate, daysToOvulation);
    confidenceLabel = "Standard LMP & Cycle Method";
  }

  // Fertile Window (-5 DPO to +1 DPO)
  const fertileWindowStart = addDays(predictedOvulationDate, -5);
  const fertileWindowEnd = addDays(predictedOvulationDate, 1);

  // Peak Fertility Window (-2 DPO to 0 DPO)
  const peakFertilityStart = addDays(predictedOvulationDate, -2);
  const peakFertilityEnd = predictedOvulationDate;

  // Implantation Window (6 to 12 DPO)
  const implantationWindowStart = addDays(predictedOvulationDate, 6);
  const implantationWindowEnd = addDays(predictedOvulationDate, 12);

  // Next Expected Period Date
  const nextPeriodDate = addDays(estimatedLmpDate, cycleLength);
  const earliestHcgUrineDate = addDays(predictedOvulationDate, 12);
  const estimatedDueDate = addDays(predictedOvulationDate, 266);

  // Daily Fertility Score & Rating (relative to today)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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

  // Conception Probability Curve (-5 DPO to +1 DPO)
  const conceptionProbabilityCurve: ConceptionProbabilityPoint[] = [
    {
      dayLabel: "O-5 (5 Days Before)",
      dayOffset: -5,
      probabilityPercent: 5,
      fertilityLevel: "Moderate",
      genderLean: "Girl Lean (X-Sperm)",
    },
    {
      dayLabel: "O-4 (4 Days Before)",
      dayOffset: -4,
      probabilityPercent: 11,
      fertilityLevel: "Moderate",
      genderLean: "Girl Lean (X-Sperm)",
    },
    {
      dayLabel: "O-3 (3 Days Before)",
      dayOffset: -3,
      probabilityPercent: 16,
      fertilityLevel: "High",
      genderLean: "Girl Lean (X-Sperm)",
    },
    {
      dayLabel: "O-2 (2 Days Before)",
      dayOffset: -2,
      probabilityPercent: 27,
      fertilityLevel: "Peak",
      genderLean: "Girl Lean (X-Sperm)",
    },
    {
      dayLabel: "O-1 (1 Day Before)",
      dayOffset: -1,
      probabilityPercent: 31,
      fertilityLevel: "Peak",
      genderLean: "Neutral",
    },
    {
      dayLabel: "Ovulation Day (O)",
      dayOffset: 0,
      probabilityPercent: 33,
      fertilityLevel: "Peak",
      genderLean: "Boy Lean (Y-Sperm)",
    },
    {
      dayLabel: "O+1 (1 Day After)",
      dayOffset: 1,
      probabilityPercent: 2,
      fertilityLevel: "Low",
      genderLean: "Neutral",
    },
  ];

  // Shettles Recommendation
  let shettlesRecommendation = {
    title: "General Conception Optimization",
    bestWindow: `${formatDate(fertileWindowStart)} – ${formatDate(fertileWindowEnd)}`,
    explanation:
      "To maximize conception likelihood, engage in sexual intercourse every 1 to 2 days during your 6-day fertile window, especially on peak days (O-2, O-1, and Ovulation Day).",
  };

  if (fertilityGoal === "conceive-boy") {
    shettlesRecommendation = {
      title: "Shettles Method for Conceiving a Boy",
      bestWindow: `${formatDate(addDays(predictedOvulationDate, -1))} – ${formatDate(predictedOvulationDate)}`,
      explanation:
        "According to the Shettles Method, Y-chromosome (male) sperm swim faster but have a shorter lifespan. Timing intercourse as close to ovulation as possible (or 12 hours after) favors Y-sperm reaching the egg first.",
    };
  } else if (fertilityGoal === "conceive-girl") {
    shettlesRecommendation = {
      title: "Shettles Method for Conceiving a Girl",
      bestWindow: `${formatDate(addDays(predictedOvulationDate, -4))} – ${formatDate(addDays(predictedOvulationDate, -2))}`,
      explanation:
        "According to the Shettles Method, X-chromosome (female) sperm are slower but more resilient in acidic cervical environments. Having intercourse 2 to 4 days before ovulation and abstaining 24–48 hours before ovulation favors X-sperm.",
    };
  } else if (fertilityGoal === "avoid-pregnancy") {
    shettlesRecommendation = {
      title: "Natural Family Planning (Abstinence Window)",
      bestWindow: `Abstain from ${formatDate(addDays(predictedOvulationDate, -7))} to ${formatDate(addDays(predictedOvulationDate, 2))}`,
      explanation:
        "To avoid pregnancy naturally, abstain from unprotected vaginal intercourse during the entire fertile window (at least 7 days before ovulation through 2 days post-ovulation).",
    };
  }

  // Monthly Calendar Days Array (35-day grid starting around LMP)
  const monthlyCalendarDays: CalendarDayInfo[] = [];
  const calendarStart = addDays(estimatedLmpDate, 0);

  for (let i = 0; i < 35; i++) {
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
      desc = "ESTIMATED OVULATION DAY (Peak Fertility)";
    } else if (diffFromOv >= -2 && diffFromOv < 0) {
      status = "peak";
      score = diffFromOv === -1 ? 95 : 88;
      desc = "Peak Fertile Window (High Chance)";
    } else if (diffFromOv >= -5 && diffFromOv < -2) {
      status = "fertile";
      score = diffFromOv === -3 ? 60 : diffFromOv === -4 ? 35 : 15;
      desc = "Fertile Window (Sperm Survival Window)";
    } else if (diffFromOv >= 6 && diffFromOv <= 12) {
      status = "implantation";
      desc = "Estimated Embryo Implantation Window";
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

  // Hormone Cycle Visualization Data (Days 1 to 28)
  const hormoneCycleData: HormoneDataPoint[] = [];
  for (let day = 1; day <= 28; day++) {
    let estrogen = 20;
    let lh = 10;
    let progesterone = 5;

    if (day >= 10 && day <= 14) {
      estrogen = 20 + (day - 10) * 18; // peak ~90 at day 13
      if (day === 13 || day === 14) lh = 85; // LH surge peak
    } else if (day > 14) {
      progesterone = 5 + Math.sin(((day - 14) / 14) * Math.PI) * 70; // peak ~75 at day 21
      estrogen = 30 + Math.sin(((day - 14) / 14) * Math.PI) * 30;
    }

    hormoneCycleData.push({
      day,
      dayLabel: `Day ${day}`,
      estrogen: Math.round(estrogen),
      lh: Math.round(lh),
      progesterone: Math.round(progesterone),
    });
  }

  // Dynamic Personalized Insights
  const personalizedInsights = [
    {
      title: "Fertile Window Peak",
      text: `Your predicted ovulation date is ${formatDate(predictedOvulationDate)}. Your peak fertile window spans from ${formatDate(peakFertilityStart)} to ${formatDate(peakFertilityEnd)}.`,
      advice: "Engaging in intercourse on the 2 days prior to ovulation offers the highest statistical probability of fertilization (27% to 33% per cycle).",
    },
    {
      title: "Implantation & Early Testing Timeline",
      text: `If fertilization occurs, embryo implantation is expected between ${formatDate(implantationWindowStart)} and ${formatDate(implantationWindowEnd)}.`,
      advice: `A home urine pregnancy test can accurately detect hCG starting on ${formatDate(earliestHcgUrineDate)} (the day of your expected period).`,
    },
    {
      title: "Method Confidence & Biomarker Tracking",
      text: `Calculated using ${confidenceLabel} for a ${cycleLength}-day cycle with a ${lutealPhaseLength}-day luteal phase.`,
      advice: "Combining cycle calendar calculations with daily Basal Body Temperature (BBT) tracking and Ovulation Predictor Kits (OPK) improves prediction precision by up to 99%.",
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
    cycleLength,
    periodLength,
    lutealPhaseLength,
    motherAge,
    fertilityGoal,
    confidenceLabel,
    conceptionProbabilityCurve,
    hormoneCycleData,
    monthlyCalendarDays,
    shettlesRecommendation,
    personalizedInsights,
  };
}

export default calculateOvulationCalculator;
