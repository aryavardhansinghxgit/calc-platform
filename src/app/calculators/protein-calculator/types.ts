export type ProteinCalculationMode =
  | "daily"
  | "hypertrophy"
  | "cutting"
  | "maintenance"
  | "pregnancy"
  | "senior"
  | "endurance"
  | "strength"
  | "vegan"
  | "custom";

export type UnitSystem = "us" | "metric";
export type Gender = "male" | "female";
export type ActivityLevel =
  | "sedentary"
  | "light"
  | "moderate"
  | "active"
  | "very-active"
  | "extra-active";

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

export type PregnancyStatusType =
  | "none"
  | "t1"
  | "t2"
  | "t3"
  | "lactation-1"
  | "lactation-2";

export interface ProteinInputParams {
  unitSystem: UnitSystem;
  calculationMode: ProteinCalculationMode;
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
  pregnancyStatus?: PregnancyStatusType;
  mealFrequency?: number;
  customProteinGramsPerKg?: number;
}

export interface MacroSummaryItem {
  grams: number;
  calories: number;
  percentage: number;
}

export interface AminoAcidProfileItem {
  aminoAcid: string;
  targetGrams: number;
  functionDesc: string;
}

export interface ProteinFoodItem {
  id: string;
  name: string;
  category: "Meat & Poultry" | "Seafood" | "Dairy & Eggs" | "Vegan Complete" | "Plant Incomplete" | "Common Meals";
  servingSize: string;
  protein: number;
  calories: number;
  qualityType: "Complete Protein" | "Incomplete Protein";
  leucineContent: number;
}

export interface ProteinCalculationResults {
  mode: ProteinCalculationMode;
  unitSystem: UnitSystem;
  bmr: number;
  tdee: number;
  targetCalories: number;
  formulaUsed: string;

  // Protein Metrics
  proteinTargetGrams: number;
  proteinGramsPerKg: number;
  proteinGramsPerLb: number;
  proteinCalories: number;
  proteinPercentage: number;
  perMealProteinGrams: number;
  leucineTargetPerMeal: number;
  rdaMinimumGrams: number;
  proteinRangeMin: number;
  proteinRangeMax: number;

  // Carbs & Fat Summary
  carbs: MacroSummaryItem;
  fat: MacroSummaryItem;

  // Body Composition
  bodyComposition: {
    leanBodyMassLbs: number;
    fatMassLbs: number;
    bodyFatPct: number;
    ffmi: number;
    bmi: number;
    healthScore: number;
  };

  // Pregnancy & Lactation Adjustment
  pregnancyAdjustment: {
    label: string;
    extraProteinGrams: number;
    extraEnergyKj: number;
  };

  // Amino Acids & Food Database
  eaaProfile: AminoAcidProfileItem[];
  foodDatabase: ProteinFoodItem[];
  insights: string[];
  recommendations: string[];
}

export interface ProteinCalculatorOutputs extends Record<string, any> {
  targetCalories: number;
  proteinTargetGrams: number;
  proteinGramsPerLb: number;
  perMealProteinGrams: number;
  tdee: number;
  bmr: number;
}
