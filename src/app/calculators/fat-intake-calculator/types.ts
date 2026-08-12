export type FatCalculationMode =
  | "daily"
  | "loss"
  | "gain"
  | "maintenance"
  | "athlete"
  | "heart-health"
  | "keto"
  | "low-fat"
  | "bodybuilding"
  | "custom";

export type UnitSystem = "us" | "metric";
export type Gender = "male" | "female";
export type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very-active";
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
  | "cunningham";

export type KetoTypeOption = "skd" | "tkd" | "ckd" | "hpkd";

export interface FatInputParams {
  unitSystem: UnitSystem;
  calculationMode: FatCalculationMode;
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
  ketoType?: KetoTypeOption;
  customFatPercentage?: number;
}

export interface MacroSummaryItem {
  grams: number;
  calories: number;
  percentage: number;
}

export interface HealthyFatFoodItem {
  id: string;
  name: string;
  category: "Oils & Fats" | "Nuts & Seeds" | "Seafood & Fish" | "Dairy & Eggs" | "Avocados & Fruits" | "Meat & Poultry" | "Processed & Snacks";
  servingSize: string;
  totalFat: number;
  saturatedFat: number;
  mufa: number;
  pufa: number;
  omega3: number;
  calories: number;
}

export interface FatCalculationResults {
  mode: FatCalculationMode;
  unitSystem: UnitSystem;
  bmr: number;
  tdee: number;
  targetCalories: number;
  formulaUsed: string;

  // Fat Targets
  fatTargetGrams: number;
  fatTargetCalories: number;
  fatPercentage: number;
  fatRangeMin: number;
  fatRangeRecommended: number;
  fatRangeMax: number;
  hormoneSafetyMinGrams: number;

  // Fatty Acid Sub-Type Breakdown
  fattyAcids: {
    saturatedGrams: number;
    saturatedMaxPercent: number;
    mufaGrams: number;
    pufaGrams: number;
    omega3Grams: number;
    omega6Grams: number;
    omegaRatio: number;
    transFatLimitGrams: number;
    cholesterolLimitMg: number;
  };

  // Carbs & Protein Summary
  protein: MacroSummaryItem;
  carbs: MacroSummaryItem;

  // Age Guideline (PDF reference table)
  ageGuideline: {
    ageGroup: string;
    recommendedPercentage: string;
  };

  // Body Composition
  bodyComposition: {
    leanBodyMassLbs: number;
    fatMassLbs: number;
    bodyFatPct: number;
    ffmi: number;
    bmi: number;
    healthScore: number;
  };

  // Food Database & Insights
  foodDatabase: HealthyFatFoodItem[];
  insights: string[];
  recommendations: string[];
}

export interface FatCalculatorOutputs extends Record<string, any> {
  targetCalories: number;
  fatTargetGrams: number;
  fatPercentage: number;
  saturatedFatMaxGrams: number;
  tdee: number;
  bmr: number;
}
