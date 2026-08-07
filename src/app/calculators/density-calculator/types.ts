export interface DensityCalculatorInputs {
  massKg?: number;
  volumeM3?: number;
}

export interface DensityCalculatorOutputs {
  densityKgM3: number;
  densityGCm3: number;
}
