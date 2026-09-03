export interface LogCalculatorInputs {
  value?: number;
  number?: number;
  argument?: number;
  base?: number;
}

export interface LogCalculatorOutputs {
  logResult: number;
  lnResult: number;
  log10Result: number;
  log2Result?: number;
}
