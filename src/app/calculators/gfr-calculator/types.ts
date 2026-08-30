export type GfrCalculationMode =
  | "adult-ckdepi2021"
  | "adult-ckdepi2009"
  | "mdrd"
  | "mayo"
  | "cockcroft-gault"
  | "pediatric-schwartz"
  | "cystatin-c"
  | "cystatin-c-alone"
  | "kdigo-risk"
  | "comparison"
  | "custom";

export type PatientType = "adult" | "child";
export type UnitSystem = "us" | "metric";
export type CreatinineUnit = "mg/dL" | "umol/L";
export type Gender = "male" | "female";
export type RaceType = "black" | "non-black";
export type AlbuminuriaStage = "A1" | "A2" | "A3";

export interface GfrInputParameters {
  calculationMode?: GfrCalculationMode;
  patientType?: PatientType;
  unitSystem?: UnitSystem;
  creatinineUnit?: CreatinineUnit;
  age?: number;
  gender?: Gender;
  race?: RaceType;
  serumCreatinine?: number; // in chosen unit (mg/dL or µmol/L)
  heightFeet?: number;
  heightInches?: number;
  heightCm?: number;
  weightLbs?: number;
  weightKg?: number;
  cystatinC?: number; // mg/L
  uACR?: number; // mg/g (Albumin-to-Creatinine Ratio)
  formulaChoice?: string;
}

export interface FormulaComparisonItem {
  formulaName: string;
  egfrValue: number;
  unit: string;
  ckdStage: string;
  differenceFromDefault: number;
  notes: string;
}

export interface KdigoPrognosisItem {
  stageG: string;
  stageA: string;
  riskCategory: "Low Risk" | "Moderate Risk" | "High Risk" | "Very High Risk";
  colorHex: string;
  desc: string;
}

export interface GfrOutputResults {
  mode: GfrCalculationMode;
  patientType: PatientType;
  creatinineMgDl: number;
  creatinineUmolL: number;
  eGfr: number;
  ckdStage: "Stage 1" | "Stage 2" | "Stage 3a" | "Stage 3b" | "Stage 4" | "Stage 5";
  stageName: string;
  stageDescription: string;
  kidneyFunctionPercent: number;
  primaryFormulaUsed: string;
  ageExpectedGfr: number;
  agePercentile: number;
  creatinineClearance?: number;
  kdigoRisk: {
    gStage: string;
    aStage: string;
    riskCategory: "Low Risk" | "Moderate Risk" | "High Risk" | "Very High Risk";
    colorHex: string;
    description: string;
  };
  formulaComparisons: FormulaComparisonItem[];
  ageDeclineCurve: { age: number; averageGfr: number; patientProjectedGfr: number }[];
  recommendations: string[];
  actionPlan: string[];
  insights: string[];
}
