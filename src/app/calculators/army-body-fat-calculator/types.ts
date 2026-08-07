export interface ArmyBodyFatCalculatorInputs {
  gender?: string;
  age?: string;
  heightCm?: number;
  neckCm?: number;
  waistCm?: number;
  hipCm?: number;
}

export interface ArmyBodyFatCalculatorOutputs {
  bodyFatPercent: number;
  maxAllowed: number;
  status: string;
}
