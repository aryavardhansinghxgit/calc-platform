export type TdeeCalculationMode =
  | "tdee"
  | "maintenance"
  | "loss"
  | "gain"
  | "lean-bulk"
  | "cutting"
  | "recomp"
  | "athlete"
  | "metabolism"
  | "custom";

export type UnitSystem = "us" | "metric" | "other";
export type EnergyUnit = "kcal" | "kj";
export type Gender = "male" | "female";
export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very-active"
  | "athlete";

export type FitnessGoal =
  | "maintain"
  | "mild-loss"
  | "loss"
  | "extreme-loss"
  | "mild-gain"
  | "gain"
  | "extreme-gain"
  | "recomp";

export type BmrFormulaType =
  | "mifflin"
  | "katch"
  | "harris"
  | "revised-harris"
  | "cunningham"
  | "schofield"
  | "owen";

export interface TdeeInputParams {
  unitSystem: UnitSystem;
  energyUnit: EnergyUnit;
  calculationMode: TdeeCalculationMode;
  age: number;
  gender: Gender;
  heightFeet?: number;
  heightInches?: number;
  heightCm?: number;
  weightLbs?: number;
  weightKg?: number;
  activityLevel: ActivityLevel;
  goal: FitnessGoal;
  bmrFormula: BmrFormulaType;
  bodyFat?: number;
  dailySteps?: number;
  workoutFrequency?: number;
  workoutDuration?: number;
  customDelta?: number;
}

export interface ActivityBurnItem {
  activity: string;
  caloriesBurned30Min: number;
  desc: string;
}

export interface FormulaComparisonItem {
  formulaName: string;
  bmrValue: number;
  tdeeValue: number;
  difference: number;
}

export interface WeightProjectionPoint {
  week: number;
  weightLbs: number;
  weightKg: number;
}

export interface TdeeCalculationResults {
  isValid: boolean;
  errorMessage?: string;
  mode: TdeeCalculationMode;
  unitSystem: UnitSystem;
  energyUnit: EnergyUnit;
  bmr: number;
  tdee: number;
  targetCalories: number;
  formulaUsed: string;

  // TDEE Component Breakdown
  components: {
    bmrCalories: number;
    eatCalories: number;
    neatCalories: number;
    tefCalories: number;
  };

  // Timeframe Expenditure Totals
  timeframeTotals: {
    daily: number;
    weekly: number;
    monthly: number;
    annual: number;
  };

  // Goal Calorie Strategy Matrix
  goalPlan: {
    maintenance: number;
    mildLoss: number;
    moderateLoss: number;
    extremeLoss: number;
    leanBulk: number;
    moderateGain: number;
    extremeGain: number;
  };

  // 12-Week Projections & Activity Tables
  weightProjections: WeightProjectionPoint[];
  activityBurnTable: ActivityBurnItem[];
  formulaComparisons: FormulaComparisonItem[];

  // Body Composition
  bodyComposition: {
    leanBodyMassLbs: number;
    fatMassLbs: number;
    bodyFatPct: number;
    ffmi: number;
    bmi: number;
    healthScore: number;
  };

  insights: string[];
  recommendations: string[];
}

export interface TdeeCalculatorOutputs extends Record<string, any> {
  targetCalories: number;
  tdee: number;
  bmr: number;
  neatCalories: number;
  tefCalories: number;
}
