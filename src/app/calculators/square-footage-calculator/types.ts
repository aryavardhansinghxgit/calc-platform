export interface SquareFootageCalculatorInputs {
  lengthFt?: number;
  widthFt?: number;
  pricePerSqFt?: number;
}

export interface SquareFootageCalculatorOutputs {
  squareFeet: number;
  squareMeters: number;
  totalCost: number;
}
