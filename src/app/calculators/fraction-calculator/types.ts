export interface FractionCalculatorInputs {
  num1?: number;
  den1?: number;
  operation?: string;
  num2?: number;
  den2?: number;
}

export interface FractionCalculatorOutputs {
  resultFraction: string;
  decimalValue: number;
  mixedNumber: string;
}
