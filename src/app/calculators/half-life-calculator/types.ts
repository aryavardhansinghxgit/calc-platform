export interface HalfLifeCalculatorInputs {
  initialAmount?: number;
  halfLife?: number;
  elapsedTime?: number;
}

export interface HalfLifeCalculatorOutputs {
  remainingAmount: number;
  pctRemaining: number;
  decayConstant: number;
}
