export interface OhmsLawCalculatorInputs {
  voltage?: number;
  resistance?: number;
}

export interface OhmsLawCalculatorOutputs {
  currentAmps: number;
  powerWatts: number;
}
