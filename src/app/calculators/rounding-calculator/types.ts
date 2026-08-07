export interface RoundingCalculatorInputs {
  number?: number;
  precision?: string;
}

export interface RoundingCalculatorOutputs {
  roundedValue: number;
  floorValue: number;
  ceilValue: number;
}
