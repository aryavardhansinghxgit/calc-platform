export type CalcMode = "odometer" | "trip" | "multi_tank" | "tank_range";
export type UnitSystem = "us" | "metric" | "uk" | "indian";
export type FuelType =
  | "gasoline"
  | "premium_petrol"
  | "diesel"
  | "cng"
  | "flex_fuel"
  | "lpg"
  | "electric";

export type EfficiencyRating = "poor" | "average" | "excellent" | "hybrid";

export interface FillUpEntry {
  id: number;
  distance: number;
  fuelAdded: number;
  pricePerUnit: number;
}

export interface EfficiencyPenaltyFlags {
  cityDriving: boolean; // -20%
  highSpeed: boolean; // -20%
  winterCold: boolean; // -10%
  roofCargo: boolean; // -15%
}

export interface GasMileageResult {
  usMPG: number;
  ukMPG: number;
  l100km: number;
  kmL: number;
  effectiveMPG: number;
  effectiveL100km: number;
  effectiveKmL: number;
  costPerDistanceUnit: number;
  distancePerCurrencyUnit: number;
  distanceUnitName: string;
  fuelVolumeUnitName: string;
  efficiencyUnitName: string;
  // Range Planner
  totalTankRange: number;
  costToFillTank: number;
  // Annual Spending & CO2
  annualFuelCost: number;
  annualFuelVolume: number;
  carbonFootprintKg: number;
  carbonFootprintTons: number;
  // Rating & MPGe
  rating: EfficiencyRating;
  ratingLabel: string;
  ratingPercentage: number;
  mpgeEquivalent: number;
  evCostPer100mi: number;
}
