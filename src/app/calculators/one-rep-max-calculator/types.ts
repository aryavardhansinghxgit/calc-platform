export interface OneRepMaxCalculatorInputs {
  weightLiftedKg?: number;
  reps?: number;
}

export interface OneRepMaxCalculatorOutputs {
  epley1RM: number;
  brzycki1RM: number;
  percent85: number;
  percent75: number;
}
