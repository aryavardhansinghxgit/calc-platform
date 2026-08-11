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

export interface TargetHeartRateResult {
  mhrMode: MhrMode;
  calculatedMhr: number;
  rhr: number;
  hrr: number; // Heart Rate Reserve (MHR - RHR)
  formulaName: string;
  methodName: string;
  customBorgThr?: number;
  zones: HeartRateZone[];
  formulaComparison: FormulaMhrResult[];
  recommendations: {
    fatBurnZoneBpm: string;
    aerobicZoneBpm: string;
    anaerobicZoneBpm: string;
    recoveryGuidance: string;
  };
}

export function calculateTargetHeartRate(input: TargetHeartRateInput): TargetHeartRateResult {
  const mhrMode = input.mhrMode;
  const age = Math.max(15, Math.min(110, Number(input.age) || 30));
  const rhr = Math.max(30, Math.min(120, Number(input.rhr) || 70));
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

  if (mhrMode === "manual" && input.manualMhr && input.manualMhr > 0) {
    calculatedMhr = Math.max(100, Math.min(250, Number(input.manualMhr)));
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

  // 2. Heart Rate Reserve (HRR)
  const hrr = Math.max(20, calculatedMhr - rhr);

  // 3. 5 Heart Rate Training Zones
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

  // Borg RPE Ratings Calculations
  let customBorgThr: number | undefined = undefined;
  let methodName = useKarvonen ? "Karvonen Heart Rate Reserve Method" : "Standard Maximum HR Percentage Method";

  if (methodKey === "borg620") {
    const rating = Math.max(6, Math.min(20, Number(input.borg620Rating) || 13));
    const factor = (rating - 6) / 14;
    customBorgThr = Math.round(rhr + factor * hrr);
    methodName = `Borg Scale 6-20 (Rating ${rating})`;
  } else if (methodKey === "borgCR10") {
    const rating = Math.max(0, Math.min(10, Number(input.borgCR10Rating) || 4));
    const factor = rating / 10;
    customBorgThr = Math.round(rhr + factor * hrr);
    methodName = `Borg CR10 Scale (Rating ${rating})`;
  }

  // Recommendations
  const fatBurnZone = zones[1];
  const aerobicZone = zones[2];
  const anaerobicZone = zones[3];

  return {
    mhrMode,
    calculatedMhr,
    rhr,
    hrr,
    formulaName,
    methodName,
    customBorgThr,
    zones,
    formulaComparison,
    recommendations: {
      fatBurnZoneBpm: `${fatBurnZone.minBpm} – ${fatBurnZone.maxBpm} BPM`,
      aerobicZoneBpm: `${aerobicZone.minBpm} – ${aerobicZone.maxBpm} BPM`,
      anaerobicZoneBpm: `${anaerobicZone.minBpm} – ${anaerobicZone.maxBpm} BPM`,
      recoveryGuidance: "Allow 24 to 48 hours of Zone 1 active recovery after intense Zone 4/5 workouts.",
    },
  };
}
