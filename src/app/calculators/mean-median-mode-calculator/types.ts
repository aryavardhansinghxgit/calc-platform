export interface MeanMedianModeRangeCalculatorInputs {
  dataSeries?: string;
}

export interface MeanMedianModeRangeCalculatorOutputs {
  mean: number;
  median: number;
  mode: string;
  range: number;
}
