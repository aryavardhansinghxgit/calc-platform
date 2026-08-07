export interface FatIntakeCalculatorInputs {
  dailyCalories?: number;
  fatPercent?: number;
}

export interface FatIntakeCalculatorOutputs {
  fatGrams: number;
  satFatMaxGrams: number;
}
