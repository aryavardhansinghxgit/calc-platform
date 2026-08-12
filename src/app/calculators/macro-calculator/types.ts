export type MacroCalculationMode =
  | "standard"
  | "calories"
  | "cutting"
  | "bulking"
  | "maintenance"
  | "recomp"
  | "athlete"
  | "keto"
  | "high-protein"
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
  | "cunningham"
  | "schofield";

export type DietStyleType = "balanced" | "low-carb" | "high-protein" | "keto" | "custom";

export interface MacroInputParams {
  unitSystem: UnitSystem;
  calculationMode: MacroCalculationMode;
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
  targetWeightLbs?: number;
  proteinPreference?: "moderate" | "high" | "very-high";
  dietStyle?: DietStyleType;
  customProteinPct?: number;
  customCarbsPct?: number;
  customFatPct?: number;
}

export interface MacroNutrientOutput {
  grams: number;
  calories: number;
  percentage: number;
}

export interface BodyCompositionOutput {
  leanBodyMassLbs: number;
  fatMassLbs: number;
  bodyFatPct: number;
  ffmi: number;
  bmi: number;
  healthScore: number;
  fitnessRating: string;
}

export interface WeightTrajectoryPoint {
  week: number;
  weekLabel: string;
  estimatedWeightLbs: number;
  estimatedWeightKg: number;
}

export interface FoodDatabaseItem {
  id: string;
  name: string;
  category: "Fruits" | "Vegetables" | "Proteins" | "Meals & Snacks" | "Dairy & Beverages";
  servingSize: string;
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface MacroCalculationResults {
  mode: MacroCalculationMode;
  unitSystem: UnitSystem;
  bmr: number;
  rmr: number;
  tdee: number;
  targetCalories: number;
  weeklyCalories: number;
  formulaUsed: string;
  protein: MacroNutrientOutput;
  carbs: MacroNutrientOutput;
  fat: MacroNutrientOutput;
  bodyComposition: BodyCompositionOutput;
  weightTrajectory: WeightTrajectoryPoint[];
  foodDatabase: FoodDatabaseItem[];
  insights: string[];
  recommendations: string[];
}

export interface MacroCalculatorOutputs extends Record<string, any> {
  targetCalories: number;
  bmr: number;
  tdee: number;
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
  healthScore: number;
}
