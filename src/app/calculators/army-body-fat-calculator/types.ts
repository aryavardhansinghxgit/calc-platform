export interface ArmyBodyFatCalculatorInputs {
  gender?: string;
  age?: string | number;
  heightInches?: number;
  waistInches?: number;
  heightCm?: number;
  waistCm?: number;
  neckCm?: number;
  hipCm?: number;
  weightLbs?: number;
  weightKg?: number;
  neckInches?: number;
  hipInches?: number;
  method?: string;
  unitSystem?: string;
  mode?: string;
}

export interface ArmyBodyFatCalculatorOutputs {
  whtr: number;
  maxAllowedWhtr: number;
  status: string;
  maxCompliantWaist?: number;
  requiredWaistReduction?: number;
  bodyFatPercent?: number;
  maxAllowed?: number;
}
