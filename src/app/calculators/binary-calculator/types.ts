export interface BinaryCalculatorInputs {
  binary1?: string;
  operation?: string;
  binary2?: string;
}

export interface BinaryCalculatorOutputs {
  binaryResult: string;
  decimalResult: number;
  hexResult: string;
}
