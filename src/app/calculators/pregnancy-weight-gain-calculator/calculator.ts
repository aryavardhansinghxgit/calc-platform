import {
  PregnancyWeightGainCalculatorInputs,
  PregnancyWeightGainCalculatorOutputs,
  UnitSystem,
  PregnancyType,
  WeekScheduleItem,
  WeightCompositionComponent,
  NutrientGuideline,
} from "./types";

export function calculatePregnancyWeightGainCalculator(
  rawInputs: Record<string, any>
): PregnancyWeightGainCalculatorOutputs {
  const inputs: PregnancyWeightGainCalculatorInputs = rawInputs || {};
  const unitSystem: UnitSystem = inputs.unitSystem === "metric" ? "metric" : "us";
  const pregnancyType: PregnancyType = inputs.pregnancyType === "twins" ? "twins" : "single";
  const week = Math.min(40, Math.max(1, Math.round(Number(inputs.week) || 20)));

  // Normalize Height & Pre-Pregnancy Weight
  let heightCm: number;
  let heightFeet: number;
  let heightInches: number;

  if (unitSystem === "metric") {
    heightCm = Math.max(100, Math.min(230, Number(inputs.heightCm) || 165));
    const totalInches = Math.round(heightCm / 2.54);
    heightFeet = Math.floor(totalInches / 12);
    heightInches = totalInches % 12;
  } else {
    heightFeet = Math.max(3, Math.min(7, Number(inputs.heightFeet) || 5));
    heightInches = Math.max(0, Math.min(11, Number(inputs.heightInches) || 6));
    const totalInches = heightFeet * 12 + heightInches;
    heightCm = parseFloat((totalInches * 2.54).toFixed(1));
  }

  let preWeightKg: number;
  let preWeightLbs: number;

  if (unitSystem === "metric") {
    preWeightKg = Math.max(30, Math.min(250, Number(inputs.preWeightKg) || 62));
    preWeightLbs = parseFloat((preWeightKg * 2.20462).toFixed(1));
  } else {
    preWeightLbs = Math.max(66, Math.min(550, Number(inputs.preWeightLbs) || 135));
    preWeightKg = parseFloat((preWeightLbs / 2.20462).toFixed(1));
  }

  let currentWeightKg: number;
  let currentWeightLbs: number;

  if (unitSystem === "metric") {
    currentWeightKg = Number(inputs.currentWeightKg) > 0
      ? Number(inputs.currentWeightKg)
      : parseFloat((preWeightKg + 5).toFixed(1));
    currentWeightLbs = parseFloat((currentWeightKg * 2.20462).toFixed(1));
  } else {
    currentWeightLbs = Number(inputs.currentWeightLbs) > 0
      ? Number(inputs.currentWeightLbs)
      : parseFloat((preWeightLbs + 11).toFixed(1));
    currentWeightKg = parseFloat((currentWeightLbs / 2.20462).toFixed(1));
  }

  // Calculate Pre-pregnancy BMI
  const heightM = heightCm / 100;
  const preBmi = parseFloat((preWeightKg / (heightM * heightM)).toFixed(1));

  // Determine BMI Category & IOM Guideline Targets
  let bmiCategoryKey: "underweight" | "normal" | "overweight" | "obese";
  let bmiCategory: string;

  let minGainTotalLbs: number;
  let maxGainTotalLbs: number;
  let minRateLbsPerWk: number;
  let maxRateLbsPerWk: number;
  let t1MinTotalLbs: number;
  let t1MaxTotalLbs: number;

  if (preBmi < 18.5) {
    bmiCategoryKey = "underweight";
    bmiCategory = "Underweight (BMI < 18.5)";
    if (pregnancyType === "single") {
      minGainTotalLbs = 28;
      maxGainTotalLbs = 40;
      minRateLbsPerWk = 1.0;
      maxRateLbsPerWk = 1.3;
      t1MinTotalLbs = 1.1;
      t1MaxTotalLbs = 4.4;
    } else {
      minGainTotalLbs = 50;
      maxGainTotalLbs = 62;
      minRateLbsPerWk = 1.5;
      maxRateLbsPerWk = 1.8;
      t1MinTotalLbs = 4.0;
      t1MaxTotalLbs = 7.0;
    }
  } else if (preBmi < 25.0) {
    bmiCategoryKey = "normal";
    bmiCategory = "Normal Weight (BMI 18.5 – 24.9)";
    if (pregnancyType === "single") {
      minGainTotalLbs = 25;
      maxGainTotalLbs = 35;
      minRateLbsPerWk = 0.8;
      maxRateLbsPerWk = 1.0;
      t1MinTotalLbs = 1.1;
      t1MaxTotalLbs = 4.4;
    } else {
      minGainTotalLbs = 37;
      maxGainTotalLbs = 54;
      minRateLbsPerWk = 1.2;
      maxRateLbsPerWk = 1.7;
      t1MinTotalLbs = 4.0;
      t1MaxTotalLbs = 7.0;
    }
  } else if (preBmi < 30.0) {
    bmiCategoryKey = "overweight";
    bmiCategory = "Overweight (BMI 25.0 – 29.9)";
    if (pregnancyType === "single") {
      minGainTotalLbs = 15;
      maxGainTotalLbs = 25;
      minRateLbsPerWk = 0.5;
      maxRateLbsPerWk = 0.7;
      t1MinTotalLbs = 1.1;
      t1MaxTotalLbs = 4.4;
    } else {
      minGainTotalLbs = 31;
      maxGainTotalLbs = 50;
      minRateLbsPerWk = 1.0;
      maxRateLbsPerWk = 1.5;
      t1MinTotalLbs = 3.0;
      t1MaxTotalLbs = 6.0;
    }
  } else {
    bmiCategoryKey = "obese";
    bmiCategory = "Obese (BMI ≥ 30.0)";
    if (pregnancyType === "single") {
      minGainTotalLbs = 11;
      maxGainTotalLbs = 20;
      minRateLbsPerWk = 0.4;
      maxRateLbsPerWk = 0.6;
      t1MinTotalLbs = 1.1;
      t1MaxTotalLbs = 4.4;
    } else {
      minGainTotalLbs = 25;
      maxGainTotalLbs = 42;
      minRateLbsPerWk = 0.8;
      maxRateLbsPerWk = 1.2;
      t1MinTotalLbs = 3.0;
      t1MaxTotalLbs = 5.0;
    }
  }

  const minGainTotalKg = parseFloat((minGainTotalLbs / 2.20462).toFixed(1));
  const maxGainTotalKg = parseFloat((maxGainTotalLbs / 2.20462).toFixed(1));

  // Determine current trimester
  let trimester: 1 | 2 | 3 = 1;
  if (week >= 28) trimester = 3;
  else if (week >= 14) trimester = 2;

  // Calorie surplus by trimester (ACOG recommendations)
  let extraCalorieKcal = 0;
  if (trimester === 2) extraCalorieKcal = pregnancyType === "single" ? 340 : 600;
  else if (trimester === 3) extraCalorieKcal = pregnancyType === "single" ? 450 : 700;

  // Helper function to get min/max gain targets for any week (1 to 40)
  const getWeekTargetGainLbs = (wk: number): { minGain: number; maxGain: number } => {
    if (wk <= 13) {
      const fraction = wk / 13;
      return {
        minGain: parseFloat((t1MinTotalLbs * fraction).toFixed(1)),
        maxGain: parseFloat((t1MaxTotalLbs * fraction).toFixed(1)),
      };
    } else {
      const extraWeeks = wk - 13;
      const minG = t1MinTotalLbs + extraWeeks * minRateLbsPerWk;
      const maxG = t1MaxTotalLbs + extraWeeks * maxRateLbsPerWk;
      return {
        minGain: parseFloat(Math.min(minGainTotalLbs, minG).toFixed(1)),
        maxGain: parseFloat(Math.min(maxGainTotalLbs, maxG).toFixed(1)),
      };
    }
  };

  // Target gain for the user's selected week
  const currentWeekTargetsLbs = getWeekTargetGainLbs(week);
  const minGainWeekLbs = currentWeekTargetsLbs.minGain;
  const maxGainWeekLbs = currentWeekTargetsLbs.maxGain;
  const minGainWeekKg = parseFloat((minGainWeekLbs / 2.20462).toFixed(1));
  const maxGainWeekKg = parseFloat((maxGainWeekLbs / 2.20462).toFixed(1));

  const minWeightTargetLbs = parseFloat((preWeightLbs + minGainWeekLbs).toFixed(1));
  const maxWeightTargetLbs = parseFloat((preWeightLbs + maxGainWeekLbs).toFixed(1));
  const minWeightTargetKg = parseFloat((preWeightKg + minGainWeekKg).toFixed(1));
  const maxWeightTargetKg = parseFloat((preWeightKg + maxGainWeekKg).toFixed(1));

  const actualGainLbs = parseFloat((currentWeightLbs - preWeightLbs).toFixed(1));
  const actualGainKg = parseFloat((currentWeightKg - preWeightKg).toFixed(1));

  // Determine clinical status
  let statusKey: "under" | "on-track" | "over";
  let statusLabel: string;
  let statusSummary: string;
  let statusAdvice: string;

  if (actualGainLbs < minGainWeekLbs - 1.0) {
    statusKey = "under";
    statusLabel = "Below Recommended Weight Gain";
    statusSummary = `At Week ${week}, your weight gain of ${
      unitSystem === "metric" ? `${actualGainKg} kg` : `${actualGainLbs} lbs`
    } is below the IOM target range of ${
      unitSystem === "metric"
        ? `${minGainWeekKg}–${maxGainWeekKg} kg`
        : `${minGainWeekLbs}–${maxGainWeekLbs} lbs`
    }.`;
    statusAdvice =
      "Ensure you are consuming adequate nutrient-dense calories (healthy fats, complex carbohydrates, proteins). Discuss your weight trajectory with your obstetrician or midwife to rule out underlying issues like hyperemesis or nutritional deficiency.";
  } else if (actualGainLbs > maxGainWeekLbs + 1.0) {
    statusKey = "over";
    statusLabel = "Above Recommended Weight Gain";
    statusSummary = `At Week ${week}, your weight gain of ${
      unitSystem === "metric" ? `${actualGainKg} kg` : `${actualGainLbs} lbs`
    } exceeds the IOM target range of ${
      unitSystem === "metric"
        ? `${minGainWeekKg}–${maxGainWeekKg} kg`
        : `${minGainWeekLbs}–${maxGainWeekLbs} lbs`
    }.`;
    statusAdvice =
      "Focus on balanced whole-food nutrition and avoid empty sugary snacks or beverages. Consult your OB/GYN to monitor blood pressure and screen for gestational diabetes if recommended. Do not attempt crash dieting while pregnant.";
  } else {
    statusKey = "on-track";
    statusLabel = "On Track — Optimal Weight Gain";
    statusSummary = `At Week ${week}, your weight gain of ${
      unitSystem === "metric" ? `${actualGainKg} kg` : `${actualGainLbs} lbs`
    } is within the recommended IOM target range of ${
      unitSystem === "metric"
        ? `${minGainWeekKg}–${maxGainWeekKg} kg`
        : `${minGainWeekLbs}–${maxGainWeekLbs} lbs`
    }.`;
    statusAdvice =
      "Excellent job! Continue following a balanced diet rich in folate, iron, protein, calcium, and essential fatty acids, while staying physically active as advised by your healthcare provider.";
  }

  // Formatting strings
  const recommendedGainTotal = unitSystem === "metric"
    ? `${minGainTotalKg} kg – ${maxGainTotalKg} kg`
    : `${minGainTotalLbs} lbs – ${maxGainTotalLbs} lbs`;

  const recommendedGainTotalFormatted = unitSystem === "metric"
    ? `${minGainTotalKg} – ${maxGainTotalKg} kg (${minGainTotalLbs} – ${maxGainTotalLbs} lbs)`
    : `${minGainTotalLbs} – ${maxGainTotalLbs} lbs (${minGainTotalKg} – ${maxGainTotalKg} kg)`;

  const targetGainWeek = unitSystem === "metric"
    ? `${minGainWeekKg} kg – ${maxGainWeekKg} kg`
    : `${minGainWeekLbs} lbs – ${maxGainWeekLbs} lbs`;

  const targetGainWeekFormatted = unitSystem === "metric"
    ? `${minGainWeekKg} – ${maxGainWeekKg} kg`
    : `${minGainWeekLbs} – ${maxGainWeekLbs} lbs`;

  const minRateKgPerWk = parseFloat((minRateLbsPerWk / 2.20462).toFixed(2));
  const maxRateKgPerWk = parseFloat((maxRateLbsPerWk / 2.20462).toFixed(2));

  const weeklyRateFormatted = unitSystem === "metric"
    ? `${minRateKgPerWk} – ${maxRateKgPerWk} kg/week`
    : `${minRateLbsPerWk} – ${maxRateLbsPerWk} lbs/week`;

  // Fetal milestones dictionary for weeks 1-40
  const fetalMilestones: Record<number, string> = {
    1: "Conception phase & endometrial preparation.",
    2: "Ovulation & fertilization of ovum.",
    3: "Blastocyst implantation into uterine lining.",
    4: "Neural tube formation & primitive heartbeat begins.",
    5: "Brain hemispheres & limb buds developing.",
    6: "Heart beating at ~110 bpm; facial features form.",
    7: "Limb buds lengthen into arm & leg segments.",
    8: "Finger & toe webs separate; eyelids form.",
    9: "Essential organ systems established; baby moves.",
    10: "Vital organs functioning; classified as fetus.",
    11: "Fetus produces urine; reflex responses present.",
    12: "Fingernails appear; sex organs differentiating.",
    13: "Vocal cords form; finger prints established.",
    14: "Thyroid gland active; fetus sucks thumb.",
    15: "Taste buds develop; skeleton ossifying.",
    16: "Eyes become sensitive to light; hair patterns form.",
    17: "Fat tissue accumulates; umbilical cord strengthens.",
    18: "Hearing develops; fetus hears maternal heartbeat.",
    19: "Vernix caseosa coats skin for fluid protection.",
    20: "Halfway mark! Fetal movement (quickening) felt.",
    21: "Bone marrow begins producing blood cells.",
    22: "Sensory nerves develop; sense of touch active.",
    23: "Rapid eye movement (REM) sleep begins.",
    24: "Lungs produce surfactant precursor; footprints form.",
    25: "Capillaries form in skin; baby responds to voice.",
    26: "Eyelids open; brain wave activity increases.",
    27: "Lungs mature; regular sleep-wake cycles.",
    28: "Third trimester! Eyes open wide; central nervous system matures.",
    29: "Kicking & stretching grow stronger.",
    30: "Red blood cell production shifts entirely to bone marrow.",
    31: "Brain connections process sensory information.",
    32: "Lanuogo hair sheds; fingernails reach fingertips.",
    33: "Pupils constrict & dilate in response to light.",
    34: "Immune system matures via maternal antibody transfer.",
    35: "Kidneys fully developed; rapid subcutaneous fat gain.",
    36: "Lungs fully prepared for breathing ambient air.",
    37: "Early term! Baby is physically ready for birth.",
    38: "Firm grasp reflex; organ systems mature.",
    39: "Full term! Brain & lung growth complete.",
    40: "Estimated Due Date! Baby is ready to meet the world.",
  };

  // Generate 40-Week Schedule
  const schedule: WeekScheduleItem[] = [];
  for (let wk = 1; wk <= 40; wk++) {
    let wkTrimester: 1 | 2 | 3 = 1;
    if (wk >= 28) wkTrimester = 3;
    else if (wk >= 14) wkTrimester = 2;

    let wkExtraCal = 0;
    if (wkTrimester === 2) wkExtraCal = pregnancyType === "single" ? 340 : 600;
    else if (wkTrimester === 3) wkExtraCal = pregnancyType === "single" ? 450 : 700;

    const targets = getWeekTargetGainLbs(wk);
    const minGKg = parseFloat((targets.minGain / 2.20462).toFixed(1));
    const maxGKg = parseFloat((targets.maxGain / 2.20462).toFixed(1));

    const minWlbs = parseFloat((preWeightLbs + targets.minGain).toFixed(1));
    const maxWlbs = parseFloat((preWeightLbs + targets.maxGain).toFixed(1));
    const minWkg = parseFloat((preWeightKg + minGKg).toFixed(1));
    const maxWkg = parseFloat((preWeightKg + maxGKg).toFixed(1));

    schedule.push({
      week: wk,
      trimester: wkTrimester,
      minGainLbs: targets.minGain,
      maxGainLbs: targets.maxGain,
      minGainKg: minGKg,
      maxGainKg: maxGKg,
      minWeightLbs: minWlbs,
      maxWeightLbs: maxWlbs,
      minWeightKg: minWkg,
      maxWeightKg: maxWkg,
      extraCalorieKcal: wkExtraCal,
      fetalMilestone: fetalMilestones[wk] || "Fetal growth & organ maturation.",
    });
  }

  // Generate Physiological Weight Composition Breakdown for current week
  // Total current gain or week target mid-gain
  const currentTotalGainLbs = Math.max(0.5, actualGainLbs > 0 ? actualGainLbs : (minGainWeekLbs + maxGainWeekLbs) / 2);
  const currentTotalGainKg = parseFloat((currentTotalGainLbs / 2.20462).toFixed(1));

  // Physiological proportions based on gestational progress
  const babyProp = 0.25;
  const placentaProp = 0.05;
  const amnioticProp = 0.07;
  const uterusProp = 0.07;
  const bloodProp = 0.14;
  const fluidProp = 0.10;
  const breastProp = 0.07;
  const fatProp = 0.25;

  const breakdown: WeightCompositionComponent[] = [
    {
      name: "Baby (Fetus)",
      weightLbs: parseFloat((currentTotalGainLbs * babyProp).toFixed(1)),
      weightKg: parseFloat((currentTotalGainKg * babyProp).toFixed(1)),
      percentage: 25,
      color: "#ec4899", // pink-500
      description: "Developing fetal tissues, skeleton, organs, and body mass.",
    },
    {
      name: "Placenta",
      weightLbs: parseFloat((currentTotalGainLbs * placentaProp).toFixed(1)),
      weightKg: parseFloat((currentTotalGainKg * placentaProp).toFixed(1)),
      percentage: 5,
      color: "#a855f7", // purple-500
      description: "Vascular organ delivering oxygen & nutrients to the baby.",
    },
    {
      name: "Amniotic Fluid",
      weightLbs: parseFloat((currentTotalGainLbs * amnioticProp).toFixed(1)),
      weightKg: parseFloat((currentTotalGainKg * amnioticProp).toFixed(1)),
      percentage: 7,
      color: "#06b6d4", // cyan-500
      description: "Protective fluid surrounding and cushioning the fetus.",
    },
    {
      name: "Uterine Hypertrophy",
      weightLbs: parseFloat((currentTotalGainLbs * uterusProp).toFixed(1)),
      weightKg: parseFloat((currentTotalGainKg * uterusProp).toFixed(1)),
      percentage: 7,
      color: "#3b82f6", // blue-500
      description: "Expanded uterine smooth muscle tissue accommodating fetus.",
    },
    {
      name: "Maternal Blood Volume",
      weightLbs: parseFloat((currentTotalGainLbs * bloodProp).toFixed(1)),
      weightKg: parseFloat((currentTotalGainKg * bloodProp).toFixed(1)),
      percentage: 14,
      color: "#ef4444", // red-500
      description: "50% expansion in circulating maternal blood plasma.",
    },
    {
      name: "Extracellular Fluid",
      weightLbs: parseFloat((currentTotalGainLbs * fluidProp).toFixed(1)),
      weightKg: parseFloat((currentTotalGainKg * fluidProp).toFixed(1)),
      percentage: 10,
      color: "#10b981", // emerald-500
      description: "Increased tissue fluids and cellular hydration reserve.",
    },
    {
      name: "Breast Tissue",
      weightLbs: parseFloat((currentTotalGainLbs * breastProp).toFixed(1)),
      weightKg: parseFloat((currentTotalGainKg * breastProp).toFixed(1)),
      percentage: 7,
      color: "#f59e0b", // amber-500
      description: "Mammary gland growth preparing for lactation & nursing.",
    },
    {
      name: "Maternal Fat & Energy Stores",
      weightLbs: parseFloat((currentTotalGainLbs * fatProp).toFixed(1)),
      weightKg: parseFloat((currentTotalGainKg * fatProp).toFixed(1)),
      percentage: 25,
      color: "#6366f1", // indigo-500
      description: "Essential maternal energy reserves for delivery & lactation.",
    },
  ];

  // Essential Nutrient Guidelines
  const nutrientGuidelines: NutrientGuideline[] = [
    {
      nutrient: "Folic Acid (Vitamin B9)",
      target: "600 mcg / day",
      importance: "Prevents neural tube defects (spina bifida, anencephaly). Critical in early T1.",
      topSources: "Spinach, lentils, fortified cereals, asparagus, citrus fruits.",
    },
    {
      nutrient: "Elemental Iron",
      target: "27 mg / day",
      importance: "Supports 50% expansion in red blood cells & prevents maternal anemia.",
      topSources: "Lean red meat, poultry, beans, spinach, fortified cereals.",
    },
    {
      nutrient: "Dietary Calcium",
      target: "1,000 mg / day",
      importance: "Builds fetal bones & teeth while protecting maternal bone density.",
      topSources: "Pasteurized milk, yogurt, hard cheeses, kale, fortified plant milk.",
    },
    {
      nutrient: "Vitamin D3",
      target: "600 IU (15 mcg) / day",
      importance: "Works with calcium to promote skeletal development & immune function.",
      topSources: "Fortified milk, salmon, egg yolks, safe sun exposure.",
    },
    {
      nutrient: "DHA / Omega-3 Fatty Acids",
      target: "200–300 mg / day",
      importance: "Essential for fetal brain development, vision, and cognitive growth.",
      topSources: "Low-mercury fish (salmon, sardines), algae supplements, walnuts.",
    },
    {
      nutrient: "Dietary Protein",
      target: "71 g / day (+25g surplus)",
      importance: "Building blocks for fetal organs, uterine tissue, and placental growth.",
      topSources: "Eggs, chicken breast, Greek yogurt, tofu, lentils, lean beef.",
    },
  ];

  return {
    unitSystem,
    pregnancyType,
    currentWeek: week,
    trimester,
    heightCm,
    heightFeet,
    heightInches,
    preWeightKg,
    preWeightLbs,
    currentWeightKg,
    currentWeightLbs,
    preBmi,
    bmiCategory,
    bmiCategoryKey,
    actualGainKg,
    actualGainLbs,
    minGainTotalKg,
    maxGainTotalKg,
    minGainTotalLbs,
    maxGainTotalLbs,
    recommendedGainTotal,
    recommendedGainTotalFormatted,
    minGainWeekKg,
    maxGainWeekKg,
    minGainWeekLbs,
    maxGainWeekLbs,
    targetGainWeek,
    targetGainWeekFormatted,
    minWeightTargetKg,
    maxWeightTargetKg,
    minWeightTargetLbs,
    maxWeightTargetLbs,
    statusKey,
    statusLabel,
    statusSummary,
    statusAdvice,
    weeklyRateFormatted,
    extraCalorieKcal,
    breakdown,
    schedule,
    nutrientGuidelines,
  };
}

export default calculatePregnancyWeightGainCalculator;
