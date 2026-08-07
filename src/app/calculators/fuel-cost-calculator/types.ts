export interface FuelCostCalculatorInputs {
  distanceMiles?: number;
  mpg?: number;
  gasPrice?: number;
}

export interface FuelCostCalculatorOutputs {
  totalFuelCost: number;
  gallonsNeeded: number;
  costPerMile: number;
}
