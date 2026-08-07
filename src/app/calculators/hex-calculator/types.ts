export interface HexCalculatorInputs {
  hex1?: string;
  operation?: string;
  hex2?: string;
}

export interface HexCalculatorOutputs {
  hexResult: string;
  decimalResult: number;
  binaryResult: string;
}
