import {
  PregnancyConceptionCalculatorInputs,
  PregnancyConceptionCalculatorOutputs,
  ConceptionCalculationMode,
  ConceptionProbabilityPoint,
  TimelineMilestoneItem,
  ImplantationStageInfo,
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
 * Standard US formatted date string (e.g. "Jan 15, 2026")
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

export function calculatePregnancyConceptionCalculator(
  rawInputs: Record<string, any>
): PregnancyConceptionCalculatorOutputs {
  const inputs: PregnancyConceptionCalculatorInputs = rawInputs || {};
  const mode: ConceptionCalculationMode = inputs.calculationMode || "due-date";

  const cycleLength = Math.max(20, Math.min(45, Number(inputs.cycleLength) || 28));
  const lutealPhaseLength = Math.max(9, Math.min(18, Number(inputs.lutealPhaseLength) || 14));
  const motherAge = Math.max(18, Math.min(50, Number(inputs.motherAge) || 28));
  const periodLength = Math.max(2, Math.min(10, Number(inputs.periodLength) || 5));

  const daysToOvulation = cycleLength - lutealPhaseLength;

  let estimatedConceptionDate: Date;
  let estimatedDueDate: Date;
  let estimatedLmpDate: Date;
  let confidenceRangeLabel = "± 2 to 3 Days";

  // Mode calculations
  if (mode === "due-date") {
    estimatedDueDate = parseInputDate(inputs.dueDate, 140);
    // Conception is 266 days before due date (38 weeks post-conception)
    estimatedConceptionDate = addDays(estimatedDueDate, -266);
    // Derived LMP accounts for custom cycle length & luteal phase
    estimatedLmpDate = addDays(estimatedConceptionDate, -daysToOvulation);
    confidenceRangeLabel = "± 2 to 4 Days (Based on Due Date)";
  } else if (mode === "lmp") {
    estimatedLmpDate = parseInputDate(inputs.lmpDate, -140);
    // Ovulation / Conception = LMP + (CycleLength - LutealPhaseLength)
    estimatedConceptionDate = addDays(estimatedLmpDate, daysToOvulation);
    // Due Date = Conception + 266 days
    estimatedDueDate = addDays(estimatedConceptionDate, 266);
    confidenceRangeLabel = "± 2 to 3 Days (Assuming Regular Cycle)";
  } else if (mode === "ultrasound") {
    const scanDate = parseInputDate(inputs.ultrasoundDate, -30);
    const scanWeeks = Math.max(4, Math.min(40, Number(inputs.ultrasoundWeeks) || 12));
    const scanDays = Math.max(0, Math.min(6, Number(inputs.ultrasoundDays) || 0));
    const totalGestationalDays = scanWeeks * 7 + scanDays;

    // Derived LMP from ultrasound biometric scan age
    estimatedLmpDate = addDays(scanDate, -totalGestationalDays);
    // Conception & Due date respect configured cycle & luteal assumptions
    estimatedConceptionDate = addDays(estimatedLmpDate, daysToOvulation);
    estimatedDueDate = addDays(estimatedConceptionDate, 266);
    confidenceRangeLabel = scanWeeks <= 12 ? "± 3 to 5 Days (High Early Ultrasound Accuracy)" : "± 7 to 10 Days (Mid-Pregnancy Scan)";
  } else if (mode === "conception-date" || mode === "reverse") {
    estimatedConceptionDate = parseInputDate(inputs.conceptionDate, -126);
    estimatedDueDate = addDays(estimatedConceptionDate, 266);
    estimatedLmpDate = addDays(estimatedConceptionDate, -daysToOvulation);
    confidenceRangeLabel = "Exact Known Date (± 1 Day Window)";
  } else if (mode === "ovulation-date") {
    estimatedConceptionDate = parseInputDate(inputs.ovulationDate, -126);
    estimatedDueDate = addDays(estimatedConceptionDate, 266);
    estimatedLmpDate = addDays(estimatedConceptionDate, -daysToOvulation);
    confidenceRangeLabel = "± 1 Day (Ovulation Timing)";
  } else if (mode === "ivf") {
    const transferDate = parseInputDate(inputs.ivfTransferDate, -100);
    const embryoType = inputs.ivfEmbryoType || "day5";

    if (embryoType === "day3") {
      estimatedConceptionDate = addDays(transferDate, -3);
      estimatedDueDate = addDays(transferDate, 263);
    } else if (embryoType === "day5") {
      estimatedConceptionDate = addDays(transferDate, -5);
      estimatedDueDate = addDays(transferDate, 261);
    } else {
      // fresh egg retrieval
      estimatedConceptionDate = transferDate;
      estimatedDueDate = addDays(transferDate, 266);
    }
    estimatedLmpDate = addDays(estimatedConceptionDate, -daysToOvulation);
    confidenceRangeLabel = "Exact Medical Date (± 0 Days Clinical Precision)";
  } else {
    estimatedDueDate = parseInputDate(inputs.dueDate, 140);
    estimatedConceptionDate = addDays(estimatedDueDate, -266);
    estimatedLmpDate = addDays(estimatedConceptionDate, -daysToOvulation);
  }

  // Key Intercourse & Conception Ranges
  const conceptionRangeStart = addDays(estimatedConceptionDate, -3);
  const conceptionRangeEnd = addDays(estimatedConceptionDate, 2);

  // Fertile Window: Exactly 6 calendar days (O-5 through O inclusive, ASRM clinical standard)
  const fertileWindowStart = addDays(estimatedConceptionDate, -5);
  const fertileWindowEnd = estimatedConceptionDate;

  const implantationWindowStart = addDays(estimatedConceptionDate, 6);
  const implantationWindowEnd = addDays(estimatedConceptionDate, 12);

  const earliestHcgBloodDate = addDays(estimatedConceptionDate, 9);
  const earliestHcgUrineDate = addDays(estimatedConceptionDate, 12);
  const fetalHeartbeatDate = addDays(estimatedConceptionDate, 28); // ~6 weeks gestational age

  // Calculate current gestational age based on today (midday local)
  const today = new Date();
  today.setHours(12, 0, 0, 0);
  const totalGestationalDays = Math.max(0, Math.floor((today.getTime() - estimatedLmpDate.getTime()) / (1000 * 60 * 60 * 24)));
  const currentGestationalAgeWeeks = Math.floor(totalGestationalDays / 7);
  const currentGestationalAgeDays = totalGestationalDays % 7;

  // Conception Probability Curve (-5 to +1 relative to ovulation, Wilcox et al. reference cohort data)
  const probabilityCurve: ConceptionProbabilityPoint[] = [
    {
      dayOffset: -5,
      dayLabel: "5 Days Before Ovulation",
      dateStr: formatDate(addDays(estimatedConceptionDate, -5)),
      probabilityPercent: 5,
      fertilityLevel: "Low",
      description: "Sperm can survive in fertile cervical mucus.",
    },
    {
      dayOffset: -4,
      dayLabel: "4 Days Before Ovulation",
      dateStr: formatDate(addDays(estimatedConceptionDate, -4)),
      probabilityPercent: 12,
      fertilityLevel: "Medium",
      description: "Moderate conception likelihood.",
    },
    {
      dayOffset: -3,
      dayLabel: "3 Days Before Ovulation",
      dateStr: formatDate(addDays(estimatedConceptionDate, -3)),
      probabilityPercent: 18,
      fertilityLevel: "High",
      description: "High chance of sperm awaiting ovulated egg.",
    },
    {
      dayOffset: -2,
      dayLabel: "2 Days Before Ovulation",
      dateStr: formatDate(addDays(estimatedConceptionDate, -2)),
      probabilityPercent: 28,
      fertilityLevel: "Peak",
      description: "Peak fertile window for conception.",
    },
    {
      dayOffset: -1,
      dayLabel: "1 Day Before Ovulation",
      dateStr: formatDate(addDays(estimatedConceptionDate, -1)),
      probabilityPercent: 32,
      fertilityLevel: "Peak",
      description: "Highest daily probability of successful fertilization.",
    },
    {
      dayOffset: 0,
      dayLabel: "Ovulation / Conception Day",
      dateStr: formatDate(estimatedConceptionDate),
      probabilityPercent: 33,
      fertilityLevel: "Peak",
      description: "Egg is released into Fallopian tube (viable for 12–24 hours).",
    },
    {
      dayOffset: 1,
      dayLabel: "1 Day After Ovulation",
      dateStr: formatDate(addDays(estimatedConceptionDate, 1)),
      probabilityPercent: 4,
      fertilityLevel: "Low",
      description: "Egg degrades after 24 hours if unfertilized.",
    },
  ];

  // Timeline Milestones
  const timelineMilestones: TimelineMilestoneItem[] = [
    {
      key: "conception",
      title: "Estimated Conception & Fertilization",
      dateStr: formatDate(estimatedConceptionDate),
      gestationalAge: "2 Weeks 0 Days",
      category: "conception",
      description: "Sperm fertilizes ovum in Fallopian tube forming a single-cell zygote.",
    },
    {
      key: "implantation",
      title: "Embryo Implantation Window",
      dateStr: `${formatDate(implantationWindowStart)} – ${formatDate(implantationWindowEnd)}`,
      gestationalAge: "3 Weeks 1 Day – 3 Weeks 5 Days",
      category: "implantation",
      description: "Blastocyst burrows into uterine endometrium; hCG hormone secretion begins.",
    },
    {
      key: "blood-test",
      title: "Earliest Quantitative Blood hCG Test",
      dateStr: formatDate(earliestHcgBloodDate),
      gestationalAge: "3 Weeks 2 Days",
      category: "testing",
      description: "Clinical lab blood test can detect low levels of hCG (~5–10 mIU/mL).",
    },
    {
      key: "urine-test",
      title: "Home Pregnancy Urine Test (Missed Period)",
      dateStr: formatDate(earliestHcgUrineDate),
      gestationalAge: "3 Weeks 5 Days (Day of Missed Period)",
      category: "testing",
      description: "Home urine tests reliably detect human chorionic gonadotropin (hCG) around the day of expected menses.",
    },
    {
      key: "heartbeat",
      title: "Fetal Heartbeat Printable Milestone",
      dateStr: formatDate(fetalHeartbeatDate),
      gestationalAge: "6 Weeks 0 Days",
      category: "clinical",
      description: "Early transvaginal ultrasound can detect cardiac flicker (~110–120 bpm).",
    },
    {
      key: "trimester1",
      title: "End of First Trimester",
      dateStr: formatDate(addDays(estimatedLmpDate, 91)),
      gestationalAge: "13 Weeks 0 Days",
      category: "clinical",
      description: "Risk of miscarriage drops significantly; major organogenesis complete.",
    },
    {
      key: "due-date",
      title: "Estimated Due Date (EDD)",
      dateStr: formatDate(estimatedDueDate),
      gestationalAge: "40 Weeks 0 Days",
      category: "delivery",
      description: "Full-term delivery target date based on 38 weeks post-conception.",
    },
  ];

  // Implantation Stages (6 to 12 DPO)
  const implantationStages: ImplantationStageInfo[] = [
    {
      dpo: 6,
      dateStr: formatDate(addDays(estimatedConceptionDate, 6)),
      probabilityPercent: 10,
      stageName: "Early Hatching & Attachment",
      description: "Blastocyst sheds zona pellucida and makes initial contact with uterine lining.",
    },
    {
      dpo: 8,
      dateStr: formatDate(addDays(estimatedConceptionDate, 8)),
      probabilityPercent: 35,
      stageName: "Peak Penetration & Trophoblast Invasiveness",
      description: "Trophoblast cells invade endometrial stroma. Light implantation spotting may occur.",
    },
    {
      dpo: 9,
      dateStr: formatDate(addDays(estimatedConceptionDate, 9)),
      probabilityPercent: 30,
      stageName: "Complete Endometrial Embedment",
      description: "Blastocyst is fully encased within uterine lining. Primitive hCG enters bloodstream.",
    },
    {
      dpo: 11,
      dateStr: formatDate(addDays(estimatedConceptionDate, 11)),
      probabilityPercent: 15,
      stageName: "Vascular Lacunae Connection",
      description: "Maternal capillaries connect with embryonic syncytiotrophoblast lacunae.",
    },
    {
      dpo: 12,
      dateStr: formatDate(addDays(estimatedConceptionDate, 12)),
      probabilityPercent: 10,
      stageName: "Firm Uterine Sealing",
      description: "Endometrium heals over implantation site. HCG doubles every 48 hours.",
    },
  ];

  // Dynamic Clinical Insights
  const personalizedInsights = [
    {
      title: `Most Probable Conception Window`,
      text: `Based on your inputs, fertilization most likely occurred between ${formatDate(conceptionRangeStart)} and ${formatDate(conceptionRangeEnd)}.`,
      advice: `Sexual intercourse between ${formatDate(fertileWindowStart)} and ${formatDate(fertileWindowEnd)} carries the highest probability of resulting in this pregnancy because healthy sperm remains viable inside cervical mucus for up to 5 days.`,
    },
    {
      title: `Implantation & Early Testing Timeline`,
      text: `Embryo implantation expected around ${formatDate(addDays(estimatedConceptionDate, 8))} (reference window ${formatDate(implantationWindowStart)} – ${formatDate(implantationWindowEnd)}).`,
      advice: `Home pregnancy testing is most useful around the expected menstrual period (${formatDate(earliestHcgUrineDate)}), but test performance depends on timing, urine concentration, assay sensitivity, and the individual test.`,
    },
    {
      title: `Dating Precision & Confidence`,
      text: `Dating Accuracy Confidence: ${confidenceRangeLabel}.`,
      advice: `Obstetric ultrasound performed in the first trimester (Weeks 7–12) provides the most reliable clinical confirmation of gestational age, with a typical margin of error of ±3 to 5 days.`,
    },
  ];

  return {
    calculationMode: mode,
    estimatedConceptionDate: formatIso(estimatedConceptionDate),
    estimatedConceptionDateFormatted: formatDate(estimatedConceptionDate),
    conceptionRangeStartFormatted: formatDate(conceptionRangeStart),
    conceptionRangeEndFormatted: formatDate(conceptionRangeEnd),
    estimatedOvulationDateFormatted: formatDate(estimatedConceptionDate),
    fertileWindowStart: formatIso(fertileWindowStart),
    fertileWindowEnd: formatIso(fertileWindowEnd),
    fertileWindowStartFormatted: formatDate(fertileWindowStart),
    fertileWindowEndFormatted: formatDate(fertileWindowEnd),
    fertileWindowFormatted: `${formatDate(fertileWindowStart)} – ${formatDate(fertileWindowEnd)}`,
    implantationWindowStartFormatted: formatDate(implantationWindowStart),
    implantationWindowEndFormatted: formatDate(implantationWindowEnd),
    implantationWindowFormatted: `${formatDate(implantationWindowStart)} – ${formatDate(implantationWindowEnd)}`,
    estimatedDueDate: formatIso(estimatedDueDate),
    estimatedDueDateFormatted: formatDate(estimatedDueDate),
    lmpDateFormatted: formatDate(estimatedLmpDate),
    earliestHcgBloodTestDateFormatted: formatDate(earliestHcgBloodDate),
    earliestHcgUrineTestDateFormatted: formatDate(earliestHcgUrineDate),
    fetalHeartbeatDateFormatted: formatDate(fetalHeartbeatDate),
    currentGestationalAgeWeeks,
    currentGestationalAgeDays,
    confidenceRangeLabel,
    motherAge,
    cycleLength,
    lutealPhaseLength,
    probabilityCurve,
    timelineMilestones,
    implantationStages,
    personalizedInsights,
  };
}

export default calculatePregnancyConceptionCalculator;
