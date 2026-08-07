export interface GravelCalculatorInputs {
  areaSqFt?: number;
  depthInches?: number;
}

export interface GravelCalculatorOutputs {
  tonsNeeded: number;
  cubicYards: number;
}
