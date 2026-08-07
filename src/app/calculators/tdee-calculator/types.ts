export interface TDEECalculatorInputs {
  age?: number;
  gender?: string;
  weightKg?: number;
  heightCm?: number;
  activityLevel?: string;
}

export interface TDEECalculatorOutputs {
  tdee: number;
  cuttingCalories: number;
  bulkingCalories: number;
}
