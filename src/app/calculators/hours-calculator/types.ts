export interface HoursCalculatorInputs {
  startTime?: string;
  endTime?: string;
  breakMins?: number;
}

export interface HoursCalculatorOutputs {
  totalHours: number;
  formattedDuration: string;
}
