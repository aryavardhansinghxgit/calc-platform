export interface PeriodCalculatorInputs {
  lastPeriod?: string;
  cycleLength?: number;
}

export interface PeriodCalculatorOutputs {
  nextPeriod: string;
  followingPeriod: string;
}
