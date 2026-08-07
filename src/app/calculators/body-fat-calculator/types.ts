export interface BodyFatCalculatorInputs {
  gender?: string;
  weightKg?: number;
  heightCm?: number;
  neckCm?: number;
  waistCm?: number;
  hipCm?: number;
}

export interface BodyFatCalculatorOutputs {
  bodyFatPercent: number;
  fatMassKg: number;
  leanMassKg: number;
  category: string;
}
