export type MileageCalcMode = "fuel_mileage" | "tax_reimbursement" | "multi_leg" | "ev_mpge";
export type UnitSystem = "us_imperial" | "uk_imperial" | "metric" | "indian_metric";
export type IndianFuelType = "petrol" | "diesel" | "cng" | "lpg" | "ev_home" | "ev_commercial";
export type ReimbursementCategory = "business" | "medical" | "charity";
export type EfficiencyTier = "heavy_consumption" | "average" | "high_efficiency" | "eco_hybrid";

export interface LegInput {
  id: string;
  distance: number;
  fuel: number;
  pricePerUnit: number;
}

export interface EnvironmentalModifiers {
  cityDriving: boolean;
  towing: boolean;
  aggressiveDriving: boolean;
  coldWeather: boolean;
}

export interface MileageResult {
  // Primary Metrics
  primaryValue: number;
  primaryUnit: string;
  primaryLabel: string;
  currencySymbol: string;
  // Alternate Equivalent Units
  usMpg: number;
  ukMpg: number;
  litersPer100km: number;
  kmPerLiter: number;
  mpge: number;
  kWhPer100mi: number;
  // Financial Analytics
  costPerDistance: number; // Cost per mile or km
  costPerDistanceUnit: string;
  distancePerDollar: number; // Miles per dollar or km per currency unit
  distancePerDollarUnit: string;
  annualFuelCost: number;
  // Tax Reimbursement
  taxReimbursementAmount: number;
  reimbursementRatePerMile: number;
  // Totals
  totalDistance: number;
  distanceUnit: string;
  totalFuelUsed: number;
  fuelUnit: string;
  totalFuelCost: number;
  // Efficiency Classification & Gauge Angle (0 to 180 deg)
  efficiencyTier: EfficiencyTier;
  efficiencyTierLabel: string;
  gaugeAngle: number;
  // Modifier penalty percent
  environmentalPenaltyPercent: number;
}
