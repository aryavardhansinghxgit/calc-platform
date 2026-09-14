export type UnitSystem = "imperial" | "metric";
export type ExerciseType = "bench" | "squat" | "deadlift" | "press" | "custom";

export interface OneRepMaxInput {
  unitSystem: UnitSystem;
  exercise: ExerciseType;
  weightLifted: number;
  reps: number;
}

export interface FormulaResult {
  formulaName: string;
  oneRepMax: number;
  description: string;
}

export interface RepMaxBreakdownItem {
  reps: number;
  percentage: number;
  weight: number;
  intensityZone: string;
  recommendedUse: string;
}

export interface OneRepMaxResult {
  isValid: boolean;
  errorMessage?: string;
  exerciseName: string;
  weightLifted: number;
  repsPerformed: number;
  consensusOneRepMax: number;
  unitSystem: UnitSystem;
  unitLabel: string;
  formulaResults: FormulaResult[];
  repBreakdown: RepMaxBreakdownItem[];
  trainingZones: Array<{
    zoneName: string;
    percentageRange: string;
    weightRange: string;
    repRange: string;
    focus: string;
  }>;
}

const REP_PCT_MAP = [
  { reps: 1, pct: 1.0, zone: "Maximal Strength", use: "1RM Competition Peak" },
  { reps: 2, pct: 0.95, zone: "Maximal Strength", use: "Heavy Strength / Triples Prep" },
  { reps: 3, pct: 0.93, zone: "Maximal Strength", use: "Heavy Strength Triples" },
  { reps: 4, pct: 0.90, zone: "Strength & Power", use: "Strength Building 4s" },
  { reps: 5, pct: 0.87, zone: "Strength & Power", use: "Classic 5x5 Strength Base" },
  { reps: 6, pct: 0.85, zone: "Hypertrophy", use: "Heavy Hypertrophy" },
  { reps: 7, pct: 0.83, zone: "Hypertrophy", use: "Muscle Mass Building" },
  { reps: 8, pct: 0.80, zone: "Hypertrophy", use: "Classic 8-Rep Hypertrophy" },
  { reps: 9, pct: 0.77, zone: "Hypertrophy", use: "Moderate Hypertrophy" },
  { reps: 10, pct: 0.75, zone: "Hypertrophy / Endurance", use: "10-Rep Hypertrophy / Volume" },
  { reps: 11, pct: 0.73, zone: "Endurance", use: "High-Volume Metabolic Stress" },
  { reps: 12, pct: 0.70, zone: "Endurance", use: "Muscular Endurance & Pump" },
];

