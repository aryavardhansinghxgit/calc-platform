export interface StandardDeviationCalculatorInputs {
  dataSeries?: string;
}

export interface StandardDeviationCalculatorOutputs {
  sampleSD: number;
  populationSD: number;
  mean: number;
  sampleVariance: number;
}
