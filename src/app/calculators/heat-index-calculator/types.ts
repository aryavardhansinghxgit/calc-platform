export type TempUnit = "F" | "C";
export type HumidityInputMode = "rh" | "dewpoint";

export type HeatAlertCategory =
  | "caution"
  | "extreme_caution"
  | "danger"
  | "extreme_danger";

export interface WorkRestSchedule {
  workMinutes: number;
  restMinutes: number;
  waterCupsPerHour: number;
  advisory: string;
}

// Alias for legacy support
export type OSHAWorkRestPlan = WorkRestSchedule;

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
  heatStressEstimateF: number;
  heatStressEstimateC: number;
  wbgtEstimateF: number;
  wbgtEstimateC: number;
  alertCategory: HeatAlertCategory;
  alertTitle: string;
  alertDescription: string;
  workRestPlan: WorkRestSchedule;
  oshaPlan: WorkRestSchedule;
  nwsPathway?: "steadman_simple" | "rothfusz_full";
  pathway?: "steadman_simple" | "rothfusz_full";
  simpleHI?: number;
  avgHI?: number;
  adjustment?: number;
  isSupersaturated?: boolean;
  isInvalid?: boolean;
  domainNotice?: string;
  warningNote?: string;
}
