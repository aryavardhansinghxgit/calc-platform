export interface ShoeSizeConversionCalculatorInputs {
  footCm?: number;
  gender?: string;
}

export interface ShoeSizeConversionCalculatorOutputs {
  usSize: string;
  ukSize: string;
  euSize: string;
}
