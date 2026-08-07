export interface DateCalculatorInputs {
  startDate?: string;
  operation?: string;
  years?: number;
  months?: number;
  days?: number;
}

export interface DateCalculatorOutputs {
  resultDate: string;
  dayOfWeek: string;
}
