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
  dailyFuelCost?: number;
  dailyFuelVolume?: number;
  monthlyDistanceFormatted?: string;
  monthlyFuelVolume?: number;
  workDaysCount?: number;
  // EV Comparison
  evTripCost?: number;
  gasTripCost?: number;
  evSavings?: number;
  isEvPremium?: boolean;
  evKwhTotal?: number;
  // MPG Solver
  calculatedMPG?: number;
  calculatedL100km?: number;
  // Expenses breakdown
  fuelOnlyCost: number;
  tollsAndExpenses: number;
  validationError?: string | null;
}

export interface SavedFuelCalculation {
  id: string;
  timestamp: number;
  label: string;
  mode: CalcMode;
  unitSystem: UnitSystem;
  currencySymbol: string;
  fuelType: FuelType;
  distance: number;
  isRoundTrip: boolean;
  efficiency: number;
  fuelPrice: number;
  passengers: number;
  tolls: number;
  parking: number;
  workDays: number;
  startOdo: number;
  endOdo: number;
  fuelAdded: number;
  evKwhPer100: number;
  electricityRate: number;
  penalties: EfficiencyPenaltyFlags;
  summaryOutput: string;
}