export function calculateOneRepMax(input: OneRepMaxInput): OneRepMaxResult {
  const unitSystem = input.unitSystem || "imperial";
  const unitLabel = unitSystem === "imperial" ? "lbs" : "kg";

  let exerciseName = "Custom Movement";
  if (input.exercise === "bench") exerciseName = "Bench Press";
  else if (input.exercise === "squat") exerciseName = "Barbell Squat";
  else if (input.exercise === "deadlift") exerciseName = "Deadlift";
  else if (input.exercise === "press") exerciseName = "Overhead Press";

  const rawW = Number(input.weightLifted);
  const rawR = Number(input.reps);

  // 1. Strict validation: Guard against NaN, Infinity, negative, zero, or out-of-range
  if (!Number.isFinite(rawW) || rawW <= 0) {
    return {
      isValid: false,
      errorMessage: "Please enter a valid weight lifted greater than 0.",
      exerciseName,
      weightLifted: 0,
      repsPerformed: 0,
      consensusOneRepMax: 0,
      unitSystem,
      unitLabel,
      formulaResults: [],
      repBreakdown: [],
      trainingZones: [],
    };
  }

  if (!Number.isFinite(rawR) || rawR < 1 || rawR > 15) {
    return {
      isValid: false,
      errorMessage: "Repetitions must be between 1 and 15 for accurate estimation.",
      exerciseName,
      weightLifted: rawW,
      repsPerformed: 0,
      consensusOneRepMax: 0,
      unitSystem,
      unitLabel,
      formulaResults: [],
      repBreakdown: [],
      trainingZones: [],
    };
  }

  const weight = rawW;
  const reps = Math.round(rawR);

  // 2. Direct 1-Repetition Maximum Lift (reps === 1)
  // In sports science, lifting a load for 1 repetition to maximum IS a measured 1RM.
  // We keep all 7 formula slots populated and structurally stable.
  if (reps === 1) {
    const formattedW = parseFloat(weight.toFixed(1));
    const formulaResults: FormulaResult[] = [
      { formulaName: "Epley Formula (1985)", oneRepMax: formattedW, description: "Direct 1RM measurement (100% single rep lift)" },
      { formulaName: "Brzycki Formula (1993)", oneRepMax: formattedW, description: "Direct 1RM measurement (100% single rep lift)" },
      { formulaName: "Lombardi Formula (1989)", oneRepMax: formattedW, description: "Direct 1RM measurement (100% single rep lift)" },
      { formulaName: "Mayhew et al. (1992)", oneRepMax: formattedW, description: "Direct 1RM measurement (100% single rep lift)" },
      { formulaName: "O'Conner et al. (1989)", oneRepMax: formattedW, description: "Direct 1RM measurement (100% single rep lift)" },
      { formulaName: "Wathan Formula (1994)", oneRepMax: formattedW, description: "Direct 1RM measurement (100% single rep lift)" },
      { formulaName: "Lander Formula (1985)", oneRepMax: formattedW, description: "Direct 1RM measurement (100% single rep lift)" },
    ];

    const repBreakdown = REP_PCT_MAP.map((item) => ({
      reps: item.reps,
      percentage: Math.round(item.pct * 100),
      weight: parseFloat((formattedW * item.pct).toFixed(1)),
      intensityZone: item.zone,
      recommendedUse: item.use,
    }));

    return {
      isValid: true,
      exerciseName,
      weightLifted: weight,
      repsPerformed: reps,
      consensusOneRepMax: formattedW,
      unitSystem,
      unitLabel,
      formulaResults,
      repBreakdown,
      trainingZones: [
        {
          zoneName: "Explosive Power",
          percentageRange: "50% - 60%",
          weightRange: `${(formattedW * 0.5).toFixed(1)} - ${(formattedW * 0.6).toFixed(1)} ${unitLabel}`,
          repRange: "3 - 5 reps",
          focus: "Bar Speed & Explosive Power Production",
        },
        {
          zoneName: "Muscular Endurance",
          percentageRange: "60% - 70%",
          weightRange: `${(formattedW * 0.6).toFixed(1)} - ${(formattedW * 0.7).toFixed(1)} ${unitLabel}`,
          repRange: "12 - 20 reps",
          focus: "Lactate Threshold & Capillary Density",
        },
        {
          zoneName: "Hypertrophy",
          percentageRange: "70% - 80%",
          weightRange: `${(formattedW * 0.7).toFixed(1)} - ${(formattedW * 0.8).toFixed(1)} ${unitLabel}`,
          repRange: "6 - 12 reps",
          focus: "Sarcoplasmic & Myofibrillar Hypertrophy",
        },
        {
          zoneName: "Maximal Strength",
          percentageRange: "80% - 100%",
          weightRange: `${(formattedW * 0.8).toFixed(1)} - ${formattedW.toFixed(1)} ${unitLabel}`,
          repRange: "1 - 5 reps",
          focus: "Central Nervous System & Peak Force",
        },
      ],
    };
  }

  // 3. Sub-maximal 1RM Estimation (2 <= reps <= 15)
  // 1. Epley Formula (1985)
  const epley = weight * (1 + reps / 30);

  // 2. Brzycki Formula (1993)
  const brzycki = reps < 37 ? weight * (36 / (37 - reps)) : epley;

  // 3. Lombardi Formula (1989)
  const lombardi = weight * Math.pow(reps, 0.1);

  // 4. Mayhew et al. Formula (1992)
  const mayhew = (100 * weight) / (52.2 + 41.9 * Math.exp(-0.055 * reps));

  // 5. O'Conner et al. Formula (1989)
  const oconner = weight * (1 + 0.025 * reps);

  // 6. Wathan Formula (1994)
  const wathan = (100 * weight) / (48.8 + 53.8 * Math.exp(-0.075 * reps));

  // 7. Lander Formula (1985)
  const lander = reps < 38 ? (100 * weight) / (101.3 - 2.67123 * reps) : epley;

  const formulaResults: FormulaResult[] = [
    { formulaName: "Epley Formula (1985)", oneRepMax: parseFloat(epley.toFixed(1)), description: "Gold standard for sub-maximal repetitions (1-10 reps)" },
    { formulaName: "Brzycki Formula (1993)", oneRepMax: parseFloat(brzycki.toFixed(1)), description: "Classical clinical equation widely used in powerlifting" },
    { formulaName: "Lombardi Formula (1989)", oneRepMax: parseFloat(lombardi.toFixed(1)), description: "Exponential power curve for heavy compound movements" },
    { formulaName: "Mayhew et al. (1992)", oneRepMax: parseFloat(mayhew.toFixed(1)), description: "Empirical non-linear equation derived from collegiate athletes" },
    { formulaName: "O'Conner et al. (1989)", oneRepMax: parseFloat(oconner.toFixed(1)), description: "Linear fraction model developed for bench press & squat" },
    { formulaName: "Wathan Formula (1994)", oneRepMax: parseFloat(wathan.toFixed(1)), description: "Modern exponential curve fitting strength training" },
    { formulaName: "Lander Formula (1985)", oneRepMax: parseFloat(lander.toFixed(1)), description: "Empirical linear percentage model for athletic populations" },
  ];

  // Consensus 1RM is the arithmetic mean of all 7 rounded formula outputs
  const avgOneRepMax = formulaResults.reduce((acc, curr) => acc + curr.oneRepMax, 0) / formulaResults.length;
  const consensusOneRepMax = parseFloat(avgOneRepMax.toFixed(1));

  // 1RM to 12RM Repetition Percentage Breakdown
  const repBreakdown = REP_PCT_MAP.map((item) => ({
    reps: item.reps,
    percentage: Math.round(item.pct * 100),
    weight: parseFloat((consensusOneRepMax * item.pct).toFixed(1)),
    intensityZone: item.zone,
    recommendedUse: item.use,
  }));

  // Evidence-based general training zones (qualified in educational documentation)
  const trainingZones = [
    {
      zoneName: "Explosive Power",
      percentageRange: "50% - 60%",
      weightRange: `${(consensusOneRepMax * 0.5).toFixed(1)} - ${(consensusOneRepMax * 0.6).toFixed(1)} ${unitLabel}`,
      repRange: "3 - 5 reps",
      focus: "Bar Speed & Explosive Power Production",
    },
    {
      zoneName: "Muscular Endurance",
      percentageRange: "60% - 70%",
      weightRange: `${(consensusOneRepMax * 0.6).toFixed(1)} - ${(consensusOneRepMax * 0.7).toFixed(1)} ${unitLabel}`,
      repRange: "12 - 20 reps",
      focus: "Lactate Threshold & Capillary Density",
    },
    {
      zoneName: "Hypertrophy",
      percentageRange: "70% - 80%",
      weightRange: `${(consensusOneRepMax * 0.7).toFixed(1)} - ${(consensusOneRepMax * 0.8).toFixed(1)} ${unitLabel}`,
      repRange: "6 - 12 reps",
      focus: "Sarcoplasmic & Myofibrillar Hypertrophy",
    },
    {
      zoneName: "Maximal Strength",
      percentageRange: "80% - 100%",
      weightRange: `${(consensusOneRepMax * 0.8).toFixed(1)} - ${consensusOneRepMax.toFixed(1)} ${unitLabel}`,
      repRange: "1 - 5 reps",
      focus: "Central Nervous System & Peak Force",
    },
  ];

  return {
    isValid: true,
    exerciseName,
    weightLifted: weight,
    repsPerformed: reps,
    consensusOneRepMax,
    unitSystem,
    unitLabel,
    formulaResults,
    repBreakdown,
    trainingZones,
  };
}
