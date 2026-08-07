export interface ElectricityCalculatorInputs {
  wattage?: number;
  hoursPerDay?: number;
  costPerKwh?: number;
}

export interface ElectricityCalculatorOutputs {
  monthlyCost: number;
  monthlyKwh: number;
  annualCost: number;
}
