export interface DayCounterInputs {
  startDate?: string;
  endDate?: string;
}

export interface DayCounterOutputs {
  totalDays: number;
  businessDays: number;
  totalWeeks: number;
}
