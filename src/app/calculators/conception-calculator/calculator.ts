import {
  ConceptionCalculationResults,
  DailyFertilityProbability,
  CyclePhaseItem,
  PregnancyMilestoneItem,
  FertilityForecastCycle,
  BBTLogEntry,
  ConceptionCalculatorOutputs,
} from "./types";

// Timezone-safe Date Helpers
export function addDays(date: Date, days: number): Date {
  const result = new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12, 0, 0, 0);
  result.setDate(result.getDate() + days);
  return result;
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseInputDate(value?: string, fallback: Date = new Date()): Date {
  if (!value) {
    return new Date(fallback.getFullYear(), fallback.getMonth(), fallback.getDate(), 12, 0, 0, 0);
  }
  const parts = value.split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) {
    return new Date(fallback.getFullYear(), fallback.getMonth(), fallback.getDate(), 12, 0, 0, 0);
  }
  return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0, 0);
}

export function formatDisplayDate(dateStr: string): string {
  if (!dateStr || dateStr === "N/A") return "N/A";
  const [y, m, d] = dateStr.split("-").map(Number);
  if (!y || !m || !d) return dateStr;
  const date = new Date(y, m - 1, d, 12, 0, 0, 0);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function calculateConceptionCalculator(
  inputs: Record<string, any>
): ConceptionCalculationResults {
  const mode = inputs.calculationMode || "lmp";
  const cycleLength = Math.max(20, Math.min(45, Number(inputs.cycleLength) || 28));
  const periodLength = Math.max(1, Math.min(15, Number(inputs.periodLength) || 5));
  const lutealPhaseLength = Math.max(8, Math.min(18, Number(inputs.lutealPhaseLength) || 14));
  const motherAge = Math.max(18, Math.min(50, Number(inputs.motherAge) || 28));
  const cervicalMucus = inputs.cervicalMucus || "egg-white";
  const opkResult = inputs.opkResult || "none";
  const bbtValue = Number(inputs.bbtValue) || 97.8;

  let lmpDateObj: Date;
  let ovulationDateObj: Date;
  let conceptionDateObj: Date;
  let dueDateObj: Date;

  const defaultRef = parseInputDate("2026-01-01");
  const daysToOvulation = cycleLength - lutealPhaseLength;

  // Mode calculations
  switch (mode) {
    case "ovulation": {
      ovulationDateObj = parseInputDate(inputs.ovulationDate, parseInputDate("2026-01-15"));
      conceptionDateObj = ovulationDateObj;
      lmpDateObj = addDays(ovulationDateObj, -daysToOvulation);
      dueDateObj = addDays(conceptionDateObj, 266);
      break;
    }
    case "due-date": {
      dueDateObj = parseInputDate(inputs.dueDate, parseInputDate("2026-10-08"));
      conceptionDateObj = addDays(dueDateObj, -266);
      ovulationDateObj = conceptionDateObj;
      lmpDateObj = addDays(conceptionDateObj, -daysToOvulation);
      break;
    }
    case "ultrasound": {
      const usDate = parseInputDate(inputs.ultrasoundDate, parseInputDate("2026-03-01"));
      const usWeeks = Number(inputs.ultrasoundWeeks) || 10;
      const usDays = Number(inputs.ultrasoundDays) || 0;
      const totalUsDays = usWeeks * 7 + usDays;

      lmpDateObj = addDays(usDate, -totalUsDays);
      ovulationDateObj = addDays(lmpDateObj, daysToOvulation);
      conceptionDateObj = ovulationDateObj;
      dueDateObj = addDays(conceptionDateObj, 266);
      break;
    }
    case "ivf": {
      const transferDate = parseInputDate(inputs.ivfTransferDate, parseInputDate("2026-02-01"));
      const embryoType = inputs.ivfEmbryoType || "day5";
      const embryoDays = embryoType === "day6" ? 6 : embryoType === "day5" ? 5 : 3;

      conceptionDateObj = addDays(transferDate, -embryoDays);
      ovulationDateObj = conceptionDateObj;
      dueDateObj = addDays(conceptionDateObj, 266);
      lmpDateObj = addDays(conceptionDateObj, -daysToOvulation);
      break;
    }
    case "reverse": {
      conceptionDateObj = parseInputDate(inputs.conceptionDate, parseInputDate("2026-01-15"));
      ovulationDateObj = conceptionDateObj;
      lmpDateObj = addDays(conceptionDateObj, -daysToOvulation);
      dueDateObj = addDays(conceptionDateObj, 266);
      break;
    }
    case "planner":
    case "timeline":
    case "lmp":
    default: {
      lmpDateObj = parseInputDate(inputs.lmpDate, defaultRef);
      ovulationDateObj = addDays(lmpDateObj, daysToOvulation);
      conceptionDateObj = ovulationDateObj;
      dueDateObj = addDays(conceptionDateObj, 266);
      break;
    }
  }

  // Windows
  const conceptionWindowStart = addDays(conceptionDateObj, -3);
  const conceptionWindowEnd = addDays(conceptionDateObj, 1);

  // ASRM 6-day fertile window: O-5 through Day O (inclusive, 6 calendar days)
  const fertileWindowStart = addDays(ovulationDateObj, -5);
  const fertileWindowEnd = ovulationDateObj;

  const peakFertileStart = addDays(ovulationDateObj, -2);
  const peakFertileEnd = ovulationDateObj;

  const implantationStart = addDays(ovulationDateObj, 6);
  const implantationEnd = addDays(ovulationDateObj, 12);
  const implantationPeak = addDays(ovulationDateObj, 9);

  const test10Dpo = addDays(ovulationDateObj, 10);
  const test14Dpo = addDays(ovulationDateObj, 14);

  // Dynamic Gestational Age based on system current date
  const now = new Date();
  const todayMidday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 12, 0, 0, 0);
  const daysSinceLmp = Math.max(0, Math.floor((todayMidday.getTime() - lmpDateObj.getTime()) / (1000 * 60 * 60 * 24)));
  const gestWeeks = Math.floor(daysSinceLmp / 7);
  const gestDays = daysSinceLmp % 7;

  let trimester = 1;
  if (gestWeeks >= 28) trimester = 3;
  else if (gestWeeks >= 13) trimester = 2;

  // Contextual score index (relative counseling index, not personalized guaranteed probability)
  let ageScoreMultiplier = 1.0;
  if (motherAge >= 40) ageScoreMultiplier = 0.7;
  else if (motherAge >= 35) ageScoreMultiplier = 0.85;
  else if (motherAge >= 30) ageScoreMultiplier = 0.95;

  let mucusBonus = 0;
  if (cervicalMucus === "egg-white") mucusBonus = 10;
  else if (cervicalMucus === "watery") mucusBonus = 5;

  let opkBonus = 0;
  if (opkResult === "peak" || opkResult === "positive") opkBonus = 10;

  const baseScore = Math.min(95, Math.round((75 + mucusBonus + opkBonus) * ageScoreMultiplier));

  // Wilcox et al. (NEJM 1995) Prospective Clinical Reference Probabilities
  const probabilities: DailyFertilityProbability[] = [
    { dayOffset: -5, date: formatDate(addDays(ovulationDateObj, -5)), dayLabel: "5 Days Before Ovulation", probability: 5, status: "Low", description: "Sperm can survive in crypts; fertile window opens." },
    { dayOffset: -4, date: formatDate(addDays(ovulationDateObj, -4)), dayLabel: "4 Days Before Ovulation", probability: 12, status: "Moderate", description: "Moderate probability of fertilization." },
    { dayOffset: -3, date: formatDate(addDays(ovulationDateObj, -3)), dayLabel: "3 Days Before Ovulation", probability: 18, status: "Moderate", description: "Good sperm viability and transport." },
    { dayOffset: -2, date: formatDate(addDays(ovulationDateObj, -2)), dayLabel: "2 Days Before Ovulation", probability: 27, status: "High", description: "Peak fecundability interval begins." },
    { dayOffset: -1, date: formatDate(addDays(ovulationDateObj, -1)), dayLabel: "1 Day Before Ovulation", probability: 33, status: "Peak", description: "Highest daily probability in prospective cohort." },
    { dayOffset: 0, date: formatDate(ovulationDateObj), dayLabel: "Ovulation Day", probability: 30, status: "Peak", description: "Egg released; oocyte viable for 12–24 hours." },
    { dayOffset: 1, date: formatDate(addDays(ovulationDateObj, 1)), dayLabel: "1 Day After Ovulation", probability: 5, status: "Low", description: "Biological window rapidly closing." },
  ];

  // Cycle Phases
  const cyclePhases: CyclePhaseItem[] = [
    {
      phaseName: "Menstruation",
      startDate: formatDate(lmpDateObj),
      endDate: formatDate(addDays(lmpDateObj, periodLength - 1)),
      durationDays: periodLength,
      description: "Uterine lining sheds; new cycle begins.",
      color: "#ef4444",
    },
    {
      phaseName: "Follicular Phase",
      startDate: formatDate(addDays(lmpDateObj, periodLength)),
      endDate: formatDate(addDays(ovulationDateObj, -1)),
      durationDays: Math.max(1, daysToOvulation - periodLength),
      description: "Follicles mature under FSH stimulation; estrogen rises.",
      color: "#3b82f6",
    },
    {
      phaseName: "Ovulation Window",
      startDate: formatDate(fertileWindowStart),
      endDate: formatDate(fertileWindowEnd),
      durationDays: 6, // Exactly 6 calendar days (O-5 to Day O)
      description: "LH surge triggers mature egg release; prime biological timing.",
      color: "#10b981",
    },
    {
      phaseName: "Luteal Phase",
      startDate: formatDate(addDays(ovulationDateObj, 1)),
      endDate: formatDate(addDays(lmpDateObj, cycleLength - 1)),
      durationDays: lutealPhaseLength,
      description: "Progesterone rises to support potential uterine implantation.",
      color: "#8b5cf6",
    },
  ];

  // Pregnancy Timeline Milestones
  const milestones: PregnancyMilestoneItem[] = [
    {
      title: "Estimated Conception / Fertilization",
      date: formatDate(conceptionDateObj),
      gestationalAge: "2 Weeks 0 Days",
      description: "Sperm fertilizes ovum in the fallopian tube.",
      category: "Conception",
    },
    {
      title: "Blastocyst Implantation Window",
      date: formatDate(implantationPeak),
      gestationalAge: "3 Weeks 2 Days",
      description: "Embryo attaches to uterine lining; hCG secretion begins.",
      category: "Implantation",
    },
    {
      title: "Earliest Sensitive Pregnancy Test",
      date: formatDate(test10Dpo),
      gestationalAge: "3 Weeks 3 Days",
      description: "Early detection home urine test (10–25 mIU/mL threshold).",
      category: "Medical",
    },
    {
      title: "Missed Menstrual Period",
      date: formatDate(test14Dpo),
      gestationalAge: "4 Weeks 0 Days",
      description: "Standard pregnancy tests reliably positive.",
      category: "Milestone",
    },
    {
      title: "First Clinical Ultrasound / Heartbeat Detection",
      date: formatDate(addDays(lmpDateObj, 46)),
      gestationalAge: "6 Weeks 4 Days",
      description: "Cardiac activity detectable via transvaginal ultrasound.",
      category: "Medical",
    },
    {
      title: "End of First Trimester",
      date: formatDate(addDays(lmpDateObj, 84)),
      gestationalAge: "12 Weeks 0 Days",
      description: "Organogenesis complete; risk of pregnancy loss drops.",
      category: "Trimester",
    },
    {
      title: "Fetal Movement ('Quickening')",
      date: formatDate(addDays(lmpDateObj, 126)),
      gestationalAge: "18 Weeks 0 Days",
      description: "First subtle fetal movements perceived.",
      category: "Milestone",
    },
    {
      title: "Anatomy Scan Ultrasound",
      date: formatDate(addDays(lmpDateObj, 140)),
      gestationalAge: "20 Weeks 0 Days",
      description: "Detailed anatomical survey of fetal structures.",
      category: "Medical",
    },
    {
      title: "Third Trimester Begins",
      date: formatDate(addDays(lmpDateObj, 196)),
      gestationalAge: "28 Weeks 0 Days",
      description: "Fetal lung maturation and rapid somatic growth.",
      category: "Trimester",
    },
    {
      title: "Estimated Due Date (Full Term)",
      date: formatDate(dueDateObj),
      gestationalAge: "40 Weeks 0 Days",
      description: "Estimated delivery date (37 to 42 weeks considered full term).",
      category: "Milestone",
    },
  ];

  // 6-Cycle Forecast
  const forecast: FertilityForecastCycle[] = [];
  let currentCycleStart = new Date(lmpDateObj);

  for (let i = 1; i <= 6; i++) {
    const cycleOvulation = addDays(currentCycleStart, cycleLength - lutealPhaseLength);
    const cycleFertileStart = addDays(cycleOvulation, -5);
    const cycleFertileEnd = cycleOvulation; // Exactly 6 days: O-5 to Day O
    const cycleDueIfConceived = addDays(cycleOvulation, 266);

    forecast.push({
      cycleNumber: i,
      periodStartDate: formatDate(currentCycleStart),
      ovulationDate: formatDate(cycleOvulation),
      fertileWindowStart: formatDate(cycleFertileStart),
      fertileWindowEnd: formatDate(cycleFertileEnd),
      peakFertilityDate: formatDate(cycleOvulation),
      dueDateIfConceived: formatDate(cycleDueIfConceived),
    });

    currentCycleStart = addDays(currentCycleStart, cycleLength);
  }

  // Sample BBT Data (Cycle model)
  const sampleBBTData: BBTLogEntry[] = [];
  const daysInCycle = Math.min(35, cycleLength);
  const ovDayNum = cycleLength - lutealPhaseLength;

  for (let d = 1; d <= daysInCycle; d++) {
    const bbtDate = addDays(lmpDateObj, d - 1);
    let temp = 97.4 + ((d * 3) % 20) * 0.01;
    let phaseLabel: "Follicular" | "Ovulation" | "Luteal" = "Follicular";

    if (d === ovDayNum) {
      temp = 97.2; // Dip on ovulation day
      phaseLabel = "Ovulation";
    } else if (d > ovDayNum) {
      temp = 98.1 + ((d * 5) % 25) * 0.01; // Thermal shift rise
      phaseLabel = "Luteal";
    }

    sampleBBTData.push({
      day: d,
      date: formatDate(bbtDate),
      temperature: Number(temp.toFixed(2)),
      phase: phaseLabel,
    });
  }

  // Smart Insights & Recommendations
  const insights: string[] = [
    `Your estimated conception date is ${formatDisplayDate(formatDate(conceptionDateObj))}.`,
    `Your peak fertile window spans from ${formatDisplayDate(formatDate(peakFertileStart))} to ${formatDisplayDate(formatDate(peakFertileEnd))}.`,
    `Sperm can survive up to 5 days in fertile cervical mucus, making the 2 to 3 days preceding ovulation the optimal timing for intercourse.`,
  ];

  if (motherAge >= 35) {
    insights.push(`At age ${motherAge}, pre-conception folic acid supplementation (400–800 mcg/day) and early prenatal care are strongly recommended.`);
  }

  if (cervicalMucus === "egg-white") {
    insights.push(`Egg-white cervical mucus indicates peak estrogen and optimal sperm motility conditions.`);
  }

  const recommendations: string[] = [
    `Schedule intercourse every 1 to 2 days during your fertile window (${formatDisplayDate(formatDate(fertileWindowStart))} – ${formatDisplayDate(formatDate(fertileWindowEnd))}).`,
    `Track basal body temperature (BBT) upon waking to confirm post-ovulatory progesterone rise (+0.5°F to +1.0°F).`,
    `Take an early detection home pregnancy test starting around ${formatDisplayDate(formatDate(test10Dpo))} (10 DPO) or standard test on ${formatDisplayDate(formatDate(test14Dpo))}.`,
    `Maintain healthy lifestyle habits: daily prenatal vitamins with folate, moderate exercise, and avoid tobacco/alcohol.`,
  ];

  return {
    mode,
    conceptionDate: formatDate(conceptionDateObj),
    conceptionWindow: {
      start: formatDate(conceptionWindowStart),
      end: formatDate(conceptionWindowEnd),
      mostLikely: formatDate(conceptionDateObj),
    },
    fertileWindow: {
      start: formatDate(fertileWindowStart),
      end: formatDate(fertileWindowEnd),
      peakStart: formatDate(peakFertileStart),
      peakEnd: formatDate(peakFertileEnd),
    },
    ovulationDate: formatDate(ovulationDateObj),
    estimatedDueDate: formatDate(dueDateObj),
    estimatedLmpDate: formatDate(lmpDateObj),
    implantationWindow: {
      start: formatDate(implantationStart),
      end: formatDate(implantationEnd),
      peakDate: formatDate(implantationPeak),
    },
    earliestTestDate: {
      sensitive10Dpo: formatDate(test10Dpo),
      standard14Dpo: formatDate(test14Dpo),
    },
    gestationalAge: {
      weeks: gestWeeks,
      days: gestDays,
      formatted: `${gestWeeks} Weeks ${gestDays} Days`,
    },
    trimester,
    overallFertilityScore: baseScore,
    fertilityStatus: baseScore >= 80 ? "Peak" : baseScore >= 65 ? "High" : baseScore >= 45 ? "Moderate" : "Low",
    probabilities,
    cyclePhases,
    milestones,
    forecast,
    sampleBBTData,
    insights,
    recommendations,
  };
}

export function calculateConceptionOutputs(inputs: Record<string, any>): ConceptionCalculatorOutputs {
  const res = calculateConceptionCalculator(inputs);
  return {
    conceptionDate: res.conceptionDate,
    conceptionWindow: `${res.conceptionWindow.start} to ${res.conceptionWindow.end}`,
    fertileWindow: `${res.fertileWindow.start} to ${res.fertileWindow.end}`,
    ovulationDate: res.ovulationDate,
    dueDate: res.estimatedDueDate,
    lmpDate: res.estimatedLmpDate,
    implantationWindow: `${res.implantationWindow.start} to ${res.implantationWindow.end}`,
    earliestTestDate: res.earliestTestDate.sensitive10Dpo,
    overallScore: res.overallFertilityScore,
  };
}
