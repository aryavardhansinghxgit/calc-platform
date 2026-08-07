export interface MatrixCalculatorInputs {
  a11?: number;
  a12?: number;
  a21?: number;
  a22?: number;
  operation?: string;
}

export interface MatrixCalculatorOutputs {
  detA: number;
  traceA: number;
  matrixSquare: string;
}
