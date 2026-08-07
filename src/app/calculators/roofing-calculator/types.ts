export interface RoofingCalculatorInputs {
  houseLengthFt?: number;
  houseWidthFt?: number;
  pitch?: string;
}

export interface RoofingCalculatorOutputs {
  roofSquares: number;
  bundlesNeeded: number;
  totalAreaSqFt: number;
}
