export interface MolarityCalculatorInputs {
  massGrams?: number;
  molarMass?: number;
  volumeLiters?: number;
}

export interface MolarityCalculatorOutputs {
  molarityM: number;
  moles: number;
}
