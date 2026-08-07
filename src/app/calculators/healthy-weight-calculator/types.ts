export interface HealthyWeightCalculatorInputs {
  heightCm?: number;
}

export interface HealthyWeightCalculatorOutputs {
  minWeight: number;
  targetWeight: number;
  maxWeight: number;
}
