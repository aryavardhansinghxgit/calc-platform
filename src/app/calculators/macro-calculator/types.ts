export interface MacroCalculatorInputs {
  dailyCalories?: number;
  dietRatio?: string;
}

export interface MacroCalculatorOutputs {
  proteinGrams: number;
  carbsGrams: number;
  fatGrams: number;
}
