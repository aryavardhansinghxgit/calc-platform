export interface LeanBodyMassCalculatorInputs {
  gender?: string;
  weightKg?: number;
  heightCm?: number;
}

export interface LeanBodyMassCalculatorOutputs {
  boerLbm: number;
  jamesLbm: number;
  humeLbm: number;
}
