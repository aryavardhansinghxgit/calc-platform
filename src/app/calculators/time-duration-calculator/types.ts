export interface TimeDurationCalculatorInputs {
  startDate?: string;
  startTime?: string;
  endDate?: string;
  endTime?: string;
}

export interface TimeDurationCalculatorOutputs {
  formattedDuration: string;
  totalHours: number;
}
