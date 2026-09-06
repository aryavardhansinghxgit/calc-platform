export interface HexCalculatorInputs {
  inputA?: string;
  inputB?: string;
  operation?: string;
  bitWidth?: number;
  isSigned?: boolean;
  // Legacy aliases
  hex1?: string;
  hex2?: string;
}

export interface HexCalculatorOutputs {
  hexResult: string;
  decimalResult: string | number;
  binaryResult: string;
  octalResult?: string;
  carryOut?: number;
  overflow?: boolean;
  mathematicalResult?: string;
}
