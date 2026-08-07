export interface VolumeCalculatorInputs {
  shape?: string;
  dim1?: number;
  dim2?: number;
  dim3?: number;
}

export interface VolumeCalculatorOutputs {
  volume: number;
  formula: string;
}
