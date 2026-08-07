export interface DueDateCalculatorInputs {
  lmpDate?: string;
  cycleLength?: number;
}

export interface DueDateCalculatorOutputs {
  dueDate: string;
  daysRemaining: number;
}
