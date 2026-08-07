export interface ZScoreCalculatorInputs {
  rawScore?: number;
  mean?: number;
  sd?: number;
}

export interface ZScoreCalculatorOutputs {
  zScore: number;
  percentile: number;
}
