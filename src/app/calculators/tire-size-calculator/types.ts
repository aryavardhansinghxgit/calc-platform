export type TireFormat = "metric" | "flotation";
export type VehicleClassPrefix = "P" | "LT" | "ST" | "T" | "None";

export interface TireDimensions {
  format: TireFormat;
  prefix?: VehicleClassPrefix;
  // Metric fields
  widthMm: number; // e.g. 225
  aspectRatio: number; // e.g. 50 (%)
  rimDiameterInches: number; // e.g. 17
  // Flotation / Off-Road fields
  flotationDiameterInches: number; // e.g. 33
  flotationWidthInches: number; // e.g. 12.5
}

export interface TireGeometry {
  diameterMm: number;
  diameterIn: number;
  sidewallMm: number;
  sidewallIn: number;
  circumferenceMm: number;
  circumferenceIn: number;
  revsPerMile: number;
  revsPerKm: number;
  widthMm: number;
  widthIn: number;
  rimDiameterIn: number;
  formattedSize: string;
}

export interface FitmentOffsetInputs {
  stockRimWidthIn: number;
  stockOffsetMm: number;
  newRimWidthIn: number;
  newOffsetMm: number;
}

export interface FitmentOffsetResults {
  innerClearanceMm: number; // positive = more room, negative = closer to strut
  outerPokeMm: number; // positive = extends outward toward fender
  backspacingStockIn: number;
  backspacingNewIn: number;
}

export interface GearRatioInputs {
  stockGearRatio: number; // e.g. 3.73
}

export interface GearRatioResults {
  effectiveGearRatio: number;
  equivalentRatioNeeded: number; // Ratio needed to restore stock acceleration
  ratioChangePercent: number;
}

export interface SpeedDeltaPoint {
  indicatedMph: number;
  actualMph: number;
  indicatedKmh: number;
  actualKmh: number;
}

export interface TireComparisonResult {
  tire1: TireGeometry;
  tire2: TireGeometry;
  // Differentials (Tire 2 relative to Tire 1)
  diameterDiffIn: number;
  diameterDiffMm: number;
  diameterDiffPercent: number;
  sidewallDiffIn: number;
  sidewallDiffMm: number;
  widthDiffIn: number;
  widthDiffMm: number;
  circumferenceDiffIn: number;
  circumferenceDiffMm: number;
  revsPerMileDiff: number;
  revsPerKmDiff: number;
  speedErrorPercent: number;
  speedAt65Mph: number;
  rideHeightChangeIn: number;
  rideHeightChangeMm: number;
  speedDeltaTable: SpeedDeltaPoint[];
  offsetResults: FitmentOffsetResults | null;
  gearResults: GearRatioResults | null;
  safetyRating: "safe" | "caution" | "warning";
  safetyMessage: string;
}
