export interface BodyTypeCalculatorInputs {
  gender?: string;
  bustChest?: number;
  waist?: number;
  hip?: number;
}

export interface BodyTypeCalculatorOutputs {
  bodyShape: string;
  whr: number;
  whrRisk: string;
}
