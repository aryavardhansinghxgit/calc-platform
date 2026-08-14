export type TempUnit = "F" | "C" | "K";
export type TargetVariable = "dew_point" | "relative_humidity" | "air_temp";
export type PsychrometricModel =
  | "alduchov_eskridge"
  | "magnus_tetens"
  | "buck"
  | "sonntag";

export type ComfortCategory =
  | "dry"
  | "comfortable"
  | "sticky"
  | "muggy"
  | "oppressive"
  | "severe_stress";

export interface PaintingRiskAdvice {
  isSafeToPaint: boolean;
  marginF: number;
  marginC: number;
  statusText: string;
  recommendation: string;
}

export interface DewPointResult {
  airTempF: number;
  airTempC: number;
  airTempK: number;
  relativeHumidity: number;
  dewPointF: number;
  dewPointC: number;
  dewPointK: number;
  wetBulbF: number;
  wetBulbC: number;
  frostPointF: number;
  frostPointC: number;
  actualVaporPressureHpa: number;
  actualVaporPressureInHg: number;
  saturationVaporPressureHpa: number;
  absoluteHumidityGM3: number;
  absoluteHumidityGrainsFt3: number;
  specificHumidityGKg: number;
  cloudBaseFt: number;
  cloudBaseM: number;
  comfortCategory: ComfortCategory;
  comfortTitle: string;
  comfortDescription: string;
  paintingRisk: PaintingRiskAdvice;
  targetVariable: TargetVariable;
  model: PsychrometricModel;
}
