export type CarbCalculationMode =
  | "daily"
  | "weight-loss"
  | "weight-gain"
  | "maintenance"
  | "athlete"
  | "endurance"
  | "low-carb"
  | "moderate-carb"
  | "high-carb"
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

export interface CarbInputParams {
  unitSystem: UnitSystem;
  calculationMode: CarbCalculationMode;
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
  dailyFiberGrams?: number;
  sugarAlcoholsGrams?: number;
  customCarbPct?: number;
  selectedFoodId?: string | null;
  servingCount?: number;
}

export interface MacroNutrientSummary {
  grams: number;
  calories: number;
  percentage: number;
}

export interface CarbCyclingDay {
  day: string;
  level: "High Carb" | "Medium Carb" | "Low Carb";
  calories: number;
  carbs: number;
  protein: number;
  fat: number;
}

export interface FoodGiDatabaseItem {
  id: string;
  name: string;
  category: "Fruits" | "Vegetables" | "Whole Grains" | "Legumes" | "Dairy" | "Snacks & Beverages";
  servingSize: string;
  totalCarbs: number;
  fiber: number;
  netCarbs: number;
  calories: number;
  gi: number;
  giCategory: "Low" | "Medium" | "High";
  gl: number;
}

export interface SelectedFoodMetrics {
  id: string;
  name: string;
  category: string;
  servingSize: string;
  servingCount: number;
  totalCarbs: number;
  fiber: number;
  netCarbs: number;
  gi: number;
  giCategory: "Low" | "Medium" | "High";
  gl: number;
  glCategory: string;
}

export interface CarbohydrateCalculationResults {
  mode: CarbCalculationMode;
  unitSystem: UnitSystem;
  bmr: number;
  tdee: number;
  targetCalories: number;
  formulaUsed: string;

  // Carb Metrics
  totalCarbGrams: number;
  totalCarbCalories: number;
  carbPercentage: number;
  fiberGrams: number;
  sugarAlcoholsGrams: number;
  netCarbGrams: number;
  targetCarbRangeMin: number;
  targetCarbRangeMax: number;
  glycemicLoad: number | null;
  glycemicRating: string;
  selectedFood: SelectedFoodMetrics | null;

  // Protein & Fat Splits
  protein: MacroNutrientSummary;
  fat: MacroNutrientSummary;

  // Body Composition
  bodyComposition: {
    leanBodyMassLbs: number;
    fatMassLbs: number;
    bodyFatPct: number;
    ffmi: number;
    bmi: number;
    healthScore: number;
  };

  // Visual Module Data
  carbCyclingSchedule: CarbCyclingDay[];
  foodGiDatabase: FoodGiDatabaseItem[];
  insights: string[];
  recommendations: string[];
}

export interface CarbohydrateCalculatorOutputs extends Record<string, any> {
  targetCalories: number;
  totalCarbGrams: number;
  netCarbGrams: number;
  glycemicLoad: number | null;
  tdee: number;
  bmr: number;
  selectedFood?: SelectedFoodMetrics | null;
}
