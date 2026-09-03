export interface MeanMedianModeRangeCalculatorInputs {
  dataSeries?: string;
  isSample?: boolean;
}

export interface MeanMedianModeRangeCalculatorOutputs {
  mean: number;
  median: number;
  mode: string;
  range: number;
  count?: number;
  sum?: number;
  variance?: number;
  standardDeviation?: number;
}
