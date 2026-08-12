export type BsaMode =
  | "mosteller-clinical"
  | "dubois-classic"
  | "haycock-pediatric"
  | "schlich-gender"
  | "chemo-dosing"
  | "cardiac-index"
  | "gfr-normalization"
  | "pediatric-bsa"
  | "formula-comparison"
  | "custom-oncology";

export type Gender = "male" | "female";
export type UnitSystem = "us" | "metric";

export interface BsaFormulaItem {
  formulaKey: string;
  formulaName: string;
  year: string;
  bsaM2: number;
  bsaFt2: number;
  varianceFromMosteller: number;
  description: string;
}

export interface ChemoDosingResult {
  targetDosePerM2: number;
  uncappedTotalDoseMg: number;
  isCapped: boolean;
  cappedBsaLimitM2: number;
  effectiveBsaM2: number;
  finalDoseMg: number;
  carboplatinAucDoseMg?: number;
  dosingGuidance: string;
}

export interface CardiacIndexResult {
  cardiacOutputLmin: number;
  cardiacIndexLminM2: number;
  strokeVolumeIndexMlM2: number;
  clinicalCategory: string;
  interpretation: string;
}

export interface GfrNormalizationResult {
  unadjustedGfrMlMin: number;
  normalizedGfrMlMin173m2: number;
  ckdStage: string;
  clinicalNote: string;
}

export interface PopulationBenchmark {
  category: string;
  averageBsaM2: number;
  averageBsaFt2: number;
  userDiffPercent: number;
}

export interface BsaInputs {
  mode: BsaMode;
  gender: Gender;
  unitSystem: UnitSystem;
  ageYears: number;
  
  // Height & Weight US Imperial
  heightFeet: number;
  heightInches: number;
  weightLbs: number;

  // Height & Weight Metric
  heightCm: number;
  weightKg: number;

  // Chemotherapy Dosing Inputs
  targetChemoDoseMgM2?: number;
  capObeseBsaAt2m2?: boolean;
  targetCarboplatinAuc?: number;
  targetGFR?: number;

  // Hemodynamic Inputs
  cardiacOutputLmin?: number;
  heartRateBpm?: number;

  // Renal Inputs
  unadjustedGfrMlMin?: number;
}

export interface BsaResults {
  mode: BsaMode;
  gender: Gender;
  unitSystem: UnitSystem;
  ageYears: number;
  heightCm: number;
  heightInchesTotal: number;
  weightKg: number;
  weightLbs: number;

  // Primary BSA Metrics (Mosteller default or selected formula)
  primaryBsaM2: number;
  primaryBsaFt2: number;
  primaryFormulaUsed: string;

  // Derived Anthropometric Metrics
  bmi: number;
  bmiCategory: string;
  idealBodyWeightKg: number; // Devine
  leanBodyMassKg: number; // Boer

  // 8-Formula Array & Variance
  formulaList: BsaFormulaItem[];
  minBsaM2: number;
  maxBsaM2: number;
  averageBsaM2: number;

  // Clinical Sub-Modules
  chemoDosing?: ChemoDosingResult;
  cardiacIndex?: CardiacIndexResult;
  gfrNormalization?: GfrNormalizationResult;
  benchmarks: PopulationBenchmark[];

  // Clinical Recommendations & Insights
  clinicalRecommendations: string[];
  actionPlan: string[];
}
