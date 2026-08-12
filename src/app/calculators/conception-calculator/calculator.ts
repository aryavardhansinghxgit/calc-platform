import {
  ConceptionInputParams,
  ConceptionCalculationResults,
  DailyFertilityProbability,
  CyclePhaseItem,
  PregnancyMilestoneItem,
  FertilityForecastCycle,
  BBTLogEntry,
  ConceptionCalculatorOutputs,
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

export function calculateConceptionCalculator(
  inputs: Record<string, any>
): ConceptionCalculationResults {
  const mode = inputs.calculationMode || "lmp";
  const cycleLength = Number(inputs.cycleLength) || 28;
  const periodLength = Number(inputs.periodLength) || 5;
  const lutealPhaseLength = Number(inputs.lutealPhaseLength) || 14;
  const motherAge = Number(inputs.motherAge) || 28;
  const cervicalMucus = inputs.cervicalMucus || "egg-white";
  const opkResult = inputs.opkResult || "none";
  const bbtValue = Number(inputs.bbtValue) || 97.8;

  let lmpDateObj: Date;
  let ovulationDateObj: Date;
  let conceptionDateObj: Date;
  let dueDateObj: Date;

  const today = new Date("2026-01-01T00:00:00");

  // Mode calculations
  switch (mode) {
    case "ovulation": {
      ovulationDateObj = parseDate(inputs.ovulationDate, today);
      conceptionDateObj = ovulationDateObj;
      lmpDateObj = addDays(ovulationDateObj, -(cycleLength - lutealPhaseLength));
      dueDateObj = addDays(ovulationDateObj, 266);
      break;
    }
    case "due-date": {
      dueDateObj = parseDate(inputs.dueDate, addDays(today, 280));
      conceptionDateObj = addDays(dueDateObj, -266);
      ovulationDateObj = conceptionDateObj;
      lmpDateObj = addDays(dueDateObj, -280);
      break;
    }
    case "ultrasound": {
      const usDate = parseDate(inputs.ultrasoundDate, today);
      const usWeeks = Number(inputs.ultrasoundWeeks) || 10;
      const usDays = Number(inputs.ultrasoundDays) || 0;
      const totalUsDays = usWeeks * 7 + usDays;

      lmpDateObj = addDays(usDate, -totalUsDays);
      ovulationDateObj = addDays(lmpDateObj, cycleLength - lutealPhaseLength);
      conceptionDateObj = ovulationDateObj;
      dueDateObj = addDays(lmpDateObj, 280);
      break;
    }
    case "ivf": {
      const transferDate = parseDate(inputs.ivfTransferDate, today);
      const embryoType = inputs.ivfEmbryoType || "day5";
      const embryoDays = embryoType === "day6" ? 6 : embryoType === "day5" ? 5 : 3;

      conceptionDateObj = addDays(transferDate, -embryoDays);
      ovulationDateObj = conceptionDateObj;
      dueDateObj = addDays(transferDate, 266 - embryoDays);
      lmpDateObj = addDays(dueDateObj, -280);
      break;
    }
    case "reverse": {
      conceptionDateObj = parseDate(inputs.conceptionDate, today);
      ovulationDateObj = conceptionDateObj;
      lmpDateObj = addDays(conceptionDateObj, -(cycleLength - lutealPhaseLength));
      dueDateObj = addDays(conceptionDateObj, 266);
      break;
    }
    case "planner":
    case "timeline":
    case "lmp":
    default: {
      lmpDateObj = parseDate(inputs.lmpDate, addDays(today, -28));
      ovulationDateObj = addDays(lmpDateObj, cycleLength - lutealPhaseLength);
      conceptionDateObj = ovulationDateObj;
      dueDateObj = addDays(lmpDateObj, 280 + (cycleLength - 28));
      break;
    }
  }

  // Windows
  const conceptionWindowStart = addDays(conceptionDateObj, -3);
  const conceptionWindowEnd = addDays(conceptionDateObj, 1);

  const fertileWindowStart = addDays(ovulationDateObj, -5);
  const fertileWindowEnd = addDays(ovulationDateObj, 1);

  const peakFertileStart = addDays(ovulationDateObj, -2);
  const peakFertileEnd = ovulationDateObj;

  const implantationStart = addDays(ovulationDateObj, 6);
  const implantationEnd = addDays(ovulationDateObj, 12);
  const implantationPeak = addDays(ovulationDateObj, 9);

  const test10Dpo = addDays(ovulationDateObj, 10);
  const test14Dpo = addDays(ovulationDateObj, 14);

  // Gestational Age
  const daysSinceLmp = Math.max(0, Math.floor((today.getTime() - lmpDateObj.getTime()) / (1000 * 60 * 60 * 24)));
  const gestWeeks = Math.floor(daysSinceLmp / 7);
  const gestDays = daysSinceLmp % 7;

  let trimester = 1;
  if (gestWeeks >= 28) trimester = 3;
  else if (gestWeeks >= 13) trimester = 2;

  // Age & Mucus Score Multipliers
  let ageScoreMultiplier = 1.0;
  if (motherAge >= 40) ageScoreMultiplier = 0.65;
  else if (motherAge >= 35) ageScoreMultiplier = 0.8;
  else if (motherAge >= 30) ageScoreMultiplier = 0.95;

  let mucusBonus = 0;
  if (cervicalMucus === "egg-white") mucusBonus = 15;
  else if (cervicalMucus === "watery") mucusBonus = 10;
  else if (cervicalMucus === "creamy") mucusBonus = 5;

  let opkBonus = 0;
  if (opkResult === "peak" || opkResult === "positive") opkBonus = 15;

  const baseScore = Math.min(100, Math.round((80 + mucusBonus + opkBonus) * ageScoreMultiplier));

  // Daily Probabilities around Fertile Window (-5 to +1 relative to ovulation)
  const probabilities: DailyFertilityProbability[] = [];
  const probOffsets = [
    { offset: -5, baseProb: 5, label: "5 Days Before Ovulation", status: "Low" as const, desc: "Sperm can survive, early window opens." },
    { offset: -4, baseProb: 12, label: "4 Days Before Ovulation", status: "Moderate" as const, desc: "Moderate conception probability." },
    { offset: -3, baseProb: 18, label: "3 Days Before Ovulation", status: "Moderate" as const, desc: "Good sperm viability window." },
    { offset: -2, baseProb: 27, label: "2 Days Before Ovulation", status: "High" as const, desc: "Prime fertile window; high sperm concentration." },
    { offset: -1, baseProb: 33, label: "1 Day Before Ovulation", status: "Peak" as const, desc: "Highest overall conception probability!" },
    { offset: 0, baseProb: 30, label: "Ovulation Day", status: "Peak" as const, desc: "Egg released; highly fertile (12-24 hr window)." },
    { offset: 1, baseProb: 5, label: "1 Day After Ovulation", status: "Low" as const, desc: "Egg viability closing rapidly." },
  ];

  probOffsets.forEach((p) => {
    const d = addDays(ovulationDateObj, p.offset);
    const adjustedProb = Math.min(45, Math.round(p.baseProb * ageScoreMultiplier + (p.offset >= -2 && p.offset <= 0 ? mucusBonus / 3 : 0)));
    probabilities.push({
      dayOffset: p.offset,
      date: formatDate(d),
      dayLabel: p.label,
      probability: adjustedProb,
      status: p.status,
      description: p.desc,
    });
  });

  // Cycle Phases
  const cyclePhases: CyclePhaseItem[] = [
    {
      phaseName: "Menstruation",
      startDate: formatDate(lmpDateObj),
      endDate: formatDate(addDays(lmpDateObj, periodLength - 1)),
      durationDays: periodLength,
      description: "Uterine lining sheds; cycle restarts.",
      color: "#ef4444",
    },
    {
      phaseName: "Follicular Phase",
      startDate: formatDate(addDays(lmpDateObj, periodLength)),
      endDate: formatDate(addDays(ovulationDateObj, -1)),
      durationDays: Math.max(1, cycleLength - lutealPhaseLength - periodLength),
      description: "Follicles mature in ovaries under FSH stimulation; estrogen rises.",
      color: "#3b82f6",
    },
    {
      phaseName: "Ovulation Window",
      startDate: formatDate(fertileWindowStart),
      endDate: formatDate(fertileWindowEnd),
      durationDays: 7,
      description: "LH surge triggers egg release; peak fertility days.",
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
      description: "Sperm successfully fertilizes egg in the fallopian tube.",
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
      description: "Early detection home pregnancy test (10 mIU/mL sensitive).",
      category: "Medical",
    },
    {
      title: "Missed Menstrual Period",
      date: formatDate(test14Dpo),
      gestationalAge: "4 Weeks 0 Days",
      description: "Standard pregnancy test highly accurate.",
      category: "Milestone",
    },
    {
      title: "First Clinical Ultrasound / Heartbeat Detection",
      date: formatDate(addDays(lmpDateObj, 46)),
      gestationalAge: "6 Weeks 4 Days",
      description: "Early cardiac activity detectable via transvaginal ultrasound.",
      category: "Medical",
    },
    {
      title: "End of First Trimester",
      date: formatDate(addDays(lmpDateObj, 84)),
      gestationalAge: "12 Weeks 0 Days",
      description: "Risk of miscarriage drops significantly; organ systems formed.",
      category: "Trimester",
    },
    {
      title: "Fetal Movement ('Quickening')",
      date: formatDate(addDays(lmpDateObj, 126)),
      gestationalAge: "18 Weeks 0 Days",
      description: "First subtle flutterings or movements felt by mother.",
      category: "Milestone",
    },
    {
      title: "Anatomy Scan Ultrasound",
      date: formatDate(addDays(lmpDateObj, 140)),
      gestationalAge: "20 Weeks 0 Days",
      description: "Comprehensive fetal anatomy scan and gender identification.",
      category: "Medical",
    },
    {
      title: "Third Trimester Begins",
      date: formatDate(addDays(lmpDateObj, 196)),
      gestationalAge: "28 Weeks 0 Days",
      description: "Final growth surge and lung maturation phase.",
      category: "Trimester",
    },
    {
      title: "Estimated Due Date (Full Term)",
      date: formatDate(dueDateObj),
      gestationalAge: "40 Weeks 0 Days",
      description: "Expected birth date (37 to 42 weeks normal range).",
      category: "Milestone",
    },
  ];

  // 6-Cycle Forecast
  const forecast: FertilityForecastCycle[] = [];
  let currentCycleStart = new Date(lmpDateObj);

  for (let i = 1; i <= 6; i++) {
    const cycleOvulation = addDays(currentCycleStart, cycleLength - lutealPhaseLength);
    const cycleFertileStart = addDays(cycleOvulation, -5);
    const cycleFertileEnd = addDays(cycleOvulation, 1);
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

  // Sample BBT Data (28-day model)
  const sampleBBTData: BBTLogEntry[] = [];
  const daysInCycle = Math.min(35, cycleLength);
  const ovDayNum = cycleLength - lutealPhaseLength;

  for (let d = 1; d <= daysInCycle; d++) {
    const bbtDate = addDays(lmpDateObj, d - 1);
    let temp = 97.4 + Math.random() * 0.2;
    let phaseLabel: "Follicular" | "Ovulation" | "Luteal" = "Follicular";

    if (d === ovDayNum) {
      temp = 97.2; // Dip on ovulation day
      phaseLabel = "Ovulation";
    } else if (d > ovDayNum) {
      temp = 98.1 + Math.random() * 0.25; // Thermal shift rise
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
    `Your most likely conception date was ${formatDisplayDate(formatDate(conceptionDateObj))}.`,
    `Your peak fertile window spans from ${formatDisplayDate(formatDate(peakFertileStart))} to ${formatDisplayDate(formatDate(peakFertileEnd))}.`,
    `Sperm can survive up to 5 days in fertile cervical mucus, making the 3 days leading up to ovulation the highest probability timeframe.`,
  ];

  if (motherAge >= 35) {
    insights.push(`At age ${motherAge}, pre-conception folic acid supplementation (400–800 mcg/day) and early prenatal care are strongly recommended.`);
  }

  if (cervicalMucus === "egg-white") {
    insights.push(`Egg-white cervical mucus indicates peak estrogen and optimal sperm motility conditions.`);
  }

  const recommendations: string[] = [
    `Schedule regular intercourse every 1 to 2 days during your fertile window (${formatDisplayDate(formatDate(fertileWindowStart))} – ${formatDisplayDate(formatDate(fertileWindowEnd))}).`,
    `Track your basal body temperature (BBT) immediately upon waking before sitting up to confirm post-ovulatory thermal shift (+0.5°F to +1.0°F).`,
    `Take an early detection home pregnancy test starting around ${formatDisplayDate(formatDate(test10Dpo))} (10 DPO) or standard test on ${formatDisplayDate(formatDate(test14Dpo))}.`,
    `Maintain healthy lifestyle habits: take daily prenatal vitamins with folate, maintain moderate exercise, avoid smoking/alcohol, and manage stress.`,
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
    fertilityStatus: baseScore >= 85 ? "Peak" : baseScore >= 70 ? "High" : baseScore >= 50 ? "Moderate" : "Low",
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
