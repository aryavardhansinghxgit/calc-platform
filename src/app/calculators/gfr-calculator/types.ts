export interface GFRCalculatorInputs {
  serumCreatinine?: number;
  age?: number;
  gender?: string;
}

export interface GFRCalculatorOutputs {
  eGfr: number;
  stage: string;
}
