export interface WeightCalculatorInputs {
  massKg?: number;
  celestialBody?: string;
}

export interface WeightCalculatorOutputs {
  weightNewtons: number;
  weightLbs: number;
}
