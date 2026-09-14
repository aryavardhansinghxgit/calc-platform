export type MhrMode = "estimate" | "manual";
export type MhrFormula = "haskell" | "tanaka" | "nes" | "gellish";
export type CalculationMethod = "standard" | "karvonen" | "borg620" | "borgCR10";

export interface TargetHeartRateInput {
  mhrMode: MhrMode;
  age: number;
  manualMhr?: number;
  rhr?: number; // Resting Heart Rate
  formula: MhrFormula;
  method: CalculationMethod;
  borg620Rating?: number; // 6 to 20
  borgCR10Rating?: number; // 0 to 10
}

export interface HeartRateZone {
  zoneNumber: number;
  zoneName: string;
  percentageRange: string;
  minBpm: number;
  maxBpm: number;
  benefit: string;
  description: string;
  colorHex: string;
}

export interface FormulaMhrResult {
  formulaName: string;
  mhrBpm: number;
  description: string;
}

export interface BorgMatrixRow {
  rating: number;
  intensity: string;
  multiplier: number;
  pct: string;
  bpm: number;
}

export interface TargetHeartRateResult {
  isValid: boolean;
  errorMessage?: string;
  mhrMode: MhrMode;
  calculatedMhr: number;
  rhr: number;
  hrr: number; // Heart Rate Reserve (MHR - RHR) or 0 if invalid
  formulaName: string;
  method: CalculationMethod;
  methodName: string;
  targetBpm: number; // Authoritative Target Heart Rate (BPM)
  customBorgThr?: number;
  zones: HeartRateZone[];
  formulaComparison: FormulaMhrResult[];
  borgTable: BorgMatrixRow[];
  recommendations: {
    fatBurnZoneBpm: string;
    aerobicZoneBpm: string;
    anaerobicZoneBpm: string;
    recoveryGuidance: string;
  };
}

