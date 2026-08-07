export interface ConfidenceIntervalCalculatorInputs {
  mean?: number;
  sd?: number;
  sampleSize?: number;
  confidenceLevel?: string;
}

export interface ConfidenceIntervalCalculatorOutputs {
  marginError: number;
  intervalRange: string;
}
