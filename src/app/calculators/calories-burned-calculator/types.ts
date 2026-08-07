export interface CaloriesBurnedCalculatorInputs {
  activity?: string;
  weightKg?: number;
  durationMins?: number;
}

export interface CaloriesBurnedCalculatorOutputs {
  caloriesBurned: number;
  metValue: number;
  calPerMin: number;
}
