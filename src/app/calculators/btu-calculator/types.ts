export interface BTUCalculatorInputs {
  lengthFt?: number;
  widthFt?: number;
  insulation?: string;
}

export interface BTUCalculatorOutputs {
  requiredBtu: number;
  acTons: number;
}
