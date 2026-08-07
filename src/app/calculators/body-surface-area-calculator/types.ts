export interface BodySurfaceAreaCalculatorInputs {
  weightKg?: number;
  heightCm?: number;
}

export interface BodySurfaceAreaCalculatorOutputs {
  mostellerBsa: number;
  duBoisBsa: number;
  haycockBsa: number;
}
