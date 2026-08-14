export type TempUnit = "F" | "C";
export type HumidityInputMode = "rh" | "dewpoint";

export type HeatAlertCategory =
  | "caution"
  | "extreme_caution"
  | "danger"
  | "extreme_danger";

export interface OSHAWorkRestPlan {
  workMinutes: number;
  restMinutes: number;
  waterCupsPerHour: number;
  advisory: string;
}

export interface HeatIndexResult {
  airTempF: number;
  airTempC: number;
  relativeHumidity: number;
  dewPointF: number;
  dewPointC: number;
  heatIndexF: number;
  heatIndexC: number;
  directSunHeatIndexF: number;
  directSunHeatIndexC: number;
  isDirectSun: boolean;
  wbgtEstimateF: number;
  wbgtEstimateC: number;
  alertCategory: HeatAlertCategory;
  alertTitle: string;
  alertDescription: string;
  oshaPlan: OSHAWorkRestPlan;
}
