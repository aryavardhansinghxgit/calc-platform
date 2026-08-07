export interface TimeCalculatorInputs {
  h1?: number;
  m1?: number;
  operation?: string;
  h2?: number;
  m2?: number;
}

export interface TimeCalculatorOutputs {
  resultTime: string;
  totalHours: number;
}
