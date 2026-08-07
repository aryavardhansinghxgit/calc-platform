export interface StatisticsCalculatorInputs {
  dataSeries?: string;
}

export interface StatisticsCalculatorOutputs {
  count: number;
  sum: number;
  mean: number;
  median: number;
  range: number;
}
