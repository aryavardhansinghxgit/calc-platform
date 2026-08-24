export interface PercentageCalculatorInputs {
  calcType?: string;
  valueX?: number | string;
  valueY?: number | string;
  valueZ?: number | string;
}

export interface PercentageCalculatorOutputs {
  result: number;
  summary: string;
  steps?: string;
  isValid?: boolean;
}
