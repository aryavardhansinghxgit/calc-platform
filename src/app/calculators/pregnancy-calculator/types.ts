export interface PregnancyCalculatorInputs {
  lmpDate?: string;
  cycleLength?: number;
}

export interface PregnancyCalculatorOutputs {
  dueDate: string;
  gestationalAge: string;
  trimester: string;
  conceptionDate: string;
}
