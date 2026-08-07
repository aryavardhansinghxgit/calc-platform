export interface AreaCalculatorInputs {
  shape?: string;
  dim1?: number;
  dim2?: number;
  dim3?: number;
}

export interface AreaCalculatorOutputs {
  area: number;
  formula: string;
}
