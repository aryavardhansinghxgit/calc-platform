export type CalcMode = "trip" | "commute" | "mpg_solver" | "ev_compare";
export type UnitSystem = "imperial" | "metric";
export type FuelType = "gasoline" | "diesel" | "electric";

export interface EfficiencyPenaltyFlags {
  roofRack: boolean; // -15%
  highSpeed: boolean; // -20%
  towing: boolean; // -25%
  winterCold: boolean; // -10%
}

export interface FuelCostResult {
  totalCost: number;
  costPerPerson: number;
  fuelVolumeNeeded: number;
  fuelVolumeUnit: string;
  distanceFormatted: string;
  costPerDistanceUnit: number;
  distanceUnitName: string;
  effectiveEfficiency: number;
  efficiencyUnitName: string;
  carbonFootprintKg: number;
  // Commute Planner
  weeklyCommuteCost?: number;
  monthlyCommuteCost?: number;
  annualCommuteCost?: number;
  // EV Comparison
  evTripCost?: number;
  gasTripCost?: number;
  evSavings?: number;
  // MPG Solver
  calculatedMPG?: number;
  calculatedL100km?: number;
  // Expenses breakdown
  fuelOnlyCost: number;
  tollsAndExpenses: number;
}