export function calculateTargetHeartRate(input: TargetHeartRateInput): TargetHeartRateResult {
  const mhrMode = input.mhrMode;
  const ageNum = Number(input.age);
  const age = Math.max(1, Math.min(120, isNaN(ageNum) ? 30 : ageNum));
  const rhrNum = Number(input.rhr);
  const rhr = isNaN(rhrNum) ? 70 : rhrNum;
  const formulaKey = input.formula || "haskell";
  const methodKey = input.method || "karvonen";

  // 1. Calculate Maximum Heart Rate (MHR) across 4 clinical formulas
  const haskellMhr = Math.round(220 - age);
  const tanakaMhr = Math.round(208 - 0.7 * age);
  const nesMhr = Math.round(211 - 0.64 * age);
  const gellishMhr = Math.round(207 - 0.7 * age);

  const formulaComparison: FormulaMhrResult[] = [
    { formulaName: "Haskell & Fox (1971)", mhrBpm: haskellMhr, description: "Classic baseline (220 - Age)" },
    { formulaName: "Tanaka et al. (2001)", mhrBpm: tanakaMhr, description: "Meta-analysis validated formula (208 - 0.7 × Age)" },
    { formulaName: "Nes et al. (2013)", mhrBpm: nesMhr, description: "HUNT Fitness Study derived (211 - 0.64 × Age)" },
    { formulaName: "Gellish et al. (2007)", mhrBpm: gellishMhr, description: "Longitudinal stress test model (207 - 0.7 × Age)" },
  ];

  let calculatedMhr = haskellMhr;
  let formulaName = "Haskell & Fox Formula (220 - Age)";

  if (mhrMode === "manual" && input.manualMhr !== undefined && input.manualMhr !== null) {
    const manualNum = Number(input.manualMhr);
    calculatedMhr = isNaN(manualNum) ? 190 : manualNum;
    formulaName = "Manual Cardiac Stress Test Result";
  } else {
    if (formulaKey === "tanaka") {
      calculatedMhr = tanakaMhr;
      formulaName = "Tanaka, Monahan & Seals Formula (208 - 0.7 × Age)";
    } else if (formulaKey === "nes") {
      calculatedMhr = nesMhr;
      formulaName = "Nes, Janszky, Wisloff et al. Formula (211 - 0.64 × Age)";
    } else if (formulaKey === "gellish") {
      calculatedMhr = gellishMhr;
      formulaName = "Gellish et al. Formula (207 - 0.7 × Age)";
    }
  }

  // 2. Strict Physiological Validation (RHR > 0, MHR > 0, RHR < MHR)
  if (rhr <= 0 || calculatedMhr <= 0 || rhr >= calculatedMhr) {
    let errorMsg = "Resting Heart Rate must be lower than Maximum Heart Rate.";
    if (rhr <= 0) {
      errorMsg = "Resting Heart Rate must be greater than zero.";
    } else if (calculatedMhr <= 0) {
      errorMsg = "Maximum Heart Rate must be greater than zero.";
    }

    return {
      isValid: false,
      errorMessage: errorMsg,
      mhrMode,
      calculatedMhr,
      rhr,
      hrr: 0,
      formulaName,
      method: methodKey,
      methodName: methodKey === "standard" ? "Standard Maximum HR Percentage Method" : "Karvonen Heart Rate Reserve Method",
      targetBpm: 0,
      zones: [],
      formulaComparison,
      borgTable: [],
      recommendations: {
        fatBurnZoneBpm: "N/A",
        aerobicZoneBpm: "N/A",
        anaerobicZoneBpm: "N/A",
        recoveryGuidance: "Please adjust your inputs to view exercise training zones.",
      },
    };
  }

  // 3. Heart Rate Reserve (HRR) - Mathematically valid: strictly positive
  const hrr = calculatedMhr - rhr;

  // 4. 5 Standard Heart Rate Training Zones
  const zoneDefs = [
    { num: 1, name: "Zone 1: Very Light / Recovery", pctMin: 0.50, pctMax: 0.60, benefit: "Warm-up & Active Recovery", desc: "Improves overall health & aids recovery after intense sessions", color: "#38bdf8" },
    { num: 2, name: "Zone 2: Light / Fat Burning", pctMin: 0.60, pctMax: 0.70, benefit: "Fat Oxidation & Aerobic Base", desc: "Builds basic endurance & maximizes lipid metabolism", color: "#10b981" },
    { num: 3, name: "Zone 3: Moderate / Aerobic", pctMin: 0.70, pctMax: 0.80, benefit: "Aerobic Power & Endurance", desc: "Improves cardiovascular capacity & capillary density", color: "#f59e0b" },
    { num: 4, name: "Zone 4: Hard / Anaerobic", pctMin: 0.80, pctMax: 0.90, benefit: "Lactate Threshold & Performance", desc: "Increases anaerobic capacity & high-intensity endurance", color: "#8b5cf6" },
    { num: 5, name: "Zone 5: Maximum / VO2 Max", pctMin: 0.90, pctMax: 1.00, benefit: "Peak Sprint Power & Speed", desc: "Develops maximum performance & neuromuscular velocity", color: "#ef4444" },
  ];

  const useKarvonen = methodKey === "karvonen";

  const zones: HeartRateZone[] = zoneDefs.map((z) => {
    let minBpm = 0;
    let maxBpm = 0;

    if (useKarvonen) {
      minBpm = Math.round(rhr + z.pctMin * hrr);
      maxBpm = Math.round(rhr + z.pctMax * hrr);
    } else {
      minBpm = Math.round(z.pctMin * calculatedMhr);
      maxBpm = Math.round(z.pctMax * calculatedMhr);
    }

    return {
      zoneNumber: z.num,
      zoneName: z.name,
      percentageRange: `${Math.round(z.pctMin * 100)}% - ${Math.round(z.pctMax * 100)}%`,
      minBpm,
      maxBpm,
      benefit: z.benefit,
      description: z.desc,
      colorHex: z.color,
    };
  });

  // 5. Authoritative Target Heart Rate & Method Calculation
  let customBorgThr: number | undefined = undefined;
  let methodName = useKarvonen ? "Karvonen Heart Rate Reserve Method" : "Standard Maximum HR Percentage Method";
  let targetBpm = 0;

  if (methodKey === "borg620") {
    const rating = Math.max(6, Math.min(20, Number(input.borg620Rating) || 13));
    const factor = (rating - 6) / 14;
    customBorgThr = Math.round(rhr + factor * hrr);
    targetBpm = customBorgThr;
    methodName = `Borg Scale 6-20 (Rating ${rating})`;
  } else if (methodKey === "borgCR10") {
    const rating = Math.max(0, Math.min(10, Number(input.borgCR10Rating) || 4));
    const factor = rating / 10;
    customBorgThr = Math.round(rhr + factor * hrr);
    targetBpm = customBorgThr;
    methodName = `Borg CR10 Scale (Rating ${rating})`;
  } else if (methodKey === "standard") {
    // Standard 65% MHR (Midpoint of Zone 2 Fat Burn / Aerobic base)
    targetBpm = Math.round(0.65 * calculatedMhr);
  } else {
    // Default Karvonen 65% HRR
    targetBpm = Math.round(rhr + 0.65 * hrr);
  }

  // 6. Authoritative Borg 6-20 Conversion Table
  // Ratings: 6, 9, 11, 13, 15, 17, 20
  // Multipliers strictly match displayed percentages:
  // 6: 0.00 -> 0%
  // 9: 0.21 -> 21%
  // 11: 0.35 -> 35%
  // 13: 0.50 -> 50%
  // 15: 0.64 -> 64%
  // 17: 0.78 -> 78%
  // 20: 1.00 -> 100%
  const borgTable: BorgMatrixRow[] = [
    { rating: 6, intensity: "No exertion at all (Resting)", multiplier: 0.0, pct: "0%", bpm: Math.round(rhr + 0.0 * hrr) },
    { rating: 9, intensity: "Very light (Easy walking)", multiplier: 0.21, pct: "21%", bpm: Math.round(rhr + 0.21 * hrr) },
    { rating: 11, intensity: "Light (Brisk walking)", multiplier: 0.35, pct: "35%", bpm: Math.round(rhr + 0.35 * hrr) },
    { rating: 13, intensity: "Somewhat hard (Moderate jog)", multiplier: 0.50, pct: "50%", bpm: Math.round(rhr + 0.50 * hrr) },
    { rating: 15, intensity: "Hard (Heavy aerobic effort)", multiplier: 0.64, pct: "64%", bpm: Math.round(rhr + 0.64 * hrr) },
    { rating: 17, intensity: "Very hard (Interval sprint)", multiplier: 0.78, pct: "78%", bpm: Math.round(rhr + 0.78 * hrr) },
    { rating: 20, intensity: "Maximal exertion (Exhaustion)", multiplier: 1.0, pct: "100%", bpm: calculatedMhr },
  ];

  // 7. Recommendations
  const fatBurnZone = zones[1];
  const aerobicZone = zones[2];
  const anaerobicZone = zones[3];

  return {
    isValid: true,
    mhrMode,
    calculatedMhr,
    rhr,
    hrr,
    formulaName,
    method: methodKey,
    methodName,
    targetBpm,
    customBorgThr,
    zones,
    formulaComparison,
    borgTable,
    recommendations: {
      fatBurnZoneBpm: `${fatBurnZone.minBpm} – ${fatBurnZone.maxBpm} BPM`,
      aerobicZoneBpm: `${aerobicZone.minBpm} – ${aerobicZone.maxBpm} BPM`,
      anaerobicZoneBpm: `${anaerobicZone.minBpm} – ${anaerobicZone.maxBpm} BPM`,
      recoveryGuidance: "Allow 24 to 48 hours of Zone 1 active recovery after intense Zone 4/5 workouts.",
    },
  };
}
