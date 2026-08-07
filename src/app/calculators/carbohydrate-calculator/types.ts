export interface CarbohydrateCalculatorInputs {
  dailyCalories?: number;
  activityLevel?: string;
}

export interface CarbohydrateCalculatorOutputs {
  carbGrams: number;
  carbCalories: number;
}
