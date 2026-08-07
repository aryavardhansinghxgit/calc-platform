export interface SlopeCalculatorInputs {
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}

export interface SlopeCalculatorOutputs {
  slopeM: number;
  angleDeg: number;
  lineEquation: string;
}
