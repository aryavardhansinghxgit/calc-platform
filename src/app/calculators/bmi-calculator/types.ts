export interface BMICalculatorInputs {
  weightKg?: number;
  heightCm?: number;
}

export interface BMICalculatorOutputs {
  bmi: number;
  category: string;
  healthyWeightRange: string;
  primeIndex: number;
}
