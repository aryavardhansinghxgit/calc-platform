export interface TireSizeCalculatorInputs {
  widthMm?: number;
  aspectRatio?: number;
  rimDiameterInches?: number;
}

export interface TireSizeCalculatorOutputs {
  tireDiameterInches: number;
  sidewallHeightInches: number;
  circumferenceInches: number;
}
