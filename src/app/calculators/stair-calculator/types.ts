export interface StairCalculatorInputs {
  totalRiseInches?: number;
  targetRiserHeight?: number;
}

export interface StairCalculatorOutputs {
  numberOfSteps: number;
  exactRiserHeight: number;
  totalRunInches: number;
}
