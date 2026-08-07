export interface ProteinCalculatorInputs {
  weightKg?: number;
  goal?: string;
}

export interface ProteinCalculatorOutputs {
  proteinGrams: number;
  proteinCalories: number;
}
