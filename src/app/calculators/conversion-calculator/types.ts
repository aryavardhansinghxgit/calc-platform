export interface ConversionCalculatorInputs {
  value?: number;
  unitCategory?: string;
}

export interface ConversionCalculatorOutputs {
  convertedValue: number;
  summary: string;
}
