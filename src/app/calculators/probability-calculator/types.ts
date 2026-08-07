export interface ProbabilityCalculatorInputs {
  probA?: number;
  probB?: number;
}

export interface ProbabilityCalculatorOutputs {
  probAandB: number;
  probAorB: number;
  probNotA: number;
}
