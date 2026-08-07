export interface OvulationCalculatorInputs {
  lastPeriod?: string;
  cycleLength?: number;
}

export interface OvulationCalculatorOutputs {
  ovulationDate: string;
  fertileStart: string;
  fertileEnd: string;
}
