export interface HeightCalculatorInputs {
  fatherHeightCm?: number;
  motherHeightCm?: number;
  childGender?: string;
}

export interface HeightCalculatorOutputs {
  predictedHeightCm: number;
  predictedHeightFeet: string;
}
