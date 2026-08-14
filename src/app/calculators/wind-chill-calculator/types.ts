export type TempUnit = "F" | "C";
export type SpeedUnit = "mph" | "kmh" | "ms" | "knots";
export type WeatherModel = "jag_ti" | "steadman" | "siple_passel";
export type ActivityMode = "stationary" | "walking" | "running" | "cycling";

export type FrostbiteRiskLevel = "safe" | "caution" | "danger" | "extreme";

export interface ClothingRecommendation {
  baseLayer: string;
  midLayer: string;
  outerShell: string;
  headHandGear: string;
  footwear: string;
}

export interface WindChillResult {
  airTempF: number;
  airTempC: number;
  windSpeedMph: number;
  effectiveWindSpeedMph: number;
  windChillF: number;
  windChillC: number;
  apparentTempF: number;
  apparentTempC: number;
  frostbiteRisk: FrostbiteRiskLevel;
  frostbiteMinutesText: string;
  frostbiteMinutesMin: number;
  clothing: ClothingRecommendation;
  warningNote?: string;
}
