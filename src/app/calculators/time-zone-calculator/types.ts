export interface TimeZoneCalculatorInputs {
  timeStr?: string;
  fromOffset?: number;
  toOffset?: number;
}

export interface TimeZoneCalculatorOutputs {
  convertedTime: string;
  timeDiffHours: number;
}
