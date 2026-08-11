import {
  DueDateCalculatorInputs,
  DueDateCalculatorOutputs,
  DueDateCalculationMode,
  BirthProbabilityPoint,
  FetalGrowthPoint,
  MilestoneItem,
} from "./types";

export function calculateDueDateCalculator(
  rawInputs: Record<string, any>
): DueDateCalculatorOutputs {
  const inputs: DueDateCalculatorInputs = rawInputs || {};
  const mode: DueDateCalculationMode = inputs.calculationMode || "lmp";

  const cycleLength = Math.max(20, Math.min(45, Number(inputs.cycleLength) || 28));
  const lutealPhaseLength = Math.max(9, Math.min(18, Number(inputs.lutealPhaseLength) || 14));
  const motherAge = Math.max(18, Math.min(50, Number(inputs.motherAge) || 28));
  const rawFirstVal = inputs.isFirstPregnancy as any;
  const isFirstPregnancy = rawFirstVal === true || rawFirstVal === "true" || rawFirstVal === 1 || rawFirstVal === "1";

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

  let estimatedDueDate: Date;
  let estimatedLmpDate: Date;
  let estimatedConceptionDate: Date;
  let confidenceRangeLabel = "± 3 to 5 Days";

  // Mode calculations
  if (mode === "lmp") {
    estimatedLmpDate = parseInputDate(inputs.lmpDate, -140); // default ~20 weeks ago
    const cycleAdjustment = cycleLength - 28;
    // EDD = LMP + 280 days + cycleAdjustment
    estimatedDueDate = addDays(estimatedLmpDate, 280 + cycleAdjustment);
    const daysToOvulation = cycleLength - lutealPhaseLength;
    estimatedConceptionDate = addDays(estimatedLmpDate, daysToOvulation);
    confidenceRangeLabel = "± 3 to 5 Days (Naegele's Rule)";
  } else if (mode === "ultrasound") {
    const scanDate = parseInputDate(inputs.ultrasoundDate, -30);
    const scanWeeks = Math.max(4, Math.min(40, Number(inputs.ultrasoundWeeks) || 10));
    const scanDays = Math.max(0, Math.min(6, Number(inputs.ultrasoundDays) || 0));
    const gestationalDaysAtScan = scanWeeks * 7 + scanDays;

    // Derived LMP = Scan Date - Gestational Days
    estimatedLmpDate = addDays(scanDate, -gestationalDaysAtScan);
    estimatedDueDate = addDays(estimatedLmpDate, 280);
    estimatedConceptionDate = addDays(estimatedLmpDate, 14);
    confidenceRangeLabel = scanWeeks <= 12 ? "± 3 to 5 Days (Gold Standard 1st Trimester CRL Scan)" : "± 7 to 10 Days (Mid-Pregnancy Scan)";
  } else if (mode === "conception-date") {
    estimatedConceptionDate = parseInputDate(inputs.conceptionDate, -126);
    estimatedDueDate = addDays(estimatedConceptionDate, 266);
    const daysToOvulation = cycleLength - lutealPhaseLength;
    estimatedLmpDate = addDays(estimatedConceptionDate, -daysToOvulation);
    confidenceRangeLabel = "± 1 to 2 Days (Known Conception Date)";
  } else if (mode === "ivf") {
    const transferDate = parseInputDate(inputs.ivfTransferDate, -100);
    const embryoType = inputs.ivfEmbryoType || "day5";

    if (embryoType === "day5") {
      estimatedDueDate = addDays(transferDate, 261);
      estimatedConceptionDate = addDays(transferDate, -5);
    } else if (embryoType === "day3") {
      estimatedDueDate = addDays(transferDate, 263);
      estimatedConceptionDate = addDays(transferDate, -3);
    } else {
      // fresh retrieval
      estimatedDueDate = addDays(transferDate, 266);
      estimatedConceptionDate = transferDate;
    }
    estimatedLmpDate = addDays(estimatedConceptionDate, -14);
    confidenceRangeLabel = "Exact Clinical Precision (± 0 Days IVF Transfer)";
  } else if (mode === "reverse") {
    estimatedDueDate = parseInputDate(inputs.targetDueDate, 140);
    estimatedConceptionDate = addDays(estimatedDueDate, -266);
    const daysToOvulation = cycleLength - lutealPhaseLength;
    estimatedLmpDate = addDays(estimatedConceptionDate, -daysToOvulation);
    confidenceRangeLabel = "Reverse Target Date Mode";
  } else {
    estimatedLmpDate = parseInputDate(inputs.lmpDate, -140);
    estimatedDueDate = addDays(estimatedLmpDate, 280);
    estimatedConceptionDate = addDays(estimatedLmpDate, 14);
  }

  // Statistical Primipara vs Multipara Adjustment (Mittendorf-Williams rule)
  let adjustedMittendorfDueDate = estimatedDueDate;
  if (isFirstPregnancy) {
    adjustedMittendorfDueDate = addDays(estimatedDueDate, 3); // Average first pregnancy ~40w 3d
  } else {
    adjustedMittendorfDueDate = addDays(estimatedDueDate, -1); // Average subsequent ~39w 6d
  }

  // Term Windows
  const earlyTermStart = addDays(estimatedLmpDate, 259); // 37 weeks
  const fullTermStart = addDays(estimatedLmpDate, 273); // 39 weeks
  const lateTermStart = addDays(estimatedLmpDate, 287); // 41 weeks
  const postTermStart = addDays(estimatedLmpDate, 294); // 42 weeks

  // Today & Progress
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalGestationalDays = Math.max(0, Math.floor((today.getTime() - estimatedLmpDate.getTime()) / (1000 * 60 * 60 * 24)));
  const currentGestationalWeeks = Math.floor(totalGestationalDays / 7);
  const currentGestationalDays = totalGestationalDays % 7;

  const daysRemaining = Math.max(0, Math.ceil((estimatedDueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));
  const weeksRemaining = Math.max(0, parseFloat((daysRemaining / 7).toFixed(1)));
  const progressPercent = Math.min(100, Math.max(0, parseFloat(((totalGestationalDays / 280) * 100).toFixed(1))));

  let currentTrimester: 1 | 2 | 3 = 1;
  if (currentGestationalWeeks >= 28) currentTrimester = 3;
  else if (currentGestationalWeeks >= 14) currentTrimester = 2;

  // Fetal fruit size & physical specs dictionary for weeks 4 to 40
  const fetalSizeMap: Record<number, { fruit: string; lengthCm: number; weightGrams: number }> = {
    4: { fruit: "Poppy Seed", lengthCm: 0.1, weightGrams: 0.1 },
    5: { fruit: "Sesame Seed", lengthCm: 0.2, weightGrams: 0.2 },
    6: { fruit: "Sweet Pea", lengthCm: 0.6, weightGrams: 0.5 },
    7: { fruit: "Blueberry", lengthCm: 1.3, weightGrams: 1.0 },
    8: { fruit: "Raspberry", lengthCm: 1.6, weightGrams: 1.5 },
    9: { fruit: "Green Olive", lengthCm: 2.3, weightGrams: 2.0 },
    10: { fruit: "Prune / Fig", lengthCm: 3.1, weightGrams: 4.0 },
    11: { fruit: "Lime", lengthCm: 4.1, weightGrams: 7.0 },
    12: { fruit: "Plum", lengthCm: 5.4, weightGrams: 14.0 },
    13: { fruit: "Peach", lengthCm: 7.4, weightGrams: 23.0 },
    14: { fruit: "Lemon", lengthCm: 8.7, weightGrams: 43.0 },
    15: { fruit: "Apple", lengthCm: 10.1, weightGrams: 70.0 },
    16: { fruit: "Avocado", lengthCm: 11.6, weightGrams: 100.0 },
    17: { fruit: "Turnip", lengthCm: 13.0, weightGrams: 140.0 },
    18: { fruit: "Bell Pepper", lengthCm: 14.2, weightGrams: 190.0 },
    19: { fruit: "Heirloom Tomato", lengthCm: 15.3, weightGrams: 240.0 },
    20: { fruit: "Banana", lengthCm: 25.6, weightGrams: 300.0 },
    21: { fruit: "Carrot", lengthCm: 26.7, weightGrams: 360.0 },
    22: { fruit: "Spaghetti Squash", lengthCm: 27.8, weightGrams: 430.0 },
    23: { fruit: "Large Mango", lengthCm: 28.9, weightGrams: 500.0 },
    24: { fruit: "Ear of Corn", lengthCm: 30.0, weightGrams: 600.0 },
    25: { fruit: "Rutabaga", lengthCm: 34.6, weightGrams: 660.0 },
    26: { fruit: "Scallion / Zucchini", lengthCm: 35.6, weightGrams: 760.0 },
    27: { fruit: "Cauliflower", lengthCm: 36.6, weightGrams: 875.0 },
    28: { fruit: "Eggplant", lengthCm: 37.6, weightGrams: 1000.0 },
    29: { fruit: "Butternut Squash", lengthCm: 38.6, weightGrams: 1150.0 },
    30: { fruit: "Cabbage", lengthCm: 39.9, weightGrams: 1300.0 },
    31: { fruit: "Coconut", lengthCm: 41.1, weightGrams: 1500.0 },
    32: { fruit: "Jicama", lengthCm: 42.4, weightGrams: 1700.0 },
    33: { fruit: "Pineapple", lengthCm: 43.7, weightGrams: 1900.0 },
    34: { fruit: "Cantaloupe", lengthCm: 45.0, weightGrams: 2100.0 },
    35: { fruit: "Honeydew Melon", lengthCm: 46.2, weightGrams: 2400.0 },
    36: { fruit: "Romaine Lettuce", lengthCm: 47.4, weightGrams: 2600.0 },
    37: { fruit: "Swiss Chard", lengthCm: 48.6, weightGrams: 2900.0 },
    38: { fruit: "Leek / Winter Melon", lengthCm: 49.8, weightGrams: 3100.0 },
    39: { fruit: "Mini Watermelon", lengthCm: 50.7, weightGrams: 3300.0 },
    40: { fruit: "Full-size Watermelon", lengthCm: 51.2, weightGrams: 3450.0 },
  };

  const clampedWk = Math.max(4, Math.min(40, currentGestationalWeeks || 20));
  const currentFetalInfo = fetalSizeMap[clampedWk] || fetalSizeMap[20];
  const fetalSizeFruit = currentFetalInfo.fruit;
  const fetalLengthCm = currentFetalInfo.lengthCm;
  const fetalWeightGrams = currentFetalInfo.weightGrams;

  // Implantation window
  const implantationWindowStart = addDays(estimatedConceptionDate, 6);
  const implantationWindowEnd = addDays(estimatedConceptionDate, 12);

  // Early HCG urine test date
  const earliestHcgUrineDate = addDays(estimatedConceptionDate, 12);
  const fetalHeartbeatDate = addDays(estimatedConceptionDate, 28);

  // Birth Probability Distribution (ACOG / CDC birth timing data)
  const birthProbabilityDistribution: BirthProbabilityPoint[] = [
    {
      week: 36,
      weekLabel: "Week 36 (Preterm)",
      probabilityPercent: 6,
      termCategory: "Preterm",
      description: "Late preterm delivery. High NICU survival rate (>99%).",
    },
    {
      week: 37,
      weekLabel: "Week 37 (Early Term)",
      probabilityPercent: 11,
      termCategory: "Early Term",
      description: "Early term delivery. Organ systems physically ready.",
    },
    {
      week: 38,
      weekLabel: "Week 38 (Early Term)",
      probabilityPercent: 15,
      termCategory: "Early Term",
      description: "Early term delivery. Lungs & brain maturing rapidly.",
    },
    {
      week: 39,
      weekLabel: "Week 39 (Full Term)",
      probabilityPercent: 27,
      termCategory: "Full Term",
      description: "Optimal Full Term delivery. Peak statistical window.",
    },
    {
      week: 40,
      weekLabel: "Week 40 (Due Date)",
      probabilityPercent: 30,
      termCategory: "Full Term",
      description: "Estimated Due Date! ~4% of babies deliver on exact EDD.",
    },
    {
      week: 41,
      weekLabel: "Week 41 (Late Term)",
      probabilityPercent: 9,
      termCategory: "Late Term",
      description: "Late term delivery. Close fetal monitoring required.",
    },
    {
      week: 42,
      weekLabel: "Week 42+ (Postterm)",
      probabilityPercent: 2,
      termCategory: "Postterm",
      description: "Postterm delivery. Induction usually recommended.",
    },
  ];

  // Milestone Timeline Items
  const timelineMilestones: MilestoneItem[] = [
    {
      key: "conception",
      title: "Estimated Conception & Fertilization",
      dateStr: formatDate(estimatedConceptionDate),
      gestationalAge: "2 Weeks 0 Days",
      category: "conception",
      description: "Fertilization in Fallopian tube forming a single-cell zygote.",
    },
    {
      key: "implantation",
      title: "Embryo Implantation Window",
      dateStr: `${formatDate(implantationWindowStart)} – ${formatDate(implantationWindowEnd)}`,
      gestationalAge: "3 Weeks 1 Day – 3 Weeks 5 Days",
      category: "implantation",
      description: "Blastocyst implants into uterine lining; hCG production begins.",
    },
    {
      key: "urine-test",
      title: "Home Pregnancy Urine Test (Missed Period)",
      dateStr: formatDate(earliestHcgUrineDate),
      gestationalAge: "3 Weeks 5 Days",
      category: "testing",
      description: "Over-the-counter urine tests detect hCG with >99% clinical accuracy.",
    },
    {
      key: "heartbeat",
      title: "Fetal Heartbeat Printable Milestone",
      dateStr: formatDate(fetalHeartbeatDate),
      gestationalAge: "6 Weeks 0 Days",
      category: "clinical",
      description: "Transvaginal ultrasound detects cardiac flicker (~110–120 bpm).",
    },
    {
      key: "nipt",
      title: "Non-Invasive Prenatal Testing (NIPT)",
      dateStr: formatDate(addDays(estimatedLmpDate, 70)),
      gestationalAge: "10 Weeks 0 Days",
      category: "testing",
      description: "Cell-free fetal DNA blood test screens for chromosomal conditions & fetal sex.",
    },
    {
      key: "anomaly-scan",
      title: "Mid-Pregnancy Anomaly Scan (20-Week Scan)",
      dateStr: formatDate(addDays(estimatedLmpDate, 140)),
      gestationalAge: "20 Weeks 0 Days",
      category: "clinical",
      description: "Comprehensive 2D/3D anatomical ultrasound evaluating fetal organs & growth.",
    },
    {
      key: "viability",
      title: "Fetal Viability Threshold",
      dateStr: formatDate(addDays(estimatedLmpDate, 168)),
      gestationalAge: "24 Weeks 0 Days",
      category: "clinical",
      description: "Clinical viability milestone with modern neonatal intensive care (NICU).",
    },
    {
      key: "full-term",
      title: "Full Term Milestone (39 Weeks)",
      dateStr: formatDate(fullTermStart),
      gestationalAge: "39 Weeks 0 Days",
      category: "delivery",
      description: "Optimal full-term delivery threshold recommended by ACOG.",
    },
    {
      key: "due-date",
      title: "Estimated Due Date (EDD)",
      dateStr: formatDate(estimatedDueDate),
      gestationalAge: "40 Weeks 0 Days",
      category: "delivery",
      description: "Target delivery date based on 40 weeks total gestational age.",
    },
  ];

  // Fetal Growth Curve (Weeks 8 to 40)
  const fetalGrowthCurve: FetalGrowthPoint[] = [];
  for (let wk = 8; wk <= 40; wk += 4) {
    const info = fetalSizeMap[wk] || fetalSizeMap[40];
    fetalGrowthCurve.push({
      week: wk,
      weekLabel: `Week ${wk}`,
      lengthCm: info.lengthCm,
      weightGrams: info.weightGrams,
      fruitAnalogy: info.fruit,
    });
  }

  // Dynamic Personalized Insights
  const personalizedInsights = [
    {
      title: "Estimated Delivery Window",
      text: `Your estimated due date is ${formatDate(estimatedDueDate)}. Full-term delivery is expected between ${formatDate(fullTermStart)} and ${formatDate(lateTermStart)}.`,
      advice: `Remember that only ~4% of women deliver on their exact due date. Most deliveries occur between 39 Weeks 0 Days and 40 Weeks 6 Days.`,
    },
    {
      title: isFirstPregnancy ? "First Pregnancy Statistical Adjustment" : "Subsequent Pregnancy Timing",
      text: isFirstPregnancy
        ? `Statistical research (Mittendorf-Williams Rule) shows first-time mothers (primiparas) carry for an average of 40 Weeks 3 Days (${formatDate(adjustedMittendorfDueDate)}).`
        : `Statistical research shows women with previous births (multiparas) deliver slightly earlier, averaging 39 Weeks 6 Days (${formatDate(adjustedMittendorfDueDate)}).`,
      advice: "Prepare your hospital bag and birth plan by Week 36 to ensure peace of mind.",
    },
    {
      title: "Ultrasound Confirmation Gold Standard",
      text: `Calculated from ${mode.toUpperCase()} input with an estimated confidence margin of ${confidenceRangeLabel}.`,
      advice: "A first-trimester ultrasound measuring Crown-Rump Length (CRL) between Weeks 7 and 12 provides the most accurate clinical confirmation of gestational age.",
    },
  ];

  return {
    calculationMode: mode,
    estimatedDueDate: formatIso(estimatedDueDate),
    estimatedDueDateFormatted: formatDate(estimatedDueDate),
    adjustedMittendorfDueDateFormatted: formatDate(adjustedMittendorfDueDate),
    earlyTermStartFormatted: formatDate(earlyTermStart),
    fullTermStartFormatted: formatDate(fullTermStart),
    lateTermStartFormatted: formatDate(lateTermStart),
    postTermStartFormatted: formatDate(postTermStart),
    currentGestationalWeeks,
    currentGestationalDays,
    currentTrimester,
    daysRemaining,
    weeksRemaining,
    progressPercent,
    estimatedConceptionDateFormatted: formatDate(estimatedConceptionDate),
    estimatedLmpDateFormatted: formatDate(estimatedLmpDate),
    implantationWindowFormatted: `${formatDate(implantationWindowStart)} – ${formatDate(implantationWindowEnd)}`,
    earliestHcgUrineTestDateFormatted: formatDate(earliestHcgUrineDate),
    fetalHeartbeatDateFormatted: formatDate(fetalHeartbeatDate),
    fetalSizeFruit,
    fetalLengthCm,
    fetalWeightGrams,
    confidenceRangeLabel,
    motherAge,
    cycleLength,
    isFirstPregnancy,
    birthProbabilityDistribution,
    timelineMilestones,
    fetalGrowthCurve,
    personalizedInsights,
  };
}

export default calculateDueDateCalculator;
