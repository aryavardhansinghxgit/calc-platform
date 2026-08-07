export interface BMRCalculatorInputs {
  age?: number;
  gender?: string;
  weightKg?: number;
  heightCm?: number;
}

export interface BMRCalculatorOutputs {
  bmrMifflin: number;
  bmrHarris: number;
  sedentaryCal: number;
}
