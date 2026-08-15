export interface PercentErrorCalculatorInputs {
  expVal?: number;
  theoVal?: number;
}

export interface PercentErrorCalculatorOutputs {
  percentError: number;
  absoluteError: number;
  signedPercentError: number;
  relativeError: number;
  accuracy: number;
}
