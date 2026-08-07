export interface SampleSizeCalculatorInputs {
  confidenceLevel?: string;
  marginError?: number;
  population?: number;
}

export interface SampleSizeCalculatorOutputs {
  sampleSize: number;
  zScore: number;
}
