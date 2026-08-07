export interface CalorieCalculatorInputs {
  age?: number;
  gender?: string;
  weightKg?: number;
  heightCm?: number;
  activityLevel?: string;
  goal?: string;
}

export interface CalorieCalculatorOutputs {
  targetCalories: number;
  bmr: number;
  tdee: number;
}
