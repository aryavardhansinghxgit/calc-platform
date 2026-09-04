export interface SlopeCalculatorInputs {
  x1?: number;
  y1?: number;
  x2?: number;
  y2?: number;
}

export interface SlopeCalculatorOutputs {
  slopeM: number | null;
  angleDeg: number | null;
  lineEquation: string;
  isVertical?: boolean;
  isCoincident?: boolean;
}
